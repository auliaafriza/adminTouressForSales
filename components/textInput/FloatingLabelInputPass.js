import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Animated, Text } from 'react-native';
import { TextWarning } from '../text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import stylesGlobal from '../styles';
class FloatingLabelInputPass extends Component {
  state = {
    isFocused: false,
    animatedIsFocused: new Animated.Value(this.props.value ? 1 : 0),
    icEye: 'visibility-off',
    password: true,
  };

  constructor(props) {
    super(props);
    this.animatedIsFocused = new Animated.Value(this.props.value ? 1 : 0);
  }

  changePwdType = () => {
    let newState;
    if (this.state.password) {
      newState = {
        icEye: 'visibility',
        password: false,
      };
    } else {
      newState = {
        icEye: 'visibility-off',
        password: true,
      };
    }

    // set new state value
    this.setState(newState);
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
      containerHeight,
      disableInput,
      required = false,
      placeholder,
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

    const textInputStyles = [styles.textInputStyle];
    if (containerWidth) {
      textInputStyles.push({ width: containerWidth });
    }
    if (disableInput == 'disable') {
      textInputStyles.push({ backgroundColor: styles.$disabelColor });
    }
    if (containerHeight) {
      textStyle.push({ height: containerHeight });
    }
    if (containerPadding) {
      textInputStyles.push({ paddingTop: containerPadding });
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
          <Text style={[stylesGlobal.colorBlackLight, styles.marginBottom10]}>
            {label}
          </Text>
          {required ? (
            <Text
              style={[
                stylesGlobal.textSemiBold,
                styles.marginBottom10,
                stylesGlobal.colorRed,
              ]}
            >
              *
            </Text>
          ) : null}
        </View>
        <View style={styles.marginBottom20}>
          <TextInput
            {...props}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            blurOnSubmit
            underlineColorAndroid="transparent"
            editable={disable}
            selectTextOnFocus={disable}
            secureTextEntry={this.state.password}
            placeholder={placeholder}
            style={textInputStyles}
          />
          <Icon
            style={styles.icon}
            name={this.state.icEye}
            size={20}
            color="#343434"
            onPress={this.changePwdType}
          />
          <TextWarning show={true} textwarning={error} />
        </View>
      </View>
    );
  }
}

FloatingLabelInputPass.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  disable: PropTypes.bool,
  textColor: PropTypes.string,
  containerWidth: PropTypes.string,
  containerHeight: PropTypes.number,
  error: PropTypes.string,
  containerPadding: PropTypes.number,
  disableInput: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

export default FloatingLabelInputPass;
