/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../component/Header';
import BackButton from '../../component/BackButton';
import AddressIcon from '../../../assets/svg/ic_address.svg';
import {moderateScale, scale, verticalScale} from '../../utils/scalingUtils';
import {Fonts} from '../../utils/CommonStyles';
import EditIcon from '../../../assets/svg/ic_edit.svg';
import DeleteIcon from '../../../assets/svg/ic_delete_cart.svg';
import ClockIcon from '../../../assets/svg/ic_clock.svg';
import LaptopAcerImage from '../../../assets/image/product/Laptop_Acer.png';
import Utils from '../../utils/Utils';
import {ScrollView} from 'react-native-gesture-handler';
import IconCheck from '../../../assets/svg/ic_check.svg';
import CurrencyIcon from '../../../assets/svg/ic_currency.svg';
import {useDispatch, useSelector} from 'react-redux';
import OrderActions from '../../redux/order/action';
import {useNavigation} from '@react-navigation/native';
import CartActions from '../../redux/cart/action';
import convertStringToNumber from 'lib-pbl6';
import {add} from 'lodash';

const PaymentScreen = props => {
  const {listProduct} = props?.route?.params;
  const [timeReceive, setTimeReceive] = useState(1);
  const [paymentType, setPaymentType] = useState(1);
  const transportFee = 15000;
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(state => state?.auth?.user) || null;
  const address = useSelector(state => state?.auth?.userAddress) || null;
  const [indexAddress, setIndexAddress] = useState(0);
  useEffect(() => {
    let newTotal = 0;
    listProduct.map(item => {
      newTotal += item?.price * item?.quantity;
    });
    setTotal(newTotal);
  }, [listProduct]);

  const handleSubmit = () => {
    console.log(listProduct);
    if (address?.length) {
      dispatch({
        type: OrderActions.ADD_ORDER,
        data: listProduct,
        params: {
          idAddress: address[indexAddress]?.id,
          payment: paymentType,
          time: timeReceive,
        },
        onSuccess: () => {
          dispatch({
            type: CartActions.GET_CART,
          });
          navigation.navigate('Main');
          Utils.showSuccessToast({text1: 'Bạn đã thêm đơn hàng thành công'});
        },
        onError: () => {
          navigation.navigate('Main');
          Utils.showErrorToast({text1: 'Bạn đã thêm đơn hàng thất bại'});
        },
      });
    } else {
      Utils.showErrorToast({text1: 'Bạn phải thêm địa chỉ sản phẩm'});
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
              item?.avtImageUrl != 'None' && item?.avtImageUrl
                ? {uri: Utils.formatImageUrl(item?.avtImageUrl)}
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
            {convertStringToNumber(item?.price.toString(), true)}
            {/* {Utils.formatPrice(item?.price)} */}
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
  const renderAddressItem = ({item, index}) => {
    console.log(index);
    console.log(indexAddress);
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          marginBottom: verticalScale(15),
          alignItems: 'center',
        }}
        onPress={() => setIndexAddress(index)}>
        <View style={{width: '70%'}}>
          <Text style={styles.text}>
            {user?.lastName + ' ' + user?.firstName}
          </Text>
          <Text style={styles.text}>{item?.phone}</Text>
          <Text style={styles.text}>
            {item?.address +
              ', ' +
              item?.communityName +
              ', ' +
              item?.districtName +
              ', ' +
              item?.provinceName}
          </Text>
        </View>
        {index == indexAddress && (
          <IconCheck width={scale(15)} height={scale(12)} />
        )}

        <View style={{flex: 1}} />
        <TouchableOpacity
          style={{marginRight: scale(15)}}
          onPress={() => {
            navigation.navigate('Address', {
              id: item?.id,
            });
          }}>
          <EditIcon color="#707070" width={scale(20)} height={scale(20)} />
        </TouchableOpacity>
        <TouchableOpacity>
          <DeleteIcon width={scale(20)} height={scale(20)} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.containter}>
      <Header center={'Thanh toán'} left={<BackButton />} />
      <ScrollView
        style={styles.body}
        contentContainerStyle={{paddingVertical: verticalScale(10)}}>
        <View style={styles.addressBox}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AddressIcon width={scale(16)} height={verticalScale(20)} />
            <Text
              style={{
                ...Fonts.defaultRegular,
                fontSize: moderateScale(14),
                color: '#000',
                marginLeft: scale(10),
              }}>
              Địa chỉ nhận hàng
            </Text>
            <View style={{flex: 1}} />
            <TouchableOpacity
              style={{
                width: scale(130),
                height: verticalScale(30),
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 0.5,
                borderColor: '#000',
              }}
              onPress={() => {
                navigation.navigate('Address');
              }}>
              <Text
                style={{
                  ...Fonts.defaultRegular,
                  fontSize: moderateScale(14),
                  color: '#000',
                }}>
                + Thêm mới
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              height: 0.5,
              backgroundColor: '#9D9393',
              marginVertical: verticalScale(10),
            }}
          />
          <FlatList data={address} renderItem={renderAddressItem} />
        </View>
        <FlatList
          style={styles.productBox}
          data={listProduct}
          renderItem={renderProductItem}
          contentContainerStyle={{paddingVertical: verticalScale(10)}}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.timeReceive}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ClockIcon />
              <Text style={[styles.text, {marginLeft: scale(8)}]}>
                Thời gian nhận hàng
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
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => setTimeReceive(1)}>
              {timeReceive === 1 ? (
                <IconCheck width={scale(15)} height={scale(12)} />
              ) : (
                <View style={{width: scale(15)}} />
              )}

              <Text
                style={[
                  styles.text,
                  {marginLeft: scale(15), paddingVertical: verticalScale(4)},
                ]}>
                Tất cả các ngày trong tuần
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => setTimeReceive(2)}>
              {timeReceive === 2 ? (
                <IconCheck width={scale(15)} height={scale(12)} />
              ) : (
                <View style={{width: scale(15)}} />
              )}
              <Text
                style={[
                  styles.text,
                  {marginLeft: scale(15), paddingVertical: verticalScale(4)},
                ]}>
                Chỉ giao giờ hành chính
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.paymentType}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CurrencyIcon width={scale(20)} height={scale(20)} />
              <Text style={[styles.text, {marginLeft: scale(8)}]}>
                Phương thức thanh toán
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
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => setPaymentType(1)}>
              {paymentType === 1 ? (
                <IconCheck width={scale(15)} height={scale(12)} />
              ) : (
                <View style={{width: scale(15)}} />
              )}

              <Text
                style={[
                  styles.text,
                  {marginLeft: scale(15), paddingVertical: verticalScale(4)},
                ]}>
                Thanh toán qua thẻ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => setPaymentType(2)}>
              {paymentType === 2 ? (
                <IconCheck width={scale(15)} height={scale(12)} />
              ) : (
                <View style={{width: scale(15)}} />
              )}
              <Text
                style={[
                  styles.text,
                  {marginLeft: scale(15), paddingVertical: verticalScale(4)},
                ]}>
                Thanh toán khi nhận hàng (COD)
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
              {/* {Utils.formatPrice(total)} */}
              {convertStringToNumber(total.toString(), true)}
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
              {/* {Utils.formatPrice(transportFee)} */}
              {convertStringToNumber(transportFee.toString(), true)}
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
              {/* {Utils.formatPrice(-transportFee)} */}
              {convertStringToNumber((-transportFee).toString(), true)}
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
              {convertStringToNumber(total.toString(), true)}
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
          <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmit}>
            <Text
              style={[
                styles.text,
                {color: '#fff', fontSize: moderateScale(16)},
              ]}>
              Mua hàng
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default PaymentScreen;
const styles = StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: '#C9C5C5',
  },
  body: {
    flex: 1,
    marginTop: verticalScale(8),
    backgroundColor: '#fff',
    paddingHorizontal: scale(8),
  },
  addressBox: {
    borderColor: '#DDDCDC',
    borderWidth: 1,
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
    borderRadius: 2,
  },
  text: {
    ...Fonts.defaultRegular,
    fontSize: moderateScale(12),
    color: '#000',
  },

  productBox: {
    borderColor: '#DDDCDC',
    borderWidth: 1,
    marginTop: verticalScale(25),
    paddingHorizontal: scale(8),
  },
  timeReceive: {
    borderColor: '#DDDCDC',
    borderWidth: 1,
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
    borderRadius: 2,
    marginTop: verticalScale(20),
  },
  paymentType: {
    borderColor: '#DDDCDC',
    borderWidth: 1,
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
    borderRadius: 2,
    marginTop: verticalScale(20),
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
