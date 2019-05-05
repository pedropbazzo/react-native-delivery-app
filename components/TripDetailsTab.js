import React from 'react'
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Variables from '../styles/Variables';
import TripMap from './TripMap';
import TripInfo from './TripInfo';
import TripStops from './TripStops';
import TripCommunication from './TripCommunication';
import CallToAction from './CallToAction';

export default class TripDetailsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCallToAction: true
    }

    this.previousScrollY = null
    this.onScroll = this.onScroll.bind(this)
    this.toggleCompletion = this.toggleCompletion.bind(this);
  }

  onScroll(event) {
    const scrollY = event.nativeEvent.contentOffset.y;
    
    if (!this.previousScrollY || this.previousScrollY < scrollY - 50 || this.previousScrollY > scrollY + 50) {
      const show = (!this.previousScrollY || this.previousScrollY > scrollY)
      if (this.state.showCallToAction != show) {
        this.setState({showCallToAction: show})
      }
      this.previousScrollY = scrollY
    }
  }

  toggleCompletion() {

  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <KeyboardAwareScrollView onScroll={this.onScroll}>
          <TripMap trip={this.props.trip}/>
          <View style={styles.container}>
            <TripInfo trip={this.props.trip}/>

            <View style={styles.divider}/>

            <TripStops trip={this.props.trip}/>

            <View style={styles.divider}/>

            <View>
              <Text style={styles.additionalInfoLabel}>
                Additional Notes
              </Text>
              <Text style={styles.additionalInfoValue}>
                {(() => {
                  if (this.props.trip.additional_info && this.props.trip.additional_info != "")
                    return (this.props.trip.additional_info)
                  else
                    return ("--")
                })()}
              </Text>
            </View>

            <View style={styles.divider}/>

            <TripCommunication trip={this.props.trip}/>
          </View>
        </KeyboardAwareScrollView>
        {(() => {
          if (this.state.showCallToAction)
            return (<CallToAction text={"Complete Stop"} onClick={this.toggleCompletion}/>)
        })()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  container: {
    paddingHorizontal: 30,
    alignItems: 'stretch',
    justifyContent: 'center',
    marginBottom: 30
  },
  divider: {
    borderBottomColor: Variables.colorGray,
    borderBottomWidth: 1,
    marginVertical: 15
  },
  additionalInfoLabel: {
    fontSize: 12,
    lineHeight: 12,
    paddingBottom: 5
  }
});