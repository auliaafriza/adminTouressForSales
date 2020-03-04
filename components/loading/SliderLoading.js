import React from 'react';
import { View } from 'react-native';
import stylesGlobal from '../styles';
import styles from './styles';
import RoundedLoading from './RoundedLoading';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

const SliderLoading = ({ width, height, column, isTitle }) => {
  var arraySlider = Array.from(Array(column), (x, index) => index + 1);
  return (
    <View style={stylesGlobal.row100}>
      {arraySlider.map((item, index) => {
        return (
          <View key={index}>
            <ShimmerPlaceHolder
              autoRun={true}
              visible={false}
              width={width}
              height={height}
              style={styles.loadingCardSlider}
            />
            {isTitle ? (
              <View style={stylesGlobal.marginTop20}>
                <RoundedLoading width={width} height={10} />
                <RoundedLoading width={width - 30} height={10} />
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
};

export default SliderLoading;
