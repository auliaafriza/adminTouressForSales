import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StatusBar,
  BackHandler,
  Platform
} from "react-native";
import { Container } from "../../../../../components/container";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "../../styles";
import stylesGlobal from "../../../../../components/styles";
import { CardTourOperator } from "../../../../../components/card";
import { Guest } from "../../../../../helper/dailyProgram";
import { SearchBar } from "react-native-elements";
// import { set_guest, set_operator } from '../../../../../actions/operator/operatorAction';
import {
  setOperatorAction,
  getOperatorListAction,
  resetOperatorListAction
} from "../../../../../actions/operator/operatorAction";
import { setGuestAction } from "../../../../../actions/General/generalAction";
import { Loading } from "../../../../../components/loading";
class tourOperatorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // ListTourOperator: this.props.tourOperatorList,
      ListTourOperator: [],
      searchClearIcon: false,
      // loading: false,
      searchText: ""
    };
  }

  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    tourOperatorList: PropTypes.array,
    CustomDetails: PropTypes.object,
    GuestQoutation: PropTypes.array
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
    this.props.getOperatorListAction("Ready", objItem);
  }

  componentDidUpdate() {
    if (this.props.isTourOperator !== null) {
      // this.setDataGuest(this.props.guestData);
      this.setState({ ListTourOperator: this.props.tourOperatorList });
      this.props.resetOperatorListAction();
    }
  }

  _onChangeSearchText = searchText => {
    if (searchText) {
      this.setState({
        searchClearIcon: { color: "red" },
        searchText: searchText
      });
    } else {
      this.setState({ searchClearIcon: false, searchText: "" });
    }
  };

  _handleSearch = value => {
    this._onChangeSearchText(value);
    let updatedList = this.props.tourOperatorList;
    updatedList = updatedList.filter(v => {
      if (v.TourProfileName.toLowerCase().indexOf(value.toLowerCase()) > -1) {
        return true;
      }
      return false;
    });
    this.setState({ ListTourOperator: updatedList });
  };

  fillGuest = async result => {
    // this.setState({ loading: true });
    let Guests = [];
    // await this.props.dispatch(await set_operator(result));
    await this.props.setOperatorAction(result);
    const { Adult, Child, Infant } = this.props.CustomDetails.GuestAllocation;
    const Total = Adult + Child + Infant;
    if (this.props.GuestQoutation.length != 0) {
      let AdultGuest = 0;
      let ChildGuest = 0;
      let InfantGuest = 0;
      this.props.GuestQoutation.forEach(function(task) {
        if (task.GuestCategory == "ADULT") {
          AdultGuest = AdultGuest + 1;
        }
      });
      this.props.GuestQoutation.forEach(function(task) {
        if (task.GuestCategory == "CHILD" || task.GuestCategory == "CHILDREN") {
          ChildGuest = ChildGuest + 1;
        }
      });
      this.props.GuestQoutation.forEach(function(task) {
        if (task.GuestCategory == "INFANT") {
          InfantGuest = InfantGuest + 1;
        }
      });

      if (this.props.GuestQoutation.length > Total) {
        for (let i = 0; i < Adult; i++) Guests.push(new Guest("ADULT"));
        for (let i = 0; i < Child; i++) Guests.push(new Guest("CHILD"));
        for (let i = 0; i < Infant; i++) Guests.push(new Guest("INFANT"));
      } else {
        AdultGuest = AdultGuest ? AdultGuest : 0;
        ChildGuest = ChildGuest ? ChildGuest : 0;
        InfantGuest = InfantGuest ? InfantGuest : 0;

        if (Adult != 0) {
          this.props.GuestQoutation.forEach(function(task) {
            if (task.GuestCategory == "ADULT") {
              Guests.push(task);
            }
          });
          if (AdultGuest != Adult) {
            for (let i = 0; i < Adult - AdultGuest; i++)
              Guests.push(new Guest("ADULT"));
          }
        }
        if (Child != 0) {
          this.props.GuestQoutation.forEach(function(task) {
            if (
              task.GuestCategory == "CHILD" ||
              task.GuestCategory == "CHILDREN"
            ) {
              Guests.push(task);
            }
          });
          if (ChildGuest != Child) {
            for (let i = 0; i < Child - ChildGuest; i++)
              Guests.push(new Guest("CHILD"));
          }
        }
        if (Infant != 0) {
          this.props.GuestQoutation.forEach(function(task) {
            if (task.GuestCategory == "INFANT") {
              Guests.push(task);
            }
          });
          if (InfantGuest != Infant) {
            for (let i = 0; i < Infant - InfantGuest; i++)
              Guests.push(new Guest("INFANT"));
          }
        }
      }
    } else {
      for (let i = 0; i < Adult; i++) Guests.push(new Guest("ADULT"));
      for (let i = 0; i < Child; i++) Guests.push(new Guest("CHILD"));
      for (let i = 0; i < Infant; i++) Guests.push(new Guest("INFANT"));
    }
    // await this.props.dispatch(await set_guest(Guests));
    await this.props.setGuestAction(Guests);
    // this.setState({ loading: false });
    this.props.navigation.navigate("GuestListCustom");
  };
  render() {
    return (
      <Container>
        {this.props.loading ? (
          <Loading sizeloading="large" colorloading={styles.$goldcolor} />
        ) : null}
        <View
          style={[
            styles.headerOperatorList,
            styles.headerTop,
            stylesGlobal.paddingTop10
          ]}
        >
          <StatusBar
            translucent
            barStyle="dark-content"
            backgroundColor="transparent"
          />
          <SearchBar
            clearIcon={this.state.searchClearIcon}
            searchIcon={true}
            onChangeText={this._handleSearch}
            placeholder="Type Here..."
            containerStyle={styles.searchBarList}
            inputStyle={styles.searcBarInputStyle}
            value={this.state.searchText}
          />
          <View style={styles.showingContainer}>
            <Text style={styles.textShowing}>
              Showing {this.state.ListTourOperator.length} Tour Operator
            </Text>
          </View>
        </View>
        <ScrollView style={stylesGlobal.containerScrollCustomOption}>
          <Container paddingtopcontainer={Platform.OS === "ios" ? 100 : 120}>
            {this.state.ListTourOperator
              ? this.state.ListTourOperator.map((obj, i) => {
                  return (
                    <CardTourOperator
                      key={i}
                      type="list"
                      imagetouroperator={obj.TourOperatorProfile.ImageUrl}
                      touroperatorname={obj.TourOperatorProfile.Name}
                      address={obj.TourOperatorProfile.Address}
                      textphone={obj.TourOperatorProfile.Telephone}
                      textemail={obj.TourOperatorProfile.Email}
                      show={true}
                      onPress={() => this.fillGuest(obj)}
                      // textprice={
                      //   this.props.route.params.type == "FixedDateVariable"
                      //     ? ""
                      //     : obj.CurrencyId +
                      //       " " +
                      //       obj.TotalPrice.toString()
                      //         .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                      //         .toLocaleString(obj.CurrencyId)
                      // }
                      textprice={
                        obj.CurrencyId +
                        " " +
                        obj.TotalPrice.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                          .toLocaleString(obj.CurrencyId)
                      }
                    />
                  );
                })
              : null}
          </Container>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  tourOperatorList: state.operatorReducer.operatorList,
  CustomDetails: state.transactionReducer.CustomDetails,
  GuestQoutation: state.transactionReducer.GuestQoutation,
  loading: state.operatorReducer.loading || state.transactionReducer.loading,
  isTourOperator: state.operatorReducer.isTourOperator
});
export default connect(mapStateToProps, {
  setOperatorAction,
  setGuestAction,
  getOperatorListAction,
  resetOperatorListAction
})(tourOperatorList);
const objItem = {
  Title: "Paket Lengkap",
  AdultPaxQty: 1,
  ChildPaxQty: 0,
  InfantPaxQty: 0,
  RoomAllocation: {
    ChildExtraBedQty: 0,
    ChildSharingRoomQty: 0,
    ChildSingleRoomQty: 0,
    ExtraBedQty: 0,
    BabyCrib: 0,
    NoBed: 0,
    SharingBedQty: 0,
    SharingRoomQty: 1,
    SingleRoomQty: 0
  },
  FoC: null,
  StartDate: "2020-03-18T08:00:00",
  EndDate: "2020-03-24T14:00:00",
  CityDestinationId: "DUBAI",
  RegionDestinationId: "DUBAI",
  TourCategoryId: 66,
  TourPaxTypeId: 3,
  GroupType: "Small",
  Attractions: [
    {
      ServiceItemId: 100,
      DateTime: "2020-03-19T08:30:00",
      Duration: 7200,
      CityId: "DUBAI"
    },
    {
      ServiceItemId: 6532,
      DateTime: "2020-03-23T08:25:00",
      Duration: 7200,
      CityId: "KUTA"
    },
    {
      ServiceItemId: 6387,
      DateTime: "2020-03-23T10:55:00",
      Duration: 10800,
      CityId: "KUTA"
    }
  ],
  Transportations: [],
  Accommodations: [
    {
      AccommodationItemServiceType: "With_breakfast",
      DateTime: "2020-03-18T14:00:00",
      EndTime: "2020-03-20T10:00:00",
      ServiceItemId: 28059,
      SharingRoomQty: 1,
      SingleRoomQty: 0,
      ExtraBedQty: 0,
      ChildExtraBedQty: 0,
      ChildSharingRoomQty: 0,
      ChildSingleRoomQty: 0,
      SharingBedQty: 0,
      NoBed: 0
    },
    {
      AccommodationItemServiceType: "With_breakfast",
      DateTime: "2020-03-20T16:00:00",
      EndTime: "2020-03-22T10:00:00",
      ServiceItemId: 38310,
      SharingRoomQty: 1,
      SingleRoomQty: 0,
      ExtraBedQty: 0,
      ChildExtraBedQty: 0,
      ChildSharingRoomQty: 0,
      ChildSingleRoomQty: 0,
      SharingBedQty: 0,
      NoBed: 0
    },
    {
      AccommodationItemServiceType: "With_breakfast",
      DateTime: "2020-03-22T16:00:00",
      EndTime: "2020-03-24T10:00:00",
      ServiceItemId: 57473,
      SharingRoomQty: 1,
      SingleRoomQty: 0,
      ExtraBedQty: 0,
      ChildExtraBedQty: 0,
      ChildSharingRoomQty: 0,
      ChildSingleRoomQty: 0,
      SharingBedQty: 0,
      NoBed: 0
    }
  ],
  Movements: [
    {
      DateTime: "2020-03-18T08:00:00",
      ServiceItemId: 7,
      CityId: "JAKARTA",
      Duration: 0,
      SeqNumber: 1,
      ServiceItemRefId: null,
      PlaceId: 2,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-18T08:00:00",
      ServiceItemId: 10,
      CityId: "JAKARTA",
      Duration: 7200,
      SeqNumber: 2,
      ServiceItemRefId: null,
      PlaceId: 2,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-18T10:00:00",
      ServiceItemId: 8,
      CityId: "DUBAI",
      Duration: 0,
      SeqNumber: 3,
      ServiceItemRefId: null,
      PlaceId: 4,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-18T10:00:00",
      ServiceItemId: 2533,
      CityId: "DUBAI",
      Duration: 0,
      SeqNumber: 4,
      ServiceItemRefId: null,
      PlaceId: 4,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-18T10:00:00",
      ServiceItemId: 2534,
      CityId: "DUBAI",
      Duration: 0,
      SeqNumber: 5,
      ServiceItemRefId: null,
      PlaceId: 4,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-18T10:00:00",
      ServiceItemId: 1,
      CityId: "DUBAI",
      Duration: 1500,
      SeqNumber: 6,
      ServiceItemRefId: null,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-18T10:25:00",
      ServiceItemId: 27231,
      CityId: "DUBAI",
      Duration: 12900,
      SeqNumber: 7,
      ServiceItemRefId: 28059,
      PlaceId: null,
      Note: "",
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-18T14:00:00",
      ServiceItemId: 2,
      CityId: "DUBAI",
      Duration: 0,
      SeqNumber: 8,
      ServiceItemRefId: 28059,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-18T14:00:00",
      ServiceItemId: 2434,
      CityId: "DUBAI",
      Duration: 0,
      SeqNumber: 9,
      ServiceItemRefId: 28059,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-19T08:00:00",
      ServiceItemId: 2433,
      CityId: "DUBAI",
      Duration: 0,
      SeqNumber: 1,
      ServiceItemRefId: 28059,
      PlaceId: null,
      Note: "",
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-19T08:00:00",
      ServiceItemId: 5,
      CityId: "DUBAI",
      Duration: 0,
      SeqNumber: 2,
      ServiceItemRefId: 28059,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-19T08:00:00",
      ServiceItemId: 1,
      CityId: "DUBAI",
      Duration: 1800,
      SeqNumber: 3,
      ServiceItemRefId: null,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-19T08:30:00",
      ServiceItemId: 6,
      CityId: "DUBAI",
      Duration: 7200,
      SeqNumber: 4,
      ServiceItemRefId: 100,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-19T10:30:00",
      ServiceItemId: 1,
      CityId: "DUBAI",
      Duration: 1800,
      SeqNumber: 5,
      ServiceItemRefId: null,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-19T11:00:00",
      ServiceItemId: 4,
      CityId: "DUBAI",
      Duration: 0,
      SeqNumber: 6,
      ServiceItemRefId: 28059,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-19T11:00:00",
      ServiceItemId: 2434,
      CityId: "DUBAI",
      Duration: 0,
      SeqNumber: 7,
      ServiceItemRefId: 28059,
      PlaceId: null,
      Note: "",
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-20T10:00:00",
      ServiceItemId: 2433,
      CityId: "DUBAI",
      Duration: 0,
      SeqNumber: 1,
      ServiceItemRefId: 28059,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-20T10:00:00",
      ServiceItemId: 3,
      CityId: "DUBAI",
      Duration: 0,
      SeqNumber: 2,
      ServiceItemRefId: 28059,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-20T10:00:00",
      ServiceItemId: 2533,
      CityId: "DUBAI",
      Duration: 0,
      SeqNumber: 3,
      ServiceItemRefId: 28059,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-20T10:00:00",
      ServiceItemId: 2534,
      CityId: "DUBAI",
      Duration: 0,
      SeqNumber: 4,
      ServiceItemRefId: 28059,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-20T10:00:00",
      ServiceItemId: 1,
      CityId: "DUBAI",
      Duration: 1500,
      SeqNumber: 5,
      ServiceItemRefId: null,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-20T10:25:00",
      ServiceItemId: 27231,
      CityId: "DUBAI",
      Duration: 5700,
      SeqNumber: 6,
      ServiceItemRefId: null,
      PlaceId: 4,
      Note: "",
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-20T12:00:00",
      ServiceItemId: 7,
      CityId: "DUBAI",
      Duration: 0,
      SeqNumber: 7,
      ServiceItemRefId: null,
      PlaceId: 4,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-20T12:00:00",
      ServiceItemId: 10,
      CityId: "DUBAI",
      Duration: 7200,
      SeqNumber: 8,
      ServiceItemRefId: null,
      PlaceId: 4,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-20T14:00:00",
      ServiceItemId: 8,
      CityId: "ISTANBUL",
      Duration: 0,
      SeqNumber: 9,
      ServiceItemRefId: null,
      PlaceId: 6,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-20T14:00:00",
      ServiceItemId: 2533,
      CityId: "ISTANBUL",
      Duration: 0,
      SeqNumber: 10,
      ServiceItemRefId: null,
      PlaceId: 6,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-20T14:00:00",
      ServiceItemId: 2534,
      CityId: "ISTANBUL",
      Duration: 0,
      SeqNumber: 11,
      ServiceItemRefId: null,
      PlaceId: 6,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-20T14:00:00",
      ServiceItemId: 1,
      CityId: "ISTANBUL",
      Duration: 1800,
      SeqNumber: 12,
      ServiceItemRefId: null,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-20T14:30:00",
      ServiceItemId: 27231,
      CityId: "ISTANBUL",
      Duration: 5400,
      SeqNumber: 13,
      ServiceItemRefId: 38310,
      PlaceId: null,
      Note: "",
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-20T16:00:00",
      ServiceItemId: 2,
      CityId: "ISTANBUL",
      Duration: 0,
      SeqNumber: 14,
      ServiceItemRefId: 38310,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-20T16:00:00",
      ServiceItemId: 2434,
      CityId: "ISTANBUL",
      Duration: 0,
      SeqNumber: 15,
      ServiceItemRefId: 38310,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-21T08:00:00",
      ServiceItemId: 2433,
      CityId: "ISTANBUL",
      Duration: 0,
      SeqNumber: 1,
      ServiceItemRefId: 38310,
      PlaceId: null,
      Note: "",
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-21T20:00:00",
      ServiceItemId: 2434,
      CityId: "ISTANBUL",
      Duration: 0,
      SeqNumber: 2,
      ServiceItemRefId: 38310,
      PlaceId: null,
      Note: "",
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-22T10:00:00",
      ServiceItemId: 2433,
      CityId: "ISTANBUL",
      Duration: 0,
      SeqNumber: 1,
      ServiceItemRefId: 38310,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-22T10:00:00",
      ServiceItemId: 3,
      CityId: "ISTANBUL",
      Duration: 0,
      SeqNumber: 2,
      ServiceItemRefId: 38310,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-22T10:00:00",
      ServiceItemId: 2533,
      CityId: "ISTANBUL",
      Duration: 0,
      SeqNumber: 3,
      ServiceItemRefId: 38310,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-22T10:00:00",
      ServiceItemId: 2534,
      CityId: "ISTANBUL",
      Duration: 0,
      SeqNumber: 4,
      ServiceItemRefId: 38310,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-22T10:00:00",
      ServiceItemId: 1,
      CityId: "ISTANBUL",
      Duration: 2100,
      SeqNumber: 5,
      ServiceItemRefId: null,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-22T10:35:00",
      ServiceItemId: 27231,
      CityId: "ISTANBUL",
      Duration: 5100,
      SeqNumber: 6,
      ServiceItemRefId: null,
      PlaceId: 6,
      Note: "",
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-22T12:00:00",
      ServiceItemId: 7,
      CityId: "ISTANBUL",
      Duration: 0,
      SeqNumber: 7,
      ServiceItemRefId: null,
      PlaceId: 6,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-22T12:00:00",
      ServiceItemId: 10,
      CityId: "ISTANBUL",
      Duration: 7200,
      SeqNumber: 8,
      ServiceItemRefId: null,
      PlaceId: 6,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-22T14:00:00",
      ServiceItemId: 8,
      CityId: "KUTA",
      Duration: 0,
      SeqNumber: 9,
      ServiceItemRefId: null,
      PlaceId: 61,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-22T14:00:00",
      ServiceItemId: 2533,
      CityId: "KUTA",
      Duration: 0,
      SeqNumber: 10,
      ServiceItemRefId: null,
      PlaceId: 61,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-22T14:00:00",
      ServiceItemId: 2534,
      CityId: "KUTA",
      Duration: 0,
      SeqNumber: 11,
      ServiceItemRefId: null,
      PlaceId: 61,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-22T14:00:00",
      ServiceItemId: 1,
      CityId: "KUTA",
      Duration: 2100,
      SeqNumber: 12,
      ServiceItemRefId: null,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-22T14:35:00",
      ServiceItemId: 27231,
      CityId: "KUTA",
      Duration: 5100,
      SeqNumber: 13,
      ServiceItemRefId: 57473,
      PlaceId: null,
      Note: "",
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-22T16:00:00",
      ServiceItemId: 2,
      CityId: "KUTA",
      Duration: 0,
      SeqNumber: 14,
      ServiceItemRefId: 57473,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-22T16:00:00",
      ServiceItemId: 2434,
      CityId: "KUTA",
      Duration: 0,
      SeqNumber: 15,
      ServiceItemRefId: 57473,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-23T08:00:00",
      ServiceItemId: 2433,
      CityId: "KUTA",
      Duration: 0,
      SeqNumber: 1,
      ServiceItemRefId: 57473,
      PlaceId: null,
      Note: "",
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-23T08:00:00",
      ServiceItemId: 5,
      CityId: "KUTA",
      Duration: 0,
      SeqNumber: 2,
      ServiceItemRefId: 57473,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-23T08:00:00",
      ServiceItemId: 1,
      CityId: "KUTA",
      Duration: 1500,
      SeqNumber: 3,
      ServiceItemRefId: null,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-23T08:25:00",
      ServiceItemId: 6,
      CityId: "KUTA",
      Duration: 7200,
      SeqNumber: 4,
      ServiceItemRefId: 6532,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-23T10:25:00",
      ServiceItemId: 1,
      CityId: "KUTA",
      Duration: 1800,
      SeqNumber: 5,
      ServiceItemRefId: null,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-23T10:55:00",
      ServiceItemId: 6,
      CityId: "KUTA",
      Duration: 10800,
      SeqNumber: 6,
      ServiceItemRefId: 6387,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-23T13:55:00",
      ServiceItemId: 1,
      CityId: "KUTA",
      Duration: 0,
      SeqNumber: 7,
      ServiceItemRefId: null,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-23T13:55:00",
      ServiceItemId: 11,
      CityId: "KUTA",
      Duration: 7200,
      SeqNumber: 8,
      ServiceItemRefId: 24764,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-23T15:55:00",
      ServiceItemId: 1,
      CityId: "KUTA",
      Duration: 0,
      SeqNumber: 9,
      ServiceItemRefId: null,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-23T15:55:00",
      ServiceItemId: 4,
      CityId: "KUTA",
      Duration: 0,
      SeqNumber: 10,
      ServiceItemRefId: 57473,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-23T15:55:00",
      ServiceItemId: 2434,
      CityId: "KUTA",
      Duration: 0,
      SeqNumber: 11,
      ServiceItemRefId: 57473,
      PlaceId: null,
      Note: "",
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-24T10:00:00",
      ServiceItemId: 2433,
      CityId: "KUTA",
      Duration: 0,
      SeqNumber: 1,
      ServiceItemRefId: 57473,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-24T10:00:00",
      ServiceItemId: 3,
      CityId: "KUTA",
      Duration: 0,
      SeqNumber: 2,
      ServiceItemRefId: 57473,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-24T10:00:00",
      ServiceItemId: 2533,
      CityId: "KUTA",
      Duration: 0,
      SeqNumber: 3,
      ServiceItemRefId: 57473,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-24T10:00:00",
      ServiceItemId: 2534,
      CityId: "KUTA",
      Duration: 0,
      SeqNumber: 4,
      ServiceItemRefId: 57473,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-24T10:00:00",
      ServiceItemId: 1,
      CityId: "KUTA",
      Duration: 1800,
      SeqNumber: 5,
      ServiceItemRefId: null,
      PlaceId: null,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-24T10:30:00",
      ServiceItemId: 27231,
      CityId: "KUTA",
      Duration: 5400,
      SeqNumber: 6,
      ServiceItemRefId: null,
      PlaceId: 61,
      Note: "",
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-24T12:00:00",
      ServiceItemId: 7,
      CityId: "KUTA",
      Duration: 0,
      SeqNumber: 7,
      ServiceItemRefId: null,
      PlaceId: 61,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-24T12:00:00",
      ServiceItemId: 10,
      CityId: "KUTA",
      Duration: 7200,
      SeqNumber: 8,
      ServiceItemRefId: null,
      PlaceId: 61,
      Note: null,
      PartOfAnotherDate: null
    },
    {
      DateTime: "2020-03-24T14:00:00",
      ServiceItemId: 8,
      CityId: "JAKARTA",
      Duration: 0,
      SeqNumber: 9,
      ServiceItemRefId: null,
      PlaceId: 2,
      Note: null,
      PartOfAnotherDate: null
    }
  ],
  Guests: [
    {
      FirstName: "TBA",
      LastName: "TBA",
      IdentityNbr: "1234",
      IdentityType: "PASSPORT",
      GuestTitle: "Mr.",
      GuestType: "TOURLEADER",
      GuestCategory: "ADULT",
      CountryId: "AF",
      Id: 1
    }
  ],
  Restaurants: [
    { DateTime: "2020-03-23T13:55:00", ServiceItemId: 24764, CityId: "KUTA" }
  ],
  TourGuides: [],
  ReadyPackageId: "679",
  IsReadyPackage: true,
  FlightTickets: []
};
