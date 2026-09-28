/* ============================================================
   MYÓ — logica sito (render dati, aperto/chiuso, form WhatsApp)
   Tutto legge da window.MYO (assets/js/data.js)
   ============================================================ */
(function () {
  "use strict";
  var D = window.MYO;
  if (!D) return;

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); };

  var GIORNI = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];
  // JS getDay(): 0=Dom..6=Sab  →  indice nostro array (0=Lun..6=Dom)
  function dayIndex(jsDay) { return (jsDay + 6) % 7; }
  function toMin(hhmm) { var p = hhmm.split(":"); return (+p[0]) * 60 + (+p[1]); }

  /* -------- link WhatsApp / telefono -------- */
  function waLink(msg) {
    return "https://wa.me/" + D.contact.whatsapp + (msg ? "?text=" + encodeURIComponent(msg) : "");
  }
  function telLink() { return "tel:+39" + D.contact.phone; }

  /* ============================================================
     1) POPOLA I CONTENUTI DALLE SEZIONI
     ============================================================ */
  function setText(id, v) { var el = document.getElementById(id); if (el) el.textContent = v; }

  // CIBO
  setText("cibo-kicker", D.cibo.kicker); setText("cibo-title", D.cibo.title); setText("cibo-text", D.cibo.text);
  // DRINK
  setText("drink-kicker", D.drink.kicker); setText("drink-title", D.drink.title); setText("drink-text", D.drink.text);
  // LOCATION
  setText("loc-kicker", D.location.kicker); setText("loc-title", D.location.title); setText("loc-text", D.location.text);
  // SERATA
  setText("serata-kicker", D.serata.kicker); setText("serata-title", D.serata.title); setText("serata-text", D.serata.text);
  // FESTEGGIA
  setText("fest-kicker", D.festeggia.kicker); setText("fest-title", D.festeggia.title); setText("fest-text", D.festeggia.text);

  // punti location
  var lp = $("#loc-points");
  if (lp) lp.innerHTML = D.location.points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("");

  /* -------- render menu (cibo + drink) -------- */
  function tagLabel(t) {
    return { signature: "Signature", veg: "Veg", analcolico: "Analcolico", piccante: "Piccante" }[t] || t;
  }
  function renderMenu(containerId, lists) {
    var c = document.getElementById(containerId);
    if (!c) return;
    c.innerHTML = lists.map(function (list) {
      var items = list.items.map(function (it) {
        var tags = (it.tags || []).map(function (t) { return '<span class="tag ' + esc(t) + '">' + esc(tagLabel(t)) + "</span>"; }).join("");
        var price = it.price ? '<div class="mi-price">' + esc(it.price) + " €</div>" : "";
        return '<div class="menu-item"><div class="mi-main"><div class="mi-name">' + esc(it.name) + tags +
          "</div>" + (it.desc ? '<div class="mi-desc">' + esc(it.desc) + "</div>" : "") + "</div>" + price + "</div>";
      }).join("");
      var note = list.note ? '<p class="list-note">' + esc(list.note) + "</p>" : "";
      return '<div class="menu-list"><h3>' + esc(list.listTitle) + "</h3>" + note + items + "</div>";
    }).join("");
  }
  renderMenu("cibo-menu", D.cibo.menu);
  renderMenu("drink-menu", D.drink.menu);

  // programma serata
  var pg = $("#serata-program");
  if (pg) pg.innerHTML = D.serata.program.map(function (p) {
    return '<div class="prog-card"><div class="prog-day">' + esc(p.day) + '</div><div class="prog-body"><h3>' +
      esc(p.label) + "</h3><p>" + esc(p.desc) + "</p></div></div>";
  }).join("");

  /* ============================================================
     2) LINK DINAMICI (telefono / whatsapp / maps)
     ============================================================ */
  $$("[data-wa]").forEach(function (a) { a.href = waLink(a.getAttribute("data-wa-msg") || ""); a.target = "_blank"; a.rel = "noopener"; });
  var genericWa = "Ciao Myó! Vorrei qualche informazione 😊";
  ["#sbWa", "#tileWa", "#footWa"].forEach(function (s) { var el = $(s); if (el) { el.href = waLink(genericWa); el.target = "_blank"; el.rel = "noopener"; } });
  ["#sbCall", "#tilePhone"].forEach(function (s) { var el = $(s); if (el) el.href = telLink(); });
  var addrEls = ["#tileAddr", "#mapsBtn"];
  addrEls.forEach(function (s) { var el = $(s); if (el) { el.href = D.contact.mapsUrl; el.target = "_blank"; el.rel = "noopener"; } });

  /* ============================================================
     3) APERTO ORA / CHIUSO  +  lista orari
     ============================================================ */
  function openStateNow() {
    var now = new Date();
    var di = dayIndex(now.getDay());
    var nowMin = now.getHours() * 60 + now.getMinutes();
    // controlla oggi
    var todayH = D.hours[di];
    if (todayH) {
      var o = toMin(todayH[0]), c = toMin(todayH[1]);
      if (c <= o) c += 1440; // chiusura dopo mezzanotte
      if (nowMin >= o && nowMin < c) return { open: true, closes: todayH[1] };
    }
    // controlla se apparteniamo ancora all'apertura di ieri (oltre mezzanotte)
    var yi = (di + 6) % 7;
    var yH = D.hours[yi];
    if (yH) {
      var yo = toMin(yH[0]), yc = toMin(yH[1]);
      if (yc <= yo) { // sfora la mezzanotte
        if (nowMin < (yc)) return { open: true, closes: yH[1] };
      }
    }
    // prossima apertura
    for (var k = 0; k < 7; k++) {
      var idx = (di + k) % 7;
      var h = D.hours[idx];
      if (h && !(k === 0 && nowMin >= toMin(h[0]))) {
        return { open: false, next: (k === 0 ? "oggi" : k === 1 ? "domani" : GIORNI[idx]), at: h[0] };
      }
    }
    return { open: false };
  }
  function paintOpen() {
    var st = openStateNow();
    var pill = $("#openPill"), txt = $("#openText");
    if (!pill) return;
    pill.classList.remove("is-open", "is-closed");
    if (st.open) {
      pill.classList.add("is-open");
      txt.textContent = "Aperto ora · fino alle " + st.closes;
    } else {
      pill.classList.add("is-closed");
      txt.textContent = st.next ? ("Chiuso · apre " + st.next + " alle " + st.at) : "Chiuso ora";
    }
  }
  paintOpen();
  setInterval(paintOpen, 60000);

  // lista orari nel footer contatti
  var hl = $("#hoursList");
  if (hl) {
    var todayIdx = dayIndex(new Date().getDay());
    hl.innerHTML = D.hours.map(function (h, i) {
      var val = h ? (h[0] + " – " + h[1]) : "Chiuso";
      return '<div class="hours-row' + (i === todayIdx ? " today" : "") + '"><span class="hd">' + GIORNI[i] +
        '</span><span class="hv' + (h ? "" : " closed") + '">' + val + "</span></div>";
    }).join("");
  }

  /* ============================================================
     4) HEADER: sfondo allo scroll
     ============================================================ */
  var header = $("#siteHeader");
  function onScroll() { if (header) header.classList.toggle("scrolled", window.scrollY > 40); }
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

  /* ============================================================
     5) VIDEO LAZY (sezioni) — carica e avvia quando in vista
     ============================================================ */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && "IntersectionObserver" in window) {
    var vObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) {
          var src = v.querySelector("source[data-src]");
          if (src && !src.src) { src.src = src.getAttribute("data-src"); v.load(); }
          var p = v.play(); if (p && p.catch) p.catch(function () { });
        } else if (!v.paused) { v.pause(); }
      });
    }, { rootMargin: "200px 0px", threshold: 0.15 });
    $$("[data-lazy-video]").forEach(function (v) { vObs.observe(v); });
  }

  /* ============================================================
     6) FORM PRENOTAZIONE → WHATSAPP
     ============================================================ */
  var form = $("#bookingForm");
  var dataInput = $("#f-data");
  var orarioSel = $("#f-orario");

  // data minima = oggi
  function todayISO() {
    var t = new Date(); t.setMinutes(t.getMinutes() - t.getTimezoneOffset());
    return t.toISOString().slice(0, 10);
  }
  if (dataInput) { dataInput.min = todayISO(); }

  // genera slot orario per un dato weekday index (0=Lun..6=Dom)
  function slotsForDay(di) {
    var h = D.hours[di];
    if (!h) return null; // chiuso
    var o = toMin(h[0]), c = toMin(h[1]);
    if (c <= o) c += 1440;
    var step = D.festeggia.slotStepMin || 30;
    var out = [];
    for (var m = o; m <= c - step; m += step) {
      var mm = m % 1440;
      var hh = String(Math.floor(mm / 60)).padStart(2, "0");
      var mi = String(mm % 60).padStart(2, "0");
      out.push(hh + ":" + mi);
    }
    return out;
  }
  function fillSlots() {
    if (!orarioSel) return;
    orarioSel.innerHTML = '<option value="">Seleziona un orario</option>';
    if (!dataInput.value) { return; }
    var d = new Date(dataInput.value + "T12:00:00");
    var di = dayIndex(d.getDay());
    var slots = slotsForDay(di);
    if (!slots) {
      var opt = document.createElement("option");
      opt.value = ""; opt.textContent = "Siamo chiusi in questa data — scegline un'altra";
      opt.disabled = true; orarioSel.appendChild(opt);
      // segnala data non valida
      markInvalid($("#f-data").closest(".field"), true);
      return;
    }
    markInvalid($("#f-data").closest(".field"), false);
    slots.forEach(function (s) {
      var o = document.createElement("option"); o.value = s; o.textContent = s; orarioSel.appendChild(o);
    });
  }
  if (dataInput) dataInput.addEventListener("change", fillSlots);

  function markInvalid(fieldEl, on) { if (fieldEl) fieldEl.classList.toggle("invalid", !!on); }

  function validate() {
    var ok = true;
    function check(id, cond) {
      var el = $(id); var f = el.closest(".field");
      if (!cond) { markInvalid(f, true); ok = false; } else { markInvalid(f, false); }
      return cond;
    }
    check("#f-nome", $("#f-nome").value.trim().length >= 2);
    check("#f-cognome", $("#f-cognome").value.trim().length >= 2);
    // telefono: almeno 8 cifre
    var tel = $("#f-tel").value.replace(/[^\d]/g, "");
    check("#f-tel", tel.length >= 8 && tel.length <= 15);
    // persone
    var pers = parseInt($("#f-persone").value, 10);
    check("#f-persone", pers >= 1 && pers <= 30);
    // data: valorizzata, non passata, giorno di apertura
    var dv = dataInput.value;
    var dataOk = false;
    if (dv) {
      var d = new Date(dv + "T12:00:00");
      var todayMid = new Date(); todayMid.setHours(0, 0, 0, 0);
      dataOk = d >= todayMid && !!D.hours[dayIndex(d.getDay())];
    }
    check("#f-data", dataOk);
    // orario
    check("#f-orario", !!orarioSel.value);
    return ok;
  }

  function itDate(iso) {
    var p = iso.split("-"); return p[2] + "/" + p[1] + "/" + p[0];
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) {
        var firstErr = $(".field.invalid");
        if (firstErr) firstErr.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      var nome = $("#f-nome").value.trim();
      var cognome = $("#f-cognome").value.trim();
      var tel = $("#f-tel").value.trim();
      var pers = $("#f-persone").value.trim();
      var data = itDate(dataInput.value);
      var orario = orarioSel.value;

      var msg =
        "Ciao Myó! Vorrei prenotare un tavolo. 🎉\n\n" +
        "👤 Nome: " + nome + " " + cognome + "\n" +
        "👥 Persone: " + pers + "\n" +
        "📅 Data: " + data + "\n" +
        "🕐 Orario: " + orario + "\n" +
        "📞 Telefono: " + tel + "\n\n" +
        "Grazie!";

      window.open(waLink(msg), "_blank", "noopener");

      // stato di conferma onesto
      var okBox = $("#bookingOk");
      $$("#bookingForm .field, #bookingForm > .btn-wa, #bookingForm .booking-note").forEach(function (el) { el.style.display = "none"; });
      if (okBox) okBox.classList.add("show");
    });
  }

  var resetBtn = $("#resetBooking");
  if (resetBtn) resetBtn.addEventListener("click", function () {
    $("#bookingOk").classList.remove("show");
    form.reset();
    fillSlots();
    $$("#bookingForm .field, #bookingForm > .btn-wa, #bookingForm .booking-note").forEach(function (el) { el.style.display = ""; });
  });

  /* anno footer */
  var y = $("#year"); if (y) y.textContent = new Date().getFullYear();

})();
