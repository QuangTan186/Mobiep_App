import {Alert, Dimensions, Platform} from 'react-native';
import md5 from 'md5';
import moment from 'moment';
import AppConfig from './AppConfig';
import Toast from 'react-native-toast-message';
import {verticalScale} from './scalingUtils';
const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;
const IPHONE12_H = 844;
const IPHONE12_Max = 926;
const IPHONE12_Mini = 780;
const {height, width} = Dimensions.get('window');
const SALT = '123456789zxcvbnm';
export default class Utils {
  static isIphoneX = () => {
    if (Platform.OS === 'web') {
      return false;
    }

    return (
      (Platform.OS === 'ios' &&
        ((height === X_HEIGHT && width === X_WIDTH) ||
          (height === X_WIDTH && width === X_HEIGHT))) ||
      (height === XSMAX_HEIGHT && width === XSMAX_WIDTH) ||
      (height === XSMAX_WIDTH && width === XSMAX_HEIGHT) ||
      height === IPHONE12_H ||
      height === IPHONE12_Max ||
      height === IPHONE12_Mini
    );
  };

  static setScreenHeight(height) {
    Utils.screenHeight = height;
  }

  static getScreenHeight() {
    return Utils.screenHeight;
  }
  static MD5(data) {
    return md5(data + SALT);
  }

  static formatPrice(x) {
    if (!x) {
      return 0;
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ';
  }
  static showCustomToast(setting) {
    Toast.show({
      text1: setting.text1,
      visibilityTime: 5000,
      position: 'top | bottom',
      topOffset:
        verticalScale(30) + (Utils.isIphoneX() ? verticalScale(10) : 0),
      autoHide: false,
      props: {
        icon: setting.icon,
      },
      onShow: () => {},
      onHide: () => {},
      onPress: () => {},
    });
  }

  static showSuccessToast(setting) {
    Toast.show({
      type: 'success',
      text1: setting.text1,
      visibilityTime: 1500,
      position: 'top',
      topOffset:
        verticalScale(30) + (Utils.isIphoneX() ? verticalScale(10) : 0),
      autoHide: true,
      onShow: () => {},
      onHide: () => {},
      onPress: () => {},
    });
  }

  static showErrorToast(setting) {
    Toast.show({
      type: 'error',
      text1: setting.text1,
      text1NumberOfLines: 2,
      visibilityTime: 1500,
      position: 'top | bottom',
      topOffset:
        verticalScale(30) + (Utils.isIphoneX() ? verticalScale(10) : 0),
      autoHide: true,
      onShow: () => {},
      onHide: () => {},
      onPress: () => {},
    });
  }

  static showWarningToast(setting) {
    Toast.show({
      type: 'info',
      text1: setting.text1,
      visibilityTime: 1000,
      position: 'top | bottom',
      topOffset: verticalScale(30),
      autoHide: true,
      onShow: () => {},
      onHide: () => {},
      onPress: () => {},
    });
  }
  static showConfirm(title, action = () => {}) {
    Alert.alert(
      'Thông báo',
      title,
      [
        {
          text: 'Huỷ',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'Đồng ý', onPress: () => action()},
      ],
      {cancelable: false},
    );
  }
  static getDate(timestamp, type = 1) {
    if (timestamp == null) {
      return null;
    }
    let result = null;
    switch (type) {
      case 1:
        result = moment(timestamp).format('DD.MM.YYYY');
        break;
      case 2:
        result = moment(timestamp).format('DD.MM.yyyy - HH:mm');
        break;
      case 3:
        result = moment(timestamp).format('yyy-MM-DD');
        break;
      case 4:
        result = moment(timestamp).format('HH:mm:ss - DD.MM.yyyy');
        break;
      case 5:
        result = moment(timestamp).format('DD.MM.yyyy - HH:mm');
        break;
      case 6:
        result = moment(timestamp).format('HH:mm');
        break;
      case 7:
        result = moment(timestamp).format('DD/MM/yyyy');
        break;
      case 8:
        result = moment(timestamp).format('yyyy-MM-DD');
        break;
      default:
        break;
    }
    return result;
  }
  static getGender(key) {
    switch (key) {
      case 0:
        return 'Nam';
      case 1:
        return 'Nữ';
      case 2:
        return 'Khác';
    }
  }
  static formatImageUrl(url) {
    if (!url) {
      return '';
    }
    if (url?.includes('https')) {
      return url;
    }
    return url?.replace('http', 'https');
  }
}
