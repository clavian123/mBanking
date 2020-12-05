import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView
} from "react-native";
import { 
  connect
} from "react-redux";
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import styles from "./style";
import { getDeviceHeight, getDeviceWidth } from "../../../utils";
import { Accordion, AccountTab, ComingSoon } from "../../../component/newComponents";

import {
  getAccountList, getAccountStatements
} from '../../../newFunction/homeFunction';

const deviceHeight = getDeviceHeight();
const deviceWidth = getDeviceWidth();
const verticalSpace = (deviceHeight / 3 - 0.51 * deviceWidth + 51 / 5) / 2;
const accountTabConstantHeight = 1 / 3 * deviceHeight + 2 * verticalSpace + 80;

const flatListItem = [{ id: 1 }];

const NewBankAccount = (props) => {
  const [focusTabIndex, setFocusTabIndex] = useState(0);
  const [showTransactions, setShowTransactions] = useState(false);
  const [transactions, setTransactions] = useState([])
  const [activeAccount, setActiveAccount] = useState('')
  const [countTransactions, setCountTransactions] = useState(transactions.length);
  const [tabViewHeight, setTabViewHeight] = useState(0);
  const [hideBalance, setHideBalance] = useState(false);
  const [accountList, setAccountList] = useState([]);

  const handleShowTransactions = () => {
    setShowTransactions(true);
  }

  async function getAccounts(deviceId) {
    const accounts =  await props.dispatch(getAccountList(deviceId));
    setActiveAccount(accounts[0].account_number)
    const statement = await props.dispatch(getAccountStatements(activeAccount))
    setTransactions(statement);
    setAccountList(accounts);
  }

  useEffect(() => {
    const { deviceId } = props;
    getAccounts(deviceId);
    
    if (focusTabIndex == 0) {
      if (showTransactions) {
        setTabViewHeight(accountTabConstantHeight + 70 * countTransactions + verticalSpace / 2 + 19);
      } else {
        setTabViewHeight(accountTabConstantHeight + 70);
      }
    } else {
      setTabViewHeight(251);
    }

    return function cleanup() {
      setAccountList([])
      setTransactions([])
    }
  }, [focusTabIndex, showTransactions, countTransactions, tabViewHeight]);

  const toggleHideBalance = () => {
    setHideBalance(!hideBalance);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={flatListItem}
        keyExtractor={item => "key" + item.id}
        renderItem={({ item, index }) => {
          return (
            <>
              <Accordion accounts={accountList} />
              <ScrollableTabView
                renderTabBar={() => <ScrollableTabBar />}
                locked={true}
                tabBarUnderlineStyle={{
                  backgroundColor: '#ff0066'
                }}
                tabBarActiveTextColor='#ff0066'
                tabBarInactiveTextColor='#666666'
                showsHorizontalScrollIndicator={false}
                contentStyle={styles.tabView}
                style={{
                  height: tabViewHeight
                }}
                onChangeTab={({ i, ref }) => {
                  setFocusTabIndex(i)
                }}
              >
                <AccountTab
                  tabLabel="Account"
                  accounts={accountList}
                  transactions={transactions}
                  handleShowTransactions={handleShowTransactions}
                  showTransactions={showTransactions}
                  hideBalance={hideBalance}
                  toggleHideBalance={toggleHideBalance}
                />
                <ComingSoon
                  tabLabel="Time Deposit"
                />
                <ComingSoon
                  tabLabel="Credit Card"
                />
                <ComingSoon
                  tabLabel="Loan"
                />
                <ComingSoon
                  tabLabel="Investment"
                />
                <ComingSoon
                  tabLabel="Others"
                />
              </ScrollableTabView>
            </>
          );
        }}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  deviceId: state.newLogin.deviceId
})

export default connect(mapStateToProps)(NewBankAccount);