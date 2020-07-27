import AsyncStorage from '@react-native-community/async-storage';

export const CLIENT_ACC_NUMBER = 'CLIENT_ACC_NUMBER';
export const EASY_PIN = 'EASY_PIN';
export const CLIENT_ACC_NAME = 'CLIENT_ACC_NAME';
export const NAME = 'NAME'
export const CUSTOMER_CIF_CODE = 'CUSTOMER_CIF_CODE'

export const syncLoginToStorage = async (name, cif_code, pin) => {
    try {
        // await AsyncStorage.setItem(CLIENT_ACC_NUMBER, accNumber);
        await AsyncStorage.setItem(EASY_PIN, pin);
        // await AsyncStorage.setItem(CLIENT_ACC_NAME, accName);
        await AsyncStorage.setItem(NAME, name);
        await AsyncStorage.setItem(CUSTOMER_CIF_CODE, cif_code)
    } catch (e) {

    }
}

export const syncLogoutToStorage = async () => {
    try {
        // await AsyncStorage.removeItem(CLIENT_ACC_NUMBER);
        await AsyncStorage.removeItem(EASY_PIN);
        // await AsyncStorage.removeItem(CLIENT_ACC_NAME);
        await AsyncStorage.removeItem(NAME);
        await AsyncStorage.removeItem(CUSTOMER_CIF_CODE);
    } catch (e) {

    }
}