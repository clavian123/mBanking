import React from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import RequestPIN from '../../component/RequestPIN'

class Home extends React.Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      navigationFocus: '',
      isRequestPINVisible: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  changeRequestPINVisibility = (bool) => {
    if (this._isMounted) {
      this.setState({ isRequestPINVisible: bool });
    }
  }

  handleMenuClicked = (navigateTo) => {
    this.setState({ navigationFocus: navigateTo });
    this.changeRequestPINVisibility(true);
  }

  navigateTo = (screen) => {
    const {navigate} = this.props.navigation;
    navigate(screen);
  }

  validatePIN = (pin) => {
    if (pin != this.props.pin) {
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
      this.changeRequestPINVisibility(false);
      this.navigateTo(this.state.navigationFocus);
    }
  }

  render() {
    return (
      <View style={{...styles.container, backgroundColor: this.state.isRequestPINVisible ? 'rgba(0,0,0,0.8)' : '#dedede'}}
        
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.handleMenuClicked("BalanceInquiry")}
        >
          <Text style={styles.buttonText}>Balance Inquiry</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.handleMenuClicked("AccountStatementPickDate")}
        >
          <Text style={styles.buttonText}>Account Statement</Text>
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
              <RequestPIN
                changeRequestPINVisibility={this.changeRequestPINVisibility}
                validatePIN={this.validatePIN}
              />
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
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
    // backgroundColor:'#dedede'
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#c10000',
    marginVertical: 10,
    borderRadius: 10,
    paddingVertical: 16,
    width: 300,
  },
});

const mapStateToProps = state => ({
  pin: state.login.pin
})

export default connect(mapStateToProps)(Home);
