import React from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';

export default class BalanceInquiry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <Text>Account Number</Text>
                    <Text style={styles.textInformation}>1234567890</Text>
                </View>
                <View style={styles.subContainer}>
                    <Text>Currency</Text>
                    <Text style={styles.textInformation}>IDR</Text>
                </View>
                <View style={styles.subContainer}>
                    <Text>Available Balance</Text>
                    <Text style={styles.textInformation}>130.000.000</Text>
                </View>
            </View>
        );
    }

}

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
        alignItems: 'center',
        marginVertical: 10,
    },
    textInformation: {
        fontSize: 25,
        fontWeight: 'bold',
    }
});