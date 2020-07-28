import AsyncStorage from '@react-native-community/async-storage';

export const CLIENT_ACC_NUMBER = 'CLIENT_ACC_NUMBER';
export const CLIENT_PIN = 'CLIENT_PIN';
export const CLIENT_ACC_NAME = 'CLIENT_ACC_NAME';
export const NAME = 'NAME'
export const CUSTOMER_ID = 'CUSTOMER_ID'
export const EASY_PIN = 'EASY_PIN'

export const syncLoginToStorage = async (name, customerId, easyPin) => {
    try {
        // await AsyncStorage.setItem(CLIENT_ACC_NUMBER, accNumber);
        // await AsyncStorage.setItem(CLIENT_PIN, pin);
        // await AsyncStorage.setItem(CLIENT_ACC_NAME, accName);
        await AsyncStorage.setItem(NAME, name);
        await AsyncStorage.setItem(CUSTOMER_ID, customerId.toString());
        await AsyncStorage.setItem(EASY_PIN, easyPin.toString());
    } catch (e) {

    }
}

export const syncLogoutToStorage = async () => {
    try {
        // await AsyncStorage.removeItem(CLIENT_ACC_NUMBER);
        // await AsyncStorage.removeItem(CLIENT_PIN);
        // await AsyncStorage.removeItem(CLIENT_ACC_NAME);
        await AsyncStorage.removeItem(NAME);
        await AsyncStorage.removeItem(CUSTOMER_ID);
        await AsyncStorage.removeItem(EASY_PIN);
    } catch (e) {

    }
}