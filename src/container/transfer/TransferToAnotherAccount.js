import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

import RequestPIN from '../../component/RequestPIN'

export default class TransferToAnotherAccount extends React.Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      isRequestPINVisible: false,
    }
  }

  handleChooseAccount = () => {
    const { navigation } = this.props;
    navigation.navigate('ChooseDestinationAccount');
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  changeRequestPINVisibility = (bool) => {
    this.setState({ isRequestPINVisible: bool });
  }

  validatePIN = (pin) => {
    const { navigation } = this.props;
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
      alert('Transfer success.')
      navigation.goBack();
    }
  }

  handleTransfer = () => {
    this.changeRequestPINVisibility(true);
  }

  render() {

    const { route } = this.props;
    var name = route.params?.name;
    var number = route.params?.number;

    return (
      <View
        style={[styles.container, this.state.isRequestPINVisible ?
          { backgroundColor: 'rgba(0, 0, 0, 0.8)' } :
          'rgba(0, 0, 0, 0)']}
      >
        <View style={styles.subContainer}>
          <Text style={styles.textLabel}>Destination Account</Text>
          <TouchableHighlight
            onPress={() => this.handleChooseAccount()}
            style={styles.buttonDestinationAccount}
          >
            <TextInput
              editable={false}
              placeholder="-Choose-"
              style={[styles.textInput, { color: 'black' }]}
              value={name !== undefined ? name + ' - ' + number : null}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.textLabel}>Total Amount (IDR)</Text>
          <TextInput placeholder="E.g. 50000" style={styles.textInput} keyboardType="number-pad"></TextInput>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.textLabel}>Description</Text>
          <TextInput placeholder="E.g. buy new shoes" style={styles.textInput}></TextInput>
        </View>
        <View style={styles.subContainer}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.handleTransfer()}
          >
            <Text
              style={[styles.buttonText, this.state.isRequestPINVisible ? { color: 'rgb(89, 89, 89)' } : 'rgb(255, 255, 255)']}
            >
              Transfer
            </Text>
          </TouchableHighlight>
        </View>
        <Modal
          visible={this.state.isRequestPINVisible}
          transparent={true}
          onRequestClose={() => this.changeRequestPINVisibility(false)}>
          <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPressOut={() => { this.changeRequestPINVisibility(false) }}>
            <TouchableWithoutFeedback>
              <RequestPIN changeRequestPINVisibility={this.changeRequestPINVisibility} validatePIN={this.validatePIN} />
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
  subContainer: {
    marginVertical: 10,
  },
  buttonDestinationAccount: {
    borderRadius: 10,
    width: 250,
  },
  textLabel: {
    paddingLeft: 5,
    width: 250,
    textAlign: 'left',
  },
  textInput: {
    borderWidth: 1,
    paddingLeft: 10,
    paddingVertical: 8,
    borderRadius: 10,
    width: 250,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1c313a',
    borderRadius: 10,
    paddingVertical: 16,
    width: 250,
  },
});