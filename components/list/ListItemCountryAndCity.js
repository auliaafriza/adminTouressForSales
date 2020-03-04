import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import stylesGlobal from '../styles';
import Seperator from './seperator';
import IMG_BG from '../../assets/images/NoImage.png';

const ListItemCountry = (item, onPress) => {
  const IMG =
    item.ImageUrl == '' || item.ImageUrl == null ? (
      <Image source={IMG_BG} style={styles.img} />
    ) : (
      <Image source={{ uri: item.ImageUrl }} style={styles.img} />
    );

  return (
    <TouchableOpacity onPress={onPress} underlayColor={styles.layColor}>
      <View style={[styles.row, styles.marginBottom20]}>
        <View style={stylesGlobal.width10}>{IMG}</View>
        <View
          style={[
            stylesGlobal.width90,
            styles.paddingHorizontalwithwrap,
            styles.positionListItemCountry,
          ]}
        >
          <Text style={styles.paddingLeft5}>{item.Name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ListItemCity = (item, onPress) => {
  const IMG =
    item.ImageUrl == '' || item.ImageUrl == null ? (
      <Image source={IMG_BG} style={styles.img} />
    ) : (
      <Image source={{ uri: item.ImageUrl }} style={styles.img} />
    );

  return (
    <TouchableOpacity onPress={onPress} underlayColor={styles.layColor}>
      <View style={[styles.row, styles.marginBottom20]}>
        <View style={stylesGlobal.width10}>{IMG}</View>
        <View
          style={[
            stylesGlobal.width90,
            styles.paddingHorizontalwithwrap,
            styles.positionListItemCountry,
          ]}
        >
          <Text style={[styles.text, styles.paddingLeft5]}>{item.Name}</Text>
          <Text style={styles.subTitle}>
            {item.Region.Name}, {item.Country.Name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ListItemLanguage = (item, onPress) => {
  // return (
  //   <TouchableOpacity onPress={onPress} underlayColor={styles.layColor}>
  //     <View style={[stylesGlobal.row100, stylesGlobal.padding20]}>
  //       <View style={[stylesGlobal.width60, stylesGlobal.rowStart]}>
  //         <Text
  //           style={[
  //             stylesGlobal.textJustify,
  //             stylesGlobal.text16,
  //             stylesGlobal.textBold,
  //           ]}
  //         >
  //           {item.EnglishName}
  //         </Text>
  //       </View>
  //       <View style={[stylesGlobal.width40, stylesGlobal.rowStart]}>
  //         <Text
  //           style={[
  //             stylesGlobal.textJustify,
  //             stylesGlobal.text16,
  //             styles.colorGrey,
  //           ]}
  //         >
  //           {item.LocalName}
  //         </Text>
  //       </View>
  //     </View>
  //   </TouchableOpacity>
  // );
  const IMG =
    item.ImageUrl == '' || item.ImageUrl == null ? (
      <Image source={IMG_BG} style={styles.img} />
    ) : (
      <Image source={{ uri: item.ImageUrl }} style={styles.img} />
    );

  return (
    <TouchableOpacity onPress={onPress} underlayColor={styles.layColor}>
      <View style={[styles.row, styles.marginBottom20]}>
        <View style={stylesGlobal.width10}>{IMG}</View>
        <View
          style={[
            stylesGlobal.width90,
            styles.paddingHorizontalwithwrap,
            styles.positionListItemCountry,
          ]}
        >
          <Text style={styles.paddingLeft5}>{item.EnglishName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ListAirport = (item, onPress) => {
  const IMG =
    item.ImageUrl == '' || item.ImageUrl == null ? (
      <Image source={IMG_BG} style={styles.img} />
    ) : (
      <Image source={{ uri: item.ImageUrl }} style={styles.img} />
    );

  return (
    <TouchableOpacity onPress={onPress} underlayColor={styles.layColor}>
      <View style={[styles.row, styles.marginBottom20]}>
        {/* <View style={stylesGlobal.width10}>{IMG}</View> */}
        <View
          style={[
            stylesGlobal.width100,
            styles.paddingHorizontalwithwrap,
            styles.positionListItemCountry,
          ]}
        >
          <Text
            style={[styles.text, styles.paddingLeft5, stylesGlobal.textBold]}
          >
            {item.Code}
          </Text>
          <Text style={styles.subTitle}>{item.Name}</Text>
          <Text style={[styles.subTitle, stylesGlobal.textDarkGrey]}>
            {item.City ? item.City.Name : ''},{' '}
            {item.Country ? item.Country.Name : ''}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ListCustomer = (item, onPress) => {
  // const IMG =
  //   item.ImageUrl == '' || item.ImageUrl == null ? (
  //     <Image source={IMG_BG} style={styles.img} />
  //   ) : (
  //     <Image source={{ uri: item.ImageUrl }} style={styles.img} />
  //   );

  return (
    <TouchableOpacity onPress={onPress} underlayColor={styles.layColor}>
      <Text
        style={[
          stylesGlobal.textJustify,
          stylesGlobal.text16,
          stylesGlobal.padding20,
          stylesGlobal.textBold,
        ]}
      >
        {item.Name}
      </Text>
      {/* <View style={styles.row}>
        <View style={stylesGlobal.width10}>{IMG}</View>
        <View style={[stylesGlobal.width90, styles.paddingHorizontalwithwrap]}>
          <Text
            style={[
              stylesGlobal.textJustify,
              stylesGlobal.text16,
              styles.paddingLeft5,
            ]}
          >
            {item.Name}
          </Text>
          <Text style={styles.subTitle}>Company Code: {item.Code}</Text>
          <Text style={styles.subTitle}>Telp: {item.Telephone}</Text>
          <Text style={styles.subTitle}>{item.Address}</Text>
        </View>
      </View>
      <Seperator /> */}
    </TouchableOpacity>
  );
};

const ListUserCustomer = (item, onPress) => {
  return (
    <TouchableOpacity onPress={onPress} underlayColor={styles.layColor}>
      <View style={[stylesGlobal.row100, stylesGlobal.padding20]}>
        <View style={stylesGlobal.width30}>
          <View style={styles.iconFrameAdd} />
        </View>
        <View style={[stylesGlobal.width70, stylesGlobal.justifyContentCenter]}>
          <Text
            style={[
              stylesGlobal.textJustify,
              stylesGlobal.text16,
              stylesGlobal.textBold,
            ]}
          >
            {item.FirstName ? item.FirstName : item.Username}{' '}
            {item.FirstName ? item.LastName : ''}
          </Text>
        </View>
      </View>
      {/* <View style={[styles.row]}>
        <View
          style={{
            width: '30%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={styles.textTitle}>{item.Username}</Text>
        </View>
        <View style={[stylesGlobal.width70, styles.paddingHorizontalwithwrap]}>
          <Text
            style={[
              stylesGlobal.textJustify,
              stylesGlobal.text16,
              styles.paddingLeft5,
            ]}
          >
            {item.Address}
          </Text>
          <Text style={styles.subTitle}>Email: {item.Email}</Text>
          <Text style={styles.subTitle}>Telp: {item.Telephone}</Text>
        </View>
      </View>
      <Seperator /> */}
    </TouchableOpacity>
  );
};

const ListItemCountryAndCity = props => {
  const { item, type, onPress } = props;
  return type === 'city'
    ? ListItemCity(item, onPress)
    : type === 'airport'
    ? ListAirport(item, onPress)
    : type === 'customer'
    ? ListCustomer(item, onPress)
    : type === 'user'
    ? ListUserCustomer(item, onPress)
    : type === 'language'
    ? ListItemLanguage(item, onPress)
    : ListItemCountry(item, onPress);
};

ListItemCountryAndCity.propTypes = {
  item: PropTypes.object,
  type: PropTypes.string,
  onPress: PropTypes.func,
};

export default ListItemCountryAndCity;
