$(function() {
	var main = {
		opt: {
			tabs: $('.tabs'),
			popup: $('.btn.pop'),
			img: $('img'),
			linc: $('a'),
			body: $('body'),
			wind: $(window),
			mobButton: $('.mob-button'),
		},
		sliders: {
			single: $('.slider-single'),
			multiple: $('.slider-multiple'),
			Options: function(items,autoplay,dots,nav){
				this.items = items;
				this.nav = nav;
				// this.dots = dots;
				this.stagePadding = 0;
				this.pagination = true;
				this.pagination = true;
				this.smartSpeed = 450;
				this.autoplay = autoplay;
			}
		},
		tabs: function(el){
			var linc = el.find('.tab-link'),
					tab  = el.find('.tab'),
					dataShow;
			linc.on('click',function(){				
				dataShow = $(this).data('show');
				linc.removeClass('active');
				$(this).addClass('active');

				tab.css('display','none')
				.find('.tab-content').removeClass('active');

				$('#'+dataShow).fadeIn(600)
				.find('.tab-content').addClass('active');
			});
		},
		popup: function(el){
			el.on('click',function(event){
				event.preventDefault();		
				var show = $(this).data('show'),
						pop  = $('#'+ show);

				pop.fadeIn(600)
				.css('height', $(window).height() + 'px')
				.find('.popup-content')
				.removeClass('anim')
				.append('<span class="fade_out">&#9587;</span>')

				$('.fade_out').click(function(){
					pop.fadeOut(600)
					.find('.popup-content')
					.addClass('anim');
					$(this).detach();
				});
			});
		},
		toggleC: function(el){
			el.on('click',function(){
				el.toggleClass('active');
			});
		},
		winH: function(){
			return this.opt.wind.height();
		},
		fullHeight: function(el){
			$(el).css('min-height',this.winH()+'px');
		},
		dragstart: function(el){
			$(el).on('dragstart',function(event){
				event.preventDefault();
			});
		},
		init: function(){
			// default functions
			this.dragstart(this.opt.img);
			this.dragstart(this.opt.linc);

			// tabs init
			this.tabs(this.opt.tabs);
			// popup init
			this.popup(this.opt.popup);
			// Add el window height
			this.fullHeight(this.opt.body);
			//owl slider init
			this.sliders.single.owlCarousel(new this.sliders.Options(1,true,false,true));
			this.sliders.multiple.owlCarousel(new this.sliders.Options(4,false,true,false));
			//mob button toggle
			this.toggleC(this.opt.mobButton);
		}
	};

	//E-mail Ajax Send
	$("form").submit(function() { 
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {		
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});


	$(document).ready(function(){
		main.init();

		var scrlTo = function(elm,id){
			elm.click(function(event){
				if(window.location.pathname === '/' && !$(this).attr('data-redirect')){
					event.preventDefault();
					$([document.documentElement, document.body]).animate({
	      		scrollTop: id ? $(id).offset().top : $($(this).attr("href")).offset().top
	  			}, 800);
				};
			});
		};
		scrlTo($("nav a"));
		scrlTo($('#scrlToAbout'),'#About');
		scrlTo($('#scrlToMain'),'#Main-promo');
		

		var nav = $('.fixed-nav nav');
		var setActiveLink = function(e){
			var curSection = e.attr('id') !== undefined ? nav.find('a[href="#'+e.attr('id')+'"]') : false;
			if(curSection && curSection.length > 0){
				nav.find('a').removeClass('active');
				curSection.addClass('active');
			};
		};

		$('section').waypoint({
			handler: function(event, direction){
				if(direction === "down") {
					e = $(event.target);
					e.addClass('active');
					setActiveLink(e);
				}else if(direction === "up"){
					e = $(event.target);
					e.removeClass('active');
					setActiveLink(e);
				};
			},
			offset: '35%'
		});


		try {
			$.browserSelector();
			if($("html").hasClass("chrome")) {
					$.smoothScroll();
			}
		} catch(err) {

		};

		function videoStop($wrapper){
			if (!$wrapper) {
				var $wrapper = $('.js-videoWrapper');
				var $iframe = $('.js-videoIframe');
			} else {
				var $iframe = $wrapper.find('.js-videoIframe');
			}
			$wrapper.removeClass('videoWrapperActive');
			$iframe.attr('src','');
		};
		
		function videoPlay($wrapper) {
			var $iframe = $wrapper.find('.js-videoIframe');
			var src = $iframe.data('src');
			$wrapper.addClass('videoWrapperActive');
			$iframe.attr('src',src);
		}

		$(document).on('click','.js-videoPoster',function(ev) {
			ev.preventDefault();
			var $poster = $(this);
			var $wrapper = $poster.closest('.js-videoWrapper');
			videoPlay($wrapper);
		});
		
		$(document).on('click','.videoWrapperActive button',function(ev){
			videoStop($(this).parent());
		});


	});
});
