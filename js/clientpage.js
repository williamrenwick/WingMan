
		function clientHovEvents() {
			var $item = $('.cTxtContent');

			$item.on({
				mouseenter: function() {
					var $this = $(this);

					$this.addClass('active');
				},
				mouseleave: function() {
					var $this = $(this);

					$this.removeClass('active');
				}
			})
		}