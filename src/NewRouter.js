import React from "react";
import {
  Image,
  StyleSheet,
  Text
} from "react-native";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import NewHome2Screen from './container/newScreens/NewHome2/NewHome2Index'
import NewBankAccount2Screen from './container/newScreens/NewBankAccount2/NewBankAccount2Index'
import StatementScreen from './container/newScreens/Statement/StatementIndex'
import StatementDetailScreen from './container/newScreens/StatementDetail/StatementDetailIndex'
import {
  NewHome as NewHomeScreen,
  NewBankAccount as NewBankAccountScreen,
  BankingSummary as BankingSummaryScreen,
  BankingSummary
} from "./container/newScreens";

import LoginScreen from './container/Login';

import InputPANScreen from './container/register/InputPAN';
import InputOTPScreen from './container/register/InputOTP';
import InputPINScreen from './container/register/InputPIN';
import CreateUserScreen from './container/register/CreateUser';
import ResetPasswordScreen from './container/register/ResetPassword';

import CreateEasyPinScreen from './container/easyPin/CreateEasyPin';
import ConfirmEasyPinScreen from './container/easyPin/ConfirmEasyPin';
import EasyPinLoginScreen from './container/easyPin/EasyPinLogin';
import ValidateEasyPinScreen from './container/easyPin/ValidateEasyPin';

// Transaction Input OTP
import InputTransactionOtpScreen from './container/register/InputOTP';

// Payment
import SetPhoneNumberScreen from './container/payment/SetPhoneNumber';
import PaymentSetAmountScreen from './container/payment/PaymentSetAmount';
import PaymentConfirmationScreen from './container/payment/PaymentConfirmation';
import PaymentDetailScreen from './container/payment/PaymentDetail';

// Transfer
import TransferScreen from './container/transfer/Transfer';
import SelectPayeeScreen from './container/transfer/SelectPayee';
import SelectBankScreen from './container/transfer/SelectBank';
import SetAmountScreen from './container/transfer/SetAmount';
import SelectSourceScreen from './container/transfer/SelectSourceAccount';
import SendMoneyMethodScreen from './container/transfer/SendMoneyMethod';
import ConfirmationScreen from './container/transfer/Confirmation';
import TransactionDetailScreen from './container/transfer/TransactionDetail';

import AccountScreen from "./container/account/Account";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const RouterContext = React.createContext({
  isEasyPinLogin: false
});

const MainBottomTab = ({ isEasyPinLogin }) => {
  const styles = StyleSheet.create({
    tabIcon: {
      width: 25,
      height: 25,
    },
    tabLabel: {
      fontSize: 12
    }
  });
  return (
    <Tab.Navigator
      initialRouteName="Home"
      lazy={false}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconAddress;

          if (route.name === "Home") {
            iconAddress = require("../assets/icon-home.png");
          } else if (route.name === "Transfer") {
            iconAddress = require("../assets/icon-transfer.png");
          } else if (route.name === "About") {
            iconAddress = require("../assets/icon-account.png");
          }

          return <Image
            source={iconAddress}
            style={{
              ...styles.tabIcon,
              tintColor: focused ? "#ff0066" : "black"
            }}
          />;
        },
        tabBarLabel: ({ focused }) => {
          return (
            <Text
              style={[styles.tabLabel,
              focused ? { color: "#ff0066" } : { color: "black" }]}
            >
              {route.name}
            </Text>
          );
        }
      })}
    >
      <Tab.Screen
        name="Home"
        component={NewHome2Screen}
      />
      <Tab.Screen
        name="Transfer"
        component={isEasyPinLogin ?
          TransferScreen :
          EasyPinLoginScreen
        }
      />
      <Tab.Screen
        name="About"
        component={isEasyPinLogin ?
          AccountScreen :
          EasyPinLoginScreen
        }
      />
    </Tab.Navigator>
  );
};

const MainBottomTabWrapper = ({ navigation, route }) => (
  <RouterContext.Consumer>
    {
      context => (
        <MainBottomTab isEasyPinLogin={context.isEasyPinLogin} />
      )
    }
  </RouterContext.Consumer>
);

class RootNavigator extends React.Component {
  render() {
    const { isLogin, isEasyPinLogin } = this.props;
    return (
      <RouterContext.Provider value={{ isEasyPinLogin }}>
        <NavigationContainer>
          <Stack.Navigator>
            {
              isLogin ? (
                <>
                  {/* main bottom tab menu */}
                  <Stack.Screen
                    component={MainBottomTabWrapper}
                    name="MainBottomTab"
                    options={{
                      headerShown: false
                    }}
                  />



                  {/* bank account  */}
                  <Stack.Screen
                    component={isEasyPinLogin ?
                      NewBankAccount2Screen :
                      EasyPinLoginScreen
                    }
                    name="BankAccount"
                    options={{
                      headerTitle: isEasyPinLogin ?
                        "Bank Account" : "",
                      headerStyle: {
                        backgroundColor: "#ff0066",
                        elevation: isEasyPinLogin ? 5 : 0
                      },
                      headerTintColor: "white"
                    }}
                  />
                  <Stack.Screen
                    component={StatementScreen}
                    name={"Statement"}
                    options={{
                      headerTitle: "Last transaction",
                      headerStyle: {
                        backgroundColor: "#ff0066",
                        elevation: 5
                      },
                      headerTintColor: "white"
                    }}
                  />
                  <Stack.Screen
                    component={StatementDetailScreen}
                    name={"StatementDetail"}
                    options={{
                      headerTitle: "Last transaction",
                      headerStyle: {
                        backgroundColor: 'white',
                        elevation: 5
                      }
                    }}
                  />



                  {/* banking summary     */}
                  <Stack.Screen
                    component={isEasyPinLogin ?
                      BankingSummaryScreen :
                      EasyPinLoginScreen
                    }
                    name="BankingSummary"
                    options={{
                      headerTitle: isEasyPinLogin ?
                        "Banking Summary" : "",
                      headerStyle: {
                        backgroundColor: "#ff0066",
                        elevation: isEasyPinLogin ? 5 : 0
                      },
                      headerTintColor: "white"
                    }}
                  />



                  {/* versatile screens   */}
                  <Stack.Screen
                    component={InputTransactionOtpScreen}
                    name="InputTransactionOtp"
                    options={{
                      headerTitle: "",
                      headerStyle: {
                        backgroundColor: "#21C275",
                        shadowColor: 'transparent',
                        elevation: 0,
                        borderBottomWidth: 0
                      },
                      headerTintColor: "white"
                    }}
                  />
                  <Stack.Screen
                    component={SelectSourceScreen}
                    name="SelectSource"
                    options={{
                      headerTitle: "Bill Pay"
                    }}
                  />
                  <Stack.Screen
                    options={{
                      headerShown: true,
                      title: '',
                      headerStyle: {
                        backgroundColor: '#ff0066',
                        elevation: 0,

                      },
                      headerTintColor: 'white'
                    }}
                    name="ValidateEasyPin"
                    component={ValidateEasyPinScreen} />



                  {/* payment screen */}
                  <Stack.Screen
                    component={isEasyPinLogin ? SetPhoneNumberScreen : EasyPinLoginScreen}
                    name="SetPhoneNumber"
                    options={{
                      headerTitle: isEasyPinLogin ? "Pay / Top Up" : "",
                      headerStyle: {
                        backgroundColor: isEasyPinLogin ?   "white" : "#ff0066",
                        elevation: isEasyPinLogin ? 5 : 0
                      },
                      headerTintColor: isEasyPinLogin ? "black" : 'white'
                    }}
                  />
                  <Stack.Screen
                    component={PaymentSetAmountScreen}
                    name="PaymentSetAmount"
                    options={{
                      headerTitle: "Pay / Top Up"
                    }}
                  />
                  <Stack.Screen
                    component={PaymentConfirmationScreen}
                    name="PaymentConfirmation"
                    options={{
                      headerTitle: "Confirmation"
                    }}
                  />
                  <Stack.Screen
                    component={PaymentDetailScreen}
                    name="PaymentDetail"
                    options={{
                      headerShown: false
                    }}
                  />



                  {/* transfer screen */}
                  <Stack.Screen
                    name="SelectPayee"
                    component={SelectPayeeScreen}
                    options={{
                      title: 'Select Payee'
                    }}
                  />
                  <Stack.Screen
                    name="SelectBank"
                    component={SelectBankScreen}
                    options={{
                      title: 'Select Bank'
                    }}
                  />
                  <Stack.Screen
                    name="SetAmount"
                    component={SetAmountScreen}
                    options={{
                      title: 'Transfer'
                    }}
                  />
                  <Stack.Screen
                    name="SendMoneyMethod"
                    component={SendMoneyMethodScreen}
                    options={{
                      title: 'Transfer'
                    }}
                  />
                  <Stack.Screen
                    name="Confirmation"
                    component={ConfirmationScreen}
                    options={{
                      title: 'Confirmation'
                    }}
                  />
                  <Stack.Screen
                    name="TransactionDetail"
                    component={TransactionDetailScreen}
                    options={{
                      headerShown: false
                    }}
                  />
                </>
              )
                :
                (
                  <>
                    <Stack.Screen
                      name="Login"
                      component={LoginScreen}
                      options={{ headerShown: false }}
                    />
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
                    />
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
                    />
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
                    />
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
                    />
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
                    />
                    <Stack.Screen
                      name="CreateEasyPin"
                      component={CreateEasyPinScreen}
                      options={{
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="ConfirmEasyPin"
                      component={ConfirmEasyPinScreen}
                      options={{
                        headerShown: false,
                      }}
                    />
                  </>
                )
            }
          </Stack.Navigator>
        </NavigationContainer >
      </RouterContext.Provider>
    )
  }
}

const mapStateToProps = state => ({
  isLogin: state.newLogin.isLogin,
  isEasyPinLogin: state.newLogin.isEasyPinLogin,
  deviceId: state.newLogin.deviceId
})

export default connect(
  mapStateToProps
)(RootNavigator);