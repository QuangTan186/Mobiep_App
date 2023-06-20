/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import Header from '../../component/Header';
import ShopIcon from '../../../assets/image/ic_shop.png';
import {moderateScale, scale, verticalScale} from '../../utils/scalingUtils';

import {Fonts} from '../../utils/CommonStyles';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AppConfig from '../../utils/AppConfig';
import AuthActions from '../../redux/auth/action';

import IconAvatar from '../../../assets/svg/ic_avatar.svg';
import IconAvatarMini from '../../../assets/svg/ic_avatar_mini.svg';
import IconLogout from '../../../assets/svg/ic_logout.svg';
import IconOrder from '../../../assets/svg/ic_order.svg';
import CartActions from '../../redux/cart/action';
import {TabBar, TabView} from 'react-native-tab-view';
import BackButton from '../../component/BackButton';

import RenderSceneOrder from './RenderSceneOrder';
const ManageOrderScreen = props => {
  const navigation = useNavigation();
  const indexInit = props?.route?.params?.index || 0;
  const dispatch = useDispatch();
  const [index, setIndex] = useState(indexInit);
  const [routes] = useState([
    {
      key: 0,
      title: 'Chờ xác nhận',
      type: 2,
    },
    {
      key: 1,
      title: 'Đang giao',
      type: 3,
    },
    {
      key: 2,
      title: 'Đã nhận hàng',
      type: 4,
    },
    {
      key: 3,
      title: 'Đã huỷ',
      type: 5,
    },
  ]);
  const renderScene = useCallback(
    ({route, jumpTo}) => {
      return <RenderSceneOrder type={route?.type} />;
    },
    [index],
  );
  const renderTabBar = props => (
    <TabBar
      {...props}
      activeColor={'#F20707'}
      inactiveColor={'#000000'}
      pressColor={'#FFF'}
      style={[
        {
          backgroundColor: '#fff',
          elevation: 0,
        },
      ]}
      contentContainerStyle={{
        justifyContent: 'center',
        flexDirection: 'row',
      }}
      renderLabel={({route, focused, color}) => (
        <View
          style={{
            backgroundColor: '#fff',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: scale(10),
            borderBottomWidth: focused ? 1 : 0,
            borderColor: '#F20707',
          }}>
          {route.icon ? (
            route.icon
          ) : (
            <Text
              style={[
                {
                  color: color,
                  ...Fonts.defaultMedium,
                  fontSize: scale(14),
                },
              ]}>
              {route.title}
            </Text>
          )}
        </View>
      )}
      tabStyle={{
        minHeight: 0,
        padding: 0,
        paddingHorizontal: scale(20),
        width: 'auto',
      }}
      renderIndicator={() => {}}
      scrollEnabled={true}
    />
  );
  return (
    <View style={styles.container}>
      <Header center={'Đơn hàng'} left={<BackButton />} />
      <View style={styles.body}>
        <TabView
          lazy={true}
          swipeEnabled={true}
          renderTabBar={renderTabBar}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          style={[{flex: 1}]}
          initialLayout={{
            width: Dimensions.get('window').width,
            height: 0,
          }}
          animationEnabled={false}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    backgroundColor: '#C9C5C5',
    paddingVertical: verticalScale(7),
    paddingTop: 0,
  },
});
export default ManageOrderScreen;
