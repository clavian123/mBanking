import React from 'react';
import{
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    ToastAndroid,
    KeyboardAvoidingView
}from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import {
    refreshEasyPinLogin
} from '../../newFunction/loginFunction'

import {
    setTargetAccount,
    getTargetAccount
} from '../../newFunction/transferFunction';

class SelectPayee extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            accName: '',
            buttonColor: '#FA8072',
            bankName: 'Bank Name or Code'
        }
    }

    handleAccNumber = () => {
        const{ deviceId, navigation } = this.props;
        this.props.dispatch(refreshEasyPinLogin(deviceId))
        navigation.goBack();
    }

    handleBankCode = () => {
        const{ navigation, route, deviceId } = this.props;
        this.props.dispatch(refreshEasyPinLogin(deviceId))
        navigation.navigate('SelectBank', {
            accNumber: route.params.accNumber
        });
    }

    handleNext = async() => {
        const{ navigation, route, deviceId } = this.props;
        this.props.dispatch(refreshEasyPinLogin(deviceId))
        if(route.params.accName == null){
            ToastAndroid.show("Enter a valid destination account", ToastAndroid.SHORT)
        }else{
            await this.props.dispatch(setTargetAccount(route.params.accName, route.params.accNumber, route.params.bankName));
            navigation.navigate('SetAmount', {
                bankName: route.params.bankName
            });
        }
    }

    handleButtonColor = () => {
        if(this.state.accName == ""){
            this.setState({buttonColor: '#FA8072'})
        }else{
            this.setState({buttonColor: '#ff0066'})
        }
    } 

    render(){

        const { route } = this.props;

        return(
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
                enabled={Platform.OS === "ios" ? true : false}
            >
                <View style={styles.selectLabel}>
                    <View style={styles.iconContainer}>
                        <Image style={styles.icon} source={require('../../../assets/icon-account.png')}/>
                    </View>
                    <View>
                        <Text style={styles.sendLabel}>Send money to</Text>
                    </View>
                </View>

                <TouchableOpacity 
                    onPress={this.handleAccNumber} 
                    style={styles.inputContainer} > 
                    <View>
                        <Text style={{color: "#888888", fontSize: 15}}>Account Number</Text>
                        <TextInput 
                            editable={false} 
                            style={styles.accNumberInput} 
                            value={this.props.route.params.accNumber} 
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this.handleBankCode}
                >
                    <View style={styles.bankInputContainer}>
                        <TextInput style={styles.bankCodeInput} editable={false} 
                        value={route.params.bankName ? route.params.bankName : this.state.bankName} />
                        <Image style={styles.nextIcon} source={require('../../../assets/icon-next.png')} />
                    </View>
                </TouchableOpacity>

                <TextInput 
                    style={styles.accNameInput}
                    placeholder="Account Name"
                    value={route.params.accName ? route.params.accName : ''}
                    onChange={this.handleButtonColor}
                />

                <View style={styles.nextContainer}>
                    <View style={styles.attentionContainer}>
                        <View style={styles.exclamationIconContainer}>
                            <Image style={styles.exclamationIcon} source={require('../../../assets/icon-exclamation.png')} />
                        </View>
                        <Text style={styles.attentionText}>Make sure payee name is correct</Text>
                    </View>
                    <TouchableOpacity onPress={this.handleNext} style={{...styles.nextButton, backgroundColor: route.params.buttonColor}}>
                        <Text style={styles.nextText}>NEXT</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    selectLabel: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 20,
        height: 40
    },
    iconContainer: {
        backgroundColor: 'blue',
        borderRadius: 50,
        width: 40,
        height: 40
    },
    icon: {
        width: 35,
        height: 35,
        tintColor: 'white',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        resizeMode: 'stretch'
    },
    sendLabel: {
        fontSize: 20,
        color: '#696969',
        paddingVertical: 5,
        paddingLeft: 10,
    },
    inputContainer: {
        marginHorizontal: 20
    },
    accNumberInput: {
        paddingVertical: 10,
        color: "#888888",
        borderBottomColor: "#888888",
        borderBottomWidth: 1,
        fontSize: 16
    },
    bankInputContainer:{
        marginHorizontal: 20,
        marginVertical: 10,
        flexDirection: 'row',
        width: '90%'
    },
    bankCodeInput: {
        color: "black",
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#888888',
        width: '100%'
    },  
    nextIcon: {
        width: 20,
        height: 20,
        marginVertical: 15,
        position: 'absolute',
        right: 10
    },
    accNameInput: {
        marginHorizontal: 20,
        marginVertical: 10,
        width: '90%',
        borderBottomColor: '#888888',
        borderBottomWidth: 1
    },
    nextContainer: {
        position: 'absolute',
        bottom: 5,
        width: '90%',
        marginHorizontal: 20,
    },
    attentionContainer:{
        flexDirection: 'row',
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        width: '100%',
        borderColor: '#888888'
    },
    exclamationIconContainer: {
        borderRadius: 50,
        backgroundColor: 'black',
        width: 30,
        height: 30
    },
    exclamationIcon: {
        width: 18,
        height: 18,
        resizeMode: 'stretch',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        tintColor: 'white'
    },
    attentionText: {
        marginVertical: 5,
        marginHorizontal: 10,
        color: '#888888'
    },
    nextButton: {
        height: 50,
        width: '100%',
        // backgroundColor: 'red',
        borderRadius: 30,
        marginVertical: 10
    },
    nextText: {
        textAlign: 'center',
        paddingVertical: 15,
        fontSize: 16,
        color: 'white'
    }
})

const mapStateToProps = state => ({
    loading: state.loading.load,
    deviceId: state.newLogin.deviceId
});

export default connect(mapStateToProps)(SelectPayee);