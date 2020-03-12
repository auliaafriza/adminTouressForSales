import React from "react";
import { View, Text, Image } from "react-native";
import { Card } from "../../../../../../components/card";
import { Icon } from "../../../../../../components/icon";
import { TextWithIcon } from "../../../../../../components/text";
import PropTypes from "prop-types";
import { viewDateSlash } from "../../../../../../helper/timeHelper";

import NoImage from "../../../../../../assets/images/NoImage.png";
import IconPlane from "../../../../../../assets/Icon/plane.png";

import stylesGlobal from "../../../../../../components/styles";
import { styles } from "../../../../../../components/container";

const CardTicket = ({
  logoImage,
  airlineName,
  departureCity,
  departurePlaceCode,
  departureDate,
  departureTime,
  arrivalCity,
  arrivalPlaceCode,
  arrivalDate,
  arrivalTime,
  onPress,
  otherDestination
}) => {
  return (
    <View style={[stylesGlobal.width100, stylesGlobal.alignItemsCenter]}>
      {/* <Card
        onPress={onPress}
        widthCard="95%"
        paddingHorizontal={20}
        paddingVertical={20}
      >
        <View style={[stylesGlobal.width70, stylesGlobal.row]}>
          <View style={stylesGlobal.containerIcon20}>
            {logoImage ? (
              <Image
                style={stylesGlobal.imageIcon}
                source={{ uri: logoImage }}
              />
            ) : (
              <Image style={stylesGlobal.imageIcon} source={NoImage} />
            )}
          </View>
          <Text
            style={[
              stylesGlobal.textBold,
              stylesGlobal.text14,
              stylesGlobal.paddingLeft20,
            ]}
          >
            {airlineName}
          </Text>
        </View>

        <View
          style={[
            stylesGlobal.width100,
            stylesGlobal.row,
            stylesGlobal.paddingVertical20,
          ]}
        >
          <View style={stylesGlobal.width40}>
            <Text style={stylesGlobal.text12}>{departureCity}</Text>
            <Text
              style={[
                stylesGlobal.text18,
                stylesGlobal.textBold,
                stylesGlobal.greyColor,
                { paddingVertical: 5 },
              ]}
            >
              {departurePlaceCode}
            </Text>
            <Text style={stylesGlobal.text12}>{departureDate}</Text>
            <Text style={stylesGlobal.text12}>{departureTime}</Text>
          </View>
          <View style={[stylesGlobal.width20, stylesGlobal.center]}>
            <Icon source={IconPlane} size={30} color="#ccc" />
          </View>
          <View style={[stylesGlobal.width40, stylesGlobal.alignItemsCenter]}>
            <View>
              <Text style={stylesGlobal.text12}>{arrivalCity}</Text>
              <Text
                style={[
                  stylesGlobal.text18,
                  stylesGlobal.textBold,
                  stylesGlobal.greyColor,
                  { paddingVertical: 5 },
                ]}
              >
                {arrivalPlaceCode}
              </Text>
              <Text style={stylesGlobal.text12}>{arrivalDate}</Text>
              <Text style={stylesGlobal.text12}>{arrivalTime}</Text>
            </View>
          </View>
        </View>
        <Text style={stylesGlobal.text12}>Other Destination :</Text>
        <View style={[stylesGlobal.row, stylesGlobal.paddingBottom10]}>
          {otherDestination.map((item, i) => {
            return (
              <View key={i} style={styles.backgroundText}>
                <Text style={stylesGlobal.text12}>
                  {item.DeparturePlace.City.Name}
                </Text>
              </View>
            );
          })}
        </View>
      </Card> */}
      <Card
        onPress={onPress}
        widthCard="95%"
        paddingHorizontal={20}
        paddingVertical={20}
      >
        <View
          style={[
            stylesGlobal.width70,
            stylesGlobal.row,
            stylesGlobal.marginBottom20
          ]}
        >
          <View style={stylesGlobal.containerIcon20}>
            {logoImage ? (
              <Image
                style={stylesGlobal.imageIcon}
                source={{ uri: logoImage }}
              />
            ) : (
              <Image style={stylesGlobal.imageIcon} source={NoImage} />
            )}
          </View>
          <Text
            style={[
              stylesGlobal.textBold,
              stylesGlobal.text14,
              stylesGlobal.paddingLeft20
            ]}
          >
            {airlineName}
          </Text>
        </View>

        <View style={[stylesGlobal.width100, stylesGlobal.row]}>
          <View style={stylesGlobal.width60}>
            <Text style={[stylesGlobal.text12, stylesGlobal.marginBottom10]}>
              First Flight:
            </Text>
            <View style={[stylesGlobal.width100, stylesGlobal.row]}>
              <View style={stylesGlobal.width40}>
                <Text style={stylesGlobal.text12}>{departureCity}</Text>
                <Text
                  style={[
                    stylesGlobal.text16,
                    stylesGlobal.textBold,
                    { color: "#999", paddingVertical: 5 }
                  ]}
                >
                  {departurePlaceCode}
                </Text>
                <Text style={stylesGlobal.text12}>{departureDate}</Text>
                <Text style={stylesGlobal.text12}>{departureTime}</Text>
              </View>
              <View
                style={[
                  stylesGlobal.width20,
                  stylesGlobal.justifyContentCenter
                ]}
              >
                <Icon source={IconPlane} size={15} color="#ccc" />
              </View>
              <View style={stylesGlobal.width40}>
                <Text style={stylesGlobal.text12}>{arrivalCity}</Text>
                <Text
                  style={[
                    stylesGlobal.text16,
                    stylesGlobal.textBold,
                    { color: "#999", paddingVertical: 5 }
                  ]}
                >
                  {arrivalPlaceCode}
                </Text>
                <Text style={stylesGlobal.text12}>{arrivalDate}</Text>
                <Text style={stylesGlobal.text12}>{arrivalTime}</Text>
              </View>
            </View>
          </View>
          <View style={stylesGlobal.width40}>
            <Text style={[stylesGlobal.text12, stylesGlobal.marginBottom10]}>
              Next Flight:
            </Text>
            <View style={stylesGlobal.width100}>
              {otherDestination.map((item, i) => {
                return (
                  <Text
                    key={i}
                    style={[
                      stylesGlobal.text12,
                      { color: "#707070", lineHeight: 25 }
                    ]}
                  >
                    {item.DeparturePlace.Code} - {item.ArrivalPlace.Code} |{" "}
                    {viewDateSlash(item.DepartureDate)}
                  </Text>
                );
              })}
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};

CardTicket.propTypes = {
  logoImage: PropTypes.string,
  airlineName: PropTypes.string,
  departureCity: PropTypes.string,
  departurePlaceCode: PropTypes.string,
  departureDate: PropTypes.string,
  departureTime: PropTypes.string,
  arrivalCity: PropTypes.string,
  arrivalPlaceCode: PropTypes.string,
  arrivalDate: PropTypes.string,
  arrivalTime: PropTypes.string,
  onPress: PropTypes.func,
  otherDestination: PropTypes.array
};
export default CardTicket;
