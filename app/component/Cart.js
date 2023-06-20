import {useNavigation} from '@react-navigation/native';
import React, {Component} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import AppConfig from '../utils/AppConfig';

import CartIcon from '../../assets/svg/home/ic_cart.svg';
import {useSelector} from 'react-redux';
import {moderateScale, scale} from '../utils/scalingUtils';
import {CommonColors, Fonts} from '../utils/CommonStyles';
const Cart = props => {
  const navigation = useNavigation();
  const cart = useSelector(state => state?.cart?.cart) || {};
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        if (AppConfig.ACCESS_TOKEN) {
          navigation.navigate('Cart');
        } else {
          navigation.navigate('Login', {
            callback: () => {
              navigation.navigate('Cart');
            },
          });
        }
      }}>
      <CartIcon width={scale(25)} height={scale(25)} />
      {cart?.list?.length ? (
        <View style={styles.quantity}>
          <Text style={styles.textQuantity}>{cart?.list?.length}</Text>
        </View>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    padding: scale(4),
  },
  quantity: {
    position: 'absolute',
    top: scale(-5),
    right: scale(-5),
    width: scale(15),
    height: scale(15),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E60000',
    borderRadius: scale(7.5),
  },
  textQuantity: {
    ...Fonts.defaultMedium,
    color: '#fff',
    fontSize: moderateScale(10),
  },
});
export default Cart;
