import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Messenger from './Messenger';

export default class TripCommunication extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          Communication
        </Text>

        <Messenger channelId={"ch-trip-" + this.props.trip.id}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    lineHeight: 12,
    paddingBottom: 12
  }
});