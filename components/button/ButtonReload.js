import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ButtonReload = ({
  widthButton,
  heightButton,
  colorButton,
  radiusButton,
  onPress,
  iconcolor,
  sizeicon,
  nameIcon = 'reload',
  colorBorder,
  widthBorder,
}) => {
  const buttonStyles = [styles.buttonCircle];
  if (widthButton) {
    buttonStyles.push({ width: widthButton });
  }
  if (heightButton) {
    buttonStyles.push({ height: heightButton });
  }
  if (heightButton) {
    buttonStyles.push({ backgroundColor: colorButton });
  }
  if (radiusButton) {
    buttonStyles.push({ borderRadius: radiusButton });
  }
  if (colorBorder) {
    buttonStyles.push({ borderColor: colorBorder });
  }
  if (widthBorder) {
    buttonStyles.push({ borderWidth: widthBorder });
  }

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      <Icon size={sizeicon} color={iconcolor} name={nameIcon} />
    </TouchableOpacity>
  );
};

ButtonReload.propTypes = {
  widthButton: PropTypes.number,
  heightButton: PropTypes.number,
  colorButton: PropTypes.string,
  radiusButton: PropTypes.number,
  iconname: PropTypes.string,
  sizeicon: PropTypes.number,
  iconcolor: PropTypes.string,
  onPress: PropTypes.func,
  nameIcon: PropTypes.string,
  colorBorder: PropTypes.string,
  widthBorder: PropTypes.string,
};

export default ButtonReload;
