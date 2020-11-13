import React, {Component} from 'react';
import {
    KeyboardAvoidingView,
    View,
    StyleSheet,
    TextInput,
    Text,
    Image,
    TouchableOpacity,
    ToastAndroid,
    Modal,
} from 'react-native';
import { numberWithDot } from '../../generalFunction';
import { connect } from 'react-redux';
import { setPaymentAmount } from '../../action/payment/paymentAction';
import { getPaymentTransCharge } from '../../action/payment/paymentFunction';

class PaymentSetAmount extends Component {

    constructor(props){
        super(props)
        this.state={
            amount: ''
        }
    }

    componentDidMount(){
        var billedAmount = this.props.amount;
        if(billedAmount > 0) {
            this.setState({
                amount: billedAmount
            })
        }
    }

    handleSelectAccount = () => {
        const{ navigation } = this.props;
        navigation.navigate('SelectSource', {
            type: "Billpayment"
        });
    }

    handleNext = () => {
        const { route, navigation, sourceAcc, targetSubs} = this.props;
        const amount = this.state.amount;
        if(isNaN(amount)){
            ToastAndroid.show("Amount must be numeric", ToastAndroid.SHORT);
        }else if(amount < 20000){
            ToastAndroid.show("Amount must at least 20000", ToastAndroid.SHORT);
        }else if(route.params.sourceAccBalance == null){
            ToastAndroid.show("Please select your source account", ToastAndroid.SHORT);
        }else if(parseInt(amount) > parseInt(sourceAcc.balance)){
            ToastAndroid.show("Your balance is not enough", ToastAndroid.SHORT);
        }else{                  
            this.props.dispatch(getPaymentTransCharge(targetSubs.merchantCode, targetSubs.merchantName, targetSubs.accNumber, targetSubs.accName)).then((res) => {
                navigation.navigate('PaymentConfirmation', {
                    amount: amount
                });
            })
        }
    }

    render(){

        const { params } = this.props.route;
        var billedAmount = this.props.amount;   

        return(
            <KeyboardAvoidingView style={styles.container} >
                <View style={styles.setAmountLabelContainer}>
                    <View style={styles.rpIconContainer}>
                        <Text style={styles.rpIconText}>Rp</Text>
                    </View>
                    <Text style={styles.setAmountText}>Set the amount</Text>
                </View>

                <View style={styles.amountInputContainer}>
                    <Text style={styles.rpInputText}>Rp</Text>
                    <TextInput 
                        keyboardType={"numeric"}
                        style={styles.amountInput}
                        placeholder="0" 
                        onChangeText={(amount) => this.setState({amount:amount})}
                        defaultValue={billedAmount > 0 ? billedAmount.toString() : null}
                        editable={billedAmount > 0 ? false : true}/>
                    <Image style={styles.pencilIcon} source={require('../../../assets/icon-pencil.png')} />
                </View>

                <View style={styles.line}/>

                <View style={styles.selectSourceContainer}>
                    <View style={styles.walletIconContainer}>
                        <Image style={styles.walletIcon} source={require('../../../assets/icon-wallet.png')}/>
                    </View>
                    <Text style={styles.selectSourceText}>Select source account</Text>
                </View>

                <TouchableOpacity onPress={this.handleSelectAccount} style={styles.selectSourceContainer2}>
                    <Text style={styles.selectSourceText2}>Select source account</Text>
                    <Image style={styles.moreIcon} source={require('../../../assets/icon-more.png')}/>
                </TouchableOpacity>

                {
                    params.sourceAccName ? 
                    <View style={{...styles.sourceAccountDetailContainer, height: params ? null : 0}}>
                        <Text style={styles.sourceAccountDetailTitle}>{params.sourceAccNumber}</Text>
                        <Text>{params.sourceAccName.toUpperCase()}</Text>
                        <Text>{params.sourceAccType}</Text>
                        <Text style={{fontWeight: 'bold'}}>Balance: Rp {numberWithDot(params.sourceAccBalance)}</Text>
                    </View>
                    : null
                }

                <View style={styles.line}/>

                <View style={styles.buttonContainer}>                
                <TouchableOpacity onPress={this.handleNext} style={styles.nextButton}>
                        <Text style={styles.nextText}>NEXT</Text>
                </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    setAmountLabelContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 20
    },
    rpIconContainer:{
        backgroundColor: '#FA8072',
        width: 35,
        height: 35,
        borderRadius: 50,
        justifyContent: 'center'
    },  
    rpIconText: {
        fontSize: 16,
        textAlign: 'center',
        alignSelf: 'center',
        color: 'white',
        fontWeight: 'bold'
    },  
    setAmountText: {
        fontSize: 21,
        alignSelf: 'center',
        marginHorizontal: 10
    },
    amountInputContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rpInputText:{
        fontSize: 21,
        fontWeight: 'bold',
        position: 'absolute',
        left: 10,
        alignSelf: 'center'
    },
    amountInput:{
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: '#888888',
        borderRadius: 5
    },
    pencilIcon: {
        width: 20,
        height: 20,
        resizeMode: 'stretch',
        position: 'absolute',
        right: 10,
        alignSelf: 'center'
    },
    line:{
        width: '100%',
        height: 1,
        backgroundColor: '#dedede',
        marginVertical: 20
    },
    selectSourceContainer:{
        flexDirection: 'row',
        marginHorizontal: 20
    },
    walletIconContainer:{
        backgroundColor: 'red',
        borderRadius: 50,
        justifyContent: 'center',
        width: 35,
        height: 35
    },
    walletIcon:{
        tintColor: 'white',
        width: 20,
        height: 20,
        alignSelf: 'center',
    },
    selectSourceText:{
        fontSize: 20,
        marginVertical: 5,
        marginHorizontal: 10
    },
    selectSourceContainer2: {
        marginHorizontal: 20,
        flexDirection: 'row',
        marginVertical: 20,
        alignItems: 'center'
    },
    selectSourceText2:{
        fontSize: 16
    },
    moreIcon: {
        width: 15,
        height: 15,
        resizeMode: 'stretch',
        position: 'absolute',
        right: 10,
        alignSelf: 'center'
    },
    sourceAccountDetailContainer:{
        width: '90%',
        alignSelf: 'center'
    },
    sourceAccountDetailTitle:{
        fontWeight: 'bold',
        fontSize: 17
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    nextButton: {
        width: '90%',
        height: 50,
        backgroundColor: '#ff0066',
        borderRadius: 30,
        marginHorizontal: 20,
        marginBottom: 20
    },
    nextText: {
        textAlign: 'center',
        alignSelf :'center',
        paddingVertical: 15,
        fontSize: 16,
        color: 'white'
    }
});

const mapStateToProps = state => ({
    sourceAcc: state.payment.sourceAcc,
    amount: state.payment.amount,
    targetSubs: state.payment.targetSubs,
})

export default connect (mapStateToProps)(PaymentSetAmount);