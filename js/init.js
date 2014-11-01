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
	$('#search, #settings-search').click(function() {
		searchUserDefined();
	});
	$('#location-option-current').click(function() {
		$('.select-localisation').hide();
		$('.search-localisation').show();
		initLocation();
	});
	$('#location-option-find').click(function() {		
		$('.select-localisation').hide();
		$('.panel-map').show();
		initialize();
	});
	$('#localistion-failure').click(function() {
		proceed();
	});
	$('#select-location').click(function() {
		$(this).html('<i class="fa fa-refresh fa-spin"></i>');
		params.lat = $('#latBox').val();
		params.long = $('#lngBox').val();
		initLocation();
	});
	$('#spin').click(function() {
		spin();
	});
	$('#confetti-world').click(function() {
		proceed();
	});
	$('#shareLink').click(function() {
		$(this).select();
	});
	$('#new-location').click(function() {
		reset();
		params.lat = undefined;
		params.long = undefined;
		blurBackground();
		$('.select-localisation').show();
	});
});

function proceed() {
	$('.select-localisation').hide();
	$('.localisation').hide();
	$('.panel-map').hide();
	$('.result').hide();
	
	//Clear google maps
	$('#search').val('');
	$('#select-location').text('Select Location');
	
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
	var url = window.location.origin + window.location.pathname,
		params = {
			lat: $('#latitude').val(),
			long: $('#longitude').val(),
			radius: $('#radius').val(),
			type: $('.settings input[type=radio]:checked').val(),
			maxplaces: $('#maxPlaces').val()
		};
	
	return url + '?' + $.param(params);
}
