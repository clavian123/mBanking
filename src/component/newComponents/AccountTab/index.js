import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View
} from "react-native";

import styles from "./style";
import { Carousel, TransactionList } from "../../newComponents";

const AccountTab = ({
  accounts,
  transactions,
  handleShowTransactions,
  showTransactions,
  hideBalance,
  toggleHideBalance
}) => {

  return (
    <View style={styles.accountTab}>
      <Carousel
        accounts={accounts}
        hideBalance={hideBalance}
        toggleHideBalance={toggleHideBalance}
      />
      <View style={styles.previousTransactions}>
        <View style={styles.previousTransactionsTitle}>
          <Text style={styles.previousTransactionsTitleText}>
            Previous transactions
          </Text>
        </View>
        {
          showTransactions ?
            <View>
              <TransactionList
                transactions={transactions}
              />
              <TouchableOpacity style={styles.buttonSeeAllTransactions}>
                <Text style={styles.buttonSeeAllTransactionsText}>See all transactions</Text>
              </TouchableOpacity>
            </View> :
            <TouchableOpacity
              onPress={handleShowTransactions}
              style={styles.buttonShowTransactions}
            >
              <Text style={styles.buttonShowTransactionsText}>Show transactions</Text>
            </TouchableOpacity>
        }
      </View>
    </View>
  )
};

export default AccountTab;