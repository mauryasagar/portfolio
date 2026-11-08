/* Scroll menu targets to the middle of the screen */
(function () {
  document.addEventListener("click", function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    e.preventDefault();

    var box = target.getBoundingClientRect();
    var maxTop = document.documentElement.scrollHeight - window.innerHeight;
    var top = box.height >= window.innerHeight
      ? box.top + window.scrollY - 16
      : box.top + window.scrollY - (window.innerHeight - box.height) / 2;
    window.scrollTo({ top: Math.max(0, Math.min(top, maxTop)), behavior: "smooth" });

    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    try { history.replaceState(null, "", link.getAttribute("href")); } catch (err) {}
  });
})();