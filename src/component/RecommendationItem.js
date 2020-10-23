import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';

import { setDestinationAccount } from '../action/transfer/transferFunction';
import { checkPaymentAccountNumber } from '../action/payment/paymentFunction';
import { NavigationActions } from 'react-navigation';

class RecommendationItem extends Component{

    handleClick = () => {
        const { navigation, type } = this.props;
        if(type === 'FUNDTRANSFER'){
            this.props.dispatch(setDestinationAccount(
                this.props.target_bank_merchant_id, 
                this.props.target_bank_merchant_code,
                this.props.target_bank_merchant,
                this.props.target_account_subscriber,
                this.props.target_name));
                navigation.navigate(
                    'Transfer',
                    {
                        screen: 'SetAmount'
                    })
        } else {
            this.props.dispatch(checkPaymentAccountNumber(
                this.props.target_bank_merchant_code, 
                this.props.target_account_subscriber)).then(() => {
                    navigation.navigate(
                        'Payment',
                        {
                            screen: 'PaymentSetAmount',
                            params: {
                                phoneNumber: this.props.target_account_subscriber,
                                merchant: this.props.target_bank_merchant_code
                            }
                        }
                    )
                })
        }
    }

    render(){
        return(
            <TouchableOpacity onPress={this.handleClick} style={{...styles.container, width: Dimensions.get("window").width*0.825}}>
                <View style={styles.accountDetail}>
                    <Text style={{fontSize: 15}}>{this.props.target_name}</Text>
                    <Text style={{fontSize: 14}}>{this.props.target_account_subscriber}</Text>
                </View>
                <View style={styles.bankMerchantDetail}>
                    <Text style={styles.textBankMerchant}>{this.props.target_bank_merchant}</Text>
                </View>
                <Image style={styles.iconNext} source={require('../../assets/icon-next.png')}/>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: 'darkgrey',
        borderBottomWidth: 1,
        borderBottomColor: 'darkgrey',
        flexDirection: 'row'
    },
    accountDetail: {
        width: '45%',
        justifyContent: 'center'
    },
    bankMerchantDetail: {
        width: '45%',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    textBankMerchant: {
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
    }
})

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(RecommendationItem);
