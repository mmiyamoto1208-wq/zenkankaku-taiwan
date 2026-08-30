/*!
 * 全感覚旅行記 台湾編
 * ライブラリ不使用。スクロールに応じた表示のみ。
 */
(function () {
  'use strict';

  var targets = document.querySelectorAll('.rv');
  if (!targets.length) { return; }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(targets, function (el) { el.classList.add('in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

  Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
})();
/* ── 旅の記録：スクロールに合わせた表示とゆらぎ ─────────
   1. 画面に入った写真を、少し遅れて順に浮かび上がらせる
   2. 現れたあとは、スクロール量に応じて上下に十数pxだけずらす。
      枠ごとにずれ幅が違うので、列が同じ速さで流れない。 */
(function () {
  'use strict';
  var figs = document.querySelectorAll('.gal-grid figure');
  if (!figs.length) { return; }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(figs, function (f) { f.classList.add('in'); });
    return;
  }

  /* 1. 順に現れる */
  var seen = [];
  var io = new IntersectionObserver(function (entries) {
    var batch = entries.filter(function (e) { return e.isIntersecting; });
    batch.forEach(function (e, i) {
      var el = e.target;
      setTimeout(function () {
        el.classList.add('in');
        setTimeout(function () {
          el.classList.add('drift');
          if (seen.indexOf(el) < 0) { seen.push(el); }
        }, 1100);
      }, i * 110);
      io.unobserve(el);
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -8% 0px' });
  Array.prototype.forEach.call(figs, function (f) { io.observe(f); });

  /* 2. スクロールに合わせたゆらぎ */
  var ticking = false;
  function update() {
    ticking = false;
    var vh = window.innerHeight;
    for (var i = 0; i < seen.length; i++) {
      var el = seen[i];
      var r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) { continue; }
      var amount = parseFloat(getComputedStyle(el).getPropertyValue('--drift')) || 0;
      if (!amount) { continue; }
      /* 画面中央を0として、上下で -1〜1 */
      var p = ((r.top + r.height / 2) - vh / 2) / (vh / 2);
      if (p > 1) { p = 1; } else if (p < -1) { p = -1; }
      el.style.transform = 'translate3d(0,' + (p * amount).toFixed(2) + 'px,0)';
    }
  }
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
})();
