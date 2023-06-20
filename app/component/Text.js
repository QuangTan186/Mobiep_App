import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {CommonColors, Fonts} from '../utils/CommonStyles';
import ScaledSheet from '../utils/ScaledSheet';
import {DARK_MODE, FONT_NORMAL} from '../utils/Consts';

const EMPTY = '';

class AppText extends Component {
  render() {
    const {style, onPress, theme} = this.props;
    const children =
      this.props.children !== null && this.props.children !== undefined
        ? this.props.children
        : EMPTY;
    const themeTextColor =
      theme === DARK_MODE ? '#FFFFFF' : CommonColors.mainText;
    return (
      <Text
        {...this.props}
        allowFontScaling={false}
        ellipsizeMode="tail"
        onPress={onPress}
        style={[styles.text, {color: themeTextColor}, style]}>
        {children}
      </Text>
    );
  }
}

const styles = ScaledSheet.create({
  text: {
    // fontSize: '16@ms',
    fontSize: FONT_NORMAL,
    ...Fonts.defaultLight,
  },
});

export default AppText;
