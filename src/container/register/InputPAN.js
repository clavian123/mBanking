import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  TextInput,
  Text,
  View,
  Image
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { checkPan } from '../../action/register/registerFunction';
import { connect } from 'react-redux';

class InputPAN extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pan: '',
      buttonColor: '#FF6347'
    };
  }

  checkPan = () => {
    let pan = this.state.pan
    this.props.dispatch(checkPan(pan));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          {`As a start, help us to identify you`}
        </Text>
        <View style={styles.inputContainer}>
          <Image style={styles.icon} source={require('../../../assets/icon-card2.png')} /> 
          <TextInput
            style={styles.input}
            placeholder="Enter ATM Card Number"
            keyboardType="number-pad"
          >
          </TextInput>
        </View>
        <View style={{...styles.continueButton, backgroundColor: this.state.buttonColor}}>
          <TouchableOpacity>
            <Text style={styles.continueText}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    fontWeight: '500',
    flex: 1,
    backgroundColor: 'white'
  },
  label: {
    fontSize: 27,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginVertical: 20
  },
  inputContainer:{
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 20,
    width: '80%'
  },
  icon: {
    width: 40,
    height: 40
  },
  input: {
    fontSize: 16,
    borderBottomColor: '#888888',
    borderBottomWidth: 1,
    width: '85%',
    marginLeft: 10
  },
  continueButton: {
    position: 'absolute',
    bottom: 20,
    height: 50,
    width: '90%',
    marginVertical: 10,
    borderRadius: 30
  },
  continueText:{
    fontSize: 16,
    color: 'white',
    paddingVertical: 15,
    textAlign: 'center'
  }
});

const mapStateToProps = state => ({
  panExist: state.register.panExist
});

export default connect(mapStateToProps)(InputPAN);
