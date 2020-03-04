import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
  Animated,
  Keyboard,
  Text,
  TouchableOpacity,
} from 'react-native';
import { TextWarning } from '../text';
import styles from './styles';
import stylesGlobal from '../styles';

class RoundedTextInput extends Component {
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
      disable = false,
      containerWidth,
      containerPadding,
      placeholder,
      containerHeight,
      disableInput,
      marginBottom,
      required = false,
      multiline,
      onPress,
      currency,
      button = false,
      positionError = 'up',
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
    const marginStyles = [styles.marginBottomView];

    const textInputStyles = [styles.textInputStyle];
    if (containerWidth) {
      textInputStyles.push({ width: containerWidth });
    }
    if (disableInput == 'disable') {
      textInputStyles.push({ backgroundColor: styles.$disabelColor });
    }
    if (containerHeight) {
      textInputStyles.push({ height: containerHeight });
    }
    if (containerPadding) {
      textInputStyles.push({ paddingTop: containerPadding });
    }
    if (marginBottom) {
      marginStyles.push({ marginBottom: marginBottom });
    }
    if (textColor) {
      textStyle.push({ color: textColor });
      textStyle.push({ borderBottomColor: styles.$blacklight2color });
      labelStyle.push({
        color: this.animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [styles.$blacklight2color, styles.$blacklight2color],
        }),
      });
    }

    if (this.state.isFocused) {
      textStyle.push({ borderBottomColor: '#e6ca6b' });
    }

    return (
      <View styles={stylesGlobal.width100}>
        <View style={stylesGlobal.row100}>
          <View style={[stylesGlobal.width50, styles.marginBottom10]}>
            <View style={stylesGlobal.row100}>
              <Text
                style={[
                  stylesGlobal.colorBlackLight,
                  stylesGlobal.textSemiBold,
                ]}
              >
                {label}
              </Text>
              {required ? (
                <Text
                  style={[stylesGlobal.textSemiBold, stylesGlobal.colorRed]}
                >
                  *
                </Text>
              ) : null}
            </View>
          </View>

          {positionError == 'up' ? (
            <View style={stylesGlobal.width50}>
              <TextWarning show={true} textwarning={error} />
            </View>
          ) : null}
        </View>

        <View style={marginStyles}>
          {currency ? (
            <View style={[stylesGlobal.row100, textInputStyles]}>
              <View
                style={[
                  stylesGlobal.width30,
                  styles.borderRight1,
                  stylesGlobal.center,
                  stylesGlobal.paddingRight20,
                ]}
              >
                <Text style={stylesGlobal.textAlignVerCenter}>{currency} </Text>
              </View>
              <View
                style={[
                  stylesGlobal.width70,
                  stylesGlobal.justifyContentCenter,
                  stylesGlobal.alignItemsEnd,
                  stylesGlobal.paddingRight20,
                ]}
              >
                <TextInput
                  {...props}
                  onFocus={disable ? Keyboard.dismiss() : this.handleFocus}
                  onBlur={this.handleBlur}
                  blurOnSubmit
                  underlineColorAndroid="transparent"
                  editable={disable ? false : true}
                  selectTextOnFocus={disable ? false : true}
                  placeholder={placeholder}
                  multiline={multiline}
                />
              </View>
            </View>
          ) : button ? (
            <TouchableOpacity
              onPress={onPress}
              style={[stylesGlobal.rowNoPadding, stylesGlobal.center]}
            >
              <TextInput
                {...props}
                onFocus={disable ? Keyboard.dismiss() : this.handleFocus}
                onBlur={this.handleBlur}
                blurOnSubmit
                underlineColorAndroid="transparent"
                editable={disable ? false : true}
                selectTextOnFocus={disable ? false : true}
                placeholder={placeholder}
                style={textInputStyles}
                multiline={multiline}
              />
            </TouchableOpacity>
          ) : (
            <TextInput
              {...props}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              blurOnSubmit
              underlineColorAndroid="transparent"
              editable={true}
              selectTextOnFocus={true}
              placeholder={placeholder}
              style={textInputStyles}
              multiline={multiline}
            />
          )}
          {positionError == 'bottom' ? (
            <TextWarning
              show={true}
              textwarning={error}
              alignSelfText="flex-start"
            />
          ) : null}
        </View>
      </View>
    );
  }
}

RoundedTextInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  disable: PropTypes.bool,
  textColor: PropTypes.string,
  containerWidth: PropTypes.string,
  containerHeight: PropTypes.number,
  error: PropTypes.string,
  containerPadding: PropTypes.number,
  placeholder: PropTypes.string,
  disableInput: PropTypes.string,
  marginBottom: PropTypes.number,
  multiline: PropTypes.bool,
  required: PropTypes.bool,
  currency: PropTypes.string,
  button: PropTypes.bool,
  onPress: PropTypes.func,
  positionError: PropTypes.string,
};

export default RoundedTextInput;
