# Places API - Express Server

## Getting started
```
npm install
```

## Running the Express API Server

```
node server.js
```

## Building and Running the Express API Server with Docker
```
docker build -t usainbloot/places-api .
docker run -p 8080:8080 -d usainbloot/places-api
```

## Example API request

```
GET
http://localhost:8080/api/places?latitude=52.0395804&longitude=-0.7608431999999999&radius=300&type=restaurant&maxPlaces=12&minPrice=0&maxPrice=4
```
