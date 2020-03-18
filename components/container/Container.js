import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import styles from './styles';

const Container = ({
  children,
  color,
  widthContainer,
  heightContainer,
  paddingtopcontainer,
  paddingbottomcontainer,
  marginTop,
}) => {
  const containerStyles = [styles.container];
  if (color) {
    containerStyles.push({backgroundColor: color});
  }
  if (widthContainer) {
    containerStyles.push({width: widthContainer});
  }
  if (heightContainer) {
    containerStyles.push({height: heightContainer});
  }
  if (paddingtopcontainer) {
    containerStyles.push({paddingTop: paddingtopcontainer});
  }

  if (paddingbottomcontainer) {
    containerStyles.push({paddingBottom: paddingbottomcontainer});
  }
  if (marginTop) {
    containerStyles.push({marginTop: marginTop});
  }

  return (
    <SafeAreaView style={styles.styleSafeAreaWhite}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={containerStyles}>{children}</View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

Container.propTypes = {
  children: PropTypes.any,
  color: PropTypes.string,
  widthContainer: PropTypes.string,
  heightContainer: PropTypes.string,
  paddingtopcontainer: PropTypes.number,
  paddingbottomcontainer: PropTypes.number,
  marginTop: PropTypes.number,
};

export default Container;
