import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  KeyboardAvoidingView,
  Modal
} from 'react-native';
import { TextInput, FlatList } from 'react-native-gesture-handler';

import { connect } from 'react-redux';
import AccountListItem from '../../component/AccountListItem';

import Loading from '../../Loading';

import {
  getTargetAccountList,
  setTargetAccount
} from '../../newFunction/transferFunction';

class Transfer extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      accNumber: '',
      listDest: [],
      searchList: [],
      buttonColor: '#FA8072',
      keyword: ''
    };
  }

  async componentDidMount(){
    const { navigation, deviceId } = this.props;
    navigation.addListener('focus', async() => {
      return this.setState({ listDest: await this.props.dispatch(getTargetAccountList(deviceId)), accNumber: '', buttonColor: '#FA8072' });
    })
    this.setState({ listDest: await this.props.dispatch(getTargetAccountList(deviceId)) })
  }

  componentWillUnmount() {
    this.setState = (listDest, callback)=>{
      return;
    };
  }

  handleChangeColor = () => {
    if(this.state.accNumber.length >= 6){
      this.setState({ buttonColor: "#C10000" });
    }else{
      this.setState({ buttonColor: "#FA8072" })
    }
  }

  handleNextButton = () => {
    const { navigation } = this.props;
    const list = this.state.listDest;
    if(this.state.buttonColor == '#C10000'){
      if (list == undefined) {
        if(list.filter((item) => item.account_number == this.state.accNumber).length != 0) {
          let acc = listDest.filter((item) => item.account_number == this.state.accNumber)[0];
          this.props.dispatch(setTargetAccount(acc.name, acc.account_number, acc.bank_name));
          navigation.navigate('SetAmount', {
            bankName: acc.bank_name
          });
        }
      } else {
        navigation.navigate('SelectPayee', {
          accNumber: this.state.accNumber,
          buttonColor: '#FA8072'
        })
      }
    }
  }

  handleSearch = (text) => {
      if(text != "") {
        if( isNaN(text) ){
          this.setState({ searchList: this.state.listDest.filter((item) => item.name.toUpperCase().includes(text.toUpperCase())) })
        } else {
          this.setState({ searchList: this.state.listDest.filter((item) => item.account_number.includes(text)) })
        }
      } 
  }

  refreshList = async(newList) => {
    this.setState({ listDest: newList })
  }

  render() {

    const { loading } = this.props;

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
        enabled={Platform.OS === "ios" ? true : false}
      >

            {
                loading ? 
                <Modal transparent={true}>
                    <Loading transparent={true}/>
                </Modal>
                : null
            }

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
            value={this.state.accNumber}
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
            onChangeText={(text) => { this.setState({ keyword: text }); this.handleSearch(text) } }
          />
        </View>

        <View style={styles.list}>
        <FlatList
          data={this.state.keyword == '' ? this.state.listDest : this.state.searchList}
          extraData={this.state}
          onRefresh={true}
          renderItem={({item}) => (
            <AccountListItem navigation={this.props.navigation} refreshList={this.refreshList} name={item.name} accNumber={item.account_number} bankName={item.bank_name}/>
          )}
          ListEmptyComponent={
            <Text style={{ marginTop: 30, textAlign: 'center', color: 'grey' }}>Nothing to show</Text>
          }
          keyExtractor={item => item.account_number}
        />
        </View>
      </KeyboardAvoidingView>
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
    width: "100%",
    alignItems: 'center'
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
    justifyContent: 'center',
    marginLeft: 20,
  },
  iconNext: {
    height: 25,
    tintColor: 'white',
    width: 25,
    alignSelf: 'center',
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
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20
  },
  searchInput: {
    width: "90%",
    height: 50,
    fontSize: 17,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#888888",
    flex: 1
  },
  searchIcon: {
    width: 25,
    height: 30,
    alignSelf: 'center',
    position: 'absolute',
    right: 10
  },
  list: {
    flex: 1,
    marginVertical: 20,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  }
});

const mapStateToProps = state => ({
  loading: state.loading.load,
  deviceId: state.newLogin.deviceId,
  
  cif_code: state.login.cif_code,
  easyPin: state.login.easyPin,
  listDest: state.transfer.listDest,
  destAcc: state.transfer.destAcc
});

export default connect(mapStateToProps)(Transfer);
