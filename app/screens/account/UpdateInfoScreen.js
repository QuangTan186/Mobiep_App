/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */

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
} from 'react-native';
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
import DatePickerIcon from '../../../assets/svg/date-picker.svg';
import ArrowIcon from '../../../assets/svg/ic_arrow_down.svg';
import CloseIcon from '../../../assets/svg/close.svg';
import * as Validator from '../../utils/Validator';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';
const UpdateInfoScreen = props => {
  const navigation = useNavigation();
  const user = useSelector(state => state?.auth?.user) || null;
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone);
  const [date, setDate] = useState(user?.birthDay);
  const [gender, setGender] = useState(user?.gender);
  const [address, setAddress] = useState(user?.address1);
  const [isDateModalVisible, setIsDateModalVisible] = useState(false);
  const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);

  console.log(user);
  const [isLogin, setLogin] = useState(false);
  const colorScheme = Appearance.getColorScheme();
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

  const handleDateChanged = selectedDate => {
    setIsDateModalVisible(Platform.OS === 'ios');
    setDate(selectedDate);
  };
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('birthDay', Utils.getDate(date, 8));
    formData.append('gender', gender);
    formData.append('phone', phone);
    dispatch({
      type: AuthActions.UPDATE_USER_INFO,
      data: formData,
      onSuccess: () => {
        Utils.showSuccessToast({text1: 'Thay đổi thông tin thành công'});
        navigation.navigate('UserInfo');
      },
      onError: () => {
        console.log(formData);
        Utils.showErrorToast({text1: 'Thay đổi thông tin thất bại'});
      },
    });
  };
  return (
    <View style={styles.container}>
      <Header center={'Cập nhật thông tin cá nhân'} left={<BackButton />} />
      <View style={styles.body}>
        <KeyboardAwareScrollView>
          <View style={styles.formContainer}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View
                style={[
                  styles.inputContainer,
                  {
                    flex: 1,
                    marginRight: scale(5),
                    justifyContent: 'center',
                    paddingTop: scale(8),
                  },
                ]}>
                <Text style={[styles.label]}>{'Họ & Tên đệm'}</Text>
                <TextInput
                  // editable={false}
                  style={[styles.input, styles.textInput]}
                  name="LastName"
                  placeholder={'Nhập họ và tên đệm'}
                  placeholderTextColor="#9B9797"
                  maxLength={50}
                  required
                  value={lastName}
                  onChangeText={text => setLastName(text)}
                />
              </View>
              <View
                style={[
                  styles.inputContainer,
                  {
                    flex: 1,
                    marginLeft: scale(5),
                    paddingTop: scale(8),
                    justifyContent: 'center',
                  },
                ]}>
                <Text style={styles.label}>{'Tên'}</Text>
                <TextInput
                  style={[styles.input, styles.textInput]}
                  name="FirstName"
                  placeholder={'Nhập tên'}
                  placeholderTextColor="#9B9797"
                  maxLength={50}
                  required
                  value={firstName}
                  onChangeText={text => setFirstName(text)}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                setIsDateModalVisible(true);
              }}
              style={[styles.inputContainer, styles.isDropdown]}>
              <View>
                <Text style={styles.label}>{'Ngày sinh'}</Text>
                <View>
                  <Text style={[date ? {...Fonts.defaultRegular} : null]}>
                    {date
                      ? moment(date).format('DD.MM.YYYY')
                      : 'Nhập ngày sinh'}
                  </Text>
                </View>
              </View>
              <DatePickerIcon width={scale(16)} height={scale(16)} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.inputContainer,
                styles.isDropdown,

                {
                  paddingTop: scale(8),
                },
              ]}
              onPress={() => setIsGenderModalVisible(true)}>
              <View>
                <Text style={[styles.label]}>{'Giới tính'}</Text>
                <TextInput
                  style={[styles.input, styles.textInput]}
                  name="gender"
                  placeholderTextColor="#9B9797"
                  placeholder={'Chọn giới tính'}
                  value={Utils.getGender(gender)}
                  editable={false}
                />
              </View>
              <ArrowIcon
                style={styles.arrow}
                width={scale(15)}
                height={scale(15)}
                color={'#707070'}
              />
            </TouchableOpacity>
            <View
              style={[
                styles.inputContainer,

                {
                  paddingTop: scale(8),
                  justifyContent: 'center',
                },
              ]}>
              <Text style={styles.label}>{'Số điện thoại'}</Text>
              <TextInput
                style={[styles.input, styles.textInput]}
                name="Phone"
                placeholder={'Nhập số điện thoại'}
                placeholderTextColor="#9B9797"
                maxLength={22}
                required
                keyboardType="numeric"
                value={phone}
                onChangeText={text => setPhone(text)}
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
              <Text style={styles.label}>{'Email'}</Text>
              <TextInput
                style={[styles.input, styles.textInput]}
                name="Email"
                placeholder={'Nhập email'}
                placeholderTextColor="#9B9797"
                required
                value={email}
                onChangeText={text => setEmail(text)}
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
      <DateTimePicker
        headerTextIOS={'Chọn ngày'}
        confirmTextIOS={'Xác nhận'}
        cancelTextIOS={'Huỷ'}
        isVisible={isDateModalVisible}
        display={'spinner'}
        isDarkModeEnabled={colorScheme === 'dark'}
        mode="date"
        date={date ? moment(date).toDate() : new Date()}
        maximumDate={new Date()}
        onConfirm={selectDate => {
          handleDateChanged(selectDate);
          setIsDateModalVisible(false);
        }}
        locale={'vi'}
        onCancel={() => setIsDateModalVisible(false)}
      />
      <Modal
        onSwipeComplete={() => setIsGenderModalVisible(false)}
        swipeDirection="down"
        hasBackdrop={true}
        style={{margin: 0}}
        backdropColor={'#303030'}
        backdropOpacity={0.4}
        backdropTransitionOutTiming={0}
        isVisible={isGenderModalVisible}>
        <View style={{flex: 1}}>
          <TouchableWithoutFeedback
            onPress={() => setIsGenderModalVisible(false)}>
            <View style={{flex: 1}} />
          </TouchableWithoutFeedback>
          <View style={styles.modal}>
            <View style={[styles.modalHeader, styles.borderBottom]}>
              <TouchableOpacity
                onPress={() => {
                  setIsGenderModalVisible(!isGenderModalVisible);
                }}>
                <CloseIcon width={scale(15)} height={scale(15)} />
              </TouchableOpacity>
              <Text
                style={{
                  position: 'absolute',
                  width: '100%',
                  zIndex: -1,
                  textAlign: 'center',
                }}>
                Chọn giới tính
              </Text>
            </View>
            <View
              style={{
                paddingBottom: Utils.isIphoneX() ? scale(30) : scale(20),
              }}>
              <TouchableOpacity
                onPress={() => {
                  setIsGenderModalVisible(!isGenderModalVisible);
                  setGender(0);
                }}>
                <Text style={[styles.modalText, styles.borderBottom]}>Nam</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsGenderModalVisible(!isGenderModalVisible);
                  setGender(1);
                }}>
                <Text style={[styles.modalText, styles.borderBottom]}>Nữ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsGenderModalVisible(!isGenderModalVisible);
                  setGender(2);
                }}>
                <Text style={[styles.modalText, styles.borderBottom]}>
                  Khác
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
export default UpdateInfoScreen;
