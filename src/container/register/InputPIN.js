import React, { Component } from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ToastAndroid
} from 'react-native';

import { connect } from 'react-redux';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { validatePin, checkCustomer } from '../../action/register/registerFunction';

class InputPIN extends Component{

    constructor(props){
        super(props);
        this.state = {
            pin: ""
        }
    }

    handleContinue = () => {
        const { customerDummyId, cif_code } = this.props;
        
        this.props.dispatch(validatePin(customerDummyId, this.state.pin)).then(() => {
            const { checkPin } = this.props;
            if(checkPin == true){
                this.props.dispatch(checkCustomer(cif_code)).then(() => {
                    const{ customerId } = this.props;
                    const{ navigation } = this.props;
                    if(customerId == null){
                        navigation.navigate('CreateUser')
                    }else{
                        navigation.navigate('ResetPassword')
                    }
                });
            }else{
                ToastAndroid.show("Please enter a valid PIN", ToastAndroid.SHORT);
            }
        })
        
    }

    // handleNavigation = () => {
    //     const{ customerApps } = this.props;
    //     const{ navigation } = this.props;
    //     if(customerApps == null){   
    //         navigation.navigate('CreateUser');  
    //     }else{
    //         navigation.navigate('ResetPassword');
    //     }
    // }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.label}>
                    Enter your Sinarmas ATM{'\n'}PIN
                </Text>
                <SmoothPinCodeInput
                    containerStyle={{
                        marginVertical: 20,
                    }}
                    textStyle={{
                        color: 'black',
                        fontSize: 30
                    }}
                    cellSpacing={10}
                    cellStyle={{
                        borderBottomWidth: 3,
                        borderColor: 'black',
                    }}
                    cellStyleFocused={{
                        borderColor: 'red',
                    }}
                    codeLength={6}
                    value={this.state.pin}
                    onTextChange={(code) => this.setState({ pin: code })}
                    password={true}
                    mask={<View style={{
                        width: 10,
                        height: 10,
                        borderRadius: 25,
                        backgroundColor: 'black',
                    }}></View>}
                    maskDelay={1000}
                />
                <TouchableOpacity style={styles.button} onPress={this.handleContinue}>
                    <Text style={styles.buttonText}>CONTINUE</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        fontWeight: '500',
        flex: 1,
        backgroundColor: 'white'
    },
    label: {
        fontSize: 27,
        fontWeight: 'bold',
        width: '80%',
        margin: 20
    },
    button: {
        marginHorizontal: 20,
        width: '90%',
        backgroundColor: 'red',
        borderRadius: 30,
        paddingVertical: 15,
        position: 'absolute',
        bottom: 20
    },
    buttonText: {
        fontSize: 16,
        textAlign: 'center',
        color: 'white'
    }
})

const mapStateToProps = state => ({
    customerDummyId: state.register.customerDummyId,
    cif_code: state.register.cif_code,
    checkPin: state.register.checkPin,
    customerId: state.register.customerId
});
  
export default connect(mapStateToProps)(InputPIN);