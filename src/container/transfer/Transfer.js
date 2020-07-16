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
import { getListClientDestination } from '../../action/transfer/transferFunction';
import AccountListItem from '../../component/AccountListItem';

class Transfer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      accNumber: ''
    };
  }

  componentDidMount = () => {
    const { accNumber } = this.props;
    this.props.dispatch(getListClientDestination(accNumber));
  }

  handleNextButton = () => {
    const{ navigation } = this.props;
    navigation.navigate('SelectPayee', {
      destAccNumber: this.state.accNumber
    });
  }

  render() {

    const { listDest } = this.props;

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
            onChangeText={(text) => this.setState({ accNumber: text })}
          />
          <TouchableHighlight 
            style={{...styles.nextButton, backgroundColor: this.state.accNumber ? 'red' : '#FA8072'}}
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
          />
        </View>

        <FlatList
          style={styles.list}
          data={listDest}
          renderItem={({item}) => (
            <AccountListItem name={item.fullName} accNumber={item.accNumberDest}/>
          )}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor:"white"
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
    marginTop: 60
  }
});

const mapStateToProps = state => ({
  accNumber: state.login.accNumber,
  pin: state.login.pin,
  listDest: state.transfer.listDest
});

export default connect(mapStateToProps)(Transfer);
