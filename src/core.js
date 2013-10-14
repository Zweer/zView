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

    this.current = 0;
    this._show();
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
  };

  ZView.prototype._showComplete = function() {
    var $current = $(this.$contents[this.current]);

    this.$contents.not($current).fadeOut(0);
    $current.css('zIndex', this.options.zIndex);
  };

  ZView.prototype.next = function() {
    this.current++;
    if (this.current >= this.$contents.length) {
      this.current = 0;
    }

    this._show();
  };

  ZView.prototype.prev = function() {
    this.current--;
    if (this.current < 0) {
      this.current = this.$contents.length - 1;
    }

    this._show();
  };

  ZView.DEFAULT = {
    zIndex: 1,
    transition: 400
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
        data[option]($this);
      }
    });
  };