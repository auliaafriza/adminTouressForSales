import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { ClearButton } from '../button';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const TextWithClearButton = ({
  text,
  buttonText,
  buttonTextColor,
  coloricon,
  iconname,
  onPress,
  bold = false,
  fonttext,
  sizebutton,
  colortext,
  sizeIcon,
}) => {
  const textstyle = [styles.text];
  if (fonttext) {
    textstyle.push({ fontSize: fonttext });
  }

  if (colortext) {
    textstyle.push({ color: colortext });
  }
  return (
    <View style={styles.container}>
      <Text style={textstyle}>{text}</Text>
      <ClearButton
        textColor={buttonTextColor}
        text={buttonText}
        onPress={onPress}
        bold={bold}
        textSize={sizebutton}
      />
      <Icon size={sizeIcon} color={coloricon} name={iconname} />
    </View>
  );
};

TextWithClearButton.propTypes = {
  text: PropTypes.string,
  buttonText: PropTypes.string,
  buttonTextColor: PropTypes.string,
  onPress: PropTypes.func,
  bold: PropTypes.bool,
  coloricon: PropTypes.string,
  iconname: PropTypes.string,
  fonttext: PropTypes.number,
  colortext: PropTypes.string,
  fontSize: PropTypes.number,
  sizebutton: PropTypes.number,
  sizeIcon: PropTypes.number,
};
export default TextWithClearButton;
