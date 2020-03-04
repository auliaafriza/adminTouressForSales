import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import stylesGlobal from '../styles';
import PropTypes from 'prop-types';

const CardIcon = ({
  icon,
  onPress,
  textColor,
  widthcontainer,
  heightcontainer,
  text,
}) => {
  const textStyles = [styles.text];
  if (textColor) {
    textStyles.push({ color: textColor });
  }
  const containerstyles = [styles.containerIcon];
  if (widthcontainer) {
    containerstyles.push({ width: widthcontainer });
  }
  if (heightcontainer) {
    containerstyles.push({ height: heightcontainer });
  }
  return (
    <View style={[styles.margin, stylesGlobal.center]}>
      <TouchableOpacity style={containerstyles} onPress={onPress}>
        <Image style={styles.image90} source={icon} resizeMode="contain" />
      </TouchableOpacity>
      <View style={styles.justifyContent}>
        <Text style={styles.textlabel}>{text}</Text>
      </View>
    </View>
  );
};

CardIcon.propTypes = {
  onPress: PropTypes.func,
  icon: PropTypes.number,
  textColor: PropTypes.string,
  heightcontainer: PropTypes.string,
  widthcontainer: PropTypes.string,
  text: PropTypes.string,
};

export default CardIcon;
