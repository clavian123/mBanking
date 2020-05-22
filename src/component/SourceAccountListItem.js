import React from 'react';
import{
    View,
    Text,
    Image,
    StyleSheet
}from 'react-native';

export default class SourceAccountListItem extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <Image style={styles.cardIcon} source={require('../../assets/icon-card.png')}/>
                <View>
                    <Text sytle={styles.numberText}>{this.props.number}</Text>
                    <Text style={styles.typeText}>{this.props.type}</Text>
                    <Text style={styles.nameText}>{this.props.name}</Text>
                    <Text style={styles.balanceText}>Available balance Rp {this.props.balance}</Text>
                </View> 
                <Image style={styles.nextIcon} source={require('../../assets/icon-next.png')}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 10,
        backgroundColor: 'white',
        width: '100%',
        paddingVertical: 10
    },
    cardIcon: {
        width: 50,
        height: 50,
        resizeMode: 'stretch',
        marginHorizontal: 20,
        marginVertical: 20
    },
    numberText:{
        color: '#696969',
        fontWeight: 'bold'
    },
    typeText:{
        color: '#696969'
    },
    nameText:{
        color: '#696969'
    },
    balanceText:{
        color: '#696969'
    },
    nextIcon: {
        width: 20,
        height: 20,
        resizeMode: 'stretch',
        position: 'absolute',
        right: 10,
        marginVertical: 45
    }
})