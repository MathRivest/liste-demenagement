(function($, w, undefined){

	'use strict';

	var OP = window.OP = window.OP || {};

	// Common
	OP.main = (function() {
		var checkedClass = 's-checked',
			closedClass = 's-closed',
			checkedCookiePrefix = 'checkbox_',
			closedCookiePrefix = 'close_',
			$items = $('.m-items li');

		var init = function() {
			// Give unique ID to items
			// Read the cookies and check matching items
			$items.each(function(i, $el){
				var newId = 'item-'+ i,
					checkedCookie = $.cookie(checkedCookiePrefix + newId),
					closedCookie = $.cookie(closedCookiePrefix + newId);
				$el.id = newId;

				// Append elements
				var checkbox = $('<input/>', {
					'type':'checkbox'
				});

				var closeButton = $('<button/>', {
					'text': 'Ne s\'applique pas',
					'class': 'b-close'
				});

				$(this).append(closeButton).append(checkbox);

				if(checkedCookie){
					// Check the checkbox and mark the item
					$(this).addClass(checkedClass).find('input[type="checkbox"]').attr('checked', 'checked');
				}
				if(closedCookie){
					$(this).addClass(closedClass)
				}
			});

			// When user mark an item
			$items.find('input[type="checkbox"]').on('click', function(){
				var $item = $(this).parents('li'),
					itemID = $item.attr('id'),
					cookieName = checkedCookiePrefix + itemID;

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

			// When user close an item
			$items.find('.b-close').on('click', function(){
				var $item = $(this).parents('li'),
					itemID = $item.attr('id'),
					cookieName = closedCookiePrefix + itemID;

				if($.cookie(cookieName)){
					// Unmark the item
					$item.removeClass(closedClass);
					// Delete the cookie
					$.removeCookie(cookieName);
				}else{
					// Mark the item
					$item.addClass(closedClass);
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
