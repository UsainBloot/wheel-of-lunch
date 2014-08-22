var colours = { bgColour: ["#B8D430", "#3AB745", "#029990", "#3501CB",
			             "#2E2C75", "#673A7E", "#CC0071", "#F80120",
			             "#F35B20", "#FB9A00", "#FFCC00", "#FEF200"],
				fontColour: ["#333", "#333", "#333", "#FFF",
							"#FFF", "#FFF", "#FFF", "#333",
							"#333", "#333", "#333", "#333"]};

var width = 600;
var height = 600;
var halfWidth = width / 2;
var halfHeight = width / 2;

var startAngle = 0;
var arc = Math.PI / (restaurants.length / 2);
var spinTimeout = null;

var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;

var spinVelocity = 2000;

var ctx;

function drawRouletteWheel() {
	var canvas = document.getElementById("wheel");
	if (canvas.getContext) {
	var outsideRadius = 250;
	var textRadius = 194;
	var insideRadius = 150;
	
	ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,width,height);
	
	
	ctx.strokeStyle = "black";
	ctx.font = "12px Helvetica, Arial";
	
	
	//Draw circle
	for(var i = 0; i < restaurants.length; i++) {
		var angle = startAngle + i * arc;
		ctx.fillStyle = colours.bgColour[i];
		
		ctx.beginPath();
		ctx.arc(halfWidth, halfHeight, outsideRadius, angle, angle + arc, false);
		ctx.arc(halfWidth, halfHeight, insideRadius, angle + arc, angle, true);
		ctx.fill();
		
		ctx.save();
		
		//Render text
		ctx.fillStyle = colours.fontColour[i];
		ctx.translate(halfWidth + Math.cos(angle + arc / 2) * textRadius, 
		            halfHeight + Math.sin(angle + arc / 2) * textRadius);
		ctx.rotate(angle + arc / 2 + Math.PI / 2);
		var text = restaurants[i];
		ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
		ctx.restore();
	} 
	
	//Arrow
	ctx.fillStyle = "#333";
	ctx.beginPath();
	ctx.moveTo(halfWidth - 4, halfHeight - (outsideRadius + 25));
	ctx.lineTo(halfWidth + 4, halfHeight - (outsideRadius + 25));
	ctx.lineTo(halfWidth + 4, halfHeight - (outsideRadius + 15));
	ctx.lineTo(halfWidth + 9, halfHeight - (outsideRadius + 15));
	ctx.lineTo(halfWidth + 0, halfHeight - (outsideRadius - 0));
	ctx.lineTo(halfWidth - 9, halfHeight - (outsideRadius + 15));
	ctx.lineTo(halfWidth - 4, halfHeight - (outsideRadius + 15));
	ctx.lineTo(halfWidth - 4, halfHeight - (outsideRadius + 25));
	ctx.fill();
	}
}

function spin() {	
	spinAngleStart = Math.random() * 10 + 10;
	spinTime = 0;
	spinTimeTotal = Math.random() * 3 + 4 * spinVelocity;
	closeSettings();
	rotateWheel();
}

function rotateWheel() {
	spinTime += 30;
	if(spinTime >= spinTimeTotal) {
		stopRotateWheel();
		return;
	}
	var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
	startAngle += (spinAngle * Math.PI / 180);
	drawRouletteWheel();
	spinTimeout = setTimeout('rotateWheel()', 30);
}

function stopRotateWheel() {
	clearTimeout(spinTimeout);
	var degrees = startAngle * 180 / Math.PI + 90;
	var arcd = arc * 180 / Math.PI;
	var index = Math.floor((360 - degrees % 360) / arcd);
	ctx.save();
	//ctx.font = '24px Helvetica, Arial';
	var result = restaurants[index];
	$('.result h2').html(result);
	//ctx.fillText(text, halfWidth - ctx.measureText(text).width / 2, halfHeight + 12);
	ctx.restore();
	
	//Start confetti
	$('.result').show();
	blurBackground();
	$('canvas#confetti-world').show();
	init();
}

function easeOut(t, b, c, d) {
	var ts = (t/=d)*t;
	var tc = ts*t;
	return b+c*(tc + -3*ts + 3*t);
}