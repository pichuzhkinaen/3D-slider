$(document).ready(function(){

	const languageList = $('.select-language__list');

	$('.select-language__title').on('click', function() {
		if ($(languageList).hasClass('active')) {
			$(languageList).removeClass('active');
		} else {
			$(languageList).addClass('active');
		}
	});

	$('.select-language__item').on('click', function() {
		const value = $(this).attr('data-value');
		$('.select-language__title').html(value);
		$(languageList).removeClass('active');
	});

	$(document).mouseup(function (e){
		if (!languageList.is(e.target)) {
			languageList.removeClass('active');
		}
	});


	// slider start
	const dotBtn = $('.slider__dots-button'),
		  sliderItem = $('.slider__item');
	let currentSlide = $('.slider__item:eq(0)');

	$('.slider__dots-button:eq(0)').addClass('active');
	
	$(sliderItem).each(function(indx){
		$(this).css('zIndex', indx + 1);
	});

	$(sliderItem).css('zIndex', 0);
	$(sliderItem).eq(0).css('zIndex', 1);

	$(sliderItem).on('click', function() {
		currentSlide = this;
		let slideIndex = $(currentSlide).index();
		animationSlider(currentSlide, slideIndex);
	});

	$('.slider__dots-item').on('click', function() {
		$(dotBtn).removeClass('active');
		$(this).children($(dotBtn)).addClass('active');
		
		const dotIndex = $(this).index();
		animationSliderDot(dotIndex);
	});
	
	
	function animationSliderDot(dotIndex) {
		
		if (!$(sliderItem).css('zIndex', 1)) {
			$(sliderItem).css('zIndex', 0).removeClass('animate');
		}
		$(sliderItem).eq(dotIndex).css('zIndex', 1).addClass('animate');

	}

	function animationSlider(currentSlide, slideIndex) {
		// console.log(currentSlide);
		
		if ($(currentSlide).next().length === 0) {
			$(currentSlide).removeClass('animate');
			$(sliderItem).css('zIndex', 0);
			$(sliderItem).eq(0).css('zIndex', 1);

			$(dotBtn).removeClass('active');
			$(dotBtn).eq(0).addClass('active');

		} else {
			$(currentSlide).removeClass('animate');
			$(sliderItem).css('zIndex', 0);
			$(currentSlide).css('zIndex', 1);
			$(currentSlide).next().css('zIndex', 2).addClass('animate');

			$(dotBtn).removeClass('active');
			$(dotBtn).eq(slideIndex + 1).addClass('active');

		}
	}
	

	// $('#slider').slick({
	// 	arrows: false,
	// 	dots: true,
	// 	speed: 2000,
	// 	// centerMode: true,
	// 	// fade: true,
	// });

	// $('.slider__item').on('click', function() {
	// 	// console.log(this);
	// 	// $(this).css('z-index', 1);
	// 	const currentSlide = $('#slider').slick('slickCurrentSlide');
	// 	$('#slider').slick('slickGoTo', currentSlide + 1);
	// });

	// $('.slick-dots li').on('click', function() {
	// 	const index = $(this).index();
	// 	$('#slider').slick('slickGoTo', index);
	// });

	// $('#slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
	// 	$('.slider__item').removeClass('animate');
	// 	// $('.slider__item').eq(currentSlide).attr('aria-hidden', 'true');
	// 	$('.slider__item').eq(nextSlide).addClass('animate');
		
	// });
	// $('#slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
	// 	$('.slider__item').eq(currentSlide - 1).attr('aria-hidden', 'true');		
	// });

	// slider end

	
    // проставление маски на полe телефона
	(function (){
		let code = '+7',
			find = /\+7/;
		code = '+7';
		find = /\+7/;

	    $("body").on("focus", "input[data-phone]", function(){
	    	this.value = code + " " + this.value.replace(code + ' ', '');
	    });
	    $("body").on("input", "input[data-phone]", function(){
	    	let val = this.value.replace(find, ''),
				res = code + " ";
			val = val.replace(/[^0-9]/g, '');

			for (let i = 0; i < val.length; i++){
				res += i === 0 ? ' (' : '';
				res += i == 3 ? ') ' : '';
				res += i == 6 || i == 8 ? ' ' : '';
				if (i == 10) break;
				res += val[i];
			}
			this.value = res;
	    });
	    $("body").on("blur", "input[data-phone]", function(){
	    	let val = this.value.replace(find, '');
			val = val.trim();
			if (!val) this.value = null;
	    });
	})();

	// Map
	if($("#map").length > 0){
		var script = document.createElement('script');
		script.src = 'https://api-maps.yandex.ru/2.1/?apikey=5cffb513-8b13-4d75-a72e-5fe3718f5386&lang=ru_RU';
		script.onload = loadMap;
		document.body.appendChild(script);
	}
	function loadMap(){
		ymaps.ready(init);   

		function init(){ 
			var myMap = new ymaps.Map("map", {
				center: [56.359619, 43.832279],
				zoom: 15,
				controls: ["zoomControl"],
			});
			myMap.behaviors.disable('scrollZoom');
			// Создание геообъекта с типом точка (метка).
			var myGeoObject = new ymaps.GeoObject({
				geometry: {
					type: "Point", // тип геометрии - точка
					coordinates: [56.359619, 43.832279] // координаты точки
				},
				properties: {
					// hintContent: "Москва",
					balloonContentHeader: "Komplex-info",
					balloonContentBody: "Россия, Нижний Новгород, Силикатная, 4",
				},
			});
			// Размещение геообъекта на карте.
			myMap.geoObjects.add(myGeoObject); 
		}	
	}
});

$(window).on("resize", function(){
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', vh + 'px');
});
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', vh + 'px');