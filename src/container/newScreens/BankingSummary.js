import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { VictoryBar, VictoryChart, VictoryGroup, VictoryAxis } from "victory-native";
import { Picker } from '@react-native-picker/picker';

import { getAxisTickFormat } from "../../utils";
import iconTokopedia from "../../../assets/icon-tokopedia.png";
import iconBank from "../../../assets/icon-bank.jpg";
import iconCount from "../../../assets/icon-count.png";
import iconTotal from "../../../assets/icon-total.png";

const flatListItem = [{ id: 1 }];

class BankingSummary extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      radioButtonFocus: "weekly",
      pickerFocus: "48"
    };
  };

  handlePressRadioButton = (key) => {
    this.setState({ radioButtonFocus: key });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={flatListItem}
          keyExtractor={item => "key" + item.id}
          renderItem={({ item, index }) => {
            return (
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
                    tickValues={[0, 250000, 500000, 750000, 1000000]}
                    tickFormat={(t) => getAxisTickFormat(t)}
                  />
                  <VictoryGroup
                    offset={20}
                    categories={{
                      x: ["Week 45", "Week 46", "Last Week", "This Week"]
                    }}
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
                      data={[{ x: "Week 45", y: 700000 }, { x: "Week 46", y: 690000 }, { x: "Last Week", y: 700000 }, { x: "This Week", y: 200000 }]}
                    />
                    <VictoryBar
                      data={[{ x: "Week 45", y: 545000 }, { x: "Week 46", y: 800000 }, { x: "Last Week", y: 400000 }, { x: "This Week", y: 500000 }]}
                    />
                  </VictoryGroup>
                </VictoryChart>
                <View style={styles.detail}>
                  <Text style={styles.textSubtitle}>Detail</Text>
                  <View style={styles.pickerView}>
                    <Picker
                      dropdownIconColor="black"
                      selectedValue={this.state.pickerFocus}
                      style={styles.picker}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ pickerFocus: itemValue })
                      }>
                      <Picker.Item label="Last week" value="47" />
                      <Picker.Item label="This week" value="48" />
                    </Picker>
                  </View>
                  <View style={styles.detailSub}>
                    <View style={styles.detailSub2}>
                      <View style={styles.debitLegend} />
                      <Text>Total Debit</Text>
                    </View>
                    <Text style={styles.textDebit}>Rp 560.000</Text>
                  </View>
                  <View style={styles.detailSub}>
                    <View style={styles.detailSub2}>
                      <View style={styles.creditLegend} />
                      <Text>Total Credit</Text>
                    </View>
                    <Text style={styles.textCredit}>Rp 100.000.000</Text>
                  </View>
                </View>
                <View style={styles.line} />
                <Text style={styles.textTitle}>Favorite Transactions</Text>
                <View style={styles.transactionList}>
                  <View style={styles.transactionItem}>
                    <View style={styles.transactionItemSub}>
                      <Image
                        source={iconBank}
                        style={styles.transactionItemMainImage}
                      />
                      <View>
                        <Text style={styles.transactionItemMainText}>RICO KRISHANDI</Text>
                        <Text style={styles.transactionItemSubText}>Bank Sinarmas</Text>
                        <Text style={styles.transactionItemSubText}>052995205</Text>
                      </View>
                    </View>
                    <View>
                      <View style={styles.transactionItemSub2}>
                        <Image
                          source={iconCount}
                          style={styles.transactionItemCountImage}
                        />
                        <Text style={styles.transactionItemCountText}>3</Text>
                      </View>
                      <View style={styles.transactionItemSub2}>
                        <Image
                          source={iconTotal}
                          style={styles.transactionItemTotalImage}
                        />
                        <Text style={styles.transactionItemTotalText}>Rp 50.000</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.transactionItem}>
                    <View style={styles.transactionItemSub}>
                      <Image
                        source={iconTokopedia}
                        style={styles.transactionItemMainImage}
                      />
                      <View>
                        <Text style={styles.transactionItemMainText}>TOKOPEDIA</Text>
                        <Text style={styles.transactionItemSubText}>81099</Text>
                        <Text style={styles.transactionItemSubText}>Rian Krishandi</Text>
                      </View>
                    </View>
                    <View>
                      <View style={styles.transactionItemSub2}>
                        <Image
                          source={iconCount}
                          style={styles.transactionItemCountImage}
                        />
                        <Text style={styles.transactionItemCountText}>3</Text>
                      </View>
                      <View style={styles.transactionItemSub2}>
                        <Image
                          source={iconTotal}
                          style={styles.transactionItemTotalImage}
                        />
                        <Text style={styles.transactionItemTotalText}>Rp 50.000</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )
          }}
        />
      </SafeAreaView>
    );
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

export default BankingSummary;