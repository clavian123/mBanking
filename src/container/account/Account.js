import React from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';
import { connect } from 'react-redux';

import { onSignOut } from '../../Auth';
import { logout } from '../../action/index';


class Account extends React.Component {

  static navigationOptions = {
    title: 'Accounts',
  };

  handleSignOut = () =>{
    this.props.dispatch(logout());
    onSignOut();
  }

  render() {

    return (
      <View>
        <Text>Account</Text>
        <Button
          title="Logout"
          onPress={
            () => this.handleSignOut()
          }
        />
      </View>
    );
  }
};

const mapStateToProps = state => ({
  state: state.login
})

export default connect(mapStateToProps)(Account);