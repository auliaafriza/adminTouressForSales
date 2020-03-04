import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from './styles';
import { ClearButton } from '../button';

const TextGuest = ({
  Guest = 'Guest',
  onPress,
  confirmed,
  onPressDelete,
  type,
}) => {
  return (
    <View style={styles.rowSpace}>
      <Text>{Guest}</Text>
      {confirmed ? (
        <View>
          <ClearButton
            text="Edit"
            textColor={styles.$goldcolor}
            bold
            textSize={16}
            onPress={onPress}
          />
          <ClearButton
            text="Delete"
            textColor={styles.$redcolor}
            bold
            textSize={16}
            onPress={onPressDelete}
          />
        </View>
      ) : (
        <ClearButton
          text={type}
          textColor={styles.$goldcolor}
          bold
          textSize={16}
          onPress={onPress}
        />
      )}
    </View>
  );
};

TextGuest.propTypes = {
  Guest: PropTypes.string,
  onPress: PropTypes.func,
  confirmed: PropTypes.bool,
  onPressDelete: PropTypes.func,
  type: PropTypes.string,
};
export default TextGuest;
