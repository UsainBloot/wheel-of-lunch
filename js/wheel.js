var colors = ["#B8D430", "#3AB745", "#029990", "#3501CB",
             "#2E2C75", "#673A7E", "#CC0071", "#F80120",
             "#F35B20", "#FB9A00", "#FFCC00", "#FEF200"];
             
var restaurants;

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
	var outsideRadius = 200;
	var textRadius = 154;
	var insideRadius = 120;
	
	ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,500,500);
	
	
	ctx.strokeStyle = "black";
	ctx.font = "12px Helvetica, Arial";
	
	
	//Draw circle
	for(var i = 0; i < restaurants.length; i++) {
		var angle = startAngle + i * arc;
		ctx.fillStyle = colors[i];
		
		ctx.beginPath();
		ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
		ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
		ctx.fill();
		
		ctx.save();
		
		//Render text
		ctx.fillStyle = "#333";
		ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 
		            250 + Math.sin(angle + arc / 2) * textRadius);
		ctx.rotate(angle + arc / 2 + Math.PI / 2);
		var text = restaurants[i];
		ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
		ctx.restore();
	} 
	
	//Arrow
	ctx.fillStyle = "#333";
	ctx.beginPath();
	ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
	ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
	ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
	ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
	ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
	ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
	ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
	ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
	ctx.fill();
	}
}

function spin() {	
	spinAngleStart = Math.random() * 10 + 10;
	spinTime = 0;
	spinTimeTotal = Math.random() * 3 + 4 * spinVelocity;
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
	ctx.font = '24px Helvetica, Arial';
	var text = restaurants[index]
	ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
	ctx.restore();
	
	//Start confetti
	$('canvas#confetti-world').show();
	init();
}

function easeOut(t, b, c, d) {
	var ts = (t/=d)*t;
	var tc = ts*t;
	return b+c*(tc + -3*ts + 3*t);
}