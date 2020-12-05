import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';

import { connect } from 'react-redux';

import {
  handleLogout
} from '../../newFunction/loginFunction'

class Account extends React.Component {

  static navigationOptions = {
    title: 'Accounts',
  };

  handleLogout = () => {
    const { deviceId } = this.props
    Alert.alert(  
      'Confirm Logout',  
      'Are you sure ?',  
      [  
          {
              text: 'Yes', 
              onPress: () => this.props.dispatch(handleLogout(deviceId)) 
          }, 
          {  
              text: 'No',  
              style: 'cancel',  
          }
      ]  
    );  
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
    backgroundColor: '#ff0066',
    marginVertical: 10,
    borderRadius: 10,
    paddingVertical: 16,
    width: 300,
  },
});

const mapStateToProps = state => ({
  deviceId: state.newLogin.deviceId
})

export default connect(mapStateToProps)(Account);