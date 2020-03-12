import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Picker,
  Alert,
  BackHandler,
  Platform,
  StatusBar,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import RadioGroup from "react-native-custom-radio-group";
import { LinearGradient } from "expo-linear-gradient";
import { CardWithInputDuration, Card } from "../../../components/card";
import { Container } from "../../../components/container/index";
import { NormalButton } from "../../../components/button/index";
import {
  RoundedTextInput,
  RoundedTextInputWithButton
} from "../../../components/textInput";
import { TextWarning } from "../../../components/text";

import IOSPicker from "react-native-ios-picker";
import styles from "./styles";
import stylesGlobal from "../../../components/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { initialSetCustomPackage } from "../../../helper/itineraryBuilder";
import { Seperator } from "../../../components/list";
import { Loading } from "../../../components/loading";
import Icon from "react-native-vector-icons/MaterialIcons";
// import {
//   set_custom_itenerary,
//   set_summary_program,
//   reset_custom_itenerary,
//   set_guest_qoutation,
//   set_departures_itenerary,
//   set_returns_itenerary,
// } from '../../actions/customAction';
// import { set_guest_tour_guide } from '../../../actions/tourGuideAction';
import {
  getTourTypeAction,
  getTourCategoryAction
} from "../../../actions/General/generalAction";
import {
  setCustomItineraryAction,
  resetCustomItineraryAction,
  setSummaryProgramAction,
  setGuestQuotationAction,
  setDeparturesItineraryAction,
  setReturnsItineraryAction,
  setGuestTourGuideAction
} from "../../../actions/Transactions/TransactionAction";
class customPackagesOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DetailCustom: {
        IdTour: null,
        TourName: "",
        GroupCapacity: null,
        TourCategory: null,
        TourType: null,
        Departures: [],
        Returns: [],
        GuestAllocation: { Adult: 0, Child: 0, Infant: 0 },
        RoomAllocation: {
          SharingRoomQty: 0,
          ChildSharingRoomQty: 0,
          SingleRoomQty: 0,
          ChildSingleRoomQty: 0,
          ExtraBedQty: 0,
          ChildExtraBedQty: 0,
          SharingBedQty: 0,
          BabyCrib: 0,
          NoBed: 0,
          StringAlloc: "",
          Qty: 0,
          Description: "Free of Charge (FOC)"
        },
        Company: null,
        Status: "custom"
      },
      LabelTourType: null,
      LabelTourCategory: null,
      errorTourName: "",
      errorGroupCapacity: "",
      errorTourCategory: "",
      errorTourType: "",
      errorFirstArrival: "",
      errorGuestAllocation: "",
      errorRoomAllocation: "",
      loading: false
    };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
    this.getAction();
    this.props.resetCustomItineraryAction();
  }

  getAction = () => {
    this.props.getTourCategoryAction();
    this.props.getTourTypeAction();
  };

  validate = () => {
    const {
      TourName,
      GroupCapacity,
      TourCategory,
      TourType,
      GuestAllocation,
      RoomAllocation
    } = this.state.DetailCustom;
    let isError = false;
    const errors = {
      errorTourName: "",
      errorGroupCapacity: "",
      errorTourCategory: "",
      errorTourType: "",
      errorFirstArrival: "",
      errorGuestAllocation: "",
      errorRoomAllocation: ""
    };

    const totalGuest =
      GuestAllocation.Adult + GuestAllocation.Child + GuestAllocation.Infant;
    const totalRoom =
      RoomAllocation.SharingRoomQty +
      RoomAllocation.ChildSharingRoomQty +
      RoomAllocation.SingleRoomQty +
      RoomAllocation.ChildSingleRoomQty +
      RoomAllocation.ExtraBedQty +
      RoomAllocation.ChildExtraBedQty +
      RoomAllocation.SharingBedQty +
      RoomAllocation.BabyCrib +
      RoomAllocation.NoBed;

    if (TourName == null || TourName.length < 1) {
      isError = true;
      errors.errorTourName = "Please input tour name";
    }
    if (GroupCapacity == null || GroupCapacity.length < 1) {
      isError = true;
      errors.errorGroupCapacity = "Please select group capacity";
    } else if (GroupCapacity == "LARGE" && totalGuest <= 9) {
      isError = true;
      errors.errorGuestAllocation =
        "Total person (adult and child) more than 9 persons";
    } else if (GroupCapacity == "SMALL" && totalGuest > 9) {
      isError = true;
      errors.errorGuestAllocation =
        "This type guest only max 9 person, please change type if you want";
    }

    if (TourCategory == null || TourCategory.length < 1) {
      isError = true;
      errors.errorTourCategory = "Please select tour category";
    }
    if (TourType == null || TourType.length < 1) {
      isError = true;
      errors.errorTourType = "Please select tour type";
    }
    if (totalGuest == 0) {
      isError = true;
      errors.errorGuestAllocation = "Please input at least 1 adult";
    } else if (GuestAllocation.Adult == 0) {
      isError = true;
      errors.errorGuestAllocation = "Please input at least 1 adult";
    }
    if (totalRoom == 0) {
      isError = true;
      errors.errorRoomAllocation =
        "Pax arrangement are empty, fill at least one adult guest";
    } else if (totalRoom != totalGuest) {
      isError = true;
      errors.errorRoomAllocation = "Room allocation not same with total guest";
    }

    this.setState({
      ...this.state,
      ...errors
    });
    return isError;
  };

  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    paxTypeTour: PropTypes.array,
    typeTour: PropTypes.array,
    summaryProgram: PropTypes.array,
    token: PropTypes.string,
    airport: PropTypes.array
  };

  onSelectCountry = data => {
    let newDepartures = [];
    newDepartures.push(data);

    this.setState({
      DetailCustom: {
        ...this.state.DetailCustom,
        Departures: newDepartures
      }
    });
  };

  addRoomAllocation = data => {
    this.setState({
      DetailCustom: {
        ...this.state.DetailCustom,
        RoomAllocation: data
      }
    });
  };
  handleRoomAllocation = () => {
    const { GuestAllocation } = this.state.DetailCustom;
    const totalGuest =
      GuestAllocation.Adult + GuestAllocation.Child + GuestAllocation.Infant;
    if (totalGuest != 0) {
      this.props.navigation.navigate("roomAllocation", {
        onSelect: this.addRoomAllocation,
        Guest: this.state.DetailCustom.GuestAllocation,
        RoomAlloc: this.state.DetailCustom.RoomAllocation,
        Travel: this.state.DetailCustom.GroupCapacity
      });
    } else {
      Alert.alert(
        "Please Fill Guest Allocation",
        "Guest Allocation minimum 1 pax for adult",
        [{ text: "OK" }]
      );
    }
  };

  tapped = () => {
    Alert.alert("Please fill Guest Allocation, minimum 1 pax", [
      { text: "OK" }
    ]);
  };

  handleCountry = () => {
    this.props.navigation.navigate("ListCity", {
      onSelect: this.onSelectCountry
    });
  };

  handleAccomodation = async () => {
    const error = this.validate();
    if (!error) {
      this.setState({ loading: true });
      this.props.setCustomItineraryAction(this.state.DetailCustom);
      //for get airport
      const headline = {
        Departures: null,
        MainPrograms: null,
        Returns: null
      };
      const data = initialSetCustomPackage(
        headline,
        this.state.DetailCustom.RoomAllocation
      );
      this.props.setDeparturesItineraryAction(data.headlineProgram.Departures);
      this.props.setSummaryProgramAction(data.headlineProgram.MainPrograms);
      this.props.setReturnsItineraryAction(data.headlineProgram.Returns);
      this.props.setGuestTourGuideAction(
        this.state.DetailCustom.GuestAllocation.Adult +
          this.state.DetailCustom.GuestAllocation.Child
      );

      //   this.props.dispatch(
      //     set_departures_itenerary(data.headlineProgram.Departures)
      //   );
      //   this.props.dispatch(
      //     set_summary_program(data.headlineProgram.MainPrograms)
      //   );
      //   this.props.dispatch(set_returns_itenerary(data.headlineProgram.Returns));

      //   this.props.dispatch(
      //     set_guest_tour_guide(
      //       this.state.DetailCustom.GuestAllocation.Adult +
      //         this.state.DetailCustom.GuestAllocation.Child
      //     )
      //   );
      this.setState({ loading: false });
      this.props.setGuestQuotationAction([]);
      //   this.props.dispatch(set_guest_qoutation([]));
      this.props.navigation.navigate("AccommodationSummary");
    }
  };

  render() {
    let groupCapacity = [
      {
        label: "Small ( under 9 pax )",
        value: "SMALL"
      },
      {
        label: "Large ( more than 9 pax )",
        value: "LARGE"
      }
    ];
    const { loading } = this.props;
    return (
      <SafeAreaView style={stylesGlobal.styleSafeAreaWhite}>
        <Container paddingbottomcontainer={30}>
          {loading ? (
            <Loading sizeloading="large" colorloading={styles.$goldcolor} />
          ) : null}
          <StatusBar
            translucent={true}
            barStyle="dark-content"
            backgroundColor="white"
          />
          <ScrollView style={stylesGlobal.containerScrollCustomOption}>
            <Container>
              <Card widthCard="100%" type="Flat">
                <View style={stylesGlobal.padding20}>
                  <Text
                    style={[
                      stylesGlobal.text16,
                      stylesGlobal.textBold,
                      stylesGlobal.marginBottom20
                    ]}
                  >
                    General Information
                  </Text>
                  <RoundedTextInput
                    marginBottom={20}
                    label="Tour Name"
                    textColor="black"
                    containerWidth="100%"
                    containerHeight={45}
                    animated="hidden"
                    placeholder="Enter Tour Name"
                    positionError="bottom"
                    value={this.state.DetailCustom.TourName}
                    onChangeText={text =>
                      this.setState({
                        DetailCustom: {
                          ...this.state.DetailCustom,
                          TourName: text
                        }
                      })
                    }
                    error={this.state.errorTourName}
                  />
                  <View
                    style={[stylesGlobal.width100, stylesGlobal.marginBottom10]}
                  >
                    <Text
                      style={[
                        stylesGlobal.colorBlackLight,
                        stylesGlobal.rowStart,
                        styles.marginBottom10
                      ]}
                    >
                      Group Capacity
                    </Text>
                    <RadioGroup
                      onChange={itemValue => {
                        this.setState({
                          DetailCustom: {
                            ...this.state.DetailCustom,
                            GroupCapacity: itemValue
                          }
                        });
                      }}
                      radioGroupList={groupCapacity}
                      containerStyle={styles.stylesContainerRadioGrup}
                      buttonContainerStyle={styles.stylesButtonRadioGrup}
                      buttonTextStyle={[
                        styles.colorTextRadioButton,
                        stylesGlobal.text14
                      ]}
                      buttonContainerActiveStyle={{
                        backgroundColor: styles.$goldcolor
                      }}
                      buttonTextActiveStyle={[
                        stylesGlobal.text14,
                        { color: "#252525" }
                      ]}
                    />
                    <TextWarning
                      show={true}
                      textwarning={this.state.errorGroupCapacity}
                      alignSelfText="flex-start"
                    />
                  </View>

                  <View style={stylesGlobal.paddingBottom20}>
                    <View
                      style={[
                        styles.cardWarningGT,
                        // stylesGlobal.paddingLeft20,
                        // stylesGlobal.paddingRight20,
                        stylesGlobal.paddingTop5
                      ]}
                    >
                      <View
                        style={[
                          stylesGlobal.rowNoPadding,
                          stylesGlobal.width100,
                          stylesGlobal.center
                        ]}
                      >
                        <View
                          style={[stylesGlobal.width10, stylesGlobal.center]}
                        >
                          <Icon
                            size={18}
                            color={styles.$goldcolor}
                            name="info"
                          />
                        </View>
                        <View style={stylesGlobal.width90}>
                          <Text style={stylesGlobal.text12}>
                            We have flight ticket if you choose the large group
                            capacity
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <Text
                    style={[
                      stylesGlobal.colorBlackLight,
                      styles.marginBottom10
                    ]}
                  >
                    Tour Category
                  </Text>
                  <View style={[stylesGlobal.row100, styles.containerDropDown]}>
                    {Platform.OS === "ios" ? (
                      <IOSPicker
                        mode="modal"
                        textStyle={styles.textPicker}
                        style={styles.dropdownIos}
                        selectedValue={
                          this.state.DetailCustom.TourCategory ? (
                            this.state.LabelTourCategory == 0 ? (
                              <Text
                                style={[
                                  stylesGlobal.text14,
                                  styles.colorgreylight2
                                ]}
                              >
                                Choose Category
                              </Text>
                            ) : (
                              this.props.paxTypeTour[
                                this.state.LabelTourCategory - 1
                              ].Name
                            )
                          ) : (
                            <Text
                              style={[
                                stylesGlobal.text14,
                                styles.colorgreylight2
                              ]}
                            >
                              Choose Category
                            </Text>
                          )
                        }
                        onValueChange={(itemValue, itemIndex) => {
                          this.setState({
                            DetailCustom: {
                              ...this.state.DetailCustom,
                              TourCategory: itemValue
                            },
                            LabelTourCategory: itemIndex
                          });
                        }}
                      >
                        <Picker.Item
                          label="Tour Category"
                          value=""
                          color={styles.$greylight2color}
                          style={stylesGlobal.text14}
                        />
                        {this.props.paxTypeTour.map((employee, i) => {
                          return (
                            <Picker.Item
                              label={employee.Name}
                              value={employee.Id}
                              key={i}
                            />
                          );
                        })}
                      </IOSPicker>
                    ) : (
                      <Picker
                        mode="dialog"
                        textStyle={styles.textPicker}
                        style={styles.containerDropDownAndroid}
                        selectedValue={
                          this.state.DetailCustom.TourCategory ? (
                            this.state.DetailCustom.TourCategory
                          ) : (
                            <Text
                              style={[
                                styles.colorgreylight2,
                                stylesGlobal.text14
                              ]}
                            >
                              Choose Category
                            </Text>
                          )
                        }
                        onValueChange={itemValue => {
                          this.setState({
                            DetailCustom: {
                              ...this.state.DetailCustom,
                              TourCategory: itemValue
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
                        {this.props.paxTypeTour
                          ? this.props.paxTypeTour.map((employee, i) => {
                              return (
                                <Picker.Item
                                  label={employee.Name}
                                  value={employee.Id}
                                  key={i}
                                />
                              );
                            })
                          : null}
                      </Picker>
                    )}
                  </View>

                  <View
                    style={[styles.colNoPaddingLeft, styles.marginBottom20]}
                  >
                    <TextWarning
                      show={true}
                      textwarning={this.state.errorTourCategory}
                      alignSelfText="flex-start"
                    />
                  </View>
                  <Text style={styles.textTourType}>Tour Type</Text>
                  <View style={[stylesGlobal.row100, styles.containerDropDown]}>
                    {Platform.OS === "ios" ? (
                      <IOSPicker
                        mode="modal"
                        textStyle={styles.textPicker}
                        style={styles.dropdownIos}
                        selectedValue={
                          this.state.DetailCustom.TourType ? (
                            this.state.LabelTourType == 0 ? (
                              <Text
                                style={[
                                  stylesGlobal.text14,
                                  styles.colorgreylight2
                                ]}
                              >
                                Choose Type
                              </Text>
                            ) : (
                              this.props.typeTour[this.state.LabelTourType - 1]
                                .Name
                            )
                          ) : (
                            <Text
                              style={[
                                stylesGlobal.text14,
                                styles.colorgreylight2
                              ]}
                            >
                              Choose Type
                            </Text>
                          )
                        }
                        onValueChange={(itemValue, itemIndex) => {
                          this.setState({
                            DetailCustom: {
                              ...this.state.DetailCustom,
                              TourType: itemValue
                            },
                            LabelTourType: itemIndex
                          });
                        }}
                      >
                        <Picker.Item
                          label="Tour Type"
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
                      </IOSPicker>
                    ) : (
                      <Picker
                        mode="dialog"
                        textStyle={styles.textPicker}
                        style={styles.containerDropDownAndroid}
                        selectedValue={
                          this.state.DetailCustom.TourType ? (
                            this.state.DetailCustom.TourType
                          ) : (
                            <Text
                              style={[
                                styles.colorgreylight2,
                                stylesGlobal.text14
                              ]}
                            >
                              Choose Type
                            </Text>
                          )
                        }
                        onValueChange={itemValue => {
                          this.setState({
                            DetailCustom: {
                              ...this.state.DetailCustom,
                              TourType: itemValue
                            }
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
                                />
                              );
                            })
                          : null}
                      </Picker>
                    )}
                  </View>
                  <View
                    style={[styles.colNoPaddingLeft, styles.marginBottom20]}
                  >
                    <TextWarning
                      show={true}
                      textwarning={this.state.errorTourType}
                      alignSelfText="flex-start"
                    />
                  </View>
                  <View
                    style={[
                      stylesGlobal.row100,
                      styles.paddingVertical10,
                      styles.marginBottom20,
                      stylesGlobal.center
                    ]}
                  >
                    <Seperator
                      colorSepar={styles.$lightGreycolor}
                      widthsepar="40%"
                      heightSepar={1}
                    />
                  </View>
                  <Text
                    style={[
                      stylesGlobal.marginTop10,
                      stylesGlobal.text16,
                      stylesGlobal.textBold,
                      stylesGlobal.marginBottom20
                    ]}
                  >
                    Pax Ammount and Room Allocation
                  </Text>

                  <View style={[styles.marginBottom20, stylesGlobal.center]}>
                    <CardWithInputDuration
                      Title="Adult (>12 years)"
                      sizeIcon={18}
                      textSize={15}
                      value={this.state.DetailCustom.GuestAllocation.Adult}
                      onChangeText={text => {
                        if (isNaN(parseInt(text))) text = 0;
                        this.setState({
                          DetailCustom: {
                            ...this.state.DetailCustom,
                            GuestAllocation: {
                              ...this.state.DetailCustom.GuestAllocation,
                              Adult: parseInt(text)
                            }
                          }
                        });
                      }}
                      Decrement={() => {
                        if (this.state.DetailCustom.GuestAllocation.Adult != 0)
                          this.setState({
                            DetailCustom: {
                              ...this.state.DetailCustom,
                              GuestAllocation: {
                                ...this.state.DetailCustom.GuestAllocation,
                                Adult:
                                  this.state.DetailCustom.GuestAllocation
                                    .Adult - 1
                              }
                            }
                          });
                      }}
                      Increment={() =>
                        this.setState({
                          DetailCustom: {
                            ...this.state.DetailCustom,
                            GuestAllocation: {
                              ...this.state.DetailCustom.GuestAllocation,
                              Adult:
                                this.state.DetailCustom.GuestAllocation.Adult +
                                1
                            }
                          }
                        })
                      }
                      widthCard="100%"
                      heightCard="30%"
                      error={this.state.errorGuestAllocation}
                    />
                    <CardWithInputDuration
                      Title="Child (2-12 years)"
                      sizeIcon={18}
                      textSize={15}
                      value={this.state.DetailCustom.GuestAllocation.Child}
                      onChangeText={text => {
                        if (isNaN(parseInt(text))) text = 0;
                        this.setState({
                          DetailCustom: {
                            ...this.state.DetailCustom,
                            GuestAllocation: {
                              ...this.state.DetailCustom.GuestAllocation,
                              Child: parseInt(text)
                            }
                          }
                        });
                      }}
                      Decrement={() => {
                        if (this.state.DetailCustom.GuestAllocation.Child != 0)
                          this.setState({
                            DetailCustom: {
                              ...this.state.DetailCustom,
                              GuestAllocation: {
                                ...this.state.DetailCustom.GuestAllocation,
                                Child:
                                  this.state.DetailCustom.GuestAllocation
                                    .Child - 1
                              }
                            }
                          });
                      }}
                      Increment={() =>
                        this.setState({
                          DetailCustom: {
                            ...this.state.DetailCustom,
                            GuestAllocation: {
                              ...this.state.DetailCustom.GuestAllocation,
                              Child:
                                this.state.DetailCustom.GuestAllocation.Child +
                                1
                            }
                          }
                        })
                      }
                      widthCard="100%"
                      heightCard="30%"
                    />
                    <CardWithInputDuration
                      Title="Infant (< 2 years)"
                      sizeIcon={18}
                      textSize={15}
                      value={this.state.DetailCustom.GuestAllocation.Infant}
                      onChangeText={text => {
                        if (isNaN(parseInt(text))) text = 0;
                        this.setState({
                          DetailCustom: {
                            ...this.state.DetailCustom,
                            GuestAllocation: {
                              ...this.state.DetailCustom.GuestAllocation,
                              Infant: parseInt(text)
                            }
                          }
                        });
                      }}
                      Decrement={() => {
                        if (this.state.DetailCustom.GuestAllocation.Infant != 0)
                          this.setState({
                            DetailCustom: {
                              ...this.state.DetailCustom,
                              GuestAllocation: {
                                ...this.state.DetailCustom.GuestAllocation,
                                Infant:
                                  this.state.DetailCustom.GuestAllocation
                                    .Infant - 1
                              }
                            }
                          });
                      }}
                      Increment={() =>
                        this.setState({
                          DetailCustom: {
                            ...this.state.DetailCustom,
                            GuestAllocation: {
                              ...this.state.DetailCustom.GuestAllocation,
                              Infant:
                                this.state.DetailCustom.GuestAllocation.Infant +
                                1
                            }
                          }
                        })
                      }
                      widthCard="100%"
                      heightCard="30%"
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.marginBottom20}
                    onPress={this.handleRoomAllocation}
                  >
                    <RoundedTextInputWithButton
                      label="Room Allocation"
                      textColor="black"
                      containerWidth="100%"
                      placeholder="Choose Room Allocation"
                      containerHeight={50}
                      animated="hidden"
                      value={this.state.DetailCustom.RoomAllocation.StringAlloc.slice(
                        0,
                        35
                      )}
                      disable={true}
                      error={this.state.errorRoomAllocation}
                      buttonPosition="right"
                      onPress={this.handleRoomAllocation}
                    />
                  </TouchableOpacity>
                </View>
              </Card>
            </Container>
          </ScrollView>
          <TouchableOpacity
            style={[styles.footer, styles.bottom0]}
            onPress={this.handleAccomodation}
          >
            <LinearGradient
              colors={[styles.$goldcolor, styles.$goldlightcolor]}
              style={[styles.footer, styles.bottom0]}
              start={[0, 0]}
              end={[1, 0]}
            >
              <NormalButton
                textSize={17}
                text="NEXT"
                buttonWidth="100%"
                textColor="#252525"
                buttonColor="transparent"
                onPress={this.handleAccomodation}
              />
            </LinearGradient>
          </TouchableOpacity>
        </Container>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  typeTour: state.generalReducer.tourTypeList
    ? state.generalReducer.tourTypeList
    : [],
  paxTypeTour: state.generalReducer.tourCategoryList
    ? state.generalReducer.tourCategoryList
    : [],
  loading: state.transactionReducer.loading || state.generalReducer.loading
  //   summaryProgram: state.cusPackagesReducer.SummaryProgram,
  //   token: state.userAuthReducer.token,
  //   airport: state.itemItineraryReducer.airport
});

export default connect(mapStateToProps, {
  getTourCategoryAction,
  getTourTypeAction,
  setCustomItineraryAction,
  resetCustomItineraryAction,
  setSummaryProgramAction,
  setGuestQuotationAction,
  setDeparturesItineraryAction,
  setReturnsItineraryAction,
  setGuestTourGuideAction
})(customPackagesOption);
