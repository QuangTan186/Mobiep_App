/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Appearance,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FillStar from '../../assets/image/fill_star.png';
import HollowStar from '../../assets/image/hollow_star.png';
import {FlatList, PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import Drag from './Star';
import {scale, verticalScale} from '../utils/scalingUtils';
import Header from '../component/Header';

const DragView = props => {
  const onDrag = (x, y) => {};
  const onDrop = (x, y) => {};
  return (
    <PanGestureHandler>
      <Animated.View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.dropZone}>
            <View style={styles.dropZoneItem}>
              <View />
            </View>
            <View style={styles.dropZoneItem}>
              <View />
            </View>
            <View style={styles.dropZoneItem}>
              <View />
            </View>
          </View>
          <FlatList
            data={[1, 2, 3, 4, 5]}
            renderItem={(item, index) => (
              <Drag onDrag={onDrag} onDrop={onDrop}>
                <View style={styles.dragItem} />
              </Drag>
            )}
            style={{flex: 1, backgroundColor: 'yellow'}}

            //   style={{backgroundColor: 'blue'}}
          />
          {/* <View style={styles.dragZone}>
          <Drag onDrag={onDrag} onDrop={onDrop}>
            <View style={styles.dragItem} />
          </Drag>
          <Drag onDrag={onDrag} onDrop={onDrop}>
            <View style={styles.dragItem} />
          </Drag>
          <Drag onDrag={onDrag} onDrop={onDrop}>
            <View style={styles.dragItem} />
          </Drag>
          <Drag onDrag={onDrag} onDrop={onDrop}>
            <View style={styles.dragItem} />
          </Drag>
          <Drag onDrag={onDrag} onDrop={onDrop}>
            <View style={styles.dragItem} />
          </Drag>
        </View> */}
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};
const styles = StyleSheet.create({
  dragItem: {
    width: 100,
    height: verticalScale(200),
    backgroundColor: 'red',
    marginBottom: verticalScale(50),
    // zIndex: 999,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
  },
  dropZone: {
    width: scale(200),
    // flex: 1,
    height: '100%',
    overflow: 'hidden',
  },
  body: {
    flexDirection: 'row',
    position: 'relative',
    flex: 1,
    overflow: 'hidden',
    // height: verticalScale(300),
  },
  dropZoneItem: {
    height: verticalScale(50),
    borderColor: '#000',
    borderWidth: 1,
  },
});

export default DragView;
