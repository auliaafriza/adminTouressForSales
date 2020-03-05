import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import stylesGlobal from "../styles";
import PropTypes from "prop-types";
import { SeperatorRepeat } from "../list";
import Card from "./Card";
import { RibbonGold } from "../ribbon";

import IMAGES from "./../../assets/images/NoImage.png";

const CardHistory = ({
  Nobooking,
  Title,
  onPress,
  imageHeight,
  imageWidth,
  label,
  isRead,
  packageType,
  totalGuest,
  personResponsible,
  bookingCreated,
  startTour,
  customer
}) => {
  const imagestyle = [styles.imagesBG];
  if (imageHeight) {
    imagestyle.push({ height: imageHeight });
  }
  if (imageWidth) {
    imagestyle.push({ width: imageWidth });
  }

  return (
    <Card widthCard="95%">
      <TouchableOpacity
        onPress={onPress}
        style={isRead ? styles.readCard : styles.unreadCard}
      >
        <View
          style={[
            stylesGlobal.paddingHorizontal20,
            stylesGlobal.paddingBottom20,
            stylesGlobal.paddingTop20
          ]}
        >
          <View style={stylesGlobal.row100}>
            <View style={stylesGlobal.width50}>
              <Text
                style={[
                  stylesGlobal.text18,
                  stylesGlobal.paddingBottom10,
                  stylesGlobal.textBold
                ]}
              >
                {`#${Nobooking}`}
              </Text>
            </View>
            <View style={[stylesGlobal.width50]}>
              {label === "Cancelled" ? (
                <RibbonGold
                  label={label}
                  color1="#ff7961"
                  color2="#f44336"
                  color3="#ba000d"
                  color="#ba000d"
                  colorFont="white"
                />
              ) : label === "On-Hold" ? (
                <RibbonGold
                  label="Booking On Hold"
                  color1="black"
                  color2="black"
                  color3="black"
                  color="#805031"
                  colorFont="#e6ca6b"
                  widthlabel={80}
                />
              ) : label === "Created" ? (
                <RibbonGold
                  label={label}
                  color1="#5ce8df"
                  color2="#00b5ad"
                  color3="#00b5ad"
                  color="#00b5ad"
                  colorFont="white"
                />
              ) : label === "SP Confirm" || label === "DP Confirm" ? (
                <RibbonGold
                  label={label}
                  color1="#ffa24e"
                  color2="#f2711c"
                  color3="#b84200"
                  color="#b84200"
                  colorFont="white"
                  widthlabel={80}
                />
              ) : label === "Completed" ? (
                <RibbonGold
                  label={label}
                  widthlabel={80}
                  color1="#66b4ff"
                  color2="#2185d0"
                  color3="#00599e"
                  color="#00599e"
                  colorFont="white"
                />
              ) : label === "Quotation" ? (
                <RibbonGold
                  label={label}
                  widthlabel={80}
                  color1="#d867fc"
                  color2="#a333c8"
                  color3="#700096"
                  color="#700096"
                  colorFont="white"
                />
              ) : label === "accepted" ? (
                <RibbonGold
                  label="Quotation Accepted"
                  widthlabel={140}
                  color1="#d867fc"
                  color2="#a333c8"
                  color3="#700096"
                  color="#700096"
                  colorFont="white"
                />
              ) : (
                <RibbonGold
                  label={label}
                  color1="#fffd9b"
                  color2={styles.$goldcolor}
                  color3="#b2993d"
                  color="#b2993d"
                  colorFont="black"
                  widthlabel={80}
                />
              )}
            </View>
          </View>
          <Text
            style={[
              stylesGlobal.text18,
              stylesGlobal.textBold,
              stylesGlobal.paddingBottom10
            ]}
          >
            {Title}
          </Text>

          <View style={stylesGlobal.row100}>
            <View style={stylesGlobal.width50}>
              <Text style={[stylesGlobal.text14, stylesGlobal.paddingBottom5]}>
                {packageType}
              </Text>
              <Text style={[stylesGlobal.text14, stylesGlobal.paddingBottom5]}>
                {`${totalGuest} Guest `}
              </Text>
              <Text style={[stylesGlobal.text14, stylesGlobal.paddingBottom5]}>
                {personResponsible}
              </Text>
            </View>
            <View style={[stylesGlobal.width50]}>
              <Text style={[stylesGlobal.text14, stylesGlobal.paddingBottom5]}>
                {`Book Created : ${bookingCreated}`}
              </Text>
              <Text style={[stylesGlobal.text14, stylesGlobal.paddingBottom5]}>
                {`Start Tour : ${startTour}`}
              </Text>
              <Text style={[stylesGlobal.text14, stylesGlobal.paddingBottom5]}>
                {customer}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

CardHistory.propTypes = {
  Nobooking: PropTypes.string,
  tglexpired: PropTypes.string,
  Title: PropTypes.string,
  textdestination: PropTypes.string,
  jadwalend: PropTypes.string,
  jadwlastart: PropTypes.string,
  tourleader: PropTypes.string,
  imageback: PropTypes.string,
  onPress: PropTypes.func,
  imageHeight: PropTypes.string,
  imageWidth: PropTypes.string,
  label: PropTypes.string,
  isRead: PropTypes.bool
};

export default CardHistory;
