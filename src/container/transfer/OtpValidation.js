import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';

import { connect } from 'react-redux';
import { TextInput } from 'react-native-gesture-handler';
import { transfer, validateTransferToken, saveNewTargetAccount, getTransferToken } from '../../action/transfer/transferFunction';
import Loading from '../../Loading'

class OtpValidation extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            token: ''
        }
    }

    handleContinue = () => {
        const { destAcc, sourceAcc, amount, sendMethod, note, cif_code, navigation } = this.props
        if(this.state.token == ''){
            ToastAndroid.show("Please enter a valid token", ToastAndroid.SHORT)
        }else{
            this.props.dispatch(validateTransferToken(cif_code, this.state.token)).then(()=> {
                const { validateOtp } = this.props
                if(validateOtp){
                    this.props.dispatch(saveNewTargetAccount(cif_code, destAcc.accNumber, destAcc.bankId)).then(()=>{
                        const { saveNewTargetAccount } = this.props
                        if(saveNewTargetAccount){
                            this.props.dispatch(transfer(sourceAcc.accNumber, destAcc.accNumber, amount, sendMethod.fee, note, destAcc.bankId)).then(() => {
                                navigation.navigate('TransactionDetail')
                            })
                        }
                        else{
                            ToastAndroid.show("Failed to register new Target Account!", ToastAndroid.SHORT)
                        }
                    })
                }else{
                    ToastAndroid.show("Token is incorrect", ToastAndroid.SHORT)
                }
            })
        }   
    }

    handleResend = () => {
        const { destAcc, cif_code, amount, sendMethod } = this.props        
        this.props.dispatch(getTransferToken(cif_code, amount + sendMethod.fee, destAcc.accNumber, destAcc.fullName, destAcc.bankName))
    }

    render() {
        const { email, loading } = this.props
        
        if(loading){
            return ( <Loading/>)
        }
        return (
            <View style={styles.container}>
                <View style={styles.labelContainer}>
                    <View>
                        <Text style={styles.labelText}>
                            Enter
                        </Text>
                        <Text style={styles.labelText2}>
                            E-mail Token
                        </Text>
                    </View>
                    <Image style={styles.image} source={require('../../../assets/icon-email.png')} />
                </View>
                <Text style={styles.messageText}>
                    We just sent SMS with 6 digit token to
                    {'\n'}
                    {email}
                </Text>
                <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    onChangeText={(text) => this.setState({ token: text })}
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
            </View>
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
    email: state.transfer.email,
    cif_code: state.login.cif_code,
    loading: state.transfer.loading,
    validateOtp: state.transfer.validateOtp,
    destAcc: state.transfer.destAcc,
    sourceAcc: state.transfer.sourceAcc,
    amount: state.transfer.amount,
    sendMethod: state.transfer.sendMethod,
    note: state.transfer.note,
    saveNewTargetAccount: state.transfer.saveNewTargetAccount
});

export default connect(mapStateToProps)(OtpValidation);