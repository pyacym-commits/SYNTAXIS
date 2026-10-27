/* ============================================================
   Minino Alex · Motor común de las demos por rubro
   Todo es frontend con datos de ejemplo. Nada se cobra ni se
   guarda en un servidor: lo que se "guarda" queda en el navegador.
   ============================================================ */
(function () {
  'use strict';

  var ALEX_WA = '5491130345982';
  var ALEX_IG = 'mininoalex_';
  var cfgGlobal = { slug: 'demo', rubro: 'negocio', biz: 'Negocio de ejemplo', features: [] };

  /* ---------- utilidades ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function fmt(n) { return '$ ' + Math.round(n || 0).toLocaleString('es-AR'); }
  function el(html) { var t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }
  function hash(str) { var h = 2166136261; for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function waLink(text) { return 'https://wa.me/' + ALEX_WA + '?text=' + encodeURIComponent(text); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  var DIAS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  var DIAS_L = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  var MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  function isoDate(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function niceDate(iso) { var p = iso.split('-'); var d = new Date(+p[0], +p[1] - 1, +p[2]); return DIAS_L[d.getDay()] + ' ' + d.getDate() + ' de ' + MESES[d.getMonth()]; }
  function toMin(hhmm) { var p = hhmm.split(':'); return (+p[0]) * 60 + (+p[1]); }
  function toHHMM(m) { return pad(Math.floor(m / 60)) + ':' + pad(m % 60); }

  /* ---------- almacenamiento (siempre con try/catch) ---------- */
  var memory = {};
  function key(k) { return 'ma-demo:' + cfgGlobal.slug + ':' + k; }
  var store = {
    get: function (k, fallback) {
      try { var v = window.localStorage.getItem(key(k)); if (v != null) return JSON.parse(v); } catch (e) { }
      return memory[k] !== undefined ? memory[k] : fallback;
    },
    set: function (k, v) {
      memory[k] = v;
      try { window.localStorage.setItem(key(k), JSON.stringify(v)); } catch (e) { }
    },
    del: function (k) {
      delete memory[k];
      try { window.localStorage.removeItem(key(k)); } catch (e) { }
    }
  };

  /* ---------- íconos comunes ---------- */
  var IC = {
    wa: '<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-2c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.4c-2.1 0-4.1-.6-5.9-1.7l-.4-.3-3.8 1.2 1.2-3.7-.3-.4a10.4 10.4 0 01-1.6-5.6C5.2 10 10 5.3 16 5.3S26.8 10 26.8 15.8 22 26.4 16 26.4zm5.9-7.8c-.3-.2-1.9-1-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.2 1.4 3.4c.2.2 2.4 3.6 5.8 5 .8.4 1.4.6 1.9.7.8.3 1.6.2 2.2.1.7-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0112 2.5a7 7 0 017 7C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M2 6h11v10H2zM13 9h4l4 4v3h-8z"/><circle cx="6" cy="18" r="2" fill="#fff"/><circle cx="17" cy="18" r="2" fill="#fff"/></svg>'
  };

  /* ---------- toast ---------- */
  var toastEl, toastT;
  function toast(msg) {
    if (!toastEl) { toastEl = el('<div class="ma-toast" role="status" aria-live="polite"></div>'); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('show'); }, 2600);
  }

  /* ---------- hoja/modal ---------- */
  var sheetBg, lastFocus;
  function openSheet(html, onMount) {
    closeSheet(true);
    lastFocus = document.activeElement;
    sheetBg = el('<div class="sheet-bg" role="dialog" aria-modal="true"><div class="sheet"><button class="x" type="button" aria-label="Cerrar">×</button><div class="sheet-c"></div></div></div>');
    $('.sheet-c', sheetBg).innerHTML = html;
    document.body.appendChild(sheetBg);
    requestAnimationFrame(function () { sheetBg.classList.add('open'); });
    sheetBg.addEventListener('click', function (e) { if (e.target === sheetBg || e.target.closest('.x')) closeSheet(); });
    document.addEventListener('keydown', escClose);
    if (onMount) onMount($('.sheet-c', sheetBg));
    var f = $('.sheet button, .sheet input, .sheet a', sheetBg); if (f) setTimeout(function () { f.focus(); }, 60);
    return sheetBg;
  }
  function escClose(e) { if (e.key === 'Escape') closeSheet(); }
  function closeSheet(instant) {
    document.removeEventListener('keydown', escClose);
    if (!sheetBg) return;
    var s = sheetBg; sheetBg = null;
    if (instant) { s.remove(); return; }
    s.classList.remove('open'); setTimeout(function () { s.remove(); }, 300);
    if (lastFocus && lastFocus.focus) try { lastFocus.focus(); } catch (e) { }
  }

  /* Muestra el mensaje armado tal como llegaría por WhatsApp */
  function sendWA(text, opts) {
    opts = opts || {};
    var html = '<h3>' + esc(opts.title || 'Así te llega por WhatsApp') + '</h3>' +
      '<div class="wa-preview">' + esc(text) + '</div>' +
      '<p class="wa-note">' + esc(opts.note || ('En tu página, este mensaje te llega directo a tu WhatsApp, ya armado. Como esto es una demo, si tocás “Enviar” le llega a Alex: así ves cómo queda.')) + '</p>' +
      '<div style="display:grid;gap:8px"><a class="btn wa block" target="_blank" rel="noopener" href="' + waLink(text) + '">' + IC.wa.replace('<svg', '<svg width="20" height="20"') + ' Enviar por WhatsApp</a>' +
      '<button class="btn ghost block" type="button" data-close>Listo, solo quería verlo</button></div>';
    openSheet(html, function (c) { $('[data-close]', c).addEventListener('click', function () { closeSheet(); }); });
  }

  /* ---------- aparición al scroll ---------- */
  function reveal() {
    var items = $$('[data-reveal]');
    if (!('IntersectionObserver' in window)) { items.forEach(function (i) { i.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    items.forEach(function (i) { io.observe(i); });
  }

  /* ---------- horarios: abierto ahora + tabla ---------- */
  // hours: { 0:null, 1:[['09:00','13:00'],['16:00','20:00']], ... }
  function isOpen(hours, d) {
    d = d || new Date();
    var h = hours[d.getDay()]; if (!h) return false;
    var m = d.getHours() * 60 + d.getMinutes();
    return h.some(function (r) { var a = toMin(r[0]), b = toMin(r[1]); if (b <= a) b += 1440; return (m >= a && m < b) || (m + 1440 >= a && m + 1440 < b); });
  }
  function hoursUI(hours) {
    var open = isOpen(hours);
    $$('[data-open-badge]').forEach(function (b) {
      b.classList.add('open-badge'); b.classList.toggle('is-open', open);
      b.innerHTML = '<i aria-hidden="true"></i>' + (open ? 'Abierto ahora' : 'Cerrado ahora');
    });
    $$('[data-hours]').forEach(function (t) {
      var order = [1, 2, 3, 4, 5, 6, 0], today = new Date().getDay();
      t.innerHTML = '<tbody>' + order.map(function (i) {
        var h = hours[i];
        return '<tr' + (i === today ? ' class="today"' : '') + '><td>' + DIAS_L[i].charAt(0).toUpperCase() + DIAS_L[i].slice(1) + (i === today ? ' (hoy)' : '') + '</td><td>' + (h ? h.map(function (r) { return r[0] + ' a ' + r[1]; }).join(' · ') : 'Cerrado') + '</td></tr>';
      }).join('') + '</tbody>';
    });
  }

  /* ---------- capa Minino Alex: banner, flotantes, franja, footer ---------- */
  var FEATS = [
    ['wa', 'Botones de WhatsApp e Instagram', 'Siempre a mano, en cada pantalla'],
    ['redes', 'Integración con tus redes', 'Link en la bio, Google Maps y Facebook'],
    ['catalogo', 'Catálogo o menú con precios', 'Con buscador y pedido armado'],
    ['turnos', 'Turnos online', 'El cliente elige día y horario'],
    ['caja', 'Cierre de caja', 'Total del día por medio de pago'],
    ['stock', 'Control de stock', 'Te avisa lo que falta'],
    ['fiado', 'Fiado', 'Quién debe cuánto, sin cuaderno'],
    ['fichero', 'Fichero de clientes', 'Historial y avisos por WhatsApp'],
    ['cambios', 'Cambios de precios, fotos y textos', 'Incluido en la mensualidad']
  ];

  function maLayer(cfg) {
    var rubro = cfg.rubro;
    var msg = 'Hola Alex 👋 Vi la demo de ' + rubro + ' (' + cfg.biz + ') y quiero una página así para mi ' + rubro + '.';
    var banner = el('<div class="ma-banner" role="region" aria-label="Aviso de página de ejemplo"><div class="wrap">' +
      '<span class="dot" aria-hidden="true"></span>' +
      '<p><b>Página de ejemplo hecha por Alex</b> — ¿querés una así para tu ' + esc(rubro) + '? <span class="hide-sm" style="color:#8f8e89">Negocio y datos inventados.</span></p>' +
      '<a class="cta" target="_blank" rel="noopener" href="' + waLink(msg) + '">Quiero una</a>' +
      '<a class="back" href="/demos/">← Otras demos</a></div></div>');
    document.body.insertBefore(banner, document.body.firstChild);

    var fl = el('<div class="ma-float">' +
      '<a class="f-ig" href="https://instagram.com/' + ALEX_IG + '" target="_blank" rel="noopener" aria-label="Instagram">' + IC.ig + '</a>' +
      '<a class="f-wa" href="' + waLink(msg) + '" target="_blank" rel="noopener" aria-label="WhatsApp">' + IC.wa + '</a></div>');
    document.body.appendChild(fl);

    var on = cfg.features || [];
    var slot = $('[data-ma-offer]') || (function () { var d = document.createElement('div'); var f = $('footer'); if (f) f.parentNode.insertBefore(d, f); else document.body.appendChild(d); return d; })();
    slot.outerHTML = '<section class="ma-offer" id="tu-pagina" aria-labelledby="ma-offer-t"><div class="wrap">' +
      '<div data-reveal><span class="kicker">ESTO PUEDE TENER TU PÁGINA</span>' +
      '<h2 id="ma-offer-t">Una así para tu ' + esc(rubro) + ', hecha por alguien de la zona.</h2>' +
      '<div class="ma-prices">' +
      '<div class="ma-price"><div><b>Página</b><small>Adaptada al celular, con tus precios y WhatsApp</small></div><span class="v">$50.000<br><small style="color:#a3a29d">pago único</small></span></div>' +
      '<div class="ma-price"><div><b>Mantenimiento</b><small>Como el abono del celular: sigue online y actualizada sin que te preocupes</small></div><span class="v">$5.000 a $10.000<br><small style="color:#a3a29d">por mes</small></span></div>' +
      '<div class="ma-price"><div><b>Sistemas</b><small>Turnos, caja, stock, fiado, fichero</small></div><span class="v">a presupuesto</span></div>' +
      '</div><p class="ma-legend" style="margin-top:10px">Dominio propio (.com.ar) aparte y opcional. Si la compu del local anda mal, también hago service técnico.</p></div>' +
      '<div data-reveal data-reveal-d="1"><div class="ma-feats">' +
      FEATS.map(function (f) {
        var isOn = on.indexOf(f[0]) > -1 || f[0] === 'wa' || f[0] === 'cambios';
        return '<div class="ma-feat' + (isOn ? ' on' : '') + '"><i aria-hidden="true">' + (isOn ? '✓' : '+') + '</i><span>' + esc(f[1]) + '<small>' + (isOn ? (f[0] === 'cambios' ? f[2] : 'Lo estás viendo en esta demo') : 'Se puede sumar') + '</small></span></div>';
      }).join('') +
      '</div><div class="ctas" style="margin-top:16px"><a class="btn blue" target="_blank" rel="noopener" href="' + waLink(msg) + '">' + IC.wa.replace('<svg', '<svg width="20" height="20"') + ' Quiero una para mi ' + esc(cfg.rubroCorto || rubro) + '</a>' +
      '<a class="btn line" href="/demos/">Ver otras demos</a></div></div>' +
      '</div></section>';

    var mf = el('<div class="ma-foot"><div class="wrap"><span>Demo hecha por <a href="/">Minino Alex</a> · Glew, Zona Sur</span>' +
      '<span><a href="/demos/">Todas las demos</a> · <a href="https://instagram.com/' + ALEX_IG + '" target="_blank" rel="noopener">@' + ALEX_IG + '</a> · <a target="_blank" rel="noopener" href="' + waLink('Hola Alex 👋') + '">WhatsApp 11 3034-5982</a></span></div></div>');
    document.body.appendChild(mf);
  }

  /* =========================================================
     TURNOS: servicio → profesional → día → horario → datos → OK
     ========================================================= */
  function booking(root, c) {
    var st = { step: 0, svc: null, pro: null, day: null, slot: null, name: '', phone: '', note: '' };
    var STEPS = ['Servicio', c.proLabel || 'Profesional', 'Día y horario', 'Tus datos', 'Listo'];
    root.classList.add('booker');

    function svc() { return c.services.filter(function (s) { return s.id === st.svc; })[0]; }
    function pro() { return st.pro === 'any' ? { id: 'any', name: 'Cualquiera disponible' } : c.pros.filter(function (p) { return p.id === st.pro; })[0]; }
    function days() {
      var out = [], d = new Date(); d.setHours(0, 0, 0, 0);
      for (var i = 0; out.length < 12 && i < 20; i++) {
        var x = new Date(d); x.setDate(d.getDate() + i);
        out.push({ iso: isoDate(x), d: x, open: !!c.hours[x.getDay()] });
      }
      return out;
    }
    function taken(iso, t, proId) {
      var saved = store.get('turnos', []).some(function (b) { return b.date === iso && b.time === t && (proId === 'any' || b.pro === proId || b.pro === 'any'); });
      if (saved) return true;
      var ids = proId === 'any' ? c.pros.map(function (p) { return p.id; }) : [proId];
      // Ocupación de ejemplo, siempre igual para el mismo día y horario
      return ids.every(function (id) { return hash(iso + t + id + c.seed) % 100 < (c.busy || 42); });
    }
    function slots(iso) {
      var d = new Date(iso + 'T00:00:00'), ranges = c.hours[d.getDay()] || [], dur = (svc() && svc().dur) || 30, step = c.step || 30, out = [];
      var now = new Date(), isToday = iso === isoDate(now), nowM = now.getHours() * 60 + now.getMinutes();
      ranges.forEach(function (r) {
        for (var m = toMin(r[0]); m + dur <= toMin(r[1]); m += step) {
          var t = toHHMM(m);
          out.push({ t: t, off: (isToday && m <= nowM + 30) || taken(iso, t, st.pro) });
        }
      });
      return out;
    }

    function render() {
      var s = st.step, h = '';
      h += '<div class="steps-bar" aria-hidden="true">' + STEPS.map(function (_, i) { return '<span class="' + (i <= s ? 'done' : '') + '"></span>'; }).join('') + '</div>';
      h += '<div class="step-pane">';
      if (s === 0) {
        h += title('¿Qué te querés hacer?', 1);
        h += '<div class="opt-list c2">' + c.services.map(function (x) {
          return '<button type="button" class="opt" data-svc="' + x.id + '" aria-pressed="' + (st.svc === x.id) + '"><span class="grow"><b>' + esc(x.name) + '</b><small>' + esc(x.desc || '') + ' · ' + x.dur + ' min</small></span><span class="price">' + fmt(x.price) + '</span></button>';
        }).join('') + '</div>';
      } else if (s === 1) {
        h += title('¿Con quién?', 2);
        var list = c.pros.filter(function (p) { return !p.only || p.only.indexOf(st.svc) > -1; });
        h += '<div class="opt-list c2">' + list.map(function (p) {
          return '<button type="button" class="opt" data-pro="' + p.id + '" aria-pressed="' + (st.pro === p.id) + '"><span class="avatar" style="background:' + (p.color || 'var(--accent)') + '">' + esc(p.initials) + '</span><span class="grow"><b>' + esc(p.name) + '</b><small>' + esc(p.role) + '</small></span></button>';
        }).join('') + '<button type="button" class="opt" data-pro="any" aria-pressed="' + (st.pro === 'any') + '"><span class="avatar" style="background:var(--surface-2);color:var(--text)">?</span><span class="grow"><b>Me da igual</b><small>El primer horario libre</small></span></button></div>';
      } else if (s === 2) {
        h += title('Elegí día y horario', 3);
        h += '<div class="days" role="group" aria-label="Días">' + days().map(function (d) {
          return '<button type="button" class="day" data-day="' + d.iso + '" ' + (d.open ? '' : 'disabled') + ' aria-pressed="' + (st.day === d.iso) + '"><small>' + (d.iso === isoDate(new Date()) ? 'Hoy' : DIAS[d.d.getDay()]) + '</small><b>' + d.d.getDate() + '</b><small>' + MESES[d.d.getMonth()] + '</small></button>';
        }).join('') + '</div>';
        if (st.day) {
          var sl = slots(st.day), free = sl.filter(function (x) { return !x.off; }).length;
          h += '<p class="muted" style="font-size:14px;margin-top:12px">' + (free ? free + ' horarios libres el ' + niceDate(st.day) : 'No quedan horarios ese día, probá otro.') + '</p>';
          h += '<div class="slots" role="group" aria-label="Horarios">' + sl.map(function (x) { return '<button type="button" class="slot" data-slot="' + x.t + '" ' + (x.off ? 'disabled aria-label="' + x.t + ' ocupado"' : '') + ' aria-pressed="' + (st.slot === x.t) + '">' + x.t + '</button>'; }).join('') + '</div>';
        } else h += '<p class="muted" style="font-size:14px;margin-top:12px">Tocá un día para ver los horarios.</p>';
      } else if (s === 3) {
        h += title('Tus datos', 4);
        h += '<div class="grid" style="gap:12px"><label class="field">Nombre<input name="n" autocomplete="given-name" required value="' + esc(st.name) + '" placeholder="Ej: Caro"></label>' +
          '<label class="field">Celular<input name="p" inputmode="tel" autocomplete="tel" value="' + esc(st.phone) + '" placeholder="11 2345-6789"></label>' +
          '<label class="field">' + esc(c.noteLabel || '¿Algo que debamos saber? (opcional)') + '<input name="o" value="' + esc(st.note) + '" placeholder="' + esc(c.notePh || '') + '"></label></div>';
        h += '<div class="summary" style="margin-top:14px">' + summary() + '</div>';
      } else {
        var b = st.saved;
        h += '<div style="text-align:center"><svg class="check-anim" viewBox="0 0 64 64" fill="none" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="32" cy="32" r="28"/><path d="M20 33l8 8 16-17"/></svg>' +
          '<h3 style="font-size:26px">¡Turno reservado, ' + esc(b.name) + '!</h3><p class="muted" style="margin:6px 0 16px">Ahora mandalo por WhatsApp y queda confirmado.</p></div>';
        h += '<div class="summary">' + summary() + '</div>';
        h += '<div style="display:grid;gap:8px;margin-top:16px"><button type="button" class="btn wa block" data-wa>' + IC.wa.replace('<svg', '<svg width="20" height="20"') + ' Confirmar por WhatsApp</button>' +
          '<button type="button" class="btn ghost block" data-again>Sacar otro turno</button></div>' +
          '<p class="toggle-note" style="text-align:center">Mirá abajo: el turno ya aparece en el panel de ' + esc(c.ownerName || 'la dueña') + '.</p>';
      }
      h += '</div>';
      if (s < 4) {
        var can = (s === 0 && st.svc) || (s === 1 && st.pro) || (s === 2 && st.slot) || s === 3;
        h += '<div class="step-nav">' + (s > 0 ? '<button type="button" class="btn ghost" data-back>← Atrás</button>' : '<span></span>') +
          '<button type="button" class="btn" data-next ' + (can ? '' : 'disabled') + '>' + (s === 3 ? 'Reservar turno' : 'Seguir →') + '</button></div>';
      }
      root.innerHTML = h;
    }
    function deposit(x) { return c.depositPct ? Math.round(x.price * c.depositPct / 10000) * 100 : 0; }
    function title(t, n) { return '<div class="step-title"><h3>' + t + '</h3><small>PASO ' + n + ' DE 4</small></div>'; }
    function summary() {
      var x = svc(), p = pro(), dep = deposit(x);
      return '<div><span>Servicio</span><b>' + esc(x.name) + '</b></div><div><span>' + esc(c.proLabel || 'Profesional') + '</span><b>' + esc(p.name) + '</b></div>' +
        '<div><span>Cuándo</span><b>' + niceDate(st.day) + ', ' + st.slot + ' h</b></div><div><span>Precio</span><b class="price">' + fmt(x.price) + '</b></div>' +
        (dep ? '<div><span>Seña para reservar</span><b class="price">' + fmt(dep) + '</b></div>' : '');
    }
    function message() {
      var x = svc(), p = pro(), b = st.saved;
      var dep = deposit(x);
      return 'Hola ' + c.bizShort + '! Quiero confirmar mi turno 🗓️\n\n' +
        '• Servicio: ' + x.name + ' (' + fmt(x.price) + ')\n' +
        '• ' + (c.proLabel || 'Profesional') + ': ' + p.name + '\n' +
        '• Día: ' + niceDate(b.date) + '\n• Hora: ' + b.time + ' h\n' +
        '• Nombre: ' + b.name + (b.phone ? '\n• Cel: ' + b.phone : '') + (b.note ? '\n• Nota: ' + b.note : '') +
        (dep ? '\n\nTe mando la seña de ' + fmt(dep) + ' para dejarlo reservado.' : '');
    }

    root.addEventListener('click', function (e) {
      var t = e.target.closest('button'); if (!t || t.disabled) return;
      if (t.dataset.svc) { st.svc = t.dataset.svc; st.slot = null; render(); }
      else if (t.dataset.pro) { st.pro = t.dataset.pro; st.slot = null; render(); }
      else if (t.dataset.day) { st.day = t.dataset.day; st.slot = null; render(); }
      else if (t.dataset.slot) { st.slot = t.dataset.slot; render(); }
      else if (t.hasAttribute('data-back')) { st.step--; render(); focusTop(); }
      else if (t.hasAttribute('data-next')) {
        if (st.step === 1 && !st.day) { var first = days().filter(function (d) { return d.open; })[0]; st.day = first && first.iso; }
        if (st.step === 3) {
          var n = $('[name=n]', root);
          if (!n.value.trim()) { n.focus(); n.style.borderColor = 'var(--bad)'; toast('Poné tu nombre así sabemos quién viene'); return; }
          st.name = n.value.trim(); st.phone = $('[name=p]', root).value.trim(); st.note = $('[name=o]', root).value.trim();
          var x = svc(), p = pro();
          st.saved = { id: Date.now(), date: st.day, time: st.slot, svc: x.name, price: x.price, pro: p.id, proName: p.name, name: st.name, phone: st.phone, note: st.note };
          var list = store.get('turnos', []); list.push(st.saved); store.set('turnos', list);
          document.dispatchEvent(new CustomEvent('ma:turno', { detail: st.saved }));
        }
        st.step++; render(); focusTop();
      }
      else if (t.hasAttribute('data-wa')) sendWA(message(), { title: 'Tu turno, listo para mandar' });
      else if (t.hasAttribute('data-again')) { st = { step: 0, svc: null, pro: null, day: null, slot: null, name: st.name, phone: st.phone, note: '' }; render(); focusTop(); }
    });
    root.addEventListener('input', function (e) { if (e.target.name === 'n') e.target.style.borderColor = ''; });
    function focusTop() { var r = root.getBoundingClientRect(); if (r.top < 70) window.scrollTo({ top: window.scrollY + r.top - 130, behavior: 'smooth' }); }
    render();
  }

  /* =========================================================
     CIERRE DE CAJA
     ========================================================= */
  var MEDIOS = ['Efectivo', 'Transferencia', 'QR / Mercado Pago', 'Débito'];
  function caja(root, c) {
    c = c || {};
    var K = 'caja-' + isoDate(new Date());
    function load() { return store.get(K, null) || (c.seed || []).map(function (m, i) { return { id: i + 1, c: m[0], m: m[1], medio: m[2], t: m[3] || '' }; }); }
    function save(v) { store.set(K, v); }
    var freshId = null;
    function render() {
      var list = load(), tot = 0, by = {};
      list.forEach(function (x) { tot += x.m; by[x.medio] = (by[x.medio] || 0) + x.m; });
      var dig = (by['Transferencia'] || 0) + (by['QR / Mercado Pago'] || 0) + (by['Débito'] || 0);
      root.innerHTML = '<div class="kpis"><div class="kpi hl"><small>Total del día</small><b>' + fmt(tot) + '</b></div><div class="kpi"><small>Efectivo</small><b>' + fmt(by['Efectivo']) + '</b></div><div class="kpi"><small>Transf. / QR / Débito</small><b>' + fmt(dig) + '</b></div><div class="kpi"><small>' + esc(c.countLabel || 'Movimientos') + '</small><b>' + list.length + '</b></div></div>' +
        '<div class="rows" data-list>' + (list.length ? list.slice().reverse().map(function (x) {
          return '<div class="row' + (x.id === freshId ? ' new' : '') + '"><span class="time" style="font-size:14px;min-width:44px">' + esc(x.t) + '</span><span class="grow"><b>' + esc(x.c) + '</b><small>' + esc(x.medio) + '</small></span><span class="price">' + fmt(x.m) + '</span><button type="button" class="chip" style="min-height:32px;padding:4px 10px" data-del="' + x.id + '" aria-label="Borrar ' + esc(x.c) + '">×</button></div>';
        }).join('') : '<div class="empty">Todavía no hay movimientos hoy.</div>') + '</div>' +
        '<form class="inline-form" data-form><label class="field">Concepto<input name="c" required placeholder="' + esc(c.ph || 'Ej: venta mostrador') + '"></label>' +
        '<label class="field">Monto<input name="m" required inputmode="numeric" placeholder="0"></label>' +
        '<label class="field">Medio<select name="medio">' + MEDIOS.map(function (m) { return '<option>' + m + '</option>'; }).join('') + '</select></label>' +
        '<button class="btn" type="submit">Anotar</button></form>' +
        '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px"><button type="button" class="btn wa" data-close-caja>' + IC.wa.replace('<svg', '<svg width="18" height="18"') + ' Cerrar caja y mandar resumen</button><button type="button" class="btn ghost sm" data-reset>Reiniciar ejemplo</button></div>';
      freshId = null;
    }
    root.addEventListener('submit', function (e) {
      e.preventDefault(); var f = e.target;
      var m = parseInt(String(f.m.value).replace(/\D/g, ''), 10);
      if (!f.c.value.trim() || !m) { toast('Completá concepto y monto'); return; }
      add(f.c.value.trim(), m, f.medio.value);
    });
    root.addEventListener('click', function (e) {
      var t = e.target.closest('button'); if (!t) return;
      if (t.dataset.del) { save(load().filter(function (x) { return String(x.id) !== t.dataset.del; })); render(); }
      if (t.hasAttribute('data-reset')) { store.del(K); render(); toast('Volvió al ejemplo original'); }
      if (t.hasAttribute('data-close-caja')) {
        var list = load(), tot = 0, by = {};
        list.forEach(function (x) { tot += x.m; by[x.medio] = (by[x.medio] || 0) + x.m; });
        var txt = '📊 Cierre de caja — ' + niceDate(isoDate(new Date())) + '\n' + c.biz + '\n\n' +
          MEDIOS.filter(function (m) { return by[m]; }).map(function (m) { return '• ' + m + ': ' + fmt(by[m]); }).join('\n') +
          '\n\nTOTAL: ' + fmt(tot) + '\n' + list.length + ' ' + (c.countLabel || 'movimientos').toLowerCase();
        sendWA(txt, { title: 'Resumen del día', note: 'Con un toque te mandás el cierre a vos o a tu socio. En la demo le llega a Alex.' });
      }
    });
    function add(concepto, monto, medio) {
      var d = new Date(), list = load();
      freshId = Date.now();
      list.push({ id: freshId, c: concepto, m: monto, medio: medio || 'Efectivo', t: pad(d.getHours()) + ':' + pad(d.getMinutes()) });
      save(list); render();
    }
    render();
    return { add: add, render: render };
  }

  /* =========================================================
     PANEL DE LA DUEÑA (turnos del día + caja)
     ========================================================= */
  function ownerPanel(root, c) {
    root.classList.add('panel');
    root.innerHTML = '<div class="panel-head"><div><b>' + esc(c.title || 'Panel de la dueña') + '</b><br><small>Solo lo ve el negocio · datos de ejemplo</small></div><span class="tag" style="background:rgba(255,255,255,.15);color:inherit">Hoy ' + new Date().getDate() + ' ' + MESES[new Date().getMonth()] + '</span></div>' +
      '<div class="tabs" role="tablist"><button role="tab" aria-selected="true" data-tab="t">Turnos</button><button role="tab" aria-selected="false" data-tab="c">Cierre de caja</button></div>' +
      '<div class="panel-body"><div data-pane="t"></div><div data-pane="c" hidden></div></div>';
    var paneT = $('[data-pane=t]', root), paneC = $('[data-pane=c]', root);
    var cj = caja(paneC, { biz: c.biz, seed: c.cajaSeed, ph: c.cajaPh, countLabel: 'Cobros' });
    var doneK = 'atendidos-' + isoDate(new Date());

    function renderT(newId) {
      var today = isoDate(new Date());
      var mine = store.get('turnos', []);
      var list = c.sample.map(function (s, i) { return { id: 's' + i, date: today, time: s[0], name: s[1], svc: s[2], proName: s[3], price: s[4] }; })
        .concat(mine.filter(function (b) { return b.date >= today; }));
      list.sort(function (a, b) { return (a.date + a.time).localeCompare(b.date + b.time); });
      var done = store.get(doneK, []);
      var hoy = list.filter(function (b) { return b.date === today; }), prox = list.filter(function (b) { return b.date !== today; });
      var plata = hoy.reduce(function (a, b) { return a + (b.price || 0); }, 0);
      var h = '<div class="kpis"><div class="kpi hl"><small>Turnos hoy</small><b>' + hoy.length + '</b></div><div class="kpi"><small>Atendidos</small><b>' + done.length + '</b></div><div class="kpi"><small>A cobrar hoy</small><b>' + fmt(plata) + '</b></div><div class="kpi"><small>Próximos días</small><b>' + prox.length + '</b></div></div>';
      function row(b) {
        var isDone = done.indexOf(String(b.id)) > -1;
        return '<div class="row' + (String(b.id) === String(newId) ? ' new' : '') + (isDone ? ' dim' : '') + '"><span class="time">' + b.time + '</span><span class="grow"><b>' + esc(b.name) + ' · ' + esc(b.svc) + '</b><small>' + (b.date !== today ? niceDate(b.date) + ' · ' : '') + esc(b.proName || '') + (b.price ? ' · ' + fmt(b.price) : '') + '</small></span>' +
          (b.date === today ? '<button type="button" class="chip' + (isDone ? ' on' : '') + '" data-done="' + b.id + '" aria-pressed="' + isDone + '">' + (isDone ? '✓ Cobrado' : 'Cobrar') + '</button>' : '<button type="button" class="chip" data-remind="' + b.id + '">Recordar</button>') + '</div>';
      }
      h += '<div class="rows">' + (hoy.length ? hoy.map(row).join('') : '<div class="empty">No hay turnos hoy.</div>') + '</div>';
      if (prox.length) h += '<p class="eyebrow" style="margin:18px 0 8px">Próximos</p><div class="rows">' + prox.map(row).join('') + '</div>';
      h += '<p class="toggle-note">Tocá “Cobrar” y el turno se suma solo al cierre de caja. Los turnos que reservás arriba aparecen acá.</p>';
      paneT.innerHTML = h;
      root._list = list;
    }
    root.addEventListener('click', function (e) {
      var t = e.target.closest('button'); if (!t) return;
      if (t.dataset.tab) {
        $$('[data-tab]', root).forEach(function (b) { b.setAttribute('aria-selected', b === t); });
        paneT.hidden = t.dataset.tab !== 't'; paneC.hidden = t.dataset.tab !== 'c';
      }
      if (t.dataset.done) {
        var done = store.get(doneK, []), id = t.dataset.done, b = root._list.filter(function (x) { return String(x.id) === id; })[0];
        if (done.indexOf(id) > -1) { toast('Ya está cobrado y sumado a la caja'); return; }
        done.push(id); store.set(doneK, done);
        cj.add(b.svc + ' — ' + b.name, b.price || 0, 'Efectivo');
        toast('Cobrado: ' + fmt(b.price) + ' sumado a la caja'); renderT();
      }
      if (t.dataset.remind) {
        var r = root._list.filter(function (x) { return String(x.id) === t.dataset.remind; })[0];
        sendWA('Hola ' + r.name + '! Te recordamos tu turno en ' + c.biz + ' 💬\n' + r.svc + ' — ' + niceDate(r.date) + ' a las ' + r.time + ' h.\nSi no podés venir, avisanos así le damos el lugar a otra persona 🙏', { title: 'Recordatorio para la clienta', note: 'Así se reducen los que no avisan y no vienen. En tu página va al cel de la clienta; en la demo, a Alex.' });
      }
    });
    document.addEventListener('ma:turno', function (e) { renderT(e.detail.id); });
    renderT();
  }

  /* =========================================================
     CATÁLOGO / MENÚ con pedido por WhatsApp
     ========================================================= */
  function catalog(root, c) {
    var cart = store.get('cart', {});
    var q = '', cat = 'Todo';
    var cats = ['Todo'].concat(c.items.reduce(function (a, i) { if (a.indexOf(i.cat) < 0) a.push(i.cat); return a; }, []));
    var unit = function (i) { return i.unit ? ' <small style="display:inline;font-weight:600;color:var(--muted)">/ ' + esc(i.unit) + '</small>' : ''; };
    root.innerHTML = '<div class="cat-tools"><label class="search"><span class="sr-only">Buscar</span>' + IC.search + '<input class="input" type="search" placeholder="' + esc(c.searchPh || 'Buscá un producto…') + '" data-q></label>' +
      '<div class="chips" role="group" aria-label="Categorías">' + cats.map(function (x) { return '<button type="button" class="chip" data-cat="' + esc(x) + '" aria-pressed="' + (x === cat) + '">' + esc(x) + '</button>'; }).join('') + '</div></div>' +
      '<div class="products" data-grid aria-live="polite"></div>';
    var grid = $('[data-grid]', root);
    var bar = el('<div class="cart-bar" role="region" aria-label="Tu pedido"><span class="grow"><small data-cnt></small><b data-tot></b></span><button type="button" class="btn" data-open>' + esc(c.cta || 'Ver pedido') + ' →</button></div>');
    document.body.appendChild(bar);

    function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
    function thumb(i) {
      if (i.mark) return '<span class="thumb" aria-hidden="true" style="' + (i.bg ? 'background:' + i.bg : '') + '"><span style="font-family:var(--display);font-weight:800;font-size:' + (i.mark.length > 3 ? 18 : 24) + 'px;letter-spacing:-.02em;color:' + (i.fg || 'var(--text)') + '">' + esc(i.mark) + '</span></span>';
      var p = (c.icons && (c.icons[i.icon] || c.icons[i.cat])) || '';
      return '<span class="thumb" aria-hidden="true" style="' + (i.bg ? 'background:' + i.bg : '') + '"><svg viewBox="0 0 64 64" fill="none" stroke="' + (i.fg || 'currentColor') + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' + p + '</svg></span>';
    }
    function lineKey(i, v) { return i.id + (v ? '|' + v : ''); }
    function renderGrid() {
      var nq = norm(q);
      var list = c.items.filter(function (i) { return (cat === 'Todo' || i.cat === cat) && (!nq || norm(i.name + ' ' + (i.desc || '') + ' ' + i.cat + ' ' + (i.kw || '')).indexOf(nq) > -1); });
      grid.innerHTML = list.length ? list.map(function (i) {
        var out = i.stock === 0;
        var vSel = i.variants ? '<select data-var="' + i.id + '" aria-label="Talle de ' + esc(i.name) + '">' + i.variants.map(function (v) { var vs = i.vstock && i.vstock[v] === 0; return '<option value="' + esc(v) + '"' + (vs ? ' disabled' : '') + '>' + esc(v) + (vs ? ' (agotado)' : '') + '</option>'; }).join('') + '</select>' : '';
        var inCart = Object.keys(cart).filter(function (k) { return k.split('|')[0] === i.id; }).reduce(function (a, k) { return a + cart[k]; }, 0);
        return '<article class="prod' + (out ? ' out' : '') + '">' + thumb(i) + '<div class="info"><b>' + esc(i.name) + '</b>' + (i.desc ? '<small>' + esc(i.desc) + '</small>' : '') +
          (i.badge ? '<span><span class="tag ' + (i.badgeCls || '') + '">' + esc(i.badge) + '</span></span>' : '') +
          '<div class="foot"><span class="price">' + fmt(i.price) + unit(i) + '</span>' + vSel +
          (out ? '<span class="tag bad">Sin stock</span>' : '<button type="button" class="add" data-add="' + i.id + '" aria-label="Agregar ' + esc(i.name) + '">' + (inCart ? '+ (' + inCart + ')' : '+ Agregar') + '</button>') + '</div></div></article>';
      }).join('') : '<div class="empty no-results">No encontramos “' + esc(q) + '”. ' + (c.noResults || 'Escribinos y te decimos si lo tenemos.') + '</div>';
    }
    function totals() {
      var n = 0, t = 0;
      Object.keys(cart).forEach(function (k) { var i = find(k.split('|')[0]); if (i) { n += cart[k]; t += cart[k] * i.price; } });
      return { n: n, t: t };
    }
    function find(id) { return c.items.filter(function (i) { return i.id === id; })[0]; }
    function renderBar(bump) {
      var x = totals();
      bar.classList.toggle('show', x.n > 0); document.body.classList.toggle('has-cart', x.n > 0);
      $('[data-cnt]', bar).textContent = x.n + (x.n === 1 ? ' producto' : ' productos');
      $('[data-tot]', bar).textContent = fmt(x.t);
      if (bump) { bar.classList.remove('bump'); void bar.offsetWidth; bar.classList.add('bump'); }
    }
    function save() { store.set('cart', cart); }

    root.addEventListener('input', function (e) { if (e.target.matches('[data-q]')) { q = e.target.value; renderGrid(); } });
    root.addEventListener('click', function (e) {
      var t = e.target.closest('button'); if (!t) return;
      if (t.dataset.cat) { cat = t.dataset.cat; $$('[data-cat]', root).forEach(function (b) { b.setAttribute('aria-pressed', b === t); }); renderGrid(); }
      if (t.dataset.add) {
        var i = find(t.dataset.add), sel = $('[data-var="' + i.id + '"]', root);
        var k = lineKey(i, sel && sel.value);
        cart[k] = (cart[k] || 0) + 1; save(); renderGrid(); renderBar(true);
        toast('Agregado: ' + i.name + (sel ? ' (' + sel.value + ')' : ''));
      }
    });
    bar.addEventListener('click', function (e) { if (e.target.closest('[data-open]')) openCart(); });

    function openCart() {
      var st = { mode: (c.delivery && c.delivery.default) || 'retiro', name: store.get('cli-name', ''), addr: '', pay: 'Efectivo', extra: '' };
      function body() {
        var x = totals(), env = st.mode === 'envio' && c.delivery ? c.delivery.cost : 0;
        var free = c.delivery && c.delivery.freeFrom && x.t >= c.delivery.freeFrom;
        if (free) env = 0;
        return '<h3>' + esc(c.sheetTitle || 'Tu pedido') + '</h3><p class="muted" style="font-size:14px">' + esc(c.sheetSub || 'Revisalo y mandalo por WhatsApp. Te confirmamos al toque.') + '</p>' +
          '<div class="cart-lines">' + Object.keys(cart).map(function (k) {
            var p = k.split('|'), i = find(p[0]); if (!i) return '';
            return '<div class="cart-line"><span class="grow"><b>' + esc(i.name) + '</b><small>' + (p[1] ? esc(c.variantLabel || 'Talle') + ' ' + esc(p[1]) + ' · ' : '') + fmt(i.price) + (i.unit ? ' / ' + esc(i.unit) : '') + '</small></span><span class="qty"><button type="button" data-dec="' + esc(k) + '" aria-label="Uno menos">−</button><output>' + cart[k] + '</output><button type="button" data-inc="' + esc(k) + '" aria-label="Uno más">+</button></span></div>';
          }).join('') + '</div>' +
          (c.delivery ? '<div class="chips" role="group" aria-label="Entrega" style="margin:6px 0 4px"><button type="button" class="chip" data-mode="retiro" aria-pressed="' + (st.mode === 'retiro') + '">Retiro en el local</button><button type="button" class="chip" data-mode="envio" aria-pressed="' + (st.mode === 'envio') + '">Envío a domicilio</button></div>' +
            (st.mode === 'envio' ? '<p class="muted" style="font-size:13px;margin-bottom:8px">' + esc(c.delivery.note) + (c.delivery.freeFrom ? ' Gratis desde ' + fmt(c.delivery.freeFrom) + '.' : '') + '</p>' : '') : '') +
          '<div class="grid" style="gap:10px;margin:10px 0"><label class="field">Tu nombre<input data-f="name" value="' + esc(st.name) + '" placeholder="Ej: Marcos" autocomplete="given-name"></label>' +
          (st.mode === 'envio' ? '<label class="field">Dirección<input data-f="addr" value="' + esc(st.addr) + '" placeholder="Calle, número y entre calles" autocomplete="street-address"></label>' : '') +
          (c.extraField ? '<label class="field">' + esc(c.extraField.label) + '<input data-f="extra" value="' + esc(st.extra) + '" placeholder="' + esc(c.extraField.ph || '') + '"></label>' : '') +
          '<label class="field">¿Cómo pagás?<select data-f="pay">' + ['Efectivo', 'Transferencia', 'QR / Mercado Pago'].map(function (m) { return '<option' + (st.pay === m ? ' selected' : '') + '>' + m + '</option>'; }).join('') + '</select></label></div>' +
          (env || (st.mode === 'envio' && free) ? '<div class="cart-line"><span class="grow">Envío</span><b>' + (free ? 'Gratis' : fmt(env)) + '</b></div>' : '') +
          '<div class="total-line"><span>Total</span><span class="price">' + fmt(x.t + env) + '</span></div>' +
          '<div style="display:grid;gap:8px;margin-top:16px"><button type="button" class="btn wa block" data-send>' + IC.wa.replace('<svg', '<svg width="20" height="20"') + ' Mandar pedido por WhatsApp</button><button type="button" class="btn ghost block" data-empty>Vaciar pedido</button></div>';
      }
      openSheet(body(), function (box) {
        function re() { box.innerHTML = body(); }
        box.addEventListener('input', function (e) { var f = e.target.dataset.f; if (f) st[f] = e.target.value; });
        box.addEventListener('change', function (e) { var f = e.target.dataset.f; if (f) st[f] = e.target.value; });
        box.addEventListener('click', function (e) {
          var t = e.target.closest('button'); if (!t) return;
          if (t.dataset.inc) { cart[t.dataset.inc]++; save(); re(); renderBar(); renderGrid(); }
          if (t.dataset.dec) { if (--cart[t.dataset.dec] <= 0) delete cart[t.dataset.dec]; save(); renderBar(); renderGrid(); if (!totals().n) { closeSheet(); return; } re(); }
          if (t.dataset.mode) { st.mode = t.dataset.mode; re(); }
          if (t.hasAttribute('data-empty')) { cart = {}; save(); renderBar(); renderGrid(); closeSheet(); toast('Pedido vacío'); }
          if (t.hasAttribute('data-send')) {
            if (!st.name.trim()) { var n = $('[data-f=name]', box); n.focus(); n.style.borderColor = 'var(--bad)'; toast('Poné tu nombre'); return; }
            if (st.mode === 'envio' && !st.addr.trim()) { var a = $('[data-f=addr]', box); a.focus(); a.style.borderColor = 'var(--bad)'; toast('Falta la dirección'); return; }
            store.set('cli-name', st.name);
            var x = totals(), env = st.mode === 'envio' && c.delivery ? ((c.delivery.freeFrom && x.t >= c.delivery.freeFrom) ? 0 : c.delivery.cost) : 0;
            var lines = Object.keys(cart).map(function (k) { var p = k.split('|'), i = find(p[0]); return '• ' + cart[k] + ' × ' + i.name + (p[1] ? ' (' + (c.variantLabel || 'talle') + ' ' + p[1] + ')' : '') + ' — ' + fmt(cart[k] * i.price); }).join('\n');
            var txt = (c.greeting || ('Hola ' + c.bizShort + '! Quiero hacer este pedido:')) + '\n\n' + lines + '\n\n' +
              (c.delivery ? (st.mode === 'envio' ? '🛵 Envío a: ' + st.addr + (env ? ' (' + fmt(env) + ')' : ' (gratis)') : '🏪 Retiro en el local') + '\n' : '') +
              (st.extra ? (c.extraField.label + ': ' + st.extra + '\n') : '') +
              '💳 Pago: ' + st.pay + '\n👤 ' + st.name + '\n\nTOTAL: ' + fmt(x.t + env);
            sendWA(txt, { title: 'Tu pedido, listo para mandar' });
          }
        });
      });
    }
    renderGrid(); renderBar();
    return { open: openCart, add: function (id, n) { var i = find(id); if (!i) return; cart[id] = (cart[id] || 0) + (n || 1); save(); renderGrid(); renderBar(true); toast('Agregado: ' + i.name); } };
  }

  /* =========================================================
     CONTROL DE STOCK
     ========================================================= */
  function stock(root, c) {
    var K = 'stock';
    function load() { return store.get(K, null) || c.items.map(function (i) { return { id: i.id, name: i.name, n: i.n, min: i.min, unit: i.unit || 'u.', vence: i.vence, prov: i.prov }; }); }
    var only = false;
    function status(i) { return i.n <= 0 ? ['bad', 'Sin stock'] : i.n <= i.min ? ['warn', 'Pedir'] : ['ok', 'OK']; }
    function render() {
      var list = load(), falt = list.filter(function (i) { return i.n <= i.min; });
      var venc = list.filter(function (i) { return i.vence != null && i.vence <= 10; });
      root.innerHTML = '<div class="kpis"><div class="kpi"><small>Productos</small><b>' + list.length + '</b></div><div class="kpi hl"><small>Para pedir</small><b>' + falt.length + '</b></div><div class="kpi"><small>Sin stock</small><b>' + list.filter(function (i) { return i.n <= 0; }).length + '</b></div><div class="kpi"><small>' + (c.vence ? 'Vencen pronto' : 'Unidades') + '</small><b>' + (c.vence ? venc.length : list.reduce(function (a, i) { return a + i.n; }, 0)) + '</b></div></div>' +
        '<div class="chips" style="margin-bottom:10px"><button type="button" class="chip" data-only aria-pressed="' + only + '">Ver solo lo que falta</button></div>' +
        '<div class="rows">' + list.filter(function (i) { return !only || i.n <= i.min; }).map(function (i) {
          var s = status(i);
          return '<div class="row"><span class="grow"><b>' + esc(i.name) + '</b><small>Mínimo ' + i.min + ' ' + esc(i.unit) + (i.vence != null ? ' · ' + (i.vence <= 10 ? '<span style="color:var(--bad);font-weight:700">vence en ' + i.vence + ' días</span>' : 'vence en ' + i.vence + ' días') : '') + '</small></span>' +
            '<span class="tag ' + s[0] + '">' + s[1] + '</span><span class="qty"><button type="button" data-m="' + i.id + '" aria-label="Restar uno a ' + esc(i.name) + '">−</button><output>' + i.n + '</output><button type="button" data-p="' + i.id + '" aria-label="Sumar uno a ' + esc(i.name) + '">+</button></span></div>';
        }).join('') + '</div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px"><button type="button" class="btn wa" data-order ' + (falt.length ? '' : 'disabled') + '>' + IC.wa.replace('<svg', '<svg width="18" height="18"') + ' Armar pedido al proveedor (' + falt.length + ')</button><button type="button" class="btn ghost sm" data-reset>Reiniciar ejemplo</button></div>' +
        '<p class="toggle-note">' + esc(c.note || 'Cada venta descuenta del stock. Cuando algo llega al mínimo, aparece en “Para pedir”.') + '</p>';
    }
    root.addEventListener('click', function (e) {
      var t = e.target.closest('button'); if (!t) return;
      var list = load();
      if (t.dataset.m || t.dataset.p) {
        var id = t.dataset.m || t.dataset.p, i = list.filter(function (x) { return x.id === id; })[0];
        var before = i.n; i.n = Math.max(0, i.n + (t.dataset.p ? 1 : -1)); store.set(K, list); render();
        if (before > i.min && i.n <= i.min) toast('⚠️ ' + i.name + ' llegó al mínimo: hay que pedir');
      }
      if (t.hasAttribute('data-only')) { only = !only; render(); }
      if (t.hasAttribute('data-reset')) { store.del(K); render(); }
      if (t.hasAttribute('data-order')) {
        var f = list.filter(function (x) { return x.n <= x.min; });
        sendWA('Hola! Te paso el pedido de ' + c.biz + ':\n\n' + f.map(function (x) { return '• ' + x.name + ': ' + Math.max(x.min * 2 - x.n, 1) + ' ' + x.unit; }).join('\n') + '\n\nGracias!', { title: 'Pedido al proveedor', note: 'La lista se arma sola con lo que está en el mínimo. En la demo le llega a Alex.' });
      }
    });
    render();
  }

  /* =========================================================
     FIADO
     ========================================================= */
  function fiado(root, c) {
    var K = 'fiado';
    function load() { return store.get(K, null) || c.seed.map(function (s, i) { return { id: 'c' + i, name: s[0], debe: s[1], ult: s[2] }; }); }
    var sel = null;
    function render() {
      var list = load(), tot = list.reduce(function (a, x) { return a + x.debe; }, 0);
      list.sort(function (a, b) { return b.debe - a.debe; });
      root.innerHTML = '<div class="kpis"><div class="kpi hl"><small>Total fiado en la calle</small><b>' + fmt(tot) + '</b></div><div class="kpi"><small>Clientes que deben</small><b>' + list.filter(function (x) { return x.debe > 0; }).length + '</b></div></div>' +
        '<div class="rows">' + list.map(function (x) {
          return '<div class="row' + (sel === x.id ? ' new' : '') + '"><span class="grow"><b>' + esc(x.name) + '</b><small>Último movimiento: ' + esc(x.ult) + '</small></span><span class="price" style="color:' + (x.debe > 0 ? 'var(--bad)' : 'var(--ok)') + '">' + (x.debe > 0 ? fmt(x.debe) : 'Al día') + '</span><button type="button" class="chip" data-sel="' + x.id + '">Anotar</button></div>' +
            (sel === x.id ? '<form class="inline-form" data-mov style="grid-template-columns:1fr auto auto;margin:0 0 6px"><label class="field">Monto<input name="m" inputmode="numeric" required placeholder="0" autofocus></label><button class="btn sm" name="t" value="f" type="submit">+ Fió</button><button class="btn ghost sm" name="t" value="p" type="submit">Pagó</button></form>' +
              (x.debe > 0 ? '<button type="button" class="btn ghost sm" style="justify-self:start" data-rem="' + x.id + '">' + IC.wa.replace('<svg', '<svg width="16" height="16"') + ' Mandarle recordatorio amable</button>' : '') : '');
        }).join('') + '</div>' +
        '<div style="display:flex;gap:8px;margin-top:12px"><button type="button" class="btn ghost sm" data-reset>Reiniciar ejemplo</button></div>';
    }
    var lastBtn = 'f';
    root.addEventListener('click', function (e) {
      var t = e.target.closest('button'); if (!t) return;
      if (t.name === 't') lastBtn = t.value;
      if (t.dataset.sel) { sel = sel === t.dataset.sel ? null : t.dataset.sel; render(); var i = $('[data-mov] input', root); if (i) i.focus(); }
      if (t.hasAttribute('data-reset')) { store.del(K); sel = null; render(); }
      if (t.dataset.rem) {
        var x = load().filter(function (y) { return y.id === t.dataset.rem; })[0];
        sendWA('Hola ' + x.name.split(' ')[0] + '! ¿Cómo andás? Te paso el saldo de la libreta en ' + c.biz + ': ' + fmt(x.debe) + '. Cuando puedas pasá, sin apuro 🙂', { title: 'Recordatorio de fiado', note: 'Amable y sin vueltas. En tu página va al cliente; en la demo, a Alex.' });
      }
    });
    root.addEventListener('submit', function (e) {
      e.preventDefault();
      var m = parseInt(String(e.target.m.value).replace(/\D/g, ''), 10); if (!m) return;
      var tipo = (e.submitter && e.submitter.value) || lastBtn;
      var list = load(), x = list.filter(function (y) { return y.id === sel; })[0];
      x.debe = Math.max(0, x.debe + (tipo === 'p' ? -m : m)); x.ult = 'hoy, ' + (tipo === 'p' ? 'pagó ' : 'fió ') + fmt(m);
      store.set(K, list); toast(tipo === 'p' ? 'Pago anotado' : 'Fiado anotado'); render();
    });
    render();
  }


  /* =========================================================
     PANEL CON PESTAÑAS (sistemas: stock, caja, fiado, etc.)
     ========================================================= */
  function systemPanel(root, c) {
    root.classList.add('panel');
    root.innerHTML = '<div class="panel-head"><div><b>' + esc(c.title) + '</b><br><small>' + esc(c.sub || 'Solo lo ve el negocio · datos de ejemplo') + '</small></div><span class="tag" style="background:rgba(255,255,255,.15);color:inherit">Hoy ' + new Date().getDate() + ' ' + MESES[new Date().getMonth()] + '</span></div>' +
      '<div class="tabs" role="tablist">' + c.tabs.map(function (t, i) { return '<button role="tab" type="button" aria-selected="' + (i === 0) + '" data-ptab="' + i + '">' + esc(t.label) + '</button>'; }).join('') + '</div>' +
      '<div class="panel-body">' + c.tabs.map(function (t, i) { return '<div data-ppane="' + i + '"' + (i ? ' hidden' : '') + '></div>'; }).join('') + '</div>';
    c.tabs.forEach(function (t, i) { t.mount($('[data-ppane="' + i + '"]', root)); });
    root.addEventListener('click', function (e) {
      var t = e.target.closest('[data-ptab]'); if (!t) return;
      $$('[data-ptab]', root).forEach(function (b) { b.setAttribute('aria-selected', b === t); });
      $$('[data-ppane]', root).forEach(function (p) { p.hidden = p.dataset.ppane !== t.dataset.ptab; });
    });
  }

  /* ---------- init ---------- */
  function init(cfg) {
    cfgGlobal = cfg;
    maLayer(cfg);
    if (cfg.hours) hoursUI(cfg.hours);
    reveal();
    var y = $$('[data-year]'); y.forEach(function (e) { e.textContent = new Date().getFullYear(); });
  }

  window.MA = { init: init, booking: booking, ownerPanel: ownerPanel, systemPanel: systemPanel, caja: caja, catalog: catalog, stock: stock, fiado: fiado, sendWA: sendWA, openSheet: openSheet, closeSheet: closeSheet, toast: toast, store: store, fmt: fmt, esc: esc, waLink: waLink, niceDate: niceDate, isoDate: isoDate, icons: IC, isOpen: isOpen };
})();
