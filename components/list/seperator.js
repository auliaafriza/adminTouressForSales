import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const separator = ({ widthsepar, colorSepar, heightSepar }) => {
  const separstyle = [styles.separator];

  if (widthsepar) {
    separstyle.push({ width: widthsepar });
  }
  if (colorSepar) {
    separstyle.push({ backgroundColor: colorSepar });
  }
  if (heightSepar) {
    separstyle.push({ height: heightSepar });
  }
  return <View style={separstyle} />;
};

separator.propTypes = {
  widthsepar: PropTypes.string,
  colorSepar: PropTypes.string,
  heightSepar: PropTypes.number,
};

export default separator;
