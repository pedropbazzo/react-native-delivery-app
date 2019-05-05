import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import GeoLocation from '../utils/GeoLocation';

class StopMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      marker: null,
      region: {
        latitude: 40.354516,
        longitude: -100.184052,
        latitudeDelta: 40,
        longitudeDelta: 40
      }
    }
  }

  componentDidMount() {
    this.fetchPoint();
  }

  fetchPoint() {
    if (!this.props.stop.address.city || this.props.stop.address.city.length == 0)
      return

    GeoLocation.getCoordinates(this.props.stop.address.formatted, function(response, status) {
      this.setState({
        isLoaded: true,
        marker: response.coordinates,
        region: Object.assign(response.coordinates, {
          latitudeDelta: 0.003,
          longitudeDelta: 0.003
        })
      })
    }.bind(this));
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          mapType="satellite"
          region={this.state.region}>
          {(() => {
            if (this.state.isLoaded)
              return <Marker coordinate={this.state.marker}/>
          })()}
        </MapView>
      </View>
    )
  }
}

export default StopMap;

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