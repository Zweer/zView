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

  var ZView = function (element, options) {
    this.$element = $(element);
    this.options = options;

    this._initElement();
    this._initEvents();
  };

  ZView.prototype._initElement = function() {
    this.$element.css({
      position: this.$element.css('position') !== 'static' ? this.$element.css('position') : 'relative'
    });

    this.$element.children().each($.proxy(this._initChild, this));

    this.$contents = this.$element.children().css({
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: this.options.zIndex
    }).fadeOut(0);

    this.show(0, this.options.play);
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

  ZView.prototype._initEvents = function() {
    
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

    this.current %= this.$contents.length;

    this.pause();
    if (timeout || this.options.playAfterMove) {
      this.timeout = setTimeout($.proxy(this.next, this, true), this.options.delay);
    }

    return this._show();
  };

  ZView.prototype.next = function(timeout) {
    return this.show('next', timeout);
  };

  ZView.prototype.prev = function(timeout) {
    return this.show('prev', timeout);
  };

  ZView.prototype.first = function(timeout) {
    return this.show('first', timeout);
  };

  ZView.prototype.last = function(timeout) {
    return this.show('last', timeout);
  };

  ZView.prototype.pause = function() {
    clearTimeout(this.timeout);

    return this;
  };

  ZView.prototype.play = function() {
    return this.next(true);
  };

  ZView.DEFAULT = {
    zIndex: 1,

    transition: 400,

    play:          true,
    delay:         5000,
    playAfterMove: false
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