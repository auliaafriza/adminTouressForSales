import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  TextInput,
  UIManager,
} from 'react-native';
import styles from './styles';

const { State: TextInputState } = TextInput;

export default class keyboardAvoid extends Component {
  state = {
    shift: new Animated.Value(0),
  };

  constructor(props) {
    super(props);
    this.keyboardDidShowSub = Keyboard.addListener(
      'keyboardDidShow',
      this.handleKeyboardDidShow
    );
    this.keyboardDidHideSub = Keyboard.addListener(
      'keyboardDidHide',
      this.handleKeyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  render() {
    const { children: renderProp } = this.props;
    const { shift } = this.state;
    return (
      <Animated.View
        style={[styles.container, { transform: [{ translateY: shift }] }]}
      >
        {renderProp()}
      </Animated.View>
    );
  }

  handleKeyboardDidShow = event => {
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(
      currentlyFocusedField,
      (originX, originY, width, height, pageX, pageY) => {
        const fieldHeight = height;
        const fieldTop = pageY;
        const gap = windowHeight - keyboardHeight - (fieldTop + fieldHeight);
        if (gap >= 0) {
          return;
        }
        Animated.timing(this.state.shift, {
          toValue: gap,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }
    );
  };

  handleKeyboardDidHide = () => {
    Animated.timing(this.state.shift, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
}

keyboardAvoid.propTypes = {
  children: PropTypes.func.isRequired,
};
