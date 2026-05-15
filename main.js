(function () {
  "use strict";

  var header = document.querySelector(".header");
  var nav = document.querySelector(".nav");
  var navToggle = document.querySelector(".nav-toggle");
  var heroSlides = document.querySelectorAll(".hero__bg-slide");
  var slideIndex = 0;
  var form = document.getElementById("form-contato");
  var formMsg = document.getElementById("form-msg");

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
      document.body.style.overflow = !open ? "hidden" : "";
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  /* Hero carousel */
  function nextSlide() {
    if (!heroSlides.length) return;
    heroSlides[slideIndex].classList.remove("hero__bg-slide--active");
    slideIndex = (slideIndex + 1) % heroSlides.length;
    heroSlides[slideIndex].classList.add("hero__bg-slide--active");
  }

  if (heroSlides.length > 1) {
    setInterval(nextSlide, 6000);
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll(".reveal");
  var io =
    typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                io.unobserve(entry.target);
              }
            });
          },
          { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
        )
      : null;

  if (io) {
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  window.addEventListener("load", function () {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  });

  /* Contact form — front-end apenas; conecte a um backend conforme necessário */
  if (form && formMsg) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      formMsg.textContent =
        "Obrigado! Sua mensagem foi registrada. Em produção, conecte este formulário ao e-mail ou CRM da empresa.";
      form.reset();
    });
  }
})();
