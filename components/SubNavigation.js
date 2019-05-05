import React from 'react';
import {
  View,
  Text,
  Button,
  Dimensions,
  TouchableWithoutFeedback,
  AsyncStorage,
  StyleSheet
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Variables from '../styles/Variables';
import Auth from '../utils/Auth';

class SubNavigation extends React.Component {
  constructor(props) {
    super(props)
    this.handlePressOutside = this.handlePressOutside.bind(this)
    this.toggleMessenger = this.toggleMessenger.bind(this)
    this.toggleSearch = this.toggleSearch.bind(this)
    this.toggleSettings = this.toggleSettings.bind(this)
    this.toggleContact = this.toggleContact.bind(this)
    this.toggleHelp = this.toggleHelp.bind(this)
    this.toggleAbout = this.toggleAbout.bind(this)
    this.signOutAsync = this.signOutAsync.bind(this)
  }

  handlePressOutside(event) {
    this.props.hideSubNavigation()
  }

  toggleMessenger() {

  }

  toggleSearch() {

  }

  toggleSettings() {

  }

  toggleContact() {

  }

  toggleHelp() {

  }

  toggleAbout() {

  }

  signOutAsync = async () => {
    Auth.logOut().then(res => {
      AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
    });
  }

  render() {
    if (!this.props.show)
      return null;

    return (
      <View style={styles.container}>
        <View style={styles.navigation}>
          <View style={styles.header}>
            <Text>{Auth.profile.name}</Text>
          </View>
          <View style={styles.body}>
            <Button title="Log Out" onPress={this.signOutAsync}/>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={this.handlePressOutside}>
          <View style={styles.touchable}/>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

export default withNavigation(SubNavigation);

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height
  },

  navigation: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.7,
    height: height,
    color: '#ffffff',
    fontSize: 18,
    zIndex: 13,
  },

  header: {
    backgroundColor: Variables.subNavHeaderColor,
    height: 200,
    padding: 20,
    marginTop: -30
  },

  body: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: Variables.subNavBodyColor,
    padding: 25
  },

  touchable: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: width * 0.3,
    height: height
  }
});