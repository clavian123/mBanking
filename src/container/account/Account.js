import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';

import { handleLogout } from '../../action/login/loginFunction';

class Account extends React.Component {

  static navigationOptions = {
    title: 'Accounts',
  };

  handleLogout = () => {
    this.props.dispatch(handleLogout());
  }

  handleMenuClicked = (navigateTo) => {
    const { navigate } = this.props.navigation;
    navigate(navigateTo);
  }

  render() {

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => this.handleMenuClicked("ChangePIN")}>
          <Text style={styles.buttonText}>Change PIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.handleMenuClicked("AboutUs")}>
          <Text style={styles.buttonText}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.handleLogout()}>
          <Text style={styles.buttonText}>Logout</Text>
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
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#c10000',
    marginVertical: 10,
    borderRadius: 10,
    paddingVertical: 16,
    width: 300,
  },
});

export default connect()(Account);