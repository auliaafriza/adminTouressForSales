import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import stylesGlobal from '../styles';
import iconGalley from '../../assets/Icon/Gallery.png';
import iconCamera from '../../assets/Icon/camera.png';
import iconTrash from '../../assets/Icon/trash.png';
import iconClose from '../../assets/Icon/close.png';

const modalUploadImage = ({
  onPressGallery,
  onPressCamera,
  onPressRemovePhoto,
  onPress,
  type,
}) => {
  return (
    <View style={styles.innerContainerPhoto}>
      <TouchableOpacity
        onPress={onPress}
        style={[stylesGlobal.containerIcon20, styles.closeButton]}
      >
        <Image
          source={iconClose}
          style={[stylesGlobal.imageIcon, styles.tintColorRed]}
        />
      </TouchableOpacity>
      <View style={[stylesGlobal.row100, { justifyContent: 'space-around' }]}>
        <View style={stylesGlobal.alignItemsCenter}>
          <TouchableOpacity
            onPress={onPressGallery}
            style={styles.buttonIconPhoto}
          >
            <View style={stylesGlobal.containerIcon20}>
              <Image
                source={iconGalley}
                style={[stylesGlobal.imageIcon, styles.tintColorWhite]}
              />
            </View>
          </TouchableOpacity>
          <Text>From gallery</Text>
        </View>
        <View style={stylesGlobal.alignItemsCenter}>
          <TouchableOpacity
            onPress={onPressCamera}
            style={styles.buttonIconPhoto}
          >
            <View style={stylesGlobal.containerIcon20}>
              <Image
                source={iconCamera}
                style={[stylesGlobal.imageIcon, styles.tintColorWhite]}
              />
            </View>
          </TouchableOpacity>
          <Text>Camera</Text>
        </View>
        {type != 'account' ? (
          <View style={stylesGlobal.alignItemsCenter}>
            <TouchableOpacity
              onPress={onPressRemovePhoto}
              style={[styles.buttonIconPhoto, styles.backgroundColorRed]}
            >
              <View style={stylesGlobal.containerIcon20}>
                <Image
                  source={iconTrash}
                  style={[stylesGlobal.imageIcon, styles.tintColorWhite]}
                />
              </View>
            </TouchableOpacity>
            <Text>Remove photo</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

modalUploadImage.propTypes = {
  onPress: PropTypes.func,
  onPressGallery: PropTypes.func,
  onPressCamera: PropTypes.func,
  onPressRemovePhoto: PropTypes.func,
  type: PropTypes.string,
};

export default modalUploadImage;
