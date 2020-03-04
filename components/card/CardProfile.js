import React from 'react';
import { Image, Text, ImageBackground, View } from 'react-native';
import styles from './styles';
import stylesGlobal from '../styles';
import PropTypes from 'prop-types';
import IMG_ICON from './../../assets/images/NoImage.png';

const CardProfile = ({
  namaFirst,
  namaLast,
  companyid,
  icon,
  imageback,
  imageHeight,
  imageWidth,
}) => {
  const imagestyle = [styles.imagesBG];
  if (imageHeight) {
    imagestyle.push({ height: imageHeight });
  }
  if (imageWidth) {
    imagestyle.push({ width: imageWidth });
  }

  return (
    <View style={styles.containerImage}>
      <ImageBackground
        source={imageback}
        style={styles.containerImage}
        resizeMode="cover"
      >
        <View style={[styles.paddingLeftRight, stylesGlobal.center]}>
          <View style={[stylesGlobal.rowNoPadding, stylesGlobal.width90]}>
            {icon != undefined && icon != '' ? (
              <Image
                style={[imagestyle, styles.justifyContent]}
                source={{ uri: icon }}
              />
            ) : icon == '' ? (
              <Image
                style={[imagestyle, styles.justifyContent]}
                source={IMG_ICON}
              />
            ) : (
              <Image
                style={[imagestyle, styles.justifyContent]}
                source={IMG_ICON}
              />
            )}
          </View>
          <Text style={[stylesGlobal.textBold, stylesGlobal.text14]}>
            {namaFirst} {namaLast}
          </Text>
          <Text style={stylesGlobal.text12}>Company ID: {companyid}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

CardProfile.propTypes = {
  namaFirst: PropTypes.string,
  namaLast: PropTypes.string,
  companyid: PropTypes.string,
  icon: PropTypes.string,
  imageback: PropTypes.number,
  onPress: PropTypes.func,
  imageHeight: PropTypes.number,
  imageWidth: PropTypes.number,
};

export default CardProfile;
