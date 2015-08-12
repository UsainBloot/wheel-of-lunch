# Wheel of Lunch
[![Build Status](https://travis-ci.org/UsainBloot/wheel-of-lunch.svg?branch=master)](https://travis-ci.org/UsainBloot/wheel-of-lunch)

Wheel of Lunch makes those difficult lunch decisions for you. Simply enter your location, spin the wheel and let the site suggest a place for lunch.

Under the hood, Wheel of Lunch uses *Google Places*, *canvas*, *geo-ip location*, a custom *REST API*, a decent amount of geometry, and an *auto-expanding search algorithm* to ensure that it returns 12 locations no matter where you are.

[Take me to the wheel.](http://UsainBloot.github.io/wheel-of-lunch)

## Features

* **Range finder** to determine a suitable distance to search for the initial 12 places.
* Place results determined by **Google Places API**, returns 12 most relevant places
* **Get location** via Google Maps or by geo-ip location.
* **Get directions** to recommendation via Google Maps.
* View **rating** out of 5 for selected place
* **Click** and **draggable** wheel
* Search for **restuaraunts**, **food** or **bar**.
* **Shareable URL** (allows others to view the same results).
* **Dynamic Search** option to automatically increase search radius until the desired number of results has been found or when a user is in a rural area.

## Setup

### Prerequisites
* [Node](https://nodejs.org/)
* [npm](https://www.npmjs.com/)
* [Ruby](https://www.ruby-lang.org/en/)

### Installation

To install all requirement node modules and bower components

`npm install`

## Development

### Setup

`gulp` - Build public folder, scss to css, JavaScript linting and Browserify.

`gulp dev` - Same as `gulp` but also starts up a local server using BrowserSync.

`gulp serve` - Only starts up a local BrowserSync server.

### Framework

* [Gulp](http://gulpjs.com/) - Automated task runner
* [Browserify](http://browserify.org/) - Require modules in a node-like fashion
* [Hogan](http://twitter.github.io/hogan.js/) - Dynamic HTML templating
* [BrowserSync](http://www.browsersync.io/) - Easy synchronised local server for development


## Search Radius

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

## Resources
* [Creating a roulette wheel using HTML5](http://tech.pro/tutorial/1008/creating-a-roulette-wheel-using-html5-canvas)

## Articles
* [Git@Me - What's for lunch?](http://gitat.me/2015/07/23/Wheel-of-lunch/)
* [DevPost.com - Wheel-O-Hackathons Challenge Post](http://devpost.com/software/wheel-o-hackathons)

## License

The MIT License (MIT)

Copyright (c) 2015 Jack Palmer

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
