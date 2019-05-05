import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Platform,
  Linking
} from 'react-native';
import { Button } from './CommonComponents';
import Variables from '../styles/Variables';
import GeoLocation from '../utils/GeoLocation';
import Address from './Address';

export default class StopCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: null
    }

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${this.state.coordinates.latitude},${this.state.coordinates.longitude}`;
    const label = (this.props.stop.customer ? this.props.stop.customer.name : 'Directions');
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });


    Linking.openURL(url);
  }

  componentDidMount() {
    this.fetchPoint()
  }

  fetchPoint() {
    if (!this.props.stop.address.city || this.props.stop.address.city.length == 0)
      return

    GeoLocation.getCoordinates(this.props.stop.address.formatted, function(response, status) {
      this.setState({
        coordinates: response.coordinates
      })
    }.bind(this));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={{flex: 1}}>
            <Text style={styles.name}>
              {(() => {
                if (this.props.stop.customer)
                  return (this.props.stop.customer.name)
              })()}
            </Text>
            <Address address={this.props.stop.address} style={styles.address}/>
          </View>

          <View style={styles.navigateContainer}>
            <Button type="secondary" size="small" title="NAVIGATE" disabled={this.state.coordinates ? false : true} onPress={this.onPress}/>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15
  },
  row: {
    flexDirection: 'row'
  },
  navigateContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    fontWeight: 'bold'
  },
  address: {
    fontSize: 14,
    lineHeight: 18
  }
});