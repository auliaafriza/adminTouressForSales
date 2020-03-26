import React, { Component } from 'react';
import {
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Dimensions,
  Text,
  StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import { Container } from '../../../components/container';
import styles from './styles';
import stylesGlobal from '../../../components/styles';
import { CardItenary } from '../../../components/card';
import { ModalItinerary, ModalDuration } from '../../../components/modal';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  viewTime,
  changeTimeNew,
  SumSecond,
  viewDate,
  viewDay,
  convertToStringDate,
} from '../../../helper/timeHelper';
import { isDurationFromText } from '../../../helper/checkingHelper';

import {
  setSummaryProgramAction,
  setDailyProgramAction,
} from '../../../actions/Transactions/TransactionAction';

import {
  copyObject,
  activityData,
  addDailyDetails,
  afterAddActivityAndDriving,
  deleteActivity,
  fixafterDelete,
  getObjectDuration,
  setObjectDuration,
  deleteTransportation,
  afterEditActivity,
  changeTimeSummaryProgramAfterAddActivity,
  getDrivingAddress,
} from '../../../helper/dailyProgram';
// import { AmountGuide } from '../../helper/tourGuides';
import { Loading } from '../../../components/loading';

import {
  setDrivingAction,
  getDurationAction,
} from '../../../actions/transportation/transportationAction';

import {
  getAccommodationByServiceItemIdAction,
  resetGetAccommodationAction,
} from '../../../actions/accommodation/accommodationAction';
import {
  getExcrusionDetail,
  resetExcrusionDetail,
} from '../../../actions/excrusion/excrusionAction';
import {
  getRestaurantProfileByServiceItem,
  resetStatusRestaurant,
} from '../../../actions/restaurant/restaurantAction';

// import TourGuide from '../../assets/Icon/tourguide.png';
// import IconAdd from '../../assets/Icon/add.png';
// import IconEdit from '../../assets/Icon/edit.png';
const w = Dimensions.get('window').width;

// let scrollValue = 0;

class TourSchedule extends Component {
  constructor(props) {
    super(props);
    this.leftIsScrolling = false;
    this.rigthIsScrolling = false;
    this.state = {
      Mov: {
        dayIndex: 1,
        indexDP: this.props.route.params.indexDP,
        DateSchedule: this.props.route.params.DateSchedule,
        indexMov: 0,
        TypeMovement: null,
        Item: null,
        ActivityData: copyObject(activityData),
      },
      TotalDays: this.props.DailyProgram ? this.props.DailyProgram.length : 0,
      DateIndex: null,
      modalVisible: false,
      modalFreeTime: false,
      modalEdit: false,
      startDateTimePickerVisible: false,
      startDateTimePickerVisibleFree: false,
      loading: false,
      type: '',
      dataHotel: [],
    };
  }

  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    DailyProgram: PropTypes.array,
    SummaryProgram: PropTypes.array,
    Departures: PropTypes.array,
    Returns: PropTypes.array,
    MovementList: PropTypes.array,
    token: PropTypes.string,
    driving: PropTypes.array,
    Arrival: PropTypes.object,
    city: PropTypes.array,
    isDataDetail: PropTypes.string,
    dataDetail: PropTypes.object,
    route: PropTypes.object,
    isData: PropTypes.string,
    dataExcrusion: PropTypes.object,
    isDataRestaurant: PropTypes.string,
    dataRestaurant: PropTypes.object,
    getDuration: PropTypes.object,
  };

  getItineraryDay = index => {
    setTimeout(() => {
      this.scrollerTop.scrollTo({ x: w * index - 1 });
    }, 1);
  };
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.closeModal;
      this.props.navigation.pop();
      return true;
    });
    this.getItineraryDay(this.props.route.params.indexDP);
  }

  rmActivity = async (i, j) => {
    let newDP = await deleteActivity(j, i, this.props.DailyProgram);
    this.setState({ loading: true });
    newDP = await this.getDriving(newDP, j);
    newDP = await fixafterDelete(this.props.DailyProgram, newDP, j, i);
    await this.props.setDailyProgramAction(newDP);
    let SP = await changeTimeSummaryProgramAfterAddActivity(
      newDP,
      this.props.SummaryProgram
    );
    this.props.setSummaryProgramAction(SP);
    this.setState({ loading: false });
  };

  openModal = (i, indexDay) => {
    // let Movements = this.props.DailyProgram[this.state.Mov.indexDP].Movements[
    //   i
    // ];
    let Movements = this.props.DailyProgram[indexDay].Movements[i];
    this.setState({
      modalVisible: true,
      Mov: {
        ...this.state.Mov,
        indexMov: i,
        indexDP: indexDay,
        dayIndex: indexDay,
        ActivityData: {
          ...this.state.Mov.ActivityData,
          Startime: SumSecond(Movements.DateTime, Movements.Duration),
          Note: '',
        },
      },
    });
  };

  openModalEdit = (i, indexDay) => {
    // let Movements = this.props.DailyProgram[this.state.Mov.indexDP].Movements[
    //   i
    // ];

    let Movements = this.props.DailyProgram[indexDay].Movements[i];
    this.setState({
      modalEdit: true,
      Mov: {
        ...this.state.Mov,
        indexMov: i,
        ActivityData: {
          ...this.state.Mov.ActivityData,
          Name: Movements.Item.Name,
          Startime: Movements.DateTime,
          Duration: Movements.Duration,
          Note: Movements.Note,
          OperationEndTime: Movements.Item.OperationEndTime,
          OperationStartTime: Movements.Item.OperationStartTime,
          IsSolidStartTime: Movements.Item.IsSolidStartTime,
          MovementName: Movements.MovementName,
        },
      },
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
      modalFreeTime: false,
      modalEdit: false,
    });
  };

  addTransport = async (i, indexDay) => {
    let Movements = this.props.DailyProgram[indexDay].Movements[i];
    await this.setState({
      Mov: {
        ...this.state.Mov,
        indexMov: i,
        TypeMovement: {
          // from: fromTo.from,
          // to: fromTo.to,
          from: this.props.DailyProgram[indexDay].Movements[i - 1].Destination,
          to: this.props.DailyProgram[indexDay].Movements[i + 1].Destination,
        },
        ActivityData: {
          ...this.state.Mov.ActivityData,
          Startime: Movements.DateTime,
        },
      },
    });
    let item = await transactionItem(
      this.props.DetailCustom,
      this.props.SummaryProgram,
      this.props.DailyProgram,
      this.props.Departures,
      this.props.Returns
    );
    this.props.navigation.navigate('masterData', {
      screen: 'ListTransportasiUnit',
      params: {
        Mov: this.state.Mov,
        DP: this.props.DailyProgram,
        dayIndex: indexDay,
        moveIndex: i,
        Demo: item,
      },
    });
  };

  rmTransport = async (i, indexDay) => {
    this.setState({ loading: true });
    let DP = deleteTransportation(this.props.DailyProgram, indexDay, i);
    await this.props.setDailyProgramAction(DP);
    this.setState({ loading: false });
  };

  addActivity = async (par, indexDay) => {
    let typeMov = this.props.MovementList.filter(mov => mov.Name === par);
    let item = await transactionItem(
      this.props.DetailCustom,
      this.props.SummaryProgram,
      this.props.DailyProgram,
      this.props.Departures,
      this.props.Returns
    );
    this.setState(
      {
        modalVisible: false,
        Mov: {
          ...this.state.Mov,
          TypeMovement: typeMov[0],
        },
      },
      () => {
        if (typeMov[0].Name == 'RECREATION')
          this.props.navigation.navigate('masterData', {
            screen: 'ListExcrution',
            params: {
              Mov: this.state.Mov,
              Demo: item,
            },
          });
        else if (typeMov[0].Name == 'EAT')
          this.props.navigation.navigate('masterData', {
            screen: 'ListRestaurant',
            params: {
              Mov: this.state.Mov,
              Demo: item,
            },
          });
        else if (typeMov[0].Name == 'FREETIME') {
          this.setState({
            modalFreeTime: true,
            Mov: {
              ...this.state.Mov,
              Item: this.props.DailyProgram[indexDay].Movements[
                this.state.Mov.indexMov
              ].Item,
              TypeMovement: typeMov[0],
            },
          });
        }
      }
    );
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

  findCityName = Id => {
    let Data = this.props.city
      ? this.props.city.find(item => item.Id === Id)
      : null;
    return Data ? Data.Name : '';
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

  handleAddTourGuide = index => {
    this.props.navigation.navigate('AddTourGuide', {
      index: index,
      dataDestination: this.props.DailyProgram[index],
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
            await this.props
              .getDurationAction(data)
              .then(res => (item = res.value.data))
              .catch(err => (item = err.response.data.Message));
            if (item.Duration != undefined) {
              this.props.setDrivingAction(
                await setObjectDuration(this.props.driving, data, item)
              );
              DP[i].Movements[j].Duration = item.Duration.value;
              DP[i].Movements[j].DurationText = item.Duration.text;
              DP[i].Movements[j].Item.MapsString = item.Duration.MapsString;
            } else {
              DP[i].Movements[j].Duration = 0;
            }
          } else {
            if (item == undefined || item == null) {
              DP[i].Movements[j].Duration = 0;
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

  saveModal = async indexDay => {
    this.setState({
      modalVisible: false,
      modalFreeTime: false,
    });
    let DP = await addDailyDetails(
      this.props.DailyProgram,
      indexDay,
      this.state.Mov.indexMov,
      this.state.Mov.TypeMovement,
      this.props.MovementList,
      null,
      this.state.Mov.ActivityData
    );
    DP = await this.getDriving(DP, indexDay);
    DP = await afterAddActivityAndDriving(
      DP,
      indexDay,
      this.state.Mov.indexMov,
      this.props.MovementList
    );
    await this.props.setDailyProgramAction(DP);
    let SP = await changeTimeSummaryProgramAfterAddActivity(
      DP,
      this.props.SummaryProgram
    );
    this.props.setSummaryProgramAction(SP);
  };

  editModal = async indexDay => {
    this.setState({
      modalVisible: false,
      modalFreeTime: false,
      modalEdit: false,
    });
    let DP = await afterEditActivity(
      this.props.DailyProgram,
      indexDay,
      this.state.Mov.indexMov,
      this.state.Mov.ActivityData,
      this.props.MovementList
    );
    await this.props.setDailyProgramAction(DP);
    let SP = await changeTimeSummaryProgramAfterAddActivity(
      DP,
      this.props.SummaryProgram
    );
    this.props.setSummaryProgramAction(SP);
  };

  hideDateTimePicked = () => {
    this.setState({ startDateTimePickerVisible: false });
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.isDataDetail === 'success') {
      this.setState({ loading: false });
      this.props.navigation.navigate('PackageList', {
        screen: 'DetailAccommodation',
        params: {
          hotel: nextProps.dataDetail,
          type: this.state.type,
        },
      });
      this.props.resetGetAccommodationAction();
      return false;
    }
    if (nextProps.isData === 'success') {
      this.setState({ loading: false });
      this.props.navigation.navigate('PackageList', {
        screen: 'DetailInformation',
        params: {
          data: nextProps.dataExcrusion,
          type: this.state.type,
        },
      });
      this.props.resetExcrusionDetail();
      return false;
    }
    if (nextProps.isDataRestaurant === 'success') {
      this.setState({ loading: false });
      this.props.navigation.navigate('PackageList', {
        screen: 'DetailInformation',
        params: {
          data: nextProps.dataExcrusion,
          type: this.state.type,
        },
      });
      this.props.resetStatusRestaurant();
      return false;
    } else if (
      nextProps.isDataDetail === 'failed' ||
      nextProps.isDataRestaurant === 'failed' ||
      nextProps.isDataRestaurant === 'failed'
    ) {
      this.setState({ loading: false });
      this.state.type != 'EAT' && this.state.type != 'RECREATION'
        ? this.props.navigation.navigate('PackageList', {
            screen: 'DetailAccommodation',
            parmas: {
              hotel: this.state.dataHotel,
              type: this.state.type,
            },
          })
        : this.props.navigation.navigate('PackageList', {
            screen: 'DetailInformation',
            params: {
              data: this.state.dataHotel,
              type: this.state.type,
            },
          });
      this.props.resetGetAccommodationAction();
      this.props.resetExcrusionDetail();
      this.props.resetStatusRestaurant();
      return false;
    } else return true;
  }

  openDetailInfo = (type, data, ID) => {
    if (type == 'EAT') {
      this.props.getRestaurantProfileByServiceItem(ID);
    } else if (type == 'RECREATION') {
      this.props.getExcrusionDetail(ID);
    } else {
      this.props.getAccommodationByServiceItemIdAction(ID);
    }
    this.setState({ dataHotel: data, type: type });
  };

  handleLeftScroll = i => {
    this.scrollerTop.scrollTo({ x: w * i });
    this.setState({
      Mov: {
        ...this.state.Mov,
        dayIndex: i - 1,
      },
    });
  };

  handleNextScroll = i => {
    this.scrollerTop.scrollTo({ x: w * i });
    this.setState({
      Mov: {
        ...this.state.Mov,
        dayIndex: i + 1,
      },
    });
  };

  render() {
    let mov = this.props.DailyProgram;
    // let movIndex = this.props.DailyProgram[this.state.Mov.indexDP];
    return (
      <Container>
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor="transparent"
        />
        {/* <Animated.View
          style={[
            styles.header,
            {
              height: this.state.scrollY.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 50],
                extrapolate: 'clamp',
              }),
            },
          ]}
        >
          <View style={styles.row}>
            <View style={stylesGlobal.width10}>
              <TouchableOpacity
                onPress={() => this.props.navigation.pop()}
                style={styles.iosBackButton}
              >
                <Ionicons name={IOS_BACK_BUTTON} size={35} color="white" />
              </TouchableOpacity>
            </View>
            <View style={[stylesGlobal.width90, stylesGlobal.center]}>
              <Animated.Text
                style={[
                  stylesGlobal.text18,
                  stylesGlobal.textBold,
                  stylesGlobal.colorWhite,
                ]}
              >
                {viewDate(this.state.Mov.DateSchedule)}
              </Animated.Text>
            </View>
          </View>
        </Animated.View> */}

        {this.state.loading ? (
          <Loading sizeloading="large" colorloading={styles.$goldcolor} />
        ) : null}
        <Modal
          animationType="slide"
          transparent={true}
          visible={
            this.state.modalVisible ||
            this.state.modalFreeTime ||
            this.state.modalEdit
          }
          onRequestClose={() => {
            this.setModalVisible(
              this.state.modalVisible ||
                this.state.modalFreeTime ||
                this.state.modalEdit
            );
          }}
        >
          <View style={styles.modalContainer}>
            {this.state.modalVisible ? (
              <ModalItinerary
                Excrution={() =>
                  this.addActivity('RECREATION', this.state.Mov.dayIndex)
                }
                Meal={() => this.addActivity('EAT', this.state.Mov.dayIndex)}
                Free={() =>
                  this.addActivity('FREETIME', this.state.Mov.dayIndex)
                }
                onPress={this.closeModal}
              />
            ) : this.state.modalEdit ? (
              <ModalDuration
                type="edit"
                onPressClose={this.closeModal}
                onPressTime={() => {
                  this.setState({ startDateTimePickerVisible: true });
                }}
                isEdit={
                  this.state.Mov.ActivityData.MovementName == 'FREETIME'
                    ? false
                    : true
                }
                activityName={this.state.Mov.ActivityData.Name}
                isEat={
                  this.state.Mov.ActivityData.MovementName == 'RECREATION'
                    ? false
                    : true
                }
                DateTime={viewTime(this.state.Mov.ActivityData.Startime)}
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
                IsSolidStartTime={this.state.Mov.ActivityData.IsSolidStartTime}
                IsSolidDuration={this.state.Mov.ActivityData.IsSolidDuration}
                onPressSave={() => this.editModal(this.state.Mov.dayIndex)}
                HiddenNote={
                  this.state.Mov.ActivityData.MovementName == 'RECREATION'
                    ? true
                    : false
                }
              />
            ) : this.state.modalFreeTime ? (
              <ModalDuration
                onPressClose={this.closeModal}
                onPressTime={() => {
                  this.setState({ startDateTimePickerVisible: true });
                }}
                DateTime={viewTime(this.state.Mov.ActivityData.Startime)}
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
                IsSolidStartTime={this.state.Mov.ActivityData.IsSolidStartTime}
                IsSolidDuration={this.state.Mov.ActivityData.IsSolidDuration}
                onPressSave={() => this.saveModal(this.state.Mov.dayIndex)}
              />
            ) : null}
          </View>
        </Modal>
        <ScrollView
          ref={scrollerTop => {
            this.scrollerTop = scrollerTop;
          }}
          horizontal
          pagingEnabled={true}
        >
          {mov.map((dp, j) => {
            //let countTourGuide = dp.TourGuides ? AmountGuide(dp) : null;
            return (
              <View key={j}>
                <View style={styles.stylesPageSchedule}>
                  <View
                    style={[
                      stylesGlobal.width100,
                      stylesGlobal.rowNoPadding,
                      stylesGlobal.paddingHorizontal10,
                    ]}
                  >
                    {j != 0 ? (
                      <TouchableOpacity
                        style={[stylesGlobal.width20, stylesGlobal.center]}
                        onPress={() =>
                          this.handleLeftScroll(this.state.Mov.dayIndex)
                        }
                      >
                        <Text
                          style={[
                            stylesGlobal.text12,
                            stylesGlobal.textBold,
                            stylesGlobal.backgroundColorWhite,
                          ]}
                        >
                          Prev
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <View style={[stylesGlobal.width20, stylesGlobal.center]}>
                        <Text
                          style={[
                            stylesGlobal.text12,
                            styles.textWhite,
                            stylesGlobal.backgroundColorWhite,
                          ]}
                        >
                          Prev
                        </Text>
                      </View>
                    )}
                    <View
                      style={[stylesGlobal.width60, stylesGlobal.leftCenter]}
                    >
                      <View
                        style={[stylesGlobal.rowNoPadding, stylesGlobal.center]}
                      >
                        <View
                          style={[
                            stylesGlobal.width50,
                            stylesGlobal.rowEnd,
                            stylesGlobal.paddingRight5,
                          ]}
                        >
                          <Text style={styles.stylesHeaderDate}>
                            DAY {dp.Day}
                          </Text>
                        </View>
                        <View style={stylesGlobal.width50}>
                          <Text style={styles.textDate}>
                            {viewDay(dp.Date)}{' '}
                          </Text>
                          <Text style={styles.textDate}>
                            {viewDate(dp.Date)}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {j != mov.length - 1 ? (
                      <TouchableOpacity
                        style={[stylesGlobal.width20, stylesGlobal.center]}
                        onPress={() =>
                          this.handleNextScroll(this.state.Mov.dayIndex)
                        }
                      >
                        <Text
                          style={[
                            stylesGlobal.text12,
                            stylesGlobal.textBold,
                            stylesGlobal.backgroundColorWhite,
                          ]}
                        >
                          Next
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <View style={[stylesGlobal.width20, stylesGlobal.center]}>
                        <Text
                          style={[
                            stylesGlobal.text12,
                            styles.textWhite,
                            stylesGlobal.backgroundColorWhite,
                          ]}
                        >
                          Next
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                <ScrollView
                  key={j}
                  style={[
                    stylesGlobal.containerScroll,
                    styles.stylesScrollViewSchedule,
                  ]}
                >
                  {/* <Card
                    color="white"
                    type="Flat"
                    widthCard="95%"
                    alignself="center"
                  >
                    <View
                      style={[
                        stylesGlobal.row100,
                        stylesGlobal.alignItemsCenter,
                        stylesGlobal.paddingTop20,
                        stylesGlobal.paddingHorizontal20,
                      ]}
                    >
                      <View style={stylesGlobal.width20}>
                        <View
                          style={[
                            styles.containerIcon50,
                            stylesGlobal.padding5,
                          ]}
                        >
                          <Image
                            source={TourGuide}
                            style={[
                              stylesGlobal.imageIcon,
                              styles.tintColorItinerart,
                            ]}
                            resizeMode="contain"
                          />
                        </View>
                      </View>
                      <View style={stylesGlobal.width60}>
                        {countTourGuide == null ||
                        countTourGuide.length == 0 ? (
                          <Text
                            style={[stylesGlobal.text18, stylesGlobal.textBold]}
                          >
                            Add your tour guide
                          </Text>
                        ) : (
                          <View
                            style={[styles.stylesCol, stylesGlobal.width80]}
                          >
                            {countTourGuide.map((Amount, k) => {
                              return k == 0 ? (
                                <Text
                                  key={k}
                                  style={[
                                    stylesGlobal.text12,
                                    stylesGlobal.textBold,
                                  ]}
                                >
                                  This itinerary have {Amount.QtyAmountGuide}{' '}
                                  tour guide for{' '}
                                  {this.findCityName(Amount.CityId)}
                                </Text>
                              ) : (
                                <Text
                                  key={k}
                                  style={[
                                    stylesGlobal.text12,
                                    stylesGlobal.textBold,
                                  ]}
                                >
                                  and {Amount.QtyAmountGuide} tour guide for{' '}
                                  {this.findCityName(Amount.CityId)}{' '}
                                </Text>
                              );
                            })}
                          </View>
                        )}
                      </View>
                      <View
                        style={[
                          stylesGlobal.width20,
                          stylesGlobal.alignItemsEnd,
                        ]}
                      >
                        <TouchableOpacity
                          onPress={() => this.handleAddTourGuide(j)}
                          style={styles.circleButton}
                        >
                          <Image
                            style={[
                              stylesGlobal.imageIcon,
                              styles.tintColorBlack,
                            ]}
                            resizeMode="contain"
                            source={
                              countTourGuide == null ||
                              countTourGuide.length == 0
                                ? IconAdd
                                : IconEdit
                            }
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
                  </Card> */}
                  <Container>
                    <View
                      style={[
                        stylesGlobal.width100,
                        styles.overflowHidden,
                        styles.marginBottom20,
                      ]}
                    >
                      {dp.Movements.map((data, i) => {
                        let dataNext = this.props.DailyProgram[j].Movements[
                          i + 1
                        ]
                          ? this.props.DailyProgram[j].Movements[i + 1]
                              .MovementName
                          : '';
                        let dataNextDesc = this.props.DailyProgram[j].Movements[
                          i + 1
                        ]
                          ? this.props.DailyProgram[j].Movements[i + 1].Item
                              .Name
                          : '';
                        let dataPrev = this.props.DailyProgram[j].Movements[
                          i - 1
                        ]
                          ? this.props.DailyProgram[j].Movements[i - 1].Item
                              .Name
                          : '';
                        let dateTimeNext = this.props.DailyProgram[j].Movements[
                          i + 1
                        ]
                          ? this.props.DailyProgram[j].Movements[i + 1].DateTime
                          : '';
                        let Hour = parseInt(data.Duration / 3600);
                        let ModHour = data.Duration % 3600;
                        let Minutes = ModHour / 60;
                        return (
                          <CardItenary
                            Title={
                              data.MovementName == 'DRIVING' &&
                              (data.Item.Desc == undefined ||
                                data.Item.Desc == null)
                                ? 'Self Transportation'
                                : data.MovementDescription
                            }
                            Time={moment.utc(data.DateTime).format('HH : mm')}
                            type={data.MovementName}
                            showButton={
                              data.MovementName == 'EAT' ||
                              data.MovementName == 'RECREATION' ||
                              data.MovementName == 'FREETIME'
                                ? dateTimeNext
                                  ? convertToStringDate(data.DateTime) !=
                                    convertToStringDate(dp.Date)
                                    ? false
                                    : true
                                  : true
                                : true
                            }
                            Desc={data.Item.Name}
                            namaProfileAccomo={data.Item.ProfileDesc}
                            AddMove={data.Item.Name}
                            Img={data.Item.ImageUrl}
                            Button={
                              data.MovementName == 'EAT' ||
                              (data.MovementName == 'VIRTUALCHECKIN' &&
                                dataNext == 'VIRTUALCHECKOUT') ||
                              (data.MovementName == 'CHECKIN' &&
                                dataNext == 'CHECKOUT') ||
                              (data.MovementName == 'CHECKIN' &&
                                dataNext == 'DAYEND') ||
                              (data.MovementName == 'FREETIMELOCKED' &&
                                dataNext == 'DRIVING') ||
                              (data.MovementName == 'FREETIME' &&
                                dataNext == 'DRIVING') ||
                              (data.MovementName == 'RECREATION' &&
                                dataNext == 'DRIVING') ||
                              (data.MovementName == 'DAYSTART' &&
                                dataNext == 'CHECKOUT') ||
                              (data.MovementName == 'DAYSTART' &&
                                dataNext == 'DAYEND')
                                ? dateTimeNext
                                  ? convertToStringDate(data.DateTime) !=
                                    convertToStringDate(dp.Date)
                                    ? false
                                    : true
                                  : true
                                : false
                            }
                            onPress={() =>
                              this.openModal(i, parseInt(dp.Day - 1))
                            }
                            Note={data.Note}
                            FlightCode={
                              data.Item.FlightCode ? data.Item.FlightCode : ''
                            }
                            DurationDriving={
                              data.Duration == 0
                                ? data.DurationText
                                  ? isDurationFromText(data.DurationText)
                                  : data.Duration
                                : data.Duration
                            }
                            DurationFreeTime={data.Duration}
                            Duration={
                              data.DurationText == '' ||
                              data.DurationText == undefined
                                ? Hour != 0
                                  ? Minutes != 0
                                    ? Hour + ' hours' + ' ' + Minutes + ' mins'
                                    : Hour + ' hours'
                                  : Minutes + ' mins'
                                : data.DurationText
                            }
                            Service={data.Item.ServiceType}
                            ServiceDriving={data.Item.Desc}
                            Loc={data.DestinationName}
                            addTransport={() => this.addTransport(i, j)}
                            editTransport={() => this.addTransport(i, j)}
                            onPressDeleteCar={() => this.rmTransport(i, j)}
                            onPressEdit={() => this.openModalEdit(i, j)}
                            onPressDelete={() => this.rmActivity(i, j)}
                            onPressDetail={() =>
                              this.openDetailInfo(
                                data.MovementName,
                                data.Item,
                                data.Item.ServiceItemId
                              )
                            }
                            onPressAccommodation={() =>
                              this.openDetailInfo(
                                data.MovementName,
                                data.Item,
                                data.Item.ServiceItemId
                              )
                            }
                            flightWarning={
                              data.Item.Desc == 'Airport'
                                ? 'Air fares are not included'
                                : data.Item.Desc == 'Port'
                                ? 'Ship tickets are not included'
                                : 'Transportation are not included'
                            }
                            overlap={
                              dateTimeNext
                                ? convertToStringDate(data.DateTime) !=
                                  convertToStringDate(dp.Date)
                                  ? true
                                  : false
                                : false
                            }
                            typeArrival={data.Item.Desc}
                            LocationFirst={dataPrev}
                            LocationSecond={dataNextDesc}
                            warningExcrusion={
                              data.MovementName == 'RECREATION'
                                ? data.Item.OperationStartTime.slice(11) >
                                  data.DateTime.slice(11)
                                  ? true
                                  : data.Item.OperationEndTime.slice(11) <
                                    data.DateTime.slice(11)
                                  ? true
                                  : false
                                : false
                            }
                            key={i}
                          />
                        );
                      })}
                    </View>
                  </Container>
                </ScrollView>
              </View>
            );
          })}
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  //   token: state.userAuthReducer.token,
  isData: state.excrusionReducer.isExcrusionDetailStatus,
  dataExcrusion: state.excrusionReducer.excrusionDetail,
  isDataRestaurant:
    state.restaurantReducer.getRestaurantProfileByServiceItemStatus,
  dataRestaurant: state.restaurantReducer.restaurantProfileByServiceItem,
  isDataDetail: state.accommodationReducer.isAccommodationDetail,
  dataDetail: state.accommodationReducer.accommodationDetail,

  driving: state.transportationReducer.driving,
  city: state.generalReducer.cityInCountry,

  Returns: state.transactionReducer.Returns,
  Departures: state.transactionReducer.Departures,
  SummaryProgram: state.transactionReducer.SummaryProgram,
  ReturnsStatus: state.transactionReducer.ReturnsStatus,
  DeparturesStatus: state.transactionReducer.DeparturesStatus,
  SummaryProgramStatus: state.transactionReducer.SummaryProgramStatus,
  MovementList: state.generalReducer.allMovementTypes,
  isMovementMode: state.generalReducer.isMovementMode,
  DailyProgram: state.transactionReducer.DailyProgram,
  getDuration: state.transportationReducer.getDuration,
});

export default connect(mapStateToProps, {
  setDrivingAction,
  getDurationAction,
  setSummaryProgramAction,
  setDailyProgramAction,
  getAccommodationByServiceItemIdAction,
  resetGetAccommodationAction,
  getExcrusionDetail,
  getRestaurantProfileByServiceItem,
  resetStatusRestaurant,
  resetExcrusionDetail,
})(TourSchedule);
