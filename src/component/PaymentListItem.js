import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ToastAndroid,
    Animated
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { connect } from 'react-redux';

import { 
    refreshEasyPinLogin
} from '../newFunction/loginFunction'

import {
    setTargetSubscriber,
    checkSubscriberExist,
    inactiveTargetSubscriber,
    getUserTargetSubscribers
} from '../newFunction/paymentFunction'

class PaymentListItem extends Component {

    constructor(props) {
        super(props);
    }

    handleClick = async() => {
        const { deviceId } = this.props
        this.props.dispatch(refreshEasyPinLogin(deviceId))
        if(this.props.merchant == "Tokopedia") {
            let name = await this.props.dispatch(checkSubscriberExist(this.props.number));
            if( name == "" ) {
                ToastAndroid.show("This account didn't have bill", ToastAndroid.SHORT);
            } else {
                await this.props.dispatch(setTargetSubscriber(this.props.number, name, this.props.name));
                this.props.navigation.navigate('PaymentSetAmount');
            }
        } else{
            let name = await this.props.dispatch(checkSubscriberExist(this.props.number));
            await this.props.dispatch(setTargetSubscriber(this.props.number, name, this.props.name));
            this.props.navigation.navigate('PaymentSetAmount');
        }
    }

    rightActions = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0]
        })
        return (
            <TouchableOpacity onPress={() => { this.handleDelete() } }>
                <View style={styles.swipeContainer}>
                    <Animated.Text style={{ ...styles.swipeText, transform: [{scale}] }}>
                        Delete
                    </Animated.Text>
                </View>
            </TouchableOpacity>
        )
    }

    handleDelete = async() => {
        const { deviceId } = this.props;
        await this.props.dispatch(inactiveTargetSubscriber(deviceId, this.props.number));
        this.props.refreshList(await this.props.dispatch(getUserTargetSubscribers(deviceId, this.props.code)))
        ToastAndroid.show("Target subscriber deleted", ToastAndroid.SHORT)
    }

    render(){

        return(
            <TouchableOpacity onPress={this.handleClick}>
                <Swipeable renderRightActions={this.rightActions}>
                    <View style={this.props.name != "" ? {...styles.container, paddingVertical: 10} : styles.container}>
                        <View style={styles.subscriberDetail}>
                            { this.props.name != "" ? 
                            <Text style={{fontSize: 15}}>{this.props.name}</Text>
                            :
                            null
                            }
                            <Text style={this.props.name == "" ? {fontSize: 15} : {fontSize: 14}}>{this.props.number}</Text>
                        </View>
                        <View style={styles.merchantDetail}>
                            <Text style={styles.textMerchant}>{this.props.merchant}</Text>
                        </View>
                        <Image style={styles.iconNext} source={require('../../assets/icon-next.png')}/>
                    </View>
                </Swipeable>
            </TouchableOpacity>
        )

    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        paddingVertical: 20,
        justifyContent: 'center'
    },
    subscriberDetail: {
        width: '45%'
    },
    merchantDetail: {
        width: '45%',
        justifyContent: 'center'
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
        backgroundColor: 'red',
        justifyContent: 'center'
    },
    swipeText: {
        color: 'white',
        paddingHorizontal: 10,
        fontSize: 20
    }
});

const mapStateToProps = state => ({
    deviceId: state.newLogin.deviceId
})

export default connect(mapStateToProps)(PaymentListItem);