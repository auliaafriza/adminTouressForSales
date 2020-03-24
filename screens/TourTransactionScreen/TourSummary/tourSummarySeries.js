import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  Linking,
  BackHandler,
  Image,
  // Dimensions,
  // Platform,
  TouchableOpacity,
  // Keyboard,
} from 'react-native';
import { Container } from '../../../components/container/index';
import {
  NormalButton,
  //NormalButtonWithIcon,
} from '../../../components/button/index';
import { SeperatorRepeat } from '../../../components/list/index';
import styles from './styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
//import { TextWithClearButton } from '../../components/text';
import { RoundedTextInput } from '../../../components/textInput';
import { isSales } from '../../../helper/checkingHelper';
import {
  transactionItemFixOnBehalf,
  generateOrderedItem,
  // generateGuestList,
} from '../../../helper/transactionHelper';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { CardMediaNew, Card } from '../../../components/card';
import imageicon from '../../../assets/Icon/user.png';
import IconClose from '../../../assets/Icon/close.png';
import {
  postJoinTourAction,
  resetTransactionAction,
  getTransactionHistoryByStatusAction,
} from '../../../actions/Transactions/TransactionAction';
// import {
//   post_fix_packaegs,
//   get_fixpackages,
//   reset_post_fix_packages,
//   post_fix_packaegs_onhalf,
// } from '../../actions/fixPackagesAction';
import { LinearGradient } from 'expo-linear-gradient';
// import { get_history_created_booking } from '../../actions/historyAction';
import { convertRoundPrice } from '../../../helper/helper';
import stylesGlobal from '../../../components/styles';
import IconAdd from '../../../assets/Icon/add.png';
//import IconDownload from '../../assets/Icon/download.png';
import PicSuccess from '../../../assets/images/layer_660.png';
import { createTransactionItemSeries } from '../../../helper/transactionHelper';
// import { findAdditionalService } from '../../helper/additionalService';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import { ModalBottom } from '../../../components/modal';
import CardOrderedItem from './components/orderedItem';
import SegmentTourNote from './components/segmentTourNote';
// import SegmentGuestList from './components/segmentGuestList';

class tourSummarySeries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalNoteVisible: false,
      TourNote: '',
      isNote: false,
      loading: false,
      idBook: '',
      Company: { Name: '', Code: null, Id: '' },
      Commission: this.props.postDemofixedPackages
        ? this.props.postDemofixedPackages.BookingDetailSum.FixedPackage
          ? this.props.postDemofixedPackages.BookingDetailSum.FixedPackage
              .BookingCommission.ApplicableCommission
          : ''
        : '',
    };
  }
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    IdPackages: PropTypes.number,
    postDemofixedPackages: PropTypes.object,
    postfixpackagesstatus: PropTypes.string,
    TourSchedulePDF: PropTypes.string,
    userRole: PropTypes.object,
    isCreateTour: PropTypes.string,
    dataUserIdCompany: PropTypes.array,
    postfixpackages: PropTypes.object,
    postfixpackagesError: PropTypes.string,
    ItemTransaction: PropTypes.object,
    additionalService: PropTypes.array,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
  }

  handleCompany = async () => {
    // this.props.navigation.navigate('ListCustomer', {
    //   onSelect: await this.onSelectCustomer,
    // });
    this.props.navigation.navigate('masterData', {
      screen: 'ListCustomer',
      params: {
        onSelect: await this.onSelectCustomer,
      },
    });
  };

  onSelectCustomer = async data => {
    await this.setState({
      Company: data,
    });
  };

  handlePressguest = async () => {
    this.setState({ loading: true });
    let item = null;

    if (this.state.Company.Code == null) {
      Alert.alert('Failed', 'Please select company', [{ text: 'OK' }]);
      this.setState({ loading: false });
    } else {
      this.props.route.params.Guest.Status == 'FixedDateVariable'
        ? (item = this.props.ItemTransaction)
        : (item = await transactionItemFixOnBehalf(
            this.props.route.params.Guest
          ));
      item.CompanyCode = this.state.Company.Code;
      item.UserProfileId = this.state.Company.Id;
      item.TourNote = this.state.TourNote;

      this.props.postJoinTourAction(
        item,
        this.props.postDemofixedPackages.BookingDetailSum.PackageType,
        this.props.route.params.Guest.Status == 'FixedDateVariable'
          ? this.props.route.params.Guest.IdTour
          : this.props.IdPackages
      );

      //   this.props.route.params.Guest.Status == 'FixedDateVariable'
      //     ? this.props.dispatch(
      //         post_fix_packaegs(
      //           this.props.route.params.Guest.Status == 'FixedDateVariable'
      //             ? this.props.route.params.Guest.IdTour
      //             : this.props.IdPackages,
      //           item,
      //           this.props.postDemofixedPackages.BookingDetailSum.PackageType
      //         )
      //       )
      //     : this.props.dispatch(
      //         post_fix_packaegs_onhalf(this.props.IdPackages, item)
      //       );
    }
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.postfixpackagesstatus === 'success') {
      this.setState({ loading: false });
      let iD = nextProps.postfixpackages
        ? nextProps.postfixpackages.BookingDetailSum.Id
        : '';
      this.openModal(iD);
      this.props.resetTransactionAction();
      this.props.getTransactionHistoryByStatusAction('Booking_created');
      //   this.props.dispatch(get_fixpackages());
      //   this.props.dispatch(reset_post_fix_packages());
      //   this.props.dispatch(get_history_created_booking());
      return false;
    } else if (nextProps.postfixpackagesstatus === 'failed') {
      this.setState({ loading: false });
      Alert.alert('Failed', nextProps.postfixpackagesError.MessageDetail, [
        { text: 'OK' },
      ]);
      this.props.resetTransactionAction();
      return false;
    } else return true;
  }

  openModal = id => {
    this.setState({ modalVisible: true, idBook: id });
  };

  handleOpenNoteModal = () => {
    this.setState({ modalNoteVisible: true });
  };

  handleSaveNote = () => {
    this.state.TourNote != ''
      ? this.setState({ isNote: true })
      : this.setState({ isNote: false });

    this.setState({ modalNoteVisible: false });
  };

  handleMyBooking = () => {
    this.setState({ modalVisible: false });
    this.props.navigation.navigate('CreatedBooking');
  };

  getSchedule = () => {
    this.props.TourSchedulePDF != null
      ? Linking.openURL(this.props.TourSchedulePDF).catch(err =>
          console.error('An error occurred', err)
        )
      : Alert.alert('Sorry', 'This packages dose not have schedule', [
          {
            text: 'OK',
          },
        ]);
  };

  handlePressItinerary = (data, index, PackageType) => {
    this.props.navigation.navigate('TourScheduleSummary', {
      data: data,
      type: 'fix',
      Id: index,
      PackageType: PackageType,
    });
  };

  handlePressOrderedItem = (typeOrdered, PackageType) => {
    this.props.navigation.navigate('DetailOrderedItem', {
      PackageType: PackageType,
      TypeOrdered: typeOrdered,
      data: this.props.postDemofixedPackages,
    });
  };

  render() {
    const Data = this.props.postDemofixedPackages;
    const Price = Data.BookingDetailSum.FixedPackage;
    const generateOrderItemData = generateOrderedItem(Data.DailyPrograms);
    // const generateGuestData = generateGuestList(Data.TourGuestSum);
    return (
      <Container>
        <ModalBottom height="50%" visible={this.state.loading} isCenter={true}>
          <Text style={stylesGlobal.text18}>Booking your package</Text>
          <AnimatedEllipsis style={stylesGlobal.text24} />
        </ModalBottom>
        <ModalBottom
          height="80%"
          visible={this.state.modalVisible}
          isCenter={true}
        >
          <Text style={[stylesGlobal.text16, stylesGlobal.textBold]}>
            Booking Success
          </Text>
          <View style={styles.containerImageModal}>
            <Image
              source={PicSuccess}
              style={stylesGlobal.imageIcon}
              resizeMode="contain"
            />
          </View>
          <Text
            style={[
              stylesGlobal.textAlignCenter,
              stylesGlobal.paddingBottom20,
              stylesGlobal.paddingLeft10,
              stylesGlobal.paddingRight10,
            ]}
          >
            Booking Number {this.state.idBook ? this.state.idBook : ''}{' '}
            successfully created. check your booking in my booking
          </Text>
          <NormalButton
            text="Go to my booking"
            buttonHeight={40}
            buttonWidth="80%"
            buttonColor={styles.$goldcolor}
            textColor="black"
            textSize={16}
            onPress={this.handleMyBooking}
          />
        </ModalBottom>
        <ModalBottom
          height="70%"
          visible={this.state.modalNoteVisible}
          isCenter={false}
        >
          <View style={stylesGlobal.paddingHorizontal20}>
            <View
              style={[
                stylesGlobal.row100,
                stylesGlobal.marginBottom20,
                stylesGlobal.marginTop20,
              ]}
            >
              <View style={stylesGlobal.width90}>
                <Text style={[stylesGlobal.text16, stylesGlobal.textBold]}>
                  {this.state.isNote == ''
                    ? 'Add notes (optional)'
                    : 'Edit notes '}
                </Text>
              </View>
              <View style={stylesGlobal.width10}>
                <TouchableOpacity
                  onPress={() => this.setState({ modalNoteVisible: false })}
                  style={stylesGlobal.containerIcon20}
                >
                  <Image
                    source={IconClose}
                    style={[stylesGlobal.imageIcon, styles.tintColorRed]}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
              <SeperatorRepeat
                repeat={31}
                widthsepar={8}
                heightSepar={1}
                colorSepar="#777"
              />
            </View>
            <View style={stylesGlobal.width100}>
              <RoundedTextInput
                autoFocus
                marginBottom={20}
                multiline={true}
                textColor="black"
                containerWidth="100%"
                containerHeight={100}
                animated="hidden"
                placeholder="Have intruction or request about this tour for us?"
                value={this.state.TourNote}
                onChangeText={text =>
                  this.setState({
                    ...this.state,
                    TourNote: text,
                  })
                }
              />
            </View>
            <View style={stylesGlobal.row100}>
              <View style={[stylesGlobal.width50, stylesGlobal.center]}>
                <NormalButton
                  text="Save"
                  buttonHeight={40}
                  buttonWidth="95%"
                  buttonColor={styles.$goldcolor}
                  textColor="black"
                  textSize={16}
                  onPress={() => this.handleSaveNote()}
                />
              </View>
              <View style={[stylesGlobal.width50, stylesGlobal.center]}>
                <NormalButton
                  text="Cancel"
                  buttonHeight={40}
                  buttonWidth="95%"
                  buttonColor="#fff"
                  colorBorder={styles.$goldcolor}
                  textColor={styles.$goldcolor}
                  textSize={16}
                  onPress={() => this.setState({ modalNoteVisible: false })}
                />
              </View>
            </View>
          </View>
        </ModalBottom>

        <ScrollView
          style={[
            styles.containerScroll,
            stylesGlobal.paddingTop20,
            styles.paddingBottom120,
          ]}
        >
          <Container>
            <View style={[styles.colNoPadding, stylesGlobal.alignItemsStart]}>
              <Text
                style={[
                  styles.text16Gold,
                  styles.colPadding20,
                  stylesGlobal.marginBottom10,
                ]}
              >
                Please recheck your order before payment
              </Text>
              <Text
                style={[
                  styles.colPadding20,
                  styles.bold16,
                  stylesGlobal.marginBottom10,
                ]}
              >
                {Data.BookingDetailSum
                  ? Data.BookingDetailSum.TourOperatorProfile
                    ? Data.BookingDetailSum.TourOperatorProfile.Name
                    : ''
                  : ''}
              </Text>
              <Text style={[styles.colPadding20, styles.bold14]}>
                Total Payable
              </Text>
            </View>
            <View style={[styles.rowNoPadding, styles.marginTopnegatif10]}>
              <View style={styles.col70}>
                <Text
                  style={[styles.colPadding20, stylesGlobal.alignContentStart]}
                >
                  <Text
                    style={[
                      stylesGlobal.textBold,
                      stylesGlobal.text20,
                      stylesGlobal.paddingLeft5,
                    ]}
                  >
                    {Data.BookingDetailSum.CurrencyId}
                  </Text>
                  <Text style={styles.text40Bold}>
                    {convertRoundPrice(
                      Data.BookingDetailSum.PackageType == 'FixedDateVariable'
                        ? Data.BookingDetailSum.TourTotalPrice
                        : Price.BookingCommission.TotalPriceForCustomer,
                      Data.BookingDetailSum.CurrencyId
                    )}{' '}
                  </Text>
                </Text>
              </View>
              <View style={styles.col30}>
                <Text
                  style={[
                    styles.colPadding20,
                    stylesGlobal.borderRadius10,
                    stylesGlobal.backgroundColorGold,
                    styles.paddingHorizontal15,
                    stylesGlobal.hidden,
                  ]}
                >
                  UNPAID
                </Text>
              </View>
            </View>
            <View style={[styles.colNoPadding, styles.containerDataTour]}>
              <Text style={[styles.text16, stylesGlobal.textAlignCenter]}>
                This Booking will be expired on
              </Text>
              <Text style={[styles.bold16, stylesGlobal.textAlignCenter]}>
                {moment(Data.BookingDetailSum.PaymentTerms[0].DueDate).format(
                  'DD MMM YYYY'
                )}
              </Text>
            </View>
            <View style={[styles.colNoPadding, stylesGlobal.alignItemsCenter]}>
              <Card widthCard="90%">
                <Text
                  style={[
                    stylesGlobal.paddingHorizontal20,
                    styles.bold20,
                    stylesGlobal.paddingTop20,
                  ]}
                >
                  Tour Detail
                </Text>
                <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
                  <SeperatorRepeat
                    repeat={31}
                    widthsepar={8}
                    heightSepar={1}
                    colorSepar="#777"
                  />
                </View>
                {/* <View
                  style={[
                    stylesGlobal.row100,
                    stylesGlobal.paddingBottom20,
                    stylesGlobal.paddingHorizontal20,

                    stylesGlobal.marginBottom10,
                  ]}
                >
                  <View style={styles.col30}>
                    <Text style={styles.text16}>Booking Code </Text>
                  </View>
                  <View style={styles.col5}>
                    <Text style={styles.text16}>:</Text>
                  </View>
                  <View style={[styles.col65, stylesGlobal.alignItemsEnd]}>
                    <Text style={styles.text16}>
                      {Data.BookingDetailSum.Id}
                    </Text>
                  </View>
                </View> */}
                <View
                  style={[
                    stylesGlobal.row100,
                    stylesGlobal.paddingBottom20,
                    stylesGlobal.paddingHorizontal20,

                    stylesGlobal.marginBottom10,
                  ]}
                >
                  <View style={styles.col30}>
                    <Text style={styles.text16}>Tour Name </Text>
                  </View>
                  <View style={styles.col5}>
                    <Text style={styles.text16}>:</Text>
                  </View>
                  <View style={[styles.col65, stylesGlobal.alignItemsEnd]}>
                    <Text style={styles.text16}>
                      {Data.BookingDetailSum.Title}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.rowNoPadding,
                    styles.colPadding20,
                    stylesGlobal.marginBottom10,
                  ]}
                >
                  <View style={styles.col30}>
                    <Text style={styles.text16}>Date </Text>
                  </View>
                  <View style={styles.col5}>
                    <Text style={styles.text16}>:</Text>
                  </View>
                  <View style={[styles.col65, stylesGlobal.alignItemsEnd]}>
                    <Text style={styles.text16}>
                      {moment(Data.BookingDetailSum.StartDate).format(
                        'DD MMM YYYY'
                      )}
                      -{' '}
                      {moment(Data.BookingDetailSum.EndDate).format(
                        'DD MMM YYYY'
                      )}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.rowNoPadding,
                    styles.colPadding20,
                    stylesGlobal.marginBottom10,
                  ]}
                >
                  <View style={styles.col30}>
                    <Text style={styles.text16}>Destination</Text>
                  </View>
                  <View style={styles.col5}>
                    <Text style={styles.text16}>:</Text>
                  </View>
                  <View style={[styles.col65, stylesGlobal.alignItemsEnd]}>
                    <Text style={styles.text16}>
                      {Data.BookingDetailSum.City.Name},
                      {Data.BookingDetailSum.Country.Name}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.rowNoPadding,
                    styles.colPadding20,
                    stylesGlobal.marginBottom10,
                  ]}
                >
                  <View style={styles.col30}>
                    <Text style={styles.text16}>Total Guest</Text>
                  </View>
                  <View style={styles.col5}>
                    <Text style={styles.text16}>:</Text>
                  </View>
                  <View style={[styles.col65, stylesGlobal.alignItemsEnd]}>
                    <Text style={styles.text16}>
                      {Data.BookingDetailSum.TotalGuest} Guest
                    </Text>
                  </View>
                </View>
              </Card>
              <Card widthCard="90%">
                <Text
                  style={[
                    stylesGlobal.paddingHorizontal20,
                    styles.bold20,
                    stylesGlobal.paddingTop20,
                  ]}
                >
                  Payment
                </Text>
                <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
                  <SeperatorRepeat
                    repeat={31}
                    widthsepar={8}
                    heightSepar={1}
                    colorSepar="#777"
                  />
                </View>
                {Data.BookingDetailSum.PaymentTerms.map((pay, i) => {
                  return (
                    <View
                      style={[
                        stylesGlobal.row100,
                        stylesGlobal.paddingBottom20,
                        stylesGlobal.paddingHorizontal20,

                        stylesGlobal.marginBottom10,
                      ]}
                      key={i}
                    >
                      <View style={stylesGlobal.width70}>
                        <Text style={styles.text16}>
                          {i + 1}. {pay.Description} ({pay.PaymentPercentage}%)
                        </Text>
                        <Text style={styles.text14Red}>
                          Expired date:{' '}
                          {moment(pay.DueDate).format('DD MMM YYYY')}
                        </Text>
                      </View>
                      <View style={[styles.col30, stylesGlobal.alignItemsEnd]}>
                        <Text style={styles.bold16}>
                          {pay.CurrencyId}{' '}
                          {convertRoundPrice(pay.PaymentValue, pay.CurrencyId)}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </Card>
              <Card widthCard="90%">
                <Text
                  style={[
                    styles.bold20,
                    stylesGlobal.paddingHorizontal20,
                    stylesGlobal.paddingTop20,
                  ]}
                >
                  Price Detail
                </Text>
                <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
                  <SeperatorRepeat
                    repeat={31}
                    widthsepar={8}
                    heightSepar={1}
                    colorSepar="#777"
                  />
                </View>
                {Data.TourPriceSum.SharingRoomSum.Pax != 0 ? (
                  <View
                    style={[
                      stylesGlobal.row100,
                      stylesGlobal.paddingHorizontal20,
                      stylesGlobal.paddingBottom20,
                      stylesGlobal.marginBottom10,
                    ]}
                  >
                    <View style={styles.col45}>
                      <Text style={styles.text16}>Sharing Room</Text>
                      <Text style={styles.text14Red}>
                        {Data.TourPriceSum.SharingRoomSum.Currency}{' '}
                        {convertRoundPrice(
                          Data.TourPriceSum.SharingRoomSum.PricePerPax,
                          Data.TourPriceSum.SharingRoomSum.Currency
                        )}
                        /Pax
                      </Text>
                    </View>
                    <View style={styles.col15}>
                      <Text style={styles.bold16}>
                        {Data.TourPriceSum.SharingRoomSum.Pax} Pax
                      </Text>
                    </View>
                    <View style={[styles.col40, stylesGlobal.alignItemsEnd]}>
                      <Text style={styles.bold16}>
                        {Data.TourPriceSum.SharingRoomSum.Currency}{' '}
                        {convertRoundPrice(
                          Data.TourPriceSum.SharingRoomSum.TotalPrice,
                          Data.TourPriceSum.SharingRoomSum.Currency
                        )}
                      </Text>
                    </View>
                  </View>
                ) : null}

                {Data.TourPriceSum.SingleRoomSum.Pax != 0 ? (
                  <View
                    style={[
                      styles.rowNoPadding,
                      styles.colPadding20,
                      stylesGlobal.marginBottom10,
                    ]}
                  >
                    <View style={styles.col45}>
                      <Text style={styles.text16}>Single Room</Text>
                      <Text style={styles.text14Red}>
                        {Data.TourPriceSum.SingleRoomSum.Currency}{' '}
                        {convertRoundPrice(
                          Data.TourPriceSum.SingleRoomSum.PricePerPax,
                          Data.TourPriceSum.SingleRoomSum.Currency
                        )}
                        /Pax
                      </Text>
                    </View>
                    <View style={styles.col15}>
                      <Text style={styles.bold16}>
                        {Data.TourPriceSum.SingleRoomSum.Pax} Pax
                      </Text>
                    </View>
                    <View style={[styles.col40, stylesGlobal.alignItemsEnd]}>
                      <Text style={styles.bold16}>
                        {Data.TourPriceSum.SingleRoomSum.Currency}{' '}
                        {convertRoundPrice(
                          Data.TourPriceSum.SingleRoomSum.TotalPrice,
                          Data.TourPriceSum.SingleRoomSum.Currency
                        )}
                      </Text>
                    </View>
                  </View>
                ) : null}

                {Data.TourPriceSum.ChildExtraBedSum.Pax != 0 ? (
                  <View
                    style={[
                      styles.rowNoPadding,
                      styles.colPadding20,
                      stylesGlobal.marginBottom10,
                    ]}
                  >
                    <View style={styles.col45}>
                      <Text style={styles.text16}>Sharing Room</Text>
                      <Text style={styles.text14Red}>
                        {Data.TourPriceSum.ChildExtraBedSum.Currency}{' '}
                        {convertRoundPrice(
                          Data.TourPriceSum.ChildExtraBedSum.PricePerPax,
                          Data.TourPriceSum.ChildExtraBedSum.Currency
                        )}
                        /Pax
                      </Text>
                    </View>
                    <View style={styles.col15}>
                      <Text style={styles.bold16}>
                        {Data.TourPriceSum.ChildExtraBedSum.Pax} Pax
                      </Text>
                    </View>
                    <View style={[styles.col40, stylesGlobal.alignItemsEnd]}>
                      <Text style={styles.bold16}>
                        {Data.TourPriceSum.ChildExtraBedSum.Currency}{' '}
                        {convertRoundPrice(
                          Data.TourPriceSum.ChildExtraBedSum.TotalPrice,
                          Data.TourPriceSum.ChildExtraBedSum.Currency
                        )}
                      </Text>
                    </View>
                  </View>
                ) : null}

                {Data.TourPriceSum.ChildSharingRoomSum.Pax != 0 ? (
                  <View
                    style={[
                      styles.rowNoPadding,
                      styles.colPadding20,
                      stylesGlobal.marginBottom10,
                    ]}
                  >
                    <View style={styles.col45}>
                      <Text>Child Sharing Room</Text>
                      <Text style={styles.text14Red}>
                        {Data.TourPriceSum.ChildSharingRoomSum.Currency}{' '}
                        {convertRoundPrice(
                          Data.TourPriceSum.ChildSharingRoomSum.PricePerPax,
                          Data.TourPriceSum.ChildSharingRoomSum.Currency
                        )}
                        /Pax
                      </Text>
                    </View>
                    <View style={styles.col15}>
                      <Text style={styles.bold16}>
                        {Data.TourPriceSum.ChildSharingRoomSum.Pax} Pax
                      </Text>
                    </View>
                    <View style={[styles.col40, stylesGlobal.alignItemsEnd]}>
                      <Text style={styles.bold16}>
                        {Data.TourPriceSum.ChildSharingRoomSum.Currency}{' '}
                        {convertRoundPrice(
                          Data.TourPriceSum.ChildSharingRoomSum.TotalPrice,
                          Data.TourPriceSum.ChildSharingRoomSum.Currency
                        )}
                      </Text>
                    </View>
                  </View>
                ) : null}

                {Data.TourPriceSum.ChildSingleRoomSum.Pax != 0 ? (
                  <View
                    style={[
                      styles.rowNoPadding,
                      styles.colPadding20,
                      stylesGlobal.marginBottom10,
                    ]}
                  >
                    <View style={styles.col45}>
                      <Text style={styles.text16}>Child Single Room</Text>
                      <Text style={styles.text14Red}>
                        {Data.TourPriceSum.ChildSingleRoomSum.Currency}{' '}
                        {convertRoundPrice(
                          Data.TourPriceSum.ChildSingleRoomSum.PricePerPax,
                          Data.TourPriceSum.ChildSingleRoomSum.Currency
                        )}
                        /Pax
                      </Text>
                    </View>
                    <View style={styles.col15}>
                      <Text style={styles.bold16}>
                        {Data.TourPriceSum.ChildSingleRoomSum.Pax} Pax
                      </Text>
                    </View>
                    <View style={[styles.col40, stylesGlobal.alignItemsEnd]}>
                      <Text style={styles.bold16}>
                        {Data.TourPriceSum.ChildSingleRoomSum.Currency}{' '}
                        {convertRoundPrice(
                          Data.TourPriceSum.ChildSingleRoomSum.TotalPrice,
                          Data.TourPriceSum.ChildSingleRoomSum.Currency
                        )}
                      </Text>
                    </View>
                  </View>
                ) : null}

                {Data.TourPriceSum.ExtraBedSum.Pax != 0 ? (
                  <View
                    style={[
                      styles.rowNoPadding,
                      styles.colPadding20,
                      stylesGlobal.marginBottom10,
                    ]}
                  >
                    <View style={styles.col45}>
                      <Text style={styles.text16}>Extra Bed</Text>
                      <Text style={styles.text14Red}>
                        {Data.TourPriceSum.ExtraBedSum.Currency}{' '}
                        {convertRoundPrice(
                          Data.TourPriceSum.ExtraBedSum.PricePerPax,
                          Data.TourPriceSum.ExtraBedSum.Currency
                        )}
                        /Pax
                      </Text>
                    </View>
                    <View style={styles.col15}>
                      <Text style={styles.bold16}>
                        {Data.TourPriceSum.ExtraBedSum.Pax} Pax
                      </Text>
                    </View>
                    <View style={[styles.col40, stylesGlobal.alignItemsEnd]}>
                      <Text style={styles.bold16}>
                        {Data.TourPriceSum.ExtraBedSum.Currency}{' '}
                        {convertRoundPrice(
                          Data.TourPriceSum.ExtraBedSum.TotalPrice,
                          Data.TourPriceSum.ExtraBedSum.Currency
                        )}
                      </Text>
                    </View>
                  </View>
                ) : null}

                {Data.TourPriceSum.NoBedSum.Pax != 0 ? (
                  <View
                    style={[
                      styles.rowNoPadding,
                      styles.colPadding20,
                      stylesGlobal.marginBottom10,
                    ]}
                  >
                    <View style={styles.col45}>
                      <Text style={styles.text16}>Baby Crib</Text>
                      <Text style={styles.text14Red}>
                        {Data.TourPriceSum.NoBedSum.Currency}{' '}
                        {convertRoundPrice(
                          Data.TourPriceSum.NoBedSum.PricePerPax,
                          Data.TourPriceSum.NoBedSum.Currency
                        )}
                        /Pax
                      </Text>
                    </View>
                    <View style={styles.col15}>
                      <Text style={styles.bold16}>
                        {Data.TourPriceSum.NoBedSum.Pax} Pax
                      </Text>
                    </View>
                    <View style={[styles.col40, stylesGlobal.alignItemsEnd]}>
                      <Text style={styles.bold16}>
                        {Data.TourPriceSum.NoBedSum.Currency}{' '}
                        {convertRoundPrice(
                          Data.TourPriceSum.NoBedSum.TotalPrice,
                          Data.TourPriceSum.NoBedSum.Currency
                        )}
                      </Text>
                    </View>
                  </View>
                ) : null}

                {Data.TourPriceSum.SharingBedSum.Pax != 0 ? (
                  <View
                    style={[
                      styles.rowNoPadding,
                      styles.colPadding20,
                      stylesGlobal.marginBottom10,
                    ]}
                  >
                    <View style={styles.col45}>
                      <Text style={styles.text16}>Sharing Bed</Text>
                      <Text style={styles.text14Red}>
                        {Data.TourPriceSum.SharingBedSum.Currency}{' '}
                        {convertRoundPrice(
                          Data.TourPriceSum.SharingBedSum.PricePerPax,
                          Data.TourPriceSum.SharingBedSum.Currency
                        )}
                        /Pax
                      </Text>
                    </View>
                    <View style={styles.col15}>
                      <Text style={styles.bold16}>
                        {Data.TourPriceSum.SharingBedSum.Pax} Pax
                      </Text>
                    </View>
                    <View style={[styles.col40, stylesGlobal.alignItemsEnd]}>
                      <Text style={styles.bold16}>
                        {Data.TourPriceSum.SharingBedSum.Currency}{' '}
                        {convertRoundPrice(
                          Data.TourPriceSum.SharingBedSum.TotalPrice,
                          Data.TourPriceSum.SharingBedSum.Currency
                        )}
                      </Text>
                    </View>
                  </View>
                ) : null}
                {this.props.postDemofixedPackages ? (
                  this.props.postDemofixedPackages.TransactionSupplements
                    .length != 0 ||
                  this.props.postDemofixedPackages.AdditionalServices.length !=
                    0 ? (
                    <View
                      style={[
                        styles.rowNoPadding,
                        styles.colPadding20,
                        stylesGlobal.marginBottom10,
                      ]}
                    >
                      <Text style={styles.bold18}>Additionals</Text>
                    </View>
                  ) : null
                ) : null}

                <View style={styles.center}>
                  {this.props.postDemofixedPackages
                    ? this.props.postDemofixedPackages.AdditionalServices
                      ? this.props.postDemofixedPackages.AdditionalServices
                          .length != 0
                        ? this.props.postDemofixedPackages.AdditionalServices.map(
                            (add, i) => {
                              return (
                                <View
                                  style={[
                                    styles.rowNoPadding,
                                    styles.colPadding20,
                                    stylesGlobal.marginBottom10,
                                  ]}
                                  key={i}
                                >
                                  <View style={styles.col45}>
                                    <Text>{add.AdditionalServicesName}</Text>
                                    <Text style={styles.text12Red}>
                                      {add.OriginalCountries[0].Currency}{' '}
                                      {convertRoundPrice(
                                        add.OriginalCountries[0].Amount,
                                        add.OriginalCountries[0].Currency
                                      )}
                                      / unit
                                    </Text>
                                  </View>
                                  <View style={styles.col15}>
                                    <Text style={styles.bold16}>
                                      {add.Quantity} unit
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.col40,
                                      stylesGlobal.alignItemsEnd,
                                    ]}
                                  >
                                    <Text style={styles.bold16}>
                                      {add.OriginalCountries[0].Currency}{' '}
                                      {convertRoundPrice(
                                        add.Quantity *
                                          add.OriginalCountries[0].Amount,
                                        add.OriginalCountries[0].Currency
                                      )}
                                    </Text>
                                  </View>
                                </View>
                              );
                            }
                          )
                        : null
                      : null
                    : null}
                  {this.props.postDemofixedPackages.TransactionSupplements
                    .length != 0
                    ? this.props.postDemofixedPackages.TransactionSupplements.map(
                        (add, i) => {
                          return (
                            <View
                              style={[
                                styles.rowNoPadding,
                                styles.colPadding20,
                                stylesGlobal.marginBottom10,
                              ]}
                              key={i}
                            >
                              <View style={styles.col45}>
                                <Text>{add.Name}</Text>
                                <Text style={styles.text12Red}>
                                  {Data.BookingDetailSum.CurrencyId}{' '}
                                  {convertRoundPrice(
                                    add.Price,
                                    Data.BookingDetailSum.CurrencyId
                                  )}
                                  / unit
                                </Text>
                              </View>
                              <View style={styles.col15}>
                                <Text style={styles.bold16}>
                                  {add.Qty} unit
                                </Text>
                              </View>
                              <View
                                style={[
                                  styles.col40,
                                  stylesGlobal.alignItemsEnd,
                                ]}
                              >
                                <Text style={styles.bold16}>
                                  {Data.BookingDetailSum.CurrencyId}{' '}
                                  {convertRoundPrice(
                                    add.Qty * add.Price,
                                    Data.BookingDetailSum.CurrencyId
                                  )}
                                </Text>
                              </View>
                            </View>
                          );
                        }
                      )
                    : null}
                </View>

                <View
                  style={[
                    stylesGlobal.row100,
                    stylesGlobal.padding20,
                    styles.cardRadiusBottomTotalPrice,
                  ]}
                >
                  <View style={styles.rowNoPadding}>
                    <View style={styles.col60}>
                      <Text style={styles.bold18}>Total Price</Text>
                    </View>
                    <View style={[styles.col40, stylesGlobal.alignItemsEnd]}>
                      <Text style={styles.bold18}>
                        {Data.BookingDetailSum.CurrencyId}{' '}
                        {convertRoundPrice(
                          Data.BookingDetailSum.TourTotalPrice,
                          Data.BookingDetailSum.CurrencyId
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              </Card>

              <View style={[styles.row100, styles.colPadding20]}>
                <View style={stylesGlobal.width50}>
                  <Text
                    style={[
                      stylesGlobal.marginBottom20,
                      stylesGlobal.text18,
                      stylesGlobal.textBold,
                    ]}
                  >
                    What we'll do
                  </Text>
                </View>
                {/* <View style={stylesGlobal.width50}>
                  <NormalButtonWithIcon
                    type="singleText"
                    text="Download Schedule"
                    nameicon={IconDownload}
                    coloricon="black"
                    buttonColor={styles.$goldcolor}
                    textColor="black"
                    sizeicon={18}
                    textSize={Platform.OS === 'ios' ? 12 : 12}
                    buttonWidth="100%"
                    buttonHeight={35}
                    onPress={this.getSchedule}
                    image={true}
                  />
                </View> */}
              </View>
              <View style={[styles.rowNoPadding, stylesGlobal.paddingBottom20]}>
                <ScrollView horizontal={true}>
                  {this.props.postDemofixedPackages.DailyPrograms
                    ? this.props.postDemofixedPackages.DailyPrograms.map(
                        (move, i) => {
                          return (
                            <CardMediaNew
                              type="daily"
                              title={
                                move.TourDestinations.length != 0
                                  ? move.TourDestinations[0].Destination
                                  : ''
                              }
                              subtitle={`${move.Day}`}
                              duration={moment(move.Date).format('DD MMM YYYY')}
                              image={
                                move.TourDestinations.length != 0
                                  ? move.TourDestinations[0].ImageUrl
                                  : null
                              }
                              key={i}
                              onPress={() =>
                                this.handlePressItinerary(
                                  this.props.postDemofixedPackages
                                    .DailyPrograms,
                                  i,
                                  Data.BookingDetailSum.PackageType
                                )
                              }
                            />
                          );
                        }
                      )
                    : null}
                </ScrollView>
              </View>
              {/* Segment Ordered Item List */}
              <CardOrderedItem
                orderedItemData={generateOrderItemData}
                onPress={this.handlePressOrderedItem}
                packageType={Data.BookingDetailSum.PackageType}
              />
              {/* END Segment Ordered Item */}
              {/* Guest List */}
              {/* <SegmentGuestList
                guestListData={generateGuestData}
                totalPax={Data.BookingDetailSum.TotalGuest}
              /> */}
              {/* END Guest List */}
              <SegmentTourNote
                onChangeText={text =>
                  this.setState({
                    ...this.state,
                    TourNote: text,
                  })
                }
                tourNote={this.state.TourNote}
              />

              <Card widthCard="90%">
                <Text
                  style={[
                    stylesGlobal.paddingHorizontal20,
                    styles.bold20,
                    stylesGlobal.paddingTop20,
                  ]}
                >
                  Customer on Behalf
                </Text>

                <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
                  <SeperatorRepeat
                    repeat={31}
                    widthsepar={8}
                    heightSepar={1}
                    colorSepar="#777"
                  />
                </View>
                <View
                  style={[
                    styles.colNoPadding1,
                    styles.containerDataTour1,
                    stylesGlobal.row100,
                  ]}
                >
                  <View style={[stylesGlobal.width25, stylesGlobal.center]}>
                    <Image
                      style={[
                        stylesGlobal.containerIcon30,
                        stylesGlobal.tintColorGrey,
                      ]}
                      source={imageicon}
                    />
                  </View>
                  <View style={stylesGlobal.width50}>
                    <Text
                      style={[stylesGlobal.textd16, stylesGlobal.colorGrey]}
                    >
                      {this.state.Company.Name
                        ? this.state.Company.Name
                        : 'Add your customer account'}
                    </Text>
                    {this.state.Company.Name ? (
                      this.state.Company.FirstName ? (
                        <Text
                          style={[stylesGlobal.textd16, stylesGlobal.colorGrey]}
                        >
                          {this.state.Company.FirstName}{' '}
                          {this.state.Company.LastName}
                        </Text>
                      ) : (
                        <Text
                          style={[stylesGlobal.textd16, stylesGlobal.colorGrey]}
                        >
                          {this.state.Company.Username}
                        </Text>
                      )
                    ) : null}
                  </View>
                  <View style={[stylesGlobal.width25, stylesGlobal.center]}>
                    <TouchableOpacity
                      style={
                        this.state.Company.Name
                          ? stylesGlobal.width100
                          : styles.iconFrameAdd
                      }
                      onPress={this.handleCompany}
                    >
                      {this.state.Company.Name ? (
                        <Text
                          style={[
                            stylesGlobal.text12,
                            stylesGlobal.textGold,
                            stylesGlobal.textBold,
                            styles.colPadding20,
                          ]}
                        >
                          Change
                        </Text>
                      ) : (
                        <Image
                          style={[
                            stylesGlobal.imageIcon,
                            styles.tintColorWhite,
                          ]}
                          source={IconAdd}
                          resizeMode="contain"
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>

              {/* <Card widthCard="90%">
                <View style={stylesGlobal.row100}>
                  <View style={stylesGlobal.width70}>
                    <Text
                      style={[
                        stylesGlobal.paddingHorizontal20,
                        styles.bold20,
                        stylesGlobal.paddingTop20,
                      ]}
                    >
                      Ordered Items
                    </Text>
                  </View>
                   <View
                    style={[stylesGlobal.width30, stylesGlobal.paddingTop20]}
                  >
                    <TextWithClearButton
                      text=""
                      buttonText={
                        this.state.isNote == '' ? 'Add notes' : 'Edit notes'
                      }
                      buttonTextColor={styles.$softblueColor}
                      bold
                      onPress={() => this.handleOpenNoteModal()}
                    />
                  </View> *
                </View>
                <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
                  <SeperatorRepeat
                    repeat={31}
                    widthsepar={8}
                    heightSepar={1}
                    colorSepar="#777"
                  />
                </View>
                {this.props.postDemofixedPackages.DailyPrograms
                  ? this.props.postDemofixedPackages.DailyPrograms.map(
                      (move, i) => {
                        return (
                          <View
                            key={i}
                            style={[styles.bottom, styles.paddingTop0]}
                          >
                            {move.OrderedItems.length != 0 ? (
                              <View
                                style={[
                                  styles.rowNoPadding,
                                  stylesGlobal.marginBottom10,
                                ]}
                              >
                                <Text style={styles.text16}>
                                  Day {i + 1} :{' '}
                                  {moment(move.Date).format('DD MMM YYYY')}
                                </Text>
                              </View>
                            ) : null}
                            {move.OrderedItems
                              ? move.OrderedItems.map((order, i) => {
                                  return (
                                    <View
                                      style={
                                        i % 2 != 0
                                          ? [
                                              styles.rowGreyNoPadding,
                                              stylesGlobal.marginBottom5,
                                            ]
                                          : [
                                              styles.rowNoPadding,
                                              stylesGlobal.marginBottom5,
                                            ]
                                      }
                                      key={i}
                                    >
                                      <View style={styles.col40}>
                                        <Text
                                          style={[
                                            stylesGlobal.text10,
                                            stylesGlobal.paddingRight5,
                                          ]}
                                        >
                                          {order.ItemName}{' '}
                                        </Text>
                                      </View>
                                      <View style={styles.col20Width}>
                                        <Text style={stylesGlobal.text10}>
                                          For {Data.BookingDetailSum.TotalGuest}{' '}
                                          Guest
                                        </Text>
                                      </View>
                                      <View
                                        style={[
                                          styles.col40,
                                          stylesGlobal.alignItemsEnd,
                                        ]}
                                      >
                                        <Text
                                          style={[
                                            stylesGlobal.text10,
                                            stylesGlobal.paddingLeft5,
                                          ]}
                                        >
                                          {order.Description.split('_').join(
                                            ' '
                                          )}{' '}
                                        </Text>
                                      </View>
                                    </View>
                                  );
                                })
                              : null}
                          </View>
                        );
                      }
                    )
                  : null}
              </Card> */}
            </View>
          </Container>
        </ScrollView>

        <TouchableOpacity style={styles.footer} onPress={this.handlePressguest}>
          <LinearGradient
            colors={['#e6ca6b', '#ffd734']}
            style={styles.footer}
            start={[0, 0]}
            end={[1, 0]}
          >
            <NormalButton
              textSize={17}
              text="BOOK NOW"
              buttonWidth="100%"
              buttonHeight="100%"
              textColor="#252525"
              buttonColor="transparent"
              onPress={this.handlePressguest}
            />
          </LinearGradient>
        </TouchableOpacity>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  postDemofixedPackages: state.transactionReducer.postDemo,
  postfixpackagesstatus: state.transactionReducer.postJoinTourStatus,
  postfixpackagesError: state.transactionReducer.errors,
  IdPackages: state.transactionReducer.packageIdFromSystem,
  //   ItemTransaction: state.transactionReducer.ItemTransaction,
  //   IdPackages: state.fixPackagesReducer.id,
  //   postDemofixedPackages: state.fixPackagesReducer.postDemofixedPackages,
  //   postfixpackagesstatus: state.fixPackagesReducer.postfixpackagesstatus,
  //   postfixpackagesError: state.fixPackagesReducer.postfixpackagesError,
  //   userRole: state.accountReducer.userRole,
  //   postfixpackages: state.fixPackagesReducer.postfixpackages,
  //   TourSchedulePDF: state.historyReducer.TourSchedulePDF,
  //   isCreateTour: state.transactionReducer.isCreateTour,
  //   dataUserIdCompany: state.companyProfileReducer.dataUserIdCompany,
  //   additionalService: state.additionalServiceReducer.additionalService,
});

export default connect(mapStateToProps, {
  postJoinTourAction,
  resetTransactionAction,
  getTransactionHistoryByStatusAction,
})(tourSummarySeries);
