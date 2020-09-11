import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';
import PaymentListItem from '../../component/PaymentListItem';

export default class Payment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      subscriber: [
        {
          id: 1,
          number: '082284174302',
          merchant: 'OVO'
        }
      ]
    };
  }

  handleMerchant = (merchant) => {
    const { navigation } = this.props;
    navigation.navigate('SetPhoneNumber', {
      merchant: merchant
    })
  }

  render() {
    const { transactions } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>

          <View style={styles.viewScrollView}>

            <View>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginBottom: 10
              }}>
                Pay/Top Up
              </Text>
            </View>
            
            <View style={styles.viewPayTopUpList}>
              {payTopUpList
                .map(payTopUpItem => {
                  return (
                    <TouchableOpacity key={payTopUpItem.id} style={styles.buttonPayTopUpItem} onPress={() => this.handleMerchant(payTopUpItem.label)}>
                      <Image
                        source={payTopUpItem.iconSource}
                        style={styles.iconPayTopUp}
                      />
                      <Text style={{ fontSize: 15 }}>{payTopUpItem.label}</Text>
                    </TouchableOpacity>
                  );
                })
              }
            </View>

            <View style={styles.viewOr}>
              <View style={styles.viewLine} />
              <Text style={{ color: 'grey', fontSize: 12, paddingHorizontal: 15 }}>OR</Text>
              <View style={styles.viewLine} />
            </View>

            <View>
              <Text style={{ fontSize: 16, marginBottom: 10 }}>Find from Previous Transactions</Text>
              <View style={styles.viewTextInput}>
                <TextInput placeholder="Biller name / Subscriber number" style={styles.textInput} />
                <Image source={require('../../../assets/icon-search-headed-left.png')} style={styles.iconSearch} />
              </View>
            </View>

            <View style={styles.list}>
                <FlatList 
                  data = {this.state.subscriber}
                  renderItem={({item}) => (
                    <PaymentListItem navigation={this.props.navigation} id={item.id} number={item.number} merchant={item.merchant} />
                  )}
                  ListEmptyComponent={
                    <Text style={{ marginTop: 50, textAlign: 'center', color: 'grey' }}>Nothing to show</Text>
                  }
                  keyExtractor={item => item.id}
                />
              </View>

          </View>
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  buttonPayTopUpItem: {
    alignItems: 'center',
    flexBasis: '25%',
    padding: 5
  },
  buttonTransaction: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    flexDirection: 'row',
    paddingVertical: 10
  },
  container: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%'
  },
  iconNext: {
    height: 25,
    marginLeft: 10,
    tintColor: 'lightgrey',
    width: 25
  },
  iconPayTopUp: {
    height: 45,
    width: 45
  },
  iconSearch: {
    height: 30,
    marginRight: 10,
    width: 25
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 17,
    height: 50
  },
  viewLine: {
    backgroundColor: 'grey',
    flex: 1,
    height: 1
  },
  viewOr: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20
  },
  viewPayTopUpList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  viewScrollView: {
    padding: 20
  },
  viewTextInput: {
    alignItems: 'center',
    borderColor: '#888888',
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: 10
  },
  list: {
    flex: 1,
    marginVertical: 20
  }
});

const payTopUpList = [
  {
    id: 1,
    iconSource: require("../../../assets/icon-ovo.png"),
    label: "OVO"
  },
  {
    id: 2,
    iconSource: require("../../../assets/icon-go-pay.jpg"),
    label: "Go-Pay"
  },
  {
    id: 3,
    iconSource: require("../../../assets/icon-tokopedia.png"),
    label: "Tokopedia"
  },
  {
    id: 4,
    iconSource: require("../../../assets/icon-scan.png"),
    label: "Scan"
  },
  {
    id: 5,
    iconSource: require("../../../assets/icon-water.png"),
    label: "Water"
  },
  {
    id: 6,
    iconSource: require("../../../assets/icon-electricity.png"),
    label: "Electricity"
  },
  {
    id: 7,
    iconSource: require("../../../assets/icon-credit-card.png"),
    label: "Credit Card"
  },
  {
    id: 8,
    iconSource: require("../../../assets/icon-others.png"),
    label: "Others"
  }
];