import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { Button } from './CommonComponents';
import Variables from '../styles/Variables';

class CallToAction extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button type="primary" title={this.props.text} onPress={this.props.onPress}/>
      </View>
    )
  }
}

export default CallToAction

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    left: 0,
    width: '100%',
    height: 100,
    padding: 20,
    backgroundColor: Variables.colorWhite,
    shadowColor: Variables.colorWhite,
    shadowOffset: {width: 0, height: -15},
    shadowOpacity: 100,
    shadowRadius: 10
  }
});