var restaurants = [{name:"Wendy's", lat:"", lng:"", vicinity:""}, {name:"McDonalds", lat:"", lng:"", vicinity:""},
					{name:"Chick-fil-a", lat:"", lng:"", vicinity:""}, {name:"Five Guys", lat:"", lng:"", vicinity:""},
	                {name:"Gold Star", lat:"", lng:"", vicinity:""}, {name:"La Mexicana", lat:"", lng:"", vicinity:""}, 
	                {name:"Chipotle", lat:"", lng:"", vicinity:""}, {name:"Tazza Mia", lat:"", lng:"", vicinity:""},
	                {name:"Panera", lat:"", lng:"", vicinity:""}, {name:"Just Crepes", lat:"", lng:"", vicinity:""}, 
	                {name:"Arby's", lat:"", lng:"", vicinity:""}, {name:"Indian", lat:"", lng:"", vicinity:""}];

$(document).ready(function() {
    var isDragging = false;
	var previousDragX, previousDragY, currentDragX, currentDragY, clickedX, clickedY;
	var arcAngle = 0;
	var changedAngle = 0;

	rouletteWheel.draw();

	if(params.length > 0){
		initLocation();
		proceed();
	}

	$('a.settings').click(function() {
		toggleSettings();
	});
	$('#settings-search').click(function() {
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
		if(!rouletteWheel.retIsSpinning()) {
			rouletteWheel.spin(true);
		}
	});
	$('#wheel').mousedown(function(e) {
		clickedX = e.pageX;
		clickedY = e.pageY;
		//set up the first instance of previous drag
		previousDragX = e.pageX;
		previousDragY = e.pageY;
		isDragging = true;
	});
	$('#wheel').mousemove(function(e) {
		if(isDragging && !rouletteWheel.retIsSpinning()) {
			currentDragX = e.pageX;
			currentDragY = e.pageY;

			//finding the movement from the last drag
			changedAngle = Math.atan2(currentDragY - $('#spin').position().top, currentDragX - $('#spin').position().left);
			changedAngle -= Math.atan2(previousDragY - $('#spin').position().top, previousDragX - $('#spin').position().left);

			//recalculating the arc from when the mouse was firsted click -- used to indicate a 'spin'
			arcAngle = Math.atan2(currentDragY - $('#spin').position().top, currentDragX - $('#spin').position().left);
			arcAngle -= Math.atan2(clickedY - $('#spin').position().top, clickedX - $('#spin').position().left);


			//add whatever the angle has changed by from the last movement of the mouse
			rouletteWheel.addToStartAngle(changedAngle);
			rouletteWheel.draw(true);

			//update the previous with the current coordinate of the mouse
			previousDragY = currentDragY;
			previousDragX = currentDragX;
		} 
	});
	$('#wheel').mouseup(function(e) {
		if((arcAngle >= 0.5) && !rouletteWheel.retIsSpinning() && changedAngle > 0) { // a minimum delta of rad = 0.5 required to drag around the wheel to count as a 'spin' 
			rouletteWheel.spin(true);
		} else if((arcAngle < -4) && !rouletteWheel.retIsSpinning() && changedAngle > 0) {
			rouletteWheel.spin(true);
		} else if((arcAngle <= -0.5) && !rouletteWheel.retIsSpinning() && changedAngle < 0) {
			rouletteWheel.spin(false);
		} else if((arcAngle > 4) && !rouletteWheel.retIsSpinning() && changedAngle < 0) {
			rouletteWheel.spin(false);
		} 
		isDragging = false;
	});
	$('#wheel').mouseout(function(e) {
		isDragging = false;
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
	
	// Start confetti - will still be hidden
	window.init();
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
