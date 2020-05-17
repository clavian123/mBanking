import React from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import RequestPIN from '../../component/RequestPIN'
import { handleTransfer } from '../../action/transfer/transferFunction'
import Loading from '../../Loading';

class TransferToAnotherAccount extends React.Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      isRequestPINVisible: false,
      amount: '',
      description: ''
    }
  }

  handleChooseAccount = () => {
    const { navigation } = this.props;
    navigation.navigate('ChooseDestinationAccount');
  }

  handleConfirmTransfer = () => {
    const { navigation, route, accNumber } = this.props;
    const { amount, description } = this.state;
    var accNumberDest = route.params?.number;
    var name = route.params?.name;
    if(name === undefined){
      Alert.alert(
        'Failed',
        'Destination Account Required. Please choose your destination account',
          [
             {
               text: 'OK',
               style: 'cancel',
             }
           ]
      )
    }else if(amount === ''){
      Alert.alert(
        'Failed',
        'Amount Required. Please fill the amount input',
          [
             {
               text: 'OK',
               style: 'cancel',
             }
           ]
      )
    }
    else{
      navigation.navigate('ConfirmTransfer',{
        accNumber: accNumber,
        amount:amount,
        note: description,
        accNumberDest: accNumberDest,
        accNameDest: route.params.name,
        type: 'Regular Transfer',
      })
    }
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

  // validatePIN = (input) => {
  //   const { navigation, pin } = this.props;
  //   if (input != pin) {
  //     Alert.alert(
  //       'Failed',
  //       'Your PIN is wrong. Please try again.',
  //       [
  //         {
  //           text: 'OK',
  //           style: 'cancel',
  //         }
  //       ]
  //     )
  //   } else {
  //     let req = this.createRequest();
  //     this.props.dispatch(handleTransfer(req));
  //     this.changeRequestPINVisibility(false);
  //     alert('Transfer success.')
  //     navigation.goBack();
  //   }
  // }

  handleEvent = () => {
    this.changeRequestPINVisibility(true);
  }

  // createRequest = () => {
  //   const { route, accNumber } = this.props;
  //   const { amount, description } = this.state;
  //   var accNumberDest = route.params?.number;
  //   let req = {
  //     accNumberSender: accNumber,
  //     accNumberReceiver: accNumberDest,
  //     amount: amount,
  //     type: 'Regular Transfer',
  //     note: description
  //   }
  //   return req;
  // }

  render() {
    const { route, loading } = this.props;
    var name = route.params?.name;
    var number = route.params?.number;

    if (loading) {
      return <Loading />
    }

    return (
      <View
        style={[styles.container, this.state.isRequestPINVisible ?
          { backgroundColor: 'rgba(0, 0, 0, 0.8)' } :
          'rgba(0, 0, 0, 0)']}
      >
        <View style={styles.subContainer}>
          <Text style={styles.textLabel}>Destination Account:</Text>
          <TouchableOpacity
            onPress={() => this.handleChooseAccount()}
            style={styles.buttonDestinationAccount}
          >
            <TextInput
              editable={false}
              placeholder="-Choose-"
              style={[styles.textInput, { color: 'black' }]}
              value={name !== undefined ? name.toUpperCase() + ' - ' + number : null}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.textLabel}>Total Amount (IDR):</Text>
          <TextInput
            value={this.state.amount}
            onChangeText={(amount) => this.setState({ amount })}
            placeholder="E.g. 50000"
            style={styles.textInput}
            keyboardType="number-pad"
          >
          </TextInput>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.textLabel}>Description (Optional):</Text>
          <TextInput
            value={this.state.description}
            onChangeText={(description) => this.setState({ description })}
            placeholder="E.g. buy new shoes"
            style={styles.textInput}
          >
          </TextInput>
        </View>
        <View style={styles.subContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.handleConfirmTransfer()}
          >
            <Text
              style={[styles.buttonText, this.state.isRequestPINVisible ? { color: 'rgb(89, 89, 89)' } : 'rgb(255, 255, 255)']}
            >
              Transfer
            </Text>
          </TouchableOpacity>
        </View>
        {/* <Modal
          visible={this.state.isRequestPINVisible}
          transparent={true}
          onRequestClose={() => this.changeRequestPINVisibility(false)}>
          <TouchableOpacity
            style={styles.modalContainer}
            activeOpacity={1}
            onPressOut={() => { this.changeRequestPINVisibility(false) }}>
            <TouchableWithoutFeedback>
              <RequestPIN changeRequestPINVisibility={this.changeRequestPINVisibility} validatePIN={this.validatePIN} />
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal> */}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#dedede"
  },
  subContainer: {
    marginVertical: 10,
    width: '85%'
  },
  buttonDestinationAccount: {
    borderRadius: 10,
    width: '100%',
  },
  textLabel: {
    fontSize: 17,
    paddingLeft: 5,
    width: 250,
    textAlign: 'left',
    marginHorizontal: 30,
  },
  textInput: {
    fontSize: 16,
    borderWidth: 1,
    paddingLeft: 10,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: 'white',
    width: '100%',
    marginHorizontal: 30
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#c10000',
    borderRadius: 10,
    paddingVertical: 16,
    width: '100%',
    marginHorizontal: 30
  },
});

const mapStateToProps = state => ({
  accNumber: state.login.accNumber,
  pin: state.login.pin,
  destAccNumber: state.transfer.newDest.accNumber,
  loading: state.transfer.loading
});

export default connect(mapStateToProps)(TransferToAnotherAccount);