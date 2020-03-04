import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

const Loading = ({ sizeloading, colorloading, positionLoad = 'absolute' }) => {
  const containerStyles = [styles.container];
  if (positionLoad) {
    containerStyles.push({ position: positionLoad });
    if (positionLoad == 'relative') {
      containerStyles.push({ backgroundColor: 'transparent' });
      containerStyles.push({ height: '100%' });
      containerStyles.push({ width: '100%' });
    }
  }
  return (
    <View style={containerStyles}>
      <ActivityIndicator size={sizeloading} color={colorloading} />
      {positionLoad == 'absolute' ? null : <Text>Please wait...</Text>}
    </View>
  );
};

Loading.propTypes = {
  sizeloading: PropTypes.string,
  colorloading: PropTypes.string,
  positionLoad: PropTypes.string,
};

export default Loading;
