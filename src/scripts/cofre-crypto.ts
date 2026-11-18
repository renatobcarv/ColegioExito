/**
 * Cofre de senhas · criptografia (roda só no navegador, com a Web Crypto API).
 *
 * - Chave: PBKDF2-SHA256 sobre a senha mestra, com sal aleatório de 16 bytes e muitas rodadas.
 * - Cifra: AES-256-GCM, IV aleatório de 12 bytes por gravação (o GCM também detecta adulteração).
 * - Formato gravado: base64( IV ‖ texto cifrado ).
 * A chave é criada como "não exportável": nem o próprio código consegue ler os bytes dela.
 */

export const ITERACOES_PADRAO = 600_000; // recomendação OWASP (2023) para PBKDF2-SHA256
export const VERIFICADOR = 'cofre-colegio-exito:ok:v1';

const enc = new TextEncoder();
const dec = new TextDecoder();

export function paraB64(bytes: Uint8Array): string {
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
}

export function deB64(b64: string): Uint8Array {
  const s = atob(b64);
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
  return out;
}

export function novoSal(): string {
  return paraB64(crypto.getRandomValues(new Uint8Array(16)));
}

export async function derivarChave(senhaMestra: string, salB64: string, iteracoes: number): Promise<CryptoKey> {
  const base = await crypto.subtle.importKey('raw', enc.encode(senhaMestra.normalize('NFC')), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', hash: 'SHA-256', salt: deB64(salB64) as BufferSource, iterations: iteracoes },
    base,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

export async function cifrar(chave: CryptoKey, texto: string): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, chave, enc.encode(texto)));
  const out = new Uint8Array(iv.length + ct.length);
  out.set(iv);
  out.set(ct, iv.length);
  return paraB64(out);
}

/** Lança erro se a chave estiver errada ou o dado tiver sido adulterado. */
export async function decifrar(chave: CryptoKey, b64: string): Promise<string> {
  const bytes = deB64(b64);
  const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: bytes.subarray(0, 12) as BufferSource }, chave, bytes.subarray(12) as BufferSource);
  return dec.decode(pt);
}

export async function conferirSenha(chave: CryptoKey, verificador: string): Promise<boolean> {
  try {
    return (await decifrar(chave, verificador)) === VERIFICADOR;
  } catch {
    return false;
  }
}

/** Gerador de senha forte, sem caracteres que se confundem (0/O, 1/l/I). */
export function gerarSenha(tamanho = 20): string {
  const grupos = ['ABCDEFGHJKLMNPQRSTUVWXYZ', 'abcdefghijkmnopqrstuvwxyz', '23456789', '!@#$%&*?-_+='];
  const todos = grupos.join('');
  const chars = grupos.map((g) => g[sorteio(g.length)]); // garante um de cada tipo
  while (chars.length < tamanho) chars.push(todos[sorteio(todos.length)]);
  for (let i = chars.length - 1; i > 0; i--) {
    const j = sorteio(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join('');
}

/** Número aleatório uniforme em [0, n), sem viés (rejeita a sobra do módulo). */
function sorteio(n: number): number {
  const lim = 0x1_0000_0000 - (0x1_0000_0000 % n);
  const b = new Uint32Array(1);
  do crypto.getRandomValues(b);
  while (b[0] >= lim);
  return b[0] % n;
}

/** Nota de 0 a 4 para a força de uma senha (estimativa simples por tamanho e variedade). */
export function forca(senha: string): { nota: 0 | 1 | 2 | 3 | 4; texto: string } {
  let tipos = 0;
  if (/[a-z]/.test(senha)) tipos++;
  if (/[A-Z]/.test(senha)) tipos++;
  if (/\d/.test(senha)) tipos++;
  if (/[^A-Za-z0-9]/.test(senha)) tipos++;
  const bits = senha.length * Math.log2([0, 26, 52, 62, 94][tipos] || 1);
  const nota = bits < 40 ? 0 : bits < 60 ? 1 : bits < 80 ? 2 : bits < 100 ? 3 : 4;
  return { nota: nota as 0 | 1 | 2 | 3 | 4, texto: ['Muito fraca', 'Fraca', 'Razoável', 'Forte', 'Muito forte'][nota] };
}
