import React from 'react';
import { View, Text, Image } from 'react-native';
import { Card } from '../../../components/card';
import { TextWithIcon } from '../../../components/text';
import CardItemDetailTicket from './CardItemDetailTicket';

import NoImage from '../../../assets/images/NoImage.png';

import IconDeparture from '../../../assets/Icon/departure.png';
import IconArrival from '../../../assets/Icon/arrival.png';

import stylesGlobal from '../../../components/styles';
import styles from '..//styles';

const CardDetailTicket = ({
  flightCode,
  seatClass,
  logoImage,
  airlineName,
  departureCity,
  departurePlaceName,
  departurePlaceCode,
  departureDate,
  departureTime,
  arrivalCity,
  arrivalPlaceName,
  arrivalPlaceCode,
  arrivalDate,
  arrivalTime,
  duration,
  transitDuration,
}) => {
  return (
    <Card widthCard="90%" paddingHorizontal={15} paddingVertical={20}>
      <View
        style={[
          stylesGlobal.center,
          stylesGlobal.width100,
          stylesGlobal.marginBottom20,
        ]}
      >
        <Text>{departureDate}</Text>
      </View>

      <View style={[stylesGlobal.row100, stylesGlobal.marginBottom30]}>
        <View style={[stylesGlobal.width70, stylesGlobal.row]}>
          <View style={stylesGlobal.containerIcon20}>
            {logoImage ? (
              <Image
                style={stylesGlobal.imageIcon}
                source={{ uri: logoImage }}
              />
            ) : (
              <Image style={stylesGlobal.imageIcon} source={NoImage} />
            )}
          </View>
          <Text
            style={[
              stylesGlobal.textBold,
              stylesGlobal.text14,
              stylesGlobal.paddingLeft20,
            ]}
          >
            {airlineName}
          </Text>
        </View>
        <View style={[stylesGlobal.width30, stylesGlobal.alignItemsEnd]}>
          <Text style={stylesGlobal.text12}>{flightCode}</Text>
          <Text style={stylesGlobal.text12}>{seatClass}</Text>
        </View>
      </View>
      <View style={stylesGlobal.width100}>
        <CardItemDetailTicket
          type="Departure"
          icon={IconDeparture}
          city={departureCity}
          airportName={departurePlaceName}
          airportCode={departurePlaceCode}
          date={departureDate}
          time={departureTime}
        />
        <View style={[styles.paddingLeft34, stylesGlobal.paddingVertical20]}>
          <Text>{duration}</Text>
        </View>
        <CardItemDetailTicket
          type="Arrival"
          icon={IconArrival}
          city={arrivalCity}
          airportName={arrivalPlaceName}
          airportCode={arrivalPlaceCode}
          date={arrivalDate}
          time={arrivalTime}
          transitDuration={transitDuration}
        />
      </View>
    </Card>
  );
};

export default CardDetailTicket;
