import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from "./style";
import { formatCurrency } from "../../../utils";
import iconShowBalance from "../../../../assets/icon-show-balance.png";
import iconHideBalance from "../../../../assets/icon-hide-balance.png";

const CarouselItem = ({ item, hideBalance, toggleHideBalance }) => {
  return (
    <View style={styles.itemView}>
      <View
        style={styles.card}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderTitleText}>Tabunganku</Text>
          <TouchableOpacity onPress={toggleHideBalance} activeOpacity={1}>
            <Image
              source={hideBalance ? iconShowBalance : iconHideBalance}
              style={styles.cardHeaderButtonImage}
            />
          </TouchableOpacity>
        </View>
        {
          hideBalance ?
            <Text style={styles.cardHideBalanceText}>Your balance is hidden</Text>
            : <Text style={styles.cardBalanceText}>
              {formatCurrency(item.balance)}
            </Text>
        }
        <View style={styles.cardAccountNumber}>
          <Text style={styles.cardAccountNumberText1}>Account Number</Text>
          <Text style={styles.cardAccountNumberText2}>{item.accountNumber}</Text>
        </View>
      </View>
    </View>
  );
};


export default CarouselItem;