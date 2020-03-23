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
import { resetTransactionAction } from '../../../actions/Transactions/TransactionAction';
import { createTransactionItemSeries } from '../../../helper/transactionHelper';
import { LinearGradient } from 'expo-linear-gradient';
import { ModalBottom } from '../../../components/modal';
import AnimatedEllipsis from 'react-native-animated-ellipsis';

class guestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Booking: {
        GuestAllocation: {},
        RoomAllocation: {},
        IsSplitStaffCommission: false,
        IsPrintInvoice: false,
        TourNote: '',
        Guests: null,
        AdditionalItem: null,
        Supplements: null,
        StartDate: new Date(),
        EndDate: new Date(),
        // GuestAllocation: this.props.guestData.Booking.GuestAllocation,
        // RoomAllocation: this.props.guestData.Booking.RoomAllocation,
        // IsSplitStaffCommission: this.props.guestData.Booking
        //   .IsSplitStaffCommission,
        // IsPrintInvoice: this.props.guestData.Booking.IsPrintInvoice,
        // TourNote: this.props.guestData.Booking.TourNote,
        // Guests: this.props.guestData.Booking.Guests,
        // AdditionalItem: this.props.guestData.Booking.AdditionalItem,
        // Supplements: this.props.guestData.Booking.Supplements,
        // StartDate: this.props.guestData.Booking.StartDate,
        // EndDate: this.props.guestData.Booking.EndDate
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
    //  this.setDataGuest(this.props.guestData);
  }

  componentDidUpdate() {
    if (this.props.guestData !== null) {
      this.setDataGuest(this.props.guestData);
      this.props.resetTransactionAction();
    }
  }

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
    this.props.navigation.navigate('GuestDetail', {
      onSelect: this.addGuest,
      index: i,
      guests: this.state.Booking.Guests,
    });
  };

  handlePressSummary = () => {
    const error = this.validate();
    let item = null;
    if (!error) {
      this.setState({ loading: true });
      item = createTransactionItemSeries(this.state.Booking);
      this.props.dispatch(
        post_demo_fix_packages(this.props.IdPackages, item, packageStatus)
      );
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
      this.props.dispatch(reset_post_demo_price());
      return false;
    } else if (nextProps.ispostDemoFixedPackages === 'failed') {
      this.setState({ loading: false });
      this.props.dispatch(reset_post_demo_price());
      Alert.alert('Failed', nextProps.postDemofixedPackages, [{ text: 'OK' }]);
      return false;
    } else return true;
  }

  render() {
    // const Data = this.state.Booking.Guests || "";
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
            colors={['#e6ca6b', '#ffd734']}
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
  // ispostDemoFixedPackages: state.fixPackagesReducer.ispostDemoFixedPackages,
  // postDemofixedPackages: state.fixPackagesReducer.postDemofixedPackages,
  guestData: state.transactionReducer.setGuestData,
  packageStatus: state.transactionReducer.packageStatusFromHomeToList,
  setGuestDataStatus: state.transactionReducer.setGuestDataStatus,
});

export default connect(mapStateToProps, { resetTransactionAction })(guestList);
