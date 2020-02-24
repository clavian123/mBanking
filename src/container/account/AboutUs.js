import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class AboutUs extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textTitle}>
                    DBBS 3 MOBILE BANKING APPLICATION
                </Text>
                <Text style={styles.textLabel}>Developed By:</Text>
                <Text style={styles.textName}>Dania Ester</Text>
                <Text style={styles.textName}>Joel Geraldine</Text>
                <Text style={styles.textName}>Kevin Willianes</Text>
                <Text style={styles.textName}>Rian Krishandi</Text>
            </View >
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
    textTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    textLabel: {
        marginVertical: 15,
        textAlign: "center",
    },
    textName: {
        fontSize: 17,
        fontWeight: 'bold'
    }
});