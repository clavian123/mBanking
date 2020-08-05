import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import { login, getLoginToken } from '../action/register/registerFunction';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
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
          this.props.dispatch(getLoginToken(cif_code)).then(() => {
            navigation.navigate("InputOTP", {
              type: "LOGIN"
            });
          });
        }else{
          
        }
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewLogo}>
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
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    fontWeight: '500',
    // backgroundColor: '#dddddd',
  },
  viewLogo: {
    alignItems: "center",
    justifyContent: "flex-end",
    flexGrow: 1,
  },
  viewInput: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: "center",
    // backgroundColor:'red'
  },
  viewSignUp: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginVertical: 16,
    flexDirection: 'row',
  },
  textInput: {
    width: 300,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginVertical: 10,
    fontSize: 16,
    // backgroundColor: "#eeeeee",
    // elevation: 10,
  },
  imageLogo: {
    width: 130,
    height: 130,
  },
  textLogo: {
    marginVertical: 10,
    fontSize: 20,
  },
  textLogin: {
    fontSize: 17,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center'
  },
  textSignUpLabel: {
    fontSize: 16,
  },
  textSignUp: {
    fontSize: 16,
    color: 'rgb(0,0,255)',
  },
  buttonLogin: {
    backgroundColor: '#c10000',
    marginVertical: 10,
    borderRadius: 10,
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
    paddingVertical: 16,
    width: 300,
    // elevation: 10,
  }
});

const mapStateToProps = state => ({
  validateLogin: state.register.validateLogin,
  cif_code: state.register.cif_code
});

export default connect(mapStateToProps)(Login)