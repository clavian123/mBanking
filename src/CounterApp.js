import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

import RootNavigator from './Router';
import { syncAsync } from './action/index'

const USER_EMAIL = 'USER_EMAIL'
const USER_PIN = 'USER_PIN'

class CounterApp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            checkedSignIn: false
        };
    }

    componentDidMount = () => {
        this.props.checkSignIn()
        this.setState({ checkedSignIn: true })
    }

    render() {

        const { checkedSignIn } = this.state;

        if (!checkedSignIn) {
            return null;
        }

        return (
            <RootNavigator />
        )
    }
}

const mapDispatchToProps = dispatch => ({
    checkSignIn: async () => {
        var email = await AsyncStorage.getItem(USER_EMAIL);
        var pin = await AsyncStorage.getItem(USER_PIN);
        if (email != null && pin != null) {
            dispatch(syncAsync(email, pin))
        }
    }
})

export default connect(null, mapDispatchToProps)(CounterApp);

