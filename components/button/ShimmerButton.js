import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, Animated, Easing } from 'react-native';
import styles from './styles';

class ShimmerButton extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
  }
  componentDidMount() {
    this.animate();
  }
  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 800,
      delay: 1200,
      easing: Easing.linear,
    }).start(() => this.animate());
  }
  render() {
    const {
      onPress,
      text,
      buttonWidth,
      buttonHeight,
      buttonColor,
      textColor,
      textSize,
    } = this.props;

    const containerStyles = [styles.container];
    if (buttonWidth) {
      containerStyles.push({ width: buttonWidth });
    }
    if (buttonHeight) {
      containerStyles.push({ height: buttonHeight });
    }
    if (buttonColor) {
      containerStyles.push({ backgroundColor: buttonColor });
    }
    containerStyles.push({ borderRadius: 0 });

    const textStyles = [styles.text];
    if (textColor) {
      textStyles.push({ color: textColor });
    }
    if (textSize) {
      textStyles.push({ fontSize: textSize });
    }
    const left = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-10, 250],
    });

    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.3, 0.5, 0.7, 1],
      outputRange: [0, 0.5, 1, 0.5, 0],
    });
    return (
      <View style={[containerStyles, styles.borderWidth0]}>
        <TouchableOpacity
          style={[styles.button, styles.widthHeight, { overflow: 'hidden' }]}
          onPress={onPress}
        >
          <Animated.View
            style={[styles.containerAnimated, { left, opacity }]}
          />
          <Text style={textStyles}>{text}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

ShimmerButton.propTypes = {
  value: PropTypes.bool,
  onPress: PropTypes.func,
  text: PropTypes.string,
  buttonWidth: PropTypes.string,
  buttonHeight: PropTypes.number,
  buttonColor: PropTypes.string,
  textColor: PropTypes.string,
  bold: PropTypes.bool,
  textSize: PropTypes.number,
  colorBorder: PropTypes.string,
  borderBottom: PropTypes.number,
  colorBorderBottom: PropTypes.string,
  radiusBorder: PropTypes.number,
};
export default ShimmerButton;
