import React, { Component } from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput,
    ToastAndroid,
    Alert,
    TouchableHighlight
}from 'react-native';

import { connect } from 'react-redux';
import { handleLogout } from '../../action/login/loginFunction';

class EasyPinLogin extends Component{

    constructor(props){
        super(props);
        this.state = {
            pin: ''
        }
    }

    componentDidMount(){
        const { navigation, skip } = this.props;
        if(skip == true){
            navigation.navigate('HomeTab')
        }
    }

    handleContinue = () => {
        const { easyPin, navigation } = this.props;
        if(this.state.pin != easyPin){
            ToastAndroid.show("Please enter a valid EasyPIN", ToastAndroid.SHORT);
        }else{
            navigation.navigate('HomeTab')
        }
    }

    resetEasyPin = () => {
        Alert.alert(
            "Clear Mobile Banking Data",
            "Thiw will clear Mobile Banking data on your device, are you sure?",
            [
                {
                    text: "YES, CLEAR NOW",
                    onPress: () => {
                        this.props.dispatch(handleLogout());
                    }
                },
                {
                    text: "CANCEL"
                }
            ]
        )
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>
                        <Text>EasyPIN Login</Text>
                    </Text>
                    <Image style={styles.keyboardIcon} source={require('../../../assets/icon-keyboard.png')}/>
                </View>
                <Text style={styles.descriptionText}>Enter your 6 digit secure code</Text>
                <TextInput 
                    style={styles.input} 
                    selectionColor="#FFFFFF"
                    keyboardType='number-pad' 
                    maxLength={6} 
                    secureTextEntry={true} 
                    onChangeText={(text) => this.setState({ pin: text })}
                />
                <Text style={styles.remindText}>For your security, please keep your EasyPIN secret</Text>
                <View style={styles.resetContainer}>
                    <Text style={styles.remindText}>Have login problem? </Text>
                    <TouchableHighlight onPress={this.resetEasyPin}>
                        <Text style={styles.resetButton}>Reset EasyPIN</Text>
                    </TouchableHighlight>
                </View>
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
    resetContainer: {
        flexDirection: 'row',
        width: '80%',
        marginHorizontal: 20
    },
    resetButton: {
        textDecorationLine: 'underline',
        color: 'white',
        fontWeight: 'bold'
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
    easyPin: state.login.easyPin,
    skip: state.register.skip
});

export default connect(mapStateToProps)(EasyPinLogin);