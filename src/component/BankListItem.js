import React from 'react';
import {
    View,
    Text, 
    StyleSheet,
    Image
}from 'react-native';

export default class BankListItem extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.bankName} numberOfLines={2}>{this.props.name}</Text>
                    <Text style={styles.bankCode}>{this.props.code}</Text>
                </View>
                <Image style={styles.nextIcon} source={require('../../assets/icon-next.png')} />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        marginHorizontal: 20,
        paddingVertical: 10,
        borderBottomColor: '#888888',
        borderBottomWidth: 1
    },
    textContainer:{
        width: '45%',
    },
    bankName:{
        fontSize: 15,
        fontWeight: 'bold',
        flexWrap: 'wrap'
    },
    bankCode:{
        fontSize: 15,
        color: '#696969'
    },
    nextIcon:{
        width: 25,
        height: 25,
        resizeMode: 'stretch',
        position: 'absolute',
        right: 5,
        marginVertical: 25
    }
})