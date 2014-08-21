var restaurants = new Array(12);

$(document).ready(function() {
});

function proceed() {
	$('.localisation').hide();
    unblurBackground();
}

function blurBackground() {
	$('.unblur').removeClass('unblur').addClass('blur');
}

function unblurBackground() {
	$('.blur').removeClass('blur').addClass('unblur');
}