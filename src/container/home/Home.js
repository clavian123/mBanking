import React, {createRef, useCallback} from 'react';
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
  RefreshControl,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview'

import { numberWithDot } from '../../generalFunction';
import { getBalance, getStatements, getCustomerData, getTransactionRecommendation } from '../../action/home/homeFunction';
import AccountCard from '../../component/AccountCard';
import RecommendationItem from '../../component/RecommendationItem';
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
      index: 1,
      loading: false,
      isRecommendationVisible: false,
      bullets: []
    };
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount() {
    this._isMounted = true;
    const { cif_code } = this.props;
    this.setLoading(true);
    this.props.dispatch(getTransactionRecommendation(cif_code)).then(() => {
      let newBullets = [];
      for (let i = 1; i <= this.props.transactionRecommendation.length; i++) {
        newBullets.push(
          <Text
            key={i}
            style={{
              ...styles.bullet,
              opacity: this.state.index=== i ? 1 : 0.4
            }}
          >
            &bull;
          </Text>
        )
      }
      this.setState({ bullets: newBullets })
    })
    this.props.dispatch(getBalance(cif_code)).then(()=>{
      this.props.dispatch(getStatements(cif_code)).then(()=>{
        this.props.dispatch(getCustomerData(cif_code)).then(()=>{
          this.setLoading(false);
        })
      })
    })
  }

  setLoading(status){
    this.setState({
      loading: status
    })
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

  handleRecommendationClicked = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      isRecommendationVisible: !this.state.isRecommendationVisible
    })
  }

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
    const {cif_code} = this.props
    this.setLoading(true);
    this.props.dispatch(getBalance(cif_code)).then(()=>{
      this.props.dispatch(getStatements(cif_code)).then(()=>{
        this.props.dispatch(getCustomerData(cif_code)).then(()=>{
          this.setLoading(false);
        })
      })
    })
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    this.setState({ index: viewableItems[0].index + 1})
  }

  onScroll = () => {
    let newBullets = [];
    for (let i = 1; i <= this.props.transactionRecommendation.length; i++) {
      newBullets.push(
        <Text
          key={i}
          style={{
            ...styles.bullet,
            opacity: this.state.index=== i ? 1 : 0.4
          }}
        >
          &bull;
        </Text>
      )
    }
    this.setState({ bullets: newBullets })
  }

  viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

  render() {

    const { balance, name, gender } = this.props
    const { loading } = this.state;

    if (loading || this.props.loading) {
      return <Loading />;
    }

    return (
      <View style={{
        flex: 1,
        height: Dimensions.get("window").height,
        backgroundColor: 'white'
      }}>

        {/* HEADER */}
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
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
            <Text style={styles.greetingsText}> Hi, {gender ? gender.toLowerCase() == 'male' ? "Mr." : "Mrs." : null} {name}</Text>
            <View style={{
              ...styles.detailContainer,
              height: this.state.isDetailVisible ? 120 : 0,
              opacity: this.state.isDetailVisible ? 1 : 0
            }}>
              <View style={styles.detailTextContainer}>
                <Text>Savings</Text>
                <Text>{balance ? "Rp " + numberWithDot( this.countTotalBalance(balance ? balance : [])) : "Not Available"}</Text>
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

          <View style={{...styles.transactionRecommendationContainer, 
                            height: this.state.isRecommendationVisible ? 200 : 100
                      }}>
            <Text style={{...styles.greetingsText, marginVertical: 10}}>Your Top 5 Transaction</Text>
            <FlatList 
              onViewableItemsChanged={this.onViewableItemsChanged}
              viewabilityConfig={{itemVisiblePercentThreshold: 50}}
              style={{width: "90%",opacity: this.state.isRecommendationVisible ? 1 : 0, marginTop: 10}}
              horizontal={true}
              pagingEnabled
              onScroll={this.onScroll}
              showsHorizontalScrollIndicator={false}
              data={this.props.transactionRecommendation}
              extraData={this.props.transactionRecommendation}
              renderItem={({ item }) => {
                return <RecommendationItem 
                  navigation={this.props.navigation}
                  target_account_subscriber={item.target_account_subscriber} 
                  target_name={item.target_name}
                  type={item.type}
                  target_bank_merchant_id={item.type=="FUNDTRANSFER" ? item.target_bank.id : item.target_merchant.id}
                  target_bank_merchant_code={item.type=="FUNDTRANSFER" ? item.target_bank.network_code : item.target_merchant.code}
                  target_bank_merchant={item.type=="FUNDTRANSFER" ? item.target_bank.bank_name : item.target_merchant.name}
                />
              }}
              ListEmptyComponent={
                <View style={{ width: Dimensions.get('window').width*0.8, justifyContent: 'center', alignSelf: 'center' }}>
                  <Text style={{ textAlign: 'center', color: 'grey', fontSize: 16 }}>Nothing to show</Text>
                </View>
              }
            />
            <View style={{...styles.bullets, opacity: this.state.isRecommendationVisible ? 1 : 0}}>
              {this.state.bullets}
            </View>
            <TouchableOpacity style={styles.dropButton} onPress={this.handleRecommendationClicked}>
              <Icon 
              name={this.state.isRecommendationVisible ? "arrow-up" : "arrow-down"} 
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
  bullets: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  bullet: {
    paddingHorizontal: 5,
    fontSize: 21,
    fontWeight: 'bold',
    color: '#C10000'
  },
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

  transactionRecommendationContainer: {
    flex: 0,
    width: 360,
    height: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 15,
    elevation: 5,
    marginTop: 10,
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
  isLogin: state.login.isLogin,
  gender: state.home.gender,
  email: state.home.email,
  transactionRecommendation: state.home.transactionRecommendation
})

export default connect(mapStateToProps)(Home);
