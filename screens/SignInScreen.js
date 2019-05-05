import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { Button, TextInput } from '../components/CommonComponents';
import Auth from '../utils/Auth';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  constructor(props) {
    super(props);
    this.state = {
      loggingIn: false,
      hasError: false,
      username: '',
      password: ''
    };
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior="padding"
        keyboardVerticalOffset={80}>
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps={'always'}
          removeClippedSubviews={false}
        >
          <TextInput
            style={styles.inputContainerStyle}
            placeholder='Phone number'
            onChangeText={text => this.setState({username: text})}/>
          <TextInput
            style={styles.inputContainerStyle}
            placeholder='Password'
            secureTextEntry={true}
            shake={this.state.hasError}
            errorMessage='ENTER A VALID ERROR HERE'
            onChangeText={(password) => this.setState({password: password})}/>
          <Button
            style={styles.inputContainerStyle}
            type="primary"
            title="Log In"
            onPress={this._signInAsync}/>
          <ActivityIndicator animating={this.state.loggingIn}/>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  _signInAsync = async () => {
    this.setState({loggingIn: true})
    Auth.logIn(this.state.username, this.state.password)
      .then(res => {
        console.log("good")
        this.props.navigation.navigate('App');
      })
      .catch(e => {
        this.setState({loggingIn: false, hasError: true})
        console.log("no good")
        console.log(e.message)
      })
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8
  },
  wrapper: {
    flex: 1,
  },
  inputContainerStyle: {
    margin: 8,
  },
});