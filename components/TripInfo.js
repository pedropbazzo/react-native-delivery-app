import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import NumberFormat from 'react-number-format';
import Variables from '../styles/Variables';

export default class TripInfo extends React.Component {
  buildTrucksList() {
    let rows = []

    this.props.trip.trucks.map(function(truck) {
      rows.push(<Text style={styles.value} key={truck.id}>{truck.unit_number}</Text>)
    })

    return rows
  }

  buildTrailersList() {
    let rows = []

    this.props.trip.trailers.map(function(trailer) {
      rows.push(<Text style={styles.value} key={trailer.id}>{trailer.unit_number}</Text>)
    })

    return rows
  }

  render() {
    return (
      <View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Trip#</Text>
            <Text style={styles.value}>{this.props.trip.load_number}</Text>
          </View>

          <View style={styles.col}>
            <Text style={styles.label}>Distance</Text>
            <NumberFormat
              value={this.props.trip.driver_mileage}
              displayType={'text'}
              thousandSeparator={true}
              suffix={' miles'}
              renderText={value => (<Text style={styles.value}>{value}</Text>)}/>
          </View>

          <View style={styles.col}>
            <Text style={styles.label}>Dispatcher</Text>
            <Text style={styles.value}>{this.props.trip.user.name}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Truck#</Text>
            <View>
              {(() => {
                return this.buildTrucksList()
              })()}
            </View>
          </View>

          <View style={styles.col}>
            <Text style={styles.label}>Weight</Text>
            <NumberFormat
              value={this.props.trip.weight}
              displayType={'text'}
              thousandSeparator={true}
              suffix={' lbs'}
              renderText={value => (<Text style={styles.value}>{value}</Text>)}/>
          </View>

          <View style={styles.col}>
            <Text style={styles.label}>Comodity</Text>
            <Text style={styles.value}>General Freight</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Trailer#</Text>
            <View>
              {(() => {
                return this.buildTrailersList()
              })()}
            </View>
          </View>

          <View style={styles.col}>
            <Text style={styles.label}>Temperature</Text>
            <Text style={styles.value}>n/a</Text>
          </View>

          <View style={styles.col}>
            <Text style={styles.label}>Packaging</Text>
            <Text style={styles.value}>Palletized</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    marginTop: 20,
    flexDirection: 'row'
  },
  col: {
    flex: 1
  },
  label: {
    fontSize: 12,
    lineHeight: 12,
    color: Variables.colorGray
  }
});