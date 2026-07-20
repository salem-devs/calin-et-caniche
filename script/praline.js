/* ==========================================================================
   PRALINE.JS — Animations légères — Câlin & Caniche
   Aucune dépendance externe. ~60 lignes.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- 1. Reveal au scroll (IntersectionObserver) ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Repli : navigateur trop ancien, on affiche tout directement.
    revealEls.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  /* ---------- 2. Mini-nav qui se solidifie au scroll ---------- */
  var nav = document.getElementById("miniNav");

  function updateNav() {
    if (!nav) return;
    if (window.scrollY > 60) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }
  updateNav();
  window.addEventListener("scroll", updateNav, { passive: true });

  /* ---------- 3. Repli vidéo -> image si la vidéo hero ne peut pas se charger ---------- */
  var heroVideo = document.querySelector(".hero-video video");
  var posterFallback = document.querySelector(".hero-video .poster-fallback");

  if (heroVideo) {
    heroVideo.addEventListener("error", function () {
      heroVideo.style.display = "none";
      if (posterFallback) posterFallback.style.display = "block";
    });
  }

  /* ---------- 4. Vidéo verticale : lecture uniquement quand elle est visible ---------- */
  var verticalVideo = document.querySelector(".video-frame video");
  if (verticalVideo && "IntersectionObserver" in window) {
    var vObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            verticalVideo.play().catch(function () {});
          } else {
            verticalVideo.pause();
          }
        });
      },
      { threshold: 0.4 }
    );
    vObserver.observe(verticalVideo);
  }
})();
