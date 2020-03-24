import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  Linking,
  CameraRoll,
  BackHandler,
  StatusBar,
  TouchableOpacity,
  Animated,
  Platform,
  Dimensions,
} from 'react-native';
import stylesGlobal from '../../components/styles';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  CardAccomodation,
  Card,
  CardMediaNew,
} from '../../components/card/index';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import {
  NormalButtonWithIcon,
  ShimmerButton,
} from '../../components/button/index';
import styles from './styles';
import { Container } from '../../components/container';
import moment from 'moment';
import IMAGES from './../../assets/images/NoImage.png';
import { Ionicons } from '@expo/vector-icons';
import IconLoc from '../../assets/Icon/address.png';
import IconCalendar from '../../assets/Icon/calendar.png';
import IconClock from '../../assets/Icon/clock.png';
import { RoundedLoading, SliderLoading } from '../../components/loading';
import { TextPaymentTerms } from '../../components/text';
import {
  getSeriesPackageByIdAction,
  resetTransactionAction,
  getTourOperatorProfileByIdAction,
  setPackageDataAction,
} from '../../actions/Transactions/TransactionAction';
// import {
//   get_tour_operator_profile,
//   reset_fixpackages_by_id,
//   get_supplement_by_id,
//   get_fixpackages_by_id,
// } from '../../actions/fixPackagesAction';

// import { get_tour_schedule } from '../../actions/historyAction';

// import {
//   reset_readypackages_by_id,
//   get_readypackages_by_id,
// } from '../../actions/readyPackegaesAction';

const cardWidth = Dimensions.get('window').width;
// import url from "../../api/apiUrl";
import { convertRoundPrice } from '../../helper/helper';

import { viewDate } from '../../helper/timeHelper';
import { SeperatorRepeat } from '../../components/list';
import { ModalBottom } from '../../components/modal';

import IconTwinSharing from '../../assets/Icon/sharing_room.png';
import IconSingleRoom from '../../assets/Icon/single_room.png';
import IconExtraBedAdult from '../../assets/Icon/room_type.png';
import IconExtraBedChild from '../../assets/Icon/baby.png';
import IconBabyCrib from '../../assets/Icon/baby_carriage.png';
import IconWithParents from '../../assets/Icon/sharing_with_parrent.png';
import IconDownload from '../../assets/Icon/download.png';
import IconClose from '../../assets/Icon/close.png';

class PackagesDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: {},
      brochureData: null,
      heightData: 0,
      currentPage: 1,
      scrollY: new Animated.Value(0),
      nameButton: 'READ MORE',
      modalInfoFixedPrice: false,
      paymentTerms: null,
      price: '',
      imageslogo: '',
      daily: null,
      Img: [],
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.route.params.from
        ? this.props.navigation.navigate('Home')
        : this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
    this;
    const { packageIdFromSystem, getSeriesPackageByIdAction } = this.props;
    getSeriesPackageByIdAction(packageIdFromSystem);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.packageByIdStatus) {
      this.setDetailPackage(this.props.packageById);
      this.props.resetTransactionAction();
    } else if (this.props.packageByIdStatus !== null) {
      this.props.resetTransactionAction();
    }
    // if (this.props.tourOperatorIdStatus) {
    //   this.setTourOperator(this.props.tourOperatorId);
    //   this.props.resetTransactionAction();
    // } else if (this.props.tourOperatorIdStatus !== null) {
    //   this.props.resetTransactionAction();
    // }
  }

  setTourOperator = data => {
    this.setState({
      tourOperator: data,
    });
  };
  setDetailPackage = data => {
    data.TourOperator &&
      this.props.getTourOperatorProfileByIdAction(data.TourOperator.Id);
    this.setState({
      paymentTerms: data.BookingDetailSum.FixedPackage.PaymentTerms,
      price: data.Prices,
      imageslogo: data.TourOperator.ImageUrl,
      daily: data.DailyPrograms,
      Img: data
        ? data.Images
          ? data.Images.length > 0
            ? data.Images
            : data.BookingDetailSum.City.ImageUrl
            ? data.BookingDetailSum.City.ImageUrl != ''
              ? data.BookingDetailSum.City.ImageUrl
              : []
            : []
          : data.BookingDetailSum.City.ImageUrl
          ? data.BookingDetailSum.City.ImageUrl != ''
            ? data.BookingDetailSum.City.ImageUrl
            : []
          : []
        : [],
      packages: data,
    });
  };

  handlePressBookingGuest = () => {
    const { packageStatus, setPackageDataAction, packageById } = this.props;
    const { packages } = this.state;
    const status = packageStatus;
    // {
    //   status == "Fixed"
    //     ? this.props.navigation.navigate("SeriesOptions", {
    //         Desc: packages.Descriptions,
    //         KoutaPax:
    //           packages.BookingDetailSum.FixedPackage.MinimumGuest -
    //           packages.BookingDetailSum.FixedPackage.ConfirmedGuest,
    //         MinPax: packages.MinPax,
    //         Status: "Fixed"
    //       })
    //     : this.props.navigation.navigate("ReadyPackagesOption", {
    //         data: packages,
    //         type: status
    //       });
    // }
    {
      status == 'Fixed'
        ? this.props.navigation.navigate('SeriesOptions')
        : this.props.navigation.navigate('ReadyPackagesOption');
    }
    setPackageDataAction(packages);
  };

  static propTypes = {
    // dispatch: PropTypes.func,
    // navigation: PropTypes.object,
    // dataFix: PropTypes.object,
    // dataReady: PropTypes.object,
    // operator: PropTypes.object,
    // TourSchedulePDF: PropTypes.string,
    // Brocure: PropTypes.object,
    // IdPackages: PropTypes.number,
    // isFixedPackageById: PropTypes.string,
    // isReadyPackagesById: PropTypes.string,
    // accomodationProfile: PropTypes.array,
    // companyProfile: PropTypes.object,
    // token: PropTypes.string
  };

  //   goBack = () => {
  //     const from = this.props.route.params.from
  //       ? this.props.route.params.from
  //       : '';

  //     {
  //       from == 'Home'
  //         ? this.props.navigation.navigate('Home')
  //         : this.props.navigation.pop();
  //     }
  //   };
  //   componentDidMount() {
  //     BackHandler.addEventListener('hardwareBackPress', () => {
  //       this.props.route.params.from
  //         ? this.props.navigation.navigate('Home')
  //         : this.props.navigation.pop(); // works best when the goBack is async
  //       return true;
  //     });
  //     this.setState({ loading: true });
  //     const { navigation } = this.props;
  //     const status = navigation.getParam('status', 'null');
  //     const Id = navigation.getParam('Id', 'null');
  //     const TourOperator = navigation.getParam('TourOperator', 'null');
  //     TourOperator != null
  //       ? this.props.dispatch(get_tour_operator_profile(TourOperator.Id))
  //       : null;
  //     {
  //       status === 'Fixed'
  //         ? this.props.dispatch(get_fixpackages_by_id(Id))
  //         : this.props.dispatch(get_readypackages_by_id(Id, status));
  //     }
  //     {
  //       this.props.companyProfile
  //         ? this.setState({
  //             brochureData:
  //               url +
  //               '/BookingTemplates/GetOverlayBrochure/' +
  //               this.props.IdPackages +
  //               '/' +
  //               this.props.companyProfile.Code,
  //           })
  //         : null;
  //     }
  //     status === 'Fixed'
  //       ? this.props.dispatch(get_supplement_by_id(this.props.IdPackages))
  //       : null;
  //     this.props.dispatch(get_tour_schedule(this.props.IdPackages));
  //   }

  //   handlePressItinerary = idmove => {
  //     const { navigation } = this.props;
  //     const status = navigation.getParam('status', 'null');
  //     {
  //       status == 'Ready' || status == 'FixedDateVariable'
  //         ? this.props.navigation.navigate('ReadyPackagesItenary', {
  //             Id: idmove,
  //           })
  //         : this.props.navigation.navigate('FixPackagesItenary', {
  //             Id: idmove,
  //           });
  //     }
  //   };

  //   handleOnScroll = e => {
  //     let newPageNum = parseInt(e.nativeEvent.contentOffset.x / cardWidth + 1);

  //     newPageNum != this.state.currentPage &&
  //       this.setState({
  //         currentPage: newPageNum,
  //       });
  //   };

  //   componentDidUpdate() {
  //     if (this.props.isFixedPackageById == 'success') {
  //       this.setState({ loading: false, data: this.props.dataFix });
  //       this.props.dispatch(reset_fixpackages_by_id());
  //       return false;
  //     } else if (this.props.isFixedPackageById == 'failed') {
  //       this.setState({ loading: false, data: this.props.dataFix });
  //       this.props.dispatch(reset_fixpackages_by_id());

  //       return false;
  //     } else if (this.props.isReadyPackagesById == 'success') {
  //       this.setState({ loading: false, data: this.props.dataReady });
  //       this.props.dispatch(reset_readypackages_by_id());

  //       return false;
  //     } else if (this.props.isReadyPackagesById == 'failed') {
  //       this.setState({ loading: false, data: this.props.dataReady });
  //       this.props.dispatch(reset_readypackages_by_id());

  //       return false;
  //     } else return true;
  //   }

  //   handlePressBookingguest = () => {
  //     const { navigation } = this.props;
  //     const status = navigation.getParam('status', 'null');
  //     {
  //       status == 'Fixed'
  //         ? this.props.navigation.navigate('BookingOption', {
  //             Desc: this.state.data.Descriptions,
  //             KoutaPax:
  //               this.state.data.BookingDetailSum.FixedPackage.MinimumGuest -
  //               this.state.data.BookingDetailSum.FixedPackage.ConfirmedGuest,
  //             MinPax: this.state.data.MinPax,
  //             Status: 'Fixed',
  //           })
  //         : this.props.navigation.navigate('ReadyPackagesOption', {
  //             data: this.state.data,
  //             type: status,
  //           });
  //     }
  //   };

  //   getBrochure = () => {
  //     this.state.data.Brochures
  //       ? this.state.data.Brochures.length > 0
  //         ? this.state.data.Brochures[0].ImageUrl
  //           ? Linking.openURL(this.state.brochureData).catch(err =>
  //               Alert.alert('Sorry', err, [
  //                 {
  //                   text: 'OK',
  //                 },
  //               ])
  //             )
  //           : Alert.alert('Sorry', 'This packages dose not have brochure', [
  //               {
  //                 text: 'OK',
  //               },
  //             ])
  //         : Alert.alert('Sorry', 'This packages dose not have brochure', [
  //             {
  //               text: 'OK',
  //             },
  //           ])
  //       : Alert.alert('Sorry', 'This packages dose not have brochure', [
  //           {
  //             text: 'OK',
  //           },
  //         ]);
  //   };

  //   download = async () => {
  //     this.setState({ loading: true });
  //     let permission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

  //     const Download = await FileSystem.downloadAsync(
  //       this.state.brochureData,
  //       FileSystem.documentDirectory + 'myFile.png'
  //     )
  //       .then(({ uri }) => {
  //         if (permission.status === 'granted') {
  //           this.setState({ loading: false });
  //           CameraRoll.saveToCameraRoll(uri, 'photo');
  //           Alert.alert(
  //             'Success',
  //             'Your brochure has been download in Galery Photo'
  //           );
  //         } else {
  //           Alert.alert('Failed', 'Download Brochure has been cancelled ', [
  //             {
  //               text: 'OK',
  //             },
  //           ]);
  //         }
  //       })
  //       .catch(error => {
  //         this.setState({ loading: false });
  //         Alert.alert('Failed', 'Download Brochure has been cancelled ', [
  //           {
  //             text: 'OK',
  //           },
  //         ]);
  //       });
  //   };

  //   getSchedule = () => {
  //     this.props.TourSchedulePDF != null
  //       ? this.props.TourSchedulePDF != ''
  //         ? Linking.openURL(this.props.TourSchedulePDF).catch(err =>
  //             Alert.alert('Sorry', err, [
  //               {
  //                 text: 'OK',
  //               },
  //             ])
  //           )
  //         : Alert.alert('Sorry', 'This packages dose not have schedule', [
  //             {
  //               text: 'OK',
  //             },
  //           ])
  //       : Alert.alert('Sorry', 'This packages dose not have schedule', [
  //           {
  //             text: 'OK',
  //           },
  //         ]);
  //   };

  //   handlePressDetailHotel = dataHotel => {
  //     this.props.navigation.navigate('DetailAccommodation', {
  //       hotel: dataHotel,
  //     });
  //   };

  //   measureView = event => {
  //     let data = [...this.state.heightData];
  //     data.push(event.nativeEvent.layout.height);
  //   };

  //   textButton = () => {
  //     if (this.state.nameButton == 'READ MORE') {
  //       this.setState({ nameButton: 'READ LESS' });
  //     } else {
  //       this.setState({ nameButton: 'READ MORE' });
  //     }
  //   };

  render() {
    const fullWidth = Dimensions.get('window').width;
    const width90 =
      Dimensions.get('window').width - Dimensions.get('window').width * 0.1;
    const {
      paymentTerms,
      price,
      imageslogo,
      daily,
      Img,
      packages,
      tourOperator,
    } = this.state;
    const status = 'Fixed';
    const HEADER_MAX_HEIGHT = 300;
    const HEADER_MIN_HEIGHT = 100;
    const backgroundColorAnimate = this.state.scrollY.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', 'white'],
      extrapolate: 'clamp',
    });
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, 1],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });
    return (
      <>
        <Container>
          <Animated.View
            style={[
              styles.headerTransparent,
              { height: headerHeight, backgroundColor: backgroundColorAnimate },
            ]}
          >
            <LinearGradient
              colors={['#e5e5e5', 'rgba(255,255,255,0)']}
              style={styles.gradientFooter}
            >
              <StatusBar
                translucent
                barStyle="dark-content"
                backgroundColor="transparent"
              />
              <TouchableOpacity
                style={styles.topNavDetail}
                onPress={this.goBack}
              >
                <Ionicons name="ios-arrow-back" size={35} color="#252525" />
              </TouchableOpacity>
              <View style={styles.topNavTextDetail}>
                {status == 'Fixed' ? (
                  <Text style={styles.textHeader}>Series Package Detail</Text>
                ) : (
                  <Text style={styles.textHeader}>Ready Package Detail</Text>
                )}
              </View>
            </LinearGradient>
          </Animated.View>
          <ScrollView
            style={[stylesGlobal.containerScroll, stylesGlobal.marginBottom30]}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.state.scrollY } } },
            ])}
          >
            <Container paddingbottomcontainer={70}>
              <View style={stylesGlobal.row100}>
                {this.state.loading ? (
                  <RoundedLoading width={fullWidth} height={350} />
                ) : (
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    pagingEnabled={true}
                    onScroll={this.handleOnScroll}
                  >
                    <ModalBottom
                      height="20%"
                      visible={this.state.modalInfoFixedPrice}
                      isCenter={true}
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
                            <Text
                              style={[
                                stylesGlobal.text20,
                                stylesGlobal.textBold,
                              ]}
                            >
                              What is Fixed Price?
                            </Text>
                          </View>
                          <View style={stylesGlobal.width10}>
                            <TouchableOpacity
                              onPress={() =>
                                this.setState({ modalInfoFixedPrice: false })
                              }
                              style={stylesGlobal.containerIcon20}
                            >
                              <Image
                                source={IconClose}
                                style={[
                                  stylesGlobal.imageIcon,
                                  styles.tintColorRed,
                                ]}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
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
                            stylesGlobal.paddingVertical20,
                          ]}
                        >
                          <Text style={stylesGlobal.text16}>
                            All activity and room allocation price has been set
                            as a package
                          </Text>
                        </View>
                      </View>
                    </ModalBottom>
                    {packages ? (
                      packages.Images.length != 0 ? (
                        Img.map((image, i) => {
                          return (
                            <Card
                              type="Flat"
                              key={i}
                              widthCard={Dimensions.get('window').width}
                              heightCard={350}
                            >
                              <View style={styles.carouselImageContainer}>
                                {image.ImageUrl ? (
                                  <Image
                                    source={{ uri: image.ImageUrl }}
                                    style={stylesGlobal.imageIcon}
                                    resizeMode="cover"
                                    resizeMethod="resize"
                                  />
                                ) : (
                                  <Image
                                    source={IMAGES}
                                    style={stylesGlobal.imageIcon}
                                    resizeMode="cover"
                                    resizeMethod="resize"
                                  />
                                )}
                              </View>
                            </Card>
                          );
                        })
                      ) : (
                        <View style={styles.carouselImageContainer}>
                          <Image
                            source={IMAGES}
                            style={stylesGlobal.imageIcon}
                            resizeMode="cover"
                            resizeMethod="resize"
                          />
                        </View>
                      )
                    ) : (
                      <View style={styles.carouselImageContainer}>
                        <Image
                          source={IMAGES}
                          style={stylesGlobal.imageIcon}
                          resizeMode="center"
                          resizeMethod="resize"
                        />
                      </View>
                    )}
                  </ScrollView>
                )}
              </View>
              {this.state.loading ? null : (
                <View style={styles.contentContainerDetail1}>
                  {status == 'Fixed' ? (
                    <View style={styles.row100}>
                      <View style={[stylesGlobal.width30, styles.left]}>
                        <View style={styles.containerIndicator}>
                          <Text style={styles.indicatorSlider}>
                            {this.state.currentPage}/
                            {packages
                              ? packages.Images.length != 0
                                ? Img.length
                                : 1
                              : 1}
                          </Text>
                        </View>
                      </View>

                      <TouchableOpacity
                        style={[stylesGlobal.width70, styles.right]}
                        onPressIn={this.getBrochure}
                        onLongPress={this.getBrochure}
                      >
                        <NormalButtonWithIcon
                          type="singleText"
                          text="Download Brochure"
                          nameicon={IconDownload}
                          coloricon="black"
                          buttonColor={styles.$goldcolor}
                          textColor="black"
                          sizeicon={18}
                          textSize={Platform.OS === 'ios' ? 12 : 12}
                          buttonWidth={Platform.OS === 'ios' ? '70%' : '90%'}
                          buttonHeight={35}
                          onPress={this.getBrochure}
                          image={true}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
              )}
              <View style={stylesGlobal.alignItemsCenter}>
                <Card type="Flat" widthCard={cardWidth} topMargin={-30}>
                  <View style={[stylesGlobal.row100, stylesGlobal.padding20]}>
                    {this.state.loading ? (
                      <RoundedLoading width={300} height={30} />
                    ) : (
                      <Text
                        style={[stylesGlobal.text22, stylesGlobal.textBold]}
                      >
                        {packages ? packages.BookingDetailSum.Title : ''}
                      </Text>
                    )}
                  </View>
                  {this.state.loading ? (
                    <View>
                      <RoundedLoading width={150} column />
                      <RoundedLoading width={150} column />
                    </View>
                  ) : (
                    <View style={[styles.row100, styles.colPadding20]}>
                      <View style={stylesGlobal.width50}>
                        <View
                          style={[
                            stylesGlobal.row100,
                            stylesGlobal.alignItemsCenter,
                          ]}
                        >
                          <View
                            style={[
                              stylesGlobal.containerIcon30,
                              stylesGlobal.padding5,
                            ]}
                          >
                            <Image
                              source={IconLoc}
                              style={[
                                stylesGlobal.imageIcon,
                                stylesGlobal.tintColorGrey,
                              ]}
                              resizeMode="contain"
                            />
                          </View>
                          <Text>
                            {packages
                              ? packages.BookingDetailSum.City.Name
                              : ''}
                            ,{' '}
                            {packages
                              ? packages.BookingDetailSum.Country.Name
                              : ''}
                          </Text>
                        </View>

                        {status == 'Fixed' ? (
                          <View
                            style={[
                              stylesGlobal.row100,
                              stylesGlobal.alignItemsCenter,
                            ]}
                          >
                            <View
                              style={[
                                stylesGlobal.containerIcon30,
                                stylesGlobal.padding5,
                              ]}
                            >
                              <Image
                                source={IconCalendar}
                                style={[
                                  stylesGlobal.imageIcon,
                                  stylesGlobal.tintColorGrey,
                                ]}
                                resizeMode="contain"
                              />
                            </View>
                            <Text>
                              {' '}
                              {packages
                                ? viewDate(packages.BookingDetailSum.StartDate)
                                : ''}
                            </Text>
                          </View>
                        ) : status == 'FixedDateVariable' ? (
                          <TouchableOpacity
                            style={[
                              stylesGlobal.row100,
                              stylesGlobal.alignItemsCenter,
                            ]}
                            onPress={() =>
                              this.setState({ modalInfoFixedPrice: true })
                            }
                          >
                            <View
                              style={[
                                stylesGlobal.containerIcon30,
                                stylesGlobal.padding5,
                              ]}
                            >
                              <Ionicons
                                name="ios-information-circle-outline"
                                size={23}
                                color="#3f51b5"
                              />
                            </View>
                            <Text style={{ color: '#3f51b5' }}>
                              Fixed Price
                            </Text>
                          </TouchableOpacity>
                        ) : null}
                      </View>
                      {status == 'Fixed' ? (
                        <View style={[stylesGlobal.width50, styles.right]}>
                          <Text>
                            <Text style={[styles.text14Red, styles.textPax]}>
                              Only{' '}
                            </Text>
                            <Text style={styles.text28Red}>
                              {packages
                                ? packages.BookingDetailSum.FixedPackage
                                    .MinimumGuest -
                                  packages.BookingDetailSum.FixedPackage
                                    .ConfirmedGuest
                                : 0}{' '}
                            </Text>
                            <Text style={styles.text14Red}>pax left</Text>
                          </Text>
                          <View
                            style={[
                              stylesGlobal.row100,
                              styles.rightBottom,
                              stylesGlobal.alignItemsCenter,
                            ]}
                          >
                            <View
                              style={[
                                stylesGlobal.containerIcon30,
                                stylesGlobal.padding5,
                              ]}
                            >
                              <Image
                                source={IconClock}
                                style={[
                                  stylesGlobal.imageIcon,
                                  stylesGlobal.tintColorGrey,
                                ]}
                                resizeMode="contain"
                              />
                            </View>
                            <Text>
                              {packages
                                ? moment(
                                    packages.BookingDetailSum.EndDate
                                  ).diff(
                                    moment(packages.BookingDetailSum.StartDate),
                                    'days'
                                  ) + 1
                                : 0}
                              {' days'}{' '}
                              {packages
                                ? moment(
                                    packages.BookingDetailSum.EndDate
                                  ).diff(
                                    moment(packages.BookingDetailSum.StartDate),
                                    'days'
                                  )
                                : 0}
                              {' nights'}
                            </Text>
                          </View>
                        </View>
                      ) : status == 'FixedDateVariable' ? (
                        <View style={[stylesGlobal.width50, styles.right]}>
                          <Text style={stylesGlobal.text22}>Expired Until</Text>
                          <Text style={styles.text26gold}>
                            {packages
                              ? packages.BookingDetailSum.ExpiredOn
                                ? viewDate(packages.BookingDetailSum.ExpiredOn)
                                : ''
                              : ''}{' '}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  )}

                  {packages ? (
                    packages.MinPax > 0 ? (
                      <View
                        style={[
                          stylesGlobal.paddingBottom10,
                          stylesGlobal.paddingLeft20,
                          stylesGlobal.paddingRight20,
                          stylesGlobal.paddingTop20,
                        ]}
                      >
                        <View
                          style={[
                            styles.cardWarningMinPax,
                            stylesGlobal.center,
                          ]}
                        >
                          <Ionicons
                            name="ios-information-circle"
                            size={20}
                            color={styles.$redcolor}
                          />
                          <Text>
                            {' '}
                            This packages has minimum : {packages.MinPax} Guests
                          </Text>
                        </View>
                      </View>
                    ) : null
                  ) : null}

                  <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
                    <SeperatorRepeat
                      repeat={35}
                      widthsepar={8}
                      heightSepar={1}
                      colorSepar="#777"
                    />
                  </View>
                  <Text
                    style={[
                      styles.bold18,
                      stylesGlobal.paddingBottom20,
                      stylesGlobal.paddingLeft20,
                      stylesGlobal.paddingRight20,
                      stylesGlobal.paddingTop10,
                    ]}
                  >
                    Tour Description
                  </Text>

                  <View
                    style={[
                      styles.row100,
                      styles.colPadding20,
                      styles.marginBottom10,
                    ]}
                  >
                    {this.state.loading ? (
                      <RoundedLoading width={width90} line={2} />
                    ) : (
                      <Text style={styles.textJustify25}>
                        {packages
                          ? packages.BookingDetailSum
                            ? packages.BookingDetailSum.Description
                              ? packages.BookingDetailSum.Description.length <=
                                250
                                ? packages.BookingDetailSum.Description.slice(
                                    0,
                                    250
                                  )
                                : this.state.nameButton == 'READ MORE'
                                ? packages.BookingDetailSum.Description.slice(
                                    0,
                                    250
                                  )
                                : packages.BookingDetailSum.Description
                              : ''
                            : ''
                          : ''}
                      </Text>
                    )}
                  </View>
                  {packages ? (
                    packages.BookingDetailSum ? (
                      packages.BookingDetailSum.Description ? (
                        packages.BookingDetailSum.Description.length <=
                        250 ? null : (
                          <View
                            style={[
                              styles.row100,
                              styles.colPadding20,
                              styles.marginBottomCenter20,
                            ]}
                          >
                            <TouchableOpacity
                              style={styles.marginTop10}
                              onPress={this.textButton}
                            >
                              <Text style={styles.readMoreText}>
                                {this.state.nameButton}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )
                      ) : null
                    ) : null
                  ) : null}
                </Card>

                {status == 'Fixed' ? (
                  this.state.loading ? (
                    <RoundedLoading width={width90} height={200} />
                  ) : (
                    <Card widthCard="90%">
                      <Text
                        style={[
                          stylesGlobal.paddingTop20,
                          stylesGlobal.paddingHorizontal20,
                          styles.bold20,
                        ]}
                      >
                        Tour Operator
                      </Text>
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
                          styles.row100,
                          styles.colPadding20,
                          styles.paddingBottom20,
                        ]}
                      >
                        <View style={stylesGlobal.width30}>
                          {imageslogo != '' ? (
                            <Image
                              style={[
                                styles.imagestyleDetail,
                                styles.borderRadius80,
                              ]}
                              source={{ uri: imageslogo }}
                            />
                          ) : (
                            <Image
                              style={[
                                styles.imagestyleDetail,
                                styles.borderRadius80,
                              ]}
                              source={IMAGES}
                            />
                          )}
                        </View>
                        <View
                          style={[stylesGlobal.width70, styles.paddingLeft30]}
                        >
                          <Text style={styles.textInfo}>
                            {this.props.operator
                              ? this.props.operator.Name
                              : ''}
                          </Text>
                          <Text style={styles.textInfo}>
                            Region:{' '}
                            {tourOperator ? tourOperator.RegionName : ''}
                          </Text>
                          <Text style={styles.textInfo}>
                            {tourOperator ? tourOperator.Telephone : ''}
                          </Text>
                          <Text style={styles.textInfo}>
                            {tourOperator ? tourOperator.Email : ''}
                          </Text>
                        </View>
                      </View>
                    </Card>
                  )
                ) : null}

                <View style={stylesGlobal.width100}>
                  <Text
                    style={[
                      styles.bold18,
                      stylesGlobal.paddingVertical20,
                      stylesGlobal.paddingLeft20,
                    ]}
                  >
                    Where we'll stay
                  </Text>

                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={false}
                  >
                    {this.state.loading ? (
                      <RoundedLoading width={width90} height={200} />
                    ) : packages ? (
                      packages.Accommodations.length != 0 ? (
                        packages.Accommodations.map((room, i) => {
                          {
                            let DataStar = room.AccommodationRating || '';
                            let Star = parseInt(DataStar.Id) || '';
                            return (
                              <View
                                key={i}
                                style={
                                  packages.Accommodations.length == 1
                                    ? styles.cardAccomoSingle
                                    : styles.cardAccomo
                                }
                                onLayout={event =>
                                  this.setState({
                                    heightData: event.nativeEvent.layout.height,
                                  })
                                }
                              >
                                <CardAccomodation
                                  Img={room.ImageUrl ? room.ImageUrl : null}
                                  Title={room.Name}
                                  Address={room.City ? room.City.Name : ''}
                                  namabutton="SEE DETAIL"
                                  numberStar={Star}
                                  ProfileFacilities={room.ProfileFacilities}
                                  onPress={() =>
                                    this.handlePressDetailHotel(room)
                                  }
                                  widthCard="100%"
                                  type={true}
                                  typeCard="Hotel"
                                />
                              </View>
                            );
                          }
                        })
                      ) : null
                    ) : null}
                  </ScrollView>
                </View>
                <View
                  style={[
                    stylesGlobal.row100,
                    stylesGlobal.padding20,
                    stylesGlobal.alignItemsCenter,
                  ]}
                >
                  <View
                    style={[stylesGlobal.width50, styles.alignContentCenter]}
                  >
                    <Text style={[styles.bold18, styles.marginBottom20]}>
                      What we'll do
                    </Text>
                  </View>
                  <View style={stylesGlobal.width50}>
                    {this.state.loading ? (
                      <RoundedLoading width={100} height={30} />
                    ) : (
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
                    )}
                  </View>
                </View>
                {this.state.loading ? (
                  <View
                    style={[
                      stylesGlobal.paddingHorizontal20,
                      styles.paddingBottom20,
                    ]}
                  >
                    <SliderLoading width={200} height={150} column={3} />
                  </View>
                ) : daily != null ? (
                  <View style={[styles.rowNoPadding, styles.paddingBottom20]}>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      style={styles.Scroll}
                    >
                      {daily.map((move, i) => {
                        return (
                          <View key={i} style={styles.paddingLeft10}>
                            <CardMediaNew
                              type="daily"
                              title={
                                move.Movements.length > 0
                                  ? move.Movements[0].DestinationName
                                  : null
                              }
                              subtitle={`${move.Day}`}
                              duration={moment(move.Date).format('DD MMM YYYY')}
                              image={
                                move.TourDestinations
                                  ? move.TourDestinations.length > 0
                                    ? move.TourDestinations[0].ImageUrl
                                    : ''
                                  : ''
                              }
                              onPress={() => this.handlePressItinerary(i)}
                            />
                          </View>
                        );
                      })}
                    </ScrollView>
                  </View>
                ) : null}

                <View
                  style={[stylesGlobal.row100, stylesGlobal.alignItemsCenter]}
                >
                  {this.state.loading ? (
                    <View style={stylesGlobal.paddingHorizontal20}>
                      <RoundedLoading width={width90} height={200} />
                    </View>
                  ) : status == 'Fixed' ? (
                    <Card widthCard="90%">
                      <Text
                        style={[
                          stylesGlobal.paddingTop20,
                          stylesGlobal.paddingHorizontal20,
                          styles.bold20,
                        ]}
                      >
                        Payment Terms
                      </Text>
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
                      {paymentTerms ? (
                        paymentTerms.length != 0 ? (
                          <View
                            style={[
                              stylesGlobal.paddingHorizontal20,
                              stylesGlobal.paddingBottom20,
                            ]}
                          >
                            {paymentTerms.map((pay, i) => {
                              return (
                                <TextPaymentTerms
                                  key={i}
                                  paymentterms={pay.Description}
                                  percentage={pay.PaymentPercentage}
                                  date={moment(pay.DueDate).format(
                                    'DD MMM YYYY'
                                  )}
                                />
                              );
                            })}
                          </View>
                        ) : null
                      ) : null}
                    </Card>
                  ) : null}
                </View>

                {this.state.loading ? (
                  <View style={stylesGlobal.alignItemsCenter}>
                    <RoundedLoading width={width90} height={200} />
                  </View>
                ) : (
                  <Card widthCard="90%">
                    {status == 'Fixed' || status == 'FixedDateVariable' ? (
                      <View>
                        <Text
                          style={[
                            stylesGlobal.paddingHorizontal20,
                            stylesGlobal.paddingTop20,
                            styles.bold20,
                          ]}
                        >
                          Room Packages Price
                        </Text>
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
                            stylesGlobal.paddingHorizontal20,
                            stylesGlobal.paddingBottom20,
                          ]}
                        >
                          <View style={stylesGlobal.row100}>
                            <View style={stylesGlobal.width10}>
                              <View style={stylesGlobal.containerIcon30}>
                                <Image
                                  source={IconTwinSharing}
                                  style={stylesGlobal.imageIcon}
                                  resizeMode="contain"
                                />
                              </View>
                            </View>
                            <View style={stylesGlobal.width50}>
                              <Text style={styles.text14}>
                                {' '}
                                Twin Sharing Room
                              </Text>
                            </View>
                            <View style={stylesGlobal.width40}>
                              <Text style={styles.text14}>
                                {price.CurrencyId}{' '}
                                {convertRoundPrice(
                                  price.SharingRoomPrice,
                                  price.CurrencyId
                                )}
                                /Pax
                              </Text>
                            </View>
                          </View>
                          <View style={stylesGlobal.row100}>
                            <View style={stylesGlobal.width10}>
                              <View
                                style={[
                                  stylesGlobal.containerIcon30,
                                  stylesGlobal.padding5,
                                ]}
                              >
                                <Image
                                  source={IconSingleRoom}
                                  style={stylesGlobal.imageIcon}
                                  resizeMode="contain"
                                />
                              </View>
                            </View>
                            <View style={stylesGlobal.width50}>
                              <Text style={styles.text14}> Single Room</Text>
                            </View>
                            <View style={stylesGlobal.width40}>
                              <Text style={styles.text14}>
                                {price.CurrencyId}{' '}
                                {convertRoundPrice(
                                  price.SingleRoomPrice,
                                  price.CurrencyId
                                )}
                                /Pax
                              </Text>
                            </View>
                          </View>
                          <View style={stylesGlobal.row100}>
                            <View style={stylesGlobal.width10}>
                              <View style={stylesGlobal.containerIcon30}>
                                <Image
                                  source={IconExtraBedAdult}
                                  style={stylesGlobal.imageIcon}
                                  resizeMode="contain"
                                />
                              </View>
                            </View>
                            <View style={stylesGlobal.width50}>
                              <Text style={styles.text14}>
                                {' '}
                                Extra Bed Adult
                              </Text>
                            </View>
                            <View style={stylesGlobal.width40}>
                              <Text style={styles.text14}>
                                {price.CurrencyId}{' '}
                                {convertRoundPrice(
                                  price.AdultExtraBedPrice,
                                  price.CurrencyId
                                )}
                                /Pax
                              </Text>
                            </View>
                          </View>
                          <View style={stylesGlobal.row100}>
                            <View style={stylesGlobal.width10}>
                              <View
                                style={[
                                  stylesGlobal.containerIcon30,
                                  stylesGlobal.padding5,
                                ]}
                              >
                                <Image
                                  source={IconExtraBedChild}
                                  style={stylesGlobal.imageIcon}
                                  resizeMode="contain"
                                />
                              </View>
                            </View>
                            <View style={stylesGlobal.width50}>
                              <Text style={styles.text14}>
                                {' '}
                                Extra Bed Child
                              </Text>
                            </View>
                            <View style={stylesGlobal.width40}>
                              <Text style={styles.text14}>
                                {price.CurrencyId}{' '}
                                {convertRoundPrice(
                                  price.ChildExtraBedPrice,
                                  price.CurrencyId
                                )}
                                /Pax
                              </Text>
                            </View>
                          </View>
                          <View style={stylesGlobal.row100}>
                            <View style={stylesGlobal.width10}>
                              <View
                                style={[
                                  stylesGlobal.containerIcon30,
                                  stylesGlobal.padding5,
                                ]}
                              >
                                <Image
                                  source={IconBabyCrib}
                                  style={stylesGlobal.imageIcon}
                                  resizeMode="contain"
                                />
                              </View>
                            </View>
                            <View style={stylesGlobal.width50}>
                              <Text style={styles.text14}> Baby Crib</Text>
                            </View>
                            <View style={stylesGlobal.width40}>
                              <Text style={styles.text14}>
                                {price.CurrencyId}{' '}
                                {convertRoundPrice(
                                  price.NoBedPrice,
                                  price.CurrencyId
                                )}
                                /Pax
                              </Text>
                            </View>
                          </View>
                          <View style={stylesGlobal.row100}>
                            <View style={stylesGlobal.width10}>
                              <View
                                style={[
                                  stylesGlobal.containerIcon30,
                                  stylesGlobal.padding5,
                                ]}
                              >
                                <Image
                                  source={IconWithParents}
                                  style={stylesGlobal.imageIcon}
                                  resizeMode="contain"
                                />
                              </View>
                            </View>
                            <View style={stylesGlobal.width50}>
                              <Text style={styles.text14}>
                                {' '}
                                Sharing Bed With Parents
                              </Text>
                            </View>
                            <View style={stylesGlobal.width40}>
                              <Text style={styles.text14}>
                                {price.CurrencyId}{' '}
                                {convertRoundPrice(
                                  price.SharingBedPrice,
                                  price.CurrencyId
                                )}
                                /Pax
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    ) : null}
                  </Card>
                )}
                {this.state.loading ? (
                  <View style={stylesGlobal.alignItemsCenter}>
                    <RoundedLoading width={width90} height={350} />
                  </View>
                ) : (
                  <View
                    style={[stylesGlobal.row100, stylesGlobal.alignItemsCenter]}
                  >
                    {packages ? (
                      packages.Descriptions ? (
                        packages.Descriptions.length != 0 ? (
                          <Card widthCard="90%">
                            <Text
                              style={[
                                stylesGlobal.paddingHorizontal20,
                                stylesGlobal.paddingTop20,
                                styles.bold20,
                              ]}
                            >
                              {status == 'Fixed'
                                ? 'Important Information'
                                : 'Additional Information'}
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
                            {packages.Descriptions.map((Desc, i) => {
                              return (
                                <View
                                  key={i}
                                  style={[
                                    styles.bottom,
                                    styles.marginBottom20,
                                    // stylesGlobal.paddingHorizontal20
                                  ]}
                                >
                                  <Text style={stylesGlobal.text16}>
                                    {Desc.SubTitle}
                                  </Text>

                                  <AutoHeightWebView
                                    customScript={`document.body.style.background = 'transparent';`}
                                    customStyle={`* {font-family: 'Roboto'; text-align: justify;  padding-left: 5px; 
                  padding-right: 5px; text-justify: auto; overflow-wrap: break-word} 
                  p { font-size: 14px }
                  `}
                                    heightOffset={5}
                                    files={[
                                      {
                                        href: 'cssfileaddress',
                                        type: 'text/css',
                                        rel: 'stylesheet',
                                      },
                                    ]}
                                    scalesPageToFit={
                                      Platform.OS == 'android' ? true : false
                                    }
                                    style={[
                                      stylesGlobal.width100,
                                      styles.marginBottom20,
                                    ]}
                                    source={{ html: Desc.Content }}
                                  />
                                </View>
                              );
                            })}
                          </Card>
                        ) : null
                      ) : null
                    ) : null}
                  </View>
                )}
              </View>
            </Container>
          </ScrollView>
        </Container>
        <View style={[styles.footer, styles.topRadius]}>
          {this.state.loading ? (
            <RoundedLoading width={fullWidth} height={300} />
          ) : status == 'Fixed' || status == 'FixedDateVariable' ? (
            <View style={stylesGlobal.row100}>
              <View style={[stylesGlobal.width60, stylesGlobal.padding20]}>
                <Text style={[stylesGlobal.textWhite, stylesGlobal.text10]}>
                  Starting{' '}
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
                      {price ? price.CurrencyId : ''}{' '}
                      {price
                        ? price.SharingRoomPrice.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                            .toLocaleString(price.CurrencyId)
                        : ''}
                    </Text>
                  </Text>
                  <Text style={[stylesGlobal.text10, stylesGlobal.textWhite]}>
                    Per pax on Twin Sharing
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
                  onPress={this.handlePressBookingGuest}
                />
              </View>
            </View>
          ) : (
            <View style={stylesGlobal.row100}>
              <ShimmerButton
                text="BOOK"
                textSize={17}
                buttonWidth="100%"
                buttonHeight="100%"
                buttonColor={styles.$goldcolor}
                textColor="black"
                onPress={this.handlePressBookingGuest}
              />
            </View>
          )}
        </View>
      </>
    );
  }
}

const mapStateToProps = state => ({
  packageById: state.transactionReducer.packageById,
  packageByIdStatus: state.transactionReducer.packageByIdStatus,
  loading: state.transactionReducer.loading,
  packageStatus: state.transactionReducer.packageStatusFromHomeToList,
  packageIdFromSystem: state.transactionReducer.packageIdFromSystem,
  tourOperatorId: state.transactionReducer.tourOperatorId,
  tourOperatorIdStatus: state.transactionReducer.tourOperatorIdStatus,
});

export default connect(mapStateToProps, {
  getSeriesPackageByIdAction,
  resetTransactionAction,
  getTourOperatorProfileByIdAction,
  setPackageDataAction,
})(PackagesDetail);
