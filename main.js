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
