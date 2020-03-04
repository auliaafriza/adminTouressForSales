import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { connect } from "react-redux";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  AsyncStorage,
  StatusBar,
  Alert,
  Linking
} from "react-native";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import { Card, CardHeader } from "../../components/card";
import { Container } from "../../components/container";
import axios from "axios";
import {
  exitAlert,
  handleAndroidBackButton
} from "../Common/backHandlerAndroid";
import VersionCheck from "react-native-version-check";
import styles from "../styles";
import stylesGlobal from "../../components/styles";
import { SliderLoading } from "../../components/loading";
// import {
//   get_images_home,
//   get_featured_packages,
//   reset_featured_packages
// } from "../actions/homeAction";

// import { login_success } from "../actions/userAuthAction";
// import { get_fixpackages, get_id } from "../actions/fixPackagesAction";
// import {
//   get_type_tour_start,
//   get_pax_type_tour_start,
//   get_city_incountry,
//   get_country,
//   get_movement_mode,
//   get_guest_title
// } from "../actions/generalAction";
// import {
//   get_transport_seat_filter,
//   get_transport_type_filter,
//   get_attraction_type_filter,
//   get_menu_category,
//   get_menu_types,
//   get_menu_classes,
//   get_list_airport
// } from "../actions/itemIteneraryAction";
// import {
//   get_accommodation_ratings,
//   get_accommodation_facilities,
//   get_accommodation_types,
//   get_restaurant_specialization,
//   get_accommodation_locations,
//   get_accommodation_areas
// } from "../actions/advanceFilterAction";
// import {
//   get_status_unread_booking,
//   reset_status_unread_booking
// } from "../actions/historyAction";

// import { get_readypackages } from "../actions/readyPackegaesAction";
// import {
//   get_user_profile,
//   get_userinfo,
//   get_user_role
// } from "../actions/accountAction";
// import { get_company_profile } from "../actions/companyAction";
// import { convertRoundPrice } from "../helper/helper";
// import EmpatyPackages from "../assets/images/HomeTouressEmpty.png";
// import TourHome from "./home/components/TourSeriesPackage";
class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      countryCode: null,
      fixPackages: null,
      loaded: false,
      dataUnread: 0,
      tourHome: false
    };
  }

  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    carousel: PropTypes.array,
    fixedPackagesAll: PropTypes.array,
    token: PropTypes.string,
    isLogin: PropTypes.string,
    isFixedPackage: PropTypes.string,
    isUserProfile: PropTypes.string,
    userProfile: PropTypes.object,
    companyProfile: PropTypes.object,
    isFixedPackagesAll: PropTypes.string,
    dataFeaturedPackages: PropTypes.array,
    isFeaturedPackages: PropTypes.string,
    isTotalUnreadBooking: PropTypes.string,
    totalUnreadBooking: PropTypes.number
  };

  getCountryLoc = async () => {
    try {
      return await axios.get(`http://ip-api.com/json`).then(res => {
        this.setState({ countryCode: res.data.countryCode });
      });
    } catch (error) {}
  };

  getAllData = async () => {
    const userToken = JSON.parse(await AsyncStorage.getItem("userLogin"));
    this.props.dispatch(login_success(userToken));
    this.props.dispatch(get_images_home(this.state.countryCode));
    this.props.dispatch(get_featured_packages());
    this.props.dispatch(get_status_unread_booking());
    this.props.dispatch(get_pax_type_tour_start());
    this.props.dispatch(get_fixpackages());
    this.props.dispatch(get_user_role());
    this.props.dispatch(get_type_tour_start());
    this.props.dispatch(get_city_incountry());
    this.props.dispatch(get_country());
    this.props.dispatch(get_userinfo());
    this.props.dispatch(get_readypackages());
    this.props.dispatch(get_guest_title());
    this.props.dispatch(get_movement_mode());
    // this.props.dispatch(get_tour_operator_profile_list());

    //item Itenerary
    this.props.dispatch(get_transport_seat_filter());
    this.props.dispatch(get_transport_type_filter());
    this.props.dispatch(get_attraction_type_filter());
    this.props.dispatch(get_accommodation_ratings());
    // this.props.dispatch(get_accommodation_name());
    this.props.dispatch(get_accommodation_facilities());
    this.props.dispatch(get_accommodation_types());
    this.props.dispatch(get_accommodation_locations());
    this.props.dispatch(get_accommodation_areas());
    this.props.dispatch(get_restaurant_specialization());
    this.props.dispatch(get_list_airport());
    this.props.dispatch(get_menu_classes());
    this.props.dispatch(get_menu_category());
    this.props.dispatch(get_menu_types());
    this.props.dispatch(get_user_profile());
    this.props.dispatch(get_company_profile());
  };

  async componentDidMount() {
    this.setState({
      loading: false
    });
    // Linking.getInitialURL()
    //   .then(url => {
    //     if (url) {
    //       console.log('Initial url is: ' + url);
    //     }
    //   })
    //   .catch(err => console.error('An error occurred', err));
    // this.getNotif();
    // this._notificationSubscription = Notifications.addListener(
    //   this._handleNotification
    // );
    // let dateTimeNow = new Date().getHours();
    // {
    //   dateTimeNow >= 8 && dateTimeNow <= 9 ? this.showNotif() : null;
    // }
    handleAndroidBackButton(exitAlert);
    // await this.getCountryLoc();

    VersionCheck.needUpdate().then(async res => {
      if (res.isNeeded) {
        this.showUpdateVersion();
      }
    });
    //Linking.openURL('market://details?id=com.connectworld.touress');
    // WebBrowser.openBrowserAsync('https://expo.io');
    // await this.getAllData();
    // await this.alertReactTour();
    // await this.homeTour();
    // console.log(JSON.parse(await AsyncStorage.getItem('TouressTour')));
  }

  homeTour = async () => {
    let TouressTour = [];
    let listTour = JSON.parse(await AsyncStorage.getItem("TouressTour"));
    let isAlreadyTour = listTour
      ? listTour.find(data => data.touressTourId === 1)
      : false;
    let x = { touressTourId: 1, alreadyTour: true };
    isAlreadyTour ? listTour : TouressTour.push(x);
    this.setState({ tourHome: true });
    await AsyncStorage.setItem("TouressTour", TouressTour);
  };

  alertReactTour = () => {
    let isAlreadyTour = false;
    !isAlreadyTour &&
      Alert.alert(
        "New version available with tour",
        "Please, following the step",
        [
          {
            text: "Skip"
          },
          {
            text: "Ok",
            onPress: () => this.homeTour()
          }
        ]
      );
  };

  componentDidUpdate() {
    if (this.props.isTotalUnreadBooking === "success") {
      // this.props.navigation.setParams({
      //   showdata: this.props.totalUnreadBooking,
      // });
      this.props.navigation.setParams({
        showdata: 3
      });
      //this.setState({ dataUnread: 3 });
      this.setState({ dataUnread: this.props.totalUnreadBooking });
      this.props.dispatch(reset_status_unread_booking());
      return false;
    } else if (this.props.isTotalUnreadBooking === "failed") {
      this.props.navigation.setParams({
        showdata: this.props.totalUnreadBooking
      });
      this.setState({ dataUnread: this.props.totalUnreadBooking });
      this.props.dispatch(reset_status_unread_booking());
      return false;
    }

    if (this.props.isFeaturedPackages === "success") {
      this.setState({
        loading: false,
        fixPackages: this.props.dataFeaturedPackages
      });
      this.props.dispatch(reset_featured_packages());
      return false;
    } else if (this.props.isFeaturedPackages === "failed") {
      this.setState({ loading: false });
      this.props.dispatch(reset_featured_packages());
      return false;
    } else return true;
  }

  getNotif = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
      Alert.alert("Please give permissions");
      return;
    }
    const token = await Notifications.getExpoPushTokenAsync();
    try {
      return await axios
        .post("https://your-server.com/users/push-token", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            token: {
              value: token
            }
          })
        })
        .then(res => {
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // _handleNotification(notification) {}

  showNotif = () => {
    let localNotification = {
      title: "Hai Sobat Touress",
      body: "Cek Yuk Series Packages Kita"
    };
    const schedulingOptions = {
      repeat: "day",
      time: new Date().getTime() + 3600000
    };
    Notifications.scheduleLocalNotificationAsync(
      localNotification,
      schedulingOptions
    );
  };

  showUpdateVersion = () => {
    Alert.alert("New version available", "Please, update app to new version", [
      {
        text: "Update",
        onPress: () => this.updateVersion()
      },
      { text: "Cancel" }
    ]);
  };

  updateVersion = async () => {
    Linking.openURL(await VersionCheck.getStoreUrl());
  };

  handlepressbooking = (Id, TourOperator) => {
    this.setState({ loading: true });
    this.props.dispatch(get_id(Id));
    this.props.navigation.navigate("PackagesDetail", {
      status: "Fixed",
      Id: Id,
      from: "Home",
      TourOperator: TourOperator
    });
    this.setState({ loading: false });
  };

  handlePressFix = () => {
    this.setState({ loading: true });
    this.props.navigation.navigate("PackagesList", { type: "Fixed" });
    this.setState({ loading: false });
  };

  handlePressReady = () => {
    this.setState({ loading: true });
    this.props.navigation.navigate("ReadyPackagesList", {
      type: "ready"
    });
    this.setState({ loading: false });
  };

  handlePressCustom = () => {
    this.props.navigation.navigate("customPackagesOption");
  };

  handlePressFilter = () => {
    this.props.navigation.navigate("TravelCategory");
  };

  handlePressPromo = () => {
    this.props.navigation.navigate("PromoPackages");
  };

  render() {
    return (
      <Container>
        <View>
          <StatusBar
            backgroundColor="transparent"
            translucent={true}
            barStyle="dark-content"
          />
        </View>
        {/* {this.state.loading ? (
          <Loading sizeloading="large" colorloading={styles.$goldcolor} />
        ) : null} */}
        <ScrollView style={stylesGlobal.containerScroll}>
          <Container paddingbottomcontainer={80}>
            <Card widthCard="90%" topMargin={-50} bottomMargin={20}>
              <Text
                style={[
                  styles.text16Bold,
                  styles.paddingLeft20,
                  styles.paddingTop20,
                  styles.alignSelfLeft
                ]}
              >
                Our Package
              </Text>
              <View style={[styles.row100, styles.marginBottom20]}>
                {/* <TourHome
                  handlePressCustom={this.handlePressCustom}
                  handlePressFix={this.handlePressFix}
                  handlePressReady={this.handlePressReady}
                  handlePressPromo={this.handlePressPromo}
                  tourHome={this.state.tourHome}
                  loading={this.state.loading}
                /> */}
              </View>
            </Card>

            {this.state.fixPackages ? (
              this.state.fixPackages.length != 0 ? (
                <View style={[styles.row100, styles.paddingHorizontal20]}>
                  <View style={styles.col50}>
                    <Text style={styles.text16Bold}>Recommended</Text>
                  </View>
                  <View style={[styles.col50, styles.alignItemsEnd]}>
                    <TouchableOpacity onPress={this.handlePressFix}>
                      <Text style={styles.text16Blue}>See all</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null
            ) : null}
            <View
              style={[styles.row100, styles.paddingTop20, styles.paddingLeft15]}
            >
              <ScrollView horizontal={true}>
                {this.state.fixPackages ? (
                  this.state.fixPackages.length != 0 ? (
                    this.state.fixPackages.map((fix, i) => {
                      let value = 0;
                      fix.Commissions.map(i => {
                        value = value + i.Value;
                      });
                      return (
                        <CardHeader
                          buttonTextColor={styles.goldcolor}
                          titletour={fix.Title}
                          textjadwalstart={moment(fix.StartDate).format(
                            "DD MMM"
                          )}
                          textjadwalend={moment(fix.EndDate).format(
                            "DD MMM YYYY"
                          )}
                          hargapax={convertRoundPrice(
                            fix.SharingRoomPrice,
                            fix.CurrencyId
                          ).toString()}
                          images={
                            fix.Images
                              ? fix.Images.length != 0
                                ? fix.Images[0].ImageUrl
                                : fix.City.ImageUrl
                              : fix.City.ImageUrl
                          }
                          textkouta={
                            fix.FixedPackage.MinimumGuest -
                            fix.FixedPackage.ConfirmedGuest
                          }
                          Commission={convertRoundPrice(
                            value,
                            fix.CurrencyId
                          ).toString()}
                          key={"packages" + i}
                          currencies={fix.CurrencyId}
                          onPress={() =>
                            this.handlepressbooking(fix.Id, fix.TourOperator)
                          }
                        />
                      );
                    })
                  ) : null
                ) : (
                  <SliderLoading
                    width={200}
                    height={150}
                    column={3}
                    isTitle={true}
                  />
                )}
              </ScrollView>
            </View>

            {this.state.fixPackages ? (
              this.state.fixPackages.length == 0 ? (
                <View style={[stylesGlobal.center, stylesGlobal.width100]}>
                  <View
                    style={[
                      styles.containerImageNoPackages,
                      stylesGlobal.center
                    ]}
                  >
                    <Image
                      source={EmpatyPackages}
                      resizeMode="contain"
                      style={styles.imageNoPackages}
                    />
                  </View>
                  <Text
                    style={[stylesGlobal.text14, stylesGlobal.paddingTop30]}
                  >
                    Sorry we can't recommended travel package for you
                  </Text>
                  <TouchableOpacity onPress={this.handlePressFix}>
                    <Text style={[stylesGlobal.text14, stylesGlobal.textGold]}>
                      See another travel package
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null
            ) : null}

            {/* <View style={[styles.row100, styles.paddingHorizontal20]}>
              <View style={styles.col50}>
                <Text style={styles.text16Bold}>Introducing touress</Text>
              </View>
              <View style={[styles.col50, styles.alignItemsEnd]}>
                <Text style={styles.text16Blue}>See all</Text>
              </View>
            </View>
            <View
              style={[styles.row, styles.paddingTop20, styles.paddingLeft15]}
            >
              <ScrollView horizontal={true}>
                <CardHeader
                  widthCard={200}
                  textIntroducing="Explore touress"
                  type="introducing"
                  titleIntro="Everything you can expect from DMC but entirely online"
                  descIntro={lorem}
                />
              </ScrollView>
            </View> */}
          </Container>
        </ScrollView>
      </Container>
    );
    // </SafeAreaView>
  }
}

const mapStateToProps = state => ({
  //   carousel: state.homeReducer.carouselImage,
  //   fixedPackagesAll: state.fixPackagesReducer.fixedPackagesAll,
  //   token: state.userAuthReducer.token,
  //   isFixedPackage: state.fixPackagesReducer.isFixedPackageById,
  //   isLogin: state.userAuthReducer.isLoggedIn,
  //   isFixedPackagesAll: state.fixPackagesReducer.isFixedPackagesAll,
  //   isUserProfile: state.accountReducer.isUserProfile,
  //   userProfile: state.accountReducer.userProfile,
  //   companyProfile: state.companyProfileReducer.companyProfile,
  //   dataFeaturedPackages: state.homeReducer.dataFeaturedPackages,
  //   isFeaturedPackages: state.homeReducer.isFeaturedPackages,
  //   isTotalUnreadBooking: state.historyReducer.isTotalUnreadBooking,
  //   totalUnreadBooking: state.historyReducer.totalUnreadBooking,
});

// export default connect(mapStateToProps)(home);
export default home;
