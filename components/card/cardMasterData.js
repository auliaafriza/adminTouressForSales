import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import stylesGlobal from '../styles';
import PropTypes from 'prop-types';
import { NormalButton, ClearButton } from '../button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IMAGES from './../../assets/images/NoImage.png';
import imageLogo from './../../assets/Icon/restorant_speciality.png';
import Card from './Card';

const transport = (Img, Title, typemasterdata, address, area, onPress) => (
  <Card>
    <View style={[stylesGlobal.rowNoPadding, stylesGlobal.width90]}>
      <View style={[stylesGlobal.width40, stylesGlobal.center]}>
        {Img != undefined && (
          <View style={stylesGlobal.width40}>
            <Image
              source={{ uri: Img }}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
        )}

        {Img == undefined && (
          <View style={[stylesGlobal.width40, stylesGlobal.center]}>
            <Image source={IMAGES} resizeMode="center" style={styles.Noimage} />
          </View>
        )}
      </View>
      <View style={stylesGlobal.col60}>
        <Text
          style={[
            stylesGlobal.text18,
            stylesGlobal.textBold,
            stylesGlobal.colorGold,
          ]}
        >
          {Title}
        </Text>
        <View style={[stylesGlobal.rowNoPadding, stylesGlobal.width100]}>
          <Text
            style={[
              stylesGlobal.text12,
              stylesGlobal.textBold,
              stylesGlobal.colorGold,
            ]}
          >
            Standard
          </Text>
          <Icon name="grade" color={styles.$goldcolor} size={15} />
        </View>
        {typemasterdata === 'suplier' ? (
          <View style={[stylesGlobal.rowNoPadding, stylesGlobal.width100]}>
            <Text>Area: {area}</Text>
          </View>
        ) : null}
        {typemasterdata === 'suplier' ? (
          <View style={[stylesGlobal.rowNoPadding, stylesGlobal.width100]}>
            <Icon name="place" color={styles.$goldcolor} size={15} />
            <Text style={stylesGlobal.textJustify}>{address}</Text>
          </View>
        ) : null}
        <View
          style={[
            stylesGlobal.rowNoPadding,
            stylesGlobal.width100,
            stylesGlobal.center,
          ]}
        >
          {typemasterdata === 'suplier' ? null : ( // /> //   onPress={onPress} //   text="OPEN MAP" //   textColor={styles.$goldcolor} // <ClearButton
            <NormalButton
              text="SEE DETAIL"
              buttonWidth="80%"
              buttonColor={styles.$goldcolor}
              textColor="white"
              onPress={onPress}
            />
          )}
        </View>
      </View>
    </View>
  </Card>
);

const restaurant = (
  Img,
  Title,
  typemasterdata,
  Address,
  nameitem,
  makanan,
  onPress,
  textButton,
  onPressButton
) => {
  return (
    <Card widthCard="95%">
      <TouchableOpacity onPress={onPress}>
        <View style={[stylesGlobal.rowNoPadding, stylesGlobal.width100]}>
          {Img != undefined && Img != '' && (
            <View style={stylesGlobal.width40}>
              <Image
                source={{ uri: Img }}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
          )}

          {Img == undefined && (
            <View style={[stylesGlobal.width40, stylesGlobal.center]}>
              <Image
                source={IMAGES}
                resizeMode="center"
                style={styles.Noimage}
              />
            </View>
          )}

          {Img == '' && (
            <View style={[stylesGlobal.width40, stylesGlobal.center]}>
              <Image
                source={IMAGES}
                resizeMode="center"
                style={styles.Noimage}
              />
            </View>
          )}

          <View style={[stylesGlobal.width60, styles.bottom]}>
            <Text
              style={[
                stylesGlobal.text18,
                stylesGlobal.textBold,
                stylesGlobal.colorGold,
              ]}
            >
              {Title}
            </Text>
            <View style={[stylesGlobal.rowNoPadding, stylesGlobal.width100]}>
              {typemasterdata === 'menu' ? (
                <Text style={styles.textbold11}>{nameitem}</Text>
              ) : null}
            </View>

            {typemasterdata === 'menu' ? (
              <Text style={styles.textbold11}>{makanan}</Text>
            ) : (
              <View
                style={[
                  stylesGlobal.rowNoPadding,
                  stylesGlobal.width100,
                  styles.rightPadding,
                ]}
              >
                <Icon size={15} color={styles.$goldcolor} name="place" />
                <Text style={[stylesGlobal.text10, stylesGlobal.textJustify]}>
                  {Address}
                </Text>
              </View>
            )}

            {typemasterdata === 'menu' ? (
              <View>
                <Text style={stylesGlobal.text10}>{Address}</Text>
                <ClearButton
                  textColor={styles.$goldcolor}
                  text={textButton}
                  textSize={12}
                  onPress={onPressButton}
                />
              </View>
            ) : (
              <View
                style={[
                  stylesGlobal.rowNoPadding,
                  stylesGlobal.width100,
                  styles.rightPadding,
                ]}
              >
                {nameitem == null || nameitem == '' ? null : (
                  <Image
                    source={imageLogo}
                    style={styles.imageIcon15}
                    resizeMode="center"
                  />
                )}
                <Text style={styles.textbold11}>{nameitem}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};
const cardMasterData = props => {
  const {
    Img,
    Title,
    type,
    address,
    area,
    typemasterdata,
    Address,
    nameitem,
    makanan,
    onPress,
    textButton,
    onPressButton,
  } = props;

  return (
    <View>
      {type === 'transport'
        ? transport(Img, Title, typemasterdata, address, area, onPress)
        : type === 'restaurant'
        ? restaurant(
            Img,
            Title,
            typemasterdata,
            Address,
            nameitem,
            makanan,
            onPress,
            textButton,
            onPressButton
          )
        : null}
    </View>
  );
};

cardMasterData.propTypes = {
  Img: PropTypes.string,
  Title: PropTypes.string,
  type: PropTypes.string,
  address: PropTypes.string,
  area: PropTypes.string,
  typemasterdata: PropTypes.string,
  iconname1: PropTypes.string,
  Address: PropTypes.string,
  iconitem: PropTypes.string,
  nameitem: PropTypes.string,
  makanan: PropTypes.string,
  setmenu: PropTypes.string,
  tipe: PropTypes.string,
  deskripsi: PropTypes.string,
  onPress: PropTypes.func,
  textButton: PropTypes.string,
  onPressButton: PropTypes.func,
};

export default cardMasterData;
