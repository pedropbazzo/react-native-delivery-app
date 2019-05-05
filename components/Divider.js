import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Variables from '../styles/Variables'

export default class Divider extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, height: 1, backgroundColor: Variables.colorGray }} />
        <Text style={{flex: 1, textAlign: 'center', marginLeft: 15, marginRight: 15, color: Variables.colorGray}}>{this.props.text}</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: Variables.colorGray}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 50,
    marginRight: 50,
    marginTop: 10,
    marginBottom: 10
  }
});