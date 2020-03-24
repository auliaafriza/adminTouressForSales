import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import stylesGlobal from '../../screens/styles';

import Ionicons from '@expo/vector-icons/Ionicons';
import IconHome from '../../assets/Icon/home.png';

const Icon = ({ source, size, color, background, type, onPress }) => {
  const containerStyles = [styles.container];
  const iconStyles = [styles.icon];
  if (size) {
    containerStyles.push({ width: size, height: size });
  }
  if (color) {
    iconStyles.push({ tintColor: color });
  }
  if (background) {
    iconStyles.push({ backgroundColor: background });
  }
  return type == 'headerleft' ? (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.marginLeft10,
        styles.paddingLeft10,
        styles.flexDirectionRow,
      ]}
    >
      <Ionicons name="ios-arrow-back" size={30} color="#252525" />
    </TouchableOpacity>
  ) : type == 'headerright' ? (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.marginRight10, styles.paddingRight10]}
    >
      <View style={styles.image20}>
        <Image
          style={styles.width100height100}
          resizeMode="contain"
          source={IconHome}
        />
      </View>
    </TouchableOpacity>
  ) : (
    <View style={containerStyles}>
      <Image
        source={source}
        style={[stylesGlobal.image, iconStyles]}
        resizeMode="contain"
      />
    </View>
  );
};

Icon.propTypes = {
  source: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  background: PropTypes.string,
  type: PropTypes.string,
  onPress: PropTypes.func,
};

export default Icon;
