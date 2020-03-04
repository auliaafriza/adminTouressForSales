import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import stylesGlobal from '../styles';
import { SeperatorRepeat } from '../list';
//image
import IMAGES from './../../assets/images/NoImage.png';
import ImageAccommodation from './../../assets/images/accommodation.png';
import ImageAttraction from './../../assets/images/excursion_background.png';
import ImageRestaurant from './../../assets/images/restaurant_background.png';
import ImageFlight from './../../assets/images/flight_background.png';
import ImageTransportation from './../../assets/images/transportation_background.png';

const CardDetailOrderItem = (orderedItem, onPress, title, packageType) => (
  <TouchableOpacity
    style={[styles.containermediaNew, styles.imageMedia]}
    onPress={() => onPress(title, packageType)}
  >
    {title === 'Accommodation' ? (
      <Image
        source={ImageAccommodation}
        resizeMode="cover"
        style={[styles.image100, stylesGlobal.borderRadius5]}
      />
    ) : title === 'Flight' ? (
      <Image
        source={ImageFlight}
        resizeMode="cover"
        style={[styles.image100, stylesGlobal.borderRadius5]}
      />
    ) : title === 'Restaurant' ? (
      <Image
        source={ImageRestaurant}
        resizeMode="cover"
        style={[styles.image100, stylesGlobal.borderRadius5]}
      />
    ) : title === 'Attraction' ? (
      <Image
        source={ImageAttraction}
        resizeMode="cover"
        style={[styles.image100, stylesGlobal.borderRadius5]}
      />
    ) : title === 'Transportation' ? (
      <Image
        source={ImageTransportation}
        resizeMode="cover"
        style={[styles.image100, stylesGlobal.borderRadius5]}
      />
    ) : (
      <Image
        source={IMAGES}
        resizeMode="cover"
        style={[styles.image100, stylesGlobal.borderRadius5]}
      />
    )}
    <View
      style={[
        styles.overlaymedia,
        stylesGlobal.borderRadius5,
        styles.imageMedia,
      ]}
    >
      <View>
        <Text style={[styles.textbold16White, styles.ribbonPosition]}>
          {title}
        </Text>
        <SeperatorRepeat
          repeat={31}
          widthsepar={8}
          heightSepar={1}
          colorSepar="#fff"
        />

        {orderedItem.map((data, i) => (
          <Text
            style={[styles.textbold14white, styles.paddingLeftRight]}
            key={i}
          >
            {data}
          </Text>
        ))}
      </View>
    </View>
  </TouchableOpacity>
);

const CardOrderedItem = props => {
  const { title, orderedItemData, onPress, packageType } = props;
  return (
    <View>
      {CardDetailOrderItem(orderedItemData, onPress, title, packageType)}
    </View>
  );
};

CardOrderedItem.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  orderedItemData: PropTypes.object,
  packageType: PropTypes.string,
};
export default CardOrderedItem;
