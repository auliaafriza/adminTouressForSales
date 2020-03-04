import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import stylesGlobal from '../styles';
import IconMoney from '../../assets/Icon/money.png';

const TextPaymentTerms = ({ paymentterms, percentage, date }) => {
  return (
    <View style={[stylesGlobal.row100, stylesGlobal.alignItemsCenter]}>
      <View style={[stylesGlobal.containerIcon30, stylesGlobal.padding5]}>
        <Image
          source={IconMoney}
          style={stylesGlobal.imageIcon}
          resizeMode="contain"
        />
      </View>
      <Text style={[stylesGlobal.text14, styles.marginLeft5]}>
        {paymentterms}
      </Text>
      <Text
        style={[
          stylesGlobal.text14,
          styles.marginLeft5,
          stylesGlobal.textBold,
          stylesGlobal.colorRed,
        ]}
      >
        {percentage}%
      </Text>
      <Text style={[stylesGlobal.text14, styles.marginLeft5]}> On </Text>
      <Text
        style={[
          stylesGlobal.text14,
          styles.marginLeft5,
          stylesGlobal.textBold,
          stylesGlobal.colorRed,
        ]}
      >
        {date}
      </Text>
    </View>
  );
};

TextPaymentTerms.propTypes = {
  paymentterms: PropTypes.string,
  percentage: PropTypes.number,
  date: PropTypes.string,
};
export default TextPaymentTerms;
