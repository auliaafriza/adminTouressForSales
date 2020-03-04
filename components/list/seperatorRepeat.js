import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import stylesGlobal from '../styles';

import styles from './styles';

class seperatorRepeat extends Component {
  render() {
    const {
      repeat,
      widthsepar,
      colorSepar,
      heightSepar,
      marginNull = false,
      rounded = false,
      type = 'Horizontal',
    } = this.props;
    let seperator = new Array(repeat).fill(0);
    const separstyle = [
      type == 'Horizontal'
        ? styles.separatorRepeat
        : styles.separatorRepeatVertical,
    ];

    if (widthsepar) {
      separstyle.push({ width: widthsepar });
    }
    if (colorSepar) {
      separstyle.push({ backgroundColor: colorSepar });
    }
    if (heightSepar) {
      separstyle.push({ height: heightSepar });
    }
    if (marginNull) {
      separstyle.push({ marginTop: 0, marginBottom: 0 });
    }
    if (rounded) {
      separstyle.push({ borderRadius: 10 });
    }
    return type == 'Horizontal' ? (
      <View style={stylesGlobal.row90}>
        {seperator.map(i => {
          {
            return <View key={i} style={separstyle} />;
          }
        })}
      </View>
    ) : (
      <View>
        {seperator.map(i => {
          {
            return <View key={i} style={separstyle} />;
          }
        })}
      </View>
    );
  }
}

seperatorRepeat.propTypes = {
  widthsepar: PropTypes.number,
  colorSepar: PropTypes.string,
  heightSepar: PropTypes.number,
  repeat: PropTypes.number,
  marginNull: PropTypes.bool,
  rounded: PropTypes.bool,
  type: PropTypes.string,
};

export default seperatorRepeat;
