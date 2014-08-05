/*
 * jquery.hideItems - v1.0.0
 * Hide a specific number of items
 * https://github.com/reinos/jquery.hideItems
 *
 * Made by Rein de Vries
 * Under MIT License
 */
(function($){
	$.fn.hideItems = function(options){
		//settings
		var $obj = $(this);
		var settings = {
			listClass: "list",
		    moreClass: "more",
		    visible: 2,
		    autoClose: true,
		    toggle: true
		};
			
		return this.each(function(){
			//cache item
			var	$listItems = $(this).find("."+settings.listClass).find("li"),
				$button = $(this).find("."+settings.moreClass);
			
			//extend the user options
			if ( options ) { 
			    $.extend( settings, options );
			}

			//hide alle elements that must slide
			$listItems.slice(settings.visible).hide();

			//apply animation onClick
			$button.click(function(){
				//is not active?
				if(!$(this).hasClass("active")) {

					//is this the button
					if($(this).hasClass(settings.moreClass)) {

						//auto close other items
						if(settings.autoClose) {
							//cache
							var $ul = $($obj.selector);

							//slide the items up, hide them
							$.each($ul, function(){
								$(this).find("li").slice(settings.visible).slideUp();
							});
							//remove all other active class
							$("."+settings.moreClass).removeClass("active");
						}

						//slide open
						$(this).prev().find("li").slice(settings.visible).stop(true, true).slideToggle();
						//add active class
						$(this).addClass("active");
					}

				//if active and toggle is active, closed it	
				} else if(settings.toggle) {
					//remove all active items
					$(this).removeClass("active");
					//hide the items
					$listItems.slice(settings.visible).slideUp();
				}
			});
		});
	};
})(jQuery);