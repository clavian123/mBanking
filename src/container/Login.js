import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
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
        if(validateLogin == true){
          this.props.dispatch(getLoginToken(cif_code))
            navigation.navigate("InputOTP", {
              type: "LOGIN"
            });
        }else{
          
        }
      });
    }
  }

  handleSecureText = () => {
    if(this.state.secureText == true){
        this.setState({ secureText: false })
    }else{
        this.setState({ secureText: true })
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior={'height'}>
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
          <Image style={styles.lockIcon} source={require('../../assets/icon-unlock.png')} />
          <View style={styles.usernameInputContainer}>
          <FloatingInputLabel 
            label={"Password"}
            secureTextEntry={this.state.secureText}
            value={this.state.password}
            input={styles.input}
            borderBottomColor={"#888888"}
            borderBottomWidth={1}
            onChangeText={(text) => this.setState({ password: text })}
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
          <Text style={styles.buttonText}>LOG IN</Text>
        </TouchableOpacity>
        {/* <View style={styles.viewLogo}>
          <Image
            style={styles.imageLogo}
            source={require('../../assets/logo-project.png')}
          />
          <Text style={styles.textLogo}>M-Banking DBBS 3</Text>
        </View>
        <View style={styles.viewInput}>
          <TextInput
            value={this.state.username}
            onChangeText={(username) => this.setState({ username: username })}
            placeholder="Username"
            style={styles.textInput}
            keyboardType="email-address"
            autoCapitalize="none"
          ></TextInput>
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password: password })}
            placeholder="Password"
            style={styles.textInput}
            secureTextEntry={true}
            autoCapitalize="none"
          >
          </TextInput>
          <TouchableOpacity
            onPress={
              () => this.handleLogin()
            }
            style={styles.buttonLogin}
          >
            <Text style={styles.textLogin}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewSignUp}>
          <Text style={styles.textSignUpLabel}>Don't have an account yet? </Text>
          <TouchableOpacity
            onPress={
              () => this.props.navigation.navigate('InputPAN')
            }
          >
            <Text style={styles.textSignUp}>Sign Up</Text>
          </TouchableOpacity>
        </View> */}
      </KeyboardAvoidingView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  registerContainer: {
    flexDirection: 'row',
    width: '90%',
    marginVertical: 20,
    justifyContent: 'flex-end'
  },
  registerText: {
    color: "#C10000"
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
  usernameContainer:{
    flexDirection: 'row',
    width: '90%',
    marginHorizontal: 30,
    marginTop: 20,
    marginBottom: 10
  },
  usernameInputContainer: {
    width: '85%'
  },
  accountIcon:{
    width: 30,
    height: 30,
    marginVertical: 25,
    tintColor: 'gray'
  },
  lockIcon: {
    width: 25,
    height: 25,
    marginVertical: 30,
    tintColor: 'gray'
  },
  eyeIconContainer:{
    position: 'absolute',
    right: 30
  },
  eyeIcon: {
    width: 25,
    height: 25,
    marginVertical: 30,
    tintColor: 'black'
  },
  resetContainer: {
    flexDirection: 'row',
    marginHorizontal: 50
  },
  resetText: {
    color: "#C10000"
  },
  button: {
    width: '90%',
    position: 'absolute',
    bottom : 20,
    backgroundColor: "#C10000",
    marginHorizontal: 20,
    borderRadius: 30
  },
  buttonText: {
    fontSize: 16,
    paddingVertical: 15,
    textAlign: 'center',
    color: 'white'
  }
  // viewLogo: {
  //   alignItems: "center",
  //   justifyContent: "flex-end",
  //   flexGrow: 1,
  // },
  // viewInput: {
  //   flexGrow: 1,
  //   alignItems: 'center',
  //   justifyContent: "center",
  //   // backgroundColor:'red'
  // },
  // viewSignUp: {
  //   flexGrow: 1,
  //   alignItems: 'flex-end',
  //   justifyContent: 'center',
  //   marginVertical: 16,
  //   flexDirection: 'row',
  // },
  // textInput: {
  //   width: 300,
  //   borderColor: 'black',
  //   borderStyle: 'solid',
  //   borderWidth: 1,
  //   borderRadius: 10,
  //   paddingHorizontal: 16,
  //   marginVertical: 10,
  //   fontSize: 16,
  //   // backgroundColor: "#eeeeee",
  //   // elevation: 10,
  // },
  // imageLogo: {
  //   width: 130,
  //   height: 130,
  // },
  // textLogo: {
  //   marginVertical: 10,
  //   fontSize: 20,
  // },
  // textLogin: {
  //   fontSize: 17,
  //   fontWeight: '500',
  //   color: 'white',
  //   textAlign: 'center'
  // },
  // textSignUpLabel: {
  //   fontSize: 16,
  // },
  // textSignUp: {
  //   fontSize: 16,
  //   color: 'rgb(0,0,255)',
  // },
  // buttonLogin: {
  //   backgroundColor: '#c10000',
  //   marginVertical: 10,
  //   borderRadius: 10,
  //   // borderBottomLeftRadius: 15,
  //   // borderBottomRightRadius: 15,
  //   paddingVertical: 16,
  //   width: 300,
  //   // elevation: 10,
  // }
});

const mapStateToProps = state => ({
  validateLogin: state.register.validateLogin,
  cif_code: state.register.cif_code
});

export default connect(mapStateToProps)(Login)