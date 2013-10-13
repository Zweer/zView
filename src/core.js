  var ZView = function (element, options) {
    this.element = element;
    this.options = options;
  };

  ZView.DEFAULT = {

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
        $this.data('zview', (data = $.zView(this, options)));
      }

      if (typeof option === 'string') {
        data[option]($this);
      }
    });
  };