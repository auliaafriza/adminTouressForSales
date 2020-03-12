import React, { Component } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Container } from "../../../../../components/container";
import { NormalButton } from "../../../../../components/button";
import stylesGlobal from "../../../../../components/styles";
import styles from "./styles";
import CardDetailTicket from "./components/CardDetailTicket";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  isAllowedAddTicket,
  findRegionForGetPlaces
} from "./services/airlineTicket";
import {
  convertToStringDate,
  viewTime,
  getNumberOfSecond,
  changeSecondToHourString
} from "../../../../../helper/timeHelper";
import {
  convertDataListFlight,
  convertDataListGroupTicketToDeparArr,
  autoMultiDestionationAfterAddGroupTicket
} from "../../../../../helper/groupTicketing";
// import {
//   set_summary_program,
//   set_departures_itenerary,
//   set_returns_itenerary,
import {
  setSummaryProgramAction,
  setDeparturesItineraryAction,
  setReturnsItineraryAction
} from "../../../../../actions/Transactions/TransactionAction";
import { timeDuration } from "../../../../../helper/moment";
import {
  getObjectAirport,
  setObjectAirport
} from "../../../../../helper/dailyProgram";
import {
  setAirportAction,
  getAirportAction
} from "../../../../../actions/transportation/transportationAction";
// import { getAirport } from '../../api/itemItenerarySaga';
class DetailAirlineTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Detail: this.props.route.params.DataTicket,
      oldHeadlineProgram: this.props.route.params.oldHeadlineProgram,
      room: this.props.route.params.room,
      indexAddListFlight: this.props.route.params.indexAddListFlight,
      indexAddListFlightArr: this.props.route.params.indexAddListFlightArr,
      loading: false,
      findIndexData: this.props.route.params.findIndexData
    };
  }

  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    listTicket: PropTypes.object,
    isListTicket: PropTypes.string,
    cityInCountry: PropTypes.array,
    airport: PropTypes.array,
    token: PropTypes.string
  };

  generateMultiAfterAddGroupTicket = headline => {
    let { airport } = this.props;
    let headlineAfterAddMulti = autoMultiDestionationAfterAddGroupTicket(
      headline,
      airport,
      this.props.cityInCountry
    );
    this.props.setSummaryProgramAction(headlineAfterAddMulti.MainPrograms);
    this.props.setDeparturesItineraryAction(headlineAfterAddMulti.Departures);
    this.props.setReturnsItineraryAction(headlineAfterAddMulti.Returns);
    // this.props.dispatch(
    //   set_summary_program(headlineAfterAddMulti.MainPrograms)
    // );
    // this.props.dispatch(
    //   set_departures_itenerary(headlineAfterAddMulti.Departures)
    // );
    // this.props.dispatch(set_returns_itenerary(headlineAfterAddMulti.Returns));
  };

  getAirports = async region => {
    let airport = await getObjectAirport(this.props.airport, region);
    if (airport == null) {
      airport = await this.props.getAirportAction(region); //getAirport(this.props.token, region);
      if (airport.length > 0) {
        this.props.setAirportAction(
          setObjectAirport(this.props.airport, region, airport)
        );
        // this.props.dispatch(
        //   await set_airport(
        //     await setObjectAirport(this.props.airport, region, airport)
        //   )
        // );
      }
    }
    return airport;
  };

  getPlaceFromGroupTicket = (detailGroupTicket, headlineProgram) => {
    let { airport } = this.props;
    let listRegion = findRegionForGetPlaces(detailGroupTicket, airport);
    let listHitApi = [];
    listRegion.map(async e => {
      listHitApi.push(this.getAirports(e));
      return e;
    });
    Promise.all(listHitApi).then(() =>
      this.generateMultiAfterAddGroupTicket(headlineProgram)
    );
  };

  handlePickTicket = async data => {
    let headlineProgram = this.state.oldHeadlineProgram;
    let dataFlight = convertDataListFlight(data);
    let type =
      this.state.indexAddListFlight == "Arrival"
        ? "Departures"
        : this.state.indexAddListFlight == " Departure"
        ? "Returns"
        : "MainPrograms";

    if (
      isAllowedAddTicket(
        headlineProgram,
        this.state.findIndexData,
        type,
        dataFlight
      )
    ) {
      headlineProgram = convertDataListGroupTicketToDeparArr(
        dataFlight,
        this.state.room,
        this.state.oldHeadlineProgram,
        this.state.indexAddListFlight,
        this.state.indexAddListFlightArr,
        this.props.cityInCountry
      );
      this.props.setSummaryProgramAction(headlineProgram.MainPrograms);
      this.props.setDeparturesItineraryAction(headlineProgram.Departures);
      this.props.setReturnsItineraryAction(headlineProgram.Returns);

      // this.props.dispatch(set_summary_program(headlineProgram.MainPrograms));
      // this.props.dispatch(set_departures_itenerary(headlineProgram.Departures));
      // this.props.dispatch(set_returns_itenerary(headlineProgram.Returns));
      await this.getPlaceFromGroupTicket(data, headlineProgram);
      this.props.navigation.pop();
      this.props.navigation.pop();
    } else {
      Alert.alert("Sorry", "Date your group ticket is overlapping", [
        {
          text: "OK"
        }
      ]);
    }
  };

  render() {
    return (
      <Container>
        <ScrollView style={stylesGlobal.containerScroll}>
          <Container paddingbottomcontainer={120} paddingtopcontainer={50}>
            {this.state.Detail
              ? this.state.Detail.ScheduleItems.map((item, i) => {
                  return item.Connection ? (
                    item.Connection.map((itemcon, idxcon) => {
                      return (
                        <View
                          key={idxcon}
                          style={[
                            stylesGlobal.center,
                            stylesGlobal.width100,
                            stylesGlobal.marginBottom20
                          ]}
                        >
                          {idxcon == 0 ? (
                            <View style={stylesGlobal.width90}>
                              <Text style={stylesGlobal.marginBottom20}>
                                Flight from{" "}
                                <Text style={stylesGlobal.textBold}>
                                  {itemcon.DeparturePlace.City.Name}{" "}
                                  {itemcon.DeparturePlace.Code}
                                </Text>{" "}
                                to{" "}
                                <Text style={stylesGlobal.textBold}>
                                  {itemcon.ArrivalPlace.City.Name}{" "}
                                  {itemcon.ArrivalPlace.Code}
                                </Text>
                              </Text>
                            </View>
                          ) : null}
                          <CardDetailTicket
                            airlineName={this.state.Detail.AirlineName}
                            logoImage={
                              this.state.Detail.AirlineProfileLogoUrl
                                ? this.state.Detail.AirlineProfileLogoUrl
                                : null
                            }
                            flightCode={itemcon.FlightCode}
                            seatClass={itemcon.SeatClass}
                            departureCity={itemcon.DeparturePlace.City.Name}
                            departurePlaceName={itemcon.DeparturePlace.Name}
                            departurePlaceCode={itemcon.DeparturePlace.Code}
                            departureDate={convertToStringDate(
                              itemcon.DepartureDate
                            )}
                            departureTime={viewTime(itemcon.DepartureDate)}
                            arrivalCity={itemcon.ArrivalPlace.City.Name}
                            arrivalPlaceName={itemcon.ArrivalPlace.Name}
                            arrivalPlaceCode={itemcon.ArrivalPlace.Code}
                            arrivalDate={convertToStringDate(
                              itemcon.ArrivalDate
                            )}
                            arrivalTime={viewTime(itemcon.ArrivalDate)}
                            duration={timeDuration(
                              Math.abs(itemcon.Duration.Value)
                            )}
                            transitDuration={
                              idxcon != item.Connection.length - 1
                                ? changeSecondToHourString(
                                    getNumberOfSecond(
                                      itemcon.ArrivalDate,
                                      item.Connection[idxcon + 1].DepartureDate
                                    )
                                  )
                                : ""
                            }
                          />
                          {idxcon != item.Connection.length - 1 ? (
                            getNumberOfSecond(
                              itemcon.ArrivalDate,
                              item.Connection[idxcon + 1].DepartureDate
                            ) > 14400 && itemcon.IsAllowedActivity ? (
                              <View
                                style={[
                                  styles.cardInfo,
                                  stylesGlobal.width90,
                                  styles.backgroundInfo
                                ]}
                              >
                                <Text>
                                  Transit more than 4 hours, you can add more
                                  activity here
                                </Text>
                              </View>
                            ) : null
                          ) : null}
                        </View>
                      );
                    })
                  ) : (
                    <View
                      key={i}
                      style={[stylesGlobal.center, stylesGlobal.width100]}
                    >
                      <View style={stylesGlobal.width90}>
                        <Text style={stylesGlobal.marginBottom20}>
                          Flight from{" "}
                          <Text style={stylesGlobal.textBold}>
                            {item.DeparturePlace.City.Name}{" "}
                            {item.DeparturePlace.Code}
                          </Text>{" "}
                          to{" "}
                          <Text style={stylesGlobal.textBold}>
                            {item.ArrivalPlace.City.Name}{" "}
                            {item.ArrivalPlace.Code}
                          </Text>
                        </Text>
                      </View>
                      <CardDetailTicket
                        airlineName={this.state.Detail.AirlineName}
                        logoImage={this.state.Detail.AirlineProfileLogoUrl}
                        flightCode={item.FlightCode}
                        seatClass={item.SeatClass}
                        departureCity={item.DeparturePlace.City.Name}
                        departurePlaceName={item.DeparturePlace.Name}
                        departurePlaceCode={item.DeparturePlace.Code}
                        departureDate={convertToStringDate(item.DepartureDate)}
                        departureTime={viewTime(item.DepartureDate)}
                        arrivalCity={item.ArrivalPlace.City.Name}
                        arrivalPlaceName={item.ArrivalPlace.Name}
                        arrivalPlaceCode={item.ArrivalPlace.Code}
                        arrivalDate={convertToStringDate(item.ArrivalDate)}
                        arrivalTime={viewTime(item.ArrivalDate)}
                        duration={timeDuration(Math.abs(item.Duration.Value))}
                      />
                    </View>
                  );
                })
              : null}
          </Container>
        </ScrollView>
        <TouchableOpacity
          style={styles.footer}
          onPress={this.handleAccomodation}
        >
          <LinearGradient
            colors={[stylesGlobal.$goldColor, styles.$goldlightcolor]}
            style={styles.footer}
            start={[0, 0]}
            end={[1, 0]}
          >
            <NormalButton
              textSize={17}
              text="NEXT"
              buttonWidth="100%"
              textColor="#252525"
              buttonColor="transparent"
              onPress={() => this.handlePickTicket(this.state.Detail)}
            />
          </LinearGradient>
        </TouchableOpacity>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  listTicket: state.airlineTicketReducer.listTicket,
  isListTicket: state.airlineTicketReducer.isListTicket,
  cityInCountry: state.generalReducer.cityInCountry,
  airport: state.itemIteneraryReducer.airport,
  token: state.userAuthReducer.token
});

export default connect(mapStateToProps, {
  setSummaryProgramAction,
  setDeparturesItineraryAction,
  setReturnsItineraryAction,
  setAirportAction,
  getAirportAction
})(DetailAirlineTicket);
