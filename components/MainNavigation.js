import React from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import { Icon } from 'react-native-elements';
//import AlertDot from './AlertDot'

export default class MainNavigation extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <TouchableHighlight onPress={this.props.toggleSubNavigation}>
            <Icon name='menu' size={35}/>
          </TouchableHighlight>
        </View>

        <View style={{flex: 1, alignItems: 'stretch'}}>
          <Text style={styles.text}>This Week</Text>
        </View>

        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Icon name='phone' size={35}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10
  },

  text: {
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'center'
  }
});