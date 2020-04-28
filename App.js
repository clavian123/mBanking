import React from 'react';
import { Provider } from 'react-redux';

import CounterApp from './src/CounterApp';
import store from './src/store/index';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Provider store={store}>
                <CounterApp />
            </Provider>
        );
    }
}

