jQuery(document).ready(function ($) {

	//$('.slide').css({height: windowH});

	//var	slideHeight = $('#hp-slider section').height();

	var globalVars = function() {
		var menuWidth = $('.menu-wrapper').width(),
			mainWrapper = $('.main-wrapper'),
			$menu = $('#menu'),
			windowW = $(window).innerWidth(),
			windowH = $(window).height(),
			videourl;

		function update(url) {
			menuWidth = $('.menu-wrapper').width(),
			mainWrapper = $('.main-wrapper'),
			$menu = $('#menu'),
			windowW = $(window).innerWidth(),
			windowH = $(window).height();

			this.menuWidth = menuWidth,
			this.mainWrapper = mainWrapper,
			this.$menu = $menu,
			this.windowW = windowW,
			this.windowH = windowH,
			this.videourl = url
		};

		return {			
			update: update,
			menuWidth:  menuWidth,
			mainWrapper: mainWrapper,
			$menu: $menu,
			windowW: windowW,
			windowH: windowH,
			videourl: videourl
		}
	}();


	function allWrapSet() {
		globalVars.mainWrapper.css({ 
			width: globalVars.windowW - globalVars.menuWidth,
			height: globalVars.windowH
		});
		menuWidthHeight();
	};

	function hpWrapSet() {
		globalVars.mainWrapper.css({ 
			width: globalVars.windowW - globalVars.menuWidth
		});
		menuWidthHeight();
	};
	function menuWidthHeight() {
		globalVars.$menu.css({
			width: globalVars.windowW - globalVars.menuWidth, 
			height: globalVars.windowH
		});
	};
	

	//menu 
	var navObj = {
		events: function() {
			var $menubtn = $('#menu-button'),
				clicked = false,
				$menuUL = $('#menu ul'),
				$backBtn = $('.back-btn'),
				$logo = $('#wing-logo'),
				$playBtn = $('.play-btn'),
				$closeVidBtn = $('#closeVidMenu span'),
				$player = $('#player'),
				moveIntId,
				self = this;

			$menubtn.on('click', function() {
				var $this = $(this);

				$menubtn.toggleClass('clicked');
				
				if (!clicked) {
					globalVars.$menu.addClass('clicked').fadeIn();
					$menuUL.addClass('clicked');
					clicked = true;
				} else {
					$menuUL.removeClass('clicked');
					globalVars.$menu.delay(300).fadeOut().removeClass('clicked');
					clicked = false;
				}
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
			$playBtn.on({
				click: function() {
					var videourl = $(this).data('videourl');

					createFrame();
					playVideo(videourl);
					addVideoMenu();
				}
			})
			$logo.on({
				mouseenter: function() {
					var $tagline = $('#tagline');

					$tagline.addClass('active');
				},
				mouseleave: function() {
					var $tagline = $('#tagline');

					$tagline.removeClass('active');
				}
			})
			$closeVidBtn.on({
				click: function() {
					var $btn = $('.appear'),
						originalColor = $btn.css('background-color');

					changeBg($btn, originalColor, "#dc3030");
					emptyDiv($player);
				}
			})

			function changeBg(obj, originalCol, newCol) {

				obj.css('background-color', newCol);

				setTimeout(function() {
					obj.css('background-color', originalCol)
				}, 100);

				clearTimeout();

				setTimeout(function() {
					obj.delay().removeClass('appear');
				}, 400)

				
			}

			function addVideoMenu() {
				$closeVidMenu = $('#closeVidMenu');

				$closeVidMenu.addClass('appear');
			}

			function emptyDiv(obj) {

				obj.empty();
			}

			function createFrame() {
				var iframe = '<iframe src="" frameborder="0"  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';;

				$player.append(iframe);
			}


			function playVideo(url) {
				var params= '?autoplay=1&amp;badge=0&amp;byline=0&amp;color=222222&amp:portrait=0&amp;title=0;',
					fullSrc= url + params;

				$('#player').fadeIn(400, function() {
					$('iframe').each( 
						function(index, elem) {
							elem.setAttribute('height', globalVars.windowH);
							elem.setAttribute('src', fullSrc);
						}
					)
				});
			};

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
			};
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
	function addPlayer() {
		var playerMrkUp = '<div id="player"></div>'	
		
		globalVars.mainWrapper.prepend(playerMrkUp);
	}
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

					$('video')[index - 1].play();
				},
				afterRender: function() {
					slideAnim();
					$('video')[0].play();
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
			var $item = $('.cTxtContent');
			console.log('hovevent');
			$item.on({
				mouseenter: function() {
					var $this = $(this);
					console.log('in');
					$this.parent().addClass('active');
				},
				mouseleave: function() {
					var $this = $(this);

					$this.parent().removeClass('active');
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
			set: function(obj) {
				var $jqObj = $(obj);

				globalVars.menuWidth = $('.menu-wrapper').width();

				if(globalVars.windowW >= 900) {
					$jqObj.css({
						width: (globalVars.windowW - globalVars.menuWidth) / 100 * 60
					});
				} else {
					$jqObj.css({
						width: '100%'
					});
				}
			}
		}
		//Where

		function initMap() {
		    var mapCanvas = $('#where-map-cont')[0],
		    	wingManLtLng = new google.maps.LatLng(51.537650, -0.202696);
		    var mapOptions = {
		    	center: wingManLtLng,
		        zoom: 15,
		        scrollwheel:false,
		        draggable: true,
		        mapTypeId: google.maps.MapTypeId.ROADMAP
		    }
			var map = new google.maps.Map(mapCanvas, mapOptions);

		    var marker = new google.maps.Marker({
		        position: wingManLtLng,
		        map: map,
		        title: 'WingMan'
		    });
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

	//Initalise and call all SPECIFIC required functions on load
	function hpInit() {
		addPlayer();
		hpWrapSet()
		hpObj.events();
		slideAnim();
		slideLog();
		console.log('running hpInit')
	}
	function clientInit() {
		addPlayer();
		allWrapSet();
		forceScroll();
		clientHovEvents();

		console.log('running clientInit')
	}
	function allProInit() {
		addPlayer();
		allProObj.events();
		allWrapSet();
		forceScroll();
		truncate();

		console.log('running allProInit')
	}
	function proPgInit() {
		addPlayer();
		forceScroll();
		whiteBG();
		allWrapSet();

		console.log('running proPgInit')
	}
	function whyWhatInit() {
		addPlayer();
		forceScroll();
		allWrapSet();
		whyWhatObj.set('.wy-wh-video');

		console.log('running whyWhatInit');
	}
	function whereInit() {
		addPlayer();
		forceScroll();
		allWrapSet();
		whyWhatObj.set('#map-wrap');
		initMap();

		console.log('running whereInit');
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
				whyWhatObj.set('.wy-wh-video');
			} else {
				whyWhatInit();
			}
		} else if (pageGetter.getData === 'where') {
			if (resize) {
				allWrapSet();
				whyWhatObj.set('#map-wrap');
			} else {
				whereInit();
			}
		}
	}

	init();
	generalFns();
	
});    

