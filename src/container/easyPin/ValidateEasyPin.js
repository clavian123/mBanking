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

import { connect } from 'react-redux';
import { transfer } from '../../action/transfer/transferFunction';
import Loading from '../../Loading'

class ValidateEasyPin extends Component{

    constructor(props) {
        super(props);
        this.state = {
            easyPin: ''
        }
    }

    handleContinue = () => {
        const { easyPin, destAcc, sourceAcc, amount, sendMethod, note } = this.props
        const { flow } = this.props.route.params
        const { navigation } = this.props
        if(easyPin == this.state.easyPin){
            if(flow == 'transfer'){
                this.props.dispatch(transfer(sourceAcc.accNumber, destAcc.accNumber, amount, sendMethod.fee, note, destAcc.bankId)).then(()=> {
                    navigation.navigate('TransactionDetail')
                })
            }
        }else{
            ToastAndroid.show("Please enter a valid EasyPIN", ToastAndroid.SHORT);
        }
    }

    render(){
        const { loading } = this.props
        if(loading){
            return(<Loading></Loading>)
        }
        return(
            <View style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.title}>Enter EasyPIN</Text>
                    <Image style={styles.keyboardIcon} source={require('../../../assets/icon-keyboard.png')}/>
                </View>

                <Text style={styles.instruction}>Enter your 6 digit secure code</Text>

                <TextInput 
                    style={styles.input}
                    keyboardType='number-pad'
                    maxLength={6}
                    secureTextEntry={true}
                    autoFocus={true}
                    onChangeText={(text) => this.setState({ easyPin: text })}/>

                <TouchableOpacity style={styles.button} onPress={()=>this.handleContinue()}>
                    <Text>CONTINUE</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C10000',
        alignItems: 'center'
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginBottom: 20,
    },
    title:{
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold'
    },
    keyboardIcon: {
        width: 60,
        height: 60,
        tintColor: 'white',
        right: 0
    },
    instruction:{
        width: '80%',
        color: 'white',
        fontSize: 17,
        marginBottom: 20,
    },
    input:{
        borderBottomWidth: 1,
        borderColor: 'white',
        width: '60%',
        textAlign: 'center',
        color: 'white',
        fontSize: 30
    },
    button:{
        backgroundColor: 'white',
        width: '90%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 22.5,
        position: 'absolute',
        bottom: 20,
    },
})

const mapStateToProps = state => ({
    easyPin: state.login.easyPin,
    destAcc: state.transfer.destAcc,
    sourceAcc: state.transfer.sourceAcc,
    amount: state.transfer.amount,
    sendMethod: state.transfer.sendMethod,
    note: state.transfer.note,
    loading: state.transfer.loading
});

export default connect(mapStateToProps)(ValidateEasyPin);