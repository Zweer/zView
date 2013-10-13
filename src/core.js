	var ZView = function (elements, options) {

	};

	$.zView = function (elements, options) {
		return new ZView(elements, $.extend(true, {}, ZView.DEFAULT, options));
	};

	$.fn.zView = function (option) {
		var $this   = $(this);
    var data    = $this.data('zview');
    var options = $.extend({}, $this.data(), typeof option === 'object' && option);

    if (!data) {
      $this.data('zview', (data = $.zView(this, options)));
    }

    if (typeof option === 'string') {
      data[option]($this);
    }

    return this;
	};