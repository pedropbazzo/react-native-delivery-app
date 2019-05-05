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
import DocumentNavigation from '../components/DocumentNavigation';
import TripCommunication from '../components/TripCommunication';

export default class StopScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    const doc = params.document || {};

    return {
      headerTitle: <DocumentNavigation document={doc}/>,
      headerLeft: null
    };
  };

  render() {
    const {params = {}} = this.props.navigation.state;
    let doc = params.document;

    return (
      <View style={styles.mainContainer}>
        <Text>Doc</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  }
});