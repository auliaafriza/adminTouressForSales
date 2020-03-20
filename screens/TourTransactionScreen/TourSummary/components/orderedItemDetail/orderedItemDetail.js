import React, { Component } from "react";
import { Text, ScrollView, TouchableOpacity, View } from "react-native";
import styles from "../../../styles";
import stylesGlobal from "../../../../../components/styles";
import { connect } from "react-redux";
// import { dummyLengkap } from '../../../../helper/dummy';
import { generateOrderedItemDetail } from "../../../../../helper/transactionHelper";
import SegmentActivity from "./segmentActivity";
import PropTypes from "prop-types";

class orderedItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      count: 0,
      itemData: {},
      itemList: [],
      testData: this.props.navigation.state.params.data
    };
  }
  static propTypes = {
    DemoPrice: PropTypes.object,
    navigation: PropTypes.object
  };

  handleNext = () => {
    let { count, itemList } = this.state;
    let total = 0;
    if (count === itemList.length) {
      total = 0;
    } else {
      total = count + 1;
    }
    this.setState({ count: total, type: itemList[total] });
  };
  handlePrevious = () => {
    let { count, itemList } = this.state;
    let total = 0;
    if (count === 0) {
      total = itemList.length;
    } else {
      total = count - 1;
    }
    this.setState({ count: total, type: itemList[total] });
  };
  componentDidMount() {
    const itemData = generateOrderedItemDetail(
      this.props.navigation.state.params.data.DailyPrograms
    );
    let itemList = this.generateItemList(itemData);
    this.setState({
      itemData: itemData,
      itemList,
      type: this.props.navigation.state.params.TypeOrdered.toLowerCase(),
      count: itemList.indexOf(
        this.props.navigation.state.params.TypeOrdered.toLowerCase()
      )
    });
  }

  generateItemList = data => {
    let list = [];
    if (data.accommodation.length !== 0) {
      list.push("accommodation");
    }
    if (data.excursion.length !== 0) {
      list.push("excursion");
    }
    if (data.restaurant.length !== 0) {
      list.push("restaurant");
    }
    if (data.flight.length !== 0) {
      list.push("flight");
    }
    if (data.transportation.length !== 0) {
      list.push("transportation");
    }
    // let count = list.indexOf(
    //   this.props.navigation.state.params.TypeOrdered.toLowerCase()
    // );
    // this.setState({ count });
    return list;
  };
  generateHeaderTitle = () => {
    const { itemList, count } = this.state;
    let header = itemList[count];
    let title = "";
    switch (header) {
      case "accommodation":
        title = "Accommodation";
        break;
      case "excursion":
        title = "Excursion";
        break;
      case "restaurant":
        title = "Restaurant";
        break;
      case "flight":
        title = "Flight";
        break;
      case "transportation":
        title = "Transportation";
        break;
      default:
        title = "Touress";
    }
    return title;
  };

  render() {
    let { type, count, itemData, itemList } = this.state;
    return (
      <View>
        <View style={styles.stylesPageSchedule}>
          <View
            style={[
              stylesGlobal.row100,
              stylesGlobal.padding20,
              stylesGlobal.backgroundColorWhite
            ]}
          >
            {count != 0 ? (
              <TouchableOpacity
                style={[stylesGlobal.width10, stylesGlobal.center]}
                onPress={() => this.handlePrevious()}
              >
                <Text
                  style={[
                    stylesGlobal.text12,
                    stylesGlobal.textBold,
                    stylesGlobal.backgroundColorWhite
                  ]}
                >
                  Prev
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={[stylesGlobal.width10, stylesGlobal.center]}>
                <Text
                  style={[
                    stylesGlobal.text12,
                    stylesGlobal.greyColor,
                    stylesGlobal.backgroundColorWhite
                  ]}
                >
                  Prev
                </Text>
              </View>
            )}
            <View style={[stylesGlobal.width80, stylesGlobal.leftCenter]}>
              <View style={[stylesGlobal.rowNoPadding, stylesGlobal.center]}>
                <View style={[stylesGlobal.rowEnd, stylesGlobal.paddingRight5]}>
                  <Text style={[stylesGlobal.textGold, styles.bold16]}>
                    {this.generateHeaderTitle()}
                  </Text>
                </View>
              </View>
            </View>

            {/* { != mov.length - 1 ? ( */}
            {count !== itemList.length - 1 ? (
              <TouchableOpacity
                style={[stylesGlobal.width10, stylesGlobal.center]}
                onPress={() => this.handleNext()}
              >
                <Text
                  style={[
                    stylesGlobal.text12,
                    stylesGlobal.textBold,
                    stylesGlobal.backgroundColorWhite
                  ]}
                >
                  Next
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={[stylesGlobal.width10, stylesGlobal.center]}>
                <Text
                  style={[
                    stylesGlobal.text12,
                    stylesGlobal.greyColor,
                    stylesGlobal.backgroundColorWhite
                  ]}
                >
                  Next
                </Text>
              </View>
            )}
          </View>
        </View>
        <ScrollView>
          {type === "accommodation" ? (
            <SegmentActivity
              listActivity={itemData.accommodation}
              type={type}
            />
          ) : type === "excursion" ? (
            <SegmentActivity listActivity={itemData.excursion} type={type} />
          ) : type === "restaurant" ? (
            <SegmentActivity listActivity={itemData.restaurant} type={type} />
          ) : type === "flight" ? (
            <SegmentActivity listActivity={itemData.flight} type={type} />
          ) : type === "transportation" ? (
            <SegmentActivity
              listActivity={itemData.transportation}
              type={type}
            />
          ) : null}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  DemoPrice: state.transactionReducer.DemoPrice
});

export default connect(mapStateToProps)(orderedItemDetail);
