(function($, w, undefined){

	'use strict';

	var OP = window.OP = window.OP || {};

	// Common
	OP.main = (function() {
		var checkedClass = 'l-checked',
			$items = $('.m-items li');

		var init = function() {
			// Give unique ID to items
			// Read the cookies and check matching items
			$items.each(function(i, $el){
				var newId = 'item-'+ i,
					theCookie = $.cookie('checkbox_' + newId);
				$el.id = newId;

				// Append elements
				var checkbox = $('<input/>', {
					'type':'checkbox'
				});

				$(this).prepend(checkbox);



				if(theCookie){
					// Check the checkbox and mark the item
					$(this).addClass(checkedClass).find('input[type="checkbox"]').attr('checked', 'checked');
				}
			});

			// When user mark an item
			$items.find('input[type="checkbox"]').on('click', function(){
				var $item = $(this).parents('li'),
					itemID = $item.attr('id'),
					cookieName = 'checkbox_' + itemID;

				if($.cookie(cookieName)){
					// Unmark the item
					$item.removeClass(checkedClass);
					// Delete the cookie
					$.removeCookie(cookieName);
				}else{
					// Mark the item
					$item.addClass(checkedClass);
					// Write the cookie
					$.cookie(cookieName, itemID, { expires: 365 });
				}
			});


		};

		return {
			init: init
		};
	})();

})(jQuery, window);

$(document).ready(OP.main.init);
