;(function($) {
	// wrap tables in content for swipe on mobile devices
	$(function() {
		$('article.content').find('table').wrap('<div class="for-mobile-view"></div>');
	});
}(jQuery));$(function () {
	$(document).click(function (event) {
		$('.address-block, .email-block, .phones-block, .schedule-block').each(function() {
			if ($(event.target).closest($(this)).length) {
				return
			} else {
				$(this).find('.tgl-but').prop("checked", false);
			}
		});
	});
});
$(function() {
	if (window.ymaps) {
		ymaps.ready(function () {
			$('.widget-type-map[data-center]').each(function () {
				var self = $(this);
				var id = self.attr('id');
				var data = false;
				if (self.find('[type=hidden]').val()) {
					data = typeof JSON.parse == 'function' ? JSON.parse(self.find('[type=hidden]').val()) : eval(self.find('[type=hidden]').val());
				}
				var params = {
					type: self.data('type') || 'yandex#map',
					center: self.data('center').split(',').map(function (e) {
						return $.trim(e)
					}),
					zoom: self.data('zoom') || 9,
					controls: self.data('controls') ? self.data('controls').split(',').map(function (e) {
						return $.trim(e)
					}) : []
				};
				var myMap = new ymaps.Map(id, params);
				if (data) {
					for (var i in data) {
						var myPlacemark = new ymaps.Placemark(data[i].point.split(',').map(function (e) {
							return $.trim(e);
						}), {
							iconContent: $('<div>').html(data[i].iconContent).text(),
							balloonContent: $('<div>').html(data[i].balloonContent).html()
						}, {
							preset: data[i].preset
						});
						myMap.geoObjects.add(myPlacemark);
					}
				}
			});
		});
	}
});
$(function() {
	$('.partners').each(function() {
		var $partners = $(this),
			options = {},
			$items,
			$list,
			$body,
			heights,
			height_max,
			count;

		if ($partners.attr('data-slider') === '1') {
			options.pagerSelector= $partners.attr('data-setting-pager_selector');
			options.prevSelector = $partners.attr('data-setting-prev_selector');
			options.nextSelector = $partners.attr('data-setting-next_selector');
			options.prevText = $partners.attr('data-setting-prev_text') || '';
			options.nextText = $partners.attr('data-setting-next_text') || '';
			options.auto = !!parseInt($partners.attr('data-setting-auto'));
			options.controls = !!parseInt($partners.attr('data-setting-controls'));
			options.pager = !!parseInt($partners.attr('data-setting-pager'));
			options.pause = parseInt($partners.attr('data-setting-pause'), 10) || 4000;
			options.useCSS = false;
			options.infiniteLoop = true;
			options.moveSlides = 1;
			options.adaptiveHeight = false;
			options.mode = $partners.attr('data-setting-mode');

			$list = $partners.find('.list');
			$items = $partners.find('.item');
			$body = $partners.find('.body');



			if (options.mode === 'vertical') {
				options.slideMargin = parseInt($items.css('margin-bottom'), 10);
				heights = $.makeArray($items.map(function() {
					return Math.ceil($(this).height());
				}));
				height_max = Math.ceil(Math.max.apply(Math, heights));
				count = parseInt($partners.attr('data-setting-count'), 10) || 1;

				$body.css('min-height', count * (height_max + options.slideMargin));
				//if (count > 1) {
					$items.css('min-height', height_max);
				//}
				options.minSlides = count;
				options.maxSlides = count;
				$partners.css('min-height', 0);
			} else {
				options.slideMargin = parseInt($items.css('margin-right'), 10);
				options.slideWidth = $items.outerWidth();
				count = parseInt($partners.attr('data-setting-count'), 10) || Math.floor($list.width()/($items.outerWidth() + options.slideMargin));
				options.minSlides = count;
				options.maxSlides = count;
				$body.css('height', '+=0');
				$items.css('margin-bottom', 0);
			}
			options.onSliderLoad = function () {
				if (options.mode === 'horizontal') {
					if ($list.css('justify-content') === 'center') {
						$partners.find('.bx-wrapper').css({
							'margin-left': 'auto',
							'margin-right': 'auto'
						});
					} else if ($list.css('justify-content') === 'flex-end') {
						$partners.find('.bx-wrapper').css({
							'margin-left': 'auto',
							'margin-right': '0'
						});
					} else {
						$partners.find('.bx-wrapper').css({
							'margin-left': '0',
							'margin-right': 'auto'
						});
					}
				}
			};
			$items.removeClass('hidden');
			if ($.fn.bxSlider) {
				$partners.find('.list').bxSlider(options);
			}
		}

	});
});
/**
 * BxSlider v4.1.2 - Fully loaded, responsive content slider
 * http://bxslider.com
 *
 * Copyright 2014, Steven Wanderski - http://stevenwanderski.com - http://bxcreative.com
 * Written while drinking Belgian ales and listening to jazz
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */
!function(t){var e={},s={mode:"horizontal",slideSelector:"",infiniteLoop:!0,hideControlOnEnd:!1,speed:500,easing:null,slideMargin:0,startSlide:0,randomStart:!1,captions:!1,ticker:!1,tickerHover:!1,adaptiveHeight:!1,adaptiveHeightSpeed:500,video:!1,useCSS:!0,preloadImages:"visible",responsive:!0,slideZIndex:50,touchEnabled:!0,swipeThreshold:50,oneToOneTouch:!0,preventDefaultSwipeX:!0,preventDefaultSwipeY:!1,pager:!0,pagerType:"full",pagerShortSeparator:" / ",pagerSelector:null,buildPager:null,pagerCustom:null,controls:!0,nextText:"Next",prevText:"Prev",nextSelector:null,prevSelector:null,autoControls:!1,startText:"Start",stopText:"Stop",autoControlsCombine:!1,autoControlsSelector:null,auto:!1,pause:4e3,autoStart:!0,autoDirection:"next",autoHover:!1,autoDelay:0,minSlides:1,maxSlides:1,moveSlides:0,slideWidth:0,onSliderLoad:function(){},onSlideBefore:function(){},onSlideAfter:function(){},onSlideNext:function(){},onSlidePrev:function(){},onSliderResize:function(){}};t.fn.bxSlider=function(n){if(0==this.length)return this;if(this.length>1)return this.each(function(){t(this).bxSlider(n)}),this;var o={},r=this;e.el=this;var a=t(window).width(),l=t(window).height(),d=function(){o.settings=t.extend({},s,n),o.settings.slideWidth=parseInt(o.settings.slideWidth),o.children=r.children(o.settings.slideSelector),o.children.length<o.settings.minSlides&&(o.settings.minSlides=o.children.length),o.children.length<o.settings.maxSlides&&(o.settings.maxSlides=o.children.length),o.settings.randomStart&&(o.settings.startSlide=Math.floor(Math.random()*o.children.length)),o.active={index:o.settings.startSlide},o.carousel=o.settings.minSlides>1||o.settings.maxSlides>1,o.carousel&&(o.settings.preloadImages="all"),o.minThreshold=o.settings.minSlides*o.settings.slideWidth+(o.settings.minSlides-1)*o.settings.slideMargin,o.maxThreshold=o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin,o.working=!1,o.controls={},o.interval=null,o.animProp="vertical"==o.settings.mode?"top":"left",o.usingCSS=o.settings.useCSS&&"fade"!=o.settings.mode&&function(){var t=document.createElement("div"),e=["WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var i in e)if(void 0!==t.style[e[i]])return o.cssPrefix=e[i].replace("Perspective","").toLowerCase(),o.animProp="-"+o.cssPrefix+"-transform",!0;return!1}(),"vertical"==o.settings.mode&&(o.settings.maxSlides=o.settings.minSlides),r.data("origStyle",r.attr("style")),r.children(o.settings.slideSelector).each(function(){t(this).data("origStyle",t(this).attr("style"))}),c()},c=function(){r.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'),o.viewport=r.parent(),o.loader=t('<div class="bx-loading" />'),o.viewport.prepend(o.loader),r.css({width:"horizontal"==o.settings.mode?100*o.children.length+215+"%":"auto",position:"relative"}),o.usingCSS&&o.settings.easing?r.css("-"+o.cssPrefix+"-transition-timing-function",o.settings.easing):o.settings.easing||(o.settings.easing="swing"),f(),o.viewport.css({width:"100%",overflow:"hidden",position:"relative"}),o.viewport.parent().css({maxWidth:p()}),o.settings.pager||o.viewport.parent().css({margin:"0 auto 0px"}),o.children.css({"float":"horizontal"==o.settings.mode?"left":"none",listStyle:"none",position:"relative"}),o.children.css("width",u()),"horizontal"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginRight",o.settings.slideMargin),"vertical"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginBottom",o.settings.slideMargin),"fade"==o.settings.mode&&(o.children.css({position:"absolute",zIndex:0,display:"none"}),o.children.eq(o.settings.startSlide).css({zIndex:o.settings.slideZIndex,display:"block"})),o.controls.el=t('<div class="bx-controls" />'),o.settings.captions&&P(),o.active.last=o.settings.startSlide==x()-1,o.settings.video&&r.fitVids();var e=o.children.eq(o.settings.startSlide);"all"==o.settings.preloadImages&&(e=o.children),o.settings.ticker?o.settings.pager=!1:(o.settings.pager&&T(),o.settings.controls&&C(),o.settings.auto&&o.settings.autoControls&&E(),(o.settings.controls||o.settings.autoControls||o.settings.pager)&&o.viewport.after(o.controls.el)),g(e,h)},g=function(e,i){var s=e.find("img, iframe").length;if(0==s)return i(),void 0;var n=0;e.find("img, iframe").each(function(){t(this).one("load",function(){++n==s&&i()}).each(function(){this.complete&&t(this).load()})})},h=function(){if(o.settings.infiniteLoop&&"fade"!=o.settings.mode&&!o.settings.ticker){var e="vertical"==o.settings.mode?o.settings.minSlides:o.settings.maxSlides,i=o.children.slice(0,e).clone().addClass("bx-clone"),s=o.children.slice(-e).clone().addClass("bx-clone");r.append(i).prepend(s)}o.loader.remove(),S(),"vertical"==o.settings.mode&&(o.settings.adaptiveHeight=!0),o.viewport.height(v()),r.redrawSlider(),o.settings.onSliderLoad(o.active.index),o.initialized=!0,o.settings.responsive&&t(window).bind("resize",Z),o.settings.auto&&o.settings.autoStart&&H(),o.settings.ticker&&L(),o.settings.pager&&q(o.settings.startSlide),o.settings.controls&&W(),o.settings.touchEnabled&&!o.settings.ticker&&O()},v=function(){var e=0,s=t();if("vertical"==o.settings.mode||o.settings.adaptiveHeight)if(o.carousel){var n=1==o.settings.moveSlides?o.active.index:o.active.index*m();for(s=o.children.eq(n),i=1;i<=o.settings.maxSlides-1;i++)s=n+i>=o.children.length?s.add(o.children.eq(i-1)):s.add(o.children.eq(n+i))}else s=o.children.eq(o.active.index);else s=o.children;return"vertical"==o.settings.mode?(s.each(function(){e+=t(this).outerHeight()}),o.settings.slideMargin>0&&(e+=o.settings.slideMargin*(o.settings.minSlides-1))):e=Math.max.apply(Math,s.map(function(){return t(this).outerHeight(!1)}).get()),e},p=function(){var t="100%";return o.settings.slideWidth>0&&(t="horizontal"==o.settings.mode?o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin:o.settings.slideWidth),t},u=function(){var t=o.settings.slideWidth,e=o.viewport.width();return 0==o.settings.slideWidth||o.settings.slideWidth>e&&!o.carousel||"vertical"==o.settings.mode?t=e:o.settings.maxSlides>1&&"horizontal"==o.settings.mode&&(e>o.maxThreshold||e<o.minThreshold&&(t=(e-o.settings.slideMargin*(o.settings.minSlides-1))/o.settings.minSlides)),t},f=function(){var t=1;if("horizontal"==o.settings.mode&&o.settings.slideWidth>0)if(o.viewport.width()<o.minThreshold)t=o.settings.minSlides;else if(o.viewport.width()>o.maxThreshold)t=o.settings.maxSlides;else{var e=o.children.first().width();t=Math.floor(o.viewport.width()/e)}else"vertical"==o.settings.mode&&(t=o.settings.minSlides);return t},x=function(){var t=0;if(o.settings.moveSlides>0)if(o.settings.infiniteLoop)t=o.children.length/m();else for(var e=0,i=0;e<o.children.length;)++t,e=i+f(),i+=o.settings.moveSlides<=f()?o.settings.moveSlides:f();else t=Math.ceil(o.children.length/f());return t},m=function(){return o.settings.moveSlides>0&&o.settings.moveSlides<=f()?o.settings.moveSlides:f()},S=function(){if(o.children.length>o.settings.maxSlides&&o.active.last&&!o.settings.infiniteLoop){if("horizontal"==o.settings.mode){var t=o.children.last(),e=t.position();b(-(e.left-(o.viewport.width()-t.width())),"reset",0)}else if("vertical"==o.settings.mode){var i=o.children.length-o.settings.minSlides,e=o.children.eq(i).position();b(-e.top,"reset",0)}}else{var e=o.children.eq(o.active.index*m()).position();o.active.index==x()-1&&(o.active.last=!0),void 0!=e&&("horizontal"==o.settings.mode?b(-e.left,"reset",0):"vertical"==o.settings.mode&&b(-e.top,"reset",0))}},b=function(t,e,i,s){if(o.usingCSS){var n="vertical"==o.settings.mode?"translate3d(0, "+t+"px, 0)":"translate3d("+t+"px, 0, 0)";r.css("-"+o.cssPrefix+"-transition-duration",i/1e3+"s"),"slide"==e?(r.css(o.animProp,n),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),D()})):"reset"==e?r.css(o.animProp,n):"ticker"==e&&(r.css("-"+o.cssPrefix+"-transition-timing-function","linear"),r.css(o.animProp,n),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),b(s.resetValue,"reset",0),N()}))}else{var a={};a[o.animProp]=t,"slide"==e?r.animate(a,i,o.settings.easing,function(){D()}):"reset"==e?r.css(o.animProp,t):"ticker"==e&&r.animate(a,speed,"linear",function(){b(s.resetValue,"reset",0),N()})}},w=function(){for(var e="",i=x(),s=0;i>s;s++){var n="";o.settings.buildPager&&t.isFunction(o.settings.buildPager)?(n=o.settings.buildPager(s),o.pagerEl.addClass("bx-custom-pager")):(n=s+1,o.pagerEl.addClass("bx-default-pager")),e+='<div class="bx-pager-item"><a href="" data-slide-index="'+s+'" class="bx-pager-link">'+n+"</a></div>"}o.pagerEl.html(e)},T=function(){o.settings.pagerCustom?o.pagerEl=t(o.settings.pagerCustom):(o.pagerEl=t('<div class="bx-pager" />'),o.settings.pagerSelector?t(o.settings.pagerSelector).html(o.pagerEl):o.controls.el.addClass("bx-has-pager").append(o.pagerEl),w()),o.pagerEl.on("click","a",I)},C=function(){o.controls.next=t('<a class="bx-next" href="">'+o.settings.nextText+"</a>"),o.controls.prev=t('<a class="bx-prev" href="">'+o.settings.prevText+"</a>"),o.controls.next.bind("click",y),o.controls.prev.bind("click",z),o.settings.nextSelector&&t(o.settings.nextSelector).append(o.controls.next),o.settings.prevSelector&&t(o.settings.prevSelector).append(o.controls.prev),o.settings.nextSelector||o.settings.prevSelector||(o.controls.directionEl=t('<div class="bx-controls-direction" />'),o.controls.directionEl.append(o.controls.prev).append(o.controls.next),o.controls.el.addClass("bx-has-controls-direction").append(o.controls.directionEl))},E=function(){o.controls.start=t('<div class="bx-controls-auto-item"><a class="bx-start" href="">'+o.settings.startText+"</a></div>"),o.controls.stop=t('<div class="bx-controls-auto-item"><a class="bx-stop" href="">'+o.settings.stopText+"</a></div>"),o.controls.autoEl=t('<div class="bx-controls-auto" />'),o.controls.autoEl.on("click",".bx-start",k),o.controls.autoEl.on("click",".bx-stop",M),o.settings.autoControlsCombine?o.controls.autoEl.append(o.controls.start):o.controls.autoEl.append(o.controls.start).append(o.controls.stop),o.settings.autoControlsSelector?t(o.settings.autoControlsSelector).html(o.controls.autoEl):o.controls.el.addClass("bx-has-controls-auto").append(o.controls.autoEl),A(o.settings.autoStart?"stop":"start")},P=function(){o.children.each(function(){var e=t(this).find("img:first").attr("title");void 0!=e&&(""+e).length&&t(this).append('<div class="bx-caption"><span>'+e+"</span></div>")})},y=function(t){o.settings.auto&&r.stopAuto(),r.goToNextSlide(),t.preventDefault()},z=function(t){o.settings.auto&&r.stopAuto(),r.goToPrevSlide(),t.preventDefault()},k=function(t){r.startAuto(),t.preventDefault()},M=function(t){r.stopAuto(),t.preventDefault()},I=function(e){o.settings.auto&&r.stopAuto();var i=t(e.currentTarget),s=parseInt(i.attr("data-slide-index"));s!=o.active.index&&r.goToSlide(s),e.preventDefault()},q=function(e){var i=o.children.length;return"short"==o.settings.pagerType?(o.settings.maxSlides>1&&(i=Math.ceil(o.children.length/o.settings.maxSlides)),o.pagerEl.html(e+1+o.settings.pagerShortSeparator+i),void 0):(o.pagerEl.find("a").removeClass("active"),o.pagerEl.each(function(i,s){t(s).find("a").eq(e).addClass("active")}),void 0)},D=function(){if(o.settings.infiniteLoop){var t="";0==o.active.index?t=o.children.eq(0).position():o.active.index==x()-1&&o.carousel?t=o.children.eq((x()-1)*m()).position():o.active.index==o.children.length-1&&(t=o.children.eq(o.children.length-1).position()),t&&("horizontal"==o.settings.mode?b(-t.left,"reset",0):"vertical"==o.settings.mode&&b(-t.top,"reset",0))}o.working=!1,o.settings.onSlideAfter(o.children.eq(o.active.index),o.oldIndex,o.active.index)},A=function(t){o.settings.autoControlsCombine?o.controls.autoEl.html(o.controls[t]):(o.controls.autoEl.find("a").removeClass("active"),o.controls.autoEl.find("a:not(.bx-"+t+")").addClass("active"))},W=function(){1==x()?(o.controls.prev.addClass("disabled"),o.controls.next.addClass("disabled")):!o.settings.infiniteLoop&&o.settings.hideControlOnEnd&&(0==o.active.index?(o.controls.prev.addClass("disabled"),o.controls.next.removeClass("disabled")):o.active.index==x()-1?(o.controls.next.addClass("disabled"),o.controls.prev.removeClass("disabled")):(o.controls.prev.removeClass("disabled"),o.controls.next.removeClass("disabled")))},H=function(){o.settings.autoDelay>0?setTimeout(r.startAuto,o.settings.autoDelay):r.startAuto(),o.settings.autoHover&&r.hover(function(){o.interval&&(r.stopAuto(!0),o.autoPaused=!0)},function(){o.autoPaused&&(r.startAuto(!0),o.autoPaused=null)})},L=function(){var e=0;if("next"==o.settings.autoDirection)r.append(o.children.clone().addClass("bx-clone"));else{r.prepend(o.children.clone().addClass("bx-clone"));var i=o.children.first().position();e="horizontal"==o.settings.mode?-i.left:-i.top}b(e,"reset",0),o.settings.pager=!1,o.settings.controls=!1,o.settings.autoControls=!1,o.settings.tickerHover&&!o.usingCSS&&o.viewport.hover(function(){r.stop()},function(){var e=0;o.children.each(function(){e+="horizontal"==o.settings.mode?t(this).outerWidth(!0):t(this).outerHeight(!0)});var i=o.settings.speed/e,s="horizontal"==o.settings.mode?"left":"top",n=i*(e-Math.abs(parseInt(r.css(s))));N(n)}),N()},N=function(t){speed=t?t:o.settings.speed;var e={left:0,top:0},i={left:0,top:0};"next"==o.settings.autoDirection?e=r.find(".bx-clone").first().position():i=o.children.first().position();var s="horizontal"==o.settings.mode?-e.left:-e.top,n="horizontal"==o.settings.mode?-i.left:-i.top,a={resetValue:n};b(s,"ticker",speed,a)},O=function(){o.touch={start:{x:0,y:0},end:{x:0,y:0}},o.viewport.bind("touchstart",X)},X=function(t){if(o.working)t.preventDefault();else{o.touch.originalPos=r.position();var e=t.originalEvent;o.touch.start.x=e.changedTouches[0].pageX,o.touch.start.y=e.changedTouches[0].pageY,o.viewport.bind("touchmove",Y),o.viewport.bind("touchend",V)}},Y=function(t){var e=t.originalEvent,i=Math.abs(e.changedTouches[0].pageX-o.touch.start.x),s=Math.abs(e.changedTouches[0].pageY-o.touch.start.y);if(3*i>s&&o.settings.preventDefaultSwipeX?t.preventDefault():3*s>i&&o.settings.preventDefaultSwipeY&&t.preventDefault(),"fade"!=o.settings.mode&&o.settings.oneToOneTouch){var n=0;if("horizontal"==o.settings.mode){var r=e.changedTouches[0].pageX-o.touch.start.x;n=o.touch.originalPos.left+r}else{var r=e.changedTouches[0].pageY-o.touch.start.y;n=o.touch.originalPos.top+r}b(n,"reset",0)}},V=function(t){o.viewport.unbind("touchmove",Y);var e=t.originalEvent,i=0;if(o.touch.end.x=e.changedTouches[0].pageX,o.touch.end.y=e.changedTouches[0].pageY,"fade"==o.settings.mode){var s=Math.abs(o.touch.start.x-o.touch.end.x);s>=o.settings.swipeThreshold&&(o.touch.start.x>o.touch.end.x?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto())}else{var s=0;"horizontal"==o.settings.mode?(s=o.touch.end.x-o.touch.start.x,i=o.touch.originalPos.left):(s=o.touch.end.y-o.touch.start.y,i=o.touch.originalPos.top),!o.settings.infiniteLoop&&(0==o.active.index&&s>0||o.active.last&&0>s)?b(i,"reset",200):Math.abs(s)>=o.settings.swipeThreshold?(0>s?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto()):b(i,"reset",200)}o.viewport.unbind("touchend",V)},Z=function(){var e=t(window).width(),i=t(window).height();(a!=e||l!=i)&&(a=e,l=i,r.redrawSlider(),o.settings.onSliderResize.call(r,o.active.index))};return r.goToSlide=function(e,i){if(!o.working&&o.active.index!=e)if(o.working=!0,o.oldIndex=o.active.index,o.active.index=0>e?x()-1:e>=x()?0:e,o.settings.onSlideBefore(o.children.eq(o.active.index),o.oldIndex,o.active.index),"next"==i?o.settings.onSlideNext(o.children.eq(o.active.index),o.oldIndex,o.active.index):"prev"==i&&o.settings.onSlidePrev(o.children.eq(o.active.index),o.oldIndex,o.active.index),o.active.last=o.active.index>=x()-1,o.settings.pager&&q(o.active.index),o.settings.controls&&W(),"fade"==o.settings.mode)o.settings.adaptiveHeight&&o.viewport.height()!=v()&&o.viewport.animate({height:v()},o.settings.adaptiveHeightSpeed),o.children.filter(":visible").fadeOut(o.settings.speed).css({zIndex:0}),o.children.eq(o.active.index).css("zIndex",o.settings.slideZIndex+1).fadeIn(o.settings.speed,function(){t(this).css("zIndex",o.settings.slideZIndex),D()});else{o.settings.adaptiveHeight&&o.viewport.height()!=v()&&o.viewport.animate({height:v()},o.settings.adaptiveHeightSpeed);var s=0,n={left:0,top:0};if(!o.settings.infiniteLoop&&o.carousel&&o.active.last)if("horizontal"==o.settings.mode){var a=o.children.eq(o.children.length-1);n=a.position(),s=o.viewport.width()-a.outerWidth()}else{var l=o.children.length-o.settings.minSlides;n=o.children.eq(l).position()}else if(o.carousel&&o.active.last&&"prev"==i){var d=1==o.settings.moveSlides?o.settings.maxSlides-m():(x()-1)*m()-(o.children.length-o.settings.maxSlides),a=r.children(".bx-clone").eq(d);n=a.position()}else if("next"==i&&0==o.active.index)n=r.find("> .bx-clone").eq(o.settings.maxSlides).position(),o.active.last=!1;else if(e>=0){var c=e*m();n=o.children.eq(c).position()}if("undefined"!=typeof n){var g="horizontal"==o.settings.mode?-(n.left-s):-n.top;b(g,"slide",o.settings.speed)}}},r.goToNextSlide=function(){if(o.settings.infiniteLoop||!o.active.last){var t=parseInt(o.active.index)+1;r.goToSlide(t,"next")}},r.goToPrevSlide=function(){if(o.settings.infiniteLoop||0!=o.active.index){var t=parseInt(o.active.index)-1;r.goToSlide(t,"prev")}},r.startAuto=function(t){o.interval||(o.interval=setInterval(function(){"next"==o.settings.autoDirection?r.goToNextSlide():r.goToPrevSlide()},o.settings.pause),o.settings.autoControls&&1!=t&&A("stop"))},r.stopAuto=function(t){o.interval&&(clearInterval(o.interval),o.interval=null,o.settings.autoControls&&1!=t&&A("start"))},r.getCurrentSlide=function(){return o.active.index},r.getCurrentSlideElement=function(){return o.children.eq(o.active.index)},r.getSlideCount=function(){return o.children.length},r.redrawSlider=function(){o.children.add(r.find(".bx-clone")).outerWidth(u()),o.viewport.css("height",v()),o.settings.ticker||S(),o.active.last&&(o.active.index=x()-1),o.active.index>=x()&&(o.active.last=!0),o.settings.pager&&!o.settings.pagerCustom&&(w(),q(o.active.index))},r.destroySlider=function(){o.initialized&&(o.initialized=!1,t(".bx-clone",this).remove(),o.children.each(function(){void 0!=t(this).data("origStyle")?t(this).attr("style",t(this).data("origStyle")):t(this).removeAttr("style")}),void 0!=t(this).data("origStyle")?this.attr("style",t(this).data("origStyle")):t(this).removeAttr("style"),t(this).unwrap().unwrap(),o.controls.el&&o.controls.el.remove(),o.controls.next&&o.controls.next.remove(),o.controls.prev&&o.controls.prev.remove(),o.pagerEl&&o.settings.controls&&o.pagerEl.remove(),t(".bx-caption",this).remove(),o.controls.autoEl&&o.controls.autoEl.remove(),clearInterval(o.interval),o.settings.responsive&&t(window).unbind("resize",Z))},r.reloadSlider=function(t){void 0!=t&&(n=t),r.destroySlider(),d()},d(),this}}(jQuery);
$(function () {
	$(document).click(function (event) {
		$('.address-block, .email-block, .phones-block, .schedule-block').each(function() {
			if ($(event.target).closest($(this)).length) {
				return
			} else {
				$(this).find('.tgl-but').prop("checked", false);
			}
		});
	});
});
$(function() {
	$('.up_button').click(function () {
		var up_speed = $(this).data('speed')
		$('body, html').animate({
			scrollTop: 0
		}, up_speed);
	});
});
(function ($, undefined) {

	var $win = $(window);
	var $doc = $(document);
	var $grid = $('<div class="grid"></div>');
	var $grid2 = $('<div class="grid-2"></div>');
	var media = {
		screen: 960,
		tl: 768,
		tp: 640,
		ml: 480,
		mp: 0
	}

	var init = function (settings) {
		var	$self = $(this), $li;
		var more_text = $self.data('more-text') || '';
		var more_button = $self.find('.more-button');
		var ul_mode = $self.find('.menu-scroll > ul');

		var activate_more_button = {
			active: false,
			from: 0,
			to: 0
		};

		if ($self.data('responsive-tl') == 'button') {
			if (ul_mode.is('.sub_popup_horizontal') != true) {
				activate_more_button.active = true;
				if (media.screen > activate_more_button.to) {
					activate_more_button.to = media.screen;
				}
				if (media.tl < activate_more_button.from || activate_more_button.from == 0) {
					activate_more_button.from = media.tl;
				}
			}
		}

		if ($self.data('responsive-tp') == 'button') {
			if (ul_mode.is('.sub_popup_horizontal') != true) {
				activate_more_button.active = true;
				if (media.tl > activate_more_button.to) {
					activate_more_button.to = media.tl;
				}
				if (media.tp < activate_more_button.from || activate_more_button.from == 0) {
					activate_more_button.from = media.tp;
				}
			}

		}

		if ($self.data('responsive-ml') == 'button') {
			if (ul_mode.is('.sub_popup_horizontal') != true) {
				activate_more_button.active = true;
				if (media.tp > activate_more_button.to) {
					activate_more_button.to = media.tp;
				}
				if (media.ml < activate_more_button.from || activate_more_button.from == 0) {
					activate_more_button.from = media.ml;
				}
			}
		}

		var first_level_wrapper = $self.find('.menu-scroll>ul');

		settings = $.extend({
			itemElem: 'li',
			subMenu: 'ul'
		}, settings);


		var first_level_items = first_level_wrapper.find('>.menu-item:visible, >.delimiter:visible');

		$grid.appendTo('body');
		$grid2.appendTo('body');

		//$self.on('mouseenter', settings.itemElem, function () {
		//	$(this).siblings('.has_child').each(function () {
		//		$(this).triggerHandler('hide');
		//	});
		//});
		if (!more_button.size()) {
			more_button = $('<li class="more-button"><a href="#"><span>' + more_text + '</span></a></li>');
			$self.find('.menu-scroll>ul').append(more_button);
		}
		if (!more_button.find('>' + settings.subMenu).size()) {
			more_button.append('<' + settings.subMenu +'>');
		} else {
			more_button.find('>' + settings.subMenu).html('');
		}
		var cloned = first_level_items.clone(true, true);
		more_button.find('>' + settings.subMenu).append(cloned);

		$li = $self.find(settings.itemElem + ":has('>" + settings.subMenu + "')").addClass('has_child');

		$li.add(cloned.filter('.has_child')).each(function () {
			var $item = $(this),
				$submenu = $item.children(settings.subMenu),
				$a = $item.children('a'),
				$parents = $item.parentsUntil($self.parent()).filter(settings.subMenu),
				$parent = $parents.first(),
				level = $parents.length,
				position = $item.data('position') || (((level == 1 && $self.is('.vertical')) || level > 1) ? 'right top' :  'bottom left'),
				type = $item.data('type') || 'vertical',
				trigger = $item.data('trigger') || 'hover',
				effect = $item.data('effect') || 'none',
				timer_show,
				submenu_left = $submenu.css('left'),
				getParent = $item.closest('ul'),
				timer_hide;

			if (trigger === 'hover') {
				$item.on('mouseenter', onMouseEnter);
				$item.on('mouseleave', onMouseLeave);
			} else if (trigger === 'click') {
				$submenu.click(false);
				$item.on('click', onMouseClick);
			}

			$item.on('hide', function () {
				hideSub(true);
			});

			function onMouseEnter() {
				clearTimeout(timer_hide);
				timer_show = setTimeout(function () {
					showSub();
				}, 100);
			}

			function onMouseLeave() {
				clearTimeout(timer_show);
				timer_hide = setTimeout(function () {
					hideSub();
				}, 300);
			}

			function onMouseClick(e) {
				e.stopPropagation();
				if ($item.data('clicked')) {
					hideSub();
				} else {
					showSub();
					$item.data('clicked', true);
				}
				$doc.one('click', function (e) {
					$item.triggerHandler('hide');
				});
			}

			function showSub() {
				var opts, maxHeight, visible;

				visible = $submenu.is(':visible');

				opts = getPosition();

				switch (submenu_left) {
					case '50%':
						$.extend(true, opts, {'right': 'auto', 'left': '50%', 'align': 'center'});
						break;
					case '0px':
						$.extend(true, opts, {'right': 'auto', 'left': '0px', 'align': 'left'});
						break;
					case 'auto':
						$.extend(true, opts, {'right': '0px', 'left': 'auto', 'align': 'right'});
						break;
				}

				if (!visible) {
					$item.data('opts', opts);

					if (opts.align === 'contain' && level > 1) {
						if (!$parent.data('height')) {
							$parent.data('height', $parent.height());
						}
						maxHeight = Math.max($parent.height(), $submenu.height());
						$parent.height(maxHeight);
						$submenu.height(maxHeight);
					}

					beforeShow();

					$a.addClass('hover');
				}

				switch (effect) {
					case 'fade':
						if (visible) {
							$submenu.stop().animate({
								opacity: 1
							}, 'fast');
						} else {
							$submenu.css({
								display: 'block',
								opacity: 0,
								top: opts.top,
								left: opts.left
							}).animate({
								opacity: 1
							}, 'fast');
						}
						break;
					case 'fade-motion':
						if (visible) {
							$submenu.stop().animate({
								opacity: 1
							}, 'fast');
						} else {
							$submenu.css({
								display: 'block',
								opacity: 0,
								top: opts.top + 10,
								left: opts.left
							}).animate({
								opacity: 1,
								top: opts.top
							}, 'fast');
						}
						break;
					default:
						$submenu.css({
							top: opts.top,
							left: opts.left
						}).show();
				}
			}

			function hideSub(force) {
				if (!$submenu.is(':visible')) {
					return;
				}
				$item.find('.has_child').each(function () {
					$(this).triggerHandler('hide');
				});
				$a.removeClass('hover');
				if (force) {
					$submenu.stop().hide();
					afterHide();
					return;
				}
				switch (effect) {
					case 'fade':
					case 'fade-motion':
						$submenu.stop().animate({
							opacity: 0
						}, {
							duration: 'fast',
							complete: function () {
								$submenu.hide();
								afterHide();
							}
						});
						break;
					default:
						$submenu.hide();
						afterHide();
						break;
				}
			}

			function beforeShow() {
				var opts = $item.data('opts'),
					submenuRect, old_css,
					leftEdge, rightEdge, submenuCenter, parentsLength;

				//$item.siblings('.has_child').each(function () {
				//	$(this).triggerHandler('hide');
				//});

				old_css = {
					'visibility': $submenu.css('visibility'),
					'left': $submenu.css('left'),
					'display': $submenu.css('display')
				};

				$submenu.css({
					'visibility': 'hidden',
					'left': opts.left,
					'display': 'block'
				});

				submenuRect = $submenu[0].getBoundingClientRect();

				$submenu.css({
					'visibility': '',
					'left': '',
					'display': old_css.display
				});

				if ($self.hasClass('horizontal')) {
					parentsLength = $parents.length - 1;
				} else {
					parentsLength = $parents.length;
				}

				$parents.slice(0, parentsLength).each(function () {
					var submenuRect = this.getBoundingClientRect();
					if (typeof leftEdge === 'undefined' || submenuRect.left < leftEdge) {
						leftEdge = submenuRect.left;
					}
					if (typeof rightEdge === 'undefined' || submenuRect.right > rightEdge) {
						rightEdge = submenuRect.right;
					}
				});

				submenuCenter = submenuRect.left + submenuRect.width * .5;

				if (leftEdge && rightEdge) {
					$grid.css({
						left: leftEdge,
						width: rightEdge - leftEdge
					});
					$grid2.css({
						left: submenuRect.left,
						width: submenuRect.width
					});
					if (submenuCenter > leftEdge && submenuCenter < rightEdge) {
						$parents.slice(1).addClass('blur');
					}
				}
			}

			function afterHide() {
				var opts = $item.data('opts');

				$parents.slice(0,2).removeClass('blur');

				if (trigger === 'click') $item.data('clicked', false);
				if (opts.align === 'contain') {
					$parent.height($parent.data('height'));
				}
			}

			function getPosition() {

				var itemRect = $item[0].getBoundingClientRect(),
					itemPosition,
					submenuWidth = $submenu.outerWidth(),
					submenuHeight = $submenu.outerHeight(),
					winWidth = $win.width(),
					scrollLeft = $win.scrollLeft(),
					top, left, side, align;

				side = position.split(' ')[0];    // right, left, top, bottom
				align = position.split(' ')[1];   // top, bottom, right, left, center, contain

				if (typeof align === 'undefined') {
					if (side === 'bottom' || side === 'top') {
						align = 'left';
					}
					if (side === 'right' || side === 'left') {
						align = 'top';
					}
				}


				switch (side) {
					case 'top':
						top = -submenuHeight;
						switch (align) {
							case 'left':
								left = 0;
								break;
							case 'center':
								left = (itemRect.width - submenuWidth) * .5;
								break;
							case 'right':
								left = itemRect.width - submenuWidth;
								break;
						}
						break;
					case 'bottom':
						top = itemRect.height;
						switch (align) {
							case 'left':
								left = 0;
								break;
							case 'center':
								left = (itemRect.width - submenuWidth) * .5;
								break;
							case 'right':
								left = itemRect.width - submenuWidth;
								break;
						}
						break;
					case 'right':
						left = itemRect.width;
						switch (align) {
							case 'top':
								top = 0;
								break;
							case 'center':
								top = (itemRect.height - submenuHeight) * .5;
								break;
							case 'bottom':
								top = itemRect.height - submenuHeight;
								break;
							case 'contain':
								top = $parent.offset().top - $item.offset().top;
								break;
						}
						break;
					case 'left':
						left = -submenuWidth;
						switch (align) {
							case 'top':
								top = 0;
								break;
							case 'center':
								top = (itemRect.height - submenuHeight) * .5;
								break;
							case 'bottom':
								top = itemRect.height - submenuHeight;
								break;
							case 'contain':
								top = $parent.offset().top - $item.offset().top;
						}
						break;
				}

				if ($item.css('position') === 'static' && getParent.is('.sub_popup_horizontal') != true  ) {
					itemPosition = $item.position();
					top += itemPosition.top;
					left += itemPosition.left;
				} else if (getParent.is('.sub_popup_horizontal') == true) {
					itemPosition = $item.position();
					top += itemPosition.top;
					left += 0;
				}

				// determine for submenu positioned out of viewport
				if (side === 'right' && itemRect.right + submenuWidth > winWidth - scrollLeft && itemRect.left > submenuWidth) {
					left = left - itemRect.width - submenuWidth;
				} else if (side === 'left' && submenuWidth > itemRect.left && itemRect.right + submenuWidth < winWidth - scrollLeft) {
					left = left + itemRect.width + submenuWidth;
				}

				return {
					top: top,
					left: left,
					side: side,
					align: align
				}
			}
		});
		$(window).resize(function() {
			if (!$self.closest('.side-panel').size() && activate_more_button.active && window.innerWidth <= activate_more_button.to && window.innerWidth > activate_more_button.from && !more_button.hasClass('removed')) {
				var parent_pos = first_level_wrapper[0].getBoundingClientRect();

				more_button.removeClass('disabled');
				more_button.show();
				var pos_left = more_button[0].getBoundingClientRect().left;
				more_button.addClass('disabled');
				more_button.removeAttr('style');
				var top_el = first_level_items.filter(':visible:first');
				if (top_el.size()) {
					var top_pos = top_el[0].getBoundingClientRect().top;
					var last_el_in_line = first_level_items.show().filter(function (el) {
						if (this.getBoundingClientRect().top > top_pos) return false;
						return true;
					}).filter(':visible:last');
					if (last_el_in_line.size()) {
						var free_size = pos_left - last_el_in_line[0].getBoundingClientRect().right;
						var _to_hide = first_level_items.filter(":gt(" + first_level_items.index(last_el_in_line) + ")");
						var to_hide = $();
						if (free_size > 0) {
							var may_add = true;
							for (var i = 0; i < _to_hide.size(); i++) {
								if (!may_add || _to_hide[0].getBoundingClientRect().width > free_size) {
									to_hide = to_hide.add(_to_hide.eq(i));
									may_add = false;
								} else {
									free_size -= _to_hide[0].getBoundingClientRect().width;
								}
							}
						} else {
							var new_to_hide = first_level_items.not(to_hide).show().filter(function () {
								if (parent_pos.left + this.getBoundingClientRect().right > pos_left) return true;
								return false;
							});
							to_hide = to_hide.add(_to_hide).add(new_to_hide);
						}
						first_level_items.not(to_hide).show();
						to_hide.hide();
						cloned.show().filter(':lt(' + first_level_items.index(to_hide.filter(':first')) + ')').hide();
						if (to_hide.size()) {
							more_button.removeClass('disabled');
						} else {
							more_button.addClass('disabled');
						}
					}
				}
			} else {
				if (!more_button.is('.disabled')) more_button.addClass('disabled');
				if (first_level_items.filter(':hidden').size()) first_level_items.show();
			}
		}).trigger('resize');
	};


	$.fn.wmMenuH = function(settings) {
		return this.each(function () {
			init.call(this, settings)
		});
	};

	$(function() {
		$('.wm-widget-menu.horizontal').wmMenuH();
	})


})(jQuery);
$(function() {

	var debounce = (function () {
		return function (fn, time) {
			var timer, func;
			func = function() {
				var args = [].slice.call(arguments, 0);
				window.clearTimeout(timer);
				timer = window.setTimeout(function () {
					window.requestAnimationFrame && window.requestAnimationFrame(function() {
						fn.apply(null, args);
					}) || fn.apply(null, args);
				}, time)
			};
			return func;
		}
	}());

	$('.blocklist').each(function() {
		var $blocklist = $(this),
			$items = $blocklist.find('.item-outer'),
			$list = $blocklist.find('.list'),
			$body = $blocklist.find('.body'),
			options = {},
			count,
			bxslider,
			containerWidth,
			isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

		if ($blocklist.attr('data-slider') === '1' && $.fn.bxSlider) {

			options.pagerSelector= $blocklist.attr('data-setting-pager_selector');
			options.prevSelector = $blocklist.attr('data-setting-prev_selector');
			options.nextSelector = $blocklist.attr('data-setting-next_selector');
			options.prevText = $blocklist.attr('data-setting-prev_text') || '';
			options.nextText = $blocklist.attr('data-setting-next_text') || '';
			options.auto = !!parseInt($blocklist.attr('data-setting-auto'));
			options.controls = !!parseInt($blocklist.attr('data-setting-controls'));
			options.pager = !!parseInt($blocklist.attr('data-setting-pager'));
			options.pause = parseInt($blocklist.attr('data-setting-pause'), 10) || 4000;
			options.useCSS = isMobile;
			options.infiniteLoop = true;
			options.adaptiveHeight = false;
			options.mode = $blocklist.attr('data-setting-mode') || 'horizontal';
			options.touchEnabled = options.mode === 'horizontal';
			options.slideMargin = 0;
			options.maxSlides = count = parseInt($blocklist.attr('data-setting-count'), 10) || 1;
			options.minSlides = options.mode === 'horizontal' ? 1 : options.maxSlides;
			options.moveSlides = $blocklist.attr('data-setting-move') || 0;

			if (!options.autoControls && options.auto) {
				options.onSlideAfter = function() {
					bxslider.startAuto();
				}
			}

			$items.removeClass('hidden');
			if ($list.parent().hasClass('bx-viewport')) {
				$list.unwrap();
				$list.unwrap();
			}

			function init() {
				var newContainerWidth = $blocklist.width(), itemHeight, viewportHeight;
				if (!$blocklist.is(':visible')) {
					if (bxslider) {
						bxslider.destroySlider();
					}
					return;
				}
				if (containerWidth && containerWidth === newContainerWidth) {
					return;
				}
				containerWidth = newContainerWidth;

				if (bxslider) {
					bxslider.destroySlider();
				}

				$list.width('auto');
				$items
					.attr('style', '')
					.slice(1).addClass('hidden').end()
					.width(options.slideWidth = $items.width())
					.removeClass('hidden');

				if (options.mode === 'vertical') {
					itemHeight = Math.max.apply(Math, $items.map(function() {
						return $(this).height()
					}).get());
					$items.css('min-height', itemHeight);
					viewportHeight = itemHeight * count;
				} else {
					options.maxSlides = Math.min(count, Math.ceil($items.parent().width() / $items.width()));
				}

				if (bxslider) {
					bxslider.reloadSlider(options);
				} else {
					$list.data('bxslider', (bxslider = $list.bxSlider(options)));
				}
				if (viewportHeight) {
					$list.parent().css('min-height', viewportHeight);
				}
				if (options.mode === 'horizontal') {
					var align = {};
					switch ($body.css('justify-content')) {
						case 'flex-end':
							align['margin-left'] = 'auto';
							align['margin-right'] = '0px';
							break;
						case 'center':
							align['margin-left'] = 'auto';
							align['margin-right'] = 'auto';
							break;
						default:
							align['margin-left'] = '0px';
							align['margin-right'] = 'auto';
					}
					$blocklist.find('.bx-wrapper').css(align);
				}
			}

			$(window).on('resize', debounce(init, 300));

			init();

		}
	});
});
/**
 * BxSlider v4.1.2 - Fully loaded, responsive content slider
 * http://bxslider.com
 *
 * Copyright 2014, Steven Wanderski - http://stevenwanderski.com - http://bxcreative.com
 * Written while drinking Belgian ales and listening to jazz
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */
!function(t){var e={},s={mode:"horizontal",slideSelector:"",infiniteLoop:!0,hideControlOnEnd:!1,speed:500,easing:null,slideMargin:0,startSlide:0,randomStart:!1,captions:!1,ticker:!1,tickerHover:!1,adaptiveHeight:!1,adaptiveHeightSpeed:500,video:!1,useCSS:!0,preloadImages:"visible",responsive:!0,slideZIndex:50,wrapperClass:"bx-wrapper",touchEnabled:!0,swipeThreshold:50,oneToOneTouch:!0,preventDefaultSwipeX:!0,preventDefaultSwipeY:!1,pager:!0,pagerType:"full",pagerShortSeparator:" / ",pagerSelector:null,buildPager:null,pagerCustom:null,controls:!0,nextText:"Next",prevText:"Prev",nextSelector:null,prevSelector:null,autoControls:!1,startText:"Start",stopText:"Stop",autoControlsCombine:!1,autoControlsSelector:null,auto:!1,pause:4e3,autoStart:!0,autoDirection:"next",autoHover:!1,autoDelay:0,autoSlideForOnePage:!1,minSlides:1,maxSlides:1,moveSlides:0,slideWidth:0,onSliderLoad:function(){},onSlideBefore:function(){},onSlideAfter:function(){},onSlideNext:function(){},onSlidePrev:function(){},onSliderResize:function(){}};t.fn.bxSlider=function(n){if(0==this.length)return this;if(this.length>1)return this.each(function(){t(this).bxSlider(n)}),this;var o={},r=this;e.el=this;var a=t(window).width(),l=t(window).height(),d=function(){o.settings=t.extend({},s,n),o.settings.slideWidth=parseInt(o.settings.slideWidth),o.children=r.children(o.settings.slideSelector),o.children.length<o.settings.minSlides&&(o.settings.minSlides=o.children.length),o.children.length<o.settings.maxSlides&&(o.settings.maxSlides=o.children.length),o.settings.randomStart&&(o.settings.startSlide=Math.floor(Math.random()*o.children.length)),o.active={index:o.settings.startSlide},o.carousel=o.settings.minSlides>1||o.settings.maxSlides>1,o.carousel&&(o.settings.preloadImages="all"),o.minThreshold=o.settings.minSlides*o.settings.slideWidth+(o.settings.minSlides-1)*o.settings.slideMargin,o.maxThreshold=o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin,o.working=!1,o.controls={},o.interval=null,o.animProp="vertical"==o.settings.mode?"top":"left",o.usingCSS=o.settings.useCSS&&"fade"!=o.settings.mode&&function(){var t=document.createElement("div"),e=["WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var i in e)if(void 0!==t.style[e[i]])return o.cssPrefix=e[i].replace("Perspective","").toLowerCase(),o.animProp="-"+o.cssPrefix+"-transform",!0;return!1}(),"vertical"==o.settings.mode&&(o.settings.maxSlides=o.settings.minSlides),r.data("origStyle",r.attr("style")),r.children(o.settings.slideSelector).each(function(){t(this).data("origStyle",t(this).attr("style"))}),c()},c=function(){r.wrap('<div class="'+o.settings.wrapperClass+'"><div class="bx-viewport"></div></div>'),o.viewport=r.parent(),o.loader=t('<div class="bx-loading" />'),o.viewport.prepend(o.loader),r.css({width:"horizontal"==o.settings.mode?100*o.children.length+215+"%":"auto",position:"relative"}),o.usingCSS&&o.settings.easing?r.css("-"+o.cssPrefix+"-transition-timing-function",o.settings.easing):o.settings.easing||(o.settings.easing="swing");f();o.viewport.css({width:"100%",overflow:"hidden",position:"relative"}),o.viewport.parent().css({maxWidth:v()}),o.settings.pager||o.viewport.parent().css({margin:"0 auto 0px"}),o.children.css({"float":"horizontal"==o.settings.mode?"left":"none",listStyle:"none",position:"relative"}),o.children.css("width",u()),"horizontal"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginRight",o.settings.slideMargin),"vertical"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginBottom",o.settings.slideMargin),"fade"==o.settings.mode&&(o.children.css({position:"absolute",zIndex:0,display:"none"}),o.children.eq(o.settings.startSlide).css({zIndex:o.settings.slideZIndex,display:"block"})),o.controls.el=t('<div class="bx-controls" />'),o.settings.captions&&P(),o.active.last=o.settings.startSlide==x()-1,o.settings.video&&r.fitVids();var e=o.children.eq(o.settings.startSlide);"all"==o.settings.preloadImages&&(e=o.children),o.settings.ticker?o.settings.pager=!1:(o.settings.pager&&T(),o.settings.controls&&C(),o.settings.auto&&o.settings.autoControls&&E(),(o.settings.controls||o.settings.autoControls||o.settings.pager)&&o.viewport.after(o.controls.el)),g(e,h)},g=function(e,i){var s=e.find("img, iframe").length;if(0==s)return void i();var n=0;e.find("img, iframe").each(function(){t(this).one("load",function(){++n==s&&i()}).each(function(){this.complete&&t(this).load()})})},h=function(){if(o.settings.infiniteLoop&&"fade"!=o.settings.mode&&!o.settings.ticker){var e="vertical"==o.settings.mode?o.settings.minSlides:o.settings.maxSlides,i=o.children.slice(0,e).clone().addClass("bx-clone"),s=o.children.slice(-e).clone().addClass("bx-clone");r.append(i).prepend(s)}o.loader.remove(),S(),"vertical"==o.settings.mode&&(o.settings.adaptiveHeight=!0),o.viewport.height(p()),r.redrawSlider(),o.settings.onSliderLoad(o.active.index),o.initialized=!0,o.settings.responsive&&t(window).bind("resize",V),o.settings.auto&&o.settings.autoStart&&(x()>1||o.settings.autoSlideForOnePage)&&H(),o.settings.ticker&&L(),o.settings.pager&&q(o.settings.startSlide),o.settings.controls&&W(),o.settings.touchEnabled&&!o.settings.ticker&&N()},p=function(){var e=0,s=t();if("vertical"==o.settings.mode||o.settings.adaptiveHeight)if(o.carousel){var n=1==o.settings.moveSlides?o.active.index:o.active.index*m();for(s=o.children.eq(n),i=1;i<=o.settings.maxSlides-1;i++)s=n+i>=o.children.length?s.add(o.children.eq(i-1)):s.add(o.children.eq(n+i))}else s=o.children.eq(o.active.index);else s=o.children;return"vertical"==o.settings.mode?(s.each(function(i){e+=t(this).outerHeight()}),o.settings.slideMargin>0&&(e+=o.settings.slideMargin*(o.settings.minSlides-1))):e=Math.max.apply(Math,s.map(function(){return t(this).outerHeight(!1)}).get()),"border-box"==o.viewport.css("box-sizing")?e+=parseFloat(o.viewport.css("padding-top"))+parseFloat(o.viewport.css("padding-bottom"))+parseFloat(o.viewport.css("border-top-width"))+parseFloat(o.viewport.css("border-bottom-width")):"padding-box"==o.viewport.css("box-sizing")&&(e+=parseFloat(o.viewport.css("padding-top"))+parseFloat(o.viewport.css("padding-bottom"))),e},v=function(){var t="100%";return o.settings.slideWidth>0&&(t="horizontal"==o.settings.mode?o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin:o.settings.slideWidth),t},u=function(){var t=o.settings.slideWidth,e=o.viewport.width();return 0==o.settings.slideWidth||o.settings.slideWidth>e&&!o.carousel||"vertical"==o.settings.mode?t=e:o.settings.maxSlides>1&&"horizontal"==o.settings.mode&&(e>o.maxThreshold||e<o.minThreshold&&(t=(e-o.settings.slideMargin*(o.settings.minSlides-1))/o.settings.minSlides)),t},f=function(){var t=1;if("horizontal"==o.settings.mode&&o.settings.slideWidth>0)if(o.viewport.width()<o.minThreshold)t=o.settings.minSlides;else if(o.viewport.width()>o.maxThreshold)t=o.settings.maxSlides;else{var e=o.children.first().width()+o.settings.slideMargin;t=Math.floor((o.viewport.width()+o.settings.slideMargin)/e)}else"vertical"==o.settings.mode&&(t=o.settings.minSlides);return t},x=function(){var t=0;if(o.settings.moveSlides>0)if(o.settings.infiniteLoop)t=Math.ceil(o.children.length/m());else for(var e=0,i=0;e<o.children.length;)++t,e=i+f(),i+=o.settings.moveSlides<=f()?o.settings.moveSlides:f();else t=Math.ceil(o.children.length/f());return t},m=function(){return o.settings.moveSlides>0&&o.settings.moveSlides<=f()?o.settings.moveSlides:f()},S=function(){if(o.children.length>o.settings.maxSlides&&o.active.last&&!o.settings.infiniteLoop){if("horizontal"==o.settings.mode){var t=o.children.last(),e=t.position();b(-(e.left-(o.viewport.width()-t.outerWidth())),"reset",0)}else if("vertical"==o.settings.mode){var i=o.children.length-o.settings.minSlides,e=o.children.eq(i).position();b(-e.top,"reset",0)}}else{var e=o.children.eq(o.active.index*m()).position();o.active.index==x()-1&&(o.active.last=!0),void 0!=e&&("horizontal"==o.settings.mode?b(-e.left,"reset",0):"vertical"==o.settings.mode&&b(-e.top,"reset",0))}},b=function(t,e,i,s){if(o.usingCSS){var n="vertical"==o.settings.mode?"translate3d(0, "+t+"px, 0)":"translate3d("+t+"px, 0, 0)";r.css("-"+o.cssPrefix+"-transition-duration",i/1e3+"s"),"slide"==e?(r.css(o.animProp,n),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),D()})):"reset"==e?r.css(o.animProp,n):"ticker"==e&&(r.css("-"+o.cssPrefix+"-transition-timing-function","linear"),r.css(o.animProp,n),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),b(s.resetValue,"reset",0),F()}))}else{var a={};a[o.animProp]=t,"slide"==e?r.animate(a,i,o.settings.easing,function(){D()}):"reset"==e?r.css(o.animProp,t):"ticker"==e&&r.animate(a,speed,"linear",function(){b(s.resetValue,"reset",0),F()})}},w=function(){for(var e="",i=x(),s=0;i>s;s++){var n="";o.settings.buildPager&&t.isFunction(o.settings.buildPager)?(n=o.settings.buildPager(s),o.pagerEl.addClass("bx-custom-pager")):(n=s+1,o.pagerEl.addClass("bx-default-pager")),e+='<div class="bx-pager-item"><a href="" data-slide-index="'+s+'" class="bx-pager-link">'+n+"</a></div>"}o.pagerEl.html(e)},T=function(){o.settings.pagerCustom?o.pagerEl=t(o.settings.pagerCustom):(o.pagerEl=t('<div class="bx-pager" />'),o.settings.pagerSelector?t(o.settings.pagerSelector).html(o.pagerEl):o.controls.el.addClass("bx-has-pager").append(o.pagerEl),w()),o.pagerEl.on("click","a",I)},C=function(){o.controls.next=t('<a class="bx-next" href="">'+o.settings.nextText+"</a>"),o.controls.prev=t('<a class="bx-prev" href="">'+o.settings.prevText+"</a>"),o.controls.next.bind("click",z),o.controls.prev.bind("click",y),o.settings.nextSelector&&t(o.settings.nextSelector).append(o.controls.next),o.settings.prevSelector&&t(o.settings.prevSelector).append(o.controls.prev),o.settings.nextSelector||o.settings.prevSelector||(o.controls.directionEl=t('<div class="bx-controls-direction" />'),o.controls.directionEl.append(o.controls.prev).append(o.controls.next),o.controls.el.addClass("bx-has-controls-direction").append(o.controls.directionEl))},E=function(){o.controls.start=t('<div class="bx-controls-auto-item"><a class="bx-start" href="">'+o.settings.startText+"</a></div>"),o.controls.stop=t('<div class="bx-controls-auto-item"><a class="bx-stop" href="">'+o.settings.stopText+"</a></div>"),o.controls.autoEl=t('<div class="bx-controls-auto" />'),o.controls.autoEl.on("click",".bx-start",M),o.controls.autoEl.on("click",".bx-stop",k),o.settings.autoControlsCombine?o.controls.autoEl.append(o.controls.start):o.controls.autoEl.append(o.controls.start).append(o.controls.stop),o.settings.autoControlsSelector?t(o.settings.autoControlsSelector).html(o.controls.autoEl):o.controls.el.addClass("bx-has-controls-auto").append(o.controls.autoEl),A(o.settings.autoStart?"stop":"start")},P=function(){o.children.each(function(e){var i=t(this).find("img:first").attr("title");void 0!=i&&(""+i).length&&t(this).append('<div class="bx-caption"><span>'+i+"</span></div>")})},z=function(t){o.settings.auto&&r.stopAuto(),r.goToNextSlide(),t.preventDefault()},y=function(t){o.settings.auto&&r.stopAuto(),r.goToPrevSlide(),t.preventDefault()},M=function(t){r.startAuto(),t.preventDefault()},k=function(t){r.stopAuto(),t.preventDefault()},I=function(e){o.settings.auto&&r.stopAuto();var i=t(e.currentTarget);if(void 0!==i.attr("data-slide-index")){var s=parseInt(i.attr("data-slide-index"));s!=o.active.index&&r.goToSlide(s),e.preventDefault()}},q=function(e){var i=o.children.length;return"short"==o.settings.pagerType?(o.settings.maxSlides>1&&(i=Math.ceil(o.children.length/o.settings.maxSlides)),void o.pagerEl.html(e+1+o.settings.pagerShortSeparator+i)):(o.pagerEl.find("a").removeClass("active"),void o.pagerEl.each(function(i,s){t(s).find("a").eq(e).addClass("active")}))},D=function(){if(o.settings.infiniteLoop){var t="";0==o.active.index?t=o.children.eq(0).position():o.active.index==x()-1&&o.carousel?t=o.children.eq((x()-1)*m()).position():o.active.index==o.children.length-1&&(t=o.children.eq(o.children.length-1).position()),t&&("horizontal"==o.settings.mode?b(-t.left,"reset",0):"vertical"==o.settings.mode&&b(-t.top,"reset",0))}o.working=!1,o.settings.onSlideAfter(o.children.eq(o.active.index),o.oldIndex,o.active.index)},A=function(t){o.settings.autoControlsCombine?o.controls.autoEl.html(o.controls[t]):(o.controls.autoEl.find("a").removeClass("active"),o.controls.autoEl.find("a:not(.bx-"+t+")").addClass("active"))},W=function(){1==x()?(o.controls.prev.addClass("disabled"),o.controls.next.addClass("disabled")):!o.settings.infiniteLoop&&o.settings.hideControlOnEnd&&(0==o.active.index?(o.controls.prev.addClass("disabled"),o.controls.next.removeClass("disabled")):o.active.index==x()-1?(o.controls.next.addClass("disabled"),o.controls.prev.removeClass("disabled")):(o.controls.prev.removeClass("disabled"),o.controls.next.removeClass("disabled")))},H=function(){if(o.settings.autoDelay>0){setTimeout(r.startAuto,o.settings.autoDelay)}else r.startAuto();o.settings.autoHover&&r.hover(function(){o.interval&&(r.stopAuto(!0),o.autoPaused=!0)},function(){o.autoPaused&&(r.startAuto(!0),o.autoPaused=null)})},L=function(){var e=0;if("next"==o.settings.autoDirection)r.append(o.children.clone().addClass("bx-clone"));else{r.prepend(o.children.clone().addClass("bx-clone"));var i=o.children.first().position();e="horizontal"==o.settings.mode?-i.left:-i.top}b(e,"reset",0),o.settings.pager=!1,o.settings.controls=!1,o.settings.autoControls=!1,o.settings.tickerHover&&!o.usingCSS&&o.viewport.hover(function(){r.stop()},function(){var e=0;o.children.each(function(i){e+="horizontal"==o.settings.mode?t(this).outerWidth(!0):t(this).outerHeight(!0)});var i=o.settings.speed/e,s="horizontal"==o.settings.mode?"left":"top",n=i*(e-Math.abs(parseInt(r.css(s))));F(n)}),F()},F=function(t){speed=t?t:o.settings.speed;var e={left:0,top:0},i={left:0,top:0};"next"==o.settings.autoDirection?e=r.find(".bx-clone").first().position():i=o.children.first().position();var s="horizontal"==o.settings.mode?-e.left:-e.top,n="horizontal"==o.settings.mode?-i.left:-i.top,a={resetValue:n};b(s,"ticker",speed,a)},N=function(){o.touch={start:{x:0,y:0},end:{x:0,y:0}},o.viewport.bind("touchstart",O)},O=function(t){if(o.working)t.preventDefault();else{o.touch.originalPos=r.position();var e=t.originalEvent;o.touch.start.x=e.changedTouches[0].pageX,o.touch.start.y=e.changedTouches[0].pageY,o.viewport.bind("touchmove",X),o.viewport.bind("touchend",Y)}},X=function(t){var e=t.originalEvent,i=Math.abs(e.changedTouches[0].pageX-o.touch.start.x),s=Math.abs(e.changedTouches[0].pageY-o.touch.start.y);if(3*i>s&&o.settings.preventDefaultSwipeX?t.preventDefault():3*s>i&&o.settings.preventDefaultSwipeY&&t.preventDefault(),"fade"!=o.settings.mode&&o.settings.oneToOneTouch){var n=0;if("horizontal"==o.settings.mode){var r=e.changedTouches[0].pageX-o.touch.start.x;n=o.touch.originalPos.left+r}else{var r=e.changedTouches[0].pageY-o.touch.start.y;n=o.touch.originalPos.top+r}b(n,"reset",0)}},Y=function(t){o.viewport.unbind("touchmove",X);var e=t.originalEvent,i=0;if(o.touch.end.x=e.changedTouches[0].pageX,o.touch.end.y=e.changedTouches[0].pageY,"fade"==o.settings.mode){var s=Math.abs(o.touch.start.x-o.touch.end.x);s>=o.settings.swipeThreshold&&(o.touch.start.x>o.touch.end.x?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto())}else{var s=0;"horizontal"==o.settings.mode?(s=o.touch.end.x-o.touch.start.x,i=o.touch.originalPos.left):(s=o.touch.end.y-o.touch.start.y,i=o.touch.originalPos.top),!o.settings.infiniteLoop&&(0==o.active.index&&s>0||o.active.last&&0>s)?b(i,"reset",200):Math.abs(s)>=o.settings.swipeThreshold?(0>s?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto()):b(i,"reset",200)}o.viewport.unbind("touchend",Y)},V=function(e){if(o.initialized){var i=t(window).width(),s=t(window).height();(a!=i||l!=s)&&(a=i,l=s,r.redrawSlider(),o.settings.onSliderResize.call(r,o.active.index))}};return r.goToSlide=function(e,i){if(!o.working&&o.active.index!=e)if(o.working=!0,o.oldIndex=o.active.index,0>e?o.active.index=x()-1:e>=x()?o.active.index=0:o.active.index=e,o.settings.onSlideBefore(o.children.eq(o.active.index),o.oldIndex,o.active.index),"next"==i?o.settings.onSlideNext(o.children.eq(o.active.index),o.oldIndex,o.active.index):"prev"==i&&o.settings.onSlidePrev(o.children.eq(o.active.index),o.oldIndex,o.active.index),o.active.last=o.active.index>=x()-1,o.settings.pager&&q(o.active.index),o.settings.controls&&W(),"fade"==o.settings.mode)o.settings.adaptiveHeight&&o.viewport.height()!=p()&&o.viewport.animate({height:p()},o.settings.adaptiveHeightSpeed),o.children.filter(":visible").fadeOut(o.settings.speed).css({zIndex:0}),o.children.eq(o.active.index).css("zIndex",o.settings.slideZIndex+1).fadeIn(o.settings.speed,function(){t(this).css("zIndex",o.settings.slideZIndex),D()});else{o.settings.adaptiveHeight&&o.viewport.height()!=p()&&o.viewport.animate({height:p()},o.settings.adaptiveHeightSpeed);var s=0,n={left:0,top:0};if(!o.settings.infiniteLoop&&o.carousel&&o.active.last)if("horizontal"==o.settings.mode){var a=o.children.eq(o.children.length-1);n=a.position(),s=o.viewport.width()-a.outerWidth()}else{var l=o.children.length-o.settings.minSlides;n=o.children.eq(l).position()}else if(o.carousel&&o.active.last&&"prev"==i){var d=1==o.settings.moveSlides?o.settings.maxSlides-m():(x()-1)*m()-(o.children.length-o.settings.maxSlides),a=r.children(".bx-clone").eq(d);n=a.position()}else if("next"==i&&0==o.active.index)n=r.find("> .bx-clone").eq(o.settings.maxSlides).position(),o.active.last=!1;else if(e>=0){var c=e*m();n=o.children.eq(c).position()}if("undefined"!=typeof n){var g="horizontal"==o.settings.mode?-(n.left-s):-n.top;b(g,"slide",o.settings.speed)}}},r.goToNextSlide=function(){if(o.settings.infiniteLoop||!o.active.last){var t=parseInt(o.active.index)+1;r.goToSlide(t,"next")}},r.goToPrevSlide=function(){if(o.settings.infiniteLoop||0!=o.active.index){var t=parseInt(o.active.index)-1;r.goToSlide(t,"prev")}},r.startAuto=function(t){o.interval||(o.interval=setInterval(function(){"next"==o.settings.autoDirection?r.goToNextSlide():r.goToPrevSlide()},o.settings.pause),o.settings.autoControls&&1!=t&&A("stop"))},r.stopAuto=function(t){o.interval&&(clearInterval(o.interval),o.interval=null,o.settings.autoControls&&1!=t&&A("start"))},r.getCurrentSlide=function(){return o.active.index},r.getCurrentSlideElement=function(){return o.children.eq(o.active.index)},r.getSlideCount=function(){return o.children.length},r.redrawSlider=function(){o.children.add(r.find(".bx-clone")).width(u()),o.viewport.css("height",p()),o.settings.ticker||S(),o.active.last&&(o.active.index=x()-1),o.active.index>=x()&&(o.active.last=!0),o.settings.pager&&!o.settings.pagerCustom&&(w(),q(o.active.index))},r.destroySlider=function(){o.initialized&&(o.initialized=!1,t(".bx-clone",this).remove(),o.children.each(function(){void 0!=t(this).data("origStyle")?t(this).attr("style",t(this).data("origStyle")):t(this).removeAttr("style")}),void 0!=t(this).data("origStyle")?this.attr("style",t(this).data("origStyle")):t(this).removeAttr("style"),t(this).unwrap().unwrap(),o.controls.el&&o.controls.el.remove(),o.controls.next&&o.controls.next.remove(),o.controls.prev&&o.controls.prev.remove(),o.pagerEl&&o.settings.controls&&o.pagerEl.remove(),t(".bx-caption",this).remove(),o.controls.autoEl&&o.controls.autoEl.remove(),clearInterval(o.interval),o.settings.responsive&&t(window).unbind("resize",V))},r.reloadSlider=function(t){void 0!=t&&(n=t),r.destroySlider(),d()},d(),this}}(jQuery);
