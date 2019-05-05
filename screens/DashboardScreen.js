import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  Text,
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
import Divider from '../components/Divider';
import Navigation from '../components/Navigation';
import TripsList from '../components/TripsList';

export default class DashboardScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <Navigation />,
    headerLeft: null
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <TripsList statuses={['active']}/>
          <TripsList statuses={['pending']}/>
          
          <Divider text={'previous'}/>

          <TripsList statuses={['delivered', 'completed']}/>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});