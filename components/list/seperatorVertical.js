import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styles from './styles';

const seperatorVertical = ({ heightsepar, widthsepar, colorsepar }) => {
  const separstyle = [styles.separatorvertical];
  if (heightsepar) {
    separstyle.push({ height: heightsepar });
  }
  if (widthsepar) {
    separstyle.push({ width: widthsepar });
  }
  if (colorsepar) {
    separstyle.push({ backgroundColor: colorsepar });
  }
  return <View style={separstyle} />;
};

seperatorVertical.propTypes = {
  heightsepar: PropTypes.number,
  widthsepar: PropTypes.number,
  colorsepar: PropTypes.string,
};

export default seperatorVertical;
