import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';

import StatementList from '../../component/StatementList';
import { getStatements } from '../../action/home/homeFunction';
import Loading from '../../Loading';

class AccountStatementDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            statements:
                [
                    { key: '0', date: new Date(2020, 2, 1), type: 'DB', title: '9 SQUARE POOL', amount: '50000', note: 'Main Billiard' },
                    { key: '1', date: new Date(2020, 2, 2), type: 'CR', title: 'TOKOPEDIA', amount: '60000', note: 'Jual Baju' },
                    { key: '2', date: new Date(2020, 2, 3), type: 'CR', title: 'TOKOPEDIA', amount: '400000', note: 'Jual Sepatu Vans' }
                ]
        };
    }

    updateSearch = search => {
        this.setState({ search });
    }

    // componentDidMount = () => {
    //     const { startDate, endDate } = this.props.route.params;
    //     const { accNumber } = this.props;
    //     var moment = require('moment');
    //     this.props.dispatch(getStatements(accNumber, moment(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'))));
    // }

    render() {

        const { search, statements } = this.state;
        const { loading } = this.props;

        if (loading) {
            return <Loading />;
        }

        return (
            <View>
                <SearchBar
                    onChangeText={this.updateSearch}
                    value={search}
                    platform="android"
                    placeholder="Search statement"
                />
                <StatementList statements={statements} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    iconImage: {
        width: 35,
        height: 35,
    }
})

const mapStateToProps = state => ({
    accNumber: state.login.accNumber,
    statements: state.home.statements,
    loading: state.home.loading
});

export default connect(mapStateToProps)(AccountStatementDetail);
