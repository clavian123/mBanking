import React from 'react';
import{
    View,
    TextInput,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    ToastAndroid,
    KeyboardAvoidingView
}from 'react-native';

import { numberWithDot } from '../../generalFunction';
import { connect } from 'react-redux';
import { setTransferAmount, setTransferNote, clearSendMethod } from '../../action/transfer/transferAction';

class SetAmount extends React.Component{

    constructor(props){
        super(props)
        this.state={
            amount: '',
            description: ''
        }
    }

    handleSelectAccount = () => {
        const{ navigation } = this.props;
        navigation.navigate('SelectSource');
    }

    handleNext = () => {
        this.props.dispatch(clearSendMethod());
        const { navigation, destAcc, sourceAcc, route, note } = this.props;
        const amount = this.state.amount;
        if(isNaN(amount)){
            ToastAndroid.show("Amount must be numeric", ToastAndroid.SHORT);
        }else if(amount < 1000){
            ToastAndroid.show("Amount must more than 1000", ToastAndroid.SHORT);
        }else if(route.params == null){
            ToastAndroid.show("Please select your source account", ToastAndroid.SHORT);
        }else if(parseInt(amount) > parseInt(sourceAcc.balance)){
            ToastAndroid.show("Your balance is not enough", ToastAndroid.SHORT);
        }else{
            this.props.dispatch(setTransferAmount(parseFloat(this.state.amount)));
            this.props.dispatch(setTransferNote(this.state.description));
            if(destAcc.bankCode == '153'){    
                navigation.navigate('Confirmation');
            }else{
                navigation.navigate('SendMoneyMethod');
            }
        }
    }

    render(){

        const { params } = this.props.route

        return(
            <ScrollView style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
                    enabled={Platform.OS === "ios" ? true : false}
                >
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
                        onChangeText={(amount) => this.setState({amount:amount})}/>
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
                    params ? 
                    <View style={{...styles.sourceAccountDetailContainer, height: params ? null : 0}}>
                        <Text style={styles.sourceAccountDetailTitle}>{params.sourceAccNumber}</Text>
                        <Text>{params.sourceAccName.toUpperCase()}</Text>
                        <Text>{params.sourceAccType}</Text>
                        <Text style={{fontWeight: 'bold'}}>Balance: Rp {numberWithDot(params.sourceAccBalance)}</Text>
                    </View>
                    : null
                }

                <View style={styles.line}/>

                <Text style={styles.additionalText}>Additional information (optional)</Text>

                <TextInput
                    placeholder="Description (Max. 16 characters)"
                    style={styles.descriptionInput}
                    maxLength={16}
                    onChangeText={(description) => this.setState({description: description})}/>

                <TouchableOpacity onPress={this.handleNext} style={styles.nextButton}>
                        <Text style={styles.nextText}>NEXT</Text>
                </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
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
    additionalText: {
        fontSize: 16,
        marginHorizontal: 20
    },
    descriptionInput: {
        marginVertical: 20,
        marginHorizontal: 20,
        width: '90%',
        borderBottomWidth: 1,
        borderBottomColor: '#888888',
        fontSize: 16
    },
    nextButton: {
        width: '90%',
        backgroundColor: '#C10000',
        borderRadius: 30,
        marginHorizontal: 20,
        marginBottom: 10
    },
    nextText: {
        textAlign: 'center',
        paddingVertical: 15,
        fontSize: 16,
        color: 'white'
    },
    sourceAccountDetailContainer:{
        width: '90%',
        alignSelf: 'center'
    },
    sourceAccountDetailTitle:{
        fontWeight: 'bold',
        fontSize: 17
    },

});

const mapStateToProps = state => ({
    sourceAcc: state.transfer.sourceAcc,
    destAcc: state.transfer.destAcc
})

export default connect(mapStateToProps)(SetAmount);
