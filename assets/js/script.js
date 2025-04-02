!(function () {
  "use strict";
  var e = document.querySelector("#mainNav");
  if (e) {
    var o = e.querySelector(".navbar-collapse");
    if (o) {
      var t = new bootstrap.Collapse(o, { toggle: !1 }),
        n = o.querySelectorAll("a");
      for (var r of n)
        r.addEventListener("click", function (e) {
          t.hide();
        });
    }
    var a = function () {
      (void 0 !== window.pageYOffset
        ? window.pageYOffset
        : (
            document.documentElement ||
            document.body.parentNode ||
            document.body
          ).scrollTop) > 100
        ? e.classList.add("navbar-shrink")
        : e.classList.remove("navbar-shrink");
    };
    a(), document.addEventListener("scroll", a);
    var l = document.querySelectorAll(".portfolio-modal");
    for (var d of l)
      d.addEventListener("shown.bs.modal", function (o) {
        e.classList.add("d-none");
      }),
        d.addEventListener("hidden.bs.modal", function (o) {
          e.classList.remove("d-none");
        });
    var i = document.querySelectorAll("section"),
      s = e.querySelectorAll(".navbar-nav a");
    function u() {
      let e = "";
      i.forEach((o) => {
        const t = o.offsetTop - 150,
          n = t + o.offsetHeight;
        window.scrollY >= t && window.scrollY < n && (e = o.getAttribute("id"));
      }),
        s.forEach((o) => {
          o.classList.toggle("active", o.getAttribute("href") === `#${e}`);
        });
    }
    document.addEventListener("scroll", u), u();
    var c = document.createElement("button");
    (c.id = "backToTop"),
      (c.className = "btn position-fixed bottom-0 end-0 m-3"),
      (c.style = "background-color: #DDB760"),
      (c.style.display = "none"),
      (c.innerText = "↑ Powrót na góre"),
      document.body.appendChild(c),
      window.addEventListener("scroll", function () {
        window.scrollY > 100
          ? (c.style.display = "block")
          : (c.style.display = "none");
      }),
      c.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  }
})();

