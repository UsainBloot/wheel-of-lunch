var restaurants = [{name:"Wendy's", lat:"", lng:"", vicinity:""}, {name:"McDonalds", lat:"", lng:"", vicinity:""},
					{name:"Chick-fil-a", lat:"", lng:"", vicinity:""}, {name:"Five Guys", lat:"", lng:"", vicinity:""},
	                {name:"Gold Star", lat:"", lng:"", vicinity:""}, {name:"La Mexicana", lat:"", lng:"", vicinity:""}, 
	                {name:"Chipotle", lat:"", lng:"", vicinity:""}, {name:"Tazza Mia", lat:"", lng:"", vicinity:""},
	                {name:"Panera", lat:"", lng:"", vicinity:""}, {name:"Just Crepes", lat:"", lng:"", vicinity:""}, 
	                {name:"Arby's", lat:"", lng:"", vicinity:""}, {name:"Indian", lat:"", lng:"", vicinity:""}];

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
    generateShareLink();
}

function blurBackground() {
	$('.unblur').removeClass('unblur').addClass('blur');
}

function unblurBackground() {
	$('.blur').removeClass('blur').addClass('unblur');
}

function toggleSettings() {
	$('.settings').toggleClass('settings-open');
}

function closeSettings() {
	if($('.settings-open')[0] != undefined) {
		$('.settings').removeClass('settings-open');
	}
}

function generateShareLink() {
	$('#shareLink').val(createURL());
}

function createURL() {
	var url = window.location.href.slice(0, window.location.href.indexOf('?')) + "?";
	var params = { 'lat': $('#latitude').val(), 
					'long':  $('#longitude').val(), 
					'radius': $('#radius').val(), 
					'maxplaces': $('#maxPlaces').val() };
	
	for(var key in params) {
		if (params[key].length > 0) {
			if(url.substr(url.length - 1) == "?") {
				url += key + "=" + params[key];
			} else {
				url += "&" + key + "=" + params[key];
			}
		}
	}
	return url;	
}
