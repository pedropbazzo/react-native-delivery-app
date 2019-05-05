import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native';
import Variables from '../styles/Variables';
import MainNavigation from './MainNavigation';
import SubNavigation from './SubNavigation';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMain: true,
      showSub: false,
      hasAlert: false
    }

    this.toggleSubNavigation = this.toggleSubNavigation.bind(this)
    this.hideSubNavigation = this.hideSubNavigation.bind(this)
  }

  render() {
    return (
      <View style={styles.container}>
        <MainNavigation
          show={this.state.showMain}
          hasAlert={this.state.hasAlert}
          toggleSubNavigation={this.toggleSubNavigation}/>
        <SubNavigation
          show={this.state.showSub}
          hideSubNavigation={this.hideSubNavigation}/>
      </View>
    )
  }

  toggleSubNavigation() {
    this.setState({
      showSub: !this.state.showSub
    })
  }

  hideSubNavigation() {
    this.setState({
      showSub: false
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    shadowColor: '#c7c7c7',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 2,
    shadowRadius: 2,
    height: 70,
    backgroundColor: Variables.colorWhite,
    padding: 15,
    paddingHorizontal: 30,
    marginBottom: 20,
    zIndex: 10
  }
});