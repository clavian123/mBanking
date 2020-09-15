import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';

import { checkPan, getRegisterToken } from '../../action/register/registerFunction';
import { connect } from 'react-redux';
import FloatingInputLabel from '../../component/FloatingInputLabel';

class InputPAN extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pan : '',
      buttonColor: '#FF6347',
      borderColor: '#888888',
      borderWidth: 1,
      isWrong: false
    };
  }

  checkPan = () => {
    this.props.dispatch(checkPan(this.state.pan)).then(()=>{
      const { customerDummyId, cif_code } = this.props;
      if(customerDummyId != null){
        this.setState({isWrong : false})
        this.setState({buttonColor : '#C10000'})
        this.setState({borderColor : "#888888"})
        this.setState({borderWidth : 1})
      }else{
        this.setState({borderWidth : 3})
        this.setState({buttonColor : '#FF6347'})
        this.setState({borderColor : "red"})
      }
    });
  }

  handleContinue = () => {
    const { customerDummyId, cif_code } = this.props;
    if(customerDummyId != null){
      this.setState({isWrong : false});
      const { navigation } = this.props;
      this.props.dispatch(getRegisterToken(cif_code));
      navigation.navigate('InputOTP', {
        type: "REGISTER"
      });
    }else{
      this.setState({isWrong : true})
      this.setState({borderColor : "#888888"})
      this.setState({borderWidth : 1})
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
        enabled={Platform.OS === "ios" ? true : false}
        style={styles.container}
      >
        <Text style={styles.label}>
          {`As a start, help us to identify you`}
        </Text>

        <View style={styles.inputContainer}>
          <Image style={styles.icon} source={require('../../../assets/icon-card2.png')} /> 
          <View style={styles.inputContainer2}>
            <FloatingInputLabel 
              hint="621445xxxxxxxxxx"
              keyboardType="number-pad"
              label="Enter ATM Card Number"
              value={this.state.pan}
              input={styles.input}
              borderBottomColor={this.state.borderColor}
              borderBottomWidth={this.state.borderWidth}
              onChangeText={(text) => this.setState({pan: text}, this.checkPan)}
            />
            { this.state.isWrong && 
              <View style={styles.wrongInput}>
                <Image style={styles.wrongIcon} source={require('../../../assets/icon-exclamation.png')} />
                <Text style={styles.wrongText}>Card Number is invalid</Text>
              </View>
            }
          </View>
        </View>
        
        <View style={{...styles.continueButton, backgroundColor: this.state.buttonColor}}>
          <TouchableOpacity onPress={() => this.handleContinue()}>
            <Text style={styles.continueText}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    width: 45,
    height: 45,
    marginVertical: 15
  },
  inputContainer2:{
    width: '100%'
  },
  input: {
    fontSize: 16,
    width: '80%',
    // marginLeft: 10
  },
  wrongInput:{
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 10
  },
  wrongIcon:{
    width: 16,
    height: 16,
    tintColor: 'red'
  },  
  wrongText:{
    color: 'red',
    fontWeight: 'bold'
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
  customerDummyId: state.register.customerDummyId,
  cif_code: state.register.cif_code
});

export default connect(mapStateToProps)(InputPAN);
