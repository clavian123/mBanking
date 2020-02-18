import AsyncStorage from '@react-native-community/async-storage';

export const USER_EMAIL = 'USER_EMAIL';
export const USER_PIN = 'USER_PIN';

export const onSignIn = async (email, pin) => {
    try {
        await AsyncStorage.setItem(USER_EMAIL, email);
        await AsyncStorage.setItem(USER_PIN, pin);
    } catch (e) {

    }
}

export const onSignOut = async () => {
    try {
        await AsyncStorage.removeItem(USER_EMAIL);
        await AsyncStorage.removeItem(USER_PIN);
    } catch (e) {

    }
}