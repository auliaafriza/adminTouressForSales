import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text, Image, Platform } from 'react-native';
import styles from './styles';
import stylesGlobal from '../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA from 'react-native-vector-icons/FontAwesome';

const ClearButtonWithIcon = ({
  text,
  onPress,
  textColor,
  bold = false,
  textSize,
  colorIcon,
  iconSize,
  iconName,
  typeIcon,
  positionText,
  Img,
  heightImage,
  widthImage,
}) => {
  const textStyles = [styles.text];
  if (textColor) {
    textStyles.push({ color: textColor });
  }
  if (bold) {
    textStyles.push({ fontWeight: Platform.OS === 'ios' ? '600' : '300' });
  }
  if (textSize) {
    textStyles.push({ fontSize: textSize });
  }
  const IconStyles = [styles.IconImage];
  if (heightImage) {
    IconStyles.push({ height: heightImage });
  }
  if (widthImage) {
    IconStyles.push({ width: widthImage });
  }

  return (
    <TouchableOpacity style={styles.containerClear100} onPress={onPress}>
      <View style={styles.wrapper}>
        {positionText == 'kiri' ? (
          <View
            style={[
              stylesGlobal.center,
              stylesGlobal.rowNoPadding,
              stylesGlobal.width100,
            ]}
          >
            <Text style={textStyles}>{text} </Text>
            {typeIcon == 'FA' ? (
              <IconFA name={iconName} size={iconSize} color={colorIcon} />
            ) : (
              <Icon name={iconName} size={iconSize} color={colorIcon} />
            )}
          </View>
        ) : positionText == 'bawah' ? (
          <View style={styles.colNoPadding}>
            {typeIcon == 'FA' ? (
              <IconFA name={iconName} size={iconSize} color={colorIcon} />
            ) : typeIcon == 'image' ? (
              <Image source={Img} resizeMode="center" style={IconStyles} />
            ) : (
              <Icon name={iconName} size={iconSize} color={colorIcon} />
            )}
            <Text style={textStyles}>{text}</Text>
          </View>
        ) : (
          <View
            style={[
              stylesGlobal.center,
              stylesGlobal.rowNoPadding,
              stylesGlobal.width100,
            ]}
          >
            {typeIcon == 'FA' ? (
              <IconFA name={iconName} size={iconSize} color={colorIcon} />
            ) : (
              <Icon name={iconName} size={iconSize} color={colorIcon} />
            )}
            <Text style={textStyles}> {text}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

ClearButtonWithIcon.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  textColor: PropTypes.string,
  bold: PropTypes.bool,
  textSize: PropTypes.number,
  colorIcon: PropTypes.string,
  iconSize: PropTypes.number,
  iconName: PropTypes.string,
  typeIcon: PropTypes.string,
  positionText: PropTypes.string,
  Img: PropTypes.string,
  heightImage: PropTypes.number,
  widthImage: PropTypes.number,
};

export default ClearButtonWithIcon;
