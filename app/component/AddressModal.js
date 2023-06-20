/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  Text,
} from 'react-native';
import Modal from 'react-native-modal';
import {CommonColors, Fonts} from '../utils/CommonStyles';
import {moderateScale, scale, verticalScale} from '../utils/scalingUtils';
import CloseIcon from '../../assets/svg/close.svg';
import SearchIcon from '../../assets/svg/search.svg';
import {xoa_dau} from '../utils/Validator';
const AddressModal = ({
  data,
  setShowModal,
  text,
  handleInputChanged,
  setData,
  setError = () => {},
  setDistrict,
  setWard,
  showModal,
}) => {
  const [_data, _setData] = useState(data);
  const handleSearch = e => {
    const newData = data.filter(dt =>
      xoa_dau(dt.name.toUpperCase()).includes(xoa_dau(e.toUpperCase())),
    );
    _setData(newData);
  };
  useEffect(() => {
    _setData(data);
  }, [data]);
  return (
    <Modal
      style={styles.modal}
      isVisible={showModal}
      onBackdropPress={() => setShowModal(false)}
      backdropTransitionInTiming={0}
      backdropColor={CommonColors.backdropColor}
      backdropOpacity={0.6}>
      <View style={[styles.modalHeader]}>
        <TouchableOpacity onPress={() => setShowModal(false)}>
          <CloseIcon width={scale(15)} height={scale(15)} />
        </TouchableOpacity>
        <Text
          style={{
            position: 'absolute',
            width: '100%',
            zIndex: -1,
            textAlign: 'center',
            ...Fonts.defaultRegular,
            fontSize: moderateScale(16),
            color: '#333333',
          }}>
          {text}
        </Text>
      </View>
      <ScrollView
        style={{paddingHorizontal: scale(15)}}
        contentContainerStyle={{
          paddingBottom: scale(150),
        }}
        stickyHeaderIndices={[0]}
        bounces={false}>
        <View style={{backgroundColor: '#fff'}}>
          <View style={styles.search}>
            <TextInput
              placeholderTextColor={'#545454'}
              onChangeText={e => handleSearch(e)}
              placeholder="Tìm kiếm..."
              keyboardType="web-search"
              style={{
                fontSize: 16,
                width: '100%',
                paddingVertical: scale(8),
                color: CommonColors.mainText,
              }}
            />
            <TouchableOpacity style={styles.searchBtn}>
              <SearchIcon width={scale(19)} height={scale(19)} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.result}>
          {_data &&
            _data.map(dt => (
              <TouchableOpacity
                key={dt?.id}
                onPress={() => {
                  setData(dt);
                  setShowModal(false);
                  setDistrict && setDistrict();
                  setWard && setWard();
                }}>
                <Text style={[styles.modalText, styles.borderBottom]}>
                  {dt?.name}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: 'row',
    paddingVertical: scale(15),
    paddingHorizontal: scale(15),
    alignItems: 'center',
    borderBottomColor: '#DCDCDC',
    borderBottomWidth: 0.5,
  },
  searchBtn: {
    position: 'absolute',
    right: scale(5),
    backgroundColor: '#FFF',
  },
  search: {
    flex: 1,
    borderRadius: 10,
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: scale(10),
    paddingRight: scale(20),
    marginTop: scale(11.5),
  },
  borderBottom: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: '#9B9797',
  },
  modal: {
    position: 'relative',
    margin: 0,
    top: verticalScale(163),
    backgroundColor: '#fff',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    // alignItems: 'center',
    justifyContent: 'flex-start',
  },
  modalText: {
    paddingVertical: scale(15),
    ...Fonts.defaultRegular,
    fontSize: moderateScale(14),
    color: '#333333',
  },
});
export default AddressModal;
