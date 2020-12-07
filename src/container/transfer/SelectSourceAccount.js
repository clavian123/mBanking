import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text
} from 'react-native';
import SourceAccountListItem from '../../component/SourceAccountListItem';
import { connect } from 'react-redux';

import {
  getAccountList
} from '../../newFunction/homeFunction';

class SelectSourceAccount extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      accountList: []
    }
  }

  async componentDidMount() {
    const { deviceId } = this.props;
    this.setState({ accountList: await this.props.dispatch(getAccountList(deviceId)) });
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.selectLabel}>Select Source Account</Text>
        <Text style={{ ...styles.savingLabel, fontWeight: 'normal' }}>Saving Account</Text>

        <FlatList
          style={styles.list}
          data={this.state.accountList}
          renderItem={({ item }) => (
            <SourceAccountListItem
              transactionType={this.props.route.params.type}
              number={item.account_number}
              type={item.type ? item.type : "Saving Account"}
              name={item.account_name.toUpperCase()}
              balance={item.balance}
              navigation={this.props.navigation}
              dispatch={this.props.dispatch} />
          )}
          keyExtractor = { item => item.account_number }
        />
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  selectLabel: {
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20
  },
  savingLabel: {
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10
  },
  list: {
    width: '100%',
    paddingHorizontal: 20
  }
})

const mapStateToProps = state => ({
  deviceId: state.newLogin.deviceId
})

export default connect(mapStateToProps)(SelectSourceAccount);