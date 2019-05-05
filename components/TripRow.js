import React from 'react'
import {
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import { withNavigation } from 'react-navigation';
import TripRowHeader from './TripRowHeader'
import TripRowContent from './TripRowContent'
import Variables from '../styles/Variables'

class TripRow extends React.Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.onPress}>
        <View style={styles.container}>
          <TripRowHeader trip={this.props.trip}/>
          <TripRowContent trip={this.props.trip}/>
        </View>
      </TouchableOpacity>
    )
  }

  onPress() {
    this.props.navigation.navigate('Trip', { id: this.props.trip.id })
  }
}

export default withNavigation(TripRow);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    shadowColor: '#c7c7c7',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 30,
    shadowRadius: 10,
    borderRadius: Variables.tripRowRadius,
    marginHorizontal: 0,
    marginVertical: 12,
    backgroundColor: Variables.colorLightGray
  },
});