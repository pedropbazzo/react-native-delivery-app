import React from 'react';
import {
  Text,
  StyleSheet,
  View
} from 'react-native';

export default class Address extends React.Component {
  render() {
    if (this.props.address.city) {
      return (
        <View style={styles.container}>
          <Text style={this.props.style}>{this.props.address.street1}</Text>
          {(() => {
            if (this.props.address.street2 != "")
              return (<Text style={this.props.style}>{this.props.address.street2}</Text>)
          })()}
          <Text style={this.props.style}>
            {this.props.address.city}, {this.props.address.state.code} {this.props.address.zip_code}
          </Text>
        </View>
      )
    } else {
      return (<View/>)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  }
});