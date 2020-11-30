import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
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
  getBalance,
  getStatements,
  getCustomerData
} from "../../../action/home/homeFunction";
import {
  logoutEasyPin
} from "../../../action/login/loginFunction";
import Loading from "../../../Loading";

const flatListItem = [{ id: 1 }];

class NewHome extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  };


  componentDidMount = () => {
    const { dispatch, cif_code } = this.props;

    this.setLoading(true);

    dispatch(getBalance(cif_code)).then(() => {
      dispatch(getStatements(cif_code)).then(() => {
        dispatch(getCustomerData(cif_code)).then(() => {
          this.setLoading(false);
        });
      });
    });
  };


  handleLogoutEasyPin = () => {
    const { dispatch } = this.props;

    dispatch(logoutEasyPin());
  };


  setLoading(status) {
    this.setState({
      loading: status
    })
  };


  navigateTo = (screen) => {
    const { navigate } = this.props.navigation;
    navigate(screen);
  };


  handlePayment = (merchant, code) => {
    const { navigate } = this.props.navigation;
    if (code == "") {
      ToastAndroid.show("This service is unavailable right now", ToastAndroid.SHORT)
    } else {
      navigate('SetPhoneNumber', {
        merchant: merchant,
        code: code
      })
    };
  };


  render() {
    const { name, isEasyPinLogin } = this.props;
    const { loading } = this.state;


    if (loading || this.props.loading) {
      return <Loading />;
    };


    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={flatListItem}
          keyExtractor={item => "key" + item.id}
          renderItem={({ item, index }) => {
            return (
              <>
                <View style={styles.header}>
                  <View style={styles.headerTitle}>
                    <Text style={styles.headerTitleText}>RIAN KRISHANDI</Text>
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
                      onPress={() => this.navigateTo("BankAccount")}
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
                <TouchableOpacity
                  onPress={() => this.navigateTo("BankingSummary")}
                  style={styles.bankingSummaryButton}
                >
                  <View style={styles.bankingSummaryButtonSub}>
                    <Image
                      source={iconStatistic}
                      style={styles.bankingSummaryButtonImage}
                    />
                    <View style={styles.bankingSummaryButtonSub2}>
                      <Text style={styles.bankingSummaryButtonTitleText}>
                        Banking Summary
                      </Text>
                      <Text style={styles.bankingSummaryButtonDetailText}>
                        Keep track of your financial activities
                      </Text>
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
  isEasyPinLogin: state.login.isEasyPinLogin,
  balance: state.home.balance,
  statements: state.home.statements,
  loading: state.home.loading,
  name: state.login.name,
  cif_code: state.login.cif_code,
  isLogin: state.login.isLogin,
  gender: state.home.gender,
  email: state.home.email,
  transactionRecommendation: state.home.transactionRecommendation
})

export default connect(mapStateToProps)(NewHome);