import React from 'react';
import { View, Modal } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

const ModalBottom = ({ children, height, visible, isCenter }) => {
  const innerContainerStyles = [styles.innerContainer];
  if (height) {
    innerContainerStyles.push({ height: height });
  }
  if (isCenter) {
    innerContainerStyles.push({
      alignItems: 'center',
      justifyContent: 'center',
    });
  }
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={innerContainerStyles}>{children}</View>
      </View>
    </Modal>
  );
};

ModalBottom.propTypes = {
  children: PropTypes.any,
  height: PropTypes.string,
  visible: PropTypes.bool,
  isCenter: PropTypes.bool,
};

export default ModalBottom;
