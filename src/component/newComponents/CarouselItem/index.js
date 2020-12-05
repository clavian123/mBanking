import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from "./style";
import { formatCurrency } from "../../../utils";
import iconShowBalance from "../../../../assets/icon-show-balance.png";
import iconHideBalance from "../../../../assets/icon-hide-balance.png";
import TransactionList from '../../../component/newComponents/TransactionList/index';

import { 
  connect
} from 'react-redux'

import { 
  getAccountStatements
} from '../../../newFunction/homeFunction'

const CarouselItem = (props) => {

  return (
      <View style={styles.itemView}>
        <View
          style={styles.card}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderTitleText}>Tabunganku</Text>
            <TouchableOpacity onPress={props.toggleHideBalance} activeOpacity={1}>
              <Image
                source={props.hideBalance ? iconShowBalance : iconHideBalance}
                style={styles.cardHeaderButtonImage}
              />
            </TouchableOpacity>
          </View>
          {
            props.hideBalance ?
              <Text style={styles.cardHideBalanceText}>Your balance is hidden</Text>
              : <Text style={styles.cardBalanceText}>
                {formatCurrency(props.item.balance)}
              </Text>
          }
          <View style={styles.cardAccountNumber}>
            <Text style={styles.cardAccountNumberText1}>Account Number</Text>
            <Text style={styles.cardAccountNumberText2}>{props.item.account_number}</Text>
          </View>
        </View>
      </View>
  );
};

const mapStateToProps = state => ({
  deviceId: state.newLogin.deviceId
})

export default connect(mapStateToProps)(CarouselItem);