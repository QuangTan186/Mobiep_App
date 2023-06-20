/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */

import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../component/Header';
import ShopIcon from '../../../assets/image/ic_shop.png';
import {moderateScale, scale, verticalScale} from '../../utils/scalingUtils';

import {CommonColors, Fonts} from '../../utils/CommonStyles';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AppConfig from '../../utils/AppConfig';
import AuthActions from '../../redux/auth/action';

import IconAvatar from '../../../assets/svg/ic_avatar.svg';
import IconAvatarMini from '../../../assets/svg/ic_avatar_mini.svg';
import IconLogout from '../../../assets/svg/ic_logout.svg';
import BackButton from '../../component/BackButton';
import Utils from '../../utils/Utils';
import FastImage from 'react-native-fast-image';
const UserInfoScreen = props => {
  const navigation = useNavigation();
  const user = useSelector(state => state?.auth?.user) || null;
  const [photo, setPhoto] = useState(user?.avatarUrl);
  console.log(user);
  const [isLogin, setLogin] = useState(false);
  useEffect(() => {
    if (user) {
      setLogin(true);
    } else {
      setLogin(false);
    }
    console.log(isLogin);
  }, [user]);
  const dispatch = useDispatch();
  const renderRow = (title, value, key) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          // navigation.navigate('UpdateInformation', {
          //   focus: key,
          // });
        }}
        disabled={value}
        style={styles.userInfo}>
        <Text style={styles.userTitleLabel}>{title}</Text>

        <Text style={styles.userDetailLabel}>{value}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header center={'Thông tin cá nhân'} left={<BackButton />} />
      <View style={styles.body}>
        <View style={styles.avatarImg}>
          {photo !== '' ? (
            <FastImage
              resizeMode={'cover'}
              style={styles.avatarContent}
              source={{uri: Utils.formatImageUrl(photo)}}
            />
          ) : (
            <IconAvatar width={scale(120)} height={scale(120)} />
          )}
        </View>
        <View style={styles.userInformation}>
          <View>
            {renderRow(
              'Họ & Tên',
              user?.firstName && `${user?.lastName} ${user?.firstName}`,
            )}
            <View style={styles.separatorProduct} />
            {renderRow('Tên đăng nhập', user?.username)}
            <View style={styles.separatorProduct} />
            {renderRow(
              'Giới tính',
              (user?.gender != null && Utils.getGender(user?.gender)) || '',
              'Gender',
            )}
            <View style={styles.separatorProduct} />
            {renderRow(
              'Ngày sinh',
              (user?.birthDay && Utils.getDate(user?.birthDay)) || '',
              'BirthDay',
            )}
            <View style={styles.separatorProduct} />
            {renderRow('Số điện thoại', user?.phone)}
            <View style={styles.separatorProduct} />

            {renderRow('Email', user?.email)}
            <View style={styles.separatorProduct} />
          </View>
        </View>
        <View style={{flex: 1}} />
        <View style={{width: '100%', paddingHorizontal: scale(50)}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#E50000',
              borderRadius: scale(8),
              paddingHorizontal: scale(10),
              paddingVertical: verticalScale(10),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.navigate('UpdateInfo')}>
            <Text
              style={{
                ...Fonts.defaultMedium,
                fontSize: moderateScale(14),
                color: '#fff',
              }}>
              Thay đổi thông tin cá nhân
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const UserLabel = {
  fontSize: moderateScale(16),
  color: '#555353',
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: verticalScale(7),
    paddingBottom: verticalScale(15),
  },
  avatarImg: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(20),
  },
  userTitleLabel: {
    ...UserLabel,
  },
  userDetailLabel: {
    ...UserLabel,
    ...Fonts.defaultRegular,
    marginLeft: scale(60),
    flex: 1,
    textAlign: 'right',
  },
  dotWarning: {
    width: scale(10),
    height: scale(10),
    backgroundColor: 'red',
    borderRadius: scale(5),
    marginLeft: scale(7),
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: scale(12),
    paddingTop: scale(12),
  },
  separatorProduct: {
    backgroundColor: '#D8D7D7',
    width: scale(500),
    height: 0.5,
  },
  userInformation: {
    backgroundColor: '#FFFFFF',
    padding: scale(13),
  },
});
export default UserInfoScreen;
