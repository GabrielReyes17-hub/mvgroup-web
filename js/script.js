(function ($) {

  "use strict";

  // ------------------------------------------------------------------------------ //
  // Overlay Menu Navigation
  // ------------------------------------------------------------------------------ //
  var overlayMenu = function () {
    if (!$('.nav-overlay').length) { return false; }

    var body, menu, menuItems;

    var init = function init() {
      body = document.querySelector('body');
      menu = document.querySelector('.menu-btn');
      menuItems = document.querySelectorAll('.nav__list-item');
      applyListeners();
    };

    var applyListeners = function applyListeners() {
      menu.addEventListener('click', function () {
        return toggleClass(body, 'nav-active');
      });
    };

    var toggleClass = function toggleClass(element, stringClass) {
      if (element.classList.contains(stringClass)) element.classList.remove(stringClass);
      else element.classList.add(stringClass);
    };

    init();
  }

  // Portfolio Slider
  var swiper = new Swiper(".portfolio-Swiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    pagination: { el: ".swiper-pagination", clickable: true },
    breakpoints: {
      300: { slidesPerView: 2 },
      768: { slidesPerView: 2, spaceBetween: 20 },
      1200: { slidesPerView: 3, spaceBetween: 30 },
    },
  });

  // Animate Texts
  var initTextFx = function () {
    $('.txt-fx').each(function () {
      var newstr = '';
      var count = 0;
      var delay = 100;
      var stagger = 10;
      var words = this.textContent.split(/\s/);
      var arrWords = [];

      $.each(words, function (key, value) {
        newstr = '<span class="word">';
        for (var i = 0, l = value.length; i < l; i++) {
          newstr += "<span class='letter' style='transition-delay:" + (delay + stagger * count) + "ms;'>" + value[i] + "</span>";
          count++;
        }
        newstr += '</span>';
        arrWords.push(newstr);
        count++;
      });

      this.innerHTML = arrWords.join("<span class='letter' style='transition-delay:" + delay + "ms;'>&nbsp;</span>");
    });
  }

  // init Isotope
  var initIsotope = function () {
    $('.grid').each(function () {
      var $buttonGroup = $('.button-group');
      var $checked = $buttonGroup.find('.is-checked');
      var filterValue = $checked.attr('data-filter');

      var $grid = $('.grid').isotope({ itemSelector: '.portfolio-item', filter: filterValue });

      $('.button-group').on('click', 'a', function (e) {
        e.preventDefault();
        filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
      });

      $('.button-group').each(function (i, buttonGroup) {
        $buttonGroup.on('click', 'a', function () {
          $buttonGroup.find('.is-checked').removeClass('is-checked');
          $(this).addClass('is-checked');
        });
      });
    });
  }

  // init Chocolat light box
  var initChocolat = function () {
    Chocolat(document.querySelectorAll('.image-link'), { imageSize: 'contain', loop: true });
  }

  $(document).ready(function () {

    overlayMenu();
    initTextFx();
    initChocolat();

    // mobile menu
    $('.menu-btn').click(function (e) {
      e.preventDefault();
      $('body').toggleClass('nav-active');
    });

    AOS.init({ duration: 1200 });

    // -----------------------------
    // Íconos automáticos en listas
    // -----------------------------
    const iconMap = {
      "deudas": "fas fa-ban text-danger",
      "hábitos": "fas fa-calendar-check text-primary",
      "decisiones": "fas fa-lightbulb text-warning",
      "fondo": "fas fa-piggy-bank text-success",
      "gastos": "fas fa-wallet text-secondary",
      "ahorro": "fas fa-coins text-success",
      "plan": "fas fa-chart-line text-info",
      "invertir": "fas fa-hand-holding-dollar text-success",
      "gubernamental": "fas fa-landmark text-primary",
      "acciones": "fas fa-chart-line text-warning",
      "índices": "fas fa-chart-bar text-info",
      "estrategias": "fas fa-lightbulb text-primary",
      "portafolio": "fas fa-briefcase text-secondary",
      "riesgo": "fas fa-exclamation-triangle text-danger",
      "ley": "fas fa-gavel text-primary",
      "requisitos": "fas fa-file-alt text-info",
      "asesoría": "fas fa-user-tie text-warning",
      "cálculos": "fas fa-calculator text-success",
      "continuación": "fas fa-arrow-right text-secondary",
      "fundamentos": "fas fa-book text-info",
      "trámites": "fas fa-file-signature text-primary"
    };

    $('.auto-icons li').each(function () {
      let liText = $(this).text().toLowerCase();
      for (const key in iconMap) {
        if (liText.includes(key)) {
          $(this).prepend(`<i class="${iconMap[key]} me-2"></i>`);
          break;
        }
      }
    });

  });

  // window load
  $(window).load(function () {
    $(".preloader").fadeOut("slow");
    initIsotope();
  });

})(jQuery);
