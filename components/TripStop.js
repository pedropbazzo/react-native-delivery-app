import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import DistanceAmount from './DistanceAmount';
import DotView from './DotView';

class TripStop extends React.Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.navigation.navigate('Stop', {
      trip: this.props.trip,
      stop: this.props.stop
    });
  }

  render() {
    let stopName = ""
    let statusLevel = ""

    switch(this.props.stop.type_name) {
      case 'initial_location':
        stopName = 'Initial Location'
        break
      case 'dead_head':
        stopName = 'Deadhead'
        break
      case 'pick_up':
        stopName = "Pick# " + (this.props.index + 1)
        break
      case 'drop_off':
        stopName = "Drop# " + (this.props.index + 1)
        break
    }

    switch(this.props.stop.progress_status) {
      case 'ok':
        statusLevel = 'low'
        break
      case 'warning':
        statusLevel = 'medium'
        break
      case 'danger':
        statusLevel = 'high'
        break
    }

    return (
      <TouchableOpacity style={styles.container} onPress={this.onPress}>
        <View style={styles.header}>
          <Text style={styles.indexText}>{stopName}</Text>
          {(() => {
            if (true) //!this.props.stop.completed)
              <DistanceAmount destination={this.props.stop.address.formatted} suffix={'miles away'} style={styles.distanceText}/>
          })()}
        </View>
        <View style={styles.body}>
          <View style={styles.statusContainer}>
            <DotView level={statusLevel} size={13}/>
          </View>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>
              {this.props.stop.address ? this.props.stop.address.city_state : ''}
            </Text>
            <Text style={styles.appointmentText}>
              {(() => {
                if (this.props.stop.appointment_time)
                  return (this.getAppointmentTime().format('ddd, MMM. D, HH:mm') + (this.props.stop.fcfs ? ' (FCFS)' : ''))
              })()}
            </Text>
          </View>
          <View style={styles.actionContainer}>
            <Icon name='chevron-right' size={40}/>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  getAppointmentTime() {
    return moment(this.props.stop.appointment_time);
  }
}

export default withNavigation(TripStop);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingVertical: 8
  },
  header: {
    flexDirection: 'row',
    paddingBottom: 5
  },
  indexText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 14
  },
  distanceText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 14,
    textAlign: 'right'
  },
  body: {
    flexDirection: 'row'
  },
  statusContainer: {
    width: 40,
    padding: 3,
    alignItems: 'center'
  },
  locationContainer: {
    flex: 1,
  },
  actionContainer: {
    width: 30
  },
  locationText: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  appointmentText: {
    textTransform: 'uppercase',
    fontSize: 14
  }
});