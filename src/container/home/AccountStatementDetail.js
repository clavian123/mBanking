import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { SearchBar } from 'react-native-elements';

import StatementList from '../../component/StatementList'

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

    render() {

        const { search, statements } = this.state;

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

export default AccountStatementDetail;
