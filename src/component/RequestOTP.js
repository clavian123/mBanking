import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native';

export default class RequestOTP extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width,
            token: '',
        };
        Dimensions.addEventListener('change', (e) => {
            this.setState(e.window);
        });
    }

    closeModal = () => {
        this.props.changeRequestOTPVisibility(false);
    }

    render() {
        return (
            <TouchableOpacity activeOpacity={1} disabled={true} style={styles.container}>
                <View style={[styles.modal, { width: this.state.width - 80 }]}>
                    <View style={styles.textView}>
                        <Text style={[styles.text, { fontSize: 20 }]}>Authentication</Text>
                        <Text style={styles.text}>We have sent your OTP Token through notification. Please Input your OTP Token:</Text>
                        <TextInput
                            placeholder="OTP Token"
                            style={styles.textInput}
                            keyboardType='number-pad'
                            secureTextEntry={true}
                            maxLength={6}
                            onChangeText={(text) => this.setState({ token: text })}
                        />
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableHighlight
                            onPress={() => this.props.otpNotification()}
                            style={[styles.touchableHighlight, {paddingVertical: 0}]}
                            >
                            <Text style={[styles.text, { color: 'blue' }]}>Resend OTP Token</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableHighlight
                            onPress={() => this.closeModal()}
                            style={styles.touchableHighlight}
                        >
                            <Text style={[styles.text, { color: 'black' }]}>Cancel</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => this.props.validateOTP(this.state.token)}
                            style={styles.touchableHighlight}
                            underlayColor={'#f1f1f1'}
                        >
                            <Text style={[styles.text, { color: 'green' }]}>OK</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        height: 330,
        paddingTop: 10,
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: 'black',
    },
    text: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'justify'
    },
    textInput: {
        textAlign: 'center',
        width: 200,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: 'black',
        marginTop: 12,
    },
    touchableHighlight: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 10,
        alignSelf: 'stretch',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: 'white',
    },
    textView: {
        flex: 1,
        alignItems: 'center',

    },
    buttonView: {
        marginTop: 0,
        width: '100%',
        flexDirection: 'row',
    }
})