import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const ButtonWithIcon = ({
  iconname,
  onPress,
  iconcolor,
  sizeicon,
  textColor,
  textSize,
  subtext,
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
    <TouchableOpacity style={styles.containerClear} onPress={onPress}>
      <View>
        <Icon size={sizeicon} color={iconcolor} name={iconname} />
        {subTittle}
      </View>
    </TouchableOpacity>
  );
};

ButtonWithIcon.propTypes = {
  iconname: PropTypes.string,
  sizeicon: PropTypes.number,
  iconcolor: PropTypes.string,
  onPress: PropTypes.func,
  textColor: PropTypes.string,
  textSize: PropTypes.number,
  subtext: PropTypes.string,
};

export default ButtonWithIcon;
