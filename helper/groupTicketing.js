import {
  SumDays,
  convertToStringDate,
  addsubtractTimeHours,
  durationFlight,
  getNumberOfDays,
  convertDateFormat,
  getHourAndMinute,
} from './timeHelper';
import { addDate, diffDate } from './moment';
import {
  addSummaryProgram,
  setDateSummaryProgram,
  copyObject,
} from './dailyProgram';
import {
  setReturnsDate,
  addNewAccommodation,
  changeFirstDepartureDate,
} from './itineraryBuilder';
const Airport = {
  Address: null,
  City: { Name: null },
  Date: null,
  Day: null,
  Note: null,
  Place: null,
  PlaceId: null,
  PlaceType: null,
  Region: null,
  TransferType: '',
  NextDay: false,
  RequestFrom: '',
  Ticket: {
    IsGroupTicketing: false,
    ServiceItemId: '',
    PNR: '',
    FlightNumber: '',
    AirlineProfileName: '',
    Duration: '',
    IsTransit: '',
    IsAllowedActivity: false,
  },
};

const SummaryProgram = {
  AccommodationSummary: {
    CheckIn: null,
    CheckOut: null,
    Address: null,
    AccommodationProfileId: null,
    Allocations: {
      ChildExtraBedPax: 0,
      ChildSharingRoomPax: 0,
      ChildSingleRoomPax: 0,
      ExtraBedPax: 0,
      NoBedPax: 0,
      SharingBedPax: 0,
      SharingRoomPax: 0,
      SingleRoomPax: 0,
    },
    DateTime: null,
    Name: null,
    RoomName: null,
    RoomService: null,
    RoomType: null,
    SeqNumber: null,
    ServiceItemId: null,
    ImageUrl: null,
  },
  City: { Name: null },
  Date: null,
  Day: null,
  LeavingDate: null,
  Note: null,
  Region: null,
  TotalDays: 2,
  NextDay: false,
};

const initialDepartArrTransit = (
  data,
  date,
  type,
  transit,
  ticket,
  duration,
  isAllowedActivity
) => {
  let typeMov = type === 'Arrival' ? 'Movement_arrival' : 'Movement_departure';
  let airport = copyObject(Airport);
  airport.City = data.City;
  airport.Region = data.Region && data.Region.Id;
  airport.RequestFrom = airport.Region;
  airport.Day = 1;
  airport.PlaceType = 'Airport';
  airport.TransferType = typeMov;
  airport.NextDay = false;
  airport.Date = date;
  airport.Ticket.IsGroupTicketing = ticket ? ticket.IsGroupTicketing : false;
  airport.Ticket.ServiceItemId = ticket ? ticket.ServiceItemId : null;
  airport.Ticket.PNR = ticket ? ticket.PNR : '';
  airport.Ticket.FlightNumber = ticket ? ticket.FlightNumber : '';
  airport.Ticket.AirlineProfileName = ticket ? ticket.AirlineProfileName : '';
  airport.Ticket.Class = ticket ? ticket.Class : null;
  airport.Ticket.IsTransit = transit;
  airport.Ticket.IsAllowedActivity = isAllowedActivity;
  airport.Ticket.Duration = duration;
  if (data !== null)
    if (data.length > 0) {
      airport.Address = data[0].Address;
      airport.Place = data[0].Name;
      airport.PlaceId = data[0].Id;
    } else if (data.length === undefined) {
      airport.Address = data.Address;
      airport.Place = data.Name;
      airport.PlaceId = data.Id;
    }
  return airport;
};

const setSummaryProgramGroupTicketing = (
  dataSP,
  room,
  day,
  nextSP,
  cityInCountry
) => {
  let SP = copyObject(SummaryProgram);
  let city = cityInCountry.find(e => e.Id === dataSP.Arrival.City.Id);
  SP.City = city;
  SP.Day = day;
  SP.Region = dataSP.Arrival.Region ? dataSP.Arrival.Region.Id : null;
  SP.RequestFrom = SP.Region;
  SP.AccommodationSummary.DateTime = SP.Date;
  SP.AccommodationSummary.CheckIn = addsubtractTimeHours(
    dataSP.DateTimeArrival,
    2,
    'add'
  );
  SP.AccommodationSummary.CheckOut = nextSP
    ? addsubtractTimeHours(nextSP.DateTimeDeparture, 2, 'sub')
    : convertToStringDate(SumDays(dataSP.DateTimeArrival, 1)) + 'T10:00:00';
  SP.Date = convertToStringDate(SP.AccommodationSummary.CheckIn) + 'T00:00:00';
  SP.LeavingDate =
    convertToStringDate(SP.AccommodationSummary.CheckOut) + 'T00:00:00';
  SP.TotalDays = getNumberOfDays(
    SP.AccommodationSummary.CheckIn,
    SP.AccommodationSummary.CheckOut
  );
  SP.AccommodationSummary.Allocations.ChildExtraBedPax = room.ChildExtraBedQty;
  SP.AccommodationSummary.Allocations.ChildSharingRoomPax =
    room.ChildSharingRoomQty;
  SP.AccommodationSummary.Allocations.ChildSingleRoomPax =
    room.ChildSingleRoomQty;
  SP.AccommodationSummary.Allocations.ExtraBedPax = room.ExtraBedQty;
  SP.AccommodationSummary.Allocations.NoBedPax = room.BabyCrib + room.NoBed;
  SP.AccommodationSummary.Allocations.SharingBedPax = room.SharingBedQty;
  SP.AccommodationSummary.Allocations.SharingRoomPax = room.SharingRoomQty;
  SP.AccommodationSummary.Allocations.SingleRoomPax = room.SingleRoomQty;
  return SP;
};

//mengubah dan mengambil data depature arrival dan transit dari list flight
export const convertDataListFlight = item => {
  let hasilFlightRoute = [];
  let Ticket = null;
  // eslint-disable-next-line
  item
    ? // eslint-disable-next-line
      item.ScheduleItems.map(itemFlight => {
        let connectionFlight = [];
        Ticket = {
          ServiceItemId: item.Id,
          PNR: item.IPNRObject ? item.IPNRObject.ExternalNumber : '',
          FlightNumber: itemFlight.FlightCode,
          AirlineProfileName: item.AirlineName,
          Duration: '',
          IsTransit: '',
          IsAllowedActivity: item.IsAllowedActivity,
          IsGroupTicketing: true,
        };
        // eslint-disable-next-line
        itemFlight.Connection.length !== 0
          ? // eslint-disable-next-line
            itemFlight.Connection.map(data => {
              // eslint-disable-next-line
              connectionFlight.push({
                Departure: data.DeparturePlace,
                DateTimeDeparture: data.DepartureTime,
                Arrival: data.ArrivalPlace,
                DateTimeArrival: data.ArrivalTime,
                IsAllowedActivity: data.IsAllowedActivity,
              });
            })
          : null;
        hasilFlightRoute.push({
          IsRoundTrip: item.IsRoundTrip,
          Departure: itemFlight.DeparturePlace,
          DateTimeDeparture: itemFlight.DeparturePlaceTime,
          Arrival: itemFlight.ArrivalPlace,
          DateTimeArrival: itemFlight.ArrivalPlaceTime,
          Transit: connectionFlight,
          Ticket: Ticket,
        });
      })
    : null;
  return hasilFlightRoute;
};

//untuk generate data transit dalam satu array
const generateDataTransit = (data, Ticket) => {
  let result = [];
  // eslint-disable-next-line
  data.length !== 0
    ? // eslint-disable-next-line
      data.map((itemData, i) => {
        if (data[i + 1]) {
          let duration = durationFlight(
            data[i + 1].DateTimeDeparture,
            itemData.DateTimeArrival
          );
          let dataConcat = [
            initialDepartArrTransit(
              itemData.Arrival,
              itemData.DateTimeArrival,
              'Arrival',
              true,
              Ticket,
              duration,
              itemData.IsAllowedActivity
            ),
            initialDepartArrTransit(
              data[i + 1].Departure,
              data[i + 1].DateTimeDeparture,
              'Departure',
              true,
              Ticket,
              duration,
              data[i + 1].IsAllowedActivity
            ),
          ];
          result.push(dataConcat);
        }
      })
    : null;
  return result;
};
//untuk mengconvert data transit dari satu array di push ke array yang sama di depature dan arrival
const pushDataTransit = (dataHeadline, dataTransit) => {
  // eslint-disable-next-line
  dataTransit.length !== 0
    ? // eslint-disable-next-line
      dataTransit.map(itemDataPush => {
        // eslint-disable-next-line
        itemDataPush.map(itemTransit => {
          dataHeadline.push(itemTransit);
        });
      })
    : null;
  return dataHeadline;
};

//fungsi untuk mengenerate data di summary program dari list flight
export const generateSP = (
  dataSP,
  room,
  oldHeadlineProgram,
  indexAddListFlight,
  indexAddListFlightArr,
  cityInCountry
) => {
  let SP = [];
  if (dataSP.length !== 1) {
    // eslint-disable-next-line
    dataSP.map((itemSP, i) => {
      //untuk mencetak flight awal jika PNR atau list flight ditambhakan
      //diantara summary program atau penambahan di last flight bukan di first flight
      if (i === 0 && indexAddListFlight !== 'Arrival') {
        let DeparTemp = initialDepartArrTransit(
          itemSP.Departure,
          itemSP.DateTimeDeparture,
          'Departure',
          false,
          itemSP.Ticket,
          null,
          itemSP.IsAllowedActivity
        );
        SP.push(DeparTemp);
        let Transit =
          itemSP.Transit.length !== 0
            ? generateDataTransit(itemSP.Transit, itemSP.Ticket)
            : [];
        SP = pushDataTransit(SP, Transit);
        let ArrTemp = initialDepartArrTransit(
          itemSP.Arrival,
          itemSP.DateTimeArrival,
          'Arrival',
          false,
          itemSP.Ticket,
          null,
          itemSP.IsAllowedActivity
        );
        SP.push(ArrTemp);
      }
      let index = i + 1;
      if (dataSP[i + 1]) {
        let spTemp = setSummaryProgramGroupTicketing(
          itemSP,
          room,
          index,
          dataSP[i + 1],
          cityInCountry
        );
        SP.push(spTemp);
        if (index !== dataSP.length - 1) {
          let DeparTemp = initialDepartArrTransit(
            dataSP[index].Departure,
            dataSP[index].DateTimeDeparture,
            'Departure',
            false,
            dataSP[index].Ticket,
            null,
            dataSP[index].IsAllowedActivity
          );
          SP.push(DeparTemp);
          let Transit =
            dataSP[index].Transit.length !== 0
              ? generateDataTransit(dataSP[index].Transit, dataSP[index].Ticket)
              : [];
          SP = pushDataTransit(SP, Transit);
          let ArrTemp = initialDepartArrTransit(
            dataSP[index].Arrival,
            dataSP[index].DateTimeArrival,
            'Arrival',
            false,
            dataSP[index].Ticket,
            null,
            dataSP[index].IsAllowedActivity
          );
          SP.push(ArrTemp);
        }
      } else if (i === dataSP.length - 1 && itemSP.IsRoundTrip === false) {
        let DeparTemp = initialDepartArrTransit(
          itemSP.Departure,
          itemSP.DateTimeDeparture,
          'Departure',
          false,
          itemSP.Ticket,
          null,
          itemSP.IsAllowedActivity
        );
        SP.push(DeparTemp);
        let Transit =
          itemSP.Transit.length !== 0
            ? generateDataTransit(itemSP.Transit, itemSP.Ticket)
            : [];
        SP = pushDataTransit(SP, Transit);
        let ArrTemp = initialDepartArrTransit(
          itemSP.Arrival,
          itemSP.DateTimeArrival,
          'Arrival',
          false,
          itemSP.Ticket,
          null,
          itemSP.IsAllowedActivity
        );
        SP.push(ArrTemp);
        let spTemp = setSummaryProgramGroupTicketing(
          itemSP,
          room,
          index,
          null,
          cityInCountry
        );
        SP.push(spTemp);
      }
    });
  } else {
    if (indexAddListFlight !== 'Arrival') {
      let DeparTemp = initialDepartArrTransit(
        dataSP[0].Departure,
        dataSP[0].DateTimeDeparture,
        'Departure',
        false,
        dataSP[0].Ticket,
        null,
        dataSP[0].IsAllowedActivity
      );
      SP.push(DeparTemp);
      let Transit =
        dataSP[0].Transit.length !== 0
          ? generateDataTransit(dataSP[0].Transit, dataSP[0].Ticket)
          : [];
      SP = pushDataTransit(SP, Transit);
      let ArrTemp = initialDepartArrTransit(
        dataSP[0].Arrival,
        dataSP[0].DateTimeArrival,
        'Arrival',
        false,
        dataSP[0].Ticket,
        null,
        dataSP[0].IsAllowedActivity
      );
      SP.push(ArrTemp);
    }
    let spTemp = setSummaryProgramGroupTicketing(
      dataSP[0],
      room,
      1,
      null,
      cityInCountry
    );
    SP.push(spTemp);
  }
  let dataConcatSP = concatDataSPFlight(
    indexAddListFlight,
    fixDurationBeforeNewGroupTicket(indexAddListFlight, oldHeadlineProgram, SP),
    SP,
    indexAddListFlightArr
  );
  return dataConcatSP;
};

//fungsi untuk mengabungkan data summary prgoram yang lama dengan summary program dari list flight
export const concatDataSPFlight = (
  indexAddListFlight,
  oldHeadlineProgram,
  SP,
  indexAddListFlightArr
) => {
  let resultConcat = null;
  let insertIndex =
    indexAddListFlight === 'Departure'
      ? oldHeadlineProgram.MainPrograms.length === 1
        ? 1
        : oldHeadlineProgram.MainPrograms.length
      : indexAddListFlight;
  let oldData =
    indexAddListFlight === 'Arrival'
      ? null
      : oldHeadlineProgram.MainPrograms.slice(0, insertIndex);
  let oldIndexDataConcat = findLastIndexPNR(
    indexAddListFlight,
    oldHeadlineProgram.MainPrograms,
    indexAddListFlightArr
  );
  let oldDataLastIndex = oldHeadlineProgram.MainPrograms.slice(
    oldIndexDataConcat,
    oldHeadlineProgram.MainPrograms.length
  );
  resultConcat = indexAddListFlight === 'Arrival' ? SP : oldData.concat(SP);
  resultConcat =
    indexAddListFlight === 'Arrival'
      ? resultConcat
      : oldIndexDataConcat
      ? resultConcat.concat(oldDataLastIndex)
      : resultConcat;
  return resultConcat;
};

//fungsi untuk mencari index tiap flight
export const findindexOfAllAriport = arr =>
  arr.reduce((acc, el, i) => (el.Ticket ? [...acc, i] : acc), []);

//untuk mencari index last PNR untuk di sisipkan data
export const findLastIndexPNR = (
  indexFind,
  oldSummaryProgram,
  indexAddListFlightArr
) => {
  let indexFindLastPNR = null;
  // eslint-disable-next-line
  let result = findindexOfAllAriport(oldSummaryProgram);
  // eslint-disable-next-line
  result.map(currentData => {
    // eslint-disable-next-line
    if (indexFind < currentData && indexAddListFlightArr + 1 < currentData) {
      if (oldSummaryProgram[currentData].Ticket.PNR !== '') {
        indexFindLastPNR = indexFindLastPNR
          ? indexFindLastPNR
          : oldSummaryProgram[indexFind].Ticket.PNR !==
            oldSummaryProgram[currentData].Ticket.PNR
          ? currentData
          : null;
      } else {
        indexFindLastPNR = indexFindLastPNR ? indexFindLastPNR : currentData;
      }
    }
  });
  return indexFindLastPNR;
};

//untuk generate satu pasang flight depature , transit dan arrival
export const generateFlight = (dataFlight, arrivalNull) => {
  let flight = [];
  let depar = arrivalNull
    ? initialDepartArrTransit(
        dataFlight.Arrival,
        dataFlight.DateTimeArrival,
        'Departure',
        false,
        null,
        null,
        dataFlight.IsAllowedActivity
      )
    : initialDepartArrTransit(
        dataFlight.Departure,
        dataFlight.DateTimeDeparture,
        'Departure',
        false,
        dataFlight.Ticket,
        null,
        dataFlight.IsAllowedActivity
      );
  flight.push(depar);
  let Transit = arrivalNull
    ? []
    : dataFlight.Transit.length !== 0
    ? generateDataTransit(dataFlight.Transit, dataFlight.Ticket)
    : [];
  flight = pushDataTransit(flight, Transit);
  let timeArr = addsubtractTimeHours(dataFlight.DateTimeArrival, 2, 'add');
  let arr = arrivalNull
    ? initialDepartArrTransit([], timeArr, 'Arrival', false, null, null, false)
    : initialDepartArrTransit(
        dataFlight.Arrival,
        dataFlight.DateTimeArrival,
        'Arrival',
        false,
        dataFlight.Ticket,
        null,
        dataFlight.IsAllowedActivity
      );
  flight.push(arr);
  return flight;
};

export const changeTimeLastFlight = (dataFlight, time) => {
  let result = copyObject(dataFlight);
  result.DateTimeArrival = addsubtractTimeHours(time, 2, 'add');
  return result;
};

//hasil convert data list flight dengan parameter
//resultFlight adalah convert dari list flight
//roomAllocation adalah data room
//oldHeadlineProgram adalah old headline program yang akan diubah
//indexAddListFlightDepar adalah data index departure ketika akan diberikan PNR =>
//Arrival jika index yang akan diinput kan PNR adalah di first flight
//Depature jika index yang akan diinput kan PNR adalah di last flight
//index angka depature jika yang akan diinputkan dalam summary program
//indexAddListFlightArr adalah data index arrival batas flight dari depature hingga arrival pada summary prgoram
//jika yang diinput pada first flight atau last flight indexAddListFLightArr dikosongkan
export const convertDataListGroupTicketToDeparArr = (
  resultFlight,
  roomAllocation,
  oldHeadlineProgram,
  indexAddListFlightDepar,
  indexAddListFlightArr,
  cityInCountry
) => {
  let departures = [];
  let returns = [];
  let sP = [];
  departures =
    indexAddListFlightDepar === 'Arrival'
      ? generateFlight(resultFlight[0], false)
      : oldHeadlineProgram.Departures;
  sP = generateSP(
    resultFlight,
    roomAllocation,
    oldHeadlineProgram,
    indexAddListFlightDepar,
    indexAddListFlightArr,
    cityInCountry
  );
  returns = isNaN(indexAddListFlightDepar)
    ? generateFlight(
        resultFlight.length !== 1
          ? resultFlight[resultFlight.length - 1].IsRoundTrip
            ? resultFlight[resultFlight.length - 1]
            : changeTimeLastFlight(
                resultFlight[resultFlight.length - 1],
                sP[sP.length - 1]
                  ? sP[sP.length - 1].AccommodationSummary.CheckOut
                  : resultFlight[resultFlight.length - 1].DateTimeArrival
              )
          : resultFlight[0].IsRoundTrip
          ? resultFlight[0]
          : changeTimeLastFlight(
              resultFlight[resultFlight.length - 1],
              sP[sP.length - 1]
                ? sP[sP.length - 1].AccommodationSummary.CheckOut
                : resultFlight[resultFlight.length - 1].DateTimeArrival
            ),
        resultFlight.length !== 1
          ? resultFlight[resultFlight.length - 1].IsRoundTrip
            ? false
            : true
          : true
      )
    : oldHeadlineProgram.Returns;
  return {
    Departures: departures,
    MainPrograms: sP,
    Returns: returns,
  };
};
// ===============================================================================================================
// ======================================== DELETE GROUP TICKET ==================================================
// ===============================================================================================================

//
const doDelete = (objHeadline, serviceItemId, isDeleteAllGroupTicket) => {
  let copyObjHeadline = copyObject(objHeadline);
  copyObjHeadline = copyObjHeadline.reduce((acc, e) => {
    if (
      e.AccommodationSummary ||
      !e.Ticket.ServiceItemId ||
      (e.Ticket.ServiceItemId !== serviceItemId && serviceItemId !== null)
    ) {
      acc.push(e);
    } else if (
      isDeleteAllGroupTicket ||
      e.Ticket.ServiceItemId === serviceItemId
    ) {
      if (!e.Ticket.IsTransit) {
        e.Ticket.ServiceItemId = '';
        e.Ticket.PNR = '';
        e.Ticket.FlightNumber = '';
        e.Ticket.AirlineProfileName = '';
        e.Ticket.Duration = 0;
        e.Ticket.IsTransit = false;
        e.Ticket.IsAllowedActivity = false;
        e.Ticket.IsGroupTicketing = false;
        acc.push(e);
      }
    }
    return acc;
  }, []);
  return copyObjHeadline;
};

// berfungsi untuk menghapus group ticket
// jika isDeleteAllGroupTicket bernilai true maka seluruh group ticket
// yang terdapat pada headline program akan terhapus
export const deleteGroupTicket = (
  headline,
  serviceItemId,
  isDeleteAllGroupTicket
) => {
  let copyHeadline = copyObject(headline);
  let { Departures, MainPrograms, Returns } = copyHeadline;
  copyHeadline.Departures = doDelete(
    Departures,
    serviceItemId,
    isDeleteAllGroupTicket
  );
  copyHeadline.MainPrograms = doDelete(
    MainPrograms,
    serviceItemId,
    isDeleteAllGroupTicket
  );
  copyHeadline.Returns = doDelete(
    Returns,
    serviceItemId,
    isDeleteAllGroupTicket
  );
  return copyHeadline;
};
// ===============================================================================================================
// ===================================== END DELETE GROUP TICKET =================================================
// ===============================================================================================================

// ===============================================================================================================
// ===================================Function dari tayo untuk find Group Ticket di Summary Program==========================================
// ===============================================================================================================

export const findIndexGroupTicket = headline => {
  let copyHeadline = copyObject(headline);
  let { Departures, MainPrograms, Returns } = copyHeadline;
  let lastDeparture = Departures[Departures.length - 1];
  let lastReturn = Returns[Returns.length - 1];
  let firstGT = {};
  if (
    lastDeparture &&
    lastDeparture.Ticket &&
    lastDeparture.Ticket.ServiceItemId
  ) {
    firstGT = {
      ...firstGT,
      serviceItemId: lastDeparture.Ticket.ServiceItemId,
      idxFrom: 0,
      idxTo: 0,
    };
  }
  let idxGT = MainPrograms.reduce(
    (acc, summaryProgram, i) => {
      const { Ticket } = summaryProgram;
      if (Ticket && Ticket.ServiceItemId) {
        if (acc.length === 0) {
          acc.push({
            serviceItemId: Ticket.ServiceItemId,
            idxFrom: i,
            idxTo: i,
          });
        } else if (acc[acc.length - 1].serviceItemId === Ticket.ServiceItemId) {
          acc[acc.length - 1].idxTo = i;
        } else if (Ticket.ServiceItemId) {
          acc.push({
            serviceItemId: Ticket.ServiceItemId,
            idxFrom: i,
            idxTo: i,
          });
        }
      }
      return acc;
    },
    firstGT === {} ? [] : [{ ...firstGT }]
  );
  if (
    lastReturn &&
    lastReturn.Ticket &&
    idxGT[idxGT.length - 1] &&
    lastReturn.Ticket.ServiceItemId === idxGT[idxGT.length - 1].ServiceItemId
  ) {
    idxGT[idxGT.length - 1].idxTo = MainPrograms.length - 1;
  }
  return idxGT;
};

const fixDurationBeforeNewGroupTicket = (
  indexAddListFlight,
  oldHeadline,
  addNewSPGroupTicket
) => {
  let copyHeadline = copyObject(oldHeadline);
  let selectedIdx = null;
  let changeAccom = null;
  // untuk menentukan index accommodation mana yang akan diubah total daysnya
  if (indexAddListFlight === 'Departure') {
    selectedIdx = copyHeadline.MainPrograms.length - 1;
    changeAccom = copyHeadline.MainPrograms[selectedIdx];
  } else if (indexAddListFlight !== 'Arrival') {
    selectedIdx = indexAddListFlight - 1;
    changeAccom = copyHeadline.MainPrograms[selectedIdx];
  }
  // END untuk menentukan index accommodation mana yang akan diubah total daysnya
  // proses untuk mengubah total daysnya
  if (selectedIdx && changeAccom) {
    let newTotalDay = diffDate(
      convertDateFormat(changeAccom.Date, 'YYYY-MM-DD'),
      convertDateFormat(addNewSPGroupTicket[0].Date, 'YYYY-MM-DD'),
      'Days'
    );
    changeAccom.TotalDays = newTotalDay + 1;
    changeAccom.LeavingDate = convertDateFormat(
      addDate(changeAccom.Date, newTotalDay, 'd'),
      'YYYY-MM-DDThh:mm:ss'
    );
    changeAccom.AccommodationSummary.CheckOut = convertDateFormat(
      addDate(changeAccom.AccommodationSummary.CheckIn, newTotalDay, 'd'),
      'YYYY-MM-DDThh:mm:ss'
    );
    copyHeadline.MainPrograms[selectedIdx] = changeAccom;
  }
  // END proses untuk mengubah total daysnya
  return copyHeadline;
};

// ===============================================================================================================
// ===================================== END DELETE GROUP TICKET =================================================
// ===============================================================================================================
// ===============================================================================================================
// ========================== AUTO MULTI DESTINATION AFTER ADD TICKET ============================================
// ===============================================================================================================
export const autoMultiDestionationAfterAddGroupTicket = (
  headline,
  places,
  cityList
) => {
  let copyHeadline = copyObject(headline);
  let lastDeparture =
    copyHeadline.Departures[copyHeadline.Departures.length - 1];
  let firstReturn = copyHeadline.Returns[0];
  for (let iMP = 0; iMP < copyHeadline.MainPrograms.length; iMP++) {
    let prev = copyHeadline.MainPrograms[iMP - 1]
      ? copyHeadline.MainPrograms[iMP - 1]
      : lastDeparture;
    let next = copyHeadline.MainPrograms[iMP + 1]
      ? copyHeadline.MainPrograms[iMP + 1]
      : firstReturn;
    if (
      prev.Ticket &&
      next.Ticket &&
      prev.Ticket.ServiceItemId &&
      next.Ticket.ServiceItemId &&
      prev.Region !== next.Region
    ) {
      let airportByRegion = places.find(e => e.Region === next.Region);
      let isNotAccessibleAirport = airportByRegion
        ? airportByRegion.Data.find(e => e.Id === next.PlaceId)
        : true;
      if (isNotAccessibleAirport) {
        if (iMP === copyHeadline.MainPrograms.length - 1) {
          copyHeadline.MainPrograms = addSummaryProgram(
            copyHeadline.MainPrograms,
            next,
            cityList
          );
          copyHeadline.MainPrograms = setDateSummaryProgram(
            copyHeadline.Departures[copyHeadline.Departures.length - 1],
            copyHeadline.MainPrograms
          );
          copyHeadline.Returns = setReturnsDate(
            copyHeadline.Returns,
            copyHeadline.MainPrograms
          );
        } else {
          let newMain = addNewAccommodation(copyHeadline, iMP);
          let newReturns = setReturnsDate(
            copyHeadline.Returns,
            newMain.MainPrograms
          );
          copyHeadline.Returns = newReturns;
          copyHeadline.MainPrograms = newMain.MainPrograms;
          copyHeadline = changeFirstDepartureDate(
            copyHeadline.Departures[0].Date,
            copyHeadline,
            getHourAndMinute(copyHeadline.Departures[0].Date)
          );
        }
      }
    }
  }
  return copyHeadline;
};
// ===============================================================================================================
// ========================== END AUTO MULTI DESTINATION AFTER ADD TICKET =========================================
// ===============================================================================================================
