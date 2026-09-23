/* ==========================================================================
   app.js — merender konten dari content.js dan mengatur interaksi.
   Anda biasanya tidak perlu mengedit file ini.
   ========================================================================== */
(function () {
  "use strict";

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function icon(name, cls) {
    return '<svg class="icon ' + (cls || "") + '" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
  }
  function pad(n) { return n < 10 ? "0" + n : String(n); }
  function formatDate(iso) {
    var d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return iso;
    try { return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(d); }
    catch (e) { return iso; }
  }
  function safely(fn) { try { fn(); } catch (e) { if (window.console) console.error(e); } }

  var P = SITE.profile;

  /* ---------- Link kontak ---------- */
  function socialUrl(s) {
    if (s.icon === "whatsapp" && !s.url) return "https://wa.me/" + P.whatsapp;
    if (s.icon === "mail" && !s.url) return "mailto:" + P.email;
    return s.url || "#kontak";
  }

  /* ---------- Render ---------- */
  function renderProfile() {
    $$("#hero-photo, #about-photo").forEach(function (img) {
      img.src = P.photo;
      img.alt = img.id === "hero-photo" ? P.photoAlt : P.photoAlt + " sedang bekerja";
    });
    var wa = $("#wa-direct");
    if (wa) wa.href = "https://wa.me/" + P.whatsapp + "?text=" + encodeURIComponent("Halo Wardiman, saya ingin berdiskusi.");
    var all = $("#all-projects");
    if (all) all.href = P.allProjectsUrl || "#kontak";
  }

  function renderWhat() {
    $("#what-grid").innerHTML = SITE.whatIDo.map(function (w) {
      return '<article class="what-card reveal">' +
        '<div class="what-icon" aria-hidden="true">' + esc(w.icon) + '</div>' +
        '<h3>' + esc(w.title) + '</h3><p>' + esc(w.text) + '</p>' +
        '<div class="what-tags">' + (w.tags || []).map(function (t) { return '<span class="pill">' + esc(t) + '</span>'; }).join("") + '</div>' +
        '</article>';
    }).join("");
  }

  function renderProjects() {
    $("#project-list").innerHTML = SITE.projects.map(function (p, i) {
      return '<article class="project reveal">' +
        '<button class="project-media" type="button" data-project="' + esc(p.id) + '" aria-label="Lihat detail proyek ' + esc(p.title) + '">' +
          '<img src="' + esc(p.cover) + '" alt="' + esc(p.coverAlt || p.title) + '" width="1600" height="1000" loading="lazy" decoding="async">' +
          '<span class="view-tag" aria-hidden="true">Lihat detail</span>' +
        '</button>' +
        '<div class="project-info">' +
          '<span class="project-num" aria-hidden="true">' + pad(i + 1) + '</span>' +
          '<div class="project-cats">' + p.categories.map(function (c) { return '<span class="pill">' + esc(c) + '</span>'; }).join("") + '</div>' +
          '<h3>' + esc(p.title) + '</h3>' +
          '<p>' + esc(p.summary) + '</p>' +
          '<button class="btn btn-primary" type="button" data-project="' + esc(p.id) + '">Lihat Proyek →</button>' +
        '</div>' +
      '</article>';
    }).join("");
  }

  function renderBuilding() {
    $("#building-list").innerHTML = SITE.building.map(function (b) {
      var label = SITE.statusLabels[b.status] || b.status;
      return '<li class="workspace-row">' +
        '<div><h3>' + esc(b.title) + '</h3><p>' + esc(b.note) + '</p>' +
        (b.updated ? '<small>' + esc(b.updated) + '</small>' : '') + '</div>' +
        '<span class="status status-' + esc(b.status) + '">' + esc(label) + '</span>' +
      '</li>';
    }).join("");
  }

  function renderSkills() {
    $("#skills-grid").innerHTML = SITE.skills.map(function (g) {
      return '<div class="skill-group reveal"><h3>' + esc(g.group) + '</h3><ul class="chips">' +
        g.items.map(function (s) { return '<li class="chip">' + esc(s) + '</li>'; }).join("") +
      '</ul></div>';
    }).join("");
  }

  function renderServices() {
    $("#service-list").innerHTML = SITE.services.map(function (s) {
      return '<li><a class="service-row" href="#kontak" data-topic="' + esc(s.title) + '">' +
        '<h3>' + esc(s.title) + '</h3><p>' + esc(s.text) + '</p><span class="go" aria-hidden="true">→</span>' +
      '</a></li>';
    }).join("");
  }

  function renderProducts() {
    var featured = SITE.products.filter(function (p) { return p.featured; })[0] || SITE.products[0];
    var others = SITE.products.filter(function (p) { return p !== featured; });

    if (featured) {
      var href = featured.link || "#kontak";
      var ext = featured.link ? ' target="_blank" rel="noopener"' : ' data-topic="Produk Digital"';
      $("#product-featured").innerHTML =
        '<article class="product-feature reveal">' +
          '<div class="ebook-stage"><div class="ebook" aria-hidden="true">' +
            '<small>' + esc(String(featured.type || "produk").toLowerCase()) + '</small>' +
            '<strong>' + esc(featured.title) + '</strong>' +
            '<em>wardiman.my.id</em>' +
          '</div></div>' +
          '<div class="product-body">' +
            '<span class="badge">' + esc(featured.type || "Produk") + '</span>' +
            '<h3>' + esc(featured.title) + '</h3>' +
            '<p>' + esc(featured.text) + '</p>' +
            '<a class="btn btn-primary" href="' + esc(href) + '"' + ext + '>Lihat Produk →</a>' +
          '</div>' +
        '</article>';
    }

    var more = $("#product-more");
    if (others.length) {
      more.hidden = false;
      more.innerHTML = others.map(function (p) {
        var link = p.link ? '<a class="text-link" href="' + esc(p.link) + '" target="_blank" rel="noopener">Lihat →</a>' : '';
        return '<article class="product-mini"><span class="badge">' + esc(p.type || "Produk") + '</span><h4>' + esc(p.title) + '</h4><p>' + esc(p.text) + '</p>' + link + '</article>';
      }).join("");
    }

    $("#product-types").innerHTML = SITE.productTypes.map(function (t) {
      var ready = t.status === "ready";
      return '<li class="ptype ' + (ready ? "ready" : "soon") + '"><span aria-hidden="true">' + esc(t.icon) + '</span>' +
        '<span>' + esc(t.label) + '<small>' + (ready ? "Tersedia" : "Segera hadir") + '</small></span></li>';
    }).join("");
  }

  function renderLab() {
    $("#lab-grid").innerHTML = SITE.lab.map(function (l) {
      return '<article class="lab-cell reveal">' +
        '<span class="lab-icon" aria-hidden="true">' + esc(l.icon) + '</span>' +
        '<h3>' + esc(l.title) + '</h3><p>' + esc(l.text) + '</p>' +
        (l.latest ? '<p class="lab-latest">' + esc(l.latest) + '</p>' : '') +
      '</article>';
    }).join("");
  }

  var activeCategory = "Semua";
  function sortedArticles() {
    return SITE.articles.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
  }
  function renderFilters() {
    // Kategori tanpa artikel disembunyikan otomatis (muncul sendiri saat ada artikelnya)
    var used = SITE.articleCategories.filter(function (c) {
      return c === "Semua" || SITE.articles.some(function (a) { return a.category === c; });
    });
    $("#filters").innerHTML = used.map(function (c) {
      return '<button class="filter" type="button" data-cat="' + esc(c) + '" aria-pressed="' + (c === activeCategory) + '">' + esc(c) + '</button>';
    }).join("");
  }
  function renderArticles() {
    var list = sortedArticles().filter(function (a) { return activeCategory === "Semua" || a.category === activeCategory; });
    $("#article-grid").innerHTML = list.map(function (a) {
      var idx = SITE.articles.indexOf(a);
      return '<article class="article">' +
        '<div class="thumb" aria-hidden="true"><span>' + esc(a.icon || "📝") + '</span></div>' +
        '<div class="article-body">' +
          '<div class="article-meta"><span class="badge">' + esc(a.category) + '</span><time datetime="' + esc(a.date) + '">' + esc(formatDate(a.date)) + '</time></div>' +
          '<h3>' + esc(a.title) + '</h3><p>' + esc(a.excerpt) + '</p>' +
          '<button class="read" type="button" data-article="' + idx + '">Baca selengkapnya →</button>' +
        '</div>' +
      '</article>';
    }).join("");
    $("#article-empty").hidden = list.length > 0;
  }

  function renderTimeline() {
    $("#timeline-list").innerHTML = SITE.timeline.map(function (t) {
      return '<li class="tl-item reveal"><span class="tl-period">' + esc(t.period) + '</span>' +
        '<h3>' + esc(t.title) + '</h3><p>' + esc(t.text) + '</p></li>';
    }).join("");
  }

  function renderSocials() {
    $("#social-list").innerHTML = SITE.socials.map(function (s) {
      var url = socialUrl(s);
      var ext = /^https?:/.test(url) ? ' target="_blank" rel="noopener"' : '';
      return '<li><a href="' + esc(url) + '"' + ext + '><span class="social-ico">' + icon(s.icon) + '</span>' +
        '<span><strong>' + esc(s.label) + '</strong><span class="handle">' + esc(s.handle) + '</span></span></a></li>';
    }).join("");

    $("#footer-social").innerHTML = SITE.socials.map(function (s) {
      var url = socialUrl(s);
      var ext = /^https?:/.test(url) ? ' target="_blank" rel="noopener"' : '';
      return '<li><a href="' + esc(url) + '"' + ext + ' aria-label="' + esc(s.label) + '">' + icon(s.icon) + '</a></li>';
    }).join("");

    $("#f-topic").insertAdjacentHTML("beforeend", SITE.contactTopics.map(function (t) {
      return '<option value="' + esc(t) + '">' + esc(t) + '</option>';
    }).join(""));
  }

  /* ---------- Tema (terang / gelap) ---------- */
  function initTheme() {
    var btn = $("#theme-toggle");
    var meta = $("#theme-color");
    function apply(theme, save) {
      document.documentElement.setAttribute("data-theme", theme);
      btn.setAttribute("aria-label", theme === "dark" ? "Ganti ke mode terang" : "Ganti ke mode gelap");
      if (meta) meta.setAttribute("content", theme === "dark" ? "#0B1120" : "#F8FAFC");
      if (save) { try { localStorage.setItem("wardiman-theme", theme); } catch (e) {} }
    }
    apply(document.documentElement.getAttribute("data-theme") || "light", false);
    btn.addEventListener("click", function () {
      apply(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
    });
  }

  /* ---------- Navbar, menu mobile, back-to-top ---------- */
  function initNav() {
    var header = $("#site-header");
    var toTop = $("#to-top");
    var menuBtn = $("#menu-btn");
    var links = $("#nav-links");
    var ticking = false;

    function onScroll() {
      var y = window.scrollY || document.documentElement.scrollTop;
      header.classList.toggle("scrolled", y > 24);
      var show = y > 700;
      if (show) { toTop.hidden = false; requestAnimationFrame(function () { toTop.classList.add("show"); }); }
      else { toTop.classList.remove("show"); setTimeout(function () { if (!toTop.classList.contains("show")) toTop.hidden = true; }, 300); }
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();

    toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

    function setMenu(open) {
      links.classList.toggle("open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    }
    menuBtn.addEventListener("click", function () { setMenu(menuBtn.getAttribute("aria-expanded") !== "true"); });
    links.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("open")) { setMenu(false); menuBtn.focus(); }
    });
    document.addEventListener("click", function (e) {
      if (links.classList.contains("open") && !e.target.closest("#site-header")) setMenu(false);
    });
    window.matchMedia("(min-width: 1180px)").addEventListener("change", function (e) { if (e.matches) setMenu(false); });

    // Penanda menu aktif
    var map = {
      "home": "home", "tentang": "tentang", "apa-yang-saya-kerjakan": "tentang", "perjalanan": "tentang",
      "karya": "karya", "sedang-dikerjakan": "karya", "skills": "karya",
      "layanan": "layanan", "produk": "produk", "lab": "lab", "catatan": "catatan", "kontak": "kontak"
    };
    var navAnchors = $$("#nav-links > a:not(.btn)");
    function setCurrent(id) {
      navAnchors.forEach(function (a) {
        if (a.getAttribute("href") === "#" + id) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting && map[en.target.id]) setCurrent(map[en.target.id]); });
      }, { rootMargin: "-40% 0px -55% 0px" });
      $$("main > section[id]").forEach(function (s) { io.observe(s); });
    }
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var items = $$(".reveal");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Jendela detail (proyek & catatan) ---------- */
  function initModal() {
    var modal = $("#modal");
    var body = $("#modal-body");
    var canDialog = typeof modal.showModal === "function";

    function open(html) {
      body.innerHTML = html;
      $(".modal-inner", modal).scrollTop = 0;
      if (canDialog) modal.showModal(); else modal.setAttribute("open", "");
      document.documentElement.style.overflow = "hidden";
    }
    function close() {
      if (canDialog) modal.close(); else modal.removeAttribute("open");
    }
    modal.addEventListener("close", function () { document.documentElement.style.overflow = ""; });
    $("#modal-close").addEventListener("click", close);
    modal.addEventListener("click", function (e) { if (e.target === modal) close(); });

    function projectHtml(p) {
      var gallery = (p.gallery || []).length
        ? '<div class="gallery"><h3>Galeri</h3>' + p.gallery.map(function (g, i) {
            return '<img src="' + esc(g) + '" alt="Tampilan ' + (i + 1) + ' proyek ' + esc(p.title) + '" loading="lazy" decoding="async">';
          }).join("") + '</div>'
        : "";
      var action = p.link
        ? '<a class="btn btn-primary" href="' + esc(p.link) + '" target="_blank" rel="noopener">Kunjungi proyek ' + icon("external") + '</a>'
        : '';
      var note = p.link ? "" : '<p class="modal-note">Link proyek belum ditambahkan. Ingin melihat demonya? <a class="text-link" href="#kontak" data-close-modal>Hubungi saya</a>.</p>';
      return '<div class="modal-cover"><img src="' + esc(p.cover) + '" alt="' + esc(p.coverAlt || p.title) + '"></div>' +
        '<div class="modal-content">' +
          '<div class="project-cats">' + p.categories.map(function (c) { return '<span class="pill">' + esc(c) + '</span>'; }).join("") + '</div>' +
          '<h2 id="modal-title">' + esc(p.title) + '</h2>' +
          '<p class="lead">' + esc(p.summary) + '</p>' +
          '<div class="detail-grid">' +
            '<div class="detail"><h3>Masalah</h3><p>' + esc(p.problem) + '</p></div>' +
            '<div class="detail"><h3>Solusi</h3><p>' + esc(p.solution) + '</p></div>' +
            '<div class="detail"><h3>Peran saya</h3><p>' + esc(p.role) + '</p></div>' +
            '<div class="detail"><h3>Hasil</h3><p>' + esc(p.result) + '</p></div>' +
          '</div>' +
          '<div class="detail"><h3>Teknologi</h3><ul class="chips" style="margin:8px 0 28px">' +
            (p.technology || []).map(function (t) { return '<li class="chip">' + esc(t) + '</li>'; }).join("") + '</ul></div>' +
          '<div class="modal-actions">' + action + '</div>' + note + gallery +
        '</div>';
    }

    function articleHtml(a) {
      return '<div class="thumb" aria-hidden="true"><span>' + esc(a.icon || "📝") + '</span></div>' +
        '<div class="modal-content">' +
          '<div class="article-meta"><span class="badge">' + esc(a.category) + '</span><time datetime="' + esc(a.date) + '">' + esc(formatDate(a.date)) + '</time></div>' +
          '<h2 id="modal-title">' + esc(a.title) + '</h2>' +
          '<p class="lead">' + esc(a.excerpt) + '</p>' +
          '<p class="modal-note">Artikel lengkapnya sedang ditulis dan akan terbit di sini. Kalau ada topik yang ingin dibahas, <a class="text-link" href="#kontak" data-close-modal>kirim pesan ke saya</a>.</p>' +
        '</div>';
    }

    document.addEventListener("click", function (e) {
      var proj = e.target.closest("[data-project]");
      if (proj) {
        var p = SITE.projects.filter(function (x) { return x.id === proj.getAttribute("data-project"); })[0];
        if (p) open(projectHtml(p));
        return;
      }
      var art = e.target.closest("[data-article]");
      if (art) {
        var a = SITE.articles[Number(art.getAttribute("data-article"))];
        if (a) { if (a.url) window.open(a.url, "_blank", "noopener"); else open(articleHtml(a)); }
        return;
      }
      if (e.target.closest("[data-close-modal]")) close();
    });
  }

  /* ---------- Filter artikel ---------- */
  function initFilters() {
    $("#filters").addEventListener("click", function (e) {
      var btn = e.target.closest("[data-cat]");
      if (!btn) return;
      activeCategory = btn.getAttribute("data-cat");
      $$("#filters .filter").forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      renderArticles();
    });
  }

  /* ---------- Pilih topik otomatis dari layanan / produk ---------- */
  function initTopicLinks() {
    document.addEventListener("click", function (e) {
      var el = e.target.closest("[data-topic]");
      if (!el) return;
      var sel = $("#f-topic");
      var topic = el.getAttribute("data-topic");
      $$("option", sel).forEach(function (o) { if (o.value === topic) sel.value = topic; });
    });
  }

  /* ---------- Form kontak ---------- */
  function initForm() {
    var form = $("#contact-form");
    var status = $("#form-status");
    var rules = {
      name: function (v) { return v.trim() ? "" : "Nama wajib diisi."; },
      email: function (v) {
        if (!v.trim()) return "Email wajib diisi.";
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Format email belum benar. Contoh: nama@email.com";
      },
      topic: function (v) { return v ? "" : "Pilih salah satu topik."; },
      message: function (v) { return v.trim().length >= 10 ? "" : "Tulis pesan minimal 10 karakter."; }
    };
    var fields = { name: $("#f-name"), email: $("#f-email"), topic: $("#f-topic"), message: $("#f-message") };

    function check(key) {
      var input = fields[key];
      var msg = rules[key](input.value);
      var wrap = input.closest(".field");
      $("#e-" + key).textContent = msg;
      wrap.classList.toggle("invalid", !!msg);
      if (msg) input.setAttribute("aria-invalid", "true"); else input.removeAttribute("aria-invalid");
      return !msg;
    }
    Object.keys(fields).forEach(function (key) {
      fields[key].addEventListener("blur", function () { if (fields[key].value || fields[key].closest(".field").classList.contains("invalid")) check(key); });
      fields[key].addEventListener("input", function () { if (fields[key].closest(".field").classList.contains("invalid")) check(key); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.textContent = "";
      var firstBad = null;
      Object.keys(fields).forEach(function (key) { if (!check(key) && !firstBad) firstBad = fields[key]; });
      if (firstBad) { firstBad.focus(); return; }

      var text = "Halo Wardiman, saya " + fields.name.value.trim() + " (" + fields.email.value.trim() + ").\n" +
                 "Topik: " + fields.topic.value + "\n\n" + fields.message.value.trim();
      var url = "https://wa.me/" + P.whatsapp + "?text=" + encodeURIComponent(text);
      var win = window.open(url, "_blank", "noopener");
      status.textContent = win
        ? "Terima kasih, " + fields.name.value.trim() + "! WhatsApp akan terbuka dengan pesan Anda. Tinggal tekan kirim."
        : "Pop-up diblokir browser. Silakan klik link WhatsApp di bawah untuk melanjutkan.";
      if (win) form.reset();
    });
  }

  /* ---------- Jalankan ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    [renderProfile, renderWhat, renderProjects, renderBuilding, renderSkills, renderServices,
     renderProducts, renderLab, renderFilters, renderArticles, renderTimeline, renderSocials
    ].forEach(safely);
    [initTheme, initNav, initModal, initFilters, initTopicLinks, initForm, initReveal].forEach(safely);
  });
})();
