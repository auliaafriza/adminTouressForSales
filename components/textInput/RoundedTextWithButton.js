import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
  Image,
  Animated,
  Keyboard,
  Text,
  TouchableOpacity,
} from 'react-native';
import { TextWarning } from '../text';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import stylesGlobal from '../styles';
import IconCalendar from '../../assets/Icon/calendar.png';
import IconClock from '../../assets/Icon/clock.png';

class RoundedTextInputWithButton extends Component {
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
      placeholder,
      containerHeight,
      type,
      disableInput,
      buttonPosition,
      onPress,
      status,
      showIcon = true,
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
    const viewStyle =
      status != 'fixPrice'
        ? [stylesGlobal.width100, styles.marginBottom20]
        : stylesGlobal.width100;

    const container30Styles = [styles.containerRoundedTextButton];
    const container70Styles = [styles.containerRoundedTextButton70];
    const containerStyles = [styles.textInputStyle];
    if (disableInput == 'disable') {
      container30Styles.push({ backgroundColor: styles.$disabelColor });
      container70Styles.push({ backgroundColor: styles.$disabelColor });
      containerStyles.push({ backgroundColor: styles.$disabelColor });
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
      textStyle.push({ borderBottomColor: styles.$goldcolor });
    }

    return (
      <View styles={viewStyle}>
        <Text style={[stylesGlobal.colorBlackLight, styles.marginBottom10]}>
          {label}
        </Text>
        {buttonPosition == 'right' ? (
          <TouchableOpacity
            onPress={onPress}
            style={[stylesGlobal.rowNoPadding, stylesGlobal.center]}
          >
            <TextInput
              {...props}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              blurOnSubmit
              underlineColorAndroid="transparent"
              editable={disable ? false : true}
              selectTextOnFocus={disable ? false : true}
              placeholder={placeholder}
              style={[
                containerStyles,
                stylesGlobal.width100,
                stylesGlobal.paddingRight20,
              ]}
            />
            <TouchableOpacity onPress={onPress} style={styles.styleTouchable}>
              <Ionicons
                name="ios-arrow-down"
                size={25}
                color={showIcon ? styles.$blacklightcolor : 'transparent'}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ) : (
          <View style={[stylesGlobal.width100, stylesGlobal.rowNoPadding]}>
            <View style={container30Styles}>
              <TouchableOpacity onPress={onPress}>
                {type == 'date' ? (
                  <View style={stylesGlobal.containerIcon20}>
                    <Image
                      style={stylesGlobal.imageIcon}
                      source={IconCalendar}
                      resizeMode="contain"
                    />
                  </View>
                ) : (
                  <View style={stylesGlobal.containerIcon20}>
                    <Image
                      style={stylesGlobal.imageIcon}
                      source={IconClock}
                      resizeMode="contain"
                    />
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <View style={container70Styles}>
              <TextInput
                {...props}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                blurOnSubmit
                underlineColorAndroid="transparent"
                editable={disable ? false : true}
                selectTextOnFocus={disable ? false : true}
                placeholder={placeholder}
              />
            </View>
          </View>
        )}
        <TextWarning
          show={true}
          textwarning={error}
          alignSelfText="flex-start"
        />
      </View>
    );
  }
}

RoundedTextInputWithButton.propTypes = {
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
  buttonPosition: PropTypes.string,
  onPress: PropTypes.func,
  status: PropTypes.string,
  showIcon: PropTypes.bool,
};

export default RoundedTextInputWithButton;
