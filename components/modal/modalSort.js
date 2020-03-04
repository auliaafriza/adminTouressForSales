import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NormalButton } from '../button';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';
import { Seperator } from '../list';

const modalSort = ({
  text1,
  text2,
  text3,
  onPress,
  onPressLow,
  onPressHigh,
  onPressPopuler,
  selected1 = false,
  selected2 = false,
  selected3 = false,
  type,
}) => (
  <View style={styles.innerContainerSort}>
    <TouchableOpacity style={styles.row} onPress={onPressPopuler}>
      <Text style={styles.text}>{text1}</Text>
      {selected1 ? (
        <Ionicons name="ios-checkmark" size={30} color={styles.$goldcolor} />
      ) : (
        <Ionicons />
      )}
    </TouchableOpacity>
    <Seperator widthsepar="100%" />
    <TouchableOpacity style={styles.row} onPress={onPressHigh}>
      <Text style={styles.text}>{text2}</Text>
      {selected2 ? (
        <Ionicons name="ios-checkmark" size={30} color={styles.$goldcolor} />
      ) : (
        <Ionicons />
      )}
    </TouchableOpacity>
    <Seperator widthsepar="100%" />
    {type == 'dua' ? null : (
      <TouchableOpacity style={styles.row} onPress={onPressLow}>
        <Text style={styles.text}>{text3}</Text>
        {selected3 ? (
          <Ionicons name="ios-checkmark" size={30} color={styles.$goldcolor} />
        ) : (
          <Ionicons />
        )}
      </TouchableOpacity>
    )}
    {type == 'dua' ? null : <Seperator />}

    <View style={styles.row}>
      <NormalButton
        text="CLOSE"
        buttonWidth="50%"
        textColor="white"
        buttonColor={styles.$goldcolor}
        onPress={onPress}
      />
    </View>
  </View>
);

modalSort.propTypes = {
  text1: PropTypes.string,
  text2: PropTypes.string,
  text3: PropTypes.string,
  onPress: PropTypes.func,
  onPressLow: PropTypes.func,
  onPressHigh: PropTypes.func,
  onPressPopuler: PropTypes.func,
  selected1: PropTypes.bool,
  selected2: PropTypes.bool,
  selected3: PropTypes.bool,
  type: PropTypes.string,
};

export default modalSort;
