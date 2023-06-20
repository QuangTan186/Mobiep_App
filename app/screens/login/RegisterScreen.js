/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
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
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

// import ImgBanner from '../../../assets/image/background_login.png';

import ImgBanner from '../../../assets/image/Shirt/blog-9.jpg';
// import ShopIcon from '../../../assets/image/shop_icon.png';

import ShopIcon from '../../../assets/image/Shirt/logo(2).png';
import BackIcon from '../../../assets/svg/ic_back.svg';
import {Fonts} from '../../utils/CommonStyles';
import {moderateScale, scale, verticalScale} from '../../utils/scalingUtils';
import IconLock from '../../../assets/svg/ic_lock.svg';
import IconUser from '../../../assets/svg/ic_user.svg';
import IconGender from '../../../assets/svg/ic_gender.svg';
import IconPhone from '../../../assets/svg/ic_phone.svg';
import IconFirstName from '../../../assets/svg/ic_firstname.svg';
import IconChange from '../../../assets/svg/ic_change.svg';

import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import AuthActions from '../../redux/auth/action';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [gender, setGender] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const handleRegister = () => {
    const data1 = {
      username: userName,
      email: 'user@example.com',
      code: 'string',
      password: password,
      lastName: firstName,
      firstName: lastName,
      phone: phoneNumber,
      // avatar: 'string',
      // birthDay: '2022-10-23T08:13:26.166Z',
      gender: gender,
    };
    console.log(data1);

    if (
      password === repassword &&
      userName &&
      password &&
      repassword &&
      firstName &&
      lastName &&
      phoneNumber
    ) {
      dispatch({
        type: AuthActions.REGISTER,
        data: {
          username: userName,
          email: 'user@example.com',
          code: 'string',
          password: password,
          lastName: firstName,
          firstName: lastName,
          phone1: phoneNumber,
          address1: 'string',
          // avatar: 'string',
          // birthDay: '2022-10-23T08:13:26.166Z',
          gender: gender,
        },
        onSuccess: () => {
          Alert.alert('Đăng ký thành công');
          navigation.navigate('Login');
        },
        onError: () => {
          Alert.alert('Có lỗi xảy ra vui lòng thử lại');
        },
      });
    } else {
      Alert.alert('Nhập thông tin không hợp lệ');
    }
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={{flex: 1}}>
        <Image source={ImgBanner} style={styles.banner} />
        <View style={styles.body}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.iconBack}
              onPress={() => navigation.goBack()}>
              <BackIcon width={scale(20)} height={scale(18)} />
            </TouchableOpacity>

            <Image source={ShopIcon} style={styles.shopIcon} />
            <Text style={styles.title}>Đăng kí mới</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View
              style={[
                styles.wrapInput,
                {
                  marginTop: verticalScale(15),
                  width: scale(170),
                },
              ]}>
              <View style={styles.wrapIcon}>
                <View
                  style={{
                    width: scale(18),
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: scale(10),
                    paddingLeft: scale(5),
                  }}>
                  <IconFirstName width={scale(25)} height={scale(20)} />
                </View>
              </View>
              <TextInput
                placeholder="Họ và tên đệm"
                style={styles.input}
                onChangeText={text => {
                  setFirstName(text);
                }}
              />
            </View>
            <View
              style={[
                styles.wrapInput,
                {
                  marginTop: verticalScale(15),
                  width: scale(170),
                  flex: 0.9,
                  marginLeft: scale(10),
                },
              ]}>
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
              <TextInput
                placeholder="Tên"
                style={styles.input}
                onChangeText={text => {
                  setLastName(text);
                }}
              />
            </View>
          </View>
          <View
            style={[
              styles.wrapInput,
              {
                marginTop: verticalScale(15),
              },
            ]}>
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
            <TextInput
              placeholder="Tên đăng nhập"
              style={styles.input}
              onChangeText={text => {
                setUserName(text);
              }}
            />
          </View>
          <View
            style={[
              styles.wrapInput,
              {
                marginTop: verticalScale(15),
              },
            ]}>
            <View style={styles.wrapIcon}>
              <View
                style={{
                  width: scale(18),
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: scale(10),
                }}>
                <IconGender width={scale(20)} height={scale(20)} />
              </View>
            </View>
            <TextInput
              placeholder="Giới tính"
              style={styles.input}
              onChangeText={text => {
                if (text === 'Nam') {
                  setGender(0);
                } else {
                  setGender(1);
                }
              }}
            />
          </View>
          <View
            style={[
              styles.wrapInput,
              {
                marginTop: verticalScale(15),
              },
            ]}>
            <View style={styles.wrapIcon}>
              <View
                style={{
                  width: scale(18),
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: scale(10),
                }}>
                <IconPhone width={scale(17)} height={scale(20)} />
              </View>
            </View>
            <TextInput
              placeholder="Số điện thoại"
              style={styles.input}
              onChangeText={text => {
                setPhoneNumber(text);
              }}
            />
          </View>
          <View
            style={[
              styles.wrapInput,
              {
                marginTop: verticalScale(15),
              },
            ]}>
            <View style={styles.wrapIcon}>
              <View
                style={{
                  width: scale(18),
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: scale(10),
                }}>
                <IconLock width={scale(25)} height={scale(25)} />
              </View>
            </View>
            <TextInput
              placeholder="Mật khẩu"
              style={styles.input}
              onChangeText={text => {
                setPassword(text);
              }}
              secureTextEntry={true}
            />
          </View>
          <View
            style={[
              styles.wrapInput,
              {
                marginTop: verticalScale(15),
              },
            ]}>
            <View style={styles.wrapIcon}>
              <View
                style={{
                  width: scale(18),
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: scale(10),
                }}>
                <IconChange width={scale(16)} height={scale(16)} />
              </View>
            </View>
            <TextInput
              placeholder="Nhập lại mật khẩu"
              style={styles.input}
              onChangeText={text => {
                setRepassword(text);
              }}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity style={styles.btnSubmit} onPress={handleRegister}>
            <Text style={styles.textSubmit}>Đăng kí</Text>
          </TouchableOpacity>
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
    height: scale(60),
    marginTop: -verticalScale(25),
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
    // paddingLeft: scale(10),
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
    marginTop: verticalScale(30),
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
});
export default RegisterScreen;
