import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator, Image} from 'react-native';
import {scale} from '../../utils/scalingUtils';

const LoadingView = props => {
  const {style} = props;
  return (
    <View style={[styles.container, style]}>
      <Image
        source={require('../../../assets/image/loading.gif')}
        style={{width: scale(30), height: scale(30)}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'transparent',
  },
});

export default LoadingView;
