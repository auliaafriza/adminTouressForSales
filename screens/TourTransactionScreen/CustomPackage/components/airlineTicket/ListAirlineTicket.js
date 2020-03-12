import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { Container } from "../../../../../components/container";
import stylesGlobal from "../../../../../components/styles";
import CardTicket from "./components/CardTicket";
import PropTypes from "prop-types";

//action
// import {
//   get_list_ticket,
//   reset_list_ticket,
// } from '../../actions/airlineTicketAction';

//helper
import { initialListFlight } from "./services/airlineTicket";
import { viewDateString, viewTime } from "../../../../../helper/timeHelper";
import { RoundedLoading } from "../../../../../components/loading";
import dummy from "./dataDummyList";
const width90 =
  Dimensions.get("window").width - Dimensions.get("window").width * 0.1;
class ListAirlineTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ListTicket: null,
      Data: {
        DeparturePlaceId: this.props.route.params.DeparturePlaceId,
        ArrivalPlaceId: this.props.route.params.ArrivalPlaceId,
        Qty: this.props.route.params.Qty,
        DateTimeDeparture: this.props.route.params.DateTimeDeparture,
        DepartureCity: this.props.route.params.DepartureCity,
        ArrivalCity: this.props.route.params.ArrivalCity
      },
      loading: false
    };
  }
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    listTicket: PropTypes.object,
    isListTicket: PropTypes.string
  };

  handleDetail = data => {
    this.props.navigation.navigate("DetailAirlineTicket", {
      DataTicket: data,
      oldHeadlineProgram: this.props.route.params.oldHeadlineProgram,
      room: this.props.route.params.room,
      indexAddListFlight: this.props.route.params.indexAddListFlight,
      indexAddListFlightArr: this.props.route.params.indexAddListFlightArr,
      findIndexData: this.props.route.params.findIndexData
    });
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    // this.props.dispatch(
    //   get_list_ticket(
    //     this.state.Data.DeparturePlaceId,
    //     this.state.Data.ArrivalPlaceId,
    //     this.state.Data.Qty,
    //     this.state.Data.DateTimeDeparture
    //   )
    // );
    this.setState({ loading: false });
  };

  componentDidUpdate() {
    if (this.props.isListTicket == "success") {
      let tickets = initialListFlight(this.props.listTicket);
      this.setState({
        ListTicket: dummy
      });
      // this.props.dispatch(reset_list_ticket());
    }
  }

  render() {
    return (
      <Container>
        <ScrollView style={stylesGlobal.containerScroll}>
          <Container paddingbottomcontainer={120} paddingtopcontainer={50}>
            <View style={[stylesGlobal.center, stylesGlobal.width100]}>
              <View style={stylesGlobal.width90}>
                <Text style={stylesGlobal.marginBottom20}>
                  Found{" "}
                  {this.state.ListTicket
                    ? this.state.ListTicket.Result.length
                    : 0}{" "}
                  tickets, from{" "}
                  <Text style={stylesGlobal.textBold}>
                    {this.state.Data.DepartureCity}
                  </Text>{" "}
                  to{" "}
                  <Text style={stylesGlobal.textBold}>
                    {this.state.Data.ArrivalCity}
                  </Text>{" "}
                  departure at{" "}
                  <Text style={stylesGlobal.textBold}>
                    {viewDateString(this.state.Data.DateTimeDeparture)}
                  </Text>
                </Text>
              </View>
              {!this.state.loading ? (
                this.state.ListTicket ? (
                  this.state.ListTicket.Result.length != 0 ? (
                    this.state.ListTicket.Result.map((item, i) => {
                      return (
                        <CardTicket
                          key={i}
                          onPress={() => this.handleDetail(item)}
                          airlineName={item.AirlineName}
                          logoImage={
                            item.AirlineProfileLogoUrl
                              ? item.AirlineProfileLogoUrl
                              : null
                          }
                          departureCity={
                            item.ScheduleItems[0].DeparturePlace.City.Name
                          }
                          departurePlaceCode={
                            item.ScheduleItems[0].DeparturePlace.Code
                          }
                          departureDate={viewDateString(
                            item.ScheduleItems[0].DepartureDate
                          )}
                          departureTime={viewTime(
                            item.ScheduleItems[0].DepartureDate
                          )}
                          arrivalCity={
                            item.ScheduleItems[0].ArrivalPlace.City.Name
                          }
                          arrivalPlaceCode={
                            item.ScheduleItems[0].ArrivalPlace.Code
                          }
                          arrivalDate={viewDateString(
                            item.ScheduleItems[0].ArrivalDate
                          )}
                          arrivalTime={viewTime(
                            item.ScheduleItems[0].ArrivalDate
                          )}
                          otherDestination={item.ScheduleItems.slice(1)}
                        />
                      );
                    })
                  ) : (
                    <View style={[stylesGlobal.center, stylesGlobal.padding10]}>
                      <Text
                        style={[stylesGlobal.text16, stylesGlobal.textBold]}
                      >
                        Flight Not Available
                      </Text>
                      <Text style={stylesGlobal.text14}>
                        There are no flight matching your search criteria.
                        Please modify your criteria
                      </Text>
                    </View>
                  )
                ) : (
                  <RoundedLoading width={width90} height={200} line={10} />
                )
              ) : (
                <RoundedLoading width={300} height={250} />
              )}

              <View style={stylesGlobal.width90}>
                <Text
                  style={[
                    stylesGlobal.marginBottom20,
                    stylesGlobal.marginTop20,
                    stylesGlobal.textBold
                  ]}
                >
                  Flight for another date
                </Text>
              </View>
              {this.state.ListTicket
                ? this.state.ListTicket.Similar
                  ? this.state.ListTicket.Similar.map((item, i) => {
                      return (
                        <CardTicket
                          key={i}
                          onPress={() => this.handleDetail(item)}
                          airlineName={item.AirlineName}
                          logoImage={
                            item.AirlineProfileLogoUrl
                              ? item.AirlineProfileLogoUrl
                              : null
                          }
                          departureCity={
                            item.ScheduleItems[0].DeparturePlace.City.Name
                          }
                          departurePlaceCode={
                            item.ScheduleItems[0].DeparturePlace.Code
                          }
                          departureDate={viewDateString(
                            item.ScheduleItems[0].DepartureDate
                          )}
                          departureTime={viewTime(
                            item.ScheduleItems[0].DepartureDate
                          )}
                          arrivalCity={
                            item.ScheduleItems[0].ArrivalPlace.City.Name
                          }
                          arrivalPlaceCode={
                            item.ScheduleItems[0].ArrivalPlace.Code
                          }
                          arrivalDate={viewDateString(
                            item.ScheduleItems[0].ArrivalDate
                          )}
                          arrivalTime={viewTime(
                            item.ScheduleItems[0].ArrivalDate
                          )}
                          otherDestination={item.ScheduleItems.slice(1)}
                        />
                      );
                    })
                  : null
                : null}
            </View>
          </Container>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  // listTicket: state.airlineTicketReducer.listTicket,
  // isListTicket: state.airlineTicketReducer.isListTicket,
});

export default connect(mapStateToProps)(ListAirlineTicket);
