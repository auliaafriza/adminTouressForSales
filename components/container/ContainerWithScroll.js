import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import styles from './styles';

const ContainerWithScroll = ({ children, color, paddingtopcontainer }) => {
  const containerStyles = [styles.container];
  if (color) {
    containerStyles.push({ backgroundColor: color });
  }
  if (paddingtopcontainer) {
    containerStyles.push({ paddingTop: paddingtopcontainer });
  }

  return (
    <ScrollView style={styles.containerScroll}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={containerStyles}>{children}</View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

ContainerWithScroll.propTypes = {
  children: PropTypes.any,
  color: PropTypes.string,
  paddingtopcontainer: PropTypes.number,
};

export default ContainerWithScroll;
