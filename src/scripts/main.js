$(document).ready(function(){

	$('.select-language__title').on('click', function() {
		if ($('.select-language__list').hasClass('active')) {
			$('.select-language__list').removeClass('active');
		} else {
			$('.select-language__list').addClass('active');
		}
	});

	$('.select-language__item').on('click', function() {
		const value = $(this).attr('data-value');
		$('.select-language__title').html(value);
		$('.select-language__list').removeClass('active');
	});

	$('#slider').slick({
		arrows: false,
		dots: true,
		// touchMove: true,
		focusOnSelect: true,
	});
	
	
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
});

$(window).on("resize", function(){
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', vh + 'px');
});
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', vh + 'px');