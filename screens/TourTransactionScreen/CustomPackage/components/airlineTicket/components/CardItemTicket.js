import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from '../../../components/icon';
import { TextWithIcon } from '../../../components/text';

import IconDeparture from '../../../assets/Icon/departure.png';
import IconPlane from '../../../assets/Icon/plane.png';

import stylesGlobal from '../../../components/styles';
const CardItemTicket = ({
  departureDateTime,
  transitCount,
  departureCity,
  arrivalCity,
  departureAirportCode,
  arrivalAirportCode,
}) => {
  return (
    <View style={[stylesGlobal.width100, stylesGlobal.marginTop20]}>
      <View style={[stylesGlobal.row100, stylesGlobal.marginBottom15]}>
        <View style={stylesGlobal.width70}>
          <TextWithIcon
            iconName={IconDeparture}
            iconColor={stylesGlobal.$goldColor}
            text={departureDateTime}
          />
        </View>
        <View style={[stylesGlobal.width30, stylesGlobal.rowEnd]}>
          <Text style={[stylesGlobal.greyColor, stylesGlobal.text11]}>
            {transitCount ? transitCount + ' Transit' : 'Non-Stop'}
          </Text>
        </View>
      </View>
      <View style={[stylesGlobal.row100, stylesGlobal.alignItemsCenter]}>
        <View style={stylesGlobal.width30}>
          <Text>{departureCity}</Text>
        </View>
        <View style={[stylesGlobal.width10, stylesGlobal.rowEnd]}>
          <Text>{departureAirportCode}</Text>
        </View>
        <View style={[stylesGlobal.width20, stylesGlobal.center]}>
          <Icon source={IconPlane} size={20} color="#252525" />
        </View>
        <View style={stylesGlobal.width10}>
          <Text>{arrivalAirportCode}</Text>
        </View>
        <View style={[stylesGlobal.width30, stylesGlobal.rowEnd]}>
          <Text>{arrivalCity}</Text>
        </View>
      </View>
    </View>
  );
};

export default CardItemTicket;
