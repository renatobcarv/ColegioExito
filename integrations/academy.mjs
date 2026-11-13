// Portal do Aluno TEC Mais (TEC Mais Academy): área de membros criptografada no build.
// Fonte: academy-src/app (shell.html + app.css + conteudo.js + app.js) e academy-src/guia-calculos.pdf.
// Senha: variável ACADEMY_PASSWORD (Vercel → Settings → Environment Variables).
// No ar vão só a tela de senha + o app e o PDF cifrados (AES-256-GCM, chave PBKDF2-SHA-256).
// Sem a variável, publica apenas um aviso de "portal indisponível" (nenhum conteúdo vai ao ar).
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { webcrypto as crypto } from 'node:crypto';
import path from 'node:path';

const ITER = 250000;
// Base fixa: na Vercel o portal abre em /tec-mais/academy (sem barra final) e links relativos quebravam.
const BASE = '/tec-mais/academy/';
const b64 = (u8) => Buffer.from(u8).toString('base64');
// Endereços do portal antigo → aula equivalente no app novo
const REDIRECTS = { 'guia-visual.html': 'materiais', 'oportunidades.html': 'antes', 'guia-calculos.html': 'guia' };

async function encrypt(bytes, password, salt) {
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: ITER, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt']);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, bytes));
  return { iv: b64(iv), ct };
}

function gate({ payload, salt, iv, locked }) {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<base href="${BASE}"><meta name="robots" content="noindex, nofollow, noarchive"><meta name="theme-color" content="#00003D"><title>Entrar · TEC Mais Academy</title>
<link rel="stylesheet" href="fonts/fonts.css">
<style>
*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px 16px;font-family:Geist,system-ui,sans-serif;color:#0D0D45;
background:radial-gradient(55% 60% at 100% 0%,rgba(240,96,34,.5),transparent 65%),radial-gradient(45% 55% at 0% 100%,rgba(70,90,255,.4),transparent 70%),linear-gradient(135deg,#1A1A8C,#000066 55%,#00003D)}
body::before{content:"";position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:44px 44px;mask-image:radial-gradient(70% 70% at 50% 40%,#000,transparent);pointer-events:none}
.w{position:relative;width:min(430px,100%)}
.c{background:#fff;border-radius:28px;padding:34px 30px 30px;box-shadow:0 50px 100px -40px rgba(0,0,30,.8);border-top:5px solid #F06022}
.lg{width:170px;height:auto;display:block;margin-bottom:22px}
.k{font-family:"Geist Mono",monospace;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#B8440F}
h1{font-family:"Bricolage Grotesque",Geist,sans-serif;font-weight:800;letter-spacing:-.035em;font-size:32px;line-height:1.02;margin:10px 0 10px}
h1 i{font-family:"Instrument Serif",serif;font-weight:400;color:#F06022;letter-spacing:-.01em}
p{color:#4A4F78;margin:0 0 22px;line-height:1.5}
label{display:block;font-family:"Geist Mono",monospace;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#6A6F93;margin-bottom:6px}
.f{position:relative}
input{width:100%;height:54px;border-radius:14px;border:1px solid rgba(26,26,140,.2);padding:0 52px 0 16px;font:inherit;font-size:16px;background:#F4F5FB;color:#0D0D45}
input:focus{outline:none;border-color:#1A1A8C;box-shadow:0 0 0 3px rgba(26,26,140,.15);background:#fff}
.eye{position:absolute;right:6px;top:7px;width:40px;height:40px;border:0;background:none;border-radius:10px;cursor:pointer;color:#6A6F93;display:grid;place-items:center}
.eye svg,.b svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.b{margin-top:16px;width:100%;height:54px;border:0;border-radius:999px;font:inherit;font-weight:700;font-size:16px;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;background:linear-gradient(95deg,#E0551A,#F06022 50%,#FF8A4C);box-shadow:0 14px 30px -12px rgba(240,96,34,.8)}
.b[disabled]{opacity:.7;cursor:progress}
.e{color:#C2213A;font-size:14px;min-height:20px;margin-top:12px;text-align:center}
.s{display:flex;gap:8px;align-items:center;justify-content:center;margin-top:18px;color:rgba(255,255,255,.7);font-size:13px}
.s svg{width:15px;height:15px;fill:none;stroke:currentColor;stroke-width:2}
.h{margin-top:14px;font-size:13.5px;color:#6A6F93;text-align:center}.h a{color:#1A1A8C;font-weight:600}
:focus-visible{outline:3px solid #F06022;outline-offset:3px}
</style></head><body><div class="w">
<form class="c" id="f"><img class="lg" src="/img/parceiros/tec-mais.webp" width="720" height="203" alt="TEC Mais Cursos Técnicos"><span class="k">Academy · Portal do Aluno</span>
${locked ? '<h1>Portal <i>indisponível</i></h1><p>O portal está temporariamente fechado. Fale com a secretaria da TEC Mais.</p></form></div>' : `<h1>Bem-vindo(a) <i>de volta.</i></h1><p>Digite a senha que você recebeu da TEC Mais para acessar seu kit.</p>
<label for="pw">Senha de acesso</label><div class="f"><input id="pw" type="password" autocomplete="current-password" required autofocus><button class="eye" type="button" id="ey" aria-label="Mostrar senha"><svg viewBox="0 0 24 24"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg></button></div>
<button class="b" type="submit" id="go">Entrar no portal<svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg></button><div class="e" id="e" role="alert"></div>
<div class="h">Esqueceu a senha? <a href="https://wa.me/5561998200367?text=${encodeURIComponent('Olá! Sou aluno(a) da TEC Mais e preciso da senha do Portal do Aluno.')}" target="_blank" rel="noopener">Fale com a TEC Mais</a></div></form>
<div class="s"><svg viewBox="0 0 24 24"><rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/></svg>Conteúdo exclusivo e criptografado</div></div>
<script>
(function(){
var S="${salt}",IV="${iv}",P="${payload}";
function u8(b){return Uint8Array.from(atob(b),function(c){return c.charCodeAt(0)})}
async function open(pw){
  var base=await crypto.subtle.importKey("raw",new TextEncoder().encode(pw),"PBKDF2",false,["deriveKey"]);
  var key=await crypto.subtle.deriveKey({name:"PBKDF2",salt:u8(S),iterations:${ITER},hash:"SHA-256"},base,{name:"AES-GCM",length:256},false,["decrypt"]);
  var out=await crypto.subtle.decrypt({name:"AES-GCM",iv:u8(IV)},key,u8(P));
  try{sessionStorage.setItem("tma-pw",pw)}catch(e){}
  window.__tmaPw=pw;
  var html=new TextDecoder().decode(out);document.open();document.write(html);document.close();
}
var f=document.getElementById("f"),e=document.getElementById("e"),go=document.getElementById("go"),pw=document.getElementById("pw");
document.getElementById("ey").addEventListener("click",function(){var s=pw.type==="password";pw.type=s?"text":"password";this.setAttribute("aria-label",s?"Ocultar senha":"Mostrar senha")});
f.addEventListener("submit",function(ev){ev.preventDefault();e.textContent="";go.disabled=true;go.firstChild.textContent="Abrindo…";open(pw.value.trim()).catch(function(){go.disabled=false;go.firstChild.textContent="Entrar no portal";e.textContent="Senha incorreta. Confira e tente de novo.";pw.select()})});
var saved=null;try{saved=sessionStorage.getItem("tma-pw")}catch(x){}
if(saved)open(saved).catch(function(){try{sessionStorage.removeItem("tma-pw")}catch(x){}});
})();
</script>`}
</body></html>`;
}

const redirect = (lesson) => `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="robots" content="noindex, nofollow">
<title>TEC Mais Academy</title><meta http-equiv="refresh" content="0;url=${BASE}#/aula/${lesson}"><script>location.replace("${BASE}#/aula/${lesson}")</script></head><body></body></html>`;

export default function academy() {
  return {
    name: 'tecmais-academy',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const out = path.join(fileURLToPath(dir), 'tec-mais', 'academy');
        await mkdir(out, { recursive: true });
        const src = path.resolve('academy-src');
        for (const [file, lesson] of Object.entries(REDIRECTS)) await writeFile(path.join(out, file), redirect(lesson));
        const pw = (process.env.ACADEMY_PASSWORD || '').trim();
        if (!pw) {
          await writeFile(path.join(out, 'index.html'), gate({ locked: true }));
          logger.warn('ACADEMY_PASSWORD não definida: portal publicado como indisponível.');
          return;
        }
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const pdf = await encrypt(await readFile(path.join(src, 'guia-calculos.pdf')), pw, salt);
        await writeFile(path.join(out, 'guia-calculos.bin'), pdf.ct);

        const read = (f) => readFile(path.join(src, 'app', f), 'utf8');
        const safe = (js) => js.replaceAll('</script', '<\\/script');
        const cfg = `window.TMA_CFG=${JSON.stringify({ salt: b64(salt), pdfIv: pdf.iv, iter: ITER })};`;
        const [shell, css, conteudo, app] = await Promise.all(['shell.html', 'app.css', 'conteudo.js', 'app.js'].map(read));
        const page = shell
          .replace('<head>', `<head><base href="${BASE}">`)
          .replace('/*__CSS__*/', () => css)
          .replace('/*__CFG__*/', () => cfg)
          .replace('/*__CONTEUDO__*/', () => safe(conteudo))
          .replace('/*__APP__*/', () => safe(app));
        const enc = await encrypt(new TextEncoder().encode(page), pw, salt);
        await writeFile(path.join(out, 'index.html'), gate({ payload: b64(enc.ct), salt: b64(salt), iv: enc.iv }));
        logger.info(`Portal do Aluno criptografado: app (${Math.round(page.length / 1024)} KB) + PDF.`);
      },
    },
  };
}
