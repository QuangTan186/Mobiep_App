/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {moderateScale, scale, verticalScale} from '../../utils/scalingUtils';
import Header from '../../component/Header';
import BackButton from '../../component/BackButton';
import {CommonColors, Fonts} from '../../utils/CommonStyles';
import LaptopAcerImage from '../../../assets/image/product/Laptop_Acer.png';
import LaptopAcerImage1 from '../../../assets/image/product/Laptop_Acer_1.png';
import LaptopAcerImage2 from '../../../assets/image/product/Laptop_Acer_2.png';
import LaptopAcerImage3 from '../../../assets/image/product/Laptop_Acer_3.png';
import LaptopAcerImage4 from '../../../assets/image/product/Laptop_Acer_4.png';
import IconAddCart from '../../../assets/svg/ic_add_cart.svg';
import {useState} from 'react';
import Utils from '../../utils/Utils';
import {useDispatch} from 'react-redux';
import CartActions from '../../redux/cart/action';
import VccLoading from '../../component/VccLoading';
import Cart from '../../component/Cart';
import AppConfig from '../../utils/AppConfig';
import {useNavigation} from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
import {TextInput} from 'react-native-gesture-handler';
import IconComment from '../../../assets/svg/ic_comment.svg';
import CommentFactory from '../../redux/comment/factory';
import IconAvatarMini from '../../../assets/svg/ic_avatar_mini.svg';
import productFactory from '../../redux/product/factory';
const ProductDetailScreen = props => {
  const {item, id} = props.route.params;
  const [loading, showLoading] = useState(true);
  const [detailProduct, setDetailProduct] = useState([]);
  const [local, setLocal] = useState(true);
  const [description, setDescription] = useState(
    {html: item?.description} || '',
  );
  const [comment, setComment] = useState('');
  const listSlide = [
    LaptopAcerImage,
    LaptopAcerImage1,
    LaptopAcerImage2,
    LaptopAcerImage3,
  ];
  const [listImgDescription, setListImgDescription] = useState([]);

  const [listComment, setListComment] = useState([]);
  useEffect(() => {
    handleDetail();
    loadComment();
    loadImg();
  }, [item]);
  const loadImg = async () => {
    try {
      if (id) {
        const response = await productFactory.getProductById({
          IdProduct: id,
        });
        console.log(response?.data?.result?.imageUrl);
        if (response?.data?.code === 'ok') {
          if (response?.data?.result?.imageUrl?.length) {
            setListImgDescription(response?.data?.result?.imageUrl);
            setLocal(false);
          } else {
            setListImgDescription(listSlide);
            // setLocal(true);
          }
        } else {
          setListImgDescription(listSlide);
          // setLocal(true);
        }
        showLoading(false);
      }
    } catch (e) {
      // setLocal(true);
      showLoading(false);
    }
  };
  const loadComment = async () => {
    try {
      const response = await CommentFactory.getListComment(item?.id);
      if (response?.data?.code === 'ok') {
        setListComment(response?.data?.result);
      }
      showLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  const handleDetail = () => {
    if (item?.detailProduct.trim() !== '') {
      let newList = item?.detailProduct.split('//');
      let list = [];
      newList.map((_item, _index) => {
        if (_item?.includes('/')) {
          list = [...list, [_item.split('/')[0], _item.split('/')[1]]];
        }
      });

      setDetailProduct(list);
    }
  };

  const [indexImage, setIndexImage] = useState(0);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleAddToCart = () => {
    if (AppConfig.ACCESS_TOKEN) {
      showLoading(true);
      dispatch({
        type: CartActions.ADD_TO_CART,
        data: {
          productId: item?.id,
          quantity: 1,
        },
        onSuccess: () => {
          showLoading(false);
          Utils.showSuccessToast({text1: 'Thêm vào giỏ hàng thành công'});
        },
        onFailed: () => {
          showLoading(false);
          Utils.showErrorToast({
            text1: 'Thêm vào giỏ hàng thất bại. Vui lòng thử lại sau',
          });
        },
      });
    } else {
      navigation.navigate('Login', {
        callback: () => {},
      });
    }
  };
  const handleBuyNow = () => {
    if (AppConfig.ACCESS_TOKEN) {
      showLoading(true);
      dispatch({
        type: CartActions.ADD_TO_CART,
        data: {
          productId: item?.id,
          quantity: 1,
        },
        onSuccess: () => {
          showLoading(false);
          navigation.navigate('Cart', {
            checkId: item?.id,
          });
        },
        onFailed: () => {
          showLoading(false);
          Utils.showErrorToast({
            text1: 'Có lỗi. Vui lòng thử lại sau',
          });
        },
      });
    } else {
      navigation.navigate('Login', {
        callback: () => {},
      });
    }
  };
  const renderImageItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          marginRight: index != listSlide.length - 1 ? scale(20) : 0,

          width: scale(70),
          height: scale(70),
          borderRadius: scale(3),
          borderWidth: 0.2,
          padding: scale(4),
        }}
        onPress={() => setIndexImage(index)}>
        {!local ? (
          <Image
            style={{width: '100%', height: '100%'}}
            source={{
              uri: Utils.formatImageUrl(item),
            }}
          />
        ) : (
          <Image style={{width: '100%', height: '100%'}} source={item} />
        )}
      </TouchableOpacity>
    );
  };
  const renderCommentItem = ({item, index}) => {
    return (
      <>
        <View style={{flexDirection: 'row', flex: 1}}>
          <IconAvatarMini />
          <View style={{marginLeft: scale(8), flex: 1}}>
            <Text
              style={{
                ...Fonts.defaultRegular,
                color: '#000',
                fontSize: moderateScale(12),
                height: verticalScale(20),
              }}>
              {item?.username}
            </Text>
            <Text
              style={{
                ...Fonts.defaultRegular,
                color: '#000',
                fontSize: moderateScale(12),
                marginTop: verticalScale(8),
              }}>
              {item?.commentUser}
            </Text>
          </View>
        </View>
        {index !== listComment.length - 1 ? (
          <View
            style={{
              marginTop: verticalScale(25),
              width: '100%',
              backgroundColor: '#828282',
              height: 1,
              marginBottom: verticalScale(17),
            }}
          />
        ) : (
          <></>
        )}
      </>
    );
  };
  const handleSendComment = async () => {
    if (comment.trim() !== '') {
      try {
        const response = await CommentFactory.addComment({
          productId: item?.id,
          comment: comment.trim(),
        });
        if (response?.data?.code === 'ok') {
          setComment('');
          await loadComment();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Header center={'Sản phẩm'} left={<BackButton />} right={<Cart />} />
      <ScrollView style={styles.body}>
        <Text style={styles.textProductName}>{item?.name}</Text>
        <View
          style={{
            marginTop: verticalScale(30),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={
              !local
                ? {
                    uri: Utils.formatImageUrl(
                      listImgDescription?.[indexImage] || '',
                    ),
                  }
                : listImgDescription?.[indexImage]
            }
            style={{
              width: scale(250),
              height: verticalScale(180),
              resizeMode: 'contain',
            }}
          />
        </View>
        <View style={{height: verticalScale(150)}}>
          <FlatList
            horizontal={true}
            style={styles.listImageSlide}
            data={listImgDescription}
            renderItem={renderImageItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              padding: scale(7),
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          />
        </View>

        <View style={styles.buyNow}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingVertical: verticalScale(9),
              opacity: 1,
            }}>
            <Text
              style={{
                marginBottom: verticalScale(10),
                ...Fonts.defaultRegular,
                fontSize: moderateScale(15),
                color: '#000',
              }}>
              Mua ngay chỉ từ
            </Text>
            <Text
              style={{
                marginBottom: verticalScale(10),
                ...Fonts.defaultBold,
                fontSize: moderateScale(20),
                color: '#E50000',
              }}>
              {Utils.formatPrice(item?.price)}
            </Text>
          </View>
          {/* <Text
            style={{
              ...Fonts.defaultRegular,
              color: '#000',
              fontSize: moderateScale(12),
              marginHorizontal: scale(30),
            }}>
            Hoặc
          </Text> */}
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingVertical: verticalScale(9),
            }}>
            {/* <Text
              style={{
                marginBottom: verticalScale(10),
                ...Fonts.defaultRegular,
                fontSize: moderateScale(12),
                color: '#000',
              }}>
              Trả trước từ
            </Text> */}
            <Text
              style={{
                marginBottom: verticalScale(10),
                ...Fonts.defaultBold,
                fontSize: moderateScale(14),
                color: '#E50000',
              }}>
              {/* {Utils.formatPrice(item?.price / 10)} */}
            </Text>
          </View>
        </View>
        {detailProduct.length ? (
          <View style={[styles.specification]}>
            <Text
              style={{
                ...Fonts.defaultBold,
                fontSize: moderateScale(16),
                color: '#000',
                textTransform: 'uppercase',
              }}>
              {' '}
              Thông số kỹ thuật
            </Text>
            {detailProduct?.map((_item, index) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: verticalScale(5),
                  }}>
                  <Text
                    style={{
                      ...Fonts.defaultRegular,
                      fontSize: moderateScale(16),
                      color: '#000',
                    }}>
                    {_item?.[0]}
                  </Text>
                  <View style={{flex: 1}} />
                  <Text
                    style={{
                      ...Fonts.defaultRegular,
                      fontSize: moderateScale(16),
                      color: '#000',
                    }}>
                    {_item?.[1]}
                  </Text>
                </View>
              );
            })}
          </View>
        ) : (
          <></>
        )}
        {item?.description && item?.description?.trim() !== 'None' ? (
          <View style={[styles.specification]}>
            <Text
              style={{
                ...Fonts.defaultBold,
                fontSize: moderateScale(16),
                color: '#000',
                textTransform: 'uppercase',
              }}>
              {' '}
              Mô tả sản phẩm
            </Text>
            <RenderHtml contentWidth={400} source={description} />
          </View>
        ) : (
          <></>
        )}
        {AppConfig.isLogin() ? (
          <View style={styles.commentContainer}>
            <Text
              style={{
                ...Fonts.defaultBold,
                fontSize: moderateScale(16),
                color: '#000',
                textTransform: 'uppercase',
              }}>
              Bình luận
            </Text>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: scale(10),
                paddingVertical: scale(12),
                borderWidth: 1,
                borderRadius: scale(5),
                borderColor: '#7F7F7F',
                marginTop: verticalScale(12),
              }}>
              <TextInput
                multiline={true}
                style={{
                  height: verticalScale(100),
                  position: 'relative',
                  flex: 1,
                  padding: 0,
                }}
                textAlignVertical={'top'}
                onChangeText={text => setComment(text)}
                placeholder="Mời bạn để lại bình luận"
                value={comment}
              />
              <TouchableOpacity
                style={{}}
                hitSlop={scale(10)}
                onPress={handleSendComment}>
                <IconComment
                  color={comment.trim() != '' ? '#D7202C' : '#7F7F7F'}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: verticalScale(20),
                marginBottom: verticalScale(16),
                backgroundColor: '#828282',
                height: 1,
                width: '100%',
              }}
            />

            {listComment.length ? (
              <FlatList
                data={listComment}
                renderItem={renderCommentItem}
                style={{
                  paddingHorizontal: scale(10),
                  paddingVertical: scale(12),
                  borderWidth: 1,
                  borderRadius: scale(5),
                  borderColor: '#7F7F7F',
                }}
              />
            ) : (
              <></>
            )}
          </View>
        ) : (
          <></>
        )}
      </ScrollView>
      <View style={styles.buyNowModal}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={{alignItems: 'center', padding: scale(10)}}
            onPress={handleAddToCart}>
            <IconAddCart width={scale(25)} height={scale(25)} />
            <Text style={{...Fonts.defaultRegular, color: '#000'}}>
              Thêm vào giỏ hàng
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            height: '100%',
            width: 1,
            backgroundColor: '#000',
            opacity: 0.4,
          }}
        />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            style={{
              width: scale(120),
              height: verticalScale(40),
              backgroundColor: '#F20707',
              borderRadius: scale(10),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={handleBuyNow}>
            <Text
              style={{
                ...Fonts.defaultRegular,
                fontSize: scale(14),
                color: '#fff',
              }}>
              Mua ngay
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading && <VccLoading />}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  body: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: scale(15),
  },
  textProductName: {
    ...Fonts.defaultMedium,
    fontSize: moderateScale(14),
    color: '#000',
    lineHeight: verticalScale(25),
    textAlign: 'center',
    marginTop: scale(15),
  },
  listImageSlide: {
    paddingVertical: verticalScale(30),
  },
  buyNow: {
    backgroundColor: '#D9D9D947',
    borderRadius: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  specification: {
    marginTop: verticalScale(20),
    borderRadius: scale(10),
    borderWidth: 1,

    padding: scale(10),
  },
  buyNowModal: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: scale(5),
    height: scale(60),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(5),
  },
  commentContainer: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(15),
    borderWidth: 1,
    borderRadius: scale(10),
    marginTop: verticalScale(15),
  },
});
export default ProductDetailScreen;
