import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { TextWithIcon } from '../../../components/text';
import stylesGlobal from '../../../components/styles';
import styles from '../styles';
import { Seperator } from '../../../components/list';

const CardItemDetailTicket = ({
  type,
  icon,
  city,
  airportName,
  airportCode,
  date,
  time,
  transitDuration,
}) => {
  return (
    <View style={stylesGlobal.row100}>
      <View style={stylesGlobal.width70}>
        <TextWithIcon
          iconName={icon}
          text={type}
          iconColor={stylesGlobal.$greyColor}
          iconSize={20}
          bold
        />
        <View style={styles.paddingLeft34}>
          <Text style={[stylesGlobal.marginTop10, stylesGlobal.text12]}>
            {city} ({airportCode})
          </Text>
          <Text style={[stylesGlobal.greyColor, stylesGlobal.text12]}>
            {airportName}
          </Text>
          {transitDuration ? (
            <View style={styles.info}>
              <Text>Transit {transitDuration}</Text>
            </View>
          ) : null}
        </View>
      </View>
      <View style={[stylesGlobal.width30, stylesGlobal.alignItemsEnd]}>
        <Text style={stylesGlobal.text11}>{date}</Text>
        <Text style={stylesGlobal.text11}>{time}</Text>
      </View>
    </View>
  );
};

export default CardItemDetailTicket;
