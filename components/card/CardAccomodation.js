import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import stylesGlobal from '../styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import IMAGES from '../../assets/images/NoImage.png';
import IconFood from './../../assets/Icon/cook.png';
import IconStar from './../../assets/Icon/stars.png';
import IconClock from './../../assets/Icon/clock.png';
import IconStir from './../../assets/Icon/stir.png';
import IconSeat from './../../assets/Icon/seat.png';
import IconAvailable from './../../assets/Icon/badge_check.png';
import IconSpinner from './../../assets/Icon/spinner.png';
import Card from './Card';
import { RibbonGold } from '../ribbon';
import { facilitiesAccommodation } from '../../helper/checkingHelper';
import { convertRoundPrice } from '../../helper/helper';
class CardAccomodation extends Component {
  state = {
    show: false,
  };

  render() {
    const {
      Img,
      Title,
      Address,
      onPress,
      numberStar,
      ProfileFacilities,
      isPromo,
      type = false,
      typeCard,
      roundedText,
      bottomText,
      subText,
      roundedTextTrans,
      city,
      statusRoom = false,
      estimatedPrice,
      currency,
    } = this.props;
    let stars = new Array(numberStar).fill(0);
    return (
      <View style={styles.bottomMargin}>
        <View style={[styles.ribbonPosition, styles.ribbonGoldIOS]}>
          {isPromo ? (
            <RibbonGold
              label="Promo"
              color1="#fffd9b"
              color2={styles.$goldcolor}
              color3="#b2993d"
              color="#b2993d"
              colorFont="black"
            />
          ) : null}
        </View>
        {type ? (
          <Card widthCard="100%" heightCard={220}>
            <TouchableOpacity onPress={onPress}>
              <View
                style={[
                  stylesGlobal.row100,
                  {
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    overflow: 'hidden',
                  },
                ]}
              >
                <View
                  style={[
                    stylesGlobal.width40,
                    stylesGlobal.backgroundColorGrey,
                    stylesGlobal.center,
                    {
                      height: 220,
                    },
                  ]}
                >
                  {Img != null && Img != undefined && Img != '' ? (
                    <Image
                      source={{ uri: Img }}
                      style={[
                        stylesGlobal.backgroundColorGrey,
                        stylesGlobal.width100,
                        stylesGlobal.flexSize,
                      ]}
                      resizeMode="cover"
                    />
                  ) : (
                    <Image
                      source={IMAGES}
                      style={[
                        stylesGlobal.backgroundColorGrey,
                        styles.Noimage50,
                      ]}
                      resizeMode="center"
                    />
                  )}
                  <View style={stylesGlobal.seeMorePhoto}>
                    <Text
                      style={[
                        stylesGlobal.text14,
                        stylesGlobal.textGold,
                        stylesGlobal.textAlignCenter,
                      ]}
                    >
                      See More Photo
                    </Text>
                  </View>
                </View>
                <View style={[stylesGlobal.width60, stylesGlobal.padding20]}>
                  <Text
                    style={[
                      stylesGlobal.text18,
                      stylesGlobal.textBold,
                      stylesGlobal.paddingBottom10,
                    ]}
                  >
                    {Title}
                  </Text>

                  {typeCard == 'Hotel' ? (
                    <View
                      style={[
                        stylesGlobal.row100,
                        stylesGlobal.paddingBottom10,
                        stylesGlobal.alignItemsCenter,
                      ]}
                    >
                      {stars.map(i => {
                        {
                          return (
                            <Icon
                              key={i}
                              name="grade"
                              size={14}
                              color={styles.$goldcolor}
                            />
                          );
                        }
                      })}
                      <Text> Hotel</Text>
                      <Entypo
                        name="dot-single"
                        size={28}
                        color={styles.$lightGreyColor}
                      />
                      <Text> {Address}</Text>
                    </View>
                  ) : null}

                  {/* {typeCard != 'Transport' ? (
                    <View
                      style={[
                        stylesGlobal.row100,
                        styles.memberLabel,
                        stylesGlobal.alignItemsCenter,
                      ]}
                    >
                      <Text
                        style={[stylesGlobal.text14, stylesGlobal.textGold]}
                      >
                        Gold
                      </Text>
                      <Entypo name="dot-single" size={28} color="#fff" />
                      <Text
                        style={[stylesGlobal.text14, stylesGlobal.textWhite]}
                      >
                        Touress Gold Partner
                      </Text>
                    </View>
                  ) : null} */}

                  {typeCard == 'Hotel' ? (
                    <View style={stylesGlobal.width100}>
                      <Text
                        style={[
                          stylesGlobal.text14,
                          stylesGlobal.textBold,
                          stylesGlobal.marginBottom10,
                        ]}
                      >
                        Services
                      </Text>
                      <View style={stylesGlobal.row100}>
                        {ProfileFacilities
                          ? ProfileFacilities.slice(0, 4).map((Aloc, i) => {
                              return (
                                <View
                                  key={i}
                                  style={[
                                    stylesGlobal.containerIcon20,
                                    styles.right,
                                  ]}
                                >
                                  <Image
                                    source={facilitiesAccommodation(Aloc.Id)}
                                    resizeMode="contain"
                                    style={[
                                      stylesGlobal.imageIcon,
                                      {
                                        tintColor: styles.$darkGrey1Color,
                                      },
                                    ]}
                                  />
                                </View>
                              );
                            })
                          : null}
                        {ProfileFacilities ? (
                          ProfileFacilities.length > 4 ? (
                            <View
                              style={[
                                stylesGlobal.containerIcon20,
                                styles.right,
                              ]}
                            >
                              <MaterialCommunityIcons
                                name="dots-horizontal"
                                size={20}
                                color="black"
                              />
                            </View>
                          ) : null
                        ) : null}
                      </View>
                    </View>
                  ) : null}
                </View>
              </View>
            </TouchableOpacity>
          </Card>
        ) : (
          <Card widthCard="90%">
            <TouchableOpacity onPress={onPress}>
              <View style={stylesGlobal.row100}>
                <View
                  style={[
                    stylesGlobal.width40,
                    styles.positionAccommodation,
                    stylesGlobal.backgroundColorGrey,
                    stylesGlobal.center,
                  ]}
                >
                  {Img != null || Img != undefined ? (
                    <Image
                      source={{ uri: Img }}
                      style={[
                        stylesGlobal.backgroundColorGrey,
                        stylesGlobal.width100,
                        stylesGlobal.flexSize,
                      ]}
                    />
                  ) : (
                    <Image
                      source={IMAGES}
                      style={[
                        stylesGlobal.backgroundColorGrey,
                        styles.Noimage50,
                      ]}
                      resizeMode="center"
                    />
                  )}

                  <View style={stylesGlobal.seeMorePhoto}>
                    <Text
                      style={[
                        stylesGlobal.text14,
                        stylesGlobal.textGold,
                        stylesGlobal.textAlignCenter,
                      ]}
                    >
                      See More Photo
                    </Text>
                  </View>
                </View>
                <View style={[stylesGlobal.width60, stylesGlobal.padding20]}>
                  <Text style={[stylesGlobal.text18, stylesGlobal.textBold]}>
                    {Title}
                  </Text>

                  {typeCard == 'Hotel' || typeCard == 'MeetingRoom' ? (
                    <View
                      style={[
                        stylesGlobal.row100,
                        stylesGlobal.paddingBottom10,
                        stylesGlobal.alignItemsCenter,
                        stylesGlobal.paddingTop10,
                      ]}
                    >
                      {stars.map(i => {
                        {
                          return (
                            <Icon
                              key={i}
                              name="grade"
                              size={14}
                              color={styles.$goldcolor}
                            />
                          );
                        }
                      })}
                    </View>
                  ) : null}

                  {typeCard == 'Hotel' ? (
                    <View
                      style={[
                        stylesGlobal.row100,
                        stylesGlobal.paddingBottom10,
                        stylesGlobal.alignItemsCenter,
                      ]}
                    >
                      <Text> Hotel</Text>
                      <Entypo
                        name="dot-single"
                        size={28}
                        color={styles.$lightGreyColor}
                      />
                      <Text style={[stylesGlobal.text12, { flex: 0.95 }]}>
                        {' '}
                        {Address}
                      </Text>
                    </View>
                  ) : null}

                  {typeCard == 'Hotel' ? (
                    <View
                      style={[
                        stylesGlobal.row100,
                        stylesGlobal.paddingBottom10,
                        stylesGlobal.alignItemsCenter,
                      ]}
                    >
                      <View style={stylesGlobal.containerIcon20}>
                        <Image
                          source={statusRoom ? IconAvailable : IconSpinner}
                          style={stylesGlobal.imageIcon}
                          resizeMode="center"
                        />
                      </View>
                      <Text style={stylesGlobal.paddingLeft10}>
                        {statusRoom ? 'Available' : 'On Request'}
                      </Text>
                    </View>
                  ) : null}

                  {typeCard == 'MeetingRoom' ? (
                    <View
                      style={[
                        stylesGlobal.row100,
                        stylesGlobal.paddingBottom10,
                        stylesGlobal.alignItemsCenter,
                      ]}
                    >
                      <View style={stylesGlobal.width20}>
                        <MaterialCommunityIcons
                          name="map-marker-outline"
                          size={18}
                          color={styles.$lightGreyColor}
                        />
                      </View>
                      <View style={stylesGlobal.width80}>
                        <Text style={[stylesGlobal.text12, { flex: 0.95 }]}>
                          {Address}
                        </Text>
                      </View>
                    </View>
                  ) : null}

                  {typeCard == 'Transport' ? (
                    <View style={stylesGlobal.marginTop10}>
                      <View
                        style={[
                          stylesGlobal.rowStart,
                          stylesGlobal.rowNoPadding,
                          stylesGlobal.borderRadius20,
                          styles.width100,
                          styles.height20,
                          styles.backgroundColorGrey,
                        ]}
                      >
                        <Text
                          style={[
                            stylesGlobal.text10,
                            styles.padding3,
                            styles.leftPadding7,
                          ]}
                        >
                          {roundedTextTrans}
                        </Text>
                      </View>
                    </View>
                  ) : null}

                  {typeCard == 'Transport' ? (
                    <View style={stylesGlobal.marginTop10}>
                      <View
                        style={[
                          stylesGlobal.center,
                          stylesGlobal.row60,
                          stylesGlobal.borderRadius20,
                          styles.backgroundColorGrey,
                        ]}
                      >
                        <View
                          style={[
                            stylesGlobal.containerIcon20,
                            styles.padding3,
                          ]}
                        >
                          <Image
                            source={IconSeat}
                            style={[
                              stylesGlobal.imageIcon,
                              { tintColor: styles.$darkGrey1Color },
                            ]}
                          />
                        </View>
                        <Text style={stylesGlobal.text10}>
                          {' '}
                          {roundedText} Passenger
                        </Text>
                      </View>
                    </View>
                  ) : null}

                  {typeCard == 'Excurtion' || typeCard == 'Restaurant' ? (
                    <View
                      style={[
                        stylesGlobal.row100,
                        stylesGlobal.center,
                        stylesGlobal.marginTop10,
                      ]}
                    >
                      <View
                        style={[
                          stylesGlobal.width60,
                          stylesGlobal.center,
                          styles.paddingLeft0,
                        ]}
                      >
                        <View
                          style={[
                            stylesGlobal.row100,
                            stylesGlobal.center,
                            stylesGlobal.borderRadius20,
                            styles.backgroundColorGrey,
                          ]}
                        >
                          <View
                            style={[
                              stylesGlobal.containerIcon20,
                              stylesGlobal.padding2,
                            ]}
                          >
                            {typeCard == 'Excurtion' ? (
                              <Image
                                source={IconClock}
                                style={[
                                  stylesGlobal.imageIcon,
                                  { tintColor: styles.$darkGrey1Color },
                                ]}
                              />
                            ) : null}
                            {typeCard == 'Restaurant' ? (
                              <Image
                                source={IconStar}
                                style={[
                                  stylesGlobal.imageIcon,
                                  { tintColor: styles.$darkGrey1Color },
                                ]}
                              />
                            ) : null}
                          </View>
                          <Text style={stylesGlobal.text10}>{roundedText}</Text>
                        </View>
                      </View>
                      <View style={stylesGlobal.width40}>
                        <View
                          style={[stylesGlobal.row100, stylesGlobal.center]}
                        >
                          <Entypo
                            name="dot-single"
                            size={20}
                            color={styles.$lightGreyColor}
                          />
                          <Text style={stylesGlobal.text12}>{city}</Text>
                        </View>
                      </View>
                    </View>
                  ) : null}

                  {typeCard == 'Excurtion' ? (
                    <View
                      style={[stylesGlobal.row100, stylesGlobal.marginTop10]}
                    >
                      <Text style={stylesGlobal.text14}>{subText}</Text>
                    </View>
                  ) : null}

                  {typeCard == 'Restaurant' ||
                  typeCard == 'Excurtion' ||
                  typeCard == 'Transport' ? (
                    <View
                      style={[
                        stylesGlobal.justifyContentStart,
                        stylesGlobal.row100,
                        stylesGlobal.marginTop10,
                      ]}
                    >
                      <View
                        style={[stylesGlobal.containerIcon20, styles.padding3]}
                      >
                        {typeCard == 'Restaurant' ? (
                          <Image
                            source={IconFood}
                            style={[
                              stylesGlobal.imageIcon,
                              { tintColor: styles.$darkGrey1Color },
                            ]}
                          />
                        ) : null}
                        {typeCard == 'Transport' ? (
                          <Image
                            source={IconStir}
                            style={[
                              stylesGlobal.imageIcon,
                              { tintColor: styles.$darkGrey1Color },
                            ]}
                          />
                        ) : null}
                      </View>
                      <Text style={stylesGlobal.text14}> {bottomText}</Text>
                    </View>
                  ) : null}

                  {typeCard == 'Hotel' || typeCard == 'MeetingRoom' ? (
                    <View style={stylesGlobal.width100}>
                      <Text
                        style={[
                          stylesGlobal.text14,
                          stylesGlobal.textBold,
                          stylesGlobal.marginBottom10,
                        ]}
                      >
                        {typeCard == 'MeetingRoom' ? 'Facilities' : 'Services'}
                      </Text>
                      <View style={stylesGlobal.row100}>
                        {ProfileFacilities
                          ? ProfileFacilities.slice(0, 4).map((Aloc, i) => {
                              return (
                                <View
                                  key={i}
                                  style={[
                                    styles.right,
                                    stylesGlobal.containerIcon20,
                                  ]}
                                >
                                  <Image
                                    source={facilitiesAccommodation(Aloc.Id)}
                                    resizeMode="contain"
                                    style={[
                                      stylesGlobal.imageIcon,
                                      {
                                        tintColor: styles.$darkGrey1Color,
                                      },
                                    ]}
                                  />
                                </View>
                              );
                            })
                          : null}
                        {ProfileFacilities ? (
                          ProfileFacilities.length > 4 ? (
                            <View
                              style={[
                                stylesGlobal.containerIcon20,
                                styles.right,
                              ]}
                            >
                              <MaterialCommunityIcons
                                name="dots-horizontal"
                                size={22}
                                color={styles.$darkGrey1Color}
                              />
                            </View>
                          ) : null
                        ) : null}
                      </View>
                    </View>
                  ) : null}

                  {typeCard == 'Hotel' ||
                  typeCard == 'Excurtion' ||
                  typeCard == 'Restaurant' ||
                  estimatedPrice ? (
                    <View
                      style={[
                        stylesGlobal.width100,
                        stylesGlobal.textAlignRight,
                        stylesGlobal.marginTop10,
                      ]}
                    >
                      <Text
                        style={[
                          stylesGlobal.text14,
                          stylesGlobal.marginBottom10,
                          stylesGlobal.textAlignRight,
                          stylesGlobal.textGrey,
                        ]}
                      >
                        Estimated Total Price
                      </Text>
                      <Text
                        style={[
                          stylesGlobal.text14,
                          stylesGlobal.marginBottom10,
                          stylesGlobal.textAlignRight,
                        ]}
                      >
                        {`${currency} ${convertRoundPrice(
                          estimatedPrice,
                          currency
                        )}`}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>
            </TouchableOpacity>
          </Card>
        )}
      </View>
    );
  }
}

CardAccomodation.propTypes = {
  Img: PropTypes.string,
  Title: PropTypes.string,
  Address: PropTypes.string,
  namabutton: PropTypes.string,
  show: PropTypes.bool,
  onPress: PropTypes.func,
  numberStar: PropTypes.number,
  ProfileFacilities: PropTypes.array,
  widthCard: PropTypes.string,
  isPromo: PropTypes.bool,
  type: PropTypes.bool,
  typeCard: PropTypes.string,
  roundedText: PropTypes.string,
  bottomText: PropTypes.string,
  subText: PropTypes.string,
  roundedTextTrans: PropTypes.string,
  city: PropTypes.string,
  statusRoom: PropTypes.bool,
  estimatedPrice: PropTypes.string,
  currency: PropTypes.string,
};

export default CardAccomodation;
