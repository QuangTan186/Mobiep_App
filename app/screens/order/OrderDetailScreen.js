/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../component/Header';
import {moderateScale, scale, verticalScale} from '../../utils/scalingUtils';

import {Fonts, ShadowStyle} from '../../utils/CommonStyles';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import BackButton from '../../component/BackButton';
import {FlatList} from 'react-native-gesture-handler';
import OrderFactories from '../../redux/order/factory';
import VccLoading from '../../component/VccLoading';
import Utils from '../../utils/Utils';
import AddressIcon from '../../../assets/svg/ic_address.svg';
import LaptopAcerImage from '../../../assets/image/product/Laptop_Acer.png';
const OrderDetailScreen = props => {
  const navigation = useNavigation();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState({});
  const dispatch = useDispatch();
  const {orderId, addressId, type} = props?.route?.params;
  const user = useSelector(state => state?.auth?.user) || null;
  const [data, setData] = useState();
  console.log(type);
  const getData = async () => {
    try {
      console.log(orderId);
      const response = await OrderFactories.getOrderById({
        idOrder: orderId,
      });

      setLoading(false);

      if (response?.data?.code === 'ok') {
        console.log(response?.data);
        const _data = response?.data?.result?.result;
        setList(_data?.list);
        setAddress(_data?.address?.[0]);
        setData(_data);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  const renderProductItem = ({item, index}) => {
    return (
      <View
        style={{
          paddingTop: verticalScale(10),
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: '#9D9393',
          paddingBottom: verticalScale(10),
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            style={{
              width: scale(105),
              height: verticalScale(80),
              marginBottom: verticalScale(20),
            }}
            source={
              item?.avtImageUrl !== 'None' && item?.avtImageUrl
                ? {uri: item?.avtImageUrl}
                : LaptopAcerImage
            }
          />
          <Text
            style={{
              ...Fonts.defaultRegular,
              color: '#F20707',
              fontSize: moderateScale(12),
              lineHeight: verticalScale(16),
            }}>
            {Utils.formatPrice(item?.price)}
          </Text>
        </View>
        <View
          style={{
            marginLeft: scale(23),
            flex: 1,
          }}>
          <Text
            style={{
              ...Fonts.defaultRegular,
              color: '#000',
              fontSize: moderateScale(12),
              lineHeight: verticalScale(16),
              flex: 1,
              paddingTop: verticalScale(20),
            }}
            numberOfLines={4}>
            {item?.productName}
          </Text>
          <View>
            <Text
              style={{
                ...Fonts.defaultRegular,
                color: '#000',
                fontSize: moderateScale(14),
                lineHeight: verticalScale(16),
              }}>{`Số lượng:  ${item?.quantity}`}</Text>
          </View>
        </View>
      </View>
    );
  };
  const handleSubmit = async () => {
    try {
      const response = await OrderFactories.changeStatusOrder([orderId], {
        status: 5,
      });
      if (response?.data?.code === 'ok') {
        Utils.showSuccessToast({text1: 'Huỷ đơn hàng thành công'});
        navigation.goBack();
        navigation.goBack();
        navigation.navigate('ManageOrder', {index: 3});
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Header center={'Chi tiết đơn hàng'} left={<BackButton />} />
      <ScrollView
        style={styles.body}
        contentContainerStyle={{paddingVertical: verticalScale(10)}}>
        <View style={styles.addressContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AddressIcon width={scale(16)} height={scale(20)} />
            <Text style={[styles.text, {marginLeft: scale(12)}]}>
              Địa chỉ giao hàng
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#9D9393',
              height: 1,
              marginTop: verticalScale(15),
              marginBottom: verticalScale(11),
            }}
          />
          <View>
            <Text style={styles.text}>
              {user?.lastName + ' ' + user?.firstName}
            </Text>
            <Text style={styles.text}>{address ? address?.phone : ''}</Text>
            <Text style={styles.text}>
              {address
                ? address?.address +
                  ', ' +
                  address?.communityName +
                  ', ' +
                  address?.districtName +
                  ', ' +
                  address?.provinceName
                : ''}
            </Text>
          </View>
        </View>
        <FlatList
          style={styles.productBox}
          data={list}
          renderItem={renderProductItem}
          contentContainerStyle={{paddingVertical: verticalScale(10)}}
          showsVerticalScrollIndicator={false}
        />
        <View
          style={{
            borderColor: '#DDDCDC',
            borderWidth: 1,
            marginTop: verticalScale(25),
            paddingHorizontal: scale(20),
            paddingVertical: scale(8),
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: verticalScale(8),
              alignItems: 'center',
            }}>
            <Text style={[styles.text, {fontSize: moderateScale(14)}]}>
              Tổng tiền hàng
            </Text>
            <View style={{flex: 1}} />
            <Text style={[styles.text, {fontSize: moderateScale(14)}]}>
              {Utils.formatPrice(data?.total)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: verticalScale(8),
              alignItems: 'center',
            }}>
            <Text style={[styles.text, {fontSize: moderateScale(14)}]}>
              Phí vận chuyển
            </Text>
            <View style={{flex: 1}} />
            <Text style={[styles.text, {fontSize: moderateScale(14)}]}>
              {Utils.formatPrice(15000)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: verticalScale(8),
              alignItems: 'center',
            }}>
            <Text style={[styles.text, {fontSize: moderateScale(14)}]}>
              Giảm phí vận chuyển
            </Text>
            <View style={{flex: 1}} />
            <Text style={[styles.text, {fontSize: moderateScale(14)}]}>
              {Utils.formatPrice(-15000)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: verticalScale(8),
              alignItems: 'center',
            }}>
            <Text style={[styles.text, {fontSize: moderateScale(14)}]}>
              Tổng thanh toán
            </Text>
            <View style={{flex: 1}} />
            <Text style={[styles.text, {fontSize: moderateScale(14)}]}>
              {Utils.formatPrice(data?.total)}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: '#9D9393',
              marginTop: verticalScale(12),
            }}
          />
          {type === 2 && (
            <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmit}>
              <Text
                style={[
                  styles.text,
                  {color: '#fff', fontSize: moderateScale(16)},
                ]}>
                Huỷ đơn hàng
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{flex: 1}} />
      </ScrollView>
      {loading && <VccLoading />}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C9C5C5',
  },
  body: {
    marginTop: verticalScale(8),
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: scale(8),
  },
  addressContainer: {
    marginTop: verticalScale(17),

    borderWidth: 1,
    borderColor: '#DDDCDC',
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(15),
  },
  text: {
    ...Fonts.defaultRegular,
    fontSize: moderateScale(14),
    color: '#000',
    marginVertical: scale(5),
  },
  productBox: {
    paddingHorizontal: scale(14),
    borderColor: '#DDDCDC',
    borderWidth: 1,
  },
  btnSubmit: {
    marginTop: verticalScale(15),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(45),
    backgroundColor: '#E50000',
    borderRadius: scale(4),
  },
});
export default OrderDetailScreen;
