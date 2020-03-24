import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  BackHandler,
  Animated,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { CardWithInputDuration, Card } from '../../../components/card/index';
import { Container } from '../../../components/container/index';
import { NormalButton } from '../../../components/button/index';
import { SeperatorRepeat, SeperatorNew } from '../../../components/list';
import { TextWarning } from '../../../components/text';
import styles from '../styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import stylesGlobal from '../../../components/styles';
import IconLocation from '../../../assets/Icon/address.png';
import { setTourGuideInDailyProgramReady } from '../../../helper/tourGuides';
import {
  setCustomItineraryAction,
  resetCustomItineraryAction,
  setSummaryProgramAction,
  setGuestQuotationAction,
  setDeparturesItineraryAction,
  setReturnsItineraryAction,
  setGuestTourGuideAction,
  setDailyProgramAction,
  setAdditionalServicesAction,
} from '../../../actions/Transactions/TransactionAction';
import {
  copyObject,
  //   initialAccomodationAndDate,
} from '../../../helper/dailyProgram';
import { initialSetReadyPackage } from '../../../helper/itineraryBuilder';
import { setAdditionalService } from '../../../helper/additionalService';
import NoImage from '../../../assets/images/NoImage.png';
import { stringAllocation } from '../../../helper/helper';
import {
  RoundedTextInput,
  RoundedTextInputWithButton,
} from '../../../components/textInput';
import RadioGroup from 'react-native-custom-radio-group';

class ReadyPackageOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      DetailCustom: {
        IdTour: null,
        TourName: null,
        GroupCapacity: null,
        TourCategory: null,
        TourType: null,
        Image: null,
        FirstArrival: { Name: null },
        GuestAllocation: {
          Adult: 0,
          Child: 0,
          Infant: 0,
        },
        RoomAllocation: {
          SharingRoomQty: 0,
          ChildSharingRoomQty: 0,
          SingleRoomQty: 0,
          ChildSingleRoomQty: 0,
          ExtraBedQty: 0,
          ChildExtraBedQty: 0,
          SharingBedQty: 0,
          BabyCrib: 0,
          NoBed: 0,
          StringAlloc: '',
          Qty: 0,
          Description: 'Free of Charge (FOC)',
        },
        Company: null,
        Status: null,
      },
      errorTourName: '',
      errorGroupCapacity: '',
      errorGuestAllocation: '',
      errorRoomAllocation: '',
    };
    this.props.resetCustomItineraryAction();
  }

  validate = () => {
    const {
      TourName,
      GroupCapacity,
      GuestAllocation,
      RoomAllocation,
    } = this.state.DetailCustom;
    let isError = false;
    const errors = {
      errorTourName: '',
      errorGroupCapacity: '',
      errorGuestAllocation: '',
      errorRoomAllocation: '',
    };

    const totalGuest =
      GuestAllocation.Adult + GuestAllocation.Child + GuestAllocation.Infant;
    const totalRoom =
      RoomAllocation.SharingRoomQty +
      RoomAllocation.ChildSharingRoomQty +
      RoomAllocation.SingleRoomQty +
      RoomAllocation.ChildSingleRoomQty +
      RoomAllocation.ExtraBedQty +
      RoomAllocation.ChildExtraBedQty +
      RoomAllocation.SharingBedQty +
      RoomAllocation.BabyCrib +
      RoomAllocation.NoBed;

    if (TourName == null || TourName.length < 1) {
      isError = true;
      errors.errorTourName = 'Please input tour name';
    }
    if (GroupCapacity == null || GroupCapacity.length < 1) {
      isError = true;
      errors.errorGroupCapacity = 'Please select group capacity';
    } else if (GroupCapacity == 'LARGE' && totalGuest <= 10) {
      isError = true;
      errors.errorGuestAllocation =
        'Total person (adult and child) more than 10 persons';
    } else if (GroupCapacity == 'SMALL' && totalGuest > 10) {
      isError = true;
      errors.errorGuestAllocation =
        'This type guest only max 10 person, please change type if you want';
    }

    if (totalGuest == 0) {
      isError = true;
      errors.errorGuestAllocation = 'Please input at least 1 adult';
    } else if (GuestAllocation.Adult == 0) {
      isError = true;
      errors.errorGuestAllocation = 'Please input at least 1 adult';
    }
    if (totalRoom == 0) {
      isError = true;
      errors.errorRoomAllocation =
        'Pax arrangement are empty, fill at least one adult guest';
    } else if (totalRoom != totalGuest) {
      isError = true;
      errors.errorRoomAllocation = 'Room allocation not same with total guest';
    }

    this.setState({
      ...this.state,
      ...errors,
    });
    return isError;
  };

  componentDidMount() {
    let data = copyObject(this.props.route.params.data);
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop(); // works best when the goBack is async
      return true;
    });
    if (this.props.route.params.type == 'edit') {
      this.setState(
        {
          DetailCustom: {
            ...this.state.DetailCustom,
            IdTour: data.BookingDetailSum.Id,
            GroupCapacity: data.BookingDetailSum.GroupType.toUpperCase(),
            TourName: data.BookingDetailSum.Title,
            TourCategory: data.BookingDetailSum.TourCategory.Id,
            TourType: data.BookingDetailSum.TourPaxType.Id,
            FirstArrival: this.props.cityList.find(
              item => item.Id == data.BookingDetailSum.City.Id
            ),
            Image: data.BookingDetailSum.City.ImageUrl,
            Status: this.props.route.params.type,
            GuestAllocation: {
              ...this.state.DetailCustom.GuestAllocation,
              Adult: data.BookingDetailSum.AdultQty,
              Child: data.BookingDetailSum.ChildQty,
              Infant: data.BookingDetailSum.InfantQty,
            },
            RoomAllocation: {
              ...this.state.DetailCustom.RoomAllocation,
              SharingRoomQty: data.TourPriceSum.SharingRoomSum.Pax,
              ChildSharingRoomQty: data.TourPriceSum.ChildSharingRoomSum.Pax,
              SingleRoomQty: data.TourPriceSum.SingleRoomSum.Pax,
              ChildSingleRoomQty: data.TourPriceSum.ChildSingleRoomSum.Pax,
              ExtraBedQty: data.TourPriceSum.ExtraBedSum.Pax,
              ChildExtraBedQty: data.TourPriceSum.ChildExtraBedSum.Pax,
              SharingBedQty: data.TourPriceSum.SharingBedSum.Pax,
              NoBed: data.TourPriceSum.NoBedSum.Pax,
              StringAlloc: '',
              Qty: data.BookingDetailSum.FoC
                ? data.BookingDetailSum.FoC.Qty
                : 0,
              Description: data.BookingDetailSum.FoC
                ? data.BookingDetailSum.FoC.Description
                : 'Free of Charge (FOC)',
            },
            Company: {
              Code: data.BookingDetailSum.CreatedBy.CompanyCode,
              Name: data.BookingDetailSum.CreatedBy.CompanyName,
            },
            BookingTemplateDescriptions: data.Descriptions
              ? data.Descriptions
              : [],
            IsReadyPackage:
              data.BookingDetailSum.PackageType == 'Custom' ? false : true,
            ReadyPackageId: data.BookingDetailSum.Id,
          },
        },
        () => {
          this.setState({
            DetailCustom: {
              ...this.state.DetailCustom,
              RoomAllocation: {
                ...this.state.DetailCustom.RoomAllocation,
                StringAlloc: stringAllocation(
                  this.state.DetailCustom.RoomAllocation
                ),
              },
            },
          });
        }
      );
    } else if (this.props.route.params.type == 'FixedDateVariable') {
      this.setState({
        DetailCustom: {
          ...this.state.DetailCustom,
          IdTour: data.BookingDetailSum.Id,
          TourName: data.BookingDetailSum.Title,
          TourCategory: data.BookingDetailSum.TourCategory.Id,
          TourType: data.BookingDetailSum.TourPaxType.Id,
          FirstArrival: this.props.cityList.find(
            item => item.Id == data.BookingDetailSum.City.Id
          ),
          Image: data.BookingDetailSum.City.ImageUrl,
          Status: this.props.route.params.type,
        },
      });
    } else if (this.props.route.params.type == 'create') {
      this.setState({
        DetailCustom: {
          ...this.state.DetailCustom,
          TourName: data.BookingDetailSum.Title,
          TourCategory: data.BookingDetailSum.TourCategory.Id,
          TourType: data.BookingDetailSum.TourPaxType.Id,
          FirstArrival: this.props.cityList.find(
            item => item.Id == data.BookingDetailSum.City.Id
          ),
          Image: data.BookingDetailSum.City.ImageUrl,
          Status: this.props.route.params.type,
          BookingTemplateDescriptions: data.Descriptions
            ? data.Descriptions
            : [],
          IsReadyPackage:
            data.BookingDetailSum.PackageType == 'Custom' ? false : true,
          ReadyPackageId: data.BookingDetailSum.Id,
        },
      });
    } else {
      this.setState({
        DetailCustom: {
          ...this.state.DetailCustom,
          TourName: data.BookingDetailSum.Title,
          TourCategory: data.BookingDetailSum.TourCategory.Id,
          TourType: data.BookingDetailSum.TourPaxType.Id,
          FirstArrival: this.props.cityList.find(
            item => item.Id == data.BookingDetailSum.City.Id
          ),
          Image: data.BookingDetailSum.City.ImageUrl,
          Status: this.props.route.params.type,
          BookingTemplateDescriptions: data.Descriptions
            ? data.Descriptions
            : [],
          IsReadyPackage: true,
          ReadyPackageId: data.BookingDetailSum.Id,
        },
      });
    }
  }

  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    cityList: PropTypes.array,
    route: PropTypes.object,
  };

  addRoomAllocation = data => {
    this.setState({
      DetailCustom: {
        ...this.state.DetailCustom,
        RoomAllocation: data,
      },
    });
  };

  handleAccomodation = () => {
    let dataNullGuest = [];
    let AdditionalService = [];
    const error = this.validate();
    let TourDetails = copyObject(this.props.route.params.data);
    if (!error) {
      //initial
      let type =
        this.props.route.params.type == 'edit'
          ? 'Quotation'
          : this.props.route.params.type == 'FixedDateVariable'
          ? 'FixedDateVariable'
          : this.props.route.params.type == 'create'
          ? 'Similar'
          : 'Ready';
      let isVariableDate =
        this.props.route.params.type == 'FixedDateVariable' ? true : false;
      const data = initialSetReadyPackage(
        TourDetails.HeadlineProgram,
        type,
        this.props.cityList,
        this.state.DetailCustom.RoomAllocation,
        isVariableDate
      );

      this.props.route.params.type == 'FixedDateVariable'
        ? this.props.navigation.navigate('ReadyPackagesFixPrice', {
            data: TourDetails,
          })
        : this.props.navigation.navigate('CustomPackageOption', {
            screen: 'AccommodationSummary',
          });
      this.props.setCustomItineraryAction(this.state.DetailCustom);
      this.props.setSummaryProgramAction(data.MainPrograms);
      this.props.setDeparturesItineraryAction(data.Departures);
      this.props.setReturnsItineraryAction(data.Returns);
      let DPTourGuideHandle = setTourGuideInDailyProgramReady(
        TourDetails.DailyPrograms
      );
      this.props.setGuestTourGuideAction(
        this.state.DetailCustom.GuestAllocation.Adult +
          this.state.DetailCustom.GuestAllocation.Child
      );
      this.props.setDailyProgramAction(DPTourGuideHandle);
      this.props.route.params.type == 'edit'
        ? this.props.setGuestQuotationAction(TourDetails.TourGuestSum)
        : this.props.setGuestQuotationAction(dataNullGuest);
    }
    TourDetails.AdditionalServices
      ? TourDetails.AdditionalServices.length != 0
        ? (AdditionalService = setAdditionalService(
            TourDetails.AdditionalServices
          ))
        : AdditionalService
      : AdditionalService;
    this.props.setAdditionalServicesAction(AdditionalService);
  };

  handleRoomAllocation = () => {
    const { GuestAllocation } = this.state.DetailCustom;
    const totalGuest =
      GuestAllocation.Adult + GuestAllocation.Child + GuestAllocation.Infant;
    if (totalGuest != 0) {
      this.props.navigation.navigate('CustomPackageOption', {
        screen: 'RoomAllocation',
        params: {
          onSelect: this.addRoomAllocation,
          Guest: this.state.DetailCustom.GuestAllocation,
          RoomAlloc: this.state.DetailCustom.RoomAllocation,
          Travel: this.state.DetailCustom.GroupCapacity,
        },
      });
    } else {
      Alert.alert(
        'Please Fill Guest Allocation',
        'Guest Allocation minimum 1 pax for adult',
        [{ text: 'OK' }]
      );
    }
  };

  //   handleCountry = () => {
  //     this.props.navigation.navigate('General', {
  //       screen: 'ListCity',
  //       params: {
  //         onSelect: this.onSelectCountry,
  //       },
  //     });
  //   };

  render() {
    let data = copyObject(this.props.route.params.data);
    let groupCapacity = [
      {
        label: 'Small ( under 10 pax )',
        value: 'SMALL',
      },
      {
        label: 'Large ( more 10 pax )',
        value: 'LARGE',
      },
    ];

    const HEADER_MAX_HEIGHT = 250;
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
              <Text style={styles.textHeader}>Ready Package Option</Text>
            </View>
          </LinearGradient>
        </Animated.View>
        <ScrollView
          style={styles.containerScroll}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } },
          ])}
        >
          <Container color={styles.$whitelightcolor}>
            {this.state.DetailCustom.Image == '' ||
            this.state.DetailCustom.Image == null ? (
              <Image
                source={NoImage}
                resizeMode="center"
                style={styles.carouselImage}
              />
            ) : (
              <Image
                source={{ uri: this.state.DetailCustom.Image }}
                resizeMode="cover"
                style={styles.carouselImage}
              />
            )}
            <Card type="Flat" widthCard="100%" topMargin={-50}>
              <View
                style={[
                  stylesGlobal.paddingTop20,
                  stylesGlobal.paddingHorizontal20,
                ]}
              >
                <Text style={styles.bold20}>
                  {this.state.DetailCustom.TourName}
                </Text>
                <View style={styles.rowPadding}>
                  <View
                    style={[
                      stylesGlobal.containerIcon30,
                      styles.paddingIconMap,
                    ]}
                  >
                    <Image
                      source={IconLocation}
                      style={[stylesGlobal.imageIcon, styles.tintColorDarkGrey]}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={[styles.size14, styles.marginLeft5]}>
                    {data.BookingDetailSum.City.Name},
                    {data.BookingDetailSum.Country.Name}
                  </Text>
                </View>
              </View>
              <View style={[stylesGlobal.width100, stylesGlobal.hidden]}>
                <SeperatorRepeat
                  repeat={35}
                  widthsepar={8}
                  heightSepar={1}
                  colorSepar="#777"
                />
              </View>
              <Text style={styles.stylesTextCustomOption}>
                General Information
              </Text>
              <View style={stylesGlobal.center}>
                <View style={styles.colNoPaddingLeft}>
                  <RoundedTextInput
                    marginBottom={20}
                    label="Tour Name"
                    textColor="black"
                    containerWidth="100%"
                    value={this.state.DetailCustom.TourName}
                    onChangeText={text =>
                      this.setState({
                        DetailCustom: {
                          ...this.state.DetailCustom,
                          TourName: text,
                        },
                      })
                    }
                    error={this.state.errorTourName}
                    containerHeight={45}
                    animated="hidden"
                    placeholder="Enter Tour Name"
                  />
                </View>
                <View style={[styles.colNoPaddingLeft, styles.marginBottom20]}>
                  <View style={stylesGlobal.rowStart}>
                    <Text
                      style={[
                        stylesGlobal.colorBlackLight,
                        stylesGlobal.rowStart,
                        styles.marginBottom10,
                      ]}
                    >
                      Group Capacity
                    </Text>
                    <TextWarning
                      show={true}
                      textwarning={this.state.errorGroupCapacity}
                    />
                  </View>
                  <RadioGroup
                    onChange={itemValue => {
                      this.setState({
                        DetailCustom: {
                          ...this.state.DetailCustom,
                          GroupCapacity: itemValue,
                        },
                      });
                    }}
                    initialValue={
                      this.state.DetailCustom.GroupCapacity
                        ? this.state.DetailCustom.GroupCapacity == 'LARGE'
                          ? 'LARGE'
                          : 'SMALL'
                        : ''
                    }
                    radioGroupList={groupCapacity}
                    containerStyle={styles.stylesContainerRadioGrup}
                    buttonContainerStyle={styles.stylesButtonRadioGrup}
                    buttonTextStyle={[
                      styles.colorTextRadioButton,
                      stylesGlobal.text14,
                    ]}
                    buttonContainerActiveStyle={{
                      backgroundColor: styles.$goldcolor,
                    }}
                    buttonTextActiveStyle={[
                      stylesGlobal.text14,
                      stylesGlobal.colorBlackLight,
                    ]}
                  />
                </View>

                <View
                  style={[
                    stylesGlobal.rowNoPadding,
                    stylesGlobal.width100,
                    styles.paddingVertical10,
                    styles.marginBottom20,
                    stylesGlobal.justifyContentCenter,
                  ]}
                >
                  <SeperatorNew
                    colorSepar={styles.$lightGreycolor}
                    widthsepar="40%"
                  />
                </View>
              </View>
              <Text style={styles.stylesTextCustomOption}>
                Pax Ammount and Room Allocation
              </Text>
              <View style={stylesGlobal.center}>
                <View style={styles.paddingLeftAndRight}>
                  <CardWithInputDuration
                    Title="Adult (>12 years)"
                    subtext={
                      this.state.DetailCustom.RoomAllocation.Qty == 0
                        ? null
                        : 'Include FOC ' +
                          this.state.DetailCustom.RoomAllocation.Qty +
                          'Person'
                    }
                    sizeIcon={18}
                    textSize={15}
                    value={this.state.DetailCustom.GuestAllocation.Adult}
                    onChangeText={text => {
                      if (isNaN(parseInt(text))) text = 0;
                      this.setState({
                        DetailCustom: {
                          ...this.state.DetailCustom,
                          GuestAllocation: {
                            ...this.state.DetailCustom.GuestAllocation,
                            Adult: parseInt(text),
                          },
                        },
                      });
                    }}
                    Decrement={() => {
                      if (this.state.DetailCustom.GuestAllocation.Adult != 0)
                        this.setState({
                          DetailCustom: {
                            ...this.state.DetailCustom,
                            GuestAllocation: {
                              ...this.state.DetailCustom.GuestAllocation,
                              Adult:
                                this.state.DetailCustom.GuestAllocation.Adult -
                                1,
                            },
                          },
                        });
                    }}
                    Increment={() =>
                      this.setState({
                        DetailCustom: {
                          ...this.state.DetailCustom,
                          GuestAllocation: {
                            ...this.state.DetailCustom.GuestAllocation,
                            Adult:
                              this.state.DetailCustom.GuestAllocation.Adult + 1,
                          },
                        },
                      })
                    }
                    widthCard="99%"
                    heightCard="30%"
                    error={this.state.errorGuestAllocation}
                  />
                  <CardWithInputDuration
                    Title="Child (2-12 years)"
                    sizeIcon={18}
                    textSize={15}
                    value={this.state.DetailCustom.GuestAllocation.Child}
                    onChangeText={text => {
                      if (isNaN(parseInt(text))) text = 0;
                      this.setState({
                        DetailCustom: {
                          ...this.state.DetailCustom,
                          GuestAllocation: {
                            ...this.state.DetailCustom.GuestAllocation,
                            Child: parseInt(text),
                          },
                        },
                      });
                    }}
                    Decrement={() => {
                      if (this.state.DetailCustom.GuestAllocation.Child != 0)
                        this.setState({
                          DetailCustom: {
                            ...this.state.DetailCustom,
                            GuestAllocation: {
                              ...this.state.DetailCustom.GuestAllocation,
                              Child:
                                this.state.DetailCustom.GuestAllocation.Child -
                                1,
                            },
                          },
                        });
                    }}
                    Increment={() =>
                      this.setState({
                        DetailCustom: {
                          ...this.state.DetailCustom,
                          GuestAllocation: {
                            ...this.state.DetailCustom.GuestAllocation,
                            Child:
                              this.state.DetailCustom.GuestAllocation.Child + 1,
                          },
                        },
                      })
                    }
                    widthCard="99%"
                    heightCard="30%"
                  />
                  <CardWithInputDuration
                    Title="Infant (< 2 years)"
                    sizeIcon={18}
                    textSize={15}
                    value={this.state.DetailCustom.GuestAllocation.Infant}
                    onChangeText={text => {
                      if (isNaN(parseInt(text))) text = 0;
                      this.setState({
                        DetailCustom: {
                          ...this.state.DetailCustom,
                          GuestAllocation: {
                            ...this.state.DetailCustom.GuestAllocation,
                            Infant: parseInt(text),
                          },
                        },
                      });
                    }}
                    Decrement={() => {
                      if (this.state.DetailCustom.GuestAllocation.Infant != 0)
                        this.setState({
                          DetailCustom: {
                            ...this.state.DetailCustom,
                            GuestAllocation: {
                              ...this.state.DetailCustom.GuestAllocation,
                              Infant:
                                this.state.DetailCustom.GuestAllocation.Infant -
                                1,
                            },
                          },
                        });
                    }}
                    Increment={() =>
                      this.setState({
                        DetailCustom: {
                          ...this.state.DetailCustom,
                          GuestAllocation: {
                            ...this.state.DetailCustom.GuestAllocation,
                            Infant:
                              this.state.DetailCustom.GuestAllocation.Infant +
                              1,
                          },
                        },
                      })
                    }
                    widthCard="99%"
                    heightCard="30%"
                  />
                </View>
                <TouchableOpacity
                  style={[styles.colNoPaddingLeft, styles.marginBottom20]}
                  onPress={this.handleRoomAllocation}
                >
                  <RoundedTextInputWithButton
                    label="Room Allocation"
                    textColor="black"
                    containerWidth="100%"
                    placeholder="Choose Room Allocation"
                    containerHeight={50}
                    animated="hidden"
                    value={this.state.DetailCustom.RoomAllocation.StringAlloc.slice(
                      0,
                      35
                    )}
                    disable={true}
                    error={this.state.errorRoomAllocation}
                    buttonPosition="right"
                    onPress={this.handleRoomAllocation}
                  />
                </TouchableOpacity>
              </View>
            </Card>
          </Container>
        </ScrollView>
        <TouchableOpacity
          style={[styles.footer, styles.bottom0]}
          onPress={this.handleAccomodation}
        >
          <LinearGradient
            colors={[styles.$goldcolor, styles.$goldlightcolor]}
            style={[styles.footer, styles.bottom0]}
            start={[0, 0]}
            end={[1, 0]}
          >
            <NormalButton
              textSize={17}
              text="NEXT"
              buttonWidth="100%"
              textColor="#252525"
              buttonColor="transparent"
              onPress={this.handleAccomodation}
            />
          </LinearGradient>
        </TouchableOpacity>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  cityList: state.generalReducer.cityInCountry,
  loading: state.transactionReducer.loading || state.generalReducer.loading,
});

export default connect(mapStateToProps, {
  setCustomItineraryAction,
  resetCustomItineraryAction,
  setSummaryProgramAction,
  setGuestQuotationAction,
  setDeparturesItineraryAction,
  setReturnsItineraryAction,
  setGuestTourGuideAction,
  setDailyProgramAction,
  setAdditionalServicesAction,
})(ReadyPackageOption);
