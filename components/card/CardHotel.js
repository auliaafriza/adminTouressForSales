import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import stylesGlobal from '../styles';

import IconRoomType from './../../assets/Icon/room_type.png';
import IconSpinner from './../../assets/Icon/spinner.png';
import IconAvailable from './../../assets/Icon/badge_check.png';
import IconUser from './../../assets/Icon/user.png';
import IMAGES from './../../assets/images/NoImage.png';

import { RibbonGold } from '../ribbon';
import Card from './Card';
import { convertRoundPrice } from '../../helper/helper';

const CardHotel = ({
  Img,
  hoteltype,
  hotelservice,
  capacityroom,
  onPress,
  isPromo,
  statusRoom = false,
  estimatedPrice,
  currency,
}) => {
  return (
    <View>
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
      <Card widthCard="100%">
        <TouchableOpacity onPress={onPress}>
          <View style={[stylesGlobal.rowNoPadding, stylesGlobal.width100]}>
            <View style={stylesGlobal.width40}>
              {Img != undefined && (
                <Image
                  source={{ uri: Img }}
                  resizeMode="cover"
                  style={styles.Noimage}
                />
              )}
              {Img == undefined && (
                <Image
                  source={IMAGES}
                  resizeMode="center"
                  style={styles.Noimage}
                />
              )}
            </View>
            <View style={[stylesGlobal.width60, styles.bottom]}>
              <Text
                style={[
                  stylesGlobal.text18,
                  stylesGlobal.textBold,
                  stylesGlobal.marginBottom10,
                ]}
              >
                {hoteltype}
              </Text>
              <View
                style={[
                  stylesGlobal.rowNoPadding,
                  stylesGlobal.width90,
                  stylesGlobal.marginBottom10,
                ]}
              >
                <View style={stylesGlobal.containerIcon20}>
                  <Image
                    source={statusRoom ? IconAvailable : IconSpinner}
                    style={stylesGlobal.imageIcon}
                    resizeMode="center"
                  />
                </View>
                <Text style={stylesGlobal.text14}>
                  {statusRoom ? 'Available' : 'On Request'}
                </Text>
              </View>
              <View
                style={[
                  stylesGlobal.rowNoPadding,
                  stylesGlobal.width90,
                  stylesGlobal.marginBottom10,
                ]}
              >
                <View style={stylesGlobal.containerIcon20}>
                  <Image
                    source={IconRoomType}
                    style={[stylesGlobal.imageIcon, stylesGlobal.tintColorGrey]}
                    resizeMode="center"
                  />
                </View>
                <Text style={stylesGlobal.text14}> {hotelservice}</Text>
              </View>
              <View style={[stylesGlobal.rowNoPadding, stylesGlobal.width90]}>
                <View style={stylesGlobal.containerIcon20}>
                  <Image
                    source={IconUser}
                    style={[stylesGlobal.imageIcon, stylesGlobal.tintColorGrey]}
                    resizeMode="center"
                  />
                </View>
                <Text style={stylesGlobal.text14}>
                  {' '}
                  {capacityroom} Guest/Room
                </Text>
              </View>
              {estimatedPrice ? (
                <View
                  style={[
                    stylesGlobal.width100,
                    stylesGlobal.textAlignRight,
                    // stylesGlobal.marginTop10,
                    stylesGlobal.paddingRight10,
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
    </View>
  );
};

CardHotel.propTypes = {
  Img: PropTypes.string,
  hoteltype: PropTypes.string,
  hotelservice: PropTypes.string,
  capacityroom: PropTypes.number,
  namabutton: PropTypes.string,
  onPress: PropTypes.func,
  isPromo: PropTypes.bool,
  statusRoom: PropTypes.bool,
  estimatedPrice: PropTypes.number,
  currency: PropTypes.string,
};

export default CardHotel;
