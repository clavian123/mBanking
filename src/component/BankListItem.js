import React from 'react';
import {
    View,
    Text, 
    StyleSheet,
    Image,
    TouchableOpacity,
    ToastAndroid
}from 'react-native';
import { emptyAccountNumber } from '../action/transfer/transferAction'
import { checkAccountNumber } from '../action/transfer/transferFunction';
import { connect } from 'react-redux';

class BankListItem extends React.Component{

    constructor(props) {
        super(props);
    }

    handlePress = () => {
        const{ navigation } = this.props;
        console.log(this.props.id);
        this.props.dispatch(checkAccountNumber(this.props.code, this.props.id,  this.props.name, this.props.accNumber)).then(() => {
            const{ destAcc } = this.props;
            if(destAcc.accNumber == null){
                this.props.dispatch(emptyAccountNumber());
                ToastAndroid.show('Fail: Add Transfer List Fail', ToastAndroid.SHORT)
                navigation.navigate('SelectPayee', {buttonColor: '#FA8072'});
            }else{
                navigation.navigate('SelectPayee', {buttonColor: '#C10000'});
            }
        })
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
    destAcc: state.transfer.destAcc
});

export default connect(mapStateToProps)(BankListItem)