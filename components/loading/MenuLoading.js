import React from 'react';
import { View } from 'react-native';
import stylesGlobal from '../styles';
import styles from './styles';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

const MenuLoading = () => {
  var arraySlider = Array.from(Array(4), (x, index) => index + 1);
  return (
    <View style={[stylesGlobal.row100, { justifyContent: 'space-around' }]}>
      {arraySlider.map((item, index) => {
        return (
          <ShimmerPlaceHolder
            key={index}
            autoRun={true}
            visible={false}
            width={50}
            height={50}
            style={styles.loadingCardMenu}
          />
        );
      })}
    </View>
  );
};

export default MenuLoading;
