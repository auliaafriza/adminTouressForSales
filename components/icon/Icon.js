import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import stylesGlobal from '../../screens/styles';

const Icon = ({ source, size, color, background }) => {
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
  return (
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
};

export default Icon;
