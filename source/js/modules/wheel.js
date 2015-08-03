module.exports = (function() {

  'use strict';

  var colours = require('../data/colours.js');
  var defaultRestaurants = require('../data/restaurants.js');
  var ResultLightbox = require('../lightboxes/resultLightbox.js');
  var Confetti = require('./confetti.js');

  /* Buttons */
  var SPIN_BUTTON = '#spin';

  function Wheel(selector) {

    var canvas = document.getElementById(selector);

    if(!canvas.getContext) {
      return;
    }

    this.data = {
      canvas: canvas,
      restaurants: defaultRestaurants,
      width: 600,
      height: 600,
      startAngle: 0,
      spinTimeout: null,
      isSpinning: false,
      spinArcStart: 10,
      spinTime: 0,
      spinTimeTotal: 0,
      spinVelocity: 2000,
      ctx: null,
      rouletteWheel: {},
      outsideRadius: 250,
      textRadius: 194,
      insideRadius: 150,
      angle: null,
      text: null
    }

    this.init();
  }

  Wheel.prototype.init = function() {
    this.data.ctx = this.data.canvas.getContext("2d");
    this.data.ctx.clearRect(0, 0, this.data.width, this.data.height);
    this.data.ctx.strokeStyle = "black";
    this.data.ctx.font = "12px Helvetica, Arial";
    this.data.arc = Math.PI / (this.data.restaurants.length / 2);

    this.draw();
    this.addEvents();
  }

  Wheel.prototype.addEvents = function() {
    var self = this;

    $(SPIN_BUTTON).on('click', function() {
      if(!self.retIsSpinning()) {
  			self.spin(true);
  		}
    });
  };

  Wheel.prototype.draw = function() {
    var self = this;
    this.data.ctx.clearRect(0, 0, this.data.width, this.data.height);
    this.data.restaurants.forEach(function(restaurant, i) {
      /* Render Segment */
      self.data.angle = self.data.startAngle + i * self.data.arc;
      self.data.ctx.fillStyle = colours.bgColour[i];

      self.data.ctx.beginPath();
      self.data.ctx.arc(self.data.width / 2, self.data.height / 2, self.data.outsideRadius, self.data.angle, self.data.angle + self.data.arc, false);
      self.data.ctx.arc(self.data.width / 2, self.data.height / 2, self.data.insideRadius, self.data.angle + self.data.arc, self.data.angle, true);
      self.data.ctx.fill();

      self.data.ctx.save();

      /* Render Text */
      self.data.ctx.fillStyle = colours.fontColour[i];
      self.data.ctx.translate(self.data.width / 2 + Math.cos(self.data.angle + self.data.arc /2) * self.data.textRadius,
          self.data.height / 2 + Math.sin(self.data.angle + self.data.arc / 2) * self.data.textRadius);
      self.data.ctx.rotate(self.data.angle + self.data.arc / 2 + Math.PI / 2);
      self.printName(restaurant.name, -self.data.ctx.measureText(restaurant.name).width / 2, 0, 14, ((2 * Math.Pi * self.data.textRadius) / self.data.restaurants.length) - 10);
      self.data.ctx.restore();
    });
    this.drawArrow();
  };

  Wheel.prototype.drawArrow = function() {
    this.data.ctx.fillStyle = "#333";
    this.data.ctx.beginPath();
		this.data.ctx.moveTo(this.data.width / 2  - 4, this.data.height / 2  - (this.data.outsideRadius + 25));
		this.data.ctx.lineTo(this.data.width / 2 + 4, this.data.height / 2  - (this.data.outsideRadius + 25));
		this.data.ctx.lineTo(this.data.width / 2 + 4, this.data.height / 2  - (this.data.outsideRadius + 15));
		this.data.ctx.lineTo(this.data.width / 2 + 9, this.data.height / 2  - (this.data.outsideRadius + 15));
		this.data.ctx.lineTo(this.data.width / 2 + 0, this.data.height / 2  - (this.data.outsideRadius - 0));
		this.data.ctx.lineTo(this.data.width / 2 - 9, this.data.height / 2  - (this.data.outsideRadius + 15));
		this.data.ctx.lineTo(this.data.width / 2 - 4, this.data.height / 2  - (this.data.outsideRadius + 15));
		this.data.ctx.lineTo(this.data.width / 2 - 4, this.data.height / 2 - (this.data.outsideRadius + 25));
		this.data.ctx.fill();
  };

  Wheel.prototype.spin = function(isForward) {
    this.data.spinAngleStart = Math.random() * 10 + 10;
    this.data.spinTime = 0;
    this.data.spinTimeTotal = Math.random() * 3 + 4 * this.data.spinVelocity;

    if(!this.data.isSpinning && isForward) {
      this.data.isSpinning = true;
      this.rotate(true);
    } else if (!this.data.isSpinning && !isForward) {
      this.data.isSpinning = true;
      this.rotate(false);
    }
  };

  Wheel.prototype.retIsSpinning = function() {
    return this.data.isSpinning;
  };

  Wheel.prototype.addToStartAngle = function(angle) {
    this.data.startAngle += angle;
  };

  Wheel.prototype.rotate = function(isForward) {
    var self = this;
    this.data.spinTime += 30;
    if(this.data.spinTime >= this.data.spinTimeTotal) {
      this.stopRotate();
      this.data.isSpinning = false;
      return;
    }
    var spinAngle = this.data.spinAngleStart - this.easeOut(this.data.spinTime, 0, this.data.spinAngleStart, this.data.spinTimeTotal);
    if(isForward) {
      this.data.startAngle += (spinAngle * Math.PI / 180);
    } else {
      this.data.startAngle -= (spinAngle * Math.PI / 180);
    }
    this.draw();
    this.data.spinTimeout = setTimeout(function() {
      self.rotate(isForward);
    }, 30);
  };

  Wheel.prototype.stopRotate = function() {
    clearTimeout(this.data.spinTimeout);
    var degrees = this.data.startAngle * 180 / Math.PI + 90,
      arcd = this.data.arc * 180 / Math.PI,
      index = Math.floor((360 - degrees % 360) / arcd);
    this.data.ctx.save();

    if(degrees < 0) {
      degrees = Math.abs(degrees);
      index = Math.floor((degrees % 360) / arcd);
    }

    var resultName = this.data.restaurants[index].name.split(' ').join('+'),
      mapURL = "http://maps.google.com/maps/dir/",
			originCoords = WOL.app.geolocation.position.latitude + "," + WOL.app.geolocation.position.longitude;

    /* Display Result */
    //WOL.app.lightboxes.result = new ResultLightbox();

    this.data.ctx.restore();

    //WOL.app.confetti = new Confetti();
  };

  Wheel.prototype.printName = function(text, x, y, lineHeight, fitWidth) {
    var str, splitDash, headText, tailText, idx;
    fitWidth = fitWidth || 0;

    if(fitWidth <= 0) {
      this.data.ctx.fillText(text, x, y);
      return;
    }

    for(idx = 1; idx <= text.length; idx++) {
      str = text.substr(0, idx);

      if(this.data.ctx.measureText(str).width > fitWidth) {
        splitDash = (text.charAt(idx - 2) != " ") ? "-" : "";
        headText = text.substr(0, idx - 1) + splitDash;
        tailText = text.substr(idx - 1);
        this.data.ctx.fillText(headText, -this.data.ctx.measureText(headText).width / 2, y - lineHeight);
        this.printName(tailText, -this.data.ctx.measureText(tailText).width / 2, y + lineHeight, lineHeight, fitWidth - 10);
        return;
      }
    }

    this.data.ctx.fillText(text, x, (y ? y - lineHeight : y));
  };

  Wheel.prototype.easeOut = function(t, b, c, d) {
    var ts = (t /= d) * t;
    var tc = ts * t;

    return b + c * (tc + -3 * ts + 3 * t);
  };

  Wheel.prototype.setRestaurants = function(restaurants) {
    this.data.restaurants = restaurants;
    this.data.arc = Math.PI / (this.data.restaurants.length / 2);
  };

  return Wheel;
}());
