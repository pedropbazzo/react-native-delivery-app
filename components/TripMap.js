import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Keys from '../utils/Keys';
import GeoLocation from '../utils/GeoLocation';

class TripMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 40.354516,
        longitude: -100.184052,
        latitudeDelta: 40,
        longitudeDelta: 40
      },
      markers: [],
      coords: []
    };
  }

  componentDidMount() {
    this.fetchRoute();
  }

  fetchRoute() {
    let waypoints = []

    this.props.trip.stops.map(function(stop) {
      if (stop.address) {
        waypoints.push({
          location: stop.address.formatted,
          stopover: (stop.type_name == 'pick_up' || stop.type_name == 'drop_off')
        })
      }
    })

    if (waypoints.length < 2)
      return true

    GeoLocation.getRoute(waypoints, function(response, status) {
      this.setState({
        region: response.bounds,
        coords: response.coords,
        markers: response.markers
      });
    }.bind(this));
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyles}
          style={styles.map}
          initialRegion={this.state.region}
          region={this.state.region}>
          <MapView.Polyline 
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="red"/>
          {this.state.markers.map((marker,index) => (
            <Marker
              key={"marker-" + index}
              coordinate={marker}
            />
          ))}
        </MapView>
      </View>
    )
  }
}

export default TripMap;

const styles = StyleSheet.create({
 container: {
   height: 300,
   width: '100%',
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});

const mapStyles = [
  {
    "featureType": "all",
    "elementType": "all",
    "stylers": [
      {
          "hue": "#008eff"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
      {
          "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "all",
    "stylers": [
      {
          "saturation": "0"
      },
      {
          "lightness": "0"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [
      {
          "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "all",
    "stylers": [
      {
          "visibility": "simplified"
      },
      {
          "saturation": "-60"
      },
      {
          "lightness": "-20"
      }
    ]
  }
];