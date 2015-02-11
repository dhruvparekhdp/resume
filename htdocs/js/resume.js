/* 
 * Copyright  : All rights reserved.
 * Author     : Matt Slocum
 * Description: Custom resume page for Matt Slocum
 */
define([
	'jquery',
	'underscore',
	'jquery_fancybox',
	'jquery_tinyscrollbar',
	'./jquery.resumeSlider'
], function($, _) {

	// starter up
	var responsive = 750;
	$('article').each(function(i) {
		var el = $(this);
		setTimeout(function() { el.slideDown(1500, 'linear'); }, i*100);
	});
	
	// lets always show all the options slide in before we start the resumeSlider
	setTimeout(function() {
		$('#main > .container').resumeSlider({
			responsive: responsive,
			opened: function(el) {
				el.find('.content').tinyscrollbar_update();
			}
		});
	}, ($('article').length - 1) * 100 + 1500 );
	
	// setup the tinyscroll elements using a template
	var tmpl_scroll = _.template( $("#tmpl_scroll").html() );
	$('article .content').each(function() {
		var $this = $(this);
		$this.html(tmpl_scroll({ content: $this.html() }));
		var touches = 'ontouchstart' in document.documentElement;
		var touch = touches && ($(window).width() > responsive);
		//startup tinyscroll on content
		$this.tinyscrollbar({ invertscroll: true, touch: touch });
		$this.find('.scrollbar').addClass('disable'); // make scrollbars hidden
		$(window).resize(function() {
			//console.log($this.find('.overview').length);
			var pos = $this.find('.overview').position().top;
			$this.tinyscrollbar_update(-pos);
		});
	});
	
	
	$(".fancybox").fancybox({
		fitToView	: false,
		width		: '800',
		height		: '450',
		autoSize	: false
	});

	// not as paranoid anymore, so lets just link
	//$('a.hideReferral').click(function(e) {
	//	e.preventDefault();
	//	var target = (typeof this.target === "string") ? 'target="'+ this.target +'"' : '';
	//
	//	$('<form '+ target +' method="post" action="http://www.sloky.net/url.php"><input type="hidden" name="url" value="'+ this.href +'"/></form>')
	//		.appendTo('body')
	//		.submit();
	//});
	
	$(window).hashchange( function(){
		ga('send', 'pageview', {
		  'page': location.pathname + location.hash
		});
	});
	
	/*
	$(window).hashchange( function(){
		console.log( 'hash change: '+ location.hash );
		resumeSlider.switchDrawer();
	});

	// Trigger the event (useful on page load).
	$(window).hashchange();
*/

	
});

