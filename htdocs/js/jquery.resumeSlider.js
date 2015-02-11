/* 
 * Copyright  : All rights reserved.
 * Author     : Matt Slocum
 * Description: my custom resume slider. Kinda doubt it will be useful as a jquery plugin outside of this site, but I made it one anyway for containment
 * Requires   : jquery.ba-hashchange
 */
define([
	'jquery',
	'jquery_hashchange'
], function($) {
	// TODO: There are problems with hitting forward and back too fast. They are seldom, but it is still there a little
	$.fn.resumeSlider = function(options) {
		var settings = $.extend({
			// defaults.
			container: 'article',
			box: ".box",
			content: ".content",
			speed: 1000,
			responsive: 600,
			opened: function() {}
		}, options );
		
		var el = this,
			active = null,
			moving = false,
			isFull = true, // false if the site is currently being responsive. If so, then do drawer animations fast
			openDrawer = function(drawer) {
				//if (moving) return;
				active = drawer;
				drawer.css('z-index', 2);
				moving = true;
				el.find(settings.container).show().animate({left: 10}, isFull * settings.speed, 'swing', function() {
					drawer.find(settings.content).fadeIn(isFull * settings.speed/2, function() {
						//console.log('z-index 2');
						drawer.css('z-index', 2); // dummy check for fast motions
						moving = false;
						settings.opened(drawer);
					});
				});
			},
			closeDrawer = function() {
				//if (moving) return;
				moving = true;
				active.find(settings.content).fadeOut(isFull * settings.speed/2, function() {
					active = null;
					el.find(settings.container).each(function() {
						$(this).animate({left: $(this).data('left')}, isFull * settings.speed, 'swing', function() { 
							//console.log('z-index 1');
							$(this).css('z-index', 1);
							moving = false;
						});
					});
				});
			},
			// used to switch directly between drawers in full mode
			switchDrawer = function(drawer) {
				drawer.hide();
				drawer.find(settings.content).show();
				drawer.css('z-index', 3).fadeIn( settings.speed /2 , function() {
					el.find(settings.container).css('z-index', 1); //reset all in case of crazy switching
					$(this).css('z-index', 2);
				});
				active.fadeOut( settings.speed/2, function() {
					active.find(settings.content).hide();
					active.css('z-index', 1).show();
					active = drawer;
					settings.opened(active);
				});
			},
			respSlide = function(drawer) {
				//if (moving) return;
				//moving = true;
				if (active && active.length) {
					active.find(settings.content).slideUp(settings.speed/2);
					var oldActive = active; // backup active because closeDrawer messes with it.
					closeDrawer(); // so re-sizeing works. This sets moving to false
					active = oldActive;
				}
				if (drawer.is(active)) {
					active = null;
				} else {
					active = drawer;
					// putting openDrawer in a done function so it doesn't get run as the same time as closeDrawer above
					active.find(settings.content).slideDown(settings.speed/2, function() {
						//active.css('z-index', 2); // setting z-index so resizing browser works
						openDrawer(drawer); // this will set moving to false
					});
				}
			},
			boxClick = function(e) {
				e.preventDefault();
				if (active && active.length && $(this).closest(settings.container).is(active)) {
					location.hash = '';
				} else {
					location.hash = this.hash;
				}
			},
			hashChange = function(e) {
				//console.log('change: '+ location.hash.substr(1));
				var hash = (e && e.window && e.window.location) ? e.window.location.hash.substr(1) : location.hash.substr(1);
				//if (!hash.length && !active) return;
				
				stop();
				var drawer = (hash.length) ? el.find('.'+ hash) : active;
				if ($(document).width() < settings.responsive) {
					isFull = false;
					respSlide(drawer);
				} else {
					isFull = true;
					if (active && active.length && hash) {
						// must have done history as mobile. Normally this couldn't happen.
						// also, could be a link from one drawer to another
						switchDrawer(drawer);
					} else if (active && active.length) {
						closeDrawer();
					} else if (drawer) {
						openDrawer(drawer);
					}
				}
			},
			// stops all animations becuase things can get crazy with fast history changes
			stop = function() {
				el.find(settings.container).stop(false, true).find(settings.content).stop(false, true);
			},
			/*
			 * @param el is optional.
			 */
			isOpen = function(drawer) {
				if (typeof drawer === "undefined") {
					return active && active.length;
				}
				if (active && active.length && active.is(drawer)) {
					return true;
				}
				return false;
			};
		
		
		// save the left position so we know where to move it back to
		this.find(settings.container).each(function() {
			$(this).data('left', $(this).css('left'));
		});
		
		// setup events
		this.find(settings.box).on('click', boxClick);
		
		$(window).hashchange( hashChange );
		
		// check to see if a hash is already set on the page.
		$(window).hashchange();


		// public functions
		/*
		this.switchDrawer = function(el) {
			//if (moving) return;
			console.log('switchDrawer');
			boxClick($);
		};
		*/
		
		this.isOpen = isOpen;
		
		return this;
	};
});
