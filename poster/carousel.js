(function($){

	var Carousel = function(poster){
		alert(poster);
	}

	Carousel.prototype={

	}

	Carousel.init = function(posters){
		var _this_ = this;
		posters.each(function(){
			new _this_($(this));
		})
	}

	window["Carousel"] = Carousel;

})(jQuery)