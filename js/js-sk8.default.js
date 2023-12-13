'use strict';

var page = $('.l-wrapper').attr('data-page');

(function () {
  var body = $('body');
  var jsMenu = $('.c-nav');
  var jsMenuBtn = $('.c-hamburger');
  var jsMenuItem = $('.c-nav__item');
  jsMenuBtn.on('click', function () {
    if (jsMenu.hasClass('is-open')) {
      closeMenu();
    } else {
      body.addClass('is-modal-open');
      jsMenu.addClass('is-open');
      jsMenuBtn.addClass('is-open');
      setTimeout(function () {
        jsMenuItem.each(function (i) {
          var split = $(this).find('.js-separate span');
          split.each(function (j) {
            setTimeout(function () {
              split.eq(j).addClass('is-active');
            }, 40 * j);
          });
        });
      }, 600);
    }
  });

  function closeMenu() {
    body.removeClass('is-modal-open');
    jsMenuBtn.removeClass('is-open');
    jsMenu.removeClass('is-open');
    $('.js-separate span').removeClass('is-active');
  }

  $('.js-pagetop').on('click', function () {
    $('body,html').animate({
      scrollTop: 0
    }, 700, 'easeInOutCubic');
    return false;
  });
  $('.js-innerlink').on('click', function () {
    var target = $(this).attr('data-link');
    var position = $(target).offset().top;
    $('html, body').stop(true).animate({
      scrollTop: position
    }, 700, 'easeInOutCubic');
  });
  $('.js-separate').each(function () {
    var self = this;
    str;
    var str = $(this).html().replace(/\n/g, '').replace(/<br>/g, '\n').replace(/<br class="is-sp">/g, '\r').replace(/<br class="is-pc">/g, '\t').replace(/&nbsp;/g, '\f');
    $(self).html('');

    for (var i = 0; i <= str.length; i++) {
      var txt = '<span><span>' + str.substr(i, 1) + '</span></span>';
      $(self).append(txt.replace('<span><span></span></span>', '').replace('<span><span> </span></span>', '').replace('<span><span>\n</span></span>', '<br>').replace('<span><span>\r</span></span>', '<br class="is-sp">').replace('<span><span>\t</span></span>', '<br class="is-pc">').replace('<span><span>\f</span></span>', '<span>&nbsp;</span>'));
    }
  });
  $('.js-separate2').each(function () {
    var self2 = this;
    str2;
    var str2 = $(this).html().replace(/\n/g, '').replace(/<br>/g, '\n').replace(/<br class="is-sp">/g, '\r').replace(/<br class="is-pc">/g, '\t').replace(/&nbsp;/g, '\f');
    $(self2).html('');

    for (var i = 0; i <= str2.length; i++) {
      var txt2 = '<span>' + str2.substr(i, 1) + '</span>';
      $(self2).append(txt2.replace('<span></span>', '').replace('<span> </span>', '').replace('<span>\n</span>', '<br>').replace('<span>\r</span>', '<br class="is-sp">').replace('<span>\t</span>', '<br class="is-pc">').replace('<span>\f</span>', '<span>&nbsp;</span>'));
    }
  });
})();

var wW = $(window).outerWidth();
var wH = $(window).innerHeight();

var updateDOM = function updateDOM() {
  wW = $(window).outerWidth();
  wH = $(window).innerHeight();
};

var scrollReverse = false;

if (page == 'top') {
  scrollReverse = true;
}

var scrollContent = {
  param: {
    elem: '.js-scroll',
    displayRatio: 0.7,
    displayReverse: scrollReverse,
    addClassNameActive: 'is-scrolled',
    on: {
      In: function In(item, pos) {
        if ($(item).has('.js-split')) {
          var scrollTitle = $(item).find('.js-split');
          scrollTitle.each(function (i) {
            setTimeout(function () {
              setTimeout(function () {
                scrollTitle.eq(i).addClass('is-fase1');
                setTimeout(function () {
                  scrollTitle.eq(i).addClass('is-fase2');
                }, 200);
              }, 80 * i);
            }, 400);
          });
        }

        if ($(item).has('.js-separate2')) {
          var scrollColoredTxt = $(item).find('.js-separate2 span');
          scrollColoredTxt.each(function (j) {
            setTimeout(function () {
              setTimeout(function () {
                scrollColoredTxt.eq(j).addClass('is-active');
              }, 80 * j);
            }, 500);
          });
        }

        if ($(item).has('.js-scroll__list')) {
          var scrollListItem = $(item).find('.js-scroll__list li');
          scrollListItem.each(function (n) {
            setTimeout(function () {
              setTimeout(function () {
                scrollListItem.eq(n).addClass('is-active');
              }, 100 * n);
            }, 500);
          });
        }
      },
      Out: function In(item, pos) {
        setTimeout(function () {
          $(item).find('.js-split').removeClass('is-fase1 is-fase2');
        }, 400);
      }
    }
  },
  position: function position() {},
  set: function set() {
    this.module = new SCROLL_EFFECT_MODULE(this.param);
  },
  scroll: function scroll() {},
  resize: function resize() {},
  init: function init() {
    this.set();
  }
};
$(window).on('load', function () {
  $('.l-wrapper').addClass('is-load');

  if ($('.js-scroll').length) {
    scrollContent.init();
  }

  if ($('.l-in')) {
    var split = $('.l-in__title').children('span');
    split.each(function (i) {
      setTimeout(function () {
        setTimeout(function () {
          split.eq(i).addClass('is-fase1');
          setTimeout(function () {
            split.eq(i).addClass('is-fase2');
          }, 200);
        }, 80 * i);
      }, 400);
    });
  }
});
$(window).on('load resize', function () {
  updateDOM();
});
$(window).on('load scroll resize', function () {
  var scT = $(window).scrollTop();
  $('.js-parallax--big').each(function (i) {
    var parallaxNum = Math.floor(scT * 0.12);
    $(this).css({
      transform: 'translate3d(0,' + -parallaxNum + 'px,0)'
    });
  });
  $('.js-parallax--middle').each(function (j) {
    var parallaxNum = Math.floor(scT * 0.08);

    if ($(this).hasClass('-above')) {
      $(this).css({
        transform: 'translate3d(0,' + parallaxNum + 'px,0)'
      });
    } else if ($(this).hasClass('-bottom')) {
      $(this).css({
        transform: 'translate3d(0,' + -parallaxNum + 'px,0)'
      });
    }
  });
  $('.js-parallax--small').each(function (j) {
    var parallaxNum = Math.floor(scT * 0.04);

    if ($(this).hasClass('-above')) {
      $(this).css({
        transform: 'translate3d(0,' + parallaxNum + 'px,0)'
      });
    } else if ($(this).hasClass('-bottom')) {
      $(this).css({
        transform: 'translate3d(0,' + -parallaxNum + 'px,0)'
      });
    }
  });
});
var Modal = {
  instance: null,
  init: function init() {
    var _template = '' + '<div class="m-modal is-close" id="{{ id }}" data-modal-type>' + '  <div class="m-modal__wrap">' + '    <div class="m-modal__bg" data-modal-ui-close></div>' + '    <div class="m-modal__inner">' + '      <div class="m-modal__content">' + '        {{ content }}' + '      </div>' + '    </div>' + '    <div class="m-modal__close" data-modal-ui-close>' + '      <span></span>' + '      <span></span>' + '    </div>' + '  </div>' + '</div>';

    this.instance = new MODAL_MODULE({
      duration: 800,
      zIndex: 10,
      removeWrapperTag: false,
      defaultModalStyle: false,
      customModalHtml: _template,
      customModalStyle: '<style>.m-modal {} </style>',
      loadStart: false,
      elemOutputSelector: '.l-wrapper',
      elemYoutubePlayerAspectRatio: '16:9',
      movie: {
        youtube: {
          height: '360',
          width: '640',
          playerVars: {
            autoplay: 1,
            playsinline: 1,
            controls: 1,
            disablekb: 0,
            fs: 1,
            loop: 0,
            rel: 0
          }
        }
      },
      on: {
        afterOpen: function afterOpen(data, target, state, elem) {
          if (state.elemOpenHtml.match('m-modal__title')) {
            var split = $('.m-modal .m-modal__title').children('span');
            split.each(function (i) {
              setTimeout(function () {
                split.eq(i).addClass('is-active');
              }, 40 * i);
            });
          }

          if (state.elemOpenHtml.match('m-modal__item')) {
            $('.m-modal__item').addClass('is-active');
          }
        }
      }
    });
  }
};

if ($('[data-modal]').length) {
  Modal.init();
}