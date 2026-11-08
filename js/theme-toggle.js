/* Light/dark toggle */
(function () {
  var root = document.documentElement;
  var btn  = document.querySelector(".tg");
  var sun  = btn.querySelector(".sun");
  var moon = btn.querySelector(".moon");

  function place(dark) {
    [sun, moon].forEach(function (e) { e.style.transition = "none"; });
    sun.dataset.p  = dark ? "l" : "t";
    moon.dataset.p = dark ? "t" : "l";
    void btn.offsetWidth;
    [sun, moon].forEach(function (e) { e.style.transition = ""; });
    btn.setAttribute("aria-pressed", String(dark));
  }
  place(root.dataset.mode === "dark");

  btn.addEventListener("click", function () {
    var wasDark = root.dataset.mode === "dark";
    var rise = wasDark ? sun  : moon;
    var set  = wasDark ? moon : sun;
    rise.style.transition = "none"; rise.dataset.p = "l"; void rise.offsetWidth; rise.style.transition = "";
    rise.dataset.p = "t"; set.dataset.p = "r";
    root.dataset.mode = wasDark ? "light" : "dark";
    btn.setAttribute("aria-pressed", String(!wasDark));
    try { localStorage.setItem("theme", wasDark ? "light" : "dark"); } catch (e) {}
  });
})();