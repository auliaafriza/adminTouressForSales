import PropTypes from 'prop-types';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import stylesGlobal from '../styles';
import { Seperator } from '../list';

const modalItinerary = ({ Free, Excrution, Meal, onPress }) => (
  <View style={styles.innerContainerSort}>
    <View style={[stylesGlobal.row100, styles.positionModalItinerary]}>
      <View style={[stylesGlobal.width90, stylesGlobal.padding20]}>
        <Text style={[stylesGlobal.text18, stylesGlobal.textBold]}>
          Add Activity
        </Text>
      </View>
      <TouchableOpacity
        style={[stylesGlobal.width10, stylesGlobal.center]}
        onPress={onPress}
      >
        <Ionicons name="ios-close" size={32} color={stylesGlobal.colorRed} />
      </TouchableOpacity>
    </View>

    <TouchableOpacity onPress={Excrution}>
      <Text style={styles.text} onPress={Excrution}>
        Excursion
      </Text>
    </TouchableOpacity>
    <Seperator widthsepar="100%" />
    <TouchableOpacity onPress={Meal}>
      <Text style={styles.text} onPress={Meal}>
        Meal
      </Text>
    </TouchableOpacity>
    <Seperator widthsepar="100%" />
    <TouchableOpacity onPress={Free}>
      <Text style={styles.text} onPress={Free}>
        Free Time
      </Text>
    </TouchableOpacity>
  </View>
);

modalItinerary.propTypes = {
  onPress: PropTypes.func,
  Meal: PropTypes.func,
  Free: PropTypes.func,
  Excrution: PropTypes.func,
};

export default modalItinerary;
