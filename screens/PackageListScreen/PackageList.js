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
import {
  getReadyPackageFixedPriceListAction,
  getReadyPackageListAction,
  getSeriesPackageListAction,
  resetTransactionAction,
  setPackageIdAction,
  setPackageStatusFromHomeToListAction
} from "../../actions/Transactions/TransactionAction";
import { convertRoundPrice } from "../../helper/helper";
import { Container } from "../../components/container";
import { Loading } from "../../components/loading";
import { ClearButtonWithIcon, NormalButton } from "../../components/button";
import { Seperator } from "../../components/list";
import IconClose from "../../assets/Icon/close.png";
import styles from "./styles";
import stylesGlobal from "../../components/styles";
// import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

class PackageList extends PureComponent {
  constructor(props) {
    super(props);
    // const { navigation } = this.props;
    // const type = navigation.getParam("type", null);
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
      // loading: false,
      listData: [],
      modalVisible: false,
      modalVisibleSort: false,
      FixPackagesFilter: null,
      isFocused: false,
      // status: this.props.navigation.state.params.type,
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
    // this.setState({ loading: true });
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
    this.props.setPackageIdAction(Id);
    this.props.setPackageStatusFromHomeToListAction(type);
    // this.setState({ loading: false });
  };

  handlePressCustom = () => {
    this.props.navigation.navigate("customPackagesOption");
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
    const { packageStatus } = this.props;
    if (packageStatus == "Series") {
      this.props.getSeriesPackageListAction();
    } else {
      this.props.getReadyPackageFixedPriceListAction();
      this.props.getReadyPackageListAction();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.packageStatus !== this.props.packageStatus) {
      this.setState({
        listData: []
      });
    }
    if (this.props.packageListStatus) {
      const { listData } = this.state;
      let isReady = this.props.packageStatus === "Ready";
      this.setState({
        listData: !isReady
          ? this.props.packageList
          : listData.concat(this.props.packageList)
        // loading: false
      });
      this.props.resetTransactionAction();
    } else if (this.props.packageListStatus !== null) {
      this.setState({
        // listData: this.props.packageList,
        // loading: false
      });
    }
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
    const { loading } = this.props;
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
        {loading ? (
          <Loading
            sizeloading="large"
            colorloading={styles.$goldcolor}
            positionLoad="relative"
          />
        ) : null}
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
                          {/* {this.props.typeTour.map((employee, i) => {
                            return (
                              <Picker.Item
                                label={employee.Name}
                                value={employee.Id}
                                key={i}
                              />
                            );
                          })} */}
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
  packageList: state.transactionReducer.packageList,
  packageListStatus: state.transactionReducer.packageListStatus,
  loading: state.transactionReducer.loading,
  packageStatus: state.transactionReducer.packageStatusFromHomeToList
});

export default connect(mapStateToProps, {
  getReadyPackageFixedPriceListAction,
  getReadyPackageListAction,
  getSeriesPackageListAction,
  resetTransactionAction,
  setPackageIdAction,
  setPackageStatusFromHomeToListAction
})(PackageList);
