import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    LayoutAnimation,
    UIManager,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements'

import { numberWithCommas } from '../generalFunction'
import { getStatements } from '../action/home/homeFunction';
import StatementList from '../component/StatementList';
import Loading from '../Loading';

class AccountCard extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            navigationFocus: '',
            isBalanceVisible: true,
            isStatementVisible: false,
            statements: [],
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.getStatements()
    }

    handleBalanceVisible = () => {
        this.setState({
            isBalanceVisible: !this.state.isBalanceVisible
        })
    }

    handleStatementClicked = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.state.statements.reverse().slice(0, 5)
        this.setState({
            isStatementVisible: !this.state.isStatementVisible,
        })
    }

    handleStatementListClicked = () => {
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        console.log(this.props.balance);

        this.props.navigation.navigate('AccountStatementList', {
            accNumber: this.props.accNumber,
            balance: this.props.balance,
        })
    }

    getStatements = () => {
        var statements = this.props.statements ? this.props.statements.filter((item) => item.accountNumber == this.props.accNumber) : this.state.statements
        if (statements.length != 0) {
            statements[0].statements.forEach(item => {
                this.setState(previous => ({
                    statements: [...previous.statements, item]
                }))
            })
        }
    }

    render() {
        var statements = this.state.statements
        const { loading } = this.props

        if (loading) {
            return <Loading />
        }

        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.headerText}>Tabunganku</Text>
                        {
                            this.props.home ?
                                <Icon
                                    name={this.state.isBalanceVisible ? "eye" : "eye-slash"}
                                    type="font-awesome"
                                    iconStyle={styles.headerIcon}
                                    onPress={this.handleBalanceVisible}
                                    underlayColor="#d63447">
                                </Icon>
                                :
                                null
                        }

                    </View>
                    <Text style={styles.balanceText}>IDR {this.state.isBalanceVisible ? this.props.balance ? numberWithCommas(this.props.balance) : "--" : "--"}</Text>
                    <View style={styles.accNumberContainer}>
                        <Text style={styles.accNumberTitle}>Account Number: </Text>
                        <Text style={styles.accNumberValue}>{this.props.accNumber}</Text>
                    </View>
                    {
                        this.props.home ?
                            <Icon
                                name="arrow-right"
                                type="simple-line-icon"
                                iconStyle={styles.statementIcon}
                                underlayColor="#d63447"
                                onPress={this.handleStatementListClicked} >
                            </Icon>
                            :
                            null
                    }
                </View>

                {/* STATEMENT LIST */}

                {
                    this.props.home ?
                        <>
                            <Text style={styles.statementHeader}> {this.state.isStatementVisible ? "Here are your last transactions" : "Tap to see last transactions"}</Text>

                            <View style={{
                                ...styles.statementContainer,
                                height: this.state.isStatementVisible ? statements.length != 0 ? null : null : 0,
                            }}>
                                <StatementList
                                    statements={statements}
                                    accNumber={this.props.accNumber}
                                    key={statements.posting_date}
                                    home={this.props.home ? true : false}>
                                </StatementList>
                            </View>

                            <TouchableOpacity style={styles.dropButton} onPress={this.handleStatementClicked}>
                                <Icon name={this.state.isStatementVisible ? "arrow-up" : "arrow-down"} type="simple-line-icon" iconStyle={styles.dropIcon}></Icon>
                            </TouchableOpacity>
                        </>
                        :
                        null
                }


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        alignItems: "center",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    card: {
        backgroundColor: '#d63447',
        width: '80%',
        height: 180,
        borderRadius: 15,
        elevation: 5,
        marginTop: 20,
    },
    cardHeader: {
        flexDirection: 'row',
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
        // flexDirection: 'row',
        alignSelf: 'flex-end',
        fontSize: 18,
        marginHorizontal: 10,
        color: 'white',
        // backgroundColor: '#d63447'
        // underlayColor: '#d63447'
    },

    statementHeader: {
        width: '100%',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        marginVertical: 10
    },

    statementContainer: {
        width: '90%',
        // flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'white',
    },

    statementListHeader: {
        height: '10%',
        width: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        fontSize: 15
    },

    dropIcon: {
        fontSize: 20,
        color: '#c10000'
    },

    dropButton: {
        width: 300,
        height: 30,
        justifyContent: 'center',
        marginVertical: 0,
        alignSelf: 'center',
        backgroundColor: 'white',
        marginBottom: 10
    },


})

const mapStateToProps = state => ({
    statements: state.home.statements,
    customerId: state.login.customerId,
    loading: state.home.loading,
})

export default connect(mapStateToProps)(AccountCard);