/* eslint-disable react-native/no-inline-styles */
import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Utils from '../utils/Utils';
import {moderateScale, scale, verticalScale} from '../utils/scalingUtils';
import HomeActiveIcon from '../../assets/svg/bottomtab/ic_home_active.svg';
import HomeIcon from '../../assets/svg/bottomtab/ic_home.svg';
import MailActiveIcon from '../../assets/svg/bottomtab/ic_mail_active.svg';
import MailIcon from '../../assets/svg/bottomtab/ic_mail.svg';
import AccountActiveIcon from '../../assets/svg/bottomtab/ic_account_active.svg';
import AccountIcon from '../../assets/svg/bottomtab/ic_account.svg';
import CategoryIcon from '../../assets/svg/bottomtab/ic_category.svg';
import CategoryActiveIcon from '../../assets/svg/bottomtab/ic_category_active.svg';
import {CommonColors} from '../utils/CommonStyles';
import ShopIcon from '../../assets/image/ic_shop.png';

const BottomTabBar = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  return (
    <View
      style={{
        paddingVertical: scale(10),
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        shadowColor: '#b1b1b1',
        shadowOpacity: 0.2,
        shadowOffset: {
          width: 0,
          height: -3,
        },
        elevation: 3,
        height: Utils.isIphoneX() ? verticalScale(75) : verticalScale(67),
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        if (index === 2) {
          return (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={ShopIcon}
                style={{width: scale(40), height: scale(40)}}
              />
            </View>
          );
        } else {
          const widthIcon = scale(25);
          const heightIcon = scale(25);

          return (
            <TouchableOpacity
              activeOpacity={1}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{flex: 1, alignItems: 'center'}}>
              {index === 0 &&
                (isFocused ? (
                  <HomeActiveIcon width={widthIcon} height={heightIcon} />
                ) : (
                  <HomeIcon width={widthIcon} height={heightIcon} />
                ))}
              {index === 1 &&
                (isFocused ? (
                  <CategoryActiveIcon width={widthIcon} height={heightIcon} />
                ) : (
                  <CategoryIcon width={widthIcon} height={heightIcon} />
                ))}
              {index === 3 &&
                (isFocused ? (
                  <MailActiveIcon width={widthIcon} height={heightIcon} />
                ) : (
                  <MailIcon width={widthIcon} height={heightIcon} />
                ))}
              {index === 4 &&
                (isFocused ? (
                  <AccountActiveIcon width={widthIcon} height={heightIcon} />
                ) : (
                  <AccountIcon width={widthIcon} height={heightIcon} />
                ))}
              <Text
                allowFontScaling={false}
                style={{
                  color: isFocused
                    ? CommonColors.activeTintColor
                    : CommonColors.mainText,
                  fontSize: moderateScale(12),
                  fontFamily: isFocused ? 'Roboto-Regular' : 'Roboto-Light',
                  textAlign: 'center',
                  marginTop: verticalScale(3),
                }}>
                {index === 0 && 'Trang chủ'}
                {index === 1 && 'Danh mục'}
                {index === 3 && 'Hộp thư'}
                {index === 4 && 'Tài khoản'}
              </Text>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
};

export default BottomTabBar;
