import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const separatorNew = ({ widthsepar, colorSepar, heightSepar }) => {
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
  return <View style={[separstyle, { marginRight: 5, height: 1 }]} />;
};

separatorNew.propTypes = {
  widthsepar: PropTypes.string,
  colorSepar: PropTypes.string,
  heightSepar: PropTypes.number,
};

export default separatorNew;
