		//Who / Why Pages

		var whyWhatObj = {
			set: function() {
				var $video = $('.wy-wt-video'),
					windowW = $(window).width();

				menuWidth = $('.menu-wrapper').width();

				if(windowW >= 900) {
					$video.css({
						width: (windowW - menuWidth) / 100 * 60
					});
				} else {
					$video.css({
						width: '100%'
					});
				}
			}
		}