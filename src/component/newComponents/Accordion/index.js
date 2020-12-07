import React, { useState, useRef } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native';

import styles from "./style";
import {formatCurrency} from "../../../utils/index";
import iconBankAccount from "../../../../assets/icon-bank-account.png";
import iconArrowDown from "../../../../assets/icon-arrow-down.png";

const Accordion = ({accounts}) => {
  const [open, setOpen] = useState(false);
  const animatedController = useRef(new Animated.Value(0)).current;

  const arrowAngle = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0rad', `${Math.PI}rad`],
  });

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const savingsSum = () => {
    let sum = 0;
    accounts.map(account => {
      sum = sum + account.balance
    })
    return sum;
  }

  const toggleBody = () => {
    if (open) {
      Animated.timing(animatedController, {
        duration: 200,
        toValue: 0,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing(animatedController, {
        duration: 200,
        toValue: 1,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: true
      }).start();
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setOpen(!open);
  };

  return (
    <View style={styles.accordion}>
      <View style={styles.header}>
        <View style={styles.headerSub}>
          <Image
            source={iconBankAccount}
            style={styles.headerImage}
          />
        </View>
        <View style={styles.headerSub2}>
          <Text style={styles.headerTitleText}>Summary Portofolio</Text>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => toggleBody()}
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonText}>
              {open ? "Hide Detail" : "Show Detail"}
            </Text>
            <Animated.View style={{ transform: [{ rotateZ: arrowAngle }] }}>
              <Image
                source={iconArrowDown}
                style={styles.headerButtonImage}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
      {
        open &&
        <View
          style={styles.bodyContainer}
        >
          <View style={styles.bodyContent}>
            <View style={styles.bodyContentSub}>
              <Text style={styles.bodyContentText1}>Savings</Text>
              <Text style={styles.bodyContentText2}>{formatCurrency(savingsSum())}</Text>
            </View>
            <View style={styles.bodyContentSub}>
              <Text style={styles.bodyContentText1}>Current</Text>
              <Text style={styles.bodyContentText2}>Rp 0</Text>
            </View>
            <View style={styles.bodyContentSub}>
              <Text style={styles.bodyContentText1}>Time Deposit</Text>
              <Text style={styles.bodyContentText2}>Rp 0</Text>
            </View>
            <View style={styles.bodyContentSub}>
              <Text style={styles.bodyContentText1}>Rekening Dana Nasabah</Text>
              <Text style={styles.bodyContentText2}>Rp 0</Text>
            </View>
          </View>
        </View>
      }
    </View>
  );
};

export default Accordion;