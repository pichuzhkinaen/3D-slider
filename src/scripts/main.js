$(document).ready(function(){

	function addClassDevice(){
		if( $(window).width() < 1200 ){
			$("body").addClass('mobile');
		}else{
			$("body").removeClass('mobile');
		}
	}

	$(window).on("resize", function(){
		addClassDevice();
		if ($('#home-wrapper').length > 0) {
			if (screen.width < 1200 || screen.height < 670) {
				document.getElementById('home-wrapper').removeEventListener('wheel', wheel);
			} else {
				document.getElementById('home-wrapper').addEventListener('wheel', wheel);
			}
		}
	});

	$('.hamburger').on('click', function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('.menu').removeClass('active');
		} else {
			$(this).addClass('active');
			$('.menu').addClass('active');
		}
	});
	
	// открытие подменю
	$('.arrow').on('click', function() {
		const subMenu = $(this).parent();
		
		if(subMenu.hasClass('open')) {
			subMenu.removeClass('open');
		} else {
			subMenu.addClass('open');
		}
	});

	$('.menu a:not(.menu__phone)').on('click', function() {
		$('.menu, .hamburger').removeClass('active');
	});

	const normalizeNumber = (total) => (current) => {
		if (current%total !== 0) {
			return current%total;
		}
		return total;
	};
	
	let normalizeNumberItem;
	$('.carousel-big').on('init', function(event, slick) {
		$('.navigation__loading').addClass('start');
		
		let countSlide = slick.slideCount / 2;
		normalizeNumberItem = normalizeNumber(countSlide);
		
		if(countSlide < 10) {
			countSlide = "0" + countSlide;
		}
		$('#last-numbers').html(countSlide);
	}).slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		asNavFor: '.carousel-small',
		appendArrows: $('#slider-arrows'),
		prevArrow: '<button id="prev" type="button" class="navigation__arrow navigation__arrow_type_prev"></button>',
		nextArrow: '<button id="next" type="button" class="navigation__arrow navigation__arrow_type_next"></button>',
		infinite: true,
		speed: 1000,
	});

	$('.carousel-small').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: '.carousel-big',
		focusOnSelect: true,
		arrows: false,
		infinite: true,
		speed: 1000,
		responsive: [
			{
				breakpoint: 1013,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 789,
				settings: {
					slidesToShow: 1,
					fade: true,
					cssEase: 'linear'
				}
			}
		]
	});

	$('#partners-slider').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		infinite: true,
		speed: 1000,
		swipeToSlide: true,
		autoplay: true,
		autoplaySpeed: 3000,
		responsive: [
			{
				breakpoint: 1221,
				settings: {
					slidesToShow: 4,
				}
			},
			{
				breakpoint: 1013,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 789,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 597,
				settings: {
					slidesToShow: 1,
				}
			},
		]
	});

	$('.navigation__loading').on('animationend', () => {
		$('.carousel-big').slick('slickNext');
		$('.navigation__loading').removeClass('start');		
	});

	$('.carousel-big').on('afterChange', function(event, slick, currentSlide){
		$('.navigation__loading').addClass('start');
		$('.carousel-big__image-block').removeClass('visible hidden');
		$(slick.$slides[currentSlide]).find('.carousel-big__image-block').addClass('visible');
	});

	$('.carousel-big').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$('.navigation__loading').removeClass('start');
		let next = normalizeNumberItem(nextSlide + 1);
		$('.carousel-big__image-block').removeClass('hidden visible');
		$(slick.$slides[currentSlide]).find('.carousel-big__image-block').addClass('hidden');
		if(next < 10) {
			next = "0" + next;
		}
		$('#first-numbers').html(next);
	});

	$('.home-services__wrapper-carousel-big').on('mouseenter', function(){
		$('.navigation__loading').addClass('paused');
	});

	$('.home-services__wrapper-carousel-big').on('mouseleave', function(){
		$('.navigation__loading').removeClass('paused');
	});

	// показ секций главной страницы при скролле
	let elem = document.getElementById('home-wrapper'),
		delta,
		direction,
		header = document.querySelector('.header'),	
		isTransfer = true; //разрешить перелистывание
	
	if (document.getElementById('home-wrapper')){
		if (screen.width < 1200 || screen.height < 670) {
			// isTransfer = false;
		} else {
			elem.addEventListener('wheel', wheel);
		}
	}

	//событие нажатия клавиш - стрелок вниз, вверх
	document.addEventListener('keydown', function(event) {
		if (!isTransfer) return false;

		if (event.code == 'ArrowDown') {
			transitionDown();
		} else if (event.code == 'ArrowUp') {
			transitionUp();
		}
	});

	function wheel(e){
		if (!isTransfer) return false;
		if ($(window).height() >= 670) {
			e = e || window.event;
			delta = e.deltaY || e.detail || e.wheelDelta;
			if (delta > 0) {
				transitionDown();			
			} else {
				transitionUp();
			}
			return false;
		} else {
			$(".header").removeAttr("class").addClass("header header_position_fixed");
		}
	}

	//переход вниз
	function transitionDown() {
		direction = 'down';
		let listDisplay = $('.content__section_type_display');
		$(listDisplay[listDisplay.length - 1]).next().addClass('content__section_type_display');

		if ($(listDisplay[listDisplay.length - 1]).next().length > 0) {

			let nextId = $(listDisplay[listDisplay.length - 1]).next().attr('id'); //id следующей секции

			$('.header').removeClass('header_color_white header_color_blue');
			switch(nextId) {
				case 'home-services':
					$('.header').addClass('header_color_white');
					break;
				case 'result':
					$('.header').addClass('header_color_blue');
					break;
			}
		}
		
		isTransfer = false;
		
		setTimeout(function() {
			isTransfer = true;
		}, 800);
	}

	//переход вверх
	function transitionUp() {
		direction = 'up';
		let listDisplay = $('.content__section_type_display');
		let current = $(listDisplay[listDisplay.length - 1]);
		if (current.attr('id') !== 'main') {

			current.removeClass('content__section_type_display');
			
			let prevId = $(listDisplay[listDisplay.length - 1]).prev().attr('id');

			$('.header').removeClass('header_color_white header_color_blue');
			switch(prevId) {
				case 'home-services':
					$('.header').addClass('header_color_white');
					break;
				case 'result':
					$('.header').addClass('header_color_blue');
					break;
			}

			isTransfer = false;
			
			setTimeout(function() {
				isTransfer = true;
			}, 800);
		}
	}

	//закрытие списка FAQ если один открыт (страница "Создание и продвижение сайтов")
	const spoiler = $('.faq__spoiler');

	$('.faq__spoiler:eq(0)').attr('open', ''); //открытие первого спойлера при загрузке страницы

	spoiler.on('click', function(){
		spoiler.not(this).removeAttr('open');
	});


	//открытие модального окна с формой для отправки заявки
	$.fancybox.defaults.autoFocus = false;
	$.fancybox.defaults.backFocus = false;
	$.fancybox.defaults.touch.vertical = false;
	// $.fancybox.defaults.closeExisting = true;
	// $.fancybox.defaults.thumbs.autoStart = true;
	// $.fancybox.defaults.thumbs.axis = "x";

	$("#modal-btn, #modal-btn-order").on("click", function() {
		$.fancybox.open(
			$("#modal-form"), 
			{
				touch: false,
			}
		);
	});

	//открытие модального окна с описанием вакансии при клике на карточку вакансии
	$(".cards__item[data-src]").on( "click", function() {
		const id = $(this).attr("data-src");

		modalFancybox = $.fancybox.open({ src: id }, 
			{
				touch: false
			});	
	});
	//открытие модального окна с формой отправки резюме и закрытие окна с описанием вакансии
	$(".modal-vacancy__button" ).on( "click", function() {
		$.fancybox.open(
			$("#form-vacancy"), 
			{
				touch: false
			}
		);
		modalFancybox.close();
	});


	$('.workemail').val("").removeAttr('required');
	$(".form__input").on("change input", function(){
		$(this).removeClass('error');
	});

	$("#callback-form").on("submit", function(e){
		e.preventDefault();
		var dataForm = $(this).serialize();
		var thisForm = $(this);
		thisForm.find("input[type='submit']").attr("disabled", "disabled").val("идет отправка...");

		$.ajax({
			type: "POST",
			url: "/obrabotchik-formyi",
			data: dataForm,
			success: function (data) {
				var data = JSON.parse(data.trim());
				
				if(data.status == "success"){
					$.fancybox.open('<div class="message"><h2 class="message__title">Ваша заявка успешно отправлена!</h2><p class="message__text">В скором времени с вами свяжутся наши менеджеры</p></div>');
					thisForm.find("input[name='name']").val("");
					thisForm.find("input[name='phone']").val("");
					ym(22765531,'reachGoal','otpravitzayavku');
				}else{
					if( data.name ){
						thisForm.find("input[name='name']").addClass('error');
					}
					if( data.phone ){
						thisForm.find("input[name='phone']").addClass('error');
					}
				}
				thisForm.find("input[type='submit']").removeAttr('disabled').val("Отправить заявку");
			},
			error: function (data) {
				thisForm.find("input[type='submit']").removeAttr('disabled').val("Отправить заявку");
			}
		});
	});

	$('[data-fancybox="project"]').fancybox({
		buttons: [
			"zoom",
			//"share",
			// "slideShow",
			"fullScreen",
			//"download",
			//"thumbs",
			"close"
		],
		animationEffect: "fade",
	});
	$("#modal-form").on("submit", function(e){
		e.preventDefault();
		var dataForm = $(this).serialize();
		var thisForm = $(this);
		thisForm.find("input[type='submit']").attr("disabled", "disabled").val("идет отправка...");

		$.ajax({
			type: "POST",
			url: "/obrabotchik-formyi",
			data: dataForm,
			success: function (data) {
				var data = JSON.parse(data.trim());
				
				if(data.status == "success"){
					$.fancybox.close($("#modal-form"));
					$.fancybox.open('<div class="message"><h2 class="message__title">Ваша заявка успешно отправлена!</h2><p class="message__text">В скором времени с вами свяжутся наши менеджеры</p></div>');
					thisForm.find("input[name='name']").val("");
					thisForm.find("input[name='phone']").val("");
					ym(22765531,'reachGoal','ostavitzayavku');
				}else{
					if( data.name ){
						thisForm.find("input[name='name']").addClass('error');
					}
					if( data.phone ){
						thisForm.find("input[name='phone']").addClass('error');
					}
				}
				thisForm.find("input[type='submit']").removeAttr('disabled').val("Оставить заявку");
			},
			error: function (data) {
				thisForm.find("input[type='submit']").removeAttr('disabled').val("Оставить заявку");
			}
		});
	});

	$("input[name='file']").on("change", function(e) {
		e.preventDefault();

		const fileInput = $("input[name='file']");
		validateFile(fileInput, e);
	});

	// валидация прикрепляемого файла
	function validateFile(fileInput, e) {
		$('.file-error').text('');

		const sizeInput = fileInput[0].files[0].size,
			nameFile = fileInput[0].files[0].name,
			extensionFile = nameFile.substring(nameFile.lastIndexOf('.') + 1),
			sizeMax = 20,
			relType = ['doc', 'docx', 'pdf'];
		if(sizeInput > sizeMax * 1024 * 1024) {
			$('.form-vacancy__file-name').text('');
			$('.file-error').text(`Размер файла превышает ${sizeMax} Мбайт.`);
			return false;
		}

		let valid = false;

		for(let i = 0; i < relType.length; i++) {
			if(extensionFile === relType[i]) {
				valid = true;
			}
		}
		if (valid) {
			// вывод имени загружаемого в форме вакансии файла
			fileInput.parents('.form-vacancy__file-group').find('.form-vacancy__file-name').text(e.target.files[0].name);
		} else {
			$('.form-vacancy__file-input').val('');
			$('.form-vacancy__file-name').text('');
			$('.file-error').text(`Формат файла не поддерживается, допустимые форматы: Word и PDF`);
		}
	}

	$("#form-vacancy").on("submit", function(e){
		e.preventDefault();
		var dataForm = new FormData(this);
		var thisForm = $(this);
		thisForm.find("input[type='submit']").attr("disabled", "disabled").val("идет отправка...");

		ajaxFormVacancy(thisForm, dataForm);
	});

	// проверка введенных пользователем данных в поле с именем на корректность 
	$("input[data-name], input[name='surname'], input[name='name'], input[name='patronymic']").map(function(i, input) {
		$(input).on({
			input: function(){
				let val = input.value.replace(/[^a-zа-я _-]/gmi,''); //Если у регулярного выражения есть флаг g, то он возвращает массив всех совпадений
				$(input).val(val);
			},
			blur: function() {
				let val = input.value.trim();
				$(input).val(val);
				checkLength(val.length, input);
			}
		});
	});

	function checkLength(length, input){
		let msg = ((length != 0) && (length < 2))?"Имя должно быть не короче 2 символов":"";
		input.setCustomValidity(msg);
	}

	function ajaxFormVacancy(thisForm, dataForm) {
		$.ajax({
			type: "POST",
			url: "/obrabotchik-formyi-otpravki-rezyume",
			processData: false,
			contentType: false,
			data: dataForm,
			success: function (data) {
				var data = JSON.parse(data.trim());
				if(data.status == "success"){
					$.fancybox.open('<div class="message"><h2 class="message__title">Ваше резюме успешно отправлено!</h2><p class="message__text">В скором времени с вами свяжется сотрудник отдела кадров</p></div>');
					thisForm.find("input[name='surname']").val("");
					thisForm.find("input[name='name']").val("");
					thisForm.find("input[name='patronymic']").val("");
					thisForm.find("input[name='phone']").val("");
					thisForm.find("input[name='email']").val("");
					thisForm.find("textarea[name='letter']").val("");
					$(".form-vacancy__file-name").text("");
				}else{
					if( data.surname ){
						thisForm.find("input[name='surname']").addClass('error');
					}
					if( data.name ){
						thisForm.find("input[name='name']").addClass('error');
					}
					if( data.phone ){
						thisForm.find("input[name='phone']").addClass('error');
					}
					if( data.email ){
						thisForm.find("input[name='email']").addClass('error');
					}
					if( data.file ){
						$('.file-error').text(`Файл не соответствует требованиям`);
					}
				}
				thisForm.find("input[type='submit']").removeAttr('disabled').val("Отправить заявку");
			},
			error: function (data) {
			   thisForm.find("input[type='submit']").removeAttr('disabled').val("Отправить заявку");
			}
		});
	}
	
    // проставление маски на полe телефона
	(function (){
		let code = '+7',
			find = /\+7/;
		code = '+7';
		find = /\+7/;

	    $("body").on("focus", "input[data-phone]", function(){
	    	this.value = code+" " + this.value.replace(code+' ','');
	    });
	    $("body").on("input", "input[data-phone]", function(){
	    	let val = this.value.replace(find,''),
				res = code+" ";
			val = val.replace(/[^0-9]/g,'');

			for(let i =0;i<val.length;i++){
				res+= i===0?' (':'';
				res+= i==3?') ':'';
				res+= i==6 || i==8?' ':'';
				if(i==10) break;
				res+= val[i];
			}
			this.value = res;
	    });
	    $("body").on("blur", "input[data-phone]", function(){
	    	let val = this.value.replace(find,'');
			val = val.trim();
			if(!val) this.value = null;
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

	if (screen.width <= 1220 && !$("#slider").hasClass("slick-initialized")) {
		slickInit();
	}
});

function slickInit() {
	$('.slider__item').removeAttr('style');
	$('#slider-prev').unbind('click');
	$('#slider-next').unbind('click');

	$("#slider").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		appendArrows: $('.slider__arrows'),
		prevArrow: $('#slider-prev'),
		nextArrow: $('#slider-next'),
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'linear',
		responsive: [
			{
				breakpoint: 1221,
				settings: {
					slidesToShow: 3,
					fade: false,
				}
			},
			{
				breakpoint: 1013,
				settings: {
					slidesToShow: 2,
					fade: false,
				}
			},
			{
				breakpoint: 789,
				settings: {
					slidesToShow: 1,
					fade: true,
				}
			}
		]
	});
}

$(window).on('load', function(){
	//3D-слайдер
	if($("div").is("#slider")) {
		if(screen.width > 1220) {
			const carousel = $("#slider").waterwheelCarousel({
				flankingItems: 1,
				speed: 1000,
				edgeFadeEnabled: true,
				keyboardNav: true,
				linkHandling: 0,
				separation: 135,
			});
			window.carousel = carousel;
			$('#slider-prev').on('click', function () {
				carousel.prev();
				return false;
			});
			$('#slider-next').on('click', function () {
				carousel.next();
				return false;
			});
		}
	}
});

$(window).on("resize", function(){
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', vh + 'px');
	if (screen.width <= 1220 && !$("#slider").hasClass("slick-initialized")) {
		slickInit();
	}
});
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', vh + 'px');