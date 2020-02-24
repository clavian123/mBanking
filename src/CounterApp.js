import React from 'react';
import { connect } from 'react-redux';

import RootNavigator from './Router';
import { handleSyncStorage } from './action/login/loginFunction'
import Loading from './Loading';

class CounterApp extends React.Component {

    componentDidMount = () => {
        this.props.dispatch(handleSyncStorage());
    }

    render() {
        const { loading } = this.props;

        if (loading) {
            return <Loading />
        }

        return (
            <RootNavigator />
        )
    }
}

const mapStateToProps = state => ({
    loading: state.login.loading
});

export default connect(mapStateToProps)(CounterApp);

