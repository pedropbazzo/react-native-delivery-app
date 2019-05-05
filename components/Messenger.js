import React from 'react';
import {
  TextInput,
  View,
  ListView,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ScrollView
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Button } from './CommonComponents';
import Variables from '../styles/Variables';
import MessengerMessage from './MessengerMessage';
import Auth from '../utils/Auth';

const ms = [{
        id: 3,
        read: false,
        body: 'Thanks for the update!',
        sent_at: '2018-11-5 12:17:00',
        profile: {
          id: 1,
          photo: 'https://s3.amazonaws.com/trucking_app/profiles/user/photos/default.png',
          owner: {
            name: 'Jeremy Sipe'
          }
        }
      }, {
        id: 2,
        read: true,
        body: 'thx, i already asked the guard shack',
        sent_at: '2018-11-5 10:25:00',
        profile: {
          id: 34,
          photo: 'https://s3.amazonaws.com/trucking_app_staging/drivers/photos/000/000/049/medium/item_1.jpg',
          owner: {
            name: 'John Driver'
          }
        }
      }, {
        id: 1,
        read: true,
        body: 'Please note that the delivery location does not allow parking overnight but there is space right outside the gate',
        sent_at: '2018-11-4 18:03:00',
        profile: {
          id: 1,
          photo: 'https://s3.amazonaws.com/trucking_app/profiles/user/photos/default.png',
          owner: {
            name: 'Jeremy Sipe'
          }
        }
      }, {
        id: 0,
        read: true,
        body: 'Please note that the delivery location does not allow parking overnight but there is space right outside the gate',
        sent_at: '2018-11-4 18:03:00',
        profile: {
          id: 1,
          photo: 'https://s3.amazonaws.com/trucking_app/profiles/user/photos/default.png',
          owner: {
            name: 'Jeremy Sipe'
          }
        }
      }]

const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
})

export default class Messenger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingMessages: true,
      body: "",
      messages: []
    }

    this.fetchMessages = this.fetchMessages.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this)
  }

  componentDidMount() {
    this.fetchMessages()
  }

  fetchMessages() {
    this.setState({loadingMessages: true});

    let messages = this.state.messages;

    ms.map(function(m) {
      let m2 = JSON.parse(JSON.stringify(m))
      m2.id = Math.random()
      m2.body = Math.random().toString(36).substring(7)
      messages.push(m2)
    })
    
    this.setState({loadingMessages: false, messages: messages}) 
  }

  handleInputChange(value) {
    this.setState({body: value})
  }

  submitForm() {
    if (this.state.body == "")
      return
    
    let m = JSON.parse(JSON.stringify(ms[0]))
    m.id = Math.random()
    m.body = this.state.body
    m.read = true
    m.sent_at = new Date()
    m.profile = Auth.profile

    let messages = this.state.messages
    messages.unshift(m)

    this.setState({body: "", messages: messages})
  }

  renderMessage(message) {
    return (
      <MessengerMessage
        key={message.id}
        message={message}
        owned={message.profile.id == Auth.profile.id}/>
    );
  }

  render() {
    let messages = dataSource.cloneWithRows(this.state.messages)

    return (
      <View style={styles.container}>
        <View style={styles.messagesContainer}>
          <ListView
            ref={"messageList"}
            enableEmptySections={true}
            renderRow={this.renderMessage}
            dataSource={messages}
            onEndReached={this.fetchMessages}
            onEndReachedThreshold={50}/>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.inputField}
            placeholder={'Write your message...'}
            value={this.state.body}
            onChangeText={this.handleInputChange}
            onSubmitEditing={this.submitForm}
            blurOnSubmit={false}
            />
        </View>
      </View>
    )
  }
}

// <Button
//   type="primary"
//   buttonStyle={{borderRadius: 30, height: 30, width: 30, paddingVertical: 2}}
//   value={<Icon name='arrow-forward' size={25} color={Variables.colorWhite}/>}
//   onPress={this.submitForm}/>

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  messagesContainer: {
    height: 250,
    flex: 1,
    transform: [{ scaleY: -1 }]
  },
  formContainer: {
    borderTopWidth: 1,
    borderTopColor: Variables.colorGray,
    paddingTop: 10,
    flexDirection: 'row'
  },
  inputField: {
    flex: 1,
    color: Variables.colorDarkGray,
    fontSize: 16
  }
});
