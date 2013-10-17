/**
 * -----------------------------------------------------
 * zView v0.0.0 by @dotzweer
 * -----------------------------------------------------
 * Copyright 2013 Niccolò Olivieri <flicofloc@gmail.com>
 */

if (typeof jQuery === 'undefined') { 
  throw new Error('zView requires jQuery');
}

(function ($) { 'use strict';

  var $window = $(window);

  var ZView = function (element, options) {
    this.$element = $(element);
    this.options = options;

    this._initElement();
    this._initEvents();
  };

  ZView.prototype._initElement = function() {
    this.$element
      .css({
        position: this.$element.css('position') !== 'static' ? this.$element.css('position') : 'relative'
      })
      .addClass(this.options.name)
      .addClass(this.options.theme + '-theme')
      .addClass('zView');

    if (this.options.rtl) {
      this.$element.addClass('zView-rtl');
    }

    this.$element.children().each($.proxy(this._initChild, this));

    this.$contents = this.$element.children()
      .css({
        position: 'absolute',
        zIndex: this.options.zIndex
      })
      .addClass('zView-item')
      .fadeOut(0);

    this._initElements();

    this.show(this.options.startSlide, this.options.play);
  };

  ZView.prototype._initChild = function(index, element) {
      var $element = $(element);

      switch ($element.prop('tagName').toLowerCase()) {
        case 'div':
          return;

        case 'img':
          $element
            .wrap($('<div></div>')
              .css({
                backgroundImage: 'url("' + $element.attr('src') + '")',
                backgroundSize: 'cover'
              })
            )
            .remove();
          break;

        default:
          $element
            .wrap($('<div></div>'));
      }
  };

  ZView.prototype._initElements = function() {
    this._initNavigator();
    this._initPlayPause();
    this._initNextPrev();
  };

  ZView.prototype._initNavigator = function() {
    this.$navigator = $('<ul></ul>')
      .appendTo(this.$element)
      .addClass('zView-navigator')
      .css({
        zIndex: this.options.zIndex + 20
      })
      .mouseenter($.proxy(function () {
        this.$navigator.animate({
          opacity: this.options.buttons.opacity.navigator.end
        }, {
          duration: this.options.buttons.opacity.navigator.durationEnd,
          easing: this.options.buttons.opacity.navigator.easingEnd,
          queue: false
        });
      }, this))
      .mouseleave($.proxy(function () {
        this.$navigator.animate({
          opacity: this.options.buttons.opacity.navigator.start
        }, {
          duration: this.options.buttons.opacity.navigator.durationStart,
          easing: this.options.buttons.opacity.navigator.easingStart,
          queue: false
        });
      }, this));

    this.$navigatorPrevious = $('<a></a>')
      .html(this.options.buttons.htmls.previous)
      .attr('title', this.options.buttons.labels.previous)
      .attr('href', '#')
      .click($.proxy(this.options.rtl ? this.next : this.prev, this))
      .appendTo($('<li></li>').addClass('zView-navigator-prev').appendTo(this.$navigator));

    this.$contents.each($.proxy(function (index, $content) {
      $('<a></a>')
        .html(this.options.buttons.htmls.element)
        .attr('title', 'Content ' + index)
        .attr('href', '#')
        .click($.proxy(this.show, this, index))
        .appendTo($('<li></li>').appendTo(this.$navigator))
    }, this));

    this.$navigatorNext = $('<a></a>')
      .html(this.options.buttons.htmls.next)
      .attr('title', this.options.buttons.labels.next)
      .attr('href', '#')
      .click($.proxy(this.options.rtl ? this.prev : this.next, this))
      .appendTo($('<li></li>').addClass('zView-navigator-next').appendTo(this.$navigator));

    this.$navigator
      .css({
        marginLeft: this.$navigator.width() / -2
      })
      .mouseleave();
  };

  ZView.prototype._initPlayPause = function() {
    this.$playPause = $('<a></a>')
      .appendTo(this.$element)
      .addClass('zView-playpause')
      .attr('href', '#')
      .css({
        zIndex: this.options.zIndex + 20
      })
      .click($.proxy(this.toggle, this))
      .mouseenter($.proxy(function () {
        this.$playPause.animate({
          opacity: this.options.buttons.opacity.playpause.end
        }, {
          duration: this.options.buttons.opacity.playpause.durationEnd,
          easing: this.options.buttons.opacity.playpause.easingEnd,
          queue: false
        });
      }, this))
      .mouseleave($.proxy(function () {
        this.$playPause.animate({
          opacity: this.options.buttons.opacity.playpause.start
        }, {
          duration: this.options.buttons.opacity.playpause.durationStart,
          easing: this.options.buttons.opacity.playpause.easingStart,
          queue: false
        });
      }, this));

      this.$playPause.mouseleave();
  };

  ZView.prototype._initNextPrev = function() {
    this.$next = $('<a></a>')
      .appendTo(this.$element)
      .addClass('zView-next')
      .css({
        zIndex: this.options.zIndex + 20
      })
      .attr('href', '#')
      .attr('title', this.options.buttons.labels.next)
      .html(this.options.buttons.htmls.next)
      .click($.proxy(this.options.rtl ? this.prev : this.next, this))
      .mouseenter($.proxy(function () {
        this.$next.animate({
          opacity: this.options.buttons.opacity.next.end
        }, {
          duration: this.options.buttons.opacity.next.durationEnd,
          easing: this.options.buttons.opacity.next.easingEnd,
          queue: false
        });
      }, this))
      .mouseleave($.proxy(function () {
        this.$next.animate({
          opacity: this.options.buttons.opacity.next.start
        }, {
          duration: this.options.buttons.opacity.next.durationStart,
          easing: this.options.buttons.opacity.next.easingStart,
          queue: false
        });
      }, this));
    this.$next.mouseleave();

    this.$previous = $('<a></a>')
      .appendTo(this.$element)
      .addClass('zView-prev')
      .css({
        zIndex: this.options.zIndex + 20
      })
      .attr('href', '#')
      .attr('title', this.options.buttons.labels.previous)
      .html(this.options.buttons.htmls.previous)
      .click($.proxy(this.options.rtl ? this.next : this.prev, this))
      .mouseenter($.proxy(function () {
        this.$previous.animate({
          opacity: this.options.buttons.opacity.previous.end
        }, {
          duration: this.options.buttons.opacity.previous.durationEnd,
          easing: this.options.buttons.opacity.previous.easingEnd,
          queue: false
        });
      }, this))
      .mouseleave($.proxy(function () {
        this.$previous.animate({
          opacity: this.options.buttons.opacity.previous.start
        }, {
          duration: this.options.buttons.opacity.previous.durationStart,
          easing: this.options.buttons.opacity.previous.easingStart,
          queue: false
        });
      }, this));
    this.$previous.mouseleave();
  };

  ZView.prototype._refreshPlayPause = function() {
    if (this.playing) {
      this.$playPause
        .removeClass('zView-playpause-play')
        .addClass('zView-playpause-pause')
        .html(this.options.buttons.htmls.pause)
        .attr('title', this.options.buttons.labels.pause);
    } else {
      this.$playPause
        .removeClass('zView-playpause-pause')
        .addClass('zView-playpause-play')
        .html(this.options.buttons.htmls.play)
        .attr('title', this.options.buttons.labels.play);
    }
  };

  ZView.prototype._initEvents = function() {
    $window
      .resize($.proxy(this._onResize, this))
      .resize();
  };

  ZView.prototype._onResize = function() {
    this.$contents.css({
      width: this.$element.width(),
      height: this.$element.height()
    });
  };

  ZView.prototype._show = function() {
    var $current = $(this.$contents[this.current]);

    $current
      .css({
        zIndex: this.options.zIndex + 10
      })
      .fadeIn(this.options.transition, $.proxy(this._showComplete, this));

    return this;
  };

  ZView.prototype._showComplete = function() {
    var $current = $(this.$contents[this.current]);

    this.$contents.not($current).fadeOut(0);
    $current.css('zIndex', this.options.zIndex);
  };

  ZView.prototype.show = function(what, timeout) {
    if (typeof what === 'string') {
      if (!isNaN(parseInt(what, 10))) {
        this.current = parseInt(what, 10);
      } else if (what.substr(0, 2) === '+=') {
        this.current += parseInt(what.substr(2), 10);
      } else if (what.substr(0, 2) === '-=') {
        this.current -= parseInt(what.substr(2), 10);
      } else if (what === 'next') {
        this.current++;
      } else if (what === 'prev' || what === 'previous') {
        this.current--;
      } else if (what === 'first') {
        this.current = 0;
      } else if (what === 'last') {
        this.current = this.$contents.length - 1;
      }
    } else if (typeof what === 'number') {
      this.current = what;
    }

    if (this.current >= this.$contents.length) {
      if (this.options.infiniteLoop) {
        this.current %= this.$contents.length;
      } else {
        return this;
      }
    }

    this.stop();
    if (timeout || this.options.playAfterMove) {
      this.playing = true;
      this.timeout = setTimeout($.proxy(this.next, this, true), this.options.delay);
    } else {
      this.playing = false;
    }

    this._refreshPlayPause();

    return this._show();
  };

  ZView.prototype.next = function(timeout) {
    if (timeout instanceof $.Event) {
      timeout.preventDefault();
      timeout = false;
    }

    return this.show('next', timeout);
  };

  ZView.prototype.prev = function(timeout) {
    if (timeout instanceof $.Event) {
      timeout.preventDefault();
      timeout = false;
    }
    
    return this.show('prev', timeout);
  };

  ZView.prototype.first = function(timeout) {
    if (timeout instanceof $.Event) {
      timeout.preventDefault();
      timeout = false;
    }
    
    return this.show('first', timeout);
  };

  ZView.prototype.last = function(timeout) {
    if (timeout instanceof $.Event) {
      timeout.preventDefault();
      timeout = false;
    }
    
    return this.show('last', timeout);
  };

  ZView.prototype.stop = function(event) {
    if (event instanceof $.Event) {
      event.preventDefault();
    }

    this.playing = false;
    this._refreshPlayPause();

    clearTimeout(this.timeout);

    return this;
  };

  ZView.prototype.pause = function(event) {
    if (event instanceof $.Event) {
      event.preventDefault();
    }

    // TODO
    return this;
  };

  ZView.prototype.play = function(event) {
    if (event instanceof $.Event) {
      event.preventDefault();
    }
    
    return this.next(true);
  };

  ZView.prototype.toggle = function(event) {
    if (event instanceof $.Event) {
      event.preventDefault();
    }
    
    // TODO: change this.stop with this.pause
    return this.playing ? this.stop() : this.play();
  };

  ZView.DEFAULT = {
    name:  'zView',
    theme: 'default',

    zIndex: 1,

    startSlide: 0,
    infiniteLoop: true,
    rtl: false,

    transition: 400,

    play:          true,
    delay:         5000,
    playAfterMove: false,

    buttons: {
      htmls: {
        previous: '&laquo;',
        next: '&raquo;',
        element: '&middot;',
        play: '&#x25BA;',
        pause: '&#x2590;&#x2590;'
      },

      labels: {
        previous: 'Previous',
        next: 'Next',
        play: 'Play',
        pause: 'Pause'
      },

      opacity: {
        navigator: {
          start: 0.6,
          durationStart: 400,
          easingStart: 'swing',

          end: 1,
          durationEnd: 400,
          easingEnd: 'swing'
        },

        playpause: {
          start: 0.6,
          durationStart: 400,
          easingStart: 'swing',

          end: 1,
          durationEnd: 400,
          easingEnd: 'swing'
        },

        next: {
          start: 0.6,
          durationStart: 400,
          easingStart: 'swing',

          end: 1,
          durationEnd: 400,
          easingEnd: 'swing'
        },

        previous: {
          start: 0.6,
          durationStart: 400,
          easingStart: 'swing',

          end: 1,
          durationEnd: 400,
          easingEnd: 'swing'
        }
      }
    }
  };

  $.zView = function (element, options) {
    return new ZView(element, $.extend(true, {}, ZView.DEFAULT, options));
  };

  $.fn.zView = function (option) {
    return this.each(function () {
      var $this   = $(this);
      var data    = $this.data('zview');
      var options = $.extend({}, $this.data(), typeof option === 'object' && option);

      if (!data) {
        $this.data('zview', (data = $.zView($this, options)));
      }

      if (typeof option === 'string') {
        if (option.substr(0, 2) === '+=' || option.substr(0, 2) === '-=' || !isNaN(parseInt(option, 10))) {
          data.show(option);
        } else {
          data[option]();
        }
      } else if (typeof option === 'number') {
        data.show();
      }
    });
  };

}(jQuery));