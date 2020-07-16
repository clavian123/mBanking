import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image
} from 'react-native'
import Swipeout from 'react-native-swipeout'

export default class AccountListItem extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){

        const swipeBtns = [
            {
                component: (
                    <View style={styles.swipeContainer}>
                        <Image style={{tintColor: 'white', height: 25, width: 25, resizeMode: 'stretch'}}source={require('../../assets/icon-trash.png')} />
                    </View>
                ),
                marginVertical: 10,
                backgroundColor: "red",
                underlayColor: '#888888',
                onPress: () => {
                    console.log("Delete Item");
                }   
            }
        ]

        return(
            <Swipeout 
                style={{marginHorizontal: 20}}
                right={swipeBtns}
                autoClose="true"
                backgroundColor="transparent"
            >
                <View style={styles.container}>
                    <View style={styles.accountDetail}>
                        <Text style={{fontSize: 15}}>{this.props.name}</Text>
                        <Text style={{fontSize: 14}}>{this.props.accNumber}</Text>
                    </View>
                    <View style={styles.bankDetail}>
                        <Text style={styles.textBank} numberOfLines={2}>{'PT. Bank Sinarmas TBK.'.toUpperCase()}</Text>
                    </View>
                    <Image style={styles.iconNext} source={require('../../assets/icon-next.png')}/>
                </View>
            </Swipeout>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        paddingVertical: 10
    },
    accountDetail: {
        width: '45%'
    },
    bankDetail: {
        width: '45%'
    },
    textBank: {
        fontSize: 14, 
        color: '#888888', 
        flexWrap:'wrap', 
        textAlign: 'right'
    },
    iconNext: {
        height: 15,
        tintColor: 'lightgrey',
        width: 15,
        marginLeft: 15,
        marginVertical: 10,
        resizeMode: 'stretch'
    },
    swipeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    }
})
