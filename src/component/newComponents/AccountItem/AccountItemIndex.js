import React from 'react'

import {
    ScrollView,
    View,
    Text,
    FlatList
} from 'react-native'

import { connect } from 'react-redux'

import styles from './AccountItemStyle'

import AccountCard from '../AccountCard/AccountCardIndex'
import LastTransaction from '../LastTransaction/LastTransactionIndex'

import {
    refreshEasyPinLogin
} from '../../../newFunction/loginFunction'

class AccountItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            activeAccount: this.props.accounts[0].account_number
        }
    }

    setActiveAccount(item) {
        this.setState({ activeAccount: item })
    }

    bullet = (item) => {
        return (
            <View style={this.state.activeAccount == item.account_number ? {...styles.bullet, opacity: 1} : styles.bullet} />
        )
    }

    onViewableItemsChanged = ({ viewableItems, changed }) => {
        this.setState({ activeAccount: viewableItems[0].item.account_number })
        this.statement.scrollToIndex({ index: viewableItems[0].index })
    }

    viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 50,
    };

    render() {
        return(
            <View style={{marginTop: 20, alignItems: 'center'}}>
                <FlatList 
                    onViewableItemsChanged={this.onViewableItemsChanged}
                    viewabilityConfig={this.viewabilityConfig}
                    data= {this.props.accounts}
                    horizontal= {true}
                    keyExtractor= {item => item.account_number}
                    showsHorizontalScrollIndicator= {false}
                    pagingEnabled
                    renderItem={({item}) => (
                        <AccountCard navigation={this.props.navigation} account={item} accountNumber={item.account_number} accountBalance={item.balance} />
                    )}
                />
                <FlatList
                    style={{marginTop: 10}}
                    horizontal= {true}
                    data={this.props.accounts}
                    keyExtractor={item => item.account_number}
                    showsHorizontalScrollIndicator= {false}
                    scrollEnabled={false}
                    renderItem={({item}) => (
                        this.bullet(item)
                    )}
                />
                <FlatList
                    ref = {ref => (this.statement = ref)}
                    style={{marginTop: 20}}
                    horizontal 
                    pagingEnabled
                    data={this.props.accounts}
                    keyExtractor={item => item.account_number}
                    showsHorizontalScrollIndicator = {false}
                    scrollEnabled = {false}
                    renderItem={({item}) => (
                        <LastTransaction navigation={this.props.navigation} account={item} accountNumber={item.account_number}/>
                    )}
                />
            </View>
        )
    }

}

const mapStateToProps = state => ({
    deviceId: state.newLogin.deviceId
})

export default connect(mapStateToProps)(AccountItem)
