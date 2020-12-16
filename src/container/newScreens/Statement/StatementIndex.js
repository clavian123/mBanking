import React from 'react'

import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    Modal
} from 'react-native'

import moment from "moment"

import styles from './StatementStyle'

import { connect } from 'react-redux'

import {
    numberWithDot
} from '../../../generalFunction'

import {
    formatCurrency
} from '../../../utils/index'

import {
    getAccountStatementsFilterMonth
} from '../../../newFunction/homeFunction'

import {
    refreshEasyPinLogin
} from '../../../newFunction/loginFunction'

import iconNext from "../../../../assets/icon-next.png"
import iconFilter from "../../../../assets/icon-filter.png"

class Statement extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            statements: [],
            buttonTitle: 'Last Month',
            filterModalVisible: false,
            filterItems: [
                {
                    name: "Last Month",
                    value: 30
                },
                {
                    name: "Last 2 Months",
                    value: 60
                },
                {
                    name: "Last 3 Months",
                    value: 90
                }
            ],
            month: 30
        }
    }

    async componentDidMount() {
        const { deviceId } = this.props
        const { account } = this.props.route.params
        this.props.dispatch(refreshEasyPinLogin(deviceId))
        this.setState({ statements: await this.props.dispatch(getAccountStatementsFilterMonth(account.account_number, this.state.month)) })
    }

    componentWillUnmount() {
        this.setState = (statements, callback) => {
            return;
        }
    }

    statementItem = (item) => {
        return(
            <TouchableOpacity onPress={() => {this.handleStatementPressed(item)}} style={styles.statementItemContainer}>
                <View style={styles.transactionTypeContainer}>
                    <Text style={styles.transactionTypeText}>{item.transaction_type}</Text>
                    <Text style={styles.transactionDateText}>{moment(item.posting_date).format('DD MMM YYYY')}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={item.amount < 0 ? {...styles.amountText, color: "#B22222"} : {...styles.amountText, color: "#009900"}}>{formatCurrency(item.amount)}</Text>
                    <Image source={iconNext} style={styles.iconNext}/>
                </View>
            </TouchableOpacity>
        )    
    }

    handleStatementPressed = (item) => {
        const { deviceId } = this.props
        const { navigation } = this.props
        this.props.dispatch(refreshEasyPinLogin(deviceId))
        navigation.navigate('StatementDetail', {
            statement: item
        })
    }

    displayFilterModal = (show) => {
        const { deviceId } = this.props
        this.props.dispatch(refreshEasyPinLogin(deviceId))
        this.setState({ filterModalVisible: show })
    }

    async handleFilter(item) {
        const { deviceId } = this.props
        this.props.dispatch(refreshEasyPinLogin(deviceId))
        this.displayFilterModal(false)
        this.setState({ buttonTitle: item.name })
        this.setState({ month: item.value })
        const { account } = this.props.route.params
        this.setState({ statements: await this.props.dispatch(getAccountStatementsFilterMonth(account.account_number, item.value)) })
    }

    filterItem = (item) => {
        return(
            <TouchableOpacity style={item.value == 90 ? {...styles.filterItemContainer, borderBottomWidth: 0} : styles.filterItemContainer} onPress={() => {this.handleFilter(item)}}>
                <Text style={styles.filterNameText}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const { account } = this.props.route.params

        return ( 
            <View style={styles.container}>
                <Modal
                    style={{justifyContent: 'center', margin: 0, alignItems: 'center'}}
                    animationType={"fade"}
                    visible={this.state.filterModalVisible}
                    transparent={true}
                    onRequestClose={() => {
                        console.log('close modal')
                    }}>
                        <TouchableOpacity onPress={() => {this.displayFilterModal(false)}} style={styles.modalMajorContainer}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalItemContainer}>
                                <Text style={styles.filterItemTitleText}>Select period</Text>
                                <FlatList 
                                    data={this.state.filterItems}
                                    keyExtractor={item => item.name}
                                    renderItem = {({item}) => (
                                        this.filterItem(item)
                                    )}
                                />
                                <TouchableOpacity onPress={() => this.displayFilterModal(false)} style={styles.cancelFilterContainer}>
                                    <Text style={styles.cancelText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        </TouchableOpacity>
                </Modal>
                <View style={styles.cardContainer}>
                    <View style={styles.card}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Simas Gold</Text>
                        </View>
                            <View>
                                <View style={styles.balanceContainer}>
                                    <Text style={styles.balanceText}>IDR {numberWithDot(parseFloat(account.balance))}</Text>
                                </View>
                                <View style={styles.footer}>
                                    <Text style={styles.footerTitleText}>Account Number</Text>
                                    <Text style={styles.footerDescriptionText}>{account.account_number}</Text>
                                </View>
                            </View>
                    </View>
                </View>
                <View style={styles.statementContainer}>
                    <View style={styles.statementTitle}>
                        <Text style={styles.statementTitleText}>Transaction History</Text>
                    </View>
                    <FlatList 
                        extraData={this.state.statements}
                        data={this.state.statements}
                        keyExtractor={item => item.transaction_reference_number}
                        showsVerticalScrollIndicator={false}
                        renderItem = {({item}) => (
                            this.statementItem(item)
                        )}
                        ListEmptyComponent = {
                            <Text style={{ marginVertical: 30, textAlign: 'center', color: '#2F4F4F', fontSize: 15 }}>- Nothing to Show -</Text>
                        }
                    />
                </View>
                <TouchableOpacity onPress={() => {this.displayFilterModal(true)}} style={styles.filterContainer}>
                    <Text style={styles.filterText}>{this.state.buttonTitle}</Text>
                    <Image style={styles.iconFilter} source={iconFilter}/>
                </TouchableOpacity>
            </View>
        )
    }

}

const mapStateToProps = state => ({
    deviceId: state.newLogin.deviceId
})

export default connect(mapStateToProps)(Statement)