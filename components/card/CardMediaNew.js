import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import stylesGlobal from '../styles';

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
      <Image source={IMAGES} resizeMode="stretch" style={styles.image90} />
    )}
    <View style={styles.overlay}>
      <View style={styles.padding}>
        <Text style={styles.textbold14white}>{title}</Text>
        <Text style={styles.textwhite}>{subtitle}</Text>
        <Text style={styles.textwhite}>{packages}</Text>
        <View style={styles.rowSpace}>
          <Text style={styles.textwhiteNoPadding}>Duration: {duration}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
  //</TouchableOpacity>
);

const daily = (image, title, subtitle, duration, onPress) => (
  <TouchableOpacity
    style={[styles.containermediaNew, styles.imageMedia]}
    onPress={onPress}
  >
    {image != undefined && image != '' && (
      <Image
        style={[styles.imageCategory, stylesGlobal.borderRadius5]}
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

    <View
      style={[
        styles.overlaymedia,
        stylesGlobal.borderRadius5,
        styles.imageMedia,
      ]}
    >
      <View style={styles.textbottom}>
        <Text style={styles.textbold20white}>{title}</Text>
        <Text style={styles.textbold14white}>
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
  onPress
) => (
  <TouchableOpacity style={styles.rowImage} onPress={onPress}>
    {image != undefined && (
      <Image
        style={styles.imageCategory}
        source={{ uri: image }}
        resizeMode="contain"
      />
    )}
    {image == undefined && (
      <Image source={IMAGES} resizeMode="center" style={styles.imageCategory} />
    )}
    <View style={styles.overlaycardmiddelcolor}>
      <Text style={[styles.textbold20white, styles.horizontalPadding]}>
        {title}
      </Text>
      <View style={styles.row}>
        <View style={stylesGlobal.width50}>
          <Text style={[styles.textbold14white, styles.horizontalPadding]}>
            {subtitle}
          </Text>
        </View>
        {/* <View style={styles.colNoPadding50}>
          <NormalButton
            text={namabutton}
            buttonWidth="80%"
            bold
            buttonColor={warnabutton}
            textColor={textbuttoncolor}
            onPress={onPress}
          />
        </View> */}
      </View>
    </View>
  </TouchableOpacity>
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
          title === 'Family'
            ? Family
            : title === 'Honeymoon'
            ? Honeymoon
            : title === 'Bachelor'
            ? Bachelor
            : title === 'Group'
            ? Group
            : title === 'Corporate'
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
          title === 'Family'
            ? Family
            : title === 'Honeymoon'
            ? Honeymoon
            : title === 'Bachelor'
            ? Bachelor
            : title === 'Group'
            ? Group
            : title === 'Corporate'
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
      <Text style={[styles.textSize14Bold, styles.horizontalPadding]}>
        {title}
      </Text>
    </View>
  </TouchableOpacity>
);

const CardMediaNew = props => {
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
            onPress
          )
        : type === 'TravelCategory'
        ? travelCategory(image, title, onPress, typeCard)
        : null}
    </View>
  );
};

CardMediaNew.propTypes = {
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
};
export default CardMediaNew;
