'use-strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import styles from './styles';
import { ButtonWithIcon } from '../button/';

class InputDuration extends Component {
  render() {
    const { colorbutton, colorradius } = this.props;
    return (
      <View style={styles.containertext}>
        <View style={styles.flexrow}>
          <View style={styles.col30}>
            <ButtonWithIcon
              iconname="remove-circle-outline"
              buttoncolor={colorbutton}
              radiusbutton="radius"
              radiusColor={colorradius}
              onPress={this.decrement}
              iconcolor={styles.$goldcolor}
              sizeicon={20}
            />
          </View>
          <View style={styles.col70}>
            <TextInput
              keyboardType="number-pad"
              value={0}
              style={styles.textinputduration}
            />
          </View>
          <View style={styles.col30}>
            <ButtonWithIcon
              iconname="add-circle-outline"
              buttoncolor={colorbutton}
              radiusbutton="radius"
              radiusColor={colorradius}
              onPress={this.increment}
              iconcolor={styles.$goldcolor}
              sizeicon={20}
            />
          </View>
        </View>
      </View>
    );
  }
}

InputDuration.propTypes = {
  colorbutton: PropTypes.string,
  colorradius: PropTypes.string,
  value: PropTypes.number,
};

export default InputDuration;
