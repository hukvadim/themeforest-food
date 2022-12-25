/**
 * Base config for all plugins
 */
const jsConfig = {
	prevArrow: '<div class="btn btn-light btn-icon btn-gallery btn-gallery-prev abs-center-y-left z-2"><svg class="icon icon-arrow icon-36"><use xlink:href="#icon-chevron-left"></use></svg></div>',
	nextArrow: '<div class="btn btn-light btn-icon btn-gallery btn-gallery-next abs-center-y-right z-2"><svg class="icon icon-arrow icon-36"><use xlink:href="#icon-chevron-right"></use></svg></div>',
}


/**
 * Tooltips
 */
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

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