import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import TripStop from './TripStop';

export default class TripStops extends React.Component {
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

    let stopCounts = {
      pick_up: 0,
      drop_off: 0
    };

    this.props.trip.stops.map(function(stop,index) {
      stops.push(<TripStop key={stop.id} index={stopCounts[stop.type_name]} trip={this.props.trip} stop={stop}/>)
      stopCounts[stop.type_name]++
    }.bind(this));

    return stops;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  }
});