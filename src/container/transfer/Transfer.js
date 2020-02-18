import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import RequestPIN from '../../component/RequestPIN'

export default class Transfer extends React.Component {

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
        <TouchableHighlight underlayColor="rgb(230, 230, 230)" style={styles.button} onPress={() => this.handleMenuClicked("RegisterDestinationAccount")}>
          <Text style={styles.buttonText}>Register Destination Account</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="rgb(230, 230, 230)" style={styles.button} onPress={() => this.handleMenuClicked("TransferToAnotherAccount")}>
          <Text style={styles.buttonText}>Transfer to Another Account</Text>
        </TouchableHighlight>
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
  },
  button: {
    backgroundColor: '#1c313a',
    marginVertical: 10,
    borderRadius: 10,
    paddingVertical: 16,
    width: 300,

  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center'
  },
});
