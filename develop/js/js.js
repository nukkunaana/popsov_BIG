$(function(){
	// инит всех методов для всего всего на сайте

	// События
		
// textslider		
	window.inittextslider();

// bigslider
	window.initbigslider();

	window.pageellipsis(170, "...");
	window.latp();

	$("body").on("click", ".ask-item .slide", function(){
		$(this).parents(".ask-item").toggleClass("no-atcive")
	}).on("click", ".tooglefontsize:not(.b)", function(){
		$("body").addClass("big-size")
		$(this).addClass("b")
	}).on("click", ".tooglefontsize.b", function(){
		$("body").removeClass("big-size")
		$(this).removeClass("b")
	})
});	
// textslider		
window.inittextslider = function(){
	if( $(".textslider .swiper-slide").length > 0 ) {
		var ww = $(window).width()/3;
		$(".textslider .swiper-slide").width(ww);
		setTimeout(function(){
			window.textslider = new Swiper('.textslider .swiper-container',{
				loop: true,
				centeredSlides: true,
				slidesPerView: 'auto',
			});
		}, 200)
		
		$(".textslider .swiper-container ").css("margin-left" , -(ww/2  - $(".content-width:first").offset().left + 580)+ "px");
		$("body").on("click", ".textslider  .next", function(e){
			window.textslider.swipeNext();
		 	window.textslider.resizeFix(); 
		})
	}
}
// bigslider
window.initbigslider = function(){
	if( $(".big-slider .swiper-slide").length > 0 ) {
		window.bigslider = {};
		$(".big-slider .swiper-slide").width($(".content-width:first").width());
		window.bigslider = new Swiper('.big-slider .swiper-container',{
			slidesPerView: 'auto',
			onlyExternal: true,
			centeredSlides: true,
			loop: true
		});
		$("body").on("click", ".big-slider .prev, .big-slider .next", function(e){
			window.bigslider[$(this).hasClass("next")?"swipeNext":"swipePrev"]()
		})
		// устанавлием обработчик только на конец события резайз, чтобюы не лагало все, при пересчете
		
		
	}
}
var resize = function(e){
 	if($(".big-slider").length){
 		$(".big-slider  .swiper-slide").width($(".content-width:first").width());
		window.bigslider.reInit(); window.bigslider.resizeFix(); window.bigslider.swipeNext()
 	}
	
 	if($(".textslider").length){
		var ww = $(window).width()/3
		$(".textslider .swiper-container ").css("margin-left" , -(ww/2  - $(".content-width:first").offset().left + 580)+ "px");
		window.textslider.reInit(); window.textslider.resizeFix(); 
 	}
};
// точки
window.ellipsis = function ellipsis(str, chunk, elip){
    // str: String
    // chunk: Integer:  The size of the chunk
    // elip: String? Optional ellipsis marker. defaults to "..."
    // returns: Array ;   An Array containing all the broken up parts of the `str`,   with `elip` delimeter included.
    if(str.length <= chunk){ return [str]; }
    if(!elip){ elip = "..."; }
    var part = str.substring(0, chunk - elip.length).replace(/\w+$/, ""),
        idx = part.length,
        sub = [part.trim() + elip],
        rest = str.substring(idx, str.length)
    ;
    // recursion FTW:
    sub.push.apply(sub, ellipsis(rest, chunk, elip));
    return sub; // Array
};
window.pageellipsis = function(num, eclchar){
	$(".ellipsis").each(function(){
		var originaltext = this.innerHTML;
		this.innerHTML = window.ellipsis(this.innerHTML, num, eclchar)[0];
		this.title = originaltext;
	});
}	
window.latp = function(num, eclchar){
	$(".article p:last").addClass("last")
}

;(function(){
	var time;
	window.onresize = function(e){
		if (time) clearTimeout(time);
		time = setTimeout(function(){  resize(e); },1000);
	}
})();