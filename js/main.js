jQuery(document).ready(function ($) {

	//$('.slide').css({height: windowH});

	//var	slideHeight = $('#hp-slider section').height();

	var globalVars = function() {
		var menuWidth = $('.menu-wrapper').width(),
			mainWrapper = $('.main-wrapper'),
			$menu = $('#menu'),
			windowW = $(window).innerWidth(),
			windowH = $(window).height(); 

		function update() {
			menuWidth = $('.menu-wrapper').width(),
			mainWrapper = $('.main-wrapper'),
			$menu = $('#menu'),
			windowW = $(window).innerWidth(),
			windowH = $(window).height();

			this.menuWidth = menuWidth,
			this.mainWrapper = mainWrapper,
			this.$menu = $menu,
			this.windowW = windowW,
			this.windowH = windowH
		};

		return {			
			update: update,
			menuWidth:  menuWidth,
			mainWrapper: mainWrapper,
			$menu: $menu,
			windowW: windowW,
			windowH: windowH

		}
	}();

	console.log(globalVars.windowH);


	function allWrapSet() {
		console.log(globalVars.menuWidth, globalVars.windowW)
		globalVars.mainWrapper.css({ 
			width: globalVars.windowW - globalVars.menuWidth,
			height: globalVars.windowH
		});
	};

	function hpWrapSet() {
		globalVars.mainWrapper.css({ 
			width: globalVars.windowW - globalVars.menuWidth
		});
	};
	
	globalVars.$menu.css({
		width: globalVars.windowW - globalVars.menuWidth, 
		height: globalVars.windowH
	});

	//menu 
	var navObj = {
		events: function() {
			var $menubtn = $('#menu-button'),
				clicked = false,
				$menuUL = $('#menu ul'),
				$backBtn = $('.back-btn'),
				$logo = $('#wing-logo'),
				moveIntId,
				self = this;

			$menubtn.on('click', function() {
				var $this = $(this);

				$menubtn.toggleClass('clicked');
				
				if (!clicked) {
					globalVars.$menu.fadeIn();
					$menuUL.addClass('clicked');
					clicked = true;
				} else {
					$menuUL.removeClass('clicked');
					globalVars.$menu.delay(300).fadeOut();
					clicked = false;
				}

				self.set();
			});
			$backBtn.on({ 
				mouseenter: function() {
					$arrow = $(this).find('.btn-arrow');
					
					moveBckArr($arrow, 'continuous');
				},
				mouseleave: function() {
					$arrow = $(this).find('.btn-arrow');
					
					moveBckArr($arrow, 'stop');
				},
				click: function() {
					$arrow = $(this).find('.btn-arrow');

					moveBckArr($arrow, 'once');
				}
			});
			$logo.on({
				mouseenter: function() {
					var $tagline = $('#tagline');

					$(this).css('height', '33px');

					$tagline.addClass('active');
				},
				mouseleave: function() {
					var $tagline = $('#tagline');

					$(this).css('height', '39px');

					$tagline.removeClass('active');
				}
			})

			function moveBckArr(arrow, iterate) {
				var a = arrow,
					i = iterate;

				function moveFn() {
					a.transition({x: -20, opacity: 0}, 200).transition({x: 20}, 50).transition({x:0, opacity:1});
				}

				if (i == 'continuous') {
					moveIntId = setInterval(moveFn, 1200);
				} else if (i == 'once') {
					clearInterval(moveIntId);
					moveFn();
				} else if (i == 'stop') {
					clearInterval(moveIntId);
				}
			}
		},
		set: function() {
			var list = $('#menu ul'),
				listH = list.height(),
				listW = list.width(),
				self = this;


			list.delay(1000).css({
				'margin-left': - list.width() / 2,
				'margin-top': - list.height() / 2
			});
			$menu.css({
				width: windowW - menuWidth, 
				height: windowH
			});
		}
	}
	function forceScroll() {

		globalVars.mainWrapper.css('overflow-y', 'scroll');
	}
	function whiteBG() {
		var body = $('body');

		body.addClass('white');
	}
	function truncate() {
		$text = $('.truncate');

		$text.succinct({
			size: 140
		});
	};
	//wrapper styles

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

		//Clients Page

		function clientHovEvents() {
			var $item = $('.client-item');

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

		//Who / Why Pages

		var whyWhatObj = {
			set: function() {
				var $video = $('.wy-wt-video');

				menuWidth = $('.menu-wrapper').width();

				if(globalVars.windowW >= 900) {
					$video.css({
						width: (globalVars.windowW - menuWidth) / 100 * 60
					});
				} else {
					$video.css({
						width: '100%'
					});
				}
			}
		}

	//Get Page Type 

	var pageGetter = function() {
		var pageid = $('.page-id'),
			getData = pageid.data('pageType');

		function update() {
			pageid = $('.page-id');
			getData = pageid.data('pageType');

			this.getData = getData;
		}

		return {
			getData: getData
		}

	}();
	
	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};
	var resizeFn = debounce(function() {
		globalVars.update();
		init(true);
	}, 100);

	//window event listeners
	$(window).on('resize', resizeFn);

	//Initalise and call all GENERAL functions on load

	function generalFns() {
		navObj.events();
	};
	generalFns();

	//Initalise and call all SPECIFIC required functions on load
	function hpInit() {
		hpWrapSet()
		hpObj.events();
		slideAnim();
		slideLog();
		console.log('running hpInit')
	}
	function clientInit() {
		allWrapSet();
		forceScroll();
		clientHovEvents();

		console.log('running clientInit')
	}
	function allProInit() {
		allProObj.events();
		allWrapSet();
		forceScroll();
		truncate();

		console.log('running allProInit')
	}
	function proPgInit() {
		forceScroll();
		whiteBG();
		allWrapSet();

		console.log('running proPgInit')
	}
	function whyWhatInit() {
		forceScroll();
		allWrapSet();
		whyWhatObj.set();

		console.log('running whyWhatInit');
	}

	function init(resize) {

		if (pageGetter.getData === 'homepage') {		
			// any functions not to run on resize below
			if (resize) {
				hpWrapSet();
			} else {
				hpInit();	
			}		
		} else if (pageGetter.getData === 'clientspage') {
			if (resize) {
				allWrapSet();
			} else {
				clientInit();
			}	
		} else if (pageGetter.getData === 'allprojects') {
			if (resize) {
				allWrapSet();
			} else {
				allProInit();
			}				
		} else if (pageGetter.getData === 'projectpage') {
			if (resize) {
				allWrapSet();
			} else {
				proPgInit();
			}
		} else if (pageGetter.getData === 'whywhat') {
			if (resize) {
				allWrapSet();
				whyWhatObj.set();
			} else {
				whyWhatInit();
			}
		}
	}

	init();
	
});    

