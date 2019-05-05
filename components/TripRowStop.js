import React from 'react'
import moment from 'moment'
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { Icon } from 'react-native-elements';
import Variables from '../styles/Variables';
import DistanceAmount from './DistanceAmount'

export default class TripRowStop extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{width: 50, paddingTop: 4}}>
          {(() => {
            if (!this.props.isLast)
              return <View style={styles.timeline}/>
          })()}
          <Icon name='lens' size={12} color={Variables.colorDarkGray}/>
        </View>

        <View style={{flex: 1, paddingBottom: 20}}>
          <View style={styles.tripRowStopLocation}>
            <Text style={styles.tripRowStopLocationText}>{this.props.stop.address ? this.props.stop.address.city_state : ''}</Text>
          </View>
          <View style={styles.tripRowStopAppointmentContainer}>
            <View style={styles.tripRowStopAppointment}>
              <Text style={styles.tripRowStopAppointmentText}>{this.props.stop.appointment_time ? (this.getAppointmentTime().format('ddd, MMM. D, HH:mm') + (this.props.stop.fcfs ? ' (FCFS)' : '')) : ''}</Text>
            </View>

            <View style={styles.tripRowStopInfo}>
              {(() => {
                if (this.props.showInfo && this.props.stop.address) {
                  return (
                    <DistanceAmount destination={this.props.stop.address.formatted} suffix={'miles away'} style={styles.tripRowStopInfoText}/>
                  )
                }
              })()}
            </View>
          </View>
        </View>
      </View>
    )
  }

  getAppointmentTime() {
    return moment(this.props.stop.appointment_time);
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative'
  },

  tripRowStopAppointmentContainer: {
    flexDirection: 'row'
  },

  tripRowStopAppointment: {
    flex: 1,
  },

  tripRowStopLocationText: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },

  tripRowStopAppointmentText: {
    fontSize: 14,
    textTransform: 'uppercase'
  },

  tripRowStopInfoText: {
    fontSize: 14,
    textAlign: 'right'
  },

  timeline: {
    position: 'absolute',
    top: 10,
    left: 24,
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: Variables.colorDarkGray
  }
});