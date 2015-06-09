#Wheel of Lunch
Wheel of Lunch is a website which determines where a user should go for lunch. The site utilises HTML5 to draw a wheel of a collection of local restaurants which is obtained from a custom RESTful API and Google Places.

[Click here to view demo.](http://UsainBloot.github.io/wheel-of-lunch)

##Features

* Range finder to determine a suitable distance to search for the initial 12 places.
* Get location via Google Maps or by current location.
* Variable search parameters.
* View selected place on Google Maps.
* View rating out of 5 for selected place
* Spin the wheel using click-and-drag or spin button
* Location search net increments when few results are found (for rural areas).
* Search for "restuaraunts", "food" or "bar".
* Shareable url links (allows others to view the same results).

##Search Radius
When a user is in a rural area and the wheel can not find a suitable number of places within the default search radius, the search will increment until a suitable number is found.

![Search radius increments](http://i.imgur.com/8YYuZlg.png "Search radius increments")

Increment | Search Radius 
--- | ---
1 | 300
2 | 400
3 | 500
4 | 1000
5 | 1500
6 | 2000
7 | 2500
8 | 3000

##Resources:

* [Creating a roulette wheel using HTML5.](http://tech.pro/tutorial/1008/creating-a-roulette-wheel-using-html5-canvas)
* [HTML5 confetti.](http://codepen.io/linrock/pen/Amdhr)

## License

The MIT License (MIT)

Copyright (c) 2014 Jack Palmer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
