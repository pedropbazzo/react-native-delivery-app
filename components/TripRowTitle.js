import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default class TripRowTitle extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.trip.billable_mileage} miles ({this.props.trip.deadhead_mileage} DH)</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontWeight: 'bold'
  },

  text: {
    fontWeight: 'bold'
  }
});