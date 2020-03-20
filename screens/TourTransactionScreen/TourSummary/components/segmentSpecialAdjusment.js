import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../styles';
import PropTypes from 'prop-types';
import stylesGlobal from '../../../../components/styles';
import { Card } from '../../../../components/card';
import { RoundedTextInput } from '../../../../components/textInput';
import { SeperatorRepeat } from '../../../../components/list';
import { convertRoundPrice } from '../../../../helper/helper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const segmentTourNote = props => {
  const { handlePressSpecialAdjusmentDetail, specialAdjusmentList } = props;
  return (
    <Card widthCard="90%">
      <View
        style={[
          styles.rowNoPadding,
          stylesGlobal.paddingHorizontal20,
          stylesGlobal.paddingTop20,
        ]}
      >
        <View style={styles.col50}>
          <Text style={styles.bold20}>{`Special Adjusment`}</Text>
        </View>
        <View style={[styles.col50, stylesGlobal.alignItemsEnd]}>
          <TouchableOpacity onPress={() => handlePressSpecialAdjusmentDetail()}>
            <Text
              style={[
                styles.bold20,
                stylesGlobal.textBold,
                styles.colorSoftBlue,
              ]}
            >
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
        <SeperatorRepeat
          repeat={31}
          widthsepar={8}
          heightSepar={1}
          colorSepar="#777"
        />
      </View>
      {specialAdjusmentList
        ? specialAdjusmentList.map((data, i) => {
            return (
              <View
                style={[
                  styles.rowNoPadding,
                  styles.colPadding20,
                  stylesGlobal.marginBottom10,
                ]}
              >
                <View style={styles.col60}>
                  <Text style={stylesGlobal.text16}>{data.Description}</Text>
                </View>
                <View style={styles.col15}>
                  <Text style={stylesGlobal.text16}>{data.Qty} Pax</Text>
                </View>
                <View style={[styles.col40, stylesGlobal.alignItemsEnd]}>
                  <Text style={stylesGlobal.text16}>
                    {`${data.CurrencyId} ${convertRoundPrice(
                      Math.abs(data.UnitCost),
                      data.CurrencyId
                    )} `}
                  </Text>
                </View>
              </View>
            );
          })
        : null}
    </Card>
  );
};

segmentTourNote.propTypes = {
  tourNote: PropTypes.string,
  onChangeText: PropTypes.func,
};

export default segmentTourNote;
