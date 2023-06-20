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
import React, {useEffect} from 'react';
import Header from '../../component/Header';
import {useCallback} from 'react';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {moderateScale, scale, verticalScale} from '../../utils/scalingUtils';
import {Fonts, ShadowStyle} from '../../utils/CommonStyles';
import PCImage from '../../../assets/image/Shirt/logo(2).png';
// import ShopIcon from '../../../assets/image/ic_shop.png';

import ShopIcon from '../../../assets/image/Shirt/logo(2).png';
import {useSelector} from 'react-redux';
import Cart from '../../component/Cart';
const CategoryScreen = props => {
  const [index, setIndex] = useState(1);
  const navigation = useNavigation();
  const categoryGraph = 
    useSelector(state => state?.category?.categoryGraph) || [];
  console.log('category:', categoryGraph);
  const [currentCategory, setCurrentCategory] = useState();

  useEffect(() => {
    setCurrentCategory(categoryGraph[0]);
  }, [categoryGraph]);
  const renderTabItem = ({item, i}) => {
    console.log(item);
    return (
      <TouchableOpacity
        key={item?.data?.id}
        style={[
          styles.tabItem,
          item?.data?.id === index && {
            backgroundColor: '#fff',
            ...ShadowStyle,
          },
        ]}
        onPress={() => {
          setIndex(item?.data?.id);
          setCurrentCategory(item);
          if (item?.child?.length == 0) {
            navigation.push('ProductList', {
              title: item?.data?.name,
              id: item?.data?.id,
            });
          }
        }}>
        <Text
          style={{
            ...Fonts.defaultRegular,
            fontSize: moderateScale(16),
            textAlign: 'center',
            color: '#000',
          }}>
          {item?.data?.name}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderCategoryItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        style={{width: '50%', alignItems: 'center', justifyContent: 'center'}}
        onPress={() =>
          navigation.push('ProductList', {
            title: item?.data?.name,
            id: item?.data?.id,
          })
        }>
        <Image
          source={PCImage}
          style={{
            width: scale(80),
            height: scale(71),
            resizeMode: 'contain',
          }}
        />
        <Text
          style={{
            ...Fonts.defaultRegular,
            fontSize: moderateScale(14),
            color: '#000',
          }}>
          {item?.data?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        center={'Danh mục'}
        left={
          <Image
            source={ShopIcon}
            style={{width: scale(42), height: scale(42)}}
          />
        }
        right={<Cart />}
      />
      <View style={styles.body}>
        <View style={styles.tab}>
          
          {categoryGraph.map((item, idx) => renderTabItem({item, idx}))}
        </View>
        <FlatList
          style={styles.listCategory}
          renderItem={renderCategoryItem}
          data={currentCategory?.child}
          numColumns={2}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  body: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  tab: {
    backgroundColor: '#C9C5C5',
    width: scale(95),
  },
  tabItem: {
    height: verticalScale(60),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(8),
  },
  listCategory: {
    backgroundColor: '#fff',
    paddingHorizontal: scale(10),
    flex: 1,
  },
});
export default CategoryScreen;
