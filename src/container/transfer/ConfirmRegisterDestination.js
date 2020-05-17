import React from 'react';
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    ToastAndroid
} from 'react-native';
import { connect } from 'react-redux';

import RequestPIN from '../../component/RequestPIN';
import { saveClientDestination } from '../../action/transfer/transferFunction';

class BalanceInquiry extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            isRequestPINVisible: false
        };
    }

    saveClientDestination = () => {
        const { accNumber, destAccNumber } = this.props;
        this.props.dispatch(saveClientDestination(accNumber, destAccNumber));
    }

    validatePIN = (input) => {
        const { pin, navigation } = this.props;
        if (input != pin) {
            Alert.alert(
                'Failed',
                'Your PIN is wrong. Please try again.',
                [
                    {
                        text: 'OK',
                        style: 'cancel',
                    }
                ]
            )
        } else {
            this.saveClientDestination();
            this.changeRequestPINVisibility(false);
            ToastAndroid.show("Success", ToastAndroid.SHORT);
            navigation.navigate('Transfer');
        }
    }

    handleConfirm = () => {
        this.changeRequestPINVisibility(true);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    changeRequestPINVisibility = (bool) => {
        this.setState({ isRequestPINVisible: bool });
    }

    render() {
        const { destAccNumber, destAccName } = this.props;

        return (
            <View
                style={[styles.container, this.state.isRequestPINVisible ?
                    { backgroundColor: 'rgba(0, 0, 0, 0.8)' } :
                    'rgba(0, 0, 0, 0)']}
            >
                <View style={styles.subContainer}>
                    <Text style={styles.textLabel}>Account Number:</Text>
                    <Text style={styles.textInformation}>{destAccNumber}</Text>
                </View>
                <View style={styles.subContainer}>
                    <Text style={styles.textLabel}>Account Name:</Text>
                    <Text style={styles.textInformation}>{destAccName ? destAccName.toUpperCase() : null}</Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.handleConfirm()}
                >
                    <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
                <Modal
                    visible={this.state.isRequestPINVisible}
                    transparent={true}
                    onRequestClose={() => this.changeRequestPINVisibility(false)}>
                    <TouchableOpacity
                        style={styles.container}
                        activeOpacity={1}
                        onPressOut={() => { this.changeRequestPINVisibility(false) }}>
                        <TouchableWithoutFeedback>
                            <RequestPIN changeRequestPINVisibility={this.changeRequestPINVisibility} validatePIN={this.validatePIN} />
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
        alignItems: "flex-start",
    },
    subContainer: {
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 30
    },
    textLabel: {
        fontSize: 18,
        alignSelf: 'flex-start'
    },
    textInformation: {
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'flex-start'
    },
    button: {
        backgroundColor: '#c10000',
        borderRadius: 10,
        paddingVertical: 16,
        width: '85%',
        marginVertical: 20,
        marginHorizontal: 30
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center',
    },
});

const mapStateToProps = state => ({
    destAccNumber: state.transfer.newDest.accNumber,
    destAccName: state.transfer.newDest.fullName,
    accNumber: state.login.accNumber,
    pin: state.login.pin
})

export default connect(mapStateToProps)(BalanceInquiry);