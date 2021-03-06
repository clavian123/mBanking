import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    ToastAndroid,
    KeyboardAvoidingView
} from 'react-native';

import { connect } from 'react-redux';
import FloatingInputLabel from '../../component/FloatingInputLabel';

import {
    getUsername,
    resetUserPassword
} from '../../newFunction/registerFunction'

class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
            username: '',
            wrongPassword: "Password length must be longer than 8 characters",
            wrongConfirmPassword: "You must confirm your password",
            passwordBorderColor: '#888888',
            passwordBorderWidth: 1,
            confirmPasswordBorderColor: '#888888',
            confirmPasswordBorderWidth: 1,
            securePasswordText: true,
            secureConfirmText: true
        }
    }

    async componentDidMount() {
        this.setState({ username: await this.props.dispatch(getUsername()) });
    }

    componentWillUnmount() {
        this.setState({ username: '' });
    }

    handlePasswordText = () => {
        if(this.state.securePasswordText == true){
            this.setState({ securePasswordText: false })
        }else{
            this.setState({ securePasswordText: true })
        }
    }

    handleConfirmPasswordText = () => {
        if(this.state.secureConfirmText == true){
            this.setState({ secureConfirmText: false })
        }else{
            this.setState({ secureConfirmText: true })
        }
    }

    validatePassword = () => {
        const password = this.state.password;
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
        }else if( password.includes(this.state.username) ){
            this.setState({ wrongPassword: "Password must not contain username" })
            this.setState({ passwordBorderWidth: 2 })
            this.setState({ passwordBorderColor: "#C10000" })
        }else{
            this.setState({ wrongPassword: "" })
            this.setState({ passwordBorderWidth: 1 })
            this.setState({ passwordBorderColor: "#888888" })
        }
    }

    validateConfirmPassword = () => {
        const confirmPassword = this.state.confirmPassword;
        const password = this.state.password;
        if( confirmPassword === password ){
            this.setState({ wrongConfirmPassword: "" })
            this.setState({ confirmPasswordBorderWidth: 1 })
            this.setState({ confirmPasswordBorderColor: "#888888" })
        }else{
            this.setState({ wrongConfirmPassword: "You must confirm your password" })
            this.setState({ confirmPasswordBorderWidth: 2 })
            this.setState({ confirmPasswordBorderColor: "#C10000" })
        }
    }

    handleContinue = async() => {
        const { navigation } = this.props;
        if(this.state.wrongPassword == ""){
            if(this.state.wrongConfirmPassword == ""){
                this.props.dispatch(resetUserPassword(this.state.password));
                Alert.alert(
                    "Your password is changed",
                    "One more step to go",
                    [
                        {
                            text: 'OK',
                            onPress: () => { 
                                navigation.navigate('CreateEasyPin');
                            }
                        }
                    ]
                );
            }else{
                ToastAndroid.show(this.state.wrongConfirmPassword, ToastAndroid.SHORT)
            }
        }else{
            ToastAndroid.show(this.state.wrongPassword, ToastAndroid.SHORT)
        }
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
                enabled={Platform.OS === "ios" ? true : false}
            >
                <Text style={styles.label}>
                    Enter new password
                </Text>
                <Text style={styles.description}>
                    <Text>Set new password for </Text>
                    <Text style={styles.username}>{this.state.username}</Text>
                    <Text>'s{'\n'}Mobile Banking</Text>
                </Text>
                <View style={styles.inputContainer}>
                    <Image style={styles.lockIcon} source={require('../../../assets/icon-unlock.png')}/>
                    <View style={styles.floatinInputContainer}>
                        <FloatingInputLabel
                            secureTextEntry={this.state.securePasswordText}
                            label="New password"
                            value={this.state.password}
                            input={styles.input}
                            borderBottomColor={this.state.passwordBorderColor}
                            borderBottomWidth={this.state.passwordBorderWidth}
                            onChangeText={(text) => this.setState({ password: text }, this.validatePassword)}
                            autoCapitalize="none"
                        />
                    </View>
                    <TouchableOpacity style={styles.eyeIconContainer} onPress={this.handlePasswordText}>
                        <Image style={styles.eyeIcon} source={require('../../../assets/icon-eye.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <Image style={styles.lockIcon} source={require('../../../assets/icon-unlock.png')} />
                    <View style={styles.floatinInputContainer}>
                        <FloatingInputLabel
                            secureTextEntry={this.state.secureConfirmText}
                            label="Confirm new password"
                            value={this.state.confirmPassword}
                            input={styles.input}
                            borderBottomColor={this.state.confirmPasswordBorderColor}
                            borderBottomWidth={this.state.confirmPasswordBorderWidth}
                            onChangeText={(text) => this.setState({ confirmPassword: text }, this.validateConfirmPassword)}
                            autoCapitalize="none"
                        />
                    </View>
                    <TouchableOpacity style={styles.eyeIconContainer} onPress={this.handleConfirmPasswordText}>
                        <Image style={styles.eyeIcon} source={require('../../../assets/icon-eye.png')} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.remindText}>Password is alpha-numeric, 8-20 characters length,{'\n'}and must not contain your username</Text>
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
        fontSize: 20,
        width: '80%',
    },
    username: {
        fontWeight: 'bold'
    },
    inputContainer: {
        flexDirection: 'row',
        width: '80%',
        marginHorizontal: 20,
        marginVertical: 10
    },
    lockIcon: {
        width: 25,
        height: 25,
        marginVertical: 30,
        tintColor: 'gray'
    },
    floatinInputContainer: {
        width: '85%'
    },
    input: {
        fontSize: 16,
        width: '100%'
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
    remindText: {
        color: "#888888"
    },
    button: {
        marginHorizontal: 20,
        width: '90%',
        backgroundColor: '#ff0066',
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
});

const mapStateToProps = state => ({
    customerId: state.register.customerId,
    username: state.register.username,
});

export default connect(mapStateToProps)(ResetPassword);
