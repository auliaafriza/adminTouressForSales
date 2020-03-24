import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  BackHandler,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Container } from '../../../components/container/index';
import { NormalButton, ClearButton } from '../../../components/button';
import styles from '../styles';
import stylesGlobal from '../../../components/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SeperatorRepeat } from '../../../components/list';
import { TextWarning } from '../../../components/text';
import { Card } from '../../../components/card';
// import {
//   post_demo_fix_packages,
//   reset_post_demo_price,
// } from '../../actions/fixPackagesAction';
import {
  resetTransactionAction,
  postDemoJoinTour,
  postDemoCreateTour,
  resetStatusPostDemo,
} from '../../../actions/Transactions/TransactionAction';
import {
  createTransactionItemSeries,
  transactionItemQuotation,
  transactionItemDemoFixPrice,
  transactionItemDemo,
} from '../../../helper/transactionHelper';
import { LinearGradient } from 'expo-linear-gradient';
import { ModalBottom } from '../../../components/modal';
import AnimatedEllipsis from 'react-native-animated-ellipsis';

class guestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Booking: null,
      Booking: {
        GuestAllocation: this.props.route.params.Booking.GuestAllocation,
        RoomAllocation: this.props.route.params.Booking.RoomAllocation,
        IsSplitStaffCommission: this.props.route.params.Booking
          .IsSplitStaffCommission,
        IsPrintInvoice: this.props.route.params.Booking.IsPrintInvoice,
        TourNote: this.props.route.params.Booking.TourNote,
        Guests: this.props.route.params.Booking.Guests,
        AdditionalItem: this.props.route.params.Booking.AdditionalItem,
        Supplements: this.props.route.params.Booking.Supplements,
        StartDate: this.props.route.params.Booking.StartDate,
        EndDate: this.props.route.params.Booking.EndDate,
      },
      loading: false,
      errorValidation: '',
      changeSplit: '',
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
    // this.props.route.params.type == 'series'
    //   ? this.setDataGuest(this.props.guestData)
    //   : this.setDataCustom();
  }

  // componentDidUpdate() {
  //   if (this.props.guestData !== null) {
  //     this.setDataGuest(this.props.guestData);
  //     this.props.resetTransactionAction();
  //   }
  // }

  setDataGuest = guestData => {
    this.setState({
      Booking: {
        GuestAllocation: guestData.Booking.GuestAllocation,
        RoomAllocation: guestData.Booking.RoomAllocation,
        IsSplitStaffCommission: guestData.Booking.IsSplitStaffCommission,
        IsPrintInvoice: guestData.Booking.IsPrintInvoice,
        TourNote: guestData.Booking.TourNote,
        Guests: guestData.Booking.Guests,
        AdditionalItem: guestData.Booking.AdditionalItem,
        Supplements: guestData.Booking.Supplements,
        StartDate: guestData.Booking.StartDate,
        EndDate: guestData.Booking.EndDate,
      },
    });
  };

  setDataCustom = () => {
    this.setState({
      Booking: this.props.Guest,
    });
  };

  validate = () => {
    const guest = this.state.Booking.Guests[0];
    let isError = false;
    const errors = {
      errorValidation: '',
    };

    if (
      guest.FirstName == null &&
      guest.LastName == null &&
      guest.IdentityNbr == null
    ) {
      isError = true;
      errors.errorValidation = 'This field is required';
    }

    this.setState({
      ...this.state,
      ...errors,
    });
    return isError;
  };

  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    IdPackages: PropTypes.number,
    ispostDemoFixedPackages: PropTypes.string,
    postDemofixedPackages: PropTypes.string,
    Guest: PropTypes.object,
  };

  addGuest = data => {
    this.setState({
      Booking: {
        ...this.state.Booking,
        Guests: data,
      },
    });
  };

  handlePressDetail = i => {
    // this.props.navigation.navigate('GuestDetail', {
    //   onSelect: this.addGuest,
    //   index: i,
    //   guests: this.state.Booking.Guests,
    // });
    this.props.navigation.navigate('Guest', {
      screen: 'GuestDetail',
      params: {
        onSelect: this.addGuest,
        index: i,
        guests: this.state.Booking.Guests,
      },
    });
  };

  handlePressSummary = async () => {
    const error = this.validate();
    let item = null;
    let packageStatus =
      this.props.route.params.type == 'series'
        ? 'Fixed'
        : this.props.DetailCustom.Status;
    if (!error) {
      this.setState({ loading: true });
      if (this.props.route.params.type == 'series') {
        item = createTransactionItemSeries(this.state.Booking);
      } else {
        if (this.props.DetailCustom.Status == 'edit') {
          item = await transactionItemQuotation(
            this.props.DetailCustom,
            this.props.SummaryProgram,
            this.props.DailyProgram,
            this.state.Departures,
            this.state.Returns,
            this.state.Guest,
            this.props.Operator,
            this.props.AdditionalService
          );
        } else if (this.props.DetailCustom.Status == 'FixedDateVariable') {
          item = await transactionItemDemoFixPrice(
            this.props.DetailCustom,
            this.props.DailyProgram,
            this.state.Guest,
            this.props.Operator,
            this.props.AdditionalService
          );
        } else {
          item = await transactionItemDemo(
            this.props.DetailCustom,
            this.props.SummaryProgram,
            this.props.DailyProgram,
            this.state.Departures,
            this.state.Returns,
            this.state.Guest,
            this.props.Operator,
            this.props.AdditionalService
          );
        }
      }
      this.props.route.params.type == 'series' ||
      this.props.DetailCustom.Status == 'FixedDateVariable'
        ? this.props.postDemoJoinTour(
            this.props.IdPackages,
            item,
            packageStatus
          )
        : this.props.postDemoCreateTour(item);
    }
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.ispostDemoFixedPackages === 'success') {
      this.setState({ loading: false });
      this.props.navigation.navigate('Summary', {
        screen: 'TourSummarySeries',
        params: {
          Guest: this.state.Booking,
        },
      });
      this.props.resetStatusPostDemo();
      return false;
    } else if (nextProps.ispostDemoFixedPackages === 'failed') {
      this.setState({ loading: false });
      this.props.resetStatusPostDemo();
      Alert.alert('Failed', nextProps.postDemofixedPackages, [{ text: 'OK' }]);
      return false;
    } else return true;
  }

  render() {
    const Data = this.state.Booking.Guests || '';
    let num = 0;
    return (
      <Container>
        <ModalBottom height="50%" visible={this.state.loading} isCenter={true}>
          <Text style={stylesGlobal.text18}>Loading your summary</Text>
          <AnimatedEllipsis style={stylesGlobal.text24} />
        </ModalBottom>
        <ScrollView style={styles.containerScroll}>
          <Container paddingtopcontainer={20}>
            {this.state.Booking.GuestAllocation.Adult != 0 ? (
              <Card style={styles.bottom} widthCard="90%" topMargin={10}>
                <View>
                  {this.state.Booking.Guests
                    ? this.state.Booking.Guests.map((guest, i, ListGuest) => {
                        num =
                          i == 0
                            ? 1
                            : ListGuest[i - 1].GuestCategory ==
                              guest.GuestCategory
                            ? num + 1
                            : 1;

                        return guest.GuestCategory == 'ADULT' ? (
                          <View key={i}>
                            <View style={styles.bottom}>
                              {num == 1 ? (
                                <View>
                                  <Text
                                    style={[
                                      stylesGlobal.paddingTop20,
                                      stylesGlobal.text18,
                                      stylesGlobal.textBold,
                                      stylesGlobal.paddingHorizontal20,
                                    ]}
                                  >
                                    {guest.GuestCategory}
                                  </Text>
                                  <View
                                    style={[
                                      stylesGlobal.width100,
                                      stylesGlobal.hidden,
                                    ]}
                                  >
                                    <SeperatorRepeat
                                      repeat={31}
                                      widthsepar={8}
                                      heightSepar={1}
                                      colorSepar="#777"
                                    />
                                  </View>
                                </View>
                              ) : null}
                              {i == 0 ? (
                                <View
                                  style={[
                                    stylesGlobal.row100,
                                    stylesGlobal.paddingHorizontal20,
                                  ]}
                                >
                                  <View
                                    style={[
                                      stylesGlobal.width70,
                                      stylesGlobal.rowStart,
                                    ]}
                                  >
                                    <Text
                                      style={stylesGlobal.paddingVeritical10}
                                    >
                                      {num +
                                        '. ' +
                                        (guest.FirstName
                                          ? guest.GuestTitle +
                                            ' ' +
                                            guest.FirstName +
                                            ' ' +
                                            guest.LastName
                                          : 'Guest')}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      stylesGlobal.width30,
                                      stylesGlobal.alignItemEnd,
                                    ]}
                                  >
                                    <ClearButton
                                      text={
                                        guest.FirstName ? 'Edit' : 'Fill Detail'
                                      }
                                      textColor={styles.$goldcolor}
                                      bold
                                      textSize={14}
                                      onPress={() => this.handlePressDetail(i)}
                                    />
                                  </View>
                                </View>
                              ) : (
                                <View
                                  style={[
                                    stylesGlobal.row100,
                                    stylesGlobal.paddingHorizontal20,
                                  ]}
                                >
                                  <View
                                    style={[
                                      stylesGlobal.width70,
                                      stylesGlobal.rowStart,
                                    ]}
                                  >
                                    <Text
                                      style={stylesGlobal.paddingVeritical10}
                                    >
                                      {num +
                                        '. ' +
                                        (guest.FirstName
                                          ? guest.GuestTitle +
                                            ' ' +
                                            guest.FirstName +
                                            ' ' +
                                            guest.LastName
                                          : 'Guest')}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      stylesGlobal.width30,
                                      stylesGlobal.alignItemEnd,
                                    ]}
                                  >
                                    <ClearButton
                                      text={
                                        guest.FirstName ? 'Edit' : 'Fill Detail'
                                      }
                                      textColor={styles.$goldcolor}
                                      bold
                                      textSize={14}
                                      onPress={() => this.handlePressDetail(i)}
                                    />
                                  </View>
                                </View>
                              )}
                            </View>
                          </View>
                        ) : null;
                      })
                    : null}
                </View>
                <TextWarning
                  show={true}
                  textwarning={this.state.errorValidation}
                />
              </Card>
            ) : null}

            {this.state.Booking.GuestAllocation.Child != 0 ? (
              <Card style={styles.bottom} widthCard="90%" topMargin={20}>
                <View>
                  {this.state.Booking.Guests
                    ? this.state.Booking.Guests.map((guest, i, ListGuest) => {
                        num =
                          i == 0
                            ? 1
                            : ListGuest[i - 1].GuestCategory ==
                              guest.GuestCategory
                            ? num + 1
                            : 1;
                        return guest.GuestCategory == 'CHILD' ||
                          guest.GuestCategory == 'CHILDREN' ? (
                          <View key={i}>
                            <View style={styles.bottom}>
                              {num == 1 ? (
                                <View>
                                  <Text
                                    style={[
                                      stylesGlobal.paddingTop20,
                                      stylesGlobal.text18,
                                      stylesGlobal.textBold,
                                      stylesGlobal.paddingHorizontal20,
                                    ]}
                                  >
                                    {guest.GuestCategory}
                                  </Text>
                                  <View
                                    style={[
                                      stylesGlobal.width100,
                                      stylesGlobal.hidden,
                                    ]}
                                  >
                                    <SeperatorRepeat
                                      repeat={31}
                                      widthsepar={8}
                                      heightSepar={1}
                                      colorSepar="#777"
                                    />
                                  </View>
                                </View>
                              ) : null}
                              {i == 0 ? (
                                <View
                                  style={[
                                    stylesGlobal.row100,
                                    stylesGlobal.paddingHorizontal20,
                                  ]}
                                >
                                  <View
                                    style={[
                                      stylesGlobal.width70,
                                      stylesGlobal.rowStart,
                                    ]}
                                  >
                                    <Text
                                      style={stylesGlobal.paddingVeritical10}
                                    >
                                      {num +
                                        '. ' +
                                        (guest.FirstName
                                          ? guest.GuestTitle +
                                            ' ' +
                                            guest.FirstName +
                                            ' ' +
                                            guest.LastName
                                          : 'Guest')}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      stylesGlobal.width30,
                                      stylesGlobal.alignItemEnd,
                                    ]}
                                  >
                                    <ClearButton
                                      text={
                                        guest.FirstName ? 'Edit' : 'Fill Detail'
                                      }
                                      textColor={styles.$goldcolor}
                                      bold
                                      textSize={14}
                                      onPress={() => this.handlePressDetail(i)}
                                    />
                                  </View>
                                </View>
                              ) : (
                                <View
                                  style={[
                                    stylesGlobal.row100,
                                    stylesGlobal.paddingHorizontal20,
                                  ]}
                                >
                                  <View
                                    style={[
                                      stylesGlobal.width70,
                                      stylesGlobal.rowStart,
                                    ]}
                                  >
                                    <Text>
                                      {num +
                                        '. ' +
                                        (guest.FirstName
                                          ? guest.GuestTitle +
                                            ' ' +
                                            guest.FirstName +
                                            ' ' +
                                            guest.LastName
                                          : 'Guest')}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      stylesGlobal.width30,
                                      stylesGlobal.alignItemEnd,
                                    ]}
                                  >
                                    <ClearButton
                                      text={
                                        guest.FirstName ? 'Edit' : 'Fill Detail'
                                      }
                                      textColor={styles.$goldcolor}
                                      bold
                                      textSize={14}
                                      onPress={() => this.handlePressDetail(i)}
                                    />
                                  </View>
                                </View>
                              )}
                            </View>
                          </View>
                        ) : null;
                      })
                    : null}
                </View>
              </Card>
            ) : null}

            {this.state.Booking.GuestAllocation.Infant != 0 ? (
              <Card style={styles.bottom} widthCard="90%" topMargin={20}>
                <View>
                  {this.state.Booking.Guests
                    ? this.state.Booking.Guests.map((guest, i, ListGuest) => {
                        num =
                          i == 0
                            ? 1
                            : ListGuest[i - 1].GuestCategory ==
                              guest.GuestCategory
                            ? num + 1
                            : 1;
                        return guest.GuestCategory == 'INFANT' ? (
                          <View key={i}>
                            <View style={styles.bottom}>
                              {num == 1 ? (
                                <View>
                                  <Text
                                    style={[
                                      stylesGlobal.paddingTop20,
                                      stylesGlobal.text18,
                                      stylesGlobal.textBold,
                                      stylesGlobal.paddingHorizontal20,
                                    ]}
                                  >
                                    {guest.GuestCategory}
                                  </Text>
                                  <View
                                    style={[
                                      stylesGlobal.width100,
                                      stylesGlobal.hidden,
                                    ]}
                                  >
                                    <SeperatorRepeat
                                      repeat={31}
                                      widthsepar={8}
                                      heightSepar={1}
                                      colorSepar="#777"
                                    />
                                  </View>
                                </View>
                              ) : null}
                              {i == 0 ? (
                                <View
                                  style={[
                                    stylesGlobal.row100,
                                    stylesGlobal.paddingHorizontal20,
                                  ]}
                                >
                                  <View
                                    style={[
                                      stylesGlobal.width70,
                                      stylesGlobal.rowStart,
                                    ]}
                                  >
                                    <Text>
                                      {num +
                                        '. ' +
                                        (guest.FirstName
                                          ? guest.GuestTitle +
                                            ' ' +
                                            guest.FirstName +
                                            ' ' +
                                            guest.LastName
                                          : 'Guest')}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      stylesGlobal.width30,
                                      stylesGlobal.alignItemEnd,
                                    ]}
                                  >
                                    <ClearButton
                                      text={
                                        guest.FirstName ? 'Edit' : 'Fill Detail'
                                      }
                                      textColor={styles.$goldcolor}
                                      bold
                                      textSize={14}
                                      onPress={() => this.handlePressDetail(i)}
                                    />
                                  </View>
                                </View>
                              ) : (
                                <View
                                  style={[
                                    stylesGlobal.row100,
                                    stylesGlobal.paddingHorizontal20,
                                  ]}
                                >
                                  <View
                                    style={[
                                      stylesGlobal.width70,
                                      stylesGlobal.rowStart,
                                    ]}
                                  >
                                    <Text>
                                      {num +
                                        '. ' +
                                        (guest.FirstName
                                          ? guest.GuestTitle +
                                            ' ' +
                                            guest.FirstName +
                                            ' ' +
                                            guest.LastName
                                          : 'Guest')}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      stylesGlobal.width30,
                                      stylesGlobal.alignItemEnd,
                                    ]}
                                  >
                                    <ClearButton
                                      text={
                                        guest.FirstName ? 'Edit' : 'Fill Detail'
                                      }
                                      textColor={styles.$goldcolor}
                                      bold
                                      textSize={14}
                                      onPress={() => this.handlePressDetail(i)}
                                    />
                                  </View>
                                </View>
                              )}
                            </View>
                          </View>
                        ) : null;
                      })
                    : null}
                </View>
                {/* <TextWarning
                  show={true}
                  textwarning={this.state.errorValidation}
                /> */}
              </Card>
            ) : null}
          </Container>
        </ScrollView>
        <TouchableOpacity
          style={[styles.footer, styles.topRadius]}
          onPress={this.handlePressSummary}
        >
          <LinearGradient
            colors={['#38AF95', '#75BDAE']}
            style={[styles.footer, styles.topRadius]}
            start={[0, 0]}
            end={[1, 0]}
          >
            <NormalButton
              textSize={17}
              text="NEXT"
              buttonWidth="100%"
              textColor="#252525"
              buttonColor="transparent"
              onPress={this.handlePressSummary}
            />
          </LinearGradient>
        </TouchableOpacity>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  // IdPackages: state.fixPackagesReducer.id,
  ispostDemoFixedPackages: state.transactionReducer.postDemoStatus,
  postDemofixedPackages: state.transactionReducer.postDemo,
  guestData: state.transactionReducer.setGuestData,
  packageStatus: state.transactionReducer.packageStatusFromHomeToList,
  setGuestDataStatus: state.transactionReducer.setGuestDataStatus,
  Guest: state.generalReducer.guestData,
  IdPackages: state.transactionReducer.packageIdFromSystem,
});

export default connect(mapStateToProps, {
  resetTransactionAction,
  postDemoJoinTour,
  postDemoCreateTour,
  resetStatusPostDemo,
})(guestList);
