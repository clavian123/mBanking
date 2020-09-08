import React, { Component } from 'react';
import{
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ToastAndroid,
    KeyboardAvoidingView
}from 'react-native';

import { connect } from 'react-redux';
import { TextInput } from 'react-native-gesture-handler';
import { getLoginToken, validateLoginToken, getRegisterToken, validateRegisterToken } from '../../action/register/registerFunction'

class InputOTP extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            token: ""
        }
    }

    handleResend = () => {
        const { cif_code, customerDummyId, route } = this.props;
        if(route.params.type === "LOGIN"){
            this.props.dispatch(getLoginToken(cif_code));
        }else{
            this.props.dispatch(getRegisterToken(customerDummyId));
        }
    }

    handleContinue = () => {
        const { cif_code, customerDummyId, route } = this.props;
        if(route.params.type === "LOGIN"){
            this.props.dispatch(validateLoginToken(cif_code, this.state.token)).then(() => {
                const { validateLoginToken } = this.props;
                if(validateLoginToken == false){
                    ToastAndroid.show("Please enter a valid OTP token", ToastAndroid.SHORT);
                }else{
                    const { navigation } = this.props;
                    navigation.navigate('CreateEasyPin');
                }
            });
        }else{
            this.props.dispatch(validateRegisterToken(customerDummyId, this.state.token)).then(() => {
                const { validateRegisterToken } = this.props;
                if(validateRegisterToken == false){
                    ToastAndroid.show("Please enter a valid OTP token", ToastAndroid.SHORT);
                }else{
                    const { navigation } = this.props;
                    navigation.navigate('InputPIN');
                }
            })
        }
    }

    render(){
        const { email } = this.props
        return(
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
                enabled={Platform.OS === "ios" ? true : false}
            >
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
                    We just sent SMS with 6 digit token to
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
    email: state.register.email,
    customerDummyId: state.register.customerDummyId,
    cif_code: state.register.cif_code,
    validateRegisterToken: state.register.validateRegisterToken,
    validateLoginToken: state.register.validateLoginToken
});
  
export default connect(mapStateToProps)(InputOTP);