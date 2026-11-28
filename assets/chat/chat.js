/* Owners Inc. chat helper — engine. Canned answers only (answers.js);
   no text is generated, no conversation leaves the device. Only a
   voluntarily submitted lead form is sent, to the endpoint in
   answers.js config. Loaded on first tap of the chat button. */
(function () {
  "use strict";
  var A = window.OI_ANSWERS;
  if (!A) return;
  var MODE = window.OI_CHAT_MODE === "lead" ? "lead" : "store";
  var TREE = A[MODE], CFG = A.config, SH = A.shared;
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var panel, log, choices, input, started = false, misses = 0;
  var form = null; // {step, name, contact, behind}

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function build() {
    panel = el("section");
    panel.id = "oiChatPanel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Chat with the Owners Inc. helper");
    var head = el("div", "oi-head");
    var row = el("div", "oi-head-row");
    var tWrap = el("div");
    tWrap.style.flex = "1 1 auto";
    tWrap.appendChild(el("div", "oi-title", "Owners Inc. helper"));
    tWrap.appendChild(el("div", "oi-sub", "Automated helper — not a person"));
    row.appendChild(tWrap);
    var close = el("button", "oi-close", "×");
    close.type = "button";
    close.setAttribute("aria-label", "Close chat");
    close.addEventListener("click", closePanel);
    row.appendChild(close);
    head.appendChild(row);
    if (MODE === "store") {
      head.appendChild(el("div", "oi-ftc",
        "We check deals by hand. Links on our pages may be affiliate links — we may earn a commission at no extra cost to you."));
    }
    panel.appendChild(head);

    log = el("div", "oi-log");
    log.setAttribute("role", "log");
    log.setAttribute("aria-live", "polite");
    log.setAttribute("aria-label", "Chat messages");
    panel.appendChild(log);

    choices = el("div", "oi-choices");
    panel.appendChild(choices);

    var formRow = el("form", "oi-inputrow");
    var lab = el("label", null, "Type a word or your answer");
    lab.setAttribute("for", "oiChatText");
    formRow.appendChild(lab);
    input = el("input");
    input.id = "oiChatText";
    input.type = "text";
    input.placeholder = SH.inputPlaceholder;
    input.setAttribute("autocomplete", "off");
    formRow.appendChild(input);
    var send = el("button", null, SH.sendLabel);
    send.id = "oiChatSend";
    send.type = "submit";
    formRow.appendChild(send);
    formRow.addEventListener("submit", function (ev) {
      ev.preventDefault();
      onText(input.value);
      input.value = "";
    });
    panel.appendChild(formRow);

    var foot = el("div", "oi-foot");
    var fa = el("a");
    if (MODE === "store") { fa.href = "/store/"; fa.textContent = "Browse the whole store →"; }
    else { fa.href = CFG.phoneHref; fa.textContent = "Call or text " + CFG.phoneDisplay; }
    foot.appendChild(fa);
    panel.appendChild(foot);

    document.body.appendChild(panel);
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && panel.classList.contains("oi-open")) closePanel();
    });
  }

  function scrollLog() { log.scrollTop = log.scrollHeight; }

  function botSay(text, after) {
    var typing = el("div", "oi-msg oi-bot oi-typing");
    typing.innerHTML = "<i></i><i></i><i></i>";
    typing.setAttribute("aria-hidden", "true");
    log.appendChild(typing);
    scrollLog();
    var show = function () {
      typing.remove();
      var m = el("div", "oi-msg oi-bot");
      m.innerHTML = esc(text).replace(/\n/g, "<br>");
      log.appendChild(m);
      scrollLog();
      if (after) after();
    };
    if (reduced) show(); else setTimeout(show, 450);
  }
  function userSay(text) {
    var m = el("div", "oi-msg oi-user", text);
    log.appendChild(m);
    scrollLog();
  }

  function clearChoices() { choices.innerHTML = ""; }
  function addChoice(label, fn, primary) {
    var b = el("button", "oi-choice" + (primary ? " oi-primary" : ""), label);
    b.type = "button";
    b.addEventListener("click", function () { fn(label); });
    choices.appendChild(b);
    return b;
  }
  function addLink(label, href) {
    var a = el("a", "oi-choice", label);
    a.href = href;
    choices.appendChild(a);
    return a;
  }

  function showNode(id) {
    clearChoices();
    if (id === "ROOT") {
      botSay(TREE.rootSay, function () {
        TREE.rootButtons.forEach(function (b) {
          addChoice(b.label, function () { userSay(b.label); go(b.go); });
        });
      });
      return;
    }
    var node = TREE.nodes[id];
    if (!node) return;
    botSay(node.say, function () {
      (node.links || []).forEach(function (l) { addLink(l.label, l.href); });
      var hasMenu = false;
      (node.buttons || []).forEach(function (b) {
        if (b.go === "ROOT") hasMenu = true;
        addChoice(b.label, function () { userSay(b.label); go(b.go); }, b.go === "FORM");
      });
      if (!hasMenu) addChoice("Main menu", function () { userSay("Main menu"); go("ROOT"); });
    });
  }

  function go(id) {
    misses = 0;
    if (id === "FORM") { startForm(); return; }
    showNode(id);
  }

  /* ---------- lead form (bookkeeping mode) ---------- */
  function startForm() {
    form = { step: "name", name: "", contact: "", behind: "" };
    clearChoices();
    botSay(TREE.form.privacy, function () {
      botSay(TREE.form.askName);
      input.placeholder = TREE.form.namePlaceholder;
      input.setAttribute("autocomplete", "name");
      addChoice("Cancel", function () { form = null; go("ROOT"); });
      input.focus();
    });
  }
  function formText(text) {
    var F = TREE.form;
    if (form.step === "name") {
      form.name = text;
      userSay(text);
      form.step = "contact";
      botSay(F.askContact);
      input.placeholder = F.contactPlaceholder;
      input.setAttribute("autocomplete", "off");
    } else if (form.step === "contact") {
      var ok = (/@/.test(text) && /\.[A-Za-z]{2,}/.test(text)) || (text.replace(/\D/g, "").length >= 7);
      if (!ok) { botSay(F.badContact); return; }
      form.contact = text;
      userSay(text);
      form.step = "behind";
      clearChoices();
      botSay(F.askBehind, function () {
        F.behindOptions.forEach(function (opt) {
          addChoice(opt, function () { pickBehind(opt); });
        });
        addChoice("Cancel", function () { form = null; go("ROOT"); });
      });
    }
  }
  function pickBehind(opt) {
    userSay(opt);
    form.behind = opt;
    form.step = "consent";
    clearChoices();
    botSay(TREE.form.askConsent, function () {
      addChoice(TREE.form.consentYes, function () {
        userSay(TREE.form.consentYes);
        showSummary();
      }, true);
      addChoice(TREE.form.consentNo, function () {
        userSay(TREE.form.consentNo);
        form = null;
        botSay(TREE.form.declined, function () { go("ROOT"); });
      });
    });
  }
  function showSummary() {
    form.step = "summary";
    clearChoices();
    var F = TREE.form;
    var text = F.summaryIntro + "\nName: " + form.name + "\nBest contact: " + form.contact + "\nHow far behind: " + form.behind;
    botSay(text, function () {
      addChoice(F.sendLabel, function () { submitForm(); }, true);
      addChoice(F.startOver, function () { startForm(); });
      addChoice("Main menu", function () { form = null; go("ROOT"); });
    });
  }
  function submitForm() {
    var F = TREE.form;
    clearChoices();
    botSay(F.sending);
    var payload = {
      name: form.name,
      "Best phone or email": form.contact,
      "How far behind": form.behind,
      _subject: CFG.subject,
      _template: "table",
      _captcha: "false",
      _honey: ""
    };
    fetch(CFG.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    }).then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (data) {
        if (data && (data.success === true || data.success === "true")) {
          form = null;
          botSay(F.success, function () { go("ROOT"); });
        } else { formError(); }
      })
      .catch(formError);
  }
  function formError() {
    clearChoices();
    botSay(TREE.form.error, function () {
      addChoice(TREE.form.retry, function () { submitForm(); }, true);
      addChoice("Main menu", function () { form = null; go("ROOT"); });
    });
  }

  /* ---------- free text ---------- */
  var SENSITIVE = [
    /\b\d{3}-\d{2}-\d{4}\b/,
    /(?:\d[ -]?){12,18}\d/,
    /\b(password|passcode|ssn|social security|bank account|routing number|account number)\b/i
  ];
  function onText(raw) {
    var text = (raw || "").trim();
    if (!text) return;
    for (var i = 0; i < SENSITIVE.length; i++) {
      if (SENSITIVE[i].test(text)) { botSay(SH.sensitive); return; }
    }
    if (form && (form.step === "name" || form.step === "contact")) { formText(text); return; }
    if (form && form.step === "behind") {
      var low0 = text.toLowerCase(), hit = null;
      TREE.form.behindOptions.forEach(function (opt) {
        if (opt.toLowerCase().indexOf(low0) > -1 || low0.indexOf(opt.toLowerCase()) > -1) hit = opt;
      });
      if (hit) { pickBehind(hit); return; }
    }
    var low = " " + text.toLowerCase() + " ";
    for (var h = 0; h < SH.hello.length; h++) {
      if (low.trim() === SH.hello[h]) { userSay(text); go("ROOT"); return; }
    }
    var kws = TREE.keywords || [];
    for (var k = 0; k < kws.length; k++) {
      for (var w = 0; w < kws[k].words.length; w++) {
        if (low.indexOf(kws[k].words[w]) > -1) { userSay(text); go(kws[k].go); return; }
      }
    }
    userSay(text);
    misses++;
    clearChoices();
    botSay(misses >= 2 ? SH.fallback2 : SH.fallback1, function () {
      if (MODE === "store") addLink("Search the whole store", "/store/");
      else addLink("Bookkeeping services", "/bookkeeping-services/");
      TREE.rootButtons.forEach(function (b) {
        addChoice(b.label, function () { userSay(b.label); go(b.go); });
      });
    });
  }

  /* ---------- open / close ---------- */
  function openPanel() {
    if (!panel) build();
    panel.classList.add("oi-open");
    var btn = document.getElementById("oiChatBtn");
    if (btn) btn.style.display = "none";
    var close = panel.querySelector(".oi-close");
    if (close) close.focus();
    if (!started) { started = true; showNode("ROOT"); }
  }
  function closePanel() {
    panel.classList.remove("oi-open");
    var btn = document.getElementById("oiChatBtn");
    if (btn) { btn.style.display = ""; btn.focus(); }
  }

  window.OIChat = { open: openPanel, close: closePanel };
})();
