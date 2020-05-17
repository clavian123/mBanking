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
                        <Text style={[styles.text, { fontSize: 20, fontWeight: 'bold' }]}>Authentication</Text>
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
                        <TouchableOpacity
                            onPress={() => this.props.otpNotification()}
                            style={[styles.touchableHighlight, {paddingVertical: 3}]}
                            >
                            <Text style={[styles.text, { color: 'blue' }]}>Resend OTP Token</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{...styles.buttonView, borderTopWidth: 1}}>
                        <View style={{...styles.buttonView2, borderRightWidth: 1}}>
                        <TouchableOpacity
                            onPress={() => this.closeModal()}
                            style={styles.touchableHighlight}
                        >
                            <Text style={[styles.text, { color: '#c10000' }]}>Cancel</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={styles.buttonView2}>
                        <TouchableOpacity
                            onPress={() => this.props.validateOTP(this.state.token)}
                            style={styles.touchableHighlight}
                            underlayColor={'#f1f1f1'}
                        >
                            <Text style={[styles.text, { color: '#c10000', fontWeight: 'bold' }]}>OK</Text>
                        </TouchableOpacity>
                        </View>
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
        height: 305,
        paddingTop: 10,
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: 'black',
        backgroundColor: '#dedede',
    },
    text: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 16,
        textAlign: 'justify'
    },
    textInput: {
        textAlign: 'center',
        width: 200,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: 'black',
        marginTop: 12,
        backgroundColor: '#fff'
    },
    touchableHighlight: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 3,
        alignSelf: 'stretch',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 0.5,
        borderTopWidth: 0,
        borderColor: 'white',
        backgroundColor: '#dedede',
    },
    textView: {
        flex: 1,
        alignItems: 'center'
    },
    buttonView: {
        marginTop: 0,
        width: '100%',
        flexDirection: 'row',
        borderColor: '#888888',
    },
    buttonView2: {
        marginTop: 0,
        width: '50%',
        flexDirection: 'row',
        borderColor: '#888888',
    }
})