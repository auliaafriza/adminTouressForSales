import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import stylesGlobal from '../styles';

const Card = ({
  children,
  color,
  onPress,
  widthCard,
  topMargin,
  type,
  bottomMargin,
  heightCard,
  alignself,
  border,
  overflow = false,
  paddingHorizontal,
  paddingVertical,
}) => {
  const containerFlatStyle = [styles.containerCardNoShadow];
  const containerStyles = [styles.containerCardView];
  if (alignself) {
    containerFlatStyle.push({ alignSelf: alignself });
    containerStyles.push({ alignSelf: alignself });
  }
  if (color) {
    containerFlatStyle.push({ backgroundColor: color });
    containerStyles.push({ backgroundColor: color });
  }
  if (border) {
    containerFlatStyle.push({ borderColor: border });
    containerFlatStyle.push({ borderWidth: 1 });
  }
  if (overflow) {
    containerFlatStyle.push({ overflow: 'hidden' });
    containerStyles.push({ overflow: 'hidden' });
  }
  if (widthCard) {
    containerFlatStyle.push({ width: widthCard });
    containerStyles.push({ width: widthCard });
  }
  if (topMargin) {
    containerFlatStyle.push({ marginTop: topMargin });
    containerStyles.push({ marginTop: topMargin });
  }
  if (bottomMargin) {
    containerFlatStyle.push({ marginBottom: bottomMargin });
    containerStyles.push({ marginBottom: bottomMargin });
  }
  if (heightCard) {
    containerFlatStyle.push({ height: heightCard });
    containerStyles.push({ height: heightCard });
  }
  if (paddingVertical) {
    containerStyles.push({ paddingVertical: paddingVertical });
  }
  if (paddingHorizontal) {
    containerStyles.push({ paddingHorizontal: paddingHorizontal });
  }
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={type == 'Flat' ? containerFlatStyle : containerStyles}>
        <View style={stylesGlobal.hiddenRadius}>{children}</View>
      </View>
    </TouchableWithoutFeedback>
  );
};

Card.propTypes = {
  children: PropTypes.any,
  color: PropTypes.string,
  onPress: PropTypes.func,
  widthCard: PropTypes.string,
  topMargin: PropTypes.number,
  type: PropTypes.string,
  bottomMargin: PropTypes.number,
  heightCard: PropTypes.number,
  overflow: PropTypes.bool,
  alignself: PropTypes.string,
  border: PropTypes.string,
  paddingHorizontal: PropTypes.number,
  paddingVertical: PropTypes.number,
};

export default Card;
