import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
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
import { Notifications } from 'expo';
import { Card, CardHeader, CardIcon } from '../../components/card';
import { Container } from '../../components/container';
import axios from 'axios';
import {
  exitAlert,
  handleAndroidBackButton,
} from '../Common/backHandlerAndroid';
import VersionCheck from 'react-native-version-check';
import styles from '../styles';
import stylesGlobal from '../../components/styles';
import iconReady from '../../assets/Icon/ready_package.png';
import iconFixed from '../../assets/Icon/series_package.png';
import iconCustom from '../../assets/Icon/custom_package.png';
import { LinearGradient } from 'expo-linear-gradient';
import { setPackageStatusFromHomeToListAction } from '../../actions/Transactions/TransactionAction';
import { setToken } from '../../actions/UserAuth/userAuthAction';

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
        this.setState({ countryCode: res.data.countryCode });
      });
    } catch (error) {}
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const userToken = await AsyncStorage.getItem('token');
    this.props.setToken(userToken);
    handleAndroidBackButton(exitAlert);
    await this.getCountryLoc();

    VersionCheck.needUpdate().then(async res => {
      if (res.isNeeded) {
        this.showUpdateVersion();
      }
    });
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
      this.setState({ loading: false });
      this.props.dispatch(reset_featured_packages());
      return false;
    } else return true;
  }

  getNotif = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
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
      { text: 'Cancel' },
    ]);
  };

  updateVersion = async () => {
    Linking.openURL(await VersionCheck.getStoreUrl());
  };

  handlepressbooking = (Id, TourOperator) => {
    this.setState({ loading: true });
    this.props.dispatch(get_id(Id));
    this.props.navigation.navigate('PackagesDetail', {
      status: 'Fixed',
      Id: Id,
      from: 'Home',
      TourOperator: TourOperator,
    });
    this.setState({ loading: false });
  };

  handlePressFix = () => {
    this.setState({ loading: true });
    // this.props.navigation.navigate("PackageList", { type: "Fixed" });
    this.props.navigation.navigate('PackageList');
    this.props.setPackageStatusFromHomeToListAction('Series');
    this.setState({ loading: false });
  };

  handlePressReady = () => {
    this.setState({ loading: true });
    // this.props.navigation.navigate("PackageList", {
    //   type: "ready"
    // });
    this.props.navigation.navigate('PackageList');
    this.props.setPackageStatusFromHomeToListAction('Ready');
    this.setState({ loading: false });
  };

  handlePressCustom = () => {
    this.props.navigation.navigate('CustomPackageOption', {
      screen: 'CustomPackageOptionStack',
    });
  };

  handlePressFilter = () => {
    this.props.navigation.navigate('TravelCategory');
  };

  render() {
    return (
      <Container>
        <LinearGradient
          colors={['white', '#75BDAE', '#38AF95']}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
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
export default connect(mapStateToProps, {
  setPackageStatusFromHomeToListAction,
  setToken,
})(home);
