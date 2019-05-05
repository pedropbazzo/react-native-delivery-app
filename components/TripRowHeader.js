import React from 'react'
import TripRowTitle from './TripRowTitle'
import TripRowStatus from './TripRowStatus'
import { View, StyleSheet } from 'react-native';
import Variables from '../styles/Variables'

export default class TripRowHeader extends React.Component {
  render() {
    return (
      <View style={[styles.container, styles[this.props.trip.load_status.name.toLowerCase()]]}>
        <TripRowTitle trip={this.props.trip}/>
        <TripRowStatus trip={this.props.trip}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopLeftRadius: Variables.tripRowRadius,
    borderTopRightRadius: Variables.tripRowRadius,
    padding: 10,
    height: 40
  },

  active: {
    backgroundColor: Variables.colorLightGreen
  },

  pending: {
    backgroundColor: Variables.colorLightYellow
  },

  delivered: {
    backgroundColor: Variables.colorLightBlue
  },

  completed: {
    backgroundColor: Variables.colorLightBlue
  }
});