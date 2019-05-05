import React from 'react';
import {
  ActivityIndicator,
  Text,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Variables from '../styles/Variables';
import StopNavigation from '../components/StopNavigation';
import StopMap from '../components/StopMap';
import StopCustomer from '../components/StopCustomer';
import StopAppointment from '../components/StopAppointment';
import StopInfo from '../components/StopInfo';
import TripCommunication from '../components/TripCommunication';
import CallToAction from '../components/CallToAction';

export default class StopScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    const stop = params.stop || {};

    return {
      headerTitle: <StopNavigation stop={stop}/>,
      headerLeft: null
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      showCallToAction: true
    };

    this.onScroll = this.onScroll.bind(this);
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
    const {params = {}} = this.props.navigation.state;
    let trip = params.trip;
    let stop = params.stop;

    return (
      <View style={styles.mainContainer}>
        <KeyboardAwareScrollView onScroll={this.onScroll}>
          <StopMap stop={stop}/>
          <View style={styles.container}>
            <StopCustomer stop={stop}/>

            <StopAppointment stop={stop}/>
            
            <View style={styles.divider}/>

            <StopInfo stop={stop}/>

            <View style={styles.divider}/>

            <TripCommunication trip={trip}/>
          </View>
        </KeyboardAwareScrollView>
        {(() => {
          if (this.state.showCallToAction)
            return (<CallToAction text={"Complete Stop"} onClick={this.toggleCompletion}/>)
        })()}
      </View>
    );
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
  }
});