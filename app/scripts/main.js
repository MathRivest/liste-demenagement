(function($, w, undefined){

	'use strict';

	var OP = window.OP = window.OP || {};

	// Common
	OP.main = (function() {
		var checkedClass = 's-checked',
			closedClass = 's-closed',
			checkedCookiePrefix = 'checkbox_',
			closedCookiePrefix = 'close_',
			$items = $('.m-items li'),
			$hero = $('.m-hero');

		var init = function() {

			// Give the hero block the full height if its larger than an iphone
			setContent();
			var windowHeight = $(window).height();
			if(windowHeight > 480){
				$hero.height(windowHeight);
			}


			// Give unique ID to items
			// Read the cookies and check matching items
			$items.each(function(i, $el){
				//var newId = 'item-'+ i;
				var itemId = $el.id,
					checkedCookie = $.cookie(checkedCookiePrefix + itemId),
					closedCookie = $.cookie(closedCookiePrefix + itemId);
				//$el.id = newId;

				// Append elements
				var checkbox = $('<label class="checkbox-wrapper"><input type="checkbox"/></label>');

				var closeButton = $('<button/>', {
					'class': 'b-close',
					'title': 'Ne s\'applique pas'
				});

				$(this).prepend(checkbox).prepend(closeButton);

				if(checkedCookie){
					// Check the checkbox and mark the item
					$(this).addClass(checkedClass).find('input[type="checkbox"]').attr('checked', 'checked');
				}
				if(closedCookie){
					$(this).addClass(closedClass);
				}

				if($(this).find('.detail').length>0){
					$(this).addClass('l-hasdetail').prepend('<span class="i-arrow">');
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

					ga('send', 'event', 'checkbox', 'click', 'uncheck', itemID);
				}else{
					// Mark the item
					$item.addClass(checkedClass);
					// Write the cookie
					$.cookie(cookieName, itemID, { expires: 365 });

					ga('send', 'event', 'checkbox', 'click', 'check', itemID);
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

					ga('send', 'event', 'close', 'click', 'on', itemID);
				}else{
					// Mark the item
					$item.addClass(closedClass);
					// Write the cookie
					$.cookie(cookieName, itemID, { expires: 365 });

					ga('send', 'event', 'close', 'click', 'off', itemID);
				}
			});


			$items.find('.title').on('click', function(e){
				e.preventDefault();
				var $item = $(this).parents('li'),
					itemID = $item.attr('id');

				$(this).next('.detail').collapse('toggle');
				$(this).parents('li').toggleClass('s-open');

				ga('send', 'event', 'detail', 'click', 'toggle', itemID);
			});


			$('.b-start_now').on('click', function(){
				$('html,body').animate({scrollTop: $('.m-content').offset().top},'slow');
				ga('send', 'event', 'Start now', 'click');
				return false;
			});

		};

		return {
			init: init
		};
	})();



	function getWindowHeight() {
		var windowHeight = 0;
		if (typeof(window.innerHeight) === 'number') {
			windowHeight = window.innerHeight;
		}
		else {
			if (document.documentElement && document.documentElement.clientHeight) {
				windowHeight = document.documentElement.clientHeight;
			}
			else {
				if (document.body && document.body.clientHeight) {
					windowHeight = document.body.clientHeight;
				}
			}
		}
		return windowHeight;
	}
	function setContent() {
		if (document.getElementById) {
			var windowHeight = getWindowHeight();
			if (windowHeight > 0) {
				var contentElement = document.getElementById('hero-content');
				var contentHeight = contentElement.offsetHeight;
				if (windowHeight - contentHeight > 0) {
					contentElement.style.position = 'relative';
					contentElement.style.top = ((windowHeight / 2) - (contentHeight / 2)) + 'px';
				}
				else {
					contentElement.style.position = 'static';
				}
			}
		}
	}
	window.onload = function() {

	};
	/*window.onresize = function() {
		setContent();
	}*/
	



})(jQuery, window);

$(document).ready(OP.main.init);
