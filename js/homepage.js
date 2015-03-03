		//Homepage

		function slideLog() {
			$('#hp-slider').fullpage({
				sectionsColor: ['#E8E8E8', '#E8E8E8', '#E8E8E8', '#E8E8E8'],
				//anchors: ['firstPage', 'secondPage', '3rdPage', 'lastPage'],
				navigation: true,
				navigationPosition: "right",
				afterLoad: function(anchorLink, index) {
					var $active = $('.active');

					$('video').get(index - 1).play();
				},
				afterRender: function() {
					slideAnim();
					$('video').get(0).play();
				},
				onLeave: function(index, nextIndex, direction) {
					var $active = $('.active'),
						section = $('.section');

					$active.find('.for-anim').removeClass('animatedown', 'animateup');

					if (direction == 'up') {
						//remove any other interferring classes
						$active.find('.for-anim').removeClass('animateup', 'animatedown');

						$active.nextAll().find('.for-anim').addClass('animatedown');
					} else if (direction == 'down') {
						$active.find('.for-anim').removeClass('animateup', 'animatedown');

						$active.prevAll().find('.for-anim').addClass('animateup');
					}				
				}
			});
		}
		var hpObj = {
			events: function() {
				var $clientName = $('.client-name'),
					$titleCont0 = $('#title-cont-section0'),
					$wingPattern = $('#wing-pattern-fs'),
					$video0 = $('#section0').find('video'),
					running = false,
					startTxt;

				$clientName.on({
					mouseenter: function() {
						var $this = $(this),
							h5 = $this.find('.client-det');
						
						startTxt = h5.text();
						h5.delay(1000).text('See All Clients');
					}, 
					mouseleave: function() {
						var $this = $(this),
							h5 = $this.find('.client-det');

							h5.text(startTxt);
					}
				});
				$titleCont0.on({
					mouseenter: function() {
						//$wingPattern.removeClass('active');

							$video0.fadeOut(200, function() {
								$wingPattern.addClass('active');
								running = false;
							});
					},
					mouseleave: function() {

						if (!running) {
							$wingPattern.removeClass('active');
							$video0.delay(300).fadeIn(200);
						}
					}
				});
			}
		}

		function slideAnim() {
			var $active = $('.active'),
				forAnim = $active.find('.for-anim');

			forAnim.removeClass('animatedown');
			$active.nextAll().find('.for-anim').addClass('animatedown');
		}	