!function t(a,i,n){function e(s,r){if(!i[s]){if(!a[s]){var d="function"==typeof require&&require;if(!r&&d)return d(s,!0);if(o)return o(s,!0);var l=new Error("Cannot find module '"+s+"'");throw l.code="MODULE_NOT_FOUND",l}var c=i[s]={exports:{}};a[s][0].call(c.exports,function(t){var i=a[s][1][t];return e(i?i:t)},c,c.exports,t,a,i,n)}return i[s].exports}for(var o="function"==typeof require&&require,s=0;s<n.length;s++)e(n[s]);return e}({1:[function(t,a,i){a.exports=function(){"use strict";return{bgColour:["#B8D430","#3AB745","#029990","#3501CB","#2E2C75","#673A7E","#CC0071","#F80120","#F35B20","#FB9A00","#FFCC00","#FEF200"],fontColour:["#333","#333","#333","#FFF","#FFF","#FFF","#FFF","#333","#333","#333","#333","#333"]}}()},{}],2:[function(t,a,i){a.exports=function(){"use strict";return[{name:"Wendy's",lat:"",lng:"",vicinity:""},{name:"McDonalds",lat:"",lng:"",vicinity:""},{name:"Chick-fil-a",lat:"",lng:"",vicinity:""},{name:"Five Guys",lat:"",lng:"",vicinity:""},{name:"Gold Star",lat:"",lng:"",vicinity:""},{name:"La Mexicana",lat:"",lng:"",vicinity:""},{name:"Chipotle",lat:"",lng:"",vicinity:""},{name:"Tazza Mia",lat:"",lng:"",vicinity:""},{name:"Panera",lat:"",lng:"",vicinity:""},{name:"Just Crepes",lat:"",lng:"",vicinity:""},{name:"Arby's",lat:"",lng:"",vicinity:""},{name:"Indian",lat:"",lng:"",vicinity:""}]}()},{}],3:[function(t,a,i){!function(){"use strict";window.WOL=t("./wheel-of-lunch.js");t("./pages/global.js"),t("./pages/main.js")}()},{"./pages/global.js":14,"./pages/main.js":15,"./wheel-of-lunch.js":16}],4:[function(t,a,i){a.exports=function(a){"use strict";function i(){this.elems={id:e,root:null},this.init()}var n=t("../../templates/localisation-error.html"),e="#localisation-error",o="#localisation-continue-button";return i.prototype.init=function(){this.addWindow()},i.prototype.addWindow=function(){a("body").prepend(n),this.elems.root=a(e),this.addEvents()},i.prototype.closeWindow=function(){this.elems.root.remove()},i.prototype.addEvents=function(){var t=this;a(o).on("click",function(){t.closeWindow()})},i}(jQuery)},{"../../templates/localisation-error.html":17}],5:[function(t,a,i){a.exports=function(a){"use strict";function i(){this.elems={id:o,root:null},this.init()}var n=t("../modules/geolocation.js"),e=t("../../templates/localisation-loading.html"),o="#geolocation";return i.prototype.init=function(){this.addWindow()},i.prototype.addWindow=function(){a("body").prepend(e),this.elems.root=a(o),this.getLocation()},i.prototype.closeWindow=function(){this.elems.root.remove()},i.prototype.getLocation=function(){var t=this;WOL.app.geolocation=new n(function(){t.closeWindow()})},i}(jQuery)},{"../../templates/localisation-loading.html":18,"../modules/geolocation.js":10}],6:[function(t,a,i){a.exports=function(a){"use strict";function i(){this.elems={id:s,root:null},this.init()}var n=t("./geolocationLightbox.js"),e=t("./mapLightbox.js"),o=t("../../templates/localisation.html"),s="#localisation",r="#location-option-current",d="#location-option-find";return i.prototype.init=function(){this.addWindow()},i.prototype.addWindow=function(){a("body").prepend(o),this.elems.root=a(s),this.addEvents()},i.prototype.closeWindow=function(){this.elems.root.remove()},i.prototype.addEvents=function(){var t=this;a(r).on("click",function(){t.showCurrentLocationLightbox(),t.closeWindow()}),a(d).on("click",function(){t.showFindLocationLightbox(),t.closeWindow()})},i.prototype.showCurrentLocationLightbox=function(){WOL.app.lightbox.Geolocation=new n},i.prototype.showFindLocationLightbox=function(){WOL.app.lightbox.Map=new e},i}(jQuery)},{"../../templates/localisation.html":19,"./geolocationLightbox.js":5,"./mapLightbox.js":7}],7:[function(t,a,i){a.exports=function(){"use strict";function t(){}return t}()},{}],8:[function(t,a,i){a.exports=function(){"use strict";function t(){}return t}()},{}],9:[function(t,a,i){a.exports=function(){"use strict"}()},{}],10:[function(t,a,i){a.exports=function(){"use strict";function a(t){this.callback=t,this.position={},this.options={enableHighAccuracy:!0,maximumAge:0},this.getLocation()}var i=t("./places.js"),n=t("../lightboxes/errorLocationLightbox.js");return a.prototype.getLocation=function(){navigator.geolocation.getCurrentPosition(this.success,this.error,this.options)},a.prototype.success=function(t){WOL.app.geolocation.position=t.coords,WOL.app.places=new i({latitude:WOL.app.geolocation.position.latitude,longitude:WOL.app.geolocation.position.longitude}),WOL.app.geolocation.callback()},a.prototype.error=function(t){WOL.app.geolocation.callback(),WOL.app.lightbox.NoLocationLightbox=new n},a.prototype.closeParentWindow=function(){this.elems.parentRoot.remove()},a}()},{"../lightboxes/errorLocationLightbox.js":4,"./places.js":12}],11:[function(t,a,i){arguments[4][9][0].apply(i,arguments)},{dup:9}],12:[function(t,a,i){a.exports=function(){"use strict";function t(t){this.options={radius:300,radiusIncrement:50,placeType:"restaurant",maxPlaces:12,initialPlaces:12},this.userOptions=t,this.restaurants={},this.init(),this.getPlaces(this.options)}var a="http://www.jack-palmer.co.uk/wheel/api/getPlaces/";return t.prototype.init=function(){"undefined"!=typeof this.userOptions.latitude&&(this.options.latitude=this.userOptions.latitude),"undefined"!=typeof this.userOptions.longitude&&(this.options.longitude=this.userOptions.longitude),"undefined"!=typeof this.userOptions.radius&&(this.options.radius=this.userOptions.radius),"undefined"!=typeof this.userOptions.placeType&&(this.options.placeType=this.userOptions.placeType),"undefined"!=typeof this.userOptions.maxPlaces&&(this.options.maxPlaces=this.userOptions.maxPlaces)},t.prototype.getPlaces=function(t){var i=this;$.getJSON(a+this.buildQueryParams(),function(a){return 0===a.length?void i.error():void(a.length<t.initialPlaces&&t.radius<3e3?i.expandSearchRadius(a,t):i.success(a))})},t.prototype.buildQueryParams=function(){return"?latitude="+this.options.latitude+"&longitude="+this.options.longitude+"&radius="+this.options.radius+"&type="+this.options.placeType+"&maxplaces="+this.options.maxPlaces+"&minPrice=0&maxPrice=4"},t.prototype.expandSearchRadius=function(t,a){a.radius>300&&(a.radiusIncrement=100),a.radius>1e3&&(a.radiusIncrement=500),self.getPlaces({latitude:a.latitude,longitude:a.longitude,radius:parseInt(a.radius)+a.radiusIncrement,placeType:a.placeType,maxPlaces:a.maxPlaces})},t.prototype.success=function(t){this.restaurants=t,this.options.initialPlaces=0,WOL.app.wheel.setRestaurants(t),WOL.app.wheel.draw()},t.prototype.error=function(t){WOL.app.lightbox.NoLocationLightbox=new ErrorLocationLightbox},t}()},{}],13:[function(t,a,i){a.exports=function(){"use strict";function a(t){var a=document.getElementById(t),i=$("#"+t);this.elems={selector:"#"+t,canvas:a,$canvas:i},a.getContext&&(this.data={canvas:a,restaurants:n,width:600,height:600,startAngle:0,spinTimeout:null,isSpinning:!1,spinArcStart:10,spinTime:0,spinTimeTotal:0,spinVelocity:2e3,ctx:null,rouletteWheel:{},outsideRadius:250,textRadius:194,insideRadius:150,angle:null,text:null,drag:{clickedX:null,clickedY:null,currentDragX:null,currentDragY:null,previousDragX:null,previousDragY:null,isDragging:null,changedAngle:null,arcAngle:null}},this.init())}var i=t("../data/colours.js"),n=t("../data/restaurants.js"),e=(t("../lightboxes/resultLightbox.js"),t("./confetti.js"),"#spin");return a.prototype.init=function(){this.data.ctx=this.data.canvas.getContext("2d"),this.data.ctx.clearRect(0,0,this.data.width,this.data.height),this.data.ctx.strokeStyle="black",this.data.ctx.font="12px Helvetica, Arial",this.data.arc=Math.PI/(this.data.restaurants.length/2),this.draw(),this.addEvents()},a.prototype.addEvents=function(){var t=this;$(e).on("click",function(){t.retIsSpinning()||t.spin(!0)}),$(this.elems.selector).mousedown(function(a){t.data.drag.clickedX=a.pageX,t.data.drag.clickedY=a.pageY,t.data.drag.previousDragX=a.pageX,t.data.drag.previousDragY=a.pageY,t.data.drag.isDragging=!0}),$(this.elems.selector).mousemove(function(a){t.data.drag.isDragging&&!t.retIsSpinning()&&(t.data.drag.currentDragX=a.pageX,t.data.drag.currentDragY=a.pageY,t.data.drag.changedAngle=Math.atan2(t.data.drag.currentDragY-$(e).position().top,t.data.drag.currentDragX-$(e).position().left),t.data.drag.changedAngle-=Math.atan2(t.data.drag.previousDragY-$(e).position().top,t.data.drag.previousDragX-$(e).position().left),t.data.drag.arcAngle=Math.atan2(t.data.drag.currentDragY-$(e).position().top,t.data.drag.currentDragX-$(e).position().left),t.data.drag.arcAngle-=Math.atan2(t.data.drag.clickedY-$(e).position().top,t.data.drag.clickedX-$(e).position().left),t.addToStartAngle(t.data.drag.changedAngle),t.draw(!0),t.data.drag.previousDragY=t.data.drag.currentDragY,t.data.drag.previousDragX=t.data.drag.currentDragX)}),$(this.elems.selector).mouseup(function(a){t.data.drag.arcAngle>=.5&&!t.retIsSpinning()&&t.data.drag.changedAngle>0?t.spin(!0):t.data.drag.arcAngle<-4&&!t.retIsSpinning()&&t.data.drag.changedAngle>0?t.spin(!0):t.data.drag.arcAngle<=-.5&&!t.retIsSpinning()&&t.data.drag.changedAngle<0?t.spin(!1):t.data.drag.arcAngle>4&&!t.retIsSpinning()&&t.data.drag.changedAngle<0&&t.spin(!1),t.data.drag.isDragging=!1}),$(this.elems.selector).mouseout(function(a){t.data.drag.isDragging=!1})},a.prototype.draw=function(){var t=this;this.data.ctx.clearRect(0,0,this.data.width,this.data.height),this.data.restaurants.forEach(function(a,n){t.data.angle=t.data.startAngle+n*t.data.arc,t.data.ctx.fillStyle=i.bgColour[n],t.data.ctx.beginPath(),t.data.ctx.arc(t.data.width/2,t.data.height/2,t.data.outsideRadius,t.data.angle,t.data.angle+t.data.arc,!1),t.data.ctx.arc(t.data.width/2,t.data.height/2,t.data.insideRadius,t.data.angle+t.data.arc,t.data.angle,!0),t.data.ctx.fill(),t.data.ctx.save(),t.data.ctx.fillStyle=i.fontColour[n],t.data.ctx.translate(t.data.width/2+Math.cos(t.data.angle+t.data.arc/2)*t.data.textRadius,t.data.height/2+Math.sin(t.data.angle+t.data.arc/2)*t.data.textRadius),t.data.ctx.rotate(t.data.angle+t.data.arc/2+Math.PI/2),t.printName(a.name,-t.data.ctx.measureText(a.name).width/2,0,14,2*Math.PI*t.data.textRadius/t.data.restaurants.length-10),t.data.ctx.restore()}),this.drawArrow()},a.prototype.drawArrow=function(){this.data.ctx.fillStyle="#333",this.data.ctx.beginPath(),this.data.ctx.moveTo(this.data.width/2-4,this.data.height/2-(this.data.outsideRadius+25)),this.data.ctx.lineTo(this.data.width/2+4,this.data.height/2-(this.data.outsideRadius+25)),this.data.ctx.lineTo(this.data.width/2+4,this.data.height/2-(this.data.outsideRadius+15)),this.data.ctx.lineTo(this.data.width/2+9,this.data.height/2-(this.data.outsideRadius+15)),this.data.ctx.lineTo(this.data.width/2+0,this.data.height/2-(this.data.outsideRadius-0)),this.data.ctx.lineTo(this.data.width/2-9,this.data.height/2-(this.data.outsideRadius+15)),this.data.ctx.lineTo(this.data.width/2-4,this.data.height/2-(this.data.outsideRadius+15)),this.data.ctx.lineTo(this.data.width/2-4,this.data.height/2-(this.data.outsideRadius+25)),this.data.ctx.fill()},a.prototype.spin=function(t){this.data.spinAngleStart=10*Math.random()+10,this.data.spinTime=0,this.data.spinTimeTotal=3*Math.random()+4*this.data.spinVelocity,!this.data.isSpinning&&t?(this.data.isSpinning=!0,this.rotate(!0)):this.data.isSpinning||t||(this.data.isSpinning=!0,this.rotate(!1))},a.prototype.retIsSpinning=function(){return this.data.isSpinning},a.prototype.addToStartAngle=function(t){this.data.startAngle+=t},a.prototype.rotate=function(t){var a=this;if(this.data.spinTime+=30,this.data.spinTime>=this.data.spinTimeTotal)return this.stopRotate(),void(this.data.isSpinning=!1);var i=this.data.spinAngleStart-this.easeOut(this.data.spinTime,0,this.data.spinAngleStart,this.data.spinTimeTotal);t?this.data.startAngle+=i*Math.PI/180:this.data.startAngle-=i*Math.PI/180,this.draw(),this.data.spinTimeout=setTimeout(function(){a.rotate(t)},30)},a.prototype.stopRotate=function(){clearTimeout(this.data.spinTimeout);var t=180*this.data.startAngle/Math.PI+90,a=180*this.data.arc/Math.PI,i=Math.floor((360-t%360)/a);this.data.ctx.save(),0>t&&(t=Math.abs(t),i=Math.floor(t%360/a));this.data.restaurants[i].name.split(" ").join("+"),WOL.app.geolocation.position.latitude+","+WOL.app.geolocation.position.longitude;this.data.ctx.restore()},a.prototype.printName=function(t,a,i,n,e){var o,s,r,d,l;if(e=e||0,0>=e)return void this.data.ctx.fillText(t,a,i);for(l=1;l<=t.length;l++)if(o=t.substr(0,l),this.data.ctx.measureText(o).width>e)return s=" "!=t.charAt(l-2)?"-":"",r=t.substr(0,l-1)+s,d=t.substr(l-1),this.data.ctx.fillText(r,-this.data.ctx.measureText(r).width/2,i-n),void this.printName(d,-this.data.ctx.measureText(d).width/2,i+n,n,e-10);this.data.ctx.fillText(t,a,i?i-n:i)},a.prototype.easeOut=function(t,a,i,n){var e=(t/=n)*t,o=e*t;return a+i*(o+-3*e+3*t)},a.prototype.setRestaurants=function(t){this.data.restaurants=t,this.data.arc=Math.PI/(this.data.restaurants.length/2)},a}()},{"../data/colours.js":1,"../data/restaurants.js":2,"../lightboxes/resultLightbox.js":8,"./confetti.js":9}],14:[function(t,a,i){a.exports=function(t){"use strict"}()},{}],15:[function(t,a,i){a.exports=function(){"use strict";{var a=t("../modules/wheel.js"),i=t("../lightboxes/localisationLightbox.js");t("../modules/map.js"),t("../modules/geolocation.js"),t("../modules/confetti.js")}WOL.app.wheel=new a("wheel"),WOL.app.lightbox.localisation=new i}()},{"../lightboxes/localisationLightbox.js":6,"../modules/confetti.js":9,"../modules/geolocation.js":10,"../modules/map.js":11,"../modules/wheel.js":13}],16:[function(t,a,i){a.exports={app:{lightbox:{}},modules:{},global:{},page:{},utils:{},data:{}}},{}],17:[function(t,a,i){a.exports='<div id="localisation-error" class="alert alert-danger localisation" role="alert"><p>Oops! We can\'t find your location. <button id="localisation-continue-button" type="button" class="btn btn-danger btn-sm"> Continue anyway</button></p></div>'},{}],18:[function(t,a,i){a.exports='<div id="geolocation" class="panel panel-default localisation search-localisation"><div class="panel-body"><p>Hang on a moment, we are just getting your location<span class="one">.</span><span class="two">.</span><span class="three">.</span></p></div></div>'},{}],19:[function(t,a,i){a.exports='<div id="localisation" class="panel panel-default select-localisation"><div class="panel-body"><p>Please select an option</p> <button type="button" id="location-option-current" class="btn btn-success">Use my location</button> <button type="button" id="location-option-find" class="btn btn-info">Find a location</button></div></div>'},{}]},{},[3]);
//# sourceMappingURL=../maps/all.js.map