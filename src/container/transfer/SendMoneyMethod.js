import React, { Component } from 'react';
import{
    View,
    Text,
    StyleSheet
}from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

class SendMoneyMethod extends Component{

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.label}>Send Money Methods</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    label: {
        width: '80%',
        marginHorizontal: 20,
        marginVertical: 20,
        fontSize:  23,
        color: '#888888'
    }
});

export default SendMoneyMethod;