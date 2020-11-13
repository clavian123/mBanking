import React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text
} from "react-native";
import moment from "moment";

import { formatCurrency } from "../../../utils";
import iconTransactionIn from "../../../../assets/icon-transaction-in.png";
import iconTransactionOut from "../../../../assets/icon-transaction-out.png";

const TransactionList = ({ transactions }) => {
  return (
    <View >
      {
        transactions.map(transaction => {
          return <TransactionItem transaction={transaction} key={transaction.id}/>;
        })
      }
    </View>
  );
};

const TransactionItem = ({ transaction }) => {
  return (
    <View style={styles.transaction}>
      <Image
        source={transaction.amount > 0 ? iconTransactionIn : iconTransactionOut}
        style={{ ...styles.transactionImage, tintColor: transaction.amount > 0 ? "#009900" : "#ff0066" }}
      />
      <View style={styles.transactionSub1}>
        <Text style={styles.transactionTextType}>
          {transaction.amount > 0 ? "Transfer" : "TD Debit"}
        </Text>
        <Text style={styles.transactionTextDate}>
          {moment(transaction.date).format('DD MMM YYYY')}
        </Text>
      </View>
      <View style={styles.transactionSub2}>
        <Text style={{ ...styles.transactionTextAmount, color: transaction.amount > 0 ? "#009900" : "#ff0066" }}>
          {formatCurrency(transaction.amount)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  transaction: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    borderBottomWidth: 1,
    borderColor: "#bfbfbf"
  },
  transactionImage: {
    height: 25,
    width: 25,
    marginRight: 15
  },
  transactionSub1: {
    height: "100%",
    justifyContent: "center",
    flexGrow: 1
  },
  transactionTextType: {
    fontWeight: "bold",
    marginBottom: 5
  },
  transactionTextDate: {
    fontSize: 12,
    opacity: 0.7
  },
  transactionSub2: {
    justifyContent: "center",
    flexGrow: 1
  },
  transactionInTextAmount: {
    color: "#009900",
    fontWeight: "bold",
    textAlign: "right"
  },
  transactionTextAmount: {
    fontWeight: "bold",
    textAlign: "right"
  }
});

export default TransactionList;