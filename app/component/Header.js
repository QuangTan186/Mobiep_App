import React, {Component} from 'react';
import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import {CommonColors, Fonts} from '../utils/CommonStyles';
import {moderateScale, scale, verticalScale} from '../utils/scalingUtils';
import ShopIcon from '../../assets/image/ic_shop.png';
import Utils from '../utils/Utils';
const paddingTopHeader =
  Platform.OS === 'ios'
    ? Utils.isIphoneX()
      ? scale(34)
      : scale(20)
    : StatusBar.currentHeight;
const Header = props => {
  const {
    text = '',
    leftStyle,
    left,
    centerContainer,
    center,
    centerStyle,
    right,
    rightStyle,
  } = props;

  return (
    <View>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle={'light-content'}
      />
      <View style={styles.header}>
        <View style={[styles.left, leftStyle]}>{left}</View>
        {centerContainer ? (
          centerContainer
        ) : (
          <View style={[styles.center, centerStyle]}>
            <Text style={styles.title} numberOfLines={1}>
              {center}
            </Text>
          </View>
        )}
        <View style={[styles.right, rightStyle]}>{right}</View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: CommonColors.bgHeader,
    height: verticalScale(97),
    flexDirection: 'row',
    paddingTop: paddingTopHeader,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...Fonts.defaultMedium,
    fontSize: moderateScale(20),
    color: '#fff',
  },
  left: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(15),
  },
  center: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    top: paddingTopHeader,
    bottom: 0,
    paddingHorizontal: scale(50),
    zIndex: -1,
  },
  right: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(15),
  },
});
export default Header;
