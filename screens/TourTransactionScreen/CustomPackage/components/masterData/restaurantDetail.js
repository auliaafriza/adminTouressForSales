import React, {Component} from 'react';
import {Container} from '../../../../../components/container';
import {
  View,
  Text,
  ScrollView,
  Image,
  Modal,
  Animated,
  StatusBar,
  BackHandler,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import MapView, {Marker} from 'react-native-maps';
import {SeperatorRepeat} from '../../../../../components/list/index';
import {Card} from '../../../../../components/card/index';
import styles from './styles';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Loading} from '../../../../../components/loading';
import IMAGES from '../../../../../assets/images/NoImage.png';
import IconClock from '../../../../../assets/Icon/clock.png';
import {ModalDuration} from '../../../../../components/modal';
import moment from 'moment';
import {changeTimeNew} from '../../../../../helper/timeHelper';
import {Ionicons, Entypo} from '@expo/vector-icons';
import {
  addDailyDetails,
  afterAddActivityAndDriving,
  getObjectDuration,
  setObjectDuration,
  changeTimeSummaryProgramAfterAddActivity,
  getDrivingAddress,
} from '../../../../../helper/dailyProgram';
import {
  set_daily_program,
  set_summary_program,
} from '../../../../../actions/customAction';
import IconMapIOS from '../../../../../assets/Icon/map_restaurantIOS.png';
import {getDurationAPI} from '../../../../../api/itemItenerarySaga';
import {set_driving} from '../../../../../actions/itemIteneraryAction';
import stylesGlobal from '../../../../../components/styles';
import {get_restaurant_by_id} from '../../../../../actions/itemProfileAction';
class restaurantDetail extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    isData: PropTypes.string,
    SummaryProgram: PropTypes.array,
    dailyProgram: PropTypes.array,
    MovementList: PropTypes.array,
    token: PropTypes.string,
    driving: PropTypes.array,
    data: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      startDateTimePickerVisible: false,
      Mov: this.props.route.params.Mov ? this.props.route.params.Mov : '',
      scrollY: new Animated.Value(0),
      loading: false,
      namaButton: 'Read More',
      Desc: '',
      long: null,
      lat: null,
    };
  }

  async componentDidMount() {
    this.setState({loading: true});
    await this.props.dispatch(get_restaurant_by_id(this.props.route.params.Id));
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });

    let address = this.state.Mov
      ? this.state.Mov.Item
        ? this.state.Mov.Item.Address
          ? this.state.Mov.Item.Address
          : ''
        : ''
      : '';
    this.getLocation(address);
    this.setState({loading: false});
  }

  getLocation = async address => {
    try {
      return await axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=` +
            address +
            `&key=AIzaSyAaQYc2o45vQ04S0FRruSY05XL1_TZ9FIg`
        )
        .then(res => {
          res.status == 'ZERO_RESULTS'
            ? this.setState({
                lat: null,
                long: null,
              })
            : this.setState({
                lat: res.data.results[0].geometry.location.lat,
                long: res.data.results[0].geometry.location.lng,
              });
        });
    } catch (error) {}
  };

  handleTimeSP = time => {
    this.setState({
      Mov: {
        ...this.state.Mov,
        ActivityData: {
          ...this.state.Mov.ActivityData,
          Startime: changeTimeNew(this.state.Mov.ActivityData.Startime, time),
        },
      },
    });
    this.hideDateTimePicked();
  };

  handleDec = () => {
    if (
      this.state.Mov.ActivityData.OptimumDuration <
      this.state.Mov.ActivityData.Duration
    ) {
      this.setState({
        Mov: {
          ...this.state.Mov,
          ActivityData: {
            ...this.state.Mov.ActivityData,
            Duration: this.state.Mov.ActivityData.Duration - 900,
          },
        },
      });
    }
  };

  handleInc = () => {
    this.setState({
      Mov: {
        ...this.state.Mov,
        ActivityData: {
          ...this.state.Mov.ActivityData,
          Duration: this.state.Mov.ActivityData.Duration + 900,
        },
      },
    });
  };

  changeText = value => {
    this.setState({
      Mov: {
        ...this.state.Mov,
        ActivityData: {
          ...this.state.Mov.ActivityData,
          Note: value,
        },
      },
    });
  };

  openModal = item => {
    this.setState({
      modalVisible: true,
      Mov: {
        ...this.state.Mov,
        Item: {
          ...this.state.Mov.Item,
          SelectedMenu: item,
        },
      },
    });
  };

  _showDateTimePicker = () => this.setState({startDateTimePickerVisible: true});

  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  getDriving = async DP => {
    for (let i = 0; i < DP.length; i++)
      for (let j = 0; j < DP[i].Movements.length; j++) {
        if (DP[i].Movements[j].MovementName == 'DRIVING') {
          let item = await getObjectDuration(
            this.props.driving,
            DP[i].Movements[j - 1].Item,
            DP[i].Movements[j + 1].Item
          );
          if (item == null) {
            let data = await getDrivingAddress(
              DP[i].Movements[j - 1].Item,
              DP[i].Movements[j + 1].Item
            );
            item = await getDurationAPI(this.props.token, data);
            if (item.Duration != undefined) {
              this.props.dispatch(
                await set_driving(
                  setObjectDuration(this.props.driving, data, item)
                )
              );
              DP[i].Movements[j].Duration = item.Duration.value;
              DP[i].Movements[j].DurationText = item.Duration.text;
              DP[i].Movements[j].Item.MapsString = item.Duration.MapsString;
            } else {
              DP[i].Movements[j].Duration = 0;
              DP[i].Movements[j].DurationText = '';
              DP[i].Movements[j].Item.MapsString = '';
            }
          } else {
            if (item == undefined) {
              DP[i].Movements[j].Duration = 0;
              DP[i].Movements[j].DurationText = '';
              DP[i].Movements[j].Item.MapsString = '';
            } else {
              DP[i].Movements[j].Duration = item.Duration.value;
              DP[i].Movements[j].DurationText = item.Duration.text;
              DP[i].Movements[j].Item.MapsString = item.Duration.MapsString;
            }
          }
        }
      }
    return DP;
  };

  saveModal = async () => {
    this.setState({
      modalVisible: false,
      loading: true,
    });
    let DP = await addDailyDetails(
      this.props.dailyProgram,
      this.state.Mov.dayIndex,
      this.state.Mov.indexMov,
      this.state.Mov.TypeMovement,
      this.props.MovementList,
      this.state.Mov.Item,
      this.state.Mov.ActivityData
    );
    DP = await this.getDriving(DP);
    DP = await afterAddActivityAndDriving(
      DP,
      this.state.Mov.dayIndex,
      this.state.Mov.indexMov,
      this.props.MovementList
    );
    await this.props.dispatch(await set_daily_program(DP));
    let SP = await changeTimeSummaryProgramAfterAddActivity(
      DP,
      this.props.SummaryProgram
    );
    this.props.dispatch(set_summary_program(SP));
    this.setState({loading: false});
    this.props.navigation.pop();
    this.props.navigation.pop();
  };

  // handleTimeSP = time => {
  //   this.setState({ Time: time });
  //   this.hideDateTimePicked();
  // };

  hideDateTimePicked = () => this.setState({startDateTimePickerVisible: false});

  textButton = text => {
    if (this.state.namaButton == 'Read More') {
      this.setState({Desc: text, namaButton: 'Read Less'});
    } else {
      this.setState({Desc: text.slice(0, 30), namaButton: 'Read More'});
    }
  };

  render() {
    const HEADER_MAX_HEIGHT = 300;
    const HEADER_MIN_HEIGHT = 70;

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
      <Container>
        <Animated.View
          style={[
            styles.headerTransparent,
            {height: headerHeight, backgroundColor: backgroundColorAnimate},
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
            <View style={stylesGlobal.width100}>
              <TouchableOpacity
                style={styles.topNavDetail}
                onPress={() => this.props.navigation.pop()}
              >
                <Ionicons name="ios-arrow-back" size={35} color="#252525" />
              </TouchableOpacity>
              <View style={styles.topNavTextDetail}>
                <Text style={styles.textHeader}>
                  {this.state.Mov
                    ? this.state.Mov.Item
                      ? this.state.Mov.Item.Name.slice(0, 30)
                      : ''
                    : ''}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {this.state.loading ? (
          <Loading sizeloading="large" colorloading={styles.$goldcolor} />
        ) : null}
        <ScrollView
          style={styles.scroll}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: {contentOffset: {y: this.state.scrollY}},
            },
          ])}
        >
          <Container>
            {/* <ScrollView
              style={styles.scrollContainerDetail}
              pagingEnabled={true}
              horizontal={true}
              onScroll={this.handleOnScroll}
            >
              <ScrollView horizontal pagingEnabled={true}>
                {this.state.Mov ? (
                  this.state.Mov.Item.RestaurantProfileImages.length != 0 ? (
                    this.state.Mov.Item.RestaurantProfileImages.map(
                      (image, i) => {
                        return (
                          <View key={i} style={styles.carouselImageContainer}>
                            <TouchableWithoutFeedback
                              activeOpacity={0.75}
                              style={styles.item}
                              key={i}
                            >
                              <Image
                                style={[
                                  styles.carouselImage,
                                  stylesGlobal.backgroundColorGrey,
                                ]}
                                source={{ uri: image.ImageUrl }}
                                resizeMode="cover"
                              />
                            </TouchableWithoutFeedback>
                          </View>
                        );
                      }
                    )
                  ) : this.state.Mov.Item.ImageUrl != '' &&
                    this.state.Mov.Item.ImageUrl != undefined ? (
                    <TouchableWithoutFeedback
                      activeOpacity={0.75}
                      style={styles.item}
                    >
                      <Image
                        style={styles.carouselImage}
                        source={{ uri: this.state.Mov.Item.ImageUrl }}
                        resizeMode="cover"
                      />
                    </TouchableWithoutFeedback>
                  ) : (
                    <TouchableWithoutFeedback
                      activeOpacity={0.75}
                      style={styles.item}
                    >
                      <Image
                        source={IMAGES}
                        resizeMode="cover"
                        style={styles.carouselImage}
                      />
                    </TouchableWithoutFeedback>
                  )
                ) : null}
              </ScrollView>
            </ScrollView> */}

            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                this.setModalVisible(this.state.modalVisible);
              }}
            >
              <View style={styles.modalContainerDuration}>
                <ModalDuration
                  onPressClose={this.closeModal}
                  onPressTime={() => {
                    this.setState({startDateTimePickerVisible: true});
                  }}
                  DateTime={moment(this.state.Mov.ActivityData.Startime).format(
                    'HH : mm '
                  )}
                  isTimePickerVisible={this.state.startDateTimePickerVisible}
                  handleTimePicked={this.handleTimeSP}
                  Duration={this.state.Mov.ActivityData.Duration}
                  Note={this.state.Mov.ActivityData.Note}
                  Dec={this.handleDec}
                  Inc={this.handleInc}
                  hideDateTimePicked={this.hideDateTimePicked}
                  onChangeText={text => {
                    this.changeText(text);
                  }}
                  onPressCancel={this.closeModal}
                  IsSolidStartTime={
                    this.state.Mov.ActivityData.IsSolidStartTime
                  }
                  IsSolidDuration={this.state.Mov.ActivityData.IsSolidDuration}
                  onPressSave={this.saveModal}
                />
              </View>
            </Modal>

            {this.state.Mov.Item &&
            this.state.Mov.Item.RestaurantProfileImages ? (
              <Image
                source={{uri: this.state.Mov.Item.RestaurantProfileImages[0]}}
                resizeMode="cover"
                style={styles.carouselImage}
              />
            ) : (
              <Image
                source={IMAGES}
                resizeMode="center"
                style={styles.carouselImage}
              />
            )}
            <Card widthCard="100%" topMargin={-50} type="Flat">
              <View style={stylesGlobal.padding20}>
                <Text style={styles.text18}>
                  {this.state.Mov ? this.state.Mov.Item.Name : ''}
                </Text>
                <View
                  style={[stylesGlobal.row100, stylesGlobal.alignItemsCenter]}
                >
                  {/* {this.state.Mov.Item.Rating.Text != null ||
                  this.state.Mov.Item.Rating.Text != '' ? ( */}
                  <View
                    style={[
                      stylesGlobal.marginBottom10,
                      stylesGlobal.paddingVertical5,
                      stylesGlobal.marginRight5,
                    ]}
                  >
                    <Text style={[stylesGlobal.text14, stylesGlobal.textBold]}>
                      {this.state.Mov
                        ? this.state.Mov.Item.Rating
                          ? this.state.Mov.Item.Rating.Text
                          : ''
                        : ''}
                    </Text>
                  </View>

                  <View
                    style={[
                      stylesGlobal.marginBottom10,
                      stylesGlobal.width60,
                      stylesGlobal.alignItemsCenter,
                    ]}
                  >
                    <View
                      style={[
                        stylesGlobal.row100,
                        stylesGlobal.alignItemsCenter,
                      ]}
                    >
                      <View
                        style={[stylesGlobal.containerIcon20, styles.padding5]}
                      >
                        <Image
                          source={IconClock}
                          style={[stylesGlobal.imageIcon, styles.tintColorDark]}
                        />
                      </View>
                      <Text>Open : </Text>
                      <Text
                        style={[stylesGlobal.text14, stylesGlobal.textBold]}
                      >
                        {this.state.Mov
                          ? moment(
                              this.state.Mov.Item.OperationStartTime
                            ).format('HH : mm ')
                          : ''}{' '}
                        -{' '}
                        {this.state.Mov
                          ? moment(this.state.Mov.Item.OperationEndTime).format(
                              'HH : mm '
                            )
                          : ''}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.text12Wrap}>
                  {this.state.Mov ? this.state.Mov.Item.Description : ''}
                </Text>
              </View>
              <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
                <SeperatorRepeat
                  repeat={31}
                  widthsepar={8}
                  heightSepar={1}
                  colorSepar="#777"
                />
              </View>
              <View style={stylesGlobal.padding20}>
                <Text style={styles.bold14}>Restaurant Speciality</Text>
                <Text style={[styles.text12Wrap, styles.marginBottom10]}>
                  {this.state.Mov ? this.state.Mov.Item.SpecialityId : ''}
                </Text>
              </View>
              {this.state.lat || this.state.long ? (
                <MapView
                  style={styles.containerMap}
                  pointerEvents="none"
                  region={{
                    latitude: this.state.lat,
                    longitude: this.state.long,
                    latitudeDelta: 0.00922,
                    longitudeDelta: 0.00421,
                  }}
                >
                  <Marker
                    key={0}
                    coordinate={{
                      latitude: this.state.lat,
                      longitude: this.state.long,
                    }}
                  >
                    <Image
                      source={IconMapIOS}
                      style={styles.image30}
                      resizeMode="contain"
                    />
                  </Marker>
                </MapView>
              ) : null}
            </Card>

            <View style={[stylesGlobal.row100, stylesGlobal.padding20]}>
              <Text style={[stylesGlobal.text14, stylesGlobal.textBold]}>
                Menus
              </Text>
              <Entypo
                name="dot-single"
                size={20}
                color={styles.$lightGreycolor}
              />
              {this.state.Mov ? (
                <Text
                  style={[
                    stylesGlobal.text12,
                    stylesGlobal.textBold,
                    styles.colorlightGrey,
                  ]}
                >
                  {this.state.Mov.Item.Menu.length} menus avaliable
                </Text>
              ) : null}
            </View>

            {this.props.data
              ? this.props.data.length != 0
                ? this.props.data.map((menu, i) => {
                    return (
                      <Card key={i} widthCard="90%">
                        <TouchableOpacity onPress={() => this.openModal(menu)}>
                          <View
                            style={[
                              stylesGlobal.row100,
                              stylesGlobal.padding10,
                            ]}
                          >
                            <View
                              style={[
                                stylesGlobal.width30,
                                styles.styleImageMenu,
                              ]}
                            >
                              {menu.ImageUrl ? (
                                <Image
                                  source={{uri: menu.ImageUrl}}
                                  style={[
                                    stylesGlobal.width100,
                                    stylesGlobal.backgroundColorGrey,
                                    stylesGlobal.flexSize,
                                  ]}
                                  resizeMode="cover"
                                />
                              ) : (
                                <Image
                                  source={IMAGES}
                                  style={[
                                    styles.height50,
                                    stylesGlobal.flexSize,
                                    stylesGlobal.width100,
                                    stylesGlobal.backgroundColorGrey,
                                  ]}
                                  resizeMode="center"
                                />
                              )}
                            </View>
                            <View
                              style={[
                                stylesGlobal.width70,
                                stylesGlobal.paddingLeft10,
                              ]}
                            >
                              <Text
                                style={[
                                  stylesGlobal.text16,
                                  stylesGlobal.textBold,
                                  stylesGlobal.marginBottom10,
                                ]}
                              >
                                {menu.Name}
                              </Text>
                              <View
                                style={[
                                  stylesGlobal.row100,
                                  stylesGlobal.marginBottom10,
                                ]}
                              >
                                <View style={styles.stylesMenu}>
                                  <Text style={stylesGlobal.text10}>
                                    {menu.Category + ',' + menu.MenuClass}
                                  </Text>
                                </View>
                                <View style={styles.stylesMenu}>
                                  <Text style={stylesGlobal.text10}>
                                    {menu.TypeOfMenu}
                                  </Text>
                                </View>
                              </View>
                              <Text
                                style={[stylesGlobal.text12, styles.colorLight]}
                              >
                                {menu.Description.slice(0, 50)} ...
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </Card>
                    );
                  })
                : null
              : null}
          </Container>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isData: state.itemProfileReducer.isDataMeal,
  data: state.itemProfileReducer.dataMeal,
  dailyProgram: state.cusPackagesReducer.DailyProgram,
  SummaryProgram: state.cusPackagesReducer.SummaryProgram,
  MovementList: state.generalReducer.movementMode,
  driving: state.itemIteneraryReducer.driving,
  token: state.userAuthReducer.token,
});

export default connect(mapStateToProps)(restaurantDetail);
