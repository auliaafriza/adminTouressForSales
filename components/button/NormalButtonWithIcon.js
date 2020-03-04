import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import stylesGlobal from '../styles';

const NormalButtonWithIcon = ({
  onPress,
  text,
  subtext,
  buttonWidth,
  buttonHeight,
  buttonColor,
  textColor,
  nameicon,
  coloricon,
  sizeicon,
  textSize,
  textCenter = false,
  colorBorder,
  type,
  image,
}) => {
  const containerStyles = [styles.containerClear];
  if (buttonWidth) {
    containerStyles.push({ width: buttonWidth });
  }
  if (buttonHeight) {
    containerStyles.push({ height: buttonHeight });
  }
  if (buttonColor) {
    containerStyles.push({ backgroundColor: buttonColor });
  }
  if (colorBorder) {
    containerStyles.push({ borderColor: colorBorder });
  }
  const textStyles = [styles.text];
  if (textColor) {
    textStyles.push({ color: textColor });
  }
  if (textSize) {
    textStyles.push({ fontSize: textSize });
  }
  if (textCenter) {
    textStyles.push({ textAlign: 'center' });
  }

  return (
    <View style={containerStyles}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        {type == 'singleText' ? (
          <View
            style={[
              stylesGlobal.rowPadding,
              stylesGlobal.flexSize,
              stylesGlobal.center,
            ]}
          >
            <View style={[stylesGlobal.width20, stylesGlobal.center]}>
              {image ? (
                <View style={stylesGlobal.containerIcon20}>
                  <Image
                    source={nameicon}
                    style={stylesGlobal.imageIcon}
                    resizeMode="contain"
                  />
                </View>
              ) : (
                <Icon size={sizeicon} color={coloricon} name={nameicon} />
              )}
            </View>

            <View style={stylesGlobal.width80}>
              <Text style={textStyles}>{text}</Text>
            </View>
          </View>
        ) : (
          <View style={[stylesGlobal.rowPadding, stylesGlobal.flexSize]}>
            <View style={[stylesGlobal.width20, styles.positionButton]}>
              <Icon size={sizeicon} color={coloricon} name={nameicon} />
            </View>
            <View style={stylesGlobal.width80}>
              <Text style={textStyles}>{text}</Text>
              <Text style={textStyles}>{subtext}</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

NormalButtonWithIcon.propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string,
  subtext: PropTypes.string,
  nameicon: PropTypes.string,
  buttonWidth: PropTypes.string,
  buttonHeight: PropTypes.number,
  buttonColor: PropTypes.string,
  textColor: PropTypes.string,
  coloricon: PropTypes.string,
  sizeicon: PropTypes.number,
  textSize: PropTypes.number,
  textCenter: PropTypes.bool,
  colorBorder: PropTypes.string,
  type: PropTypes.string,
  image: PropTypes.bool,
};

export default NormalButtonWithIcon;
