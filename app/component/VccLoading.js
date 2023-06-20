import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator, Image} from 'react-native';
import Modal from 'react-native-modal';
import {CommonColors} from '../utils/CommonStyles';
import LoadingView from './loading/LoadingView';
export default class VccLoading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 7,
      types: [
        'CircleFlip',
        'Bounce',
        'Wave',
        'WanderingCubes',
        'Pulse',
        'ChasingDots',
        'ThreeBounce',
        'Circle',
        '9CubeGrid',
        'WordPress',
        'FadingCircle',
        'FadingCircleAlt',
        'Arc',
        'ArcAlt',
      ],
      size: 64,
      color: CommonColors.redColor,
    };
  }

  render() {
    const {types, index, color, size} = this.state;
    const {show = true} = this.props;
    const type = types[index];
    return (
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={show}
        avoidKeyboard
        useNativeDriver
        backdropTransitionOutTiming={0.2}
        // backdropTransitionInTiming={0}
        backdropColor={CommonColors.backdropColor}
        backdropOpacity={0.2}>
        <LoadingView style={styles.container} />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
