/**
 * Base config for all plugins
 */
const jsConfig = {
	prevArrow: '',
	nextArrow: '<div class="btn btn-gallery"><svg class="icon icon-arrows"><use xlink:href="#icon-arrows"></use></svg></div>',
}




/**
 * Bootstrap form validation
 */
const forms = document.querySelectorAll('.needs-validation')

// Loop over them and prevent submission
Array.from(forms).forEach(form => {
	form.addEventListener('submit', event => {
		if (!form.checkValidity()) {
			event.preventDefault()
			event.stopPropagation()
		}

		form.classList.add('was-validated')
	}, false)
})




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
	pauseOnHover: 1
});

$('.js-gallery-social').slick({
	infinite: false,
	adaptiveHeight: false,
	dots: false,
	arrows: false,
	slidesToShow: 6,
	slidesToScroll: 3,
	// autoplay: true,
	infinite: true,
	pauseOnHover: 1
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