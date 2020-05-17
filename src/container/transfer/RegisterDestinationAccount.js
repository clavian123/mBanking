import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';

import { checkClientDestination } from '../../action/transfer/transferFunction';
import Loading from '../../Loading';

class RegisterDestinationAccount extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      destAccNumber: '',
    };
  }

  handleRegisterDestination = () => {
    const { destAccNumber } = this.state;
    const { accNumber } = this.props;
    const { navigate } = this.props.navigation;
    console.log(accNumber);
    this.props.dispatch(checkClientDestination(destAccNumber, navigate));
  }

  render() {
    const { loading } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.textLabel}>
          Destination Account Number:
        </Text>
        <TextInput
          value={this.state.accNumber}
          onChangeText={(destAccNumber) => { this.setState({ destAccNumber }) }}
          placeholder="Account Number"
          placeholderTextColor="#888888"
          style={styles.textInput}
          keyboardType="number-pad"
        />
        <TouchableOpacity
          underlayColor="#888888"
          style={styles.button}
          onPress={() => this.handleRegisterDestination()}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
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
    backgroundColor: '#dedede'
  },
  textLabel: {
    fontSize: 17,
    marginHorizontal: 35
  },
  textInput: {
    fontSize: 16,
    marginVertical: 10,
    paddingHorizontal: 15,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    width: '85%',
    textAlign: 'left',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#c10000',
    borderRadius: 10,
    paddingVertical: 16,
    width: '85%',
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
  loading: state.transfer.loading,
  accNumber: state.login.accNumber,
  destAccNumber: state.transfer.newDest.accNumber,
  destFullName: state.transfer.newDest.fullName
});

export default connect(mapStateToProps)(RegisterDestinationAccount);