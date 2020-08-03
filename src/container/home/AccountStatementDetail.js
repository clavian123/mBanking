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

    componentDidMount = () => {
        console.log(this.props.route.params.statement[0]);
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
                        <Text style={styles.title}>Transaction ID</Text>
                        <Text style={styles.value}> {statement.transaction_reference_number} </Text>
                    </View>
                    <View style={styles.detailContainer}>
                        <Text style={styles.title}>Time</Text>
                        <Text style={styles.value}> {moment(statement.posting_date).format('DD MMMM YYYY - HH:mm')} </Text>
                    </View>
                    <View style={styles.detailContainer}>
                        <Text style={styles.title}>Amount</Text>
                        <Text style={styles.value}>{statement.amount < 0 ? "-" : null} {statement.currency} {numberWithCommas(statement.amount < 0 ? statement.amount*-1 : statement.amount*1)} </Text>
                    </View>
                    <View style={styles.detailContainer}>
                        <Text style={styles.title}>From</Text>
                        <Text style={styles.value}> {statement.account.accountNumber} - {statement.account.account_name} </Text>
                    </View>
                    <View style={styles.detailContainer}>
                        <Text style={styles.title}>Detail</Text>
                        <Text style={styles.value}> {statement.detail} </Text>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        alignSelf: "center",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: 'white',
        marginTop: 10,
        elevation: 5,
        borderRadius: 15
    },
    headerContainer: {
        height: '15%',
        width: '100%',
        justifyContent: 'center',
        padding: 20,
        alignSelf: 'center',
        backgroundColor: '#c10000',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    headerText:{
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
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
