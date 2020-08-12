import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
} from 'react-native';
import { TextInput, FlatList } from 'react-native-gesture-handler';

import { connect } from 'react-redux';
import AccountListItem from '../../component/AccountListItem';
import { emptyAccountNumber, setDestinationAccountSuccess } from '../../action/transfer/transferAction';
import {getListDest} from '../../action/transfer/transferFunction';

class Transfer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      accNumber: '',
      listDest: [],
      buttonColor: '#FA8072',
      keyword: ''
    };
  }

  componentDidMount(){
    const { cif_code } = this.props;
    this.props.dispatch(getListDest(cif_code, "")).then(() => {
      const { listDest } = this.props;
      this.setState({ listDest: listDest })
    });
    
  }

  handleChangeColor = () => {
    if(this.state.accNumber.length >= 6){
      this.setState({ buttonColor: "#C10000" });
    }else{
      this.setState({ buttonColor: "#FA8072" })
    }
  }

  handleNextButton = () => {
    const { navigation, listDest } = this.props;
    if(this.state.buttonColor == '#C10000'){
      if(listDest.filter((item) => item.account_number == this.state.accNumber).length != 0) {
        let acc = listDest.filter((item) => item.account_number == this.state.accNumber)[0];
        this.props.dispatch(setDestinationAccountSuccess(acc.bank_detail.network_code, acc.bank_detail.bank_name, acc.account_number, acc.name));
        navigation.navigate('SetAmount');
      } else {
        this.props.dispatch(emptyAccountNumber());
        navigation.navigate('SelectPayee', {
          accNumber: this.state.accNumber,
          buttonColor: '#FA8072'
        });
      }
    }
  }

  handleSearch = () => {
    const keyword = this.state.keyword;
    const { cif_code } = this.props;
    this.props.dispatch(getListDest(cif_code, keyword)).then(() => {
      const { listDest } = this.props;
      this.setState({ listDest: listDest })
    });
  }

  render() {

    return (
      <View style={styles.container}>
        <Text
          style={{
            fontWeight: "bold", 
            fontSize: 16,
            margin: 20,
          }}
        >
          Send money to
        </Text>

        <View style={styles.inputView}>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Account number"
            keyboardType="numeric"
            onChangeText={(text) => this.setState({ accNumber: text }, this.handleChangeColor)}
          />
          <TouchableHighlight 
            style={{...styles.nextButton, backgroundColor: this.state.buttonColor }}
            onPress={this.handleNextButton}
          >
            <Image
              source={require('../../../assets/icon-next.png')}
              style={styles.iconNext}
            />
          </TouchableHighlight>
        </View>

        <View style={styles.viewOr}>
              <View style={styles.viewLine} />
              <Text style={{ color: 'grey', fontSize: 12, paddingHorizontal: 15 }}>OR</Text>
              <View style={styles.viewLine} />
        </View>

        <Text
           style={{
            fontSize: 16,
            marginHorizontal: 20,
          }}
        >
          Find from previous transactions
        </Text>
        
        <View style={styles.searchSection}>
          <Image
            style={styles.searchIcon}
            source={require('../../../assets/icon-search-headed-left.png')}
          />
          <TextInput 
            placeholder="Account number"
            style={styles.searchInput}
            onChangeText={(text) => this.setState({ keyword: text })}
          />
        </View>

        <View style={styles.list}>
        <FlatList
          data={this.state.listDest}
          renderItem={({item}) => (
            <AccountListItem navigation={this.props.navigation} name={item.name} accNumber={item.account_number} bankCode={item.bank_detail.network_code} bankName={item.bank_detail.bank_name}/>
          )}
        />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white",
  },
  inputView:{
    flexDirection: "row",
    marginHorizontal: 20,
    width: "100%"
  },
  textInputStyle: {
    width: "75%",
    height: 50,
    fontSize: 17,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#888888"
  },
  nextButton:{
    borderRadius: 50,
    width: 32,
    height: 32,
    marginVertical: 8,
    marginLeft: 20,
  },
  iconNext: {
    height: 25,
    tintColor: 'white',
    width: 25,
    marginLeft: 3,
    marginTop: 3,
    resizeMode: 'stretch'
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
    marginVertical: 20,
    marginHorizontal: 20
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20
  },
  searchInput: {
    flex: 1,
    width: "90%",
    height: 50,
    fontSize: 17,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#888888",
  },
  searchIcon: {
    width: 25,
    height: 30,
    marginVertical: 10,
    position: 'absolute',
    right: 10
  },
  list: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  }
});

const mapStateToProps = state => ({
  cif_code: state.login.cif_code,
  easyPin: state.login.easyPin,
  listDest: state.transfer.listDest,
  destAcc: state.transfer.destAcc
});

export default connect(mapStateToProps)(Transfer);
