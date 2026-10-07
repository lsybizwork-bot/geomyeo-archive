/* 검여 유희강 K-Culture 프로젝트 아카이브 – 외부 라이브러리 없이 동작 */
(function () {
  "use strict";

  /* ============================================================
     [관리자 설정] 유족 인터뷰 영상
     유튜브에 올린 뒤 주소를 아래 따옴표 안에 넣으면 기념행사 섹션에 영상이 나타납니다.
     예) "https://www.youtube.com/watch?v=XXXXXXXXXXX"  또는  "https://youtu.be/XXXXXXXXXXX"
     비워 두면 영상 영역은 화면에 표시되지 않습니다.
     ============================================================ */
  var INTERVIEW_VIDEO_URL = "https://youtu.be/UzkkIIl-l-U";

  /* ---------- 다국어 문자열 (언어는 <html lang>으로 결정) ---------- */
  var LANG = (document.documentElement.lang || "ko").slice(0, 2);
  var I18N = {
    ko: {
      src: "『2026 검여 유희강 K-Culture 프로젝트』 도록 수록 (ⓒ 인천서해구문화재단, 2026)",
      held: function (o) { return o + " 소장"; },
      heldCredit: function (o) { return o + " 소장 · 이미지 출처: "; },
      artist: "검여 유희강, ", zoomWide: "병풍 전체 크게 보기", zoom: "크게 보기",
      pageAlt: function (p) { return "도록 " + p + "번째 면"; },
      video: "검여 유희강 유족 인터뷰 영상"
    },
    en: {
      src: "Included in the catalog of the 2026 Geomyeo Yu Hui-gang K-Culture Project (ⓒ Incheon Seohae-gu Culture Foundation, 2026)",
      held: function (o) { return "Collection of " + o; },
      heldCredit: function (o) { return "Collection of " + o + " · image source: "; },
      artist: "Geomyeo Yu Hui-gang, ", zoomWide: "View the whole screen larger", zoom: "View larger",
      pageAlt: function (p) { return "Catalog, page " + p; },
      video: "Geomyeo Yu Hui-gang family interview video"
    },
    zh: {
      src: "收录于《2026 剑如柳熙纲 K-Culture 项目》图录（ⓒ 仁川西海区文化财团，2026）",
      held: function (o) { return o + " 收藏"; },
      heldCredit: function (o) { return o + " 收藏 · 图片来源："; },
      artist: "剑如柳熙纲，", zoomWide: "查看整幅屏风大图", zoom: "查看大图",
      pageAlt: function (p) { return "图录第" + p + "页"; },
      video: "剑如柳熙纲遗属访谈影像"
    },
    ja: {
      src: "『2026 剣如 柳熙綱 K-Culture プロジェクト』図録収録（ⓒ 仁川西海区文化財団、2026）",
      held: function (o) { return o + " 所蔵"; },
      heldCredit: function (o) { return o + " 所蔵 · 画像出典："; },
      artist: "剣如 柳熙綱、", zoomWide: "屏風全体を拡大表示", zoom: "拡大表示",
      pageAlt: function (p) { return "図録 " + p + " 面目"; },
      video: "剣如 柳熙綱 ご遺族インタビュー映像"
    }
  };
  var t = I18N[LANG] || I18N.ko;

  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };

  /* ---------- 내비게이션 ---------- */
  var nav = $(".gy-nav");
  var menuBtn = $(".gy-menu-btn");
  var topBtn = $(".gy-top");
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    nav.classList.toggle("is-scrolled", y > 10);
    nav.classList.toggle("is-top", y < 40);
    topBtn.classList.toggle("is-show", y > 900);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  menuBtn.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  $$(".gy-menu a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
  topBtn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  // 현재 섹션 표시
  if ("IntersectionObserver" in window) {
    var links = {};
    $$(".gy-menu a").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && links[e.target.id]) {
          $$(".gy-menu a").forEach(function (a) { a.classList.remove("is-active"); });
          links[e.target.id].classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main > section[id]").forEach(function (s) { spy.observe(s); });

    var rev = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); rev.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    $$(".gy-reveal").forEach(function (el) { rev.observe(el); });
  } else {
    $$(".gy-reveal").forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- 라이트박스 ---------- */
  var lb = $(".gy-lb"), lbImg = $(".gy-lb-stage img"), lbStage = $(".gy-lb-stage");
  var lbTitle = $(".gy-lb-cap h3"), lbDesc = $(".gy-lb-cap p"), lbCount = $(".gy-lb-count");
  var lbHint = $(".gy-lb-hint");
  var lbCredit = $(".gy-lb-credit");
  var group = [], idx = 0, lastFocus = null;

  function itemsOf(groupName) {
    return $$('[data-lb="' + groupName + '"]').filter(function (el) {
      var fig = el.closest("figure");
      return !(fig && fig.hidden);
    });
  }
  function show(i) {
    idx = (i + group.length) % group.length;
    var el = group[idx];
    var wide = el.getAttribute("data-wide") === "1";
    lbStage.classList.toggle("is-pan", wide);
    lbHint.hidden = !wide;
    lbImg.src = el.getAttribute("data-src");
    lbImg.alt = el.getAttribute("data-title") || "";
    lbTitle.textContent = el.getAttribute("data-title") || "";
    lbDesc.textContent = el.getAttribute("data-desc") || "";
    lbDesc.hidden = !lbDesc.textContent;
    var holder = el.getAttribute("data-credit") ? el : el.closest("[data-credit]");
    lbCredit.textContent = holder ? holder.getAttribute("data-credit") : "";
    lbCredit.hidden = !lbCredit.textContent;
    lbCount.textContent = group.length > 1 ? (idx + 1) + " / " + group.length : "";
    lbStage.scrollLeft = 0;
    // 세로쓰기 병풍은 오른쪽(첫 폭)부터 보이도록
    lbImg.onload = wide ? function () { lbStage.scrollLeft = lbStage.scrollWidth; } : null;
    $(".gy-lb-prev").hidden = $(".gy-lb-next").hidden = group.length < 2;
  }
  function open(el) {
    lastFocus = el;
    group = itemsOf(el.getAttribute("data-lb"));
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    show(group.indexOf(el));
    $(".gy-lb-close").focus();
  }
  function close() {
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lbImg.removeAttribute("src");
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-lb]");
    if (t) { e.preventDefault(); open(t); }
  });
  $(".gy-lb-close").addEventListener("click", close);
  $(".gy-lb-prev").addEventListener("click", function () { show(idx - 1); });
  $(".gy-lb-next").addEventListener("click", function () { show(idx + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb || e.target === lbStage) close(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(idx - 1);
    else if (e.key === "ArrowRight") show(idx + 1);
    else if (e.key === "Tab") {
      var f = $$("button:not([hidden])", lb);
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  // 모바일 스와이프
  var sx = null;
  lbStage.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
  lbStage.addEventListener("touchend", function (e) {
    if (sx === null || lbStage.classList.contains("is-pan")) return;
    var dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
    sx = null;
  });

  /* ---------- 필터 (작품 소장처 / 언론보도 월) ---------- */
  $$("[data-filter-group]").forEach(function (bar) {
    var target = bar.getAttribute("data-filter-group");
    var items = $$('[data-filter-target="' + target + '"] [data-cat]');
    var buttons = $$("button", bar);
    buttons.forEach(function (b) {
      var key = b.getAttribute("data-key");
      var n = items.filter(function (it) { return key === "all" || it.getAttribute("data-cat") === key; })
        .reduce(function (sum, it) { return sum + (parseInt(it.getAttribute("data-n"), 10) || 1); }, 0);
      var c = document.createElement("span"); c.className = "gy-count"; c.textContent = n;
      b.appendChild(c);
      b.addEventListener("click", function () {
        buttons.forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        items.forEach(function (it) { it.hidden = !(key === "all" || it.getAttribute("data-cat") === key); });
      });
    });
  });


  /* ---------- 특별전 출품작: 도록형 목록 + 스테이지 ---------- */
  var dataEl = $("#gy-works-data");
  if (dataEl) {
    var works = JSON.parse(dataEl.textContent);
    var WORK_SRC = t.src;
    var sCredit = document.createElement("p"); sCredit.className = "gy-credit";
    var stage = $(".gy-stage");
    var sImgBtn = $(".gy-stage-img", stage), sImg = $("img", sImgBtn);
    var sCap = $(".gy-cap", stage), sTitle = $("h3", stage), sDesc = $(".gy-stage-desc", stage);
    var sZoom = $(".gy-stage-zoom", stage);
    var idxBtns = $$(".gy-index button");
    var current = -1;
    function setLb(el, w) {
      el.setAttribute("data-lb", "work-" + w.id);
      el.setAttribute("data-src", "assets/img/works/" + w.id + ".jpg");
      el.setAttribute("data-title", w.title + " " + w.hanja);
      el.setAttribute("data-desc", w.year + " · " + w.dim + " · " + w.fmt + " · " + t.held(w.owner) + "\n" + w.desc);
      if (w.wide) el.setAttribute("data-wide", "1"); else el.removeAttribute("data-wide");
      el.setAttribute("data-credit", t.heldCredit(w.owner) + WORK_SRC);
    }
    function pick(i, scroll) {
      var w = works[i]; current = i;
      idxBtns.forEach(function (b, k) { b.setAttribute("aria-current", k === i ? "true" : "false"); });
      sImg.src = "assets/img/works/" + w.id + (w.wide ? ".jpg" : "_t.jpg");
      sImg.alt = t.artist + w.title;
      sCap.textContent = "FIG. " + ("0" + (i + 1)).slice(-2) + " · " + w.year + " · " + w.dim + " · " + w.fmt + " · " + t.held(w.owner);
      sTitle.innerHTML = "";
      sTitle.appendChild(document.createTextNode(w.title));
      var sm = document.createElement("small"); sm.textContent = w.hanja; sTitle.appendChild(sm);
      sDesc.textContent = w.desc;
      sCredit.textContent = t.heldCredit(w.owner) + WORK_SRC;
      if (!sCredit.parentNode) sCap.parentNode.insertBefore(sCredit, sCap.nextSibling);
      sZoom.textContent = w.wide ? t.zoomWide : t.zoom;
      setLb(sImgBtn, w); setLb(sZoom, w);
      if (scroll && window.matchMedia("(max-width: 1080px)").matches) stage.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    idxBtns.forEach(function (b) { b.addEventListener("click", function () { pick(parseInt(b.getAttribute("data-i"), 10), true); }); });
    // 필터 후 현재 작품이 숨겨지면 보이는 첫 작품 선택
    $$('[data-filter-group="works"] button').forEach(function (b) {
      b.addEventListener("click", function () {
        var li = idxBtns[current] && idxBtns[current].parentNode;
        if (li && li.hidden) {
          var first = idxBtns.filter(function (x) { return !x.parentNode.hidden; })[0];
          if (first) pick(parseInt(first.getAttribute("data-i"), 10), false);
        }
      });
    });
    pick(3, false);
  }

  /* ---------- 도록 넘겨보기 ---------- */
  var viewer = $(".gy-viewer");
  if (viewer) {
    var total = parseInt(viewer.getAttribute("data-pages"), 10);
    var img = $(".gy-viewer-stage img", viewer);
    var range = $("input[type=range]", viewer);
    var out = $("output", viewer);
    var prev = $(".is-prev", viewer), next = $(".is-next", viewer);
    var toc = $$(".gy-toc button");
    var page = 1;
    var pad = function (n) { return ("00" + n).slice(-3); };
    function go(p) {
      page = Math.max(1, Math.min(total, p));
      img.classList.add("is-loading");
      img.src = "assets/catalog/pages/" + pad(page) + ".jpg";
      img.alt = t.pageAlt(page);
      range.value = page;
      out.textContent = page + " / " + total;
      prev.disabled = page === 1;
      next.disabled = page === total;
      var active = null;
      toc.forEach(function (b) { if (parseInt(b.getAttribute("data-page"), 10) <= page) active = b; b.classList.remove("is-active"); });
      if (active) active.classList.add("is-active");
      // 다음 면 미리 불러오기
      if (page < total) { var pre = new Image(); pre.src = "assets/catalog/pages/" + pad(page + 1) + ".jpg"; }
    }
    img.addEventListener("load", function () { img.classList.remove("is-loading"); });
    range.max = total;
    range.addEventListener("input", function () { go(parseInt(range.value, 10)); });
    prev.addEventListener("click", function () { go(page - 1); });
    next.addEventListener("click", function () { go(page + 1); });
    toc.forEach(function (b) { b.addEventListener("click", function () { go(parseInt(b.getAttribute("data-page"), 10)); }); });
    // 본문의 "전문 보기" 링크 → 도록 해당 면으로 이동
    $$("[data-goto]").forEach(function (a) { a.addEventListener("click", function () { go(parseInt(a.getAttribute("data-goto"), 10)); }); });
    viewer.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { go(page - 1); e.preventDefault(); }
      if (e.key === "ArrowRight") { go(page + 1); e.preventDefault(); }
    });
    var vx = null, stage = $(".gy-viewer-stage", viewer);
    stage.addEventListener("touchstart", function (e) { vx = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener("touchend", function (e) {
      if (vx === null) return;
      var dx = e.changedTouches[0].clientX - vx;
      if (Math.abs(dx) > 40) go(page + (dx < 0 ? 1 : -1));
      vx = null;
    });
    go(1);
  }

  /* ---------- 유족 인터뷰 영상 ---------- */
  var video = $(".gy-video");
  if (video && INTERVIEW_VIDEO_URL) {
    var m = INTERVIEW_VIDEO_URL.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
    if (m) {
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + m[1];
      f.title = t.video;
      f.loading = "lazy";
      f.allow = "accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen";
      f.allowFullscreen = true;
      $(".gy-video-frame", video).appendChild(f);
      video.hidden = false;
    }
  }
})();
