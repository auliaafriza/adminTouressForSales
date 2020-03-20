import React from "react";
import { Text, View } from "react-native";
import styles from "../styles";
import PropTypes from "prop-types";
import stylesGlobal from "../../../../components/styles";
import { Card } from "../../../../components/card";
import { SeperatorRepeat } from "../../../../components/list/seperatorRepeat";
const segmentGuestList = props => {
  const { totalPax, guestListData } = props;
  return (
    <Card widthCard="90%">
      <Text
        style={[
          stylesGlobal.paddingHorizontal20,
          styles.bold20,
          stylesGlobal.paddingTop20
        ]}
      >
        {`Guest List (${totalPax} Pax)`}
      </Text>
      <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
        <SeperatorRepeat
          repeat={31}
          widthsepar={8}
          heightSepar={1}
          colorSepar="#777"
        />
      </View>
      {guestListData.adult && guestListData.adult.length > 0 ? (
        <View
          style={[
            stylesGlobal.paddingBottom20,
            stylesGlobal.paddingHorizontal20,
            stylesGlobal.marginBottom10
          ]}
        >
          <Text style={[stylesGlobal.marginBottom10, styles.text14]}>
            {`Adult (> 12 Years)`}
          </Text>
          <View style={stylesGlobal.row100}>
            <View style={stylesGlobal.width40}>
              <Text style={styles.text10}>
                {`${guestListData.adult[0].GuestTitle} 
                  guestListData.adult[0].FirstName
                me} ${guestListData.adult[0].LastName}`}
              </Text>
            </View>
            <View style={[styles.col20Width, styles.center]}>
              <Text style={styles.text10}>
                {guestListData.adult[0].CountryId}
              </Text>
            </View>
            <View style={styles.col40}>
              <Text style={styles.text10}>
                {`${guestListData.adult[0].IdentityType}: 
                  guestListData.adult[0].IdentityNbr
                br}`}
              </Text>
            </View>
          </View>
        </View>
      ) : null}

      {guestListData.child && guestListData.child.length > 0 ? (
        <View
          style={[
            stylesGlobal.paddingBottom20,
            stylesGlobal.paddingHorizontal20,
            stylesGlobal.marginBottom10
          ]}
        >
          <Text style={[stylesGlobal.marginBottom10, styles.text14]}>
            {`Child (1 - 2 Years)`}
          </Text>
          <View style={stylesGlobal.row100}>
            <View style={stylesGlobal.width40}>
              <Text style={styles.text10}>
                {`${guestListData.child[0].GuestTitle} 
                  guestListData.child[0].FirstName
                me} ${guestListData.child[0].LastName}`}
              </Text>
            </View>
            <View style={[styles.col20Width, styles.center]}>
              <Text style={styles.text10}>
                {guestListData.child[0].CountryId}
              </Text>
            </View>
            <View style={styles.col40}>
              <Text style={styles.text10}>
                {`${guestListData.child[0].IdentityType}: 
                  guestListData.child[0].IdentityNbr
                br}`}
              </Text>
            </View>
          </View>
        </View>
      ) : null}

      {guestListData.infant && guestListData.infant.length > 0 ? (
        <View
          style={[
            stylesGlobal.paddingBottom20,
            stylesGlobal.paddingHorizontal20,
            stylesGlobal.marginBottom10
          ]}
        >
          <Text style={[stylesGlobal.marginBottom10, styles.text14]}>
            {`Infant (0 - 1 Years)`}
          </Text>
          <View style={stylesGlobal.row100}>
            <View style={stylesGlobal.width40}>
              <Text style={styles.text10}>
                {`${guestListData.infant[0].GuestTitle} 
                  guestListData.infant[0].FirstName
                me} ${guestListData.infant[0].LastName}`}
              </Text>
            </View>
            <View style={[styles.col20Width, styles.center]}>
              <Text style={styles.text10}>
                {guestListData.infant[0].CountryId}
              </Text>
            </View>
            <View style={styles.col40}>
              <Text style={styles.text10}>
                {`${guestListData.infant[0].IdentityType}: 
                  guestListData.infant[0].IdentityNbr
                br}`}
              </Text>
            </View>
          </View>
        </View>
      ) : null}
    </Card>
  );
};

segmentGuestList.propTypes = {
  totalPax: PropTypes.string,
  guestListData: PropTypes.object
};

export default segmentGuestList;
