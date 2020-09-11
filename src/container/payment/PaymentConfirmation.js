import React, {Component} from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    LayoutAnimation
} from 'react-native';
import { Icon } from 'react-native-elements';
import { numberWithDot } from '../../generalFunction';
import moment from 'moment';

class PaymentConfirmation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isAmountDetailClicked: false,
        }
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
    
    render(){

        var date = moment().utcOffset('+07:00').format('dddd, DD MMM YYYY')
        const {route} = this.props

        return(
            <ScrollView style={styles.container}>

                <Text style={styles.header}>Pay / Purchase confirmation</Text>
            
                <View style={styles.amountContainer}>
                    <View style={styles.amountTotalContainer}>
                        <Text style={styles.currency}>Rp</Text>
                        <Text style={styles.amount}>{"Rp " + numberWithDot(route.params.amount)}</Text>
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
                            <Text>{"Rp " + numberWithDot(route.params.amount.toString())}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                            <Text>Fee</Text>
                            <Text>{'Rp 0'}</Text>
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
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{route.params.sourceAccNumber}</Text>
                        <Text>{route.params.sourceAccName}</Text>
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
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{route.params.phoneNumber}</Text>
                        <Text>{route.params.merchant.toUpperCase()}</Text>
                    </View>
                </View>

                <View style={styles.line}></View>

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
    }
});

export default PaymentConfirmation;