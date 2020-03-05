import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {connect} from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  AsyncStorage,
  StatusBar,
  Alert,
  Linking,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import {Notifications} from 'expo';
import {Card, CardHeader, CardIcon} from '../../components/card';
import {Container} from '../../components/container';
import axios from 'axios';
import {exitAlert, handleAndroidBackButton} from '../Common/backHandlerAndroid';
import VersionCheck from 'react-native-version-check';
import styles from '../styles';
import stylesGlobal from '../../components/styles';
import iconReady from '../../assets/Icon/ready_package.png';
import iconFixed from '../../assets/Icon/series_package.png';
import iconCustom from '../../assets/Icon/custom_package.png';
import {LinearGradient} from 'expo-linear-gradient';
// import { SliderLoading } from "../../components/loading";
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
  };

  getCountryLoc = async () => {
    try {
      return await axios.get(`http://ip-api.com/json`).then(res => {
        this.setState({countryCode: res.data.countryCode});
      });
    } catch (error) {}
  };

  // getAllData = async () => {
  //   const userToken = JSON.parse(await AsyncStorage.getItem('userLogin'));
  //   this.props.dispatch(login_success(userToken));
  //   this.props.dispatch(get_images_home(this.state.countryCode));
  //   this.props.dispatch(get_featured_packages());
  //   this.props.dispatch(get_pax_type_tour_start());
  //   this.props.dispatch(get_fixpackages());
  //   this.props.dispatch(get_user_role());
  //   this.props.dispatch(get_type_tour_start());
  //   this.props.dispatch(get_city_incountry());
  //   this.props.dispatch(get_country());
  //   this.props.dispatch(get_userinfo());
  //   this.props.dispatch(get_readypackages());
  //   this.props.dispatch(get_guest_title());
  //   this.props.dispatch(get_movement_mode());
  //   // this.props.dispatch(get_tour_operator_profile_list());

  //   //item Itenerary
  //   this.props.dispatch(get_transport_seat_filter());
  //   this.props.dispatch(get_transport_type_filter());
  //   this.props.dispatch(get_attraction_type_filter());
  //   this.props.dispatch(get_accommodation_ratings());
  //   // this.props.dispatch(get_accommodation_name());
  //   this.props.dispatch(get_accommodation_facilities());
  //   this.props.dispatch(get_accommodation_types());
  //   this.props.dispatch(get_accommodation_locations());
  //   this.props.dispatch(get_accommodation_areas());
  //   this.props.dispatch(get_restaurant_specialization());
  //   this.props.dispatch(get_list_airport());
  //   this.props.dispatch(get_menu_classes());
  //   this.props.dispatch(get_menu_category());
  //   this.props.dispatch(get_menu_types());
  //   this.props.dispatch(get_user_profile());
  //   this.props.dispatch(get_company_profile());
  // };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    // this.getNotif();
    // this._notificationSubscription = Notifications.addListener(
    //   this._handleNotification
    // );
    // let dateTimeNow = new Date().getHours();
    // {
    //   dateTimeNow >= 8 && dateTimeNow <= 9 ? this.showNotif() : null;
    // }
    handleAndroidBackButton(exitAlert);
    await this.getCountryLoc();

    VersionCheck.needUpdate().then(async res => {
      if (res.isNeeded) {
        this.showUpdateVersion();
      }
    });
    //Linking.openURL('market://details?id=com.connectworld.touress');
    // WebBrowser.openBrowserAsync('https://expo.io');
    // await this.getAllData();
  }

  componentDidUpdate() {
    if (this.props.isFeaturedPackages === 'success') {
      this.setState({
        loading: false,
        fixPackages: this.props.dataFeaturedPackages,
      });
      this.props.dispatch(reset_featured_packages());
      return false;
    } else if (this.props.isFeaturedPackages === 'failed') {
      this.setState({loading: false});
      this.props.dispatch(reset_featured_packages());
      return false;
    } else return true;
  }

  getNotif = async () => {
    const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      Alert.alert('Please give permissions');
      return;
    }
    const token = await Notifications.getExpoPushTokenAsync();
    try {
      return await axios
        .post('https://your-server.com/users/push-token', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: {
              value: token,
            },
          }),
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
      title: 'Hai Sobat Touress',
      body: 'Cek Yuk Series Packages Kita',
    };
    const schedulingOptions = {
      repeat: 'day',
      time: new Date().getTime() + 3600000,
    };
    Notifications.scheduleLocalNotificationAsync(
      localNotification,
      schedulingOptions
    );
  };

  showUpdateVersion = () => {
    Alert.alert('New version available', 'Please, update app to new version', [
      {
        text: 'Update',
        onPress: () => this.updateVersion(),
      },
      {text: 'Cancel'},
    ]);
  };

  updateVersion = async () => {
    Linking.openURL(await VersionCheck.getStoreUrl());
  };

  handlepressbooking = (Id, TourOperator) => {
    this.setState({loading: true});
    this.props.dispatch(get_id(Id));
    this.props.navigation.navigate('PackagesDetail', {
      status: 'Fixed',
      Id: Id,
      from: 'Home',
      TourOperator: TourOperator,
    });
    this.setState({loading: false});
  };

  handlePressFix = () => {
    this.setState({loading: true});
    this.props.navigation.navigate('SeriesPackagesList', {type: 'Fixed'});
    this.setState({loading: false});
  };

  handlePressReady = () => {
    this.setState({loading: true});
    this.props.navigation.navigate('ReadyPackagesList', {
      type: 'ready',
    });
    this.setState({loading: false});
  };

  handlePressCustom = () => {
    this.props.navigation.navigate('customPackagesOption');
  };

  handlePressFilter = () => {
    this.props.navigation.navigate('TravelCategory');
  };

  handlePressPromo = () => {
    this.props.navigation.navigate('PromoPackages');
  };

  render() {
    return (
      <Container>
        <LinearGradient
          colors={['white', '#75BDAE', '#38AF95']}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          style={{
            position: 'absolute',
            height: 80,
            width: '100%',
          }}
        />
        <View>
          <StatusBar
            backgroundColor="white"
            translucent={true}
            barStyle="light-content"
          />
        </View>
        <ScrollView style={stylesGlobal.containerScroll}>
          <Container paddingbottomcontainer={80}>
            <View style={styles.containerTitle}>
              <Text style={[stylesGlobal.text16, stylesGlobal.textBold]}>
                Hello,{' '}
                {this.props.userProfile
                  ? this.props.userProfile.Gender == 'Male'
                    ? 'Mr'
                    : 'Mrs'
                  : ''}{' '}
                {this.props.userProfile ? this.props.userProfile.FirstName : ''}
              </Text>
            </View>
            <Card widthCard="90%" topMargin={50} bottomMargin={20}>
              <Text
                style={[
                  styles.text16Bold,
                  styles.paddingLeft20,
                  styles.paddingTop20,
                  styles.alignSelfLeft,
                ]}
              >
                Our Package
              </Text>
              <View style={[styles.row100, styles.marginBottom20]}>
                <View style={styles.containerIcon}>
                  <CardIcon
                    icon={iconFixed}
                    textColor={styles.$goldcolor}
                    text="Series"
                    onPress={this.handlePressFix}
                  />
                </View>
                <View style={styles.containerIcon}>
                  <CardIcon
                    icon={iconReady}
                    textColor={styles.$goldcolor}
                    text="Ready"
                    onPress={this.handlePressReady}
                  />
                </View>
                <View style={styles.containerIcon}>
                  <CardIcon
                    icon={iconCustom}
                    textColor={styles.$goldcolor}
                    text="Custom"
                    onPress={this.handlePressCustom}
                  />
                </View>
              </View>
            </Card>
          </Container>
        </ScrollView>
      </Container>
    );
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
  //   isFeaturedPackages: state.homeReducer.isFeaturedPackages
});

// export default connect(mapStateToProps)(home);
export default home;
