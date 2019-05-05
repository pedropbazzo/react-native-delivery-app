import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Variables from '../styles/Variables';

class DocumentNavigation extends React.Component {
  constructor(props) {
    super(props);
    
    this.toggleBack = this.toggleBack.bind(this);
  }

  toggleBack() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <TouchableHighlight onPress={this.toggleBack}>
            <Icon name='chevron-left' size={40}/>
          </TouchableHighlight>
        </View>

        <View style={{flex: 2, alignItems: 'stretch'}}>
          <Text style={styles.text}>{this.props.document.file_file_name}</Text>
        </View>

        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Icon name='phone' size={35}/>
        </View>
      </View>
    )
  }
}

export default withNavigation(DocumentNavigation);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    backgroundColor: Variables.colorWhite,
    padding: 15,
    paddingHorizontal: 30,
    marginTop: 10,
    marginBottom: 20
  },
  text: {
    fontSize: 20,
    lineHeight: 35,
    textAlign: 'center'
  }
});