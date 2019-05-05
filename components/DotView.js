import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Variables from '../styles/Variables'

export default class DotView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      level: this.props.level || 'high',
      size: this.props.size || 13
    }
  }

  render() {
    let size = this.state.size

    return (
      <View style={[styles[this.state.level], {width: size, height: size, borderRadius: size/2}]}></View>
    )
  }
}

const styles = StyleSheet.create({
  high: {
    backgroundColor: Variables.colorRed
  },
  medium: {
    backgroundColor: Variables.colorYellow
  },
  low: {
    backgroundColor: Variables.colorGreen
  }
});