// Portal do Aluno TEC Mais: criptografa as páginas de academy-src/ no build.
// Senha: variável ACADEMY_PASSWORD (Vercel → Settings → Environment Variables).
// Publica em /tec-mais/academy só telas de senha + conteúdo cifrado (AES-256-GCM, PBKDF2 SHA-256).
// Sem a variável, publica apenas um aviso de "portal indisponível" (nenhum conteúdo vai ao ar).
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { webcrypto as crypto } from 'node:crypto';
import path from 'node:path';

const ITER = 250000;
// Base fixa: na Vercel o portal abre em /tec-mais/academy (sem barra final) e links relativos quebravam.
const BASE = '/tec-mais/academy/';
// Com <base>, links "#secao" virariam outra URL e recarregariam: aqui eles só rolam a página.
const HASH_FIX = `<script>document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a)return;var id=a.getAttribute("href").slice(1),t=id&&document.getElementById(id);e.preventDefault();if(t)t.scrollIntoView({behavior:"smooth"});})</script>`;
const withBase = (html) => html.replace(/<head([^>]*)>/i, `<head$1><base href="${BASE}">${HASH_FIX}`);
const b64 = (u8) => Buffer.from(u8).toString('base64');

async function encrypt(bytes, password, salt) {
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: ITER, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt']);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, bytes));
  return { iv: b64(iv), ct };
}

function gate({ title, kind, payload, salt, iv, locked }) {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<base href="${BASE}"><meta name="robots" content="noindex, nofollow, noarchive"><title>${title} · Portal do Aluno TEC Mais</title>
<link rel="stylesheet" href="fonts/fonts.css">
<style>
*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;font-family:Geist,system-ui,sans-serif;color:#0D1240;
background:radial-gradient(60% 60% at 100% 0%,rgba(139,108,255,.25),transparent 70%),radial-gradient(50% 50% at 0% 100%,rgba(240,96,34,.2),transparent 70%),#fff}
.c{width:min(420px,100%);background:#fff;border:1px solid rgba(20,28,100,.12);border-radius:24px;padding:30px;box-shadow:0 40px 90px -40px rgba(60,40,160,.45)}
.k{font-family:"Geist Mono",monospace;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#C94A0E}
h1{font-family:Montserrat,sans-serif;font-weight:800;font-size:28px;line-height:1.1;margin:10px 0 8px}
p{color:#4D5482;margin:0 0 20px;line-height:1.5}label{display:block;font-family:"Geist Mono",monospace;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#7A80A8;margin-bottom:6px}
input{width:100%;height:52px;border-radius:14px;border:1px solid rgba(20,28,100,.2);padding:0 16px;font:inherit;font-size:16px;background:#F6F7FD}
input:focus{outline:none;border-color:#8B6CFF;box-shadow:0 0 0 3px rgba(139,108,255,.25);background:#fff}
button{margin-top:14px;width:100%;height:52px;border:0;border-radius:999px;font:inherit;font-weight:700;font-size:16px;color:#1A0A02;cursor:pointer;background:linear-gradient(95deg,#F06022,#FF8A4C 45%,#FFB547)}
.b{display:flex;align-items:center;justify-content:center;margin-top:10px;height:52px;border-radius:999px;font-weight:700;text-decoration:none;color:#1A0A02;background:linear-gradient(95deg,#F06022,#FF8A4C 45%,#FFB547)}.b.g{background:#fff;border:1px solid rgba(20,28,100,.2);color:#0D1240}.l{display:block;margin-top:16px;color:#4D5482;text-align:center}
.e{color:#C2213A;font-size:14px;min-height:20px;margin-top:10px}
</style></head><body>
<form class="c" id="f"><span class="k">Portal do Aluno · TEC Mais</span><h1>${locked ? 'Portal indisponível' : 'Área exclusiva para alunos'}</h1>
${locked ? '<p>O portal está temporariamente fechado. Fale com a secretaria da TEC Mais.</p></form>' : `<p>Digite a senha que você recebeu da TEC Mais.</p>
<label for="pw">Senha</label><input id="pw" type="password" autocomplete="current-password" required autofocus>
<button type="submit">Entrar</button><div class="e" id="e" role="alert"></div></form>
<script>
(function(){
var S="${salt}",IV="${iv}",KIND="${kind}",P=${payload ? `"${payload}"` : 'null'};
function u8(b){return Uint8Array.from(atob(b),function(c){return c.charCodeAt(0)})}
async function open(pw){
  var base=await crypto.subtle.importKey("raw",new TextEncoder().encode(pw),"PBKDF2",false,["deriveKey"]);
  var key=await crypto.subtle.deriveKey({name:"PBKDF2",salt:u8(S),iterations:${ITER},hash:"SHA-256"},base,{name:"AES-GCM",length:256},false,["decrypt"]);
  var data=P?u8(P):new Uint8Array(await (await fetch("guia-calculos.bin",{cache:"no-store"})).arrayBuffer());
  var out=await crypto.subtle.decrypt({name:"AES-GCM",iv:u8(IV)},key,data);
  try{sessionStorage.setItem("tma-pw",pw)}catch(e){}
  if(KIND==="pdf"){var url=URL.createObjectURL(new Blob([out],{type:"application/pdf"}));f.innerHTML='<span class="k">Portal do Aluno · TEC Mais</span><h1>Guia de Cálculo de Medicamentos</h1><p>Pronto. Abra o guia ou baixe para consultar offline.</p><a id="op" class="b" href="'+url+'">Abrir o guia</a><a class="b g" href="'+url+'" download="guia-calculos-tecmais.pdf">Baixar PDF</a><a class="l" href="index.html">← Voltar ao portal</a>';return}
  var html=new TextDecoder().decode(out);document.open();document.write(html);document.close();
}
var f=document.getElementById("f"),e=document.getElementById("e");
f.addEventListener("submit",function(ev){ev.preventDefault();e.textContent="Abrindo…";open(document.getElementById("pw").value).catch(function(){e.textContent="Senha incorreta. Tente de novo."})});
var saved=null;try{saved=sessionStorage.getItem("tma-pw")}catch(e){}
if(saved)open(saved).catch(function(){try{sessionStorage.removeItem("tma-pw")}catch(e){}});
})();
</script>`}
</body></html>`;
}

export default function academy() {
  return {
    name: 'tecmais-academy',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const out = path.join(new URL(dir).pathname, 'tec-mais', 'academy');
        await mkdir(out, { recursive: true });
        const src = path.resolve('academy-src');
        const files = (await readdir(src)).filter((f) => f.endsWith('.html'));
        const pw = process.env.ACADEMY_PASSWORD;
        const salt = crypto.getRandomValues(new Uint8Array(16));
        if (!pw) {
          for (const f of files) await writeFile(path.join(out, f), gate({ title: 'Portal do Aluno', locked: true }));
          await writeFile(path.join(out, 'guia-calculos.html'), gate({ title: 'Guia de Cálculos', locked: true }));
          logger.warn('ACADEMY_PASSWORD não definida: portal publicado como indisponível.');
          return;
        }
        for (const f of files) {
          let html = await readFile(path.join(src, f), 'utf8');
          html = withBase(html.replaceAll('href="guia-calculos.pdf"', 'href="guia-calculos.html"'));
          const { iv, ct } = await encrypt(new TextEncoder().encode(html), pw, salt);
          await writeFile(path.join(out, f), gate({ title: 'Portal do Aluno', kind: 'html', payload: b64(ct), salt: b64(salt), iv }));
        }
        const pdf = await readFile(path.join(src, 'guia-calculos.pdf'));
        const { iv, ct } = await encrypt(pdf, pw, salt);
        await writeFile(path.join(out, 'guia-calculos.bin'), ct);
        await writeFile(path.join(out, 'guia-calculos.html'), gate({ title: 'Guia de Cálculos', kind: 'pdf', payload: null, salt: b64(salt), iv }));
        logger.info(`Portal do Aluno criptografado: ${files.length} páginas + PDF.`);
      },
    },
  };
}
