import React from 'react';
import {
    StyleSheet,
    Image,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './container/Login';
import RegisterScreen from './container/Register';

import HomeScreen from './container/home/Home';
import BalanceInquiryScreen from './container/home/BalanceInquiry';
import AccountStatementPickDateScreen from './container/home/AccountStatementPickDate';
import AccountStatementDetail from './container/home/AccountStatementDetail';

import TransferScreen from './container/transfer/Transfer';
import RegisterDestinationAccountScreen from './container/transfer/RegisterDestinationAccount';
import TransferToAnotherAccountScreen from './container/transfer/TransferToAnotherAccount';
import ChooseDestinationAccountScreen from './container/transfer/ChooseDestinationAccount';

import PaymentScreen from './container/payment/Payment';
import CreditCardScreen from './container/payment/CreditCard';
import InsuranceScreen from './container/payment/Insurance';
import PhoneBalanceScreen from './container/payment/PhoneBalance'

import AccountScreen from './container/account/Account';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStackScreen() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
        >
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }}></Stack.Screen>
            <Stack.Screen name="BalanceInquiry" component={BalanceInquiryScreen} options={{ title: 'Balance Inquiry' }}></Stack.Screen>
            <Stack.Screen name="AccountStatementPickDate" component={AccountStatementPickDateScreen} options={{ title: 'Pick Date' }}></Stack.Screen>
            <Stack.Screen name="AccountStatementDetail" component={AccountStatementDetail} options={{ headerShown: false }}></Stack.Screen>
        </Stack.Navigator>
    );
}

function TransferStackScreen() {
    return (
        <Stack.Navigator
            initialRouteName="Transfer"
        >
            <Stack.Screen name="Transfer" component={TransferScreen} options={{ title: 'Transfer' }}></Stack.Screen>
            <Stack.Screen name="RegisterDestinationAccount" component={RegisterDestinationAccountScreen} options={{ title: 'Register Account' }}></Stack.Screen>
            <Stack.Screen name="TransferToAnotherAccount" component={TransferToAnotherAccountScreen} options={{ title: 'Transfer' }}></Stack.Screen>
            <Stack.Screen name="ChooseDestinationAccount" component={ChooseDestinationAccountScreen} options={{ headerShown: false }}></Stack.Screen>
        </Stack.Navigator>
    );
}

function PaymentStackScreen() {
    return (
        <Stack.Navigator
            initialRouteName="Payment"
        >
            <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: 'Payment' }}></Stack.Screen>
            <Stack.Screen name="CreditCard" component={CreditCardScreen} options={{ title: 'Credit Card' }}></Stack.Screen>
            <Stack.Screen name="Insurance" component={InsuranceScreen} options={{ title: 'Insurance' }}></Stack.Screen>
            <Stack.Screen name="PhoneBalance" component={PhoneBalanceScreen} options={{ title: 'Phone Balance' }}></Stack.Screen>
        </Stack.Navigator>
    );
}

function SignedIn() {
    const styles = StyleSheet.create({
        imageIcon: {
            width: 29,
            height: 29,
        }
    })
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconAddress;

                    if (route.name === 'Home') {
                        iconAddress = require('../assets/icon-home.png');
                    } else if (route.name === 'Transfer') {
                        iconAddress = require('../assets/icon-transfer.png');
                    } else if (route.name === 'Payment') {
                        iconAddress = require('../assets/icon-payment.png');
                    } else if (route.name === 'Account') {
                        iconAddress = require('../assets/icon-account.png');
                    }

                    return <Image
                        source={iconAddress}
                        style={styles.imageIcon}
                    />;
                },
                tabBarLabel: ({ focused }) => {
                    return focused ? <Text style={{ fontSize: 12 }}>{route.name}</Text> : null
                }
            })}
            tabBarOptions={{
                activeTintColor: 'blue',
                inactiveTintColor: 'black',
            }}
        >
            <Tab.Screen name="Home" component={HomeStackScreen} options={{ title: 'Home' }} />
            <Tab.Screen name="Transfer" component={TransferStackScreen} options={{ title: 'Transfer' }} />
            <Tab.Screen name="Payment" component={PaymentStackScreen} options={{ title: 'Payment' }} />
            <Tab.Screen name="Account" component={AccountScreen} options={{ title: 'Account' }} />
        </Tab.Navigator>
    )
}

class RootNavigator extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    {this.props.signedIn ? (
                        <>
                            <Stack.Screen options={{ headerShown: false }} name="SignedIn" component={SignedIn} />
                        </>
                    ) : (
                            <>
                                <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
                                <Stack.Screen name="Register" component={RegisterScreen} />
                            </>
                        )}
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

const mapStateToProps = state => ({
    signedIn: state.login.email !== '' && state.login.pin !== '' ? true : false
})

export default connect(mapStateToProps)(RootNavigator)

