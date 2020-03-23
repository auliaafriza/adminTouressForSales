import React, { Component } from 'react';
import { Container } from '../../../components/container';
import { CardMedia } from '../../../components/card';
import CardFlight from './components/CardFlight';
import CardAccommodation from './components/CardAccommodation';
import {
  ScrollView,
  View,
  Animated,
  Alert,
  BackHandler,
  TouchableOpacity,
  Text,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';
import stylesGlobal from '../../../components/styles';
import { NormalButton } from '../../../components/button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  viewDate,
  viewTime,
  viewDateSlash,
  convertToStringDate,
  changeTime,
  getHour,
  SumDays,
  convertToStringTime,
  viewDateStrip,
  addsubtractTimeHours,
  changeTimeNew,
  convertDateFormat,
} from '../../../helper/timeHelper';
import {
  changeDestinationSummaryProgram,
  changeAccomodation,
  addSummaryProgram,
  // changeDuration,
  setDateDeparture,
  setDateArrival,
  setDateSummaryProgram,
  changeTimeArrivalDeparture,
  changeChecInCheckOut,
  dailyGenerate4,
  setDateSummaryProgramByIndex,
  deleteConnectionFlight,
  changeTimeConnectionFlight,
  delConectionFlight,
  delSummaryProgram,
  getFunctionAfterDriving,
  getObjectDuration,
  setObjectDuration,
  setObjectAirport,
  getObjectAirport,
  addConnectionFlightManual,
  changeAirport,
  nextDayConnectionFlight,
  getDrivingAddress,
} from '../../../helper/dailyProgram';

import {
  changeFirstDepartureDate,
  changeLastArrivalDate,
  setReturnsDate,
  addLastDestinationSummaryProgram,
  addNewAccommodation,
  deleteLastDestinationSummaryProgram,
  changeDurationMainPrograms,
  checkNearFlight,
} from '../../../helper/itineraryBuilder';
import { helperNextDay } from '../../../helper/helperNextDay';
import {
  setSummaryProgramAction,
  setDeparturesItineraryAction,
  setReturnsItineraryAction,
  setDailyProgramAction,
  resetReturnsItineraryAction,
  resetDeparturesItineraryAction,
  resetSummaryProgramAction,
} from '../../../actions/Transactions/TransactionAction';
import {
  getAllMovementTypesAction,
  getCityInCountryAction,
} from '../../../actions/General/generalAction';
import { transactionItem } from '../../../helper/transactionHelper';
import { findName } from '../../../helper/checkingHelper';
import {
  deleteGroupTicket,
  findIndexGroupTicket,
} from '../../../helper/groupTicketing';

import { Loading } from '../../../components/loading';
import {
  splitFlightTransit,
  getAirlineTicketFirstIndex,
  durationButtonDisable,
  showButtonMultipleSP,
  validasiMaximumDestination,
  showBtnAddMultipleLast,
  checkSideBySideAccommodation,
  showButtonAddDestination,
  showButtonAddDestinationSP,
  disableFlight,
} from './services/destinationSummaryFunction';
import {
  isAccessibleAirport,
  // isNullFirstDestination,
  setPlaceInArrivalDepartureByHeadLine,
} from './services/settingDestination';
import { resetAccommodationProfileAction } from '../../../actions/accommodation/accommodationAction';
import {
  setDrivingAction,
  setAirportAction,
  getDurationAction,
  getAirportAction,
} from '../../../actions/transportation/transportationAction';
import {
  getOperatorListAction,
  resetOperatorListAction,
} from '../../../actions/operator/operatorAction';
// import {
//   // get_accomodation_filter,
//   reset_accommodation_profile,
//   set_driving,
//   set_airport,
// } from '../../actions/itemIteneraryAction';
// import {
//   get_operator_list,
//   reset_operator_list,
// } from '../../actions/transactionAction';
// import { getDurationAPI, getAirport } from '../../api/itemItenerarySaga';
class AccommodationSummary extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    Returns: PropTypes.array,
    Departures: PropTypes.array,
    SummaryProgram: PropTypes.array,
    ReturnsStatus: PropTypes.string,
    DeparturesStatus: PropTypes.string,
    SummaryProgramStatus: PropTypes.string,
    oldDailyProgram: PropTypes.array,
    MovementList: PropTypes.array,
    isMovementMode: PropTypes.string,
    DailyProgram: PropTypes.array,
    DetailCustom: PropTypes.object,
    isTourOperator: PropTypes.string,
    token: PropTypes.string,
    driving: PropTypes.array,
    airport: PropTypes.array,
    tourOperatorListError: PropTypes.string,
    cityList: PropTypes.array,
    listAirport: PropTypes.array,
    getAirportData: PropTypes.array,
    getDuration: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.FocusedTab();
    this.state = {
      airportType: '',
      oldAirport: null,
      Returns: this.props.Returns,
      Departures: this.props.Departures,
      SummaryProgram: this.props.SummaryProgram,
      Day: 0,
      arrivaldate: changeTime(new Date()),
      errorArrivalDestination: '',
      errorArrivalDate: '',
      errorArrivalTime: '',
      errorCityDestination: '',
      errorCheckInDate: '',
      errorCheckInTime: '',
      errorCheckOutDate: '',
      errorCheckOutTime: '',
      errorDepartureDestination: '',
      errorDepartureDate: '',
      errorDepartureTime: '',

      isDateOutPickerVisible: false,
      isTimeOutPickerVisible: [],
      isDateInPickerVisible: [],
      isTimeInPickerVisible: [],
      isDateArrPickerVisible: false,
      isTimeArrPickerVisible: false,
      isDateDepPickerVisible: false,
      isTimeDepPickerVisible: false,
      isDateArrConPickerVisible: false,
      isTimeArrConPickerVisible: false,
      isDateDepConPickerVisible: false,
      isTimeDepConPickerVisible: false,

      isDateDepDeparturePickerVisible: false,
      isTimeDepDeparturePickerVisible: false,
      isDateDepArrivalPickerVisible: false,
      isTimeDepArrivalPickerVisible: false,
      isDateRetDeparturePickerVisible: false,
      isTimeRetDeparturePickerVisible: false,
      isDateRetArrivalPickerVisible: false,
      isTimeRetArrivalPickerVisible: false,

      checked: false,
      activeTab: 'date',
      colorTextDate: styles.$goldcolor,
      colorTextItinerary: '#252525',
      loading: false,
      loadingButton: false,
      textLoading: '',
      errorAccommodation: '',
      scrollY: new Animated.Value(0),
      arrayIndexFlightTicketSP: [],
    };
  }

  componentDidMount() {
    this.backButton;
    if (this.props.isMovementMode == []) {
      this.props.getAllMovementTypesAction();
    }
    this.props.getCityInCountryAction();
  }

  backButton = () => {
    if (this.state.activeTab == 'itinerary') {
      this.FocusedTab('date');
    } else {
      BackHandler.addEventListener('hardwareBackPress', () => {
        this.props.navigation.pop(); // works best when the goBack is async
        return true;
      });
    }
  };

  componentDidUpdate() {
    if (
      this.props.ReturnsStatus == 'success' ||
      this.props.DeparturesStatus == 'success' ||
      this.props.SummaryProgramStatus == 'success'
    ) {
      let oldHeadlineProgram = {
        Departures: this.props.Departures,
        MainPrograms: this.props.SummaryProgram,
        Returns: this.props.Returns,
      };
      let isFlightSP = findIndexGroupTicket(oldHeadlineProgram);
      this.setState({
        Returns: this.props.Returns,
        Departures: this.props.Departures,
        SummaryProgram: this.props.SummaryProgram,
        arrayIndexFlightTicketSP: isFlightSP,
      });
      this.props.resetReturnsItineraryAction();
      this.props.resetDeparturesItineraryAction();
      this.props.resetSummaryProgramAction();
      //this.props.dispatch(reset_returns_itenerary());
      //this.props.dispatch(reset_departures_itenerary());
      //this.props.dispatch(reset_summary_program());
    }
  }

  FocusedTab = async type => {
    if (type == 'date') {
      await this.setState({
        activeTab: type,
        colorTextDate: styles.$goldcolor,
        colorTextItinerary: '#252525',
        loading: true,
        textLoading: 'Save your itinerary',
      });
    } else {
      const error = this.validate('Itinerary');
      const errorDeparture = this.validate('Departures');
      const errorReturns = this.validate('Returns');
      if (!error && !errorDeparture && !errorReturns) {
        if (this.state.activeTab == 'date') {
          this.setState({
            loading: true,
            textLoading: 'Loading your itinerary',
          });
          let DP = await dailyGenerate4(
            this.state.Departures,
            this.state.Returns,
            this.state.SummaryProgram,
            this.props.oldDailyProgram,
            this.props.MovementList,
            false,
            this.props.cityList
          );
          DP = await this.getDriving(DP);
          DP = await getFunctionAfterDriving(DP);
          await this.props.setDailyProgramAction(DP); //this.props.dispatch(await set_daily_program(DP));
          await this.setState({
            activeTab: type,
            colorTextItinerary: styles.$goldcolor,
            colorTextDate: '#252525',
            loading: false,
          });
        }
      }
    }
    this.setState({ loading: false });
  };

  hideDateTimePicked = () => {
    this.setState({
      isDateOutPickerVisible: false,
      isTimeOutPickerVisible: [],
      isDateInPickerVisible: [],
      isTimeInPickerVisible: [],
      isDateArrPickerVisible: false,
      isTimeArrPickerVisible: false,
      isDateDepPickerVisible: false,
      isTimeDepPickerVisible: false,
      isDateArrConPickerVisible: false,
      isTimeArrConPickerVisible: false,
      isDateDepConPickerVisible: false,
      isTimeDepConPickerVisible: false,

      isDateDepDeparturePickerVisible: false,
      isTimeDepDeparturePickerVisible: false,
      isDateDepArrivalPickerVisible: false,
      isTimeDepArrivalPickerVisible: false,
      isDateRetDeparturePickerVisible: false,
      isTimeRetDeparturePickerVisible: false,
      isDateRetArrivalPickerVisible: false,
      isTimeRetArrivalPickerVisible: false,
    });
  };
  validate = type => {
    const { SummaryProgram } = this.state;
    let isError = false;
    const REQUIRED = 'This field is required';
    const errors = {
      errorAccommodation: '',
    };

    if (type == 'Accommodation') {
      SummaryProgram.map(mainProgram => {
        if (mainProgram.AccommodationSummary != null) {
          if (
            mainProgram.AccommodationSummary.Name == null ||
            mainProgram.AccommodationSummary.Name == ''
          ) {
            Alert.alert('Sorry', 'Please choose accommodation first', [
              {
                text: 'OK',
              },
            ]);
            isError = true;
            errors.errorAccommodation = REQUIRED;
          }
        }
      });
    }
    if (type == 'Destination') {
      SummaryProgram.map(mainProgram => {
        if (mainProgram.City.Name == null || mainProgram.City.Name == '') {
          Alert.alert('Sorry', 'Please choose Destination first', [
            {
              text: 'OK',
            },
          ]);
          isError = true;
          errors.errorAccommodation = REQUIRED;
        }
      });
    }
    if (type == 'Itinerary') {
      SummaryProgram.length != 0
        ? SummaryProgram.map(SP => {
            if (SP.AccommodationSummary != null) {
              if (
                SP.AccommodationSummary.Name == null ||
                SP.AccommodationSummary.Name == ''
              ) {
                Alert.alert('Sorry', 'Please choose accommodation first', [
                  {
                    text: 'OK',
                  },
                ]);
                isError = true;
                errors.errorAccommodation = REQUIRED;
              }

              //Cek apakah chekout time lebih besar dari departure time
              if (
                SummaryProgram[SummaryProgram.length - 1].AccommodationSummary
                  .CheckOut != null
              ) {
                if (
                  viewDate(
                    SummaryProgram[SummaryProgram.length - 1]
                      .AccommodationSummary.CheckOut
                  ) > viewDate(this.state.Returns[0].Date)
                ) {
                  Alert.alert(
                    'Sorry',
                    'Check out date cannot more than departure date',
                    [
                      {
                        text: 'OK',
                      },
                    ]
                  );
                  isError = true;
                  errors.errorAccommodation = REQUIRED;
                }
                if (
                  viewDate(
                    SummaryProgram[SummaryProgram.length - 1]
                      .AccommodationSummary.CheckOut
                  ) == viewDate(this.state.Returns[0].Date)
                ) {
                  if (
                    getHour(
                      SummaryProgram[SummaryProgram.length - 1]
                        .AccommodationSummary.CheckOut
                    ) > getHour(this.state.Returns[0].Date)
                  ) {
                    Alert.alert(
                      'Sorry',
                      'Check out date cannot more than departure date',
                      [
                        {
                          text: 'OK',
                        },
                      ]
                    );
                    isError = true;
                    errors.errorAccommodation = REQUIRED;
                  }
                }
              }

              //Cek Apakah Checkin time lebih kecil dari Arrival Time
              if (SummaryProgram[0].AccommodationSummary.CheckIn != null) {
                if (
                  viewDate(SummaryProgram[0].AccommodationSummary.CheckIn) <
                  viewDate(this.state.Departures[1].Date)
                ) {
                  Alert.alert(
                    'Sorry',
                    'Check in date cannot less than arrival date',
                    [
                      {
                        text: 'OK',
                      },
                    ]
                  );
                  isError = true;
                  errors.errorAccommodation = REQUIRED;
                }
                if (
                  viewDate(SummaryProgram[0].AccommodationSummary.CheckIn) ==
                  viewDate(this.state.Departures[1].Date)
                ) {
                  if (
                    getHour(SummaryProgram[0].AccommodationSummary.CheckIn) <
                    getHour(this.state.Departures[1].Date)
                  ) {
                    Alert.alert(
                      'Sorry',
                      'Check in date cannot less than arrival date',
                      [
                        {
                          text: 'OK',
                        },
                      ]
                    );
                    isError = true;
                    errors.errorAccommodation = REQUIRED;
                  }
                }
              }
            }

            //cek apakah last movement date lebih besar dari first movement
          })
        : null;
    }
    if (type == 'Departures') {
      if (this.state.Departures.length != 0) {
        if (this.state.Departures[0].Place == null) {
          Alert.alert('Sorry', 'Please choose first departure', [
            {
              text: 'OK',
            },
          ]);
          isError = true;
        } else if (this.state.Departures[1].Place == null) {
          Alert.alert('Sorry', 'Please choose first arrival', [
            {
              text: 'OK',
            },
          ]);
          isError = true;
        } else {
          isError = false;
        }
      }
      this.state.Departures.length != 0
        ? this.state.Departures.map((item, i) => {
            //Cek apakah depature date dan time lebih besar dari arrival date dan time untuk first flight
            if (i % 2 == 0) {
              if (item.Date != null) {
                if (
                  viewDate(item.Date) >
                  viewDate(this.state.Departures[i + 1].Date)
                ) {
                  Alert.alert(
                    'Sorry',
                    'Depature date cannot more than arrival date',
                    [
                      {
                        text: 'OK',
                      },
                    ]
                  );
                  isError = true;
                }
                if (
                  viewDate(item.Date) ==
                  viewDate(this.state.Departures[i + 1].Date)
                ) {
                  if (
                    getHour(item.Date) >
                    getHour(this.state.Departures[i + 1].Date)
                  ) {
                    Alert.alert(
                      'Sorry',
                      'Departure time cannot more than arrival time',
                      [
                        {
                          text: 'OK',
                        },
                      ]
                    );
                    isError = true;
                  }
                }
              }
            }
          })
        : (isError = false);
    }
    if (type == 'Returns') {
      if (this.state.Returns.length != 0) {
        if (this.state.Returns[0].Place == null) {
          Alert.alert('Sorry', 'Please choose last departure', [
            {
              text: 'OK',
            },
          ]);
          isError = true;
        } else if (this.state.Returns[1].Place == null) {
          Alert.alert('Sorry', 'Please choose last arrival', [
            {
              text: 'OK',
            },
          ]);
          isError = true;
        } else {
          isError = false;
        }
      }
      this.state.Returns.length != 0
        ? this.state.Returns.map((item, i) => {
            //Cek apakah depature date dan time lebih besar dari arrival date dan time untuk first flight
            if (i % 2 == 0) {
              if (item.Date != null) {
                if (
                  viewDate(item.Date) > viewDate(this.state.Returns[i + 1].Date)
                ) {
                  Alert.alert(
                    'Sorry',
                    'Depature date cannot more than arrival date',
                    [
                      {
                        text: 'OK',
                      },
                    ]
                  );
                  isError = true;
                }
                if (
                  viewDate(item.Date) ==
                  viewDate(this.state.Returns[i + 1].Date)
                ) {
                  if (
                    getHour(item.Date) > getHour(this.state.Returns[i + 1].Date)
                  ) {
                    Alert.alert(
                      'Sorry',
                      'Departure time cannot more than arrival time',
                      [
                        {
                          text: 'OK',
                        },
                      ]
                    );
                    isError = true;
                  }
                }
              }
            }
          })
        : (isError = false);
    }

    this.setState({
      ...this.state,
      ...errors,
    });
    return isError;
  };

  handleNewAccommodation = index => {
    this.setState({ loading: true });
    const error = this.validate('Accommodation');
    if (!error) {
      let headline = {
        Departures: this.state.Departures,
        MainPrograms: this.state.SummaryProgram,
        Returns: this.state.Returns,
      };
      const errorMaxDestination = validasiMaximumDestination(headline, index);
      if (!errorMaxDestination) {
        let data = addNewAccommodation(headline, index);

        let newReturns = setReturnsDate(this.state.Returns, data.MainPrograms);
        this.setState({
          Returns: newReturns,
          SummaryProgram: [],
        });
        this.props.setSummaryProgramAction(data.MainPrograms);
        this.props.setReturnsItineraryAction(newReturns);
        //this.props.dispatch(set_summary_program(data.MainPrograms));
        //this.props.dispatch(set_returns_itenerary(newReturns));
      } else {
        Alert.alert(errorMaxDestination);
      }
    }
    this.setState({ loading: false });
  };

  addMoreDestination = () => {
    this.setState({ loading: true });
    const error = this.validate('Accommodation');
    if (!error) {
      let isNextGT = this.state.Returns[0].Ticket.ServiceItemId
        ? this.state.Returns[0]
        : null;

      let SP = addSummaryProgram(
        this.state.SummaryProgram,
        isNextGT,
        this.props.cityList
      );
      SP = setDateSummaryProgram(
        this.state.Departures[this.state.Departures.length - 1],
        SP
      );
      let newReturns = setReturnsDate(this.state.Returns, SP);
      this.setState({
        Returns: newReturns,
        SummaryProgram: SP,
      });
      this.props.setSummaryProgramAction(SP);
      this.props.setReturnsItineraryAction(newReturns);
    }
    this.setState({ loading: false });
  };

  delDestination = (index, headLineProg) => {
    this.setState({ loading: true });
    // let error = checkDeleteAccommodation(this.state.SummaryProgram, index);
    let data = delSummaryProgram(
      this.state.Departures[this.state.Departures.length - 1],
      this.state.Returns[0],
      this.state.SummaryProgram,
      this.props.oldDailyProgram,
      index
    );
    let newReturns = setReturnsDate(this.state.Returns, data.summaryProgram);
    headLineProg.Returns = newReturns;
    headLineProg.MainPrograms = data.summaryProgram;
    headLineProg = setPlaceInArrivalDepartureByHeadLine(
      headLineProg,
      this.props.airport,
      this.props.cityList
    );

    this.setState({
      Returns: headLineProg.Returns,
      SummaryProgram: headLineProg.MainPrograms,
      Departures: headLineProg.Departures,
    });
    this.props.setDeparturesItineraryAction(headLineProg.Departures);
    this.props.setSummaryProgramAction(headLineProg.MainPrograms);
    this.props.setReturnsItineraryAction(headLineProg.Returns);
    // this.props.setDailyProgramAction(data.dailyProgram)
    //this.props.dispatch(set_departures_itenerary(headLineProg.Departures));
    //this.props.dispatch(set_summary_program(headLineProg.MainPrograms));
    //this.props.dispatch(set_returns_itenerary(headLineProg.Returns));
    // //this.props.dispatch(set_daily_program(data.dailyProgram));
    this.setState({ loading: false });
  };

  confirmAlertDelete = index => {
    let headline = {
      Departures: this.state.Departures,
      MainPrograms: this.state.SummaryProgram,
      Returns: this.state.Returns,
    };
    let isValidDelete = checkSideBySideAccommodation(
      headline,
      index,
      this.props.airport
    );
    if (isValidDelete) {
      Alert.alert('Are you sure', 'you want to delete this accommodation?', [
        {
          text: 'Yes',
          onPress: () => this.delDestination(index, headline),
        },
        { text: 'No' },
      ]);
    } else {
      Alert.alert(
        'Failed',
        'Accommodation cannot be deleted because it is tied to flight ticket',
        [{ text: 'Ok' }]
      );
    }
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
            item = this.props.getDuration; //getDurationAPI(this.props.token, data);
            if (item.Duration != undefined) {
              this.props.setDrivingAction(
                setObjectDuration(this.props.driving, data, item)
              );
              //   this.props.dispatch(
              //     await set_driving(
              //       setObjectDuration(this.props.driving, data, item)
              //     )
              //   );
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

  getAirportbyRegion = async region => {
    let airports = await this.getAirports(region);
    return airports;
  };

  getAirportSP = async (headLineProg, index) => {
    for (let i = 0; i < headLineProg.MainPrograms.length; i++) {
      if (headLineProg.MainPrograms[i].AccommodationSummary == undefined) {
        let nearFlight = checkNearFlight(headLineProg, index);
        let airportIndexSP = this.getAirportbyRegion(
          headLineProg.MainPrograms[index].Region
        );
        let airport = this.getAirportbyRegion(
          headLineProg.MainPrograms[i].Region
        );

        if (airport.length > 0) {
          if (nearFlight) {
            let isPlaceExist = airportIndexSP.find(
              item => item.Id === nearFlight.PlaceId
            );
            if (!isPlaceExist) {
              headLineProg = deleteGroupTicket(
                headLineProg,
                nearFlight.Ticket.ServiceItemId,
                true
              );
            }
          }

          let newAirport = airport.find(item => {
            return (
              item.IsPopular == true &&
              item.Region.Id == headLineProg.MainPrograms[i].Region
            );
          });
          if (newAirport) {
            headLineProg.MainPrograms[i].Address = newAirport.Address;
            headLineProg.MainPrograms[i].Place = newAirport.Name;
            headLineProg.MainPrograms[i].PlaceId = newAirport.Id;
          } else {
            headLineProg.MainPrograms[i].Address = airport[0].Address;
            headLineProg.MainPrograms[i].Place = airport[0].Name;
            headLineProg.MainPrograms[i].PlaceId = airport[0].Id;
          }
        }
      }
    }
    return headLineProg;
  };

  getArrDep = async air => {
    let airport = await this.getAirports(air.Region);
    if (airport.length > 0) {
      let newAirport = airport.find(item => {
        return item.IsPopular == true && item.Region.Id == air.Region;
      });
      if (newAirport) {
        air.Address = newAirport.Address;
        air.Place = newAirport.Name;
        air.PlaceId = newAirport.Id;
      } else {
        air.Address = airport[0].Address;
        air.Place = airport[0].Name;
        air.PlaceId = airport[0].Id;
      }
    } else {
      air.Address = null;
      air.Place = null;
      air.PlaceId = null;
    }
    return air;
  };
  // getArrDep = async air => {
  //   let airport = await this.getAirports(air.Region);
  //   if (airport.length > 0) {
  //     air.Address = airport[0].Address;
  //     air.Place = airport[0].Name;
  //     air.PlaceId = airport[0].Id;
  //   } else {
  //     air.Address = null;
  //     air.Place = null;
  //     air.PlaceId = null;
  //   }
  //   return air;
  // };

  getAirports = async region => {
    let airport = await getObjectAirport(this.props.listAirport, region);
    if (airport == null) {
      airport = await this.props.getAirportAction(region);
      airport = this.props.getAirportData;
      if (airport.length > 0) {
        this.props.setAirportAction(
          setObjectAirport(this.props.airport, region, airport)
        );
      }
    }
    return airport;
  };

  handlePressTourList = async () => {
    if (this.state.activeTab == 'date') {
      this.FocusedTab('itinerary');
    } else {
      let item = await transactionItem(
        this.props.DetailCustom,
        this.props.SummaryProgram,
        this.props.DailyProgram,
        this.props.Departures,
        this.props.Returns
      );
      this.setState({ loading: true });
      this.props.getOperatorListAction(item);
      //this.props.dispatch(get_operator_list(item));
    }
  };

  handleListAccomodation = index => {
    const { SummaryProgram } = this.state;
    const error = this.validate('Destination');
    const errorDeparture = this.validate('Departures');
    // const errorReturns = this.validate('Returns');
    if (!error && !errorDeparture) {
      SummaryProgram[index].AccommodationSummary.Name
        ? Alert.alert(
            'Sorry',
            'Please be careful, changing the accommodation will reset the activity item like excursion, transportation, and meal',
            [
              {
                text: 'Ok, Continue',
                onPress: () => this.getAccommodation(index),
              },
              {
                text: 'Cancel',
              },
            ]
          )
        : this.getAccommodation(index);
    }
  };

  getAccommodation = index => {
    //this.props.dispatch(reset_accommodation_profile());
    this.props.resetAccommodationProfileAction();
    let cityId = this.state.SummaryProgram[index].City.Id;
    let StartDate = convertDateFormat(
      this.state.SummaryProgram[index].AccommodationSummary.CheckIn,
      'YYYY-MM-DDTHH:mm:ss'
    );
    let EndDate = convertDateFormat(
      this.state.SummaryProgram[index].AccommodationSummary.CheckOut,
      'YYYY-MM-DDTHH:mm:ss'
    );
    let useExtraBed =
      this.state.SummaryProgram[index].AccommodationSummary.Allocations
        .ExtraBedPax > 0
        ? true
        : false;
    let useChildExtraBed =
      this.state.SummaryProgram[index].AccommodationSummary.Allocations
        .ChildExtraBedPax > 0
        ? true
        : false;
    let useSharingBed =
      this.state.SummaryProgram[index].AccommodationSummary.Allocations
        .SharingBedPax > 0
        ? true
        : false;
    let useSharingRoom = this.state.SummaryProgram[index].AccommodationSummary
      .Allocations.SharingRoomPax;
    let useSingleRoom = this.state.SummaryProgram[index].AccommodationSummary
      .Allocations.SingleRoomPax;
    // //this.props.dispatch(
    //   get_accomodation_filter(
    //     cityId,
    //     StartDate,
    //     useExtraBed,
    //     useChildExtraBed,
    //     useSharingBed
    //   )
    // );
    let item = transactionItem(
      this.props.DetailCustom,
      this.props.SummaryProgram,
      this.props.DailyProgram,
      this.props.Departures,
      this.props.Returns
    );
    this.props.navigation.navigate('masterData', {
      screen: 'ListAccomodation',
      params: {
        Parameter: {
          Index: index,
          CityId: cityId,
          StartDate: StartDate,
          EndDate: EndDate,
          useExtraBed: useExtraBed,
          useChildExtraBed: useChildExtraBed,
          useSharingBed: useSharingBed,
          useSharingRoom: useSharingRoom,
          useSingleRoom: useSingleRoom,
          onSelect: this.onSelectAccomodation,
          dataDemoPrice: item,
        },
      },
    });
  };

  onSelectAccomodation = (index, services, room, hotel) => {
    let SP = changeAccomodation(
      this.state.SummaryProgram,
      index,
      services,
      room,
      hotel
    );
    this.setState({ SummaryProgram: SP });
    this.props.setSummaryProgramAction(SP);
    //this.props.dispatch(set_summary_program(SP));
  };

  confirmChangeDestination = (index, City) => {
    if (City) {
      Alert.alert(
        'Are you sure',
        'Please be careful, changing the destination will reset the accommodation, activity and flight ticket',
        [
          {
            text: 'Yes',
            onPress: () => this.handleCity(index),
          },
          { text: 'No' },
        ]
      );
    } else {
      this.handleCity(index);
    }
  };

  handleCity = async index => {
    await this.props.navigation.navigate('General', {
      screen: 'ListCity',
      params: {
        onSelect: await this.onSelectCity,
        index: index,
      },
    });
  };

  addConnecFlight = async (arraySummaryProgram, index) => {
    // this.setState({ loading: true });
    let headline = {
      Departures: this.state.Departures,
      MainPrograms: this.state.SummaryProgram,
      Returns: this.state.Returns,
    };
    headline.MainPrograms = await addConnectionFlightManual(
      arraySummaryProgram,
      index,
      this.props.airport
    );
    headline = await this.getAirportSP(headline, index);
    // let newHeadline = setPlaceInArrivalDepartureByHeadLine(
    //   headline,
    //   this.props.airport,
    //   this.props.cityList
    // );
    await this.setState({ SummaryProgram: headline.MainPrograms });
    this.props.setSummaryProgramAction(headline.MainPrograms);
    //this.props.dispatch(set_summary_program(headline.MainPrograms));
    this.setState({ loading: false });
  };

  delConnecFlight = async index => {
    this.setState({ loading: true });
    let SP = delConectionFlight(
      this.state.Departures[1],
      this.state.SummaryProgram,
      index
    );
    await this.setState({
      SummaryProgram: SP,
    });
    this.props.setSummaryProgramAction(SP);
    //this.props.dispatch(await set_summary_program(SP));
    this.setState({ loading: false });
  };

  connectionFlight = (index, data) => {
    if (index == 0) {
      if (data.SP.length > 1) {
        if (data.SP[index + 1].TransferType == 'Movement_departure') {
          return true;
        } else {
          return false;
        }
      }
    } else if (index == data.SP.length - 1) {
      if (data.SP[index - 1].TransferType == 'Movement_arrival') {
        return true;
      } else {
        return false;
      }
    } else {
      if (
        data.SP[index + 1].TransferType == 'Movement_departure' ||
        data.SP[index - 1].TransferType == 'Movement_arrival'
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  onSelectCity = async (index, city) => {
    this.setState({ loading: true });
    let data = await changeDestinationSummaryProgram(
      this.state.Departures[1],
      this.state.Returns[0],
      this.state.SummaryProgram,
      index,
      city
    );

    let headline = {
      Departures: this.state.Departures,
      MainPrograms: this.state.SummaryProgram,
      Returns: this.state.Returns,
    };

    let SP = [];
    let connectionFlightData = this.connectionFlight(index, data);
    if (connectionFlightData) {
      if (data.SP[index - 1].TransferType == 'Movement_arrival') {
        SP = await deleteConnectionFlight(data.SP, index - 2);
        SP = await addConnectionFlightManual(SP, index - 2);
      }
      if (data.SP[index + 1].TransferType == 'Movement_departure') {
        SP = await deleteConnectionFlight(data.SP, index + 2);
        SP = await addConnectionFlightManual(SP, index + 2);
      }
    } else {
      SP = data.SP;
    }

    headline.MainPrograms = SP;
    headline.Departures[headline.Departures.length - 1] = await this.getArrDep(
      data.Arrival
    );
    headline.Returns[0] = await this.getArrDep(data.Departure);
    headline = await this.getAirportSP(headline, index);

    await this.setState({
      SummaryProgram: headline.MainPrograms,
      Departures: headline.Departures,
      Returns: headline.Returns,
    });
    this.props.setDeparturesItineraryAction(headline.Departures);
    this.props.setReturnsItineraryAction(headline.Returns);
    this.props.setSummaryProgramAction(headline.MainPrograms);
    //this.props.dispatch(set_departures_itenerary(headline.Departures));
    //this.props.dispatch(set_returns_itenerary(headline.Returns));
    //this.props.dispatch(set_summary_program(headline.MainPrograms));
    this.setState({ loading: false });
  };

  handleAirport = (data, index, type) => {
    this.setState({ airportType: type, oldAirport: data });
    this.props.navigation.navigate('General', {
      screen: 'ListAirport',
      params: {
        data: data,
        index: index,
        onSelect: this.onSelectAirport,
      },
    });
  };

  onSelectFirstCity = async (index, city) => {
    this.setState({ loading: true });
    let data = await changeDestinationSummaryProgram(
      this.state.Departures[1],
      this.state.Returns[0],
      this.state.SummaryProgram,
      index,
      city
    );

    // let Arrival = await this.getArrDep(data.Arrival);
    let Departure = await this.getArrDep(data.Departure);

    // let newDepartures = [this.state.Departures[0], Arrival];
    let newReturns = [Departure, this.state.Returns[1]];

    await this.setState({
      SummaryProgram: data.SP,
      // Departures: newDepartures,
      Returns: newReturns,
    });
    //this.props.setDeparturesItineraryAction (newDepartures);
    this.props.setReturnsItineraryAction(newReturns);
    this.props.setSummaryProgramAction(data.SP);
    this.setState({ loading: false });
  };

  onSelectAirport = async (data, index, airport) => {
    this.setState({ loading: true });
    if (index != null) {
      let mainProgram = changeAirport(data, index, airport);
      this.setState({ MainPrograms: mainProgram });
      this.props.dispatch(set_summary_program(mainProgram));
      this.setState({ loading: false });
    } else {
      let ArrDep = changeAirport(data, null, airport);
      let arrayDepartures = [];
      let arrayReturns = [];

      if (this.state.airportType == 'firstDeparture') {
        ArrDep.TransferType = 'Movement_departure';
        arrayDepartures.push(ArrDep);
        arrayDepartures.push(this.state.Departures[1]);
        this.setState({ Departures: arrayDepartures });
        await this.props.setDeparturesItineraryAction(arrayDepartures);
        this.setState({ loading: false });
      } else if (this.state.airportType == 'firstArrival') {
        let city = this.props.cityList.find(item => item.Id == airport.City.Id);
        ArrDep.TransferType = 'Movement_arrival';
        arrayDepartures.push(this.state.Departures[0]);
        arrayDepartures.push(ArrDep);
        this.setState({
          Departures: arrayDepartures,
        });
        await this.props.setDeparturesItineraryAction(arrayDepartures);
        await this.onSelectFirstCity(
          this.state.SummaryProgram.length - 1,
          city
        );
        this.setState({ loading: false });
      } else if (this.state.airportType == 'lastDeparture') {
        ArrDep.TransferType = 'Movement_departure';
        arrayReturns.push(ArrDep);
        arrayReturns.push(this.state.Returns[1]);
        this.setState({ Returns: arrayReturns });
        await this.props.setReturnsItineraryAction(arrayReturns);
        this.setState({ loading: false });
      } else {
        ArrDep.TransferType = 'Movement_arrival';
        arrayReturns.push(this.state.Returns[0]);
        arrayReturns.push(ArrDep);
        this.setState({ Returns: arrayReturns });
        await this.props.setReturnsItineraryAction(arrayReturns);
        this.setState({ loading: false });
      }
    }
  };

  handleChangeDuration = (value, i) => {
    let headline = {
      Departures: this.state.Departures,
      MainPrograms: this.state.SummaryProgram,
      Returns: this.state.Returns,
    };
    let data = changeDurationMainPrograms(headline, i, value);
    if (!data.errorMessage) {
      let newReturns = setReturnsDate(this.state.Returns, data.MainPrograms);
      this.setState({
        Returns: newReturns,
        SummaryProgram: data.MainPrograms,
      });
      this.props.setSummaryProgramAction(data.MainPrograms);
      this.props.setReturnsItineraryAction(newReturns);
      //this.props.dispatch(set_summary_program(data.MainPrograms));
      //this.props.dispatch(set_returns_itenerary(newReturns));
    } else {
      Alert.alert('Failed', data.errorMessage, [{ text: 'OK' }]);
    }
  };
  // handleChangeDuration = (value, i) => {
  //   let headline = {
  //     Departures: this.state.Departures,
  //     MainPrograms: this.state.SummaryProgram,
  //     Returns: this.state.Returns,
  //   };
  //   let data = changeDuration(headline, i, value);
  //   if (!data.errorMessage) {
  //     let newReturns = setReturnsDate(this.state.Returns, data.MainPrograms);
  //     this.setState({
  //       Returns: newReturns,
  //       SummaryProgram: data.MainPrograms,
  //     });
  //     //this.props.dispatch(set_summary_program(data.MainPrograms));
  //     //this.props.dispatch(set_returns_itenerary(newReturns));
  //   } else {
  //     Alert.alert('Failed', data.errorMessage, [{ text: 'OK' }]);
  //   }
  // };

  handleChangeDateAirport = (Airport, type, date) => {
    if (type == 'Arrival') {
      let Arrival = setDateArrival(Airport, date);
      let SP = setDateSummaryProgram(Arrival, this.state.SummaryProgram);
      let Departure = setDateDeparture(this.state.Departure, SP);

      this.setState(
        {
          Departures: Arrival,
          Returns: Departure,
          SummaryProgram: SP,
        },
        () => {
          this.hideDateTimePicked();
          this.props.setDeparturesItineraryAction(Arrival);
          this.props.setSummaryProgramAction(SP);
          this.props.setReturnsItineraryAction(Departure);
          //this.props.dispatch(set_departures_itenerary(Arrival));
          //this.props.dispatch(set_summary_program(SP));
          //this.props.dispatch(set_returns_itenerary(Departure));
        }
      );
    }
  };

  handleChangeTimeAirport = (Airport, time, type) => {
    let airport = changeTimeArrivalDeparture(Airport, time);
    if (type == 'firstDeparture') {
      let newDepartures = [airport, this.state.Departures[1]];

      this.setState(
        {
          Departures: newDepartures,
          Returns: this.state.Returns,
          SummaryProgram: this.state.SummaryProgram,
        },
        () => {
          this.hideDateTimePicked();
          this.props.setDeparturesItineraryAction(newDepartures);
          this.props.setSummaryProgramAction(this.state.SummaryProgram);
          this.props.setReturnsItineraryAction(this.state.Returns);
          //this.props.dispatch(set_departures_itenerary(newDepartures));
          //this.props.dispatch(set_returns_itenerary(this.state.Returns));
          //this.props.dispatch(set_summary_program(this.state.SummaryProgram));
        }
      );
    } else if (type == 'firstArrival') {
      let newDepartures = [this.state.Departures[0], airport];

      this.setState(
        {
          Departures: newDepartures,
          Returns: this.state.Returns,
          SummaryProgram: this.state.SummaryProgram,
        },
        () => {
          this.hideDateTimePicked();
          this.props.setDeparturesItineraryAction(newDepartures);
          this.props.setSummaryProgramAction(this.state.SummaryProgram);
          this.props.setReturnsItineraryAction(this.state.Returns);
          //this.props.dispatch(set_departures_itenerary(newDepartures));
          //this.props.dispatch(set_returns_itenerary(this.state.Returns));
          //this.props.dispatch(set_summary_program(this.state.SummaryProgram));
        }
      );
    } else if (type == 'lastDeparture') {
      let newReturns = [airport, this.state.Returns[1]];

      this.setState(
        {
          Returns: newReturns,
          Departures: this.state.Departures,
          SummaryProgram: this.state.SummaryProgram,
        },
        () => {
          this.hideDateTimePicked();
          this.props.setDeparturesItineraryAction(this.state.Departures);
          this.props.setSummaryProgramAction(this.state.SummaryProgram);
          this.props.setReturnsItineraryAction(newReturns);
          //this.props.dispatch(set_returns_itenerary(newReturns));
          //this.props.dispatch(set_departures_itenerary(this.state.Departures));
          //this.props.dispatch(set_summary_program(this.state.SummaryProgram));
        }
      );
    } else {
      let newReturns = [this.state.Returns[0], airport];

      this.setState(
        {
          Returns: newReturns,
          Departures: this.state.Departures,
          SummaryProgram: this.state.SummaryProgram,
        },
        () => {
          this.hideDateTimePicked();
          this.props.setDeparturesItineraryAction(this.state.Departures);
          this.props.setSummaryProgramAction(this.state.SummaryProgram);
          this.props.setReturnsItineraryAction(newReturns);

          //this.props.dispatch(set_returns_itenerary(newReturns));
          //this.props.dispatch(set_departures_itenerary(this.state.Departures));
          //this.props.dispatch(set_summary_program(this.state.SummaryProgram));
        }
      );
    }
  };

  onPressTimeOut = index => {
    let Open = [...this.state.isTimeOutPickerVisible];
    Open[index] = true;
    this.setState({
      isTimeOutPickerVisible: Open,
    });
  };

  onPressTime = index => {
    let Open = [...this.state.isTimeInPickerVisible];
    Open[index] = true;
    this.setState({
      isTimeInPickerVisible: Open,
    });
  };

  onPressDateIn = index => {
    let Open = [...this.state.isDateInPickerVisible];
    Open[index] = true;
    this.setState({
      isDateInPickerVisible: Open,
    });
  };

  handleDateSP = (index, date) => {
    let SP = setDateSummaryProgramByIndex(
      this.state.SummaryProgram,
      this.state.Departures[1],
      index,
      date
    );

    this.setState({ SummaryProgram: SP }, () => {
      this.props.setSummaryProgramAction(SP);
      //this.props.dispatch(set_summary_program(SP));
      this.hideDateTimePicked();
    });
  };

  handleTimeSP = (index, time) => {
    let type = this.state.isTimeInPickerVisible[index] ? 'in' : 'out';
    let SP = changeChecInCheckOut(this.state.SummaryProgram, index, time, type);
    this.setState({ SummaryProgram: SP }, () => {
      this.props.setSummaryProgramAction(SP);
      //this.props.dispatch(set_summary_program(SP));
      this.hideDateTimePicked();
    });
  };

  handleTimeConnectionFlight = (index, time) => {
    let SP = changeTimeConnectionFlight(this.state.SummaryProgram, index, time);
    this.setState({ SummaryProgram: SP });
    this.props.setSummaryProgramAction(SP);
    //this.props.dispatch(set_summary_program(SP));
    this.hideDateTimePicked();
  };

  handleTourSchedule = (index, DateSchedule) => {
    this.props.navigation.navigate('TourSchedule', {
      indexDP: index,
      DateSchedule: DateSchedule,
    });
  };

  handleNextDayFlight = (isNextDay, index) => {
    let SP = nextDayConnectionFlight(
      isNextDay,
      index,
      this.state.SummaryProgram
    );
    let departure = setDateDeparture(this.state.Returns[0], SP);
    let newReturns = [departure, this.state.Returns[1]];
    this.setState({ SummaryProgram: SP, Returns: newReturns });
    this.props.setSummaryProgramAction(SP);
    this.props.setReturnsItineraryAction(newReturns);
    //this.props.dispatch(set_summary_program(SP));
    //this.props.dispatch(set_returns_itenerary(newReturns));
  };

  handleNextDay = (index, airport, type) => {
    let headline = {
      Departures: this.state.Departures,
      MainPrograms: this.state.SummaryProgram,
      Returns: this.state.Returns,
    };

    let newHeadline = helperNextDay(headline, index, airport, type);
    this.setState({
      Departures: newHeadline.Departures,
      SummaryProgram: newHeadline.MainPrograms,
      Returns: newHeadline.Returns,
    });
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.isTourOperator) {
      this.setState({ loading: false });
      // this.props.navigation.navigate('AddAdditionalService', {
      //   type: 'custom',
      // });
      this.props.navigation.navigate('TourOperatorList', { type: 'custom' });
      this.props.resetOperatorListAction();
      //this.props.dispatch(reset_operator_list());
      return false;
    } else if (nextProps.isTourOperator) {
      this.setState({ loading: false });
      Alert.alert('Failed', nextProps.tourOperatorListError, [{ text: 'OK' }]);
      this.props.resetOperatorListAction();
      //this.props.dispatch(reset_operator_list());
      return false;
    } else return true;
  }

  onChangeFlight = (text, i) => {
    let Supplements = [...this.state.SummaryProgram];
    Supplements[i].Ticket.FlightNumber = text;
    this.setState({
      SummaryProgram: Supplements,
    });
  };

  onChangeNote = (text, i) => {
    let Supplements = [...this.state.SummaryProgram];
    Supplements[i].Note = text;
    this.setState({
      SummaryProgram: Supplements,
    });
  };

  handleChangeFlightCode = (text, type) => {
    let newDeparture = this.state.Departures;
    let newReturns = this.state.Returns;

    if (type == 'departure') {
      newDeparture[0].Ticket.FlightNumber = text;
      newDeparture[1].Ticket.FlightNumber = text;
    } else {
      newReturns[0].Ticket.FlightNumber = text;
      newReturns[1].Ticket.FlightNumber = text;
    }

    this.setState({ Departures: newDeparture });
    this.setState({ Returns: newReturns });
  };

  handleChangeNote = (text, type, dateDepar, dateArr) => {
    let newDeparture = this.state.Departures;
    let newReturns = this.state.Returns;

    if (type == 'departure') {
      let findIndexDepar = newDeparture.findIndex(
        item => item.Date === dateDepar
      );
      let findIndexArr = newDeparture.findIndex(item => item.Date === dateArr);
      newDeparture[findIndexDepar].Note = text;
      newDeparture[findIndexArr].Note = text;
    } else {
      let findIndexDepar = newDeparture.findIndex(
        item => item.Date === dateDepar
      );
      let findIndexArr = newDeparture.findIndex(item => item.Date === dateArr);
      newReturns[findIndexDepar].Note = text;
      newReturns[findIndexArr].Note = text;
    }
    this.setState({
      Departures: newDeparture,
      SummaryProgram: this.state.SummaryProgram,
      Returns: newReturns,
    });
    this.props.setDeparturesItineraryAction(newDeparture);
    this.props.setSummaryProgramAction(this.state.SummaryProgram);
    this.props.setReturnsItineraryAction(newReturns);
  };

  handleLastArrivalDate = (airport, date) => {
    let newDate =
      convertToStringDate(changeTime(date)) + convertToStringTime(airport.Date);
    let newReturns = [this.state.Departures[0], airport];

    let headline = {
      Departures: this.state.Departures,
      MainPrograms: this.state.SummaryProgram,
      Returns: newReturns,
    };
    let arrivalTime = this.state.Departures[0].Date.substring(11, 16);
    let newHeadline = changeLastArrivalDate(newDate, headline, arrivalTime);
    this.setState({
      Departures: newHeadline.Departures,
      SummaryProgram: newHeadline.MainPrograms,
      Returns: newHeadline.Returns,
    });
    this.hideDateTimePicked();
  };

  handleLastArrivalTime = (airport, time) => {
    let newReturns = [airport, this.state.Departures[1]];

    let headline = {
      Departures: this.state.Departures,
      MainPrograms: this.state.SummaryProgram,
      Returns: newReturns,
    };
    let newHeadline = changeLastArrivalDate(airport.Date, headline, time);
    this.setState({
      Departures: newHeadline.Departures,
      SummaryProgram: newHeadline.MainPrograms,
      Returns: newHeadline.Returns,
    });
    this.hideDateTimePicked();
  };

  handleFirstDepartureTime = (airport, time) => {
    airport.Date = changeTimeNew(airport.Date, time);
    let newDepartures = [airport, this.state.Departures[1]];

    this.setState({
      Departures: newDepartures,
      SummaryProgram: this.state.SummaryProgram,
      Returns: this.state.Returns,
    });
    this.hideDateTimePicked();
  };

  handleFirstDepartureDate = (airport, date) => {
    let newDate =
      convertToStringDate(changeTime(date)) + convertToStringTime(airport.Date);
    let newDepartures = [airport, this.state.Departures[1]];

    let headline = {
      Departures: newDepartures,
      MainPrograms: this.state.SummaryProgram,
      Returns: this.state.Returns,
    };
    let arrivalTime = this.state.Departures[0].Date.substring(11, 16);
    let newHeadline = changeFirstDepartureDate(newDate, headline, arrivalTime);
    this.setState({
      Departures: newHeadline.Departures,
      SummaryProgram: newHeadline.MainPrograms,
      Returns: newHeadline.Returns,
    });
    this.hideDateTimePicked();
  };

  handleDepartureDate = (airport, type, date) => {
    let newDate =
      convertToStringDate(changeTime(date)) + convertToStringTime(airport.Date);
    let newDepartures = null;
    let newReturns = null;
    if (type == 'firstDeparture') {
      newDepartures = [airport, this.state.Departures[1]];
      newReturns = this.state.Returns;
    } else if (type == 'firstArrival') {
      newDepartures = [this.state.Departures[0], airport];
      newReturns = this.state.Returns;
    } else if (type == 'lastDeparture') {
      newDepartures = this.state.Departures;
      newReturns = [airport, this.state.Returns[1]];
    } else {
      newDepartures = this.state.Departures;
      newReturns = [this.state.Returns[0], airport];
    }

    let headline = {
      Departures: newDepartures,
      SummaryProgram: this.state.SummaryProgram,
      Returns: newReturns,
    };
    let arrivalTime = this.state.Departures[0].Date.substring(11, 16);
    let newHeadline = changeFirstDepartureDate(newDate, headline, arrivalTime);
    this.setState({
      Departures: newHeadline.Departures,
      SummaryProgram: newHeadline.MainPrograms,
      Returns: newHeadline.Returns,
    });
  };

  handleMultipleDestination = () => {
    this.setState({ loadingButton: true });
    let mainProgram = addLastDestinationSummaryProgram(
      this.state.Returns,
      this.state.SummaryProgram
    );
    let departure = setReturnsDate(
      [this.state.Returns[0], this.state.Returns[1]],
      mainProgram
    );
    let newReturns = [departure[0], departure[1]];
    this.setState({
      Returns: newReturns,
      SummaryProgram: [],
    });
    this.props.setSummaryProgramAction(mainProgram);
    this.props.setReturnsItineraryAction(newReturns);
    //this.props.dispatch(set_returns_itenerary(newReturns));
    //this.props.dispatch(set_summary_program(mainProgram));
    this.setState({ loadingButton: false });
  };

  handleSingleDestination = () => {
    this.setState({ loading: true });
    let headline = deleteLastDestinationSummaryProgram(
      this.state.SummaryProgram,
      this.state.Returns
    );
    this.setState({
      Returns: headline.Returns,
      SummaryProgram: [],
    });
    this.props.setSummaryProgramAction(headline.MainPrograms);
    this.props.setReturnsItineraryAction(headline.Returns);
    //this.props.dispatch(set_returns_itenerary(headline.Returns));
    //this.props.dispatch(set_summary_program(headline.MainPrograms));
    this.setState({
      loading: false,
    });
  };

  handleTicket = (
    indexDepar,
    indexArr,
    DeparturePlaceId,
    ArrivalPlaceId,
    DepartureCity,
    ArrivalCity,
    dateFindIndex
  ) => {
    const errorDeparture = this.validate(
      indexDepar === 'Arrival'
        ? 'Departures'
        : indexDepar == 'Departure'
        ? 'Returns'
        : ''
    );
    if (!errorDeparture) {
      let indexArrival = isNaN(indexDepar)
        ? indexArr
        : this.state.SummaryProgram.find((element, i) => {
            i > indexDepar ? (element.AccommodationSummary ? i : null) : null;
          });
      let findIndexData =
        indexDepar == 'Arrival'
          ? this.state.Departures.findIndex(item => item.Date === dateFindIndex)
          : indexDepar == 'Departure'
          ? this.state.Returns.findIndex(item => item.Date === dateFindIndex)
          : null;
      let oldHeadlineProgram = {
        Departures: this.state.Departures,
        MainPrograms: this.state.SummaryProgram,
        Returns: this.state.Returns,
      };
      this.props.navigation.navigate('General', {
        screen: 'ListAirlineTicket',
        params: {
          DeparturePlaceId: DeparturePlaceId,
          ArrivalPlaceId: ArrivalPlaceId,
          Qty:
            this.props.DetailCustom.GuestAllocation.Adult +
            this.props.DetailCustom.GuestAllocation.Child,
          DateTimeDeparture: viewDateStrip(this.state.Departures[0].Date),
          oldHeadlineProgram: oldHeadlineProgram,
          room: this.props.DetailCustom.RoomAllocation,
          indexAddListFlight: indexDepar,
          indexAddListFlightArr: indexArrival,
          DepartureCity: DepartureCity,
          ArrivalCity: ArrivalCity,
          findIndexData: findIndexData,
        },
      });
    }
  };

  handleDiscardTicket = (serviceItemId, isDeleteAllGroupTicket) => {
    this.setState({ loading: true });
    let headline = {
      Departures: this.state.Departures,
      MainPrograms: this.state.SummaryProgram,
      Returns: this.state.Returns,
    };
    let headlineProgram = deleteGroupTicket(
      headline,
      serviceItemId,
      isDeleteAllGroupTicket
    );
    this.props.setSummaryProgramAction(headlineProgram.MainPrograms);
    this.props.setReturnsItineraryAction(headlineProgram.Returns);
    this.props.setDeparturesItineraryAction(headlineProgram.Departures);
    //this.props.dispatch(set_departures_itenerary(headlineProgram.Departures));
    //this.props.dispatch(set_summary_program(headlineProgram.MainPrograms));
    //this.props.dispatch(set_returns_itenerary(headlineProgram.Returns));
    this.setState({ loading: false });
  };

  render() {
    const { Departures, SummaryProgram, Returns } = this.state;
    return (
      <Container>
        {/* <ModalBottom height="50%" visible={this.state.loading} isCenter={true}>
          <Text style={stylesGlobal.text14}>{this.state.textLoading}</Text>
          <AnimatedEllipsis />
        </ModalBottom> */}
        {this.state.loading ? (
          <Loading sizeloading="large" colorloading={styles.$goldcolor} />
        ) : null}

        <View style={styles.header}>
          <View style={styles.tabNavigation}>
            <NormalButton
              text="Cities/Date"
              textSize={14}
              buttonWidth="50%"
              buttonHeight={40}
              bold
              buttonColor="white"
              paddingBottomText={20}
              textColor={this.state.colorTextDate}
              radiusBorder={1}
              borderBottom={3}
              colorBorderBottom={this.state.colorTextDate}
              onPress={() => this.FocusedTab('date')}
            />
            <NormalButton
              text="Itinerary Detail"
              textSize={14}
              buttonWidth="50%"
              buttonHeight={40}
              bold
              buttonColor="white"
              borderBottom={3}
              paddingBottomText={20}
              radiusBorder={1}
              colorBorderBottom={this.state.colorTextItinerary}
              textColor={this.state.colorTextItinerary}
              onPress={() => this.FocusedTab('itinerary')}
            />
          </View>
        </View>
        {this.state.activeTab == 'date' ? (
          <ScrollView
            style={[
              stylesGlobal.containerScroll,
              styles.paddingTop20,
              styles.marginBottom60,
            ]}
            scrollEventThrottle={1}
            keyboardShouldPersistTaps="never"
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: { y: this.state.scrollY },
                },
              },
            ])}
          >
            <View style={styles.styleContainer}>
              {this.state.Departures != null
                ? this.state.Departures.length != 0
                  ? splitFlightTransit(this.state.Departures, 2).map(
                      (item, i) => {
                        return (
                          <CardFlight
                            disableDeparture={disableFlight(item[0])}
                            disableArrival={disableFlight(item[1])}
                            key={i}
                            serviceItemIdDep={
                              item[0].Ticket
                                ? item[0].Ticket.ServiceItemId
                                  ? item[0].Ticket.ServiceItemId
                                  : null
                                : null
                            }
                            serviceItemIdArr={
                              item[1].Ticket
                                ? item[1].Ticket.ServiceItemId
                                  ? item[1].Ticket.ServiceItemId
                                  : null
                                : null
                            }
                            PNRCodeDeparture={
                              item[0].Ticket
                                ? item[0].Ticket.PNR
                                  ? item[0].Ticket.PNR
                                  : null
                                : null
                            }
                            PNRCodeArrival={
                              item[1].Ticket
                                ? item[1].Ticket.PNR
                                  ? item[1].Ticket.PNR
                                  : null
                                : null
                            }
                            isChangeButton={
                              i == 0
                                ? item[0].Ticket
                                  ? item[0].Ticket.ServiceItemId
                                    ? getAirlineTicketFirstIndex(
                                        {
                                          Departures: this.state.Departures,
                                          MainPrograms: this.state
                                            .SummaryProgram,
                                          Returns: this.state.Returns,
                                        },
                                        item[0].Ticket
                                          ? item[0].Ticket.ServiceItemId
                                            ? item[0].Ticket.ServiceItemId
                                            : null
                                          : null
                                      ).type == 'Departures' &&
                                      getAirlineTicketFirstIndex(
                                        {
                                          Departures: this.state.Departures,
                                          MainPrograms: this.state
                                            .SummaryProgram,
                                          Returns: this.state.Returns,
                                        },
                                        item[0].Ticket
                                          ? item[0].Ticket.ServiceItemId
                                            ? item[0].Ticket.ServiceItemId
                                            : null
                                          : null
                                      ).index == 0
                                      ? true
                                      : false
                                    : false
                                  : false
                                : false
                            }
                            isFirstFlight={true}
                            isFlight={
                              i == 0
                                ? this.props.DetailCustom.GroupCapacity ===
                                  'LARGE'
                                  ? true
                                  : false
                                : false
                            }
                            onPressDiscardTicket={() =>
                              this.handleDiscardTicket(
                                item[0].Ticket
                                  ? item[0].Ticket.ServiceItemId
                                    ? item[0].Ticket.ServiceItemId
                                    : null
                                  : null,
                                false
                              )
                            }
                            onPressTicket={() =>
                              this.handleTicket(
                                'Arrival',
                                null,
                                item[0].PlaceId,
                                item[1].PlaceId,
                                item[0].City ? item[0].City.Name : null,
                                item[1].City ? item[1].City.Name : null,
                                item[0].Date
                              )
                            }
                            checkedArrival={item[1].NextDay}
                            onPressCheckArrival={() =>
                              this.handleNextDay(1, item[1], 'firstArrival')
                            }
                            isShowCheckArrival={true}
                            departure={item[0].Place}
                            arrival={item[1].Place}
                            departureDate={viewDateSlash(item[0].Date)}
                            departureTime={viewTime(item[0].Date)}
                            arrivalDate={viewDateSlash(
                              item[1] ? item[1].Date : new Date()
                            )}
                            arrivalTime={viewTime(
                              item[1] ? item[1].Date : new Date()
                            )}
                            flightCode={
                              item[1] ? item[1].Ticket.FlightNumber : ''
                            }
                            onPressDeparture={() =>
                              this.handleAirport(
                                item[0],
                                null,
                                'firstDeparture'
                              )
                            }
                            onPressArrival={() =>
                              this.handleAirport(item[1], null, 'firstArrival')
                            }
                            onPickDepartureDate={date => {
                              this.handleFirstDepartureDate(item[0], date);
                            }}
                            onPickDepartureTime={time => {
                              this.handleChangeTimeAirport(
                                item[0],
                                time,
                                'firstDeparture'
                              );
                            }}
                            onPressDepartureDate={() =>
                              this.setState({
                                isDateDepDeparturePickerVisible: true,
                              })
                            }
                            isDatePickerDeparture={
                              this.state.isDateDepDeparturePickerVisible
                            }
                            onPressDepartureTime={() =>
                              this.setState({
                                isTimeDepDeparturePickerVisible: true,
                              })
                            }
                            isTimePickerDeparture={
                              this.state.isTimeDepDeparturePickerVisible
                            }
                            onPressArrivalTime={() =>
                              this.setState({
                                isTimeDepArrivalPickerVisible: true,
                              })
                            }
                            isTimePickerArrival={
                              this.state.isTimeDepArrivalPickerVisible
                            }
                            onPickArrivalTime={time => {
                              this.handleChangeTimeAirport(
                                item[1],
                                time,
                                'firstArrival'
                              );
                            }}
                            onChangeFlightCode={text =>
                              this.handleChangeFlightCode(text, 'departure')
                            }
                            onChangeNote={text => {
                              this.handleChangeNote(
                                text,
                                'departure',
                                item[0].Date,
                                item[1].Date
                              );
                            }}
                            hideDateTimePicked={this.hideDateTimePicked}
                          />
                        );
                      }
                    )
                  : null
                : null}
              {this.state.SummaryProgram
                ? this.state.SummaryProgram.length != 0
                  ? this.state.SummaryProgram.map((SP, i) => {
                      let nextSP = this.state.SummaryProgram[i + 1];
                      let isFlightSP =
                        this.state.arrayIndexFlightTicketSP.length != 0
                          ? !this.state.arrayIndexFlightTicketSP.find(e => {
                              if (e.idxFrom < i && i <= e.idxTo) return true;
                              else return false;
                            })
                          : true;
                      if (
                        SP.AccommodationSummary == undefined &&
                        nextSP.AccommodationSummary == undefined
                      ) {
                        return (
                          <CardFlight
                            onPressDiscardTicket={() =>
                              this.handleDiscardTicket(
                                SP.Ticket
                                  ? SP.Ticket.ServiceItemId
                                    ? SP.Ticket.ServiceItemId
                                    : null
                                  : null,
                                false
                              )
                            }
                            serviceItemIdDep={
                              SP.Ticket
                                ? SP.Ticket.ServiceItemId
                                  ? SP.Ticket.ServiceItemId
                                  : null
                                : null
                            }
                            serviceItemIdArr={
                              SP.Ticket
                                ? SP.Ticket.ServiceItemId
                                  ? SP.Ticket.ServiceItemId
                                  : null
                                : null
                            }
                            PNRCodeDeparture={
                              SP.Ticket
                                ? SP.Ticket.PNR
                                  ? SP.Ticket.PNR
                                  : null
                                : null
                            }
                            PNRCodeArrival={
                              SP.Ticket
                                ? SP.Ticket.PNR
                                  ? SP.Ticket.PNR
                                  : null
                                : null
                            }
                            isChangeButton={
                              SP.Ticket
                                ? SP.Ticket.ServiceItemId
                                  ? getAirlineTicketFirstIndex(
                                      {
                                        Departures: this.state.Departures,
                                        MainPrograms: this.state.SummaryProgram,
                                        Returns: this.state.Returns,
                                      },
                                      SP.Ticket
                                        ? SP.Ticket.ServiceItemId
                                          ? SP.Ticket.ServiceItemId
                                          : null
                                        : null
                                    ).type == 'MainPrograms' &&
                                    getAirlineTicketFirstIndex(
                                      {
                                        Departures: this.state.Departures,
                                        MainPrograms: this.state.SummaryProgram,
                                        Returns: this.state.Returns,
                                      },
                                      SP.Ticket
                                        ? SP.Ticket.ServiceItemId
                                          ? SP.Ticket.ServiceItemId
                                          : null
                                        : null
                                    ).index == 0
                                    ? true
                                    : false
                                  : false
                                : false
                            }
                            isBtnMultiple={showButtonMultipleSP(
                              this.state.SummaryProgram,
                              i
                            )}
                            onPressMultipleDestination={() =>
                              this.handleNewAccommodation(i, 'groupTicket')
                            }
                            //departure
                            onPressDeparture={() =>
                              this.handleAirport(this.state.SummaryProgram, i)
                            }
                            departureDate={viewDateSlash(SP.Date)}
                            departureTime={viewTime(SP.Date)}
                            departure={SP.Place}
                            isTimePickerDeparture={
                              this.state.isTimeDepConPickerVisible
                            }
                            onPickDepartureTime={time => {
                              this.handleTimeConnectionFlight(i, time);
                            }}
                            onPressDepartureTime={() => {
                              this.setState({
                                isTimeDepConPickerVisible: true,
                              });
                            }}
                            checkedDeparture={SP.NextDay}
                            onPressCheckDeparture={() =>
                              this.handleNextDayFlight(SP.NextDay, i)
                            }
                            isShowCheckDeparture={nextSP.NextDay ? false : true}
                            //arrival
                            onPressArrival={() =>
                              this.handleAirport(
                                this.state.SummaryProgram,
                                i + 1
                              )
                            }
                            arrivalDate={viewDateSlash(nextSP.Date)}
                            arrivalTime={viewTime(nextSP.Date)}
                            arrival={nextSP.Place}
                            //time
                            onPickArrivalTime={time => {
                              this.handleTimeConnectionFlight(i + 1, time);
                            }}
                            isTimePickerArrival={
                              this.state.isTimeArrConPickerVisible
                            }
                            onPressArrivalTime={() => {
                              this.setState({
                                isTimeArrConPickerVisible: true,
                              });
                            }}
                            minDate={nextSP.Date}
                            checkedArrival={nextSP.NextDay}
                            onPressCheckArrival={() =>
                              this.handleNextDayFlight(nextSP.NextDay, i)
                            }
                            isShowCheckArrival={SP.NextDay ? false : true}
                            flightCode={SP.Ticket.FlightNumber}
                            onChangeFlightCode={text =>
                              this.onChangeFlight(text, i)
                            }
                            note={SP.Note}
                            onChangeNote={text => this.onChangeNote(text, i)}
                            hideDateTimePicked={this.hideDateTimePicked}
                            isLoadingButton={this.state.loadingButton}
                            onPressaddMoreDestination={() =>
                              this.handleNewAccommodation(i)
                            }
                            isBtnDestination={showButtonAddDestination(
                              this.state.SummaryProgram,
                              i
                            )}
                            onPressDeleteConnection={() =>
                              this.delConnecFlight(i)
                            }
                            isFlight={
                              this.props.DetailCustom.GroupCapacity === 'LARGE'
                                ? isFlightSP
                                : false
                            }
                            onPressTicket={() =>
                              this.handleTicket(
                                i,
                                null,
                                SP.PlaceId,
                                this.state.SummaryProgram[i + 1].PlaceId,
                                SP.City.Name,
                                this.state.SummaryProgram[i + 1].City.Name,
                                i
                              )
                            }
                          />
                        );
                      } else if (SP.AccommodationSummary != undefined) {
                        return (
                          <CardAccommodation
                            isChangeDuration={durationButtonDisable(i, {
                              Departures: this.state.Departures,
                              MainPrograms: this.state.SummaryProgram,
                              Returns: this.state.Returns,
                            })}
                            disableCity={
                              i != this.state.SummaryProgram.length - 1 &&
                              this.state.SummaryProgram[i + 1].Ticket
                                ? this.state.SummaryProgram[i + 1].Ticket
                                    .ServiceItemId
                                  ? true
                                  : false
                                : false
                            }
                            isLoadingButton={this.state.loadingButton}
                            onPressaddMoreDestination={() =>
                              this.handleNewAccommodation(i)
                            }
                            onPressCityDestination={() =>
                              this.confirmChangeDestination(i, SP.City)
                            }
                            onPressAccommodation={() =>
                              this.handleListAccomodation(i)
                            }
                            isBtnDestination={showButtonAddDestinationSP(
                              this.state.SummaryProgram,
                              i
                            )}
                            key={i}
                            index={i}
                            deleteAccomodation={() =>
                              this.confirmAlertDelete(i)
                            }
                            stayDuration={SP.TotalDays}
                            onChangeDuration={text => {
                              if (isNaN(parseInt(text))) text = SP.TotalDays;
                              this.handleChangeDuration(text, i);
                            }}
                            decrement={() => {
                              if (this.state.SummaryProgram[i].TotalDays != 1)
                                this.handleChangeDuration(
                                  this.state.SummaryProgram[i].TotalDays - 1,
                                  i
                                );
                            }}
                            increment={() =>
                              this.handleChangeDuration(
                                this.state.SummaryProgram[i].TotalDays + 1,
                                i
                              )
                            }
                            destination={SP.City ? SP.City.Name : null}
                            accommodation={SP.AccommodationSummary.Name}
                            checkInDate={viewDateSlash(
                              SP.AccommodationSummary.CheckIn
                            )}
                            checkInTime={viewTime(
                              SP.AccommodationSummary.CheckIn
                            )}
                            checkOutDate={viewDateSlash(
                              SP.AccommodationSummary.CheckOut
                            )}
                            checkOutTime={viewTime(
                              SP.AccommodationSummary.CheckOut
                            )}
                            onPressCheckInDate={() => this.onPressDateIn(i)}
                            onPressCheckOutTime={() => this.onPressTimeOut(i)}
                            onPressCheckInTime={() => this.onPressTime(i)}
                            isDateTimePickerVisible={
                              this.state.isDateInPickerVisible[i]
                            }
                            isTimePickerVisible={
                              this.state.isTimeInPickerVisible[i]
                            }
                            isTimeOutPickerVisible={
                              this.state.isTimeOutPickerVisible[i]
                            }
                            handleTimePicked={time => {
                              this.handleTimeSP(i, time);
                            }}
                            handleDatePicked={date => {
                              this.handleDateSP(i, date);
                            }}
                            hideDateTimePicked={this.hideDateTimePicked}
                            minDate={
                              i == 0
                                ? this.state.Departures[1].Date
                                : this.state.SummaryProgram[i - 1]
                                    .AccommodationSummary != undefined
                                ? this.state.SummaryProgram[i - 1].LeavingDate
                                : this.state.SummaryProgram[i - 1].Date
                            }
                            maxDate={
                              i == 0
                                ? SumDays(this.state.Departures[1].Date, 1)
                                : this.state.SummaryProgram[i - 1]
                                    .AccommodationSummary != undefined
                                ? SumDays(
                                    this.state.SummaryProgram[i - 1]
                                      .LeavingDate,
                                    1
                                  )
                                : SumDays(
                                    this.state.SummaryProgram[i - 1].Date,
                                    1
                                  )
                            }
                            isConnection={
                              i != 0
                                ? SP.AccommodationSummary != undefined &&
                                  this.state.SummaryProgram[i - 1]
                                    .AccommodationSummary != undefined
                                  ? SP.Region !=
                                    this.state.SummaryProgram[i - 1].Region
                                    ? true
                                    : false
                                  : false
                                : false
                            }
                            addConnectionFlight={() =>
                              this.addConnecFlight(this.state.SummaryProgram, i)
                            }
                          />
                        );
                      }
                    })
                  : null
                : null}
              {showBtnAddMultipleLast({
                MainPrograms: this.state.SummaryProgram,
                Returns: this.state.Returns,
              }) ? (
                <View style={[styles.rowNoPadding, styles.paddingVertical20]}>
                  <NormalButton
                    isLoading={this.state.loadingButton}
                    text="+ ADD MULTIPLE DESTINATION"
                    buttonWidth="100%"
                    buttonHeight={40}
                    bold
                    buttonColor={styles.$goldcolor}
                    textColor="black"
                    onPress={() => this.addMoreDestination()}
                  />
                </View>
              ) : null}

              {this.state.Returns != null
                ? splitFlightTransit(this.state.Returns, 2).map((item, i) => {
                    return (
                      <CardFlight
                        // isBtnMultiple={
                        //   this.state.Returns[0].Ticket.ServiceItemId
                        //     ? true
                        //     : false
                        // }
                        isBtnMultiple={false}
                        onPressMultipleDestination={() =>
                          this.handleNewAccommodation(
                            this.state.SummaryProgram.length - 1,
                            'groupTicket'
                          )
                        }
                        key={i}
                        onPressDiscardTicket={() =>
                          this.handleDiscardTicket(
                            item[0].Ticket
                              ? item[0].Ticket.ServiceItemId
                                ? item[0].Ticket.ServiceItemId
                                : null
                              : null,
                            false
                          )
                        }
                        serviceItemIdDep={
                          item[0].Ticket
                            ? item[0].Ticket.ServiceItemId
                              ? item[0].Ticket.ServiceItemId
                              : null
                            : null
                        }
                        serviceItemIdArr={
                          item[1].Ticket
                            ? item[1].Ticket.ServiceItemId
                              ? item[1].Ticket.ServiceItemId
                              : null
                            : null
                        }
                        PNRCodeDeparture={
                          item[0].Ticket
                            ? item[0].Ticket.PNR
                              ? item[0].Ticket.PNR
                              : null
                            : null
                        }
                        PNRCodeArrival={
                          item[1].Ticket
                            ? item[1].Ticket.PNR
                              ? item[1].Ticket.PNR
                              : null
                            : null
                        }
                        isChangeButton={
                          i == 0
                            ? item[0].Ticket
                              ? item[0].Ticket.ServiceItemId
                                ? getAirlineTicketFirstIndex(
                                    {
                                      Departures: this.state.Departures,
                                      MainPrograms: this.state.SummaryProgram,
                                      Returns: this.state.Returns,
                                    },
                                    item[0].Ticket
                                      ? item[0].Ticket.ServiceItemId
                                        ? item[0].Ticket.ServiceItemId
                                        : null
                                      : null
                                  ).type == 'Returns' &&
                                  getAirlineTicketFirstIndex(
                                    {
                                      Departures: this.state.Departures,
                                      MainPrograms: this.state.SummaryProgram,
                                      Returns: this.state.Returns,
                                    },
                                    item[0].Ticket
                                      ? item[0].Ticket.ServiceItemId
                                        ? item[0].Ticket.ServiceItemId
                                        : null
                                      : null
                                  ).index == 0
                                  ? true
                                  : false
                                : false
                              : false
                            : false
                        }
                        isLastFlight={true}
                        isFlight={
                          this.props.DetailCustom.GroupCapacity === 'LARGE'
                            ? true
                            : false
                        }
                        onPressTicket={() =>
                          this.handleTicket(
                            'Departure',
                            null,
                            item[0].PlaceId,
                            item[1].PlaceId,
                            item[0].City ? item[0].City.Name : null,
                            item[1].City ? item[1].City.Name : null,
                            item[0].Date
                          )
                        }
                        checkedDeparture={
                          this.state.Returns ? item[0].NextDay : false
                        }
                        checkedArrival={
                          this.state.Returns ? item[1].NextDay : false
                        }
                        onPressCheckDeparture={() =>
                          this.handleNextDay(0, item[0], 'lastDeparture')
                        }
                        onPressCheckArrival={() =>
                          this.handleNextDay(1, item[1], 'lastArrival')
                        }
                        isShowCheckDeparture={true}
                        isShowCheckArrival={true}
                        departure={item[0].Place}
                        arrival={item[1].Place}
                        departureDate={viewDateSlash(item[0].Date)}
                        departureTime={viewTime(item[0].Date)}
                        arrivalDate={viewDateSlash(
                          item[1] ? item[1].Date : item[0].Date
                        )}
                        arrivalTime={viewTime(
                          item[1]
                            ? item[1].Date
                            : addsubtractTimeHours(item[0].Date, 2, 'add')
                        )}
                        flightCode={
                          item[this.state.Returns.length - 1]
                            ? item[this.state.Returns.length - 1].Ticket
                                .FlightNumber
                            : ''
                        }
                        onPressDeparture={() =>
                          this.handleAirport(item[0], null, 'lastDeparture')
                        }
                        onPressArrival={() =>
                          this.handleAirport(
                            item[this.state.Returns.length - 1],
                            null,
                            'lastArrival'
                          )
                        }
                        onPickArrivalDate={date =>
                          this.handleLastArrivalDate(
                            item[this.state.Returns.length - 1],
                            date
                          )
                        }
                        onPickArrivalTime={time =>
                          this.handleChangeTimeAirport(
                            item[this.state.Returns.length - 1],
                            time,
                            'lastArrival'
                          )
                        }
                        onPickDepartureTime={time =>
                          this.handleChangeTimeAirport(
                            item[0],
                            time,
                            'lastDeparture'
                          )
                        }
                        onPressArrivalDate={() =>
                          this.setState({
                            isDateRetArrivalPickerVisible: true,
                          })
                        }
                        onPressArrivalTime={() =>
                          this.setState({
                            isTimeRetArrivalPickerVisible: true,
                          })
                        }
                        onPressDepartureTime={() =>
                          this.setState({
                            isTimeRetDeparturePickerVisible: true,
                          })
                        }
                        isDatePickerArrival={
                          this.state.isDateRetArrivalPickerVisible
                        }
                        isTimePickerArrival={
                          this.state.isTimeRetArrivalPickerVisible
                        }
                        isTimePickerDeparture={
                          this.state.isTimeRetDeparturePickerVisible
                        }
                        onChangeFlightCode={text =>
                          this.handleChangeFlightCode(text, 'returns')
                        }
                        onChangeNote={text => {
                          this.handleChangeNote(
                            text,
                            'returns',
                            item[0].Date,
                            item[1].Date
                          );
                        }}
                        hideDateTimePicked={this.hideDateTimePicked}
                      />
                    );
                  })
                : null}
            </View>
          </ScrollView>
        ) : (
          <ScrollView
            style={[stylesGlobal.containerScroll, styles.paddingTop20]}
            scrollEventThrottle={16}
            keyboardShouldPersistTaps="never"
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: {
                    y: this.state.scrollY,
                  },
                },
              },
            ])}
          >
            <Container>
              {this.props.DailyProgram.map((obj, i) => {
                return (
                  <CardMedia
                    type="itinerary"
                    title={obj.TourDestinations.map(e =>
                      this.props.cityList
                        ? findName(this.props.cityList, e.Destination)
                        : e.Destination
                    ).join(', ')}
                    day={'Day ' + obj.Day}
                    subtitle={viewDate(obj.Date)}
                    namabutton="SEE DETAIL"
                    warnabutton={styles.$goldcolor}
                    textbuttoncolor="white"
                    onPress={() => this.handleTourSchedule(i, obj.Date)}
                    key={i}
                  />
                );
              })}
              {this.props.DailyProgram.length == 3 ? (
                <View style={styles.cardhidden} />
              ) : null}

              <View
                style={[stylesGlobal.marginBottom80, stylesGlobal.width100]}
              />
            </Container>
          </ScrollView>
        )}
        <TouchableOpacity
          style={styles.footerFilter}
          onPress={this.handlePressTourList}
        >
          <LinearGradient
            colors={[styles.$goldcolor, styles.$goldlightcolor]}
            style={styles.footerFilter}
            start={[0, 0]}
            end={[1, 0]}
          >
            <NormalButton
              textSize={17}
              text="NEXT"
              buttonWidth="100%"
              buttonHeight="100%"
              textColor="#252525"
              buttonColor="transparent"
              onPress={this.handlePressTourList}
            />
          </LinearGradient>
        </TouchableOpacity>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  Returns: state.transactionReducer.Returns,
  Departures: state.transactionReducer.Departures,
  SummaryProgram: state.transactionReducer.SummaryProgram,
  ReturnsStatus: state.transactionReducer.ReturnsStatus,
  DeparturesStatus: state.transactionReducer.DeparturesStatus,
  SummaryProgramStatus: state.transactionReducer.SummaryProgramStatus,
  MovementList: state.generalReducer.allMovementTypes,
  isMovementMode: state.generalReducer.isMovementMode,
  oldDailyProgram: state.transactionReducer.DailyProgram,
  //   token: state.userAuthReducer.token,
  DailyProgram: state.transactionReducer.DailyProgram,
  DetailCustom: state.transactionReducer.CustomDetails,
  isTourOperator: state.operatorReducer.isTourOperator,
  tourOperatorListError: state.operatorReducer.errors,
  airport: state.transportationReducer.airport,
  listAirport: state.transportationReducer.listAirport,
  listAirportByRegion: state.transportationReducer.listAirportByRegion,
  driving: state.transportationReducer.driving,
  cityList: state.generalReducer.cityInCountry,
  getAirportData: state.transportationReducer.getAirportData,
  getDuration: state.transportationReducer.getDuration,
  // tourOperatorListError: state.operatorReducer.tourOperatorListError,
  //   airport: state.itemIteneraryReducer.airport,
  //   driving: state.itemIteneraryReducer.driving,
  //   cityList: state.generalReducer.cityInCountry
});

export default connect(mapStateToProps, {
  setSummaryProgramAction,
  setDeparturesItineraryAction,
  setReturnsItineraryAction,
  setDailyProgramAction,
  resetReturnsItineraryAction,
  resetDeparturesItineraryAction,
  resetSummaryProgramAction,
  getAllMovementTypesAction,
  resetAccommodationProfileAction,
  setDrivingAction,
  setAirportAction,
  getDurationAction,
  getAirportAction,
  getOperatorListAction,
  resetOperatorListAction,
  getCityInCountryAction,
})(AccommodationSummary);
