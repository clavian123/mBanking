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
import { getLoginToken, validateLoginToken, getRegisterToken, validateRegisterToken } from '../../action/register/registerFunction';
import { getPaymentToken, validatePaymentToken, billPayment, saveNewTargetSubscriber } from '../../action/payment/paymentFunction';
import { transfer, validateTransferToken, saveNewTargetAccount, getTransferToken } from '../../action/transfer/transferFunction';

import Loading from '../../Loading';

class InputOTP extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            token: "",
            loading: false,
        }
    }

    handleResend = () => {
        const { registercif_code, cif_code, route } = this.props;
        if(route.params.type === "LOGIN"){
            this.props.dispatch(getLoginToken(registercif_code));
        }else if(route.params.type === "REGISTER"){
            this.props.dispatch(getRegisterToken(registercif_code));
        }else if(route.params.type === "BILLPAYMENT"){
            const { paymentAmount, targetSubs } = this.props;
            this.props.dispatch(getPaymentToken(cif_code, "BILLPAYMENT", paymentAmount, "IDR", targetSubs.accNumber, targetSubs.merchantName));
        }else if(route.params.type === "FUNDTRANSFER"){
            const { destAcc, transferAmount, sendMethod } = this.props;
            this.props.dispatch(getTransferToken(cif_code, transferAmount + sendMethod.fee, destAcc.accNumber, destAcc.fullName, destAcc.bankName))
        }
        ToastAndroid.show("E-mail has been sent", ToastAndroid.SHORT)
    }

    handleContinue = () => {
        const { registercif_code, cif_code, route } = this.props;
        this.setState({loading: true})
        if(route.params.type === "LOGIN"){
            this.props.dispatch(validateLoginToken(registercif_code, this.state.token)).then(() => {
                const { validateLoginToken } = this.props;
                if(validateLoginToken == false){
                    this.setState({loading: false})
                    ToastAndroid.show("Please enter a valid OTP token", ToastAndroid.SHORT);
                }else{
                    const { navigation } = this.props;
                    this.setState({loading: false})
                    navigation.navigate('CreateEasyPin');
                }
            });
        }else if(route.params.type === "REGISTER"){
            this.props.dispatch(validateRegisterToken(registercif_code, this.state.token)).then(() => {
                const { validateRegisterToken } = this.props;
                if(validateRegisterToken == false){
                    this.setState({loading: false})
                    ToastAndroid.show("Please enter a valid OTP token", ToastAndroid.SHORT);
                }else{
                    const { navigation } = this.props;
                    this.setState({loading: false})
                    navigation.navigate('InputPIN');
                }
            })
        }else if(route.params.type === "BILLPAYMENT"){
            this.props.dispatch(validatePaymentToken("BILLPAYMENT", cif_code, this.state.token)).then(() => {
                const { validatePaymentToken } = this.props;
                if(validatePaymentToken == false){
                    this.setState({loading: false})
                    ToastAndroid.show("Please enter a valid OTP token", ToastAndroid.SHORT);
                }else {
                    const { navigation, paymentAmount, paymentSourceAcc, targetSubs } = this.props;
                    this.props.dispatch(saveNewTargetSubscriber(targetSubs.merchantCode, targetSubs.accNumber, cif_code)).then((res) => {
                        if(res){
                            this.props.dispatch(billPayment(targetSubs.accNumber, targetSubs.accName, paymentSourceAcc.accNumber, paymentAmount, targetSubs.bankCharge, targetSubs.merchantCode)).then((res)=>{
                                if(res){
                                    this.setState({loading: false})
                                    navigation.navigate('PaymentDetail')
                                }
                            })
                        }else{
                            ToastAndroid.show("Failed to register new Subscriber Account!", ToastAndroid.SHORT)
                        }
                    });
                }
                
            })
        }else if(route.params.type === "FUNDTRANSFER"){
            const { destAcc, transferSourceAcc, transferAmount, sendMethod, note, cif_code, navigation } = this.props
            this.props.dispatch(validateTransferToken(cif_code, this.state.token)).then(() => {
                const { validateTransferToken } = this.props;
                if(validateTransferToken == false) {
                    this.setState({loading: false})
                    ToastAndroid.show("Please enter a valid OTP token", ToastAndroid.SHORT);
                }else{
                    this.props.dispatch(saveNewTargetAccount(cif_code, destAcc.accNumber, destAcc.bankId)).then(()=>{
                        const { saveNewTargetAccount } = this.props
                        if(saveNewTargetAccount){
                            this.props.dispatch(transfer(transferSourceAcc.accNumber, destAcc.accNumber, transferAmount, sendMethod.fee, note, destAcc.bankId)).then(() => {
                                this.setState({loading: false})
                                navigation.navigate('TransactionDetail')
                            })
                        }
                        else{
                            ToastAndroid.show("Failed to register new Target Account!", ToastAndroid.SHORT)
                        }
                    })
                }
            })
        }
    }

    render(){
        const { route } = this.props;
        const { loading } = this.state;
        let email;
        if(route.params.type === "REGISTER"){
            email = this.props.registerEmail
        }else if(route.params.type === "LOGIN") {
            email = this.props.registerEmail
        }else {
            email = this.props.email
        }
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
                    {email}
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
    registerEmail: state.register.email,
    email: state.home.email,
    customerDummyId: state.register.customerDummyId,
    registercif_code: state.register.cif_code,
    cif_code: state.login.cif_code,
    validateRegisterToken: state.register.validateRegisterToken,
    validateLoginToken: state.register.validateLoginToken,
    
    targetSubs: state.payment.targetSubs,
    validatePaymentToken: state.payment.validateOtp,
    paymentAmount: state.payment.amount,
    paymentSourceAcc: state.payment.sourceAcc,

    destAcc: state.transfer.destAcc,
    validateTransferToken: state.transfer.validateOtp,
    transferAmount: state.transfer.amount,
    transferSourceAcc: state.transfer.sourceAcc,
    sendMethod: state.transfer.sendMethod,
    note: state.transfer.note,
    saveNewTargetAccount: state.transfer.saveNewTargetAccount
});
  
export default connect(mapStateToProps)(InputOTP);