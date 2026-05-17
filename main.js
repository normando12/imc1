(function () {
  "use strict";

  var header = document.querySelector(".header");
  var nav = document.querySelector(".nav");
  var navToggle = document.querySelector(".nav-toggle");
  var hero = document.querySelector(".hero");
  var heroSlides = document.querySelectorAll(".hero__bg-slide");
  var slideIndex = 0;
  var heroTimer;
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

  /* Hero carousel — duração por slide (mesa 15s, azul 4s, demais 6s) */
  function getSlideDuration(index) {
    var slide = heroSlides[index];
    if (!slide) return 6000;
    var ms = parseInt(slide.getAttribute("data-duration"), 10);
    return ms > 0 ? ms : 6000;
  }

  function updateHeroOverlay() {
    if (!hero || !heroSlides.length) return;
    var active = heroSlides[slideIndex];
    hero.classList.toggle(
      "hero--overlay-blue",
      active && active.hasAttribute("data-overlay-blue")
    );
  }

  function goToHeroSlide(index) {
    if (!heroSlides.length) return;
    heroSlides[slideIndex].classList.remove("hero__bg-slide--active");
    slideIndex = ((index % heroSlides.length) + heroSlides.length) % heroSlides.length;
    heroSlides[slideIndex].classList.add("hero__bg-slide--active");
    updateHeroOverlay();
    clearTimeout(heroTimer);
    heroTimer = setTimeout(function () {
      goToHeroSlide(slideIndex + 1);
    }, getSlideDuration(slideIndex));
  }

  if (heroSlides.length) {
    goToHeroSlide(0);
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
