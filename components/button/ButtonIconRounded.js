import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, Image } from 'react-native';

import stylesGlobal from '../styles';
import styles from './styles';

const ButtonIconRounded = (icon, onPress, buttonColor, iconColor, text) => {
  const containerStyles = [styles.buttonRounded];
  if (buttonColor) {
    containerStyles.push({ backgroundColor: buttonColor });
  }
  if (iconColor) {
    containerStyles.push({ color: iconColor });
  }
  return (
    <View style={stylesGlobal.alignItemsCenter}>
      <TouchableOpacity onPress={onPress} style={styles.buttonIconPhoto}>
        <View style={stylesGlobal.containerIcon20}>
          <Image
            source={icon}
            style={[stylesGlobal.imageIcon, styles.tintColorWhite]}
          />
        </View>
      </TouchableOpacity>
      <Text>{text}</Text>
    </View>
  );
};

ButtonIconRounded.propTypes = {
  icon: PropTypes.string,
  onPress: PropTypes.func,
  buttonColor: PropTypes.string,
  iconColor: PropTypes.string,
  text: PropTypes.string,
};

export default ButtonIconRounded;
