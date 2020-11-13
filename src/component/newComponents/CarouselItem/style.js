import { StyleSheet } from "react-native";

import {
  getDeviceHeight,
  getDeviceWidth
} from "../../../utils";

const deviceHeight = getDeviceHeight();
const deviceWidth = getDeviceWidth();

const cardWidth = (deviceWidth - 20) * 0.85;
const cardHeight = cardWidth * 3 / 5;

export default (
  styles = StyleSheet.create({
    itemView: {
      flex: 1,
      width: deviceWidth - 20,
      height: deviceHeight / 3,
      marginHorizontal: 10,
      alignItems: "center",
      justifyContent: "center"
    },
    card: {
      width: cardWidth,
      height: cardHeight,
      justifyContent: "space-between",
      backgroundColor: "#ff0066",
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { deviceWidth: 0.5, deviceHeight: 0.5 },
      shadowOpacity: 0.5,
      shadowRadius: 3,
      elevation: 5,
      paddingVertical: 20,
      paddingHorizontal: 20
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    cardHeaderTitleText: {
      color: "white",
      fontSize: 16
    },
    cardHeaderButtonImage: {
      height: 30,
      width: 30,
      tintColor: "white"
    },
    cardBalanceText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold"
    },
    cardHideBalanceText: {
      color: "white"
    },
    cardAccountNumber: {
    },
    cardAccountNumberText1: {
      color: "white",
      fontSize: 12
    },
    cardAccountNumberText2: {
      color: "white",
      fontSize: 16
    }
  })
);