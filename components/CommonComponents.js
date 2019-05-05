import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';
import {
  Button as BasicButton,
  FormInput as BasicInput
} from 'react-native-elements';
import Variables from '../styles/Variables';

class Button extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={[styles.button, styles[this.props.type + "Button"], styles[this.props.size + "Button"], (this.props.disabled ? styles.disabledButton : {}), this.props.style]}
        disabled={this.props.disabled}
        onPress={this.props.onPress}>
        {(() => {
          if (this.props.title)
            return (<Text style={[styles.text, styles[this.props.type + "Text"], styles[this.props.size + "Text"]]}>{this.props.title}</Text>)
          else
            return this.props.value
        })()}
      </TouchableOpacity>
    )
  }
}

class TextInput extends React.Component {
  render() {
    return (
      <BasicInput
        placeholder={this.props.placeholder}
        errorMessage={this.props.errorMessage}
        secureTextEntry={this.props.secureTextEntry}
        shake={this.props.shake}
        onChangeText={this.props.onChangeText}/>
    )
  }
}

export {
  Button,
  TextInput
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    padding: 12,
    borderRadius: 30
  },
  disabledButton: {
    backgroundColor: Variables.colorGray
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  smallButton: {
    height: 28,
    padding: 5,
    paddingHorizontal: 15
  },
  smallText: {
    fontSize: 15,
    fontWeight: 'normal'
  },
  primaryButton: {
    backgroundColor: Variables.colorBlue
  },
  primaryText: {
    color: Variables.colorWhite
  },
  secondaryButton: {
    backgroundColor: Variables.colorGreen
  },
  secondaryText: {
    color: Variables.colorWhite
  }
});