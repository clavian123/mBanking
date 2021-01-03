import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity, 
    ToastAndroid,
    Animated
} from 'react-native'

import { connect } from 'react-redux';

import {
    refreshEasyPinLogin
} from '../newFunction/loginFunction'

import {
    setTargetAccount,
    inactiveTargetAccount,
    getTargetAccountList
} from '../newFunction/transferFunction'

import Swipeable from 'react-native-gesture-handler/Swipeable'

class AccountListItem extends React.Component{

    constructor(props) {
        super(props);
    }

    handleClick = () => {
        const { deviceId, navigation } = this.props;
        this.props.dispatch(refreshEasyPinLogin(deviceId))
        this.props.dispatch(setTargetAccount(this.props.name, this.props.accNumber, this.props.bankName));
        navigation.navigate('SetAmount', {
            bankName: this.props.bankName
        });
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
        await this.props.dispatch(inactiveTargetAccount(deviceId, this.props.bankName, this.props.accNumber));
        this.props.refreshList(await this.props.dispatch(getTargetAccountList(deviceId)))
        ToastAndroid.show('Target account deleted', ToastAndroid.SHORT)
    }

    render(){

        return(
            <TouchableOpacity onPress={this.handleClick}>
                <Swipeable renderRightActions={this.rightActions}>
                    <View style={styles.container} >
                        <View style={styles.accountDetail}>
                            <Text style={{fontSize: 15}}>{this.props.name}</Text>
                            <Text style={{fontSize: 14}}>{this.props.accNumber}</Text>
                        </View>
                        <View style={styles.bankDetail}>
                            <Text style={styles.textBank} numberOfLines={2}>{this.props.bankName}</Text>
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
        paddingVertical: 10,
        marginHorizontal: 20
    },
    accountDetail: {
        width: '45%'
    },
    bankDetail: {
        width: '45%',
        justifyContent: 'center'
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
});

export default connect(mapStateToProps)(AccountListItem);
