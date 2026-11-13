/* TEC Mais Academy · área de membros (SPA com rotas por #hash).
   Progresso e ferramentas ficam salvos só no aparelho (localStorage). */
(function () {
  'use strict';
  var C = TMA_CURSO, MODS = TMA_MODULOS, D = TMA_DADOS, CFG = window.TMA_CFG || {};

  /* ---------- utilidades ---------- */
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  var LS = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  };
  var OP = { get: function (k, d) { return LS.get('tm-op-' + k, d); }, set: function (k, v) { LS.set('tm-op-' + k, v); } };

  var ICONS = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    tool: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
    logout: '<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"/><path d="M10 17l-5-5 5-5"/><path d="M5 12h11"/>',
    calc: '<rect x="5" y="2.5" width="14" height="19" rx="2.5"/><path d="M8.5 7h7"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 15.5h.01M12 15.5h.01M15.5 15.5h.01M8.5 19h.01M12 19h3.5"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/>',
    download: '<path d="M12 4v11"/><path d="M7 10.5l5 5 5-5"/><path d="M4.5 20h15"/>',
    external: '<path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/>',
    right: '<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>',
    left: '<path d="M19 12H5"/><path d="M11 6l-6 6 6 6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    alert: '<path d="M12 3.5 2.5 20h19z"/><path d="M12 10v4.5M12 17.5h.01"/>',
    syringe: '<path d="M18 2l4 4"/><path d="M17 7l3-3"/><path d="M19 9 8.7 19.3a1 1 0 0 1-1.4 0l-2.6-2.6a1 1 0 0 1 0-1.4L15 5"/><path d="M9 11l4 4"/><path d="M5 19l-3 3"/><path d="M14 4l6 6"/>',
    needle: '<path d="M3 21l9-9"/><path d="M10 10l4 4"/><path d="M12 8l4 4 5-5-4-4z"/>',
    ampoule: '<path d="M10 2h4"/><path d="M10.5 2v4L9 8v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V8l-1.5-2V2"/><path d="M9 13h6"/>',
    vial: '<rect x="8" y="2.5" width="8" height="3.5" rx="1"/><path d="M8.5 6h7v13a2.5 2.5 0 0 1-2.5 2.5h-2A2.5 2.5 0 0 1 8.5 19z"/><path d="M8.5 13h7"/>',
    droplet: '<path d="M12 2.5s6.5 7 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 9.5 12 2.5 12 2.5z"/>',
    gauze: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9.3h16M4 14.7h16M9.3 4v16M14.7 4v16"/>',
    hand: '<path d="M18 11V6a2 2 0 0 0-4 0v5"/><path d="M14 10V4a2 2 0 0 0-4 0v6"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-6-2.4l-3.6-3.6a2 2 0 0 1 2.8-2.8L7 15"/>',
    box: '<path d="M3 4h18v4H3z"/><path d="M4.5 8h15v11a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2z"/><path d="M10 12h4"/>',
    wash: '<path d="M8 3s3.5 3.8 3.5 6.3a3.5 3.5 0 0 1-7 0C4.5 6.8 8 3 8 3z"/><path d="M16.5 10s3 3.3 3 5.5a3 3 0 0 1-6 0c0-2.2 3-5.5 3-5.5z"/>',
    shield: '<path d="M12 2.5 4.5 5.5v6c0 5 3.3 8.6 7.5 10 4.2-1.4 7.5-5 7.5-10v-6z"/><path d="M9 12l2 2 4-4"/>',
    ban: '<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>',
    trash: '<path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13h10l1-13"/>',
    megaphone: '<path d="M3 11v2a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1z"/><path d="M17 8.5a5 5 0 0 1 0 7"/><path d="M19.5 6a8.5 8.5 0 0 1 0 12"/>',
    pin: '<path d="M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    phone: '<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M11 18h2"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7"/><path d="M18 14a6.5 6.5 0 0 1 3.5 6"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
    clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="M8.5 13l2.5 2.5 4.5-5"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
    route: '<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H15a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6.5"/>',
    spark: '<path d="M12 3l1.8 4.6 4.7 1.9-4.7 1.9L12 16l-1.8-4.6-4.7-1.9 4.7-1.9z"/><path d="M19 15l.8 2 2 .8-2 .8-.8 1.9-.8-1.9-2-.8 2-.8z"/>',
    play: '<path d="M7 4.5v15l12-7.5z"/>',
  };
  // ícone em vidro: forma sólida atrás + vidro fosco na frente (tom: '', bl, gr, rd, gray, yel)
  function gic(n, tone, lg, inner) { return '<span class="gi' + (tone ? ' gi--' + tone : '') + (lg ? ' gi--lg' : '') + '" aria-hidden="true"><span class="gi__s"></span><span class="gi__f">' + (inner || ic(n)) + '</span></span>'; }
  function ic(n, cls) { return '<svg class="ic' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[n] || '') + '</svg>'; }

  var toastT;
  function toast(m) { var t = $('#toast'); t.innerHTML = ic('check') + esc(m); t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('on'); }, 2200); }
  function copy(text, btn) {
    function ok() { toast('Copiado'); if (btn) { var o = btn.innerHTML; btn.innerHTML = ic('check') + ' Copiado'; setTimeout(function () { btn.innerHTML = o; }, 1600); } }
    function fb() { var ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); ok(); } catch (e) { toast('Selecione o texto e copie manualmente'); } document.body.removeChild(ta); }
    try { navigator.clipboard.writeText(text).then(ok, fb); } catch (e) { fb(); }
  }

  /* ---------- índice de aulas e progresso ---------- */
  var LESSONS = [];
  MODS.forEach(function (m, mi) { m.n = mi + 1; m.aulas.forEach(function (a, ai) { a.mod = m; a.i = ai; LESSONS.push(a); }); });
  var byId = {}; LESSONS.forEach(function (a) { byId[a.id] = a; });
  var done = LS.get('tma-done', {});
  function isDone(id) { return !!done[id]; }
  function modCount(m) { return m.aulas.filter(function (a) { return isDone(a.id); }).length; }
  function totalDone() { return LESSONS.filter(function (a) { return isDone(a.id); }).length; }
  function pct(n, t) { return t ? Math.round(n / t * 100) : 0; }
  function nextLesson() {
    var last = byId[LS.get('tma-last', '')];
    if (last && !isDone(last.id)) return last;
    var start = last ? LESSONS.indexOf(last) : 0;
    for (var i = 0; i < LESSONS.length; i++) { var a = LESSONS[(start + i) % LESSONS.length]; if (!isDone(a.id)) return a; }
    return null;
  }
  function setDone(id, v) {
    var a = byId[id], before = modCount(a.mod);
    if (v) done[id] = true; else delete done[id];
    LS.set('tma-done', done);
    if (v && before < a.mod.aulas.length && modCount(a.mod) === a.mod.aulas.length) toast('Módulo concluído! Parabéns pela constância.');
    else if (v) toast('Aula concluída');
  }
  function nome() { var n = LS.get('tma-nome', '') || (OP.get('cv', {}).nome || ''); return String(n).trim().split(/\s+/)[0] || ''; }

  /* ---------- casca: menu lateral e abas ---------- */
  var COVER = { orange: 'orange', blue: 'blue', green: 'green' };
  function shell(route) {
    var cur = route.lesson ? route.lesson.mod.id : '';
    var nav = [['#/', 'Início', 'home', route.name === 'home'], ['#/modulos', 'Módulos', 'grid', route.name === 'modulos'], ['#/ferramentas', 'Ferramentas', 'tool', route.name === 'ferramentas']];
    var h = '<div class="side__top"><a class="side__logo" href="#/"><img src="logo-claro.webp" width="720" height="203" alt="TEC Mais Cursos Técnicos"><span>Academy · Portal do Aluno</span></a></div><nav class="side__nav" aria-label="Portal">';
    nav.forEach(function (n) { h += '<a class="nl" href="' + n[0] + '"' + (n[3] ? ' aria-current="page"' : '') + '>' + ic(n[2]) + n[1] + '</a>'; });
    h += '<div class="side__h">Seus módulos</div>';
    MODS.forEach(function (m) {
      var c = modCount(m);
      h += '<a class="sm" href="#/aula/' + firstOpen(m).id + '"' + (cur === m.id ? ' aria-current="page"' : '') + '><span class="sm__t"><span class="sm__n">0' + m.n + '</span>' + esc(m.titulo) + '</span><div class="bar' + (c === m.aulas.length ? ' bar--g' : '') + '"><i style="width:' + pct(c, m.aulas.length) + '%"></i></div></a>';
    });
    h += '</nav><div class="side__foot"><a class="nl" href="https://wa.me/' + C.whatsapp + '?text=' + encodeURIComponent('Olá! Sou aluno(a) da TEC Mais Academy e preciso de ajuda com o portal.') + '" target="_blank" rel="noopener">' + ic('chat') + 'Suporte no WhatsApp</a><button class="nl" type="button" data-sair style="border:0;background:none;cursor:pointer;width:100%">' + ic('logout') + 'Sair do portal</button></div>';
    $('#side').innerHTML = h;
    var t = [['#/', 'Início', 'home', route.name === 'home'], ['#/modulos', 'Módulos', 'grid', route.name === 'modulos' || route.name === 'aula'], ['#/ferramentas', 'Ferramentas', 'tool', route.name === 'ferramentas']];
    var th = '';
    t.forEach(function (n) { th += '<a class="tab" href="' + n[0] + '"' + (n[3] ? ' aria-current="page"' : '') + '>' + ic(n[2]) + n[1] + '</a>'; });
    th += '<a class="tab" href="https://wa.me/' + C.whatsapp + '" target="_blank" rel="noopener">' + ic('chat') + 'Suporte</a>';
    $('#tabs').innerHTML = th;
  }
  function firstOpen(m) { for (var i = 0; i < m.aulas.length; i++) if (!isDone(m.aulas[i].id)) return m.aulas[i]; return m.aulas[0]; }

  var COVER_TONE = { orange: 'yel', blue: 'or', green: 'yel' };
  function modCard(m) {
    var c = modCount(m), t = m.aulas.length, nx = nextLesson();
    return '<a class="card mod' + (nx && nx.mod === m ? ' mod--next' : '') + '" href="#/aula/' + firstOpen(m).id + '"><div class="cover cover--' + COVER[m.cor] + '"><div class="cover__b"><span class="chip chip--w">Módulo 0' + m.n + '</span>' + (m.previa ? '<span class="chip chip--w">Prévia</span>' : '') + (c === t ? '<span class="chip chip--w">' + ic('check') + ' Concluído</span>' : '') + '</div>' + gic(m.icone, COVER_TONE[m.cor], true) + '<span class="cover__n" aria-hidden="true">0' + m.n + '</span></div>' +
      '<div class="mod__b"><h3>' + esc(m.titulo) + '</h3><p>' + esc(m.resumo) + '</p><div class="bar' + (c === t ? ' bar--g' : '') + '"><i style="width:' + pct(c, t) + '%"></i></div><div class="mod__p"><span>' + c + ' de ' + t + ' aulas</span><span>' + (nx && nx.mod === m ? '✱ Próximo passo' : c === 0 ? 'Começar' : c === t ? 'Rever' : 'Continuar') + ' →</span></div></div></a>';
  }
  function toolCards() {
    return '<div class="tools">' + TMA_FERRAMENTAS.map(function (f) { return '<a class="card tool" href="#/aula/' + f.aula + '">' + gic(f.icone, ['', 'bl', 'gr'][TMA_FERRAMENTAS.indexOf(f) % 3]) + '<span class="tool__t"><b>' + esc(f.titulo) + '</b><span>' + esc(f.texto) + '</span></span></a>'; }).join('') + '</div>';
  }
  function foot() { return '<footer class="foot"><span>TEC Mais Cursos Técnicos · Valparaíso de Goiás</span><span>' + esc(C.rodape) + '</span></footer>'; }

  /* ---------- páginas ---------- */
  function pageHome() {
    var n = totalDone(), t = LESSONS.length, p = pct(n, t), nx = nextLesson(), nm = nome();
    var R = 74, L = 2 * Math.PI * R;
    var h = '<section class="hero"><span class="hero__c hero__c--tl">TEC Mais Academy</span><span class="hero__c hero__c--tr">Valparaíso de Goiás</span><span class="hero__c hero__c--bl">Portal do aluno</span><span class="hero__c hero__c--br">Salve na tela inicial</span><div class="hero__g"><div><span class="ast">' + esc(C.kit) + '</span><h1 class="disp">' + (nm ? 'Olá, ' + esc(nm) + '! ' : '') + (n === 0 ? 'Seu kit está <span class="serif">pronto.</span>' : n === t ? 'Kit <span class="serif">concluído.</span>' : 'Bora <span class="serif">continuar?</span>') + '</h1><p>Revise os cálculos, relembre os cuidados da aula e organize sua busca por oportunidades. Salve este portal na tela inicial do celular para consultar quando precisar.</p>' +
      '<div class="hero__cta">' + (nx ? '<a class="btn btn--or" href="#/aula/' + nx.id + '">' + (n === 0 ? 'Começar agora' : 'Continuar') + '<span class="btn__a">' + ic('right') + '</span></a>' : '<a class="btn btn--or" href="#/modulos">Rever os módulos<span class="btn__a">' + ic('right') + '</span></a>') + '<a class="btn btn--ghd" href="#/ferramentas">' + ic('tool') + 'Ferramentas</a></div>' +
      (nx ? '<div class="hero__next"><i>' + ic('play') + '</i>Próxima aula: <b>' + esc(nx.titulo) + '</b><em> · Módulo 0' + nx.mod.n + '</em></div>' : '') + '</div>' +
      '<div class="ring" role="img" aria-label="' + p + '% do kit concluído"><svg viewBox="0 0 168 168"><defs><linearGradient id="rg" x1="0" x2="1"><stop offset="0" stop-color="#F06022"/><stop offset="1" stop-color="#FFB547"/></linearGradient></defs><circle class="t" cx="84" cy="84" r="' + R + '"/><circle class="v" cx="84" cy="84" r="' + R + '" stroke-dasharray="' + L.toFixed(1) + '" stroke-dashoffset="' + (L * (1 - p / 100)).toFixed(1) + '"/></svg><div class="ring__c"><b>' + p + '%</b><span>' + n + ' de ' + t + ' aulas</span></div></div></div></section>';
    h += '<section class="sec"><div class="sec__h"><div><span class="k">Seus módulos</span><h2 class="disp h2">Tudo do seu kit <span class="serif">em um só lugar.</span></h2></div></div><div class="mods">' + MODS.map(modCard).join('') + '</div></section>';
    h += '<section class="sec"><div class="sec__h"><div><span class="k">Ferramentas do dia a dia</span><h2 class="disp h2">Abra, use e <span class="serif">volte quando precisar.</span></h2></div></div>' + toolCards() + '</section>';
    return h + foot();
  }
  function pageModulos() {
    return '<div class="lh"><span class="k">Área de membros</span><h1 class="disp">Seus módulos</h1><p class="lh__m">' + LESSONS.length + ' aulas em ' + MODS.length + ' módulos · seu progresso fica salvo neste aparelho</p></div><div class="mods">' + MODS.map(modCard).join('') + '</div>' + foot();
  }
  function pageFerramentas() {
    return '<div class="lh"><span class="k">Ferramentas</span><h1 class="disp">Para usar na prática</h1><p class="lh__m">Checklist, fórmulas, currículo, mensagens e controle da sua busca.</p></div>' + toolCards() + foot();
  }

  var WIDE = { curriculo: 1, contatos: 1, materiais: 1, etapas: 1, regras: 1, onde: 1, mensagens: 1, antes: 1, entrevista: 1, perfil: 1 };
  function pageAula(a) {
    var m = a.mod, idx = LESSONS.indexOf(a), prev = LESSONS[idx - 1], next = LESSONS[idx + 1], c = modCount(m);
    LS.set('tma-last', a.id);
    var h = '<nav class="crumb" aria-label="Você está em"><a href="#/">Início</a>/<a href="#/modulos">Módulo 0' + m.n + '</a>/<span>' + esc(m.titulo) + '</span></nav><div class="lesson' + (WIDE[a.tipo] ? ' lesson--wide' : '') + '"><div><header class="lh' + (a.num ? ' lh--num' : '') + '"><div><span class="kk">' + esc(a.kk || ('Aula ' + (a.i + 1))) + '</span><h1 class="disp">' + (a.h ? esc(a.h[0]) + ' <span class="serif grad">' + esc(a.h[1]) + '</span>' : esc(a.titulo)) + '</h1><div class="lh__m"><span class="chip chip--w2">Aula ' + (a.i + 1) + ' de ' + m.aulas.length + '</span><span class="chip chip--' + (m.cor === 'orange' ? 'or' : m.cor === 'blue' ? 'bl' : 'gr') + '">' + esc(a.min) + '</span>' + (m.previa ? '<span class="chip chip--or">Prévia · em validação</span>' : '') + (isDone(a.id) ? '<span class="chip chip--gr">' + ic('check') + ' Concluída</span>' : '') + '</div></div>' + (a.num ? '<span class="bignum" aria-hidden="true">' + a.num + '</span>' : '') + '</header>';
    h += '<div class="lbody" id="lbody">' + (R[a.tipo] ? R[a.tipo].html(a) : '') + '</div>';
    h += '<div class="lnav">' + (prev ? '<a class="btn btn--gh" href="#/aula/' + prev.id + '" aria-label="Aula anterior">' + ic('left') + '<span class="lbl">Anterior</span></a>' : '<span></span>') +
      '<button class="btn done-btn ' + (isDone(a.id) ? '' : 'btn--gh') + '" type="button" aria-pressed="' + isDone(a.id) + '" id="donebtn">' + ic('check') + '<span>' + (isDone(a.id) ? 'Concluída' : 'Concluir aula') + '</span></button>' +
      (next ? '<a class="btn btn--or" href="#/aula/' + next.id + '" aria-label="Próxima aula"><span class="lbl">Próxima</span><span class="btn__a">' + ic('right') + '</span></a>' : '<a class="btn btn--or" href="#/"><span class="lbl">Início</span><span class="btn__a">' + ic('home') + '</span></a>') + '</div></div>';
    h += '<aside class="card list" aria-label="Aulas do módulo"><div class="list__h"><span class="k">Módulo 0' + m.n + '</span><b>' + esc(m.titulo) + '</b><div class="bar' + (c === m.aulas.length ? ' bar--g' : '') + '"><i style="width:' + pct(c, m.aulas.length) + '%"></i></div><small>' + c + ' de ' + m.aulas.length + ' aulas concluídas</small></div><ol>';
    m.aulas.forEach(function (x, i) { h += '<li><a class="li' + (isDone(x.id) ? ' is-done' : '') + '" href="#/aula/' + x.id + '"' + (x === a ? ' aria-current="page"' : '') + '><span class="li__s">' + (isDone(x.id) ? ic('check') : (i + 1)) + '</span><span>' + esc(x.titulo) + '<small>' + esc(x.min) + '</small></span></a></li>'; });
    h += '</ol></aside></div>' + foot();
    return h;
  }

  /* ---------- renderizadores de aula ---------- */
  /* ---------- peças visuais do kit ---------- */
  // ilustração original do kit (traço), em academy-src/app/conteudo.js → TMA_ILUS
  function ilus(k, cls) {
    var x = TMA_ILUS[k]; if (!x) return '';
    return '<svg class="il' + (cls ? ' ' + cls : '') + '" viewBox="0 0 ' + x[0] + ' ' + x[0] + '" aria-hidden="true" style="stroke-width:' + (x[0] > 30 ? 2.6 : 1.9) + '">' + x[1] + '</svg>';
  }
  function ckList(items, state, prefix, keyAttr) {
    return items.map(function (t, i) { return '<label class="ck"><input type="checkbox" ' + (keyAttr || 'data-i') + '="' + (keyAttr ? prefix + i : i) + '"' + (state[keyAttr ? prefix + i : i] ? ' checked' : '') + '><span class="bx">' + ic('check') + '</span><span>' + esc(t) + '</span></label>'; }).join('');
  }
  function alertBox(kind, strong, text, icon) { return '<div class="alert' + (kind ? ' alert--' + kind : '') + '">' + ic(icon || 'alert') + '<span>' + (strong ? '<b>' + esc(strong) + '</b> ' : '') + text + '</span></div>'; }
  var AVISO = alertBox('rd', 'Este guia é revisão, não protocolo.', 'Ele não substitui o protocolo da instituição, a prescrição, a bula nem a supervisão profissional. Aplicar injetáveis é atividade de profissionais legalmente habilitados.');
  var TONES = ['bl', 'or', 'te', 'pk', 'vi'];

  var trilha = OP.get('trilha', '');
  var cv = OP.get('cv', {});
  function v(k) { return String(cv[k] || '').trim(); }

  var R = {
    pdf: {
      html: function () {
        return '<p class="lead">O passo a passo completo, com exemplos e exercícios. Abra no celular para estudar ou baixe para consultar offline.</p><article class="card pdf"><div class="pdf__c"><span>TEC Mais Academy</span><b>Guia de Cálculo de Medicamentos</b><span>31 páginas · PDF</span></div><div><span class="k">O que tem no guia</span><ul class="pills">' + D.pdfTopicos.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul><div class="pdf__a" id="pdfa"><button class="btn btn--gh" type="button" disabled>Preparando o guia…</button></div><p class="note" id="pdfn" style="margin-top:12px"></p></div></article>' +
          alertBox('', 'UI não vira mg.', 'Pedido em UI, frasco em UI. Na insulina U-100, use sempre a seringa de insulina.');
      },
      init: function () {
        loadPdf().then(function (url) {
          $('#pdfa').innerHTML = '<a class="btn btn--or" href="' + url + '" target="_blank" rel="noopener">Abrir o guia<span class="btn__a">' + ic('external') + '</span></a><a class="btn btn--gh" href="' + url + '" download="guia-calculos-tecmais.pdf">' + ic('download') + 'Baixar PDF</a>';
        }, function () {
          $('#pdfa').innerHTML = '<button class="btn btn--gh" type="button" data-sair>' + ic('lock') + 'Entrar de novo</button>';
          $('#pdfn').textContent = 'Não consegui abrir o guia nesta sessão. Saia e entre de novo com a senha.';
        });
      },
    },

    formulas: {
      html: function () {
        return '<p class="lead">Resumo do Guia de Cálculo. Para o passo a passo completo, com exemplos e exercícios, <a href="#/aula/guia">abra o guia</a>.</p><div class="fms">' + D.formulas.map(function (f, i) { return '<article class="card fm fm--' + TONES[i % 5] + '"><h3>' + esc(f.t) + '</h3>' + f.f.map(function (x) { return '<code>' + esc(x) + '</code>'; }).join('') + '<p>' + esc(f.n) + '</p></article>'; }).join('') + '</div>' +
          alertBox('rd', 'UI não vira mg.', 'Pedido em UI, frasco em UI. Na insulina U-100, use sempre a seringa de insulina.');
      },
    },

    checklist: {
      html: function () {
        return '<p class="lead">As marcações ficam salvas só neste aparelho. Limpe a lista a cada novo preparo.</p><div class="bar bar--g ckbar"><i id="ckb" style="width:0"></i></div><article class="card ckwrap" id="ck">' + ckList(D.checklist, LS.get('tecmais-checklist-v1', []), 'ck-') + '</article>' +
          '<div class="ckfoot"><span><b id="ckc">0 de ' + D.checklist.length + '</b> itens conferidos</span><button class="btn btn--gh btn--sm" type="button" id="ckr">Limpar marcações</button></div>' +
          alertBox('rd', 'Cálculo certo não é autorização para administrar.', 'Dose, concentração, diluente e velocidade vêm da prescrição, do rótulo, da bula e do protocolo da instituição. Na dúvida, pare e confirme com o enfermeiro responsável, o prescritor ou o farmacêutico.');
      },
      init: function () {
        var st = LS.get('tecmais-checklist-v1', []);
        function upd(celebrate) { var n = st.filter(Boolean).length; $('#ckc').textContent = n + ' de ' + D.checklist.length; $('#ckb').style.width = pct(n, D.checklist.length) + '%'; if (celebrate && n === D.checklist.length) toast('Tudo conferido. Siga o protocolo.'); }
        $('#ck').addEventListener('change', function (e) { st[+e.target.dataset.i] = e.target.checked; LS.set('tecmais-checklist-v1', st); upd(true); });
        $('#ckr').addEventListener('click', function () { st = []; LS.set('tecmais-checklist-v1', st); $$('#ck input').forEach(function (x) { x.checked = false; }); upd(); });
        upd();
      },
    },

    /* ----- Guia Visual ----- */
    materiais: {
      html: function () {
        var pr = byId.materiais.mod.aulas;
        return '<section class="intro"><span class="ast">Guia visual de apoio à prática</span><h2 class="disp">Reveja a aula <span class="serif grad">em poucos segundos.</span></h2><p>Pranchas visuais para relembrar os materiais, os cuidados de biossegurança e os pontos de atenção que você viu presencialmente. Pouco texto, muita clareza.</p><nav class="pnav" aria-label="Pranchas">' + pr.map(function (x, i) { return '<a href="#/aula/' + x.id + '"' + (i === 0 ? ' aria-current="page"' : '') + '>' + (i + 1) + ' · ' + ['Materiais', 'Biossegurança', 'Antes, durante e depois', 'Erros de atenção', 'Descarte', 'Na dúvida'][i] + '</a>'; }).join('') + '</nav></section>' + AVISO +
          '<p class="lead" style="margin-top:8px">Os itens que você manuseou na aula. Reconhecer cada um pelo nome é o primeiro passo da segurança.</p><div class="mats">' +
          D.materiais.map(function (x, i) { return '<article class="card mat mat--' + TONES[i % 4] + '"><div class="mat__art">' + ilus(x.il) + '</div><span class="num">' + String(i + 1).padStart(2, '0') + '</span><h3>' + esc(x.t) + '</h3><p>' + esc(x.d) + '</p></article>'; }).join('') + '</div>';
      },
    },
    regras: {
      html: function () {
        return '<p class="lead">As cinco regras que protegem você e o paciente em todo atendimento.</p><div class="rules">' + D.regras.map(function (x, i) { return '<article class="rule rule--' + (i + 1) + '"><span class="rule__i">' + ilus(x.il) + '</span><span class="rule__n">' + String(i + 1).padStart(2, '0') + '</span><h3>' + esc(x.t) + '</h3><p>' + esc(x.d) + '</p></article>'; }).join('') + '</div>' + AVISO;
      },
    },
    etapas: {
      html: function () {
        var st = LS.get('tma-etapas', {});
        return '<p class="lead">Os pontos de conferência de cada etapa. A técnica em si é a que a professora ensinou em sala e o protocolo da instituição define.</p><div class="stages" id="stg">' +
          D.etapas.map(function (e, i) { return '<article class="card stage stage--' + (i + 1) + '"><header><h3>' + esc(e.t) + '</h3><span>' + esc(e.k) + '</span></header><div class="stage__b">' + ckList(e.l, st, 'e' + i + '-', 'data-k') + '</div></article>'; }).join('') + '</div>' +
          '<h3 class="subh">Os 9 certos da administração de medicamentos</h3><div class="nove">' + D.noveCertos.map(function (x, i) { return '<div><b>' + (i + 1) + '</b>' + esc(x) + '</div>'; }).join('') + '</div>' + AVISO;
      },
      init: function () {
        var st = LS.get('tma-etapas', {});
        $('#stg').addEventListener('change', function (e) { st[e.target.dataset.k] = e.target.checked; LS.set('tma-etapas', st); });
      },
    },
    erros: {
      html: function () {
        return '<p class="lead">Os deslizes mais comuns não são de técnica, são de atenção. Troque o hábito da esquerda pelo da direita.</p><div class="evs">' + D.erros.map(function (e) { return '<article class="ev"><div class="ev__no"><span class="tag tag--no">Evite</span><span>' + esc(e[0]) + '</span></div><span class="ev__ar" aria-hidden="true">' + ic('right') + '</span><div class="ev__yes"><span class="tag tag--yes">Faça</span><span>' + esc(e[1]) + '</span></div></article>'; }).join('') + '</div>' + AVISO;
      },
    },
    descarte: {
      html: function () {
        return '<p class="lead">Cada resíduo tem um destino. Descarte na hora, sem desconectar seringa e agulha.</p><div class="discs">' + D.descarte.map(function (x) { return '<article class="card disc disc--' + x.c + '"><div class="mat__art">' + ilus(x.il) + '</div><h3>' + esc(x.t) + '</h3><ul>' + x.l.map(function (y) { return '<li>' + esc(y) + '</li>'; }).join('') + '</ul></article>'; }).join('') + '</div>' + AVISO;
      },
    },
    duvida: {
      html: function () {
        return '<section class="stop"><h2 class="disp">Parar nunca é erro.<br><span class="serif">Seguir na dúvida é.</span></h2><div class="stop__g">' + D.duvida.map(function (x, i) { return '<div class="stop__s"><b>' + (i + 1) + ' · ' + esc(x.t) + '</b><p>' + esc(x.d) + '</p></div>'; }).join('') + '</div></section>' + AVISO;
      },
    },

    /* ----- Oportunidades ----- */
    antes: {
      html: function () {
        var mq = D.marquee.concat(D.marquee).map(function (x) { return '<span>' + esc(x) + '</span><i>✦</i>'; }).join('');
        return '<section class="oph"><div class="oph__t"><span class="ast">Guia de oportunidades</span><p style="margin-top:16px">Saia do curso de Medicamentos Injetáveis sabendo onde procurar, como se apresentar e o que fazer em cada um dos próximos 7 dias.</p>' +
          '<div class="oph__cta"><a class="btn btn--or" href="#/aula/trilha">Escolher minha trilha<span class="btn__a">' + ic('right') + '</span></a><a class="btn btn--gh" href="#/aula/plano">Ver o plano de 7 dias</a></div>' +
          '<dl class="oph__st"><div><dt>3</dt><dd>trilhas de carreira</dd></div><div><dt>7</dt><dd>mensagens prontas</dd></div><div><dt>7 dias</dt><dd>de plano de ação</dd></div></dl></div>' +
          '<div class="mock" aria-hidden="true"><div class="mock__wa"><div class="mock__h"><span>WhatsApp</span><span>09:12</span></div><p>Bom dia! Sou técnica de enfermagem com COREN ativo aqui em Valparaíso. A clínica está recebendo currículos?</p><small>09:12 ✓✓</small></div>' +
          '<div class="mock__pl"><div class="mock__h"><span>Plano de 7 dias</span><span>Dia 3</span></div><b>3 de 7</b><small>Primeiros contatos enviados</small><div class="bar"><i style="width:43%"></i></div></div>' +
          '<div class="mock__ct"><div class="mock__h"><span>Controle</span><span>Semana 1</span></div><p><span>Clínica Vida</span><em class="s-gr">Entrevista</em></p><p><span>Lab. Central</span><em class="s-or">Respondeu</em></p><p><span>Vacina+</span><em class="s-bl">Visitado</em></p></div></div></section>' +
          '<div class="marq" aria-hidden="true"><div class="marq__t">' + mq + '</div></div>' +
          '<h2 class="disp h2" style="margin-top:20px">O certificado abre portas. <span class="serif grad">O registro profissional é o que autoriza.</span></h2><p class="lead">Profissionais sérios se destacam porque conhecem os limites da própria formação e trabalham dentro deles. Leia isto antes de mandar qualquer mensagem.</p>' +
          '<div class="g3">' + D.antes.map(function (x, i) { return '<article class="card box"><span class="sq sq--' + ['vi', 'or', 'te'][i] + '">' + ilus(x.il) + '</span><h3>' + esc(x.t) + '</h3><p>' + esc(x.d) + '</p></article>'; }).join('') + '</div>' +
          alertBox('rd', 'Desconfie de quem oferece trabalho aplicando injetáveis sem exigir registro profissional.', 'Esse tipo de proposta coloca o paciente em risco e expõe você a responsabilidade legal.');
      },
    },
    trilhas: {
      html: function () {
        return '<p class="lead">As mensagens prontas, o objetivo do currículo e os destaques de onde procurar mudam conforme a sua escolha.</p><div class="g3 trails">' + D.trilhas.map(function (t, i) { return '<button class="trail" type="button" data-t="' + t.id + '" aria-pressed="' + (trilha === t.id) + '"><span class="trail__l trail__l--' + (i + 1) + '">' + t.id + '</span><h3>' + esc(t.t) + '</h3><p>' + esc(t.p) + '</p><dl><div><dt>O que buscar</dt><dd>' + esc(t.b) + '</dd></div><div><dt>Como o curso entra</dt><dd>' + esc(t.c) + '</dd></div></dl><span class="trail__s"><span class="radio"></span>Esta é a minha trilha</span></button>'; }).join('') + '</div>' +
          '<div class="alert alert--yl" id="trc"' + (trilha === 'C' ? '' : ' hidden') + '>' + ic('route') + '<span><b>Trilha C:</b> o caminho para aplicar injetáveis profissionalmente passa por uma formação regulamentada, como o Técnico em Enfermagem. Use este guia para entrar no ambiente de saúde por funções de apoio enquanto decide esse passo.</span></div>';
      },
      init: function (a) {
        $$('.trail').forEach(function (b) {
          b.addEventListener('click', function () {
            trilha = trilha === b.dataset.t ? '' : b.dataset.t; OP.set('trilha', trilha);
            if (trilha) toast('Trilha ' + trilha + ' escolhida');
            $('#lbody').innerHTML = R.trilhas.html(a); R.trilhas.init(a);
          });
        });
      },
    },
    onde: {
      html: function () {
        var hl = trilha === 'A' ? ' hl-a' : trilha ? ' hl-bc' : '';
        return '<p class="lead">Em clínicas pequenas, a oportunidade fica com quem aparece primeiro, com educação e currículo em mãos. Mapeie estes lugares na sua região.' + (trilha ? ' Destacamos o que vale para a <b>Trilha ' + trilha + '</b>.' : ' <a href="#/aula/trilha">Escolha sua trilha</a> para ver os destaques.') + '</p>' +
          '<div class="places' + hl + '">' + D.lugares.map(function (l) { return '<article class="card place"><h3>' + esc(l.t) + '</h3><p class="pa"><b>A</b><span>' + esc(l.a) + '</span></p><p class="pbc"><b>B·C</b><span>' + esc(l.bc) + '</span></p></article>'; }).join('') + '</div>' +
          '<div class="chans">' + D.canais.map(function (x) { return '<article class="card chan"><span class="tag tag--or">' + esc(x.tag) + '</span><p><b>' + esc(x.t) + '.</b> ' + esc(x.d) + '</p></article>'; }).join('') + '</div>' +
          '<article class="goal"><b>20</b><span><strong>Sua meta dos dois primeiros dias:</strong> mapear 20 estabelecimentos. Quantidade gera opções; opções geram conversa. <a href="#/aula/contatos">Anote no controle de contatos →</a></span></article>';
      },
    },
    curriculo: {
      html: function () {
        return '<p class="lead">Preencha os campos e veja o currículo se montar ao lado. Depois copie o texto, cole no Word ou no Google Docs e salve em PDF. Seus dados ficam só neste aparelho.</p>' +
          '<div class="cv"><form class="card form" id="cvf" onsubmit="return false">' + D.cvCampos.map(function (f) {
            var id = 'cv-' + f.k, val = esc(cv[f.k] || '');
            return '<div class="fld' + (f.full ? ' fld--full' : '') + '"><label for="' + id + '">' + esc(f.l) + '</label>' + (f.area ? '<textarea class="in" id="' + id + '" data-k="' + f.k + '" placeholder="' + esc(f.ph) + '">' + val + '</textarea>' : '<input class="in" id="' + id + '" data-k="' + f.k + '" type="' + (f.type || 'text') + '" placeholder="' + esc(f.ph) + '" value="' + val + '">') + (f.h ? '<small>' + esc(f.h) + '</small>' : '') + '</div>';
          }).join('') + '<div class="form__a"><button class="btn btn--or btn--sm" type="button" id="cvc">' + ic('copy') + ' Copiar currículo</button><button class="btn btn--gh btn--sm" type="button" id="cvx">Preencher com exemplo</button><button class="btn btn--gh btn--sm" type="button" id="cvl">Limpar</button></div></form><article class="paper" id="cvp" aria-live="polite"></article></div>' +
          '<ul class="dots">' + D.cvDicas.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul>';
      },
      init: function () {
        function draw() {
          var ph = function (t, p) { return t ? esc(t) : '<span class="ph">' + esc(p) + '</span>'; };
          var ct = [v('cidade'), v('whats'), v('email')].filter(Boolean).join(' · ');
          var h = '<h4>' + ph(v('nome').toUpperCase(), '[SEU NOME COMPLETO]') + '</h4><div class="ct">' + ph(ct, '[Cidade – UF] · [WhatsApp] · [e-mail]') + '</div>';
          h += '<div class="s"><b>OBJETIVO</b>' + esc(objText()) + '</div>';
          if (v('reg')) h += '<div class="s"><b>REGISTRO PROFISSIONAL</b>' + esc(v('reg')) + '</div>';
          h += '<div class="s"><b>FORMAÇÃO</b>' + ph(v('form'), '[Curso técnico / graduação] – [Instituição] – [ano]\nEnsino médio – [Escola] – [ano]') + '</div>';
          h += '<div class="s"><b>CURSOS COMPLEMENTARES</b>' + esc(cursoText()) + '</div>';
          h += '<div class="s"><b>EXPERIÊNCIA</b>' + ph(v('exp'), '[Cargo] – [Empresa] – [período]\n· [Uma realização concreta, com verbo de ação]') + '</div>';
          h += '<div class="s"><b>COMPETÊNCIAS</b>' + ph(v('comp'), 'Atendimento ao público · Organização · Atenção a detalhes · Trabalho em equipe') + '</div>';
          h += '<div class="s"><b>DISPONIBILIDADE</b>' + ph(v('disp'), '[Turnos e dias] · [Início imediato]') + '</div>';
          $('#cvp').innerHTML = h;
        }
        $('#cvf').addEventListener('input', function (e) { var k = e.target.dataset.k; if (!k) return; cv[k] = e.target.value; OP.set('cv', cv); draw(); });
        $('#cvc').addEventListener('click', function () { copy(cvPlain(), this); });
        $('#cvx').addEventListener('click', function () { cv = Object.assign({}, D.cvExemplo); OP.set('cv', cv); $$('#cvf [data-k]').forEach(function (x) { x.value = cv[x.dataset.k] || ''; }); draw(); toast('Exemplo preenchido. Troque pelos seus dados.'); });
        $('#cvl').addEventListener('click', function () { cv = {}; OP.set('cv', cv); $$('#cvf [data-k]').forEach(function (x) { x.value = ''; }); draw(); });
        draw();
      },
    },
    mensagens: {
      html: function () {
        var list = D.mensagens.filter(function (m) { return m.k !== 'Depois da entrevista' && (m.t === 'all' || !trilha || (m.t === 'A' && trilha === 'A') || (m.t === 'BC' && trilha !== 'A')); });
        return '<p class="lead">"Tem vaga?" sozinho é ignorado. Estas mensagens já usam o nome e a cidade que você preencheu no <a href="#/aula/curriculo">currículo</a>. O que ficou destacado em <mark class="mk">amarelo</mark>, você completa.' + (trilha ? '' : ' <a href="#/aula/trilha">Escolha sua trilha</a> para ver só as que servem para você.') + '</p>' +
          '<div class="msgs">' + list.map(function (m, i) { return msgCard(m, i + 1); }).join('') + '</div>';
      },
      init: bindCopy,
    },
    plano: {
      html: function () {
        var plan = OP.get('plan', {});
        var h = '<p class="lead">Uma hora por dia, durante 7 dias, rende mais que um dia inteiro de ansiedade. Seu progresso fica salvo neste aparelho.</p><div class="phead"><div class="bar bar--g"><i id="pb"></i></div><b id="pc"></b></div><div class="days" id="tl">';
        D.plano.forEach(function (d, i) {
          h += '<article class="card day"><div class="day__n"><span>Dia</span><b>' + (i + 1) + '</b></div><div><h3>' + esc(d[0]) + '</h3>';
          d[1].forEach(function (t, j) { var id = 'd' + i + '-' + j; h += '<label class="ck"><input type="checkbox" data-id="' + id + '"' + (plan[id] ? ' checked' : '') + '><span class="bx">' + ic('check') + '</span><span>' + esc(t) + '</span></label>'; });
          h += '</div></article>';
        });
        return h + '</div><p class="closing">Busca de trabalho é colheita: vem de semear com constância, <span class="serif grad">não de um único dia bom.</span></p>';
      },
      init: function () {
        var plan = OP.get('plan', {});
        function upd() { var ins = $$('#tl input'), n = ins.filter(function (x) { return x.checked; }).length; $('#pc').textContent = n + ' de ' + ins.length; $('#pb').style.width = pct(n, ins.length) + '%'; $$('#tl .day').forEach(function (d) { d.classList.toggle('done', $$('input', d).every(function (x) { return x.checked; })); }); }
        $('#tl').addEventListener('change', function (e) { plan[e.target.dataset.id] = e.target.checked; OP.set('plan', plan); upd(); var d = e.target.closest('.day'); if (e.target.checked && $$('input', d).every(function (x) { return x.checked; })) toast('Dia concluído!'); });
        upd();
      },
    },
    contatos: {
      html: function () {
        return '<p class="lead">Registre cada estabelecimento e atualize o status a cada passo. O placar se calcula sozinho.</p><div class="score">' + ['Contatos feitos', 'Visitas', 'Respostas', 'Entrevistas'].map(function (t, i) { return '<div class="card"><span>' + t + '</span><b class="sc sc--' + ['bl', 'vi', 'or', 'te'][i] + '" id="s' + i + '">0</b></div>'; }).join('') + '</div>' +
          '<div class="row__h"><span>Estabelecimento</span><span>Tipo</span><span>Contato</span><span>1º contato</span><span>Status</span><span>Próximo passo</span><span></span></div><div class="rows" id="rows"></div><div class="radd"><button class="btn btn--or btn--sm" type="button" id="radd">' + ic('plus') + ' Adicionar contato</button><span class="note">Salvo automaticamente neste aparelho. A primeira linha é um exemplo; apague quando quiser.</span></div>';
      },
      init: function () {
        var rows = OP.get('rows', null);
        if (!rows) rows = [{ ex: 1, nome: 'Ex.: Clínica Vida', tipo: 'Clínica', contato: '(61) 9 0000-0000', data: '14/10', status: 'Visitado', prox: 'Ligar dia 18, falar com Joana' }, { nome: '', tipo: '', contato: '', data: '', status: 'A contatar', prox: '' }, { nome: '', tipo: '', contato: '', data: '', status: 'A contatar', prox: '' }];
        var ST = D.status;
        function save() { OP.set('rows', rows); score(); }
        function score() {
          var real = rows.filter(function (r) { return !r.ex && String(r.nome || '').trim(); });
          var c = function (arr) { return real.filter(function (r) { return arr.indexOf(r.status) > -1; }).length; };
          $('#s0').textContent = c(ST.slice(1)); $('#s1').textContent = c(['Visitado', 'Respondeu', 'Entrevista']); $('#s2').textContent = c(['Respondeu', 'Entrevista']); $('#s3').textContent = c(['Entrevista']);
        }
        function draw() {
          var box = $('#rows'); box.innerHTML = '';
          rows.forEach(function (r, i) {
            var el = document.createElement('div'); el.className = 'card row' + (r.ex ? ' ex' : '');
            var f = function (k, lab, ph) { return '<input class="in r-' + k + '" data-k="' + k + '" aria-label="' + lab + '" placeholder="' + ph + '" value="' + esc(r[k] || '') + '">'; };
            el.innerHTML = f('nome', 'Estabelecimento', 'Estabelecimento') + f('tipo', 'Tipo', 'Tipo') + f('contato', 'Contato', 'Telefone ou @') + f('data', '1º contato', 'dd/mm') +
              '<select class="in" data-k="status" aria-label="Status">' + ST.map(function (s) { return '<option' + (s === r.status ? ' selected' : '') + '>' + s + '</option>'; }).join('') + '</select>' + f('prox', 'Próximo passo', 'Próximo passo') +
              '<button class="del" type="button" aria-label="Remover contato">' + ic('x') + '</button>';
            el.addEventListener('input', function (e) { var k = e.target.dataset.k; if (!k) return; r[k] = e.target.value; if (r.ex) { delete r.ex; el.classList.remove('ex'); } save(); });
            el.addEventListener('change', function (e) { if (e.target.dataset.k === 'status') { r.status = e.target.value; save(); } });
            $('.del', el).addEventListener('click', function () { rows.splice(i, 1); save(); draw(); });
            box.appendChild(el);
          });
        }
        $('#radd').addEventListener('click', function () { rows.push({ nome: '', tipo: '', contato: '', data: '', status: 'A contatar', prox: '' }); save(); draw(); var ins = $$('#rows .r-nome'); ins[ins.length - 1].focus(); });
        draw(); score();
      },
    },
    entrevista: {
      html: function () {
        var lv = OP.get('lv', {}), after = D.mensagens.filter(function (m) { return m.k === 'Depois da entrevista'; })[0];
        return '<div class="g2"><article class="card box"><span class="sq sq--vi">' + ilus('maleta') + '</span><h3>O que levar</h3><div id="lv" class="lv">' + D.levar.map(function (t, i) { return '<label class="ck"><input type="checkbox" data-k="l' + i + '"' + (lv['l' + i] ? ' checked' : '') + '><span class="bx">' + ic('check') + '</span><span>' + esc(t) + '</span></label>'; }).join('') + '</div></article>' +
          '<article class="card box"><span class="sq sq--or">' + ilus('pessoa') + '</span><h3>Como se apresentar</h3><ul class="arrows">' + D.apresentar.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></article></div>' +
          '<h3 class="subh">Perguntas comuns e como pensar a resposta</h3><div class="qa">' + D.perguntas.map(function (q, i) { return '<details' + (i === 0 ? ' open' : '') + '><summary>' + esc(q[0]) + ic('plus') + '</summary><p>' + esc(q[1]) + '</p></details>'; }).join('') + '</div>' +
          '<div class="g2"><article class="card box"><h3>Perguntas que você pode fazer</h3><ul class="arrows">' + D.vocePergunta.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></article>' + (after ? msgCard(after, 7, 'Mensagem 7 do kit.') : '') + '</div>';
      },
      init: function () { var lv = OP.get('lv', {}); $('#lv').addEventListener('change', function (e) { lv[e.target.dataset.k] = e.target.checked; OP.set('lv', lv); }); bindCopy(); },
    },
    perfil: {
      html: function () {
        return '<div class="g2 pg"><section><p class="lead">Recrutadores olham seu WhatsApp, LinkedIn e Instagram antes de responder. Ajuste estes pontos hoje.</p><article class="card box"><ul class="arrows">' + D.perfil.map(function (x) { return '<li><b>' + esc(x.t) + ':</b> ' + esc(x.d) + '</li>'; }).join('') + '</ul></article></section>' +
          '<section><h2 class="disp h2">Quem busca trabalho <span class="serif grad">é alvo fácil.</span></h2><article class="card box scam"><p><b>Não avance quando a proposta:</b></p><ul class="xs">' + D.golpes.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul><p class="note">Na dúvida, pesquise a empresa no Google e no Reclame Aqui, e confirme o endereço no Maps.</p></article></section></div>';
      },
    },
    proximo: {
      html: function () {
        return '<section class="fin"><p>Capacitação contínua é o que faz você ser lembrado na hora de uma vaga, e formação regulamentada é o que permite atuar com procedimentos.</p></section>' +
          '<div class="g2"><article class="card box"><span class="sq sq--vi">' + ilus('epi') + '</span><h3>Trilha A</h3><p>Mantenha o registro em dia e siga se atualizando. É o que diferencia quem é chamado primeiro.</p></article><article class="card box"><span class="sq sq--or">' + ilus('capelo') + '</span><h3>Trilhas B e C</h3><p>O caminho é uma formação técnica ou superior, como o <b>Técnico em Enfermagem</b>. Fale com a equipe da TEC Mais para conhecer turmas, duração e formas de pagamento.</p><a class="btn btn--or btn--sm" style="margin-top:16px" target="_blank" rel="noopener" href="https://wa.me/' + C.whatsapp + '?text=' + encodeURIComponent('Olá! Sou aluno(a) da TEC Mais Academy e quero saber sobre o Técnico em Enfermagem.') + '">Falar com a TEC Mais</a></article></div>' +
          '<div class="links" style="justify-content:center">' + D.conselhos.map(function (c) { return '<a class="btn btn--gh btn--sm" href="' + c.u + '" target="_blank" rel="noopener">' + esc(c.t) + ' ' + ic('external') + '</a>'; }).join('') + '</div>';
      },
    },
  };

  function msgCard(m, n, note) {
    var f = fill(m.b);
    return '<article class="card msg"><header><div><span class="k">' + esc(m.c) + '</span><h3>' + n + ' · ' + esc(m.k) + '</h3></div>' + (m.t && m.t !== 'all' ? '<span class="chip ' + (m.t === 'A' ? 'chip--bl' : 'chip--or') + '">' + (m.t === 'A' ? 'Trilha A' : 'Trilhas B e C') + '</span>' : '') + '</header><div class="body">' + f.html + '</div><footer><small>' + esc(note || m.n || '') + '</small><button class="btn btn--gh btn--sm" type="button" data-cp="' + D.mensagens.indexOf(m) + '">' + ic('copy') + ' Copiar</button></footer></article>';
  }
  function bindCopy() { $$('[data-cp]').forEach(function (b) { b.addEventListener('click', function () { copy(fill(D.mensagens[+b.dataset.cp].b).plain, b); }); }); }

  /* currículo e mensagens: mesma lógica do kit original */
  function objText() {
    var o = v('obj');
    if (trilha === 'A' || (!trilha && v('reg'))) return 'Atuar como ' + (o || '[função]') + ', com foco em segurança do paciente e atendimento humanizado.';
    return 'Atuar em ' + (o || '[recepção / apoio]') + ' de clínica ou serviço de saúde, contribuindo com atendimento organizado e humanizado.';
  }
  function cursoText() { return 'Administração de Medicamentos Injetáveis (curso livre) – TEC Mais Academy – ' + (v('mes') || '[mês/ano]') + '\n· Cálculo de medicamentos, reconstituição e diluição\n· Biossegurança, preparo e descarte de materiais\n· Cuidados antes, durante e após a administração'; }
  function cvPlain() {
    var L = [(v('nome') || '[SEU NOME COMPLETO]').toUpperCase(), [v('cidade') || '[Cidade – UF]', v('whats') || '[WhatsApp]', v('email') || '[e-mail]'].join(' · '), '', 'OBJETIVO', objText()];
    if (v('reg')) L.push('', 'REGISTRO PROFISSIONAL', v('reg'));
    L.push('', 'FORMAÇÃO', v('form') || '[Formação]', '', 'CURSOS COMPLEMENTARES', cursoText(), '', 'EXPERIÊNCIA', v('exp') || '[Experiência]', '', 'COMPETÊNCIAS', v('comp') || '[Competências]', '', 'DISPONIBILIDADE', v('disp') || '[Disponibilidade]');
    return L.join('\n');
  }
  function fill(body) {
    var c = v('cidade'), map = { nome: v('nome').split(' ').slice(0, 2).join(' '), cidade: c ? c.split(/[–-]/)[0].trim() : '', whats: v('whats'), funcao: v('obj') ? v('obj').split(' em ')[0] : '' };
    var ph = { nome: '[Nome]', cidade: '[cidade]', whats: '[WhatsApp]', funcao: '[técnico(a) de enfermagem]' };
    var plain = body.replace(/\{(\w+)\}/g, function (_, k) { return map[k] || ph[k]; });
    var html = esc(body).replace(/\{(\w+)\}/g, function (_, k) { return map[k] ? '<span class="fill">' + esc(map[k]) + '</span>' : '<mark>' + ph[k] + '</mark>'; }).replace(/\[([^\]]+)\]/g, '<mark>[$1]</mark>');
    return { plain: plain, html: html };
  }

  /* ---------- PDF criptografado (mesma senha do portal) ---------- */
  var pdfUrl = null;
  function u8(b) { return Uint8Array.from(atob(b), function (c) { return c.charCodeAt(0); }); }
  function loadPdf() {
    if (pdfUrl) return Promise.resolve(pdfUrl);
    var pw = window.__tmaPw; try { pw = pw || sessionStorage.getItem('tma-pw'); } catch (e) {}
    if (!pw || !CFG.salt) return Promise.reject(new Error('sem senha'));
    var enc = new TextEncoder();
    return crypto.subtle.importKey('raw', enc.encode(pw), 'PBKDF2', false, ['deriveKey'])
      .then(function (base) { return crypto.subtle.deriveKey({ name: 'PBKDF2', salt: u8(CFG.salt), iterations: CFG.iter, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']); })
      .then(function (key) { return fetch('guia-calculos.bin', { cache: 'no-store' }).then(function (r) { if (!r.ok) throw new Error('bin'); return r.arrayBuffer(); }).then(function (buf) { return crypto.subtle.decrypt({ name: 'AES-GCM', iv: u8(CFG.pdfIv) }, key, buf); }); })
      .then(function (out) { pdfUrl = URL.createObjectURL(new Blob([out], { type: 'application/pdf' })); return pdfUrl; });
  }

  /* ---------- nome (primeiro acesso) ---------- */
  function askName() {
    if (LS.get('tma-nome', null) !== null) return;
    var w = document.createElement('div'); w.className = 'modal'; w.setAttribute('role', 'dialog'); w.setAttribute('aria-modal', 'true'); w.setAttribute('aria-labelledby', 'mt');
    w.innerHTML = '<div class="card"><span class="k">Bem-vindo(a) à TEC Mais Academy</span><h2 class="disp" id="mt">Como podemos te chamar?</h2><p>Seu nome fica só neste aparelho e aparece na sua tela inicial.</p><form><input class="in" id="mn" autocomplete="given-name" placeholder="Seu primeiro nome" maxlength="40"><button class="btn btn--or" type="submit">Entrar no portal<span class="btn__a">' + ic('right') + '</span></button><button class="btn btn--gh btn--sm" type="button" id="mskip">Agora não</button></form></div>';
    document.body.appendChild(w);
    var inp = $('#mn', w); setTimeout(function () { inp.focus(); }, 50);
    function close(n) { LS.set('tma-nome', n); w.remove(); route(); }
    $('form', w).addEventListener('submit', function (e) { e.preventDefault(); close(inp.value.trim()); });
    $('#mskip', w).addEventListener('click', function () { close(''); });
  }

  /* ---------- roteador ---------- */
  var TITLES = { home: 'Início', modulos: 'Módulos', ferramentas: 'Ferramentas' };
  function parse() {
    var h = location.hash.replace(/^#\/?/, '');
    var p = h.split('/');
    if (p[0] === 'aula' && byId[p[1]]) return { name: 'aula', lesson: byId[p[1]] };
    if (p[0] === 'modulos') return { name: 'modulos' };
    if (p[0] === 'ferramentas') return { name: 'ferramentas' };
    return { name: 'home' };
  }
  var lastKey = '';
  function route() {
    var r = parse(), key = r.name + (r.lesson ? r.lesson.id : '');
    $('#app').classList.remove('menu');
    shell(r);
    var page = $('#page');
    page.innerHTML = r.name === 'aula' ? pageAula(r.lesson) : r.name === 'modulos' ? pageModulos() : r.name === 'ferramentas' ? pageFerramentas() : pageHome();
    document.title = (r.lesson ? r.lesson.titulo : TITLES[r.name]) + ' · TEC Mais Academy';
    if (r.lesson) {
      var R0 = R[r.lesson.tipo]; if (R0 && R0.init) R0.init(r.lesson);
      $('#donebtn').addEventListener('click', function () { var on = !isDone(r.lesson.id); setDone(r.lesson.id, on); var y = scrollY; route(); scrollTo(0, y); });
    }
    if (key !== lastKey) { scrollTo(0, 0); var h1 = $('h1', page); if (h1 && lastKey) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); } }
    lastKey = key;
  }
  function sair() { try { sessionStorage.removeItem('tma-pw'); } catch (e) {} window.__tmaPw = null; location.replace('/tec-mais/academy'); }

  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target : null; if (!t) return;
    if (t.closest('[data-sair]')) { e.preventDefault(); sair(); return; }
    if (t.closest('#menub')) { $('#app').classList.toggle('menu'); return; }
    if (t.closest('#scrim')) { $('#app').classList.remove('menu'); return; }
    var a = t.closest('a[href^="#"]');
    if (a) { e.preventDefault(); var h = a.getAttribute('href'); if (h === location.hash || (h === '#/' && !location.hash)) route(); else location.hash = h; }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') $('#app').classList.remove('menu'); });
  window.addEventListener('hashchange', route);
  route();
  askName();
})();
