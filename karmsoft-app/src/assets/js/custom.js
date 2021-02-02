$(document).ready(function() {
	//Prevent Page Reload on all # links
	$("a[href='#']").click(function(e) {
		e.preventDefault();
	});


	// Datepicker
	$(".datepicker").datetimepicker({
		//format:"DD/MM/YYYY"
		format:"MM/DD/YYYY"
	});

	// Main Navigation
	var $nav = $(".main-navigation");
	var $speed = parseInt($nav.attr("animation-speed"));
	var $mobileMenu = $nav.attr("mobile-menu");

	if($nav.find('.open').length)
		$nav.find('.open').children('ul').show();

	$nav.find("ul").each(function(){
		$(this).siblings("a").append("<i class='arrow-icon'></i>").closest('li').addClass('has-menu');
	});	

	$nav.find("ul li a .arrow-icon").click(function(e){
		e.preventDefault();		
		e.stopImmediatePropagation();
		var $this = $(this).closest('li');				
		if(!$this.hasClass('open')){
			$this.siblings('.open').find("ul").stop(true, true).slideUp($speed);
			$this.siblings('.open').removeClass('open').find(".open").removeClass('open');
			$this.addClass('open').find("> ul").slideDown($speed, function(){
				resizeScroll();
			});
		}else{
			$this.find("ul").stop(true, true).slideUp($speed, function(){
				resizeScroll();
			});
			$this.removeClass('open').find(".open").removeClass('open');				
		}		
	});

	$nav.find("a").click(function(e){		
		if($nav.attr("only-arrow-click") == "false" && $(this).find(".arrow-icon").length > 0){			
			e.preventDefault();			
			$(this).find(".arrow-icon").click();		
		}
	});
	
	$(".nav-icon, .menu-overlay").click(function(){
		if($(window).innerWidth() > $mobileMenu)
			$("body").toggleClass('menu-open');
		else
			$("body").toggleClass('menu-open-mobile');
	});


	// Custom Scroll
	function addScroll(){
		$nav.niceScroll($nav.find("> ul"),{
			cursorcolor:$nav.attr("scroll-color"),
			background:$nav.attr("scroll-bg"),
			cursorwidth:$nav.attr("scroll-width"),
			horizrailenabled:false,
			cursorborder:"none",
			cursorborderradius:0,
			autohidemode:false,
			bouncescroll:false
		});
	}
	function resizeScroll(){
		$nav.getNiceScroll().resize();
	}
	addScroll();

	$(window).scroll(function(){
		$("body").removeClass('menu-open-mobile');
	});
});
 