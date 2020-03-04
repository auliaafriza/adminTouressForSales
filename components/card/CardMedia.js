import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import stylesGlobal from '../styles';
import Card from './Card';

//image
import IMAGES from './../../assets/images/NoImage.png';
import Bachelor from './../../assets/images/layer_11.png';
import Group from './../../assets/images/layer_12.png';
import Corporate from './../../assets/images/layer_10.png';
import Honeymoon from './../../assets/images/layer_6.png';
import Family from './../../assets/images/layer_7.png';

const excrution = (
  image,
  title,
  subtitle,
  packages,
  duration,
  namabutton,
  warnabutton,
  onPress
) => (
  // <TouchableOpacity onPress={onPress}>
  <TouchableOpacity style={styles.containerCardMaster} onPress={onPress}>
    {image != undefined && (
      <Image style={styles.image} source={{ uri: image }} resizeMode="cover" />
    )}
    {image == undefined && (
      <Image source={IMAGES} resizeMode="center" style={styles.image90} />
    )}
    <View style={styles.overlay}>
      <View style={styles.paddingLeftRight}>
        <Text
          style={[
            stylesGlobal.textBold,
            stylesGlobal.text14,
            stylesGlobal.colorWhite,
          ]}
        >
          {title}
        </Text>
        <Text style={styles.textwhite}>{subtitle}</Text>
        <Text style={styles.textwhite}>{packages}</Text>
        <View style={styles.rowSpace}>
          <Text style={styles.textwhiteNoPadding}>Duration: {duration}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const daily = (image, title, subtitle, duration, onPress) => (
  <TouchableOpacity style={styles.containermedia} onPress={onPress}>
    {image != undefined && image != '' && (
      <Image
        style={styles.image100}
        source={{ uri: image }}
        resizeMode="cover"
      />
    )}
    {image == undefined && (
      <Image source={IMAGES} resizeMode="center" style={styles.image} />
    )}
    {image == '' && (
      <Image source={IMAGES} resizeMode="center" style={styles.image} />
    )}

    <View style={styles.overlaymedia}>
      <View style={styles.textbottom}>
        <Text
          style={[
            stylesGlobal.textBold,
            stylesGlobal.text20,
            stylesGlobal.colorWhite,
          ]}
        >
          {title}
        </Text>
        <Text
          style={[
            stylesGlobal.textBold,
            stylesGlobal.text14,
            stylesGlobal.colorWhite,
          ]}
        >
          Day {subtitle} : {duration}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const itinerary = (
  image,
  title,
  subtitle,
  namabutton,
  warnabutton,
  textbuttoncolor,
  onPress,
  day
) => (
  <Card widthCard="90%" heightCard={100}>
    <TouchableOpacity onPress={onPress}>
      <View style={stylesGlobal.row100}>
        <View
          style={[
            stylesGlobal.width40,
            stylesGlobal.center,
            stylesGlobal.padding20,
          ]}
        >
          <Text style={[stylesGlobal.text18, stylesGlobal.textBold]}>
            {day}
          </Text>
          <Text style={stylesGlobal.text14}>{subtitle}</Text>
        </View>
        <View style={[stylesGlobal.width60, styles.positionImageCardMedia]}>
          {image != undefined && (
            <Image
              style={[styles.imageCategory, styles.imageCardMedia]}
              source={{ uri: image }}
              resizeMode="stretch"
            />
          )}
          {image == undefined && (
            <Image
              source={IMAGES}
              resizeMode="center"
              style={[styles.imageCategory, styles.imageCardMedia]}
            />
          )}
          <View style={[stylesGlobal.center, styles.positionTextCardMedia]}>
            <Text
              style={[
                stylesGlobal.text26,
                stylesGlobal.textwhite,
                stylesGlobal.textBold,
                stylesGlobal.alignSelfCenter,
              ]}
            >
              {' '}
              {title}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  </Card>
);

const travelCategory = (image, title, onPress, typeCard) => (
  <TouchableOpacity
    style={
      typeCard === 'Category' ? styles.containercard : styles.containermedia
    }
    onPress={onPress}
  >
    {image != undefined && image != '' && (
      <Image
        style={styles.imageCategory}
        source={{ uri: image }}
        resizeMode="cover"
      />
    )}
    {image == undefined && (
      <Image
        style={styles.imageCategory}
        source={
          title == 'Family'
            ? Family
            : title == 'Honeymoon'
            ? Honeymoon
            : title == 'Bachelor'
            ? Bachelor
            : title == 'Group'
            ? Group
            : title == 'Corporate'
            ? Corporate
            : IMAGES
        }
        resizeMode="contain"
      />
    )}
    {image == '' && (
      <Image
        style={styles.imageCategory}
        source={
          title == 'Family'
            ? Family
            : title == 'Honeymoon'
            ? Honeymoon
            : title == 'Bachelor'
            ? Bachelor
            : title == 'Group'
            ? Group
            : title == 'Corporate'
            ? Corporate
            : IMAGES
        }
        resizeMode="contain"
      />
    )}

    <View
      style={
        typeCard === 'Category' ? styles.overlayfull : styles.overlayfull30
      }
    >
      <Text
        style={[
          stylesGlobal.text14,
          stylesGlobal.textBold,
          stylesGlobal.colorWhite,
          styles.horizontalPadding,
        ]}
      >
        {title}
      </Text>
    </View>
  </TouchableOpacity>
);

const CardMedia = props => {
  const {
    title,
    subtitle,
    image,
    type,
    packages,
    duration,
    namabutton,
    warnabutton,
    textbuttoncolor,
    onPress,
    typeCard,
    day,
  } = props;

  return (
    <View>
      {type === 'excrution'
        ? excrution(
            image,
            title,
            subtitle,
            packages,
            duration,
            namabutton,
            warnabutton,
            onPress
          )
        : type === 'daily'
        ? daily(image, title, subtitle, duration, onPress)
        : type === 'itinerary'
        ? itinerary(
            image,
            title,
            subtitle,
            namabutton,
            warnabutton,
            textbuttoncolor,
            onPress,
            day
          )
        : type === 'TravelCategory'
        ? travelCategory(image, title, onPress, typeCard)
        : null}
    </View>
  );
};

CardMedia.propTypes = {
  type: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  packages: PropTypes.string,
  duration: PropTypes.string,
  namabutton: PropTypes.string,
  warnabutton: PropTypes.string,
  textbuttoncolor: PropTypes.string,
  onPress: PropTypes.func,
  typeCard: PropTypes.string,
  day: PropTypes.string,
};
export default CardMedia;
