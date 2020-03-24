import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Modal,
  Animated,
  Alert,
  StatusBar,
  Dimensions,
  BackHandler,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import { Container } from '../../../../../components/container/index';
import styles from './styles';
import { NormalButton } from '../../../../../components/button/index';
import { ModalDuration } from '../../../../../components/modal';
import { Card } from '../../../../../components/card/index';
import { SeperatorRepeat } from '../../../../../components/list/index';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import IMAGES from '../../../../../assets/images/NoImage.png';
import moment from 'moment';
import {
  getExcursionById,
  resetStatusExcursion,
} from '../../../../../actions/excrusion/excrusionAction';
import { Loading } from '../../../../../components/loading';
import {
  convertToStringDate,
  convertToStringTime,
  changeTimeNew,
  SumSecond,
  getHour,
} from '../../../../../helper/timeHelper';
import {
  addDailyDetails,
  afterAddActivityAndDriving,
  getObjectDuration,
  setObjectDuration,
  copyObject,
  changeTimeSummaryProgramAfterAddActivity,
  getDrivingAddress,
} from '../../../../../helper/dailyProgram';
import {
  setSummaryProgramAction,
  setDailyProgramAction,
} from '../../../../../actions/Transactions/TransactionAction';
import {
  setDrivingAction,
  getDurationAction,
} from '../../../../../actions/transportation/transportationAction';
import IconMapIOS from '../../../../../assets/Icon/map_excursionIOS.png';
import IconClock from '../../../../../assets/Icon/clock.png';
import stylesGlobal from '../../../../../components/styles';
class excrutionDetail extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    data: PropTypes.object,
    isData: PropTypes.string,
    SummaryProgram: PropTypes.array,
    dailyProgram: PropTypes.array,
    MovementList: PropTypes.array,
    token: PropTypes.string,
    driving: PropTypes.array,
    getDuration: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      Mov: this.props.route.params.Mov,
      modalVisible: false,
      loading: true,
      startDateTimePickerVisible: false,
      scrollY: new Animated.Value(0),
      positionLoad: 'relative',
      long: null,
      lat: null,
      error: '',
    };
  }

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
    const { navigation } = this.props;
    const Id = navigation.getParam('Id', 'null');
    await this.props.getExcursionById(Id);
    // let address = this.props.data.Address ? this.props.data.Address : '';
    // address
    //   ? this.getLocation(address)
    //   : this.setState({
    //       lat: null,
    //       long: null,
    //     });
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
    } catch (error) {
      this.setState({
        error: error,
      });
    }
  };

  componentDidUpdate() {
    if (this.props.isData === 'success') {
      this.props.resetStatusExcursion();
      let startTime = this.props.data.IsSolidStartTime
        ? convertToStringDate(this.state.Mov.ActivityData.Startime) +
          convertToStringTime(this.props.data.OperationStartTime)
        : this.state.Mov.ActivityData.Startime;
      this.setState({
        loading: false,
        Mov: {
          ...this.state.Mov,
          Item: this.props.data,
          ActivityData: {
            ...this.state.Mov.ActivityData,
            Duration: this.props.data.OptimumDuration,
            IsSolidDuration: this.props.data.IsSolidDuration,
            IsSolidStartTime: this.props.data.IsSolidStartTime,
            Name: this.props.data.Name,
            OperationEndTime: changeTimeNew(
              this.state.Mov.ActivityData.Startime,
              this.props.data.OperationEndTime
            ),
            // convertToStringDate(this.state.Mov.ActivityData.Startime) +
            // convertToStringTime(this.props.data.OperationEndTime),
            OperationStartTime: changeTimeNew(
              this.state.Mov.ActivityData.Startime,
              this.props.data.OperationStartTime
            ),
            // convertToStringDate(this.state.Mov.ActivityData.Startime) +
            // convertToStringTime(this.props.data.OperationStartTime),
            OptimumDuration: this.props.data.OptimumDuration,
            Startime: startTime,
          },
        },
      });
      return false;
    } else return true;
  }

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

  openModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  _showDateTimePicker = () =>
    this.setState({ startDateTimePickerVisible: true });

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
            item = await this.props.getDurationAction(data);
            item = this.props.getDuration;
            if (item.Duration != undefined) {
              await this.props.setDrivingAction(
                setObjectDuration(this.props.driving, data, item)
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
            if (item == undefined || item == null) {
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

  generateData = async () => {
    this.setState({
      modalVisible: false,
      loading: true,
      positionLoad: 'absolute',
    });
    //await this.handleTimeSP(this.state.Mov.ActivityData.Startime);
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
    await this.props.setDailyProgramAction(DP);
    let SP = await changeTimeSummaryProgramAfterAddActivity(
      DP,
      this.props.SummaryProgram
    );
    this.props.setSummaryProgramAction(SP);
    this.setState({ loading: false });
    this.props.navigation.pop();
    this.props.navigation.pop();
  };

  saveModal = async () => {
    let DP = copyObject(this.props.dailyProgram);
    let inDep = DP[this.state.Mov.dayIndex].Movements.findIndex(
      item => item.MovementName == 'DEPARTURE'
    );
    let inArr = DP[this.state.Mov.dayIndex].Movements.findIndex(
      item => item.MovementName == 'ARRIVAL'
    );
    if (inDep >= 0 && inArr < 0) {
      let time = SumSecond(
        this.state.Mov.ActivityData.Startime,
        this.state.Mov.ActivityData.Duration
      );
      if (
        getHour(time) >=
        getHour(DP[this.state.Mov.dayIndex].Movements[inDep].DateTime)
      )
        Alert.alert(
          'Failed',
          'Estimated time for this excursion has exceed to departure time.Please choose another excursion.',
          [
            {
              text: 'OK',
            },
          ]
        );
      else {
        this.generateData();
      }
    } else if (inArr >= 0 && inDep < 0) {
      if (
        getHour(this.state.Mov.ActivityData.Startime) >=
        getHour(DP[this.state.Mov.dayIndex].Movements[inArr].DateTime) + 2
      ) {
        this.generateData();
      } else
        Alert.alert(
          'Failed',
          'Estimated time for this excursion has exceed to arrival time.Please choose another excursion.',
          [
            {
              text: 'OK',
            },
          ]
        );
    } else if (inDep >= 0 && inArr >= 0) {
      if (inDep > this.state.Mov.indexMov) {
        let time = SumSecond(
          this.state.Mov.ActivityData.Startime,
          this.state.Mov.ActivityData.Duration
        );
        if (
          getHour(time) >=
          getHour(DP[this.state.Mov.dayIndex].Movements[inDep].DateTime)
        )
          Alert.alert(
            'Failed',
            'Estimated time for this excursion has exceed to departure time.Please choose another excursion.',
            [
              {
                text: 'OK',
              },
            ]
          );
        else {
          this.generateData();
        }
      } else if (inArr < this.state.Mov.indexMov) {
        if (
          getHour(this.state.Mov.ActivityData.Startime) >=
          getHour(DP[this.state.Mov.dayIndex].Movements[inArr].DateTime) + 2
        ) {
          this.generateData();
        } else
          Alert.alert(
            'Failed',
            'Estimated time for this excursion has exceed to arrival time.Please choose another excursion.',
            [
              {
                text: 'OK',
              },
            ]
          );
      } else {
        this.generateData();
      }
    } else {
      let time = SumSecond(
        this.state.Mov.ActivityData.Startime,
        this.state.Mov.ActivityData.Duration
      );
      if (
        new Date(time) > new Date(this.state.Mov.ActivityData.OperationEndTime)
      )
        Alert.alert(
          'Failed',
          'Estimated time for this excursion has exceed to operation end time.Please change start time or duration.',
          [
            {
              text: 'OK',
            },
          ]
        );
      else this.generateData();
    }
  };

  hideDateTimePicked = () =>
    this.setState({ startDateTimePickerVisible: false });

  render() {
    const Data = this.props.data ? this.props.data : '';
    const type = Data.AttractionType ? Data.AttractionType : '';
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
    const containerWidth = Dimensions.get('window').width;
    return (
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
              onPress={() => this.props.navigation.pop()}
            >
              <Ionicons name="ios-arrow-back" size={35} color="#252525" />
            </TouchableOpacity>
            <View style={styles.topNavTextDetail}>
              <Text style={styles.textHeader}>{Data ? Data.Name : ''}</Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {this.state.loading ? (
          <Loading
            sizeloading="large"
            colorloading={styles.$goldcolor}
            positionLoad={this.state.positionLoad}
          />
        ) : null}
        <ScrollView
          style={styles.scrollStyle}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } },
          ])}
        >
          <Container widthContainer={containerWidth}>
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
                    this.setState({ startDateTimePickerVisible: true });
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
                  HiddenNote={true}
                />
              </View>
            </Modal>

            {Data ? (
              Data.ImageUrl != undefined && Data.ImageUrl != '' ? (
                <Image
                  source={{ uri: Data.ImageUrl }}
                  resizeMode="cover"
                  style={styles.carouselImage}
                />
              ) : (
                <Image
                  source={IMAGES}
                  resizeMode="center"
                  style={styles.carouselImage}
                />
              )
            ) : (
              <Image
                source={IMAGES}
                resizeMode="center"
                style={styles.carouselImage}
              />
            )}

            <Card type="Flat" widthCard="100%" topMargin={-50}>
              <View style={stylesGlobal.padding20}>
                <Text
                  style={[
                    stylesGlobal.text20,
                    stylesGlobal.textBold,
                    stylesGlobal.marginBottom5,
                  ]}
                >
                  {Data ? Data.Name : ''}
                </Text>
                <View
                  style={[stylesGlobal.row100, stylesGlobal.alignItemsCenter]}
                >
                  <View
                    style={[
                      stylesGlobal.marginBottom10,
                      stylesGlobal.width40,
                      styles.paddingVertical5,
                      styles.marginRight5,
                    ]}
                  >
                    <Text style={[stylesGlobal.text14, stylesGlobal.textBold]}>
                      {Data
                        ? Data.AttractionCategory == 'Package'
                          ? 'Fix Timing'
                          : 'Flexible Timing'
                        : ''}
                    </Text>
                  </View>
                  <View
                    style={[
                      stylesGlobal.marginBottom10,
                      stylesGlobal.width60,
                      stylesGlobal.alignItemsCenter,
                      stylesGlobal.justifyContentEnd,
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
                        {Data
                          ? moment(Data.OperationStartTime).format('HH : mm ')
                          : ''}
                        -{' '}
                        {Data
                          ? moment(Data.OperationEndTime).format('HH : mm ')
                          : ''}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text style={[styles.text12Wrap]}>{Data.Description}</Text>
                <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
                  <SeperatorRepeat
                    repeat={31}
                    widthsepar={8}
                    heightSepar={1}
                    colorSepar="#777"
                  />
                </View>

                {Data ? (
                  Data.AttractionCategory == 'Package' ? (
                    <View
                      style={[
                        styles.cardWarning,
                        styles.marginBottom5,
                        styles.marginTop5,
                        stylesGlobal.center,
                      ]}
                    >
                      <View
                        style={[styles.rowNoPadding, styles.marginBottom10]}
                      >
                        <Icon name="info" size={16} color={styles.$goldcolor} />
                        <Text style={styles.text14Wrap}>
                          The Duration of excurtion not flexible
                        </Text>
                      </View>
                    </View>
                  ) : null
                ) : null}

                <Text style={styles.bold14}>Excrusion Type</Text>
                <Text style={[styles.text12Wrap, styles.marginBottom10]}>
                  {type ? type.Name : ''}
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
          </Container>
        </ScrollView>

        <TouchableOpacity
          style={[styles.footer, styles.bottom0]}
          onPress={this.openModal}
        >
          <LinearGradient
            colors={['#e6ca6b', '#ffd734']}
            style={[styles.footer, styles.bottom0]}
            start={[0, 0]}
            end={[1, 0]}
          >
            <NormalButton
              textSize={17}
              text="CHOOSE"
              buttonWidth="100%"
              textColor="#252525"
              buttonColor="transparent"
              onPress={this.openModal}
            />
          </LinearGradient>
        </TouchableOpacity>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  data: state.excrusionReducer.excrusionById,
  isData: state.excrusionReducer.getExcursionByIdStatus,
  SummaryProgram: state.transactionReducer.SummaryProgram,
  dailyProgram: state.transactionReducer.DailyProgram,
  MovementList: state.generalReducer.allMovementTypes,
  driving: state.transactionReducer.driving,
  getDuration: state.transportationReducer.getDuration,
  // token: state.userAuthReducer.token,
});

export default connect(mapStateToProps, {
  getExcursionById,
  resetStatusExcursion,
  setSummaryProgramAction,
  setDailyProgramAction,
  setDrivingAction,
  getDurationAction,
})(excrutionDetail);
