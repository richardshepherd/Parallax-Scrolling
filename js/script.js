/**
 * Parallax Scrolling Tutorial
 * For Smashing Magazine
 * July 2011
 *   
 * Author: Richard Shepherd
 * 		   www.richardshepherd.com
 * 		   @richardshepherd   
 */
var Parallax = {  
	cache: {
		window:{}
	},
  
	init: function() {	
		$('[data-parallax-type]').each(function(){
				Parallax.cacheData(this);
			} 
		);
	},
	
	cacheData : function(element) {	
		// Cache the Y offset, Xposition and the speed of each Element of data-parallax-type
		$(element).data('offsetY', parseInt($(element).attr('data-parallax-offsetY')));
		$(element).data('Xposition', $(element).attr('data-parallax-Xposition'));
		$(element).data('speed', $(element).attr('data-parallax-speed'));
	},

	activateEffect: function(element){
	
		// Cache the Window object
		this.cache.window = $(window);

		// When the window is scrolled...
	   	 $(window).scroll(function() {
	
			// If this section is in view
			if ( Parallax.elementIsVisible(element) ) {
	
				// Scroll the background at var speed
				Parallax.scrollBackgroundAtSpeed(element);
				
				// Check for other sprites in this section	
				Parallax.initSubSpritesOfElement(element);
			
				// Check for any Videos that need scrolling
				Parallax.initSubVideosOfElement(element);
			
			}; // in view
	
		}); // window scroll
			
	},

	elementIsVisible: function(element) {
		return (Parallax.cache.window.scrollTop() + Parallax.cache.window.height()) > (element.offset().top) && ( (element.offset().top + element.height()) > Parallax.cache.window.scrollTop() ) ;
	},

	scrollBackgroundAtSpeed :  function(element) {
		// the yPos is a negative value because we're scrolling it UP!								
		var yPos = -(Parallax.cache.window.scrollTop() / element.data('speed')); 
		
		// If this element has a Y offset then add it on
		if (element.data('offsetY')) {
			yPos += element.data('offsetY');
		}
		
		// Put together our final background position
		var coords = '50% '+ yPos + 'px';

		// Move the background
		element.css({ backgroundPosition: coords });
	},

	initSubSpritesOfElement : function(element) {
		$('[data-parallax-type="sprite"]', element).each(function() {
			
			// Cache the sprite
			var sprite = $(this);
			
			Parallax.sprite(sprite);											
			
		}); // sprites
	},
	sprite : function(sprite) {
					
		// Use the same calculation to work out how far to scroll the sprite
		var yPos = -(Parallax.cache.window.scrollTop() / sprite.data('speed'));					
		var coords = sprite.data('Xposition') + ' ' + (yPos + sprite.data('offsetY')) + 'px';
		
		sprite.css({ backgroundPosition: coords });													
		
	},
	initSubVideosOfElement : function(element) {
		$('[data-parallax-type="video"]', element).each(function() {
			
			// Cache the sprite
			var $video = $(this);
			
			Parallax.video($video);											
			
		}); // sprites
	},
	video : function($video) {
					
		// There's some repetition going on here, so 
		// feel free to tidy this section up. 
		var yPos = -(Parallax.cache.window.scrollTop() / $video.data('speed'));					
		var coords = (yPos + $video.data('offsetY')) + 'px';

		$video.css({ top: coords });														
		
	}

}  

// On your marks, get set...
$(document).ready(function(){
						
	
	//Init Parallax effect
	Parallax.init();
	
	// For each element that has a data-parallax-type attribute with background
	// actrivate Parallax Effect
	$('section[data-parallax-type="background"]').each(function(){
			var element = $(this);
			Parallax.activateEffect(element);
	});

}); 
