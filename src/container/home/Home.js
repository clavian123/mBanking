import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';

import RequestPIN from '../../component/RequestPIN'

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navigationFocus: '',
      isRequestPINVisible: false,
    };
  }

  changeRequestPINVisibility = (bool) => {
    this.setState({ isRequestPINVisible: bool });
  }

  handleMenuClicked = (navigateTo) => {
    this.setState({ navigationFocus: navigateTo });
    this.changeRequestPINVisibility(true);
  }

  navigateTo = (screen) => {
    this.props.navigation.navigate(screen);
  }

  validatePIN = (pin) => {
    if (pin != "123456") {
      Alert.alert(
        'Failed',
        'Your PIN is wrong. Please try again.',
        [
          {
            text: 'OK',
            style: 'cancel',
          }
        ]
      )
    } else {
      this.changeRequestPINVisibility(false);
      this.navigateTo(this.state.navigationFocus);
    }
  }

  render() {
    return (
      <View style={[styles.container, this.state.isRequestPINVisible ?
        { backgroundColor: 'rgba(0, 0, 0, 0.8)' } :
        'rgba(0, 0, 0, 0)']}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.handleMenuClicked("BalanceInquiry")}
        >
          <Text style={styles.buttonText}>Balance Inquiry</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.handleMenuClicked("AccountStatementPickDate")}
        >
          <Text style={styles.buttonText}>Account Statement</Text>
        </TouchableOpacity>
        <Modal
          visible={this.state.isRequestPINVisible}
          transparent={true}
          onRequestClose={() => this.changeRequestPINVisibility(false)}>
          <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPressOut={() => { this.changeRequestPINVisibility(false) }}>
            <TouchableWithoutFeedback>
              <RequestPIN
                changeRequestPINVisibility={this.changeRequestPINVisibility}
                validatePIN={this.validatePIN}
              />
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
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
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1c313a',
    marginVertical: 10,
    borderRadius: 10,
    paddingVertical: 16,
    width: 300,
  },
});
