import React from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    Image,
    CheckBox,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';

import { numberWithCommas } from '../../generalFunction'
import { numberWithDot } from '../../generalFunction';
import moment from 'moment';


class Confirmation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleEditAmountClicked(){
        const {navigation} = this.props
        navigation.goBack()
    }

    render() {

        var date = moment().utcOffset('+07:00').format('dddd, DD MMM YYYY')
        const {sourceAcc, destAcc, amount, note} = this.props
        return (
            <ScrollView style={styles.container}>

                <Text style={styles.header}>Send money confirmation</Text>

                <View style={styles.amountContainer}>
                    <Text style={styles.currency}>Rp</Text>
                    <TextInput style={styles.amount} value={"Rp " + numberWithDot(amount.toString())}></TextInput>
                    <TouchableOpacity style={styles.editAmountButton} onPress={()=>this.handleEditAmountClicked()}>
                        <Icon
                            name="md-add-circle"
                            type="ionicon"
                            iconStyle={styles.editAmountIcon}></Icon>
                    </TouchableOpacity>
                </View>

                <Text style={styles.date}>On {date}</Text>

                <View style={styles.AccContainer}>
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
                    iconStyle={styles.tripleDotIcon}></Icon>

                <View style={styles.AccContainer}>
                    <Icon
                        name="md-person"
                        type="ionicon"
                        iconStyle={styles.personIcon}></Icon>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{destAcc.accNumber}</Text>
                        <Text>{destAcc.fullName.toUpperCase()}</Text>
                        <Text>{destAcc.bankName}</Text>
                    </View>
                </View>

                <View style={styles.line}></View>

                <View style={styles.noteContainer}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Notes</Text>
                    <Text>{note}</Text>
                </View>

                <View style={styles.alertContainer}>
                    <Icon
                    name="ios-alert"
                    type="ionicon"
                    iconStyle={styles.alertIcon}></Icon>
                    <Text style={{color: 'grey'}}>Upon completion, all transaction cannot be cancelled</Text>
                </View>

                <TouchableOpacity style={styles.transferButton}>
                    <Text style={{color: 'white', fontSize: 17}}>TRANSFER</Text>
                </TouchableOpacity>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 20,
        padding: 20
    },
    amountContainer: {
        borderWidth: 0.8,
        flexDirection: 'row',
        marginHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center'
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
        fontWeight: 'bold'
    },
    editAmountButton: {
        width: 50,
        height: 50,
        justifyContent: 'center'
    },
    editAmountIcon: {
        fontSize: 35,
    },
    date: {
        margin: 20,
        fontSize: 17,
        fontWeight: 'bold',
        color: 'grey'
    },
    AccContainer: {
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
    noteContainer: {
        marginHorizontal: 20,
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

})

const mapStateToProps = state => ({
    sourceAcc: state.transfer.sourceAcc,
    destAcc: state.transfer.destAcc,
    amount: state.transfer.amount,
    note: state.transfer.note,
})

export default connect(mapStateToProps)(Confirmation)
