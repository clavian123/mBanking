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
import { VictoryBar, VictoryChart, VictoryTheme, VictoryGroup, VictoryAxis, VictoryLabel, VictoryLegend } from "victory-native";
import { connect } from "react-redux";

class BankingSummary extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  };

  getAxisTickFormat = (t) => {
    let num = t;
    let unit = null;

    if (num >= 1000000) {
      num = num / 1000000;
      unit = "M";
    } else if (num >= 1000) {
      num = num / 1000;
      unit = "K";
    };

    if (num % 1 !== 0) {
      num = Math.round(num);
    };

    if (unit) {
      return num + unit;
    };

    return num;
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.textTitle}>Total Debit Credit</Text>
        <View style={styles.chart}>
          <VictoryChart
            padding={{
              left: 60, right: 20, top: 15, bottom: 30
            }}
            domainPadding={{ x: 40 }}
          >
            <VictoryAxis />
            <VictoryAxis
              dependentAxis
              tickValues={[0, 250000, 500000, 750000, 1000000]}
              tickFormat={this.getAxisTickFormat}
            />
            <VictoryGroup
              offset={20}
              categories={{
                x: ["Week 45", "Week 46", "Week 47", "Week 48"]
              }}
              colorScale={["#009900", "#ff0066"]}
              animate={{
                duration: 500,
                onLoad: { duration: 250 }
              }}
              style={{
                data: {
                  fillOpacity: 0.7, stroke: "black", strokeWidth: 3
                }
              }}
            >
              <VictoryBar
                data={[{ x: "Week 45", y: 1000000 }, { x: "Week 46", y: 500000 }, { x: "Week 47", y: 600000 }]}
              />
              <VictoryBar
                data={[{ x: "Week 45", y: 545000 }, { x: "Week 46", y: 270000 }, { x: "Week 47", y: 45000 }]}
              />
            </VictoryGroup>
          </VictoryChart>
        </View>
      </SafeAreaView>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chart: {
  },
  textTitle: {
    marginHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default BankingSummary;