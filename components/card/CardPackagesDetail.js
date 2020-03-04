import React from 'react';
import { View, Text, Platform, Dimensions } from 'react-native';
import styles from './styles';
import stylesGlobal from '../styles';
import PropTypes from 'prop-types';
import { ClearButton, NormalButtonWithIcon } from '../button';
import { SeperatorVertical, Seperator } from '../list';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from './Card';

const width = Dimensions.get('window').width;

const CardPackagesDetail = ({
  title,
  onPress,
  description,
  price,
  kouta,
  textdestinationcity,
  textdestinationcountry,
  textjadwalstart,
  textjadwalend,
  currencies,
  hiddenButton,
  minpax,
}) => (
  <Card>
    <View style={styles.bottom}>
      <Text style={styles.textbold22}>{title}</Text>
      <Text>{description}</Text>
      <View style={[stylesGlobal.rowNoPadding, stylesGlobal.width90]}>
        <ClearButton textColor={styles.$goldcolor} text="Read More" />
      </View>
      <View style={[stylesGlobal.rowNoPadding, stylesGlobal.width90]}>
        <View style={styles.colNoPadding55}>
          <Text
            style={[
              stylesGlobal.text14,
              stylesGlobal.textBold,
              stylesGlobal.colorGold,
            ]}
          >
            {currencies}
          </Text>
          <Text style={styles.text30Gold}>{price}</Text>
          <Text style={styles.textgrey14}>per pax twin sharing</Text>
        </View>
        <View style={styles.colNoPadding5}>
          <SeperatorVertical heightsepar={60} />
        </View>
        <View style={styles.colNoPadding45}>
          <Text
            style={[
              stylesGlobal.colorRed,
              stylesGlobal.text14,
              stylesGlobal.textBold,
            ]}
          >
            Only
          </Text>
          <Text style={styles.textSizeBigRed}>{kouta}</Text>
          <Text
            style={[
              stylesGlobal.text14,
              stylesGlobal.textBold,
              stylesGlobal.colorRed,
              stylesGlobal.alignTextRight,
              styles.rightPadding10,
            ]}
          >
            pax left
          </Text>
        </View>
      </View>
    </View>
    <Seperator />
    <View style={styles.bottom}>
      <View style={[stylesGlobal.rowNoPadding, stylesGlobal.width100]}>
        <Icon size={18} color={styles.$goldcolor} name="place" />
        <Text style={styles.text14marginLeft}>
          {textdestinationcity},{textdestinationcountry}
        </Text>
      </View>
      <View style={[stylesGlobal.rowNoPadding, stylesGlobal.width100]}>
        <Icon size={18} color={styles.$goldcolor} name="insert-invitation" />
        <Text style={styles.text14marginLeft}>
          {textjadwalstart} -{textjadwalend}
        </Text>
      </View>
      {minpax == 0 ? null : (
        <View style={styles.cardWarningMinPax}>
          <View
            style={[
              stylesGlobal.rowNoPadding,
              stylesGlobal.width100,
              stylesGlobal.center,
            ]}
          >
            <View style={[stylesGlobal.width10, stylesGlobal.center]}>
              <Icon size={18} color={styles.$redcolor} name="info" />
            </View>
            <View style={stylesGlobal.width90}>
              <Text style={stylesGlobal.text12}>
                This package has a minimum : {minpax} Guest.
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
    {hiddenButton ? (
      <View style={styles.positionDownlodBrochure}>
        <NormalButtonWithIcon
          text="DOWNLOAD THIS BROCHURE"
          type="singleText"
          nameicon="file-download"
          coloricon="black"
          buttonColor={styles.$goldcolor}
          textColor="black"
          sizeicon={18}
          textSize={Platform.OS === 'ios' ? 12 : 14}
          onPress={onPress}
          buttonWidth={width <= 320 ? '75%' : '70%'}
          buttonHeight={40}
        />
      </View>
    ) : null}
  </Card>
);

CardPackagesDetail.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.string,
  kouta: PropTypes.number,
  textdestinationcity: PropTypes.string,
  textdestinationcountry: PropTypes.string,
  textjadwalstart: PropTypes.string,
  textjadwalend: PropTypes.string,
  currencies: PropTypes.string,
  hiddenButton: PropTypes.boolean,
  minpax: PropTypes.number,
};

export default CardPackagesDetail;
