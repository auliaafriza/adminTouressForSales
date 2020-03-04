import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import stylesGlobal from '../styles';
import Card from './Card';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SeperatorRepeat } from '../list';

const CardReadyPackageFixPrice = props => {
  const {
    type, //untuk change Airport dan change accomodation
    DateTime,
    Destination, //untuk view Accomodation name
    Duration,
    City,
    FlightNumber,
    CheckInDate,
    CheckOutDate,
  } = props;
  return (
    <Card>
      <View style={styles.rowPadding100}>
        <View style={[stylesGlobal.width80, stylesGlobal.rowStart]}>
          <Text
            style={[
              styles.rowPadding100,
              styles.colPadding20,
              styles.bold20,
              styles.paddingTop20,
            ]}
          >
            {type == 'DepartureConnection'
              ? 'Departure'
              : type == 'ArrivalConnection'
              ? 'Arrival'
              : type}
          </Text>
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
      <View style={[stylesGlobal.width100, stylesGlobal.paddingHorizontal10]}>
        <View
          style={[
            stylesGlobal.rowPadding100,
            stylesGlobal.paddingHorizontal10,
            stylesGlobal.paddingBottom10,
          ]}
        >
          <Text
            style={[
              stylesGlobal.text15,
              stylesGlobal.textBold,
              stylesGlobal.paddingLeft5,
            ]}
          >
            {type == 'Accomodation'
              ? 'Accommodation'
              : type == 'Arrival' || type == 'ArrivalConnection'
              ? 'Arrival Destination'
              : 'Departure Destination'}{' '}
          </Text>
          <Text style={[stylesGlobal.text12, stylesGlobal.paddingLeft5]}>
            {Destination}
          </Text>
        </View>
        <View style={[styles.rowPadding100, styles.justifySpace]}>
          <View style={[stylesGlobal.width55, stylesGlobal.padding10]}>
            <Text style={[stylesGlobal.text15, stylesGlobal.textBold]}>
              {type == 'Accomodation'
                ? 'City Destination'
                : type == 'Arrival' || type == 'ArrivalConnection'
                ? 'Arrival Date'
                : 'Departure Date'}{' '}
            </Text>
            <Text style={stylesGlobal.text12}>
              {type == 'Accomodation' ? City : DateTime}
            </Text>
          </View>
          <View style={[stylesGlobal.width40, stylesGlobal.padding10]}>
            <Text style={[stylesGlobal.text15, stylesGlobal.textBold]}>
              {type == 'Accomodation' ? 'Stay Duration' : 'Flight Number'}{' '}
            </Text>
            <Text style={stylesGlobal.text12}>
              {type == 'Accomodation'
                ? Duration
                : FlightNumber
                ? FlightNumber
                : '-'}
            </Text>
          </View>
        </View>
        {type != 'Accomodation' ? (
          <View style={[styles.cardWarningFixPrice, stylesGlobal.padding15]}>
            <View style={styles.rowPadding100}>
              <Icon name="info" size={16} color={styles.$goldcolor} />
              <Text style={styles.textSize14Gold}>Local Time</Text>
            </View>
            <View style={styles.rowPadding100}>
              <Text style={[stylesGlobal.colorBlackLight, stylesGlobal.text12]}>
                The date and time listed are the date and time at the airport
                location
              </Text>
            </View>
          </View>
        ) : (
          <View
            style={[
              styles.rowPadding100,
              styles.justifySpace,
              stylesGlobal.paddingBottom10,
            ]}
          >
            <View style={[stylesGlobal.width55, stylesGlobal.padding10]}>
              <Text style={[stylesGlobal.text15, stylesGlobal.textBold]}>
                Check-in Date
              </Text>
              <Text style={stylesGlobal.text12}>{CheckInDate}</Text>
            </View>
            <View style={[stylesGlobal.width40, stylesGlobal.padding10]}>
              <Text style={[stylesGlobal.text15, stylesGlobal.textBold]}>
                Check-out Date
              </Text>
              <Text style={stylesGlobal.text12}>{CheckOutDate}</Text>
            </View>
          </View>
        )}
      </View>
    </Card>
  );
};

CardReadyPackageFixPrice.propTypes = {
  type: PropTypes.string, //untuk change Airport dan change accomodation
  DateTime: PropTypes.string,
  Destination: PropTypes.string, //untuk view Accomodation name
  Duration: PropTypes.number,
  City: PropTypes.string,
  FlightNumber: PropTypes.string,
  CheckInDate: PropTypes.string,
  CheckOutDate: PropTypes.string,
};

export default CardReadyPackageFixPrice;
