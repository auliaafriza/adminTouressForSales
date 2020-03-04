import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles';
import stylesGlobal from '../../styles';
import Card from '../Card';
import { Entypo } from '@expo/vector-icons';

import { SeperatorVertical } from '../../list';

const CardFlightNote = ({ notes }) => {
  return (
    <View>
      {/* <View style={styles.rowSpace}>
        <View style={[stylesGlobal.width10, stylesGlobal.justifyContentCenter]}>
          <View style={styles.positionLine}>
            <SeperatorVertical
              colorsepar={styles.$tintColorStyle}
              heightsepar={250}
              widthsepar={1}
            />
          </View>
        </View> */}

      <View
        style={[
          stylesGlobal.width100,
          stylesGlobal.center,
          stylesGlobal.padding5,
        ]}
      >
        <Card widthCard="100%" type="Flat" border="#E6CA6B" color="#FDFAF0">
          <View style={stylesGlobal.padding10}>
            <Text>Flight Note</Text>
            <Text>askjh sakdaskj asjdhak dakjdha sdjashdka</Text>
          </View>
        </Card>
      </View>
      {/* </View> */}
    </View>
  );
};

CardFlightNote.propTypes = {
  notes: PropTypes.string,
};

export default CardFlightNote;
