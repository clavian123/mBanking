import React, { Component } from 'react';
import{
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ToastAndroid,
    KeyboardAvoidingView,
    Modal,
}from 'react-native';

import { connect } from 'react-redux';
import { TextInput } from 'react-native-gesture-handler';

import { getPaymentToken, validatePaymentToken, billPayment, saveNewTargetSubscriber } from '../../action/payment/paymentFunction';

import {
    sendLoginOTP, 
    getUserEmail,
    validateLoginOTP,
    refreshEasyPinLogin
} from '../../newFunction/loginFunction';

import {
    sendTransferOtp,
    transferGetUserEmail,
    validateTransferOtp
} from '../../newFunction/transferFunction';

import {
    sendBillPaymentOtp,
    validateBillPaymentOtp
} from '../../newFunction/paymentFunction';

import {
    getEmail,
    sendRegisterOtp,
    validateRegisterOtp
} from '../../newFunction/registerFunction'

import Loading from '../../Loading';

class InputOTP extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            email: "",
            token: "",
            loading: false,
        }
    }

    componentDidMount = async() => {
        const { deviceId, route } = this.props;
        if( route.params.type === "FUNDTRANSFER" || route.params.type === "BILLPAYMENT" ) {
            this.setState({ email: await this.props.dispatch(transferGetUserEmail(deviceId)) });
        } else if ( route.params.type === "REGISTER") {
            this.setState({ email: await this.props.dispatch(getEmail()) });
        } else {
            this.setState({ email: await this.props.dispatch(getUserEmail()) });
        }
    }

    handleResend = () => {
        const { route, deviceId } = this.props;
        if(route.params.type === "LOGIN"){
            this.props.dispatch(sendLoginOTP());
        }else if(route.params.type === "REGISTER"){
            this.props.dispatch(sendRegisterOtp())
        }else if(route.params.type === "BILLPAYMENT"){
            this.props.dispatch(refreshEasyPinLogin(deviceId))
            this.props.dispatch(sendBillPaymentOtp(deviceId))
        }else if(route.params.type === "FUNDTRANSFER"){
            this.props.dispatch(refreshEasyPinLogin(deviceId))
            this.props.dispatch(sendTransferOtp(deviceId))
        }
        ToastAndroid.show("E-mail has been sent", ToastAndroid.SHORT)
    }

    handleContinue = async() => {
        const { route, navigation, deviceId } = this.props;
        this.setState({loading: true})
        if(route.params.type === "LOGIN"){
            if(await this.props.dispatch(validateLoginOTP(this.state.token))){
                navigation.navigate('CreateEasyPin');
            } else {
                ToastAndroid.showWithGravity("Please enter a valid OTP token", ToastAndroid.SHORT, ToastAndroid.CENTER);
            }
        }else if(route.params.type === "REGISTER"){
            if(await this.props.dispatch(validateRegisterOtp(this.state.token))) {
                navigation.navigate('InputPIN');
            } else {
                ToastAndroid.showWithGravity("Please enter a valid OTP token", ToastAndroid.SHORT, ToastAndroid.CENTER)
            }
        }else if(route.params.type === "BILLPAYMENT"){
            this.props.dispatch(refreshEasyPinLogin(deviceId))
            if( await this.props.dispatch(validateBillPaymentOtp(this.state.token)) ) {
                navigation.navigate('PaymentDetail')
            } else {
                ToastAndroid.show("Please enter a valid OTP token", ToastAndroid.SHORT);
            }
        }else if(route.params.type === "FUNDTRANSFER"){
            this.props.dispatch(refreshEasyPinLogin(deviceId))
            if( await this.props.dispatch(validateTransferOtp(this.state.token)) ) {
                navigation.navigate('TransactionDetail')
            } else {
                ToastAndroid.show("Please enter a valid OTP token", ToastAndroid.SHORT);
            }
        }
    }

    render(){
        const { loading } = this.props;

        return(
            <KeyboardAvoidingView behavior={'height'} style={styles.container}>

            {
                loading ? 
                <Modal transparent={true}>
                    <Loading transparent={true}/>
                </Modal>
                : null
            }

                <View style={styles.labelContainer}>
                    <View>
                        <Text style={styles.labelText}>
                            Enter
                        </Text>
                        <Text style={styles.labelText2}>
                            E-mail Token
                        </Text>
                    </View>
                    <Image style={styles.image} source={require('../../../assets/icon-email.png')}/>
                </View>
                <Text style={styles.messageText}>
                    We just sent 6 digit token to
                    {'\n'}
                    {this.state.email}
                </Text>
                <TextInput 
                    style={styles.input} 
                    keyboardType="number-pad"
                    onChangeText={(text) => this.setState({token: text})}
                    maxLength={6}
                />
                <View style={styles.resendContainer}>
                    <Text style={styles.resendText}>
                        Don't receive E-mail token?
                    </Text>
                    <TouchableOpacity onPress={this.handleResend}>
                        <Text style={styles.resendText2}>Resend e-mail</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.noteContainer}>
                    <Text style={styles.noteText}>
                        Note:
                    </Text>
                    <Text style={styles.noteText}>
                        Please enter E-mail Token within 5 minutes
                    </Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={this.handleContinue}>
                    <Text style={styles.buttonText}>
                        CONTINUE
                    </Text>
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
        backgroundColor: '#21C275'
    },
    labelContainer:{
        flexDirection: 'row',
        width: '80%',
        marginHorizontal: 20,
        marginVertical: 20
    },
    labelText: {
        fontSize: 30,
        color: 'white'
    },
    labelText2: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold'
    },
    image: {
        width: 60,
        height: 60,
        tintColor: 'white',
        position: 'absolute',
        right: 0
    },
    messageText: {
        fontSize: 18,
        color: 'white',
        marginHorizontal: 20,
        marginVertical: 20,
        width: '80%'
    },
    input: {
        marginHorizontal: 20,
        width: '70%',
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        textAlign: 'center',
        marginVertical: 20,
        color: 'white'
    },
    resendContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        width: '80%'
    },
    resendText: {
        fontSize: 17,
        color: 'white'
    },
    resendText2: {
        fontSize: 17,
        color: 'white',
        textDecorationLine: 'underline',
        marginLeft: 10
    },
    noteContainer: {
        width: '80%',
        marginHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        paddingVertical: 10,
        marginVertical: 20
    },
    noteText: {
        fontSize: 17,
        color: 'white',
        marginHorizontal: 10
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
        textAlign: 'center'
    }
})

const mapStateToProps = state => ({
    loading: state.loading.load,
    deviceId: state.newLogin.deviceId,
});
  
export default connect(mapStateToProps)(InputOTP);