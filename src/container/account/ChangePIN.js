import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import RequestPIN from '../../component/RequestPIN'

export default class ChangePIN extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <TextInput placeholder="Old PIN" style={styles.textInput} keyboardType="number-pad" secureTextEntry={true}></TextInput>
                </View>
                <View style={styles.subContainer}>
                    <TextInput placeholder="New PIN" style={styles.textInput} keyboardType="number-pad" secureTextEntry={true}></TextInput>
                </View>
                <View style={styles.subContainer}>
                    <TextInput placeholder="Confirm New PIN" style={styles.textInput} keyboardType="number-pad" secureTextEntry={true}></TextInput>
                </View>
                <View style={styles.subContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => this.handleChange()}>
                        <Text style={styles.buttonText}>Change PIN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignSelf: "center",
        alignContent: "center",
        alignItems: "center",
    },
    subContainer: {
        marginVertical: 10,
    },
    textInput: {
        borderWidth: 1,
        paddingLeft: 10,
        paddingVertical: 8,
        borderRadius: 10,
        width: 250,
    },
    buttonText: {
        fontSize: 17,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#c10000',
        marginVertical: 10,
        borderRadius: 10,
        paddingVertical: 16,
        width: 300,
    },
});