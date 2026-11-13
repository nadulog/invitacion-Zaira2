// Mariposas que cruzan volando algunas secciones (las mismas de Julia / Florencia / Belén:
// assets/mariposa-rosa.webp y su versión aguamarina). Se marcan con data-mariposas="cantidad".
// Solo vuelan mientras la sección está en pantalla.
(function () {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // [inicio x, inicio y, medio x, medio y, fin x, fin y, giro inicio, giro medio, giro fin] (rutas de Julia)
  var ROUTES = [
    ["-12%", "18%", "42%", "10%", "108%", "28%", "62deg", "78deg", "70deg"],
    ["108%", "34%", "58%", "25%", "-12%", "14%", "-64deg", "-78deg", "-68deg"],
    ["12%", "104%", "34%", "62%", "74%", "-10%", "18deg", "28deg", "20deg"],
    ["86%", "102%", "66%", "58%", "24%", "-12%", "-20deg", "-30deg", "-22deg"],
    ["-10%", "72%", "36%", "52%", "108%", "78%", "82deg", "96deg", "86deg"],
    ["108%", "68%", "64%", "46%", "-12%", "82%", "-86deg", "-98deg", "-88deg"],
    ["4%", "40%", "48%", "32%", "96%", "8%", "48deg", "62deg", "52deg"],
    ["96%", "12%", "52%", "38%", "2%", "56%", "-42deg", "-58deg", "-46deg"],
    ["28%", "108%", "44%", "70%", "18%", "-10%", "8deg", "-16deg", "-8deg"],
    ["72%", "-10%", "58%", "36%", "82%", "108%", "172deg", "156deg", "166deg"]
  ];
  var IMAGES = ["assets/mariposa-rosa.webp", "assets/mariposa-agua.webp"];

  var zones = Array.prototype.slice.call(document.querySelectorAll("[data-mariposas]"));
  var n = 0;
  zones.forEach(function (zone, z) {
    var layer = document.createElement("div");
    layer.className = "butterflies";
    layer.setAttribute("aria-hidden", "true");
    var count = parseInt(zone.getAttribute("data-mariposas"), 10) || 2;
    for (var i = 0; i < count; i++, n++) {
      var route = ROUTES[(z * 3 + i * 4) % ROUTES.length];
      var b = document.createElement("span");
      b.className = "butterfly";
      var img = document.createElement("img");
      img.src = IMAGES[n % IMAGES.length];
      img.alt = "";
      img.decoding = "async";
      var values = {
        "--start-x": route[0], "--start-y": route[1], "--middle-x": route[2], "--middle-y": route[3],
        "--end-x": route[4], "--end-y": route[5], "--start-rotation": route[6],
        "--middle-rotation": route[7], "--end-rotation": route[8],
        "--size": (30 + (n % 4) * 6) + "px",
        "--scale": 0.85 + (n % 3) * 0.08,
        "--duration": (11 + (n % 5) * 1.3) + "s",
        "--delay": (-(i * 4.3 + z * 1.7)) + "s",
        "--flap-duration": (560 + (n % 4) * 90) + "ms"
      };
      for (var k in values) b.style.setProperty(k, values[k]);
      b.appendChild(img);
      layer.appendChild(b);
    }
    zone.appendChild(layer);
  });

  // pausar fuera de pantalla
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { e.target.classList.toggle("is-flying", e.isIntersecting); });
    });
    document.querySelectorAll(".butterflies").forEach(function (l) { io.observe(l); });
  } else {
    document.querySelectorAll(".butterflies").forEach(function (l) { l.classList.add("is-flying"); });
  }
})();
