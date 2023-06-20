/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../component/Header';
// import ShopIcon from '../../../assets/image/ic_shop.png';

import ShopIcon from '../../../assets/image/Shirt/logo(2).png';
import {moderateScale, scale, verticalScale} from '../../utils/scalingUtils';

import {Fonts} from '../../utils/CommonStyles';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AppConfig from '../../utils/AppConfig';
import AuthActions from '../../redux/auth/action';

import IconAvatar from '../../../assets/svg/ic_avatar.svg';
import IconAvatarMini from '../../../assets/svg/ic_avatar_mini.svg';
import IconLogout from '../../../assets/svg/ic_logout.svg';
import IconOrder from '../../../assets/svg/ic_order.svg';
import IconChangePassword from '../../../assets/svg/icon_change_password.svg';
import CartActions from '../../redux/cart/action';
import AppPreferences from '../../utils/AppPreferences';
const AccountScreen = props => {
  const navigation = useNavigation();
  const user = useSelector(state => state?.auth?.user) || null;

  const dispatch = useDispatch();
  const handleLogout = () => {
    AppPreferences.removeAccessToken();
    dispatch({
      type: AuthActions.SIGN_OUT,
      callback: () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'Main'}, {name: 'Login'}],
          }),
        );
      },
    });
  };
  return (
    <View style={styles.container}>
      <Header
        center={'Tài khoản'}
        left={
          <Image
            source={ShopIcon}
            style={{width: scale(42), height: scale(42)}}
          />
        }
      />
      <View style={styles.body}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            alignItems: 'center',
            padding: scale(5),
          }}>
          <IconAvatar width={scale(90)} height={scale(90)} />
          <View style={{flex: 1}} />
          {AppConfig.ACCESS_TOKEN ? (
            <>
              <View>
                <Text
                  style={{
                    ...Fonts.defaultMedium,
                    fontSize: moderateScale(16),
                    color: '#000',
                  }}>
                  {user?.username}
                </Text>
              </View>

              <View style={{flex: 1}} />
            </>
          ) : (
            <>
              <TouchableOpacity
                style={{
                  backgroundColor: '#000',
                  width: scale(100),
                  alignItems: 'center',
                  paddingVertical: verticalScale(8),
                  marginRight: scale(15),
                  borderRadius: scale(4),
                }}
                onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{
                    ...Fonts.defaultMedium,
                    fontSize: moderateScale(12),
                    color: '#fff',
                  }}>
                  Đăng nhập
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#F20707',
                  width: scale(100),
                  alignItems: 'center',
                  paddingVertical: verticalScale(8),
                  marginRight: scale(15),
                  borderRadius: scale(4),
                }}
                onPress={() => navigation.navigate('Register')}>
                <Text
                  style={{
                    ...Fonts.defaultMedium,
                    fontSize: moderateScale(12),
                    color: '#fff',
                  }}>
                  Đăng ký
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        {AppConfig.ACCESS_TOKEN ? (
          <>
            <View
              style={{
                marginTop: verticalScale(8),
                backgroundColor: '#fff',
                paddingHorizontal: scale(20),
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomColor: '#D9D9D9',
                  borderBottomWidth: 1,
                  paddingVertical: verticalScale(13),
                }}
                onPress={() => navigation.navigate('ManageOrder')}>
                <IconOrder width={scale(24)} height={scale(24)} />
                <Text
                  style={{
                    ...Fonts.defaultRegular,
                    fontSize: moderateScale(14),
                    color: '#000',
                    marginLeft: scale(10),
                  }}>
                  Quản lý đơn hàng
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomColor: '#D9D9D9',
                  borderBottomWidth: 1,
                  paddingVertical: verticalScale(13),
                }}
                onPress={() => navigation.navigate('UserInfo')}>
                <IconAvatarMini width={scale(24)} height={scale(24)} />
                <Text
                  style={{
                    ...Fonts.defaultRegular,
                    fontSize: moderateScale(14),
                    color: '#000',
                    marginLeft: scale(10),
                  }}>
                  Thông tin cá nhân
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomColor: '#D9D9D9',
                  borderBottomWidth: 1,
                  paddingVertical: verticalScale(13),
                }}
                onPress={() => navigation.navigate('ChangePassword')}>
                <IconChangePassword width={scale(24)} height={scale(24)} />
                <Text
                  style={{
                    ...Fonts.defaultRegular,
                    fontSize: moderateScale(14),
                    color: '#000',
                    marginLeft: scale(10),
                  }}>
                  Đổi mật khẩu
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomColor: '#D9D9D9',
                  borderBottomWidth: 1,
                  paddingVertical: verticalScale(13),
                }}
                onPress={handleLogout}>
                <IconLogout width={scale(24)} height={scale(24)} />
                <Text
                  style={{
                    ...Fonts.defaultRegular,
                    fontSize: moderateScale(14),
                    color: '#000',
                    marginLeft: scale(10),
                  }}>
                  Đăng xuất
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{flex: 1}} />
          </>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    backgroundColor: '#C9C5C5',
    paddingVertical: verticalScale(7),
  },
});
export default AccountScreen;
