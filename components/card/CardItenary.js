import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import stylesGlobal from '../styles';
import Card from './Card';
import { Entypo } from '@expo/vector-icons';

import { SeperatorVertical, SeperatorRepeat } from '../list';
import { NormalButton } from '../button';

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
// import Add from './../../assets/Icon/add.png';
import Transfer from './../../assets/Icon/transfer.png';
import Close from '../../assets/Icon/close.png';
import Subway from '../../assets/Icon/subway.png';
import NoImage from '../../assets/images/NoImage.png';
// import CardFlightNote from './cardItinerary/CardFlightNote';
import { SubstractSecond, convertDateFormat } from '../../helper/timeHelper';

const CardItenary = ({
  Title,
  Time,
  type,
  Desc,
  Img,
  Flight,
  Note,
  DurationDriving,
  Duration,
  onPress,
  ServiceDriving,
  Loc,
  Button,
  onPressEdit,
  onPressDelete,
  AddMove,
  addTransport,
  onPressDeleteCar,
  editTransport,
  onPressAccommodation,
  DurationFreeTime,
  flightWarning,
  typeArrival,
  LocationFirst,
  LocationSecond,
  overlap,
  showButton,
  namaProfileAccomo,
  FlightCode,
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
      type == 'FLIGHTTIME' ||
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
              {overlap == true && Button == false ? (
                <SeperatorRepeat
                  colorsepar={styles.$tintColorStyle}
                  heightsepar={15}
                  repeat={100}
                  widthsepar={1}
                  type="vertical"
                />
              ) : (
                <SeperatorVertical
                  colorsepar={styles.$tintColorStyle}
                  heightsepar={250}
                  widthsepar={1}
                />
              )}
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
                        {convertDateFormat(Time, 'HH:mm')}
                      </Text>
                    </View>
                    <View
                      style={[
                        stylesGlobal.width50,
                        stylesGlobal.justifyContentEnd,
                        stylesGlobal.paddingRight5,
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
                        {convertDateFormat(Time, 'HH:mm')}
                      </Text>
                    </View>
                    {type == 'FREETIME' ||
                    type == 'EAT' ||
                    type == 'RECREATION' ||
                    (type == 'DRIVING' && ServiceDriving != undefined) ||
                    (type == 'DRIVING' && ServiceDriving != null) ? (
                      <View
                        style={[
                          stylesGlobal.width50,
                          stylesGlobal.alignItemsEnd,
                        ]}
                      >
                        <TouchableOpacity
                          style={[
                            stylesGlobal.containerIcon20,
                            styles.padding5,
                          ]}
                          onPress={
                            (type == 'DRIVING' &&
                              ServiceDriving != undefined) ||
                            (type == 'DRIVING' && ServiceDriving != null)
                              ? onPressDeleteCar
                              : onPressDelete
                          }
                        >
                          <Image
                            source={Close}
                            style={[styles.imageIcon15, styles.tintColorRed]}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </View>
                )}

                {(type == 'DRIVING' && DurationDriving > 0) ||
                type == 'TRANSIT' ||
                type == 'QUEUETIME' ? (
                  <View
                    style={[stylesGlobal.row100, stylesGlobal.paddingRight5]}
                  >
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

                {type == 'ARRIVAL' || type == 'DEPARTURE' ? (
                  <View>
                    <Text
                      style={[stylesGlobal.text12, stylesGlobal.paddingRight5]}
                    >
                      {Desc}
                    </Text>
                    {FlightCode ? (
                      <Text>Flight Number: {FlightCode}</Text>
                    ) : null}
                  </View>
                ) : null}

                {type == 'RECREATION' ||
                type == 'EAT' ||
                type == 'CHECKIN' ||
                type == 'CHECKOUT' ||
                type == 'LEAVEACCOMMODATION' ||
                type == 'RETURNACCOMMODATION' ? (
                  <View
                    style={[stylesGlobal.row100, stylesGlobal.paddingRight5]}
                  >
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
                            resizeMode="center"
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
                          {Desc}
                        </Text>
                      ) : (
                        <Text>
                          At {Loc} - {Duration}
                        </Text>
                      )}
                      {type == 'CHECKIN' ||
                      type == 'CHECKOUT' ||
                      type == 'LEAVEACCOMMODATION' ||
                      type == 'RETURNACCOMMODATION' ? (
                        <Text style={stylesGlobal.text12}>
                          {namaProfileAccomo}
                        </Text>
                      ) : null}
                      {Flight ? <Text>Note : </Text> : null}
                      <Text>{Flight ? Flight : ''}</Text>
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
                    <Text style={stylesGlobal.paddingRight5}>
                      at {Loc} - {Duration}{' '}
                    </Text>
                    {type == 'FREETIMELOCKED' ? null : <Text>Note : </Text>}
                    <Text>{Flight ? Flight : ''}</Text>
                  </View>
                ) : null}

                {type == 'DRIVING' ? (
                  <View>
                    <View
                      style={[stylesGlobal.row100, stylesGlobal.paddingRight5]}
                    >
                      {ServiceDriving ? (
                        <Text>
                          With :{' '}
                          {ServiceDriving != undefined || ServiceDriving != null
                            ? ServiceDriving.split('_').join(' ')
                            : ServiceDriving}{' '}
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
                    {(type == 'DRIVING' && ServiceDriving == undefined) ||
                    (type == 'DRIVING' && ServiceDriving == null) ? (
                      <View
                        style={[
                          stylesGlobal.row100,
                          stylesGlobal.rowEnd,
                          styles.paddingTop20,
                        ]}
                      >
                        <TouchableOpacity onPress={addTransport}>
                          <Text
                            style={[
                              stylesGlobal.text14,
                              stylesGlobal.textBold,
                              styles.colorSoftBlue,
                            ]}
                          >
                            Add Transportation
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </View>
                ) : null}

                {showButton ? (
                  type == 'RECREATION' ||
                  type == 'EAT' ||
                  type == 'FREETIME' ||
                  (type == 'DRIVING' && ServiceDriving != undefined) ||
                  (type == 'DRIVING' && ServiceDriving != null) ? (
                    <View
                      style={[
                        stylesGlobal.row100,
                        stylesGlobal.justifyContentEnd,
                        stylesGlobal.alignItemsEnd,
                        styles.textAlignRight,
                      ]}
                    >
                      <TouchableOpacity
                        onPress={
                          (type == 'DRIVING' && ServiceDriving != undefined) ||
                          (type == 'DRIVING' && ServiceDriving != null)
                            ? editTransport
                            : onPressEdit
                        }
                      >
                        <Text
                          style={[
                            stylesGlobal.text14,
                            stylesGlobal.textBold,
                            styles.colorSoftBlue,
                          ]}
                        >
                          Edit
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : null
                ) : null}
              </View>
              {type == 'ARRIVAL' || type == 'DEPARTURE' ? (
                flightWarning ? (
                  <View
                    style={[
                      stylesGlobal.padding10,
                      stylesGlobal.row100,
                      styles.stylesWarningItinerary,
                    ]}
                  >
                    <Text style={stylesGlobal.text12}>{flightWarning}</Text>
                  </View>
                ) : null
              ) : null}
            </Card>
            {type == 'DEPARTURE' ? (
              <Card
                widthCard="90%"
                type="Flat"
                border="#E6CA6B"
                color="#FDFAF0"
              >
                <View style={stylesGlobal.padding10}>
                  <Text style={stylesGlobal.textBold}>Flight Note</Text>
                  <View
                    style={[
                      stylesGlobal.row,
                      stylesGlobal.justifyContentCenter,
                      stylesGlobal.marginBottom10,
                    ]}
                  >
                    <Entypo
                      name="dot-single"
                      size={30}
                      color={stylesGlobal.$goldColor}
                    />
                    <Text style={stylesGlobal.textBold}>
                      Gate closes 40 minutes before departure{' '}
                      {convertDateFormat(Time, 'HH:mm')}. Please be at airport
                      before{' '}
                      {convertDateFormat(SubstractSecond(Time, 2400), 'HH:mm')}.
                    </Text>
                  </View>
                  {Note ? (
                    <View
                      style={[stylesGlobal.paddingLeft5, stylesGlobal.rowStart]}
                    >
                      <Entypo
                        name="dot-single"
                        size={30}
                        color={stylesGlobal.$goldColor}
                      />
                      <Text>{Note}</Text>
                    </View>
                  ) : null}
                </View>
              </Card>
            ) : null}
          </View>
        </View>
      )}
      {Button || overlap ? (
        <View style={styles.rowSpace}>
          <View
            style={[stylesGlobal.width10, stylesGlobal.justifyContentCenter]}
          >
            <View style={styles.positionLine}>
              {overlap == true && Button == false ? (
                type == 'VIRTUALCHECKIN' ||
                type == 'VIRTUALCHECKOUT' ||
                type == 'VIRTUALRETURNACCOMMODATION' ||
                (type == 'DRIVING' && DurationDriving == 0) ||
                (type == 'FREETIME' && DurationFreeTime == 0) ||
                (type == 'FREETIMELOCKED' && DurationFreeTime == 0) ||
                type == 'VIRTUALLEAVEACCOMMODATION' ? null : (
                  <SeperatorRepeat
                    colorsepar={styles.$tintColorStyle}
                    heightsepar={15}
                    repeat={100}
                    widthsepar={1}
                    type="vertical"
                  />
                )
              ) : overlap == false && Button == true ? (
                <SeperatorVertical
                  colorsepar={styles.$tintColorStyle}
                  heightsepar={250}
                  widthsepar={1}
                />
              ) : null}
            </View>
          </View>
          <View
            style={[
              stylesGlobal.width90,
              stylesGlobal.center,
              stylesGlobal.padding10,
            ]}
          >
            <View style={[stylesGlobal.row100, stylesGlobal.center]}>
              {overlap == true && Button == false ? (
                type == 'VIRTUALCHECKIN' ||
                type == 'VIRTUALCHECKOUT' ||
                type == 'VIRTUALRETURNACCOMMODATION' ||
                (type == 'DRIVING' && DurationDriving == 0) ||
                (type == 'FREETIME' && DurationFreeTime == 0) ||
                (type == 'FREETIMELOCKED' && DurationFreeTime == 0) ||
                type == 'VIRTUALLEAVEACCOMMODATION' ? null : (
                  <Card
                    type="Flat"
                    color={styles.$cardWarningOverlayColor}
                    border={styles.$redcolor}
                    widthCard="90%"
                  >
                    <Text style={[stylesGlobal.padding5, stylesGlobal.text12]}>
                      This activity is started on the next day. please arrange
                      your activities or delete this activity and add on the
                      next day.
                    </Text>
                  </Card>
                )
              ) : overlap == false && Button == true ? (
                <NormalButton
                  shadow={true}
                  text=" + ADD NEW ACTIVITES "
                  buttonHeight={40}
                  buttonColor={styles.$softblueColor}
                  textColor="white"
                  textSize={14}
                  buttonWidth="60%"
                  onPress={onPress}
                />
              ) : null}
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
};

CardItenary.propTypes = {
  Title: PropTypes.string,
  Time: PropTypes.string,
  type: PropTypes.string,
  Desc: PropTypes.string,
  Img: PropTypes.string,
  Flight: PropTypes.string,
  Note: PropTypes.string,
  DurationDriving: PropTypes.number,
  Duration: PropTypes.string,
  Button: PropTypes.bool,
  onPress: PropTypes.func,
  Service: PropTypes.string,
  ServiceDriving: PropTypes.string,
  Loc: PropTypes.string,
  onPressEdit: PropTypes.func,
  onPressDelete: PropTypes.func,
  onPressDetail: PropTypes.func,
  AddMove: PropTypes.string,
  addTransport: PropTypes.func,
  onPressDeleteCar: PropTypes.func,
  editTransport: PropTypes.func,
  onPressAccommodation: PropTypes.func,
  DurationFreeTime: PropTypes.number,
  flightWarning: PropTypes.string,
  typeArrival: PropTypes.string,
  LocationFirst: PropTypes.string,
  LocationSecond: PropTypes.string,
  overlap: PropTypes.bool,
  showButton: PropTypes.bool,
  namaProfileAccomo: PropTypes.string,
  FlightCode: PropTypes.string,
};

export default CardItenary;
