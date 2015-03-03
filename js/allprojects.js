
		//All Projects 
		var allProObj = {
			events: function() {
				var hoverAnim = $('.hov-anim'),
					proItem = $('.allPro-p-item');

				proItem.on({
					mouseenter: function() {
						var $this = $(this),
							img = $this.find('.allPro-img');

						$this.find('.hov-anim').addClass('active');
						img.addClass('active');
					},
					mouseleave: function() {
						var $this = $(this),
							img = $this.find('.allPro-img');

						$this.find('.hov-anim').removeClass('active');
						img.removeClass('active');
					}
				});
			}
		}