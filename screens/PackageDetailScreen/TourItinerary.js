import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  BackHandler,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import { CardItineraryFixed, Card } from '../../components/card';
// import { SeperatorRepeat } from '../../components/list';
import styles from './styles';
import stylesGlobal from '../../components/styles';
import PropTypes from 'prop-types';
import { isDurationFromText } from '../../helper/checkingHelper';
import { Container } from '../../components/container';
import { viewTime, viewDay, viewDate } from '../../helper/timeHelper';
// import { AmountGuideBooking } from '../../helper/tourGuides';
import { connect } from 'react-redux';

import {
  getAccommodationByServiceItemIdAction,
  resetGetAccommodationAction,
} from '../../actions/accommodation/accommodationAction';
import {
  getExcrusionDetail,
  resetExcrusionDetail,
} from '../../actions/excrusion/excrusionAction';
import {
  getRestaurantProfileByServiceItem,
  resetStatusRestaurant,
} from '../../actions/restaurant/restaurantAction';

// import TourGuide from '../../assets/Icon/tourguide.png';
const w = Dimensions.get('window').width;

class TourItinerary extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    route: PropTypes.object,
    dispatch: PropTypes.func,
    dataHotel: PropTypes.object,
    isData: PropTypes.string,
  };

  constructor(props) {
    super(props);
    const Id = this.props.route.params.Id ? this.props.route.params.Id : null;
    this.state = {
      Mov: {
        dayIndex: Id,
      },
      data: this.props.route.params.data ? this.props.route.params.data : [],
      PackageType: this.props.route.params.PackageType,
      type: '',
      dataHotel: [],
    };
  }

  getItineraryDay = index => {
    // eslint-disable-next-line no-undef
    setTimeout(() => {
      this.scrollerTop.scrollTo({ x: w * index - 1 });
    }, 1);
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
    this.getItineraryDay(this.props.route.params.Id);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.isDataDetail === 'success') {
      this.setState({ loading: false });
      this.props.navigation.navigate('DetailAccommodation', {
        hotel: nextProps.dataDetail,
        type: this.state.type,
      });
      this.props.resetGetAccommodationAction();
      return false;
    }
    if (nextProps.isData === 'success') {
      this.setState({ loading: false });
      this.props.navigation.navigate('DetailInformation', {
        data: nextProps.dataExcrusion,
        type: this.state.type,
      });
      this.props.resetExcrusionDetail();
      return false;
    }
    if (nextProps.isDataRestaurant === 'success') {
      this.setState({ loading: false });
      this.props.navigation.navigate('DetailInformation', {
        data: nextProps.dataExcrusion,
        type: this.state.type,
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
        ? this.props.navigation.navigate('DetailAccommodation', {
            hotel: this.state.dataHotel,
            type: this.state.type,
          })
        : this.props.navigation.navigate('DetailInformation', {
            data: this.state.dataHotel,
            type: this.state.type,
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
    return (
      <Container>
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor="transparent"
        />
        <ScrollView
          ref={scrollerTop => {
            this.scrollerTop = scrollerTop;
          }}
          horizontal
          pagingEnabled={true}
        >
          {this.state.data.length != 0
            ? this.state.data.map((dp, j) => {
                // let countTourGuide = dp.TourGuides
                //   ? dp.TourGuides.length != 0
                //     ? AmountGuideBooking(dp)
                //     : null
                //   : null;
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
                          <View
                            style={[stylesGlobal.width20, stylesGlobal.center]}
                          >
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
                          style={[
                            stylesGlobal.width60,
                            stylesGlobal.leftCenter,
                          ]}
                        >
                          <View
                            style={[
                              stylesGlobal.rowNoPadding,
                              stylesGlobal.center,
                            ]}
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

                        {j != this.state.data.length - 1 ? (
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
                          <View
                            style={[stylesGlobal.width20, stylesGlobal.center]}
                          >
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
                      {/* {this.state.PackageType == 'Custom' ? (
                        <Card
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
                                  style={[
                                    stylesGlobal.text18,
                                    stylesGlobal.textBold,
                                  ]}
                                >
                                  This itinerary have not tour guide
                                </Text>
                              ) : (
                                <View
                                  style={[
                                    styles.stylesCol,
                                    stylesGlobal.width80,
                                  ]}
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
                                        This itinerary have{' '}
                                        {Amount.QtyAmountGuide} tour guide for{' '}
                                        {Amount.CityId.CityName}
                                      </Text>
                                    ) : (
                                      <Text
                                        key={k}
                                        style={[
                                          stylesGlobal.text12,
                                          stylesGlobal.textBold,
                                        ]}
                                      >
                                        and {Amount.QtyAmountGuide} tour guide
                                        for {Amount.CityId.CityName}{' '}
                                      </Text>
                                    );
                                  })}
                                </View>
                              )}
                            </View>
                          </View>
                          <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
                            <SeperatorRepeat
                              repeat={3}
                              widthsepar={8}
                              heightSepar={1}
                              colorSepar="#777"
                            />
                           </View>
                        </Card>
                      ) : null} */}
                      <Container>
                        <View
                          style={[
                            stylesGlobal.width100,
                            styles.overflowHidden,
                            styles.marginBottom20,
                          ]}
                        >
                          {dp.Movements.length != 0
                            ? dp.Movements.map((item, i) => {
                                let dataNextDesc = this.state.data[j].Movements[
                                  i + 1
                                ]
                                  ? this.state.data[j].Movements[i + 1].Item
                                    ? this.state.data[j].Movements[i + 1].Item
                                        .Name
                                      ? this.state.data[j].Movements[i + 1].Item
                                          .Name
                                      : ''
                                    : ''
                                  : '';
                                let dataPrev =
                                  i != 0
                                    ? this.state.data[j].Movements[i - 1].Item
                                      ? this.state.data[j].Movements[i - 1].Item
                                          .Name
                                        ? this.state.data[j].Movements[i - 1]
                                            .Item.Name
                                        : ''
                                      : ''
                                    : '';
                                return (
                                  <CardItineraryFixed
                                    LocationFirst={dataPrev}
                                    LocationSecond={dataNextDesc}
                                    DurationFreeTime={item.Duration}
                                    Title={
                                      item.MovementName == 'FREETIMELOCKED'
                                        ? 'Free Time'
                                        : item.MovementName == 'DRIVING' &&
                                          (item.Service == undefined ||
                                            item.Service == null)
                                        ? 'Self Transportation'
                                        : item.MovementDescription
                                    }
                                    Time={viewTime(item.DateTime)}
                                    ServiceDriving={
                                      item.Item ? item.Item.Desc : ''
                                    }
                                    Desc={item.Item ? item.Item.Desc : ''}
                                    Img={item.Item ? item.Item.ImageUrl : ''}
                                    AddMove={item.Item ? item.Item.Name : ''}
                                    Flight={item.Item ? item.Item.Note : ''}
                                    Duration={item.DurationText}
                                    DurationDriving={
                                      item.Duration == 0
                                        ? item.DurationText
                                          ? isDurationFromText(
                                              item.DurationText
                                            )
                                          : item.Duration
                                        : item.Duration
                                    }
                                    // flightWarning={
                                    //   item.Item.Name == 'Airport'
                                    //     ? 'Air fares are not included'
                                    //     : item.Item.Name == 'Port'
                                    //     ? 'Ship tickets are not included'
                                    //     : 'Transportation are not included'
                                    // }
                                    namaProfileAccomo={
                                      item.Item ? item.Item.Name : ''
                                    }
                                    flightWarning=""
                                    Service={
                                      item.Item ? item.Item.ServiceType : ''
                                    }
                                    Loc={item.DestinationName}
                                    type={item.MovementName}
                                    typeArrival={item.Item.Name}
                                    onPressAccommodation={() =>
                                      this.openDetailInfo(
                                        item.MovementName,
                                        item.Item,
                                        item.Item.ServiceItemId
                                      )
                                    }
                                    key={i}
                                  />
                                );
                              })
                            : null}
                        </View>
                      </Container>
                    </ScrollView>
                  </View>
                );
              })
            : null}
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isData: state.excrusionReducer.isExcrusionDetailStatus,
  dataExcrusion: state.excrusionReducer.excrusionDetail,
  isDataRestaurant:
    state.restaurantReducer.getRestaurantProfileByServiceItemStatus,
  dataRestaurant: state.restaurantReducer.restaurantProfileByServiceItem,
  isDataDetail: state.accommodationReducer.isAccommodationDetail,
  dataDetail: state.accommodationReducer.accommodationDetail,
});
export default connect(mapStateToProps, {
  getAccommodationByServiceItemIdAction,
  resetGetAccommodationAction,
  getExcrusionDetail,
  getRestaurantProfileByServiceItem,
  resetStatusRestaurant,
  resetExcrusionDetail,
})(TourItinerary);
