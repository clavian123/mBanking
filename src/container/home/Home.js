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
  ScrollView,
  Dimensions,
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview'

import { numberWithCommas } from '../../generalFunction';
import RequestPIN from '../../component/RequestPIN';
import { getBalance } from '../../action/home/homeFunction';
import AccountCard from '../../component/AccountCard';
import { getStatements } from '../../action/home/homeFunction';
import StatementList from '../../component/StatementList';
import Loading from '../../Loading';


class Home extends React.Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      navigationFocus: '',
      isRequestPINVisible: false,
      isDetailVisible: false,
      isStatementVisible: false,
      statements: [

      ],
    };
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    // console.log("ini pas constructor" + this.props.accNumber);
  }

  componentDidMount() {
    this._isMounted = true;
    const { accNumber } = this.props
    // console.log("ini pas ComponentDidMount " + accNumber);
    this.props.dispatch(getBalance(accNumber));
    this.props.dispatch(getStatements(accNumber));
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  // changeRequestPINVisibility = (bool) => {
  //   if (this._isMounted) {
  //     this.setState({ isRequestPINVisible: bool });
  //   }
  // }

  // handleMenuClicked = (navigateTo) => {
  //   this.setState({ navigationFocus: navigateTo });
  //   this.changeRequestPINVisibility(true);
  // }

  handleDetailClicked = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      isDetailVisible: !this.state.isDetailVisible
    })
  }

  handleStatementClicked = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      isStatementVisible: !this.state.isStatementVisible,
      statements: this.props.statements ? this.props.statements.reverse() : []
    })
  }

  // navigateTo = (screen) => {
  //   const {navigate} = this.props.navigation;
  //   navigate(screen);
  // }

  // validatePIN = (pin) => {
  //   if (pin != this.props.pin) {
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
  //     this.changeRequestPINVisibility(false);
  //     this.navigateTo(this.state.navigationFocus);
  //   }
  // }
  render() {

    const { balance, accNumber, statements, loading } = this.props
    // console.log("ini pas render " + this.props.accNumber);

    if (loading) {
      return <Loading />;
    }
    return (
      <View style={{
        flex: 1,
        backgroundColor: this.state.isRequestPINVisible ? 'rgba(0,0,0,0.8)' : '#dedede'
      }}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={{
            ...styles.greetingsContainer,
            height: this.state.isDetailVisible ? 220 : 100
          }}>
            <Text style={styles.greetingsText}> Hi, Mr. {this.props.accName}</Text>
            <View style={{
              ...styles.detailContainer,
              height: this.state.isDetailVisible ? 120 : 0,
              opacity: this.state.isDetailVisible ? 1 : 0
            }}>
              <View style={styles.detailTextContainer}>
                <Text>Savings</Text>
                <Text>{balance ? "Rp " + numberWithCommas(balance) : "Not Available"}</Text>
              </View>
              <View style={styles.detailTextContainer}>
                <Text>Current</Text>
                <Text>Rp 0</Text>
              </View>
              <View style={styles.detailTextContainer}>
                <Text>Time Deposit</Text>
                <Text>Rp 0</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.dropButton} onPress={this.handleDetailClicked}>
              <Icon 
              name={this.state.isDetailVisible ? "arrow-up" : "arrow-down"} 
              type="simple-line-icon" 
              iconStyle={styles.dropIcon}></Icon>
            </TouchableOpacity>
          </View>

          <ScrollableTabView
            style={styles.accountTabBar}
            renderTabBar={() => <ScrollableTabBar />}
            showsHorizontalScrollIndicator={false}
            tabBarActiveTextColor="black"
            tabBarInactiveTextColor="#888888"
            tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
          >
            <AccountCard tabLabel="Account 1" accNumber={accNumber}></AccountCard>
            <AccountCard tabLabel="Time Deposit 1" accNumber={accNumber}></AccountCard>
            <AccountCard tabLabel="Account 2" accNumber={accNumber}></AccountCard>
            <AccountCard tabLabel="Account 3" accNumber={accNumber}></AccountCard>
          </ScrollableTabView>

          <View style={{
            ...styles.statementContainer,
            height: this.state.isStatementVisible ? statements.length != 0 ? 600 : 100 : 100
          }}>
            <Text style={{
              ...styles.statementHeader,
              opacity: this.state.isStatementVisible ? 0 : 1
            }}>Tap to see history</Text>
            <View style={{
              height: this.state.isStatementVisible ? statements.length != 0 ? 500 : 0 : 0,
              margin: 0
            }}>
              <Text style={styles.statementListHeader}>Here is your 5 last transactions</Text>
              {
                statements ?
                  <StatementList statements={statements.reverse().slice(0, 5)}>

                  </StatementList> :
                  null
              }
            </View>
            <TouchableOpacity style={styles.dropButton} onPress={this.handleStatementClicked}>
              <Icon name={this.state.isStatementVisible ? "arrow-up" : "arrow-down"} type="simple-line-icon" iconStyle={styles.dropIcon}></Icon>
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
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
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

  dropButton: {
    width: 300,
    height: 30,
    justifyContent: 'center',
    marginVertical: 0,
    alignSelf: 'center'
  },

  greetingsContainer: {
    flex: 0,
    width: 360,
    height: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    elevation: 5
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
    marginBottom: 0

  },

  detailTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    borderBottomWidth: 1,
    borderColor: '#dedede',
    margin: 0,
    paddingVertical: 10
  },

  accountTabBar: {
    width: 360,
    flex: 0,
    height: Dimensions.get("window").height / 10 * 3.3,
    marginTop: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    elevation: 5,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15
  },

  tabBarUnderlineStyle: {
    backgroundColor: '#c10000',
    margin: 0,
    padding: 0
  },

  statementHeader: {
    width: '100%',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center'
  },

  statementContainer: {
    width: 360,
    backgroundColor: 'white',
    elevation: 5,
    marginBottom: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingTop: 10,
    justifyContent: 'center'
  },

  statementListHeader: {
    height: '10%',
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 15
  }
});

const mapStateToProps = state => ({
  pin: state.login.pin,
  accName: state.login.accName,
  balance: state.home.balance,
  accNumber: state.login.accNumber,
  statements: state.home.statements,
  loading: state.home.loading
})

export default connect(mapStateToProps)(Home);
