import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import RequestPIN from '../../component/RequestPIN'

export default class Payment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleMenuClicked = (navigateTo) => {
    this.props.navigation.navigate(navigateTo);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => this.handleMenuClicked("CreditCard")}>
          <Text style={styles.buttonText}>Credit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.handleMenuClicked("Insurance")}>
          <Text style={styles.buttonText}>Insurance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.handleMenuClicked("PhoneBalance")}>
          <Text style={styles.buttonText}>Phone Balance</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: '#dedede'
  },
  button: {
    backgroundColor: '#c10000',
    marginVertical: 10,
    borderRadius: 10,
    paddingVertical: 16,
    width: 300,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center'
  }
});