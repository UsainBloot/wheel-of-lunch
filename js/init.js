var restaurants = new Array(12);

$(document).ready(function() {
});

function proceed() {
	$('.localisation').hide();
	$('.result').hide();
	
	//Clear confetti canvas
	var confetti = document.getElementById('confetti-world');
	confetti.width = confetti.width;
	$('#confetti-world').hide();
	
    unblurBackground();
}

function blurBackground() {
	$('.unblur').removeClass('unblur').addClass('blur');
}

function unblurBackground() {
	$('.blur').removeClass('blur').addClass('unblur');
}