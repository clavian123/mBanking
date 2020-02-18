/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
} from 'react-native';

export default class Register extends Component {
  
  render() {

    return (
      <View>
        <TextInput
          placeholder="Nama Lengkap"
          style={styles.textInput}
        >
        </TextInput>
        <TextInput
          placeholder="Email"
          style={styles.textInput}
        >
        </TextInput>
        <TextInput
          placeholder="Nomor Handphone"
          style={styles.textInput}
        >
        </TextInput>
        <TextInput
          placeholder="Nomor KTP"
          style={styles.textInput}
        >
        </TextInput>
        <TextInput
          placeholder="PIN"
          style={styles.textInput}
        >
        </TextInput>
        <TextInput
          placeholder="Konfirmasi PIN"
          style={styles.textInput}
        >
        </TextInput>
        <Button
          title="Register!"
          onPress={
            () => this.props.navigation.navigate('Login')
          }
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 0, 
  }
});
