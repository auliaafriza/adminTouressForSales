import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Icon } from '../../components/icon';
import styles from './styles';

const TextWithIcon = ({
  text,
  iconName,
  iconColor,
  bold,
  textSize,
  iconSize,
}) => {
  const stylesText = [styles.textTitle];

  if (bold) {
    stylesText.push({ fontWeight: 'bold' });
  }
  if (textSize) {
    stylesText.push({ fontSize: textSize });
  }
  return (
    <View style={[styles.row, { alignItems: 'flex-end' }]}>
      <Icon
        size={iconSize ? iconSize : 24}
        source={iconName}
        color={iconColor}
      />
      <Text style={[stylesText, styles.marginLeft10]}>{text}</Text>
    </View>
  );
};

TextWithIcon.propTypes = {
  text: PropTypes.string,
  iconName: PropTypes.string,
  iconColor: PropTypes.string,
  bold: PropTypes.bool,
  textSize: PropTypes.number,
  iconSize: PropTypes.number,
};
export default TextWithIcon;
