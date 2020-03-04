import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

const Badge = ({
  typeIcon = false,
  iconType,
  stylesImage,
  imageSource,
  marginLeftBadge,
  sizeIcon,
  colorIcon,
}) => {
  const containerStyles = [
    typeIcon ? styles.badgeIconContainerIcon : styles.badgeIconContainer,
  ];
  if (marginLeftBadge) {
    containerStyles.push({ marginLeft: marginLeftBadge });
  }
  return (
    <View style={containerStyles}>
      {typeIcon ? (
        iconType == 'image' ? (
          <Image
            source={imageSource}
            resizeMode="contain"
            style={stylesImage}
          />
        ) : (
          <Ionicons name={imageSource} size={sizeIcon} color={colorIcon} />
        )
      ) : null}
      <View style={styles.badgeIconStyle} />
    </View>
  );
};

Badge.propTypes = {
  typeIcon: PropTypes.bool,
  marginLeftBadge: PropTypes.number,
  imageSource: PropTypes.string,
  iconType: PropTypes.string,
  stylesImage: PropTypes.object,
  sizeIcon: PropTypes.number,
  colorIcon: PropTypes.string,
};

export default Badge;
