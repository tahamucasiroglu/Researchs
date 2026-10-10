/* Araştırmalar — küçük yardımcılar: tema, mobil menü, aktif bölüm, sayfa içi içindekiler */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---- tema ---- */
  function readTheme() {
    try { return localStorage.getItem("sd-theme"); } catch (e) { return null; }
  }
  function writeTheme(v) {
    try { localStorage.setItem("sd-theme", v); } catch (e) { /* file:// altında engellenebilir */ }
  }
  var saved = readTheme();
  if (saved === "dark" || saved === "light") root.setAttribute("data-theme", saved);

  function currentTheme() {
    var attr = root.getAttribute("data-theme");
    if (attr) return attr;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function labelFor(t) { return t === "dark" ? "AÇIK TEMA" : "KOYU TEMA"; }

  function mountThemeToggle() {
    var btn = document.createElement("button");
    btn.className = "iconbtn theme-toggle";
    btn.type = "button";
    btn.textContent = labelFor(currentTheme());
    btn.setAttribute("aria-label", "Temayı değiştir");
    btn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      writeTheme(next);
      btn.textContent = labelFor(next);
    });
    document.body.appendChild(btn);
  }

  /* ---- mobil menü ---- */
  function mountMenu() {
    var btn = document.querySelector("[data-menu-toggle]");
    var side = document.getElementById("sidebar");
    if (!btn || !side) return;
    btn.addEventListener("click", function () {
      var open = side.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    side.addEventListener("click", function (e) {
      if (e.target.closest("a")) side.classList.remove("is-open");
    });
  }

  /* ---- aktif gezinme öğesi ---- */
  function markActive() {
    /* Sayfalar klasör/index.html düzeninde olduğu için dosya adı değil, tam yol karşılaştırılır. */
    function norm(u) { return decodeURIComponent(u.split("#")[0].split("?")[0]).replace(/\/index\.html$/i, "/").toLowerCase(); }
    var here = norm(location.href);
    var links = document.querySelectorAll(".nav-item");
    for (var i = 0; i < links.length; i++) {
      if (norm(links[i].href) === here) {
        links[i].classList.add("is-active");
        links[i].setAttribute("aria-current", "page");
        return links[i];
      }
    }
    return null;
  }

  /* ---- sayfa içi içindekiler (aktif öğenin altına) ---- */
  function mountOnPageToc(activeLink) {
    if (!activeLink) return;
    var heads = document.querySelectorAll(".content h2[id]");
    if (heads.length < 3) return;

    var ul = document.createElement("ul");
    ul.className = "nav-sub";
    for (var i = 0; i < heads.length; i++) {
      var h = heads[i];
      var raw = h.querySelector(".h-num");
      var text = h.textContent || "";
      if (raw) text = text.replace(raw.textContent, "");
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = text.trim();
      li.appendChild(a);
      ul.appendChild(li);
    }
    activeLink.insertAdjacentElement("afterend", ul);

    /* okunan bölümü işaretle */
    if (!("IntersectionObserver" in window)) return;
    var links = ul.querySelectorAll("a");
    var byId = {};
    for (var j = 0; j < links.length; j++) byId[links[j].getAttribute("href").slice(1)] = links[j];
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var a = byId[en.target.id];
        if (!a) return;
        if (en.isIntersecting) {
          for (var k = 0; k < links.length; k++) links[k].classList.remove("is-here");
          a.classList.add("is-here");
        }
      });
    }, { rootMargin: "-10% 0px -80% 0px", threshold: 0 });
    for (var m = 0; m < heads.length; m++) io.observe(heads[m]);
  }

  /* ---- başlıklara kalıcı bağlantı ---- */
  function mountAnchors() {
    var heads = document.querySelectorAll(".content h2[id], .content h3[id]");
    for (var i = 0; i < heads.length; i++) {
      (function (h) {
        h.style.cursor = "pointer";
        h.title = "Bu bölüme bağlantı";
        h.addEventListener("click", function (e) {
          if (e.target.closest("a")) return;
          location.hash = "#" + h.id;
        });
      })(heads[i]);
    }
  }

  function init() {
    mountThemeToggle();
    mountMenu();
    mountOnPageToc(markActive());
    mountAnchors();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
