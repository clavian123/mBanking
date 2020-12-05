import React, { Component } from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput,
    ToastAndroid
}from 'react-native';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

import {
    createFundTransfer
} from '../../newFunction/transferFunction'

import {
    formatCurrency
} from '../../utils/index'

class TransactionDetail extends Component{
    constructor(props){
        super(props),
        this.state = {
            detail: {
                total_amount_debited: 0,
                amount: 0,
                bank_charge: 0,
                account_name: '',
                account_number: '',
                target_account_name: '',
                target_bank_name: '',
                target_account_number: '',
                transfer_date: '',
                transaction_reference_number: '',
                message: ''
            }
        }
    }

    async componentDidMount(){
        const { deviceId } = this.props;
        this.setState({ detail: await this.props.dispatch(createFundTransfer(deviceId)) })
    }

    handleClose(){
        const { navigation } = this.props;
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
                    <Text style={styles.title}>Transaction</Text>
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
                        <Text>Fee (Skn)</Text>
                        <Text style={{fontWeight: 'bold'}}>{formatCurrency(this.state.detail.bank_charge)}</Text>
                    </View>
                </View>

                <View style={styles.fromContainer}>
                    <Text style={{color: 'grey'}}>FROM</Text>
                    <Text style={{ marginTop: 5, fontWeight: 'bold' }}>{this.state.detail.account_name.toUpperCase()}</Text>
                    <Text>{"SavingAccount " + this.state.detail.account_number}</Text>
                </View>

                <View style={styles.sentToContainer}>
                    <Text style={{color: 'grey'}}>TO</Text>
                    <Text style={{marginTop: 5, fontWeight: 'bold'}}>{this.state.detail.target_account_name.toUpperCase()}</Text>
                    <Text>{this.state.detail.target_bank_name + " " + this.state.detail.target_account_number}</Text>
                </View>

                <View style={styles.divider}></View>
                
                <View style={styles.transactionDetailContainer}>
                    <Text style={{color: 'grey'}}>TRANSACTION DETAIL</Text>
                    <View style={styles.transactionDetail}>
                        <Text>Date and Time</Text>
                        <Text>{moment(this.state.detail.transfer_date).format('DD MMM YYYY, hh:mm A')}</Text>
                    </View>
                    <View style={styles.transactionDetail}>
                        <Text>Transaction ID</Text>
                        <Text>{this.state.detail.transaction_reference_number}</Text>
                    </View>
                    <View style={styles.transactionDetail}>
                        <Text>Notes</Text>
                        <Text>{this.state.detail.message==='' ? "-" : this.state.detail.message}</Text>
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
        // alignItems: 'center',
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
    deviceId: state.newLogin.deviceId,

    cif_code: state.login.cif_code,
    transactionDetail: state.transfer.transactionDetail,
    destAcc: state.transfer.destAcc,
    listDest: state.transfer.listDest
});

export default connect(mapStateToProps)(TransactionDetail)