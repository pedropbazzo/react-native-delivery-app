import React from 'react';
import {
  Text,
  StyleSheet,
  View
} from 'react-native';
import moment from 'moment';
import Variables from '../styles/Variables';

export default class StopAppointment extends React.Component {
  getAppointmentTime() {
    return moment(this.props.stop.appointment_time);
  }

  getInTime() {
    return moment(this.props.stop.in_at)
  }

  getOutTime() {
    return moment(this.props.stop.out_at)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.appointmentLabel}>Appointment</Text>
        <Text style={styles.appointment}>
          {(() => {
            if (this.props.stop.appointment_time)
              return (this.getAppointmentTime().format('ddd, MMM. D, HH:mm') + (this.props.stop.fcfs ? ' (FCFS)' : ''))
          })()}
        </Text>
        <View style={styles.entranceContainer}>
          <Text style={styles.entranceLabel}>Time In</Text>
          <Text style={[styles.entranceTimeLabel, styles[this.props.stop.in_at_status]]}>
            {(() => {
              if (this.props.stop.in_at) {
                return (this.getInTime().format('MMM. D, HH:mm'))
              } else {
                return ('No In Time')
              }
            })()}
          </Text>
          <Text style={styles.entranceLabel}>Time Out</Text>
          <Text style={[styles.entranceTimeLabel, styles[this.props.stop.out_at_status]]}>
            {(() => {
              if (this.props.stop.out_at) {
                return (this.getOutTime().format('MMM. D, HH:mm'))
              } else {
                return ('No Out Time')
              }
            })()}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  entranceContainer: {
    flexDirection: 'row'
  },
  appointment: {
    fontSize: 18,
    lineHeight: 25
  },
  appointmentLabel: {
    fontSize: 12,
    lineHeight: 12,
    color: Variables.colorGray
  },
  entranceLabel: {
    fontSize: 12,
    color: Variables.colorGray,
    paddingRight: 10
  },
  entranceTimeLabel: {
    fontSize: 12,
    paddingRight: 15
  },
  ok: {
    color: Variables.colorGreen
  },
  warning: {
    color: Variables.colorYellow
  },
  danger: {
    color: Variables.colorRed
  }
});