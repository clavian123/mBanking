import React from 'react'

import {
    View,
    Text,
    FlatList,
    Modal,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native'

import {
    connect
} from 'react-redux'

import styles from './NewHome2Style'

import iconLogout from "../../../../assets/icon-logout.png";
import iconBankAccount from "../../../../assets/icon-bank-account.png";
import iconStatistic from "../../../../assets/icon-statistic.png"

import {
    linkUnlinkAccount, 
    getUserName
} from '../../../newFunction/homeFunction'

import {
    getBillPaymentMerchants,
    setMerchantCode
} from '../../../newFunction/paymentFunction'

import {
    logoutEasyPin,
} from '../../../newFunction/loginFunction'

import {
    easyPinLogin
} from '../../../newFunction/loginAction'

import Loading from '../../../Loading'

import MerchantItem from '../../../component/newComponents/MerchantItem/MerchantItemIndex';

class NewHome2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            merchants: []
        }
    }

    async componentDidMount() {
        const { deviceId } = this.props;
        this.props.dispatch(easyPinLogin(false))
        this.props.dispatch(linkUnlinkAccount(deviceId))
        this.setState({ merchants: await this.props.dispatch(getBillPaymentMerchants()) })
        this.setState({ name: await this.props.dispatch(getUserName(deviceId)) })
    }

    componentWillUnmount() {
        this.setState = (name, callback) => {
            return;
        }
    }

    handleBankAccount = () => {
        const { navigation } = this.props
        navigation.navigate('BankAccount')
    }

    handleLogoutEasyPin = () => {
        this.props.dispatch(logoutEasyPin());
    };    

    render() {
        const { loading, isEasyPinLogin } = this.props

        return (
            <ScrollView style={styles.container}>

                {
                    loading ?
                    <Modal transparent={true}>
                        <Loading transparent={true}/>
                    </Modal>
                    : null
                }

                <View style={styles.header}>
                    <View style={styles.headerTitle}>
                        <Text style={styles.headerTitleText}>{this.state.name.toUpperCase()}</Text>
                        { isEasyPinLogin ? 
                            <TouchableOpacity onPress={() => {this.handleLogoutEasyPin()}} style={styles.headerTitleButton}>
                                <Image source={iconLogout} style={styles.headerTitleButtonImage}/>
                            </TouchableOpacity>
                            :
                            null
                        }
                    </View>
                    <View style={styles.headerCard}>
                        <TouchableOpacity onPress={() => {this.handleBankAccount()}} style={styles.bankAccountContainer}>
                            <View>
                                <Image style={styles.bankAccountIcon} source={iconBankAccount}/>
                            </View>
                            <Text style={styles.bankAccountText}>Check Your Bank Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.paymentContainer}>
                    <Text style={styles.paymentTitleText}>Pay/Top Up</Text>
                    <FlatList 
                        style={{alignSelf: 'center', marginTop: 10}}
                        data={this.state.merchants}
                        keyExtractor={item => item.code}
                        horizontal={true}
                        renderItem={({item}) => (
                            <MerchantItem navigation={this.props.navigation} name={item.name} code={item.code} /> 
                        )}
                    />
                </View>
                <TouchableOpacity style={styles.bankingSummaryButton}>
                  <View style={styles.bankingSummaryButtonSub}>
                    <Image
                      source={iconStatistic}
                      style={styles.bankingSummaryButtonImage}
                    />
                    <View style={styles.bankingSummaryButtonSub2}>
                      <Text style={styles.bankingSummaryButtonTitleText}>Banking Summary</Text>
                      <Text style={styles.bankingSummaryButtonDetailText}>Keep track of your financial activities</Text>
                    </View>
                  </View>
                </TouchableOpacity>
            </ScrollView>
        )

    }

}

const mapStateToProps = state => ({
    loading: state.loading.load,
    isLogin: state.newLogin.isLogin,
    isEasyPinLogin: state.newLogin.isEasyPinLogin,
    deviceId: state.newLogin.deviceId
})

export default connect(mapStateToProps)(NewHome2);