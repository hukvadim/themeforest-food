/**
 * Base config for all plugins
 */
const jsConfig = {
	prevArrow: '',
	nextArrow: '<div class="btn btn-gallery"><svg class="icon icon-arrows"><use xlink:href="#icon-arrows"></use></svg></div>',
}




/**
 * 	Use slick
 */
$('.js-gallery-single-img').slick({
	infinite: false,
	adaptiveHeight: true,
	dots: true,
	arrows: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	prevArrow: jsConfig.prevArrow,
	nextArrow: jsConfig.nextArrow,
});




/**
 * Call-sidebar
 */
$(document).on('click', '.js-call-sidebar', function(e) {
	e.preventDefault();
	$('body').toggleClass('toggle-sidebar');
});
$(document).keydown(function(e){
	if (e.keyCode == 27) // if ESC toggle class
		$('body').toggleClass('toggle-sidebar');
});