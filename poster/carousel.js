(function($){

	var Carousel = function(poster){

		this.poster = poster;
		this.posterItemMain = poster.find("ul.poster-list");
		this.nextBtn = poster.find("div.poster-next-btn");
		this.prevBtn = poster.find("div.poster-prev-btn");

		this.setting = {
			"width":410,
			"height":308,
			"posterWidth":360,
			"posterHeight":308,
			"scale":0.8,
			"autoPlay":true,
			"delay":2000,
			"speed":300
		}

		$.extend(this.setting, this.getSetting());
		this.setSettingValue();
		console.log(this.setting);
	}

	Carousel.prototype={

		setSettingValue:function(){
			this.poster.css({
				width:this.setting.width,
				height:this.setting.height
			});
			this.posterItemMain.css({
				width:this.setting.width,
				height:this.setting.height
			});
			var w = (this.setting.width - this.setting.posterWidth)/2;

			this.prevBtn.css({
				width = w,
				height = this.setting.height
			});
			this.nextBtn.css({
				width = w,
				height = this.setting.width
			});

		},

		getSetting:function(){
			var setting = this.poster.attr("data-setting");
			if(setting && setting != ""){
				return $.parseJSON(setting);				
			}else{
				return {};
			}
		}
	}

	Carousel.init = function(posters){
		var _this_ = this;
		posters.each(function(){
			new _this_($(this));
		})
	}

	window["Carousel"] = Carousel;

})(jQuery)