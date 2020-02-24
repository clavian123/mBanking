import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import axios from 'axios';

export default class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accNumber: '',
      fullName: '',
      email: '',
      mobilePhone: '',
      idCard: '',
      pin: '',
    };
  }

  handleRegister = () => {
    const { navigate } = this.props.navigation;
    let newClient = this.createNewClient();
    let address = "http://localhost:8080/saveNewClient";

    axios.post(address, newClient).then(
      (res) => {
        this.setState({ accNumber: res.data.accNumber });
      }, (error) => {
        console.log(error);
      }
    )

    alert('Registration success!');
    navigate('Login');
  }

  createNewClient = () => {
    const { fullName, email, mobilePhone, idCard, pin } = this.state;
    return {
      fullName: fullName,
      email: email,
      mobilePhone: mobilePhone,
      idCard: idCard,
      pin: pin
    }
  }

  render() {
    return (
      <View>
        <TextInput
          value={this.state.fullName}
          onChangeText={(fullName) => this.setState({ fullName })}
          placeholder="Nama Lengkap"
          style={styles.textInput}
        >
        </TextInput>
        <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          placeholder="Email"
          style={styles.textInput}
        >
        </TextInput>
        <TextInput
          value={this.state.mobilePhone}
          onChangeText={(mobilePhone) => this.setState({ mobilePhone })}
          placeholder="Nomor Handphone"
          style={styles.textInput}
        >
        </TextInput>
        <TextInput
          value={this.state.idCard}
          onChangeText={(idCard) => this.setState({ idCard })}
          placeholder="Nomor KTP"
          style={styles.textInput}
        >
        </TextInput>
        <TextInput
          value={this.state.pin}
          onChangeText={(pin) => this.setState({ pin })}
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
          onPress={() => this.handleRegister()}
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
