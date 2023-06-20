/* eslint-disable react-hooks/exhaustive-deps */
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

import {moderateScale, scale, verticalScale} from '../../utils/scalingUtils';
import BackButton from '../../component/BackButton';
import {Fonts} from '../../utils/CommonStyles';
import LaptopAcerImage from '../../../assets/image/product/Laptop_Acer.png';
import {TextInput} from 'react-native-gesture-handler';
import IconCheck from '../../../assets/svg/ic_check.svg';
import {useDispatch, useSelector} from 'react-redux';
import CartActions from '../../redux/cart/action';
import Utils from '../../utils/Utils';
import VccLoading from '../../component/VccLoading';
import IconDeleteCart from '../../../assets/svg/ic_delete_cart.svg';
import {useNavigation} from '@react-navigation/native';
const RenderCartItem = props => {
  const {item, index, setCheck, setItem, handleDeleteCart} = props;
  const onChangeInput = value => {
    if (!value || value == '00') {
      var newItem = {
        ...item,
        quantity: 0,
      };
      setItem(index, newItem);
      return;
    }
    var value = value.replace(/^[0.]+/, '');
    value = value.replace(/[^0-9]/g, '');
    var newItem = {
      ...item,
      quantity: parseInt(value),
    };
    setItem(index, newItem);
  };
  const handlePlus = () => {
    var newItem = {
      ...item,
      quantity: Number(item?.quantity) + 1,
    };
    setItem(index, newItem);
  };
  const handleMinus = () => {
    var newItem = {
      ...item,
      quantity: Number(item?.quantity) - 1,
    };
    setItem(index, newItem);
  };
  return (
    <View
      style={{
        paddingVertical: verticalScale(20),
        borderBottomWidth: 1,
        borderColor: '#C9C5C5',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={styles.checkBox}
          hitSlop={scale(5)}
          onPress={setCheck}>
          {item?.check && (
            <IconCheck width={scale(18)} height={scale(18)} color={'#F20707'} />
          )}
        </TouchableOpacity>
        <Image
          style={{
            width: scale(105),
            height: verticalScale(80),
            marginHorizontal: scale(10),
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
            color: '#000',
            fontSize: moderateScale(12),
            lineHeight: verticalScale(16),
            flex: 1,
          }}
          numberOfLines={5}>
          {item?.productName}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: verticalScale(20),
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 105,
            alignItems: 'center',
            marginLeft: scale(37),
            marginRight: scale(10),
          }}>
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
            width: scale(88),
            height: verticalScale(30),
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: '#5F5F5F',
            borderWidth: 0.5,
          }}>
          <TouchableOpacity
            hitSlop={{left: scale(10)}}
            onPress={handleMinus}
            style={{
              width: verticalScale(30),
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            disabled={item?.quantity <= 1}>
            <Text
              style={{
                ...Fonts.defaultRegular,
                color: '#000',
                fontSize: moderateScale(16),
              }}>
              -
            </Text>
          </TouchableOpacity>
          <TextInput
            value={item?.quantity.toString()}
            style={styles.input}
            keyboardType={'numeric'}
            onChangeText={onChangeInput}
          />
          <TouchableOpacity
            hitSlop={{right: scale(10)}}
            onPress={handlePlus}
            style={{
              width: verticalScale(30),
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                ...Fonts.defaultRegular,
                color: '#000',
                fontSize: moderateScale(16),
              }}>
              +
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{marginLeft: scale(40)}}
          onPress={() => handleDeleteCart(item)}>
          <IconDeleteCart />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const CartScreen = props => {
  const [checkTotal, setCheckTotal] = useState(false);
  const cart = useSelector(state => state?.cart?.cart) || {};
  const checkId = props?.route?.params?.checkId || null;
  console.log(checkId);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, showLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    getCart();
  }, []);
  useEffect(() => {
    if (checkId) {
      const _index = cart?.list?.findIndex(item => item?.productId === checkId);
      if (_index != -1) {
        let newList = cart?.list;
        newList[_index].check = true;
        setData(newList);
        handleReady(newList);
        updateTotal(newList);
      }
    } else {
      setData(cart?.list);
    }
  }, [cart]);
  const handleReady = _data => {
    let _ready = false;
    if (_data) {
      _data?.map(item => {
        if (item?.check) {
          _ready = true;
        }
      });
      setReady(_ready);
    }
  };
  const getCart = () => {
    dispatch({
      type: CartActions.GET_CART,
    });
  };
  const handleSubmit = () => {
    let listProduct = [];
    data.map((item, index) => {
      if (item?.check) {
        listProduct = [...listProduct, item];
      }
    });
    navigation.navigate('Payment', {listProduct: listProduct});
  };
  const updateTotal = _data => {
    let newTotal = 0;
    _data.map(i => {
      if (i?.check) {
        newTotal += i?.price * i?.quantity;
      }
    });
    setTotal(newTotal);
  };
  const handleDeleteCart = item => {
    Utils.showConfirm('Bạn có muốn xoá sản phẩm này ?', () => {
      showLoading(true);
      dispatch({
        type: CartActions.DELETE_CART,
        data: {
          idProduct: item?.productId,
          quantity: item?.quantity,
        },
        onSuccess: () => {
          showLoading(false);
          Utils.showSuccessToast({
            text1: 'Xoá sản phẩm khỏi giỏ hàng thành công',
          });
        },
        onFailed: () => {
          showLoading(false);
          Utils.showErrorToast({
            text1: 'Xoá sản phẩm khỏi giỏ hàng thất bại. Vui lòng thử lại sau',
          });
        },
      });
    });
  };

  return (
    <View style={styles.container}>
      <Header center={'Giỏ hàng'} left={<BackButton />} />
      {cart?.list ? (
        <View style={styles.body}>
          <View style={styles.total}>
            <TouchableOpacity
              style={styles.checkBox}
              onPress={() => {
                setCheckTotal(!checkTotal);
                var newData = [...data];
                data.map((item, index) => {
                  newData[index].check = !checkTotal;
                });
                setData(newData);
                updateTotal(newData);
                handleReady(newData);
              }}>
              {checkTotal && (
                <IconCheck
                  width={scale(18)}
                  height={scale(18)}
                  color={'#F20707'}
                />
              )}
            </TouchableOpacity>
            <Text
              style={{
                ...Fonts.defaultRegular,
                color: '#000',
                fontSize: moderateScale(18),
                marginLeft: scale(10),
              }}>
              Tất cả
            </Text>
            <View style={{flex: 1}} />
            <Text
              style={{
                ...Fonts.defaultRegular,
                color: '#F20707',
                fontSize: moderateScale(18),
                marginLeft: scale(8),
              }}>
              {`${data?.length} sản phẩm`}
            </Text>
          </View>
          <View style={styles.line} />
          <FlatList
            style={styles.listProduct}
            data={data}
            renderItem={({item, index}) => (
              <RenderCartItem
                item={item}
                index={index}
                setCheck={() => {
                  var newData = [...data];
                  newData[index].check = !newData[index].check;
                  setData(newData);
                  updateTotal(newData);
                  handleReady(newData);
                }}
                setItem={(_index, _item) => {
                  var newData = [...data];
                  newData[_index] = _item;
                  setData(newData);
                  updateTotal(newData);
                  handleReady(newData);
                }}
                handleDeleteCart={handleDeleteCart}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
          {/* <View style={styles.coupon}>
            <TextInput
              style={{
                width: scale(165),
                color: '#000',
                fontSize: moderateScale(12),
                backgroundColor: 'transparent',
                textAlignVertical: 'center',
                paddingVertical: 0,
                height: verticalScale(40),
                paddingLeft: scale(15),
                paddingRight: scale(5),
                borderColor: '#707070',
                borderWidth: 0.5,
                borderRightWidth: 0,
              }}
              placeholder={'Nhập mã coupon'}
            />
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#000',
                height: verticalScale(40),
                borderWidth: 0.5,
                borderColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  ...Fonts.defaultBold,
                  color: '#fff',
                  fontSize: moderateScale(12),
                }}>
                {'ĐỒNG Ý'}
              </Text>
            </TouchableOpacity>
          </View> */}
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: scale(40),
              marginTop: verticalScale(20),
            }}>
            <Text
              style={{
                ...Fonts.defaultMedium,
                color: '#7A7575',
                fontSize: moderateScale(12),
              }}>
              Tạm tính
            </Text>
            <View style={{flex: 1}} />
            <Text
              style={{
                ...Fonts.defaultMedium,
                color: '#7A7575',
                fontSize: moderateScale(12),
              }}>
              {Utils.formatPrice(total)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: scale(40),
              marginTop: verticalScale(8),
              marginBottom: verticalScale(40),
            }}>
            <Text
              style={{
                ...Fonts.defaultMedium,
                color: '#7A7575',
                fontSize: moderateScale(12),
              }}>
              Tổng tiền
            </Text>
            <View style={{flex: 1}} />
            <Text
              style={{
                ...Fonts.defaultMedium,
                color: '#7A7575',
                fontSize: moderateScale(12),
              }}>
              {Utils.formatPrice(total)}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              marginHorizontal: scale(50),
              height: verticalScale(40),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#E50000',
              marginBottom: verticalScale(40),
              opacity: ready ? 1 : 0.5,
            }}
            disabled={!ready}
            onPress={handleSubmit}>
            <Text
              style={{
                ...Fonts.defaultMedium,
                color: '#fff',
                fontSize: moderateScale(12),
              }}>
              TIẾN HÀNH ĐẶT HÀNG
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <VccLoading />
      )}
      {loading && <VccLoading />}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    paddingVeritcal: verticalScale(8),
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: scale(15),
    paddingTop: verticalScale(26),
  },
  total: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    width: scale(22),
    height: scale(22),
    borderColor: '#000',
    borderWidth: 0.5,
    marginLeft: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    width: scale(344),
    height: 1,
    backgroundColor: '#C9C5C5',
    marginTop: verticalScale(26),
  },
  input: {
    flex: 1,
    color: '#000',
    fontSize: moderateScale(12),
    backgroundColor: 'transparent',
    textAlignVertical: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    textAlign: 'center',
  },
  coupon: {
    flexDirection: 'row',
    paddingHorizontal: scale(40),
    marginTop: verticalScale(10),
    alignItems: 'center',
  },
  listProduct: {flex: 1},
});
export default CartScreen;
