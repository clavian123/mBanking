import AsyncStorage from '@react-native-community/async-storage';

export const DEVICE_ID = 'DEVICE_ID';

export const syncLoginToStorage = async (deviceId) => {
    try {
        await AsyncStorage.setItem(DEVICE_ID, deviceId);
    } catch (e) {

    }
}

export const syncLogoutToStorage = async () => {
    try {
        await AsyncStorage.removeItem(DEVICE_ID);
    } catch (e) {

    }
}