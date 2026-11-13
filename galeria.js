// "Un poquito de mí": polaroids que aparecen al hacer scroll y se abren en grande al tocarlas
(function () {
  var items = Array.prototype.slice.call(document.querySelectorAll(".polaroid"));
  if (!items.length) return;

  /* ---------- Aparición suave ---------- */
  if ("IntersectionObserver" in window && !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
    document.documentElement.classList.add("js-polaroids");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.25 });
    items.forEach(function (el) { io.observe(el); });
    var title = document.querySelector(".gallery__inner");
    if (title) io.observe(title);
  }

  /* ---------- Visor ---------- */
  var box = document.querySelector(".lightbox");
  var img = box.querySelector(".lightbox__img");
  var index = 0;

  function show(i) {
    index = (i + items.length) % items.length;
    var src = items[index].querySelector("img");
    img.src = src.currentSrc || src.src;
    img.alt = src.alt;
  }

  items.forEach(function (el, i) {
    el.addEventListener("click", function () { show(i); box.showModal(); });
  });
  box.querySelector("[data-close-lightbox]").addEventListener("click", function () { box.close(); });
  box.querySelector("[data-prev-photo]").addEventListener("click", function () { show(index - 1); });
  box.querySelector("[data-next-photo]").addEventListener("click", function () { show(index + 1); });
  box.addEventListener("click", function (e) { if (e.target === box) box.close(); });
  box.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });

  // deslizar con el dedo para pasar de foto
  var x0 = null;
  box.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  box.addEventListener("touchend", function (e) {
    if (x0 == null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45) show(index + (dx < 0 ? 1 : -1));
    x0 = null;
  });
})();
