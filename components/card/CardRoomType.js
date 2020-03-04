import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import stylesGlobal from '../styles';

import { Ionicons } from '@expo/vector-icons';
import IMAGES from './../../assets/images/NoImage.png';

import { facilitiesAccommodation } from '../../helper/checkingHelper';
import { RibbonGold } from '../ribbon';
import Card from './Card';

const CardRoomType = ({
  Img,
  Desc,
  ProfileFacilities,
  onPress,
  isPromo,
  MinPax,
  namaMeetingRoom,
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
                  style={[styles.Noimage]}
                />
              )}
              {Img == undefined && (
                <Image
                  source={IMAGES}
                  resizeMode="center"
                  style={[styles.Noimage]}
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
                {namaMeetingRoom}
              </Text>
              <View
                style={[
                  stylesGlobal.rowNoPadding,
                  stylesGlobal.width90,
                  stylesGlobal.marginBottom10,
                ]}
              >
                <View style={stylesGlobal.containerIcon20}>
                  <Ionicons name="ios-people" size={20} color="black" />
                </View>
                <Text style={stylesGlobal.text14}>{MinPax} Pax</Text>
              </View>
              <View
                style={[
                  stylesGlobal.rowNoPadding,
                  stylesGlobal.width90,
                  stylesGlobal.marginBottom10,
                ]}
              >
                <Text style={stylesGlobal.text14}>{Desc}</Text>
              </View>
              <Text style={stylesGlobal.text14}>Amenities</Text>
              <View style={[stylesGlobal.rowNoPadding, stylesGlobal.width90]}>
                {ProfileFacilities
                  ? ProfileFacilities.slice(0, 4).map((Aloc, i) => {
                      return (
                        <View
                          key={i}
                          style={[styles.right, stylesGlobal.containerIcon20]}
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
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

CardRoomType.propTypes = {
  Img: PropTypes.string,
  Desc: PropTypes.string,
  ProfileFacilities: PropTypes.array,
  onPress: PropTypes.func,
  isPromo: PropTypes.bool,
  MinPax: PropTypes.number,
  namaMeetingRoom: PropTypes.string,
};

export default CardRoomType;
