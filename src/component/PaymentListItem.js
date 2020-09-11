import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';
import Swipeout from 'react-native-swipeout';

class PaymentListItem extends Component {

    constructor(props) {
        super(props);
    }

    handleClick = () => {
        ToastAndroid.show("Oke", ToastAndroid.SHORT);
    }

    render(){

        const swipeBtns = [
            {
                component: (
                    <View style={styles.swipeContainer}>
                        <Image style={{tintColor: 'white', height: 24, width: 24, resizeMode: 'stretch'}}source={require('../../assets/icon-trash.png')} />
                    </View>
                ),
                marginVertical: 10,
                backgroundColor: "red",
                underlayColor: '#888888',
                onPress: () => {
                    ToastAndroid.show("Success", ToastAndroid.SHORT);
                }   
            }
        ]

        return(
            <Swipeout 
                style={{marginHorizontal: 0}}
                right={swipeBtns}
                autoClose={true}
                backgroundColor="transparent"
            >
                <TouchableOpacity onPress={this.handleClick} style={styles.container}>
                    <View style={styles.subscriberDetail}>
                        <Text style={{fontSize: 15}}>{this.props.number}</Text>
                    </View>
                    <View style={styles.merchantDetail}>
                        <Text style={styles.textMerchant}>{this.props.merchant}</Text>
                    </View>
                    <Image style={styles.iconNext} source={require('../../assets/icon-next.png')}/>
                </TouchableOpacity>
            </Swipeout>
        )

    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        paddingVertical: 20,
    },
    subscriberDetail: {
        width: '45%'
    },
    merchantDetail: {
        width: '45%'
    },
    textMerchant: {
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
        alignSelf: 'center',
        resizeMode: 'stretch'
    },
    swipeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    }
});

export default PaymentListItem;