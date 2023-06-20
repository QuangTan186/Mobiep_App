/* eslint-disable react-native/no-inline-styles */

import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Appearance,
  Platform,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../component/Header';
import ShopIcon from '../../../assets/image/ic_shop.png';
import {moderateScale, scale, verticalScale} from '../../utils/scalingUtils';

import {CommonColors, Fonts} from '../../utils/CommonStyles';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import BackButton from '../../component/BackButton';
import Utils from '../../utils/Utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AuthFactory from '../../redux/auth/factory';
import AppPreferences from '../../utils/AppPreferences';
import AuthActions from '../../redux/auth/action';

const ChangePasswordScreen = props => {
  const navigation = useNavigation();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (
      newPassword !== newPassword2 ||
      newPassword.length < 6 ||
      newPassword2.length < 6
    ) {
      Alert.alert('Vui lòng nhập kiểm tra lại mật khẩu');
    } else {
      const response = await AuthFactory.changePassword({
        passwordOld: oldPassword,
        passwordNew: newPassword,
      });
      if (response?.data?.code === 'ok') {
        Utils.showSuccessToast({
          text1:
            'Đổi mật khẩu thành công. Vui lòng đăng nhập lại tài khoản với mật khẩu mới',
        });
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
      } else {
        Alert.alert(response?.data?.message);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Header center={'Đổi mật khẩu'} left={<BackButton />} />
      <View style={styles.body}>
        <KeyboardAwareScrollView>
          <View style={styles.formContainer}>
            <View
              style={[
                styles.inputContainer,
                {
                  paddingTop: scale(8),
                  justifyContent: 'center',
                },
              ]}>
              <Text style={styles.label}>{'Mật khẩu cũ'}</Text>
              <TextInput
                style={[styles.input, styles.textInput]}
                placeholder={'Nhập mật khẩu cũ'}
                placeholderTextColor="#9B9797"
                maxLength={50}
                required
                value={oldPassword}
                onChangeText={text => setOldPassword(text)}
                secureTextEntry={true}
              />
            </View>
            <View
              style={[
                styles.inputContainer,

                {
                  paddingTop: scale(8),
                  justifyContent: 'center',
                },
              ]}>
              <Text style={styles.label}>{'Mật khẩu mới'}</Text>
              <TextInput
                style={[styles.input, styles.textInput]}
                placeholder={'Nhập mật khẩu mới'}
                placeholderTextColor="#9B9797"
                required
                value={newPassword}
                onChangeText={text => setNewPassword(text)}
                secureTextEntry={true}
              />
            </View>
            <View
              style={[
                styles.inputContainer,

                {
                  paddingTop: scale(8),
                  justifyContent: 'center',
                },
              ]}>
              <Text style={styles.label}>{'Nhập lại mật khẩu'}</Text>
              <TextInput
                style={[styles.input, styles.textInput]}
                name="Email"
                placeholder={'Nhập lại mật khẩu'}
                placeholderTextColor="#9B9797"
                required
                value={newPassword2}
                onChangeText={text => setNewPassword2(text)}
                secureTextEntry={true}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>

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
            onPress={() => {
              handleSubmit();
            }}>
            <Text
              style={{
                ...Fonts.defaultMedium,
                fontSize: moderateScale(14),
                color: '#fff',
              }}>
              Lưu
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
  input: {
    paddingTop: 0,
    paddingBottom: 0,
    // marginLeft: scale(-2.5),
    // backgroundColor: 'red',
  },
  textInput: {
    fontSize: moderateScale(14),
    color: CommonColors.mainText,
    paddingTop: 0,
    paddingBottom: 0,
    height: scale(30),
    justifyContent: 'center',
    textAlignVertical: 'center',
    paddingLeft: 0,
    marginTop: scale(-6),
  },
  inputContainer: {
    borderColor: '#333333',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: scale(15),
    marginBottom: scale(10),
    height: scale(60),
    position: 'relative',
  },
  formContainer: {
    paddingHorizontal: scale(15),
    paddingVertical: scale(10),
    backgroundColor: '#FFFFFF',
  },
  isDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    marginBottom: scale(7),
    ...Fonts.defaultRegular,
    fontSize: moderateScale(13),
    color: '#333333',
    marginLeft: 0,
  },
  modal: {
    minHeight: verticalScale(100),
    backgroundColor: '#fff',
    paddingHorizontal: scale(15),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
  },
  modalText: {
    paddingVertical: scale(15),
    ...Fonts.defaultRegular,
    fontSize: moderateScale(14),
    color: '#333333',
  },
  borderBottom: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#9B9797',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(15),
  },
});
export default ChangePasswordScreen;
