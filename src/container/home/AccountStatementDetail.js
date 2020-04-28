import React from 'react';
import {
    StyleSheet,
    Text,
    View
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
        };
    }

    updateSearch = search => {
        this.setState({ search });
    }

    componentDidMount = () => {
        const { startDate, endDate } = this.props.route.params;
        const { accNumber } = this.props;
        var moment = require('moment');
        this.props.dispatch(getStatements(accNumber,startDate, endDate));
    }

    render() {

        const { search } = this.state;
        const { loading, statements } = this.props;

        if (loading) {
            return <Loading />;
        }


        if (statements && statements.length) {
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
        } else {
            return (
                <View style={styles.container}>
                    <Text>You don't have any statements.</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignSelf: "center",
        alignContent: "center",
        alignItems: "center",
    }
})

const mapStateToProps = state => ({
    accNumber: state.login.accNumber,
    statements: state.home.statements,
    loading: state.home.loading
});

export default connect(mapStateToProps)(AccountStatementDetail);
