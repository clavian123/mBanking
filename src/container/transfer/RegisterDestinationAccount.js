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
      accNumber: '',
    };
  }

  handleRegisterDestination = () => {
    const { accNumber } = this.state;
    const { navigate } = this.props.navigation;
    this.props.dispatch(checkClientDestination(accNumber, navigate));
  }

  render() {
    const { loading } = this.props;

    if (loading) {
      return <Loading />;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.textLabel}>
          Destination Account Number
        </Text>
        <TextInput
          value={this.state.accNumber}
          onChangeText={(accNumber) => { this.setState({ accNumber }) }}
          placeholder="Account Number"
          style={styles.textInput}
          keyboardType="number-pad"
        />
        <TouchableOpacity
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
    alignItems: "center",
  },
  textLabel: {
    fontSize: 18,
  },
  textInput: {
    marginVertical: 10,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    width: 250,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1c313a',
    borderRadius: 10,
    paddingVertical: 16,
    width: 250,
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
  destAccNumber: state.transfer.newDest.accNumber,
  destFullName: state.transfer.newDest.fullName
});

export default connect(mapStateToProps)(RegisterDestinationAccount);