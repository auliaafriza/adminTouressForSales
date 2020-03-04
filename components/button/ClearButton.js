import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text, Platform } from 'react-native';
import styles from './styles';

const ClearButton = ({ text, onPress, textColor, bold = false, textSize }) => {
  const textStyles = [styles.text];
  if (textColor) {
    textStyles.push({ color: textColor });
  }
  if (bold) {
    textStyles.push({ fontWeight: Platform.OS === 'ios' ? '600' : '300' });
  }
  if (textSize) {
    textStyles.push({ fontSize: textSize });
  }
  return (
    <TouchableOpacity style={styles.containerClear} onPress={onPress}>
      <View style={styles.wrapper}>
        <Text style={textStyles}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

ClearButton.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  textColor: PropTypes.string,
  bold: PropTypes.bool,
  textSize: PropTypes.number,
};

export default ClearButton;
