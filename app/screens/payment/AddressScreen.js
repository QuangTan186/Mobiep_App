/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../component/Header';
import BackButton from '../../component/BackButton';
import AddressIcon from '../../../assets/svg/ic_address.svg';
import {moderateScale, scale, verticalScale} from '../../utils/scalingUtils';
import {CommonColors, Fonts} from '../../utils/CommonStyles';
import EditIcon from '../../../assets/svg/ic_edit.svg';
import DeleteIcon from '../../../assets/svg/ic_delete_cart.svg';
import ClockIcon from '../../../assets/svg/ic_clock.svg';
import LaptopAcerImage from '../../../assets/image/product/Laptop_Acer.png';
import Utils from '../../utils/Utils';
import {ScrollView} from 'react-native-gesture-handler';
import IconCheck from '../../../assets/svg/ic_check.svg';
import CurrencyIcon from '../../../assets/svg/ic_currency.svg';
import {useDispatch} from 'react-redux';
import OrderActions from '../../redux/order/action';
import {useNavigation} from '@react-navigation/native';
import CartActions from '../../redux/cart/action';
import ArrowIcon from '../../../assets/svg/ic_arrow_down.svg';
import CloseIcon from '../../../assets/svg/close.svg';
import AddressModal from '../../component/AddressModal';
import masterFactories from '../../redux/master/factory';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AuthActions from '../../redux/auth/action';
import AuthFactories from '../../redux/auth/factory';

const AddressScreen = props => {
  const id = props?.route?.params?.id || null;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showCityModal, setShowCityModal] = useState(false);
  const [showDistricModal, setShowDistrictModal] = useState(false);
  const [showWardModal, setShowWardModal] = useState(false);
  const [city, setCity] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [citiesData, setCitiesData] = useState([]);
  const [districtsData, setDistricsData] = useState([]);
  const [wardsData, setWardsData] = useState([]);
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();

  useEffect(() => {
    loadCity();
    if (id) {
      console.log(id);
      loadAddressData();
    }
  }, []);
  useEffect(() => {
    loadDistrict(city);
  }, [city]);
  useEffect(() => {
    loadWard(district);
  }, [district]);
  const loadAddressData = async () => {
    try {
      console.log(id);
      const response = await AuthFactories.getAddressById({idAddress: id});
      if (response?.data?.code === 'ok') {
        const addressData = response?.data?.result?.result?.[0];
        setPhone(addressData?.phone);
        setAddress(addressData?.address);
        setWard({name: addressData?.communityName});
        setDistrict({name: addressData?.districtName});
        setCity({name: addressData?.provinceName});
        console.log(addressData);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const loadCity = async () => {
    try {
      const response = await masterFactories.getProvince();
      setCitiesData(response?.data?.result);
    } catch (e) {
      console.log(e);
    }
  };
  const loadDistrict = async _city => {
    try {
      const response = await masterFactories.getDistrict({
        idProvince: _city?.id,
      });
      setDistricsData(response?.data?.result);
    } catch (e) {
      console.log(e);
    }
  };
  const loadWard = async _district => {
    try {
      const response = await masterFactories.getCommunity({
        idDistrict: _district?.id,
      });
      setWardsData(response?.data?.result);
    } catch (e) {
      console.log(e);
    }
  };
  const handleSubmit = () => {
    console.log({
      phone: phone,
      provinceName: city?.name,
      districtName: district?.name,
      communityName: ward?.name,
      address: address,
      isDefault: true,
    });
    if (city && ward && address && district && phone) {
      dispatch({
        type: id ? AuthActions.UPDATE_ADDRESS : AuthActions.ADD_ADDRESS,
        data: {
          phone: phone,
          provinceName: city?.name,
          districtName: district?.name,
          communityName: ward?.name,
          address: address,
          isDefault: true,
        },
        params: id
          ? {
              idAddress: id,
            }
          : null,
        onSuccess: () => {
          Utils.showSuccessToast({
            text1: id
              ? 'Cập nhật địa chỉ nhận hàng thành công'
              : 'Thêm địa chỉ nhận hàng thành công',
          });
          navigation.goBack();
        },
        onError: () => {
          Utils.showErrorToast({
            text1: id
              ? 'Cập nhật địa chỉ nhận hàng thất bại'
              : 'Thêm địa chỉ nhận hàng thất bại',
          });
          navigation.goBack();
        },
      });
    } else {
      Utils.showErrorToast({
        text1: 'Mời bạn nhập đủ thông tin địa chỉ nhận hàng',
      });
    }
  };

  return (
    <View style={styles.containter}>
      <Header center={'Địa chỉ nhận hàng'} left={<BackButton />} />
      <View style={styles.body}>
        <KeyboardAwareScrollView>
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
              name="address"
              placeholder={'Nhập số điện thoại'}
              placeholderTextColor="#9B9797"
              maxLength={22}
              required
              value={phone}
              keyboardType="numeric"
              onChangeText={text => setPhone(text)}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowCityModal(true)}>
            <View style={[styles.inputContainer, styles.isDropdown]}>
              <View>
                <Text style={styles.label}>{'Tỉnh/Thành phố'}</Text>
                <Text
                  style={
                    city?.name ? {...Fonts.defaultRegular, color: '#000'} : null
                  }>
                  {city?.name || 'Chọn tỉnh/thành phố'}
                </Text>
              </View>
              <ArrowIcon
                style={styles.arrow}
                width={scale(15)}
                height={scale(15)}
                color={'#707070'}
              />
              <AddressModal
                showModal={showCityModal}
                setShowModal={setShowCityModal}
                text={'Chọn Tỉnh/Thành phố'}
                data={citiesData}
                handleInputChanged={() => {}}
                setData={setCity}
                setDistrict={() => setDistrict({})}
                setWard={() => setWard({})}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowDistrictModal(true)}>
            <View style={[styles.inputContainer, styles.isDropdown]}>
              <View>
                <Text style={styles.label}>{'Quận/Huyện'}</Text>
                <Text
                  style={
                    district?.name
                      ? {...Fonts.defaultRegular, color: '#000'}
                      : null
                  }>
                  {district?.name || 'Chọn quận/huyện'}
                </Text>
              </View>
              <ArrowIcon
                style={styles.arrow}
                width={scale(15)}
                height={scale(15)}
                color={'#707070'}
              />
              <AddressModal
                showModal={showDistricModal}
                setShowModal={setShowDistrictModal}
                text={'Chọn quận/huyện'}
                data={districtsData}
                handleInputChanged={() => {}}
                setData={setDistrict}
                setWard={() => setWard({})}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowWardModal(true)}>
            <View style={[styles.inputContainer, styles.isDropdown]}>
              <View>
                <Text style={styles.label}>{'Phường/Xã'}</Text>
                <Text
                  style={
                    ward?.name ? {...Fonts.defaultRegular, color: '#000'} : null
                  }>
                  {ward?.name || 'Chọn phường/xã'}
                </Text>
              </View>
              <ArrowIcon
                style={styles.arrow}
                width={scale(15)}
                height={scale(15)}
                color={'#707070'}
              />
              <AddressModal
                showModal={showWardModal}
                setShowModal={setShowWardModal}
                text={'Chọn phường/xã'}
                data={wardsData}
                handleInputChanged={() => {}}
                setData={setWard}
              />
            </View>
          </TouchableOpacity>
          <View
            style={[
              styles.inputContainer,
              {
                paddingTop: scale(8),
                justifyContent: 'center',
              },
            ]}>
            <Text style={styles.label}>{'Địa chỉ'}</Text>
            <TextInput
              style={[styles.input, styles.textInput]}
              name="address"
              placeholder={'Nhập địa chỉ'}
              placeholderTextColor="#9B9797"
              maxLength={22}
              required
              value={address}
              onChangeText={text => setAddress(text)}
            />
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
export default AddressScreen;
const styles = StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: '#C9C5C5',
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(15),
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
  isDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  label: {
    marginBottom: scale(7),
    ...Fonts.defaultRegular,
    fontSize: moderateScale(13),
    color: '#333333',
    marginLeft: 0,
  },
});
