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
import { getBalance } from '../../action/home/homeFunction';
import AccountCard from '../../component/AccountCard';
import { getStatements } from '../../action/home/homeFunction';
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
      statements: [],
      refreshing: false,
    };
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount() {
    this._isMounted = true;
    const { cif_code } = this.props;
    this.props.dispatch(getBalance(cif_code));
    // this.props.dispatch(getStatements(cif_code));
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  handleDetailClicked = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      isDetailVisible: !this.state.isDetailVisible
    })
  }

  // handleStatementClicked = () => {
  //   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //   this.setState({
  //     isStatementVisible: !this.state.isStatementVisible,
  //   })
  // }

  countTotalBalance = (balance) => {
    var balanceNumber = 0;
    balance.map(balance => balanceNumber += Number(balance.balance))
    return balanceNumber;
  }

  wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  onRefresh = () => {
    this.setState({
      refreshing: true,
    })
    const { cif_code, loading } = this.props
    // const {loading} = this.props
    // const {customerId} = this.state
    this.props.dispatch(getBalance(cif_code));
    this.props.dispatch(getStatements(cif_code));
    if(!loading){
      this.setState({refreshing: false})
    }
  }

  render() {

    const { balance, loading, name } = this.props

    if (loading) {
      return <Loading />;
    }
    return (
      <View style={{
        flex: 1,
        height: Dimensions.get("window").height,
        backgroundColor: '#dedede'
      }}>

        {/* HEADER */}
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          <View style={{
            ...styles.greetingsContainer,
            height: this.state.isDetailVisible ? 220 : 100
          }}>
            <Text style={styles.greetingsText}> Hi, Mr. {name}</Text>
            <View style={{
              ...styles.detailContainer,
              height: this.state.isDetailVisible ? 120 : 0,
              opacity: this.state.isDetailVisible ? 1 : 0
            }}>
              <View style={styles.detailTextContainer}>
                <Text>Savings</Text>
                <Text>{balance ? "Rp " + numberWithCommas( this.countTotalBalance(balance ? balance : [])) : "Not Available"}</Text>
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
          
          {/* ACCOUNT AND BALANCE LIST */}
          <ScrollableTabView
            style={{...styles.accountTabBar, height: "100%"}}
            renderTabBar={() => <ScrollableTabBar />}
            showsHorizontalScrollIndicator={false}
            tabBarActiveTextColor="black"
            tabBarInactiveTextColor="#888888"
            tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
            prerenderingSiblingsNumber ={1}
          >
            {
              balance ?
                balance.map(balance =>
                    <AccountCard 
                    tabLabel={balance.accountNumber} 
                    accNumber={balance.accountNumber} 
                    balance={balance.balance} 
                    key={balance.accountNumber} 
                    navigation={this.props.navigation}
                    home={true}
                     />
                )
                :
                <AccountCard tabLabel="Account 1" accNumber= "0000000" ></AccountCard>
            }
            
          </ScrollableTabView>
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
    backgroundColor: 'white',
    justifyContent: 'center',
    elevation: 5,
    borderRadius: 15,
    paddingBottom: 15,
    marginTop: 10,
    marginBottom: 10, 
    overflow: 'visible'
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
  balance: state.home.balance,
  statements: state.home.statements,
  loading: state.home.loading,
  name: state.login.name,
  cif_code: state.login.cif_code,
  isLogin: state.login.isLogin
})

export default connect(mapStateToProps)(Home);
