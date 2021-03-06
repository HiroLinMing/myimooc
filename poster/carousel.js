(function($){
	

	var Carousel = function(poster){

		var self = this;
		this.clickFlag = true;
		this.poster = poster;
		this.posterItemMain = poster.find("ui.poster-list");
		this.nextBtn = poster.find("div.poster-next-btn");
		this.prevBtn = poster.find("div.poster-prev-btn");
		this.posterItems = poster.find("li.poster-item");

		this.posterFirstItem = this.posterItems.first();
		this.posterLastItem = this.posterItems.last();

		this.setting = {
			"width":410,
			"height":308,
			"posterWidth":360,
			"posterHeight":308,
			"scale":0.8,
			"autoPlay":true,
			"delay":2000,
			"speed":300,
			"align":"top"
		};

		$.extend(this.setting, this.getSetting());
		this.setSettingValue();
		this.setPosterPos();
		this.nextBtn.click(function(){
			if(self.clickFlag){
				self.clickFlag = false;
				self.carouselRotate("left");
			}
		});
		this.prevBtn.click(function(){
			if(self.clickFlag){
				self.clickFlag = false;
				self.carouselRotate("right");
			}
		});

		if(this.setting.autoPlay){
			this.autoPlay();
			this.poster.hover(function(){
				window.clearInterval(self.timer);
			},function(){
				self.autoPlay();
			})
		};
		
		console.log(this.setting);
	};

	Carousel.prototype={

		autoPlay:function(){
			var self = this;
			this.timer = window.setInterval(function(){
				self.nextBtn.click();
			}, this.setting.delay);
		},

		align:function(height){
			var top;
			if(this.setting.align === "top"){
				top = 0;
			}else if(this.setting.align === "bottom"){
				top = (this.setting.height - height);
			}else{
				top = (this.setting.height - height)/2;
			}
			return top;
		},

		carouselRotate:function(way){
			var _this_ = this;
			if(way === "left"){
				this.posterItems.each(function(){
					var self = $(this),
						prev = self.prev().get(0)?self.prev():_this_.posterLastItem,
						width = prev.width(),
						height = prev.height(),
						zIndex = prev.css("zIndex"),
						opacity = prev.css("opacity"),
						left = prev.css("left"),
						top = prev.css("top");

						self.animate({
							width:width,
							height:height,
							zIndex:zIndex,
							opacity:opacity,
							left:left,
							top:top
						},_this_.setting.speed, function(){
							_this_.clickFlag = true;
						});
				});
			}else if(way === "right"){
				this.posterItems.each(function(){
					var self = $(this),
						next = self.next().get(0)?self.next():_this_.posterFirstItem,
						width = next.width(),
						height = next.height(),
						zIndex = next.css("zIndex"),
						opacity = next.css("opacity"),
						left = next.css("left"),
						top = next.css("top");

						self.animate({
							width:width,
							height:height,
							zIndex:zIndex,
							opacity:opacity,
							left:left,
							top:top
						},_this_.setting.speed,function(){
							_this_.clickFlag = true;
						});
				});
			}
		},

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
					top:self.align(rh),
					left:fixOffsetLeft +(++i)*gap-rw,
					opacity:0.8/i,
					zIndex:level
				})
			});

			lw = rightSlice.last().width(),
				lh = rightSlice.last().height(),
				oloop = sliceSize;
			leftSlice.each(function(i){
				$(this).css({
					width:lw,
					height:lh,
					left:i*gap,
					top:self.align(lh),
					zIndex:i,
					opacity:0.8/oloop
				});
				lw = lw/self.setting.scale;
				lh = lh/self.setting.scale;
				oloop --;
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

	Carousel.init = function(posters){
		var _this_ = this;
		posters.each(function(){
			new _this_($(this));
		})
	}

	window["Carousel"] = Carousel;

})(jQuery)
