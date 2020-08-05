import React, { Component } from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput,
    ToastAndroid
}from 'react-native';

import { connect } from 'react-redux';
import { skipEasypinLogin } from '../../action/register/registerAction'
import { handleLogin } from '../../action/login/loginFunction'

class ConfirmEasyPin extends Component{

    constructor(props){
        super(props);
        this.state = {
            confirmEasyPin: ''
        }
    }

    handleContinue = () => {
        const confirmEasyPin = this.state.confirmEasyPin;
        const { route, cif_code, name } = this.props;
        const { easyPin } = route.params;
        if(confirmEasyPin != easyPin){
            ToastAndroid.show("Please enter a valid EasyPIN", ToastAndroid.SHORT);
        }else{
            this.props.dispatch(handleLogin(name, cif_code, confirmEasyPin));
            this.props.dispatch(skipEasypinLogin(true));
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>
                        <Text>Confirm </Text>
                        <Text style={styles.boldText}>EasyPIN</Text>
                    </Text>
                    <Image style={styles.keyboardIcon} source={require('../../../assets/icon-keyboard.png')}/>
                </View>
                <Text style={styles.descriptionText}>Enter your 6 digit code</Text>
                <TextInput 
                    style={styles.input} 
                    tintColor={'white'} 
                    keyboardType='number-pad' 
                    maxLength={6} 
                    secureTextEntry={true} 
                    autoFocus={true}
                    onChangeText={(text) => this.setState({ confirmEasyPin: text })}
                />
                <Text style={styles.remindText}>For your security, please keep your EasyPIN secret</Text>
                <TouchableOpacity style={styles.button} onPress={this.handleContinue}>
                    <Text style={styles.buttonText}>CONTINUE</Text>
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
        backgroundColor: '#C10000'
    },
    labelContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 40,
        width: '80%',
        alignItems: 'center'
    },
    labelText: {
        fontSize: 30,
        color: 'white',
    },  
    boldText: {
        fontWeight: 'bold'
    },
    descriptionText: {
        marginHorizontal: 20,
        width: '80%',
        fontSize: 20,
        color: 'white'
    },
    input: {
        fontSize: 30,
        color: 'white',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        width: '80%',
        textAlign: 'center',
        marginVertical: 40
    },
    keyboardIcon: {
        width: 60,
        height: 60,
        tintColor: 'white',
        position: 'absolute',
        right: 0
    },
    remindText:{
        color: 'white'
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
        textAlign: 'center',
        color: 'black'
    }
})

const mapStateToProps = state => ({
    cif_code: state.register.cif_code,
    name: state.register.name,
});

export default connect(mapStateToProps)(ConfirmEasyPin);