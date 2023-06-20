/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

// import ImgBanner from '../../../assets/image/background_login.png';
import ImgBanner from '../../../assets/image/Shirt/blog-9.jpg';
// import ShopIcon from '../../../assets/image/shop_icon.png';

import ShopIcon from '../../../assets/image/Shirt/logo(2).png';
import BackIcon from '../../../assets/svg/ic_back.svg';
import {CommonColors, Fonts} from '../../utils/CommonStyles';
import {moderateScale, scale, verticalScale} from '../../utils/scalingUtils';
import IconLock from '../../../assets/svg/ic_lock.svg';
import IconUser from '../../../assets/svg/ic_user.svg';
import IconFacebook from '../../../assets/svg/ic_facebook.svg';
import IconGoogle from '../../../assets/svg/ic_google.svg';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import AuthActions from '../../redux/auth/action';
import {useForm, Controller} from 'react-hook-form';
import CategoryActions from '../../redux/category/action';
import CartActions from '../../redux/cart/action';

const LoginScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const callback = props?.route?.params?.callback;
  const handleLogin = data => {
    const {username, password} = data;
    if (username && password) {
      dispatch({
        type: AuthActions.SIGN_IN,
        data: {
          username: username,
          password: password,
        },
        onSuccess: () => {
          if (callback) {
            navigation.pop();
            callback();
          } else {
            navigation.navigate('Main');
          }
          dispatch({
            type: CartActions.GET_CART,
          });
          dispatch({
            type: AuthActions.GET_USER_ADDRESS,
          });
        },
        onError: () => {
          Alert.alert('Tên đăng nhập hoặc mật khẩu không đúng');
        },
      });
    }
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={{flex: 1}}>
        <Image source={ImgBanner} style={styles.banner} />
        <View style={styles.body}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.iconBack}
              onPress={() => navigation.navigate('Main')}>
              <BackIcon width={scale(20)} height={scale(18)} />
            </TouchableOpacity>

            <Text style={styles.title}>Chào mừng bạn đến với</Text>
            <Image source={ShopIcon} style={styles.shopIcon} />
          </View>
          <View style={{height: verticalScale(30), justifyContent: 'flex-end'}}>
            {errors.username && (
              <Text style={styles.errors}>Không được để trống</Text>
            )}
          </View>

          <View style={[styles.wrapInput]}>
            <View style={styles.wrapIcon}>
              <View
                style={{
                  width: scale(18),
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: scale(10),
                }}>
                <IconUser width={scale(15)} height={scale(17)} />
              </View>
            </View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  placeholder="Nhập tên đăng nhập"
                  style={styles.input}
                  onChangeText={onChange}
                />
              )}
              name="username"
            />
          </View>
          <View style={{height: verticalScale(30), justifyContent: 'flex-end'}}>
            {errors.password && (
              <Text style={styles.errors}>Không được để trống</Text>
            )}
          </View>

          <View style={[styles.wrapInput]}>
            <View style={styles.wrapIcon}>
              <View
                style={{
                  width: scale(18),
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: scale(10),
                }}>
                <IconLock width={scale(30)} height={scale(30)} />
              </View>
            </View>

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  placeholder="Nhập mật khẩu"
                  style={styles.input}
                  secureTextEntry={true}
                  onChangeText={onChange}
                />
              )}
              name="password"
            />
          </View>
          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={handleSubmit(handleLogin)}>
            <Text style={styles.textSubmit}>Đăng nhập</Text>
          </TouchableOpacity>
          <View style={styles.newRegister}>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.textRegister}>Đăng kí mới</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.textRegister}>Quên mật khẩu</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: scale(10),
              alignItems: 'center',
            }}>
            <View style={{height: 1, backgroundColor: '#000', flex: 1}} />
            <Text
              style={{
                marginHorizontal: scale(25),
                fontSize: 14,
                color: '#000',
                textTransform: 'uppercase',
              }}>
              Hoặc
            </Text>
            <View style={{height: 1, backgroundColor: '#000', flex: 1}} />
          </View>
          <View style={styles.social}>
            <IconFacebook width={scale(40)} height={scale(40)} />
            <View style={{width: scale(23)}} />
            <IconGoogle width={scale(40)} height={scale(40)} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  banner: {
    width: '100%',
  },
  body: {
    flex: 1,
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(28),
  },
  header: {
    position: 'relative',
    alignItems: 'center',
  },
  iconBack: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  shopIcon: {
    width: scale(60),
    height: scale(60)
  },
  title: {
    // ...Fonts.defaultMedium,
    fontSize: 18,
    color: 'black',
  },
  wrapInput: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(5),
    borderWidth: scale(0.6),
    flex: 1,
    borderColor: '#707070',
    backgroundColor: '#fff',
    overflow: 'hidden',
    height: verticalScale(40),
    maxHeight: verticalScale(40),
    paddingLeft: scale(5),
  },
  input: {
    flex: 1,
    paddingLeft: scale(10),
    paddingRight: scale(25),
    // backgroundColor: '#fff',
    color: '#424242',
    // fontSize: FONT_NORMAL,
    // height: HEIGHT,
    backgroundColor: 'transparent',
    // lineHeight:verticalScale(14),
    textAlignVertical: 'center',
    paddingTop: 0,
    paddingBottom: 0,
  },
  btnSubmit: {
    marginTop: verticalScale(20),
    backgroundColor: '#F20707',
    height: verticalScale(36),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(5),
  },
  textSubmit: {
    color: '#fff',
    fontSize: 14,
  },
  newRegister: {
    marginTop: verticalScale(43),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textRegister: {
    fontSize: 14,
    color: '#4285F4',
  },
  social: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(9),
  },
  wrapIcon: {
    borderRightWidth: 1,
    borderColor: '#7A7575',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: scale(40),
    height: verticalScale(25),
    // backgroundColor:'red'
  },
  errors: {
    marginTop: scale(5),
    textAlign: 'right',
    color: CommonColors.redColor,
    ...Fonts.defaultLight,
  },
});
export default LoginScreen;
