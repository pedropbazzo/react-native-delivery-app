import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import Variables from '../styles/Variables';

class TripDocument extends React.Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.navigation.navigate('Document', {
      document: this.props.document
    });
  }

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.onPress}>
        <View style={[styles.statusContainer, styles[this.props.document.status]]}/>
        <View style={styles.contentContainer}>
          <View style={styles.infoContainer}>
            {(() => {
              if (this.props.document.document_type) {
                return (<Text style={styles.name}>{this.props.document.document_type.name}: {this.props.document.file_file_name}</Text>)
              } else {
                return (<Text style={styles.name}>{this.props.document.file_file_name}</Text>)
              }
            })()}
            <Text style={styles.metadata}>
              {moment(this.props.document.created_at).format('MMM. D, YYYY, HH:mm')}
            </Text>
          </View>
          <View style={styles.actionContainer}>
            <Text style={styles.action}>Detail</Text>
            <Icon name='chevron-right' size={30} color={Variables.colorGray}/>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(TripDocument);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9'
  },
  statusContainer: {
    width: 10,
    height: '100%'
  },
  contentContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    padding: 10
  },
  infoContainer: {
    flexDirection: 'column',
    flexGrow: 1
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  name: {
    fontSize: 18,
    lineHeight: 22
  },
  metadata: {
    fontSize: 14,
    lineHeight: 14,
    color: Variables.colorGray
  },
  action: {
    fontSize: 16,
    color: Variables.colorGray
  },
  ok: {
    backgroundColor: Variables.colorGreen
  },
  warning: {
    backgroundColor: Variables.colorYellow
  },
  danger: {
    backgroundColor: Variables.colorRed
  }
});