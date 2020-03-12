import Accommo from "../AccommodationSummary";
import { getNumberOfDays } from "../../../../helper/timeHelper";
import {
  changeDestinationSummaryProgram,
  changeAccomodation,
  addSummaryProgram,
  changeDuration,
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
  getDrivingAddress
} from "../../../../helper/dailyProgram";
import {
  deleteGroupTicket,
  findIndexGroupTicket
} from "../../../../helper/groupTicketing";
import {
  changeFirstDepartureDate,
  changeLastArrivalDate,
  setReturnsDate,
  addLastDestinationSummaryProgram,
  addNewAccommodation,
  deleteLastDestinationSummaryProgram,
  findIndexTicketNext,
  findIndexTicketPrev,
  copyObject
} from "../../../../helper/itineraryBuilder";

//Add Destination Without Group Ticket
export const addMoreDestination = (mainPrograms, returns) => {
  Accommo.setStateLoading(true);
  const error = Accommo.validate("Accommodation");
  if (!error) {
    let SP = addSummaryProgram(mainPrograms);
    let newReturns = setReturnsDate(returns, SP);
    Accommo.setStateReturns(newReturns);
    Accommo.setStateMainPrograms([]);
    Accommo.setPropsMainProgram(SP);
    Accommo.setPropsReturns(newReturns);
  }
  Accommo.setStateLoading(false);
};

//split 2 untuk departure & returns
export const splitFlightTransit = (flights, chunkSize) => {
  return [].concat.apply(
    [],
    flights.map(function(item, i) {
      return i % chunkSize ? [] : [flights.slice(i, i + chunkSize)];
    })
  );
};

// =================================== END GENERATE GROUP TICKET =================================
// ============================= FUNC UNTUK MENCARI INDEX PERTAMA PNR ============================
const findPnr = (list, serviceItemIdTicket) => {
  return list.findIndex(
    item => item.Ticket && item.Ticket.ServiceItemId === serviceItemIdTicket
  );
};

export const getAirlineTicketFirstIndex = (headline, serviceItemIdTicket) => {
  const { Departures, MainPrograms, Returns } = headline;
  let result = {
    index: null,
    type: null
  }; //cari pnr di departures
  let idx = findPnr(Departures, serviceItemIdTicket);
  if (idx >= 0) {
    result.type = "Departures";
  } else {
    //cari pnr di mainprograms
    idx = findPnr(MainPrograms, serviceItemIdTicket);
    if (idx >= 0) {
      result.type = "MainPrograms";
    } else {
      //cari pnr di returns
      idx = findPnr(Returns, serviceItemIdTicket);
      if (idx >= 0) {
        result.type = "Returns";
      }
    }
  }
  result.index = idx >= 0 ? idx : null;
  return result;
};

export const durationButtonDisable = (index, headline) => {
  if (
    index == 0 &&
    headline.Departures[headline.Departures.length - 1].Ticket.ServiceItemId &&
    headline.MainPrograms[index + 1] &&
    headline.MainPrograms[index + 1].Ticket &&
    headline.MainPrograms[index + 1].Ticket.ServiceItemId
  ) {
    return true;
  } else if (
    index != 0 &&
    headline.MainPrograms[index - 1].Ticket &&
    headline.MainPrograms[index - 1].Ticket.ServiceItemId &&
    headline.MainPrograms[index + 1] &&
    headline.MainPrograms[index + 1].Ticket &&
    headline.MainPrograms[index + 1].Ticket.ServiceItemId
  ) {
    return true;
  } else {
    return false;
  }
};

//GROUP TICKET
export const handleDiscardTicket = (serviceItemId, isDeleteAllGroupTicket) => {
  Accommo.setStateLoading(true);
  let headline = {
    Departures: this.state.Departures,
    MainPrograms: this.state.SummaryProgram,
    Returns: this.state.Returns
  };
  let headlineProgram = deleteGroupTicket(
    headline,
    serviceItemId,
    isDeleteAllGroupTicket
  );
  Accommo.setPropsDepartures(headlineProgram.Departures);
  Accommo.setPropsMainProgram(headlineProgram.MainPrograms);
  Accommo.setPropsReturns(headlineProgram.Returns);
  Accommo.setStateLoading(false);
};

export const showButtonMultipleSP = (mainPrograms, index) => {
  let isShow = null;
  let prevTicket =
    mainPrograms[index - 2] &&
    mainPrograms[index - 2].Ticket &&
    mainPrograms[index - 2].Ticket.ServiceItemId;
  let currentTicket = mainPrograms[index].Ticket.ServiceItemId;

  if (prevTicket && currentTicket) {
    isShow = true;
  } else if (!prevTicket && currentTicket && index == 1) {
    isShow = true;
  } else {
    isShow = false;
  }

  return isShow;
};

export const showBtnAddMultipleLast = headline => {
  let isShow = false;

  if (
    (headline.MainPrograms[headline.MainPrograms.length - 2] &&
      headline.MainPrograms[headline.MainPrograms.length - 2].Ticket &&
      headline.MainPrograms[headline.MainPrograms.length - 2].Ticket
        .ServiceItemId) ||
    headline.MainPrograms.length == 1
  ) {
    isShow = true;
  }
  return isShow;

  // if (headline.Returns[0].Ticket.ServiceItemId) {
  //   if (
  //     headline.MainPrograms[headline.MainPrograms.length - 2] &&
  //     headline.MainPrograms[headline.MainPrograms.length - 2].Ticket &&
  //     headline.MainPrograms[headline.MainPrograms.length - 2].Ticket
  //       .ServiceItemId
  //   ) {
  //     isShow = true;
  //   }
  // }

  // if (headline.MainPrograms.length == 1) {
  //   isShow = true;
  // }
  // return isShow;
};

export const validasiMaximumDestination = (headline, index) => {
  let mainPrograms = headline.MainPrograms;
  let indexTicketNext = findIndexTicketNext(headline.MainPrograms, index);
  let indexTicketPrev = findIndexTicketPrev(headline.MainPrograms, index);
  let departures = headline.Departures[headline.Departures.length - 1];
  let returns = headline.Returns[0];
  let totalDays = null;
  let error = "";

  if (indexTicketNext && indexTicketPrev) {
    if (indexTicketPrev == indexTicketNext) {
      totalDays = getNumberOfDays(
        departures.Date,
        headline.MainPrograms[indexTicketNext].Date
      );
    } else {
      totalDays = getNumberOfDays(
        headline.MainPrograms[indexTicketPrev].Date,
        headline.MainPrograms[indexTicketNext].Date
      );
    }
  } else if (indexTicketNext && !indexTicketPrev) {
    totalDays = getNumberOfDays(
      departures.Date,
      headline.MainPrograms[indexTicketNext].Date
    );
  } else if (!indexTicketNext && indexTicketPrev) {
    totalDays = getNumberOfDays(
      headline.MainPrograms[indexTicketPrev].Date,
      returns.Date
    );
  }
  if (!indexTicketPrev) {
    mainPrograms = mainPrograms.slice(0, indexTicketNext);
  } else if (indexTicketPrev && indexTicketNext) {
    mainPrograms = mainPrograms.slice(indexTicketPrev + 1, indexTicketNext);
  } else if (!indexTicketNext) {
    mainPrograms = mainPrograms.slice(indexTicketPrev + 1);
  }
  if (totalDays >= 0 && mainPrograms.length == totalDays - 1) {
    error = "maximum add destinations";
  }

  return error;
};

export const checkSideBySideAccommodation = (headline, index, places) => {
  let isValid = false;
  //=============================================================//
  // START CHECK NEXT GROUP TICKETING
  //=============================================================//
  let HavePNRAfter = headline.MainPrograms[index + 1]
    ? headline.MainPrograms[index + 1].Ticket
      ? headline.MainPrograms[index + 1].Ticket.ServiceItemId
        ? headline.MainPrograms[index + 1]
        : false
      : false
    : false;
  if (!HavePNRAfter) {
    var isReturnTicket = headline.Returns[0]
      ? headline.Returns[0].Ticket
        ? headline.Returns[0].Ticket.ServiceItemId
          ? headline.Returns[0]
          : false
        : false
      : false;
  }
  let isValueNextGroupTicketing = HavePNRAfter ? HavePNRAfter : isReturnTicket;
  //=============================================================//
  // END CHECK NEXT GROUP TICKETING
  //=============================================================//
  //=============================================================//
  // START CHECK PREV ACCOMMODATION  SAME REGION
  //=============================================================//
  let previousAccommodation = getPrevAccomm(headline, index);
  //=============================================================//
  // END CHECK PREV ACCOMMODATION
  //=============================================================//
  if (previousAccommodation.Region === isValueNextGroupTicketing.Region) {
    let x = places[0].Data.find(
      data => data.Region.Id === previousAccommodation.Region
    );
    isValid = x ? true : false;
  } else if (!isValueNextGroupTicketing) {
    isValid = true;
  } else {
    isValid = false;
  }
  return isValid;
};
export const getPrevAccomm = (headline, index) => {
  let copyHeadline = copyObject(headline);
  let selectedMainProgram = copyHeadline.MainPrograms.slice(0, index);
  return selectedMainProgram.reverse().find(e => e.AccommodationSummary);
};

export const showButtonAddDestination = (mainPrograms, index) => {
  if (mainPrograms[index].Ticket.ServiceItemId) {
    return false;
  } else {
    return true;
  }
};

export const showButtonAddDestinationSP = (mainPrograms, index) => {
  let indexTicketNext = findIndexTicketNext(mainPrograms, index);
  let isShow = true;

  if (
    index != 0 &&
    mainPrograms[index - 1].Ticket &&
    mainPrograms[index - 1].Ticket.ServiceItemId
  ) {
    isShow = false;
  }

  if (index == 0) isShow = false;

  return isShow;
};

export const disableFlight = flight => {
  if (flight.Ticket.ServiceItemId) {
    return true;
  } else {
    return false;
  }
};
