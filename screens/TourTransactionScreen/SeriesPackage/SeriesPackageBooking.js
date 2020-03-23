import React, { Component } from 'react';
import {
  Text,
  View,
  Picker,
  ScrollView,
  BackHandler,
  Platform,
  Image,
} from 'react-native';
import IOSPicker from 'react-native-ios-picker';
import { CardWithInputDuration, Card } from '../../../components/card';
import styles from '../styles';
import stylesGlobal from '../../../components/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container } from '../../../components/container';
import { ShimmerButton, ClearButton } from '../../../components/button';
import { TextWarning } from '../../../components/text';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SeperatorRepeat } from '../../../components/list';
import { Guest } from '../../../helper/dailyProgram';
import { convertRoundPrice } from '../../../helper/helper';
import { viewDate } from '../../../helper/timeHelper';
import { Ionicons } from '@expo/vector-icons';
import IconCalendar from '../../../assets/Icon/calendar.png';
import { setGuestDataAction } from '../../../actions/Transactions/TransactionAction';

class SeriesPackageBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Booking: {
        GuestAllocation: {
          Adult: 0,
          Child: 0,
          Infant: 0,
        },
        RoomAllocation: {
          SharingRoomQty: 0,
          SingleRoomQty: 0,
          ExtraBedQty: 0,
          ChildExtraBedQty: 0,
          SharingBedQty: 0,
          NoBed: 0,
        },
        IsSplitStaffCommission: null,
        IsPrintInvoice: null,
        TourNote: null,
        Guests: [],
        Supplements: [],
      },
      dataDetailPackages: null,
      errorGuestAllocation: '',
      errorRoomAllocation: '',
      errorStafCommission: '',
      errorPrintInvoice: '',
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });

    this.setState({
      dataDetailPackages: this.props.setPackageData,
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
            Qty: 0,
          };
        })
      : [];
    this.setState({
      Booking: {
        ...this.state.Booking,
        Supplements: newSuppements,
      },
    });
  }

  validate = () => {
    const {
      GuestAllocation,
      RoomAllocation,
      IsSplitStaffCommission,
      IsPrintInvoice,
      Supplements,
    } = this.state.Booking;
    let isError = false;
    const errors = {
      errorGuestAllocation: '',
      errorRoomAllocation: '',
      errorStafCommission: '',
      errorPrintInvoice: '',
    };
    const MinPax = this.props.setPackageData
      ? this.props.setPackageData.MinPax
      : 0;

    const totalGuest =
      GuestAllocation.Adult + GuestAllocation.Child + GuestAllocation.Infant;
    const totalRoom =
      RoomAllocation.SharingRoomQty +
      RoomAllocation.SingleRoomQty +
      RoomAllocation.ExtraBedQty +
      RoomAllocation.ChildExtraBedQty +
      RoomAllocation.SharingBedQty +
      RoomAllocation.NoBed;
    const QuotaPax = this.props.setPackageData
      ? this.props.setPackageData.BookingDetailSum.FixedPackage.MinimumGuest -
        this.props.setPackageData.BookingDetailSum.FixedPackage.ConfirmedGuest
      : 0;
    if (totalGuest == 0) {
      isError = true;
      errors.errorGuestAllocation = 'Please input guest ammount';
    } else if (QuotaPax != 0) {
      if (totalGuest > QuotaPax) {
        isError = true;
        errors.errorGuestAllocation = 'Guest cannot more than available pax';
      }
    }
    if (GuestAllocation.Adult == 0) {
      isError = true;
      errors.errorGuestAllocation = 'Please input at least 1 adult';
    }

    if (MinPax > totalGuest) {
      isError = true;
      errors.errorGuestAllocation = 'Please input guest minimum ' + MinPax;
    }

    if (totalRoom == 0) {
      isError = true;
      errors.errorRoomAllocation = 'Please input room option';
    } else if (totalRoom != totalGuest) {
      isError = true;
      errors.errorRoomAllocation = 'Room option not same with total guest';
    }
    if (this.state.dataDetailPackages.Commissions != null) {
      if (this.state.dataDetailPackages.Commissions.length != 0) {
        if (IsSplitStaffCommission == null) {
          isError = true;
          errors.errorStafCommission = 'Please selected split staff commission';
        }

        if (IsPrintInvoice == null && IsSplitStaffCommission == false) {
          isError = true;
          errors.errorPrintInvoice = 'Please selected print invoice';
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
      ...errors,
    });
    return isError;
  };

  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    data: PropTypes.object,
    supplement: PropTypes.array,
  };

  handlePressguest = async () => {
    let Guests = [];
    const { Adult, Child, Infant } = this.state.Booking.GuestAllocation;
    for (let i = 0; i < Adult; i++) Guests.push(new Guest('ADULT'));
    for (let i = 0; i < Child; i++) Guests.push(new Guest('CHILD'));
    for (let i = 0; i < Infant; i++) Guests.push(new Guest('INFANT'));

    const error = this.validate();
    if (!error) {
      const data = {
        Booking: this.state.Booking,
        Guest: Guests,
      };
      await this.props.setGuestDataAction(data);
      this.props.navigation.navigate('Guest', {
        screen: 'GuestList',
        params: { type: 'series' },
      });
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
        Supplements: Supplements,
      },
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
        Supplements: Supplements,
      },
    });
  };

  handleOnChangeSupp = (index, value) => {
    if (this.state.Booking.Supplements[index].IsMandatory == false) {
      let Supplements = [...this.state.Booking.Supplements];
      Supplements[index].Qty = value;
      this.setState({
        Booking: {
          ...this.state.Booking,
          Supplements: Supplements,
        },
      });
    } else {
      let Supplements = [...this.state.Booking.Supplements];
      Supplements[index].Qty =
        this.state.Booking.GuestAllocation.Adult +
        this.state.Booking.GuestAllocation.Child;
      this.setState({
        Booking: {
          ...this.state.Booking,
          Supplements: Supplements,
        },
      });
    }
  };

  handleChange = (Sub1, Sub2, value) => {
    this.setState({
      Booking: {
        ...this.state.Booking,
        [Sub1]: {
          ...this.state.Booking[Sub1],
          [Sub2]: parseInt(value),
        },
      },
    });
  };

  handleSeeAll = () => {
    this.props.navigation.pop();
  };

  handleReadMore = () => {
    this.props.navigation.navigate('ImportantInformation', {
      Desc: this.props.setPackageData
        ? this.props.setPackageData.Descriptions
        : '',
    });
  };

  render() {
    const GuestForAddMandatory =
      this.state.Booking.GuestAllocation.Adult +
      this.state.Booking.GuestAllocation.Child;
    // const price = this.props.data.Prices ? this.props.data.Prices : "";
    const price = this.props.setPackageData
      ? this.props.setPackageData.Prices
        ? this.props.setPackageData.Prices
        : ''
      : '';
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
        : '';
    const TotalAdd =
      PriceAdd.length != 0
        ? PriceAdd.reduce(function(val, val2) {
            return val + val2;
          })
        : null;
    const MinPax = this.props.setPackageData
      ? this.props.setPackageData.MinPax
      : 0;
    return (
      <Container>
        <ScrollView style={stylesGlobal.containerScrollSeriesOption}>
          <Container paddingbottomcontainer={70} paddingtopcontainer={20}>
            <View
              style={[
                stylesGlobal.row100,
                styles.paddingHorizontal20,
                stylesGlobal.paddingBottom10,
              ]}
            >
              <View style={stylesGlobal.width50}>
                <Text style={[stylesGlobal.text20, stylesGlobal.textBold]}>
                  {this.state.dataDetailPackages
                    ? this.state.dataDetailPackages.BookingDetailSum.Title
                    : ''}
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
                stylesGlobal.paddingBottom10,
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
                {' '}
                {this.state.dataDetailPackages
                  ? viewDate(
                      this.state.dataDetailPackages.BookingDetailSum.StartDate
                    )
                  : ''}
                {' -'}{' '}
                {this.state.dataDetailPackages
                  ? viewDate(
                      this.state.dataDetailPackages.BookingDetailSum.EndDate
                    )
                  : ''}
              </Text>
            </View>
            <View style={styles.paddingHorizontal20}>
              {MinPax == 0 ? null : (
                <View style={stylesGlobal.rowStart}>
                  <View
                    style={[
                      styles.cardWarningMinPax,
                      styles.paddingHorizontal10,
                      styles.rowCenter,
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
                    stylesGlobal.textBold,
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
                        this.handleChange('GuestAllocation', 'Adult', text);
                      }}
                      Decrement={() => {
                        if (this.state.Booking.GuestAllocation.Adult != 0)
                          this.handleChange(
                            'GuestAllocation',
                            'Adult',
                            this.state.Booking.GuestAllocation.Adult - 1
                          );
                      }}
                      Increment={() =>
                        this.handleChange(
                          'GuestAllocation',
                          'Adult',
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
                        this.handleChange('GuestAllocation', 'Child', text);
                      }}
                      Decrement={() => {
                        if (this.state.Booking.GuestAllocation.Child != 0)
                          this.handleChange(
                            'GuestAllocation',
                            'Child',
                            this.state.Booking.GuestAllocation.Child - 1
                          );
                      }}
                      Increment={() =>
                        this.handleChange(
                          'GuestAllocation',
                          'Child',
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
                        this.handleChange('GuestAllocation', 'Infant', text);
                      }}
                      Decrement={() => {
                        if (this.state.Booking.GuestAllocation.Infant != 0)
                          this.handleChange(
                            'GuestAllocation',
                            'Infant',
                            this.state.Booking.GuestAllocation.Infant - 1
                          );
                      }}
                      Increment={() =>
                        this.handleChange(
                          'GuestAllocation',
                          'Infant',
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
                    stylesGlobal.textBold,
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
                            'RoomAllocation',
                            'SharingRoomQty',
                            text
                          );
                        }}
                        Decrement={() => {
                          if (
                            this.state.Booking.RoomAllocation.SharingRoomQty !=
                            0
                          )
                            this.handleChange(
                              'RoomAllocation',
                              'SharingRoomQty',
                              this.state.Booking.RoomAllocation.SharingRoomQty -
                                1
                            );
                        }}
                        Increment={() =>
                          this.handleChange(
                            'RoomAllocation',
                            'SharingRoomQty',
                            this.state.Booking.RoomAllocation.SharingRoomQty + 1
                          )
                        }
                        widthCard="100%"
                        heightCard="30%"
                        subtext={
                          price.CurrencyId +
                          ' ' +
                          convertRoundPrice(
                            price.SharingRoomPrice,
                            price.CurrencyId
                          ) +
                          ' /Pax'
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
                            'RoomAllocation',
                            'SingleRoomQty',
                            text
                          );
                        }}
                        Decrement={() => {
                          if (
                            this.state.Booking.RoomAllocation.SingleRoomQty != 0
                          )
                            this.handleChange(
                              'RoomAllocation',
                              'SingleRoomQty',
                              this.state.Booking.RoomAllocation.SingleRoomQty -
                                1
                            );
                        }}
                        Increment={() =>
                          this.handleChange(
                            'RoomAllocation',
                            'SingleRoomQty',
                            this.state.Booking.RoomAllocation.SingleRoomQty + 1
                          )
                        }
                        widthCard="100%"
                        heightCard="30%"
                        subtext={
                          price.CurrencyId +
                          ' ' +
                          convertRoundPrice(
                            price.SingleRoomPrice,
                            price.CurrencyId
                          ) +
                          ' /Pax'
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
                            'RoomAllocation',
                            'SharingBedQty',
                            text
                          );
                        }}
                        Decrement={() => {
                          if (
                            this.state.Booking.RoomAllocation.SharingBedQty != 0
                          )
                            this.handleChange(
                              'RoomAllocation',
                              'SharingBedQty',
                              this.state.Booking.RoomAllocation.SharingBedQty -
                                1
                            );
                        }}
                        Increment={() =>
                          this.handleChange(
                            'RoomAllocation',
                            'SharingBedQty',
                            this.state.Booking.RoomAllocation.SharingBedQty + 1
                          )
                        }
                        widthCard="100%"
                        heightCard="30%"
                        subtext={
                          price.CurrencyId +
                          ' ' +
                          convertRoundPrice(
                            price.SharingBedPrice,
                            price.CurrencyId
                          ) +
                          ' /Pax'
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
                            'RoomAllocation',
                            'ExtraBedQty',
                            text
                          );
                        }}
                        Decrement={() => {
                          if (
                            this.state.Booking.RoomAllocation.ExtraBedQty != 0
                          )
                            this.handleChange(
                              'RoomAllocation',
                              'ExtraBedQty',
                              this.state.Booking.RoomAllocation.ExtraBedQty - 1
                            );
                        }}
                        Increment={() =>
                          this.handleChange(
                            'RoomAllocation',
                            'ExtraBedQty',
                            this.state.Booking.RoomAllocation.ExtraBedQty + 1
                          )
                        }
                        widthCard="100%"
                        heightCard="30%"
                        subtext={
                          price.CurrencyId +
                          ' ' +
                          convertRoundPrice(
                            price.AdultExtraBedPrice,
                            price.CurrencyId
                          ) +
                          ' /Pax'
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
                            'RoomAllocation',
                            'ChildExtraBedQty',
                            text
                          );
                        }}
                        Decrement={() => {
                          if (
                            this.state.Booking.RoomAllocation
                              .ChildExtraBedQty != 0
                          )
                            this.handleChange(
                              'RoomAllocation',
                              'ChildExtraBedQty',
                              this.state.Booking.RoomAllocation
                                .ChildExtraBedQty - 1
                            );
                        }}
                        Increment={() =>
                          this.handleChange(
                            'RoomAllocation',
                            'ChildExtraBedQty',
                            this.state.Booking.RoomAllocation.ChildExtraBedQty +
                              1
                          )
                        }
                        widthCard="100%"
                        heightCard="30%"
                        subtext={
                          price.CurrencyId +
                          ' ' +
                          convertRoundPrice(
                            price.ChildExtraBedPrice,
                            price.CurrencyId
                          ) +
                          ' /Pax'
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
                          this.handleChange('RoomAllocation', 'NoBed', text);
                        }}
                        Decrement={() => {
                          if (this.state.Booking.RoomAllocation.NoBed != 0)
                            this.handleChange(
                              'RoomAllocation',
                              'NoBed',
                              this.state.Booking.RoomAllocation.NoBed - 1
                            );
                        }}
                        Increment={() =>
                          this.handleChange(
                            'RoomAllocation',
                            'NoBed',
                            this.state.Booking.RoomAllocation.NoBed + 1
                          )
                        }
                        widthCard="100%"
                        heightCard="30%"
                        subtext={
                          price.CurrencyId +
                          ' ' +
                          convertRoundPrice(
                            price.NoBedPrice,
                            price.CurrencyId
                          ) +
                          ' /Pax'
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
                      stylesGlobal.textBold,
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
                              ' ' +
                              convertRoundPrice(Add.Value, Add.CurrencyId) +
                              ' /Pax'
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
                          stylesGlobal.textBold,
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
                          stylesGlobal.paddingBottom20,
                        ]}
                      >
                        <Text style={[styles.text14Wrap, styles.bold12]}>
                          Do you want to split the staff commission ?
                        </Text>

                        <View
                          style={[
                            stylesGlobal.row100,
                            styles.containerDropDown,
                            stylesGlobal.marginBottom20,
                          ]}
                        >
                          {Platform.OS === 'ios' ? (
                            <IOSPicker
                              mode="modal"
                              textStyle={styles.textPicker}
                              style={styles.dropdownIos}
                              selectedValue={
                                this.state.Booking.IsSplitStaffCommission ==
                                true ? (
                                  'Yes'
                                ) : this.state.Booking.IsSplitStaffCommission ==
                                  false ? (
                                  'No'
                                ) : (
                                  <Text
                                    style={[
                                      stylesGlobal.text14,
                                      styles.colorgreylight2,
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
                                    IsSplitStaffCommission: itemValue,
                                  },
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
                                    IsSplitStaffCommission: itemValue,
                                  },
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
                                styles.containerDropDown,
                              ]}
                            >
                              {Platform.OS === 'ios' ? (
                                <IOSPicker
                                  mode="modal"
                                  textStyle={styles.textPicker}
                                  style={styles.dropdownIos}
                                  selectedValue={
                                    this.state.Booking.IsPrintInvoice ==
                                    true ? (
                                      'Yes'
                                    ) : this.state.Booking.IsPrintInvoice ==
                                      false ? (
                                      'No'
                                    ) : (
                                      <Text
                                        style={[
                                          stylesGlobal.text14,
                                          styles.colorgreylight2,
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
                                        IsPrintInvoice: itemValue,
                                      },
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
                                        IsPrintInvoice: itemValue,
                                      },
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
                                styles.backgroundWaring,
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
                                stylesGlobal.padding10,
                              ]}
                            >
                              <View style={styles.col50}>
                                <Text style={styles.text12}>
                                  Agent Commission{' '}
                                </Text>
                              </View>
                              <View
                                style={[
                                  styles.col50,
                                  stylesGlobal.alignItemsEnd,
                                ]}
                              >
                                <Text style={styles.text12}>
                                  {price.CurrencyId}{' '}
                                  {this.props.setPackageData
                                    ? convertRoundPrice(
                                        this.props.setPackageData.Commissions[0]
                                          .Value,
                                        price.CurrencyId
                                      )
                                    : 0}
                                </Text>
                              </View>
                            </View>
                          ) : this.state.Booking.IsPrintInvoice === true ? (
                            <View>
                              <View
                                style={[
                                  stylesGlobal.row100,
                                  stylesGlobal.padding10,
                                ]}
                              >
                                <View style={styles.col50}>
                                  <Text style={styles.text12}>
                                    Agent Commission{' '}
                                  </Text>
                                </View>
                                <View
                                  style={[
                                    styles.col50,
                                    stylesGlobal.alignItemsEnd,
                                  ]}
                                >
                                  <Text style={styles.text12}>
                                    {price.CurrencyId}{' '}
                                    {this.props.setPackageData
                                      ? convertRoundPrice(
                                          this.props.setPackageData
                                            .Commissions[0].Value,
                                          price.CurrencyId
                                        )
                                      : 0}
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={[
                                  stylesGlobal.row100,
                                  stylesGlobal.padding10,
                                ]}
                              >
                                <View style={styles.col50}>
                                  <Text style={styles.text12}>
                                    Staff Commission{' '}
                                  </Text>
                                </View>
                                <View style={styles.col50}>
                                  <Text style={styles.text12}>
                                    {price.CurrencyId}{' '}
                                    {this.props.setPackageData
                                      ? convertRoundPrice(
                                          this.props.setPackageData
                                            .Commissions[1].Value,
                                          price.CurrencyId
                                        )
                                      : 0}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          ) : this.state.Booking.IsPrintInvoice === false ? (
                            <View
                              style={[
                                stylesGlobal.row100,
                                stylesGlobal.padding10,
                              ]}
                            >
                              <View style={styles.col50}>
                                <Text style={styles.text12}>
                                  Total Commission{' '}
                                </Text>
                              </View>
                              <View
                                style={[
                                  styles.col50,
                                  stylesGlobal.alignItemsEnd,
                                ]}
                              >
                                <Text style={styles.text12}>
                                  {price.CurrencyId}{' '}
                                  {this.props.setPackageData
                                    ? convertRoundPrice(
                                        this.props.setPackageData.Commissions[0]
                                          .Value +
                                          ththis.props.setPackageData
                                            .Commissions[1].Value,
                                        price.CurrencyId
                                      )
                                    : 0}
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
                Total Price{' '}
              </Text>
              <View style={stylesGlobal.width100}>
                <Text style={styles.right}>
                  <Text
                    style={[
                      stylesGlobal.text20,
                      stylesGlobal.textSemiBold,
                      stylesGlobal.textWhite,
                    ]}
                  >
                    {price.CurrencyId}{' '}
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
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
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

const mapStateToProps = state => ({
  setPackageData: state.transactionReducer.setPackageData,
  packageStatus: state.transactionReducer.packageStatusFromHomeToList,
});
export default connect(mapStateToProps, {
  setGuestDataAction,
})(SeriesPackageBooking);

// export default SeriesPackageBooking;
