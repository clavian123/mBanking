import React from 'react';
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { connect } from 'react-redux';
import store from '../../store/index';

import { getClientToken, handleTransfer, validateToken } from '../../action/transfer/transferFunction'
import PushNotification from 'react-native-push-notification'
import Loading from '../../Loading';
import RequestOTP from '../../component/RequestOTP';


class ConfirmTransfer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isRequestOTPVisible: false,
            accName: store.getState().login.accName
        };

        PushNotification.configure({
            onRegister: function (token) {
                console.log("TOKEN:", token);
            },
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);
            },
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            popInitialNotification: true,
            requestPermissions: Platform.OS === 'ios'
        });
    }

    requestToken = () => {
        const { route } = this.props;
        const accNumber = route.params.accNumber;
        this.props.dispatch(getClientToken(accNumber));
    }

    transferNotification = (amount, sender, receiver) => {
        PushNotification.localNotification({
            title: "MBanking", // (optional)
            message: sender + " Just Transfered " + amount + " to " + receiver, // (required)
        });
    }

    validateOTP = (input) => {
        const state = store.getState()
        const { navigation } = this.props;
        let accNumber = state.login.accNumber

        validateToken(accNumber, input).then((res) => {
            if (res == true) {
                console.log("OTP bener dan jalanin transaksi")
                let req = this.createRequest();
                this.props.dispatch(handleTransfer(req));
                this.changeRequestOTPVisibility(false);
                alert('Transfer success.')
                navigation.goBack();
                this.transferNotification(req.amount, state.login.accName, this.props.route.params.accNameDest)
            } else {
                console.log("OTP salah");
                
                Alert.alert(
                    'Failed',
                    'Your OTP Token is wrong. Please try again.',
                    [
                        {
                            text: 'OK',
                            style: 'cancel',
                        }
                    ]
                )

            }
        })
    }

    handleConfirm = () => {
        this.changeRequestOTPVisibility(true);
        this.requestToken();
        console.log(store.getState().transfer);
    }

    changeRequestOTPVisibility = (bool) => {
        this.setState({ isRequestOTPVisible: bool });
    }

    createRequest = () => {
        const { route } = this.props;
        const accNumberDest = route.params.accNumberDest;
        const amount = route.params.amount;
        const description = route.params.note
        const accNumber = route.params.accNumber

        let req = {
            accNumberSender: accNumber,
            accNumberReceiver: accNumberDest,
            amount: amount,
            type: 'Regular Transfer',
            note: description
        }
        console.log(req)
        return req;
    }

    render() {
        return (
            <View
                style={[styles.container, this.state.isRequestPINVisible ?
                    { backgroundColor: 'rgba(0, 0, 0, 0.8)' } :
                    'rgba(0, 0, 0, 0)']}
            >
                <View style={styles.subContainer}>
                    <Text>Account Source</Text>
                    <Text style={styles.textInformation}>{this.props.route.params.accNumber} - {this.state.accName}</Text>
                </View>
                <View style={styles.subContainer}>
                    <Text>Account Destination</Text>
                    <Text style={styles.textInformation}>{this.props.route.params.accNumberDest} - {this.props.route.params.accNameDest}</Text>
                </View>
                <View style={styles.subContainer}>
                    <Text>Amount</Text>
                    <Text style={styles.textInformation}>{this.props.route.params.amount}</Text>
                </View>
                <View style={styles.subContainer}>
                    <Text>Note</Text>
                    <Text style={styles.textInformation}>{this.props.route.params.note}</Text>
                </View>
                <View style={styles.subContainer}>
                    <Text>Transfer Type</Text>
                    <Text style={styles.textInformation}>{this.props.route.params.type}</Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.handleConfirm()}
                    disabled={this.state.isRequestOTPVisible}>
                    <Text style={[styles.buttonText, this.state.isRequestOTPVisible ? { color: 'rgb(89, 89, 89)' } : 'rgb(255, 255, 255)']}>Confirm</Text>
                </TouchableOpacity>
                <Modal
                    visible={this.state.isRequestOTPVisible}
                    transparent={true}
                    onRequestClose={() => this.changeRequestOTPVisibility(false)}>
                    <TouchableOpacity
                        style={[styles.container]}
                        activeOpacity={1}
                        onPressOut={() => { this.changeRequestOTPVisibility(false) }}>
                        <TouchableWithoutFeedback>
                            <RequestOTP changeRequestOTPVisibility={this.changeRequestOTPVisibility} validateOTP={this.validateOTP} otpNotification={this.handleConfirm} />
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignSelf: "center",
        alignContent: "center",
        alignItems: "center",
    },
    subContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    textInformation: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#1c313a',
        borderRadius: 10,
        paddingVertical: 16,
        width: 130,
        marginVertical: 20,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center',
    },
});

const mapStateToProps = state => ({
    accNumber: state.login.accNumber,
    pin: state.login.pin,
    destAccNumber: state.transfer.newDest.accNumber,
    loading: state.transfer.loading
});

export default connect(mapStateToProps)(ConfirmTransfer);