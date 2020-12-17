import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { getBankingSummary } from "../../action/bankingSummary/bankingSummaryFunction";
import { VictoryBar, VictoryChart, VictoryGroup, VictoryAxis } from "victory-native";
import { Picker } from '@react-native-picker/picker';
import { getAxisTickFormat } from "../../utils";
import iconGopay from "../../../assets/icon-go-pay.jpg";
import iconOvo from "../../../assets/icon-ovo.png";
import iconTokopedia from "../../../assets/icon-tokopedia.png";
import iconBank from "../../../assets/icon-bank.jpg";
import iconCount from "../../../assets/icon-count.png";
import iconTotal from "../../../assets/icon-total.png";
import Loading from "../../Loading";
import { formatCurrency } from "../../utils";

import {
  refreshEasyPinLogin
} from '../../newFunction/loginFunction'

import {
  setTargetAccount
} from '../../newFunction/transferFunction'

import {
  setMerchantCode,
  setTargetSubscriber
} from '../../newFunction/paymentFunction'

const flatListItem = [{ id: 1 }];

class BankingSummary extends React.Component {
  state = {
    radioButtonFocus: "weekly",
    weeklyPickerFocus: "This week",
    monthlyPickerFocus: ""
  };

  componentDidMount = () => {
    const { deviceId, getBankingSummary } = this.props;
    refreshEasyPinLogin(deviceId)
    getBankingSummary(deviceId);
  };

  componentDidUpdate = (prevProps) => {
    const { monthlyPickerFocus } = this.state;
    const { monthlyDebitCreditTotal } = this.props;

    if (monthlyPickerFocus == "") {
      this.setState({
        monthlyPickerFocus: monthlyDebitCreditTotal.debits[3].month
      });
    };
  };

  handlePressRadioButton = (key) => {
    const { deviceId, refreshEasyPinLogin } = this.props
    refreshEasyPinLogin(deviceId)
    this.setState({
      radioButtonFocus: key,
    });
  };

  getTickValues = (highestY) => {
    if (highestY < 1) {
      return [0];
    };

    let adder = highestY / 4;
    let tickValues = [0, adder, adder * 2, adder * 3, highestY];

    return tickValues;
  };

  getTotalDebitDetail = () => {
    const { radioButtonFocus, weeklyPickerFocus, monthlyPickerFocus } = this.state;
    const { weeklyDebitCreditTotal, monthlyDebitCreditTotal } = this.props;
    let amount = 0;

    if (Array.isArray(weeklyDebitCreditTotal.debits) && Array.isArray(monthlyDebitCreditTotal.debits)) {
      if (radioButtonFocus === "weekly") {
        amount = weeklyDebitCreditTotal.debits.find(item => item.week === weeklyPickerFocus).y;
      } else {
        amount = monthlyDebitCreditTotal.debits.find(item => item.month === monthlyPickerFocus).y;
      };
    }

    return amount;
  };

  getTotalCreditDetail = () => {
    const { radioButtonFocus, weeklyPickerFocus, monthlyPickerFocus } = this.state;
    const { weeklyDebitCreditTotal, monthlyDebitCreditTotal } = this.props;
    let amount = 0;

    if (Array.isArray(weeklyDebitCreditTotal.credits) && Array.isArray(monthlyDebitCreditTotal.credits)) {
      if (radioButtonFocus === "weekly") {
        amount = weeklyDebitCreditTotal.credits.find(item => item.week === weeklyPickerFocus).y;
      } else {
        amount = monthlyDebitCreditTotal.credits.find(item => item.month === monthlyPickerFocus).y;
      };
    }

    return amount;
  };

  handlePress = async (item) => {
    const { navigation, deviceId, refreshEasyPinLogin, setTargetAccount, setMerchantCode, setTargetSubscriber } = this.props
    refreshEasyPinLogin(deviceId)
    if (item.merchant == 0) {
      setTargetAccount(item.targetName, item.subText2, item.bankName)
      navigation.navigate('SetAmount', {
        bankName: item.bankName
      })
    } else {
      setMerchantCode(item.merchantCode, item.merchantName)
      setTargetSubscriber(item.subText1, item.subText2, "")
      navigation.navigate('PaymentSetAmount')
    }
  }

  render() {
    const {
      loading,
      transactionOut,
      weeklyHighestY,
      weeklyDebitCreditTotal,
      monthlyHighestY,
      monthlyDebitCreditTotal
    } = this.props;
    const {
      radioButtonFocus,
      monthlyPickerFocus
    } = this.state;
    const { deviceId } = this.props

    if (loading) {
      return <Loading />;
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={flatListItem}
            keyExtractor={item => "key" + item.id}
            renderItem={({ item, index }) => {
              return (
                <>
                  <View style={styles.flatList}>
                    <Text style={styles.textTitle}>Total Debit Credit</Text>
                    <View style={styles.periodical}>
                      <Text style={styles.textSubtitle}>Periodical</Text>
                      <View style={styles.radioButton}>
                        {
                          radioButtonOptions.map(item => {
                            const { radioButtonFocus } = this.state;

                            return (
                              <View key={item.key} style={styles.radioButtonItem}>
                                <TouchableOpacity
                                  style={styles.circle}
                                  onPress={() => this.handlePressRadioButton(item.key)}
                                >
                                  {radioButtonFocus === item.key && (<View style={styles.checkedCircle} />)}
                                </TouchableOpacity>
                                <Text>{item.text}</Text>
                              </View>
                            );
                          })
                        }
                      </View>
                    </View>
                    <VictoryChart
                      padding={{
                        left: 50, right: 20, top: 15, bottom: 30
                      }}
                      domainPadding={{ x: 30 }}
                    >
                      <VictoryAxis />
                      <VictoryAxis
                        dependentAxis
                        tickValues={this.getTickValues(
                          radioButtonFocus == "weekly" ?
                            weeklyHighestY :
                            monthlyHighestY
                        )}
                        tickFormat={(t) => getAxisTickFormat(t)}
                      />
                      <VictoryGroup
                        offset={20}
                        colorScale={["#ff0066", "#009900"]}
                        animate={{
                          duration: 500,
                          onLoad: { duration: 250 }
                        }}
                        style={{
                          data: {
                            stroke: "black", strokeWidth: 3
                          }
                        }}
                      >
                        <VictoryBar
                          data={
                            radioButtonFocus === "weekly" ?
                              weeklyDebitCreditTotal.debits :
                              monthlyDebitCreditTotal.debits
                          }
                        />
                        <VictoryBar
                          data={
                            radioButtonFocus === "weekly" ?
                              weeklyDebitCreditTotal.credits :
                              monthlyDebitCreditTotal.credits
                          }
                        />
                      </VictoryGroup>
                    </VictoryChart>
                    <View style={styles.detail}>
                      <Text style={styles.textSubtitle}>Detail</Text>
                      <View style={styles.pickerView}>
                        {
                          radioButtonFocus == "weekly" &&
                          weeklyDebitCreditTotal.debits != undefined &&
                          weeklyDebitCreditTotal.debits.length > 0 &&
                          <Picker
                            dropdownIconColor="black"
                            selectedValue={this.state.weeklyPickerFocus}
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) =>
                              this.setState({ weeklyPickerFocus: itemValue }, refreshEasyPinLogin(deviceId))
                            }>
                            {
                              weeklyDebitCreditTotal.debits.map(item =>
                                <Picker.Item key={item.week} label={item.week} value={item.week} />
                              )
                            }
                          </Picker>
                        }
                        {
                          radioButtonFocus == "monthly" &&
                          monthlyDebitCreditTotal.debits != undefined &&
                          monthlyDebitCreditTotal.debits.length > 0 &&
                          <Picker
                            dropdownIconColor="black"
                            selectedValue={this.state.monthlyPickerFocus}
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) =>
                              this.setState({ monthlyPickerFocus: itemValue })
                            }>
                            {
                              monthlyDebitCreditTotal.debits.map(item =>
                                <Picker.Item key={item.month} label={item.month} value={item.month} />
                              )
                            }
                          </Picker>
                        }
                      </View>
                      <View style={styles.detailSub}>
                        <View style={styles.detailSub2}>
                          <View style={styles.debitLegend} />
                          <Text>Total Debit</Text>
                        </View>
                        <Text style={styles.textDebit}>{formatCurrency(this.getTotalDebitDetail())}</Text>
                      </View>
                      <View style={styles.detailSub}>
                        <View style={styles.detailSub2}>
                          <View style={styles.creditLegend} />
                          <Text>Total Credit</Text>
                        </View>
                        <Text style={styles.textCredit}>{formatCurrency(this.getTotalCreditDetail())}</Text>
                      </View>
                    </View>
                    <View style={styles.line} />
                    <Text style={styles.textTitle}>Top Transactions</Text>
                    <View style={styles.transactionList}>
                      {
                        Array.isArray(transactionOut) && transactionOut.map(item => {
                          let merchant = item.merchant;
                          let transactionType = merchant == 0 ? 0 : 1;
                          let imgSource = transactionType == 0 ?
                            iconBank :
                            merchant == 1 ?
                              iconGopay :
                              merchant == 2 ?
                                iconOvo :
                                iconTokopedia;
                          let mainText = item.mainText;
                          let subText1 = item.subText1;
                          let subText2 = item.subText2 || "-";
                          let count = item.count;
                          let totalAmount = formatCurrency(item.totalAmount);

                          return (
                            < TouchableOpacity
                              key={item.mainText}
                              onPress={() => { this.handlePress(item) }}
                              style={styles.transactionItem}
                            >
                              <View style={styles.transactionItemSub}>
                                <Image
                                  source={imgSource}
                                  style={styles.transactionItemMainImage}
                                />
                                <View>
                                  <Text style={styles.transactionItemMainText}>{mainText}</Text>
                                  <Text style={styles.transactionItemSubText}>{subText1}</Text>
                                  <Text style={styles.transactionItemSubText}>{subText2}</Text>
                                </View>
                              </View>
                              <View>
                                <View style={styles.transactionItemSub2}>
                                  <Image
                                    source={iconCount}
                                    style={styles.transactionItemCountImage}
                                  />
                                  <Text style={styles.transactionItemCountText}>{count}</Text>
                                </View>
                                <View style={styles.transactionItemSub2}>
                                  <Image
                                    source={iconTotal}
                                    style={styles.transactionItemTotalImage}
                                  />
                                  <Text style={styles.transactionItemTotalText}>{totalAmount}</Text>
                                </View>
                              </View>
                            </ TouchableOpacity>
                          );
                        })
                      }
                    </View>
                  </View>
                </>
              )
            }}
          />
        </SafeAreaView>
      );
    };
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flatList: {
    paddingVertical: 20
  },
  textTitle: {
    marginHorizontal: 20,
    fontSize: 16,
    fontWeight: "bold"
  },
  periodical: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10
  },
  textSubtitle: {
    fontWeight: "bold"
  },
  radioButton: {
    marginTop: 5,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#ff0066",
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  radioButtonItem: {
    flexDirection: "row",
    alignItems: "center"
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ff0066",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  checkedCircle: {
    width: 10,
    height: 10,
    borderRadius: 7,
    backgroundColor: "#ff0066"
  },
  detail: {
    marginHorizontal: 20,
    marginTop: 10
  },
  pickerView: {
    backgroundColor: "lightgrey",
    width: "45%",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 15
  },
  picker: {
    height: 35,
    fontSize: 12
  },
  detailSub: {
    flexDirection: "row",
    marginVertical: 5
  },
  detailSub2: {
    flexDirection: "row",
    width: "50%"
  },
  debitLegend: {
    width: 20,
    height: 20,
    marginRight: 10,
    backgroundColor: "#ff0066",
    borderWidth: 3
  },
  creditLegend: {
    width: 20,
    height: 20,
    marginRight: 10,
    backgroundColor: "#009900",
    borderWidth: 3
  },
  textDebit: {
    fontWeight: "bold",
    color: "#ff0066"
  },
  textCredit: {
    fontWeight: "bold",
    color: "#009900"
  },
  line: {
    width: "100%",
    height: 4,
    backgroundColor: "lightgrey",
    marginVertical: 20
  },
  transactionList: {
    marginHorizontal: 20,
    marginTop: 15
  },
  transactionItem: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderColor: "lightgrey"
  },
  transactionItemSub: {
    flexDirection: "row",
    alignItems: "center"
  },
  transactionItemMainImage: {
    width: 40,
    height: 40,
    marginRight: 20
  },
  transactionItemMainText: {
    fontWeight: "bold"
  },
  transactionItemSubText: {
    fontSize: 12,
    color: "#666666"
  },
  transactionItemSub2: {
    width: 140,
    flexDirection: "row",
    alignItems: "center"
  },
  transactionItemCountImage: {
    width: 25,
    height: 25,
    marginRight: 5
  },
  transactionItemTotalImage: {
    width: 25,
    height: 25,
    marginRight: 5,
    tintColor: "#ff0066"
  },
  transactionItemCountText: {
    fontSize: 14,
    fontWeight: "bold"
  },
  transactionItemTotalText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ff0066"
  }
});

const radioButtonOptions = [
  {
    key: "weekly",
    text: "Weekly"
  },
  {
    key: "monthly",
    text: "Monthly"
  }
];

const mapStateToProps = state => ({
  deviceId: state.newLogin.deviceId,
  loading: state.bankingSummary.loading,
  monthlyDebitCreditTotal: state.bankingSummary.monthlyDebitCreditTotal,
  monthlyHighestY: state.bankingSummary.monthlyHighestY,
  transactionOut: state.bankingSummary.transactionOut,
  weeklyDebitCreditTotal: state.bankingSummary.weeklyDebitCreditTotal,
  weeklyHighestY: state.bankingSummary.weeklyHighestY
});

export default connect(
  mapStateToProps,
  { getBankingSummary, refreshEasyPinLogin, setTargetAccount, setTargetSubscriber, setMerchantCode }
)(BankingSummary);