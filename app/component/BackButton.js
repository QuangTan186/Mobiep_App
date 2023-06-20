/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale, scale} from '../utils/scalingUtils';
import BackIcon from '../../assets/svg/ic_back_white.svg';
export default function BackButton(props) {
  const navigation = useNavigation();
  const {isShowBackLabel = false, white = false, color = '#fff'} = props;
  const handlePress = () => {
    props.handleBack ? props.handleBack() : navigation.goBack();
    if (props.refresh) {
      props.refresh();
    }
  };
  return (
    <Pressable
      hitSlop={{top: 20, right: 20, left: 20, bottom: 20}}
      onPress={handlePress}>
      <View style={{flexDirection: 'row'}}>
        {
          <BackIcon
            color={color || '#333333'}
            width={scale(20)}
            height={scale(18)}
          />
        }
        {/* {isShowBackLabel && (
        <Text
          style={{
            marginLeft: scale(5),
            fontSize: moderateScale(16),
            color: white ? '#fff' : CommonColors.headerTextColor,
            fontWeight: 'bold',
          }}>
          {I18n.t('TEXT_APP_BACK')}
        </Text>
      )} */}
      </View>
    </Pressable>
  );
}
