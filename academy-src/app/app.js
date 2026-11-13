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

  function pageAula(a) {
    var m = a.mod, idx = LESSONS.indexOf(a), prev = LESSONS[idx - 1], next = LESSONS[idx + 1], c = modCount(m);
    LS.set('tma-last', a.id);
    var h = '<nav class="crumb" aria-label="Você está em"><a href="#/">Início</a>/<a href="#/modulos">Módulo 0' + m.n + '</a>/<span>' + esc(m.titulo) + '</span></nav><div class="lesson' + (a.secoes ? ' lesson--wide' : '') + '"><div><header class="lh"><span class="k">Aula ' + (a.i + 1) + ' de ' + m.aulas.length + '</span><h1 class="disp">' + esc(a.titulo) + '</h1><div class="lh__m"><span class="chip chip--' + (m.cor === 'orange' ? 'or' : m.cor === 'blue' ? 'bl' : 'gr') + '">' + esc(a.min) + '</span>' + (m.previa ? '<span class="chip chip--or">Prévia · em validação</span>' : '') + (isDone(a.id) ? '<span class="chip chip--gr">' + ic('check') + ' Concluída</span>' : '') + '</div></header>';
    h += '<div class="lbody" id="lbody">' + (a.secoes ? '<div class="sheet" id="sheet"><div class="sheet__l">Carregando a aula…</div></div>' : R[a.tipo] ? R[a.tipo].html(a) : '') + '</div>';
    h += '<div class="lnav">' + (prev ? '<a class="btn btn--gh" href="#/aula/' + prev.id + '" aria-label="Aula anterior">' + ic('left') + '<span class="lbl">Anterior</span></a>' : '<span></span>') +
      '<button class="btn done-btn ' + (isDone(a.id) ? '' : 'btn--gh') + '" type="button" aria-pressed="' + isDone(a.id) + '" id="donebtn">' + ic('check') + '<span>' + (isDone(a.id) ? 'Concluída' : 'Concluir aula') + '</span></button>' +
      (next ? '<a class="btn btn--or" href="#/aula/' + next.id + '" aria-label="Próxima aula"><span class="lbl">Próxima</span><span class="btn__a">' + ic('right') + '</span></a>' : '<a class="btn btn--or" href="#/"><span class="lbl">Início</span><span class="btn__a">' + ic('home') + '</span></a>') + '</div></div>';
    h += '<aside class="card list" aria-label="Aulas do módulo"><div class="list__h"><span class="k">Módulo 0' + m.n + '</span><b>' + esc(m.titulo) + '</b><div class="bar' + (c === m.aulas.length ? ' bar--g' : '') + '"><i style="width:' + pct(c, m.aulas.length) + '%"></i></div><small>' + c + ' de ' + m.aulas.length + ' aulas concluídas</small></div><ol>';
    m.aulas.forEach(function (x, i) { h += '<li><a class="li' + (isDone(x.id) ? ' is-done' : '') + '" href="#/aula/' + x.id + '"' + (x === a ? ' aria-current="page"' : '') + '><span class="li__s">' + (isDone(x.id) ? ic('check') : (i + 1)) + '</span><span>' + esc(x.titulo) + '<small>' + esc(x.min) + '</small></span></a></li>'; });
    h += '</ol></aside></div>' + foot();
    return h;
  }

  /* ---------- renderizadores de aula ---------- */
  function boxes(list, cls, iconCls) {
    var tone = { 'ibox--or': '', 'ibox--gr': 'gr' }[iconCls] ?? 'bl';
    return '<div class="' + cls + '">' + list.map(function (x, i) { return '<article class="card box">' + gic(x.i, tone) + '<span class="num">' + String(i + 1).padStart(2, '0') + '</span><h3>' + esc(x.t) + '</h3><p>' + esc(x.d) + '</p></article>'; }).join('') + '</div>';
  }
  function ckList(items, state, prefix) {
    return items.map(function (t, i) { return '<label class="ck"><input type="checkbox" data-i="' + i + '" id="' + prefix + i + '"' + (state[i] ? ' checked' : '') + '><span class="bx">' + ic('check') + '</span><span>' + esc(t) + '</span></label>'; }).join('');
  }
  var R = {
    pdf: {
      html: function () {
        return '<p class="lead">O passo a passo completo, com exemplos e exercícios. Abra no celular para estudar ou baixe para consultar offline.</p><article class="card pdf"><div class="pdf__c"><span>TEC Mais Academy</span><b>Guia de Cálculo de Medicamentos</b><span>31 páginas · PDF</span></div><div><span class="k">O que tem no guia</span><ul class="pills">' + D.pdfTopicos.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul><div class="pdf__a" id="pdfa"><button class="btn btn--gh" type="button" disabled>Preparando o guia…</button></div><p class="note" id="pdfn" style="margin-top:12px"></p></div></article>' +
          '<div class="alert">' + ic('alert') + '<span><b>UI não vira mg.</b> Pedido em UI, frasco em UI. Na insulina U-100, use sempre a seringa de insulina.</span></div>';
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
  };

  /* ---------- aulas que mostram um pedaço das páginas originais (academy-src/paginas) ---------- */
  var PAG = window.TMA_PAGINAS || {};
  // roda DENTRO do iframe: mostra só as seções da aula, informa a altura e repassa links e avisos
  function frameScript(show) {
    var keep = [];
    show.forEach(function (s) { var e = document.querySelector(s); if (e) keep.push(e); });
    Array.prototype.forEach.call(document.body.children, function (el) {
      if (/^(SCRIPT|STYLE|TEMPLATE)$/.test(el.tagName) || el.id === 'toast') return;
      if (keep.indexOf(el) < 0) el.style.display = 'none';
    });
    function h() { var b = document.body, cs = getComputedStyle(b); parent.postMessage({ tma: 'h', h: Math.ceil(b.getBoundingClientRect().height + parseFloat(cs.marginTop) + parseFloat(cs.marginBottom)) }, '*'); }
    try { new ResizeObserver(h).observe(document.body); } catch (e) {}
    addEventListener('load', h); h();
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]'); if (!a) return;
      var href = a.getAttribute('href');
      if (/^https?:/i.test(href)) { a.target = '_blank'; a.rel = 'noopener'; return; }
      if (/^(mailto|tel):/i.test(href)) return;
      e.preventDefault();
      if (href.charAt(0) === '#') { var t = document.querySelector(href); if (t && t.offsetParent !== null) { parent.postMessage({ tma: 'y', y: t.getBoundingClientRect().top }, '*'); return; } }
      parent.postMessage({ tma: 'go', href: href }, '*');
    }, true);
    var t = document.getElementById('toast');
    if (t) new MutationObserver(function () { if (t.classList.contains('on')) parent.postMessage({ tma: 'toast', m: t.textContent }, '*'); }).observe(t, { attributes: true, attributeFilter: ['class'] });
  }
  function frameDoc(a) {
    var src = PAG[a.mod.pagina] || '<p>Conteúdo indisponível.</p>';
    var head = '<base href="/tec-mais/academy/"><style>.toast{display:none!important}</style>';
    var tail = '<script>(' + frameScript.toString() + ')(' + JSON.stringify(a.secoes) + ')<\/script>';
    return src.replace(/<head([^>]*)>/i, function (m) { return m + head; }).replace(/<\/body>/i, function () { return tail + '</body>'; });
  }
  var curFrame = null;
  function mountFrame(a) {
    var f = document.createElement('iframe');
    f.className = 'sheet__f'; f.title = a.titulo; f.style.height = '70vh';
    f.srcdoc = frameDoc(a);
    $('#sheet').appendChild(f); curFrame = f;
  }
  window.addEventListener('message', function (e) {
    if (!curFrame || e.source !== curFrame.contentWindow) return;
    var d = e.data || {};
    if (d.tma === 'h' && d.h > 50) { curFrame.style.height = d.h + 'px'; $('#sheet').classList.add('on'); }
    else if (d.tma === 'toast') toast(d.m);
    else if (d.tma === 'y') scrollTo({ top: curFrame.getBoundingClientRect().top + scrollY + d.y - 80, behavior: 'smooth' });
    else if (d.tma === 'go') {
      var k = d.href, id = TMA_LINKS[k];
      if (id === undefined && k.indexOf('#') > 0) id = TMA_LINKS[k.slice(k.indexOf('#'))];
      if (id !== undefined) location.hash = id ? '#/aula/' + id : '#/';
    }
  });

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
      if (r.lesson.secoes) mountFrame(r.lesson); else { var R0 = R[r.lesson.tipo]; if (R0 && R0.init) R0.init(r.lesson); }
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
