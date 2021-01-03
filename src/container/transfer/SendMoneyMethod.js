import React, { Component } from 'react';
import{
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ToastAndroid
}from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import MethodListItem from '../../component/MethodListItem';

import {
    refreshEasyPinLogin
} from '../../newFunction/loginFunction'

import {
    setTransferMethod,
    getTransferMethod
} from '../../newFunction/transferFunction'

class SendMoneyMethod extends Component{

    constructor(props){
        super(props);
        this.state = {
            methodList: [],
            selected: 'skn'
        }
    }

    async componentDidMount(){
        const { route } = this.props
        this.setState({ methodList : await this.props.dispatch(getTransferMethod()) });
        this.state.methodList.pop();
        if(route.params.amount < 100000000) {
            this.state.methodList.pop();
        }
        await this.props.dispatch(setTransferMethod('skn', 0));
    }

    handleSelected = (item) => {
        this.setState({ selected: item })
    }

    handleNext = () => {
        const { navigation, deviceId } = this.props;
        this.props.dispatch(refreshEasyPinLogin(deviceId))
        navigation.navigate('Confirmation');
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.label}>Send Money Methods</Text>
                <FlatList 
                    data={this.state.methodList}
                    renderItem={({item}) => (
                        <MethodListItem selected={this.state.selected} handleSelected={this.handleSelected} name={item.method_name} description={item.description} fee={item.fee} />
                    )}
                    keyExtractor = { item => item.method_name }
                />
                <TouchableOpacity onPress={this.handleNext} style={styles.button}>
                    <Text style={styles.buttonText}>NEXT</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    label: {
        width: '80%',
        marginHorizontal: 20,
        marginVertical: 20,
        fontSize:  23,
        color: '#888888'
    },
    button: {
        width: '90%',
        position: 'absolute',
        borderRadius: 30,
        bottom: 20,
        backgroundColor: '#ff0066',
        marginHorizontal: 20
    },
    buttonText: {
        textAlign: 'center',
        paddingVertical: 15,
        color: 'white'
    }
});

const mapStateToProps = state => ({
    deviceId: state.newLogin.deviceId,
    methodList: state.transfer.methodList,
    sendMethod: state.transfer.sendMethod
});

export default connect(mapStateToProps)(SendMoneyMethod);