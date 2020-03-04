import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Animated, Keyboard, Text } from 'react-native';
import { TextWarning } from '../text';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import stylesGlobal from '../../components/styles';
import { Seperator } from '../list';

class FloatingLabelInput extends Component {
  constructor(props) {
    super(props);
    this.animatedIsFocused = new Animated.Value(this.props.value ? 1 : 0);
    this.state = {
      isFocused: false,
      animatedIsFocused: new Animated.Value(this.props.value ? 1 : 0),
    };
  }

  static propTypes = {
    value: PropTypes.string,
  };

  componentDidUpdate() {
    Animated.timing(this.state.animatedIsFocused, {
      toValue: this.state.isFocused || this.props.value ? 1 : 0,
      duration: 200,
    }).start();
  }

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  render() {
    const {
      textColor,
      label,
      error,
      disable,
      containerWidth,
      containerPadding,
      animated,
      placeholder,
      containerHeight,
      type,
      disableInput,
      ...props
    } = this.props;
    const labelStyle = [
      {
        position: 'absolute',
        left: 5,
        top: this.state.animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [30, 12],
        }),
        fontSize: this.state.animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [18, 14],
        }),
        color: this.state.animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: ['white', 'white'],
        }),
        marginBottom: 10,
      },
    ];
    const textStyle = [styles.text];

    const containerStyles = [styles.container];
    if (containerWidth) {
      containerStyles.push({ width: containerWidth });
    }
    if (disableInput == 'disable') {
      containerStyles.push({ backgroundColor: styles.$disabelColor });
    }
    if (containerHeight) {
      textStyle.push({ height: containerHeight });
    }
    if (containerPadding) {
      containerStyles.push({ paddingTop: containerPadding });
    }
    if (textColor) {
      textStyle.push({ color: textColor });
      textStyle.push({ borderBottomColor: styles.$blacklight2color });
      labelStyle.push({
        color: this.animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [styles.blacklight2color, styles.$blacklight2color],
        }),
      });
    }

    if (this.state.isFocused) {
      textStyle.push({ borderBottomColor: '#e6ca6b' });
    }

    return (
      <View style={containerStyles}>
        {animated == 'hidden' ? (
          <Text style={styles.labelStyleFix}>{label}</Text>
        ) : (
          <Animated.Text style={labelStyle}>{label}</Animated.Text>
        )}

        {type == 'button' ? (
          <View style={styles.flexrow}>
            <View style={stylesGlobal.width80}>
              <TextInput
                {...props}
                style={textStyle}
                onFocus={disable ? Keyboard.dismiss() : this.handleFocus}
                onBlur={this.handleBlur}
                blurOnSubmit
                underlineColorAndroid="transparent"
                editable={disable}
                selectTextOnFocus={disable}
                placeholder={placeholder}
              />
            </View>
            {this.props.value.length < 1 ? (
              <View style={[stylesGlobal.width20, styles.height80]}>
                <Ionicons
                  name="ios-arrow-down"
                  size={35}
                  color={styles.$DarkGrey}
                  style={styles.textIcon}
                />
                <Seperator
                  colorSepar={styles.blacklight2color}
                  heightSepar={1}
                />
              </View>
            ) : null}
          </View>
        ) : (
          <TextInput
            {...props}
            style={textStyle}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            blurOnSubmit
            underlineColorAndroid="transparent"
            editable={disable}
            selectTextOnFocus={disable}
            placeholder={placeholder}
          />
        )}
        <TextWarning show={true} textwarning={error} />
      </View>
    );
  }
}

FloatingLabelInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  disable: PropTypes.bool,
  textColor: PropTypes.string,
  containerWidth: PropTypes.string,
  animated: PropTypes.string,
  containerHeight: PropTypes.number,
  error: PropTypes.string,
  containerPadding: PropTypes.number,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  disableInput: PropTypes.string,
};

export default FloatingLabelInput;
