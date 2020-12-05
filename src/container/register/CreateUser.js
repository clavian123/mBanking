import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity, 
    Image,
    Alert,
    ToastAndroid,
    KeyboardAvoidingView
}from 'react-native';

import { connect } from 'react-redux';
import FloatingInputLabel from '../../component/FloatingInputLabel';

import {
    checkUsernameExist,
    createNewUser
} from '../../newFunction/registerFunction'

class CreateUser extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            usernameBorderColor: '#888888',
            usernameBorderWidth: 1,
            passwordBorderColor: '#888888',
            passwordBorderWidth: 1,
            wrongUsername: "Username length must be longer than 8 characters",
            wrongPassword: "Password length must be longer than 8 characters",
            secureText: true
        }
    }

    validateUsername = async() =>{
        const username = this.state.username;
        if( username.length < 8 ){
            this.setState({ wrongUsername: "Username length must be longer than 8 characters" })
            this.setState({ usernameBorderWidth: 2 })
            this.setState({ usernameBorderColor: "#C10000" })
        }else if( await this.props.dispatch(checkUsernameExist(username)) ){
            this.setState({ wrongUsername: "Username already taken" })
            this.setState({ usernameBorderWidth: 2 })
            this.setState({ usernameBorderColor: "#C10000" })
        }else{
            this.setState({ wrongUsername: "" })
            this.setState({ usernameBorderWidth: 1 })
            this.setState({ usernameBorderColor: "#888888" })
        }
    }

    validatePassword = () =>{
        const password = this.state.password;
        const username = this.state.username;
        if( password.length < 8 ){
            this.setState({ wrongPassword: "Password length must be longer than 8 characters" })
            this.setState({ passwordBorderWidth: 2 })
            this.setState({ passwordBorderColor: "#C10000" })
        }else if( password.length > 20 ){
            this.setState({ wrongPassword: "Password length must not be longer than 20 characters" })
            this.setState({ passwordBorderWidth: 2 })
            this.setState({ passwordBorderColor: "#C10000" })
        }else if( /[^a-zA-Z0-9]/.test(password) ){
            this.setState({ wrongPassword: "Password must be alphanumeric" })
            this.setState({ passwordBorderWidth: 2 })
            this.setState({ passwordBorderColor: "#C10000" })
        }else if( password.includes(username) ){
            this.setState({ wrongPassword: "Password must not contain username" })
            this.setState({ passwordBorderWidth: 2 })
            this.setState({ passwordBorderColor: "#C10000" })
        }else{
            this.setState({ wrongPassword: "" })
            this.setState({ passwordBorderWidth: 1 })
            this.setState({ passwordBorderColor: "#888888" })
        }
    }

    handleSecureText = () => {
        if(this.state.secureText == true){
            this.setState({ secureText: false })
        }else{
            this.setState({ secureText: true })
        }
    }

    handleContinue = () =>{
        if(this.state.wrongUsername == ""){
            if(this.state.wrongPassword == ""){
                const { navigation } = this.props;
                this.props.dispatch(createNewUser(this.state.username, this.state.password));
                Alert.alert(
                    "Your user is created",
                    "One more step to go",
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                navigation.navigate('CreateEasyPin');
                            }
                        }
                    ]
                );
            }else{
                ToastAndroid.show(this.state.wrongPassword, ToastAndroid.SHORT);
            }
        }else{
            ToastAndroid.show(this.state.wrongUsername, ToastAndroid.SHORT);
        }
    }

    render(){
        return(
            <KeyboardAvoidingView style={styles.container} behavior={'height'}>
                <Text style={styles.label}>
                    Great! Now let's create{'\n'}your new account
                </Text>
                <Text style={styles.description}>
                    Enter your user name and password{'\n'}for log in into Simobi Plus
                </Text>
                <View style={styles.usernameContainer}>
                    <Image style={styles.accountIcon} source={require('../../../assets/icon-account.png')} />
                    <View style={styles.usernameInputContainer}>
                    <FloatingInputLabel 
                        label={"User name"}
                        value={this.state.username}
                        input={styles.input}
                        borderBottomColor={this.state.usernameBorderColor}
                        borderBottomWidth={this.state.usernameBorderWidth}
                        onChangeText={(text) => this.setState({username: text}, this.validateUsername)}
                        autoCapitalize="none"
                    />
                    </View>
                </View>
                <View style={styles.usernameContainer}>
                    <Image style={styles.lockIcon} source={require('../../../assets/icon-unlock.png')} />
                    <View style={styles.usernameInputContainer}>
                        <FloatingInputLabel 
                            label={"Password"}
                            secureTextEntry={this.state.secureText}
                            value={this.state.password}
                            input={styles.input}
                            borderBottomColor={this.state.passwordBorderColor}
                            borderBottomWidth={this.state.passwordBorderWidth}
                            onChangeText={(text) => this.setState({password: text}, this.validatePassword)}
                            autoCapitalize="none"
                        />
                    </View>
                    <TouchableOpacity style={styles.eyeIconContainer} onPress={this.handleSecureText}>
                        <Image style={styles.eyeIcon} source={require('../../../assets/icon-eye.png')} />
                    </TouchableOpacity>
                </View>
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
    description: {
        fontSize: 18,
        width: '80%',
        margin: 20,
        marginTop: 0
    },
    usernameContainer:{
        flexDirection: 'row',
        width: '80%',
        marginHorizontal: 20,
        marginVertical: 10
    },
    accountIcon:{
        width: 30,
        height: 30,
        marginVertical: 25,
        tintColor: 'gray'
    },
    lockIcon: {
        width: 25,
        height: 25,
        marginVertical: 30,
        tintColor: 'gray'
    },
    eyeIconContainer:{
        position: 'absolute',
        right: 30
    },
    eyeIcon: {
        width: 25,
        height: 25,
        marginVertical: 30,
        tintColor: 'black'
    },
    usernameInputContainer: {
        width: '85%'
    },  
    input: {
        fontSize: 16,
        width: '100%'
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
    button: {
        marginHorizontal: 20,
        width: '90%',
        backgroundColor: 'red',
        borderRadius: 30,
        paddingVertical: 15,
        justifyContent: 'flex-end',
        position: 'absolute',
        bottom: 20
    },
    buttonText: {
        fontSize: 16,
        textAlign: 'center',
        color: 'white'
    }
});

const mapStateToProps = state =>({
    customerDummyId: state.register.customerDummyId,
    cif_code: state.register.cif_code,
    usernameExist: state.register.usernameExist
});

export default connect(mapStateToProps)(CreateUser);