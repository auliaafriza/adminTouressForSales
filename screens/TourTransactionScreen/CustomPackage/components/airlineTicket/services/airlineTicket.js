import { copyObject } from "../../../../../../helper/itineraryBuilder";
import {
  convertDateFormat,
  getNumberOfDays
} from "../../../../../../helper/timeHelper";

const SEAT_CLASS = [
  { value: 49, name: "economy", desc: "Economy" },
  { value: 50, name: "premium_economy", desc: "Premium Economy" },
  { value: 51, name: "business", desc: "Business" },
  { value: 52, name: "first_class", desc: "First Class" }
];

const initialConnection = connections => {
  let copyConnections = copyObject(connections);
  return copyConnections.map(e => ({
    ...e,
    DeparturePlace: e.OriginPlace,
    DepartureTime: e.DepartureDate,
    Class: e.SeatClass,
    ArrivalPlace: e.DestinationPlace,
    ArrivalTime: e.ArrivalDate,
    FlightCode: e.FlightNumber
  }));
};

const initialScheduleItems = airlineScheduleItems => {
  let copyAirlineScheduleItems = copyObject(airlineScheduleItems);
  return copyAirlineScheduleItems.map(e => ({
    ...e,
    Connection: initialConnection(e.Connections),
    ConnectionCount: e.TotalConnection,
    DeparturePlace: e.OriginPlace,
    DeparturePlaceTime: e.DepartureDate,
    Class: e.SeatClass,
    ArrivalPlace: e.DestinationPlace,
    ArrivalPlaceTime: e.ArrivalDate,
    FlightCode: e.FlightNumber
  }));
};

const initialListFlightDetail = scheduleDetail => {
  let copyScheduleDetail = copyObject(scheduleDetail);
  return copyScheduleDetail.map(e => ({
    ...e,
    Id: e.ServiceItemId,
    IsRoundTrip: e.IsRoundTrip,
    IPNRObject: e.PNRObject,
    ScheduleItems: initialScheduleItems(e.AirlineScheduleItems)
  }));
};

const initialListFlight = listFlight => {
  const { ScheduleAvailable, ScheduleOptions } = listFlight;
  if (ScheduleAvailable && ScheduleOptions) {
    let Result = initialListFlightDetail(ScheduleAvailable);
    let Similar = initialListFlightDetail(ScheduleOptions);
    return { Result, Similar };
  } else return { Result: [], Similar: [] };
};

const findTextClass = seatClass => {
  let selectedClass = SEAT_CLASS.find(e => e.value === seatClass);
  return selectedClass ? selectedClass.desc : "";
};

const isAllowedAddTicket = (headline, idx, type, dataFlight) => {
  let copyHeadline = copyObject(headline);
  let lengthMP = copyHeadline.MainPrograms.length;
  let firstFlight = convertDateFormat(
    dataFlight[0].DateTimeDeparture,
    "YYYY-MM-DD"
  );
  let lastFlight = convertDateFormat(
    dataFlight[dataFlight.length - 1].DateTimeDeparture,
    "YYYY-MM-DD"
  );
  let isAllowed = false;
  if (type === "Departures") {
    isAllowed = true;
  } else if (type === "Returns") {
    // cek bawah - tidak perlu
    // cek atasnya
    let diffAccBefore = getNumberOfDays(
      convertDateFormat(
        copyHeadline.MainPrograms[lengthMP - 1].Date,
        "YYYY-MM-DD"
      ),
      firstFlight,
      "days"
    );
    if (diffAccBefore >= 1) {
      isAllowed = true;
    }
    // end cek atasnya
  } else {
    // cek atasnya
    let diffAccBefore = getNumberOfDays(
      convertDateFormat(copyHeadline.MainPrograms[idx - 1].Date, "YYYY-MM-DD"),
      firstFlight,
      "days"
    );
    // cek di bawah nya
    let diffAccBottom = getNumberOfDays(
      lastFlight,
      convertDateFormat(
        copyHeadline.MainPrograms[idx + 2].LeavingDate,
        "YYYY-MM-DD"
      ),
      "days"
    );
    if (diffAccBefore >= 1 && diffAccBottom >= 1) {
      isAllowed = true;
    }
  }
  return isAllowed;
};

// ============================= END FUNC UNTUK MENCARI INDEX PERTAMA PNR ============================
// ========================= FUNC UNTUK MENCARI REGION BARU DARI PEMILIHAN TICKET ====================
const findRegionForGetPlaces = (detailGroupTicket, places) => {
  let regionPlaces = places.reduce((acc, place) => {
    acc.push(place.region);
    return acc;
  }, []);
  let listRegion = detailGroupTicket.ScheduleItems.reduce(
    (acc, scheduleItem) => {
      if (scheduleItem.ConnectionCount > 0) {
        scheduleItem.Connection.map(conn => {
          regionPlaces.indexOf(conn.ArrivalPlace.Region.Id) === -1 &&
            acc.indexOf(conn.ArrivalPlace.Region.Id) === -1 &&
            acc.push(conn.ArrivalPlace.Region.Id);
          regionPlaces.indexOf(conn.DeparturePlace.Region.Id) === -1 &&
            acc.indexOf(conn.DeparturePlace.Region.Id) === -1 &&
            acc.push(conn.DeparturePlace.Region.Id);
          return conn;
        });
      } else {
        regionPlaces.indexOf(scheduleItem.ArrivalPlace.Region.Id) === -1 &&
          acc.indexOf(scheduleItem.ArrivalPlace.Region.Id) === -1 &&
          acc.push(scheduleItem.ArrivalPlace.Region.Id);
        regionPlaces.indexOf(scheduleItem.DeparturePlace.Region.Id) === -1 &&
          acc.indexOf(scheduleItem.DeparturePlace.Region.Id) === -1 &&
          acc.push(scheduleItem.DeparturePlace.Region.Id);
      }
      return acc;
    },
    []
  );
  return listRegion;
};
// ======================= END FUNC UNTUK MENCARI REGION BARU DARI PEMILIHAN TICKET ==================
// =================================== VALIDATION GROUP TICKET =====================================

export {
  initialListFlight,
  findTextClass,
  isAllowedAddTicket,
  findRegionForGetPlaces
};
