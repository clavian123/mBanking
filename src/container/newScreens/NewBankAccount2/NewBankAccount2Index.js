import React from 'react'

import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native'

import styles from './NewBankAccount2Style'

import {
    connect
} from 'react-redux'

import iconBankAccount from "../../../../assets/icon-bank-account.png"
import iconArrowDown from "../../../../assets/icon-arrow-down.png"

import {
    getAccountList
} from '../../../newFunction/homeFunction'

import {
    formatCurrency
} from '../../../utils/index'

import AccountTabItem from '../../../component/newComponents/AccountTabItem/AccountTabItemIndex'
import AccountItem from '../../../component/newComponents/AccountItem/AccountItemIndex'

const tabItem = [
    {
        name: "Account"
    }
]

class NewBankAccount2 extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            summaryDetail: false,
            selectedTab: 'Account',
            accounts: [{
                account_number: "1000000000",
                balance: 100000000,
                account_name: "Jun Chandra"
            }   
            ],
            statements: []
        }
    }

    async componentDidMount() {
        const { deviceId } = this.props
        this.setState({ accounts: await this.props.dispatch(getAccountList(deviceId)) })
    }

    componentWillUnmount() {
        this.setState = (accounts, callback) => {
            return;
        }
    }

    getSavingsSum = () => {
        let sum = 0
        this.state.accounts.map(item => {
            sum = sum + item.balance
        })
        return sum
    }

    handleDetail = () => {
        if(this.state.summaryDetail) {
            this.setState({ summaryDetail: false })
        } else {
            this.setState({ summaryDetail: true })
        }
    }

    setSelectedTab = (item) => {
        this.setState({ selectedTab: item })
    }
    
    render(){
        return(
            <ScrollView style={styles.container}>
                <View style={this.state.summaryDetail ? { ...styles.headerContainer, height: 160 } : styles.headerContainer}>

                    <View style={styles.headerTitleContainer}>
                        <View style={styles.bankAccountIconContainer}>
                            <Image source={iconBankAccount} style={styles.bankAccountIcon}/>
                        </View>

                        <View style={styles.headerTitleTextContainer}>
                            <Text style={styles.headerTitleText}>Summary Portofolio</Text>
                            <TouchableOpacity style={styles.headerButton} onPress={() => {this.handleDetail()}}>
                            <Text style={styles.headerButtonText}>{this.state.summaryDetail ? "Hide Detail" : "Show Detail"}</Text>
                                <Image source={iconArrowDown} style={this.state.summaryDetail ? {...styles.arrowIcon, transform: [{ rotate: '180deg' }]} : styles.arrowIcon}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {
                        this.state.summaryDetail ? 
                        <View style={styles.detailContainer}>
                            <View style={styles.underline} />
                            <View style={styles.savingsDetail}>
                                <Text style={styles.savingsText}>Savings </Text>
                                <Text style={styles.savingsSumText}>{formatCurrency(this.getSavingsSum())}</Text>
                            </View>
                        </View>
                        :
                        null
                    }
                </View>

                <View style={{alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                    <FlatList 
                        style={{alignSelf: 'center'}}
                        data={tabItem}
                        keyExtractor={item => item.name}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item}) => (
                            <AccountTabItem setSelectedTab={this.setSelectedTab} selectedTab={this.state.selectedTab} name={item.name}/>
                        )}
                    />
                </View>

                {
                    this.state.selectedTab == "Account" 
                    ?
                    <AccountItem navigation={this.props.navigation} accounts={this.state.accounts} />
                    :
                    null
                }

            </ScrollView>
        )
    }

}

const mapStateToProps = state => ({
    deviceId: state.newLogin.deviceId
})

export default connect(mapStateToProps)(NewBankAccount2)