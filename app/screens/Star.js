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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FillStar from '../../assets/image/fill_star.png';
import HollowStar from '../../assets/image/hollow_star.png';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
const Drag = props => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const {onDrag, onDrop} = props;
  const drag = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.x = x.value;
      context.y = y.value;
    },
    onActive: (event, context) => {
      console.log('drag', event.translationX, event.translationY);
      x.value = event.translationX + context.x;
      y.value = event.translationY + context.y;
      onDrag && runOnJS(onDrag)(x.value, y.value);
    },
    onEnd: event => {
      x.value = 0;
      y.value = 0;
      onDrop && runOnJS(onDrop)(event.absoluteX, event.absoluteY);
    },
  });
  return (
    <PanGestureHandler onGestureEvent={drag}>
      <Animated.View
        style={[
          useAnimatedStyle(() => {
            return {
              transform: [{translateX: x.value}, {translateY: y.value}],
            };
          }),
        ]}>
        {props.children}
      </Animated.View>
    </PanGestureHandler>
  );
};
const styles = StyleSheet.create({
  dragItem: {
    width: 40,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 20,
  },
});
export default Drag;
