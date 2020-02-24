import AsyncStorage from '@react-native-community/async-storage';

export const CLIENT_ACC_NUMBER = 'CLIENT_ACC_NUMBER';
export const CLIENT_PIN = 'CLIENT_PIN';

export const syncLoginToStorage = async (accNumber, pin) => {
    try {
        await AsyncStorage.setItem(CLIENT_ACC_NUMBER, accNumber);
        await AsyncStorage.setItem(CLIENT_PIN, pin);
    } catch (e) {

    }
}

export const syncLogoutToStorage = async () => {
    try {
        await AsyncStorage.removeItem(CLIENT_ACC_NUMBER);
        await AsyncStorage.removeItem(CLIENT_PIN);
    } catch (e) {

    }
}