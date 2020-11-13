import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ToastAndroid,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';

import { login, getLoginToken } from '../action/register/registerFunction';
import FloatingInputLabel from '../component/FloatingInputLabel';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      secureText: true
    }
  }

  handleLogin = () => {
    const { navigation } = this.props;
    const { username, password } = this.state;
    if (username == '' || password == '') {
      alert("Please fill your Email and Password!");
    } else {
      this.props.dispatch(login(username, password)).then(() => {
        const { validateLogin, cif_code } = this.props;
        if (validateLogin == true) {
          this.props.dispatch(getLoginToken(cif_code))
          navigation.navigate("InputOTP", {
            type: "LOGIN"
          });
        } else {
          ToastAndroid.showWithGravity("Invalid username or password!", ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
      });
    }
  }

  handleSecureText = () => {
    if (this.state.secureText == true) {
      this.setState({ secureText: false })
    } else {
      this.setState({ secureText: true })
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.registerContainer}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity
              onPress={
                () => this.props.navigation.navigate('InputPAN')
              }
            >
              <Text style={styles.registerText}> Register</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.greet}>Great to see you</Text>
          <View style={styles.usernameContainer}>
            <Image style={styles.accountIcon} source={require('../../assets/icon-account.png')} />
            <View style={styles.usernameInputContainer}>
              <FloatingInputLabel
                label={"User"}
                hint="username"
                value={this.state.username}
                input={styles.input}
                borderBottomColor={"#888888"}
                borderBottomWidth={1}
                onChangeText={(text) => this.setState({ username: text })}
                autoCapitalize="none"
              />
            </View>
          </View>
          <View style={styles.usernameContainer}>
            <Image style={styles.lockIcon} source={require('../../assets/icon-password.png')} />
            <View style={styles.usernameInputContainer}>
              <FloatingInputLabel
                label={"Password"}
                secureTextEntry={this.state.secureText}
                value={this.state.password}
                input={styles.input}
                borderBottomColor={"#888888"}
                borderBottomWidth={1}
                onChangeText={(text) => this.setState({ password: text })}
                autoCapitalize="none"
              />
            </View>
            <TouchableOpacity style={styles.eyeIconContainer} onPress={this.handleSecureText}>
              <Image style={styles.eyeIcon} source={require('../../assets/icon-eye.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.resetContainer}>
            <Text>Have login problem?</Text>
            <TouchableOpacity
              onPress={
                () => this.props.navigation.navigate('InputPAN')
              }
            >
              <Text style={styles.resetText}> Reset password</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={this.handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    flex: 1,
    alignItems: "center",
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: "flex-end",
    marginVertical: 20,
    marginRight: 35
  },
  registerText: {
    color: "#ff0066"
  },
  welcomeText: {
    fontWeight: 'bold',
    fontSize: 27,
    marginHorizontal: 30,
    marginVertical: 20
  },
  greet: {
    fontSize: 16,
    marginHorizontal: 30
  },
  usernameContainer: {
    flexDirection: 'row',
    marginHorizontal: 35,
    marginTop: 20,
    marginBottom: 10
  },
  usernameInputContainer: {
    flex: 1
  },
  accountIcon: {
    width: 30,
    height: 30,
    marginVertical: 25,
    tintColor: 'gray'
  },
  lockIcon: {
    width: 30,
    height: 30,
    marginVertical: 25,
    tintColor: 'gray'
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 0
  },
  eyeIcon: {
    width: 25,
    height: 25,
    marginVertical: 30,
    tintColor: 'black'
  },
  resetContainer: {
    flexDirection: 'row',
    justifyContent: "center"
  },
  resetText: {
    color: "#ff0066",
  },
  button: {
    width: '90%',
    position: 'absolute',
    bottom: 20,
    backgroundColor: "#ff0066",
    marginHorizontal: 20,
    borderRadius: 30
  },
  buttonText: {
    fontSize: 16,
    paddingVertical: 15,
    textAlign: 'center',
    color: 'white'
  }
});

const mapStateToProps = state => ({
  validateLogin: state.register.validateLogin,
  cif_code: state.register.cif_code
});

export default connect(mapStateToProps)(Login)