// Cofre de senhas · interface. Toda a criptografia acontece aqui no navegador (ver cofre-crypto.ts);
// o Supabase só recebe e devolve blocos cifrados. Dados decifrados nunca vão para innerHTML.
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { ITERACOES_PADRAO, VERIFICADOR, cifrar, conferirSenha, decifrar, derivarChave, forca, gerarSenha, novoSal } from './cofre-crypto';

type Item = {
  nome: string; categoria: string; url: string; usuario: string; senha: string;
  recuperacao: string; doisFatores: string; responsavel: string; obs: string;
};
type Linha = { id: string; dados: string; atualizado_em?: string; atualizado_por?: string };
type Aberto = { id: string; item: Item; atualizado_em?: string; atualizado_por?: string };
type Config = { salt: string; iteracoes: number; verificador: string };
type Tela = 'sem-config' | 'login' | 'sem-acesso' | 'criar' | 'desbloquear' | 'backup' | 'cofre';

const CATEGORIAS = ['Instagram', 'Facebook / Meta', 'Google / Gmail', 'TikTok', 'YouTube', 'WhatsApp', 'Site e domínio', 'Sistemas da escola', 'Bancos e pagamentos', 'Outros'];
const COR: Record<string, string> = {
  Instagram: '#C13584', 'Facebook / Meta': '#1877F2', 'Google / Gmail': '#D93025', TikTok: '#111111', YouTube: '#CC0000',
  WhatsApp: '#1E8B3A', 'Site e domínio': '#0B2A86', 'Sistemas da escola': '#1237A6', 'Bancos e pagamentos': '#8A6D00', Outros: '#5E6A85',
};
const TRANCA_INATIVO_MS = 5 * 60_000; // tranca após 5 min sem uso
const TRANCA_OCULTO_MS = 2 * 60_000; // ou 2 min com a aba escondida
const LIMPA_COPIA_MS = 30_000;

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const app = $('app');
const SB_URL = app.dataset.sbUrl || '';
const SB_KEY = app.dataset.sbKey || '';

let sb: SupabaseClient | null = null;
let email = '';
let config: Config | null = null;
let chave: CryptoKey | null = null;
let itens: Aberto[] = [];
let somenteLeitura = false;
let filtro = 'Todas';
let editando: Aberto | null = null;
let ultimoUso = Date.now();
let ocultoDesde = 0;

// ---------------------------------------------------------------- telas e avisos
function tela(t: Tela) {
  document.querySelectorAll<HTMLElement>('[data-tela]').forEach((s) => (s.hidden = s.dataset.tela !== t));
  $('topActs').hidden = !email && t !== 'cofre';
  $('btnSair').hidden = !email;
  $('btnLock').hidden = t !== 'cofre';
  $('who').textContent = somenteLeitura && t === 'cofre' ? 'backup local' : email;
  const foco = document.querySelector<HTMLInputElement>(`[data-tela="${t}"] input:not([type=hidden]):not([type=checkbox])`);
  if (foco && t !== 'cofre') setTimeout(() => foco.focus(), 30);
  if (t !== 'cofre') aviso('');
}

function aviso(texto: string, erro = false) {
  const m = $('msg');
  m.textContent = texto;
  m.hidden = !texto;
  m.classList.toggle('is-err', erro);
  if (texto && !erro) setTimeout(() => m.textContent === texto && (m.hidden = true), 4000);
}

async function ocupado<T>(form: HTMLFormElement | HTMLButtonElement, fn: () => Promise<T>): Promise<T | undefined> {
  const btns = form instanceof HTMLFormElement ? [...form.querySelectorAll('button')] : [form];
  btns.forEach((b) => (b.disabled = true));
  try {
    return await fn();
  } catch (e) {
    aviso(traduz(e), true);
  } finally {
    btns.forEach((b) => (b.disabled = false));
  }
}

function traduz(e: unknown): string {
  const t = e instanceof Error ? e.message : String((e as { message?: string })?.message ?? e);
  if (/Invalid login credentials/i.test(t)) return 'E-mail ou senha de acesso incorretos.';
  if (/Email not confirmed/i.test(t)) return 'E-mail ainda não confirmado no Supabase.';
  if (/Failed to fetch|NetworkError|Load failed/i.test(t)) return 'Sem conexão com o servidor. Confira a internet.';
  if (/JWT|session/i.test(t)) return 'Sua sessão expirou. Entre de novo.';
  return t;
}

// ---------------------------------------------------------------- fluxo principal
async function inicio() {
  somenteLeitura = false;
  if (!SB_URL || !SB_KEY) return tela('sem-config');
  sb ??= createClient(SB_URL, SB_KEY, { auth: { storage: window.sessionStorage, persistSession: true, autoRefreshToken: true } });
  const { data } = await sb.auth.getSession();
  if (!data.session) { email = ''; return tela('login'); }
  email = data.session.user.email ?? '';
  const adm = await sb.from('cofre_admins').select('email').limit(1);
  if (adm.error) throw adm.error;
  if (!adm.data?.length) return tela('sem-acesso');
  const cfg = await sb.from('cofre_config').select('salt,iteracoes,verificador').eq('id', 1).maybeSingle();
  if (cfg.error) throw cfg.error;
  config = cfg.data as Config | null;
  tela(config ? 'desbloquear' : 'criar');
}

async function carregarItens() {
  if (!sb || !chave) return;
  const { data, error } = await sb.from('cofre_itens').select('id,dados,atualizado_em,atualizado_por').order('criado_em');
  if (error) throw error;
  const falhas: string[] = [];
  itens = [];
  for (const l of (data ?? []) as Linha[]) {
    try {
      itens.push({ id: l.id, item: JSON.parse(await decifrar(chave, l.dados)), atualizado_em: l.atualizado_em, atualizado_por: l.atualizado_por });
    } catch {
      falhas.push(l.id);
    }
  }
  if (falhas.length) aviso(`${falhas.length} conta(s) não abriram com esta senha mestra (cifradas com outra senha ou danificadas).`, true);
  render();
}

function trancar(motivo = '') {
  chave = null;
  itens = [];
  editando = null;
  ($('dlg') as HTMLDialogElement).close();
  $('lista').replaceChildren();
  $('log').replaceChildren();
  if (somenteLeitura) { somenteLeitura = false; config = null; inicio().catch((e) => aviso(traduz(e), true)); }
  else tela(config ? 'desbloquear' : 'login');
  if (motivo) aviso(motivo);
}

// ---------------------------------------------------------------- lista
function render() {
  const busca = ($('busca') as HTMLInputElement).value.trim().toLowerCase();
  const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const b = norm(busca);
  const porCat = new Map<string, number>();
  itens.forEach((a) => porCat.set(a.item.categoria, (porCat.get(a.item.categoria) ?? 0) + 1));

  const chips = $('chips');
  chips.replaceChildren(
    ...['Todas', ...CATEGORIAS.filter((c) => porCat.has(c))].map((c) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = c;
      const n = document.createElement('small');
      n.textContent = String(c === 'Todas' ? itens.length : porCat.get(c));
      btn.append(n);
      btn.setAttribute('aria-pressed', String(filtro === c));
      btn.onclick = () => { filtro = c; render(); };
      return btn;
    }),
  );

  const vis = itens
    .filter((a) => filtro === 'Todas' || a.item.categoria === filtro)
    .filter((a) => !b || norm([a.item.nome, a.item.usuario, a.item.responsavel, a.item.categoria, a.item.url].join(' ')).includes(b))
    .sort((x, y) => x.item.nome.localeCompare(y.item.nome, 'pt-BR'));

  $('lista').replaceChildren(...vis.map(cartao));
  const vazio = $('vazio');
  vazio.hidden = vis.length > 0;
  vazio.textContent = itens.length ? 'Nenhuma conta encontrada com esse filtro.' : 'O cofre está vazio. Comece por “+ Nova conta”.';
  $('btnNovo').hidden = somenteLeitura;
  $('readonly').hidden = !somenteLeitura;
  $('tools').hidden = somenteLeitura;
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls = '', texto = ''): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (texto) e.textContent = texto;
  return e;
}

function botao(texto: string, fn: () => void, rotulo = '') {
  const b = el('button', 'btn btn--ghost btn--sm', texto);
  b.type = 'button';
  if (rotulo) b.setAttribute('aria-label', rotulo);
  b.onclick = fn;
  return b;
}

function cartao(a: Aberto) {
  const { item } = a;
  const li = el('li', 'item');

  const head = el('div', 'item__head');
  const ico = el('span', 'item__ico', (item.nome.trim()[0] ?? '?').toUpperCase());
  ico.style.background = COR[item.categoria] ?? COR.Outros;
  ico.setAttribute('aria-hidden', 'true');
  const nome = el('div', 'item__name');
  nome.append(el('strong', '', item.nome), el('span', '', item.categoria));
  head.append(ico, nome);
  li.append(head);

  if (item.usuario) {
    const r = el('div', 'item__row');
    r.append(el('em', '', 'usuário'), el('span', '', item.usuario), botao('Copiar', () => copiar(item.usuario, 'Usuário copiado.'), `Copiar usuário de ${item.nome}`));
    li.append(r);
  }
  if (item.senha) {
    const r = el('div', 'item__row');
    const s = el('span', '', '••••••••••');
    let aberta = false;
    const ver = botao('Ver', () => {
      aberta = !aberta;
      s.textContent = aberta ? item.senha : '••••••••••';
      ver.textContent = aberta ? 'Ocultar' : 'Ver';
      if (aberta) setTimeout(() => { if (aberta) ver.click(); }, 20_000);
    }, `Mostrar senha de ${item.nome}`);
    r.append(el('em', '', 'senha'), s, ver, botao('Copiar', () => copiar(item.senha, 'Senha copiada. Some da área de transferência em 30 s.'), `Copiar senha de ${item.nome}`));
    li.append(r);
  }

  const meta = el('div', 'item__meta');
  const df = item.doisFatores;
  if (df.startsWith('sim')) meta.append(el('span', 'tag tag--ok', '2 etapas ativa'));
  else if (df === 'nao') meta.append(el('span', 'tag tag--warn', 'sem 2 etapas'));
  if (item.senha && forca(item.senha).nota < 2) meta.append(el('span', 'tag tag--warn', 'senha fraca'));
  if (item.responsavel) meta.append(el('span', 'tag', `resp.: ${item.responsavel}`));
  if (meta.childElementCount) li.append(meta);

  const foot = el('div', 'item__foot');
  const url = linkSeguro(item.url);
  if (url) {
    const link = el('a', 'btn btn--ghost btn--sm', 'Abrir site');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    foot.append(link);
  }
  foot.append(botao(somenteLeitura ? 'Detalhes' : 'Editar', () => abrirForm(a)));
  li.append(foot);
  return li;
}

function linkSeguro(u: string): string {
  if (!u) return '';
  try {
    const x = new URL(/^https?:\/\//i.test(u) ? u : `https://${u}`);
    return x.protocol === 'https:' || x.protocol === 'http:' ? x.href : '';
  } catch {
    return '';
  }
}

let limpaTimer = 0;
async function copiar(texto: string, ok: string) {
  try {
    await navigator.clipboard.writeText(texto);
    aviso(ok);
    clearTimeout(limpaTimer);
    limpaTimer = window.setTimeout(() => navigator.clipboard.writeText('').catch(() => {}), LIMPA_COPIA_MS);
  } catch {
    aviso('O navegador bloqueou a cópia. Use “Ver” e copie à mão.', true);
  }
}

// ---------------------------------------------------------------- formulário de conta
const dlg = $('dlg') as HTMLDialogElement;
const fItem = $('fItem') as HTMLFormElement;
const selCat = $('selCat') as HTMLSelectElement;
selCat.replaceChildren(...CATEGORIAS.map((c) => new Option(c, c)));

function abrirForm(a: Aberto | null) {
  editando = a;
  fItem.reset();
  const it: Partial<Item> = a?.item ?? { categoria: filtro !== 'Todas' ? filtro : 'Instagram' };
  for (const [k, v] of Object.entries(it)) {
    const campo = fItem.elements.namedItem(k) as HTMLInputElement | null;
    if (campo) campo.value = v ?? '';
  }
  const inSenha = $('inSenha') as HTMLInputElement;
  inSenha.type = 'password';
  $('btnVerForm').textContent = 'Ver';
  $('dlgT').textContent = somenteLeitura ? 'Detalhes da conta' : a ? 'Editar conta' : 'Nova conta';
  $('btnApagar').hidden = !a || somenteLeitura;
  fItem.querySelectorAll<HTMLInputElement>('input, select, textarea').forEach((c) => (c.disabled = somenteLeitura));
  (fItem.querySelector('[type=submit]') as HTMLButtonElement).hidden = somenteLeitura;
  ($('btnGerar') as HTMLButtonElement).hidden = somenteLeitura;
  medir(inSenha.value, 'meterItem');
  dlg.showModal();
}

$('btnNovo').onclick = () => abrirForm(null);
$('btnCancelar').onclick = () => dlg.close();
$('btnVerForm').onclick = () => {
  const i = $('inSenha') as HTMLInputElement;
  i.type = i.type === 'password' ? 'text' : 'password';
  $('btnVerForm').textContent = i.type === 'password' ? 'Ver' : 'Ocultar';
};
$('btnGerar').onclick = () => {
  const i = $('inSenha') as HTMLInputElement;
  i.value = gerarSenha(20);
  i.type = 'text';
  $('btnVerForm').textContent = 'Ocultar';
  medir(i.value, 'meterItem');
};
$('inSenha').addEventListener('input', (e) => medir((e.target as HTMLInputElement).value, 'meterItem'));

fItem.addEventListener('submit', (e) => {
  e.preventDefault();
  if (somenteLeitura || !sb || !chave) return;
  const fd = new FormData(fItem);
  const item = Object.fromEntries(['nome', 'categoria', 'url', 'usuario', 'senha', 'recuperacao', 'doisFatores', 'responsavel', 'obs'].map((k) => [k, String(fd.get(k) ?? '').trim()])) as Item;
  item.senha = String(fd.get('senha') ?? ''); // senha não leva trim
  ocupado(fItem, async () => {
    const dados = await cifrar(chave!, JSON.stringify(item));
    if (editando) {
      const { error } = await sb!.from('cofre_itens').update({ dados }).eq('id', editando.id);
      if (error) throw error;
    } else {
      const { error } = await sb!.from('cofre_itens').insert({ dados });
      if (error) throw error;
    }
    dlg.close();
    await carregarItens();
    aviso(editando ? 'Conta atualizada.' : 'Conta guardada no cofre.');
  });
});

$('btnApagar').onclick = () => {
  if (!editando || !sb) return;
  if (!confirm(`Apagar “${editando.item.nome}” do cofre? Não dá para desfazer.`)) return;
  const id = editando.id;
  ocupado($('btnApagar') as HTMLButtonElement, async () => {
    const { error } = await sb!.from('cofre_itens').delete().eq('id', id);
    if (error) throw error;
    dlg.close();
    await carregarItens();
    aviso('Conta apagada.');
  });
};

// ---------------------------------------------------------------- medidor de força
function medir(senha: string, id: string) {
  const m = $(id);
  const f = forca(senha);
  m.style.setProperty('--w', senha ? `${(f.nota + 1) * 20}%` : '0%');
  m.style.setProperty('--c', ['#E1251B', '#E1251B', '#D9A400', '#1E8B3A', '#1E8B3A'][f.nota]);
  (m.querySelector('span') as HTMLElement).textContent = senha ? f.texto : '';
}

const OBVIAS = ['exito', 'colegio', 'escola', 'tecmais', 'unopar', 'valparaiso', 'novogama', 'senha', 'password', 'admin', 'cofre', 'instagram', 'gmail', '123456', 'qwerty', '2024', '2025', '2026', '2027'];

function validarMestra(m1: string, m2: string): string {
  if (m1.length < 16) return 'A senha mestra precisa ter pelo menos 16 caracteres.';
  const n = m1.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const ruim = OBVIAS.find((w) => n.includes(w));
  if (ruim) return `A senha mestra não pode ter palavras óbvias como “${ruim}” (nome da escola, cidade, ano, “senha”). Use palavras sem relação com a escola.`;
  if (forca(m1).nota < 3) return 'Senha mestra fraca. Use uma frase com 4 ou mais palavras, ou misture letras, números e símbolos.';
  if (m1 !== m2) return 'As duas senhas mestras não são iguais.';
  return '';
}

// ---------------------------------------------------------------- formulários das travas
($('fLogin') as HTMLFormElement).addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target as HTMLFormElement;
  const fd = new FormData(f);
  ocupado(f, async () => {
    const { error } = await sb!.auth.signInWithPassword({ email: String(fd.get('email')), password: String(fd.get('senha')) });
    if (error) throw error;
    f.reset();
    await inicio();
  });
});

($('fCriar') as HTMLFormElement).addEventListener('input', (e) => {
  const t = e.target as HTMLInputElement;
  if (t.name === 'm1') medir(t.value, 'meterCriar');
});
($('fCriar') as HTMLFormElement).addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target as HTMLFormElement;
  const fd = new FormData(f);
  const m1 = String(fd.get('m1')), m2 = String(fd.get('m2'));
  const erro = validarMestra(m1, m2);
  if (erro) return aviso(erro, true);
  ocupado(f, async () => {
    const salt = novoSal();
    const k = await derivarChave(m1, salt, ITERACOES_PADRAO);
    const cfg: Config = { salt, iteracoes: ITERACOES_PADRAO, verificador: await cifrar(k, VERIFICADOR) };
    const { error } = await sb!.from('cofre_config').insert({ id: 1, ...cfg });
    if (error) {
      if (/duplicate|23505/i.test(error.message + (error.code ?? ''))) { f.reset(); await inicio(); throw new Error('Outra pessoa acabou de criar o cofre. Use a senha mestra definida por ela.'); }
      throw error;
    }
    config = cfg;
    chave = k;
    f.reset();
    medir('', 'meterCriar');
    tela('cofre');
    await carregarItens();
    aviso('Cofre criado. Agora cadastre as contas.');
  });
});

($('fDesb') as HTMLFormElement).addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target as HTMLFormElement;
  const m = String(new FormData(f).get('m'));
  ocupado(f, async () => {
    if (!config) return;
    const k = await derivarChave(m, config.salt, config.iteracoes);
    if (!(await conferirSenha(k, config.verificador))) throw new Error('Senha mestra incorreta.');
    chave = k;
    f.reset();
    ultimoUso = Date.now();
    tela('cofre');
    await carregarItens();
    sb!.from('cofre_log').insert({ acao: 'desbloqueou' }).then(() => {});
  });
});

// backup offline (só leitura)
($('fBackup') as HTMLFormElement).addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target as HTMLFormElement;
  const fd = new FormData(f);
  ocupado(f, async () => {
    const arq = fd.get('arq') as File;
    let bk: { formato?: string; config?: Config; itens?: Linha[] };
    try { bk = JSON.parse(await arq.text()); } catch { throw new Error('Arquivo inválido: não é um backup do cofre.'); }
    if (bk.formato !== 'cofre-colegio-exito' || !bk.config || !Array.isArray(bk.itens)) throw new Error('Arquivo inválido: não é um backup do cofre.');
    const k = await derivarChave(String(fd.get('m')), bk.config.salt, bk.config.iteracoes);
    if (!(await conferirSenha(k, bk.config.verificador))) throw new Error('Senha mestra incorreta para este backup.');
    const abertos: Aberto[] = [];
    for (const l of bk.itens) abertos.push({ id: l.id, item: JSON.parse(await decifrar(k, l.dados)), atualizado_em: l.atualizado_em });
    f.reset();
    somenteLeitura = true;
    chave = k;
    itens = abertos;
    ultimoUso = Date.now();
    tela('cofre');
    render();
  });
});

// ---------------------------------------------------------------- ferramentas
$('btnBackup').onclick = () =>
  ocupado($('btnBackup') as HTMLButtonElement, async () => {
    if (!sb || !config) return;
    const { data, error } = await sb.from('cofre_itens').select('id,dados,atualizado_em').order('criado_em');
    if (error) throw error;
    const bk = { formato: 'cofre-colegio-exito', versao: 1, gerado_em: new Date().toISOString(), gerado_por: email, config, itens: data };
    const url = URL.createObjectURL(new Blob([JSON.stringify(bk, null, 1)], { type: 'application/json' }));
    const a = el('a');
    a.href = url;
    a.download = `cofre-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    await sb.from('cofre_log').insert({ acao: 'baixou backup' });
    aviso('Backup baixado. Guarde fora deste computador.');
  });

($('fTrocar') as HTMLFormElement).addEventListener('input', (e) => {
  const t = e.target as HTMLInputElement;
  if (t.name === 'm1') medir(t.value, 'meterTrocar');
});
($('fTrocar') as HTMLFormElement).addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target as HTMLFormElement;
  const fd = new FormData(f);
  const m1 = String(fd.get('m1')), m2 = String(fd.get('m2'));
  const erro = validarMestra(m1, m2);
  if (erro) return aviso(erro, true);
  ocupado(f, async () => {
    if (!sb || !config) return;
    const atual = await derivarChave(String(fd.get('atual')), config.salt, config.iteracoes);
    if (!(await conferirSenha(atual, config.verificador))) throw new Error('A senha mestra atual está incorreta.');
    const { data, error } = await sb.from('cofre_itens').select('id,dados');
    if (error) throw error;
    const salt = novoSal();
    const nova = await derivarChave(m1, salt, ITERACOES_PADRAO);
    const recifrados = [];
    for (const l of (data ?? []) as Linha[]) {
      let texto: string;
      try { texto = await decifrar(atual, l.dados); } catch { throw new Error('Há contas que não abrem com a senha atual. Troca cancelada; nada foi alterado.'); }
      recifrados.push({ id: l.id, dados: await cifrar(nova, texto) });
    }
    const verificador = await cifrar(nova, VERIFICADOR);
    const r = await sb.rpc('cofre_trocar_mestra', { p_salt: salt, p_iteracoes: ITERACOES_PADRAO, p_verificador: verificador, p_itens: recifrados });
    if (r.error) throw r.error;
    config = { salt, iteracoes: ITERACOES_PADRAO, verificador };
    chave = nova;
    f.reset();
    medir('', 'meterTrocar');
    await carregarItens();
    aviso('Senha mestra trocada. Avise a equipe e baixe um backup novo.');
  });
});

$('btnLog').onclick = () =>
  ocupado($('btnLog') as HTMLButtonElement, async () => {
    if (!sb) return;
    const { data, error } = await sb.from('cofre_log').select('email,acao,item,em').order('em', { ascending: false }).limit(100);
    if (error) throw error;
    const nomes = new Map(itens.map((a) => [a.id, a.item.nome]));
    const fmt = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
    $('log').replaceChildren(
      ...(data ?? []).map((l: { email: string; acao: string; item: string | null; em: string }) =>
        el('li', '', `${fmt.format(new Date(l.em))} · ${l.email} ${l.acao}${l.item ? ` “${nomes.get(l.item) ?? 'conta apagada'}”` : ''}`),
      ),
    );
    if (!data?.length) $('log').replaceChildren(el('li', '', 'Nada registrado ainda.'));
  });

// ---------------------------------------------------------------- topo, navegação e tranca automática
$('btnLock').onclick = () => trancar('Cofre trancado.');
$('btnSair').onclick = async () => {
  trancar();
  await sb?.auth.signOut();
  email = '';
  config = null;
  tela('login');
};
($('busca') as HTMLInputElement).addEventListener('input', render);
document.querySelectorAll<HTMLElement>('[data-ir]').forEach((b) =>
  b.addEventListener('click', () => (b.dataset.ir === 'backup' ? tela('backup') : inicio().catch((e) => aviso(traduz(e), true)))),
);

['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach((ev) => window.addEventListener(ev, () => (ultimoUso = Date.now()), { passive: true }));
setInterval(() => { if (chave && Date.now() - ultimoUso > TRANCA_INATIVO_MS) trancar('Cofre trancado por inatividade.'); }, 15_000);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) ocultoDesde = Date.now();
  else if (chave && ocultoDesde && Date.now() - ocultoDesde > TRANCA_OCULTO_MS) trancar('Cofre trancado: a aba ficou em segundo plano.');
});
window.addEventListener('pagehide', () => { chave = null; itens = []; });

inicio().catch((e) => { aviso(traduz(e), true); tela(SB_URL && SB_KEY ? 'login' : 'sem-config'); });
