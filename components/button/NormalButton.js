import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './styles';

const NormalButton = ({
  value,
  onPress,
  text,
  buttonWidth,
  buttonHeight,
  buttonColor,
  textColor,
  textSize,
  colorBorder,
  borderBottom,
  colorBorderBottom,
  radiusBorder,
  paddingBottomText,
  shadow = false,
  disabled = false,
  isLoading,
}) => {
  const containerStyles = [shadow ? styles.containerShadow : styles.container];
  if (buttonWidth) {
    containerStyles.push({ width: buttonWidth });
  }
  if (buttonHeight) {
    containerStyles.push({ height: buttonHeight });
  }
  if (buttonColor) {
    containerStyles.push({ backgroundColor: buttonColor });
  }
  if (colorBorder) {
    containerStyles.push({ borderColor: colorBorder });
  }
  if (borderBottom) {
    containerStyles.push({ borderBottomWidth: borderBottom });
  }
  if (colorBorderBottom) {
    containerStyles.push({ borderBottomColor: colorBorderBottom });
  }
  if (radiusBorder) {
    containerStyles.push({ borderRadius: radiusBorder });
  }

  const textStyles = [styles.text];
  if (textColor) {
    textStyles.push({ color: textColor });
  }
  if (textSize) {
    textStyles.push({ fontSize: textSize });
  }
  if (paddingBottomText) {
    textStyles.push({ paddingBottom: paddingBottomText });
  }
  return (
    <View style={containerStyles}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        disabled={disabled}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={textStyles}>{text}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

NormalButton.propTypes = {
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
  shadow: PropTypes.bool,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  paddingBottomText: PropTypes.number,
};

export default NormalButton;
