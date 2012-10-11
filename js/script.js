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
	$window:{},
  
	cacheData : function(element) {	
		$(element).data('offsetY', parseInt($(element).attr('data-offsetY')));
		$(element).data('Xposition', $(element).attr('data-Xposition'));
		$(element).data('speed', $(element).attr('data-speed'));
	},

	init: function(element){
	
		// Cache the Window object
		this.$window = $(window);

		// Store some variables based on where we are
		var offsetCoords = element.offset();
		var topOffset = offsetCoords.top;
		
		// When the window is scrolled...
	   	 $(window).scroll(function() {
	
			// If this section is in view
			if ( (Parallax.$window.scrollTop() + Parallax.$window.height()) > (topOffset) &&
				 ( (topOffset + element.height()) > Parallax.$window.scrollTop() ) ) {
	
				// Scroll the background at var speed
				// the yPos is a negative value because we're scrolling it UP!								
				var yPos = -(Parallax.$window.scrollTop() / element.data('speed')); 
				
				// If this element has a Y offset then add it on
				if (element.data('offsetY')) {
					yPos += element.data('offsetY');
				}
				
				// Put together our final background position
				var coords = '50% '+ yPos + 'px';

				// Move the background
				element.css({ backgroundPosition: coords });
				
				// Check for other sprites in this section	
				Parallax.initSprites(element);
			
				// Check for any Videos that need scrolling
				Parallax.initVideos(element);
			
			}; // in view
	
		}); // window scroll
			
	},
	
	initSprites : function(element) {
		$('[data-type="sprite"]', element).each(function() {
			
			// Cache the sprite
			var $sprite = $(this);
			
			Parallax.sprite($sprite);											
			
		}); // sprites
	},
	sprite : function($sprite) {
					
		// Use the same calculation to work out how far to scroll the sprite
		var yPos = -(Parallax.$window.scrollTop() / $sprite.data('speed'));					
		var coords = $sprite.data('Xposition') + ' ' + (yPos + $sprite.data('offsetY')) + 'px';
		
		$sprite.css({ backgroundPosition: coords });													
		
	},
	initVideos : function(element) {
		$('[data-type="video"]', element).each(function() {
			
			// Cache the sprite
			var $video = $(this);
			
			Parallax.video($video);											
			
		}); // sprites
	},
	video : function($video) {
					
		// There's some repetition going on here, so 
		// feel free to tidy this section up. 
		var yPos = -(Parallax.$window.scrollTop() / $video.data('speed'));					
		var coords = (yPos + $video.data('offsetY')) + 'px';

		$video.css({ top: coords });														
		
	}


}  
// On your marks, get set...
$(document).ready(function(){
						
	
	// Cache the Y offset and the speed of each sprite
	$('[data-type]').each(function(){
			Parallax.cacheData(this);
		} 
	);
	
	// For each element that has a data-type attribute with background
	$('section[data-type="background"]').each(function(){
			var element = $(this);
			Parallax.init(element);
	});	// each data-type

}); // document ready
