import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import stylesGlobal from '../styles';
import Card from './Card';
import { Entypo } from '@expo/vector-icons';
import { SeperatorVertical } from '../list';

import LeaveAccomodation from './../../assets/Icon/leave_accommodation_copy.png';
import ReturnAccomodation from './../../assets/Icon/return_accommodation_copy_2.png';
import CheckIn from './../../assets/Icon/checin.png';
import CheckOut from './../../assets/Icon/checout.png';
import Arrival from './../../assets/Icon/arrival.png';
import Departure from './../../assets/Icon/departure.png';
import FreeTime from './../../assets/Icon/clock.png';
import Meal from './../../assets/Icon/restaurant_black.png';
import Excrution from './../../assets/Icon/excrusion.png';
import Transit from './../../assets/Icon/plane.png';
import Queue from './../../assets/Icon/passport.png';
import StartDay from './../../assets/Icon/sun.png';
import EndDay from './../../assets/Icon/moon.png';
import Transfer from './../../assets/Icon/transfer.png';
import Subway from '../../assets/Icon/subway.png';
import NoImage from '../../assets/images/NoImage.png';

const CardItineraryFixed = ({
  Title,
  Time,
  type,
  Desc,
  Img,
  Flight,
  DurationDriving,
  Duration,
  ServiceDriving,
  Loc,
  AddMove,
  onPressAccommodation,
  DurationFreeTime,
  typeArrival,
  LocationFirst,
  LocationSecond,
  flightWarning,
  namaProfileAccomo,
}) => {
  const circleInner = [styles.ontop];
  let image;
  if (type == 'ARRIVAL') {
    typeArrival == 'Airport' ? (image = Arrival) : (image = Subway);
  }
  if (type == 'DEPARTURE') {
    typeArrival == 'Airport' ? (image = Departure) : (image = Subway);
  }
  if (type == 'CHECKIN') {
    image = CheckIn;
  }
  if (type == 'CHECKOUT') {
    image = CheckOut;
  }
  if (type == 'RECREATION') {
    image = Excrution;
  }
  if (type == 'DRIVING') {
    image = Transfer;
  }
  if (type == 'TRANSIT' || type == 'FLIGHTTIME') {
    image = Transit;
  }
  if (type == 'FREETIME' || type == 'FREETIMELOCKED') {
    image = FreeTime;
  }
  if (type == 'EAT') {
    image = Meal;
  }
  if (type == 'LEAVEACCOMMODATION') {
    image = LeaveAccomodation;
  }
  if (type == 'RETURNACCOMMODATION') {
    image = ReturnAccomodation;
  }
  if (type == 'DAYSTART') {
    image = StartDay;
  }
  if (type == 'DAYEND') {
    image = EndDay;
  }
  if (type == 'QUEUETIME') {
    image = Queue;
  }
  // if (Button) {
  //   imageButton = Add;
  // }
  return (
    <View>
      {type == 'VIRTUALCHECKIN' ||
      type == 'VIRTUALCHECKOUT' ||
      type == 'VIRTUALRETURNACCOMMODATION' ||
      (type == 'DRIVING' && DurationDriving == 0) ||
      (type == 'FREETIME' && DurationFreeTime == 0) ||
      (type == 'FREETIMELOCKED' && DurationFreeTime == 0) ||
      type == 'VIRTUALLEAVEACCOMMODATION' ? null : (
        <View style={styles.rowSpace}>
          <View
            style={[stylesGlobal.width10, stylesGlobal.justifyContentCenter]}
          >
            <View style={[circleInner, styles.paddingBottom]}>
              <View
                style={[
                  stylesGlobal.containerIcon30,
                  stylesGlobal.backgroundColorWhite,
                  stylesGlobal.padding2,
                ]}
              >
                <Image
                  source={image}
                  resizeMode="contain"
                  style={[styles.imageIcon, styles.tintColorItinerart]}
                />
              </View>
            </View>

            <View style={styles.positionLine}>
              <SeperatorVertical
                colorsepar={styles.$tintColorStyle}
                heightsepar={250}
                widthsepar={1}
              />
            </View>
          </View>

          <View
            style={[
              stylesGlobal.width90,
              stylesGlobal.center,
              stylesGlobal.padding5,
            ]}
          >
            <Card widthCard="90%">
              <View style={stylesGlobal.padding10}>
                {type == 'CHECKOUT' ||
                type == 'CHECKIN' ||
                type == 'QUEUETIME' ||
                type == 'TRANSIT' ||
                type == 'DAYEND' ||
                type == 'DAYSTART' ||
                type == 'LEAVEACCOMMODATION' ? (
                  <View style={stylesGlobal.row100}>
                    <View style={stylesGlobal.width50}>
                      <Text
                        style={[
                          stylesGlobal.text14,
                          stylesGlobal.textBold,
                          styles.colorTint,
                        ]}
                      >
                        {Time}
                      </Text>
                    </View>
                    <View
                      style={[
                        stylesGlobal.width50,
                        stylesGlobal.justifyContentEnd,
                      ]}
                    >
                      <Text
                        style={[stylesGlobal.text14, stylesGlobal.alignSelfEnd]}
                      >
                        At {Loc}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View
                    style={[stylesGlobal.row100, stylesGlobal.alignItemsCenter]}
                  >
                    <View style={stylesGlobal.width50}>
                      <Text
                        style={[
                          stylesGlobal.text14,
                          stylesGlobal.textBold,
                          styles.colorTint,
                        ]}
                      >
                        {Time}
                      </Text>
                    </View>
                  </View>
                )}

                {type == 'ARRIVAL' || type == 'DEPARTURE' ? (
                  <View>
                    <Text style={stylesGlobal.text12}>{Desc}</Text>
                    {Flight ? <Text>Flight Number: {Flight}</Text> : null}
                  </View>
                ) : null}

                {(type == 'DRIVING' && DurationDriving > 0) ||
                type == 'TRANSIT' ||
                type == 'QUEUETIME' ? (
                  <View style={stylesGlobal.row100}>
                    <View style={stylesGlobal.width80}>
                      <Text
                        style={[
                          stylesGlobal.textBold,
                          stylesGlobal.text18,
                          stylesGlobal.marginBottom10,
                        ]}
                      >
                        {Title}
                      </Text>
                    </View>
                    <View style={stylesGlobal.width20}>
                      <Text
                        style={[
                          stylesGlobal.textBold,
                          stylesGlobal.text12,
                          stylesGlobal.justifyContentEnd,
                        ]}
                      >
                        {Duration}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <Text
                    style={[
                      stylesGlobal.textBold,
                      stylesGlobal.text18,
                      stylesGlobal.marginBottom10,
                    ]}
                  >
                    {type == 'FREETIMELOCKED'
                      ? 'Free Time'
                      : type == 'EAT' || type == 'RECREATION'
                      ? AddMove
                      : Title}
                  </Text>
                )}

                {type == 'RECREATION' ||
                type == 'EAT' ||
                type == 'CHECKIN' ||
                type == 'CHECKOUT' ||
                type == 'LEAVEACCOMMODATION' ||
                type == 'RETURNACCOMMODATION' ? (
                  <View style={stylesGlobal.row100}>
                    <View style={stylesGlobal.width30}>
                      <View
                        style={[
                          stylesGlobal.width100,
                          styles.stylesCardItinerary,
                        ]}
                      >
                        {Img != '' && Img != null && Img != undefined ? (
                          <Image
                            source={{ uri: Img }}
                            style={[
                              stylesGlobal.imageIcon,
                              stylesGlobal.backgroundColorGrey,
                            ]}
                            resizeMode="cover"
                          />
                        ) : (
                          <Image
                            source={NoImage}
                            style={[
                              stylesGlobal.imageIcon,
                              stylesGlobal.backgroundColorGrey,
                            ]}
                            resizeMode="cover"
                          />
                        )}
                      </View>
                    </View>
                    <View
                      style={[stylesGlobal.width70, stylesGlobal.paddingLeft10]}
                    >
                      {type == 'LEAVEACCOMMODATION' ||
                      type == 'RETURNACCOMMODATION' ||
                      type == 'CHECKIN' ||
                      type == 'CHECKOUT' ? (
                        <Text
                          style={[
                            stylesGlobal.text14,
                            stylesGlobal.paddingBottom5,
                          ]}
                        >
                          {namaProfileAccomo}
                        </Text>
                      ) : null}
                      {type == 'LEAVEACCOMMODATION' ||
                      type == 'RETURNACCOMMODATION' ||
                      type == 'CHECKIN' ||
                      type == 'CHECKOUT' ? (
                        <Text
                          style={
                            namaProfileAccomo
                              ? stylesGlobal.text12
                              : stylesGlobal.text14
                          }
                        >
                          {Desc}
                        </Text>
                      ) : (
                        <Text>
                          At {Loc} - {Duration}
                        </Text>
                      )}
                      <TouchableOpacity onPress={onPressAccommodation}>
                        <Text
                          style={[
                            stylesGlobal.text14,
                            stylesGlobal.textBold,
                            stylesGlobal.flexSize,
                            styles.marginTop20,
                            styles.colorSoftBlue,
                          ]}
                        >
                          See Detail
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}

                {type == 'FREETIME' || type == 'FREETIMELOCKED' ? (
                  <View>
                    <Text>
                      at {Loc} - {Duration}{' '}
                    </Text>
                    <Text>Note : </Text>
                    <Text>{Flight}</Text>
                  </View>
                ) : null}

                {type == 'FLIGHTTIME' || type == 'DRIVING' ? (
                  <View>
                    <View style={stylesGlobal.row100}>
                      {ServiceDriving ? (
                        <Text>
                          With :{' '}
                          {ServiceDriving != undefined || ServiceDriving != null
                            ? ServiceDriving.split('_').join(' ')
                            : ServiceDriving}
                        </Text>
                      ) : null}
                      <Text>at {Loc}</Text>
                    </View>
                    <View
                      style={[
                        stylesGlobal.row100,
                        stylesGlobal.alignItemsCenter,
                        styles.marginBottomnegatif10,
                      ]}
                    >
                      <Entypo
                        name="dot-single"
                        size={30}
                        color={styles.$greenIconColor}
                      />
                      <Text>{LocationFirst}</Text>
                    </View>
                    {/* <View style={[stylesGlobal.row100, { paddingLeft: 12 }]}>
                        <SeperatorVertical
                          widthsepar={1}
                          heightsepar={20}
                          colorsepar="#ccc"
                        />
                      </View> */}
                    <View style={[stylesGlobal.row100, styles.leftPadding7]}>
                      <Entypo
                        name="dots-three-vertical"
                        size={15}
                        color="#ccc"
                      />
                    </View>
                    <View
                      style={[
                        stylesGlobal.row100,
                        stylesGlobal.alignItemsCenter,
                        styles.marginBottomnegatif10,
                        styles.marginTopnegatif5,
                      ]}
                    >
                      <Entypo
                        name="dot-single"
                        size={30}
                        color={styles.$redcolor}
                      />
                      <Text>{LocationSecond}</Text>
                    </View>
                  </View>
                ) : null}
              </View>
              {(type == 'ARRIVAL' && flightWarning != '') ||
              (type == 'DEPARTURE' && flightWarning != '') ? (
                <View
                  style={[
                    stylesGlobal.padding10,
                    stylesGlobal.row100,
                    styles.stylesWarningItinerary,
                  ]}
                >
                  <Text style={stylesGlobal.text12}>{flightWarning}</Text>
                </View>
              ) : null}
            </Card>
          </View>
        </View>
      )}
    </View>
  );
};

CardItineraryFixed.propTypes = {
  Title: PropTypes.string,
  Time: PropTypes.string,
  type: PropTypes.string,
  Desc: PropTypes.string,
  Img: PropTypes.string,
  Flight: PropTypes.string,
  DurationDriving: PropTypes.number,
  Duration: PropTypes.string,
  Button: PropTypes.bool,
  Service: PropTypes.string,
  ServiceDriving: PropTypes.string,
  Loc: PropTypes.string,
  AddMove: PropTypes.string,
  onPressAccommodation: PropTypes.func,
  DurationFreeTime: PropTypes.number,
  typeArrival: PropTypes.string,
  LocationFirst: PropTypes.string,
  LocationSecond: PropTypes.string,
  flightWarning: PropTypes.string,
  namaProfileAccomo: PropTypes.string,
};

export default CardItineraryFixed;
