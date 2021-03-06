import React from 'react';
import {
    View,
    Text, 
    StyleSheet,
    Image,
    TouchableOpacity,
    ToastAndroid
}from 'react-native';
import { acc } from 'react-native-reanimated';

import { connect } from 'react-redux';

import {
    refreshEasyPinLogin
} from '../newFunction/loginFunction'

import {
    checkAccountExist
} from '../newFunction/transferFunction';

class BankListItem extends React.Component{

    constructor(props) {
        super(props);
    }

    handlePress = async() => {
        const{ navigation, deviceId } = this.props;
        const accName = await this.props.dispatch(checkAccountExist(this.props.accNumber));
        this.props.dispatch(refreshEasyPinLogin(deviceId))
        if (await accName != "") {
            navigation.navigate('SelectPayee', {
                buttonColor: '#ff0066',
                accName: accName,
                bankName: this.props.name
            });
        } else {
            ToastAndroid.show('Fail: Add Transfer List Fail', ToastAndroid.SHORT);
            navigation.navigate('SelectPayee', {
                buttonColor: '#FA8072'
            });
        }
    }

    render(){
        return(
            <TouchableOpacity onPress={this.handlePress}>
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={styles.bankName} numberOfLines={2}>{this.props.name}</Text>
                        <Text style={styles.bankCode}>{this.props.code}</Text>
                    </View>
                    <Image style={styles.nextIcon} source={require('../../assets/icon-next.png')} />
                </View>
            </TouchableOpacity>
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

const mapStateToProps = state => ({
    deviceId: state.newLogin.deviceId,
    destAcc: state.transfer.destAcc
});

export default connect(mapStateToProps)(BankListItem)