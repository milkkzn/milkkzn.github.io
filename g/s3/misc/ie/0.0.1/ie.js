$(function() {

	if ($.fn.placeholder) {
		$('input, textarea').placeholder();
	}
	
	if ($.fn.textshadow) {
		$('.text-shadow').textshadow({useStyle: false, numShadows: 1});
	}
	
});