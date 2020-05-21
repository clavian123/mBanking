import React from 'react';
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    LayoutAnimation,
    UIManager,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements'

import { numberWithCommas } from '../generalFunction'

class AccountCard extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            navigationFocus: '',
            isBalanceVisible: true
        };
    }

    componentDidMount() {
        this._isMounted = true;
        // this.props.dispatch(getBalance(this.props.accNumber));
    }

    handleBalanceVisible = () => {
        this.setState({
            isBalanceVisible: !this.state.isBalanceVisible
        })
    }

    render() {
        const { balance } = this.props

        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.headerText}>Tabunganku</Text>
                        <Icon name={this.state.isBalanceVisible ? "eye" : "eye-slash"} type="font-awesome" iconStyle={styles.headerIcon} onPress={this.handleBalanceVisible} underlayColor="#d63447"></Icon>
                    </View>
                    <Text style={styles.balanceText}>IDR {this.state.isBalanceVisible ? balance ? numberWithCommas(balance) : "--" : "--"}</Text>
                    <View style={styles.accNumberContainer}>
                        <Text style={styles.accNumberTitle}>Account Number: </Text>
                        <Text style={styles.accNumberValue}>{this.props.accNumber}</Text>
                    </View>
                    <Icon name="arrow-right" type="simple-line-icon" iconStyle={styles.statementIcon}></Icon>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignSelf: "center",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: 'white',
        // borderWidth: 1
    },
    card: {
        backgroundColor: '#d63447',
        width: '80%',
        height: '90%',
        borderRadius: 15,
        elevation: 5

    },
    cardHeader: {
        flexDirection: 'row',
        // backgroundColor: 'white',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginVertical: 10,
    },

    headerText: {
        color: 'white'
    },

    headerIcon: {
        color: 'white',
        
    },

    balanceText: {
        width: '90%',
        alignSelf: 'center',
        // backgroundColor: 'white',
        fontSize: 25,
        marginVertical: 10,
        color: 'white'
    },

    accNumberContainer: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center'
    },

    accNumberTitle: {
        color: 'white'
    },

    accNumberValue: {
        color: 'white',
        fontSize: 17
    },

    statementIcon: {
        flexDirection:'row',
        // backgroundColor: 'white',
        alignSelf: 'flex-end',
        fontSize: 18,
        marginHorizontal: 10,
        color: 'white'
    }
})

const mapStateToProps = state => ({
    pin: state.login.pin,
    accName: state.login.accName,
    balance: state.home.balance,
    // accNumber: state.login.accNumber
})

export default connect(mapStateToProps)(AccountCard);