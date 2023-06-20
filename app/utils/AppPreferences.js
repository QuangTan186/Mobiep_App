import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import AppConfig from './AppConfig';

export default class AppPreferences {
  static saveAccessToken(token, secret = 'scshop') {
    AppConfig.ACCESS_TOKEN = token;
    AppConfig.TOKEN_SECRET = secret;
    const data = {token, secret};
    Keychain.setGenericPassword('access_token', JSON.stringify(data), {
      accessible: Keychain.ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY,
    });
    AsyncStorage.setItem('token_saved', 'true');
  }

  static async getAccessToken() {
    const tokenSaved = await AsyncStorage.getItem('token_saved');
    if (tokenSaved) {
      const data = await Keychain.getGenericPassword();
      if (data) {
        return JSON.parse(data.password);
      }
      return null;
    }
    return null;
  }

  static removeAccessToken() {
    AppConfig.ACCESS_TOKEN = '';
    Keychain.resetGenericPassword();
    AsyncStorage.setItem('token_saved', 'false');
  }

  static saveLocale(locale) {
    AsyncStorage.setItem('user_locale', locale);
  }

  static async getLocale() {
    return await AsyncStorage.getItem('user_locale');
  }

  static async get(key, defaultValue) {
    const value = await AsyncStorage.getItem(key);
    return value || defaultValue;
  }

  static async set(key, value) {
    await AsyncStorage.setItem(key, value);
  }

  static async remove(key, value) {
    await AsyncStorage.removeItem(key, value);
  }

  static async setIsSaveAccount() {
    AppConfig.IS_SAVE_ACCOUNT = true;
    await AsyncStorage.setItem('is_save_account', 'true');
  }

  static async saveUserName(username) {
    await AsyncStorage.setItem('user_name', username);
  }

  static async setFullname(value) {
    await AsyncStorage.setItem('Fullname', value);
  }
  static async getFullname() {
    return await AsyncStorage.getItem('Fullname');
  }

  static async setPhone(value) {
    await AsyncStorage.setItem('Phone', value);
  }
  static async getPhone() {
    return await AsyncStorage.getItem('Phone');
  }

  static async setImageWaitScreen(value) {
    await AsyncStorage.setItem('waitScreen', value);
  }
  static async getImageWaitScreen() {
    return await AsyncStorage.getItem('waitScreen');
  }

  // load app setting
  static async setAppSetting(value) {
    await AsyncStorage.setItem('app_setting', value);
  }
  static async getAppSetting() {
    return await AsyncStorage.getItem('app_setting');
  }

  // add to cart
  static async setCartLocal(value) {
    await AsyncStorage.setItem('carts', value);
  }
  static async getCartLocal() {
    return await AsyncStorage.getItem('carts');
  }

  static async removeCartLocal() {
    await AsyncStorage.setItem('carts', '[]');
  }
}
