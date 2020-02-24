import React from 'react';

import CounterApp from './src/CounterApp';
import store from './src/store/index';
import { Provider } from 'react-redux';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    render() {
        return (
            <Provider store={store}>
                <CounterApp />
            </Provider>
        );
    }
}

