(function($){

	var Carousel = function(poster){
<<<<<<< HEAD
		alert(poster);
	}

	Carousel.prototype={

	}
=======

		this.poster = poster;
		this.posterItemMain = poster.find("ui.poster-list");
		this.nextBtn = poster.find("div.poster-next-btn");
		this.prevBtn = poster.find("div.poster-prev-btn");
		this.posterItems = poster.find("li.poster-item");

		this.posterFirstItem = this.posterItems.first();

		this.setting = {
			"width":410,
			"height":308,
			"posterWidth":360,
			"posterHeight":308,
			"scale":0.8,
			"autoPlay":true,
			"delay":2000,
			"speed":300
		};

		$.extend(this.setting, this.getSetting());
		this.setSettingValue();
		this.setPosterPos();
		console.log(this.setting);
	};

	Carousel.prototype={

		setPosterPos:function(){
			var self = this;
			var sliceItems = this.posterItems.slice(1),
			sliceSize = sliceItems.size()/2,
			rightSlice = sliceItems.slice(0, sliceSize),
			level = Math.floor(this.posterItems.size()/2),
			leftSlice = sliceItems.slice(sliceSize);

			var rw = this.setting.posterWidth,
			rh = this.setting.posterHeight,
			gap = (this.setting.width - this.setting.posterWidth)/2/level;

			var firstLeft = ((this.setting.width - this.setting.posterWidth)/2);
			var fixOffsetLeft = firstLeft + rw;

			rightSlice.each(function(i){
				rw = rw*self.setting.scale;
				rh = rh*self.setting.scale;
				level --;
				$(this).css({
					width:rw,
					height:rh,
					top:(self.setting.height - rh)/2,
					left:fixOffsetLeft +(++i)*gap-rw,
					opacity:0.8/i,
					zIndex:level
				})
			});

			leftSlice.each(function(){

			})
		},

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
				width:w,
				height:this.setting.height
			});
			this.nextBtn.css({
				width:w,
				height:this.setting.height
			});
			this.posterFirstItem.css({
				width:this.setting.posterWidth,
				height:this.setting.posterHeight,
				left:w,
				top:0,
				zIndex:Math.floor(this.posterItems.size()/2)
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
	};
>>>>>>> origin/master

	Carousel.init = function(posters){
		var _this_ = this;
		posters.each(function(){
			new _this_($(this));
		})
	}

	window["Carousel"] = Carousel;

})(jQuery)