import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import stylesGlobal from '../styles';
import { Seperator } from '../list';

class radioButton extends Component {
  render() {
    const {
      label,
      onPress,
      value,
      targetValue,
      position = 'kiri',
    } = this.props;

    return (
      <TouchableOpacity
        style={[styles.marginBottom30, stylesGlobal.width100]}
        onPress={onPress}
      >
        {position == 'kanan' ? (
          <View
            style={[
              styles.buttonContainerKanan,
              stylesGlobal.width100,
              stylesGlobal.paddingLeftRight10,
            ]}
          >
            <TouchableOpacity style={styles.circle} onPress={onPress}>
              {targetValue == value && <View style={styles.checkedCircle} />}
            </TouchableOpacity>
            <Text style={styles.paddingLeft10}>{label}</Text>
          </View>
        ) : (
          <View
            style={[
              styles.buttonContainer,
              stylesGlobal.width100,
              stylesGlobal.paddingLeftRight10,
            ]}
          >
            <View style={[stylesGlobal.width70, stylesGlobal.rowStart]}>
              <Text>{label}</Text>
            </View>
            <View style={[stylesGlobal.width30, stylesGlobal.rowEnd]}>
              <TouchableOpacity style={styles.circle} onPress={onPress}>
                {targetValue == value && <View style={styles.checkedCircle} />}
              </TouchableOpacity>
            </View>
          </View>
        )}
        {position == 'kanan' ? null : (
          <View
            style={[
              stylesGlobal.width100,
              stylesGlobal.paddingLeftRight10,
              stylesGlobal.center,
            ]}
          >
            <Seperator
              colorSepar={styles.$borderColor}
              widthsepar="100%"
              heightSepar={1}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

radioButton.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  value: PropTypes.string,
  targetValue: PropTypes.string,
  position: PropTypes.string,
};

export default radioButton;
