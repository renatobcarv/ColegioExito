// Cadastro de estudante TEC Mais: etapas, máscaras, CEP automático e envio para o Supabase
// (função tec_cadastrar). Sem Supabase, ou se ele falhar, manda os dados pelo WhatsApp como o cadastro antigo.

const root = document.querySelector<HTMLElement>('.cad')!;
const form = document.getElementById('fCad') as HTMLFormElement;
const SB_URL = root.dataset.sbUrl || '';
const SB_KEY = root.dataset.sbKey || '';
const WA = root.dataset.wa || '';
const W = window as unknown as { exitoWa?: (u: string) => string; exitoTrack?: (n: string, p?: object) => void };

const campo = <T extends HTMLElement = HTMLInputElement>(name: string) => form.elements.namedItem(name) as unknown as T;
const val = (name: string) => (campo(name)?.value ?? '').trim();
const dig = (s: string, max = 20) => s.replace(/\D/g, '').slice(0, max);
const errBox = document.getElementById('cadErr')!;

// ---------------------------------------------------------------- máscaras
const MASK: Record<string, (d: string) => string> = {
  cpf: (v) => { const d = dig(v, 11); return d.length > 9 ? `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}` : d.length > 6 ? `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}` : d.length > 3 ? `${d.slice(0, 3)}.${d.slice(3)}` : d; },
  data: (v) => { const d = dig(v, 8); return d.length > 4 ? `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}` : d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d; },
  cep: (v) => { const d = dig(v, 8); return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d; },
  tel: (v) => { const d = dig(v, 11); return d.length > 10 ? `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}` : d.length > 6 ? `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}` : d.length > 2 ? `(${d.slice(0, 2)}) ${d.slice(2)}` : d; },
};
form.querySelectorAll<HTMLInputElement>('[data-mask]').forEach((i) =>
  i.addEventListener('input', () => { i.value = MASK[i.dataset.mask!](i.value); i.classList.remove('is-bad'); }),
);
form.addEventListener('input', (e) => (e.target as HTMLElement).classList?.remove('is-bad'));

// ---------------------------------------------------------------- validações
function cpfValido(c: string): boolean {
  const d = dig(c, 11);
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
  const dv = (n: number) => { let s = 0; for (let i = 0; i < n; i++) s += +d[i] * (n + 1 - i); const r = (s * 10) % 11; return r === 10 ? 0 : r; };
  return dv(9) === +d[9] && dv(10) === +d[10];
}
function dataISO(br: string): string | null {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(br);
  if (!m) return null;
  const [, dd, mm, yy] = m;
  const dt = new Date(`${yy}-${mm}-${dd}T12:00:00`);
  if (Number.isNaN(dt.getTime()) || dt.getDate() !== +dd || +yy < 1920 || dt > new Date()) return null;
  return `${yy}-${mm}-${dd}`;
}
const emailValido = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);

function erro(msg: string, el?: HTMLElement | null) {
  errBox.textContent = msg;
  errBox.hidden = !msg;
  if (el) { el.classList.add('is-bad'); el.focus({ preventScroll: true }); }
  if (msg) errBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function validar(etapa: number): boolean {
  erro('');
  if (etapa === 1) {
    if (!val('curso')) return erro('Escolha o curso de interesse.', campo('curso')), false;
    if (val('nome').split(/\s+/).filter(Boolean).length < 2) return erro('Digite o nome completo (nome e sobrenome).', campo('nome')), false;
    if (val('cpf') && !cpfValido(val('cpf'))) return erro('Esse CPF não parece correto. Confira os números ou deixe em branco.', campo('cpf')), false;
    if (val('nascimento') && !dataISO(val('nascimento'))) return erro('Data de nascimento inválida. Use DD/MM/AAAA.', campo('nascimento')), false;
  }
  if (etapa === 2) {
    if (val('cep') && dig(val('cep')).length !== 8) return erro('O CEP tem 8 números.', campo('cep')), false;
  }
  if (etapa === 3) {
    const cel = dig(val('celular'));
    if (cel.length < 10) return erro('Digite o celular com DDD.', campo('celular')), false;
    if (val('fixo') && dig(val('fixo')).length < 10) return erro('Telefone fixo incompleto. Confira ou deixe em branco.', campo('fixo')), false;
    if (val('email') && !emailValido(val('email'))) return erro('Esse e-mail não parece correto.', campo('email')), false;
    const lg = campo('consentimento') as HTMLInputElement;
    if (!lg.checked) { lg.closest('label')?.classList.add('is-bad'); erro('Para enviar, marque a autorização de uso dos dados.'); lg.focus(); return false; }
    lg.closest('label')?.classList.remove('is-bad');
  }
  return true;
}

// ---------------------------------------------------------------- etapas
let atual = 1;
function irPara(n: number) {
  if (n > atual) for (let e = atual; e < n; e++) if (!validar(e)) return;
  atual = n;
  form.querySelectorAll<HTMLElement>('.cad__panel').forEach((p) => p.classList.toggle('is-on', +p.dataset.panel! === n));
  document.querySelectorAll<HTMLElement>('.cad__steps li').forEach((li) => {
    const s = +li.dataset.step!;
    li.classList.toggle('is-on', s === n);
    li.classList.toggle('is-done', s < n);
    if (s === n) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
  });
  erro('');
  document.querySelector('.cad__steps')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const primeiro = form.querySelector<HTMLInputElement>(`[data-panel="${n}"] ${n === 2 ? '[name=cep]' : 'input:not([type=radio]):not([type=checkbox]), select'}`);
  setTimeout(() => primeiro?.focus({ preventScroll: true }), 350);
}
form.querySelectorAll<HTMLButtonElement>('[data-go]').forEach((b) => b.addEventListener('click', () => irPara(+b.dataset.go!)));
// Enter num campo avança a etapa em vez de enviar
form.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && (e.target as HTMLElement).tagName === 'INPUT' && atual < 3) { e.preventDefault(); irPara(atual + 1); }
});

// curso já escolhido pelo link (?curso=enfermagem)
const pre = new URLSearchParams(location.search).get('curso');
if (pre) {
  const sel = campo<HTMLSelectElement>('curso');
  const opt = [...sel.options].find((o) => o.dataset.slug === pre || o.value.toLowerCase() === pre.toLowerCase());
  if (opt) sel.value = opt.value;
}

// ---------------------------------------------------------------- sem número
const semNumero = document.getElementById('semNumero') as HTMLInputElement;
semNumero.addEventListener('change', () => {
  const n = campo('numero');
  n.disabled = semNumero.checked;
  if (semNumero.checked) n.value = ''; else n.focus();
});

// ---------------------------------------------------------------- CEP automático (ViaCEP)
const UF: Record<string, string> = { AC: 'Acre', AL: 'Alagoas', AP: 'Amapá', AM: 'Amazonas', BA: 'Bahia', CE: 'Ceará', DF: 'Distrito Federal', ES: 'Espírito Santo', GO: 'Goiás', MA: 'Maranhão', MT: 'Mato Grosso', MS: 'Mato Grosso do Sul', MG: 'Minas Gerais', PA: 'Pará', PB: 'Paraíba', PR: 'Paraná', PE: 'Pernambuco', PI: 'Piauí', RJ: 'Rio de Janeiro', RN: 'Rio Grande do Norte', RS: 'Rio Grande do Sul', RO: 'Rondônia', RR: 'Roraima', SC: 'Santa Catarina', SP: 'São Paulo', SE: 'Sergipe', TO: 'Tocantins' };
const hint = document.getElementById('cepHint')!;
const dica = (t: string, c = '') => { hint.textContent = t; hint.className = `cad__hint ${c}`; };
let cepReq = 0;
campo('cep').addEventListener('input', async () => {
  const d = dig(val('cep'), 8);
  if (d.length < 8) return dica('');
  const eu = ++cepReq;
  dica('Buscando endereço…');
  try {
    const r = await fetch(`https://viacep.com.br/ws/${d}/json/`, { signal: AbortSignal.timeout(8000) });
    const j = await r.json();
    if (eu !== cepReq) return;
    if (j.erro) return dica('CEP não encontrado. Preencha o endereço manualmente.', 'warn');
    if (j.logradouro) campo('rua').value = j.logradouro;
    if (j.bairro) campo('bairro').value = j.bairro;
    if (j.localidade) campo('cidade').value = j.localidade;
    if (j.uf) campo('estado').value = UF[j.uf] || j.uf;
    dica('Endereço preenchido. Agora o número.', 'ok');
    if (!semNumero.checked) campo('numero').focus();
  } catch {
    if (eu === cepReq) dica('Não deu para buscar o CEP agora. Preencha manualmente.', 'warn');
  }
});

// ---------------------------------------------------------------- envio
function dados() {
  let origem = '';
  try {
    const u = JSON.parse(sessionStorage.getItem('exito-utm') || 'null');
    if (u) origem = [u.utm_source, u.utm_medium, u.utm_campaign].filter(Boolean).join(' / ');
  } catch { /* sem sessionStorage */ }
  if (!origem && document.referrer) { try { origem = new URL(document.referrer).hostname; } catch { /* referrer inválido */ } }
  return {
    site: val('site'),
    curso: val('curso'),
    nome: val('nome').replace(/\s+/g, ' '),
    cpf: dig(val('cpf'), 11),
    nascimento: dataISO(val('nascimento')) ?? '',
    nome_mae: val('nome_mae'),
    genero: val('genero'),
    grau_instrucao: val('grau_instrucao'),
    estado_civil: (form.querySelector<HTMLInputElement>('input[name=estado_civil]:checked')?.value ?? ''),
    estado_natal: val('estado_natal'),
    cidade_natal: val('cidade_natal'),
    cep: dig(val('cep'), 8),
    numero: semNumero.checked ? 's/n' : val('numero'),
    rua: val('rua'),
    bairro: val('bairro'),
    complemento: val('complemento'),
    cidade: val('cidade'),
    estado: val('estado'),
    email: val('email'),
    celular: dig(val('celular'), 11),
    celular_whatsapp: (campo('celular_whatsapp') as HTMLInputElement).checked,
    fixo: dig(val('fixo'), 11),
    origem: origem || 'site',
    consentimento: (campo('consentimento') as HTMLInputElement).checked,
  };
}

const linkWa = (texto: string) => { const raw = `https://wa.me/${WA}?text=${encodeURIComponent(texto)}`; return W.exitoWa ? W.exitoWa(raw) : raw; };

// plano B (igual ao cadastro antigo): manda tudo no WhatsApp da TEC Mais
function textoCompleto(p: ReturnType<typeof dados>) {
  const l = (k: string, v: string) => `${k}: ${v || '-'}`;
  return [
    '*NOVO CADASTRO - TEC MAIS*', '',
    l('Curso', p.curso), '', '*Dados pessoais*',
    l('Nome', p.nome), l('CPF', MASK.cpf(p.cpf)), l('Nascimento', val('nascimento')), l('Nome da mãe', p.nome_mae),
    l('Gênero', p.genero), l('Estado civil', p.estado_civil), l('Grau de instrução', p.grau_instrucao),
    l('Natural de', [p.cidade_natal, p.estado_natal].filter(Boolean).join(' - ')), '', '*Endereço*',
    l('CEP', MASK.cep(p.cep)), l('Rua', p.rua), l('Número', p.numero), l('Complemento', p.complemento),
    l('Bairro', p.bairro), l('Cidade', [p.cidade, p.estado].filter(Boolean).join(' - ')), '', '*Contato*',
    l('Celular', MASK.tel(p.celular) + (p.celular_whatsapp ? ' (WhatsApp)' : '')), l('Fixo', MASK.tel(p.fixo)), l('E-mail', p.email),
  ].join('\n');
}

/** pendente = o cadastro não chegou ao banco: o aluno precisa tocar no botão para mandar a ficha pelo WhatsApp. */
function concluir(p: ReturnType<typeof dados>, pendente = false) {
  form.querySelectorAll<HTMLElement>('.cad__panel').forEach((x) => x.classList.remove('is-on'));
  document.querySelectorAll<HTMLElement>('.cad__steps li').forEach((li) => { li.classList.remove('is-on'); li.classList.add('is-done'); });
  const done = document.getElementById('cadDone')!;
  document.getElementById('doneNome')!.textContent = p.nome.split(' ')[0];
  document.getElementById('doneCurso')!.textContent = p.curso;
  const wa = document.getElementById('doneWa') as HTMLAnchorElement;
  wa.href = pendente ? linkWa(textoCompleto(p)) : linkWa(`Olá! Acabei de fazer meu cadastro no site para ${p.curso}. Meu nome é ${p.nome}.`);
  if (pendente) {
    done.querySelector('h2')!.textContent = `Falta 1 toque, ${p.nome.split(' ')[0]}!`;
    done.querySelector('p')!.textContent = 'Toque no botão abaixo para enviar seu cadastro pelo WhatsApp da TEC Mais. A mensagem já vai pronta, é só enviar.';
    wa.lastChild!.textContent = 'Enviar meu cadastro pelo WhatsApp';
  }
  done.hidden = false;
  done.focus({ preventScroll: true });
  document.querySelector('.cad__steps')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  for (const etapa of [1, 2, 3]) if (!validar(etapa)) { if (etapa !== atual) irPara(etapa), validar(etapa); return; }
  const p = dados();
  const btn = form.querySelector<HTMLButtonElement>('.cad__send')!;
  btn.disabled = true;
  btn.lastChild!.textContent = 'Enviando…';
  try {
    if (!SB_URL || !SB_KEY) throw new Error('sem-supabase');
    const r = await fetch(`${SB_URL}/rest/v1/rpc/tec_cadastrar`, {
      method: 'POST',
      headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p }),
      signal: AbortSignal.timeout(15000),
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}: ${(await r.text()).slice(0, 200)}`);
    W.exitoTrack?.('generate_lead', { form: 'cadastro_tec', course: p.curso, page: location.pathname });
    concluir(p);
  } catch (err) {
    // falhou o banco: não perde o aluno, manda pelo WhatsApp como antes
    console.warn('Cadastro: envio ao Supabase falhou, usando WhatsApp.', err);
    W.exitoTrack?.('generate_lead', { form: 'cadastro_tec_wa', course: p.curso, page: location.pathname });
    // sem 'noopener' na chamada (com ele o navegador sempre devolve null); a referência é cortada logo depois
    const janela = window.open(linkWa(textoCompleto(p)), '_blank');
    if (janela) janela.opener = null;
    concluir(p, !janela);
  } finally {
    btn.disabled = false;
    btn.lastChild!.textContent = 'Enviar cadastro';
  }
});
