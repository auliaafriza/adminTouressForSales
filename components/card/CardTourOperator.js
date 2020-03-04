import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import stylesGlobal from '../styles';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import IconFoundation from 'react-native-vector-icons/Foundation';
import Card from './Card';
// import { NormalButton } from '../button';
import IMAGES from './../../assets/images/NoImage.png';
import IconLoc from './../../assets/Icon/address.png';
import IconEmail from './../../assets/Icon/email.png';
import IconPhone from './../../assets/Icon/phone_copy.png';

const CardTourOperator = ({
  widthcontainer,
  heightcontainer,
  imagetouroperator,
  touroperatorname,
  textdestination,
  textphone,
  textemail,
  onPress,
  textprice,
  address,
  type,
}) => {
  const containerstyles = [styles.containerCardView, styles.bottom];
  if (widthcontainer) {
    containerstyles.push({ width: widthcontainer });
  }
  if (heightcontainer) {
    containerstyles.push({ height: heightcontainer });
  }
  return (
    <Card widthCard="90%">
      <TouchableOpacity onPress={onPress}>
        {type == 'list' ? (
          <View style={stylesGlobal.row100}>
            <View
              style={[stylesGlobal.width40, styles.positionCardTourOperator]}
            >
              {imagetouroperator != '' && (
                <Image
                  style={[
                    stylesGlobal.flexSize,
                    stylesGlobal.backgroundColorGrey,
                    stylesGlobal.width100,
                  ]}
                  source={{ uri: imagetouroperator }}
                  resizeMode="cover"
                />
              )}
              {imagetouroperator == undefined && (
                <Image
                  source={IMAGES}
                  style={[
                    stylesGlobal.backgroundColorGrey,
                    stylesGlobal.flexSize,
                    styles.Noimage,
                  ]}
                  resizeMode="cover"
                />
              )}
            </View>
            <View style={[stylesGlobal.width60, stylesGlobal.padding20]}>
              <Text
                style={
                  [stylesGlobal.text18, stylesGlobal.textBold]
                  // stylesGlobal.paddingBottom10,
                }
              >
                {touroperatorname}
              </Text>

              <View
                style={[
                  styles.row100,
                  styles.paddingBottom10,
                  stylesGlobal.paddingTop10,
                ]}
              >
                <View style={styles.image10}>
                  <Image
                    source={IconLoc}
                    style={styles.imageCategory}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.text14marginLeft}>{address}</Text>
              </View>
              <View
                style={[
                  styles.row100,
                  styles.paddingBottom10,
                  stylesGlobal.alignItemsCenter,
                ]}
              >
                <View style={styles.image10}>
                  <Image
                    source={IconPhone}
                    style={styles.imageCategory}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.text14marginLeft}> +{textphone}</Text>
              </View>
              <View
                style={[
                  styles.row100,
                  styles.paddingBottom10,
                  stylesGlobal.alignItemsCenter,
                ]}
              >
                <View style={styles.image10}>
                  <Image
                    source={IconEmail}
                    style={styles.imageCategory}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.text14marginLeft}>{textemail}</Text>
              </View>
              {textprice != '' ? (
                <View style={[styles.row100, styles.paddingBottom10]}>
                  <Text style={styles.text14marginLeft}>
                    Price offer {textprice}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        ) : (
          <View
            style={
              styles.bottom // <Card>
            }
          >
            <View style={styles.row}>
              <View style={stylesGlobal.width40}>
                <Text style={[styles.textbold16, styles.verticalPadding5]}>
                  Tour Operator
                </Text>
                {imagetouroperator != undefined && (
                  <Image
                    style={styles.Noimage100}
                    source={{ uri: imagetouroperator }}
                    resizeMode="contain"
                  />
                )}
                {imagetouroperator == undefined && (
                  <View style={styles.colNoPadding40Center}>
                    <Image
                      source={IMAGES}
                      resizeMode="center"
                      style={styles.Noimage100}
                    />
                  </View>
                )}
              </View>
              <View style={stylesGlobal.width60}>
                <Text style={styles.textbold16}>{touroperatorname}</Text>
                <View style={styles.rowPadding}>
                  <Icon size={16} color={styles.$goldcolor} name="place" />
                  <Text style={styles.text14marginLeft}>
                    Region : {textdestination}
                  </Text>
                </View>
                <View style={styles.rowPadding}>
                  <Icon size={16} color={styles.$goldcolor} name="call" />
                  <Text style={styles.text14marginLeft}>+{textphone}</Text>
                </View>
                <View style={styles.rowPadding}>
                  <Icon size={16} color={styles.$goldcolor} name="email" />
                  <Text style={styles.text14marginLeft}> {textemail}</Text>
                </View>
              </View>
            </View>
          </View>
        )
        // </Card>
        }
      </TouchableOpacity>
    </Card>
  );
};

CardTourOperator.propTypes = {
  heightcontainer: PropTypes.number,
  widthcontainer: PropTypes.string,
  imagetouroperator: PropTypes.string,
  touroperatorname: PropTypes.string,
  textdestination: PropTypes.string,
  textphone: PropTypes.string,
  textemail: PropTypes.string,
  textprice: PropTypes.string,
  onPress: PropTypes.func,
  type: PropTypes.string,
  address: PropTypes.string,
};

export default CardTourOperator;
