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
import { numberWithCommas } from '../../generalFunction';
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

    render() {
        var moment = require('moment');
        const { loading } = this.props;
        var statement = this.props.route.params.statement[0];

        if (loading) {
            return <Loading />;
        }
        else{
            return(
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}> {statement.transaction_type} </Text>
                    </View>
                    <View style={styles.detailContainer}>
                        <Text style={styles.title}> Transaction ID</Text>
                        <Text style={styles.value}> {statement.transaction_reference_number} </Text>
                    </View>
                    <View style={styles.detailContainer}>
                        <Text style={styles.title}> Time</Text>
                        <Text style={styles.value}> {moment(statement.posting_date).format('DD MMMM YYYY - HH:mm')} </Text>
                    </View>
                    <View style={styles.detailContainer}>
                        <Text style={styles.title}> Amount</Text>
                        <Text style={styles.value}>{statement.amount < 0 ? " -" : null} {statement.currency} {numberWithCommas(statement.amount < 0 ? statement.amount*-1 : statement.amount*1)} </Text>
                    </View>
                    <View style={styles.detailContainer}>
                        <Text style={styles.title}> From </Text>
                        <Text style={styles.value}> {(statement.amount < 0 ? statement.account.accountNumber + " - " + statement.account.account_name : statement.detail).toUpperCase()} </Text>
                        
                    </View>
                    <View style={styles.detailContainer}>
                        <Text style={styles.title}> To</Text>
                        <Text style={styles.value}> {(statement.amount < 0 ? statement.detail : statement.account.accountNumber + " - " + statement.account.account_name).toUpperCase()} </Text>
                    </View>
                    <View style={styles.detailContainer}>
                        <Text style={styles.title}> Description</Text>
                        <Text style={styles.value}> {statement.customer_note ? statement.customer_note : "-"} </Text>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },

    headerContainer: {
        height: '15%',
        width: '90%',
        justifyContent: 'center',
        alignSelf: 'center',
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },

    headerText:{
        fontWeight: 'bold',
        fontSize: 20,
    },

    detailContainer:{
        width: '100%',
        padding: 10,
        paddingLeft: 20,
    },

    title:{
        fontSize: 16
    },

    value:{
        fontSize: 18,
        fontWeight: 'bold'
    }

})

const mapStateToProps = state => ({
    statements: state.home.statements,
    loading: state.home.loading
});

export default connect(mapStateToProps)(AccountStatementDetail);
