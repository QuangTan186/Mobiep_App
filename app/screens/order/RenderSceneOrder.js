/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

import {moderateScale, scale, verticalScale} from '../../utils/scalingUtils';

import {Fonts, ShadowStyle} from '../../utils/CommonStyles';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {FlatList} from 'react-native-gesture-handler';
import OrderFactories from '../../redux/order/factory';
import VccLoading from '../../component/VccLoading';
import Utils from '../../utils/Utils';
const RenderSceneOrder = props => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {type} = props;
  const user = useSelector(state => state?.auth?.user);
  const getListOrder = async () => {
    try {
      const response = await OrderFactories.getOrder({
        status: type,
      });
      console.log(response?.data?.result);
      setLoading(false);
      if (response?.data?.code === 'ok') {
        setData(response?.data?.result?.result);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  useEffect(() => {
    getListOrder();
  }, []);
  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          overflow: 'hidden',
          paddingBottom: verticalScale(2),
          marginBottom: verticalScale(15),
        }}>
        <View style={styles.itemContainer}>
          <View style={styles.itemLine}>
            <Text style={styles.itemText}>Ngày đặt hàng:</Text>
            <View style={{flex: 1}} />
            <Text style={[styles.itemText, {...Fonts.defaultMedium}]}>
              {Utils.getDate(item?.createAt, 7)}
            </Text>
          </View>
          <View style={styles.itemLine}>
            <Text style={styles.itemText}>Tổng tiền hàng</Text>
            <View style={{flex: 1}} />
            <Text style={styles.itemText}>
              {Utils.formatPrice(item?.total)}
            </Text>
          </View>
          <View style={styles.itemLine}>
            <Text style={styles.itemText}>Phí vận chuyển</Text>
            <View style={{flex: 1}} />
            <Text style={styles.itemText}>{Utils.formatPrice(15000)}</Text>
          </View>
          <View style={styles.itemLine}>
            <Text style={styles.itemText}>Giảm phí vận chuyển</Text>
            <View style={{flex: 1}} />
            <Text style={styles.itemText}>{Utils.formatPrice(-15000)}</Text>
          </View>

          <View style={styles.itemLine}>
            <Text style={styles.itemText}>Tổng phí thanh toán</Text>
            <View style={{flex: 1}} />
            <Text style={styles.itemText}>
              {Utils.formatPrice(item?.total)}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#DDDCDC',
              height: 1,
              marginBottom: verticalScale(15),
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#E50000',
              alignItems: 'center',
              paddingVertical: verticalScale(10),
              borderRadius: scale(4),
            }}
            onPress={() => {
              navigation.navigate('OrderDetail', {
                orderId: item?.id,
                addressId: item?.addressId,
                type: type,
              });
            }}>
            <Text
              style={{
                ...Fonts.defaultMedium,
                fontSize: moderateScale(16),
                color: '#fff',
              }}>
              Chi tiết
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        style={styles.list}
        contentContainerStyle={styles.contentList}
      />
      {loading && <VccLoading />}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: verticalScale(8),
  },
  list: {
    flex: 1,
    paddingVertical: verticalScale(7),
    paddingHorizontal: scale(8),
  },
  contentList: {},
  itemContainer: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#DDDCDC',
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
  },
  itemText: {
    ...Fonts.defaultRegular,
    fontSize: moderateScale(14),
    color: '#000',
  },
  itemLine: {
    flexDirection: 'row',
    paddingBottom: verticalScale(20),
  },
});
export default RenderSceneOrder;
