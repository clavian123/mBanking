import React from 'react'

import {
    Text,
    View,
    
} from 'react-native'

import moment from "moment"

import styles from './StatementDetailStyle'

import {
    formatCurrency
} from '../../../utils/index'

export default class StatementDetail extends React.Component {

    render() {
        const { statement } = this.props.route.params

        return(
            <View style={styles.container}>
                <View style={styles.transactionTypeContainer}>
                    <Text style={styles.transactionTypeText}>{statement.transaction_type}</Text>
                </View>
                <View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemTitleText}>Transaction ID</Text>
                        <Text style={styles.itemText}>{statement.transaction_reference_number}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemTitleText}>Time</Text>
                        <Text style={styles.itemText}>{moment(statement.posting_date).format('DD MMM YYYY')}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemTitleText}>Amount</Text>
                        <Text style={styles.itemText}>{formatCurrency(statement.amount)}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemTitleText}>From</Text>
                        <Text style={styles.itemText}>{statement.account_number} - {statement.account_name.toUpperCase()}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemTitleText}>To</Text>
                        <Text style={styles.itemText}>{statement.detail.toUpperCase()}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemTitleText}>Description</Text>
                        <Text style={styles.itemText}>{statement.customer_note}</Text>
                    </View>
                </View>
            </View>
        )
    }

}