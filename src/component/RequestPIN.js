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

export default class RequestPIN extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width,
            pin: '',
        };
        Dimensions.addEventListener('change', (e) => {
            this.setState(e.window);
        });
    }

    closeModal = () => {
        this.props.changeRequestPINVisibility(false);
    }

    render() {
        return (
            <TouchableOpacity activeOpacity={1} disabled={true} style={styles.container}>
                <View style={[styles.modal, { width: this.state.width - 80 }]}>
                    <View style={styles.textView}>
                        <Text style={[styles.text, { fontSize: 20 }]}>Verification</Text>
                        <Text style={styles.text}>Input your PIN:</Text>
                        <TextInput
                            placeholder="PIN"
                            style={styles.textInput}
                            keyboardType='number-pad'
                            secureTextEntry={true}
                            maxLength={6}
                            onChangeText={(text) => this.setState({ pin: text })}
                        />
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity
                            onPress={() => this.closeModal()}
                            style={{...styles.touchableOpacity, borderBottomLeftRadius: 12}}
                        >
                            <Text style={{...styles.text,  color: 'red', fontWeight: "normal" }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.validatePIN(this.state.pin)}
                            style={{...styles.touchableOpacity, borderBottomRightRadius: 12}}
                            underlayColor={'#f1f1f1'}
                        >
                            <Text style={[styles.text, { color: 'red' }]}>OK</Text>
                        </TouchableOpacity>
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
        height: 220,
        paddingTop: 10,
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: 'black',
        elevation: 5,
        backgroundColor: '#eeeeee'
    },
    text: {
        margin: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    textInput: {
        textAlign: 'center',
        width: 200,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: 'black',
        marginTop: 12,
        backgroundColor:'white'
    },
    touchableOpacity: {
        flex: 1,
        backgroundColor: '#eeeeee',
        paddingVertical: 10,
        alignSelf: 'stretch',
        alignItems: 'center',
        // borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#888888',
    },
    textView: {
        flex: 1,
        alignItems: 'center',

    },
    buttonView: {
        width: '100%',
        flexDirection: 'row',
    }
})