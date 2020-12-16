import React, { Component } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ToastAndroid,
  KeyboardAvoidingView,
  Modal
} from 'react-native';

import DeviceInfo from 'react-native-device-info';

import Loading from '../../Loading';

import { connect } from 'react-redux';

import { 
  checkUserLogin,
  createUserLogin,
  handleLogin
} from '../../newFunction/loginFunction';

class ConfirmEasyPin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      confirmEasyPin: ''
    }
  }

  handleContinue = async() => {
    const confirmEasyPin = this.state.confirmEasyPin;
    const { route } = this.props;
    const { easyPin } = route.params;
    const deviceId = DeviceInfo.getUniqueId();
    if (confirmEasyPin != easyPin) {
      ToastAndroid.showWithGravity("Please enter a valid EasyPIN", ToastAndroid.SHORT, ToastAndroid.CENTER);
    } else {
      if(await this.props.dispatch(checkUserLogin())) {
        ToastAndroid.showWithGravity("This username has logged in other device", ToastAndroid.SHORT, ToastAndroid.CENTER);
      } else {
        await this.props.dispatch(createUserLogin(deviceId, easyPin));
        await this.props.dispatch(handleLogin(deviceId));
      }
    }
  }

  render() {
    const { loading } = this.props;

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
        enabled={Platform.OS === "ios" ? true : false}
      >

        {
            loading ? 
            <Modal transparent={true}>
                <Loading transparent={true}/>
            </Modal>
            : null
        }

        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>
            <Text>Confirm </Text>
            <Text style={styles.boldText}>EasyPIN</Text>
          </Text>
          <Image style={styles.keyboardIcon} source={require('../../../assets/icon-keyboard.png')} />
        </View>
        <Text style={styles.descriptionText}>Enter your 6 digit code</Text>
        <TextInput
          style={styles.input}
          tintColor={'white'}
          keyboardType='number-pad'
          maxLength={6}
          secureTextEntry={true}
          autoFocus={true}
          onChangeText={(text) => this.setState({ confirmEasyPin: text })}
        />
        <Text style={styles.remindText}>For your security, please keep your EasyPIN secret</Text>
        <TouchableOpacity style={styles.button} onPress={this.handleContinue}>
          <Text style={styles.buttonText}>CONTINUE</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    fontWeight: '500',
    flex: 1,
    backgroundColor: '#ff0066'
  },
  labelContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 40,
    width: '80%',
    alignItems: 'center'
  },
  labelText: {
    fontSize: 30,
    color: 'white',
  },
  boldText: {
    fontWeight: 'bold'
  },
  descriptionText: {
    marginHorizontal: 20,
    width: '80%',
    fontSize: 20,
    color: 'white'
  },
  input: {
    fontSize: 30,
    color: 'white',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    width: '80%',
    textAlign: 'center',
    marginVertical: 40
  },
  keyboardIcon: {
    width: 60,
    height: 60,
    tintColor: 'white',
    position: 'absolute',
    right: 0
  },
  remindText: {
    color: 'white'
  },
  button: {
    marginHorizontal: 20,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 15,
    position: 'absolute',
    bottom: 20
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black'
  }
})

const mapStateToProps = state => ({
  loading: state.loading.load,

  cif_code: state.register.cif_code,
  name: state.register.name,
  email: state.register.email
});

export default connect(mapStateToProps)(ConfirmEasyPin);