import React from 'react';
import Polyline from '@mapbox/polyline';
import Keys from './Keys';

export default {
  getCoordinates: function(address, callback) {
    const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
    const apiKey = Keys.GoogleAPI;
    let url = baseUrl;
    if (typeof (baseUrl) === 'string') {
      url += `?address=${address}&key=${apiKey}&language=en`;
    }

    return fetch(url)
      .then(response => response.json())
      .then(json => {
        if (json.status !== 'OK') {
          const errorMessage = json.error_message || 'Unknown error';
          return Promise.reject(errorMessage);
        }

        let location = json.results[0].geometry.location;

        return callback({
          coordinates: {
            latitude: location.lat,
            longitude: location.lng
          }
        }, json.status);
      });
  },

  getRoute: function(waypoints, callback) {
    const directionsServiceBaseUrl = 'https://maps.googleapis.com/maps/api/directions/json';
    const apiKey = Keys.GoogleAPI;

    if (waypoints.length < 2)
      return;

    let origin = waypoints.shift().location;
    let destination = waypoints.pop().location;

    let url = directionsServiceBaseUrl;
    url += `?origin=${origin}&destination=${destination}&key=${apiKey}&mode=driving&language=en`;

    let waypointOptions = [];

    for (let i = 0; i < waypoints.length; i++) {
      if (waypoints[i].stopover)
        waypointOptions.push(waypoints[i].location);
      else
        waypointOptions.push('via:' + waypoints[i].location);
    }

    url += '&waypoints=' + waypointOptions.join('|')

    return fetch(url)
      .then(response => response.json())
      .then(json => {
        if (json.status !== 'OK') {
          const errorMessage = json.error_message || 'Unknown error';
          return Promise.reject(errorMessage);
        }

        let points = Polyline.decode(json.routes[0].overview_polyline.points);
        let coords = points.map((point, index) => {
          return {
            latitude: point[0],
            longitude: point[1]
          }
        });

        let markers = [];

        json.routes[0].legs.map((leg,index) => {
          markers.push({
            latitude: leg.start_location.lat,
            longitude: leg.start_location.lng
          });

          markers.push({
            latitude: leg.end_location.lat,
            longitude: leg.end_location.lng
          });
        });

        let centerCoord = this.getCenter(markers);

        let latitudeDelta = Math.abs(json.routes[0].bounds.northeast.lat - json.routes[0].bounds.southwest.lat);
        let longitudeDelta = Math.abs(json.routes[0].bounds.northeast.lng - json.routes[0].bounds.southwest.lng);

        let bounds = {
          latitude: centerCoord.latitude + 0.5,
          longitude: centerCoord.longitude,
          latitudeDelta: latitudeDelta + (latitudeDelta * 0.3),
          longitudeDelta: longitudeDelta + (longitudeDelta * 0.3)
        }

        return callback({
          coords: coords,
          markers: markers,
          bounds: bounds
        }, json.status);
      });
  },

  // pass in waypoints instead?
  getDistance: function(origin, destination, callback) {
    const directionsServiceBaseUrl = 'https://maps.googleapis.com/maps/api/directions/json';
    const apiKey = Keys.GoogleAPI;
    let url = directionsServiceBaseUrl;
    if (typeof (directionsServiceBaseUrl) === 'string') {
      url += `?origin=${origin}&destination=${destination}&key=${apiKey}&mode=driving&language=en`;
    }

    return fetch(url)
      .then(response => response.json())
      .then(json => {
        if (json.status !== 'OK') {
          const errorMessage = json.error_message || 'Unknown error';
          return Promise.reject(errorMessage);
        }

        if (json.routes.length) {
          const route = json.routes[0];

          return callback({
            distance: route.legs.reduce((carry, curr) => {
              return carry + curr.distance.value;
            }, 0) / 1000,
            duration: route.legs.reduce((carry, curr) => {
              return carry + curr.duration.value;
            }, 0) / 60,
            fare: route.fare
          }, json.status);
        } else {
          return Promise.reject();
        }
      });
  },

  getCenter: function(coords) {
    if (coords.length === 1) {
      return coords[0];
    }

    let x = 0.0;
    let y = 0.0;
    let z = 0.0;

    for (let coord of coords) {
      let latitude = coord.latitude * Math.PI / 180;
      let longitude = coord.longitude * Math.PI / 180;

      x += Math.cos(latitude) * Math.cos(longitude);
      y += Math.cos(latitude) * Math.sin(longitude);
      z += Math.sin(latitude);
    }

    let total = coords.length;

    x = x / total;
    y = y / total;
    z = z / total;

    let centralLongitude = Math.atan2(y, x);
    let centralSquareRoot = Math.sqrt(x * x + y * y);
    let centralLatitude = Math.atan2(z, centralSquareRoot);

    return {
      latitude: centralLatitude * 180 / Math.PI,
      longitude: centralLongitude * 180 / Math.PI
    };
  }
}