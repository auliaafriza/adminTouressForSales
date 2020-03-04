import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import stylesGlobal from '../styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

import IconFA from 'react-native-vector-icons/FontAwesome';

const CardWithIcon = ({
  iconname,
  text,
  containerWidth,
  containerHeight,
  onPress,
  type,
}) => {
  const containerStyles = [styles.containerCardViewAccount];
  if (containerHeight) {
    containerStyles.push({ height: containerHeight });
  }
  if (containerWidth) {
    containerStyles.push({ width: containerWidth });
  }

  return (
    <TouchableOpacity
      style={[
        stylesGlobal.row100,
        stylesGlobal.alignItemsCenter,
        stylesGlobal.padding20,
      ]}
    >
      <View
        style={[
          stylesGlobal.containerIcon30,
          stylesGlobal.padding5,
          stylesGlobal.marginRight20,
        ]}
      >
        <Image
          style={stylesGlobal.imageIcon}
          resizeMode="contain"
          source={iconname}
        />
      </View>
      <Text style={stylesGlobal.text16}>{text}</Text>
    </TouchableOpacity>
  );
};

CardWithIcon.propTypes = {
  onPress: PropTypes.func,
  iconname: PropTypes.string,
  text: PropTypes.string,
  containerHeight: PropTypes.string,
  containerWidth: PropTypes.string,
  namabutton1: PropTypes.string,
  namabutton2: PropTypes.string,
  warnabutton1: PropTypes.string,
  warnabutton2: PropTypes.string,
  iconname1: PropTypes.string,
  type: PropTypes.string,
};

export default CardWithIcon;
