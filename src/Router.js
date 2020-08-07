import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './container/Login';

import InputPANScreen from './container/register/InputPAN';
import InputOTPScreen from './container/register/InputOTP';
import InputPINScreen from './container/register/InputPIN';
import CreateUserScreen from './container/register/CreateUser';
import ResetPasswordScreen from './container/register/ResetPassword';

import CreateEasyPinScreen from './container/easyPin/CreateEasyPin';
import ConfirmEasyPinScreen from './container/easyPin/ConfirmEasyPin';
import EasyPinLoginScreen from './container/easyPin/EasyPinLogin';

import HomeScreen from './container/home/Home';
import BalanceInquiryScreen from './container/home/BalanceInquiry';
import AccountStatementPickDateScreen from './container/home/AccountStatementPickDate';
import AccountStatementDetail from './container/home/AccountStatementDetail';
import AccountStatementList from './container/home/AccountStatementList';

import TransferScreen from './container/transfer/Transfer';
import SelectPayeeScreen from './container/transfer/SelectPayee';
import SelectBankScreen from './container/transfer/SelectBank';
import SetAmountScreen from './container/transfer/SetAmount';
import SelectSourceScreen from './container/transfer/SelectSourceAccount';
import SendMoneyMethodScreen from './container/transfer/SendMoneyMethod';
import ConfirmationScreen from './container/transfer/Confirmation';

import PaymentScreen from './container/payment/Payment';
import CreditCardScreen from './container/payment/CreditCard';
import InsuranceScreen from './container/payment/Insurance';
import PhoneBalanceScreen from './container/payment/PhoneBalance'

import AccountScreen from './container/account/Account';
import ChangePINScreen from './container/account/ChangePIN';
import AboutUsScreen from './container/account/AboutUs';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function RegisterStackScreen() {
    return(
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'white',
                },
                headerTintColor: '#C10000'
            }}
        >
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{headerShown:false}}
            >               
            </Stack.Screen>
            <Stack.Screen
                name="InputPAN"
                component={InputPANScreen}
                options={{
                    title: "",
                    headerStyle: {
                        backgroundColor: 'white',
                        shadowColor: 'transparent',
                        elevation: 0,
                        borderBottomWidth: 0  
                    },
                    headerTintColor: '#C10000'
                }}
            >
            </Stack.Screen>
            <Stack.Screen
                name="InputOTP"
                component={InputOTPScreen}
                options={{
                    title: "",
                    headerStyle: {
                        backgroundColor: "#21C275",
                        shadowColor: 'transparent',
                        elevation: 0,
                        borderBottomWidth: 0    
                    },
                    headerTintColor: 'white'
                }}
            >
            </Stack.Screen>
            <Stack.Screen
                name="InputPIN"
                component={InputPINScreen}
                options={{
                    title: "",
                    headerStyle: {
                        backgroundColor: "white",
                        shadowColor: 'transparent',
                        elevation: 0,
                        borderBottomWidth: 0    
                    },
                    headerTintColor: '#C10000'
                }}
            >
            </Stack.Screen>
            <Stack.Screen
                name="CreateUser"
                component={CreateUserScreen}
                options={{
                    title: "",
                    headerStyle: {
                        backgroundColor: "white",
                        shadowColor: 'transparent',
                        elevation: 0,
                        borderBottomWidth: 0  
                    },
                    headerTintColor: '#C10000'
                }}
            >
            </Stack.Screen>
            <Stack.Screen
                name="ResetPassword"
                component={ResetPasswordScreen}
                options={{
                    title: "",
                    headerStyle: {
                        backgroundColor: "white",
                        shadowColor: 'transparent',
                        elevation: 0,
                        borderBottomWidth: 0  
                    },
                    headerTintColor: '#C10000'
                }}
            >
            </Stack.Screen>
            <Stack.Screen
                name="CreateEasyPin"
                component={CreateEasyPinScreen}
                options={{
                    headerShown: false,
                }}
            >
            </Stack.Screen>
            <Stack.Screen
                name="ConfirmEasyPin"
                component={ConfirmEasyPinScreen}
                options={{
                    headerShown: false,
                }}
            >
            </Stack.Screen>
        </Stack.Navigator>
    );
}

function HomeStackScreen() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#c10000',
                    elevation: 0
                },
                headerTintColor: 'white'
            }}
        >
            {/* <Stack.Screen
                name="EasyPinLogin"
                component={EasyPinLoginScreen}
                options={{ headerShown: false }}
            >   
            </Stack.Screen> */}
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Home' }}
            >
            </Stack.Screen>
            <Stack.Screen
                name="BalanceInquiry"
                component={BalanceInquiryScreen}
                options={{ title: 'Balance Inquiry' }}
            >
            </Stack.Screen>
            <Stack.Screen
                name="AccountStatementPickDate"
                component={AccountStatementPickDateScreen}
                options={{ title: 'Pick Date' }}
            >
            </Stack.Screen>
            <Stack.Screen
                name="AccountStatementDetail"
                component={AccountStatementDetail}
                options={{ title: 'Transaction Detail' }}
            >
            </Stack.Screen>
            <Stack.Screen
                name="AccountStatementList"
                component={AccountStatementList}
                options={{ title: 'Last Transactions' }}
            >
            </Stack.Screen>
        </Stack.Navigator>
    );
}

function TransferStackScreen() {
    return (
        <Stack.Navigator
            initialRouteName="Transfer"
        >
            <Stack.Screen
                name="Transfer"
                component={TransferScreen}
                options={{
                    title: 'Transfer',
                    headerStyle: {
                        backgroundColor: '#c10000'
                    },
                    headerTintColor: '#fff',
                }}
            >
            </Stack.Screen>
            <Stack.Screen
                name="SelectPayee"
                component={SelectPayeeScreen}
                options={{
                    title: 'Select Payee',
                    headerStyle: {
                        backgroundColor: '#C10000'
                    },
                    headerTintColor: '#fff'
                }}
            >
            </Stack.Screen>
            <Stack.Screen
                name="SelectBank"
                component={SelectBankScreen}
                options={{
                    title: 'Select Bank',
                    headerStyle: {
                        backgroundColor: '#C10000'
                    },
                    headerTintColor: '#fff'
                }}
            >
            </Stack.Screen>
            <Stack.Screen
                name="SetAmount"
                component={SetAmountScreen}
                options={{
                    title: 'Transfer',
                    headerStyle: {
                        backgroundColor: '#C10000'
                    },
                    headerTintColor: '#fff'
                }}
            >
            </Stack.Screen>
            <Stack.Screen
                name="SelectSource"
                component={SelectSourceScreen}
                options={{
                    title: 'Transfer',
                    headerStyle: {
                        backgroundColor: '#C10000'
                    },
                    headerTintColor: '#fff'
                }}
            >
            </Stack.Screen>
            <Stack.Screen
                name="SendMoneyMethod"
                component={SendMoneyMethodScreen}
                options={{
                    title: 'Transfer',
                    headerStyle: {
                        backgroundColor: '#C10000'
                    },
                    headerTintColor: '#fff'
                }}
            >
            </Stack.Screen>
            <Stack.Screen
                name="Confirmation"
                component={ConfirmationScreen}
                options={{
                    title: 'Confirmation',
                    headerStyle: {
                        backgroundColor: '#C10000'
                    },
                    headerTintColor: '#fff'
                }}
            >
            </Stack.Screen>
        </Stack.Navigator>
    );
}

function PaymentStackScreen() {
    return (
        <Stack.Navigator
            initialRouteName="Payment"
        >
            <Stack.Screen
                name="Payment"
                component={PaymentScreen}
                options={{
                    title: 'Payment',
                    headerStyle: {
                        backgroundColor: '#c10000'
                    },
                    headerTintColor: '#fff'
                }}
            >
            </Stack.Screen>
            <Stack.Screen
                name="CreditCard"
                component={CreditCardScreen}
                options={{
                    title: 'Credit Card',
                    headerStyle: {
                        backgroundColor: '#c10000'
                    },
                    headerTintColor: '#fff'
                }}
            >
            </Stack.Screen>
            <Stack.Screen
                name="Insurance"
                component={InsuranceScreen}
                options={{
                    title: 'Insurance',
                    headerStyle: {
                        backgroundColor: '#c10000'
                    },
                    headerTintColor: '#fff'
                }}
            >
            </Stack.Screen>
            <Stack.Screen
                name="PhoneBalance"
                component={PhoneBalanceScreen}
                options={{
                    title: 'Phone Balance',
                    headerStyle: {
                        backgroundColor: '#c10000'
                    },
                    headerTintColor: '#fff'
                }}
            >
            </Stack.Screen>
        </Stack.Navigator>
    );
}

function AccountStackScreen() {
    return (
        <Stack.Navigator
            initialRouteName="Account"
        >
            <Stack.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    title: 'Account',
                    headerStyle: {
                        backgroundColor: '#c10000'
                    },
                    headerTintColor: '#fff'
                }}
            >
            </Stack.Screen>
            <Stack.Screen
                name="ChangePIN"
                component={ChangePINScreen}
                options={{
                    title: 'Change PIN',
                    headerStyle: {
                        backgroundColor: '#c10000'
                    },
                    headerTintColor: '#fff'
                }}
            >
            </Stack.Screen>
            <Stack.Screen
                name="AboutUs"
                component={AboutUsScreen}
                options={{
                    title: 'About Us',
                    headerStyle: {
                        backgroundColor: '#c10000'
                    },
                    headerTintColor: '#fff'
                }}
            >
            </Stack.Screen>
        </Stack.Navigator >
    );
}

function HomeTabScreen() {
    const styles = StyleSheet.create({
        imageIcon: {
            width: 29,
            height: 29,
        },
        label: {
            fontSize: 12
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
                        style={{ ...styles.imageIcon, tintColor: focused ? 'white' : '#888888' }}
                    />;
                },
                tabBarLabel: ({ focused }) => {
                    return <Text style={[styles.label, focused ? {color: 'white'} : {color: '#888888'}]}>{route.name}</Text>
                },
            })}
            tabBarOptions={{
                activeTintColor: 'white',
                activeBackgroundColor: '#c10000',
                inactiveTintColor: 'white',
                keyboardHidesTabBar: true
            }}
        >
            <Tab.Screen name="Home" component={HomeStackScreen} options={{ title: 'Home' }} />
            <Tab.Screen name="Transfer" component={TransferStackScreen} options={{ title: 'Transfer' }} />
            <Tab.Screen name="Payment" component={PaymentStackScreen} options={{ title: 'Payment' }} />
            <Tab.Screen name="Account" component={AccountStackScreen} options={{ title: 'Account' }} />
        </Tab.Navigator>
    )
}

class RootNavigator extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { isLogin, isEasyPinLogin } = this.props;
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    {isLogin ? (
                        <>
                            <Stack.Screen options={{ headerShown: false }} name="EasyPinLogin" component={EasyPinLoginScreen} />
                            <Stack.Screen options={{ headerShown: false }} name="HomeTab" component={HomeTabScreen} /> 
                        </>
                    ) 
                    : 
                    (
                        <>
                            <Stack.Screen options={{ headerShown: false }} name="Login" component={RegisterStackScreen} />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

const mapStateToProps = state => ({
    isLogin: state.login.isLogin,
    isEasyPinLogin: state.login.isEasyPinLogin
})

export default connect(mapStateToProps)(RootNavigator);

