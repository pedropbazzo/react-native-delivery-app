import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native';
import TripRowStop from './TripRowStop'

export default class TripRowContent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {(() => {
          return this.buildStops()
        })()}
      </View>
    )
  }

  buildStops() {
    let stops = [];
    let count = this.props.trip.stops.length;
    let isLast = false;

    this.props.trip.stops.map(function(stop, index) {
      isLast = (count == index + 1);
      stops.push(<TripRowStop key={stop.id} isLast={isLast} stop={stop} showInfo={this.props.trip.load_status.name == 'Active'}/>)
    }.bind(this));

    return stops;
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
});