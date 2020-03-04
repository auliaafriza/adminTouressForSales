import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Feather';

const ButtonCircleWithIcon = ({
  iconname,
  onPress,
  iconcolor,
  sizeicon,
  textColor,
  textSize,
  subtext,
  disable = false,
}) => {
  let subTittle;
  const textStyles = [styles.text];
  if (textColor) {
    textStyles.push({ color: textColor });
  }
  if (textSize) {
    textStyles.push({ fontSize: textSize });
  }
  if (subtext != undefined)
    subTittle = <Text style={textStyles}>{subtext}</Text>;

  return (
    <TouchableOpacity
      style={
        disable
          ? styles.containerClearCircleDisable
          : styles.containerClearCircle
      }
      onPress={disable ? null : onPress}
    >
      <View>
        <Icon
          size={sizeicon}
          color={disable ? '#777' : iconcolor}
          name={iconname}
        />
        {subTittle}
      </View>
    </TouchableOpacity>
  );
};

ButtonCircleWithIcon.propTypes = {
  iconname: PropTypes.string,
  sizeicon: PropTypes.number,
  iconcolor: PropTypes.string,
  onPress: PropTypes.func,
  textColor: PropTypes.string,
  textSize: PropTypes.number,
  subtext: PropTypes.string,
  disable: PropTypes.bool,
};

export default ButtonCircleWithIcon;
