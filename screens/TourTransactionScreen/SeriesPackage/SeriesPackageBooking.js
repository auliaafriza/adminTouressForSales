import React, { Component } from "react";
import {
  Text,
  View,
  Picker,
  ScrollView,
  BackHandler,
  Platform,
  Image
} from "react-native";
import IOSPicker from "react-native-ios-picker";
import { CardWithInputDuration, Card } from "../../../components/card";
import styles from "../styles";
import stylesGlobal from "../../../components/styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Container } from "../../../components/container";
import { ShimmerButton, ClearButton } from "../../../components/button";
import { TextWarning } from "../../../components/text";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { SeperatorRepeat } from "../../../components/list";
import { Guest } from "../../../helper/dailyProgram";
import { convertRoundPrice } from "../../../helper/helper";
import { viewDate } from "../../../helper/timeHelper";
import { Ionicons } from "@expo/vector-icons";
import IconCalendar from "../../../assets/Icon/calendar.png";

class SeriesPackageBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Booking: {
        GuestAllocation: {
          Adult: 0,
          Child: 0,
          Infant: 0
        },
        RoomAllocation: {
          SharingRoomQty: 0,
          SingleRoomQty: 0,
          ExtraBedQty: 0,
          ChildExtraBedQty: 0,
          SharingBedQty: 0,
          NoBed: 0
        },
        IsSplitStaffCommission: null,
        IsPrintInvoice: null,
        TourNote: null,
        Guests: [],
        Supplements: []
      },
      dataDetailPackages: null,
      errorGuestAllocation: "",
      errorRoomAllocation: "",
      errorStafCommission: "",
      errorPrintInvoice: ""
    };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
    this.setState({
      //   dataDetailPackages: this.props.data
      dataDetailPackages: dummyData
    });
    const sortAdditional = this.props.supplement
      ? this.props.supplement.sort(x => (x.IsMandatory == true ? -1 : 1))
      : [];
    const Suppements = [...sortAdditional];
    const newSuppements = Suppements
      ? Suppements.map(obj => {
          return {
            Name: obj.Name,
            Description: obj.Description,
            BookingTemplateId: obj.BookingTemplateId,
            BookingTemplateSupplementId: obj.BookingTemplateSupplementId,
            CurrencyId: obj.CurrencyId,
            IsMandatory: obj.IsMandatory,
            IsInfantCount: obj.IsInfantCount,
            Value: obj.UnitCost,
            Qty: 0
          };
        })
      : [];
    this.setState({
      Booking: {
        ...this.state.Booking,
        Supplements: newSuppements
      }
    });
  }

  validate = () => {
    const {
      GuestAllocation,
      RoomAllocation,
      IsSplitStaffCommission,
      IsPrintInvoice,
      Supplements
    } = this.state.Booking;
    let isError = false;
    const errors = {
      errorGuestAllocation: "",
      errorRoomAllocation: "",
      errorStafCommission: "",
      errorPrintInvoice: ""
    };
    const MinPax = this.props.navigation.state.params.MinPax;

    const totalGuest =
      GuestAllocation.Adult + GuestAllocation.Child + GuestAllocation.Infant;
    const totalRoom =
      RoomAllocation.SharingRoomQty +
      RoomAllocation.SingleRoomQty +
      RoomAllocation.ExtraBedQty +
      RoomAllocation.ChildExtraBedQty +
      RoomAllocation.SharingBedQty +
      RoomAllocation.NoBed;

    if (totalGuest == 0) {
      isError = true;
      errors.errorGuestAllocation = "Please input guest ammount";
    } else if (this.props.navigation.state.params.KoutaPax != 0) {
      if (totalGuest > this.props.navigation.state.params.KoutaPax) {
        isError = true;
        errors.errorGuestAllocation = "Guest cannot more than available pax";
      }
    }
    if (GuestAllocation.Adult == 0) {
      isError = true;
      errors.errorGuestAllocation = "Please input at least 1 adult";
    }

    if (MinPax > totalGuest) {
      isError = true;
      errors.errorGuestAllocation = "Please input guest minimum " + MinPax;
    }

    if (totalRoom == 0) {
      isError = true;
      errors.errorRoomAllocation = "Please input room option";
    } else if (totalRoom != totalGuest) {
      isError = true;
      errors.errorRoomAllocation = "Room option not same with total guest";
    }
    if (this.state.dataDetailPackages.Commissions != null) {
      if (this.state.dataDetailPackages.Commissions.length != 0) {
        if (IsSplitStaffCommission == null) {
          isError = true;
          errors.errorStafCommission = "Please selected split staff commission";
        }

        if (IsPrintInvoice == null && IsSplitStaffCommission == false) {
          isError = true;
          errors.errorPrintInvoice = "Please selected print invoice";
        }
      }
    }
    {
      Supplements.map((data, i) => {
        if (data.IsMandatory == true) {
          if (data.IsInfantCount == true)
            this.setGuestForMandatorywithInfant(i);
          else this.setGuestForMandatory(i);
        }
      });
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
    data: PropTypes.object,
    supplement: PropTypes.array
  };

  handlePressguest = () => {
    let Guests = [];
    const { Adult, Child, Infant } = this.state.Booking.GuestAllocation;
    for (let i = 0; i < Adult; i++) Guests.push(new Guest("ADULT"));
    for (let i = 0; i < Child; i++) Guests.push(new Guest("CHILD"));
    for (let i = 0; i < Infant; i++) Guests.push(new Guest("INFANT"));
    const error = this.validate();
    if (!error) {
      this.setState(
        {
          Booking: {
            ...this.state.Booking,
            Guests: Guests
          }
        },
        () => {
          this.props.navigation.navigate("GuestList", {
            Booking: this.state.Booking,
            Status: this.props.navigation.state.params.Status
          });
        }
      );
    }
  };

  setGuestForMandatorywithInfant = index => {
    const GuestAdditionalVisa =
      this.state.Booking.GuestAllocation.Adult +
      this.state.Booking.GuestAllocation.Child +
      this.state.Booking.GuestAllocation.Infant;
    let Supplements = [...this.state.Booking.Supplements];
    Supplements[index].Qty = GuestAdditionalVisa;
    this.setState({
      Booking: {
        ...this.state.Booking,
        Supplements: Supplements
      }
    });
  };

  setGuestForMandatory = index => {
    const GuestAdditionalVisa =
      this.state.Booking.GuestAllocation.Adult +
      this.state.Booking.GuestAllocation.Child;
    let Supplements = [...this.state.Booking.Supplements];
    Supplements[index].Qty = GuestAdditionalVisa;
    this.setState({
      Booking: {
        ...this.state.Booking,
        Supplements: Supplements
      }
    });
  };

  handleOnChangeSupp = (index, value) => {
    if (this.state.Booking.Supplements[index].IsMandatory == false) {
      let Supplements = [...this.state.Booking.Supplements];
      Supplements[index].Qty = value;
      this.setState({
        Booking: {
          ...this.state.Booking,
          Supplements: Supplements
        }
      });
    } else {
      let Supplements = [...this.state.Booking.Supplements];
      Supplements[index].Qty =
        this.state.Booking.GuestAllocation.Adult +
        this.state.Booking.GuestAllocation.Child;
      this.setState({
        Booking: {
          ...this.state.Booking,
          Supplements: Supplements
        }
      });
    }
  };

  handleChange = (Sub1, Sub2, value) => {
    this.setState({
      Booking: {
        ...this.state.Booking,
        [Sub1]: {
          ...this.state.Booking[Sub1],
          [Sub2]: parseInt(value)
        }
      }
    });
  };

  handleSeeAll = () => {
    this.props.navigation.pop();
  };

  handleReadMore = () => {
    this.props.navigation.navigate("ImportantInformation", {
      Desc: this.props.navigation.state.params.Desc
    });
  };

  render() {
    const GuestForAddMandatory =
      this.state.Booking.GuestAllocation.Adult +
      this.state.Booking.GuestAllocation.Child;
    // const price = this.props.data.Prices ? this.props.data.Prices : "";
    const price = dummyData.Prices ? dummyData.Prices : "";
    const PriceAdd =
      this.state.Booking.Supplements.length != 0
        ? this.state.Booking.Supplements.map(i =>
            i.IsMandatory
              ? i.IsInfantCount
                ? (GuestForAddMandatory +
                    this.state.Booking.GuestAllocation.Infant) *
                  i.Value
                : GuestForAddMandatory * i.Value
              : i.Qty * i.Value
          )
        : "";
    const TotalAdd =
      PriceAdd.length != 0
        ? PriceAdd.reduce(function(val, val2) {
            return val + val2;
          })
        : null;
    // const MinPax = this.props.navigation.state.params.MinPax;
    const MinPax = 1;

    return (
      <Container>
        <ScrollView style={stylesGlobal.containerScroll}>
          <Container paddingbottomcontainer={70} paddingtopcontainer={20}>
            <View
              style={[
                stylesGlobal.row100,
                styles.paddingHorizontal20,
                stylesGlobal.paddingBottom10
              ]}
            >
              <View style={stylesGlobal.width50}>
                <Text style={[stylesGlobal.text20, stylesGlobal.textBold]}>
                  {this.state.dataDetailPackages
                    ? this.state.dataDetailPackages.BookingDetailSum.Title
                    : ""}
                </Text>
              </View>
              <View style={[stylesGlobal.width50, stylesGlobal.rowEnd]}>
                <ClearButton
                  textColor={styles.$goldcolor}
                  text="Detail"
                  textSize={16}
                  onPress={this.handleSeeAll}
                />
              </View>
            </View>
            <View
              style={[
                stylesGlobal.row100,
                styles.paddingHorizontal20,
                stylesGlobal.alignItemsCenter,
                stylesGlobal.paddingBottom10
              ]}
            >
              <View
                style={[stylesGlobal.containerIcon30, stylesGlobal.padding5]}
              >
                <Image
                  source={IconCalendar}
                  style={[stylesGlobal.imageIcon, stylesGlobal.tintColorGrey]}
                  resizeMode="contain"
                />
              </View>
              <Text>
                {" "}
                {this.state.dataDetailPackages
                  ? viewDate(
                      this.state.dataDetailPackages.BookingDetailSum.StartDate
                    )
                  : ""}
                {" -"}{" "}
                {this.state.dataDetailPackages
                  ? viewDate(
                      this.state.dataDetailPackages.BookingDetailSum.EndDate
                    )
                  : ""}
              </Text>
            </View>
            <View style={styles.paddingHorizontal20}>
              {MinPax == 0 ? null : (
                <View style={stylesGlobal.rowStart}>
                  <View
                    style={[
                      styles.cardWarningMinPax,
                      styles.paddingHorizontal10,
                      styles.rowCenter
                    ]}
                  >
                    <Ionicons
                      name="ios-information-circle"
                      size={20}
                      color={styles.$redcolor}
                    />
                    <Text> This packages has minimum : {MinPax} Guests</Text>
                  </View>
                </View>
              )}
            </View>
            <View style={stylesGlobal.center}>
              <Card widthCard="90%">
                <Text
                  style={[
                    stylesGlobal.paddingTop20,
                    stylesGlobal.paddingHorizontal20,
                    stylesGlobal.text20,
                    stylesGlobal.textBold
                  ]}
                >
                  Guest Detail
                </Text>
                {this.state.errorGuestAllocation ? (
                  <View style={[stylesGlobal.paddingHorizontal20]}>
                    <TextWarning
                      textwarning={this.state.errorGuestAllocation}
                      alignSelfText="flex-start"
                      show={true}
                    />
                  </View>
                ) : null}

                <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
                  <SeperatorRepeat
                    repeat={31}
                    widthsepar={8}
                    heightSepar={1}
                    colorSepar="#777"
                  />
                </View>
                <View style={stylesGlobal.paddingHorizontal20}>
                  <View style={styles.marginBottom5}>
                    <CardWithInputDuration
                      Title="Adult (>12 years)"
                      sizeIcon={18}
                      textSize={15}
                      value={this.state.Booking.GuestAllocation.Adult}
                      onChangeText={text => {
                        if (isNaN(parseInt(text))) text = 0;
                        this.handleChange("GuestAllocation", "Adult", text);
                      }}
                      Decrement={() => {
                        if (this.state.Booking.GuestAllocation.Adult != 0)
                          this.handleChange(
                            "GuestAllocation",
                            "Adult",
                            this.state.Booking.GuestAllocation.Adult - 1
                          );
                      }}
                      Increment={() =>
                        this.handleChange(
                          "GuestAllocation",
                          "Adult",
                          this.state.Booking.GuestAllocation.Adult + 1
                        )
                      }
                      widthCard="100%"
                      heightCard="30%"
                    />
                  </View>
                  <View style={styles.marginBottom5}>
                    <CardWithInputDuration
                      Title="Child (2-12 years)"
                      sizeIcon={18}
                      textSize={15}
                      value={this.state.Booking.GuestAllocation.Child}
                      onChangeText={text => {
                        if (isNaN(parseInt(text))) text = 0;
                        this.handleChange("GuestAllocation", "Child", text);
                      }}
                      Decrement={() => {
                        if (this.state.Booking.GuestAllocation.Child != 0)
                          this.handleChange(
                            "GuestAllocation",
                            "Child",
                            this.state.Booking.GuestAllocation.Child - 1
                          );
                      }}
                      Increment={() =>
                        this.handleChange(
                          "GuestAllocation",
                          "Child",
                          this.state.Booking.GuestAllocation.Child + 1
                        )
                      }
                      widthCard="100%"
                      heightCard="30%"
                    />
                  </View>
                  <View style={styles.marginBottom5}>
                    <CardWithInputDuration
                      Title="Infant (< 2 years)"
                      sizeIcon={18}
                      textSize={15}
                      value={this.state.Booking.GuestAllocation.Infant}
                      onChangeText={text => {
                        if (isNaN(parseInt(text))) text = 0;
                        this.handleChange("GuestAllocation", "Infant", text);
                      }}
                      Decrement={() => {
                        if (this.state.Booking.GuestAllocation.Infant != 0)
                          this.handleChange(
                            "GuestAllocation",
                            "Infant",
                            this.state.Booking.GuestAllocation.Infant - 1
                          );
                      }}
                      Increment={() =>
                        this.handleChange(
                          "GuestAllocation",
                          "Infant",
                          this.state.Booking.GuestAllocation.Infant + 1
                        )
                      }
                      widthCard="100%"
                      heightCard="30%"
                    />
                  </View>
                </View>
              </Card>
            </View>
            <View style={stylesGlobal.center}>
              <Card widthCard="90%">
                <Text
                  style={[
                    stylesGlobal.paddingTop20,
                    stylesGlobal.paddingHorizontal20,
                    stylesGlobal.text18,
                    stylesGlobal.textBold
                  ]}
                >
                  Room Option
                </Text>
                {this.state.errorRoomAllocation ? (
                  <View style={stylesGlobal.paddingHorizontal20}>
                    <TextWarning
                      textwarning={this.state.errorRoomAllocation}
                      alignSelfText="flex-start"
                      show={true}
                    />
                  </View>
                ) : null}

                <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
                  <SeperatorRepeat
                    repeat={31}
                    widthsepar={8}
                    heightSepar={1}
                    colorSepar="#777"
                  />
                </View>
                <View style={stylesGlobal.paddingHorizontal20}>
                  {price.SharingRoomPrice == 0 ? null : (
                    <View style={styles.marginBottom5}>
                      <CardWithInputDuration
                        Title="Sharing Room"
                        sizeIcon={18}
                        textSize={15}
                        value={this.state.Booking.RoomAllocation.SharingRoomQty}
                        onChangeText={text => {
                          if (isNaN(parseInt(text))) text = 0;
                          this.handleChange(
                            "RoomAllocation",
                            "SharingRoomQty",
                            text
                          );
                        }}
                        Decrement={() => {
                          if (
                            this.state.Booking.RoomAllocation.SharingRoomQty !=
                            0
                          )
                            this.handleChange(
                              "RoomAllocation",
                              "SharingRoomQty",
                              this.state.Booking.RoomAllocation.SharingRoomQty -
                                1
                            );
                        }}
                        Increment={() =>
                          this.handleChange(
                            "RoomAllocation",
                            "SharingRoomQty",
                            this.state.Booking.RoomAllocation.SharingRoomQty + 1
                          )
                        }
                        widthCard="100%"
                        heightCard="30%"
                        subtext={
                          price.CurrencyId +
                          " " +
                          convertRoundPrice(
                            price.SharingRoomPrice,
                            price.CurrencyId
                          ) +
                          " /Pax"
                        }
                      />
                    </View>
                  )}

                  {price.SingleRoomPrice == 0 ? null : (
                    <View style={styles.marginBottom5}>
                      <CardWithInputDuration
                        Title="Single Room"
                        sizeIcon={18}
                        textSize={15}
                        value={this.state.Booking.RoomAllocation.SingleRoomQty}
                        onChangeText={text => {
                          if (isNaN(parseInt(text))) text = 0;
                          this.handleChange(
                            "RoomAllocation",
                            "SingleRoomQty",
                            text
                          );
                        }}
                        Decrement={() => {
                          if (
                            this.state.Booking.RoomAllocation.SingleRoomQty != 0
                          )
                            this.handleChange(
                              "RoomAllocation",
                              "SingleRoomQty",
                              this.state.Booking.RoomAllocation.SingleRoomQty -
                                1
                            );
                        }}
                        Increment={() =>
                          this.handleChange(
                            "RoomAllocation",
                            "SingleRoomQty",
                            this.state.Booking.RoomAllocation.SingleRoomQty + 1
                          )
                        }
                        widthCard="100%"
                        heightCard="30%"
                        subtext={
                          price.CurrencyId +
                          " " +
                          convertRoundPrice(
                            price.SingleRoomPrice,
                            price.CurrencyId
                          ) +
                          " /Pax"
                        }
                      />
                    </View>
                  )}

                  {price.SharingBedPrice == 0 ? null : (
                    <View style={styles.marginBottom5}>
                      <CardWithInputDuration
                        Title="Child Sharing Bed With Parents"
                        sizeIcon={18}
                        textSize={15}
                        value={this.state.Booking.RoomAllocation.SharingBedQty}
                        onChangeText={text => {
                          if (isNaN(parseInt(text))) text = 0;
                          this.handleChange(
                            "RoomAllocation",
                            "SharingBedQty",
                            text
                          );
                        }}
                        Decrement={() => {
                          if (
                            this.state.Booking.RoomAllocation.SharingBedQty != 0
                          )
                            this.handleChange(
                              "RoomAllocation",
                              "SharingBedQty",
                              this.state.Booking.RoomAllocation.SharingBedQty -
                                1
                            );
                        }}
                        Increment={() =>
                          this.handleChange(
                            "RoomAllocation",
                            "SharingBedQty",
                            this.state.Booking.RoomAllocation.SharingBedQty + 1
                          )
                        }
                        widthCard="100%"
                        heightCard="30%"
                        subtext={
                          price.CurrencyId +
                          " " +
                          convertRoundPrice(
                            price.SharingBedPrice,
                            price.CurrencyId
                          ) +
                          " /Pax"
                        }
                      />
                    </View>
                  )}

                  {price.AdultExtraBedPrice == 0 ? null : (
                    <View style={styles.marginBottom5}>
                      <CardWithInputDuration
                        Title="Extra Bed"
                        sizeIcon={18}
                        textSize={15}
                        value={this.state.Booking.RoomAllocation.ExtraBedQty}
                        onChangeText={text => {
                          if (isNaN(parseInt(text))) text = 0;
                          this.handleChange(
                            "RoomAllocation",
                            "ExtraBedQty",
                            text
                          );
                        }}
                        Decrement={() => {
                          if (
                            this.state.Booking.RoomAllocation.ExtraBedQty != 0
                          )
                            this.handleChange(
                              "RoomAllocation",
                              "ExtraBedQty",
                              this.state.Booking.RoomAllocation.ExtraBedQty - 1
                            );
                        }}
                        Increment={() =>
                          this.handleChange(
                            "RoomAllocation",
                            "ExtraBedQty",
                            this.state.Booking.RoomAllocation.ExtraBedQty + 1
                          )
                        }
                        widthCard="100%"
                        heightCard="30%"
                        subtext={
                          price.CurrencyId +
                          " " +
                          convertRoundPrice(
                            price.AdultExtraBedPrice,
                            price.CurrencyId
                          ) +
                          " /Pax"
                        }
                      />
                    </View>
                  )}

                  {price.ChildExtraBedPrice == 0 ? null : (
                    <View style={styles.marginBottom5}>
                      <CardWithInputDuration
                        Title="Child Extra Bed"
                        sizeIcon={18}
                        textSize={15}
                        value={
                          this.state.Booking.RoomAllocation.ChildExtraBedQty
                        }
                        onChangeText={text => {
                          if (isNaN(parseInt(text))) text = 0;
                          this.handleChange(
                            "RoomAllocation",
                            "ChildExtraBedQty",
                            text
                          );
                        }}
                        Decrement={() => {
                          if (
                            this.state.Booking.RoomAllocation
                              .ChildExtraBedQty != 0
                          )
                            this.handleChange(
                              "RoomAllocation",
                              "ChildExtraBedQty",
                              this.state.Booking.RoomAllocation
                                .ChildExtraBedQty - 1
                            );
                        }}
                        Increment={() =>
                          this.handleChange(
                            "RoomAllocation",
                            "ChildExtraBedQty",
                            this.state.Booking.RoomAllocation.ChildExtraBedQty +
                              1
                          )
                        }
                        widthCard="100%"
                        heightCard="30%"
                        subtext={
                          price.CurrencyId +
                          " " +
                          convertRoundPrice(
                            price.ChildExtraBedPrice,
                            price.CurrencyId
                          ) +
                          " /Pax"
                        }
                      />
                    </View>
                  )}

                  {price.NoBedPrice == 0 ? null : (
                    <View style={styles.marginBottom5}>
                      <CardWithInputDuration
                        Title="Baby Crib"
                        sizeIcon={18}
                        textSize={15}
                        value={this.state.Booking.RoomAllocation.NoBed}
                        onChangeText={text => {
                          if (isNaN(parseInt(text))) text = 0;
                          this.handleChange("RoomAllocation", "NoBed", text);
                        }}
                        Decrement={() => {
                          if (this.state.Booking.RoomAllocation.NoBed != 0)
                            this.handleChange(
                              "RoomAllocation",
                              "NoBed",
                              this.state.Booking.RoomAllocation.NoBed - 1
                            );
                        }}
                        Increment={() =>
                          this.handleChange(
                            "RoomAllocation",
                            "NoBed",
                            this.state.Booking.RoomAllocation.NoBed + 1
                          )
                        }
                        widthCard="100%"
                        heightCard="30%"
                        subtext={
                          price.CurrencyId +
                          " " +
                          convertRoundPrice(
                            price.NoBedPrice,
                            price.CurrencyId
                          ) +
                          " /Pax"
                        }
                      />
                    </View>
                  )}
                </View>
              </Card>
            </View>
            <View style={stylesGlobal.center}>
              {this.state.Booking.Supplements.length > 0 ? (
                <Card widthCard="90%">
                  <Text
                    style={[
                      stylesGlobal.paddingTop20,
                      stylesGlobal.paddingHorizontal20,
                      stylesGlobal.text18,
                      stylesGlobal.textBold
                    ]}
                  >
                    Additional Items
                  </Text>

                  <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
                    <SeperatorRepeat
                      repeat={31}
                      widthsepar={8}
                      heightSepar={1}
                      colorSepar="#777"
                    />
                  </View>
                  <View style={stylesGlobal.paddingHorizontal20}>
                    {this.state.Booking.Supplements.map((Add, i) => {
                      return (
                        <View style={styles.marginBottom5} key={i}>
                          <CardWithInputDuration
                            Title={Add.Name}
                            sizeIcon={18}
                            textSize={15}
                            value={
                              Add.IsMandatory
                                ? Add.IsInfantCount
                                  ? this.state.Booking.GuestAllocation.Adult +
                                    this.state.Booking.GuestAllocation.Child +
                                    this.state.Booking.GuestAllocation.Infant
                                  : this.state.Booking.GuestAllocation.Adult +
                                    this.state.Booking.GuestAllocation.Child
                                : this.state.Booking.Supplements[i].Qty
                            }
                            onChangeText={text => {
                              if (isNaN(parseInt(text))) text = 0;
                              this.handleOnChangeSupp(i, parseInt(text));
                            }}
                            Decrement={() => {
                              if (this.state.Booking.Supplements[i].Qty != 0)
                                this.handleOnChangeSupp(
                                  i,
                                  this.state.Booking.Supplements[i].Qty - 1
                                );
                            }}
                            Increment={() =>
                              this.handleOnChangeSupp(
                                i,
                                this.state.Booking.Supplements[i].Qty + 1
                              )
                            }
                            widthCard="99%"
                            heightCard="30%"
                            subtext={
                              Add.CurrencyId +
                              " " +
                              convertRoundPrice(Add.Value, Add.CurrencyId) +
                              " /Pax"
                            }
                            disable={Add.IsMandatory}
                          />
                        </View>
                      );
                    })}
                  </View>
                </Card>
              ) : null}
            </View>

            <View style={[stylesGlobal.center, styles.padding]}>
              {this.state.dataDetailPackages ? (
                this.state.dataDetailPackages.Commissions ? (
                  this.state.dataDetailPackages.Commissions.length != 0 ? (
                    <Card widthCard="90%">
                      <Text
                        style={[
                          stylesGlobal.paddingTop20,
                          stylesGlobal.paddingHorizontal20,
                          stylesGlobal.text18,
                          stylesGlobal.textBold
                        ]}
                      >
                        Tour Commission
                      </Text>
                      {this.state.errorStafCommission ||
                      this.state.errorPrintInvoice ? (
                        <View style={[stylesGlobal.paddingHorizontal20]}>
                          <TextWarning
                            textwarning={
                              this.state.errorStafCommission ||
                              this.state.errorPrintInvoice
                            }
                            alignSelfText="flex-start"
                            show={true}
                          />
                        </View>
                      ) : null}

                      <View
                        style={[stylesGlobal.width100, stylesGlobal.hidden]}
                      >
                        <SeperatorRepeat
                          repeat={31}
                          widthsepar={8}
                          heightSepar={1}
                          colorSepar="#777"
                        />
                      </View>
                      <View
                        style={[
                          stylesGlobal.width100,
                          styles.marginBottom10,
                          stylesGlobal.paddingHorizontal20,
                          stylesGlobal.paddingBottom20
                        ]}
                      >
                        <Text style={[styles.text14Wrap, styles.bold12]}>
                          Do you want to split the staff commission ?
                        </Text>

                        <View
                          style={[
                            stylesGlobal.row100,
                            styles.containerDropDown,
                            stylesGlobal.marginBottom20
                          ]}
                        >
                          {Platform.OS === "ios" ? (
                            <IOSPicker
                              mode="modal"
                              textStyle={styles.textPicker}
                              style={styles.dropdownIos}
                              selectedValue={
                                this.state.Booking.IsSplitStaffCommission ==
                                true ? (
                                  "Yes"
                                ) : this.state.Booking.IsSplitStaffCommission ==
                                  false ? (
                                  "No"
                                ) : (
                                  <Text
                                    style={[
                                      stylesGlobal.text14,
                                      styles.colorgreylight2
                                    ]}
                                  >
                                    Choose Commission Options
                                  </Text>
                                )
                              }
                              onValueChange={itemValue => {
                                this.setState({
                                  Booking: {
                                    ...this.state.Booking,
                                    IsSplitStaffCommission: itemValue
                                  }
                                });
                              }}
                            >
                              <Picker.Item
                                label="Commission"
                                value={null}
                                color={styles.$greylight2color}
                                style={stylesGlobal.text14}
                              />
                              <Picker.Item label="Yes" value={true} />
                              <Picker.Item label="No" value={false} />
                            </IOSPicker>
                          ) : (
                            <Picker
                              mode="dialog"
                              textStyle={styles.textPicker}
                              style={styles.containerDropDownAndroid}
                              selectedValue={
                                this.state.Booking.IsSplitStaffCommission
                              }
                              onValueChange={itemValue => {
                                this.setState({
                                  Booking: {
                                    ...this.state.Booking,
                                    IsSplitStaffCommission: itemValue
                                  }
                                });
                              }}
                            >
                              <Picker.Item
                                label="Commission"
                                value={null}
                                color={styles.$greylight2color}
                                style={stylesGlobal.text14}
                              />
                              <Picker.Item label="Yes" value={true} />
                              <Picker.Item label="No" value={false} />
                            </Picker>
                          )}
                        </View>
                        {this.state.Booking.IsSplitStaffCommission == false ? (
                          <View>
                            <Text style={[styles.text14Wrap, styles.bold12]}>
                              Do you want to print Commission as Agent and Staff
                              ?
                            </Text>
                            <TextWarning
                              textwarning={this.state.errorPrintInvoice}
                              show={true}
                            />

                            <View
                              style={[
                                stylesGlobal.row100,
                                styles.containerDropDown
                              ]}
                            >
                              {Platform.OS === "ios" ? (
                                <IOSPicker
                                  mode="modal"
                                  textStyle={styles.textPicker}
                                  style={styles.dropdownIos}
                                  selectedValue={
                                    this.state.Booking.IsPrintInvoice ==
                                    true ? (
                                      "Yes"
                                    ) : this.state.Booking.IsPrintInvoice ==
                                      false ? (
                                      "No"
                                    ) : (
                                      <Text
                                        style={[
                                          stylesGlobal.text14,
                                          styles.colorgreylight2
                                        ]}
                                      >
                                        Choose Commission Options
                                      </Text>
                                    )
                                  }
                                  onValueChange={itemValue => {
                                    this.setState({
                                      Booking: {
                                        ...this.state.Booking,
                                        IsPrintInvoice: itemValue
                                      }
                                    });
                                  }}
                                >
                                  <Picker.Item
                                    label="Choose Commission Options"
                                    value={null}
                                    color={styles.$greylight2color}
                                    style={stylesGlobal.text14}
                                  />
                                  <Picker.Item label="Yes" value={true} />
                                  <Picker.Item label="No" value={false} />
                                </IOSPicker>
                              ) : (
                                <Picker
                                  mode="dialog"
                                  textStyle={stylesGlobal.textPicker}
                                  style={styles.containerDropDownAndroid}
                                  selectedValue={
                                    this.state.Booking.IsPrintInvoice
                                  }
                                  onValueChange={itemValue => {
                                    this.setState({
                                      Booking: {
                                        ...this.state.Booking,
                                        IsPrintInvoice: itemValue
                                      }
                                    });
                                  }}
                                >
                                  <Picker.Item
                                    label="Choose Commission Options"
                                    value={null}
                                    color={styles.$greylight2color}
                                    style={stylesGlobal.text14}
                                  />
                                  <Picker.Item label="Yes" value={true} />
                                  <Picker.Item label="No" value={false} />
                                </Picker>
                              )}
                            </View>
                          </View>
                        ) : null}

                        <View style={styles.cardCommission}>
                          {this.state.Booking.IsSplitStaffCommission != null ? (
                            <View
                              style={[
                                stylesGlobal.row100,
                                stylesGlobal.padding10,
                                styles.backgroundWaring
                              ]}
                            >
                              <Icon
                                name="info"
                                size={15}
                                color={styles.$goldcolor}
                              />
                              <Text style={styles.bold12}>
                                Commission will print in invoice as
                              </Text>
                            </View>
                          ) : null}

                          {this.state.Booking.IsSplitStaffCommission ===
                          true ? (
                            <View
                              style={[
                                stylesGlobal.row100,
                                stylesGlobal.padding10
                              ]}
                            >
                              <View style={styles.col50}>
                                <Text style={styles.text12}>
                                  Agent Commission{" "}
                                </Text>
                              </View>
                              <View
                                style={[
                                  styles.col50,
                                  stylesGlobal.alignItemsEnd
                                ]}
                              >
                                <Text style={styles.text12}>
                                  {price.CurrencyId}{" "}
                                  {convertRoundPrice(
                                    this.props.data.Commissions[0].Value,
                                    price.CurrencyId
                                  )}
                                </Text>
                              </View>
                            </View>
                          ) : this.state.Booking.IsPrintInvoice === true ? (
                            <View>
                              <View
                                style={[
                                  stylesGlobal.row100,
                                  stylesGlobal.padding10
                                ]}
                              >
                                <View style={styles.col50}>
                                  <Text style={styles.text12}>
                                    Agent Commission{" "}
                                  </Text>
                                </View>
                                <View
                                  style={[
                                    styles.col50,
                                    stylesGlobal.alignItemsEnd
                                  ]}
                                >
                                  <Text style={styles.text12}>
                                    {price.CurrencyId}{" "}
                                    {convertRoundPrice(
                                      this.props.data.Commissions[0].Value,
                                      price.CurrencyId
                                    )}
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={[
                                  stylesGlobal.row100,
                                  stylesGlobal.padding10
                                ]}
                              >
                                <View style={styles.col50}>
                                  <Text style={styles.text12}>
                                    Staff Commission{" "}
                                  </Text>
                                </View>
                                <View style={styles.col50}>
                                  <Text style={styles.text12}>
                                    {price.CurrencyId}{" "}
                                    {convertRoundPrice(
                                      this.props.data.Commissions[1].Value,
                                      price.CurrencyId
                                    )}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          ) : this.state.Booking.IsPrintInvoice === false ? (
                            <View
                              style={[
                                stylesGlobal.row100,
                                stylesGlobal.padding10
                              ]}
                            >
                              <View style={styles.col50}>
                                <Text style={styles.text12}>
                                  Total Commission{" "}
                                </Text>
                              </View>
                              <View
                                style={[
                                  styles.col50,
                                  stylesGlobal.alignItemsEnd
                                ]}
                              >
                                <Text style={styles.text12}>
                                  {price.CurrencyId}{" "}
                                  {convertRoundPrice(
                                    this.props.data.Commissions[0].Value +
                                      this.props.data.Commissions[1].Value,
                                    price.CurrencyId
                                  )}
                                </Text>
                              </View>
                            </View>
                          ) : null}
                        </View>
                      </View>
                    </Card>
                  ) : null
                ) : null
              ) : null}
            </View>
          </Container>
        </ScrollView>
        <View style={[styles.footer, styles.topRadius]}>
          <View style={stylesGlobal.row100}>
            <View style={[stylesGlobal.width60, stylesGlobal.padding20]}>
              <Text style={[stylesGlobal.textWhite, stylesGlobal.text10]}>
                Total Price{" "}
              </Text>
              <View style={stylesGlobal.width100}>
                <Text style={styles.right}>
                  <Text
                    style={[
                      stylesGlobal.text20,
                      stylesGlobal.textSemiBold,
                      stylesGlobal.textWhite
                    ]}
                  >
                    {price.CurrencyId}{" "}
                    {(
                      this.state.Booking.RoomAllocation.SharingBedQty *
                        price.SharingBedPrice +
                      this.state.Booking.RoomAllocation.SharingRoomQty *
                        price.SharingRoomPrice +
                      this.state.Booking.RoomAllocation.NoBed *
                        price.NoBedPrice +
                      this.state.Booking.RoomAllocation.SingleRoomQty *
                        price.SingleRoomPrice +
                      this.state.Booking.RoomAllocation.ExtraBedQty *
                        price.AdultExtraBedPrice +
                      this.state.Booking.RoomAllocation.ChildExtraBedQty *
                        price.ChildExtraBedPrice +
                      TotalAdd
                    )
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                      .toLocaleString(price.CurrencyId)}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={stylesGlobal.width40}>
              <ShimmerButton
                text="BOOK"
                textSize={17}
                buttonWidth="100%"
                buttonHeight="100%"
                buttonColor={styles.$goldcolor}
                textColor="black"
                onPress={this.handlePressguest}
              />
            </View>
          </View>
        </View>
      </Container>
    );
  }
}

// const mapStateToProps = state => ({
//   data: state.fixPackagesReducer.fixedPackageById,
//   supplement: state.fixPackagesReducer.supplement,
// });

// export default connect(mapStateToProps)(bookingOption);
export default SeriesPackageBooking;

const dummyData = {
  MinPax: 1,
  Accommodations: [
    {
      AccommodationItem: null,
      Id: 19,
      Name: "Royal Palace Kusadasi",
      Desc:
        "Only 1.3 km from the sandy beach- Royal Palace Kusadasi Hotel offers air-conditioned rooms with free Wi-Fi. The property includes a large outdoor pool- fitness centre- sauna and a Turkish bath. The bright rooms of Royal Palace Kusadasi Hotel are decorated with modern furniture. They are equipped with a TV and a refrigerator. All rooms have a balcony with views of the Aegean Sea or the hotel's garden. Breakfast- lunch and dinner are served as an open buffet with a variety of delicious dishes. Drinks are provided by the Manzara Bar and the pool bar. Kusadasi city centre is only 700 metres from the hotel with numerous bars and nightclubs. The beautiful yacht marina is 1 km away. Izmir Adnan Menderes Airport is 70 km from the property.",
      Address:
        "Bayraklidede Mahallesi- Turgut Ozal Blv. No:64- 09400 Kusadasi/Aydin- Turkey",
      Priority: false,
      Telephone: "+90 256 618 33 70",
      Email: "info[at]royalpalace.com.tr",
      Currency: null,
      ImageUrl:
        "https://touressapi.azurewebsites.net/Content/imgSrc/Accommodations/royal-palace.jpg",
      OverView:
        "Only 1.3 km from the sandy beach- Royal Palace Kusadasi Hotel offers air-conditioned rooms with free Wi-Fi. The property includes a large outdoor pool- fitness centre- sauna and a Turkish bath. The bright rooms of Royal Palace Kusadasi Hotel are decorated with modern furniture. They are equipped with a TV and a refrigerator. All rooms have a balcony with views of the Aegean Sea or the hotel's garden. Breakfast- lunch and dinner are served as an open buffet with a variety of delicious dishes. Drinks are provided by the Manzara Bar and the pool bar. Kusadasi city centre is only 700 metres from the hotel with numerous bars and nightclubs. The beautiful yacht marina is 1 km away. Izmir Adnan Menderes Airport is 70 km from the property.",
      IsPromo: false,
      NeedApprovalThreshold: 0,
      DefaultReleaseDays: 0,
      City: {
        Id: "KUSADASI",
        Name: "Kusadasi",
        ImageUrl: ""
      },
      Region: {
        Id: "AYDIN",
        Name: "Aydin",
        ImageUrl: ""
      },
      Country: {
        Id: "TR",
        Name: "Turkey",
        ImageUrl: ""
      },
      Company: null,
      AccommodationType: null,
      AccommodationRating: null,
      ProfileImages: null,
      ProfileContracts: null,
      AccommodationLocations: null,
      ProfileFacilities: null,
      AccommodationSegment: null,
      Contracts: null,
      Area: {
        Id: "KUSADASI",
        Name: "Kusadasi"
      },
      AddressObject: {
        Id: null,
        Address1:
          "Bayraklidede Mahallesi- Turgut Ozal Blv. No:64- 09400 Kusadasi/Aydin- Turkey",
        Address2: null,
        Address3: null,
        PostalCode: null,
        Landmark: null,
        AreaId: null,
        Area: null,
        City: {
          Id: "KUSADASI",
          Name: "Kusadasi"
        },
        Region: {
          Id: "AYDIN",
          Name: "Aydin"
        },
        Country: {
          Id: "TR",
          Name: "Turkey"
        },
        AddressString:
          "Bayraklidede Mahallesi- Turgut Ozal Blv. No:64- 09400 Kusadasi/Aydin- Turkey, Kusadasi, Aydin, Turkey",
        Coordinate: null
      },
      BillingAddress: {
        Id: null,
        Address1:
          "Bayraklidede Mahallesi- Turgut Ozal Blv. No:64- 09400 Kusadasi/Aydin- Turkey",
        Address2: null,
        Address3: null,
        PostalCode: null,
        Landmark: null,
        AreaId: null,
        Area: null,
        City: {
          Id: "KUSADASI",
          Name: "Kusadasi"
        },
        Region: {
          Id: "AYDIN",
          Name: "Aydin"
        },
        Country: {
          Id: "TR",
          Name: "Turkey"
        },
        AddressString:
          "Bayraklidede Mahallesi- Turgut Ozal Blv. No:64- 09400 Kusadasi/Aydin- Turkey, Kusadasi, Aydin, Turkey",
        Coordinate: null
      }
    },
    {
      AccommodationItem: null,
      Id: 20,
      Name: "Ninova Thermal Pamukkale",
      Desc:
        "Located in Pamukkale- the hotel is within easy reach of Hierapolis and Pamukkale Thermal Pools. It also offers meeting rooms- an outdoor pool and a 24-hour reception. The hotel has 90 rooms and has been recently refurbished.",
      Address:
        "Karahayit Mah. 125 Cami Sokak No:26 Pamukkale- 20290 Pamukkale/Denizli- Turkey",
      Priority: false,
      Telephone: "902587580119",
      Email: "info@ninovathermal.com",
      Currency: null,
      ImageUrl:
        "https://touressapi.azurewebsites.net/Content/imgSrc/Accommodations/47601100.jpg",
      OverView:
        "Located in Pamukkale- the hotel is within easy reach of Hierapolis and Pamukkale Thermal Pools. It also offers meeting rooms- an outdoor pool and a 24-hour reception. The hotel has 90 rooms and has been recently refurbished. Those staying at Pamukkale Ninova Thermal Spa & Hotel can sit down to a unique dining experience at the on-site restaurant- suitably situated for those who want to stay close when looking for a bite to eat. Each evening- guests can relax in the lounge bar. Pamukkale Ninova Thermal Spa & Hotel has easy access to Cotton Castle.",
      IsPromo: false,
      NeedApprovalThreshold: 0,
      DefaultReleaseDays: 0,
      City: {
        Id: "PAMUKKALE",
        Name: "Pamukkale",
        ImageUrl: ""
      },
      Region: {
        Id: "DENIZLI",
        Name: "Denizli",
        ImageUrl: ""
      },
      Country: {
        Id: "TR",
        Name: "Turkey",
        ImageUrl: ""
      },
      Company: null,
      AccommodationType: null,
      AccommodationRating: null,
      ProfileImages: null,
      ProfileContracts: null,
      AccommodationLocations: null,
      ProfileFacilities: null,
      AccommodationSegment: null,
      Contracts: null,
      Area: {
        Id: "PAMUKKALE",
        Name: "Pamukkale"
      },
      AddressObject: {
        Id: null,
        Address1:
          "Karahayit Mah. 125 Cami Sokak No:26 Pamukkale- 20290 Pamukkale/Denizli- Turkey",
        Address2: null,
        Address3: null,
        PostalCode: null,
        Landmark: null,
        AreaId: null,
        Area: null,
        City: {
          Id: "PAMUKKALE",
          Name: "Pamukkale"
        },
        Region: {
          Id: "DENIZLI",
          Name: "Denizli"
        },
        Country: {
          Id: "TR",
          Name: "Turkey"
        },
        AddressString:
          "Karahayit Mah. 125 Cami Sokak No:26 Pamukkale- 20290 Pamukkale/Denizli- Turkey, Pamukkale, Denizli, Turkey",
        Coordinate: null
      },
      BillingAddress: {
        Id: null,
        Address1:
          "Karahayit Mah. 125 Cami Sokak No:26 Pamukkale- 20290 Pamukkale/Denizli- Turkey",
        Address2: null,
        Address3: null,
        PostalCode: null,
        Landmark: null,
        AreaId: null,
        Area: null,
        City: {
          Id: "PAMUKKALE",
          Name: "Pamukkale"
        },
        Region: {
          Id: "DENIZLI",
          Name: "Denizli"
        },
        Country: {
          Id: "TR",
          Name: "Turkey"
        },
        AddressString:
          "Karahayit Mah. 125 Cami Sokak No:26 Pamukkale- 20290 Pamukkale/Denizli- Turkey, Pamukkale, Denizli, Turkey",
        Coordinate: null
      }
    },
    {
      AccommodationItem: null,
      Id: 1276,
      Name: "Dinler Nevsehir",
      Desc:
        '"Offering indoor and outdoor pools, Dinler Hotels Nevsehir has a spa including Turkish bath, sauna and gym. Set in the Cappadocia region, it also has a children�s pool and play areas."',
      Address: '"Urgup - Aksaray Yolu Caddesi, 2 km, 50100 Nevsehir, Turkey"',
      Priority: false,
      Telephone: "903842139968",
      Email: "mail@mail.com",
      Currency: null,
      ImageUrl: null,
      OverView:
        '"Offering indoor and outdoor pools, Dinler Hotels Nevsehir has a spa including Turkish bath, sauna and gym. Set in the Cappadocia region, it also has a children�s pool and play areas."',
      IsPromo: false,
      NeedApprovalThreshold: 1,
      DefaultReleaseDays: 0,
      City: {
        Id: "CAPPADOCIA",
        Name: "Cappadocia",
        ImageUrl: ""
      },
      Region: {
        Id: "URGUP",
        Name: "Urgup",
        ImageUrl: ""
      },
      Country: {
        Id: "TR",
        Name: "Turkey",
        ImageUrl: ""
      },
      Company: null,
      AccommodationType: null,
      AccommodationRating: null,
      ProfileImages: null,
      ProfileContracts: null,
      AccommodationLocations: null,
      ProfileFacilities: null,
      AccommodationSegment: null,
      Contracts: null,
      Area: {
        Id: "CAPPADOCIA",
        Name: "Cappadocia"
      },
      AddressObject: {
        Id: null,
        Address1:
          '"Urgup - Aksaray Yolu Caddesi, 2 km, 50100 Nevsehir, Turkey"',
        Address2: null,
        Address3: null,
        PostalCode: null,
        Landmark: null,
        AreaId: null,
        Area: null,
        City: {
          Id: "CAPPADOCIA",
          Name: "Cappadocia"
        },
        Region: {
          Id: "URGUP",
          Name: "Urgup"
        },
        Country: {
          Id: "TR",
          Name: "Turkey"
        },
        AddressString:
          '"Urgup - Aksaray Yolu Caddesi, 2 km, 50100 Nevsehir, Turkey", Cappadocia, Urgup, Turkey',
        Coordinate: null
      },
      BillingAddress: {
        Id: null,
        Address1:
          '"Urgup - Aksaray Yolu Caddesi, 2 km, 50100 Nevsehir, Turkey"',
        Address2: null,
        Address3: null,
        PostalCode: null,
        Landmark: null,
        AreaId: null,
        Area: null,
        City: {
          Id: "CAPPADOCIA",
          Name: "Cappadocia"
        },
        Region: {
          Id: "URGUP",
          Name: "Urgup"
        },
        Country: {
          Id: "TR",
          Name: "Turkey"
        },
        AddressString:
          '"Urgup - Aksaray Yolu Caddesi, 2 km, 50100 Nevsehir, Turkey", Cappadocia, Urgup, Turkey',
        Coordinate: null
      }
    },
    {
      AccommodationItem: null,
      Id: 124,
      Name: "Golden Way Istanbul",
      Desc:
        "Holiday Inn Express Safa Park ini terletak di Sheikh Zayed Road yang terkenal, hanya beberapa langkah dari Safa Park. Hotel ini memiliki pusat kebugaran di puncak gedung dan bus gratis menuju Pantai Jumeirah.",
      Address:
        "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
      Priority: false,
      Telephone: "+902124386888",
      Email: "info@goldenway.com.tr",
      Currency: null,
      ImageUrl:
        "https://touressapi.azurewebsites.net/Content/imgSrc/Accommodations/7f967ba7-4698-4f5d-9f8f-5fcfce2e330c.jpg",
      OverView:
        "Holiday Inn Express Safa Park ini terletak di Sheikh Zayed Road yang terkenal, hanya beberapa langkah dari Safa Park. Hotel ini memiliki pusat kebugaran di puncak gedung dan bus gratis menuju Pantai Jumeirah.",
      IsPromo: false,
      NeedApprovalThreshold: 0,
      DefaultReleaseDays: 0,
      City: {
        Id: "ISTANBUL",
        Name: "Istanbul",
        ImageUrl:
          "https://touressapi.azurewebsites.net/Content/ImgSrc/Accommodations/TUrkey%20photo.jpeg"
      },
      Region: {
        Id: "ISTANBUL",
        Name: "Istanbul",
        ImageUrl:
          "https://touressapi.azurewebsites.net/Content/ImgSrc/Accommodations/TUrkey%20photo.jpeg"
      },
      Country: {
        Id: "TR",
        Name: "Turkey",
        ImageUrl: ""
      },
      Company: null,
      AccommodationType: null,
      AccommodationRating: null,
      ProfileImages: null,
      ProfileContracts: null,
      AccommodationLocations: null,
      ProfileFacilities: null,
      AccommodationSegment: null,
      Contracts: null,
      Area: {
        Id: "ISTANBUL",
        Name: "Istanbul"
      },
      AddressObject: {
        Id: null,
        Address1:
          "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
        Address2: null,
        Address3: null,
        PostalCode: null,
        Landmark: null,
        AreaId: null,
        Area: null,
        City: {
          Id: "ISTANBUL",
          Name: "Istanbul"
        },
        Region: {
          Id: "ISTANBUL",
          Name: "Istanbul"
        },
        Country: {
          Id: "TR",
          Name: "Turkey"
        },
        AddressString:
          "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey, Istanbul, Istanbul, Turkey",
        Coordinate: null
      },
      BillingAddress: {
        Id: null,
        Address1:
          "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
        Address2: null,
        Address3: null,
        PostalCode: null,
        Landmark: null,
        AreaId: null,
        Area: null,
        City: {
          Id: "ISTANBUL",
          Name: "Istanbul"
        },
        Region: {
          Id: "ISTANBUL",
          Name: "Istanbul"
        },
        Country: {
          Id: "TR",
          Name: "Turkey"
        },
        AddressString:
          "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey, Istanbul, Istanbul, Turkey",
        Coordinate: null
      }
    },
    {
      AccommodationItem: null,
      Id: 125,
      Name: "Gold Majesty Bursa",
      Desc:
        "Gold Majesty, 5 km ke pusat kota Bursa, menawarkan kamar-kamar berpendingin ruangan dengan televisi satelit dan minibar. Wi-Fi gratis dan tempat parkir gratis tersedia di hotel.",
      Address:
        "Konak Mahallesi Lefkose Caddesi No:7 Nilufer/Bursa, Bursa 16110, Turkey",
      Priority: false,
      Telephone: "+904441181",
      Email: "info@hotelgoldmajesty.com",
      Currency: "IDR",
      ImageUrl:
        "https://touressapi.azurewebsites.net/Content/imgSrc/Accommodations/69674de3-f293-4965-b3d1-d0f59c63a1c7.jpg",
      OverView:
        "Gold Majesty, 5 km ke pusat kota Bursa, menawarkan kamar-kamar berpendingin ruangan dengan televisi satelit dan minibar. Wi-Fi gratis dan tempat parkir gratis tersedia di hotel.",
      IsPromo: false,
      NeedApprovalThreshold: 0,
      DefaultReleaseDays: 0,
      City: {
        Id: "BURSA",
        Name: "bursa",
        ImageUrl: ""
      },
      Region: {
        Id: "BURSA",
        Name: "Bursa",
        ImageUrl: ""
      },
      Country: {
        Id: "TR",
        Name: "Turkey",
        ImageUrl: ""
      },
      Company: {
        Code: "10000",
        Name: "Connect World PTE.LTD"
      },
      AccommodationType: {
        Id: "HOTEL",
        Name: "Hotel"
      },
      AccommodationRating: {
        Id: "4",
        Name: "4 Stars"
      },
      ProfileImages: [
        {
          ImageId: 6,
          ImageUrl:
            "https://touressapi.azurewebsites.net//Content/imgSrc/Accommodations/f237a76e-d77e-4866-b214-f899da581c72.jpg",
          TinyImageUrl: null,
          ImageName: null,
          IsPrimaryImage: false
        }
      ],
      ProfileContracts: [],
      AccommodationLocations: [
        {
          Id: "CITYCENTER",
          Name: "City Center"
        }
      ],
      ProfileFacilities: [
        {
          Id: "AIRPORTTRANSFER",
          Name: "Airport Transfer"
        },
        {
          Id: "WIFI",
          Name: "Wi Fi"
        }
      ],
      AccommodationSegment: [],
      Contracts: null,
      Area: {
        Id: "BURSA",
        Name: "bursa"
      },
      AddressObject: {
        Id: 1673,
        Address1:
          "Konak Mahallesi Lefkose Caddesi No:7 Nilufer/Bursa, Bursa 16110, Turkey",
        Address2: "",
        Address3: "",
        PostalCode: "",
        Landmark:
          "Konak Mahallesi Lefkose Caddesi No:7 Nilufer/Bursa, Bursa 16110, Turkey",
        AreaId: "BURSA",
        Area: {
          Id: "BURSA",
          Name: "bursa"
        },
        City: {
          Id: "BURSA",
          Name: "bursa"
        },
        Region: {
          Id: "BURSA",
          Name: "Bursa"
        },
        Country: {
          Id: "TR",
          Name: "Turkey"
        },
        AddressString:
          "Konak Mahallesi Lefkose Caddesi No:7 Nilufer/Bursa, Bursa 16110, Turkey, bursa, bursa, Bursa, Turkey",
        Coordinate: null
      },
      BillingAddress: {
        Id: null,
        Address1:
          "Konak Mahallesi Lefkose Caddesi No:7 Nilufer/Bursa, Bursa 16110, Turkey",
        Address2: null,
        Address3: null,
        PostalCode: null,
        Landmark: null,
        AreaId: null,
        Area: null,
        City: {
          Id: "BURSA",
          Name: "bursa"
        },
        Region: {
          Id: "BURSA",
          Name: "Bursa"
        },
        Country: {
          Id: "TR",
          Name: "Turkey"
        },
        AddressString:
          "Konak Mahallesi Lefkose Caddesi No:7 Nilufer/Bursa, Bursa 16110, Turkey, bursa, Bursa, Turkey",
        Coordinate: null
      }
    }
  ],
  IsFeatured: false,
  TourOperator: {
    Id: 2,
    Name: "keTurki.com",
    ImageUrl:
      "https://touressapi.azurewebsites.net/Content/imgSrc/TourOperators/logo-keturkidotcom.jpeg"
  },
  Prices: {
    SharingRoomPrice: 16900000.0,
    SingleRoomPrice: 20900000.0,
    AdultExtraBedPrice: 16900000.0,
    ChildExtraBedPrice: 16900000.0,
    SharingBedPrice: 15900000.0,
    NoBedPrice: 9000000.0,
    LowestPrice: 9000000.0,
    CurrencyId: "IDR"
  },
  Images: [
    {
      ImageId: 2255,
      ImageUrl:
        "https://api.touress.com//Content/imgSrc/BookingTemplateImages/877c4108-3490-45c3-a3d3-a09a900a0befTurkey_Tulip_Festival-4_13APR.jpg.jpg",
      TinyImageUrl: null,
      ImageName: "Turkey_Tulip_Festival-4_13APR.jpg",
      IsPrimaryImage: false
    },
    {
      ImageId: 2256,
      ImageUrl:
        "https://api.touress.com//Content/imgSrc/BookingTemplateImages/f6119767-1875-4869-bcae-97d23b61190cTurkey_Tulip_Festival-4_13APR.jpg.jpg",
      TinyImageUrl: null,
      ImageName: "Turkey_Tulip_Festival-4_13APR.jpg",
      IsPrimaryImage: false
    },
    {
      ImageId: 2257,
      ImageUrl:
        "https://api.touress.com//Content/imgSrc/BookingTemplateImages/5637502d-b120-457f-8d5b-2d8e1e45a074Turkey_Tulip_Festival-4_13APR.jpg.jpg",
      TinyImageUrl: null,
      ImageName: "Turkey_Tulip_Festival-4_13APR.jpg",
      IsPrimaryImage: false
    }
  ],
  Brochures: [
    {
      ImageId: 2256,
      ImageUrl:
        "https://api.touress.com//Content/imgSrc/BookingTemplateImages/f6119767-1875-4869-bcae-97d23b61190cTurkey_Tulip_Festival-4_13APR.jpg.jpg",
      TinyImageUrl: null,
      ImageName: "Turkey_Tulip_Festival-4_13APR.jpg",
      IsPrimaryImage: false
    },
    {
      ImageId: 2255,
      ImageUrl:
        "https://api.touress.com//Content/imgSrc/BookingTemplateImages/877c4108-3490-45c3-a3d3-a09a900a0befTurkey_Tulip_Festival-4_13APR.jpg.jpg",
      TinyImageUrl: null,
      ImageName: "Turkey_Tulip_Festival-4_13APR.jpg",
      IsPrimaryImage: false
    }
  ],
  Descriptions: [
    {
      Id: 12451,
      SubTitle: "Detail Paket: ",
      Content:
        "<ol>\n  <li>Harga paket diluar Turkey Tourist Visa &amp; Tips Tour Leader&nbsp;</li>\n  <li>Paket based on Harga Promo, Cancel Non Refundable&nbsp;</li>\n  <li>Twin Sharing Basis (Dewasa/Anak-anak) <strong>IDR16,9jt/pax</strong></li>\n  <li>Single Basis <strong>IDR20,9jt/pax</strong></li>\n  <li>No Bed (Anak-anak 2-8 tahun) Discount <strong>IDR1jt/pax&nbsp;</strong></li>\n  <li>No Bed (Infant 0-1 tahun) <strong>IDR9jt/pax&nbsp;</strong></li>\n  <li>Turkey Tourist Visa <strong>IDR580,000/pax</strong>&nbsp;</li>\n  <li>Tips Driver, Tour Guide, Tour Leader <strong>IDR800,000/pax&nbsp;</strong></li>\n  <li>Akomodasi: - Golden Way Istanbul / setara - Gold Majesty Bursa / setara - Royal Palace Kusadasi / setara - Ninova Thermal Pamukkale / setara - Dinler Nevsehir Cappadocia / setara&nbsp;</li>\n</ol>\n<p>&nbsp;</p>"
    },
    {
      Id: 12452,
      SubTitle: "Payment Terms: ",
      Content:
        "<ol>\n  <li>Down Payment 20% sebelum <strong>21-JAN-20</strong></li>\n  <li>Second Payment 50% sebelum <strong>02-FEB-20</strong></li>\n  <li>Final Payment 30% sebelum<strong> 04-MAR-20</strong></li>\n</ol>\n<p><br></p>"
    },
    {
      Id: 12453,
      SubTitle: "Harga sudah Termasuk: ",
      Content:
        "<ol>\n  <li>Tiket penerbangan dengan International Flights kelas ekonomi termasuk aiport tax dan fuel surcharge (promo ticket, non-refundable, non-reroutable) based on seat availability&nbsp;</li>\n  <li>Akomodasi / Hotel termasuk tax, service charges, dan daily breakfast&nbsp;</li>\n  <li>Air mineral di Bis dan Restaurant sesuai dengan kebutuhan&nbsp;</li>\n  <li>Entrance Fees dan Meals sesuai itinerary&nbsp;</li>\n  <li>Kendaraan private ber A/C termasuk supir, parking dan fee jalan tol&nbsp;</li>\n</ol>\n<p>&nbsp;</p>"
    },
    {
      Id: 12454,
      SubTitle: "Harga tidak termasuk: ",
      Content:
        "<ol>\n  <li>Opsi tambahan - Hot Air Balloon USD250/pax&nbsp;</li>\n  <li>Pengeluaran Pribadi (porter di Bandara, telepon, laundry, mini-bar, in-room-service, dan semua yang tidak termasuk di itinerary)&nbsp;</li>\n  <li>Dokumen perjalanan&nbsp;</li>\n  <li>Asuransi Perjalanan</li>\n  <li>Turkey Tourist Visa IDR580,000/pax&nbsp;</li>\n  <li>Tips Driver, Tour Guide, Tour Leader IDR800,000/pax&nbsp;</li>\n</ol>\n<p>&nbsp;</p>"
    },
    {
      Id: 12455,
      SubTitle: "Syarat Turkey Tourist Visa: ",
      Content:
        "<ol>\n  <li>Manifest Visa format XLS yang diisi lengkap (Nama Lengkap, Nomor Passport, Tanggal Lahir dalam format 01-Jan-75, Tempat Lahir, Jenis Kelamin, Passport Issue Date dalam format 01Jan-18, Passport Expiry Date dalam format 01-Jan-23, Passport Issue Place, Nama Lengkap Ayah, Nama Lengkap Ibu)&nbsp;</li>\n  <li>Passport Copy (hanya sebagai referensi jika dibutuhkan). Data yang digunakan untuk aplikasi Visa diambil dari Manifest dari bukan dari passport copy&nbsp;</li>\n  <li>Tourist Visa akan diproses selama 2-5 hari kerja dan akan siap maksimum 1 hari sebelum keberangkatan group&nbsp;</li>\n</ol>\n<p><br></p>"
    }
  ],
  Commissions: [
    {
      Description: "Agent Commission",
      Value: 600000.0,
      Category: "Agent_Commission"
    },
    {
      Description: "Staff Commission",
      Value: 400000.0,
      Category: "Staff_Commission"
    }
  ],
  Supplements: [],
  Attractions: null,
  AdditionalServices: [],
  ActiveDate: null,
  BookingTemplatePeriodDates: [],
  BookingDetailSum: {
    AdultQty: 0,
    ChildQty: 0,
    InfantQty: 0,
    TotalPaxQty: 0,
    ImageUrl: null,
    Id: "988",
    Title: "Turkey Tulip Festival 04-13APR",
    Description: "Turkey Tulip Festival 04-13APR",
    PackageType: "Fixed",
    TotalGuest: 0,
    MinimumGuest: 0,
    MaximumGuest: 0,
    Destination: "BURSA",
    City: {
      UTC: null,
      ImageUrl:
        "https://touressapi.azurewebsites.net/Content/ImgSrc/Accommodations/TUrkey%20photo.jpeg",
      Id: "ISTANBUL",
      Name: "Istanbul"
    },
    Country: {
      ImageUrl: "",
      Id: "TR",
      Name: "Turkey"
    },
    Company: null,
    AccommodationDesc: null,
    AccommodationName: null,
    Accommodation: 0,
    CurrencyId: null,
    CreatedDate: "0001-01-01T00:00:00",
    StartDate: "2020-04-04T16:15:00",
    EndDate: "2020-04-13T07:05:00",
    ActiveDate: null,
    Status: "Booking_hold",
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
    ExpiredOn: "2020-04-01T00:00:00",
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
      RegisteringGuest: 12,
      MinimumGuest: 20,
      MaximumGuest: 100,
      ConfirmedGuest: 12,
      PaxLeft: 8,
      ReferenceId: null,
      MinPax: 0,
      PaymentTerms: [
        {
          Id: 11774,
          PaymentPercentage: 20.0,
          DueDate: "2020-01-21T00:00:00",
          PayDate: null,
          PaymentValue: 0.0,
          PaymentValueEndCustomer: 0.0,
          CurrencyId: null,
          Description: "Down Payment",
          IsPayed: false,
          PaidValue: 0.0,
          IsLockGuest: false,
          Sequence: 1,
          IntervalDays: 3,
          IsAfterBookingBased: true
        },
        {
          Id: 11775,
          PaymentPercentage: 50.0,
          DueDate: "2020-02-02T00:00:00",
          PayDate: null,
          PaymentValue: 0.0,
          PaymentValueEndCustomer: 0.0,
          CurrencyId: null,
          Description: "Second Payment",
          IsPayed: false,
          PaidValue: 0.0,
          IsLockGuest: false,
          Sequence: 2,
          IntervalDays: 0,
          IsAfterBookingBased: false
        },
        {
          Id: 11776,
          PaymentPercentage: 30.0,
          DueDate: "2020-03-04T00:00:00",
          PayDate: null,
          PaymentValue: 0.0,
          PaymentValueEndCustomer: 0.0,
          CurrencyId: null,
          Description: "Final Payment",
          IsPayed: false,
          PaidValue: 0.0,
          IsLockGuest: false,
          Sequence: 3,
          IntervalDays: 0,
          IsAfterBookingBased: false
        }
      ],
      Suppements: [
        {
          Name: "Turkey Tourist Visa",
          Description: "Turkey Tourist Visa",
          IsMandatory: true,
          UnitCost: 580000.0,
          UomId: "PCK",
          CurrencyId: "IDR",
          BookingTemplateId: 0,
          BookingTemplateSupplementId: 0,
          IsInfantCount: true
        },
        {
          Name: "Tips Driver, Tour Guide, Tour Leader",
          Description: "Tips Driver, Tour Guide, Tour Leader",
          IsMandatory: true,
          UnitCost: 800000.0,
          UomId: "PCK",
          CurrencyId: "IDR",
          BookingTemplateId: 0,
          BookingTemplateSupplementId: 0,
          IsInfantCount: true
        },
        {
          Name: "Hot Air Baloon",
          Description: "Hot Air Baloon",
          IsMandatory: false,
          UnitCost: 3250000.0,
          UomId: "PCK",
          CurrencyId: "IDR",
          BookingTemplateId: 0,
          BookingTemplateSupplementId: 0,
          IsInfantCount: false
        }
      ]
    },
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
    IsAllotment: null,
    AdditionalServices: null
  },
  DailyPrograms: [
    {
      Day: 1,
      Date: "2020-04-04T00:00:00",
      TourDestinations: [
        {
          TransportationSummary: [],
          AttractionSummary: [],
          RestaurantSummary: [],
          TourGuideSummary: [],
          Destination: "JAKARTA",
          ImageUrl: "",
          AccommodationSummary: null
        }
      ],
      TourSummary: null,
      Movements: [
        {
          Id: 445303,
          DateTime: "2020-04-04T16:15:00",
          SeqNumber: 1,
          MovementName: "QUEUETIME",
          MovementDescription: "Queue Time",
          Duration: 14400,
          DurationText: "4 hours ",
          ServiceItemId: 2530,
          Destination: "JAKARTA",
          DestinationName: "Jakarta",
          Note: "Berkumpul di Bandara Soekarno-Hatta",
          Item: {
            Name: null,
            Desc: null,
            ServiceType: "Movement_queue_time",
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 445304,
          DateTime: "2020-04-04T20:15:00",
          SeqNumber: 2,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "JAKARTA",
          DestinationName: "Jakarta",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 445305,
          DateTime: "2020-04-04T20:15:00",
          SeqNumber: 3,
          MovementName: "FREETIMELOCKED",
          MovementDescription: "Free Time Locked",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 28528,
          Destination: "JAKARTA",
          DestinationName: "Jakarta",
          Note: "",
          Item: {
            Name: null,
            Desc: null,
            ServiceType: "Movement_free_time",
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 445306,
          DateTime: "2020-04-04T20:15:00",
          SeqNumber: 4,
          MovementName: "DEPARTURE",
          MovementDescription: "Departure",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 7,
          Destination: "JAKARTA",
          DestinationName: "Jakarta",
          Note: "",
          Item: {
            Name: "Airport",
            Desc: "Soekarno-Hatta International Airport",
            ServiceType: "Movement_departure",
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: 2,
            Address: {
              Id: 2497,
              Address1:
                "Bandar Udara Internasional Soekarno–Hatta (CGK), Kota Tangerang, Banten",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Bandar Udara Internasional Soekarno–Hatta (CGK), Kota Tangerang, Banten",
              AreaId: "CENTRALJAKARTA",
              Area: {
                Id: "CENTRALJAKARTA",
                Name: "Central Jakarta"
              },
              City: {
                Id: "JAKARTA",
                Name: "Jakarta"
              },
              Region: {
                Id: "JAKARTA",
                Name: "Jakarta"
              },
              Country: {
                Id: "ID",
                Name: "Indonesia"
              },
              AddressString:
                "Bandar Udara Internasional Soekarno–Hatta (CGK), Kota Tangerang, Banten, Central Jakarta, Jakarta, Jakarta, Indonesia",
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "JAKARTA"
          }
        },
        {
          Id: 445307,
          DateTime: "2020-04-04T20:15:00",
          SeqNumber: 5,
          MovementName: "FLIGHTTIME",
          MovementDescription: "Flight time",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 10,
          Destination: "JAKARTA",
          DestinationName: "Jakarta",
          Note: null,
          Item: {
            Name: null,
            Desc: null,
            ServiceType: "Movement_flight_time",
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        }
      ],
      OrderedItems: []
    },
    {
      Day: 2,
      Date: "2020-04-05T00:00:00",
      TourDestinations: [
        {
          TransportationSummary: [],
          AttractionSummary: [],
          RestaurantSummary: [
            {
              Name: "Dinner Menu",
              DateTime: "2020-04-05T19:00:00",
              ServiceItemId: 49609,
              Duration: 3600,
              SeqNumber: 0
            }
          ],
          TourGuideSummary: [],
          Destination: "BURSA",
          ImageUrl: "",
          AccommodationSummary: {
            Allocations: {
              SharingRoomPax: 0,
              ChildSharingRoomPax: 0,
              SingleRoomPax: 0,
              ChildSingleRoomPax: 0,
              ExtraBedPax: 0,
              ChildExtraBedPax: 0,
              SharingBedPax: 0,
              NoBedPax: 0
            },
            Name: "Gold Majesty Bursa",
            Address:
              "Konak Mahallesi Lefkose Caddesi No:7 Nilufer/Bursa, Bursa 16110, Turkey",
            RoomType: "Double/Twin Sharing",
            RoomName: "Standard Room",
            RoomService: "With_breakfast",
            ServiceItemId: 36347,
            AccommodationProfileId: 125,
            SeqNumber: 0,
            DateTime: "2020-04-05T00:00:00"
          }
        },
        {
          TransportationSummary: [],
          AttractionSummary: [
            {
              Name: "Emirgan Park",
              DateTime: "2020-04-05T10:00:00",
              ServiceItemId: 2467,
              Duration: 10800,
              SeqNumber: 0
            }
          ],
          RestaurantSummary: [
            {
              Name: "Lunch Menu",
              DateTime: "2020-04-05T13:00:00",
              ServiceItemId: 49605,
              Duration: 3600,
              SeqNumber: 0
            }
          ],
          TourGuideSummary: [],
          Destination: "ISTANBUL",
          ImageUrl:
            "https://touressapi.azurewebsites.net/Content/ImgSrc/Accommodations/TUrkey%20photo.jpeg",
          AccommodationSummary: null
        }
      ],
      TourSummary: null,
      Movements: [
        {
          Id: 445308,
          DateTime: "2020-04-05T07:45:00",
          SeqNumber: 1,
          MovementName: "ARRIVAL",
          MovementDescription: "Arrival",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 8,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: "",
          Item: {
            Name: "Airport",
            Desc: "Istanbul Ataturk Airport",
            ServiceType: "Movement_arrival",
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: 6,
            Address: {
              Id: null,
              Address1: "Yesilkoy, 34149 Barkirkoy/Istanbul, Turkey",
              Address2: null,
              Address3: null,
              PostalCode: null,
              Landmark: null,
              AreaId: null,
              Area: null,
              City: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Region: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Yesilkoy, 34149 Barkirkoy/Istanbul, Turkey, Istanbul, Istanbul, Turkey",
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "ISTANBUL"
          }
        },
        {
          Id: 445309,
          DateTime: "2020-04-05T08:45:00",
          SeqNumber: 2,
          MovementName: "QUEUETIME",
          MovementDescription: "Queue Time",
          Duration: 3600,
          DurationText: "1 hour ",
          ServiceItemId: 2530,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: "Airport Pick Up",
          Item: {
            Name: null,
            Desc: null,
            ServiceType: "Movement_queue_time",
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 445310,
          DateTime: "2020-04-05T09:45:00",
          SeqNumber: 3,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 445311,
          DateTime: "2020-04-05T10:00:00",
          SeqNumber: 4,
          MovementName: "RECREATION",
          MovementDescription: "Excursion",
          Duration: 10800,
          DurationText: "3 hours ",
          ServiceItemId: 6,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: null,
          Item: {
            OperationStartTime: "2019-10-23T08:00:00",
            OperationEndTime: "2019-10-23T17:00:00",
            IsSolidStartTime: false,
            Name: "Emirgan Park",
            Desc: "Istanbul City Tour with route: Emirgan Park",
            ServiceType: "Single",
            ImageUrl:
              "https://touressapi.azurewebsites.net//Content/imgSrc/Attractions/ffe6a37a-469c-42fd-92eb-4f84bcaf92fb.jpg",
            ImageName: null,
            ServiceItemId: 2467,
            PlaceId: null,
            Address: {
              Id: 10463,
              Address1:
                '"Emirgan Mahallesi, Park Ici Yolu, 34467 Sariyer, Istanbul, Turkey"',
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                '"Emirgan Mahallesi, Park Ici Yolu, 34467 Sariyer, Istanbul, Turkey"',
              AreaId: "ISTANBULEUROPE",
              Area: {
                Id: "ISTANBULEUROPE",
                Name: "Istanbul Europe"
              },
              City: {
                Id: "ISTANBULISTANBULEUROPE",
                Name: "Istanbul Europe"
              },
              Region: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                '"Emirgan Mahallesi, Park Ici Yolu, 34467 Sariyer, Istanbul, Turkey", Istanbul Europe, Istanbul Europe, Istanbul, Turkey',
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "ISTANBULISTANBULEUROPE"
          }
        },
        {
          Id: 445312,
          DateTime: "2020-04-05T13:00:00",
          SeqNumber: 5,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 445313,
          DateTime: "2020-04-05T13:00:00",
          SeqNumber: 6,
          MovementName: "EAT",
          MovementDescription: "Meal",
          Duration: 3600,
          DurationText: "1 hour ",
          ServiceItemId: 11,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: null,
          Item: {
            Name: "Lunch Menu",
            Desc: "Lunch Menu",
            ServiceType: "Movement_eat",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Restaurants/1ecafca8-7b32-4f27-b7cd-1cc53283e064istanbul.jpg.jpg",
            ImageName: null,
            ServiceItemId: 49605,
            PlaceId: null,
            Address: {
              Id: 11955,
              Address1:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
              AreaId: "ISTANBUL",
              Area: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              City: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Region: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey, Istanbul, Istanbul, Istanbul, Turkey",
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "ISTANBUL"
          }
        },
        {
          Id: 445314,
          DateTime: "2020-04-05T14:00:00",
          SeqNumber: 7,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 10800,
          DurationText: "3 hours ",
          ServiceItemId: 1,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: "",
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 0,
          DateTime: "2020-04-05T19:00:00",
          SeqNumber: 8,
          MovementName: "CHECKIN",
          MovementDescription: "Check-in",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 2,
          Destination: "BURSA",
          DestinationName: "bursa",
          Note: null,
          Item: {
            Name: "Gold Majesty Bursa",
            Desc: "Standard Room",
            ServiceType: "With_breakfast",
            ImageUrl:
              "https://touressapi.azurewebsites.net/Content/imgSrc/Accommodations/69674de3-f293-4965-b3d1-d0f59c63a1c7.jpg",
            ImageName: null,
            ServiceItemId: 36347,
            PlaceId: null,
            Address: {
              Id: 1673,
              Address1:
                "Konak Mahallesi Lefkose Caddesi No:7 Nilufer/Bursa, Bursa 16110, Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Konak Mahallesi Lefkose Caddesi No:7 Nilufer/Bursa, Bursa 16110, Turkey",
              AreaId: "BURSA",
              Area: {
                Id: "BURSA",
                Name: "bursa"
              },
              City: {
                Id: "BURSA",
                Name: "bursa"
              },
              Region: {
                Id: "BURSA",
                Name: "Bursa"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Konak Mahallesi Lefkose Caddesi No:7 Nilufer/Bursa, Bursa 16110, Turkey, bursa, bursa, Bursa, Turkey",
              Coordinate: null
            },
            ProfileDesc:
              "Gold Majesty, 5 km ke pusat kota Bursa, menawarkan kamar-kamar berpendingin ruangan dengan televisi satelit dan minibar. Wi-Fi gratis dan tempat parkir gratis tersedia di hotel.",
            CityId: "BURSA"
          }
        },
        {
          Id: 445316,
          DateTime: "2020-04-05T19:00:00",
          SeqNumber: 9,
          MovementName: "EAT",
          MovementDescription: "Meal",
          Duration: 3600,
          DurationText: "1 hour ",
          ServiceItemId: 11,
          Destination: "BURSA",
          DestinationName: "bursa",
          Note: null,
          Item: {
            Name: "Dinner Menu",
            Desc: "Dinner Menu",
            ServiceType: "Movement_eat",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Restaurants/2674dc96-71de-4ed4-82ab-f7156092c484bursa.jpg.jpg",
            ImageName: null,
            ServiceItemId: 49609,
            PlaceId: null,
            Address: {
              Id: 11534,
              Address1: "Bursa, Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark: "Bursa, Turkey",
              AreaId: "BURSA",
              Area: {
                Id: "BURSA",
                Name: "bursa"
              },
              City: {
                Id: "BURSA",
                Name: "bursa"
              },
              Region: {
                Id: "BURSA",
                Name: "Bursa"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString: "Bursa, Turkey, bursa, bursa, Bursa, Turkey",
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "BURSA"
          }
        },
        {
          Id: 445317,
          DateTime: "2020-04-05T20:00:00",
          SeqNumber: 10,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "BURSA",
          DestinationName: "bursa",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 0,
          DateTime: "2020-04-05T20:00:00",
          SeqNumber: 11,
          MovementName: "DAYEND",
          MovementDescription: "Day end",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 2434,
          Destination: "BURSA",
          DestinationName: "bursa",
          Note: null,
          Item: {
            Name: "Gold Majesty Bursa",
            Desc: "Standard Room",
            ServiceType: "With_breakfast",
            ImageUrl:
              "https://touressapi.azurewebsites.net/Content/imgSrc/Accommodations/69674de3-f293-4965-b3d1-d0f59c63a1c7.jpg",
            ImageName: null,
            ServiceItemId: 36347,
            PlaceId: null,
            Address: {
              Id: 1673,
              Address1:
                "Konak Mahallesi Lefkose Caddesi No:7 Nilufer/Bursa, Bursa 16110, Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Konak Mahallesi Lefkose Caddesi No:7 Nilufer/Bursa, Bursa 16110, Turkey",
              AreaId: "BURSA",
              Area: {
                Id: "BURSA",
                Name: "bursa"
              },
              City: {
                Id: "BURSA",
                Name: "bursa"
              },
              Region: {
                Id: "BURSA",
                Name: "Bursa"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Konak Mahallesi Lefkose Caddesi No:7 Nilufer/Bursa, Bursa 16110, Turkey, bursa, bursa, Bursa, Turkey",
              Coordinate: null
            },
            ProfileDesc:
              "Gold Majesty, 5 km ke pusat kota Bursa, menawarkan kamar-kamar berpendingin ruangan dengan televisi satelit dan minibar. Wi-Fi gratis dan tempat parkir gratis tersedia di hotel.",
            CityId: "BURSA"
          }
        }
      ],
      OrderedItems: [
        {
          ServiceItemId: 36347,
          ItemType: "Accommodation",
          ItemName: "Gold Majesty Bursa - Standard Room",
          Description: "Sharing Room",
          Qty: 0,
          IsNeedCheck: false
        },
        {
          ServiceItemId: 36347,
          ItemType: "Accommodation",
          ItemName: "Gold Majesty Bursa - Standard Room",
          Description: "Single Room",
          Qty: 0,
          IsNeedCheck: false
        }
      ]
    },
    {
      Day: 3,
      Date: "2020-04-06T00:00:00",
      TourDestinations: [
        {
          TransportationSummary: [],
          AttractionSummary: [],
          RestaurantSummary: [
            {
              Name: "Dinner Menu",
              DateTime: "2020-04-06T19:30:00",
              ServiceItemId: 49612,
              Duration: 3600,
              SeqNumber: 0
            }
          ],
          TourGuideSummary: [],
          Destination: "KUSADASI",
          ImageUrl: "",
          AccommodationSummary: {
            Allocations: {
              SharingRoomPax: 0,
              ChildSharingRoomPax: 0,
              SingleRoomPax: 0,
              ChildSingleRoomPax: 0,
              ExtraBedPax: 0,
              ChildExtraBedPax: 0,
              SharingBedPax: 0,
              NoBedPax: 0
            },
            Name: "Royal Palace Kusadasi",
            Address:
              "Bayraklidede Mahallesi- Turgut Ozal Blv. No:64- 09400 Kusadasi/Aydin- Turkey",
            RoomType: "Double/Twin Sharing",
            RoomName: "Deluxe Room",
            RoomService: "With_breakfast",
            ServiceItemId: 70,
            AccommodationProfileId: 19,
            SeqNumber: 0,
            DateTime: "2020-04-06T00:00:00"
          }
        },
        {
          TransportationSummary: [],
          AttractionSummary: [
            {
              Name: "Grand Mosque,Koza Han,Green Mosque & Green Tomb",
              DateTime: "2020-04-06T08:00:00",
              ServiceItemId: 51,
              Duration: 14400,
              SeqNumber: 0
            }
          ],
          RestaurantSummary: [
            {
              Name: "Breakfast Menu",
              DateTime: "2020-04-06T07:00:00",
              ServiceItemId: 49607,
              Duration: 3600,
              SeqNumber: 0
            },
            {
              Name: "Lunch Menu",
              DateTime: "2020-04-06T12:00:00",
              ServiceItemId: 49608,
              Duration: 5400,
              SeqNumber: 0
            }
          ],
          TourGuideSummary: [],
          Destination: "BURSA",
          ImageUrl: "",
          AccommodationSummary: null
        }
      ],
      TourSummary: null,
      Movements: [
        {
          Id: 0,
          DateTime: "2020-04-06T07:00:00",
          SeqNumber: 1,
          MovementName: "DAYSTART",
          MovementDescription: "Day start",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 2433,
          Destination: "BURSA",
          DestinationName: "bursa",
          Note: null,
          Item: {
            Name: "Gold Majesty Bursa",
            Desc: "Standard Room",
            ServiceType: "With_breakfast",
            ImageUrl:
              "https://touressapi.azurewebsites.net/Content/imgSrc/Accommodations/69674de3-f293-4965-b3d1-d0f59c63a1c7.jpg",
            ImageName: null,
            ServiceItemId: 36347,
            PlaceId: null,
            Address: {
              Id: 1673,
              Address1:
                "Konak Mahallesi Lefkose Caddesi No:7 Nilufer/Bursa, Bursa 16110, Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Konak Mahallesi Lefkose Caddesi No:7 Nilufer/Bursa, Bursa 16110, Turkey",
              AreaId: "BURSA",
              Area: {
                Id: "BURSA",
                Name: "bursa"
              },
              City: {
                Id: "BURSA",
                Name: "bursa"
              },
              Region: {
                Id: "BURSA",
                Name: "Bursa"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Konak Mahallesi Lefkose Caddesi No:7 Nilufer/Bursa, Bursa 16110, Turkey, bursa, bursa, Bursa, Turkey",
              Coordinate: null
            },
            ProfileDesc:
              "Gold Majesty, 5 km ke pusat kota Bursa, menawarkan kamar-kamar berpendingin ruangan dengan televisi satelit dan minibar. Wi-Fi gratis dan tempat parkir gratis tersedia di hotel.",
            CityId: "BURSA"
          }
        },
        {
          Id: 0,
          DateTime: "2020-04-06T07:00:00",
          SeqNumber: 2,
          MovementName: "CHECKOUT",
          MovementDescription: "Check-out",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 3,
          Destination: "BURSA",
          DestinationName: "bursa",
          Note: null,
          Item: {
            Name: "Gold Majesty Bursa",
            Desc: "Standard Room",
            ServiceType: "With_breakfast",
            ImageUrl:
              "https://touressapi.azurewebsites.net/Content/imgSrc/Accommodations/69674de3-f293-4965-b3d1-d0f59c63a1c7.jpg",
            ImageName: null,
            ServiceItemId: 36347,
            PlaceId: null,
            Address: {
              Id: 1673,
              Address1:
                "Konak Mahallesi Lefkose Caddesi No:7 Nilufer/Bursa, Bursa 16110, Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Konak Mahallesi Lefkose Caddesi No:7 Nilufer/Bursa, Bursa 16110, Turkey",
              AreaId: "BURSA",
              Area: {
                Id: "BURSA",
                Name: "bursa"
              },
              City: {
                Id: "BURSA",
                Name: "bursa"
              },
              Region: {
                Id: "BURSA",
                Name: "Bursa"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Konak Mahallesi Lefkose Caddesi No:7 Nilufer/Bursa, Bursa 16110, Turkey, bursa, bursa, Bursa, Turkey",
              Coordinate: null
            },
            ProfileDesc:
              "Gold Majesty, 5 km ke pusat kota Bursa, menawarkan kamar-kamar berpendingin ruangan dengan televisi satelit dan minibar. Wi-Fi gratis dan tempat parkir gratis tersedia di hotel.",
            CityId: "BURSA"
          }
        },
        {
          Id: 445321,
          DateTime: "2020-04-06T07:00:00",
          SeqNumber: 3,
          MovementName: "EAT",
          MovementDescription: "Meal",
          Duration: 3600,
          DurationText: "1 hour ",
          ServiceItemId: 11,
          Destination: "BURSA",
          DestinationName: "bursa",
          Note: null,
          Item: {
            Name: "Breakfast Menu",
            Desc: "Breakfast Menu",
            ServiceType: "Movement_eat",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Restaurants/880acfaf-a1f4-4031-8a2b-a36e7e113804bursa.jpg.jpg",
            ImageName: null,
            ServiceItemId: 49607,
            PlaceId: null,
            Address: {
              Id: 11534,
              Address1: "Bursa, Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark: "Bursa, Turkey",
              AreaId: "BURSA",
              Area: {
                Id: "BURSA",
                Name: "bursa"
              },
              City: {
                Id: "BURSA",
                Name: "bursa"
              },
              Region: {
                Id: "BURSA",
                Name: "Bursa"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString: "Bursa, Turkey, bursa, bursa, Bursa, Turkey",
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "BURSA"
          }
        },
        {
          Id: 445322,
          DateTime: "2020-04-06T08:00:00",
          SeqNumber: 4,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "BURSA",
          DestinationName: "bursa",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 445323,
          DateTime: "2020-04-06T08:00:00",
          SeqNumber: 5,
          MovementName: "RECREATION",
          MovementDescription: "Excursion",
          Duration: 14400,
          DurationText: "4 hours ",
          ServiceItemId: 6,
          Destination: "BURSA",
          DestinationName: "bursa",
          Note: "",
          Item: {
            OperationStartTime: "2019-03-12T06:00:00",
            OperationEndTime: "2019-03-12T22:00:00",
            IsSolidStartTime: false,
            Name: "Grand Mosque,Koza Han,Green Mosque & Green Tomb",
            Desc:
              "Grand Mosque / Ulu Jami, Sesi belanja di Koza Han / Silk Market,\nGreen Mosque & Green Tomb, Turkish Delight Factory",
            ServiceType: "Single",
            ImageUrl:
              "https://touressapi.azurewebsites.net/Content/imgSrc/Attractions/7ecb2e9f18ca9ea771b367d07c4e0737.jpg",
            ImageName: null,
            ServiceItemId: 51,
            PlaceId: null,
            Address: {
              Id: 3211,
              Address1: '"Yesil Mh., 16360 Yildirim, Bursa, Turkey"',
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark: '"Yesil Mh., 16360 Yildirim, Bursa, Turkey"',
              AreaId: "BURSA",
              Area: {
                Id: "BURSA",
                Name: "bursa"
              },
              City: {
                Id: "BURSA",
                Name: "bursa"
              },
              Region: {
                Id: "BURSA",
                Name: "Bursa"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                '"Yesil Mh., 16360 Yildirim, Bursa, Turkey", bursa, bursa, Bursa, Turkey',
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "BURSA"
          }
        },
        {
          Id: 445324,
          DateTime: "2020-04-06T12:00:00",
          SeqNumber: 6,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "BURSA",
          DestinationName: "bursa",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 445325,
          DateTime: "2020-04-06T12:00:00",
          SeqNumber: 7,
          MovementName: "EAT",
          MovementDescription: "Meal",
          Duration: 5400,
          DurationText: "1 hour 30 mins",
          ServiceItemId: 11,
          Destination: "BURSA",
          DestinationName: "bursa",
          Note: null,
          Item: {
            Name: "Lunch Menu",
            Desc: "Lunch Menu",
            ServiceType: "Movement_eat",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Restaurants/3e2f7d3b-c84f-4a40-be1c-3f85f4848dc7bursa.jpg.jpg",
            ImageName: null,
            ServiceItemId: 49608,
            PlaceId: null,
            Address: {
              Id: 11534,
              Address1: "Bursa, Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark: "Bursa, Turkey",
              AreaId: "BURSA",
              Area: {
                Id: "BURSA",
                Name: "bursa"
              },
              City: {
                Id: "BURSA",
                Name: "bursa"
              },
              Region: {
                Id: "BURSA",
                Name: "Bursa"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString: "Bursa, Turkey, bursa, bursa, Bursa, Turkey",
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "BURSA"
          }
        },
        {
          Id: 445326,
          DateTime: "2020-04-06T13:30:00",
          SeqNumber: 8,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 19800,
          DurationText: "5 hours 30 mins",
          ServiceItemId: 1,
          Destination: "BURSA",
          DestinationName: "bursa",
          Note: "",
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 0,
          DateTime: "2020-04-06T19:00:00",
          SeqNumber: 9,
          MovementName: "CHECKIN",
          MovementDescription: "Check-in",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 2,
          Destination: "KUSADASI",
          DestinationName: "Kusadasi",
          Note: null,
          Item: {
            Name: "Royal Palace Kusadasi",
            Desc: "Deluxe Room",
            ServiceType: "With_breakfast",
            ImageUrl:
              "https://touressapi.azurewebsites.net/Content/imgSrc/Accommodations/royal-palace.jpg",
            ImageName: null,
            ServiceItemId: 70,
            PlaceId: null,
            Address: {
              Id: 3008,
              Address1:
                "Bayraklidede Mahallesi- Turgut Ozal Blv. No:64- 09400 Kusadasi/Aydin- Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark: "",
              AreaId: "KUSADASI",
              Area: {
                Id: "KUSADASI",
                Name: "Kusadasi"
              },
              City: {
                Id: "KUSADASI",
                Name: "Kusadasi"
              },
              Region: {
                Id: "AYDIN",
                Name: "Aydin"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Bayraklidede Mahallesi- Turgut Ozal Blv. No:64- 09400 Kusadasi/Aydin- Turkey, Kusadasi, Kusadasi, Aydin, Turkey",
              Coordinate: null
            },
            ProfileDesc:
              "Only 1.3 km from the sandy beach- Royal Palace Kusadasi Hotel offers air-conditioned rooms with free Wi-Fi. The property includes a large outdoor pool- fitness centre- sauna and a Turkish bath. The bright rooms of Royal Palace Kusadasi Hotel are decorated with modern furniture. They are equipped with a TV and a refrigerator. All rooms have a balcony with views of the Aegean Sea or the hotel's garden. Breakfast- lunch and dinner are served as an open buffet with a variety of delicious dishes. Drinks are provided by the Manzara Bar and the pool bar. Kusadasi city centre is only 700 metres from the hotel with numerous bars and nightclubs. The beautiful yacht marina is 1 km away. Izmir Adnan Menderes Airport is 70 km from the property.",
            CityId: "KUSADASI"
          }
        },
        {
          Id: 445328,
          DateTime: "2020-04-06T19:30:00",
          SeqNumber: 10,
          MovementName: "EAT",
          MovementDescription: "Meal",
          Duration: 3600,
          DurationText: "1 hour ",
          ServiceItemId: 11,
          Destination: "KUSADASI",
          DestinationName: "Kusadasi",
          Note: null,
          Item: {
            Name: "Dinner Menu",
            Desc: "Dinner Menu",
            ServiceType: "Movement_eat",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Restaurants/a4f1b2c1-a823-4dcc-8b2f-ce295342334dkusadasi.jpg.jpg",
            ImageName: null,
            ServiceItemId: 49612,
            PlaceId: null,
            Address: {
              Id: 10452,
              Address1: "Kusadasi, Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark: "Kusadasi, Turkey",
              AreaId: "KUSADASI",
              Area: {
                Id: "KUSADASI",
                Name: "Kusadasi"
              },
              City: {
                Id: "KUSADASI",
                Name: "Kusadasi"
              },
              Region: {
                Id: "AYDIN",
                Name: "Aydin"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Kusadasi, Turkey, Kusadasi, Kusadasi, Aydin, Turkey",
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "KUSADASI"
          }
        },
        {
          Id: 445329,
          DateTime: "2020-04-06T20:30:00",
          SeqNumber: 11,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "KUSADASI",
          DestinationName: "Kusadasi",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 0,
          DateTime: "2020-04-06T20:30:00",
          SeqNumber: 12,
          MovementName: "DAYEND",
          MovementDescription: "Day end",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 2434,
          Destination: "KUSADASI",
          DestinationName: "Kusadasi",
          Note: null,
          Item: {
            Name: "Royal Palace Kusadasi",
            Desc: "Deluxe Room",
            ServiceType: "With_breakfast",
            ImageUrl:
              "https://touressapi.azurewebsites.net/Content/imgSrc/Accommodations/royal-palace.jpg",
            ImageName: null,
            ServiceItemId: 70,
            PlaceId: null,
            Address: {
              Id: 3008,
              Address1:
                "Bayraklidede Mahallesi- Turgut Ozal Blv. No:64- 09400 Kusadasi/Aydin- Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark: "",
              AreaId: "KUSADASI",
              Area: {
                Id: "KUSADASI",
                Name: "Kusadasi"
              },
              City: {
                Id: "KUSADASI",
                Name: "Kusadasi"
              },
              Region: {
                Id: "AYDIN",
                Name: "Aydin"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Bayraklidede Mahallesi- Turgut Ozal Blv. No:64- 09400 Kusadasi/Aydin- Turkey, Kusadasi, Kusadasi, Aydin, Turkey",
              Coordinate: null
            },
            ProfileDesc:
              "Only 1.3 km from the sandy beach- Royal Palace Kusadasi Hotel offers air-conditioned rooms with free Wi-Fi. The property includes a large outdoor pool- fitness centre- sauna and a Turkish bath. The bright rooms of Royal Palace Kusadasi Hotel are decorated with modern furniture. They are equipped with a TV and a refrigerator. All rooms have a balcony with views of the Aegean Sea or the hotel's garden. Breakfast- lunch and dinner are served as an open buffet with a variety of delicious dishes. Drinks are provided by the Manzara Bar and the pool bar. Kusadasi city centre is only 700 metres from the hotel with numerous bars and nightclubs. The beautiful yacht marina is 1 km away. Izmir Adnan Menderes Airport is 70 km from the property.",
            CityId: "KUSADASI"
          }
        }
      ],
      OrderedItems: [
        {
          ServiceItemId: 70,
          ItemType: "Accommodation",
          ItemName: "Royal Palace Kusadasi - Deluxe Room",
          Description: "Sharing Room",
          Qty: 0,
          IsNeedCheck: false
        },
        {
          ServiceItemId: 70,
          ItemType: "Accommodation",
          ItemName: "Royal Palace Kusadasi - Deluxe Room",
          Description: "Single Room",
          Qty: 0,
          IsNeedCheck: false
        }
      ]
    },
    {
      Day: 4,
      Date: "2020-04-07T00:00:00",
      TourDestinations: [
        {
          TransportationSummary: [],
          AttractionSummary: [
            {
              Name: "Hierapolis & Travertines",
              DateTime: "2020-04-07T16:00:00",
              ServiceItemId: 34,
              Duration: 9000,
              SeqNumber: 0
            }
          ],
          RestaurantSummary: [
            {
              Name: "Dinner Menu",
              DateTime: "2020-04-07T19:00:00",
              ServiceItemId: 49615,
              Duration: 3600,
              SeqNumber: 0
            }
          ],
          TourGuideSummary: [],
          Destination: "PAMUKKALE",
          ImageUrl: "",
          AccommodationSummary: {
            Allocations: {
              SharingRoomPax: 0,
              ChildSharingRoomPax: 0,
              SingleRoomPax: 0,
              ChildSingleRoomPax: 0,
              ExtraBedPax: 0,
              ChildExtraBedPax: 0,
              SharingBedPax: 0,
              NoBedPax: 0
            },
            Name: "Ninova Thermal Pamukkale",
            Address:
              "Karahayit Mah. 125 Cami Sokak No:26 Pamukkale- 20290 Pamukkale/Denizli- Turkey",
            RoomType: "Double/Twin Sharing",
            RoomName: "Twin Bed Room",
            RoomService: "With_breakfast",
            ServiceItemId: 36357,
            AccommodationProfileId: 20,
            SeqNumber: 0,
            DateTime: "2020-04-07T00:00:00"
          }
        },
        {
          TransportationSummary: [],
          AttractionSummary: [
            {
              Name: "Kusadasi Tour",
              DateTime: "2020-04-07T08:00:00",
              ServiceItemId: 52,
              Duration: 14400,
              SeqNumber: 0
            }
          ],
          RestaurantSummary: [
            {
              Name: "Breakfast Menu",
              DateTime: "2020-04-07T06:30:00",
              ServiceItemId: 49610,
              Duration: 5400,
              SeqNumber: 0
            },
            {
              Name: "Lunch Menu",
              DateTime: "2020-04-07T12:00:00",
              ServiceItemId: 49611,
              Duration: 3600,
              SeqNumber: 0
            }
          ],
          TourGuideSummary: [],
          Destination: "KUSADASI",
          ImageUrl: "",
          AccommodationSummary: null
        }
      ],
      TourSummary: null,
      Movements: [
        {
          Id: 0,
          DateTime: "2020-04-07T06:30:00",
          SeqNumber: 1,
          MovementName: "DAYSTART",
          MovementDescription: "Day start",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 2433,
          Destination: "KUSADASI",
          DestinationName: "Kusadasi",
          Note: null,
          Item: {
            Name: "Royal Palace Kusadasi",
            Desc: "Deluxe Room",
            ServiceType: "With_breakfast",
            ImageUrl:
              "https://touressapi.azurewebsites.net/Content/imgSrc/Accommodations/royal-palace.jpg",
            ImageName: null,
            ServiceItemId: 70,
            PlaceId: null,
            Address: {
              Id: 3008,
              Address1:
                "Bayraklidede Mahallesi- Turgut Ozal Blv. No:64- 09400 Kusadasi/Aydin- Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark: "",
              AreaId: "KUSADASI",
              Area: {
                Id: "KUSADASI",
                Name: "Kusadasi"
              },
              City: {
                Id: "KUSADASI",
                Name: "Kusadasi"
              },
              Region: {
                Id: "AYDIN",
                Name: "Aydin"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Bayraklidede Mahallesi- Turgut Ozal Blv. No:64- 09400 Kusadasi/Aydin- Turkey, Kusadasi, Kusadasi, Aydin, Turkey",
              Coordinate: null
            },
            ProfileDesc:
              "Only 1.3 km from the sandy beach- Royal Palace Kusadasi Hotel offers air-conditioned rooms with free Wi-Fi. The property includes a large outdoor pool- fitness centre- sauna and a Turkish bath. The bright rooms of Royal Palace Kusadasi Hotel are decorated with modern furniture. They are equipped with a TV and a refrigerator. All rooms have a balcony with views of the Aegean Sea or the hotel's garden. Breakfast- lunch and dinner are served as an open buffet with a variety of delicious dishes. Drinks are provided by the Manzara Bar and the pool bar. Kusadasi city centre is only 700 metres from the hotel with numerous bars and nightclubs. The beautiful yacht marina is 1 km away. Izmir Adnan Menderes Airport is 70 km from the property.",
            CityId: "KUSADASI"
          }
        },
        {
          Id: 0,
          DateTime: "2020-04-07T06:30:00",
          SeqNumber: 2,
          MovementName: "CHECKOUT",
          MovementDescription: "Check-out",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 3,
          Destination: "KUSADASI",
          DestinationName: "Kusadasi",
          Note: null,
          Item: {
            Name: "Royal Palace Kusadasi",
            Desc: "Deluxe Room",
            ServiceType: "With_breakfast",
            ImageUrl:
              "https://touressapi.azurewebsites.net/Content/imgSrc/Accommodations/royal-palace.jpg",
            ImageName: null,
            ServiceItemId: 70,
            PlaceId: null,
            Address: {
              Id: 3008,
              Address1:
                "Bayraklidede Mahallesi- Turgut Ozal Blv. No:64- 09400 Kusadasi/Aydin- Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark: "",
              AreaId: "KUSADASI",
              Area: {
                Id: "KUSADASI",
                Name: "Kusadasi"
              },
              City: {
                Id: "KUSADASI",
                Name: "Kusadasi"
              },
              Region: {
                Id: "AYDIN",
                Name: "Aydin"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Bayraklidede Mahallesi- Turgut Ozal Blv. No:64- 09400 Kusadasi/Aydin- Turkey, Kusadasi, Kusadasi, Aydin, Turkey",
              Coordinate: null
            },
            ProfileDesc:
              "Only 1.3 km from the sandy beach- Royal Palace Kusadasi Hotel offers air-conditioned rooms with free Wi-Fi. The property includes a large outdoor pool- fitness centre- sauna and a Turkish bath. The bright rooms of Royal Palace Kusadasi Hotel are decorated with modern furniture. They are equipped with a TV and a refrigerator. All rooms have a balcony with views of the Aegean Sea or the hotel's garden. Breakfast- lunch and dinner are served as an open buffet with a variety of delicious dishes. Drinks are provided by the Manzara Bar and the pool bar. Kusadasi city centre is only 700 metres from the hotel with numerous bars and nightclubs. The beautiful yacht marina is 1 km away. Izmir Adnan Menderes Airport is 70 km from the property.",
            CityId: "KUSADASI"
          }
        },
        {
          Id: 445333,
          DateTime: "2020-04-07T06:30:00",
          SeqNumber: 3,
          MovementName: "EAT",
          MovementDescription: "Meal",
          Duration: 5400,
          DurationText: "1 hour 30 mins",
          ServiceItemId: 11,
          Destination: "KUSADASI",
          DestinationName: "Kusadasi",
          Note: null,
          Item: {
            Name: "Breakfast Menu",
            Desc: "Breakfast Menu",
            ServiceType: "Movement_eat",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Restaurants/f5849a79-c978-40d9-853d-b263aba5041ckusadasi.jpg.jpg",
            ImageName: null,
            ServiceItemId: 49610,
            PlaceId: null,
            Address: {
              Id: 10452,
              Address1: "Kusadasi, Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark: "Kusadasi, Turkey",
              AreaId: "KUSADASI",
              Area: {
                Id: "KUSADASI",
                Name: "Kusadasi"
              },
              City: {
                Id: "KUSADASI",
                Name: "Kusadasi"
              },
              Region: {
                Id: "AYDIN",
                Name: "Aydin"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Kusadasi, Turkey, Kusadasi, Kusadasi, Aydin, Turkey",
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "KUSADASI"
          }
        },
        {
          Id: 445334,
          DateTime: "2020-04-07T08:00:00",
          SeqNumber: 4,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "KUSADASI",
          DestinationName: "Kusadasi",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 445335,
          DateTime: "2020-04-07T08:00:00",
          SeqNumber: 5,
          MovementName: "RECREATION",
          MovementDescription: "Excursion",
          Duration: 14400,
          DurationText: "4 hours ",
          ServiceItemId: 6,
          Destination: "KUSADASI",
          DestinationName: "Kusadasi",
          Note: "",
          Item: {
            OperationStartTime: "2019-03-12T08:00:00",
            OperationEndTime: "2019-03-12T16:00:00",
            IsSolidStartTime: false,
            Name: "Kusadasi Tour",
            Desc: "Ancient City, Leather Factory",
            ServiceType: "Package",
            ImageUrl:
              "https://touressapi.azurewebsites.net/Content/imgSrc/Attractions/ephesus-turkey.jpg",
            ImageName: null,
            ServiceItemId: 52,
            PlaceId: null,
            Address: {
              Id: 3219,
              Address1:
                '"Atat�rk Mahallesi, Ephesus, U?ur Mumcu Sevgi Yolu, Sel�uk/Provinsi ?zmir, Turki"',
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                '"Atat�rk Mahallesi, Ephesus, U?ur Mumcu Sevgi Yolu, Sel�uk/Provinsi ?zmir, Turki"',
              AreaId: "KUSADASIMAVIYAKASITESIMAVIYAKASITESI",
              Area: {
                Id: "KUSADASIMAVIYAKASITESIMAVIYAKASITESI",
                Name: "Maviyaka Sitesi"
              },
              City: {
                Id: "KUSADASIMAVIYAKASITESI",
                Name: "Maviyaka Sitesi"
              },
              Region: {
                Id: "KUSADASI",
                Name: "Kusadasi"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                '"Atat�rk Mahallesi, Ephesus, U?ur Mumcu Sevgi Yolu, Sel�uk/Provinsi ?zmir, Turki", Maviyaka Sitesi, Maviyaka Sitesi, Kusadasi, Turkey',
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "KUSADASIMAVIYAKASITESI"
          }
        },
        {
          Id: 445336,
          DateTime: "2020-04-07T12:00:00",
          SeqNumber: 6,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "KUSADASI",
          DestinationName: "Kusadasi",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 445337,
          DateTime: "2020-04-07T12:00:00",
          SeqNumber: 7,
          MovementName: "EAT",
          MovementDescription: "Meal",
          Duration: 3600,
          DurationText: "1 hour ",
          ServiceItemId: 11,
          Destination: "KUSADASI",
          DestinationName: "Kusadasi",
          Note: null,
          Item: {
            Name: "Lunch Menu",
            Desc: "Lunch Menu",
            ServiceType: "Movement_eat",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Restaurants/06e6b5bf-68f7-437a-a47f-e5243d7f1566kusadasi.jpg.jpg",
            ImageName: null,
            ServiceItemId: 49611,
            PlaceId: null,
            Address: {
              Id: 10452,
              Address1: "Kusadasi, Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark: "Kusadasi, Turkey",
              AreaId: "KUSADASI",
              Area: {
                Id: "KUSADASI",
                Name: "Kusadasi"
              },
              City: {
                Id: "KUSADASI",
                Name: "Kusadasi"
              },
              Region: {
                Id: "AYDIN",
                Name: "Aydin"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Kusadasi, Turkey, Kusadasi, Kusadasi, Aydin, Turkey",
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "KUSADASI"
          }
        },
        {
          Id: 445338,
          DateTime: "2020-04-07T13:00:00",
          SeqNumber: 8,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 10800,
          DurationText: "3 hours ",
          ServiceItemId: 1,
          Destination: "KUSADASI",
          DestinationName: "Kusadasi",
          Note: "",
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 445339,
          DateTime: "2020-04-07T16:00:00",
          SeqNumber: 9,
          MovementName: "RECREATION",
          MovementDescription: "Excursion",
          Duration: 9000,
          DurationText: "2 hours 30 mins",
          ServiceItemId: 6,
          Destination: "PAMUKKALE",
          DestinationName: "Pamukkale",
          Note: "",
          Item: {
            OperationStartTime: "2019-12-10T08:00:00",
            OperationEndTime: "2019-12-10T18:00:00",
            IsSolidStartTime: false,
            Name: "Hierapolis & Travertines",
            Desc:
              '"sebuah kota kuno Romawi yang reruntuhannya berdekatan dengan kota Pamukkale modern dan saat ini terdiri dari sebuah museum arkeologi yang ditunjuk sebagai Situs Warisan Dunia UNESCO.',
            ServiceType: "Single",
            ImageUrl:
              "https://touressapi.azurewebsites.net//Content/imgSrc/Attractions/0704f28a-ebd3-4899-aad2-7cb01e821854Hierapolis.jpg.jpg",
            ImageName: null,
            ServiceItemId: 34,
            PlaceId: null,
            Address: {
              Id: 11545,
              Address1: '"20280 Pamukkale, Denizli, Turkey"',
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark: '"20280 Pamukkale, Denizli, Turkey"',
              AreaId: "PAMUKKALE",
              Area: {
                Id: "PAMUKKALE",
                Name: "Pamukkale"
              },
              City: {
                Id: "PAMUKKALE",
                Name: "Pamukkale"
              },
              Region: {
                Id: "DENIZLI",
                Name: "Denizli"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                '"20280 Pamukkale, Denizli, Turkey", Pamukkale, Pamukkale, Denizli, Turkey',
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "PAMUKKALE"
          }
        },
        {
          Id: 445340,
          DateTime: "2020-04-07T18:30:00",
          SeqNumber: 10,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "PAMUKKALE",
          DestinationName: "Pamukkale",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 0,
          DateTime: "2020-04-07T18:30:00",
          SeqNumber: 11,
          MovementName: "CHECKIN",
          MovementDescription: "Check-in",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 2,
          Destination: "PAMUKKALE",
          DestinationName: "Pamukkale",
          Note: null,
          Item: {
            Name: "Ninova Thermal Pamukkale",
            Desc: "Twin Bed Room",
            ServiceType: "With_breakfast",
            ImageUrl:
              "https://touressapi.azurewebsites.net/Content/imgSrc/Accommodations/47601100.jpg",
            ImageName: null,
            ServiceItemId: 36357,
            PlaceId: null,
            Address: {
              Id: 9535,
              Address1:
                "Karahayit Mah. 125 Cami Sokak No:26 Pamukkale- 20290 Pamukkale/Denizli- Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark: "",
              AreaId: "PAMUKKALE",
              Area: {
                Id: "PAMUKKALE",
                Name: "Pamukkale"
              },
              City: {
                Id: "PAMUKKALE",
                Name: "Pamukkale"
              },
              Region: {
                Id: "DENIZLI",
                Name: "Denizli"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Karahayit Mah. 125 Cami Sokak No:26 Pamukkale- 20290 Pamukkale/Denizli- Turkey, Pamukkale, Pamukkale, Denizli, Turkey",
              Coordinate: null
            },
            ProfileDesc:
              "Located in Pamukkale- the hotel is within easy reach of Hierapolis and Pamukkale Thermal Pools. It also offers meeting rooms- an outdoor pool and a 24-hour reception. The hotel has 90 rooms and has been recently refurbished.",
            CityId: "PAMUKKALE"
          }
        },
        {
          Id: 445342,
          DateTime: "2020-04-07T19:00:00",
          SeqNumber: 12,
          MovementName: "EAT",
          MovementDescription: "Meal",
          Duration: 3600,
          DurationText: "1 hour ",
          ServiceItemId: 11,
          Destination: "PAMUKKALE",
          DestinationName: "Pamukkale",
          Note: null,
          Item: {
            Name: "Dinner Menu",
            Desc: "Dinner Menu",
            ServiceType: "Movement_eat",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Restaurants/aa9eb886-b9ca-4f6c-8283-2f4ae9fa5372pamukkale.jpg.jpg",
            ImageName: null,
            ServiceItemId: 49615,
            PlaceId: null,
            Address: {
              Id: 10453,
              Address1: "Pamukkale, Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark: "Pamukkale, Turkey",
              AreaId: "PAMUKKALE",
              Area: {
                Id: "PAMUKKALE",
                Name: "Pamukkale"
              },
              City: {
                Id: "PAMUKKALE",
                Name: "Pamukkale"
              },
              Region: {
                Id: "DENIZLI",
                Name: "Denizli"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Pamukkale, Turkey, Pamukkale, Pamukkale, Denizli, Turkey",
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "PAMUKKALE"
          }
        },
        {
          Id: 445343,
          DateTime: "2020-04-07T20:00:00",
          SeqNumber: 13,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "PAMUKKALE",
          DestinationName: "Pamukkale",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 0,
          DateTime: "2020-04-07T20:00:00",
          SeqNumber: 14,
          MovementName: "DAYEND",
          MovementDescription: "Day end",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 2434,
          Destination: "PAMUKKALE",
          DestinationName: "Pamukkale",
          Note: null,
          Item: {
            Name: "Ninova Thermal Pamukkale",
            Desc: "Twin Bed Room",
            ServiceType: "With_breakfast",
            ImageUrl:
              "https://touressapi.azurewebsites.net/Content/imgSrc/Accommodations/47601100.jpg",
            ImageName: null,
            ServiceItemId: 36357,
            PlaceId: null,
            Address: {
              Id: 9535,
              Address1:
                "Karahayit Mah. 125 Cami Sokak No:26 Pamukkale- 20290 Pamukkale/Denizli- Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark: "",
              AreaId: "PAMUKKALE",
              Area: {
                Id: "PAMUKKALE",
                Name: "Pamukkale"
              },
              City: {
                Id: "PAMUKKALE",
                Name: "Pamukkale"
              },
              Region: {
                Id: "DENIZLI",
                Name: "Denizli"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Karahayit Mah. 125 Cami Sokak No:26 Pamukkale- 20290 Pamukkale/Denizli- Turkey, Pamukkale, Pamukkale, Denizli, Turkey",
              Coordinate: null
            },
            ProfileDesc:
              "Located in Pamukkale- the hotel is within easy reach of Hierapolis and Pamukkale Thermal Pools. It also offers meeting rooms- an outdoor pool and a 24-hour reception. The hotel has 90 rooms and has been recently refurbished.",
            CityId: "PAMUKKALE"
          }
        }
      ],
      OrderedItems: [
        {
          ServiceItemId: 36357,
          ItemType: "Accommodation",
          ItemName: "Ninova Thermal Pamukkale - Twin Bed Room",
          Description: "Sharing Room",
          Qty: 0,
          IsNeedCheck: false
        },
        {
          ServiceItemId: 36357,
          ItemType: "Accommodation",
          ItemName: "Ninova Thermal Pamukkale - Twin Bed Room",
          Description: "Single Room",
          Qty: 0,
          IsNeedCheck: false
        }
      ]
    },
    {
      Day: 5,
      Date: "2020-04-08T00:00:00",
      TourDestinations: [
        {
          TransportationSummary: [],
          AttractionSummary: [],
          RestaurantSummary: [
            {
              Name: "Dinner Menu",
              DateTime: "2020-04-08T20:00:00",
              ServiceItemId: 49618,
              Duration: 3600,
              SeqNumber: 0
            }
          ],
          TourGuideSummary: [],
          Destination: "CAPPADOCIA",
          ImageUrl: "",
          AccommodationSummary: {
            Allocations: {
              SharingRoomPax: 0,
              ChildSharingRoomPax: 0,
              SingleRoomPax: 0,
              ChildSingleRoomPax: 0,
              ExtraBedPax: 0,
              ChildExtraBedPax: 0,
              SharingBedPax: 0,
              NoBedPax: 0
            },
            Name: "Dinler Nevsehir",
            Address:
              '"Urgup - Aksaray Yolu Caddesi, 2 km, 50100 Nevsehir, Turkey"',
            RoomType: "Double/Twin Sharing",
            RoomName: "Club Room",
            RoomService: "With_breakfast",
            ServiceItemId: 36364,
            AccommodationProfileId: 1276,
            SeqNumber: 0,
            DateTime: "2020-04-08T00:00:00"
          }
        },
        {
          TransportationSummary: [],
          AttractionSummary: [],
          RestaurantSummary: [
            {
              Name: "Breakfast Menu",
              DateTime: "2020-04-08T06:30:00",
              ServiceItemId: 49613,
              Duration: 3600,
              SeqNumber: 0
            },
            {
              Name: "Lunch Menu",
              DateTime: "2020-04-08T12:00:00",
              ServiceItemId: 49614,
              Duration: 3600,
              SeqNumber: 0
            }
          ],
          TourGuideSummary: [],
          Destination: "PAMUKKALE",
          ImageUrl: "",
          AccommodationSummary: null
        },
        {
          TransportationSummary: [],
          AttractionSummary: [
            {
              Name: "Mevlana Museum, Caravan Sara",
              DateTime: "2020-04-08T13:00:00",
              ServiceItemId: 46859,
              Duration: 10800,
              SeqNumber: 0
            }
          ],
          RestaurantSummary: [],
          TourGuideSummary: [],
          Destination: "KONYAKONYA",
          ImageUrl: null,
          AccommodationSummary: null
        }
      ],
      TourSummary: null,
      Movements: [
        {
          Id: 0,
          DateTime: "2020-04-08T06:30:00",
          SeqNumber: 1,
          MovementName: "DAYSTART",
          MovementDescription: "Day start",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 2433,
          Destination: "PAMUKKALE",
          DestinationName: "Pamukkale",
          Note: null,
          Item: {
            Name: "Ninova Thermal Pamukkale",
            Desc: "Twin Bed Room",
            ServiceType: "With_breakfast",
            ImageUrl:
              "https://touressapi.azurewebsites.net/Content/imgSrc/Accommodations/47601100.jpg",
            ImageName: null,
            ServiceItemId: 36357,
            PlaceId: null,
            Address: {
              Id: 9535,
              Address1:
                "Karahayit Mah. 125 Cami Sokak No:26 Pamukkale- 20290 Pamukkale/Denizli- Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark: "",
              AreaId: "PAMUKKALE",
              Area: {
                Id: "PAMUKKALE",
                Name: "Pamukkale"
              },
              City: {
                Id: "PAMUKKALE",
                Name: "Pamukkale"
              },
              Region: {
                Id: "DENIZLI",
                Name: "Denizli"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Karahayit Mah. 125 Cami Sokak No:26 Pamukkale- 20290 Pamukkale/Denizli- Turkey, Pamukkale, Pamukkale, Denizli, Turkey",
              Coordinate: null
            },
            ProfileDesc:
              "Located in Pamukkale- the hotel is within easy reach of Hierapolis and Pamukkale Thermal Pools. It also offers meeting rooms- an outdoor pool and a 24-hour reception. The hotel has 90 rooms and has been recently refurbished.",
            CityId: "PAMUKKALE"
          }
        },
        {
          Id: 0,
          DateTime: "2020-04-08T06:30:00",
          SeqNumber: 2,
          MovementName: "CHECKOUT",
          MovementDescription: "Check-out",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 3,
          Destination: "PAMUKKALE",
          DestinationName: "Pamukkale",
          Note: null,
          Item: {
            Name: "Ninova Thermal Pamukkale",
            Desc: "Twin Bed Room",
            ServiceType: "With_breakfast",
            ImageUrl:
              "https://touressapi.azurewebsites.net/Content/imgSrc/Accommodations/47601100.jpg",
            ImageName: null,
            ServiceItemId: 36357,
            PlaceId: null,
            Address: {
              Id: 9535,
              Address1:
                "Karahayit Mah. 125 Cami Sokak No:26 Pamukkale- 20290 Pamukkale/Denizli- Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark: "",
              AreaId: "PAMUKKALE",
              Area: {
                Id: "PAMUKKALE",
                Name: "Pamukkale"
              },
              City: {
                Id: "PAMUKKALE",
                Name: "Pamukkale"
              },
              Region: {
                Id: "DENIZLI",
                Name: "Denizli"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Karahayit Mah. 125 Cami Sokak No:26 Pamukkale- 20290 Pamukkale/Denizli- Turkey, Pamukkale, Pamukkale, Denizli, Turkey",
              Coordinate: null
            },
            ProfileDesc:
              "Located in Pamukkale- the hotel is within easy reach of Hierapolis and Pamukkale Thermal Pools. It also offers meeting rooms- an outdoor pool and a 24-hour reception. The hotel has 90 rooms and has been recently refurbished.",
            CityId: "PAMUKKALE"
          }
        },
        {
          Id: 445347,
          DateTime: "2020-04-08T06:30:00",
          SeqNumber: 3,
          MovementName: "EAT",
          MovementDescription: "Meal",
          Duration: 3600,
          DurationText: "1 hour ",
          ServiceItemId: 11,
          Destination: "PAMUKKALE",
          DestinationName: "Pamukkale",
          Note: null,
          Item: {
            Name: "Breakfast Menu",
            Desc: "Breakfast Menu",
            ServiceType: "Movement_eat",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Restaurants/e98551e6-d212-48db-9cb8-786fb850922dpamukkale.jpg.jpg",
            ImageName: null,
            ServiceItemId: 49613,
            PlaceId: null,
            Address: {
              Id: 10453,
              Address1: "Pamukkale, Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark: "Pamukkale, Turkey",
              AreaId: "PAMUKKALE",
              Area: {
                Id: "PAMUKKALE",
                Name: "Pamukkale"
              },
              City: {
                Id: "PAMUKKALE",
                Name: "Pamukkale"
              },
              Region: {
                Id: "DENIZLI",
                Name: "Denizli"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Pamukkale, Turkey, Pamukkale, Pamukkale, Denizli, Turkey",
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "PAMUKKALE"
          }
        },
        {
          Id: 445348,
          DateTime: "2020-04-08T07:30:00",
          SeqNumber: 4,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 16200,
          DurationText: "4 hours 30 mins",
          ServiceItemId: 1,
          Destination: "PAMUKKALE",
          DestinationName: "Pamukkale",
          Note: "",
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 445349,
          DateTime: "2020-04-08T12:00:00",
          SeqNumber: 5,
          MovementName: "EAT",
          MovementDescription: "Meal",
          Duration: 3600,
          DurationText: "1 hour ",
          ServiceItemId: 11,
          Destination: "PAMUKKALE",
          DestinationName: "Pamukkale",
          Note: null,
          Item: {
            Name: "Lunch Menu",
            Desc: "Lunch Menu",
            ServiceType: "Movement_eat",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Restaurants/e57a4c5b-71e8-4c6b-bfb9-4f5cd130324bpamukkale.jpg.jpg",
            ImageName: null,
            ServiceItemId: 49614,
            PlaceId: null,
            Address: {
              Id: 10453,
              Address1: "Pamukkale, Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark: "Pamukkale, Turkey",
              AreaId: "PAMUKKALE",
              Area: {
                Id: "PAMUKKALE",
                Name: "Pamukkale"
              },
              City: {
                Id: "PAMUKKALE",
                Name: "Pamukkale"
              },
              Region: {
                Id: "DENIZLI",
                Name: "Denizli"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Pamukkale, Turkey, Pamukkale, Pamukkale, Denizli, Turkey",
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "PAMUKKALE"
          }
        },
        {
          Id: 445350,
          DateTime: "2020-04-08T13:00:00",
          SeqNumber: 6,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "KONYAKONYA",
          DestinationName: "Konya",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 445351,
          DateTime: "2020-04-08T13:00:00",
          SeqNumber: 7,
          MovementName: "RECREATION",
          MovementDescription: "Excursion",
          Duration: 10800,
          DurationText: "3 hours ",
          ServiceItemId: 6,
          Destination: "KONYAKONYA",
          DestinationName: "Konya",
          Note: "",
          Item: {
            OperationStartTime: "2019-03-12T07:00:00",
            OperationEndTime: "2019-03-12T22:00:00",
            IsSolidStartTime: false,
            Name: "Mevlana Museum, Caravan Sara",
            Desc: "Mevlana Museum, Caravan Sara",
            ServiceType: "Single",
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: 46859,
            PlaceId: null,
            Address: {
              Id: 3205,
              Address1:
                "Aziziye Mah., Mevlana Cd. No:1, 42030 Karatay/Konya, Turkey",
              Address2: null,
              Address3: null,
              PostalCode: "",
              Landmark:
                "Aziziye Mah., Mevlana Cd. No:1, 42030 Karatay/Konya, Turkey",
              AreaId: "KONYAKONYAKONYA",
              Area: {
                Id: "KONYAKONYAKONYA",
                Name: "Konya"
              },
              City: {
                Id: "KONYAKONYA",
                Name: "Konya"
              },
              Region: {
                Id: "KONYA",
                Name: "Konya"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Aziziye Mah., Mevlana Cd. No:1, 42030 Karatay/Konya, Turkey, Konya, Konya, Konya, Turkey",
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "KONYAKONYA"
          }
        },
        {
          Id: 445352,
          DateTime: "2020-04-08T16:00:00",
          SeqNumber: 8,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 12600,
          DurationText: "3 hours 30 mins",
          ServiceItemId: 1,
          Destination: "KONYAKONYA",
          DestinationName: "Konya",
          Note: "",
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 0,
          DateTime: "2020-04-08T19:30:00",
          SeqNumber: 9,
          MovementName: "CHECKIN",
          MovementDescription: "Check-in",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 2,
          Destination: "CAPPADOCIA",
          DestinationName: "Cappadocia",
          Note: null,
          Item: {
            Name: "Dinler Nevsehir",
            Desc: "Club Room",
            ServiceType: "With_breakfast",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Accommodations/5edce02f-ce80-4c17-8918-3d2e38bf440ddinler.jpg.jpg",
            ImageName: null,
            ServiceItemId: 36364,
            PlaceId: null,
            Address: {
              Id: 11978,
              Address1: "Dinler Hotels - Nevsehir",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Esentepe, Urgup Yolu Uzeri 2. Km, 50100 Nevsehir Merkez/Nevsehir, Turki",
              AreaId: "CAPPADOCIA",
              Area: {
                Id: "CAPPADOCIA",
                Name: "Cappadocia"
              },
              City: {
                Id: "CAPPADOCIA",
                Name: "Cappadocia"
              },
              Region: {
                Id: "URGUP",
                Name: "Urgup"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Dinler Hotels - Nevsehir, Cappadocia, Cappadocia, Urgup, Turkey",
              Coordinate: null
            },
            ProfileDesc:
              '"Offering indoor and outdoor pools, Dinler Hotels Nevsehir has a spa including Turkish bath, sauna and gym. Set in the Cappadocia region, it also has a children�s pool and play areas."',
            CityId: "CAPPADOCIA"
          }
        },
        {
          Id: 445354,
          DateTime: "2020-04-08T20:00:00",
          SeqNumber: 10,
          MovementName: "EAT",
          MovementDescription: "Meal",
          Duration: 3600,
          DurationText: "1 hour ",
          ServiceItemId: 11,
          Destination: "CAPPADOCIA",
          DestinationName: "Cappadocia",
          Note: null,
          Item: {
            Name: "Dinner Menu",
            Desc: "Dinner Menu",
            ServiceType: "Movement_eat",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Restaurants/8d82c49f-4635-425a-9cf1-1ec781701ee2cappadocia.jpg.jpg",
            ImageName: null,
            ServiceItemId: 49618,
            PlaceId: null,
            Address: {
              Id: 11974,
              Address1:
                "Esentepe, Urgup Yolu Uzeri 2. Km, 50100 Nevsehir Merkez/Nevsehir, Turki",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Esentepe, Urgup Yolu Uzeri 2. Km, 50100 Nevsehir Merkez/Nevsehir, Turki",
              AreaId: "CAPPADOCIA",
              Area: {
                Id: "CAPPADOCIA",
                Name: "Cappadocia"
              },
              City: {
                Id: "CAPPADOCIA",
                Name: "Cappadocia"
              },
              Region: {
                Id: "URGUP",
                Name: "Urgup"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Esentepe, Urgup Yolu Uzeri 2. Km, 50100 Nevsehir Merkez/Nevsehir, Turki, Cappadocia, Cappadocia, Urgup, Turkey",
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "CAPPADOCIA"
          }
        },
        {
          Id: 445355,
          DateTime: "2020-04-08T21:00:00",
          SeqNumber: 11,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "CAPPADOCIA",
          DestinationName: "Cappadocia",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 0,
          DateTime: "2020-04-08T21:00:00",
          SeqNumber: 12,
          MovementName: "DAYEND",
          MovementDescription: "Day end",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 2434,
          Destination: "CAPPADOCIA",
          DestinationName: "Cappadocia",
          Note: null,
          Item: {
            Name: "Dinler Nevsehir",
            Desc: "Club Room",
            ServiceType: "With_breakfast",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Accommodations/5edce02f-ce80-4c17-8918-3d2e38bf440ddinler.jpg.jpg",
            ImageName: null,
            ServiceItemId: 36364,
            PlaceId: null,
            Address: {
              Id: 11978,
              Address1: "Dinler Hotels - Nevsehir",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Esentepe, Urgup Yolu Uzeri 2. Km, 50100 Nevsehir Merkez/Nevsehir, Turki",
              AreaId: "CAPPADOCIA",
              Area: {
                Id: "CAPPADOCIA",
                Name: "Cappadocia"
              },
              City: {
                Id: "CAPPADOCIA",
                Name: "Cappadocia"
              },
              Region: {
                Id: "URGUP",
                Name: "Urgup"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Dinler Hotels - Nevsehir, Cappadocia, Cappadocia, Urgup, Turkey",
              Coordinate: null
            },
            ProfileDesc:
              '"Offering indoor and outdoor pools, Dinler Hotels Nevsehir has a spa including Turkish bath, sauna and gym. Set in the Cappadocia region, it also has a children�s pool and play areas."',
            CityId: "CAPPADOCIA"
          }
        }
      ],
      OrderedItems: [
        {
          ServiceItemId: 36364,
          ItemType: "Accommodation",
          ItemName: "Dinler Nevsehir - Club Room",
          Description: "Sharing Room",
          Qty: 0,
          IsNeedCheck: false
        },
        {
          ServiceItemId: 36364,
          ItemType: "Accommodation",
          ItemName: "Dinler Nevsehir - Club Room",
          Description: "Single Room",
          Qty: 0,
          IsNeedCheck: false
        }
      ]
    },
    {
      Day: 6,
      Date: "2020-04-09T00:00:00",
      TourDestinations: [
        {
          TransportationSummary: [],
          AttractionSummary: [
            {
              Name: "Cappadocia tour rute Pasabag Valley",
              DateTime: "2020-04-09T09:00:00",
              ServiceItemId: 46235,
              Duration: 10800,
              SeqNumber: 0
            },
            {
              Name: "Cappadocia Tour",
              DateTime: "2020-04-09T13:30:00",
              ServiceItemId: 43873,
              Duration: 12600,
              SeqNumber: 0
            }
          ],
          RestaurantSummary: [
            {
              Name: "Breakfast Menu",
              DateTime: "2020-04-09T07:00:00",
              ServiceItemId: 49616,
              Duration: 7200,
              SeqNumber: 0
            },
            {
              Name: "Lunch Menu",
              DateTime: "2020-04-09T12:00:00",
              ServiceItemId: 49617,
              Duration: 5400,
              SeqNumber: 0
            },
            {
              Name: "Dinner Menu",
              DateTime: "2020-04-09T18:00:00",
              ServiceItemId: 49618,
              Duration: 3600,
              SeqNumber: 0
            }
          ],
          TourGuideSummary: [],
          Destination: "CAPPADOCIA",
          ImageUrl: "",
          AccommodationSummary: {
            Allocations: {
              SharingRoomPax: 0,
              ChildSharingRoomPax: 0,
              SingleRoomPax: 0,
              ChildSingleRoomPax: 0,
              ExtraBedPax: 0,
              ChildExtraBedPax: 0,
              SharingBedPax: 0,
              NoBedPax: 0
            },
            Name: "Dinler Nevsehir",
            Address:
              '"Urgup - Aksaray Yolu Caddesi, 2 km, 50100 Nevsehir, Turkey"',
            RoomType: "Double/Twin Sharing",
            RoomName: "Club Room",
            RoomService: "With_breakfast",
            ServiceItemId: 36364,
            AccommodationProfileId: 1276,
            SeqNumber: 0,
            DateTime: "2020-04-09T00:00:00"
          }
        }
      ],
      TourSummary: null,
      Movements: [
        {
          Id: 0,
          DateTime: "2020-04-09T04:00:00",
          SeqNumber: 1,
          MovementName: "DAYSTART",
          MovementDescription: "Day start",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 2433,
          Destination: "CAPPADOCIA",
          DestinationName: "Cappadocia",
          Note: null,
          Item: {
            Name: "Dinler Nevsehir",
            Desc: "Club Room",
            ServiceType: "With_breakfast",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Accommodations/5edce02f-ce80-4c17-8918-3d2e38bf440ddinler.jpg.jpg",
            ImageName: null,
            ServiceItemId: 36364,
            PlaceId: null,
            Address: {
              Id: 11978,
              Address1: "Dinler Hotels - Nevsehir",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Esentepe, Urgup Yolu Uzeri 2. Km, 50100 Nevsehir Merkez/Nevsehir, Turki",
              AreaId: "CAPPADOCIA",
              Area: {
                Id: "CAPPADOCIA",
                Name: "Cappadocia"
              },
              City: {
                Id: "CAPPADOCIA",
                Name: "Cappadocia"
              },
              Region: {
                Id: "URGUP",
                Name: "Urgup"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Dinler Hotels - Nevsehir, Cappadocia, Cappadocia, Urgup, Turkey",
              Coordinate: null
            },
            ProfileDesc:
              '"Offering indoor and outdoor pools, Dinler Hotels Nevsehir has a spa including Turkish bath, sauna and gym. Set in the Cappadocia region, it also has a children�s pool and play areas."',
            CityId: "CAPPADOCIA"
          }
        },
        {
          Id: 445358,
          DateTime: "2020-04-09T04:00:00",
          SeqNumber: 2,
          MovementName: "FREETIME",
          MovementDescription: "Free Time",
          Duration: 10800,
          DurationText: "3 hours ",
          ServiceItemId: 12,
          Destination: "CAPPADOCIA",
          DestinationName: "Cappadocia",
          Note: "Optional Tour 1 – Hot Air Balloon",
          Item: {
            Name: null,
            Desc: null,
            ServiceType: "Movement_free_time",
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: 36364,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 445359,
          DateTime: "2020-04-09T07:00:00",
          SeqNumber: 3,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "CAPPADOCIA",
          DestinationName: "Cappadocia",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 445360,
          DateTime: "2020-04-09T07:00:00",
          SeqNumber: 4,
          MovementName: "EAT",
          MovementDescription: "Meal",
          Duration: 7200,
          DurationText: "2 hours ",
          ServiceItemId: 11,
          Destination: "CAPPADOCIA",
          DestinationName: "Cappadocia",
          Note: null,
          Item: {
            Name: "Breakfast Menu",
            Desc: "Breakfast Menu",
            ServiceType: "Movement_eat",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Restaurants/02f94a87-ae3a-4e51-8f13-79a190d5b978cappadocia.jpg.jpg",
            ImageName: null,
            ServiceItemId: 49616,
            PlaceId: null,
            Address: {
              Id: 11974,
              Address1:
                "Esentepe, Urgup Yolu Uzeri 2. Km, 50100 Nevsehir Merkez/Nevsehir, Turki",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Esentepe, Urgup Yolu Uzeri 2. Km, 50100 Nevsehir Merkez/Nevsehir, Turki",
              AreaId: "CAPPADOCIA",
              Area: {
                Id: "CAPPADOCIA",
                Name: "Cappadocia"
              },
              City: {
                Id: "CAPPADOCIA",
                Name: "Cappadocia"
              },
              Region: {
                Id: "URGUP",
                Name: "Urgup"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Esentepe, Urgup Yolu Uzeri 2. Km, 50100 Nevsehir Merkez/Nevsehir, Turki, Cappadocia, Cappadocia, Urgup, Turkey",
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "CAPPADOCIA"
          }
        },
        {
          Id: 445361,
          DateTime: "2020-04-09T09:00:00",
          SeqNumber: 5,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "CAPPADOCIA",
          DestinationName: "Cappadocia",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 445362,
          DateTime: "2020-04-09T09:00:00",
          SeqNumber: 6,
          MovementName: "RECREATION",
          MovementDescription: "Excursion",
          Duration: 10800,
          DurationText: "3 hours ",
          ServiceItemId: 6,
          Destination: "CAPPADOCIA",
          DestinationName: "Cappadocia",
          Note: "",
          Item: {
            OperationStartTime: "2019-02-28T18:03:00",
            OperationEndTime: "2019-02-28T21:05:00",
            IsSolidStartTime: false,
            Name: "Cappadocia tour rute Pasabag Valley",
            Desc:
              "Pasabag Valley, Goreme Open Air Museum,\nTurqois & Carpet Factory, Ceramic Factory, Porama",
            ServiceType: "Single",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Attractions/5183aa56-106d-4654-92cb-01f322946e63pasabag-valley_7911746599.jpg.jpg",
            ImageName: null,
            ServiceItemId: 46235,
            PlaceId: null,
            Address: {
              Id: 3023,
              Address1:
                "Merkez, Goreme Open Air Museum, M�ze Caddesi, G�reme Belediyesi/Nev?ehir Merkez/Provinsi Nev?ehir, Turki",
              Address2: null,
              Address3: null,
              PostalCode: "",
              Landmark:
                "Merkez, Goreme Open Air Museum, M�ze Caddesi, G�reme Belediyesi/Nev?ehir Merkez/Provinsi Nev?ehir, Turki",
              AreaId: "CAPPADOCIA",
              Area: {
                Id: "CAPPADOCIA",
                Name: "Cappadocia"
              },
              City: {
                Id: "CAPPADOCIA",
                Name: "Cappadocia"
              },
              Region: {
                Id: "URGUP",
                Name: "Urgup"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Merkez, Goreme Open Air Museum, M�ze Caddesi, G�reme Belediyesi/Nev?ehir Merkez/Provinsi Nev?ehir, Turki, Cappadocia, Cappadocia, Urgup, Turkey",
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "CAPPADOCIA"
          }
        },
        {
          Id: 445363,
          DateTime: "2020-04-09T12:00:00",
          SeqNumber: 7,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "CAPPADOCIA",
          DestinationName: "Cappadocia",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 445364,
          DateTime: "2020-04-09T12:00:00",
          SeqNumber: 8,
          MovementName: "EAT",
          MovementDescription: "Meal",
          Duration: 5400,
          DurationText: "1 hour 30 mins",
          ServiceItemId: 11,
          Destination: "CAPPADOCIA",
          DestinationName: "Cappadocia",
          Note: null,
          Item: {
            Name: "Lunch Menu",
            Desc: "Lunch Menu",
            ServiceType: "Movement_eat",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Restaurants/5aeb0594-8f2f-4dbf-af41-731fe7cab194cappadocia.jpg.jpg",
            ImageName: null,
            ServiceItemId: 49617,
            PlaceId: null,
            Address: {
              Id: 11974,
              Address1:
                "Esentepe, Urgup Yolu Uzeri 2. Km, 50100 Nevsehir Merkez/Nevsehir, Turki",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Esentepe, Urgup Yolu Uzeri 2. Km, 50100 Nevsehir Merkez/Nevsehir, Turki",
              AreaId: "CAPPADOCIA",
              Area: {
                Id: "CAPPADOCIA",
                Name: "Cappadocia"
              },
              City: {
                Id: "CAPPADOCIA",
                Name: "Cappadocia"
              },
              Region: {
                Id: "URGUP",
                Name: "Urgup"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Esentepe, Urgup Yolu Uzeri 2. Km, 50100 Nevsehir Merkez/Nevsehir, Turki, Cappadocia, Cappadocia, Urgup, Turkey",
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "CAPPADOCIA"
          }
        },
        {
          Id: 445365,
          DateTime: "2020-04-09T13:30:00",
          SeqNumber: 9,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "CAPPADOCIA",
          DestinationName: "Cappadocia",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 445366,
          DateTime: "2020-04-09T13:30:00",
          SeqNumber: 10,
          MovementName: "RECREATION",
          MovementDescription: "Excursion",
          Duration: 12600,
          DurationText: "3 hours 30 mins",
          ServiceItemId: 6,
          Destination: "CAPPADOCIA",
          DestinationName: "Cappadocia",
          Note: "",
          Item: {
            OperationStartTime: "2019-11-28T08:00:00",
            OperationEndTime: "2019-11-28T22:00:00",
            IsSolidStartTime: false,
            Name: "Cappadocia Tour",
            Desc:
              '"Cappadocia Tour lanjutan dengan rute: Kaymakli Underground City, Ceramics Factory, Panorama,Carpet Factory"',
            ServiceType: "Single",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Attractions/06f5b1dd-9001-4b9f-b96a-1c7bc2cf949fcappadocia.jpg.jpg",
            ImageName: null,
            ServiceItemId: 43873,
            PlaceId: null,
            Address: {
              Id: 11391,
              Address1:
                '"Merkez, Goreme Open Air Museum, M�ze Caddesi, G�reme Belediyesi/Nev?ehir Merkez/Provinsi Nev?ehir, Turki"',
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                '"Merkez, Goreme Open Air Museum, M�ze Caddesi, G�reme Belediyesi/Nev?ehir Merkez/Provinsi Nev?ehir, Turki"',
              AreaId: "NEVSEHIR",
              Area: {
                Id: "NEVSEHIR",
                Name: "Nevsehir"
              },
              City: {
                Id: "NEVSEHIR",
                Name: "Nevsehir"
              },
              Region: {
                Id: "URGUP",
                Name: "Urgup"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                '"Merkez, Goreme Open Air Museum, M�ze Caddesi, G�reme Belediyesi/Nev?ehir Merkez/Provinsi Nev?ehir, Turki", Nevsehir, Nevsehir, Urgup, Turkey',
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "NEVSEHIR"
          }
        },
        {
          Id: 445367,
          DateTime: "2020-04-09T17:00:00",
          SeqNumber: 11,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "CAPPADOCIA",
          DestinationName: "Cappadocia",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 0,
          DateTime: "2020-04-09T17:00:00",
          SeqNumber: 12,
          MovementName: "RETURNACCOMMODATION",
          MovementDescription: "Return to accommodation",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 4,
          Destination: "CAPPADOCIA",
          DestinationName: "Cappadocia",
          Note: null,
          Item: {
            Name: "Dinler Nevsehir",
            Desc: "Club Room",
            ServiceType: "With_breakfast",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Accommodations/5edce02f-ce80-4c17-8918-3d2e38bf440ddinler.jpg.jpg",
            ImageName: null,
            ServiceItemId: 36364,
            PlaceId: null,
            Address: {
              Id: 11978,
              Address1: "Dinler Hotels - Nevsehir",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Esentepe, Urgup Yolu Uzeri 2. Km, 50100 Nevsehir Merkez/Nevsehir, Turki",
              AreaId: "CAPPADOCIA",
              Area: {
                Id: "CAPPADOCIA",
                Name: "Cappadocia"
              },
              City: {
                Id: "CAPPADOCIA",
                Name: "Cappadocia"
              },
              Region: {
                Id: "URGUP",
                Name: "Urgup"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Dinler Hotels - Nevsehir, Cappadocia, Cappadocia, Urgup, Turkey",
              Coordinate: null
            },
            ProfileDesc:
              '"Offering indoor and outdoor pools, Dinler Hotels Nevsehir has a spa including Turkish bath, sauna and gym. Set in the Cappadocia region, it also has a children�s pool and play areas."',
            CityId: "CAPPADOCIA"
          }
        },
        {
          Id: 445369,
          DateTime: "2020-04-09T18:00:00",
          SeqNumber: 13,
          MovementName: "EAT",
          MovementDescription: "Meal",
          Duration: 3600,
          DurationText: "1 hour ",
          ServiceItemId: 11,
          Destination: "CAPPADOCIA",
          DestinationName: "Cappadocia",
          Note: null,
          Item: {
            Name: "Dinner Menu",
            Desc: "Dinner Menu",
            ServiceType: "Movement_eat",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Restaurants/8d82c49f-4635-425a-9cf1-1ec781701ee2cappadocia.jpg.jpg",
            ImageName: null,
            ServiceItemId: 49618,
            PlaceId: null,
            Address: {
              Id: 11974,
              Address1:
                "Esentepe, Urgup Yolu Uzeri 2. Km, 50100 Nevsehir Merkez/Nevsehir, Turki",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Esentepe, Urgup Yolu Uzeri 2. Km, 50100 Nevsehir Merkez/Nevsehir, Turki",
              AreaId: "CAPPADOCIA",
              Area: {
                Id: "CAPPADOCIA",
                Name: "Cappadocia"
              },
              City: {
                Id: "CAPPADOCIA",
                Name: "Cappadocia"
              },
              Region: {
                Id: "URGUP",
                Name: "Urgup"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Esentepe, Urgup Yolu Uzeri 2. Km, 50100 Nevsehir Merkez/Nevsehir, Turki, Cappadocia, Cappadocia, Urgup, Turkey",
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "CAPPADOCIA"
          }
        },
        {
          Id: 445370,
          DateTime: "2020-04-09T19:00:00",
          SeqNumber: 14,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "CAPPADOCIA",
          DestinationName: "Cappadocia",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 0,
          DateTime: "2020-04-09T19:00:00",
          SeqNumber: 15,
          MovementName: "DAYEND",
          MovementDescription: "Day end",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 2434,
          Destination: "CAPPADOCIA",
          DestinationName: "Cappadocia",
          Note: null,
          Item: {
            Name: "Dinler Nevsehir",
            Desc: "Club Room",
            ServiceType: "With_breakfast",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Accommodations/5edce02f-ce80-4c17-8918-3d2e38bf440ddinler.jpg.jpg",
            ImageName: null,
            ServiceItemId: 36364,
            PlaceId: null,
            Address: {
              Id: 11978,
              Address1: "Dinler Hotels - Nevsehir",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Esentepe, Urgup Yolu Uzeri 2. Km, 50100 Nevsehir Merkez/Nevsehir, Turki",
              AreaId: "CAPPADOCIA",
              Area: {
                Id: "CAPPADOCIA",
                Name: "Cappadocia"
              },
              City: {
                Id: "CAPPADOCIA",
                Name: "Cappadocia"
              },
              Region: {
                Id: "URGUP",
                Name: "Urgup"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Dinler Hotels - Nevsehir, Cappadocia, Cappadocia, Urgup, Turkey",
              Coordinate: null
            },
            ProfileDesc:
              '"Offering indoor and outdoor pools, Dinler Hotels Nevsehir has a spa including Turkish bath, sauna and gym. Set in the Cappadocia region, it also has a children�s pool and play areas."',
            CityId: "CAPPADOCIA"
          }
        }
      ],
      OrderedItems: [
        {
          ServiceItemId: 36364,
          ItemType: "Accommodation",
          ItemName: "Dinler Nevsehir - Club Room",
          Description: "Sharing Room",
          Qty: 0,
          IsNeedCheck: false
        },
        {
          ServiceItemId: 36364,
          ItemType: "Accommodation",
          ItemName: "Dinler Nevsehir - Club Room",
          Description: "Single Room",
          Qty: 0,
          IsNeedCheck: false
        }
      ]
    },
    {
      Day: 7,
      Date: "2020-04-10T00:00:00",
      TourDestinations: [
        {
          TransportationSummary: [],
          AttractionSummary: [],
          RestaurantSummary: [
            {
              Name: "Dinner Menu",
              DateTime: "2020-04-10T21:00:00",
              ServiceItemId: 49606,
              Duration: 5400,
              SeqNumber: 0
            }
          ],
          TourGuideSummary: [],
          Destination: "ISTANBUL",
          ImageUrl:
            "https://touressapi.azurewebsites.net/Content/ImgSrc/Accommodations/TUrkey%20photo.jpeg",
          AccommodationSummary: {
            Allocations: {
              SharingRoomPax: 0,
              ChildSharingRoomPax: 0,
              SingleRoomPax: 0,
              ChildSingleRoomPax: 0,
              ExtraBedPax: 0,
              ChildExtraBedPax: 0,
              SharingBedPax: 0,
              NoBedPax: 0
            },
            Name: "Golden Way Istanbul",
            Address:
              "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
            RoomType: "Double/Twin Sharing",
            RoomName: "Deluxe Double or Twin Room",
            RoomService: "With_breakfast",
            ServiceItemId: 36265,
            AccommodationProfileId: 124,
            SeqNumber: 0,
            DateTime: "2020-04-10T00:00:00"
          }
        },
        {
          TransportationSummary: [],
          AttractionSummary: [],
          RestaurantSummary: [
            {
              Name: "Breakfast Menu",
              DateTime: "2020-04-10T08:00:00",
              ServiceItemId: 49616,
              Duration: 3600,
              SeqNumber: 0
            },
            {
              Name: "Lunch Menu",
              DateTime: "2020-04-10T13:00:00",
              ServiceItemId: 49617,
              Duration: 3600,
              SeqNumber: 0
            }
          ],
          TourGuideSummary: [],
          Destination: "CAPPADOCIA",
          ImageUrl: "",
          AccommodationSummary: null
        },
        {
          TransportationSummary: [],
          AttractionSummary: [
            {
              Name: "Ataturk Mousoleum",
              DateTime: "2020-04-10T14:00:00",
              ServiceItemId: 2436,
              Duration: 3600,
              SeqNumber: 0
            }
          ],
          RestaurantSummary: [],
          TourGuideSummary: [],
          Destination: "ANKARA",
          ImageUrl: "",
          AccommodationSummary: null
        }
      ],
      TourSummary: null,
      Movements: [
        {
          Id: 0,
          DateTime: "2020-04-10T04:00:00",
          SeqNumber: 1,
          MovementName: "DAYSTART",
          MovementDescription: "Day start",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 2433,
          Destination: "CAPPADOCIA",
          DestinationName: "Cappadocia",
          Note: null,
          Item: {
            Name: "Dinler Nevsehir",
            Desc: "Club Room",
            ServiceType: "With_breakfast",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Accommodations/5edce02f-ce80-4c17-8918-3d2e38bf440ddinler.jpg.jpg",
            ImageName: null,
            ServiceItemId: 36364,
            PlaceId: null,
            Address: {
              Id: 11978,
              Address1: "Dinler Hotels - Nevsehir",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Esentepe, Urgup Yolu Uzeri 2. Km, 50100 Nevsehir Merkez/Nevsehir, Turki",
              AreaId: "CAPPADOCIA",
              Area: {
                Id: "CAPPADOCIA",
                Name: "Cappadocia"
              },
              City: {
                Id: "CAPPADOCIA",
                Name: "Cappadocia"
              },
              Region: {
                Id: "URGUP",
                Name: "Urgup"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Dinler Hotels - Nevsehir, Cappadocia, Cappadocia, Urgup, Turkey",
              Coordinate: null
            },
            ProfileDesc:
              '"Offering indoor and outdoor pools, Dinler Hotels Nevsehir has a spa including Turkish bath, sauna and gym. Set in the Cappadocia region, it also has a children�s pool and play areas."',
            CityId: "CAPPADOCIA"
          }
        },
        {
          Id: 445373,
          DateTime: "2020-04-10T04:00:00",
          SeqNumber: 2,
          MovementName: "FREETIME",
          MovementDescription: "Free Time",
          Duration: 14400,
          DurationText: "4 hours ",
          ServiceItemId: 12,
          Destination: "CAPPADOCIA",
          DestinationName: "Cappadocia",
          Note: "Optional Tour 1 – Hot Air Balloon",
          Item: {
            Name: null,
            Desc: null,
            ServiceType: "Movement_free_time",
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: 36364,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 0,
          DateTime: "2020-04-10T08:00:00",
          SeqNumber: 3,
          MovementName: "CHECKOUT",
          MovementDescription: "Check-out",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 3,
          Destination: "CAPPADOCIA",
          DestinationName: "Cappadocia",
          Note: null,
          Item: {
            Name: "Dinler Nevsehir",
            Desc: "Club Room",
            ServiceType: "With_breakfast",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Accommodations/5edce02f-ce80-4c17-8918-3d2e38bf440ddinler.jpg.jpg",
            ImageName: null,
            ServiceItemId: 36364,
            PlaceId: null,
            Address: {
              Id: 11978,
              Address1: "Dinler Hotels - Nevsehir",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Esentepe, Urgup Yolu Uzeri 2. Km, 50100 Nevsehir Merkez/Nevsehir, Turki",
              AreaId: "CAPPADOCIA",
              Area: {
                Id: "CAPPADOCIA",
                Name: "Cappadocia"
              },
              City: {
                Id: "CAPPADOCIA",
                Name: "Cappadocia"
              },
              Region: {
                Id: "URGUP",
                Name: "Urgup"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Dinler Hotels - Nevsehir, Cappadocia, Cappadocia, Urgup, Turkey",
              Coordinate: null
            },
            ProfileDesc:
              '"Offering indoor and outdoor pools, Dinler Hotels Nevsehir has a spa including Turkish bath, sauna and gym. Set in the Cappadocia region, it also has a children�s pool and play areas."',
            CityId: "CAPPADOCIA"
          }
        },
        {
          Id: 445375,
          DateTime: "2020-04-10T08:00:00",
          SeqNumber: 4,
          MovementName: "EAT",
          MovementDescription: "Meal",
          Duration: 3600,
          DurationText: "1 hour ",
          ServiceItemId: 11,
          Destination: "CAPPADOCIA",
          DestinationName: "Cappadocia",
          Note: null,
          Item: {
            Name: "Breakfast Menu",
            Desc: "Breakfast Menu",
            ServiceType: "Movement_eat",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Restaurants/02f94a87-ae3a-4e51-8f13-79a190d5b978cappadocia.jpg.jpg",
            ImageName: null,
            ServiceItemId: 49616,
            PlaceId: null,
            Address: {
              Id: 11974,
              Address1:
                "Esentepe, Urgup Yolu Uzeri 2. Km, 50100 Nevsehir Merkez/Nevsehir, Turki",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Esentepe, Urgup Yolu Uzeri 2. Km, 50100 Nevsehir Merkez/Nevsehir, Turki",
              AreaId: "CAPPADOCIA",
              Area: {
                Id: "CAPPADOCIA",
                Name: "Cappadocia"
              },
              City: {
                Id: "CAPPADOCIA",
                Name: "Cappadocia"
              },
              Region: {
                Id: "URGUP",
                Name: "Urgup"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Esentepe, Urgup Yolu Uzeri 2. Km, 50100 Nevsehir Merkez/Nevsehir, Turki, Cappadocia, Cappadocia, Urgup, Turkey",
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "CAPPADOCIA"
          }
        },
        {
          Id: 445376,
          DateTime: "2020-04-10T09:00:00",
          SeqNumber: 5,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 14400,
          DurationText: "4 hours ",
          ServiceItemId: 1,
          Destination: "CAPPADOCIA",
          DestinationName: "Cappadocia",
          Note: "",
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 445377,
          DateTime: "2020-04-10T13:00:00",
          SeqNumber: 6,
          MovementName: "EAT",
          MovementDescription: "Meal",
          Duration: 3600,
          DurationText: "1 hour ",
          ServiceItemId: 11,
          Destination: "CAPPADOCIA",
          DestinationName: "Cappadocia",
          Note: null,
          Item: {
            Name: "Lunch Menu",
            Desc: "Lunch Menu",
            ServiceType: "Movement_eat",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Restaurants/5aeb0594-8f2f-4dbf-af41-731fe7cab194cappadocia.jpg.jpg",
            ImageName: null,
            ServiceItemId: 49617,
            PlaceId: null,
            Address: {
              Id: 11974,
              Address1:
                "Esentepe, Urgup Yolu Uzeri 2. Km, 50100 Nevsehir Merkez/Nevsehir, Turki",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Esentepe, Urgup Yolu Uzeri 2. Km, 50100 Nevsehir Merkez/Nevsehir, Turki",
              AreaId: "CAPPADOCIA",
              Area: {
                Id: "CAPPADOCIA",
                Name: "Cappadocia"
              },
              City: {
                Id: "CAPPADOCIA",
                Name: "Cappadocia"
              },
              Region: {
                Id: "URGUP",
                Name: "Urgup"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Esentepe, Urgup Yolu Uzeri 2. Km, 50100 Nevsehir Merkez/Nevsehir, Turki, Cappadocia, Cappadocia, Urgup, Turkey",
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "CAPPADOCIA"
          }
        },
        {
          Id: 445378,
          DateTime: "2020-04-10T14:00:00",
          SeqNumber: 7,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "ANKARA",
          DestinationName: "Ankara",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 445379,
          DateTime: "2020-04-10T14:00:00",
          SeqNumber: 8,
          MovementName: "RECREATION",
          MovementDescription: "Excursion",
          Duration: 3600,
          DurationText: "1 hour ",
          ServiceItemId: 6,
          Destination: "ANKARA",
          DestinationName: "Ankara",
          Note: "",
          Item: {
            OperationStartTime: "2020-01-07T08:00:00",
            OperationEndTime: "2020-01-07T18:00:00",
            IsSolidStartTime: false,
            Name: "Ataturk Mousoleum",
            Desc: "Ankara City Tour dengan rute: Ataturk Mousoleum",
            ServiceType: "Single",
            ImageUrl:
              "https://touressapi.azurewebsites.net//Content/imgSrc/Attractions/84a0443b-c9ac-465b-abff-b8de25552052Ataturk Mousoleum.jpg.jpg",
            ImageName: null,
            ServiceItemId: 2436,
            PlaceId: null,
            Address: {
              Id: 11953,
              Address1: '"Mebusevleri Mh., 06570 Cankaya, Ankara, Turkey"',
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark: '"Mebusevleri Mh., 06570 Cankaya, Ankara, Turkey"',
              AreaId: "ANKARAANKARA",
              Area: {
                Id: "ANKARAANKARA",
                Name: "Ankara"
              },
              City: {
                Id: "ANKARA",
                Name: "Ankara"
              },
              Region: {
                Id: "ANKARA",
                Name: "Ankara"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                '"Mebusevleri Mh., 06570 Cankaya, Ankara, Turkey", Ankara, Ankara, Ankara, Turkey',
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "ANKARA"
          }
        },
        {
          Id: 445380,
          DateTime: "2020-04-10T15:00:00",
          SeqNumber: 9,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 21600,
          DurationText: "6 hours ",
          ServiceItemId: 1,
          Destination: "ANKARA",
          DestinationName: "Ankara",
          Note: "",
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 445381,
          DateTime: "2020-04-10T21:00:00",
          SeqNumber: 10,
          MovementName: "EAT",
          MovementDescription: "Meal",
          Duration: 5400,
          DurationText: "1 hour 30 mins",
          ServiceItemId: 11,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: null,
          Item: {
            Name: "Dinner Menu",
            Desc: "Dinner Menu",
            ServiceType: "Movement_eat",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Restaurants/d8905be8-1f7f-4fd6-b6f6-e65e9d19e66eistanbul.jpg.jpg",
            ImageName: null,
            ServiceItemId: 49606,
            PlaceId: null,
            Address: {
              Id: 11955,
              Address1:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
              AreaId: "ISTANBUL",
              Area: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              City: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Region: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey, Istanbul, Istanbul, Istanbul, Turkey",
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "ISTANBUL"
          }
        },
        {
          Id: 445382,
          DateTime: "2020-04-10T22:30:00",
          SeqNumber: 11,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 0,
          DateTime: "2020-04-10T22:30:00",
          SeqNumber: 12,
          MovementName: "CHECKIN",
          MovementDescription: "Check-in",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 2,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: null,
          Item: {
            Name: "Golden Way Istanbul",
            Desc: "Deluxe Double or Twin Room",
            ServiceType: "With_breakfast",
            ImageUrl:
              "https://touressapi.azurewebsites.net/Content/imgSrc/Accommodations/7f967ba7-4698-4f5d-9f8f-5fcfce2e330c.jpg",
            ImageName: null,
            ServiceItemId: 36265,
            PlaceId: null,
            Address: {
              Id: 1672,
              Address1:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
              AreaId: "ISTANBUL",
              Area: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              City: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Region: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey, Istanbul, Istanbul, Istanbul, Turkey",
              Coordinate: null
            },
            ProfileDesc:
              "Holiday Inn Express Safa Park ini terletak di Sheikh Zayed Road yang terkenal, hanya beberapa langkah dari Safa Park. Hotel ini memiliki pusat kebugaran di puncak gedung dan bus gratis menuju Pantai Jumeirah.",
            CityId: "ISTANBUL"
          }
        },
        {
          Id: 0,
          DateTime: "2020-04-10T22:30:00",
          SeqNumber: 13,
          MovementName: "DAYEND",
          MovementDescription: "Day end",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 2434,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: null,
          Item: {
            Name: "Golden Way Istanbul",
            Desc: "Deluxe Double or Twin Room",
            ServiceType: "With_breakfast",
            ImageUrl:
              "https://touressapi.azurewebsites.net/Content/imgSrc/Accommodations/7f967ba7-4698-4f5d-9f8f-5fcfce2e330c.jpg",
            ImageName: null,
            ServiceItemId: 36265,
            PlaceId: null,
            Address: {
              Id: 1672,
              Address1:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
              AreaId: "ISTANBUL",
              Area: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              City: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Region: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey, Istanbul, Istanbul, Istanbul, Turkey",
              Coordinate: null
            },
            ProfileDesc:
              "Holiday Inn Express Safa Park ini terletak di Sheikh Zayed Road yang terkenal, hanya beberapa langkah dari Safa Park. Hotel ini memiliki pusat kebugaran di puncak gedung dan bus gratis menuju Pantai Jumeirah.",
            CityId: "ISTANBUL"
          }
        }
      ],
      OrderedItems: [
        {
          ServiceItemId: 36265,
          ItemType: "Accommodation",
          ItemName: "Golden Way Istanbul - Deluxe Double or Twin Room",
          Description: "Sharing Room",
          Qty: 0,
          IsNeedCheck: false
        },
        {
          ServiceItemId: 36265,
          ItemType: "Accommodation",
          ItemName: "Golden Way Istanbul - Deluxe Double or Twin Room",
          Description: "Single Room",
          Qty: 0,
          IsNeedCheck: false
        }
      ]
    },
    {
      Day: 8,
      Date: "2020-04-11T00:00:00",
      TourDestinations: [
        {
          TransportationSummary: [],
          AttractionSummary: [
            {
              Name: "Bosphorus Cruise",
              DateTime: "2020-04-11T08:30:00",
              ServiceItemId: 47,
              Duration: 3600,
              SeqNumber: 0
            },
            {
              Name: "Hippodrome, Blue Mosque, Hagia Sophia",
              DateTime: "2020-04-11T09:30:00",
              ServiceItemId: 49,
              Duration: 10800,
              SeqNumber: 0
            }
          ],
          RestaurantSummary: [
            {
              Name: "Breakfast menu",
              DateTime: "2020-04-11T07:30:00",
              ServiceItemId: 49604,
              Duration: 3600,
              SeqNumber: 0
            },
            {
              Name: "Lunch Menu",
              DateTime: "2020-04-11T12:30:00",
              ServiceItemId: 49605,
              Duration: 5400,
              SeqNumber: 0
            },
            {
              Name: "Dinner Menu",
              DateTime: "2020-04-11T18:00:00",
              ServiceItemId: 49606,
              Duration: 3600,
              SeqNumber: 0
            }
          ],
          TourGuideSummary: [],
          Destination: "ISTANBUL",
          ImageUrl:
            "https://touressapi.azurewebsites.net/Content/ImgSrc/Accommodations/TUrkey%20photo.jpeg",
          AccommodationSummary: {
            Allocations: {
              SharingRoomPax: 0,
              ChildSharingRoomPax: 0,
              SingleRoomPax: 0,
              ChildSingleRoomPax: 0,
              ExtraBedPax: 0,
              ChildExtraBedPax: 0,
              SharingBedPax: 0,
              NoBedPax: 0
            },
            Name: "Golden Way Istanbul",
            Address:
              "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
            RoomType: "Double/Twin Sharing",
            RoomName: "Deluxe Double or Twin Room",
            RoomService: "With_breakfast",
            ServiceItemId: 36265,
            AccommodationProfileId: 124,
            SeqNumber: 0,
            DateTime: "2020-04-11T00:00:00"
          }
        }
      ],
      TourSummary: null,
      Movements: [
        {
          Id: 0,
          DateTime: "2020-04-11T07:30:00",
          SeqNumber: 1,
          MovementName: "DAYSTART",
          MovementDescription: "Day start",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 2433,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: null,
          Item: {
            Name: "Golden Way Istanbul",
            Desc: "Deluxe Double or Twin Room",
            ServiceType: "With_breakfast",
            ImageUrl:
              "https://touressapi.azurewebsites.net/Content/imgSrc/Accommodations/7f967ba7-4698-4f5d-9f8f-5fcfce2e330c.jpg",
            ImageName: null,
            ServiceItemId: 36265,
            PlaceId: null,
            Address: {
              Id: 1672,
              Address1:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
              AreaId: "ISTANBUL",
              Area: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              City: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Region: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey, Istanbul, Istanbul, Istanbul, Turkey",
              Coordinate: null
            },
            ProfileDesc:
              "Holiday Inn Express Safa Park ini terletak di Sheikh Zayed Road yang terkenal, hanya beberapa langkah dari Safa Park. Hotel ini memiliki pusat kebugaran di puncak gedung dan bus gratis menuju Pantai Jumeirah.",
            CityId: "ISTANBUL"
          }
        },
        {
          Id: 445386,
          DateTime: "2020-04-11T07:30:00",
          SeqNumber: 2,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 445387,
          DateTime: "2020-04-11T07:30:00",
          SeqNumber: 3,
          MovementName: "EAT",
          MovementDescription: "Meal",
          Duration: 3600,
          DurationText: "1 hour ",
          ServiceItemId: 11,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: null,
          Item: {
            Name: "Breakfast menu",
            Desc: "Breakfast menu",
            ServiceType: "Movement_eat",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Restaurants/2e95eed7-6d3b-48dc-9632-e7be562067f8istanbul.jpg.jpg",
            ImageName: null,
            ServiceItemId: 49604,
            PlaceId: null,
            Address: {
              Id: 11955,
              Address1:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
              AreaId: "ISTANBUL",
              Area: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              City: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Region: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey, Istanbul, Istanbul, Istanbul, Turkey",
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "ISTANBUL"
          }
        },
        {
          Id: 445388,
          DateTime: "2020-04-11T08:30:00",
          SeqNumber: 4,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 445389,
          DateTime: "2020-04-11T08:30:00",
          SeqNumber: 5,
          MovementName: "RECREATION",
          MovementDescription: "Excursion",
          Duration: 3600,
          DurationText: "1 hour ",
          ServiceItemId: 6,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: "",
          Item: {
            OperationStartTime: "2019-11-19T05:00:00",
            OperationEndTime: "2019-11-19T22:00:00",
            IsSolidStartTime: false,
            Name: "Bosphorus Cruise",
            Desc:
              "Perjalanan melintasi selat yang memisahkan Turki bagian Eropa dan bagian Asia",
            ServiceType: "Single",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Attractions/5dd552ec-7799-4278-b2e3-48fa63f419bdbosphoruscruise.jpg.jpg",
            ImageName: null,
            ServiceItemId: 47,
            PlaceId: null,
            Address: {
              Id: 10937,
              Address1:
                '"Alemdar Mh., Divan Yolu Cd. No:34, 34122 Fatih, Istanbul, Turkey"',
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                '"Alemdar Mh., Divan Yolu Cd. No:34, 34122 Fatih, Istanbul, Turkey"',
              AreaId: "ISTANBULEUROPE",
              Area: {
                Id: "ISTANBULEUROPE",
                Name: "Istanbul Europe"
              },
              City: {
                Id: "ISTANBULISTANBULEUROPE",
                Name: "Istanbul Europe"
              },
              Region: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                '"Alemdar Mh., Divan Yolu Cd. No:34, 34122 Fatih, Istanbul, Turkey", Istanbul Europe, Istanbul Europe, Istanbul, Turkey',
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "ISTANBULISTANBULEUROPE"
          }
        },
        {
          Id: 445390,
          DateTime: "2020-04-11T09:30:00",
          SeqNumber: 6,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 445391,
          DateTime: "2020-04-11T09:30:00",
          SeqNumber: 7,
          MovementName: "RECREATION",
          MovementDescription: "Excursion",
          Duration: 10800,
          DurationText: "3 hours ",
          ServiceItemId: 6,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: "",
          Item: {
            OperationStartTime: "2019-01-15T08:30:00",
            OperationEndTime: "2019-01-15T12:00:00",
            IsSolidStartTime: false,
            Name: "Hippodrome, Blue Mosque, Hagia Sophia",
            Desc: '"Hippodrome, Blue Mosque, Hagia Sophia"',
            ServiceType: "Single",
            ImageUrl:
              "https://touressapi.azurewebsites.net/Content/imgSrc/Attractions/AAEAAQAAAAAAAAgaAAAAJGNhYTEwNDQxLTM5ODEtNDdhZC1iZjk0LWIyYTE3YzI1YmMyZg.jpg",
            ImageName: null,
            ServiceItemId: 49,
            PlaceId: null,
            Address: {
              Id: 2520,
              Address1:
                '"Sultan Ahmet Mahallesi, Ayasofya Meydani, 34122 Fatih, Istanbul, Turkey"',
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                '"Sultan Ahmet Mahallesi, Ayasofya Meydani, 34122 Fatih, Istanbul, Turkey"',
              AreaId: "ISTANBULEUROPE",
              Area: {
                Id: "ISTANBULEUROPE",
                Name: "Istanbul Europe"
              },
              City: {
                Id: "ISTANBULISTANBULEUROPE",
                Name: "Istanbul Europe"
              },
              Region: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                '"Sultan Ahmet Mahallesi, Ayasofya Meydani, 34122 Fatih, Istanbul, Turkey", Istanbul Europe, Istanbul Europe, Istanbul, Turkey',
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "ISTANBULISTANBULEUROPE"
          }
        },
        {
          Id: 445392,
          DateTime: "2020-04-11T12:30:00",
          SeqNumber: 8,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 445393,
          DateTime: "2020-04-11T12:30:00",
          SeqNumber: 9,
          MovementName: "EAT",
          MovementDescription: "Meal",
          Duration: 5400,
          DurationText: "1 hour 30 mins",
          ServiceItemId: 11,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: null,
          Item: {
            Name: "Lunch Menu",
            Desc: "Lunch Menu",
            ServiceType: "Movement_eat",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Restaurants/1ecafca8-7b32-4f27-b7cd-1cc53283e064istanbul.jpg.jpg",
            ImageName: null,
            ServiceItemId: 49605,
            PlaceId: null,
            Address: {
              Id: 11955,
              Address1:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
              AreaId: "ISTANBUL",
              Area: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              City: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Region: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey, Istanbul, Istanbul, Istanbul, Turkey",
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "ISTANBUL"
          }
        },
        {
          Id: 445394,
          DateTime: "2020-04-11T14:00:00",
          SeqNumber: 10,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 445395,
          DateTime: "2020-04-11T18:00:00",
          SeqNumber: 11,
          MovementName: "EAT",
          MovementDescription: "Meal",
          Duration: 3600,
          DurationText: "1 hour ",
          ServiceItemId: 11,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: null,
          Item: {
            Name: "Dinner Menu",
            Desc: "Dinner Menu",
            ServiceType: "Movement_eat",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Restaurants/d8905be8-1f7f-4fd6-b6f6-e65e9d19e66eistanbul.jpg.jpg",
            ImageName: null,
            ServiceItemId: 49606,
            PlaceId: null,
            Address: {
              Id: 11955,
              Address1:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
              AreaId: "ISTANBUL",
              Area: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              City: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Region: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey, Istanbul, Istanbul, Istanbul, Turkey",
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "ISTANBUL"
          }
        },
        {
          Id: 445396,
          DateTime: "2020-04-11T19:00:00",
          SeqNumber: 12,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 0,
          DateTime: "2020-04-11T19:00:00",
          SeqNumber: 13,
          MovementName: "RETURNACCOMMODATION",
          MovementDescription: "Return to accommodation",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 4,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: null,
          Item: {
            Name: "Golden Way Istanbul",
            Desc: "Deluxe Double or Twin Room",
            ServiceType: "With_breakfast",
            ImageUrl:
              "https://touressapi.azurewebsites.net/Content/imgSrc/Accommodations/7f967ba7-4698-4f5d-9f8f-5fcfce2e330c.jpg",
            ImageName: null,
            ServiceItemId: 36265,
            PlaceId: null,
            Address: {
              Id: 1672,
              Address1:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
              AreaId: "ISTANBUL",
              Area: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              City: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Region: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey, Istanbul, Istanbul, Istanbul, Turkey",
              Coordinate: null
            },
            ProfileDesc:
              "Holiday Inn Express Safa Park ini terletak di Sheikh Zayed Road yang terkenal, hanya beberapa langkah dari Safa Park. Hotel ini memiliki pusat kebugaran di puncak gedung dan bus gratis menuju Pantai Jumeirah.",
            CityId: "ISTANBUL"
          }
        },
        {
          Id: 0,
          DateTime: "2020-04-11T19:00:00",
          SeqNumber: 14,
          MovementName: "DAYEND",
          MovementDescription: "Day end",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 2434,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: null,
          Item: {
            Name: "Golden Way Istanbul",
            Desc: "Deluxe Double or Twin Room",
            ServiceType: "With_breakfast",
            ImageUrl:
              "https://touressapi.azurewebsites.net/Content/imgSrc/Accommodations/7f967ba7-4698-4f5d-9f8f-5fcfce2e330c.jpg",
            ImageName: null,
            ServiceItemId: 36265,
            PlaceId: null,
            Address: {
              Id: 1672,
              Address1:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
              AreaId: "ISTANBUL",
              Area: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              City: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Region: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey, Istanbul, Istanbul, Istanbul, Turkey",
              Coordinate: null
            },
            ProfileDesc:
              "Holiday Inn Express Safa Park ini terletak di Sheikh Zayed Road yang terkenal, hanya beberapa langkah dari Safa Park. Hotel ini memiliki pusat kebugaran di puncak gedung dan bus gratis menuju Pantai Jumeirah.",
            CityId: "ISTANBUL"
          }
        }
      ],
      OrderedItems: [
        {
          ServiceItemId: 36265,
          ItemType: "Accommodation",
          ItemName: "Golden Way Istanbul - Deluxe Double or Twin Room",
          Description: "Sharing Room",
          Qty: 0,
          IsNeedCheck: false
        },
        {
          ServiceItemId: 36265,
          ItemType: "Accommodation",
          ItemName: "Golden Way Istanbul - Deluxe Double or Twin Room",
          Description: "Single Room",
          Qty: 0,
          IsNeedCheck: false
        }
      ]
    },
    {
      Day: 9,
      Date: "2020-04-12T00:00:00",
      TourDestinations: [
        {
          TransportationSummary: [],
          AttractionSummary: [],
          RestaurantSummary: [
            {
              Name: "Breakfast menu",
              DateTime: "2020-04-12T08:00:00",
              ServiceItemId: 49604,
              Duration: 7200,
              SeqNumber: 0
            }
          ],
          TourGuideSummary: [],
          Destination: "ISTANBUL",
          ImageUrl:
            "https://touressapi.azurewebsites.net/Content/ImgSrc/Accommodations/TUrkey%20photo.jpeg",
          AccommodationSummary: null
        }
      ],
      TourSummary: null,
      Movements: [
        {
          Id: 0,
          DateTime: "2020-04-12T08:00:00",
          SeqNumber: 1,
          MovementName: "DAYSTART",
          MovementDescription: "Day start",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 2433,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: null,
          Item: {
            Name: "Golden Way Istanbul",
            Desc: "Deluxe Double or Twin Room",
            ServiceType: null,
            ImageUrl:
              "https://touressapi.azurewebsites.net/Content/imgSrc/Accommodations/7f967ba7-4698-4f5d-9f8f-5fcfce2e330c.jpg",
            ImageName: null,
            ServiceItemId: 36265,
            PlaceId: null,
            Address: {
              Id: 1672,
              Address1:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
              AreaId: "ISTANBUL",
              Area: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              City: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Region: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey, Istanbul, Istanbul, Istanbul, Turkey",
              Coordinate: null
            },
            ProfileDesc:
              "Holiday Inn Express Safa Park ini terletak di Sheikh Zayed Road yang terkenal, hanya beberapa langkah dari Safa Park. Hotel ini memiliki pusat kebugaran di puncak gedung dan bus gratis menuju Pantai Jumeirah.",
            CityId: "ISTANBUL"
          }
        },
        {
          Id: 445400,
          DateTime: "2020-04-12T08:00:00",
          SeqNumber: 2,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 445401,
          DateTime: "2020-04-12T08:00:00",
          SeqNumber: 3,
          MovementName: "EAT",
          MovementDescription: "Meal",
          Duration: 7200,
          DurationText: "2 hours ",
          ServiceItemId: 11,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: null,
          Item: {
            Name: "Breakfast menu",
            Desc: "Breakfast menu",
            ServiceType: "Movement_eat",
            ImageUrl:
              "https://api.touress.com//Content/imgSrc/Restaurants/2e95eed7-6d3b-48dc-9632-e7be562067f8istanbul.jpg.jpg",
            ImageName: null,
            ServiceItemId: 49604,
            PlaceId: null,
            Address: {
              Id: 11955,
              Address1:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
              AreaId: "ISTANBUL",
              Area: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              City: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Region: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey, Istanbul, Istanbul, Istanbul, Turkey",
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "ISTANBUL"
          }
        },
        {
          Id: 445402,
          DateTime: "2020-04-12T10:00:00",
          SeqNumber: 4,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 0,
          DateTime: "2020-04-12T10:00:00",
          SeqNumber: 5,
          MovementName: "CHECKOUT",
          MovementDescription: "Check-out",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 3,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: null,
          Item: {
            Name: "Golden Way Istanbul",
            Desc: "Deluxe Double or Twin Room",
            ServiceType: null,
            ImageUrl:
              "https://touressapi.azurewebsites.net/Content/imgSrc/Accommodations/7f967ba7-4698-4f5d-9f8f-5fcfce2e330c.jpg",
            ImageName: null,
            ServiceItemId: 36265,
            PlaceId: null,
            Address: {
              Id: 1672,
              Address1:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
              AreaId: "ISTANBUL",
              Area: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              City: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Region: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey, Istanbul, Istanbul, Istanbul, Turkey",
              Coordinate: null
            },
            ProfileDesc:
              "Holiday Inn Express Safa Park ini terletak di Sheikh Zayed Road yang terkenal, hanya beberapa langkah dari Safa Park. Hotel ini memiliki pusat kebugaran di puncak gedung dan bus gratis menuju Pantai Jumeirah.",
            CityId: "ISTANBUL"
          }
        },
        {
          Id: 445404,
          DateTime: "2020-04-12T11:00:00",
          SeqNumber: 6,
          MovementName: "QUEUETIME",
          MovementDescription: "Queue Time",
          Duration: 9000,
          DurationText: "2 hours 30 mins",
          ServiceItemId: 2530,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: "Airport Drop Off",
          Item: {
            Name: null,
            Desc: null,
            ServiceType: "Movement_queue_time",
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: 36265,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 445405,
          DateTime: "2020-04-12T13:30:00",
          SeqNumber: 7,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        },
        {
          Id: 445406,
          DateTime: "2020-04-12T13:30:00",
          SeqNumber: 8,
          MovementName: "DEPARTURE",
          MovementDescription: "Departure",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 7,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: "",
          Item: {
            Name: "Airport",
            Desc: "Istanbul Ataturk Airport",
            ServiceType: "Movement_departure",
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: 6,
            Address: {
              Id: null,
              Address1: "Yesilkoy, 34149 Barkirkoy/Istanbul, Turkey",
              Address2: null,
              Address3: null,
              PostalCode: null,
              Landmark: null,
              AreaId: null,
              Area: null,
              City: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Region: {
                Id: "ISTANBUL",
                Name: "Istanbul"
              },
              Country: {
                Id: "TR",
                Name: "Turkey"
              },
              AddressString:
                "Yesilkoy, 34149 Barkirkoy/Istanbul, Turkey, Istanbul, Istanbul, Turkey",
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "ISTANBUL"
          }
        },
        {
          Id: 445407,
          DateTime: "2020-04-12T13:30:00",
          SeqNumber: 9,
          MovementName: "FLIGHTTIME",
          MovementDescription: "Flight time",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 10,
          Destination: "ISTANBUL",
          DestinationName: "Istanbul",
          Note: null,
          Item: {
            Name: null,
            Desc: null,
            ServiceType: "Movement_flight_time",
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        }
      ],
      OrderedItems: []
    },
    {
      Day: 10,
      Date: "2020-04-13T00:00:00",
      TourDestinations: [
        {
          TransportationSummary: [],
          AttractionSummary: [],
          RestaurantSummary: [],
          TourGuideSummary: [],
          Destination: "JAKARTA",
          ImageUrl: "",
          AccommodationSummary: null
        }
      ],
      TourSummary: null,
      Movements: [
        {
          Id: 445408,
          DateTime: "2020-04-13T07:05:00",
          SeqNumber: 1,
          MovementName: "ARRIVAL",
          MovementDescription: "Arrival",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 8,
          Destination: "JAKARTA",
          DestinationName: "Jakarta",
          Note: "",
          Item: {
            Name: "Airport",
            Desc: "Soekarno-Hatta International Airport",
            ServiceType: "Movement_arrival",
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: 2,
            Address: {
              Id: 2497,
              Address1:
                "Bandar Udara Internasional Soekarno–Hatta (CGK), Kota Tangerang, Banten",
              Address2: "",
              Address3: "",
              PostalCode: "",
              Landmark:
                "Bandar Udara Internasional Soekarno–Hatta (CGK), Kota Tangerang, Banten",
              AreaId: "CENTRALJAKARTA",
              Area: {
                Id: "CENTRALJAKARTA",
                Name: "Central Jakarta"
              },
              City: {
                Id: "JAKARTA",
                Name: "Jakarta"
              },
              Region: {
                Id: "JAKARTA",
                Name: "Jakarta"
              },
              Country: {
                Id: "ID",
                Name: "Indonesia"
              },
              AddressString:
                "Bandar Udara Internasional Soekarno–Hatta (CGK), Kota Tangerang, Banten, Central Jakarta, Jakarta, Jakarta, Indonesia",
              Coordinate: null
            },
            ProfileDesc: null,
            CityId: "JAKARTA"
          }
        },
        {
          Id: 445409,
          DateTime: "2020-04-13T07:05:00",
          SeqNumber: 2,
          MovementName: "DRIVING",
          MovementDescription: "Trip by car",
          Duration: 0,
          DurationText: "0 min",
          ServiceItemId: 1,
          Destination: "JAKARTA",
          DestinationName: "Jakarta",
          Note: null,
          Item: {
            Capacity: 0,
            Hours: 0,
            ServiceDescription: null,
            Name: null,
            Desc: null,
            ServiceType: null,
            ImageUrl: null,
            ImageName: null,
            ServiceItemId: null,
            PlaceId: null,
            Address: null,
            ProfileDesc: null,
            CityId: null
          }
        }
      ],
      OrderedItems: []
    }
  ],
  HeadlineProgram: {
    Departures: [
      {
        Day: 1,
        Date: "2020-04-04T20:15:00",
        City: {
          UTC: 7,
          ImageUrl: "",
          Id: "JAKARTA",
          Name: "Jakarta"
        },
        Region: "Jakarta",
        Address:
          "Bandar Udara Internasional Soekarno–Hatta (CGK), Kota Tangerang, Banten, Central Jakarta, Jakarta, Jakarta, Indonesia",
        PlaceType: "Airport",
        Place: "Soekarno-Hatta International Airport",
        PlaceCode: null,
        PlaceId: 2,
        Note: "",
        TransferType: "Movement_departure"
      }
    ],
    MainPrograms: [
      {
        Day: 2,
        Date: "2020-04-05T07:45:00",
        City: {
          UTC: 3,
          ImageUrl:
            "https://touressapi.azurewebsites.net/Content/ImgSrc/Accommodations/TUrkey%20photo.jpeg",
          Id: "ISTANBUL",
          Name: "Istanbul"
        },
        Region: "Istanbul",
        Address:
          "Yesilkoy, 34149 Barkirkoy/Istanbul, Turkey, Istanbul, Istanbul, Turkey",
        PlaceType: "Airport",
        Place: "Istanbul Ataturk Airport",
        PlaceCode: null,
        PlaceId: 6,
        Note: "",
        TransferType: "Movement_arrival"
      },
      {
        Day: 2,
        TotalDays: 2,
        Date: "2020-04-05T19:00:00",
        LeavingDate: "2020-04-06T07:00:00",
        City: {
          UTC: 3,
          ImageUrl: "",
          Id: "BURSA",
          Name: "bursa"
        },
        Region: "Bursa",
        AccommodationSummary: {
          Allocations: {
            SharingRoomPax: 0,
            ChildSharingRoomPax: 0,
            SingleRoomPax: 0,
            ChildSingleRoomPax: 0,
            ExtraBedPax: 0,
            ChildExtraBedPax: 0,
            SharingBedPax: 0,
            NoBedPax: 0
          },
          Name: "Gold Majesty Bursa",
          Address:
            "Konak Mahallesi Lefkose Caddesi No:7 Nilufer/Bursa, Bursa 16110, Turkey",
          RoomType: "Double/Twin Sharing",
          RoomName: "Standard Room",
          RoomService: "With_breakfast",
          ServiceItemId: 36347,
          AccommodationProfileId: 125,
          SeqNumber: 0,
          DateTime: "2020-04-05T00:00:00"
        },
        Note: null
      },
      {
        Day: 3,
        TotalDays: 2,
        Date: "2020-04-06T19:00:00",
        LeavingDate: "2020-04-07T06:30:00",
        City: {
          UTC: 3,
          ImageUrl: "",
          Id: "KUSADASI",
          Name: "Kusadasi"
        },
        Region: "Aydin",
        AccommodationSummary: {
          Allocations: {
            SharingRoomPax: 0,
            ChildSharingRoomPax: 0,
            SingleRoomPax: 0,
            ChildSingleRoomPax: 0,
            ExtraBedPax: 0,
            ChildExtraBedPax: 0,
            SharingBedPax: 0,
            NoBedPax: 0
          },
          Name: "Royal Palace Kusadasi",
          Address:
            "Bayraklidede Mahallesi- Turgut Ozal Blv. No:64- 09400 Kusadasi/Aydin- Turkey",
          RoomType: "Double/Twin Sharing",
          RoomName: "Deluxe Room",
          RoomService: "With_breakfast",
          ServiceItemId: 70,
          AccommodationProfileId: 19,
          SeqNumber: 0,
          DateTime: "2020-04-06T00:00:00"
        },
        Note: null
      },
      {
        Day: 4,
        TotalDays: 2,
        Date: "2020-04-07T18:30:00",
        LeavingDate: "2020-04-08T06:30:00",
        City: {
          UTC: 3,
          ImageUrl: "",
          Id: "PAMUKKALE",
          Name: "Pamukkale"
        },
        Region: "Denizli",
        AccommodationSummary: {
          Allocations: {
            SharingRoomPax: 0,
            ChildSharingRoomPax: 0,
            SingleRoomPax: 0,
            ChildSingleRoomPax: 0,
            ExtraBedPax: 0,
            ChildExtraBedPax: 0,
            SharingBedPax: 0,
            NoBedPax: 0
          },
          Name: "Ninova Thermal Pamukkale",
          Address:
            "Karahayit Mah. 125 Cami Sokak No:26 Pamukkale- 20290 Pamukkale/Denizli- Turkey",
          RoomType: "Double/Twin Sharing",
          RoomName: "Twin Bed Room",
          RoomService: "With_breakfast",
          ServiceItemId: 36357,
          AccommodationProfileId: 20,
          SeqNumber: 0,
          DateTime: "2020-04-07T00:00:00"
        },
        Note: null
      },
      {
        Day: 5,
        TotalDays: 3,
        Date: "2020-04-08T19:30:00",
        LeavingDate: "2020-04-10T08:00:00",
        City: {
          UTC: 3,
          ImageUrl: "",
          Id: "CAPPADOCIA",
          Name: "Cappadocia"
        },
        Region: "Urgup",
        AccommodationSummary: {
          Allocations: {
            SharingRoomPax: 0,
            ChildSharingRoomPax: 0,
            SingleRoomPax: 0,
            ChildSingleRoomPax: 0,
            ExtraBedPax: 0,
            ChildExtraBedPax: 0,
            SharingBedPax: 0,
            NoBedPax: 0
          },
          Name: "Dinler Nevsehir",
          Address:
            '"Urgup - Aksaray Yolu Caddesi, 2 km, 50100 Nevsehir, Turkey"',
          RoomType: "Double/Twin Sharing",
          RoomName: "Club Room",
          RoomService: "With_breakfast",
          ServiceItemId: 36364,
          AccommodationProfileId: 1276,
          SeqNumber: 0,
          DateTime: "2020-04-08T00:00:00"
        },
        Note: null
      },
      {
        Day: 7,
        TotalDays: 3,
        Date: "2020-04-10T22:30:00",
        LeavingDate: "2020-04-12T10:00:00",
        City: {
          UTC: 3,
          ImageUrl:
            "https://touressapi.azurewebsites.net/Content/ImgSrc/Accommodations/TUrkey%20photo.jpeg",
          Id: "ISTANBUL",
          Name: "Istanbul"
        },
        Region: "Istanbul",
        AccommodationSummary: {
          Allocations: {
            SharingRoomPax: 0,
            ChildSharingRoomPax: 0,
            SingleRoomPax: 0,
            ChildSingleRoomPax: 0,
            ExtraBedPax: 0,
            ChildExtraBedPax: 0,
            SharingBedPax: 0,
            NoBedPax: 0
          },
          Name: "Golden Way Istanbul",
          Address:
            "Oruc Reis Mahallesi Vadi Caddesi Giyimkent Sitesi Katli Is Merkezi No:274, Esenler Istanbul Turkey, 34235, Turkey",
          RoomType: "Double/Twin Sharing",
          RoomName: "Deluxe Double or Twin Room",
          RoomService: "With_breakfast",
          ServiceItemId: 36265,
          AccommodationProfileId: 124,
          SeqNumber: 0,
          DateTime: "2020-04-10T00:00:00"
        },
        Note: null
      },
      {
        Day: 9,
        Date: "2020-04-12T13:30:00",
        City: {
          UTC: 3,
          ImageUrl:
            "https://touressapi.azurewebsites.net/Content/ImgSrc/Accommodations/TUrkey%20photo.jpeg",
          Id: "ISTANBUL",
          Name: "Istanbul"
        },
        Region: "Istanbul",
        Address:
          "Yesilkoy, 34149 Barkirkoy/Istanbul, Turkey, Istanbul, Istanbul, Turkey",
        PlaceType: "Airport",
        Place: "Istanbul Ataturk Airport",
        PlaceCode: null,
        PlaceId: 6,
        Note: "",
        TransferType: "Movement_departure"
      }
    ],
    Returns: [
      {
        Day: 10,
        Date: "2020-04-13T07:05:00",
        City: {
          UTC: 7,
          ImageUrl: "",
          Id: "JAKARTA",
          Name: "Jakarta"
        },
        Region: "Jakarta",
        Address:
          "Bandar Udara Internasional Soekarno–Hatta (CGK), Kota Tangerang, Banten, Central Jakarta, Jakarta, Jakarta, Indonesia",
        PlaceType: "Airport",
        Place: "Soekarno-Hatta International Airport",
        PlaceCode: null,
        PlaceId: 2,
        Note: "",
        TransferType: "Movement_arrival"
      }
    ]
  },
  TourPriceSum: {
    SharingRoomSum: {
      Pax: 0,
      FoCPax: 0,
      Currency: "USD",
      PricePerPax: 0.0,
      TotalPrice: 0.0
    },
    ChildSharingRoomSum: {
      Pax: 0,
      FoCPax: 0,
      Currency: null,
      PricePerPax: 0.0,
      TotalPrice: 0.0
    },
    SingleRoomSum: {
      Pax: 0,
      FoCPax: 0,
      Currency: "USD",
      PricePerPax: 0.0,
      TotalPrice: 0.0
    },
    ChildSingleRoomSum: {
      Pax: 0,
      FoCPax: 0,
      Currency: null,
      PricePerPax: 0.0,
      TotalPrice: 0.0
    },
    ExtraBedSum: {
      Pax: 0,
      FoCPax: 0,
      Currency: null,
      PricePerPax: 0.0,
      TotalPrice: 0.0
    },
    ChildExtraBedSum: {
      Pax: 0,
      FoCPax: 0,
      Currency: null,
      PricePerPax: 0.0,
      TotalPrice: 0.0
    },
    SharingBedSum: {
      Pax: 0,
      FoCPax: 0,
      Currency: null,
      PricePerPax: 0.0,
      TotalPrice: 0.0
    },
    NoBedSum: {
      Pax: 0,
      FoCPax: 0,
      Currency: null,
      PricePerPax: 0.0,
      TotalPrice: 0.0
    }
  },
  TourGuestSum: [],
  AdditionalItems: [],
  TransactionSupplements: [],
  BookingTemplateDescriptionBindingModels: [],
  TourNote: null
};
