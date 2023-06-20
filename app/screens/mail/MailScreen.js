import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../component/Header';
import BackButton from '../../component/BackButton';
import ShopIcon from '../../../assets/image/Shirt/logo(2).png';
import {scale} from '../../utils/scalingUtils';
const MailScreen = props => {
  return (
    <View style={styles.container}>
      <Header
        center={'Hộp thư'}
        left={
          <Image
            source={ShopIcon}
            style={{width: scale(42), height: scale(42)}}
          />
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default MailScreen;
