import React, { Component } from 'react';
import{
    View,
    Text,
    StyleSheet
}from 'react-native';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

import {
    formatCurrency
} from '../../utils/index'

import {
    refreshEasyPinLogin
} from '../../newFunction/loginFunction'

import {
    createBillPaymentTransaction
} from '../../newFunction/paymentFunction'

class PaymentDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            detail: {
                debited_account_name: ''
            }
        }
    }

    async componentDidMount(){
        const { deviceId } = this.props;
        this.setState({ detail: await this.props.dispatch(createBillPaymentTransaction(deviceId)) })
    }
    
    componentWillUnmount() {
        this.setState = (detail, callback)=>{
            return;
        };
    }

    handleClose(){
        const { deviceId, navigation } = this.props;
        this.props.dispatch(refreshEasyPinLogin(deviceId))
        navigation.popToTop();
    }

    render(){
        var moment = require('moment');        

        return(
            <ScrollView style={styles.container}>
                <View style={styles.checkIconContainer}>
                    <Icon
                        name="ios-checkmark-circle-outline"
                        type="ionicon"
                        iconStyle={styles.checkIcon}></Icon>
                </View>
                <View style={styles.header}>
                    <Icon
                    name="ios-close"
                    type="ionicon"
                    iconStyle={styles.closeButton}
                    onPress={()=> this.handleClose()}></Icon>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Bill Payment</Text>
                    <Text style={styles.title}>Success</Text>
                </View>

                <View style={styles.amountContainer}>
                    <Text style={{color: 'grey'}}>TOTAL AMOUNT</Text>
                    <Text style={styles.amount}>{formatCurrency(this.state.detail.total_amount_debited)}</Text>
                </View>

                <View style={styles.paymentDetailContainer}>
                    <Text style={{color: 'grey'}}>PAYMENT DETAIL</Text>
                    <View style={styles.detailContainer}>
                        <Text>Amount</Text>
                        <Text style={{fontWeight: 'bold'}}>{formatCurrency(this.state.detail.amount)}</Text>
                    </View>
                    <View style={styles.detailContainer}>
                        <Text>Fee</Text>
                        <Text style={{fontWeight: 'bold'}}>{formatCurrency(this.state.detail.fee)}</Text>
                    </View>
                </View>

                <View style={styles.fromContainer}>
                    <Text style={{color: 'grey'}}>FROM</Text>
                    <Text style={{ marginTop: 5, fontWeight: 'bold' }}>{this.state.detail.debited_account_name.toUpperCase()}</Text>
                    <Text>{"SavingAccount " + this.state.detail.debited_account_number}</Text>
                </View>

                <View style={styles.sentToContainer}>
                    <Text style={{color: 'grey'}}>SENT TO</Text>
                    <Text style={{marginTop: 5, fontWeight: 'bold'}}>{this.state.detail.merchant_name + " Payment"}</Text>
                    <Text>{this.state.detail.subscriber_number}</Text>
                </View>

                <View style={styles.divider}></View>
                
                <View style={styles.transactionDetailContainer}>
                    <Text style={{color: 'grey'}}>TRANSACTION DETAIL</Text>
                    <View style={styles.transactionDetail}>
                        <Text>Date and Time</Text>
                        <Text>{moment(this.state.detail.transaction_date).format('DD MMM YYYY, hh:mm A')}</Text>
                    </View>
                    <View style={styles.transactionDetail}>
                        <Text>Transaction ID</Text>
                        <Text>{this.state.detail.transaction_reference_number}</Text>
                    </View>
                </View>

                <View style={styles.divider}></View>

                <Text style={styles.footer}>This receipt is valid proof of transaction from PT. Bank Sinarmas, Tbk.</Text>

                

            </ScrollView>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        overflow: 'visible'
    },
    header: {
        flexDirection: 'row',
        height: 40,
        width: '100%',
        alignItems: 'center',
        padding: 10,
    },
    closeButton:{
        fontSize: 45
    }, 
    titleContainer:{
        width: '100%',
        padding: 5,
    },
    title:{
        fontSize: 25,
        fontWeight: 'bold'
    },
    amountContainer: {
        width: '100%',
        padding: 5,
        marginTop: 40,
    },
    amount:{
        fontSize: 25,
        fontWeight: 'bold'
    },
    paymentDetailContainer:{
        marginTop: 10,
        padding: 5,
    },
    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    fromContainer:{
        padding : 5,
        marginTop: 5
    },
    sentToContainer:{
        padding: 5,
        marginTop: 5,
    },
    divider:{
        borderWidth: 0.5,
        borderStyle: 'dashed',
        borderRadius: 5,
        marginVertical: 20,
    },
    transactionDetailContainer:{
        padding: 5
    },
    transactionDetail:{
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    footer:{
        color: 'grey',
        textAlign: 'center',
        marginBottom: 30
    },
    checkIconContainer:{
        backgroundColor: 'rgba(0,255,0,0.2)',
        position: 'absolute',
        width: 180,
        height: 180,
        borderRadius: 90,
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        right: -20,
    },
    checkIcon:{
        fontSize: 150,
        width: 150,
        borderRadius: 75,
        color: 'green',
        backgroundColor: 'rgba(255,255,255,0.7)',
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})

const mapStateToProps = state => ({
    deviceId: state.newLogin.deviceId
});

export default connect(mapStateToProps)(PaymentDetail)