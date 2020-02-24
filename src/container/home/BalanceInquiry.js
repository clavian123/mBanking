import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';

import Loading from '../../Loading';
import { getBalance } from '../../action/home/homeFunction'
import { numberWithCommas } from '../../generalFunction';

class BalanceInquiry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount = () => {
        const { accNumber } = this.props;
        this.props.dispatch(getBalance(accNumber));
    }

    render() {
        const { accNumber, loading, balance } = this.props;

        if (loading) {
            return <Loading />
        }

        return (
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <Text>Account Number</Text>
                    <Text style={styles.textInformation}>{accNumber}</Text>
                </View>
                <View style={styles.subContainer}>
                    <Text>Currency</Text>
                    <Text style={styles.textInformation}>IDR</Text>
                </View>
                <View style={styles.subContainer}>
                    <Text>Available Balance</Text>
                    <Text style={styles.textInformation}>{numberWithCommas(balance)}</Text>
                </View>
            </View>
        );
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
    },
    subContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    textInformation: {
        fontSize: 25,
        fontWeight: 'bold',
    }
});

const mapStateToProps = state => ({
    accNumber: state.login.accNumber,
    loading: state.home.loading,
    balance: state.home.balance
})

export default connect(mapStateToProps)(BalanceInquiry);