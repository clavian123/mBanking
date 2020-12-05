import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  Modal
} from "react-native";
import { connect } from "react-redux";

import styles from "./style";
import iconNotification from "../../../../assets/icon-notification.png";
import iconLogout from "../../../../assets/icon-logout.png";
import iconScan from "../../../../assets/icon-scan.png";
import iconCoin from "../../../../assets/icon-coin.jpg";
import iconBankAccount from "../../../../assets/icon-bank-account.png";
import * as payment from "../../../constants/payment";
import iconStatistic from "../../../../assets/icon-statistic.png"

import {
  linkUnlinkAccount,
  getUserName
} from "../../../newFunction/homeFunction";

import {
  logoutEasyPin
} from "../../../newFunction/loginFunction";

import {
  easyPinLogin
} from "../../../newFunction/loginAction";

import {
  setMerchantCode
} from "../../../newFunction/paymentFunction"

import Loading from "../../../Loading";

const flatListItem = [{ id: 1 }];

class NewHome extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      name: '',
      loading: false
    };
  };


  componentDidMount = async() => {
    const { deviceId } = this.props;
    this.props.dispatch(easyPinLogin(false));
    this.props.dispatch(linkUnlinkAccount(deviceId));
    this.setState({ name: await this.props.dispatch(getUserName(deviceId)) });
  };

  componentWillUnmount() {
    this.setState = (name, callback)=>{
      return;
    };
  }


  handleLogoutEasyPin = () => {
    const { dispatch } = this.props;
    dispatch(logoutEasyPin());
  };


  handleBankAccount = () => {
    const { navigation } = this.props;
    navigation.navigate("BankAccount");
  }


  handlePayment = async(merchant, code) => {
    const { navigate } = this.props.navigation;
    if (code == "") {
      ToastAndroid.show("This service is unavailable right now", ToastAndroid.SHORT)
    } else {
      await this.props.dispatch(setMerchantCode(code, merchant));
      navigate('SetPhoneNumber', {
        merchant: merchant,
        code: code
      })
    };
  };


  render() {
    const { loading, isEasyPinLogin } = this.props;

    return (
      <SafeAreaView style={styles.container}>

        {
          loading ?
          <Modal transparent={true}>
             <Loading transparent={true}/>
          </Modal>
          : null
        }


        <FlatList
          data={flatListItem}
          keyExtractor={item => "key" + item.id}
          renderItem={({ item, index }) => {
            return (
              <>
                <View style={styles.header}>
                  <View style={styles.headerTitle}>
                    <Text style={styles.headerTitleText}>{this.state.name.toUpperCase()}</Text>
                    <View style={styles.headerTitleSub}>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.headerTitleButton}
                      >
                        <Image
                          source={iconNotification}
                          style={styles.headerTitleButtonImage}
                        />
                      </TouchableOpacity>
                      {
                        isEasyPinLogin && <TouchableOpacity
                          onPress={this.handleLogoutEasyPin}
                          activeOpacity={0.5}
                          style={{
                            ...styles.headerTitleButton,
                            marginLeft: 13
                          }}
                        >
                          <Image
                            source={iconLogout}
                            style={styles.headerTitleButtonImage}
                          />
                        </TouchableOpacity>
                      }
                    </View>
                  </View>
                  <View style={styles.headerCard}>
                    <TouchableOpacity style={styles.headerCardSideButton}>
                      <Image
                        source={iconScan}
                        style={styles.headerCardSideButtonImage}
                      />
                    </TouchableOpacity>
                    <View style={styles.line} />
                    <TouchableOpacity style={styles.headerCardMainButton}>
                      <View style={styles.headerCardMainButtonSub}>
                        <Image
                          source={iconCoin}
                          style={styles.headerCardMainButtonImage1}
                        />
                      </View>
                      <Text style={styles.headerCardButtonText}>Simas Poin</Text>
                    </TouchableOpacity>
                    <View style={styles.line} />
                    <TouchableOpacity
                      onPress={() => this.handleBankAccount()}
                      style={styles.headerCardMainButton}
                    >
                      <View style={styles.headerCardMainButtonSub}>
                        <Image
                          source={iconBankAccount}
                          style={styles.headerCardMainButtonImage2}
                        />
                      </View>
                      <Text style={styles.headerCardButtonText}>Bank Account</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.payment}>
                  <Text style={styles.paymentTitleText}>Pay/Top Up</Text>
                  <View style={styles.paymentContent}>
                    {
                      payment.merchants
                        .map(merchant => {
                          return (
                            <TouchableOpacity
                              onPress={() => {
                                this.handlePayment(merchant.label, merchant.code);
                              }}
                              key={merchant.id}
                              style={styles.paymentContentButton}
                            >
                              <View style={styles.paymentContentButtonSub}>
                                <Image
                                  source={merchant.iconSource}
                                  style={styles.paymentContentImage}
                                />
                              </View>
                              <Text style={styles.paymentContentText}>{merchant.label}</Text>
                            </TouchableOpacity>
                          );
                        })
                    }
                  </View>
                </View>
                <TouchableOpacity style={styles.bankingSummaryButton}>
                  <View style={styles.bankingSummaryButtonSub}>
                    <Image
                      source={iconStatistic}
                      style={styles.bankingSummaryButtonImage}
                    />
                    <View style={styles.bankingSummaryButtonSub2}>
                      <Text style={styles.bankingSummaryButtonTitleText}>Banking Summary</Text>
                      <Text style={styles.bankingSummaryButtonDetailText}>Keep track of your financial activities</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            );
          }}
        />
      </SafeAreaView >
    );
  };
};

const mapStateToProps = state => ({
  loading: state.loading.load,
  isLogin: state.newLogin.isLogin,
  isEasyPinLogin: state.newLogin.isEasyPinLogin,
  deviceId: state.newLogin.deviceId
})

export default connect(mapStateToProps)(NewHome);