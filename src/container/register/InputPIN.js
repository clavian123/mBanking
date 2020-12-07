import React, { Component } from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ToastAndroid,
    KeyboardAvoidingView
} from 'react-native';

import { connect } from 'react-redux';

import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

import {
    validatePin,
    checkCustomerExist
} from '../../newFunction/registerFunction'

class InputPIN extends Component{

    constructor(props){
        super(props);
        this.state = {
            pin: ""
        }
    }

    handleContinue = async() => {
        const { navigation } = this.props
        if(await this.props.dispatch(validatePin(this.state.pin))) {
            if(await this.props.dispatch(checkCustomerExist())) {
                navigation.navigate('ResetPassword')
            } else {
                navigation.navigate('CreateUser')
            }
        } else {
            ToastAndroid.showWithGravity("Please enter a valid PIN", ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
    }

    render(){
        return(
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
                enabled={Platform.OS === "ios" ? true : false}
            >
                <Text style={styles.label}>
                    Enter your Sinarmas ATM{'\n'}PIN
                </Text>
                <SmoothPinCodeInput
                    containerStyle={{
                        marginVertical: 20,
                    }}
                    textStyle={{
                        color: 'black',
                        fontSize: 30
                    }}
                    cellSpacing={10}
                    cellStyle={{
                        borderBottomWidth: 3,
                        borderColor: 'black',
                    }}
                    cellStyleFocused={{
                        borderColor: 'red',
                    }}
                    codeLength={6}
                    value={this.state.pin}
                    onTextChange={(code) => this.setState({ pin: code })}
                    password={true}
                    mask={<View style={{
                        width: 10,
                        height: 10,
                        borderRadius: 25,
                        backgroundColor: 'black',
                    }}></View>}
                    maskDelay={1000}
                />
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
        backgroundColor: 'white'
    },
    label: {
        fontSize: 27,
        fontWeight: 'bold',
        width: '80%',
        margin: 20
    },
    button: {
        marginHorizontal: 20,
        width: '90%',
        backgroundColor: 'red',
        borderRadius: 30,
        paddingVertical: 15,
        position: 'absolute',
        bottom: 20
    },
    buttonText: {
        fontSize: 16,
        textAlign: 'center',
        color: 'white'
    }
})

const mapStateToProps = state => ({
    
});
  
export default connect(mapStateToProps)(InputPIN);