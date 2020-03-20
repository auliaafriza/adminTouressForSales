import React from "react";
import { Text, View } from "react-native";
import styles from "../../../styles";
import PropTypes from "prop-types";
import stylesGlobal from "../../../../../components/styles";
import moment from "moment";
const segmentActivity = props => {
  const { listActivity, type } = props;
  return listActivity.length > 0
    ? listActivity.map((data, i) => (
        <>
          <View
            style={[
              stylesGlobal.row100,
              stylesGlobal.padding20,
              styles.containerHighlightOrderedDetail,
              styles.marginTop10Bottom20
            ]}
            key={i}
          >
            <View style={styles.rowNoPadding}>
              <View style={styles.col60}>
                <Text style={styles.bold16}>{`${data.ItemName.split("-")[0]}, ${
                  data.Destination
                }`}</Text>
              </View>
              {type === "accommodation" && (
                <View style={[styles.col40, stylesGlobal.alignItemsEnd]}>
                  {/* <Text style={styles.bold18}>{'Hotel'}</Text> */}
                </View>
              )}
            </View>
          </View>
          <View
            style={[
              styles.rowNoPadding,
              styles.colPadding20,
              styles.marginTop10Bottom20
            ]}
            key={i}
          >
            {type === "accommodation" ? (
              <>
                <View style={stylesGlobal.width70}>
                  <Text style={styles.bold16}>
                    {data.ItemName.split(" - ")[1]}
                  </Text>
                  <Text style={[styles.text14, styles.marginTopBottom10]}>
                    {data.RoomService.replace("_", " ")}
                  </Text>
                </View>
                <View style={[styles.col30, stylesGlobal.alignItemsEnd]}>
                  <Text style={[styles.text16, stylesGlobal.greyColor]}>
                    {moment(data.Date).format("DD MMM YY")}
                  </Text>
                </View>
              </>
            ) : (
              <>
                <View style={stylesGlobal.width70}>
                  <Text style={styles.bold16}>
                    {type === "restaurant"
                      ? data.ItemName.split(" - ")[1].replace("_", " ")
                      : type === "flight"
                      ? `${data.ItemName.split(" - ")[1]}`
                      : data.ItemName}
                  </Text>
                  <Text style={styles.text14}>
                    {data.Description.replace("_", " ")}
                  </Text>
                </View>
                <View style={[styles.col30, stylesGlobal.alignItemsEnd]}>
                  <Text style={[styles.text16, stylesGlobal.greyColor]}>
                    {moment(data.Date).format("DD MMM YY")}
                  </Text>
                </View>
              </>
            )}
          </View>
        </>
      ))
    : null;
};

segmentActivity.propTypes = {
  listActivity: PropTypes.array
};

export default segmentActivity;
