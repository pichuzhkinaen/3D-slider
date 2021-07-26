$(document).ready(function(){

	// home-slider start
	const dotBtn = $('.slider__dots-button'),
		  sliderItem = $('.slider__item');
	let currentSlide = $('.slider__item:eq(0)');

	$('.slider__dots-button:eq(0)').addClass('active');

	$(sliderItem).css('zIndex', 0);
	$(currentSlide).css('zIndex', 1);

	$(sliderItem).on('click', function() {
		currentSlide = this;
		let slideIndex = $(currentSlide).index();
		animationSlider(currentSlide, slideIndex);
	});

	$('.slider__dots-item').on('click', function() {
		$(dotBtn).removeClass('active');
		$(this).children($(dotBtn)).addClass('active');
		
		const dotIndex = $(this).index();

		currentSlide = $(sliderItem).filter(function () { 
			return $(this).css('zIndex') > 0; 
		});
		// console.log(currentSlide);

		animationSliderDot(dotIndex, currentSlide);
	});
	
	function animationSliderDot(dotIndex, currentSlide) {
		$(currentSlide).css('zIndex', 1);
		$(sliderItem).eq(dotIndex).css('zIndex', 2).addClass('animate');

		setTimeout (function() {
			$(sliderItem).css('zIndex', 0).removeClass('animate');
			$(sliderItem).eq(dotIndex).css('zIndex', 2).addClass('animate');
		}, 1000);

	}

	function animationSlider(currentSlide, slideIndex) {
		// console.log(currentSlide);
		
		if ($(currentSlide).next().length === 0) {
			$(currentSlide).removeClass('animate');
			$(sliderItem).css('zIndex', 0);
			$(sliderItem).eq(0).css('zIndex', 1).addClass('animate');

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
	// home-slider end
});