'use strict';

(function () {
  var YoutubeBg = {
    instance: undefined,
    config: {
      wrap: '.js-yt-mv',
      area: 'yt_iframe',
      id: undefined
    },
    state: {
      mq: undefined,
      init: false
    },
    set: function set(id) {
      var _this1 = this;

      if (typeof YT !== 'undefined' && typeof YT.Player !== 'undefined') {
        this.config.id = id;
        this.instance = new YT.Player(this.config.area, {
          videoId: this.config.id,
          playerVars: {
            rel: 0,
            loop: 1,
            playlist: this.config.id,
            controls: 0,
            showinfo: 0,
            disablekb: 1,
            playsinline: 1,
            'html5': 1
          }
        });
        this.instance.addEventListener('onReady', function () {
          document.querySelector(_this1.config.wrap).classList.add('is-mv-init');
          _this1.state.init = false;

          _this1.instance.mute();

          _this1.instance.playVideo();

          _this1.scroll();

          $(window).on('scroll', function () {
            _this1.scroll();
          });
        });
      } else {
        setTimeout(function () {
          _this1.set(id);
        }, 200);
      }
    },
    play: function play() {
      this.instance.playVideo();
    },
    pause: function pause() {
      this.instance.pauseVideo();
    },
    scroll: function scroll() {
      if (this.state.init) {
        var area = document.querySelector(this.config.wrap);
        var rect = area.getBoundingClientRect();

        if (rect.bottom > 0 && rect.top - $(window).innerHeight() < 0) {
          this.play();
        } else {
          this.pause();
        }
      }
    },
    resize: function resize() {
      var _this2 = this;

      $(window).on('resize', function () {
        if (typeof YT !== 'undefined' && typeof YT.Player !== 'undefined') {
          if (_this2.state.init) {
            _this2.play();
          } else {
            $(_this2.config.wrap).append('<script async src="//www.youtube.com/iframe_api"></script>');

            _this2.set($(_this2.config.wrap).attr('data-yt'));
          }
        }
      });
    },
    init: function init() {
      $(this.config.wrap).append('<script async src="//www.youtube.com/iframe_api"></script>');
      this.set($(this.config.wrap).attr('data-yt'));
      this.resize();
    }
  };
  var from = location.search;
  var hash = location.hash;


//  if (from != '' || hash != '') {

  if (hash != '') {
    $('.l-op').hide();
  }else{
  

	if($(".loading_float").length){
		setTimeout(function(){
			$(".loading_float").trigger('click');
		},2000)
	}

  }

  var device;
  var userAgent = window.navigator.userAgent.toLowerCase();

  if (userAgent.indexOf('iphone') > -1) {
    device = 'iPhone';
  } else if (userAgent.indexOf('ipad') > -1 || userAgent.indexOf('macintosh') > -1 && 'ontouchend' in document) {
    device = 'iPad';
  } else if (userAgent.indexOf('android') > -1) {
    device = 'Android';
  } else {
    device = 'PC';
  }

  $(window).on('load', function () {
    if (device == 'PC' && wW > 900) {
      YoutubeBg.init();
    }

    if (from == '' && hash == '') {
      setTimeout(function () {
        $('.p-main').addClass('is-active');
      }, 2000);
      setTimeout(function () {
        $('.c-hamburger').addClass('is-active');
      }, 4000);
    } else {
      $('.p-main').addClass('is-active');
      setTimeout(function () {
        $('.c-hamburger').addClass('is-active');
      }, 2000);
    }
  });
  $(".bnr-slide").slick({
    speed: 600,
    autoplaySpeed: 3000,
    autoplay: true,
    infinite: true,
    arrows: true,
    prevArrow: '<div class="p-bnr__arrow prev"><img src="./assets/img/news/arrow_m.png" alt="前へ"></div>',
    nextArrow: '<div class="p-bnr__arrow next"><img src="./assets/img/news/arrow_m_r.png" alt="次へ"></div>',
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        vertical: true,
        verticalSwiping: true
      }
    }]
  });
})();