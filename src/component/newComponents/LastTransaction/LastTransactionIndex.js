import React from 'react'

import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native'

import moment from "moment"

import styles from './LastTransactionStyle'

import { connect } from 'react-redux'

import {
    getLastTransactions
} from '../../../newFunction/homeFunction'

import { formatCurrency } from "../../../utils"
import iconTransactionIn from "../../../../assets/icon-transaction-in.png"
import iconTransactionOut from "../../../../assets/icon-transaction-out.png"

class LastTransaction extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            showLastTransaction: false,
            lastTransactions: []
        }
    }

    async componentDidMount() {
        this.setState({ lastTransactions: await this.props.dispatch(getLastTransactions(this.props.accountNumber)) })
    }

    componentWillUnmount() {
        this.setState = (lastTransactions, callback) => {
            return;
        }
    }

    setShowLastTransaction = () => {
        if(this.state.showLastTransaction) {
            this.setState({ showLastTransaction: false })
        } else {
            this.setState({ showLastTransaction: true })
        }
    }

    lastTransaction = (item) => {
        return(
            <View style={styles.transaction}>
                <Image
                    source={item.amount > 0 ? iconTransactionIn : iconTransactionOut}
                    style={{ ...styles.transactionImage, tintColor: item.amount > 0 ? "#009900" : "#ff0066" }}
                />
                <View style={styles.transactionSub1}>
                    <Text style={styles.transactionTextType}>
                    {item.transaction_type}
                    </Text>
                    <Text style={styles.transactionTextDate}>
                    {moment(item.posting_date).format('DD MMM YYYY')}
                    </Text>
                </View>
                <View style={styles.transactionSub2}>
                    <Text style={{ ...styles.transactionTextAmount, color: item.amount > 0 ? "#009900" : "#ff0066" }}>
                    {formatCurrency(item.amount)}
                    </Text>
                </View>
            </View>
        )
    }

    handleStatement = () => {
        const { navigation } = this.props
        navigation.navigate('Statement', {
            account: this.props.account
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.showLastTransaction 
                    ?
                    <View style={styles.showLastTransactionContainer}> 
                        <FlatList
                            style={{marginBottom: 20, width: "100%"}}
                            data={this.state.lastTransactions}
                            keyExtractor={item => item.transaction_reference_number}
                            renderItem={({item}) => (
                                this.lastTransaction(item)
                            )}
                        />
                        <TouchableOpacity onPress={() => {this.handleStatement()}} style={{marginBottom: 20}}>
                            <Text style={styles.buttonText}>See all transactions</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View>
                        <TouchableOpacity onPress={() => {this.setShowLastTransaction()}}>
                            <Text style={styles.buttonText}>Show last 4 transactions</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        )
    }

}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(LastTransaction)