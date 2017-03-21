jQuery(function($) {
	"use strict";
	// Author Code Here

	var owlPricing;
	var ratio = 2;

	// Window Load
	$(window).load(function() {
		// Preloader
		$('.intro-tables, .parallax, header').css('opacity', '0');
		$('.preloader').addClass('animated fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			$('.preloader').hide();
			$('.parallax, header').addClass('animated fadeIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				$('.intro-tables').addClass('animated fadeInUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
			});
		});

		if($(window).width() < 700){$(".fb-page").remove();}

	  if ($(window).height() > 700 & $(window).width() > 700) {

	  	$(".fb-page").attr("data-height","1200");

		// Header Init
		

		if ($(window).height() > 400) {

			if ($(window).height() > $(window).width()) {
				var ratio = $('.parallax').width() / $('.parallax').height();
				$('.parallax img').css('height', ($(window).height()) + 'px');
				$('.parallax img').css('width', $('.parallax').height() * ratio + 'px');
			}

			$('header').height($(window).height() - 75);
			$('section .cut').each(function() {
				if ($(this).hasClass('cut-top'))
					$(this).css('border-right-width', $(this).parent().width() + "px");
				else if ($(this).hasClass('cut-bottom'))
					$(this).css('border-left-width', $(this).parent().width() + "px");
			});
			}
		  }
		// Navbar Init
		$('.mobile-nav ul').html($('nav .navbar-nav').html());
		$('nav.navbar-fixed-top .navbar-brand img').attr('src', $('nav.navbar-fixed-top .navbar-brand img').data("active-url"));


		// Popup Form Init
		var i = 0;
		var interval = 0.15;
		$('.popup-form .dropdown-menu li').each(function() {
			$(this).css('animation-delay', i + "s");
			i += interval;
		});
		$('.popup-form .dropdown-menu li a').click(function(event) {
			event.preventDefault();
			$(this).parent().parent().prev('button').html($(this).html());
		});

		// Onepage Nav
		$('.navbar.navbar-fixed-top .navbar-nav').onePageNav({
			currentClass: 'active',
			changeHash: false,
			scrollSpeed: 400,
			filter: ':not(.btn)'
		});

	  
	});
	/* Window Scroll */
	function onScroll() {
		if ($(window).scrollTop() > 50) {
			$('nav.original').css('opacity', '0');
			$('nav.navbar-fixed-top').css('opacity', '1');
		} else {
			$('nav.original').css('opacity', '1');
			$('nav.navbar-fixed-top').css('opacity', '0');
		}
	}
	
	window.addEventListener('scroll', onScroll, false);
	

	// Window Resize
	$(window).resize(function() {
		$('header').height($(window).height());
	});

;

	// Mobile Nav
	$('body').on('click', 'nav .navbar-toggle', function() {
		event.stopPropagation();
		$('.mobile-nav').addClass('active');
	});

	$('body').on('click', '.mobile-nav a', function(event) {
		$('.mobile-nav').removeClass('active');
		if(!this.hash) return;
		event.preventDefault();
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			event.stopPropagation();
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});

	$('body').on('click', '.mobile-nav a.close-link', function(event) {
		$('.mobile-nav').removeClass('active');
		event.preventDefault();
	});

	$('body').on('click', 'nav.original .navbar-nav a:not([data-toggle])', function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			event.stopPropagation();
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});

	function centerModal() {
		$(this).css('display', 'block');
		var $dialog = $(this).find(".modal-dialog"),
			offset = ($(window).height() - $dialog.height()) / 2,
			bottomMargin = parseInt($dialog.css('marginBottom'), 10);

		// Make sure you don't hide the top part of the modal w/ a negative margin
		// if it's longer than the screen height, and keep the margin equal to 
		// the bottom margin of the modal
		if (offset < bottomMargin) offset = bottomMargin;
		$dialog.css("margin-top", offset);
	}

	$('.modal').on('show.bs.modal', centerModal);

	$('.modal-popup .close-link').click(function(event){
		event.preventDefault();
		$('#modal1').modal('hide');
	});

	$('.modal-popup .submit').click(function(event){
		event.preventDefault();
		var name = $('#name').val()
		var message = $('#message').val()
		var contact = $('#contact').val()
		var contactp = $('#contactp').val()
		contact = contact + " / " +contactp;
		$.post("https://rocky-earth-6889.herokuapp.com/messages.json", {"message":{"name":name,"note":message,"contact":contact}}, function( data ) {});
		$('.modal-content').html("<h4>Thank's I'll be in touch soon!</h4>");
		setTimeout(function (){

                 $('#modal1').modal('hide');

             }, 4000);
				
	});

	$(window).on("resize", function() {
		$('.modal:visible').each(centerModal);
	});
});
