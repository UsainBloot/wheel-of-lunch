var restaurants = new Array(12);

$(document).ready(function() {
	$('a.settings').click(function() {
		toggleSettings();
	});
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

function toggleSettings() {
	if($('.settings-open')[0] == undefined) {
		$('.settings').addClass('settings-open');
	} else {
		$('.settings').removeClass('settings-open');
	}
}

function closeSettings() {
	if($('.settings-open')[0] != undefined) {
		$('.settings').removeClass('settings-open');
	}
}