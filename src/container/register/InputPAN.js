import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal
} from 'react-native';

import { connect } from 'react-redux';

import FloatingInputLabel from '../../component/FloatingInputLabel';

import Loading from '../../Loading'

import {
  checkPanExist,
  checkPanExistWithLoading,
  sendRegisterOtp
} from '../../newFunction/registerFunction'

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

  checkPan = async() => {
    if(await this.props.dispatch(checkPanExist(this.state.pan))) {
        this.setState({isWrong : false})
        this.setState({buttonColor : '#ff0066'})
        this.setState({borderColor : "#888888"})
        this.setState({borderWidth : 1})
    } else {
        this.setState({borderWidth : 3})
        this.setState({buttonColor : '#FF6347'})
        this.setState({borderColor : "red"})
    }
  }

  handleContinue = async() => {
    if(await this.props.dispatch(checkPanExistWithLoading(this.state.pan))) {
        this.setState({isWrong : false});
        const { navigation } = this.props;
        await this.props.dispatch(sendRegisterOtp());
        navigation.navigate('InputOTP', {
          type: "REGISTER"
        });
    } else{
        this.setState({isWrong : true})
        this.setState({borderColor : "#888888"})
        this.setState({borderWidth : 1})
    }
  }

  render() {
    const { loading } = this.props

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
        enabled={Platform.OS === "ios" ? true : false}
        style={styles.container}
      >

        {
            loading ?
            <Modal transparent={true}>
                <Loading transparent={true}/>
            </Modal>
            : null
        }

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
  loading: state.loading.load
});

export default connect(mapStateToProps)(InputPAN);
