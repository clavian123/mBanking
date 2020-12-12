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

  if (x >= 0) {
    prefix = "Rp ";
  } else {
    prefix = "- Rp ";
  }

  let currency = Math.abs(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return prefix + currency;
};

export const getAxisTickFormat = (t) => {
  let num = t;
  let unit = null;

  if (num >= 1000000) {
    num = num / 1000000;
    unit = "M";
  } else if (num >= 1000) {
    num = num / 1000;
    unit = "K";
  };

  if (unit == "M" && num % 1 !== 0){
    num = num.toFixed(1);
  } else {
    num = Math.round(num);
  }

  // if (num % 1 !== 0 && unit == "K") {
  //   num = Math.round(num);
  // }

  if (unit) {
    return num + unit;
  };

  return num;
};