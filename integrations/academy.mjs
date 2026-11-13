// TEC Mais Academy (Portal do Aluno) · build da área de membros
//
// - O app (academy-src/app) vai ao ar aberto: só tem a "casca", o catálogo e a tela de login.
// - O conteúdo de cada módulo (academy-src/conteudo/<módulo>.json) e o PDF são CIFRADOS (AES-256-GCM)
//   com a chave do módulo. As chaves ficam na tabela academy_chaves do Supabase; o aluno logado só
//   recebe as chaves dos módulos liberados para o e-mail dele (academy_acessos + RLS).
// - Chaves no build: lidas do Supabase com a chave secreta (SUPABASE_SERVICE_ROLE_KEY ou SUPABASE_SECRET_KEY).
//   Para testes locais: ACADEMY_KEYS_JSON='{"calculo":"<base64>", ...}'.
// - Fotos: itens com "foto": "<busca>" ganham imagem. Primeiro procura uma foto própria em
//   academy-src/img/<slug>.(webp|jpg|png); se não houver, busca no Openverse (banco aberto de imagens
//   Creative Commons, código no GitHub), só com licenças que permitem uso comercial, baixa e publica
//   no próprio site com o crédito do autor. Sem foto, fica a ilustração.
import { readFile, writeFile, mkdir, readdir, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { webcrypto as crypto } from 'node:crypto';
import path from 'node:path';

const BASE = '/tec-mais/academy/';
const REDIRECTS = { 'guia-visual.html': 'materiais', 'oportunidades.html': 'antes', 'guia-calculos.html': 'guia' };
const LICENSES = 'cc0,pdm,by,by-sa';
const LICENSE_NAME = { cc0: 'CC0', pdm: 'Domínio público', by: 'CC BY', 'by-sa': 'CC BY-SA' };
const env = (...k) => k.map((x) => process.env[x]).find(Boolean);
const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

async function encrypt(bytes, keyB64) {
  const key = await crypto.subtle.importKey('raw', Buffer.from(keyB64, 'base64'), 'AES-GCM', false, ['encrypt']);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, bytes));
  return Buffer.concat([Buffer.from(iv), Buffer.from(ct)]);
}

async function loadKeys(sbUrl, logger) {
  if (process.env.ACADEMY_KEYS_JSON) return JSON.parse(process.env.ACADEMY_KEYS_JSON);
  const secret = env('SUPABASE_SERVICE_ROLE_KEY', 'SUPABASE_SECRET_KEY');
  if (!sbUrl || !secret) { logger.warn('Sem SUPABASE_SERVICE_ROLE_KEY: módulos publicados sem conteúdo (aparecem "em preparação").'); return {}; }
  try {
    const r = await fetch(`${sbUrl}/rest/v1/academy_chaves?select=modulo,chave`, { headers: { apikey: secret, Authorization: `Bearer ${secret}` }, signal: AbortSignal.timeout(15000) });
    if (!r.ok) throw new Error(`HTTP ${r.status} ${await r.text()}`);
    return Object.fromEntries((await r.json()).map((x) => [x.modulo, x.chave]));
  } catch (e) {
    logger.warn(`Não consegui ler as chaves do Supabase (${e.message}). Rode supabase/migrations/0003_academy.sql.`);
    return {};
  }
}

/** Resolve { foto: "busca" } → { img: { src, credito, link } } (foto própria > Openverse > nada). */
async function makePhotos(out, src, logger) {
  const dir = path.join(out, 'img');
  await mkdir(dir, { recursive: true });
  const own = existsSync(path.join(src, 'img')) ? await readdir(path.join(src, 'img')) : [];
  const cache = new Map();
  let fromBank = 0, fromOwn = 0, missing = 0;
  async function resolve(q) {
    if (cache.has(q)) return cache.get(q);
    const s = slug(q);
    const mine = own.find((f) => f.replace(/\.(webp|jpe?g|png)$/i, '') === s);
    let res = null;
    if (mine) {
      await copyFile(path.join(src, 'img', mine), path.join(dir, mine));
      res = { src: `img/${mine}`, credito: 'Foto: TEC Mais' }; fromOwn++;
    } else {
      try {
        const r = await fetch(`https://api.openverse.org/v1/images/?q=${encodeURIComponent(q)}&license=${LICENSES}&page_size=5&mature=false`, { headers: { 'User-Agent': 'TecMaisAcademy/1.0 (site escolar)' }, signal: AbortSignal.timeout(12000) });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const hit = (await r.json()).results?.find((x) => x.id && x.license);
        if (hit) {
          const t = await fetch(`https://api.openverse.org/v1/images/${hit.id}/thumb/`, { signal: AbortSignal.timeout(15000) });
          if (!t.ok) throw new Error(`thumb HTTP ${t.status}`);
          const ext = (t.headers.get('content-type') || '').includes('png') ? 'png' : (t.headers.get('content-type') || '').includes('webp') ? 'webp' : 'jpg';
          await writeFile(path.join(dir, `${s}.${ext}`), Buffer.from(await t.arrayBuffer()));
          res = { src: `img/${s}.${ext}`, credito: `Foto: ${hit.creator || 'autor desconhecido'} · ${LICENSE_NAME[hit.license] || hit.license.toUpperCase()} · via Openverse`, link: hit.foreign_landing_url || hit.url };
          fromBank++;
        }
      } catch (e) { logger.warn(`Foto "${q}": ${e.message}`); }
      if (!res) missing++;
    }
    cache.set(q, res);
    return res;
  }
  async function walk(o) {
    if (Array.isArray(o)) { for (const x of o) await walk(x); return; }
    if (!o || typeof o !== 'object') return;
    if (typeof o.foto === 'string') { const img = await resolve(o.foto); if (img) o.img = img; delete o.foto; }
    for (const v of Object.values(o)) await walk(v);
  }
  return { walk, report: () => `${fromOwn} próprias, ${fromBank} do Openverse, ${missing} sem foto (fica a ilustração)` };
}

const redirect = (lesson) => `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="robots" content="noindex, nofollow">
<title>TEC Mais Academy</title><meta http-equiv="refresh" content="0;url=${BASE}#/aula/${lesson}"><script>location.replace("${BASE}#/aula/${lesson}")</script></head><body></body></html>`;

export default function academy() {
  return {
    name: 'tecmais-academy',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const out = path.join(fileURLToPath(dir), 'tec-mais', 'academy');
        await mkdir(path.join(out, 'm'), { recursive: true });
        const src = path.resolve('academy-src');
        for (const [file, lesson] of Object.entries(REDIRECTS)) await writeFile(path.join(out, file), redirect(lesson));

        const sbUrl = env('NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_URL', 'PUBLIC_SUPABASE_URL');
        const sbKey = env('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY', 'NEXT_PUBLIC_SUPABASE_ANON_KEY', 'SUPABASE_PUBLISHABLE_KEY', 'SUPABASE_ANON_KEY');
        const keys = await loadKeys(sbUrl, logger);
        const photos = await makePhotos(out, src, logger);

        // conteúdo de cada módulo → m/<módulo>.bin
        const published = [];
        for (const f of (await readdir(path.join(src, 'conteudo'))).filter((x) => x.endsWith('.json'))) {
          const mod = f.replace(/\.json$/, '');
          if (!keys[mod]) { logger.warn(`Módulo "${mod}" sem chave: não publicado.`); continue; }
          const data = JSON.parse(await readFile(path.join(src, 'conteudo', f), 'utf8'));
          await photos.walk(data);
          await writeFile(path.join(out, 'm', `${mod}.bin`), await encrypt(Buffer.from(JSON.stringify(data)), keys[mod]));
          published.push(mod);
        }
        if (keys.calculo) await writeFile(path.join(out, 'm', 'guia-calculos.bin'), await encrypt(await readFile(path.join(src, 'guia-calculos.pdf')), keys.calculo));

        // app aberto (casca + catálogo + login)
        const read = (f) => readFile(path.join(src, 'app', f), 'utf8');
        const safe = (js) => js.replaceAll('</script', '<\\/script');
        const [shell, css, catalogo, app] = await Promise.all(['shell.html', 'app.css', 'catalogo.js', 'app.js'].map(read));
        const cfg = `window.TMA_CFG=${JSON.stringify({ sb: { url: sbUrl || '', key: sbKey || '' }, mods: published })};`;
        const page = shell
          .replace('<head>', `<head><base href="${BASE}">`)
          .replace('/*__CSS__*/', () => css)
          .replace('/*__CFG__*/', () => cfg)
          .replace('/*__CONTEUDO__*/', () => safe(catalogo))
          .replace('/*__APP__*/', () => safe(app));
        await writeFile(path.join(out, 'index.html'), page);
        logger.info(`Portal do Aluno: ${published.length} módulos cifrados (${published.join(', ') || 'nenhum'}). Fotos: ${photos.report()}.`);
        if (!sbUrl || !sbKey) logger.warn('Sem NEXT_PUBLIC_SUPABASE_URL/PUBLISHABLE_KEY: a tela de login fica desativada.');
      },
    },
  };
}
