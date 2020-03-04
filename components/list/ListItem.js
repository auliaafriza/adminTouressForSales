import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';
import stylesGlobal from '../styles';
import IconPhone from '../../assets/Icon/phone.png';
import IconUser from '../../assets/Icon/user.png';

const ListItem = ({
  imageUser,
  textuser,
  textname,
  textstatus,
  textaddress,
  number,
  textphone,
  status,
}) => (
  // <View underlayColor={styles.layColor}>
  <View
    style={[
      stylesGlobal.row100,
      stylesGlobal.alignItemsCenter,
      stylesGlobal.padding20,
    ]}
  >
    <View style={stylesGlobal.width20}>
      <View style={styles.imageFrame}>
        <Image source={IconUser} style={stylesGlobal.imageIcon} />
      </View>
    </View>
    <View style={stylesGlobal.width60}>
      <Text style={[stylesGlobal.text16, stylesGlobal.textSemiBold]}>
        {textname}
      </Text>
      <Text>{textuser}</Text>
      <View style={[stylesGlobal.row100, stylesGlobal.alignItemsCenter]}>
        {status ? (
          <FontAwesome name="circle" size={12} color="#f44336" />
        ) : (
          <FontAwesome name="circle" size={12} color="#6b82e6" />
        )}
        <Text> {status ? 'InActive' : 'Active'}</Text>
      </View>
    </View>
    {/* <View style={stylesGlobal.width20}>
      <TouchableOpacity
        style={[
          stylesGlobal.containerIcon40,
          stylesGlobal.padding10,
          stylesGlobal.backgroundColorGold,
          stylesGlobal.tintColorBlack,
          { borderRadius: 20 },
        ]}
        onPress={() => {
          Linking.openURL('tel:', { textphone });
        }}
      >
        <Image
          style={stylesGlobal.imageIcon}
          source={IconPhone}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View> */}
  </View>
);

ListItem.propTypes = {
  number: PropTypes.number,
  textuser: PropTypes.string,
  textstatus: PropTypes.array,
  textaddress: PropTypes.string,
  textphone: PropTypes.string,
  onPress: PropTypes.func,
  status: PropTypes.string,
  imageUser: PropTypes.string,
  textname: PropTypes.string,
};

export default ListItem;
