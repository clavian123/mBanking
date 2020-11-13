import { Platform, Alert } from "react-native";
import { Dimensions } from "react-native";

export const getDeviceWidth = () => {
  return Dimensions.get("window").width;
};

export const getDeviceHeight = () => {
  return Dimensions.get("window").height;
};

export const formatCurrency = (x) => {
  var prefix;

  if (x > 0) {
    prefix = "Rp ";
  } else {
    prefix = "- Rp ";
  }

  let currency = Math.abs(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return prefix + currency;
};