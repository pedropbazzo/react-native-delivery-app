import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Variables from '../styles/Variables'

export default class TripRowStatus extends React.Component {
  render() {
    return (
      <View style={[styles.container, styles[this.props.trip.load_status.name.toLowerCase()]]}>
        <Text style={styles.text}>{this.props.trip.load_status.name}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Variables.tripRowStatusRadius,
    paddingHorizontal: 10,
    paddingVertical: 2,
    width: 100,
  },

  text: {
    color: Variables.colorWhite,
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: 'uppercase',
    textAlign: 'center'
  },

  active: {
    backgroundColor: Variables.colorGreen
  },

  pending: {
    backgroundColor: Variables.colorYellow
  },

  delivered: {
    backgroundColor: Variables.colorBlue
  },

  completed: {
    backgroundColor: Variables.colorBlue
  }
});