import React from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  LayoutAnimation,
  UIManager,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements'

import {numberWithCommas} from '../../generalFunction'
import RequestPIN from '../../component/RequestPIN'
import { getBalance } from '../../action/home/homeFunction'

class Home extends React.Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      navigationFocus: '',
      isRequestPINVisible: false,
      isDetailVisible: false
    };
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.dispatch(getBalance(this.props.accNumber));
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

  handleDetailClicked = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      isDetailVisible: !this.state.isDetailVisible
    })
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
    const { balance } = this.props

    return (
      <View style={{...styles.container, backgroundColor: this.state.isRequestPINVisible ? 'rgba(0,0,0,0.8)' : '#dedede'}}>
        <View style={{...styles.greetingsContainer, height: this.state.isDetailVisible ? 220 : 100}}>
          <Text style={styles.greetingsText}> Hi, Mr. {this.props.accName}</Text>
          <View style={{...styles.detailContainer, height: this.state.isDetailVisible ? 120 : 0, opacity: this.state.isDetailVisible ? 1 : 0}}>
            <View style={styles.detailTextContainer}>
              <Text>Savings</Text><Text>{balance ? "Rp " + numberWithCommas(balance) : "Not Available"}</Text>
            </View>
            <View style={styles.detailTextContainer}>
              <Text>Current</Text><Text>Rp 0</Text>
            </View>
            <View style={styles.detailTextContainer}>
              <Text>Time Deposit</Text><Text>Rp 0</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.dropButton} onPress={this.handleDetailClicked}>
            <Icon name= {this.state.isDetailVisible ? "arrow-up" : "arrow-down"} type="simple-line-icon" iconStyle={styles.dropIcon}></Icon>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity
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
        </Modal> */}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    // justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    flex: 1,
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

  dropButton:{
    width: 300,
    height: 30,
    justifyContent: 'center',
    marginVertical: 0,
  },

  greetingsContainer: {
    flex : 0,
    width: 350,
    height : 100,
    backgroundColor: 'white',
    // alignContent: 'center',
    alignItems: 'center',
    justifyContent:'space-evenly',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    elevation: 3
  },

  greetingsText: {
    fontWeight: 'bold',
    fontSize: 16
  },

  dropIcon: {
    fontSize: 20,
    color: '#c10000'
  },

  detailContainer: {
    alignItems: 'stretch',
    width: 300,
    // backgroundColor: '#c10000',
    marginBottom: 0

  },

  detailTextContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    // height: 30,
    borderBottomWidth: 1,
    borderColor: '#dedede',
    // marginVertical: 0,
    margin: 0,
    paddingVertical: 10
  },
  // detailText: {
  //   width: 300,
  //   flexDirection: 'row',
  //   justifyContent: 'space-around'
  // }
});

const mapStateToProps = state => ({
  pin: state.login.pin,
  accName: state.login.accName,
  balance: state.home.balance,
  accNumber: state.login.accNumber
})

export default connect(mapStateToProps)(Home);
