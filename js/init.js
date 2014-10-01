var restaurants = [{name:"Wendy's", lat:"", lng:"", vicinity:""}, {name:"McDonalds", lat:"", lng:"", vicinity:""},
					{name:"Chick-fil-a", lat:"", lng:"", vicinity:""}, {name:"Five Guys", lat:"", lng:"", vicinity:""},
	                {name:"Gold Star", lat:"", lng:"", vicinity:""}, {name:"La Mexicana", lat:"", lng:"", vicinity:""}, 
	                {name:"Chipotle", lat:"", lng:"", vicinity:""}, {name:"Tazza Mia", lat:"", lng:"", vicinity:""},
	                {name:"Panera", lat:"", lng:"", vicinity:""}, {name:"Just Crepes", lat:"", lng:"", vicinity:""}, 
	                {name:"Arby's", lat:"", lng:"", vicinity:""}, {name:"Indian", lat:"", lng:"", vicinity:""}];

$(document).ready(function() {
	drawRouletteWheel();

	if(params.length > 0){
		initLocation();
		proceed();
	}

	$('a.settings').click(function() {
		toggleSettings();
	});
	$('button#search').click(function() {
		searchUserDefined();
	});
	$('button#location-option-current').click(function() {
		$('.select-localisation').hide();
		$('.search-localisation').show();
		initLocation();
	});
	$('button#location-option-find').click(function() {		
		$('.select-localisation').hide();
		$('.panel-map').show();
		initialize();
	});
	$('button#localistion-failure').click(function() {
		proceed();
	});
	$('button#select-location').click(function() {
		$('button#select-location').html('<i class="fa fa-refresh fa-spin"></i>');
		params.lat = $('#latBox').val();
		params.long = $('#lngBox').val();
		initLocation();
	});
	$('button#spin').click(function() {
		spin();
	});
	$('canvas#confetti-world').click(function() {
		proceed();
	});
	$('input#shareLink').click(function() {
		$(this).select();
	});
});

function proceed() {
	$('.select-localisation').hide();
	$('.localisation').hide();
	$('.panel-map').hide();
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
	$('.clickme').hide();
}

function closeSettings() {
	if($('.settings-open')[0] !== undefined) {
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
					'type' : $('.settings input[type=radio]:checked').val(), 
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
