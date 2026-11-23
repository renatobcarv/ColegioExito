// Painel de cadastros TEC Mais (/admin/cadastros). Lê a tabela tec_cadastros com o login da equipe;
// as regras de acesso (RLS) ficam no Supabase. Dados dos alunos nunca vão para innerHTML.
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

type Cad = {
  id: string; criado_em: string; curso: string; nome: string; cpf: string | null; nascimento: string | null;
  nome_mae: string | null; genero: string | null; grau_instrucao: string | null; estado_civil: string | null;
  estado_natal: string | null; cidade_natal: string | null; cep: string | null; numero: string | null; rua: string | null;
  bairro: string | null; complemento: string | null; cidade: string | null; estado: string | null; email: string | null;
  celular: string; celular_whatsapp: boolean; fixo: string | null; origem: string | null; consentimento_em: string;
  status: string; observacao: string | null; atualizado_em: string | null; atualizado_por: string | null;
};
type Tela = 'sem-config' | 'login' | 'sem-acesso' | 'painel';

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const app = $('app');
const SB_URL = app.dataset.sbUrl || '';
const SB_KEY = app.dataset.sbKey || '';
const STATUS: string[] = JSON.parse(app.dataset.status || '[]');

let sb: SupabaseClient | null = null;
let lista: Cad[] = [];
let filtroStatus = '';
let aberto: Cad | null = null;

// ---------------------------------------------------------------- formatos
const fmtData = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
const fmtDia = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' });
const tel = (d?: string | null) => !d ? '' : d.length === 11 ? `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}` : d.length === 10 ? `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}` : d;
const cpf = (d?: string | null) => (d && d.length === 11 ? `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}` : d ?? '');
const cep = (d?: string | null) => (d && d.length === 8 ? `${d.slice(0, 5)}-${d.slice(5)}` : d ?? '');
const nasc = (d?: string | null) => (d ? fmtDia.format(new Date(`${d}T00:00:00Z`)) : '');
const idade = (d?: string | null) => { if (!d) return ''; const n = new Date(`${d}T12:00:00`); const h = new Date(); let a = h.getFullYear() - n.getFullYear(); if (h < new Date(h.getFullYear(), n.getMonth(), n.getDate())) a--; return `${a} anos`; };
const waLink = (c: Cad) => `https://wa.me/55${c.celular}?text=${encodeURIComponent(`Olá, ${c.nome.split(' ')[0]}! Aqui é da TEC Mais. Recebemos seu cadastro para ${c.curso} e queremos te ajudar a garantir sua vaga.`)}`;
const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls = '', texto = ''): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (texto) e.textContent = texto;
  return e;
}

// ---------------------------------------------------------------- telas e avisos
function tela(t: Tela, email = '') {
  document.querySelectorAll<HTMLElement>('[data-tela]').forEach((s) => (s.hidden = s.dataset.tela !== t));
  $('topActs').hidden = !email;
  $('who').textContent = email;
}
function aviso(texto: string, erro = false) {
  const m = $('msg');
  m.textContent = texto;
  m.hidden = !texto;
  m.classList.toggle('is-err', erro);
  if (texto && !erro) setTimeout(() => m.textContent === texto && (m.hidden = true), 3500);
}
function traduz(e: unknown) {
  const t = e instanceof Error ? e.message : String((e as { message?: string })?.message ?? e);
  if (/Invalid login credentials/i.test(t)) return 'E-mail ou senha incorretos.';
  if (/Failed to fetch|NetworkError|Load failed/i.test(t)) return 'Sem conexão com o servidor.';
  if (/does not exist|schema cache/i.test(t)) return 'As tabelas do cadastro ainda não existem no Supabase. Rode supabase/migrations/0005_cadastros.sql.';
  return t;
}

// ---------------------------------------------------------------- início
async function inicio() {
  if (!SB_URL || !SB_KEY) return tela('sem-config');
  sb ??= createClient(SB_URL, SB_KEY, { auth: { storage: window.sessionStorage, persistSession: true, autoRefreshToken: true } });
  const { data } = await sb.auth.getSession();
  if (!data.session) return tela('login');
  const email = data.session.user.email ?? '';
  const eq = await sb.from('tec_equipe').select('email').limit(1);
  if (eq.error) throw eq.error;
  if (!eq.data?.length) return tela('sem-acesso', email);
  tela('painel', email);
  await carregar();
}

async function carregar() {
  if (!sb) return;
  const { data, error } = await sb.from('tec_cadastros').select('*').order('criado_em', { ascending: false }).limit(2000);
  if (error) throw error;
  lista = (data ?? []) as Cad[];
  const cursos = [...new Set(lista.map((c) => c.curso))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
  const sel = $<HTMLSelectElement>('fCurso');
  const atual = sel.value;
  sel.replaceChildren(new Option('Todos os cursos', ''), ...cursos.map((c) => new Option(c, c)));
  sel.value = cursos.includes(atual) ? atual : '';
  render();
}

// ---------------------------------------------------------------- lista
function filtrados() {
  const b = norm($<HTMLInputElement>('busca').value.trim());
  const bd = b.replace(/\D/g, '');
  const curso = $<HTMLSelectElement>('fCurso').value;
  const dias = +$<HTMLSelectElement>('fPeriodo').value;
  const desde = dias ? Date.now() - dias * 864e5 : 0;
  return lista.filter((c) =>
    (!curso || c.curso === curso) &&
    (!desde || new Date(c.criado_em).getTime() >= desde) &&
    (!b || norm([c.nome, c.email, c.cidade, c.bairro, c.nome_mae].filter(Boolean).join(' ')).includes(b) || (bd.length >= 3 && [c.cpf, c.celular, c.fixo].some((x) => x?.includes(bd)))),
  );
}

function render() {
  const base = filtrados();
  const porStatus = new Map<string, number>();
  base.forEach((c) => porStatus.set(c.status, (porStatus.get(c.status) ?? 0) + 1));
  const vis = filtroStatus ? base.filter((c) => c.status === filtroStatus) : base;
  const cpfs = new Map<string, number>();
  lista.forEach((c) => c.cpf && cpfs.set(c.cpf, (cpfs.get(c.cpf) ?? 0) + 1));

  // indicadores
  const semana = lista.filter((c) => Date.now() - new Date(c.criado_em).getTime() < 7 * 864e5).length;
  const kp = (n: number | string, t: string) => { const li = el('li'); li.append(el('strong', '', String(n)), el('span', '', t)); return li; };
  $('kpis').replaceChildren(
    kp(lista.length, `cadastros no total · ${semana} nos últimos 7 dias`),
    ...STATUS.map((s) => kp(lista.filter((c) => c.status === s).length, s)),
  );

  // chips de status
  $('chips').replaceChildren(
    ...['', ...STATUS].map((s) => {
      const b = el('button', '', s || 'Todos');
      b.type = 'button';
      b.append(el('small', '', String(s ? porStatus.get(s) ?? 0 : base.length)));
      b.setAttribute('aria-pressed', String(filtroStatus === s));
      b.onclick = () => { filtroStatus = s; render(); };
      return b;
    }),
  );

  $('linhas').replaceChildren(
    ...vis.map((c) => {
      const tr = el('tr');
      tr.tabIndex = 0;
      tr.onclick = (e) => { if (!(e.target as HTMLElement).closest('a, select')) abrir(c); };
      tr.onkeydown = (e) => { if (e.key === 'Enter' && e.target === tr) abrir(c); };
      const tdNome = el('td', 'nome', c.nome);
      if (c.cpf && (cpfs.get(c.cpf) ?? 0) > 1) tdNome.append(el('span', 'dup', 'CPF repetido'));
      const tdCel = el('td', 'cel');
      const a = el('a', '', tel(c.celular));
      a.href = c.celular_whatsapp ? waLink(c) : `tel:+55${c.celular}`;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.title = c.celular_whatsapp ? 'Chamar no WhatsApp' : 'Ligar';
      tdCel.append(a);
      const tdSt = el('td', 'stt');
      tdSt.append(selectStatus(c));
      const tdAct = el('td', 'act');
      const ver = el('a', '', 'Ver ficha');
      ver.href = '#';
      ver.onclick = (e) => { e.preventDefault(); abrir(c); };
      tdAct.append(ver);
      tr.append(
        el('td', 'data', fmtData.format(new Date(c.criado_em))),
        tdNome,
        el('td', 'curso', c.curso),
        tdCel,
        el('td', 'cidade', [c.cidade, c.estado].filter(Boolean).join(' - ')),
        tdSt,
        tdAct,
      );
      return tr;
    }),
  );
  $('vazio').hidden = vis.length > 0;
  $('vazio').textContent = lista.length ? 'Nenhum cadastro com esses filtros.' : 'Ainda não há cadastros. Compartilhe o link /tec-mais/cadastro com os interessados.';
  $('sub').textContent = `${vis.length} de ${lista.length} cadastro(s) na tela.`;
}

function selectStatus(c: Cad) {
  const s = el('select');
  s.setAttribute('aria-label', `Status de ${c.nome}`);
  s.append(...STATUS.map((x) => new Option(x, x)));
  s.value = c.status;
  s.dataset.st = c.status;
  s.onchange = async () => {
    const novo = s.value;
    s.disabled = true;
    const { error } = await sb!.from('tec_cadastros').update({ status: novo }).eq('id', c.id);
    s.disabled = false;
    if (error) { s.value = c.status; return aviso(traduz(error), true); }
    c.status = novo;
    s.dataset.st = novo;
    aviso(`${c.nome.split(' ')[0]}: ${novo}.`);
    render();
    if (aberto?.id === c.id) $<HTMLSelectElement>('dlgStatus').value = novo;
  };
  return s;
}

// ---------------------------------------------------------------- ficha
const dlg = $<HTMLDialogElement>('dlg');
function abrir(c: Cad) {
  aberto = c;
  $('dlgT').textContent = c.nome;
  $('dlgSub').textContent = `${c.curso} · cadastrado em ${fmtData.format(new Date(c.criado_em))}${c.origem ? ` · origem: ${c.origem}` : ''}`;
  const wa = $<HTMLAnchorElement>('dlgWa');
  wa.href = waLink(c);
  wa.hidden = !c.celular_whatsapp;
  const st = $<HTMLSelectElement>('dlgStatus');
  st.replaceChildren(...STATUS.map((x) => new Option(x, x)));
  st.value = c.status;

  const linha = (k: string, v: string, copiar = false) => {
    const d = el('div');
    const dd = el('dd', '', v || '—');
    if (copiar && v) {
      const b = el('button', 'cp', 'copiar');
      b.type = 'button';
      b.onclick = () => navigator.clipboard.writeText(v.replace(/\D/g, '').length >= 8 && /^[\d.\-() ]+$/.test(v) ? v.replace(/\D/g, '') : v).then(() => aviso(`${k} copiado.`));
      dd.append(b);
    }
    d.append(el('dt', '', k), dd);
    return d;
  };
  const sec = (t: string) => el('section', '', t);
  const endereco = [c.rua, c.numero && `nº ${c.numero}`, c.complemento].filter(Boolean).join(', ');
  $('det').replaceChildren(
    sec('Dados pessoais'),
    linha('CPF', cpf(c.cpf), true),
    linha('Nascimento', c.nascimento ? `${nasc(c.nascimento)} (${idade(c.nascimento)})` : ''),
    linha('Nome da mãe', c.nome_mae ?? ''),
    linha('Gênero', c.genero ?? ''),
    linha('Estado civil', c.estado_civil ?? ''),
    linha('Instrução', c.grau_instrucao ?? ''),
    linha('Natural de', [c.cidade_natal, c.estado_natal].filter(Boolean).join(' - ')),
    sec('Endereço'),
    linha('CEP', cep(c.cep), true),
    linha('Endereço', endereco),
    linha('Bairro', c.bairro ?? ''),
    linha('Cidade', [c.cidade, c.estado].filter(Boolean).join(' - ')),
    sec('Contato'),
    linha('Celular', tel(c.celular) + (c.celular_whatsapp ? ' · WhatsApp' : ''), true),
    linha('Fixo', tel(c.fixo), true),
    linha('E-mail', c.email ?? '', true),
    linha('Autorização LGPD', fmtData.format(new Date(c.consentimento_em))),
    ...(c.atualizado_por ? [linha('Última alteração', `${c.atualizado_por} · ${fmtData.format(new Date(c.atualizado_em!))}`)] : []),
  );
  ($('fObs') as HTMLFormElement).obs.value = c.observacao ?? '';
  dlg.showModal();
}
$('btnFechar').onclick = () => dlg.close();
dlg.addEventListener('close', () => (aberto = null));
$<HTMLSelectElement>('dlgStatus').onchange = async (e) => {
  if (!aberto) return;
  const c = aberto;
  const novo = (e.target as HTMLSelectElement).value;
  const { error } = await sb!.from('tec_cadastros').update({ status: novo }).eq('id', c.id);
  if (error) return aviso(traduz(error), true);
  c.status = novo;
  aviso(`${c.nome.split(' ')[0]}: ${novo}.`);
  render();
};
$('fObs').addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!aberto) return;
  const c = aberto;
  const obs = (($('fObs') as HTMLFormElement).obs.value as string).trim();
  const { error } = await sb!.from('tec_cadastros').update({ observacao: obs || null }).eq('id', c.id);
  if (error) return aviso(traduz(error), true);
  c.observacao = obs || null;
  aviso('Observação salva.');
});
$('btnApagar').onclick = async () => {
  if (!aberto) return;
  const c = aberto;
  if (!confirm(`Apagar o cadastro de ${c.nome}? Use isso para pedidos de exclusão de dados (LGPD) ou cadastros de teste. Não dá para desfazer.`)) return;
  const { error } = await sb!.from('tec_cadastros').delete().eq('id', c.id);
  if (error) return aviso(traduz(error), true);
  lista = lista.filter((x) => x.id !== c.id);
  dlg.close();
  render();
  aviso('Cadastro apagado.');
};

// ---------------------------------------------------------------- planilha (CSV para Excel/Google Sheets)
$('btnCsv').onclick = () => {
  const vis = (filtroStatus ? filtrados().filter((c) => c.status === filtroStatus) : filtrados());
  const cols: [string, (c: Cad) => string][] = [
    ['Data', (c) => fmtData.format(new Date(c.criado_em))], ['Status', (c) => c.status], ['Curso', (c) => c.curso], ['Nome', (c) => c.nome],
    ['CPF', (c) => cpf(c.cpf)], ['Nascimento', (c) => nasc(c.nascimento)], ['Nome da mãe', (c) => c.nome_mae ?? ''], ['Gênero', (c) => c.genero ?? ''],
    ['Estado civil', (c) => c.estado_civil ?? ''], ['Grau de instrução', (c) => c.grau_instrucao ?? ''], ['Estado natal', (c) => c.estado_natal ?? ''],
    ['Cidade natal', (c) => c.cidade_natal ?? ''], ['CEP', (c) => cep(c.cep)], ['Rua', (c) => c.rua ?? ''], ['Número', (c) => c.numero ?? ''],
    ['Complemento', (c) => c.complemento ?? ''], ['Bairro', (c) => c.bairro ?? ''], ['Cidade', (c) => c.cidade ?? ''], ['Estado', (c) => c.estado ?? ''],
    ['Celular', (c) => tel(c.celular)], ['WhatsApp', (c) => (c.celular_whatsapp ? 'Sim' : 'Não')], ['Fixo', (c) => tel(c.fixo)], ['E-mail', (c) => c.email ?? ''],
    ['Origem', (c) => c.origem ?? ''], ['Observações', (c) => c.observacao ?? ''],
  ];
  // células que começam com = + - @ viram texto (evita fórmula maliciosa no Excel)
  const cel = (v: string) => `"${(/^[=+\-@]/.test(v) ? `'${v}` : v).replace(/"/g, '""')}"`;
  const csv = [cols.map(([k]) => cel(k)).join(';'), ...vis.map((c) => cols.map(([, f]) => cel(f(c))).join(';'))].join('\r\n');
  const url = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }));
  const a = el('a');
  a.href = url;
  a.download = `cadastros-tec-mais-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
  aviso(`${vis.length} cadastro(s) na planilha. Ela tem dados pessoais: não compartilhe fora da equipe.`);
};

// ---------------------------------------------------------------- eventos
$('fLogin').addEventListener('submit', async (e) => {
  e.preventDefault();
  const f = e.target as HTMLFormElement;
  const fd = new FormData(f);
  const btn = f.querySelector('button')!;
  btn.disabled = true;
  try {
    const { error } = await sb!.auth.signInWithPassword({ email: String(fd.get('email')), password: String(fd.get('senha')) });
    if (error) throw error;
    f.reset();
    aviso('');
    await inicio();
  } catch (err) {
    aviso(traduz(err), true);
  } finally {
    btn.disabled = false;
  }
});
$('btnSair').onclick = async () => { await sb?.auth.signOut(); lista = []; $('linhas').replaceChildren(); tela('login'); };
$('btnAtualizar').onclick = () => carregar().then(() => aviso('Lista atualizada.')).catch((e) => aviso(traduz(e), true));
['busca', 'fCurso', 'fPeriodo'].forEach((id) => $(id).addEventListener('input', render));

inicio().catch((e) => { aviso(traduz(e), true); tela(SB_URL && SB_KEY ? 'login' : 'sem-config'); });
