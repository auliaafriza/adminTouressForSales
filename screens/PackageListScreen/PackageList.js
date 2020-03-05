import React, { PureComponent } from "react";
import {
  ScrollView,
  BackHandler,
  View,
  Modal,
  Image,
  Text,
  Platform,
  Picker,
  TextInput,
  FlatList,
  TouchableOpacity,
  StatusBar
} from "react-native";
import IOSPicker from "react-native-ios-picker";
import { CardPackages } from "../../components/card";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { SearchBar } from "react-native-elements";
import moment from "moment";
// import {
//   get_id,
//   reset_supplement_by_id
//   // reset_fixpackages_filter
// } from "../../actions/fixPackagesAction";
import { convertRoundPrice } from "../../helper/helper";
import { Container } from "../../components/container";
// import { Loading } from '../../components/loading';
import { ClearButtonWithIcon, NormalButton } from "../../components/button";
import { Seperator } from "../../components/list";
import IconClose from "../../assets/Icon/close.png";
import styles from "./styles";
import stylesGlobal from "../../components/styles";
// import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

class PackageList extends PureComponent {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    // const data = navigation.getParam("type", "null");
    this.state = {
      Filter: {
        tourTypeId: "",
        duration: null,
        lowerPrice: "0",
        higherPrice: "15000000"
      },
      DetailCustom: { TourType: null },
      labelTourTypeId: null,
      labelDuration: null,
      loading: false,
      isFetched: false,
      listData: dummyData,
      modalVisible: false,
      modalVisibleSort: false,
      FixPackagesFilter: null,
      isFocused: false,
      //   status: data,
      searchClearIcon: false,
      refreshing: true,
      searchText: ""
    };
  }

  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    fixedPackagesAll: PropTypes.array,
    isFixedPackage: PropTypes.string,
    readyPackagesAll: PropTypes.array,
    isReadyPackagesById: PropTypes.string,
    typeTour: PropTypes.array,
    fixPackagesFilter: PropTypes.object,
    isFixPackagesFilter: PropTypes.string
  };

  handlepressbooking = (Id, type, TourOperator) => {
    this.setState({ loading: true });
    // this.props.dispatch(get_id(Id));
    // this.props.dispatch(reset_supplement_by_id());
    {
      type === "Fixed"
        ? this.props.navigation.navigate("PackagesDetail", {
            status: "Fixed",
            Id: Id,
            TourOperator: TourOperator
          })
        : this.props.navigation.navigate("ReadyPackagesDetail", {
            status: type,
            Id: Id,
            TourOperator: TourOperator
          });
    }
    this.setState({ loading: false });
  };

  handlePressCustom = () => {
    this.props.navigation.navigate("customPackagesOption");
  };

  componentDidMount() {
    this.setState({ loading: true });
    BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
    // const packages =
    //   this.state.status == "ready"
    //     ? this.props.readyPackagesAll
    //     : this.props.fixedPackagesAll;
    this.setState({
      listData: dummyData,
      loading: false,
      isFetched: true
    });
  }

  openModal = () => {
    this.setState({ modalVisible: true });
  };

  closeModal = () => {
    this.setState({ modalVisible: false, modalVisibleSort: false });
  };

  openModalSort = () => {
    this.setState({ modalVisibleSort: true });
  };

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  handleSort = type => {
    const packages =
      this.state.status == "ready"
        ? this.props.readyPackagesAll
        : this.props.fixedPackagesAll;
    let updatedList = packages;
    if (type === "High") {
      updatedList = updatedList.sort(function(a, b) {
        if (a.SharingRoomPrice < b.SharingRoomPrice) return 1;
        else if (a.SharingRoomPrice > b.SharingRoomPrice) return -1;
      });
    }
    if (type === "Low") {
      updatedList = updatedList.sort(function(a, b) {
        if (a.SharingRoomPrice < b.SharingRoomPrice) return -1;
        else if (a.SharingRoomPrice > b.SharingRoomPrice) return 1;
      });
    }
    this.setState({
      listData: updatedList,
      modalVisible: false,
      modalVisibleSort: false
    });
  };

  handleFilter = value => {
    const packages =
      this.state.status == "ready"
        ? this.props.readyPackagesAll
        : this.props.fixedPackagesAll;
    let updatedList = packages;

    updatedList = updatedList.filter(v => {
      let diff = moment(v.EndDate).diff(moment(v.StartDate), "days") + 1;
      let duration = value.duration;

      if (
        value.duration != null &&
        value.tourTypeId != "" &&
        value.lowerPrice != "" &&
        value.higherPrice != ""
      ) {
        if (
          diff >= duration &&
          diff <= duration + 2 &&
          v.TourPaxType.Id == value.tourTypeId &&
          v.SharingRoomPrice >= parseInt(value.lowerPrice) &&
          v.SharingRoomPrice <= parseInt(value.higherPrice)
        ) {
          return true;
        }
      } else if (
        value.duration != null &&
        value.tourTypeId == "" &&
        value.lowerPrice != "" &&
        value.higherPrice != ""
      ) {
        if (
          diff >= duration &&
          diff <= duration + 2 &&
          v.SharingRoomPrice >= parseInt(value.lowerPrice) &&
          v.SharingRoomPrice <= parseInt(value.higherPrice)
        ) {
          return true;
        }
      } else if (
        value.duration == null &&
        value.tourTypeId != "" &&
        value.lowerPrice != "" &&
        value.higherPrice != ""
      ) {
        if (
          v.TourPaxType.Id == value.tourTypeId &&
          v.SharingRoomPrice >= parseInt(value.lowerPrice) &&
          v.SharingRoomPrice <= parseInt(value.higherPrice)
        ) {
          return true;
        }
      } else {
        if (diff >= duration && diff <= duration + 2) {
          return true;
        }

        if (v.TourPaxType.Id == value.tourTypeId) {
          return true;
        }

        if (
          v.SharingRoomPrice >= parseInt(value.lowerPrice) &&
          v.SharingRoomPrice <= parseInt(value.higherPrice)
        ) {
          return true;
        }
        return false;
      }
    });
    this.setState({
      listData: updatedList,
      modalVisible: false,
      modalVisibleSort: false
    });
  };

  handleReset = () => {
    const packages =
      this.state.status == "ready"
        ? this.props.readyPackagesAll
        : this.props.fixedPackagesAll;
    this.setState({
      Filter: {
        ...this.state.Filter,
        lowerPrice: "0",
        higherPrice: "15000000",
        duration: "",
        tourTypeId: ""
      }
    });
    this.setState({
      listData: packages,
      modalVisible: false,
      modalVisibleSort: false
    });
  };

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
    const packages =
      this.state.status == "ready"
        ? this.props.readyPackagesAll
        : this.props.fixedPackagesAll;
    let updatedList = packages;
    updatedList = updatedList.filter(v => {
      if (
        v.Title.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        v.Destination.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        v.Id == value
      ) {
        return true;
      }
      return false;
    });
    this.setState({ listData: updatedList });
  };

  render() {
    return (
      <Container>
        <View
          style={[styles.header, styles.headerTop, stylesGlobal.paddingTop10]}
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
              Showing {this.state.listData.length} Packages
            </Text>
          </View>
        </View>
        {/* {this.state.loading ? (
          <Loading
            sizeloading="large"
            colorloading={styles.$goldcolor}
            positionLoad="relative"
          />
        ) : null} */}
        <ScrollView style={[stylesGlobal.containerScroll, styles.paddingTop50]}>
          <Container paddingbottomcontainer={120} paddingtopcontainer={50}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisibleSort || this.state.modalVisible}
              onRequestClose={() => {
                this.setModalVisible(
                  !this.state.modalVisibleSort || this.state.modalVisible
                );
              }}
            >
              <View style={styles.modalContainer}>
                {this.state.modalVisibleSort ? (
                  <View
                    style={[styles.innerContainerSort, stylesGlobal.padding20]}
                  >
                    <Text
                      style={[
                        stylesGlobal.text18,
                        stylesGlobal.textBold,
                        stylesGlobal.marginBottom20,
                        stylesGlobal.marginTop10
                      ]}
                    >
                      Sort
                    </Text>
                    <TouchableOpacity
                      onPress={this.closeModal}
                      style={[stylesGlobal.containerIcon20, styles.iconClose]}
                    >
                      <Image
                        style={[
                          stylesGlobal.imageIcon,
                          stylesGlobal.tintColorRed
                        ]}
                        source={IconClose}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    <Seperator
                      colorSepar={styles.$blacklightcolor}
                      widthsepar="100%"
                      heightSepar={1}
                    />
                    <TouchableOpacity onPress={() => this.handleSort("High")}>
                      <Text
                        style={[
                          stylesGlobal.text14,
                          stylesGlobal.textBold,
                          stylesGlobal.marginBottom20,
                          stylesGlobal.marginTop10
                        ]}
                      >
                        Highest Price
                      </Text>
                    </TouchableOpacity>
                    <Seperator
                      colorSepar={styles.$blacklightcolor}
                      heightSepar={1}
                      widthsepar="100%"
                    />
                    <TouchableOpacity onPress={() => this.handleSort("Low")}>
                      <Text
                        style={[
                          stylesGlobal.text14,
                          stylesGlobal.textBold,
                          stylesGlobal.marginBottom20,
                          stylesGlobal.marginTop10
                        ]}
                      >
                        Lower Price
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={[styles.innerContainer, stylesGlobal.padding20]}>
                    <Text
                      style={[
                        stylesGlobal.text18,
                        stylesGlobal.textBold,
                        stylesGlobal.marginBottom20,
                        stylesGlobal.marginTop10
                      ]}
                    >
                      Filter
                    </Text>
                    <TouchableOpacity
                      onPress={this.closeModal}
                      style={[stylesGlobal.containerIcon20, styles.iconClose]}
                    >
                      <Image
                        style={[
                          stylesGlobal.imageIcon,
                          stylesGlobal.tintColorRed
                        ]}
                        source={IconClose}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    <Text
                      style={[
                        stylesGlobal.textSemiBold,
                        stylesGlobal.marginBottom10
                      ]}
                    >
                      Tour Type
                    </Text>
                    <View
                      style={[
                        stylesGlobal.row100,
                        styles.containerDropDown,
                        stylesGlobal.marginBottom10
                      ]}
                    >
                      {Platform.OS === "ios" ? (
                        <IOSPicker
                          mode="modal"
                          textStyle={styles.textPicker}
                          style={styles.dropdownIos}
                          selectedValue={
                            this.state.Filter.tourTypeId == 0 ? (
                              <Text
                                style={[
                                  stylesGlobal.text14,
                                  styles.colorgreylight2
                                ]}
                              >
                                Choose Type
                              </Text>
                            ) : (
                              this.props.typeTour[
                                this.state.labelTourTypeId - 1
                              ].Name
                            )
                          }
                          onValueChange={(itemValue, itemIndex) => {
                            this.setState({
                              Filter: {
                                ...this.state.Filter,
                                tourTypeId: itemValue
                              },
                              labelTourTypeId: itemIndex
                            });
                          }}
                        >
                          <Picker.Item
                            label="Tour Type"
                            value=""
                            color={styles.$greylight2color}
                            style={stylesGlobal.text14}
                          />
                          {this.props.typeTour
                            ? this.props.typeTour.map((employee, i) => {
                                return (
                                  <Picker.Item
                                    label={employee.Name}
                                    value={employee.Id}
                                    key={i}
                                    style={styles.textPicker}
                                  />
                                );
                              })
                            : null}
                        </IOSPicker>
                      ) : (
                        <Picker
                          mode="dialog"
                          textStyle={styles.textPicker}
                          style={styles.containerDropDownAndroid}
                          selectedValue={this.state.Filter.tourTypeId}
                          onValueChange={itemValue => {
                            this.setState({
                              Filter: {
                                ...this.state.Filter,
                                tourTypeId: itemValue
                              }
                            });
                          }}
                        >
                          <Picker.Item
                            label="Tour Category"
                            value=""
                            color={styles.$greylight2color}
                            style={stylesGlobal.text14}
                          />
                          {this.props.typeTour.map((employee, i) => {
                            return (
                              <Picker.Item
                                label={employee.Name}
                                value={employee.Id}
                                key={i}
                              />
                            );
                          })}
                        </Picker>
                      )}
                    </View>
                    <Text
                      style={[
                        stylesGlobal.textSemiBold,
                        stylesGlobal.marginBottom10,
                        stylesGlobal.marginTop10
                      ]}
                    >
                      Duration (in a days)
                    </Text>
                    <View
                      style={[
                        stylesGlobal.row100,
                        styles.containerDropDown,
                        stylesGlobal.marginBottom10
                      ]}
                    >
                      {Platform.OS === "ios" ? (
                        <IOSPicker
                          mode="modal"
                          textStyle={styles.textPicker}
                          style={styles.dropdownIos}
                          selectedValue={
                            this.state.Filter.duration
                              ? this.state.Filter.duration == 1
                                ? "1 to 3"
                                : this.state.Filter.duration == 4
                                ? "4 to 6"
                                : this.state.Filter.duration == 7
                                ? "7 to 9"
                                : this.state.Filter.duration == 10
                                ? "10 to 12"
                                : "Duration"
                              : "Duration"
                          }
                          onValueChange={itemValue => {
                            this.setState({
                              Filter: {
                                ...this.state.Filter,
                                duration: itemValue
                              }
                            });
                          }}
                        >
                          <Picker.Item
                            label="Duration in a days"
                            value=""
                            color={styles.$greylight2color}
                            style={stylesGlobal.text14}
                          />
                          <Picker.Item label="1 to 3" value={1} />
                          <Picker.Item label="4 to 6" value={4} />
                          <Picker.Item label="7 to 9" value={7} />
                          <Picker.Item label="10 to 12" value={10} />
                        </IOSPicker>
                      ) : (
                        <Picker
                          mode="dialog"
                          textStyle={styles.textPicker}
                          style={styles.containerDropDownAndroid}
                          selectedValue={this.state.Filter.duration}
                          onValueChange={itemValue => {
                            this.setState({
                              Filter: {
                                ...this.state.Filter,
                                duration: itemValue
                              }
                            });
                          }}
                        >
                          <Picker.Item
                            label="Based Currency"
                            value=""
                            color={styles.$greylight2color}
                            style={stylesGlobal.text14}
                          />
                          <Picker.Item label="1 to 3" value={1} />
                          <Picker.Item label="4 to 6" value={4} />
                          <Picker.Item label="7 to 9" value={7} />
                          <Picker.Item label="10 to 12" value={10} />
                        </Picker>
                      )}
                    </View>
                    <Text
                      style={[
                        stylesGlobal.textSemiBold,
                        stylesGlobal.marginBottom10,
                        stylesGlobal.marginTop10
                      ]}
                    >
                      Price Range
                    </Text>
                    <View
                      style={[stylesGlobal.row100, stylesGlobal.marginBottom20]}
                    >
                      <View
                        style={[
                          stylesGlobal.width45,
                          stylesGlobal.paddingRight10
                        ]}
                      >
                        <View style={styles.containerFilterInput}>
                          <Text>IDR </Text>
                          <TextInput
                            style={styles.filterInput}
                            value={this.state.Filter.lowerPrice}
                            onChangeText={text =>
                              this.setState({
                                Filter: {
                                  ...this.state.Filter,
                                  lowerPrice: text
                                }
                              })
                            }
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                          />
                        </View>
                      </View>
                      <View style={[stylesGlobal.width10, stylesGlobal.center]}>
                        <Text> to </Text>
                      </View>
                      <View style={[stylesGlobal.width45]}>
                        <View style={styles.containerFilterInput}>
                          <Text>IDR </Text>
                          <TextInput
                            style={styles.filterInput}
                            value={this.state.Filter.higherPrice}
                            onChangeText={text =>
                              this.setState({
                                Filter: {
                                  ...this.state.Filter,
                                  higherPrice: text
                                }
                              })
                            }
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                          />
                        </View>
                      </View>
                    </View>
                    <View style={[styles.row100, stylesGlobal.rowEnd]}>
                      <View
                        style={[
                          stylesGlobal.width50,
                          styles.paddingHorizontal10
                        ]}
                      >
                        <NormalButton
                          text="RESET"
                          buttonWidth="100%"
                          buttonHeight={35}
                          buttonColor="white"
                          textColor={styles.$goldcolor}
                          colorBorder={styles.$goldcolor}
                          onPress={this.handleReset}
                        />
                      </View>
                      <View
                        style={[
                          stylesGlobal.width50,
                          styles.paddingHorizontal10
                        ]}
                      >
                        <NormalButton
                          text="DONE"
                          buttonWidth="100%"
                          buttonHeight={35}
                          textColor="white"
                          buttonColor={styles.$goldcolor}
                          onPress={() => this.handleFilter(this.state.Filter)}
                        />
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </Modal>

            <View
              style={[
                stylesGlobal.alignItemsCenter,
                stylesGlobal.paddingTop10,
                stylesGlobal.paddingLeft10,
                stylesGlobal.paddingRight10
              ]}
            >
              {this.state.listData.length == 0 ? null : (
                <FlatList
                  data={this.state.listData}
                  extraData={this.state}
                  renderItem={({ item, index }) => (
                    <View style={[stylesGlobal.paddingHorizontal10]}>
                      <CardPackages
                        TourTitle={item.Title}
                        currencies={item.CurrencyId}
                        Price={
                          item.PackageType == "Fixed" ||
                          item.PackageType == "FixedDateVariable"
                            ? convertRoundPrice(
                                item.SharingRoomPrice,
                                item.CurrencyId
                              ).toString()
                            : "0"
                        }
                        Pax={
                          item.PackageType == "Fixed"
                            ? item.FixedPackage.MinimumGuest -
                              item.FixedPackage.ConfirmedGuest
                            : 0
                        }
                        label={
                          item.PackageType == "Fixed"
                            ? ""
                            : item.PackageType == "Ready"
                            ? ""
                            : "Fixed Price"
                        }
                        //label=""
                        commission={
                          item.PackageType == "Fixed"
                            ? convertRoundPrice(
                                item.Commissions.reduce(function(sum, data) {
                                  return sum + data.Value;
                                }, 0),
                                item.CurrencyId
                              ).toString()
                            : "0"
                        }
                        show={item.PackageType}
                        Destination={item.City.Name + ", " + item.Country.Name}
                        StartDate={moment(item.StartDate).format("DD MMM")}
                        EndDate={moment(item.EndDate).format("DD MMM YYYY")}
                        Images={
                          item.Images
                            ? item.Images.length != 0
                              ? item.Images[0].ImageUrl
                              : item.City.ImageUrl
                            : item.City.ImageUrl
                        }
                        widthcontainer="100%"
                        heightcontainer={200}
                        onPress={() =>
                          this.handlepressbooking(
                            item.Id,
                            item.PackageType,
                            item.TourOperator
                          )
                        }
                        duration={
                          moment(item.EndDate).diff(
                            moment(item.StartDate),
                            "days"
                          ) + 1
                        }
                        index={index}
                      />
                    </View>
                  )}
                  numColumns={1}
                  //   keyExtractor={item => item.Id}
                />
              )}
            </View>
          </Container>
        </ScrollView>

        <View style={styles.footerFilter}>
          <View style={styles.rowNoPaddingFilter}>
            <View style={[stylesGlobal.width50, stylesGlobal.paddingTop10]}>
              <ClearButtonWithIcon
                text="Filter"
                textColor="white"
                bold
                textSize={12}
                iconSize={22}
                colorIcon="white"
                iconName="filter-outline"
                onPress={this.openModal}
                positionText="bawah"
              />
            </View>
            <View style={[stylesGlobal.width50, stylesGlobal.paddingTop10]}>
              <ClearButtonWithIcon
                text="Sort"
                textColor="white"
                bold
                textSize={12}
                iconSize={22}
                colorIcon="white"
                iconName="sort-ascending"
                onPress={this.openModalSort}
                positionText="bawah"
              />
            </View>
          </View>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  //   fixedPackagesAll: state.fixPackagesReducer.fixedPackagesAll,
  //   isFixedPackage: state.fixPackagesReducer.isFixedPackageById,
  //   readyPackagesAll: state.readyPackagesReducer.readyPackagesAll,
  //   isReadyPackagesById: state.readyPackagesReducer.isReadyPackagesById,
  //   typeTour: state.generalReducer.typeTour,
});

// export default connect(mapStateToProps)(packagesList);
export default PackageList;

const dummyData = [
  {
    ImageUrl: null,
    IsPublished: true,
    AdditionalServices: [],
    Id: "21",
    Title: "Fun trip",
    Description: "Coba coba",
    PackageType: "Ready",
    TotalGuest: 0,
    MinimumGuest: 0,
    MaximumGuest: 0,
    Destination: "BALI",
    City: {
      UTC: null,
      ImageUrl:
        "https://touressapiqa.azurewebsites.net//Content/imgSrc/City/0ed74a00-3093-4c16-987e-e64b856f1454travel-3239795_1920.jpg.jpg",
      Id: "KUTA",
      Name: "Kuta"
    },
    Country: {
      ImageUrl:
        "http://cloud.basajans.com:8868/tripplannerdev/5104226627001_5244682653001_5214868250001-vs.jpg",
      Id: "ID",
      Name: "Indonesia"
    },
    Company: null,
    AccommodationDesc: null,
    AccommodationName: null,
    Accommodation: 6142,
    CurrencyId: "IDR",
    CreatedDate: "0001-01-01T00:00:00",
    StartDate: "2018-04-11T10:00:00",
    EndDate: "2018-04-17T14:00:00",
    ActiveDate: null,
    Status: "Booking_hold",
    TourTotalPrice: 62.0,
    TotalPayed: 0.0,
    TourCategory: {
      Id: 66,
      Name: "Business",
      ImageName: null,
      ImageUrl: null,
      TinyImageUrl: null
    },
    TourPaxType: {
      Id: 1,
      Name: "Bachelor",
      ImageName: null,
      ImageUrl: null,
      TinyImageUrl: null
    },
    GroupType: "Small",
    TourOperatorProfileId: null,
    TourNote: null,
    IsSplitStaffCommission: null,
    ExternalBookingId: null,
    ExpiredOn: "2018-04-05T00:00:00",
    RegistrationDeadline: null,
    FixedPackage: null,
    VariableDatePackage: null,
    PaymentTerms: null,
    BookingTemplateRef: 0,
    IsRead: false,
    CreatedBy: null,
    ResponsibleUser: null,
    TourOperatorProfile: null,
    FoC: null,
    ReferenceId: null,
    PeriodeDates: null,
    IsAllotment: null
  },
  {
    ImageUrl: null,
    IsPublished: true,
    AdditionalServices: [],
    Id: "26",
    Title: "Test",
    Description: "Coba coba",
    PackageType: "Ready",
    TotalGuest: 0,
    MinimumGuest: 0,
    MaximumGuest: 0,
    Destination: "BALI",
    City: {
      UTC: null,
      ImageUrl:
        "https://touressapiqa.azurewebsites.net//Content/imgSrc/City/0ed74a00-3093-4c16-987e-e64b856f1454travel-3239795_1920.jpg.jpg",
      Id: "KUTA",
      Name: "Kuta"
    },
    Country: {
      ImageUrl:
        "http://cloud.basajans.com:8868/tripplannerdev/5104226627001_5244682653001_5214868250001-vs.jpg",
      Id: "ID",
      Name: "Indonesia"
    },
    Company: null,
    AccommodationDesc: null,
    AccommodationName: null,
    Accommodation: 6142,
    CurrencyId: "IDR",
    CreatedDate: "0001-01-01T00:00:00",
    StartDate: "2018-04-13T10:00:00",
    EndDate: "2018-04-14T14:00:00",
    ActiveDate: null,
    Status: "Booking_hold",
    TourTotalPrice: 62.0,
    TotalPayed: 0.0,
    TourCategory: {
      Id: 66,
      Name: "Business",
      ImageName: null,
      ImageUrl: null,
      TinyImageUrl: null
    },
    TourPaxType: {
      Id: 1,
      Name: "Bachelor",
      ImageName: null,
      ImageUrl: null,
      TinyImageUrl: null
    },
    GroupType: "Small",
    TourOperatorProfileId: null,
    TourNote: null,
    IsSplitStaffCommission: null,
    ExternalBookingId: null,
    ExpiredOn: "2018-04-07T00:00:00",
    RegistrationDeadline: null,
    FixedPackage: null,
    VariableDatePackage: null,
    PaymentTerms: null,
    BookingTemplateRef: 0,
    IsRead: false,
    CreatedBy: null,
    ResponsibleUser: null,
    TourOperatorProfile: null,
    FoC: null,
    ReferenceId: null,
    PeriodeDates: null,
    IsAllotment: null
  },
  {
    ImageUrl: null,
    IsPublished: false,
    AdditionalServices: [],
    Id: "217",
    Title: "Test - copy",
    Description: "Coba coba - copy",
    PackageType: "Ready",
    TotalGuest: 0,
    MinimumGuest: 0,
    MaximumGuest: 0,
    Destination: "BALI",
    City: {
      UTC: null,
      ImageUrl:
        "https://touressapiqa.azurewebsites.net//Content/imgSrc/City/0ed74a00-3093-4c16-987e-e64b856f1454travel-3239795_1920.jpg.jpg",
      Id: "KUTA",
      Name: "Kuta"
    },
    Country: {
      ImageUrl:
        "http://cloud.basajans.com:8868/tripplannerdev/5104226627001_5244682653001_5214868250001-vs.jpg",
      Id: "ID",
      Name: "Indonesia"
    },
    Company: null,
    AccommodationDesc: null,
    AccommodationName: null,
    Accommodation: 6142,
    CurrencyId: "IDR",
    CreatedDate: "0001-01-01T00:00:00",
    StartDate: "2018-04-13T10:00:00",
    EndDate: "2018-04-14T14:00:00",
    ActiveDate: null,
    Status: "Booking_hold",
    TourTotalPrice: 62.0,
    TotalPayed: 0.0,
    TourCategory: {
      Id: 66,
      Name: "Business",
      ImageName: null,
      ImageUrl: null,
      TinyImageUrl: null
    },
    TourPaxType: {
      Id: 1,
      Name: "Bachelor",
      ImageName: null,
      ImageUrl: null,
      TinyImageUrl: null
    },
    GroupType: "Small",
    TourOperatorProfileId: null,
    TourNote: null,
    IsSplitStaffCommission: null,
    ExternalBookingId: null,
    ExpiredOn: "2018-04-07T00:00:00",
    RegistrationDeadline: null,
    FixedPackage: null,
    VariableDatePackage: null,
    PaymentTerms: null,
    BookingTemplateRef: 0,
    IsRead: false,
    CreatedBy: null,
    ResponsibleUser: null,
    TourOperatorProfile: null,
    FoC: null,
    ReferenceId: null,
    PeriodeDates: null,
    IsAllotment: null
  },
  {
    PeriodeDates: [
      {
        StartDate: "2019-09-01T00:00:00",
        EndDate: "2019-09-30T00:00:00",
        AllowedDates: [],
        AllowedDays: []
      },
      {
        StartDate: "2019-11-01T00:00:00",
        EndDate: "2019-11-30T00:00:00",
        AllowedDates: [],
        AllowedDays: []
      },
      {
        StartDate: "2019-12-01T00:00:00",
        EndDate: "2019-12-31T00:00:00",
        AllowedDates: [],
        AllowedDays: []
      },
      {
        StartDate: "2020-01-01T00:00:00",
        EndDate: "2020-01-31T00:00:00",
        AllowedDates: [],
        AllowedDays: []
      }
    ],
    IsAllotment: true,
    AllowedDays: null,
    SharingRoomPrice: 10000000.0,
    LowestPrice: 1000000.0,
    Description: "Test Variable 009",
    IsPublished: false,
    IsFeatured: false,
    ReferredByTransaction: false,
    Commissions: [],
    TourOperator: {
      Id: 5,
      Name: "goIndonesia.tours",
      ImageUrl:
        "https://touressapiqa.azurewebsites.net//Content/imgSrc/TourOperatorProfile/964f90ec-ad40-4d5a-803e-f12f3cfa34c4swiss.jpg.jpg"
    },
    Images: [
      {
        ImageId: 558,
        ImageUrl:
          "https://touressapiqa.azurewebsites.net//Content/imgSrc/BookingTemplateImages/954f1bc3-b444-4e5e-a242-783a6aa40691paymen.png.jpg",
        TinyImageUrl: null,
        ImageName: "paymen.png",
        IsPrimaryImage: false
      }
    ],
    Id: "430",
    Title: "Test Variable 006",
    PackageType: "FixedDateVariable",
    TotalGuest: 0,
    MinimumGuest: 0,
    MaximumGuest: 0,
    Destination: "BALI",
    City: {
      UTC: null,
      ImageUrl:
        "https://touressapiqa.azurewebsites.net//Content/imgSrc/City/0ed74a00-3093-4c16-987e-e64b856f1454travel-3239795_1920.jpg.jpg",
      Id: "KUTA",
      Name: "Kuta"
    },
    Country: {
      ImageUrl:
        "http://cloud.basajans.com:8868/tripplannerdev/upload/beautiful-beach.jpg",
      Id: "ID",
      Name: "Indonesia"
    },
    Company: null,
    AccommodationDesc: null,
    AccommodationName: null,
    Accommodation: 0,
    CurrencyId: "IDR",
    CreatedDate: "0001-01-01T00:00:00",
    StartDate: "2019-08-29T10:00:00",
    EndDate: "2019-09-02T10:00:00",
    ActiveDate: null,
    Status: null,
    TourTotalPrice: 0.0,
    TotalPayed: 0.0,
    TourCategory: {
      Id: 70,
      Name: "Leisure",
      ImageName: null,
      ImageUrl: null,
      TinyImageUrl: null
    },
    TourPaxType: {
      Id: 3,
      Name: "Family",
      ImageName: null,
      ImageUrl: null,
      TinyImageUrl: null
    },
    GroupType: "0",
    TourOperatorProfileId: null,
    TourNote: null,
    IsSplitStaffCommission: null,
    ExternalBookingId: null,
    ExpiredOn: "2020-09-30T00:00:00",
    RegistrationDeadline: null,
    FixedPackage: null,
    VariableDatePackage: {
      BookingCommission: {
        TotalPriceForCustomer: 0.0,
        AgentCommission: {
          TotalPax: 0,
          UnitPrice: 0.0,
          TotalPrice: 0.0
        },
        StaffCommission: {
          TotalPax: 0,
          UnitPrice: 0.0,
          TotalPrice: 0.0
        },
        ApplicableCommission: []
      },
      RegisteringGuest: 0,
      MinimumGuest: 0,
      MaximumGuest: 0,
      ConfirmedGuest: 0,
      PaxLeft: 0,
      ReferenceId: null,
      MinPax: 1,
      PaymentTerms: [],
      Suppements: []
    },
    PaymentTerms: null,
    BookingTemplateRef: 0,
    IsRead: false,
    CreatedBy: null,
    ResponsibleUser: null,
    TourOperatorProfile: null,
    FoC: null,
    ReferenceId: "",
    AdditionalServices: []
  },
  {
    PeriodeDates: [
      {
        StartDate: "2019-09-01T00:00:00",
        EndDate: "2019-09-30T00:00:00",
        AllowedDates: [],
        AllowedDays: []
      },
      {
        StartDate: "2019-11-01T00:00:00",
        EndDate: "2019-11-29T00:00:00",
        AllowedDates: [],
        AllowedDays: []
      },
      {
        StartDate: "2020-01-01T00:00:00",
        EndDate: "2020-01-29T00:00:00",
        AllowedDates: [],
        AllowedDays: []
      }
    ],
    IsAllotment: true,
    AllowedDays: null,
    SharingRoomPrice: 1000000.0,
    LowestPrice: 1000000.0,
    Description: "Variable Date 004",
    IsPublished: true,
    IsFeatured: false,
    ReferredByTransaction: false,
    Commissions: [
      {
        Description: "Agent",
        Value: 100000.0,
        Category: "Agent_Commission"
      },
      {
        Description: "Staff",
        Value: 100000.0,
        Category: "Staff_Commission"
      }
    ],
    TourOperator: {
      Id: 5,
      Name: "goIndonesia.tours",
      ImageUrl:
        "https://touressapiqa.azurewebsites.net//Content/imgSrc/TourOperatorProfile/964f90ec-ad40-4d5a-803e-f12f3cfa34c4swiss.jpg.jpg"
    },
    Images: [],
    Id: "423",
    Title: "Variable Date 004",
    PackageType: "FixedDateVariable",
    TotalGuest: 0,
    MinimumGuest: 0,
    MaximumGuest: 0,
    Destination: "BALI",
    City: {
      UTC: null,
      ImageUrl:
        "https://touressapiqa.azurewebsites.net//Content/imgSrc/City/0ed74a00-3093-4c16-987e-e64b856f1454travel-3239795_1920.jpg.jpg",
      Id: "KUTA",
      Name: "Kuta"
    },
    Country: {
      ImageUrl:
        "http://cloud.basajans.com:8868/tripplannerdev/upload/beautiful-beach.jpg",
      Id: "ID",
      Name: "Indonesia"
    },
    Company: null,
    AccommodationDesc: null,
    AccommodationName: null,
    Accommodation: 0,
    CurrencyId: "IDR",
    CreatedDate: "0001-01-01T00:00:00",
    StartDate: "2019-09-11T07:00:00",
    EndDate: "2019-09-15T19:00:00",
    ActiveDate: null,
    Status: null,
    TourTotalPrice: 0.0,
    TotalPayed: 0.0,
    TourCategory: {
      Id: 66,
      Name: "Business",
      ImageName: null,
      ImageUrl: null,
      TinyImageUrl: null
    },
    TourPaxType: {
      Id: 3,
      Name: "Family",
      ImageName: null,
      ImageUrl: null,
      TinyImageUrl: null
    },
    GroupType: "0",
    TourOperatorProfileId: null,
    TourNote: null,
    IsSplitStaffCommission: null,
    ExternalBookingId: null,
    ExpiredOn: "2020-09-30T00:00:00",
    RegistrationDeadline: null,
    FixedPackage: null,
    VariableDatePackage: {
      BookingCommission: {
        TotalPriceForCustomer: 0.0,
        AgentCommission: {
          TotalPax: 0,
          UnitPrice: 0.0,
          TotalPrice: 0.0
        },
        StaffCommission: {
          TotalPax: 0,
          UnitPrice: 0.0,
          TotalPrice: 0.0
        },
        ApplicableCommission: []
      },
      RegisteringGuest: 1,
      MinimumGuest: 1,
      MaximumGuest: 100,
      ConfirmedGuest: 1,
      PaxLeft: 0,
      ReferenceId: null,
      MinPax: 1,
      PaymentTerms: [
        {
          Id: 1757,
          PaymentPercentage: 100.0,
          DueDate: "2019-08-18T00:00:00",
          PayDate: null,
          PaymentValue: 0.0,
          PaymentValueEndCustomer: 0.0,
          CurrencyId: null,
          Description: "LNS",
          IsPayed: false,
          PaidValue: 0.0,
          IsLockGuest: false,
          Sequence: 0,
          IntervalDays: 0,
          IsAfterBookingBased: false
        }
      ],
      Suppements: []
    },
    PaymentTerms: null,
    BookingTemplateRef: 0,
    IsRead: false,
    CreatedBy: null,
    ResponsibleUser: null,
    TourOperatorProfile: null,
    FoC: null,
    ReferenceId: "",
    AdditionalServices: []
  },
  {
    SharingRoomPrice: 800000.0,
    LowestPrice: 800000.0,
    Description: "Kuy ngabisin uang di Bali",
    IsPublished: true,
    IsFeatured: false,
    ReferredByTransaction: true,
    Commissions: [
      {
        Description: "Agent",
        Value: 100000.0,
        Category: "Agent_Commission"
      },
      {
        Description: "Staff",
        Value: 100000.0,
        Category: "Staff_Commission"
      }
    ],
    TourOperator: {
      Id: 5,
      Name: "goIndonesia.tours",
      ImageUrl:
        "https://touressapiqa.azurewebsites.net//Content/imgSrc/TourOperatorProfile/964f90ec-ad40-4d5a-803e-f12f3cfa34c4swiss.jpg.jpg"
    },
    Images: [
      {
        ImageId: 809,
        ImageUrl:
          "https://touressapiqa.azurewebsites.net//Content/imgSrc/BookingTemplateImages/bc77666c-15cc-46b5-8be5-adb8af4c2274385_17051613500053013484.jpg.jpg",
        TinyImageUrl: null,
        ImageName: "385_17051613500053013484.jpg",
        IsPrimaryImage: false
      }
    ],
    Id: "687",
    Title: "Habiskan uang di Bali",
    PackageType: "Fixed",
    TotalGuest: 0,
    MinimumGuest: 0,
    MaximumGuest: 0,
    Destination: "BALI",
    City: {
      UTC: null,
      ImageUrl:
        "https://touressapiqa.azurewebsites.net//Content/imgSrc/City/0ed74a00-3093-4c16-987e-e64b856f1454travel-3239795_1920.jpg.jpg",
      Id: "KUTA",
      Name: "Kuta"
    },
    Country: {
      ImageUrl:
        "http://cloud.basajans.com:8868/tripplannerdev/upload/beautiful-beach.jpg",
      Id: "ID",
      Name: "Indonesia"
    },
    Company: null,
    AccommodationDesc: null,
    AccommodationName: null,
    Accommodation: 0,
    CurrencyId: "IDR",
    CreatedDate: "0001-01-01T00:00:00",
    StartDate: "2020-03-06T09:00:00",
    EndDate: "2020-03-09T12:00:00",
    ActiveDate: null,
    Status: null,
    TourTotalPrice: 0.0,
    TotalPayed: 0.0,
    TourCategory: {
      Id: 70,
      Name: "Leisure",
      ImageName: null,
      ImageUrl: null,
      TinyImageUrl: null
    },
    TourPaxType: {
      Id: 3,
      Name: "Family",
      ImageName: null,
      ImageUrl: null,
      TinyImageUrl: null
    },
    GroupType: "0",
    TourOperatorProfileId: null,
    TourNote: null,
    IsSplitStaffCommission: null,
    ExternalBookingId: null,
    ExpiredOn: "2020-03-06T00:00:00",
    RegistrationDeadline: null,
    FixedPackage: {
      BookingCommission: {
        TotalPriceForCustomer: 0.0,
        AgentCommission: {
          TotalPax: 0,
          UnitPrice: 0.0,
          TotalPrice: 0.0
        },
        StaffCommission: {
          TotalPax: 0,
          UnitPrice: 0.0,
          TotalPrice: 0.0
        },
        ApplicableCommission: []
      },
      RegisteringGuest: 9,
      MinimumGuest: 59,
      MaximumGuest: 59,
      ConfirmedGuest: 9,
      PaxLeft: 50,
      ReferenceId: null,
      MinPax: 1,
      PaymentTerms: [
        {
          Id: 2137,
          PaymentPercentage: 50.0,
          DueDate: "2020-02-25T00:00:00",
          PayDate: null,
          PaymentValue: 0.0,
          PaymentValueEndCustomer: 0.0,
          CurrencyId: null,
          Description: "Down Payment",
          IsPayed: false,
          PaidValue: 0.0,
          IsLockGuest: false,
          Sequence: 0,
          IntervalDays: 0,
          IsAfterBookingBased: false
        },
        {
          Id: 2138,
          PaymentPercentage: 30.0,
          DueDate: "2020-02-27T00:00:00",
          PayDate: null,
          PaymentValue: 0.0,
          PaymentValueEndCustomer: 0.0,
          CurrencyId: null,
          Description: "Second Payment",
          IsPayed: false,
          PaidValue: 0.0,
          IsLockGuest: false,
          Sequence: 0,
          IntervalDays: 0,
          IsAfterBookingBased: false
        },
        {
          Id: 2139,
          PaymentPercentage: 20.0,
          DueDate: "2020-02-29T00:00:00",
          PayDate: null,
          PaymentValue: 0.0,
          PaymentValueEndCustomer: 0.0,
          CurrencyId: null,
          Description: "Last Payment",
          IsPayed: false,
          PaidValue: 0.0,
          IsLockGuest: false,
          Sequence: 0,
          IntervalDays: 0,
          IsAfterBookingBased: false
        }
      ],
      Suppements: []
    },
    VariableDatePackage: null,
    PaymentTerms: null,
    BookingTemplateRef: 0,
    IsRead: false,
    CreatedBy: null,
    ResponsibleUser: null,
    TourOperatorProfile: null,
    FoC: null,
    ReferenceId: "",
    PeriodeDates: null,
    IsAllotment: null,
    AdditionalServices: []
  },
  {
    SharingRoomPrice: 13900000.0,
    LowestPrice: 13900000.0,
    Description: "Amazing Dubai Abudhabi 11-15MAR",
    IsPublished: true,
    IsFeatured: false,
    ReferredByTransaction: true,
    Commissions: [
      {
        Description: "Agent",
        Value: 600000.0,
        Category: "Agent_Commission"
      },
      {
        Description: "Staff",
        Value: 400000.0,
        Category: "Staff_Commission"
      }
    ],
    TourOperator: {
      Id: 5,
      Name: "goIndonesia.tours",
      ImageUrl:
        "https://touressapiqa.azurewebsites.net//Content/imgSrc/TourOperatorProfile/964f90ec-ad40-4d5a-803e-f12f3cfa34c4swiss.jpg.jpg"
    },
    Images: [
      {
        ImageId: 798,
        ImageUrl:
          "https://touressapiqa.azurewebsites.net//Content/imgSrc/BookingTemplateImages/7d94e53d-10dd-4afe-a176-73b6652c56ceTantan.png.jpg",
        TinyImageUrl: null,
        ImageName: "Tantan.png",
        IsPrimaryImage: false
      },
      {
        ImageId: 799,
        ImageUrl:
          "https://touressapiqa.azurewebsites.net//Content/imgSrc/BookingTemplateImages/67101f61-a4de-4b20-bb84-79a5a787f2a0Amazing_Dubai_Miracle_Garden_27FEB-03MAR.jpg.jpg",
        TinyImageUrl: null,
        ImageName: "Amazing Dubai Miracle Garden 27FEB-03MAR.jpg",
        IsPrimaryImage: false
      }
    ],
    Id: "681",
    Title: "Amazing Dubai Abudhabi 11-15MAR",
    PackageType: "Fixed",
    TotalGuest: 0,
    MinimumGuest: 0,
    MaximumGuest: 0,
    Destination: "DUBAI",
    City: {
      UTC: null,
      ImageUrl:
        "https://touressapi.azurewebsites.net/Content/ImgSrc/Accommodations/dubai%20image.jpeg",
      Id: "DUBAI",
      Name: "Dubai"
    },
    Country: {
      ImageUrl:
        "https://touressapi.azurewebsites.net/Content/ImgSrc/Accommodations/dubai%20image.jpeg",
      Id: "AE",
      Name: "United Arab Emirates"
    },
    Company: null,
    AccommodationDesc: null,
    AccommodationName: null,
    Accommodation: 0,
    CurrencyId: "IDR",
    CreatedDate: "0001-01-01T00:00:00",
    StartDate: "2020-03-11T10:00:00",
    EndDate: "2020-03-14T12:00:00",
    ActiveDate: null,
    Status: null,
    TourTotalPrice: 0.0,
    TotalPayed: 0.0,
    TourCategory: {
      Id: 70,
      Name: "Leisure",
      ImageName: null,
      ImageUrl: null,
      TinyImageUrl: null
    },
    TourPaxType: {
      Id: 3,
      Name: "Family",
      ImageName: null,
      ImageUrl: null,
      TinyImageUrl: null
    },
    GroupType: "0",
    TourOperatorProfileId: null,
    TourNote: null,
    IsSplitStaffCommission: null,
    ExternalBookingId: null,
    ExpiredOn: "2020-03-10T00:00:00",
    RegistrationDeadline: null,
    FixedPackage: {
      BookingCommission: {
        TotalPriceForCustomer: 0.0,
        AgentCommission: {
          TotalPax: 0,
          UnitPrice: 0.0,
          TotalPrice: 0.0
        },
        StaffCommission: {
          TotalPax: 0,
          UnitPrice: 0.0,
          TotalPrice: 0.0
        },
        ApplicableCommission: []
      },
      RegisteringGuest: 20,
      MinimumGuest: 100,
      MaximumGuest: 100,
      ConfirmedGuest: 20,
      PaxLeft: 80,
      ReferenceId: null,
      MinPax: 1,
      PaymentTerms: [
        {
          Id: 2105,
          PaymentPercentage: 50.0,
          DueDate: "2020-02-26T00:00:00",
          PayDate: null,
          PaymentValue: 0.0,
          PaymentValueEndCustomer: 0.0,
          CurrencyId: null,
          Description: "Down Payment",
          IsPayed: false,
          PaidValue: 0.0,
          IsLockGuest: false,
          Sequence: 0,
          IntervalDays: 0,
          IsAfterBookingBased: false
        },
        {
          Id: 2106,
          PaymentPercentage: 30.0,
          DueDate: "2020-03-01T00:00:00",
          PayDate: null,
          PaymentValue: 0.0,
          PaymentValueEndCustomer: 0.0,
          CurrencyId: null,
          Description: "Second Payment",
          IsPayed: false,
          PaidValue: 0.0,
          IsLockGuest: false,
          Sequence: 0,
          IntervalDays: 0,
          IsAfterBookingBased: false
        },
        {
          Id: 2107,
          PaymentPercentage: 20.0,
          DueDate: "2020-03-09T00:00:00",
          PayDate: null,
          PaymentValue: 0.0,
          PaymentValueEndCustomer: 0.0,
          CurrencyId: null,
          Description: "Final Payment",
          IsPayed: false,
          PaidValue: 0.0,
          IsLockGuest: false,
          Sequence: 0,
          IntervalDays: 0,
          IsAfterBookingBased: false
        }
      ],
      Suppements: []
    },
    VariableDatePackage: null,
    PaymentTerms: null,
    BookingTemplateRef: 0,
    IsRead: false,
    CreatedBy: null,
    ResponsibleUser: null,
    TourOperatorProfile: null,
    FoC: null,
    ReferenceId: "",
    PeriodeDates: null,
    IsAllotment: null,
    AdditionalServices: []
  }
];
