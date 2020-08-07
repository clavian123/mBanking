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
import { getMethodList } from '../../action/transfer/transferFunction';
import MethodListItem from '../../component/MethodListItem';

class SendMoneyMethod extends Component{

    constructor(props){
        super(props);
        this.state = {
            methodList: []
        }
    }

    componentDidMount(){
        this.props.dispatch(getMethodList()).then(() => {
            const { methodList } = this.props;
            for (let index = 0; index < methodList.length; index++) {
                if(methodList[index].merchant_mode == "INBANK"){
                    continue
                }else{
                    this.setState({methodList: [...this.state.methodList, methodList[index]]});
                }
            }
        })
    }

    handleNext = () => {
        const { navigation, sendMethod } = this.props;
        if(sendMethod == ''){
            ToastAndroid.show("Please select a method", ToastAndroid.SHORT);
        }else{
            navigation.navigate('Confirmation');
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.label}>Send Money Methods</Text>
                <FlatList 
                    data={this.state.methodList}
                    renderItem={({item}) => (
                        <MethodListItem id={item.id} name={item.merchant_mode} fee={item.charge_amount} />
                    )}
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
        backgroundColor: '#C10000',
        marginHorizontal: 20
    },
    buttonText: {
        textAlign: 'center',
        paddingVertical: 15,
        color: 'white'
    }
});

const mapStateToProps = state => ({
    methodList: state.transfer.methodList,
    sendMethod: state.transfer.sendMethod
});

export default connect(mapStateToProps)(SendMoneyMethod);