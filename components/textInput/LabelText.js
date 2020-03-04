import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Animated } from 'react-native';
import styles from './styles';

class LabelText extends Component {
  state = {
    isFocused: false,
  };

  componentDidMount() {
    this.animatedIsFocused = new Animated.Value(
      this.props.value === '' ? 0 : 1
    );
  }

  componentDidUpdate() {
    Animated.timing(this.animatedIsFocused, {
      toValue: this.state.isFocused || this.props.value !== '' ? 1 : 0,
      duration: 200,
    }).start();
  }

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  render() {
    const { textColor, label, containerWidth, ...props } = this.props;
    const labelStyle = [
      {
        position: 'absolute',
        left: 0,
        top: this.animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [30, 12],
        }),
        fontSize: this.animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [18, 14],
        }),
        color: this.animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: ['#aaa', 'black'],
        }),
      },
    ];
    const textStyle = [styles.text];

    const containerStyles = [styles.containertext];

    if (containerWidth) {
      containerStyles.push({ width: containerWidth });
    }
    if (textColor) {
      textStyle.push({ color: textColor });
      labelStyle.push({
        color: this.animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: ['#aaa', 'black'],
        }),
      });
    }

    if (this.state.isFocused) {
      textStyle.push({ borderBottomColor: '#2962ff' });
    }
    return (
      <View style={containerStyles}>
        <TextInput
          {...props}
          style={textStyle}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
          underlineColorAndroid="black"
        />
      </View>
    );
  }
}

LabelText.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  textColor: PropTypes.string,
  containerWidth: PropTypes.string,
};

export default LabelText;
