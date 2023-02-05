/**
 * Base config for all plugins
 */
const jsConfig = {
	prevArrow: '<div class="btn btn-light btn-icon btn-gallery btn-gallery-prev abs-center-y-left z-2"><svg class="icon icon-arrow icon-36"><use xlink:href="#icon-chevron-left"></use></svg></div>',
	nextArrow: '<div class="btn btn-light btn-icon btn-gallery btn-gallery-next abs-center-y-right z-2"><svg class="icon icon-arrow icon-36"><use xlink:href="#icon-chevron-right"></use></svg></div>',
}


/**
 * Does not call the script several times
 */
let waitForFinalEvent = (function() {
	let timers = {};
	return function(callback, ms, uniqueId) {
		if (!uniqueId) uniqueId = "Does not call twice without a unique identifier";

		if (timers[uniqueId])
			clearTimeout(timers[uniqueId]);

		timers[uniqueId] = setTimeout(callback, ms);
	};
})();


/**
 * Tooltips
 */
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
	return new bootstrap.Tooltip(tooltipTriggerEl)
})


/**
 * Toasts are lightweight notifications 
 */
$(document).on('click', '[data-bs-toast]', function(event) {
	$($(this).data('bs-toast')).show();
});



/**
 * Bootstrap form validation
 */
const forms = document.querySelectorAll('.needs-validation')

// Loop over them and prevent submission
if (forms.length > 0) {
	Array.from(forms).forEach(form => {
		form.addEventListener('submit', event => {
			if (!form.checkValidity()) {
				event.preventDefault()
				event.stopPropagation()
			}

			form.classList.add('was-validated')
		}, false)
	})
}



/**
 * Textarea autogrow
 */
!function(t,e,i,n){function s(e,i){this.element=e,this.$element=t(e),this.init()}var h="textareaAutoSize",o="plugin_"+h,r=function(t){return t.replace(/\s/g,"").length>0};s.prototype={init:function(){var i=parseInt(this.$element.css("paddingBottom"))+parseInt(this.$element.css("paddingTop"))+parseInt(this.$element.css("borderTopWidth"))+parseInt(this.$element.css("borderBottomWidth"))||0;r(this.element.value)&&this.$element.height(this.element.scrollHeight+2-i),this.$element.on("input keyup",function(n){var s=t(e),h=s.scrollTop();t(this).height(0).height(this.scrollHeight+2-i),s.scrollTop(h)})}},t.fn[h]=function(e){return this.each(function(){t.data(this,o)||t.data(this,o,new s(this,e))}),this}}(jQuery,window,document);

// Initialize Textarea
$('textarea.autogrow').textareaAutoSize();



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




/**
 * Search in list
 */
$(".js-search-input").on("keyup keydown change submit search click", function() {

	// Config
	const searchInput = $(this),
		searchVal   = searchInput.val().toLowerCase().trim(),
		searchFor   = searchInput.data('for'),
		searchEmpty = searchInput.data('search-empty'),
		searchEl    = searchInput.data('search-el'),
		classHide   = 'd-none';

	// Call the code with a delay
	waitForFinalEvent(function() {

		// Select all the records to count them and go through them later
		const items = $(searchFor + ' ' + searchEl);

		// We go through all the elements
		$(items).each(function() {

			// Save the element for reuse
			const el = $(this);

			// Select text from the element to check
			const elText = el.text().trim().toLowerCase().indexOf(searchVal);

			// If there is nothing then hide all elements and if necessary show the text "No results"
			if (elText != '-1')
				el.removeClass(classHide);
			else
				el.addClass(classHide);

			// Label for output "no results found"
			let numHiddenItems = $(searchFor + ' ' + searchEl + '.' + classHide).length;

			// Show or hide text "no results found"
			if (searchEmpty != 'undefined') {
				if (items.length == numHiddenItems) {

					// Show "no results"
					$(searchEmpty).removeClass('d-none');
				} else {

					// Hide "no results"
					$(searchEmpty).addClass('d-none');
				}
			}
		});
	}, 400);
});




