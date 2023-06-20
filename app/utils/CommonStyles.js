import {StatusBar, Platform} from 'react-native';
import {moderateScale, scale, verticalScale} from '../utils/scalingUtils';
import Utils from './Utils';

const Fonts = {
  defaultRegular: {
    fontFamily: 'Roboto-Regular',
  },
  defaultBold: {
    fontFamily: 'Roboto-Bold',
  },
  defaultBlack: {
    fontFamily: 'Roboto-Black',
  },
  defaultItalic: {
    fontFamily: 'Roboto-Italic',
  },
  defaultLight: {
    fontFamily: 'Roboto-Light',
  },
  defaultMedium: {
    fontFamily: 'Roboto-Medium',
  },
  defaultLightItalic: {
    fontFamily: 'Roboto-LightItalic',
  },
  defaultMediumItalic: {
    fontFamily: 'Roboto-MediumItalic',
  },
};

class CommonColors {
  static colorSuccess = '#0DBC00';

  static darkModeBgColor = '#14224F';

  static darkModeBgContainerColor = '#0F193B';

  static lightModeBgColor = '#EFEFEF';

  static mainColor = '#1BB388';

  static mainActive = '#FFD500';

  static secondaryColor = '#F9BA09';

  static increased = '#2dac91';

  static decreased = '#f74940';

  static activeTintColor = '#EC1C24';

  static border = '#707070';

  static separator = '#D8D7D7';

  static mainText = '#333333';

  static secondaryText = '#7A7A7A';

  static headerBarBgColor = '#FFD500';

  static headerTitleColor = '#303030';

  static disableText = '#444774';

  static disableButton = '#A9A9A9';

  static activeTabColor = '#EFEEB4';

  static inActiveTabColor = '#7A7A7A';

  static headerTextColor = '#1A1A1A';

  static placeholderColor = '#9D9D9D';

  static valid = 'green';

  static invalid = '#EC1C24';

  static borderTextInputColor = '#707070';

  static bgColorLogin = '#ffffff';

  static textInput = '#A9A9A9';

  static linkColor = '#1155cc';

  static backdropColor = '#C2C2C2';

  static alertColor = '#FF2C00';

  static FM_PLUS_COLOR = '#F9BA09';

  static redColor = '#FF2C00';

  static emojiBad = '#FF2C00';
  static emojiNormal = '#F9BA09';
  static emojiGood = '#449B35';

  static priceColor = '#FF2C00';

  static buttonActive = '#FF2C00';

  static borderRadio = '#333333';

  static radioActive = '#333333';

  static arrowColor = '#707070';

  static soldColor = '#707070';

  static loginButton = '#333333';

  static bgHeader = '#424244';
}
const SeparatorStyle = {
  width: '100%',
  height: 0.5,
  backgroundColor: CommonColors.separator,
  marginVertical: verticalScale(10),
};
const CommonStyles = {
  screen: {
    flex: 1,
    // backgroundColor: CommonColors.screenBgColor,
  },
  header: {
    backgroundColor: CommonColors.headerBarBgColor,
    // height: CommonSize.headerHeight,
    // paddingTop: CommonSize.paddingTopHeader,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: moderateScale(20),
    textAlign: 'center',
    ...Fonts.defaultMedium,
    color: '#333333',
    // textTransform: 'capitalize',
  },
  separatorStyle: {
    height: 1,
    backgroundColor: CommonColors.separator,
  },
};
class CommonSize {
  static contentPadding = scale(16);

  static headerTitleFontSize = '15@ms';

  static inputHeight = '40@s';

  static inputFontSize = '14@ms';

  static formLabelFontSize = '14@ms';

  static btnSubmitHeight = scale(35);

  // static paddingTopHeader =
  //   Platform.OS === 'ios'
  //     ? Utils.isIphoneX()
  //       ? scale(34)
  //       : scale(20)
  //     : StatusBar.currentHeight;

  // static headerHeight = scale(41) + CommonSize.paddingTopHeader;

  static marginBottom = scale(30);

  static bottomTabBar =
    Platform.OS === 'ios'
      ? Utils.isIphoneX()
        ? scale(54)
        : scale(0)
      : -StatusBar.currentHeight;
  static paddingHorizontal = scale(25);
  static marginBottomScreen = scale(21);
  static marginTopScreen = verticalScale(30);

  static backdropOpacity = 0.6;
}
const ShadowStyle = {
  shadowColor: '#000',
  shadowOpacity: 0.25,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  elevation: 2,
};

const TextButtonStyle = {
  fontSize: '12@s',
  fontWeight: '500',
  textTransform: 'uppercase',
  color: CommonColors.mainText,
};
export {CommonColors, Fonts, SeparatorStyle, CommonStyles, ShadowStyle};
