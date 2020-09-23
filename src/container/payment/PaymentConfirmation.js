import React, {Component} from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    LayoutAnimation,
    Modal,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { getPaymentToken, getTargetSubscriberList } from '../../action/payment/paymentFunction';
import { numberWithDot } from '../../generalFunction';
import { setPaymentAmount } from '../../action/payment/paymentAction';
import moment from 'moment';
import { connect } from 'react-redux';

class PaymentConfirmation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isAmountDetailClicked: false,
        }
    }

    componentDidMount() {
        const { cif_code } = this.props;
        this.props.dispatch(getTargetSubscriberList('', '', cif_code));
    }

    handleAmountDetailClicked(){
        LayoutAnimation.configureNext(LayoutAnimation.create(
            150,
            LayoutAnimation.Types.linear,
            LayoutAnimation.Properties.opacity
        ));
        this.setState({
            isAmountDetailClicked: !this.state.isAmountDetailClicked
        })
    }

    handleConfirmPayment() {
        const { navigation, cif_code, targetSubscriberList, targetSubs, route } = this.props;
        this.props.dispatch(setPaymentAmount(route.params.amount));
        if (targetSubscriberList.filter((item) => item.subscribernumber == targetSubs.accNumber && item.merchant_detail.code == targetSubs.merchantCode).length != 0) {
            navigation.navigate('ValidateEasyPin', { flow: 'billpayment' });
        } else {
            this.props.dispatch(getPaymentToken(cif_code, "BILLPAYMENT", route.params.amount, "IDR", targetSubs.accNumber, targetSubs.merchantName));
            navigation.navigate('InputOTP', {
                type: 'BILLPAYMENT'
            });
        }
    }
    
    render(){
        var date = moment().utcOffset('+07:00').format('dddd, DD MMM YYYY')
        const { targetSubs, sourceAcc, route } = this.props
        const { amount } = route.params
        return(
            <ScrollView style={styles.container}>
                <Text style={styles.header}>Pay / Purchase confirmation</Text>
            
                <View style={styles.amountContainer}>
                    <View style={styles.amountTotalContainer}>
                        <Text style={styles.currency}>Rp</Text>
                        <Text style={styles.amount}>{"Rp " + numberWithDot(parseInt(amount)+parseInt(targetSubs.bankCharge))}</Text>
                        <TouchableOpacity style={styles.amountDetailButton} onPress={() => this.handleAmountDetailClicked()}>
                            <Icon
                                name={this.state.isAmountDetailClicked ? "ios-remove-circle" : "ios-add-circle"}
                                type="ionicon"
                                iconStyle={styles.amountDetailIcon}></Icon>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        ...styles.amountDetailContainer,
                        height: this.state.isAmountDetailClicked ? null : 0,
                        opacity: this.state.isAmountDetailClicked ? 1 : 0,
                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                            <Text>Amount</Text>
                            <Text>{"Rp " + numberWithDot(amount.toString())}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                            <Text>Fee</Text>
                            <Text>Rp {numberWithDot(targetSubs.bankCharge)}</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.date}>On {date}</Text>

                <View style={styles.accContainer}>
                    <Icon
                        name="wallet"
                        type="entypo"
                        iconStyle={styles.walletIcon}></Icon>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{sourceAcc.accNumber}</Text>
                        <Text>{sourceAcc.fullName}</Text>
                        <Text>Tabunganku</Text>
                    </View>
                </View>

                <Icon
                    name="options-vertical"
                    type="simple-line-icon"
                    iconStyle={styles.tripleDotIcon}>
                </Icon>

                <View style={styles.accContainer}>
                    <Icon
                        name="md-person"
                        type="ionicon"
                        iconStyle={styles.personIcon}></Icon>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{targetSubs.accNumber}</Text>
                        <Text>{targetSubs.merchantName.toUpperCase()}</Text>
                    </View>
                </View>

                <View style={styles.line}></View>

                <View style={styles.additionalInfo}>
                    <Text style={styles.infoTitle}>Payment:</Text>
                    <Text style={styles.infoValue}>{targetSubs.merchantName}</Text>
                    <Text style={styles.infoTitle}>Payment Number:</Text>
                    <Text style={styles.infoValue}>{targetSubs.accNumber}</Text>
                    <Text style={styles.infoTitle}>Name:</Text>
                    <Text style={styles.infoValue}>{targetSubs.merchantName + " " + targetSubs.accName}</Text>
                    <Text style={styles.infoTitle}>Payment Amount:</Text>
                    <Text style={styles.infoValue}>Rp. {numberWithDot(targetSubs.bankCharge + parseInt(amount))}</Text>
                    {
                        targetSubs.bankCharge > 0 ?
                        <Text style={styles.infoTitle}>Transaction fee Rp. {numberWithDot(targetSubs.bankCharge)} will be charged</Text>
                        : null
                    }

                    
                    <Text style={styles.infoTitle}>Denomination Amount:</Text>
                    <Text style={styles.infoValue}>Rp. {numberWithDot(amount)}</Text>
                </View>
                <View style={styles.alertContainer}>
                    <Icon
                    name="ios-alert"
                    type="ionicon"
                    iconStyle={styles.alertIcon}></Icon>
                    <Text style={{color: 'grey'}}>Upon completion, all transaction cannot be cancelled</Text>
                </View>
                <TouchableOpacity style={styles.transferButton} onPress={()=> this.handleConfirmPayment()}>
                    <Text style={{color: 'white', fontSize: 17}}>CONFIRM PAYMENT</Text>
                </TouchableOpacity>

            </ScrollView>
        )

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        fontSize: 20,
        padding: 20
    },
    amountContainer:{
        borderWidth: 0.8,
        marginHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center'
    },
    amountTotalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    currency: {
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'green',
        textAlignVertical: 'center',
        textAlign: 'center',
        height: 30,
        width: 30,
        borderRadius: 15,
        paddingBottom: 2,
        margin: 10
    },
    amount: {
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    amountDetailButton: {
        width: 50,
        height: 50,
        justifyContent: 'center'
    },
    amountDetailIcon: {
        fontSize: 35,
    },
    amountDetailContainer:{
        width: '95%',
        borderTopWidth: 0.5,
        borderColor: 'grey',
    },
    date: {
        margin: 20,
        fontSize: 17,
        fontWeight: 'bold',
        color: 'grey'
    },
    accContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        alignItems: 'center'
    },
    walletIcon: {
        width: 30,
        height: 30,
        backgroundColor: 'darkgoldenrod',
        fontSize: 20,
        borderRadius: 15,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        marginRight: 15,
    },
    tripleDotIcon: {
        alignSelf: 'flex-start',
        marginHorizontal: 22,
        color: 'lightgrey'
    },
    personIcon: {
        width: 30,
        height: 30,
        backgroundColor: 'dodgerblue',
        fontSize: 20,
        borderRadius: 15,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        marginRight: 15,
    },
    line: {
        borderWidth: 0.2,
        borderColor: 'grey',
        marginVertical: 20,
    },
    additionalInfo:{
        marginHorizontal: 20
    },
    infoTitle:{
        fontWeight: 'bold'
    },
    infoValue:{
        marginBottom: 10
    },
    alertContainer:{
        flexDirection: 'row',
        margin: 20,
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 10,
        alignItems: 'center'
    },
    alertIcon:{
        width: 30,
        height: 30,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 30,
        marginRight: 10
    },
    transferButton:{
        backgroundColor: '#c10000',
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 30,
        marginBottom:10
    }
});

const mapStateToProps = state => ({
    cif_code: state.login.cif_code,
    targetSubscriberList: state.payment.targetSubscriberList,
    sourceAcc: state.payment.sourceAcc,
    targetSubs: state.payment.targetSubs,
    amount: state.payment.amount,
})

export default connect(mapStateToProps)(PaymentConfirmation);