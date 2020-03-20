import React from "react";
import { Text, View, ScrollView } from "react-native";
import styles from "../../styles";
import PropTypes from "prop-types";
import stylesGlobal from "../../../../components/styles";
import CardOrderedItem from "../../../../components/card/CardOrderedItem";
import { NormalButtonWithIcon } from "../../../../components/button/index";
import IconDownload from "../../../../assets/Icon/download.png";

const orderedItem = props => {
  const {
    orderedItemData,
    onPress,
    packageType,
    isShowButton = false,
    onPressButton
  } = props;
  return (
    <>
      <View style={[styles.row100, styles.colPadding20]}>
        <View style={stylesGlobal.width50}>
          <Text
            style={[
              stylesGlobal.marginBottom20,
              stylesGlobal.text18,
              stylesGlobal.textBold
            ]}
          >
            What you'll get
          </Text>
        </View>
        {isShowButton ? (
          <View style={[stylesGlobal.width50, stylesGlobal.alignItemsEnd]}>
            <NormalButtonWithIcon
              type="singleText"
              text="Voucher Confirmation"
              nameicon={IconDownload}
              coloricon="black"
              buttonColor={styles.$goldcolor}
              textColor="black"
              sizeicon={18}
              textSize={10}
              buttonWidth="100%"
              buttonHeight={35}
              onPress={onPressButton}
              image={true}
            />
          </View>
        ) : null}
      </View>
      <View
        style={[styles.rowNoPaddingOrderedItem, stylesGlobal.paddingBottom20]}
      >
        <ScrollView horizontal={true}>
          {orderedItemData.accommodation.length > 0 ? (
            <CardOrderedItem
              orderedItemData={orderedItemData.accommodation}
              title={"Accommodation"}
              onPress={onPress}
              packageType={packageType}
            />
          ) : null}
          {orderedItemData.flight.length > 0 ? (
            <CardOrderedItem
              orderedItemData={orderedItemData.flight}
              title={"Flight"}
              onPress={onPress}
              packageType={packageType}
            />
          ) : null}
          {orderedItemData.restaurant.length > 0 ? (
            <CardOrderedItem
              orderedItemData={orderedItemData.restaurant}
              title={"Restaurant"}
              onPress={onPress}
              packageType={packageType}
            />
          ) : null}
          {orderedItemData.excursion.length > 0 ? (
            <CardOrderedItem
              orderedItemData={orderedItemData.excursion}
              title={"Attraction"}
              onPress={onPress}
              packageType={packageType}
            />
          ) : null}
          {orderedItemData.transportation.length > 0 ? (
            <CardOrderedItem
              orderedItemData={orderedItemData.transportation}
              title={"Transportation"}
              onPress={onPress}
              packageType={packageType}
            />
          ) : null}
        </ScrollView>
      </View>
    </>
  );
};

orderedItem.propTypes = {
  orderedItemData: PropTypes.object,
  onPress: PropTypes.func,
  packageType: PropTypes.string,
  isShowButton: PropTypes.bool,
  onPressButton: PropTypes.func
};

export default orderedItem;
