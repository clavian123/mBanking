import { StyleSheet } from "react-native";

import {
  getDeviceHeight,
  getDeviceWidth
} from "../../../utils";

const height = getDeviceHeight();
const width = getDeviceWidth();

const marginHorizontal = (0.15 * width + 17) / 2;
const verticalSpace = (height / 3 - 0.51 * width + 51 / 5) / 2;

export default (
  styles = StyleSheet.create({
    accountTab: {
      flex: 1
    },
    previousTransactions: {
      marginHorizontal,
      marginTop: verticalSpace,
      marginBottom: verticalSpace/2
    },
    previousTransactionsTitle: {
      height: 19,
      justifyContent: "center",
      marginBottom: verticalSpace / 2
    },
    previousTransactionsTitleText: {
      fontWeight: "bold"
    },
    buttonShowTransactions: {
      height: 70,
      alignItems: "center",
      justifyContent: "center"
    },
    buttonShowTransactionsText: {
      fontWeight: "bold",
      color: "#ff0066"
    },
    buttonSeeAllTransactions: {
      marginTop: verticalSpace / 2,
      marginBottom: 20,
      height: 19,
      justifyContent: "center",
      alignItems: "center"
    },
    buttonSeeAllTransactionsText: {
      fontWeight: "bold"
    }
  })
);