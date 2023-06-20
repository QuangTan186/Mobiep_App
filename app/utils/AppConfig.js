export default class AppConfig {
  static ACCESS_TOKEN = '';
  static isLogin() {
    return !!AppConfig.ACCESS_TOKEN;
  }
}
