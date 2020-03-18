import moment from 'moment';
import {
  SumDays,
  changeTime,
  changeTimeNew,
  getHour,
  SumSecond,
  convertToStringDate,
  convertToStringTime,
  getNumberOfDays,
  SubstractSecond,
  getNumberOfSecond,
  SubDays,
} from './timeHelper';

import {
  generateInitialDailyProgram,
  setMovementAirportToDailyProgram,
  setMovementConnectionFlight,
  setMovementCheckoutinAccomodasi,
  setMovementVirtualAccommodation,
  setMovementDriving,
  setMovementDayStartDayEnd,
  setMovementFreetimeLocked,
  getActivityOldDailyProgram,
  // copyDailyProgram,
  // generateFirstLastFlights,
  fixFlightPlaceDailyProgram,
  setAccomodationtMovement,
  setInitialAirport,
  //cutSummaryBetweenTicket,
  findIndexTicketNext,
  //combineSummaryProgram,
  // findIndexTicketPrev,
  fixingDateTimeChangeDurationSP,
} from './itineraryBuilder';

import {
  DAYEND,
  CHECKIN,
  CHECKOUT,
  DAYSTART,
  // EAT,
  // RECREATION,
  // FREETIME,
  // DRIVING,
  FLIGHTTIME,
  DEPARTURE,
  ARRIVAL,
} from './activityTypes';

export const ObjectAirport = {
  Region: null,
  Data: [],
};

export const setObjectAirport = (oldObjAirport, Region, Data) => {
  let newObj = copyObject (oldObjAirport);
  let obj = copyObject (ObjectAirport);
  obj.Region = Region;
  obj.Data = Data;
  newObj.push (obj);
  return newObj;
};

export const getObjectAirport = (oldObjAirport, Region) => {
  let obj = oldObjAirport.find (item => item.Region.Id == Region);
  return obj != undefined ? obj.Data : null;
};

export const ObjectDuration = {
  ToId: null,
  FromId: null,
  ToAddress: null,
  FromAddress: null,
  Duration: [],
};

export const setObjectDuration = (oldObjectDuration, data, item) => {
  let newObjectDuration = copyObject (oldObjectDuration);
  let obj = copyObject (ObjectDuration);
  obj.FromId = data.FromId;
  obj.FromAddress = data.FromAddress;
  obj.ToId = data.ToId;
  obj.ToAddress = data.ToAddress;
  obj.Duration = item.Duration;
  obj.Duration = item.Duration;
  newObjectDuration.push (obj);
  return newObjectDuration;
};

export const getObjectDuration = (oldObjectDuration, data1, data2) => {
  if (data1.ServiceItemId != null && data2.ServiceItemId != null) {
    const obj1 = oldObjectDuration.filter (
      i => i.FromId == data1.ServiceItemId
    );
    return obj1.find (i => i.ToId == data2.ServiceItemId) != undefined
      ? obj1.find (i => i.ToId == data2.ServiceItemId)
      : null;
  } else if (data1.ServiceItemId == null && data2.ServiceItemId != null) {
    const obj1 = oldObjectDuration.filter (
      i => i.FromAddress == data1.Address.AddressString
    );
    return obj1.find (i => i.ToId == data2.ServiceItemId) != undefined
      ? obj1.find (i => i.ToId == data2.ServiceItemId)
      : null;
  } else if (data1.ServiceItemId != null && data2.ServiceItemId == null) {
    const obj1 = oldObjectDuration.filter (
      i => i.FromId == data1.ServiceItemId
    );
    return obj1.find (i => i.ToAddress == data2.Address.AddressString) !=
      undefined
      ? obj1.find (i => i.ToAddress == data2.Address.AddressString)
      : null;
  }
};

export class Guest {
  constructor (GuestCategory) {
    this.FirstName = null;
    this.LastName = null;
    this.CountryId = null;
    this.IdentityNbr = null;
    this.IdentityType = null;
    this.GuestType = 'TOURMEMBER';
    this.GuestCategory = GuestCategory;
    this.GuestTitle = null;
  }
}

export const DetailCustom = {
  TourName: null,
  GroupCapacity: null,
  TourCategory: null,
  TourType: null,
  FirstArrival: {Name: null},
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
  },
};

export const activityData = {
  Name: '',
  Startime: '',
  Duration: 1800,
  OptimumDuration: 900,
  Note: null,
  OperationEndTime: null,
  OperationStartTime: null,
  IsSolidStartTime: false,
  IsSolidDuration: false,
};

export const DailyProgram = {
  Date: null,
  Day: null,
  Movements: [],
  TourDestinations: [],
};
export const Movement = {
  DateTime: null,
  Destination: null,
  DestinationName: null,
  Duration: 0,
  DurationText: '',
  Id: null,
  Item: Object.assign ({}, ItemMov),
  MovementName: null,
  MovementDescription: null,
  Note: null,
  SeqNumber: null,
  ServiceItemId: null,
  TypeMovement: true,
  TypeVirtual: false,
};

export const ItemMov = {
  Address: {
    AddressString: null,
  },
  CityId: null,
  Desc: null,
  ImageName: null,
  ImageUrl: null,
  Name: null,
  PlaceId: null,
  ProfileDesc: null,
  ServiceItemId: null,
  ServiceType: null,
  OperationStartTime: null,
  OperationEndTime: null,
  IsSolidStartTime: false,
  MapsString: null,
  Capacity: 0,
  Hours: 0,
  ServiceDescription: null,
};

export const Airport = {
  Address: null,
  City: {Name: null},
  Date: null,
  Day: null,
  Note: null,
  Place: null,
  PlaceId: null,
  PlaceType: null,
  Region: null,
  TransferType: '',
  NextDay: false,
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
export const SummaryProgram = {
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
  City: {Name: null},
  Date: null,
  Day: null,
  LeavingDate: null,
  Note: null,
  Region: null,
  TotalDays: 2,
  NextDay: false,
};

export const copyObject = par => {
  let temp = JSON.stringify (par);
  return JSON.parse (temp);
};

export const func = num => {
  let sum = num * 2;
  return sum;
};
//untuk custom and ready
//item : untuk custom masukan array airport, untuk custom masukan object airport arrival
//city : masukan object kota yg berisi region (bisa filter dari balikan API)
//day : masukan int hari ke-
//lastDateSP : masukan Leaving Date object terakhir Summarry program  untuk departure pada ready program
// export const setInitialAirport = (item, city, day, type, date, status) => {
//   item = copyObject(item);
//   let typeMov = type === 'Arrival' ? 'Movement_arrival' : 'Movement_departure';
//   let air = copyObject(Airport);
//   air.City = city && city;
//   air.Region = city && city.Region.Id;
//   air.Day = day;
//   air.PlaceType = 'Airport';
//   air.TransferType = typeMov;
//   air.NextDay = false;
//   if (status == 'Custom') {
//     air.Date =
//       type === 'Arrival'
//         ? convertToStringDate(SumDays(date, 1)) + 'T10:00:00'
//         : convertToStringDate(changeTime(date)) + 'T14:00:00';
//   } else if (status == 'Ready') {
//     if (type === 'Arrival')
//       air.Date =
//         convertToStringDate(SumDays(date, 1)) + convertToStringTime(item.Date);
//     else {
//       air.Date =
//         convertToStringDate(changeTime(date)) + convertToStringTime(item.Date);
//       if (
//         moment.utc(new Date(date)).format('YYYY-MM-DD HH:mm') >
//         moment.utc(new Date(air.Date)).format('YYYY-MM-DD HH:mm')
//       ) {
//         air.NextDay = true;
//         air.Date =
//           convertToStringDate(SumDays(air.Date, 1)) +
//           convertToStringTime(air.Date);
//       }
//     }
//   } else if (status == 'edit') {
//     air.Date = item.Date;
//   } else {
//     air.Date =
//       type === 'Arrival' ? SumSecond(date, 7200) : SumSecond(date, 7200);
//   }

//   if (item != null)
//     if (item.length > 0) {
//       air.Address = item[0].Address;
//       air.Place = item[0].Name;
//       air.PlaceId = item[0].Id;
//     } else if (item.length === undefined) {
//       air.Address = item.Address;
//       air.Place = item.Place;
//       air.PlaceId = item.PlaceId;
//     }
//   return air;
// };

//untuk setup summary program custom
//city : masukan object kota yg berisi region (bisa filter dari balikan API)
//room : berisi object room allocation
export const setSummaryProgram = (city, room) => {
  let SP = copyObject (SummaryProgram);
  //let hourOffset = new Date().getTimezoneOffset() / 60;
  SP.City = city && city;
  SP.Date = convertToStringDate (SumDays (new Date (), 1)) + 'T00:00:00';
  SP.Day = 1;
  SP.LeavingDate = convertToStringDate (SumDays (new Date (), 2)) + 'T00:00:00';
  SP.Region = city ? city.Region.Id : null;
  SP.AccommodationSummary.DateTime = SP.Date;
  SP.AccommodationSummary.CheckIn =
    convertToStringDate (SumDays (new Date (), 1)) + 'T14:00:00';
  SP.AccommodationSummary.CheckOut =
    convertToStringDate (SumDays (new Date (), 2)) + 'T10:00:00';
  //Allocation Room
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

//untuk setup summary program ready
//oldArrival : Object arrival yang lama
//oldSummaryProgram: Object Summaryprogram lama
//cityList :  Array of city yang ada region and country
//room : berisi object room allocation
export const setSummaryProgramReady = (
  Arrival,
  oldSummaryProgram,
  cityList,
  room,
  type
) => {
  let oldSP = copyObject (oldSummaryProgram);
  let oldDate = Arrival.Date;
  let newDate = ['Ready', 'Similar'].indexOf (type) !== -1
    ? convertToStringDate (SumDays (new Date (), 1)) + 'T00:00:00'
    : copyObject (Arrival.Date);

  let newSP = [];
  oldSP.map ((obj, i) => {
    if (obj.AccommodationSummary !== undefined) {
      let SP = copyObject (SummaryProgram);
      if (convertToStringDate (oldDate) !== convertToStringDate (obj.Date)) {
        SP.NextDay = true;
        newDate = SumDays (newDate, 1);
      }
      SP.Day = obj.Day;
      SP.City = cityList.find (item => item.Id === obj.City.Id);
      SP.Region = SP.City.Region.Id;
      SP.TotalDays = obj.TotalDays;
      SP.Date = convertToStringDate (newDate) + 'T00:00:00';
      SP.LeavingDate =
        convertToStringDate (SumDays (SP.Date, SP.TotalDays - 1)) + 'T00:00:00';
      SP.AccommodationSummary.DateTime = SP.Date;
      SP.AccommodationSummary.CheckIn =
        convertToStringDate (SP.Date) + convertToStringTime (obj.Date);
      SP.AccommodationSummary.CheckOut =
        convertToStringDate (SP.LeavingDate) +
        convertToStringTime (obj.LeavingDate);
      SP.AccommodationSummary.Address = obj.AccommodationSummary.Address;
      SP.AccommodationSummary.AccommodationProfileId =
        obj.AccommodationSummary.AccommodationProfileId;
      SP.AccommodationSummary.Name = obj.AccommodationSummary.Name;
      SP.AccommodationSummary.RoomService =
        obj.AccommodationSummary.RoomService;
      SP.AccommodationSummary.RoomName = obj.AccommodationSummary.RoomName;
      SP.AccommodationSummary.RoomType = obj.AccommodationSummary.RoomType;
      SP.AccommodationSummary.SeqNumber = obj.AccommodationSummary.SeqNumber;
      SP.AccommodationSummary.ServiceItemId =
        obj.AccommodationSummary.ServiceItemId;
      //Allocation Room
      SP.AccommodationSummary.Allocations.ChildExtraBedPax =
        room.ChildExtraBedQty;
      SP.AccommodationSummary.Allocations.ChildSharingRoomPax =
        room.ChildSharingRoomQty;
      SP.AccommodationSummary.Allocations.ChildSingleRoomPax =
        room.ChildSingleRoomQty;
      SP.AccommodationSummary.Allocations.ExtraBedPax = room.ExtraBedQty;
      SP.AccommodationSummary.Allocations.NoBedPax = room.BabyCrib + room.NoBed;
      SP.AccommodationSummary.Allocations.SharingBedPax = room.SharingBedQty;
      SP.AccommodationSummary.Allocations.SharingRoomPax = room.SharingRoomQty;
      SP.AccommodationSummary.Allocations.SingleRoomPax = room.SingleRoomQty;
      oldDate = obj.LeavingDate;
      newDate = SP.LeavingDate;
      newSP.push (SP);
    } else {
      oldDate = obj.Date;
      let arr = copyObject (Airport);
      arr.Address = obj.Address;
      arr.City = cityList.find (item => item.Id === obj.City.Id);
      arr.Region = arr.City.Region.Id;
      arr.Day = obj.Day;
      arr.Note = obj.Note;
      arr.Place = obj.Place;
      arr.PlaceId = obj.PlaceId;
      arr.PlaceType = obj.PlaceType;
      arr.Date = convertToStringDate (newDate) + convertToStringTime (obj.Date);
      arr.TransferType = obj.TransferType;
      let accomObj = obj.TransferType === 'Movement_departure'
        ? oldSP[i - 1]
        : oldSP[i + 1];
      let accomCity = cityList.find (item => item.Id === accomObj.City.Id);
      arr.RequestFrom = accomCity.Region.Id;
      if (oldSP[i - 1].AccommodationSummary !== undefined) {
        if (
          convertToStringDate (oldSP[i - 1].LeavingDate) !==
          convertToStringDate (obj.Date)
        ) {
          arr.NextDay = true;
          arr.Date =
            convertToStringDate (SumDays (newDate, 1)) +
            convertToStringTime (obj.Date);
        }
      } else {
        if (
          convertToStringDate (oldSP[i - 1].Date) !==
          convertToStringDate (obj.Date)
        ) {
          arr.NextDay = true;
          arr.Date =
            convertToStringDate (SumDays (newDate, 1)) +
            convertToStringTime (obj.Date);
        }
      }

      newDate = arr.Date;
      newSP.push (arr);
    }
    return obj;
  });

  return newSP;
};

export const setSummaryProgramReadyFixPrice = (
  Arrival,
  oldSummaryProgram,
  cityList,
  room,
  status
) => {
  let oldSP = copyObject (oldSummaryProgram);
  let newDate = status == 'edit'
    ? copyObject (Arrival.Date)
    : convertToStringDate (SumDays (new Date (), 1)) + 'T00:00:00';

  let newSP = [];
  oldSP.map ((obj, i) => {
    if (obj.AccommodationSummary !== undefined) {
      let SP = copyObject (SummaryProgram);
      SP.Day = obj.Day;
      SP.City = cityList.find (item => item.Id === obj.City.Id);
      SP.Region = SP.City.Region.Id;
      SP.TotalDays = obj.TotalDays;
      SP.Date = convertToStringDate (newDate) + 'T00:00:00';
      SP.LeavingDate =
        convertToStringDate (SumDays (SP.Date, SP.TotalDays - 1)) + 'T00:00:00';
      SP.AccommodationSummary.DateTime = SP.Date;
      SP.AccommodationSummary.CheckIn =
        convertToStringDate (SP.Date) + convertToStringTime (obj.Date);
      SP.AccommodationSummary.CheckOut =
        convertToStringDate (SP.LeavingDate) +
        convertToStringTime (obj.LeavingDate);
      SP.AccommodationSummary.Address = obj.AccommodationSummary.Address;
      SP.AccommodationSummary.AccommodationProfileId =
        obj.AccommodationSummary.AccommodationProfileId;
      SP.AccommodationSummary.Name = obj.AccommodationSummary.Name;
      SP.AccommodationSummary.RoomService =
        obj.AccommodationSummary.RoomService;
      SP.AccommodationSummary.RoomType = obj.AccommodationSummary.RoomType;
      SP.AccommodationSummary.SeqNumber = obj.AccommodationSummary.SeqNumber;
      SP.AccommodationSummary.ServiceItemId =
        obj.AccommodationSummary.ServiceItemId;
      //Allocation Room
      SP.AccommodationSummary.Allocations.ChildExtraBedPax =
        room.ChildExtraBedQty;
      SP.AccommodationSummary.Allocations.ChildSharingRoomPax =
        room.ChildSharingRoomQty;
      SP.AccommodationSummary.Allocations.ChildSingleRoomPax =
        room.ChildSingleRoomQty;
      SP.AccommodationSummary.Allocations.ExtraBedPax = room.ExtraBedQty;
      SP.AccommodationSummary.Allocations.NoBedPax = room.BabyCrib + room.NoBed;
      SP.AccommodationSummary.Allocations.SharingBedPax = room.SharingBedQty;
      SP.AccommodationSummary.Allocations.SharingRoomPax = room.SharingRoomQty;
      SP.AccommodationSummary.Allocations.SingleRoomPax = room.SingleRoomQty;
      newDate = SP.LeavingDate;
      newSP.push (SP);
    } else {
      let arr = copyObject (Airport);
      arr.Address = obj.Address;
      arr.City = cityList.find (item => item.Id === obj.City.Id);
      arr.Region = arr.City.Region.Id;
      arr.Day = obj.Day;
      arr.Note = obj.Note;
      arr.Place = obj.Place;
      arr.PlaceId = obj.PlaceId;
      arr.PlaceType = obj.PlaceType;
      arr.Date = convertToStringDate (newDate) + convertToStringTime (obj.Date);
      arr.TransferType = obj.TransferType;
      if (oldSP[i - 1]) {
        if (oldSP[i - 1].AccommodationSummary !== undefined) {
          if (
            convertToStringDate (oldSP[i - 1].LeavingDate) !==
            convertToStringDate (obj.Date)
          ) {
            arr.NextDay = true;
            arr.Date =
              convertToStringDate (SumDays (newDate, 1)) +
              convertToStringTime (obj.Date);
          }
        } else {
          if (
            convertToStringDate (oldSP[i - 1].Date) !==
            convertToStringDate (obj.Date)
          ) {
            arr.NextDay = true;
            arr.Date =
              convertToStringDate (SumDays (newDate, 1)) +
              convertToStringTime (obj.Date);
          }
        }
      }

      newDate = arr.Date;
      newSP.push (arr);
    }
    return obj;
  });

  return newSP;
};

//add accomodation baru
export const addSummaryProgram = (oldSP, nextGT, cityList) => {
  oldSP = copyObject (oldSP);
  let SP = copyObject (SummaryProgram);
  SP.Day = oldSP[oldSP.length - 1].Day + 1;
  SP.Date = nextGT
    ? SumDays (oldSP[oldSP.length - 1].LeavingDate, -1)
    : oldSP[oldSP.length - 1].LeavingDate;
  SP.LeavingDate = nextGT
    ? oldSP[oldSP.length - 1].LeavingDate
    : SumDays (oldSP[oldSP.length - 1].LeavingDate, 1);
  SP.AccommodationSummary.CheckIn = convertToStringDate (SP.Date) + 'T14:00:00';
  SP.AccommodationSummary.CheckOut =
    convertToStringDate (SP.LeavingDate) + 'T10:00:00';
  SP.Region = nextGT ? nextGT.Region : oldSP[oldSP.length - 1].Region;
  SP.AccommodationSummary.Allocations =
    oldSP[oldSP.length - 1].AccommodationSummary.Allocations;
  if (nextGT) {
    let city = cityList.find (city => city.Id === nextGT.City.Id);
    SP.City = city;
    oldSP[oldSP.length - 1].LeavingDate = SumDays (
      oldSP[oldSP.length - 1].LeavingDate,
      -1
    );
    oldSP[oldSP.length - 1].TotalDays = getNumberOfDays (
      oldSP[oldSP.length - 1].Date,
      oldSP[oldSP.length - 1].LeavingDate
    );
  }
  oldSP.push (SP);
  return oldSP;
};
// export const addSummaryProgram = oldSP => {
//   oldSP = copyObject(oldSP);
//   let SP = copyObject(SummaryProgram);
//   SP.Day = oldSP[oldSP.length - 1].Day + 1;
//   SP.Date = oldSP[oldSP.length - 1].LeavingDate;
//   SP.LeavingDate = SumDays(oldSP[oldSP.length - 1].LeavingDate, 1);
//   SP.AccommodationSummary.CheckIn = convertToStringDate(SP.Date) + 'T14:00:00';
//   SP.AccommodationSummary.CheckOut =
//     convertToStringDate(SP.LeavingDate) + 'T10:00:00';
//   SP.Region = oldSP[oldSP.length - 1].Region;
//   SP.AccommodationSummary.Allocations =
//     oldSP[oldSP.length - 1].AccommodationSummary.Allocations;

//   oldSP.push(SP);
//   return oldSP;
// };
//delete acomodasi in daily program
//Arrival : object arrival
//oldSP : array of Object Summary Program
//oldDailyProgram : array of object dailyprogram
//index : objct summary program yg di delete
export const delSummaryProgram = (
  Arrival,
  Departure,
  oldSP,
  oldDailyProgram,
  index
) => {
  let isTicketNext = findIndexTicketNext (oldSP, index);
  let isReturnsTicket = Departure.Ticket.ServiceItemId;
  let newSP = oldSP;
  let newDP = rmDailyProgramByAccomodation (oldSP, oldDailyProgram, index);
  if (isTicketNext || isReturnsTicket)
    newSP = deleteSummaryProgramGroupTicket (oldSP, Departure, index);
  newSP = rmSummaryProgram (Arrival, newSP, index);
  let newDeparture = setDateDeparture (Departure, newSP);
  return {
    dailyProgram: newDP,
    summaryProgram: newSP,
    departure: newDeparture,
  };
};

export const rmDailyProgramByAccomodation = (oldSP, oldDailyProgram, index) => {
  let newDP = copyObject (oldDailyProgram);
  oldSP = copyObject (oldSP);
  let startDate = moment
    .utc (new Date (oldSP[index].Date))
    .format ('YYYY-MM-DD HH:mm');
  startDate = new Date (startDate);
  let leaveDate = moment
    .utc (new Date (oldSP[index].LeavingDate))
    .format ('YYYY-MM-DD HH:mm');
  leaveDate = new Date (leaveDate);
  newDP = newDP.map (SP => {
    let tgl = moment.utc (new Date (SP.Date)).format ('YYYY-MM-DD HH:mm');
    tgl = new Date (tgl);
    let checkin = false;
    if (tgl.getDate () === startDate.getDate ()) {
      for (let j = 0; j < SP.Movements.length; j++) {
        let movMen = SP.Movements[j].MovementName;
        if (checkin == true) {
          SP.Movements.splice (j, 1);
          j--;
        }
        if (movMen == 'CHECKOUT') checkin = true;
      }
    } else if (tgl.getDate () === leaveDate.getDate ()) {
      for (let j = 0; j < SP.Movements.length; j++) {
        let movMen = SP.Movements.MovementName;
        SP.Movements.splice (j, 1);
        j--;
        if (movMen == 'CHECKOUT') {
          break;
        }
      }
    } else if (
      tgl.getDate () > startDate.getDate () &&
      tgl.getDate () < leaveDate.getDate ()
    ) {
      SP.Movements = [];
    }
    return SP;
  });
  //delete dailyprogram if dailydetails is null
  for (let i = 0; i < newDP.length; i++) {
    if (newDP[i].Movements.length == 0) {
      newDP.splice (i, 1);
      i--;
    }
  }

  let mergeIndex = [];
  if (index != 0 || index != oldSP.length - 1) {
    let tgl1 = moment
      .utc (new Date (oldSP[index].Date))
      .format ('YYYY-MM-DD HH:mm');
    tgl1 = new Date (tgl1);
    let tgl2 = moment
      .utc (new Date (oldSP[index].LeavingDate))
      .format ('YYYY-MM-DD HH:mm');
    tgl2 = new Date (tgl2);
    for (let i = 0; i < newDP.length; i++) {
      let tgl = moment
        .utc (new Date (newDP[i].Date))
        .format ('YYYY-MM-DD HH:mm');
      tgl = new Date (tgl);
      if (
        tgl.getDate () === tgl1.getDate () ||
        tgl.getDate () === tgl2.getDate ()
      ) {
        mergeIndex.push (i);
      }
    }
  }

  if (mergeIndex.length > 1) {
    //if delete in not array
    newDP[mergeIndex[0]].Movements = newDP[mergeIndex[0]].Movements.concat (
      newDP[mergeIndex[1]].Movements
    );
    newDP.splice (mergeIndex[1], 1);
  }
  return newDP;
};

export const deleteSummaryProgramGroupTicket = (mainProg, returns, index) => {
  let isGroupTicket = findIndexTicketNext (mainProg, index);
  let isReturnsTicket = returns.Ticket.ServiceItemId;
  let isPrevFlight = mainProg[index - 1].TransferType;

  if (isGroupTicket || isReturnsTicket) {
    if (isPrevFlight) {
      mainProg[index - 3].LeavingDate = mainProg[index].LeavingDate;
      mainProg[index - 3].TotalDays = getNumberOfDays (
        mainProg[index - 3].Date,
        mainProg[index - 3].LeavingDate
      );
    } else {
      mainProg[index - 1].LeavingDate = mainProg[index].LeavingDate;
      mainProg[index - 1].TotalDays = getNumberOfDays (
        mainProg[index - 1].Date,
        mainProg[index - 1].LeavingDate
      );
    }
  }
  return mainProg;
};

export const rmSummaryProgram = (arrival, oldSP, index) => {
  //delete summaryProgram
  let newSP = copyObject (oldSP);
  if (index > -1) {
    if (newSP[index + 1] !== undefined) {
      // check what is mext summary program not null
      let prev = newSP[index - 1].AccommodationSummary;
      let next = newSP[index + 1].AccommodationSummary;
      if (prev === undefined && next === undefined) {
        // prev = arival , next = dep
        for (let j = 0; j < 5; j++)
          newSP.splice (index - 2, 1); // harus di delete arifalnya
      } else if (prev !== undefined && next === undefined) {
        //prev = accom, next = dep
        if (newSP[index - 1].Region === newSP[index].Region)
          newSP.splice (index, 1);
        else {
          for (let j = 0; j < 3; j++)
            newSP.splice (index, 1); // didelete dari index sampai arrival
        }
      } else if (prev === undefined && next !== undefined) {
        // prev = arival , next = accom
        if (newSP[index + 1].Region === newSP[index].Region)
          newSP.splice (index, 1);
        else {
          for (let j = 0; j < 3; j++)
            newSP.splice (index - 2, 1); // didelete dari index sampai arrival
        }
      } else if (prev !== undefined && next !== undefined) {
        newSP.splice (index, 1);
      }
    } else {
      if (newSP[index - 1].AccommodationSummary !== undefined) {
        newSP.splice (index, 1);
      } else {
        for (let j = 0; j < 3; j++)
          newSP.splice (index - 2, 1); // harus di delete arifalnya
      }
    }
  }
  //update datetime
  return setDateSummaryProgram (arrival, newSP);
};
// export const rmSummaryProgram = (arrival, oldSP, index) => {
//   //delete summaryProgram
//   let newSP = copyObject(oldSP);
//   if (index > -1) {
//     if (newSP[index + 1] !== undefined) {
//       // check what is mext summary program not null
//       let prev = newSP[index - 1].AccommodationSummary;
//       let next = newSP[index + 1].AccommodationSummary;
//       if (prev === undefined && next === undefined) {
//         // prev = arival , next = dep
//         for (let j = 0; j < 5; j++) newSP.splice(index - 2, 1); // harus di delete arifalnya
//       } else if (prev !== undefined && next === undefined) {
//         //prev = accom, next = dep
//         if (newSP[index - 1].Region === newSP[index].Region)
//           newSP.splice(index, 1);
//         else {
//           for (let j = 0; j < 3; j++) newSP.splice(index, 1); // didelete dari index sampai arrival
//         }
//       } else if (prev === undefined && next !== undefined) {
//         // prev = arival , next = accom
//         if (newSP[index + 1].Region === newSP[index].Region)
//           newSP.splice(index, 1);
//         else {
//           for (let j = 0; j < 3; j++) newSP.splice(index - 2, 1); // didelete dari index sampai arrival
//         }
//       } else if (prev && next) {
//         newSP.splice(index, 1);
//       }
//     } else {
//       if (newSP[index - 1].AccommodationSummary !== undefined) {
//         newSP.splice(index, 1);
//       } else {
//         for (let j = 0; j < 3; j++) newSP.splice(index - 2, 1); // harus di delete arifalnya
//       }
//     }
//   }
//   //update datetime
//   return setDateSummaryProgram(arrival.Date, newSP);
// };

//change or slect accomodation
//ListSummaryProgram : array summary program
//index : index dari SP
//services: hotel services
//room : object item kamar
//object : hotel
export const changeAccomodation = (
  ListSummaryProgram,
  index,
  services,
  room,
  hotel
) => {
  const newData = copyObject (ListSummaryProgram);
  newData[index].AccommodationSummary.Name = hotel.Name;
  newData[index].AccommodationSummary.Address = hotel.Address;
  newData[index].AccommodationSummary.ImageUrl = hotel.ImageUrl;
  newData[index].AccommodationSummary.RoomType = room.AccommodationType.Name;
  newData[index].AccommodationSummary.RoomName = room.Name;
  newData[index].AccommodationSummary.RoomService = services;
  newData[index].AccommodationSummary.ServiceItemId = room.ServiceItemId;
  newData[index].AccommodationSummary.AccommodationProfileId =
    room.AccommodationProfileId;
  return newData;
};

//change or slect Destination ==> fungsi akan mendelete accomodation
//ListSummaryProgram : array summary program
//index : index dari SP
//city : object city yang berisi region
export const changeDestinationSummaryProgram = (
  Arrival,
  Departure,
  ListSummaryProgram,
  index,
  city
) => {
  const newSP = copyObject (ListSummaryProgram);
  const newArrival = copyObject (Arrival);
  const newDeparture = copyObject (Departure);
  if (index == 0) {
    newArrival.City = city;
    newArrival.Region = city.Region.Id;
    // newArrival.Address = null;
    // newArrival.Place = null;
    // newArrival.PlaceId = null;
    // newArrival.Note = null;
  }
  if (index == newSP.length - 1) {
    newDeparture.City = city;
    newDeparture.Region = city.Region.Id;
    // newDeparture.Address = null;
    // newDeparture.Place = null;
    // newDeparture.PlaceId = null;
    // newDeparture.Note = null;
  }
  newSP[index].City = city;
  newSP[index].Region = city.Region.Id;
  newSP[index].AccommodationSummary.Name = null;
  newSP[index].AccommodationSummary.Address = null;
  newSP[index].AccommodationSummary.RoomType = null;
  newSP[index].AccommodationSummary.RoomName = null;
  newSP[index].AccommodationSummary.RoomService = null;
  newSP[index].AccommodationSummary.ServiceItemId = null;
  newSP[index].AccommodationSummary.AccommodationProfileId = null;
  return {
    Arrival: newArrival,
    Departure: newDeparture,
    SP: newSP,
  };
};

export const findCityById = (cities, id) => {
  return cities.find (item => item.Id === id);
};

//Untuk change airport jika ada perubahan destination
//ArrivalDeparture : object airport
//city : object city yang berisi region dipilih saat change accomodaion
//listAirport : array airport dari beckend
export const changeDestinationArivalDeparture = (
  ArrivalDeparture,
  cities,
  ListAirport,
  requestFrom
) => {
  let air = copyObject (ArrivalDeparture);
  let city = findCityById (cities, ListAirport[0].CityId);
  air.City = city;
  air.Region = city.Region.Id;
  if (ListAirport.length > 0) {
    air.Address = ListAirport[0].AddressObject.AddressString
      ? ListAirport[0].AddressObject.AddressString
      : ListAirport[0].Address;
    air.Place = ListAirport[0].Name;
    air.PlaceId = ListAirport[0].Id;
  } else {
    air.Address = null;
    air.Place = null;
    air.PlaceId = null;
  }
  air.RequestFrom = requestFrom;
  return air;
};

//Untuk change airport jika ada perubahan destination
//Data : object SP atau object Arrival Departure
//airport : object airport yg diselect
export const changeAirport = (Data, index, airport) => {
  let data = copyObject (Data);
  if (index != null) {
    data[index].Address = airport.AddressObject.AddressString
      ? airport.AddressObject.AddressString
      : airport.Address;
    data[index].Place = airport.Name;
    data[index].PlaceId = airport.Id;
    data[index].City = airport.City;
    data[index].Region = airport.Region.Id;
  } else {
    data.Address = airport.AddressObject.AddressString
      ? airport.AddressObject.AddressString
      : airport.Address;
    data.Place = airport.Name;
    data.PlaceId = airport.Id;
    data.City = airport.City;
    data.Region = airport.Region.Id;
  }
  return data;
};

//untuk change date arrival;
//arrival : object arrival
export const setDateArrival = (arrival, date) => {
  let air = copyObject (arrival);
  if (air.length) {
    if (air.length != 0) {
      air.map (item => {
        item.Date = item.NextDay
          ? convertToStringDate (SumDays (date, 1)) +
              convertToStringTime (item.Date)
          : convertToStringDate (changeTime (date)) +
              convertToStringTime (item.Date);
      });
    }
  } else {
    air.Date =
      convertToStringDate (changeTime (date)) +
      convertToStringTime (arrival.Date);
  }

  return air;
};
//untuk change date departure;
//departure : objeck dari departure
//SummaryProgram : list of object summary program
export const setDateDeparture = (departure, SummaryProgram) => {
  let air = copyObject (departure);
  if (air.length) {
    if (air.length != 0) {
      air.map (item => {
        if (item.NextDay) {
          item.Date =
            convertToStringDate (
              SumDays (SummaryProgram[SummaryProgram.length - 1].LeavingDate, 1)
            ) + convertToStringTime (item.Date);
        } else {
          item.Date =
            convertToStringDate (
              SummaryProgram[SummaryProgram.length - 1].LeavingDate
            ) + convertToStringTime (item.Date);
        }
      });
    }
  } else {
    if (air.NextDay) {
      air.Date =
        convertToStringDate (
          SumDays (SummaryProgram[SummaryProgram.length - 1].LeavingDate, 1)
        ) + convertToStringTime (air.Date);
    } else {
      air.Date =
        convertToStringDate (
          SummaryProgram[SummaryProgram.length - 1].LeavingDate
        ) + convertToStringTime (air.Date);
    }
  }
  return air;
};
//change time Arrival or Departure
//arrivalDeparture : object arrival or departure
//time : object date yang berisi time
export const changeTimeArrivalDeparture = (arrivalDeparture, time) => {
  let air = copyObject (arrivalDeparture);
  air.Date =
    convertToStringDate (air.Date) + convertToStringTime (changeTime (time));
  return air;
};

//change time Arrival or Departure Connection Flight
//arrivalDeparture : object arrival or departure connection flight
//time : object date yang berisi time
export const changeTimeConnectionFlight = (arrivalDeparture, index, time) => {
  let air = copyObject (arrivalDeparture);
  air[index].Date =
    convertToStringDate (air[index].Date) +
    convertToStringTime (changeTime (time));
  // air[index].Date = moment
  //   .utc(new Date(air[index].Date))
  //   .format('YYYY-MM-DD HH:mm');
  return air;
};

//set date Summary program jika arrival date diganti
export const setDateSummaryProgram = (arrival, SummaryProgram) => {
  let date = arrival.Date;
  let SP = copyObject (SummaryProgram);
  SP.map (obj => {
    if (obj.NextDay === true) {
      obj.Date =
        convertToStringDate (SumDays (date, 1)) +
        convertToStringTime (obj.Date);
    } else {
      obj.Date = convertToStringDate (date) + convertToStringTime (obj.Date);
    }

    if (obj.AccommodationSummary !== undefined) {
      obj.LeavingDate = SumDays (obj.Date, obj.TotalDays - 1);
      obj.AccommodationSummary.DateTime = obj.Date;
      obj.AccommodationSummary.CheckIn =
        convertToStringDate (obj.Date) +
        convertToStringTime (obj.AccommodationSummary.CheckIn);
      obj.AccommodationSummary.CheckOut =
        convertToStringDate (obj.LeavingDate) +
        convertToStringTime (obj.AccommodationSummary.CheckOut);
      date = obj.LeavingDate;
    } else {
      date = obj.Date;
    }
  });
  return SP;
};
//change duration Accomodation
//SummaryProgram : list of object summary program
//index : index number yang diganti durationnya
//duration : int dari duration day
export const changeDuration = (headline, index, duration) => {
  let SP = copyObject (headline.MainPrograms);
  let indexTicketNext = findIndexTicketNext (SP, index);
  let diffDurationAdd = duration - SP[index].TotalDays;
  let indexTicketPrev = SP[index - 1] &&
    SP[index - 1].Ticket &&
    SP[index - 1].Ticket.ServiceItemId
    ? true
    : false;
  let data = {
    MainPrograms: null,
    errorMessage: null,
  };
  if (
    (indexTicketNext || headline.Returns[0].Ticket.ServiceItemId) &&
    SP[index - 1]
  ) {
    if (
      SP[index - 1].TotalDays + (SP[index].TotalDays - duration) === 1 ||
      SP[index].TotalDays - (SP[index].TotalDays - duration) === 1
    ) {
      data.errorMessage =
        'Maximum days. Please try change duration other destination';
    } else if (
      SP[index - 1].TransferType &&
      SP[index - 3].TotalDays + (SP[index].TotalDays - duration) === 1
    ) {
      data.errorMessage =
        'Maximum days. Please try change duration other destination';
    }
    if (!data.errorMessage) {
      SP[index].Date = SumDays (SP[index].Date, SP[index].TotalDays - duration);

      SP[index].AccommodationSummary.DateTime = SP[index].Date;
      SP[index].AccommodationSummary.CheckIn =
        convertToStringDate (SP[index].Date) +
        convertToStringTime (SP[index].AccommodationSummary.CheckIn);
      SP[index].AccommodationSummary.CheckOut =
        convertToStringDate (SP[index].LeavingDate) +
        convertToStringTime (SP[index].AccommodationSummary.CheckOut);
      SP[index].TotalDays = getNumberOfDays (
        SP[index].Date,
        SP[index].LeavingDate
      );
      // let newData = cutSummaryBetweenTicket(SP, index, headline);
      // data.MainPrograms = combineSummaryProgram(
      //   newData.MainPrograms,
      //   SP,
      //   headline,
      //   index
      // );
      data.MainPrograms = fixingDateTimeChangeDurationSP (
        SP,
        index,
        diffDurationAdd
      );
    }
    // eslint-disable-next-line prettier/prettier
  } else if (
    (indexTicketPrev ||
      headline.Departures[headline.Departures.length - 1].Ticket
        .ServiceItemId) &&
    SP[index + 1]
  ) {
    // eslint-disable-next-line
    if (
      SP[index + 1].TotalDays + (SP[index].TotalDays - duration) === 1 ||
      SP[index].TotalDays - (SP[index].TotalDays - duration) === 1
    ) {
      data.errorMessage =
        'Maximum days. Please try change duration other destination';
    }
    if (!data.errorMessage) {
      SP[index].LeavingDate = SumDays (SP[index].Date, duration - 1);
      SP[index].AccommodationSummary.CheckOut =
        convertToStringDate (SP[index].LeavingDate) +
        convertToStringTime (SP[index].AccommodationSummary.CheckOut);
      SP[index].TotalDays = getNumberOfDays (
        SP[index].Date,
        SP[index].LeavingDate
      );
      // let newData = cutSummaryBetweenTicket(SP, index, headline);
      // data.MainPrograms = combineSummaryProgram(
      //   newData.MainPrograms,
      //   SP,
      //   headline,
      //   index
      // );
      data.MainPrograms = fixingDateTimeChangeDurationSP (
        SP,
        index,
        diffDurationAdd
      );
    }
  } else {
    SP[index].TotalDays = Number (duration);
    SP[index].LeavingDate = SumDays (SP[index].Date, SP[index].TotalDays - 1);
    SP[index].AccommodationSummary.DateTime = SP[index].Date;
    SP[index].AccommodationSummary.CheckIn =
      convertToStringDate (SP[index].Date) +
      convertToStringTime (SP[index].AccommodationSummary.CheckIn);
    SP[index].AccommodationSummary.CheckOut =
      convertToStringDate (SP[index].LeavingDate) +
      convertToStringTime (SP[index].AccommodationSummary.CheckOut);
    let date = SP[index].LeavingDate;
    index++;
    data.MainPrograms = SP[index]
      ? setDateSummaryProgramSequence (SP, null, index, date)
      : SP;
  }
  return data;
};

//set date Summary program
//Summaryprogram : Summ ary Program
//Arrival : Arrival object
//index : index
//date :  date
export const setDateSummaryProgramByIndex = (
  SummaryProgram,
  Arrival,
  index,
  date
) => {
  let SP = copyObject (SummaryProgram);
  let air = copyObject (Arrival);
  date = changeTime (date);
  SP[index].Date =
    convertToStringDate (date) + convertToStringTime (SP[index].Date);
  if (index === 0) {
    SP[index].NextDay = convertToStringDate (SP[index].Date) ===
      convertToStringDate (air.Date)
      ? false
      : true;
  } else {
    if (SP[index - 1].AccommodationSummary !== undefined) {
      SP[index].NextDay = convertToStringDate (SP[index - 1].LeavingDate) ===
        convertToStringDate (SP[index].Date)
        ? false
        : true;
    } else {
      SP[index].NextDay = convertToStringDate (SP[index - 1].Date) ===
        convertToStringDate (SP[index].Date)
        ? false
        : true;
    }
  }

  if (SP[index].AccommodationSummary !== undefined) {
    SP[index].AccommodationSummary.DateTime = SP[index].Date;
    SP[index].AccommodationSummary.CheckIn =
      convertToStringDate (SP[index].Date) +
      convertToStringTime (SP[index].AccommodationSummary.CheckIn);
    SP[index].TotalDays = getNumberOfDays (
      SP[index].Date,
      SP[index].LeavingDate
    );
    date = SP[index].LeavingDate;
  } else {
    date = SP[index].Date;
  }
  index++;
  return SP[index] ? setDateSummaryProgramSequence (SP, null, index, date) : SP;
};

//set date Summary program
//Summaryprogram : Summ ary Program
//Arrival : Arrival object
//index : index
//date :  date
export const setDateSummaryProgramSequence = (
  SummaryProgram,
  Arrival,
  index,
  date
) => {
  let SP = copyObject (SummaryProgram);
  let air = copyObject (Arrival);
  date = changeTime (date);
  SP[index].Date =
    convertToStringDate (date) + convertToStringTime (SP[index].Date);
  if (index == 0) {
    SP[index].NextDay = convertToStringDate (SP[index].Date) ===
      convertToStringDate (air.Date)
      ? false
      : true;
  } else {
    if (SP[index - 1].AccommodationSummary !== undefined) {
      SP[index].NextDay = convertToStringDate (SP[index - 1].LeavingDate) ===
        convertToStringDate (SP[index].Date)
        ? false
        : true;
    } else {
      SP[index - 1].NextDay = convertToStringDate (SP[index - 1].Date) ===
        convertToStringDate (SP[index].Date)
        ? false
        : true;
    }
  }

  if (SP[index].AccommodationSummary !== undefined) {
    SP[index].AccommodationSummary.DateTime = SP[index].Date;
    SP[index].AccommodationSummary.CheckIn =
      convertToStringDate (SP[index].Date) +
      convertToStringTime (SP[index].AccommodationSummary.CheckIn);
    SP[index].LeavingDate = SumDays (SP[index].Date, SP[index].TotalDays - 1);
    SP[index].AccommodationSummary.CheckOut =
      convertToStringDate (SP[index].LeavingDate) +
      convertToStringTime (SP[index].AccommodationSummary.CheckOut);
    date = SP[index].LeavingDate;
  } else {
    date = SP[index].Date;
  }
  index++;
  for (let i = index; i < SP.length; i++) {
    if (SP[i].NextDay === true) {
      SP[i].Date =
        convertToStringDate (SumDays (date, 1)) +
        convertToStringTime (SP[i].Date);
    } else {
      SP[i].Date =
        convertToStringDate (date) + convertToStringTime (SP[i].Date);
    }
    if (SP[i].AccommodationSummary !== undefined) {
      SP[i].LeavingDate = SumDays (SP[i].Date, SP[i].TotalDays - 1);
      SP[i].AccommodationSummary.DateTime = SP[i].Date;
      SP[i].AccommodationSummary.CheckIn =
        convertToStringDate (SP[i].Date) +
        convertToStringTime (SP[i].AccommodationSummary.CheckIn);
      SP[i].AccommodationSummary.CheckOut =
        convertToStringDate (SP[i].LeavingDate) +
        convertToStringTime (SP[i].AccommodationSummary.CheckOut);
      date = SP[i].LeavingDate;
    } else {
      date = SP[i].Date;
    }
  }
  return SP;
};

//addConnection Flight
export const addConnectionFlight = (SummaryProgram, index) => {
  let SP = copyObject (SummaryProgram);
  if (SP[index - 1] != undefined) {
    if (SP[index - 1].AccommodationSummary != undefined) {
      if (SP[index].Region != SP[index - 1].Region) {
        SP.splice (
          index,
          0,
          setInitialAirport (
            null,
            SP[index - 1].City,
            SP[index - 1].Day + 1,
            'Departure',
            SP[index - 1].AccommodationSummary.CheckOut,
            null
          )
        );
        SP.splice (
          index + 1,
          0,
          setInitialAirport (
            null,
            SP[index + 1].City,
            SP[index].Day + 1,
            'Arrival',
            SP[index].Date,
            null
          )
        );
        SP[index + 2].AccommodationSummary.CheckIn = SumSecond (
          SP[index + 1].Date,
          7200
        );
      }
    } else {
      if (SP[index].Region == SP[index - 2].Region) {
        for (let j = 0; j < 2; j++)
          SP.splice (index - 1 - j, 1);
      }
      if (SP[index - 1] != undefined) {
        if (SP[index - 1].AccommodationSummary != undefined) {
          if (SP[index].Region != SP[index - 1].Region) {
            SP.splice (
              index - 1,
              0,
              setInitialAirport (
                null,
                SP[index - 2].City,
                SP[index - 2].Day + 1,
                'Departure',
                SP[index - 2].AccommodationSummary.CheckOut,
                null
              )
            );
            SP.splice (
              index,
              0,
              setInitialAirport (
                null,
                SP[index].City,
                SP[index - 1].Day + 1,
                'Arrival',
                SP[index - 1].Date,
                null
              )
            );
            SP[index + 1].AccommodationSummary.CheckIn = SumSecond (
              SP[index].Date,
              7200
            );
          }
        } else {
          if (SP[index].Region == SP[index - 2].Region) {
            for (let j = 0; j < 2; j++)
              SP.splice (index - 1, 1);
          }
        }
      }
    }
  }
  return SP;
};

//connection Flight when same region
export const deleteConnectionFlight = (SummaryProgram, index) => {
  let SP = copyObject (SummaryProgram);
  if (SP[index - 1] != undefined) {
    for (let j = 0; j < 2; j++)
      SP.splice (index - 1 - j, 1);
  }
  return SP;
};

export const addConnectionFlightManual = (SummaryProgram, index, places) => {
  let SP = copyObject (SummaryProgram);
  let newSp = SP.reduce ((res, main, i, origin) => {
    if (i === index && index !== 0) {
      let prevMain = origin[i - 1];
      let listAirportPrev = findPlaceByRegion (places, prevMain.City.Region.Id);
      let listAirport = findPlaceByRegion (places, main.City.Region.Id);
      let departure = setInitialAirport (
        listAirportPrev,
        prevMain.City,
        prevMain.Day + 1,
        'Departure',
        prevMain.AccommodationSummary.CheckOut,
        null,
        prevMain.City.Region.Id
      );
      let arrival = setInitialAirport (
        listAirport,
        main.City,
        main.Day + 1,
        'Arrival',
        departure.Date,
        null,
        main.City.Region.Id
      );
      main.AccommodationSummary.CheckIn = SumSecond (arrival.Date, 7200);
      res.push (departure, arrival, main);
    } else {
      res.push (main);
    }
    return res;
  }, []);
  return newSp;
};

//change time Accomodation
//SummaryProgram : list of object summary program
//index : number of index yang diedit
//time : string datetime
//type : 'in' untuk checkin dan 'out' untuk checkout
export const changeChecInCheckOut = (SummaryProgram, index, time, type) => {
  let SP = copyObject (SummaryProgram);
  if (type == 'in') {
    SP[index].AccommodationSummary.CheckIn = changeTimeNew (
      SP[index].AccommodationSummary.CheckIn,
      time
    );
    // let hour = getHour(SP[index].AccommodationSummary.CheckIn);
    // if (hour < 14) SP[index].NextDay = true;
    // else SP[index].NextDay = false;
  } else {
    SP[index].AccommodationSummary.CheckOut = changeTimeNew (
      SP[index].AccommodationSummary.CheckOut,
      time
    );
  }

  return SP;
};

//for next days connection flight
export const nextDayConnectionFlight = (
  isNextDay,
  index,
  oldSummaryProgram
) => {
  let newSP = copyObject (oldSummaryProgram);
  if (isNextDay) {
    newSP[index].Date = SubDays (newSP[index].Date, 1);
    newSP[index].NextDay = false;
  } else {
    newSP[index].Date = SumDays (newSP[index].Date, 1);
    newSP[index].NextDay = true;
  }
  return setDateSummaryProgramByIndex (
    newSP,
    null,
    index + 1,
    newSP[index].Date
  );
};
//for next day Departure
export const nextDayDeparture = (isNextDay, Departure) => {
  let newDeparture = copyObject (Departure);
  if (isNextDay) {
    newDeparture.Date = SubDays (newDeparture.Date, 1);
    newDeparture.NextDay = false;
  } else {
    newDeparture.Date = SumDays (newDeparture.Date, 1);
    newDeparture.NextDay = true;
  }
  return newDeparture;
};

// //for next day Departure
// export const nextDayDeparture = (isNextDay, returns) => {
//   let newReturns = copyObject(returns);
//   if (isNextDay) {
//     newReturns.map((item, i) => {
//       item[i].Date = SubDays(item[i].Date, 1);
//       item[i].NextDay = false;
//     });
//   }
//   return newReturns;
// };

///initial Accomodation and Date Ready
//arr = object arrival lama
//dep = object departure lama
//mainPrograms = array of object summary program
//cityList = array of object ctylist
//detailCustom = object detailCustom
//status = "Ready" or "Custom"
export const initialAccomodationAndDate = (
  arr,
  dep,
  mainPrograms,
  cityList,
  detailCustom,
  airport,
  status
) => {
  let sP = [];
  let departures = [];
  let returns = [];

  if (status == 'edit') {
    sP = setSummaryProgramReady (
      arr[0],
      mainPrograms,
      cityList,
      detailCustom.RoomAllocation,
      'edit'
    );

    departures = [
      setInitialAirport (
        arr.length > 1 ? arr[0] : [],
        null,
        1,
        'Departure',
        SumDays (new Date (), 1),
        'edit',
        'T08:00:00'
      ),
      setInitialAirport (
        arr.length > 1 ? arr[1] : arr[0],
        detailCustom.FirstArrival,
        1,
        'Arrival',
        new Date (),
        'edit'
      ),
    ];

    returns = [
      setInitialAirport (
        dep[0],
        cityList.find (item => item.Id === dep[0].City.Id),
        2,
        'Departure',
        sP[sP.length - 1].AccommodationSummary.CheckOut,
        'edit'
      ),
      setInitialAirport (
        [],
        null,
        1,
        'Arrival',
        sP[sP.length - 1].AccommodationSummary.CheckOut,
        'edit',
        'T16:00:00'
      ),
    ];
  } else if (status == 'FixedDateVariable') {
    sP = setSummaryProgramReadyFixPrice (
      arr[0],
      mainPrograms,
      cityList,
      detailCustom.RoomAllocation,
      'edit'
    );

    departures = arr.length > 1
      ? [
          setInitialAirport (arr[0], null, 1, 'Departure', arr.Date[0], 'edit'),
          setInitialAirport (
            arr[1],
            detailCustom.FirstArrival,
            1,
            'Arrival',
            arr[1].Date,
            'edit'
          ),
        ]
      : setInitialAirport (
          arr,
          detailCustom.FirstArrival,
          1,
          'Arrival',
          arr.Date,
          'edit'
        );

    returns = dep.length > 1
      ? [
          setInitialAirport (
            dep[0],
            cityList.find (item => item.Id == dep[0].City.Id),
            dep[0].Day,
            'Departure',
            dep[0].Date,
            'edit'
          ),
          setInitialAirport (
            dep[1],
            cityList.find (item => item.Id == dep[1].City.Id),
            dep[1].Day,
            'Arrival',
            dep[1].Date,
            'edit'
          ),
        ]
      : setInitialAirport (
          dep,
          cityList.find (item => item.Id == dep.City.Id),
          dep.Day,
          'Departure',
          sP[sP.length - 1].AccommodationSummary.CheckOut,
          'edit'
        );
  } else if (status == 'Ready') {
    sP = setSummaryProgramReady (
      arr[0],
      mainPrograms,
      cityList,
      detailCustom.RoomAllocation,
      'Ready'
    );
    departures = [
      setInitialAirport (
        arr.length > 1 ? arr[0] : [],
        null,
        1,
        'Departure',
        SumDays (new Date (), 1),
        'Custom',
        'T08:00:00'
      ),
      setInitialAirport (
        arr.length > 1 ? arr[1] : arr[0],
        detailCustom.FirstArrival,
        1,
        'Arrival',
        new Date (),
        'Ready'
      ),
    ];

    returns = [
      setInitialAirport (
        dep[0],
        cityList.find (item => item.Id === dep[0].City.Id),
        2,
        'Departure',
        sP[sP.length - 1].AccommodationSummary.CheckOut,
        'Ready'
      ),
      setInitialAirport (
        [],
        null,
        1,
        'Arrival',
        sP[sP.length - 1].AccommodationSummary.CheckOut,
        'Custom',
        'T16:00:00'
      ),
    ];
  } else {
    departures = [
      setInitialAirport (
        [],
        null,
        1,
        'Departure',
        SumDays (new Date (), 1),
        'Custom',
        'T08:00:00'
      ),
      setInitialAirport (
        airport,
        detailCustom.FirstArrival,
        1,
        'Arrival',
        SumDays (new Date (), 1),
        'Custom',
        'T10:00:00'
      ),
    ];
    sP = [
      setSummaryProgram (
        detailCustom.FirstArrival,
        detailCustom.RoomAllocation
      ),
    ];

    returns = [
      setInitialAirport (
        airport,
        detailCustom.FirstArrival,
        2,
        'Departure',
        sP[sP.length - 1].LeavingDate,
        'Custom',
        'T12:00:00'
      ),
      setInitialAirport (
        [],
        null,
        2,
        'Arrival',
        sP[sP.length - 1].LeavingDate,
        'Custom',
        'T14:00:00'
      ),
    ];
  }

  return {
    Departures: departures,
    SP: sP,
    Returns: returns,
  };
};

export const initialAccomodationAndDateFixPrice = (
  arr,
  dep,
  mainPrograms,
  cityList,
  detailCustom
) => {
  let arrival = null;
  let sP = [];
  let departure = null;

  sP = setSummaryProgramReadyFixPrice (
    arr,
    mainPrograms,
    cityList,
    detailCustom.RoomAllocation,
    'edit'
  );
  arrival = setInitialAirport (
    arr[0],
    detailCustom.FirstArrival,
    1,
    'Arrival',
    new Date (),
    'edit'
  );

  departure = setInitialAirport (
    dep[0],
    cityList.find (item => item.Id == dep.City.Id),
    dep.Day,
    'Departure',
    sP[sP.length - 1].AccommodationSummary.CheckOut,
    'edit'
  );

  return {
    Arrival: arrival,
    SP: sP,
    Departure: departure,
  };
};

const deleteDayendNextDeparture = dailyProgram => {
  let dpTemp = copyObject (dailyProgram);
  dpTemp.map ((daily, i) => {
    let nextDay = dpTemp[i + 1];
    if (
      nextDay
        ? nextDay.Movements[0]
            ? nextDay.Movements[0].MovementName === 'DEPARTURE'
            : false
        : false
    ) {
      if (
        daily.Movements[0]
          ? daily.Movements[0].MovementName === 'DAYEND'
          : false
      ) {
        dpTemp[i].Movements.pop ();
      }
    }
    return dpTemp;
  });
  return dpTemp;
};

//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// DAILY Program ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
export const dailyGenerate4 = (
  Arrival,
  Departure,
  SummaryProgram,
  oldDailyProgram,
  MovementList,
  //fix variable date
  isVariableDate,
  cityInCountry
) => {
  let DailyProgramTemp = [];
  if (!isVariableDate) {
    DailyProgramTemp = generateInitialDailyProgram ({
      Departures: Arrival,
      MainPrograms: SummaryProgram,
      Returns: Departure,
    });
    DailyProgramTemp = setMovementAirportToDailyProgram (
      DailyProgramTemp,
      Arrival,
      MovementList
    );
    DailyProgramTemp = setMovementConnectionFlight (
      SummaryProgram,
      DailyProgramTemp,
      MovementList
    ); //set connection flight
    DailyProgramTemp = setMovementCheckoutinAccomodasi (
      SummaryProgram,
      DailyProgramTemp,
      MovementList
    ); // setcheckout
    DailyProgramTemp = setMovementAirportToDailyProgram (
      DailyProgramTemp,
      Departure,
      MovementList
    ); //setdeparture
    DailyProgramTemp = getActivityOldDailyProgram (
      //getOldDailyProgram(
      DailyProgramTemp,
      oldDailyProgram,
      cityInCountry
    ); //get old program to new program
    DailyProgramTemp = fixFlightPlaceDailyProgram (
      {
        Departures: Arrival,
        MainPrograms: SummaryProgram,
        Returns: Departure,
      },
      DailyProgramTemp,
      MovementList
    );
    DailyProgramTemp = deleteDayendNextDeparture (DailyProgramTemp);
    DailyProgramTemp = setMovementVirtualAccommodation (
      DailyProgramTemp,
      MovementList
    );
    DailyProgramTemp = setMovementDriving (DailyProgramTemp, MovementList);
    DailyProgramTemp = setMovementDayStartDayEnd (
      SummaryProgram,
      DailyProgramTemp,
      MovementList
    );
    DailyProgramTemp = fixLeaveReturnAccomodation (DailyProgramTemp);
    DailyProgramTemp = checkDayEnd (DailyProgramTemp);
    DailyProgramTemp = setMovementFreetimeLocked (
      DailyProgramTemp,
      MovementList
    );
    DailyProgramTemp = setDailyProgramTempIfNull (DailyProgramTemp);
    DailyProgramTemp = fixDateAndSequenceNum (DailyProgramTemp);
    DailyProgramTemp = fixFlightTime (DailyProgramTemp);
    DailyProgramTemp = fixDayStartDayEndAddress (DailyProgramTemp);
  } else {
    DailyProgramTemp = oldDailyProgram; //get old program to new program
  }
  return DailyProgramTemp;
};

// export const dailyGenerate4 = (
//   Arrival,
//   Departure,
//   SummaryProgram,
//   oldDailyProgram,
//   MovementList
// ) => {
//   let DailyProgramTemp = [];
//   let firstArrival = Arrival[Arrival.length - 1];
//   let lastDeparture = Departure[0];
//   DailyProgramTemp = dailyProgramNull(
//     firstArrival,
//     SummaryProgram,
//     lastDeparture
//   );
//   //dailyProgramNull(Arrival, SummaryProgram, Departure); //create tempalate with destination
//   DailyProgramTemp = setMovementAirportDailyProgram(
//     DailyProgramTemp,
//     firstArrival,
//     MovementList,
//     'ARRIVAL'
//   ); //setarival
//   DailyProgramTemp = setConnectionFlight(
//     SummaryProgram,
//     DailyProgramTemp,
//     MovementList
//   ); //set connection flight
//   DailyProgramTemp = setCheckoutinAccomodasi(
//     SummaryProgram,
//     DailyProgramTemp,
//     MovementList
//   ); // setcheckout
//   DailyProgramTemp = setMovementAirportDailyProgram(
//     DailyProgramTemp,
//     lastDeparture,
//     MovementList,
//     'DEPARTURE'
//   ); //setdeparture
//   DailyProgramTemp = getOldDailyProgram(DailyProgramTemp, oldDailyProgram); //get old program to new program
//   DailyProgramTemp = deleteDayendNextDeparture(DailyProgramTemp);
//   DailyProgramTemp = addVirtualAccomodasi(DailyProgramTemp, MovementList);
//   DailyProgramTemp = addedDriving(DailyProgramTemp, MovementList);
//   DailyProgramTemp = addStartEndDays2(
//     SummaryProgram,
//     DailyProgramTemp,
//     lastDeparture,
//     firstArrival,
//     MovementList
//   );
//   DailyProgramTemp = fixLeaveReturnAccomodation(DailyProgramTemp);
//   DailyProgramTemp = checkDayEnd(DailyProgramTemp);
//   DailyProgramTemp = generateFreeTimeNew(DailyProgramTemp, MovementList);
//   DailyProgramTemp = setDailyProgramTempIfNull(DailyProgramTemp);
//   DailyProgramTemp = fixDateAndSequenceNum(DailyProgramTemp);
//   DailyProgramTemp = fixFlightTime(DailyProgramTemp);
//   DailyProgramTemp = fixDayStartDayEndAddress(DailyProgramTemp);
//   let completeDailyProgram = generateInitialDailyProgram({
//     Departures: Arrival,
//     MainPrograms: SummaryProgram,
//     Returns: Departure,
//   });
//   DailyProgramTemp = copyDailyProgram(completeDailyProgram, DailyProgramTemp);
//   DailyProgramTemp = generateFirstLastFlights(
//     Arrival,
//     Departure,
//     DailyProgramTemp,
//     MovementList
//   );
//   DailyProgramTemp = fixFlightTime(DailyProgramTemp);
//   return DailyProgramTemp;
// };

export const fixFlightTime = dailyProgram => {
  dailyProgram.map (daily => {
    daily.Movements.map ((move, iMove) => {
      if (move.MovementName === FLIGHTTIME) {
        let prevMove = daily.Movements[iMove - 1];
        let nextMove = daily.Movements[iMove + 1];
        move.Item.PlaceId = prevMove ? prevMove.Item.PlaceId : '';
        move.Duration = getNumberOfSecond (move.DateTime, nextMove.DateTime);
      }
      return move;
    });
    // if (daily.MovementName === 'FLIGHTTIME') {
    //   daily.Item.PlaceId = dailyProgram[i - 1].Item.PlaceId;
    //   daily.
    // }
    return daily;
  });
  return dailyProgram;
};

//initial Daily Program with date and Set Destination
//Arrival :  object Arrival
//SummaryProgram: Array of object Summary program
//Departure: object Departure
export const dailyProgramNull = (Arrival, SummaryProgram, Departure) => {
  //set date
  let DP = [];
  let tgl1 = convertToStringDate (Arrival.Date) + 'T00:00:00';
  let days = getNumberOfDays (Arrival.Date, Departure.Date);
  for (let i = 0; i < days; i++) {
    let DailyPrograms = copyObject (DailyProgram);
    DP.push (DailyPrograms);
  }

  DP.map ((obj, index) => {
    let tgl = SumDays (tgl1, index);
    obj.Day = index + 1;
    obj.Date = tgl;
  });
  //Initial Destination Arrival
  let DestinationArrival = {
    Destination: Arrival.City ? Arrival.City.Id : null,
  };
  //Initial Destination Departure
  let DestinationDeparture = {
    Destination: Departure.City ? Departure.City.Id : null,
  };
  //Set Destination

  DestinationArrival.Destination &&
    DP[0].TourDestinations.push (DestinationArrival);

  SummaryProgram.map (obj => {
    let DateFrom = convertToStringDate (obj.Date);
    let DateTo = null;
    let newDP = [];
    if (obj.AccommodationSummary !== undefined) {
      DateTo = convertToStringDate (obj.LeavingDate);
      newDP = DP.filter (
        item =>
          convertToStringDate (item.Date) >= DateFrom &&
          convertToStringDate (item.Date) <= DateTo
      );
    } else {
      newDP = DP.filter (item => convertToStringDate (item.Date) === DateFrom);
    }
    let item = {
      Destination: obj.City ? (obj.City.Id ? obj.City.Id : null) : null,
    };

    newDP.map (x => {
      x.TourDestinations.findIndex (td => td.Destination == item.Destination) <
        0
        ? x.TourDestinations.push (item)
        : null;
    });
  });

  DP[DP.length - 1].TourDestinations.findIndex (
    item => item.Destination === DestinationDeparture.Destination
  ) < 0
    ? DP[DP.length - 1].TourDestinations.push (DestinationDeparture)
    : null;
  return DP;
};

//initial Daily Program with date and Set Destination
//Arrival :  object Arrival
//DailyProgram: Array of object Daily program
//Departure: object Departure
//movementList : array of object type movement
//type :  stirng with value "ARRIVAL" or "DEPARTURE"
export const setMovementAirportDailyProgram = (
  DailyProgram,
  ArrivalDeparture,
  MovementList,
  type
) => {
  let DP = copyObject (DailyProgram);
  type === 'ARRIVAL'
    ? DP[0].Movements.push (
        setAirportMovement (ArrivalDeparture, MovementList, type)
      )
    : DP[DP.length - 1].Movements.push (
        setAirportMovement (ArrivalDeparture, MovementList, type)
      );
  return DP;
};

//Untuk setup airport movement di daily program
//item : object arrival / departure
//movementList : array of object type movement
//type :  stirng with value "ARRIVAL" or "DEPARTURE"
export const setAirportMovement = (item, movementList, type) => {
  let mov = copyObject (Movement);
  let typeMov = movementList.filter (mov => mov.Name === type);
  mov.DateTime = changeTime (item.Date);
  mov.Destination = item.City.Id;
  mov.DestinationName = item.City.Name;
  mov.Item = addItemArrivalDeparture (item, type);
  mov.MovementName = typeMov[0].Name;
  mov.MovementDescription = typeMov[0].Description;
  mov.Note = item.Note;
  mov.SeqNumber = 1;
  mov.ServiceItemId = typeMov[0].ServiceItemId;
  return mov;
};

//Untuk setup item movement airport di daily program
//item : object arrival / departure
//type :  stirng with value "ARRIVAL" or "DEPARTURE"
export const addItemArrivalDeparture = (item, type) => {
  let it = copyObject (ItemMov);
  it.Address.AddressString = item.Address;
  it.CityId = item.City ? item.City.Id : null;
  it.Desc = item.PlaceType;
  it.Name = item.Place;
  it.PlaceId = item.PlaceId;
  if (type === 'ARRIVAL') it.ServiceType = 'Movement_arrival';
  else it.ServiceType = 'Movement_departure';
  return it;
};

//initial connection flight Daily Program
//SummaryProgram: Array of object Summary program
//DailyProgram: Array of object Daily program
//movementList : array of object type movement
export const setConnectionFlight = (
  SummaryProgram,
  DailyProgram,
  MovementList
) => {
  let DP = copyObject (DailyProgram);
  let CF = copyObject (SummaryProgram).filter (
    item => item.AccommodationSummary === undefined
  );
  CF.map (obj => {
    let j = DP.findIndex (
      item => convertToStringDate (item.Date) === convertToStringDate (obj.Date)
    );
    if (j >= 0) {
      obj.TransferType === 'Movement_arrival'
        ? DP[j].Movements.push (
            setAirportMovement (obj, MovementList, 'ARRIVAL')
          )
        : DP[j].Movements.push (
            setAirportMovement (obj, MovementList, 'DEPARTURE')
          );
    }
  });
  return DP;
};

//untuk set movement accomdasi
//SummaryProgram: Array of object Summary program
//DailyProgram: Array of object Daily program
//movementList : array of object type movement
export const setCheckoutinAccomodasi = (
  SummaryProgram,
  DailyProgram,
  MovementList
) => {
  let SP = copyObject (SummaryProgram);
  let DP = copyObject (DailyProgram);
  let i = 0;
  SP = SP.filter (item => item.AccommodationSummary !== undefined);
  let no = SP.length;
  for (let j = 0; j < DP.length; j++) {
    //checkout
    if (
      convertToStringDate (SP[i].LeavingDate) ===
      convertToStringDate (DP[j].Date)
    ) {
      if (DP[j].Movements.length === 0) {
        DP[j].Movements.push (
          setAccomodationtMovement (SP[i], MovementList, 'CHECKOUT')
        );
      } else {
        for (let k = 0; k < DP[j].Movements.length; k++) {
          if (k == DP[j].Movements.length) break;
          else if (DP[j].Movements[k + 1] == null) {
            DP[j].Movements.push (
              setAccomodationtMovement (SP[i], MovementList, 'CHECKOUT')
            );
            k = DP[j].Movements.length;
          } else if (
            convertToStringTime (DP[j].Movements[k].DateTime) <
              convertToStringTime (SP[i].AccommodationSummary.CheckOut) &&
            convertToStringTime (SP[i].AccommodationSummary.CheckOut) <
              convertToStringTime (DP[j].Movements[k + 1].DateTime)
          ) {
            DP[j].Movements.splice (
              k + 1,
              0,
              setAccomodationtMovement (SP[i], MovementList, 'CHECKOUT')
            );
            k = DP[j].Movements.length;
          } else if (
            convertToStringTime (DP[j].Movements[k].DateTime) >
            convertToStringTime (SP[i].AccommodationSummary.CheckOut)
          ) {
            DP[j].Movements.splice (
              k,
              0,
              setAccomodationtMovement (SP[i], MovementList, 'CHECKOUT')
            );
            k = DP[j].Movements.length;
          }
        }
      }
      if (
        convertToStringDate (SP[i].Date) === convertToStringDate (DP[j].Date)
      ) {
        for (let k = 0; k < DP[j].Movements.length; k++) {
          if (k == DP[j].Movements.length) break;
          else if (DP[j].Movements[k + 1] == null) {
            DP[j].Movements.push (
              setAccomodationtMovement (SP[i], MovementList, 'CHECKIN')
            );
            k = DP[j].Movements.length;
          } else if (
            convertToStringTime (DP[j].Movements[k].DateTime) <
              convertToStringTime (SP[i].AccommodationSummary.CheckIn) &&
            convertToStringTime (SP[i].AccommodationSummary.CheckIn) <
              convertToStringTime (DP[j].Movements[k + 1].DateTime)
          ) {
            DP[j].Movements.splice (
              k + 1,
              0,
              setAccomodationtMovement (SP[i], MovementList, 'CHECKIN')
            );
            k = DP[j].Movements.length;
          } else if (
            convertToStringTime (DP[j].Movements[k].DateTime) >
            convertToStringTime (SP[i].AccommodationSummary.CheckIn)
          ) {
            DP[j].Movements.splice (
              k,
              0,
              setAccomodationtMovement (SP[i], MovementList, 'CHECKIN')
            );
            k = DP[j].Movements.length;
          }
        }
      }
      i++;
    }
    if (i === no) break;
    //checkin
    if (convertToStringDate (SP[i].Date) === convertToStringDate (DP[j].Date)) {
      DP[j].Movements.push (
        setAccomodationtMovement (SP[i], MovementList, 'CHECKIN')
      );
      if (
        convertToStringDate (SP[i].LeavingDate) ===
        convertToStringDate (DP[j].Date)
      ) {
        DP[j].Movements.push (
          // eslint-disable-next-line no-undef
          setAccomodationtMovement (SP[i], MovementList, 'CHECKOUT')
        );
        i++;
      }
    }
    if (i === no) break;
  }
  return DP;
};

//untuk set accomodation movement
//item : Object Summary program accomodation
//movementList : array of object type movement
//type : string "CHECKIN" or "CHECKOUT"
// export const setAccomodationtMovement = (item, MovementList, type) => {
//   let aco = copyObject(Movement);
//   let typeMov = MovementList.filter(item => item.Name === type);
//   if (type === 'CHECKIN') {
//     aco.DateTime = item.AccommodationSummary.CheckIn;
//     aco.TypeMovement = false;
//   } else {
//     aco.DateTime = item.AccommodationSummary.CheckOut;
//   }
//   aco.Destination = item.City ? item.City.Id : null;
//   aco.DestinationName = item.City ? item.City.Name : null;
//   aco.Item = addItemHotel(aco.Destination, item.AccommodationSummary);
//   aco.MovementName = typeMov[0].Name;
//   aco.MovementDescription = typeMov[0].Description;
//   aco.ServiceItemId = typeMov[0].ServiceItemId;
//   return aco;
// };

//untuk set item accomodation movement
//Destination : id of City
//AccommodationSummary
export const addItemHotel = (Destination, AccommodationSummary) => {
  let it = copyObject (ItemMov);
  if (AccommodationSummary !== null) {
    it.Address.AddressString = AccommodationSummary.Address;
    it.CityId = Destination;
    it.ProfileDesc = AccommodationSummary.RoomName;
    it.ImageName = AccommodationSummary.ImageName;
    it.ImageUrl = AccommodationSummary.ImageUrl;
    it.Name = AccommodationSummary.Name;
    it.ServiceItemId = AccommodationSummary.ServiceItemId;
    it.ServiceType = AccommodationSummary.RoomService;
  }
  return it;
};

// export const getOldDailyProgram = (newDailyProgram, oldDailyProgram) => {
//   let IndexCheckInOutOld = [];
//   let IndexCheckInOutNew = [];
//   let IndexVirtual = [];
//   let data = null;
//   // eslint-disable-next-line
//   newDailyProgram.map((obj, i) => {
//     // eslint-disable-next-line
//     obj.Movements.map(nextObj => {
//       if (nextObj.MovementName === 'CHECKIN') {
//         data = {
//           In: null,
//           Out: null,
//         };
//         data.In = i;
//       } else if (nextObj.MovementName === 'CHECKOUT') {
//         data.Out = i;
//         IndexCheckInOutNew.push(data);
//       }
//       // return nextObj;
//     });
//     // return obj;
//   });
//   // eslint-disable-next-line
//   oldDailyProgram.map((obj, i) => {
//     // eslint-disable-next-line
//     obj.Movements.map((nextObj, j) => {
//       if (nextObj.MovementName === 'CHECKIN') {
//         data = {
//           In: null,
//           Out: null,
//         };
//         data.In = i;
//       } else if (nextObj.MovementName === 'CHECKOUT') {
//         data.Out = i;
//         IndexCheckInOutOld.push(data);
//       } else if (nextObj.MovementName === 'VIRTUALCHECKOUT') {
//         let data = {
//           IndexI: i,
//           IndexJ: j,
//         };
//         IndexVirtual.push(data);
//       }
//       // return nextObj;
//     });
//     // return obj;
//   });
//   // eslint-disable-next-line
//   IndexCheckInOutNew.some((obj, i) => {
//     let idxnewIn = obj.In;
//     let idxnewOut = obj.Out;
//     if (IndexCheckInOutOld[i] !== undefined) {
//       var idxoldIn = IndexCheckInOutOld[i].In;
//       var idxoldOut = IndexCheckInOutOld[i].Out;
//       for (let j = idxnewIn; j <= idxnewOut; j++) {
//         if (idxoldIn === idxoldOut) j = idxnewOut;
//         if (newDailyProgram[j].Movements.length === 0) {
//           // eslint-disable-next-line
//           oldDailyProgram[idxoldIn].Movements.map((oDP, index) => {
//             let num = newDailyProgram[j].Movements.length;
//             if (
//               [
//                 'RECREATION',
//                 'EAT',
//                 'LEAVEACCOMMODATION',
//                 'RETURNACCOMMODATION',
//                 'DRIVING',
//                 'FREETIMELOCKED',
//                 'FREETIME',
//               ].indexOf(oDP.MovementName) !== -1
//             ) {
//               if (num > 0) {
//                 if (
//                   getHour(oDP.DateTime) >=
//                   getHour(newDailyProgram[j].Movements[num - 1].DateTime)
//                 ) {
//                   newDailyProgram[j].Movements.push(
//                     oldDailyProgram[idxoldIn].Movements[index]
//                   );
//                 } else if (
//                   convertToStringDate(oDP.DateTime) >=
//                   convertToStringDate(
//                     newDailyProgram[j].Movements[num - 1].DateTime
//                   )
//                 ) {
//                   if (oldDailyProgram[idxoldIn].Movements[index + 1]) {
//                     if (
//                       // eslint-disable-next-line
//                       convertToStringDate(oDP.DateTime) ==
//                       convertToStringDate(
//                         oldDailyProgram[idxoldIn].Movements[index + 1].DateTime
//                       )
//                     ) {
//                       newDailyProgram[j].Movements.push(
//                         oldDailyProgram[idxoldIn].Movements[index]
//                       );
//                     }
//                   } else {
//                     newDailyProgram[j].Movements.push(
//                       oldDailyProgram[idxoldIn].Movements[index]
//                     );
//                   }
//                   // oldDailyProgram[idxoldIn].Movements[index + 1]
//                   //   ? convertToStringDate(oDP.DateTime) ==
//                   //     convertToStringDate(
//                   //       oldDailyProgram[idxoldIn].Movements[index + 1].DateTime
//                   //     )
//                   //     ? newDailyProgram[j].Movements.push(
//                   //         oldDailyProgram[idxoldIn].Movements[index]
//                   //       )
//                   //     : null
//                   //   : newDailyProgram[j].Movements.push(
//                   //       oldDailyProgram[idxoldIn].Movements[index]
//                   //     );
//                 }
//               } else {
//                 if (
//                   oDP.Destination ===
//                   newDailyProgram[j].TourDestinations[0].Destination
//                 ) {
//                   newDailyProgram[j].Movements.push(
//                     oldDailyProgram[idxoldIn].Movements[index]
//                   );
//                 }
//               }
//             }
//           });
//           newDailyProgram[j].TourGuides = oldDailyProgram[idxoldIn].TourGuides
//             ? oldDailyProgram[idxoldIn].TourGuides
//             : [];
//         } else {
//           let dp = newDailyProgram[j].Movements;
//           let dpOld = oldDailyProgram[idxoldIn].Movements;
//           let arival = dp.filter(item => item.MovementName === 'ARRIVAL');
//           let checkin = dp.filter(item => item.MovementName === 'CHECKIN');
//           let checkout = dp.filter(item => item.MovementName === 'CHECKOUT');
//           let departure = dp.filter(item => item.MovementName === 'DEPARTURE');
//           dp = arival.concat(checkin, checkout, departure);

//           arival = dpOld.filter(item => item.MovementName === 'ARRIVAL');
//           checkin = dpOld.filter(item => item.MovementName === 'CHECKIN');
//           checkout = dpOld.filter(item => item.MovementName === 'CHECKOUT');
//           departure = dpOld.filter(item => item.MovementName === 'DEPARTURE');
//           dpOld = arival.concat(checkin, checkout, departure);

//           if (dp.length === dpOld.length) {
//             let ok = false;
//             let checkInCheck = false;
//             let checkOutCheck = false;
//             // eslint-disable-next-line
//             dp.some((obj, i) => {
//               if (
//                 obj.MovementName === dpOld[i].MovementName &&
//                 convertToStringTime(obj.DateTime) ===
//                   convertToStringTime(dpOld[i].DateTime) &&
//                 obj.Item.ServiceItemId === dpOld[i].Item.ServiceItemId
//                 // &&
//                 // obj.Item.CityId === dpOld[i].Item.CityId
//               ) {
//                 dpOld[i].Item = obj.Item;
//                 dpOld[i].Destination = obj.Destination;
//                 dpOld[i].Note = obj.Note;

//                 if (obj.MovementName === 'CHECKIN') {
//                   checkInCheck = true;
//                 } else if (obj.MovementName === 'CHECKOUT') {
//                   checkOutCheck = true;
//                 } else if (
//                   obj.MovementName === 'ARRIVAL' ||
//                   obj.MovementName === 'DEPARTURE'
//                 ) {
//                   ok = true;
//                 }
//               } else {
//                 if (obj.MovementName === 'CHECKIN') {
//                   checkInCheck = false;
//                 } else if (obj.MovementName === 'CHECKOUT') {
//                   checkOutCheck = false;
//                 } else if (
//                   obj.MovementName === 'ARRIVAL' ||
//                   obj.MovementName === 'DEPARTURE'
//                 ) {
//                   ok = false;
//                 }
//                 // if (i == dp.length - 1) return true;
//               }
//             });
//             // eslint-disable-next-line
//             if (ok && (checkOutCheck != false || checkInCheck != false)) {
//               newDailyProgram[j].Movements =
//                 oldDailyProgram[idxoldIn].Movements;
//               newDailyProgram[j].TourGuides = oldDailyProgram[idxoldIn]
//                 .TourGuides
//                 ? oldDailyProgram[idxoldIn].TourGuides
//                 : [];
//               // eslint-disable-next-line
//             } else if (checkInCheck != false || checkOutCheck != false) {
//               let indexNewDp = newDailyProgram[j].Movements.findIndex(
//                 obj =>
//                   obj.MovementName === (!checkInCheck ? 'CHECKIN' : 'CHECKOUT')
//               );
//               let indexNewDpTrue = newDailyProgram[j].Movements.findIndex(
//                 obj =>
//                   obj.MovementName === (checkInCheck ? 'CHECKIN' : 'CHECKOUT')
//               );
//               let indexOldDp = oldDailyProgram[idxoldIn].Movements.findIndex(
//                 obj =>
//                   obj.MovementName === (checkInCheck ? 'CHECKIN' : 'CHECKOUT')
//               );
//               let slicdeDpOld =
//                 indexOldDp >= oldDailyProgram[j].Movements.length / 2
//                   ? oldDailyProgram[idxoldIn].Movements.slice(
//                       indexOldDp,
//                       oldDailyProgram[idxoldIn].Movements.length
//                     )
//                   : oldDailyProgram[idxoldIn].Movements.slice(
//                       0,
//                       indexOldDp + 1
//                     );
//               let slicdeDpNew =
//                 indexNewDp >= newDailyProgram[j].Movements.length / 2
//                   ? newDailyProgram[j].Movements.slice(
//                       indexNewDp,
//                       newDailyProgram[j].Movements.length
//                     )
//                   : newDailyProgram[j].Movements.slice(0, indexNewDp + 1);
//               newDailyProgram[j].Movements =
//                 indexNewDpTrue > indexNewDp
//                   ? slicdeDpNew.concat(slicdeDpOld)
//                   : slicdeDpOld.concat(slicdeDpNew);
//             }
//           }
//         }
//         idxoldIn++;
//         if (idxoldIn > idxoldOut) break;
//       }
//     } else return true;
//     // return obj;
//   });

//   let k = 0;
//   //untuk get activity di virtual checkout
//   // eslint-disable-next-line
//   newDailyProgram.some((obj, i) => {
//     if (k < IndexVirtual.length) {
//       let indexArr = obj.Movements.findIndex(
//         item => item.MovementName === 'ARRIVAL'
//       );
//       let indexCO = obj.Movements.findIndex(
//         item => item.MovementName === 'CHECKOUT'
//       );
//       let num = IndexVirtual[k].IndexJ;
//       let id = 0;
//       if (indexArr >= 0) id = indexArr;
//       else if (indexCO >= 0) id = indexCO;

//       if (obj.Movements.length > 1) {
//         if (obj.Movements[id + 1] !== undefined) {
//           if (
//             obj.Movements[id + 1].MovementName === 'VIRTUALCHECKIN' ||
//             obj.Movements[id + 1].MovementName === 'FREETIMELOCKED'
//           ) {
//             obj.Movements[id + 1].Destination = obj.Movements[id].Destination;
//             if (obj.Movements[id + 2].MovementName === 'VIRTUALCHECKIN') {
//               obj.Movements[id + 2].Destination =
//                 obj.Movements[id + 1].Destination;
//               if (obj.Movements[id + 3].MovementName === 'VIRTUALCHECKOUT')
//                 obj.Movements[id + 3].Destination =
//                   obj.Movements[id + 2].Destination;
//             }

//             if (obj.Movements[id + 2].MovementName === 'VIRTUALCHECKOUT')
//               obj.Movements[id + 2].Destination =
//                 obj.Movements[id + 1].Destination;

//             k++;
//           }
//         } else {
//           if (
//             obj.TourDestinations[0].Destination ===
//               oldDailyProgram[IndexVirtual[k].IndexI].TourDestinations[0]
//                 .Destination &&
//             obj.Movements.findIndex(item => item.MovementName === 'CHECKOUT') >=
//               0
//           ) {
//             while (num) {
//               if (
//                 oldDailyProgram[IndexVirtual[k].IndexI].Movements[num]
//                   .MovementName === 'ARRIVAL'
//               )
//                 break;
//               if (
//                 oldDailyProgram[IndexVirtual[k].IndexI].Movements[num]
//                   .MovementName === 'CHECKOUT'
//               )
//                 break;

//               oldDailyProgram[IndexVirtual[k].IndexI].Movements[
//                 num
//               ].Destination =
//                 oldDailyProgram[IndexVirtual[k].IndexI].Movements[
//                   num - 1
//                 ].Destination;
//               obj[i].Movements.splice(
//                 id + 1,
//                 0,
//                 oldDailyProgram[IndexVirtual[k].IndexI].Movements[num]
//               );
//               num--;
//             }
//             k++;
//           }
//         }
//       } else if (obj.Movements.length === 1) {
//         if (
//           obj.Movements[id].MovementName === 'ARRIVAL' ||
//           obj.Movements[id].MovementName === 'CHECKOUT'
//         ) {
//           let Arr = oldDailyProgram[IndexVirtual[k].IndexI].Movements.findIndex(
//             item => item.MovementName === 'ARRIVAL'
//           );
//           let CO = oldDailyProgram[IndexVirtual[k].IndexI].Movements.findIndex(
//             item => item.MovementName === 'CHECKOUT'
//           );
//           let idx = 0;
//           if (Arr >= 0) idx = Arr;
//           if (CO >= 0) idx = CO;

//           if (
//             obj.TourDestinations[0].Destination ===
//             oldDailyProgram[i].TourDestinations[0].Destination
//           )
//             for (
//               let y = idx + 1;
//               y < oldDailyProgram[IndexVirtual[k].IndexI].Movements.length;
//               y++
//             ) {
//               obj.Movements.push(
//                 oldDailyProgram[IndexVirtual[k].IndexI].Movements[y]
//               );
//               if (
//                 oldDailyProgram[IndexVirtual[k].IndexI].Movements[y]
//                   .MovementName === 'VIRTUALCHECKOUT'
//               )
//                 break;
//             }
//         }
//         k++;
//       }
//     }
//     // return obj;
//   });

//   return newDailyProgram;
// };

//untuk set item accomodation movement
//newDailyProgram : DailyProgram baru
//oldDailyProgram : Daily program lama dari props
//return = newDailyProgram
export const getOldDailyProgram = (newDailyProgram, oldDailyProgram) => {
  let IndexCheckInOutOld = [];
  let IndexCheckInOutNew = [];
  let IndexVirtual = [];
  let data = null;
  // eslint-disable-next-line
  newDailyProgram.map ((obj, i) => {
    // eslint-disable-next-line
    obj.Movements.map (nextObj => {
      if (nextObj.MovementName === 'CHECKIN') {
        data = {
          In: null,
          Out: null,
        };
        data.In = i;
      } else if (nextObj.MovementName === 'CHECKOUT') {
        data.Out = i;
        IndexCheckInOutNew.push (data);
      }
      // return nextObj;
    });
    // return obj;
  });
  // eslint-disable-next-line
  oldDailyProgram.map ((obj, i) => {
    // eslint-disable-next-line
    obj.Movements.map ((nextObj, j) => {
      if (nextObj.MovementName === 'CHECKIN') {
        data = {
          In: null,
          Out: null,
        };
        data.In = i;
      } else if (nextObj.MovementName === 'CHECKOUT') {
        data.Out = i;
        IndexCheckInOutOld.push (data);
      } else if (nextObj.MovementName === 'VIRTUALCHECKOUT') {
        let data = {
          IndexI: i,
          IndexJ: j,
        };
        IndexVirtual.push (data);
      }
      // return nextObj;
    });
    // return obj;
  });
  // eslint-disable-next-line
  IndexCheckInOutNew.some ((obj, i) => {
    let idxnewIn = obj.In;
    let idxnewOut = obj.Out;
    if (IndexCheckInOutOld[i] !== undefined) {
      var idxoldIn = IndexCheckInOutOld[i].In;
      var idxoldOut = IndexCheckInOutOld[i].Out;
      for (let j = idxnewIn; j <= idxnewOut; j++) {
        if (idxoldIn === idxoldOut) j = idxnewOut;
        if (newDailyProgram[j].Movements.length === 0) {
          // eslint-disable-next-line
          oldDailyProgram[idxoldIn].Movements.map ((oDP, index) => {
            let num = newDailyProgram[j].Movements.length;
            if (
              [
                'RECREATION',
                'EAT',
                'LEAVEACCOMMODATION',
                'RETURNACCOMMODATION',
                'DRIVING',
                'FREETIMELOCKED',
                'FREETIME',
              ].indexOf (oDP.MovementName) !== -1
            ) {
              if (num > 0) {
                if (
                  getHour (oDP.DateTime) >=
                  getHour (newDailyProgram[j].Movements[num - 1].DateTime)
                ) {
                  newDailyProgram[j].Movements.push (
                    oldDailyProgram[idxoldIn].Movements[index]
                  );
                } else if (
                  convertToStringDate (oDP.DateTime) >=
                  convertToStringDate (
                    newDailyProgram[j].Movements[num - 1].DateTime
                  )
                ) {
                  if (oldDailyProgram[idxoldIn].Movements[index + 1]) {
                    if (
                      // eslint-disable-next-line
                      convertToStringDate (oDP.DateTime) ==
                      convertToStringDate (
                        oldDailyProgram[idxoldIn].Movements[index + 1].DateTime
                      )
                    ) {
                      newDailyProgram[j].Movements.push (
                        oldDailyProgram[idxoldIn].Movements[index]
                      );
                    }
                  } else {
                    newDailyProgram[j].Movements.push (
                      oldDailyProgram[idxoldIn].Movements[index]
                    );
                  }
                  // oldDailyProgram[idxoldIn].Movements[index + 1]
                  //   ? convertToStringDate(oDP.DateTime) ==
                  //     convertToStringDate(
                  //       oldDailyProgram[idxoldIn].Movements[index + 1].DateTime
                  //     )
                  //     ? newDailyProgram[j].Movements.push(
                  //         oldDailyProgram[idxoldIn].Movements[index]
                  //       )
                  //     : null
                  //   : newDailyProgram[j].Movements.push(
                  //       oldDailyProgram[idxoldIn].Movements[index]
                  //     );
                }
              } else {
                if (
                  oDP.Destination ===
                  newDailyProgram[j].TourDestinations[0].Destination
                ) {
                  newDailyProgram[j].Movements.push (
                    oldDailyProgram[idxoldIn].Movements[index]
                  );
                }
              }
            }
          });
          newDailyProgram[j].TourGuides = oldDailyProgram[idxoldIn].TourGuides
            ? oldDailyProgram[idxoldIn].TourGuides
            : [];
        } else {
          let dp = newDailyProgram[j].Movements;
          let dpOld = oldDailyProgram[idxoldIn].Movements;
          let arival = dp.filter (item => item.MovementName === 'ARRIVAL');
          let checkin = dp.filter (item => item.MovementName === 'CHECKIN');
          let checkout = dp.filter (item => item.MovementName === 'CHECKOUT');
          let departure = dp.filter (item => item.MovementName === 'DEPARTURE');
          dp = arival.concat (checkin, checkout, departure);

          arival = dpOld.filter (item => item.MovementName === 'ARRIVAL');
          checkin = dpOld.filter (item => item.MovementName === 'CHECKIN');
          checkout = dpOld.filter (item => item.MovementName === 'CHECKOUT');
          departure = dpOld.filter (item => item.MovementName === 'DEPARTURE');
          dpOld = arival.concat (checkin, checkout, departure);

          if (dp.length === dpOld.length) {
            let ok = false;
            let checkInCheck = false;
            let checkOutCheck = false;
            let isthereCheckin = false;
            let isthereCheckout = false;
            // eslint-disable-next-line
            let indexFlight = dp.findIndex (
              obj =>
                obj.MovementName === 'ARRIVAL' ||
                obj.MovementName === 'DEPARTURE'
            );
            // eslint-disable-next-line
            dp.some ((obj, i) => {
              if (
                obj.MovementName === dpOld[i].MovementName &&
                convertToStringTime (obj.DateTime) ===
                  convertToStringTime (dpOld[i].DateTime) &&
                obj.Item.ServiceItemId === dpOld[i].Item.ServiceItemId
                // &&
                // obj.Item.CityId === dpOld[i].Item.CityId
              ) {
                dpOld[i].Item = obj.Item;
                dpOld[i].Destination = obj.Destination;
                dpOld[i].Note = obj.Note;

                if (obj.MovementName === 'CHECKIN') {
                  checkInCheck = true;
                  isthereCheckin = true;
                } else if (obj.MovementName === 'CHECKOUT') {
                  checkOutCheck = true;
                  isthereCheckout = true;
                } else if (
                  obj.MovementName === 'ARRIVAL' ||
                  obj.MovementName === 'DEPARTURE'
                ) {
                  ok = true;
                }
              } else {
                if (obj.MovementName === 'CHECKIN') {
                  checkInCheck = false;
                  isthereCheckin = true;
                } else if (obj.MovementName === 'CHECKOUT') {
                  checkOutCheck = false;
                  isthereCheckout = true;
                } else if (
                  obj.MovementName === 'ARRIVAL' ||
                  obj.MovementName === 'DEPARTURE'
                ) {
                  ok = false;
                }
                // if (i == dp.length - 1) return true;
              }
            });
            // eslint-disable-next-line
            let replaceDataFlightAccomo = indexFlight
              ? ok && (checkOutCheck !== false || checkInCheck !== false)
                  ? true
                  : false
              : true;
            // eslint-disable-next-line
            if (
              (ok && (checkOutCheck && !isthereCheckin)) ||
              (checkInCheck && !isthereCheckout) ||
              (checkInCheck && checkOutCheck)
            ) {
              // (checkOutCheck !== false || checkInCheck !== false)){
              newDailyProgram[j].Movements =
                oldDailyProgram[idxoldIn].Movements;
              newDailyProgram[j].TourGuides = oldDailyProgram[idxoldIn]
                .TourGuides
                ? oldDailyProgram[idxoldIn].TourGuides
                : [];
              // eslint-disable-next-line
            } else if (
              ok &&
              ((checkInCheck && !checkOutCheck) ||
                (!checkInCheck && checkOutCheck))
            ) {
              // eslint-disable-next-line no-self-assign
              newDailyProgram[j].Movements = newDailyProgram[j].Movements;
            } else if (replaceDataFlightAccomo) {
              if (checkInCheck !== false || checkOutCheck !== false) {
                let indexNewDp = newDailyProgram[j].Movements.findIndex (
                  obj =>
                    obj.MovementName ===
                    (!checkInCheck ? 'CHECKIN' : 'CHECKOUT')
                );
                let indexNewDpTrue = newDailyProgram[j].Movements.findIndex (
                  obj =>
                    obj.MovementName === (checkInCheck ? 'CHECKIN' : 'CHECKOUT')
                );
                let indexOldDp = oldDailyProgram[idxoldIn].Movements.findIndex (
                  obj =>
                    obj.MovementName === (checkInCheck ? 'CHECKIN' : 'CHECKOUT')
                );
                let slicdeDpOld = indexOldDp >=
                  oldDailyProgram[j].Movements.length / 2
                  ? oldDailyProgram[idxoldIn].Movements.slice (
                      indexOldDp,
                      oldDailyProgram[idxoldIn].Movements.length
                    )
                  : oldDailyProgram[idxoldIn].Movements.slice (
                      0,
                      indexOldDp + 1
                    );
                let slicdeDpNew = indexNewDp >=
                  newDailyProgram[j].Movements.length / 2
                  ? newDailyProgram[j].Movements.slice (
                      indexNewDp,
                      newDailyProgram[j].Movements.length
                    )
                  : newDailyProgram[j].Movements.slice (0, indexNewDp + 1);
                newDailyProgram[j].Movements = indexNewDpTrue > indexNewDp
                  ? slicdeDpNew.concat (slicdeDpOld)
                  : slicdeDpOld.concat (slicdeDpNew);
              }
            }
          }
        }
        idxoldIn++;
        if (idxoldIn > idxoldOut) break;
      }
    } else return true;
    // return obj;
  });

  let k = 0;
  //untuk get activity di virtual checkout
  // eslint-disable-next-line
  newDailyProgram.some ((obj, i) => {
    if (k < IndexVirtual.length) {
      let indexArr = obj.Movements.findIndex (
        item => item.MovementName === 'ARRIVAL'
      );
      let indexCO = obj.Movements.findIndex (
        item => item.MovementName === 'CHECKOUT'
      );
      let num = IndexVirtual[k].IndexJ;
      let id = 0;
      if (indexArr >= 0) id = indexArr;
      else if (indexCO >= 0) id = indexCO;

      if (obj.Movements.length > 1) {
        if (obj.Movements[id + 1] !== undefined) {
          if (
            obj.Movements[id + 1].MovementName === 'VIRTUALCHECKIN' ||
            obj.Movements[id + 1].MovementName === 'FREETIMELOCKED'
          ) {
            obj.Movements[id + 1].Destination = obj.Movements[id].Destination;
            if (obj.Movements[id + 2].MovementName === 'VIRTUALCHECKIN') {
              obj.Movements[id + 2].Destination =
                obj.Movements[id + 1].Destination;
              if (obj.Movements[id + 3].MovementName === 'VIRTUALCHECKOUT')
                obj.Movements[id + 3].Destination =
                  obj.Movements[id + 2].Destination;
            }

            if (obj.Movements[id + 2].MovementName === 'VIRTUALCHECKOUT')
              obj.Movements[id + 2].Destination =
                obj.Movements[id + 1].Destination;

            k++;
          }
        } else {
          if (
            obj.TourDestinations[0].Destination ===
              oldDailyProgram[IndexVirtual[k].IndexI].TourDestinations[0]
                .Destination &&
            obj.Movements.findIndex (
              item => item.MovementName === 'CHECKOUT'
            ) >= 0
          ) {
            while (num) {
              if (
                oldDailyProgram[IndexVirtual[k].IndexI].Movements[num]
                  .MovementName === 'ARRIVAL'
              )
                break;
              if (
                oldDailyProgram[IndexVirtual[k].IndexI].Movements[num]
                  .MovementName === 'CHECKOUT'
              )
                break;

              oldDailyProgram[IndexVirtual[k].IndexI].Movements[
                num
              ].Destination =
                oldDailyProgram[IndexVirtual[k].IndexI].Movements[
                  num - 1
                ].Destination;
              obj[i].Movements.splice (
                id + 1,
                0,
                oldDailyProgram[IndexVirtual[k].IndexI].Movements[num]
              );
              num--;
            }
            k++;
          }
        }
      } else if (obj.Movements.length === 1) {
        if (
          obj.Movements[id].MovementName === 'ARRIVAL' ||
          obj.Movements[id].MovementName === 'CHECKOUT'
        ) {
          let Arr = oldDailyProgram[
            IndexVirtual[k].IndexI
          ].Movements.findIndex (item => item.MovementName === 'ARRIVAL');
          let CO = oldDailyProgram[IndexVirtual[k].IndexI].Movements.findIndex (
            item => item.MovementName === 'CHECKOUT'
          );
          let idx = 0;
          if (Arr >= 0) idx = Arr;
          if (CO >= 0) idx = CO;

          if (
            obj.TourDestinations[0].Destination ===
            oldDailyProgram[i].TourDestinations[0].Destination
          )
            for (
              let y = idx + 1;
              y < oldDailyProgram[IndexVirtual[k].IndexI].Movements.length;
              y++
            ) {
              obj.Movements.push (
                oldDailyProgram[IndexVirtual[k].IndexI].Movements[y]
              );
              if (
                oldDailyProgram[IndexVirtual[k].IndexI].Movements[y]
                  .MovementName === 'VIRTUALCHECKOUT'
              )
                break;
            }
        }
        k++;
      }
    }
    // return obj;
  });

  return newDailyProgram;
};
//menambahkan virtual Accomodasi
//newDailyProgram : Daily Program baru
//MovementList : Array of object movementList
export const addVirtualAccomodasi = (newDailyProgram, MovementList) => {
  newDailyProgram.map (obj => {
    for (let j = 0; j < obj.Movements.length; j++) {
      if (obj.Movements[j].MovementName === 'VIRTUALCHECKIN') {
        // obj.Movements[j].Item = copyObject(obj.Movements[j - 1].Item);
        obj.Movements[j].Item = obj.Movements[j - 1].MovementName ===
          'FREETIMELOCKED'
          ? copyObject (obj.Movements[j - 2].Item)
          : copyObject (obj.Movements[j - 1].Item);
      } else if (obj.Movements[j].MovementName === 'VIRTUALCHECKOUT') {
        obj.Movements[j].Item = copyObject (obj.Movements[j - 1].Item);
      } else if (
        obj.Movements[j].MovementName === 'ARRIVAL' ||
        obj.Movements[j].MovementName === 'CHECKOUT'
      ) {
        if (obj.Movements[j + 1] === undefined) {
          obj.Movements.splice (
            j + 1,
            0,
            virtualCheckInOut (obj.Movements[j], MovementList, 'VIRTUALCHECKIN')
          );
          obj.Movements.splice (
            j + 2,
            0,
            virtualCheckInOut (
              obj.Movements[j + 1],
              MovementList,
              'VIRTUALCHECKOUT'
            )
          );
        } else {
          if (
            obj.Movements[j + 1].MovementName === 'VIRTUALCHECKIN' ||
            obj.Movements[j + 1].MovementName === 'FREETIMELOCKED'
          ) {
            // //console.log('Not Function');
          } else {
            obj.Movements.splice (
              j + 1,
              0,
              virtualCheckInOut (
                obj.Movements[j],
                MovementList,
                'VIRTUALCHECKIN'
              )
            );
            obj.Movements.splice (
              j + 2,
              0,
              virtualCheckInOut (
                obj.Movements[j + 1],
                MovementList,
                'VIRTUALCHECKOUT'
              )
            );
          }
        }
      }
    }
    return obj;
  });
  return newDailyProgram;
};

export const virtualCheckInOut = (item, MovementList, type) => {
  let d = copyObject (Movement);
  let mov1 = MovementList.filter (item => item.Name === type);
  d.DateTime = item.DateTime;
  d.SeqNumber = null;
  d.MovementName = mov1[0].Name;
  d.MovementDescription = mov1[0].Description;
  d.Duration = 0;
  d.ServiceItemId = mov1[0].ServiceItemId;
  d.Destination = item.Destination;
  d.DestinationName = item.DestinationName;
  d.Item = item.Item;
  d.TypeVirtual = true;
  return d;
};

//menambahkan driving null di antara activity
export const addedDriving = (newDailyProgram, MovementList) => {
  newDailyProgram.map ((obj, i) => {
    for (let j = 0; j < obj.Movements.length; j++) {
      let mov = obj.Movements[j].MovementName;
      //let item = obj.Movements[j];
      let item = obj.Movements[j + 1] ? obj.Movements[j + 1] : obj.Movements[j];
      let date = SumSecond (
        obj.Movements[j].DateTime,
        obj.Movements[j].Duration
      );
      if (mov === 'ARRIVAL' || mov === 'CHECKOUT') {
        if (mov === 'CHECKOUT') {
          if (j !== 0)
            if (obj.Movements[j - 1].MovementName !== 'CHECKIN') {
              if (obj.Movements[j - 1].MovementName !== 'DAYSTART')
                if (obj.Movements[j].MovementName !== 'DRIVING') {
                  obj.Movements.splice (
                    j,
                    0,
                    AddDrivingNull (MovementList, item, date)
                  );
                  j++;
                }
            }
        }
        if (obj.Movements[j + 1].MovementName !== 'FREETIMELOCKED')
          if (obj.Movements[j + 3] !== undefined) {
            if (obj.Movements[j + 3].MovementName !== 'DRIVING') {
              item = obj.Movements[j + 3];
              obj.Movements.splice (
                j + 3,
                0,
                AddDrivingNull (MovementList, item, date)
              );
              j++;
              item = obj.Movements[j + 1];
            }
          } else {
            obj.Movements.push (AddDrivingNull (MovementList, item, date));
            j++;
          }
      }

      if (mov === 'VIRTUALCHECKOUT') {
        if (obj.Movements[j + 1] === undefined) {
          obj.Movements.splice (
            j + 1,
            0,
            AddDrivingNull (MovementList, item, date)
          );
          j++;
        } else if (obj.Movements[j + 1].MovementName !== 'DRIVING') {
          obj.Movements.splice (
            j + 1,
            0,
            AddDrivingNull (MovementList, item, date)
          );
          j++;
        }
      }

      if (i !== newDailyProgram.length - 1 && mov === 'DEPARTURE') {
        if (obj.Movements[j + 1] !== undefined) {
          if (obj.Movements[j + 1].MovementName !== 'FLIGHTTIME') {
            obj.Movements.splice (
              j + 1,
              0,
              AddMovmentFlight (MovementList, item, date)
            );
            j++;
          }
        } else {
          obj.Movements.push (AddMovmentFlight (MovementList, item, date));
        }
      }
    }
    return obj;
  });

  return newDailyProgram;
};

//untuk mengecek item pada dayend
export const checkDayEnd = DailyProgramTemp => {
  let dpTemp = copyObject (DailyProgramTemp);
  dpTemp.map ((daily, i) => {
    let dayEndIndex = daily.Movements.findIndex (
      item => item.MovementName === 'DAYEND'
    );
    if (dayEndIndex > 0) {
      if (daily.Movements[dayEndIndex - 1].MovementName === 'DRIVING') {
        daily.Movements[dayEndIndex].Destination =
          dpTemp[i + 1].Movements[0].Destination;
        daily.Movements[dayEndIndex].Item = dpTemp[i + 1].Movements[0].Item;
      }
    }
  });
  return dpTemp;
};

export const generateFreeTimeNew = (DailyProgramTemp, MovementList) => {
  let dpTemp = copyObject (DailyProgramTemp);
  dpTemp.map ((daily, iDaily) => {
    for (let j = 0; j < daily.Movements.length; j++) {
      if (daily.Movements[j].MovementName === 'DRIVING') {
        // tambah freetime jika next day departure
        if (
          daily.Movements.length - 1 === j
            ? dpTemp[iDaily + 1]
                ? dpTemp[iDaily + 1].Movements[0]
                    ? dpTemp[iDaily + 1].Movements[0].MovementName ===
                        'DEPARTURE'
                    : false
                : false
            : false
        ) {
          let tgl = SumSecond (
            daily.Movements[j].DateTime,
            daily.Movements[j].Duration
          );
          daily.Movements.splice (
            j + 1,
            0,
            addFreeTime (
              MovementList,
              tgl,
              dpTemp[iDaily + 1].Movements[0],
              0,
              false
            )
          );
          j++;
        } else if (
          ['CHECKIN', 'DEPARTURE', 'DAYEND'].indexOf (
            daily.Movements[j + 1].MovementName
          ) !== -1
        ) {
          // tambah freetime jika next day departure
          let tgl = SumSecond (
            daily.Movements[j].DateTime,
            daily.Movements[j].Duration
          );
          daily.Movements.splice (
            j + 1,
            0,
            addFreeTime (MovementList, tgl, daily.Movements[j + 1], 0, false)
          );
          j++;
        }
      }
      if (daily.Movements[j].MovementName === 'FREETIMELOCKED') {
        // daily.Movements[j].Item =
        //   daily.Movements[j - 1].MovementName !== 'DRIVING'
        //     ? daily.Movements[j - 1].Item
        //     : daily.Movements[j + 1].Item;
        if (daily.Movements[j - 1].MovementName === 'DRIVING') {
          // daily.Movements[j].Item = daily.Movements[j + 1].Item;
          let nextMove = daily.Movements[j + 1];
          let nextDay = dpTemp[iDaily + 1];
          daily.Movements[j].Item = nextMove
            ? nextMove.Item
            : nextDay ? nextDay.Movements[0].Item : null;
          let firstDatetime = daily.Movements[j].DateTime;
          // let secondDatetime = daily.Movements[j + 1].DateTime;
          let secondDatetime = nextMove
            ? nextMove.DateTime
            : nextDay ? nextDay.Movements[0].DateTime : null;
          let duration = getNumberOfSecond (firstDatetime, secondDatetime);
          daily.Movements[j].Duration = duration;
        } else {
          daily.Movements[j].Item = daily.Movements[j - 1].Item;
        }
      }
    }
    return daily;
  });
  return dpTemp;
};

// set movement jika null;
export const setDailyProgramTempIfNull = DailyProgramTemp => {
  let dpTemp = copyObject (DailyProgramTemp);
  dpTemp.map (daily => {
    daily.Movements = daily.Movements.length === 0
      ? generateProgramDetailsIfNull (daily.Date)
      : daily.Movements;
  });
  return dpTemp;
};

//untuk memperbaiki date movement dengan sequence number
export const fixDateAndSequenceNum = DailyProgramTemp => {
  let dpTemp = copyObject (DailyProgramTemp);
  dpTemp.map (daily => {
    daily.Movements.map ((move, j) => {
      move.DateTime =
        convertToStringDate (daily.Date) + convertToStringTime (move.DateTime);
      move.SeqNumber = j + 1;
    });
  });
  return dpTemp;
};

//khusus untuk memperbaiki squntial number
export const sequentialNumberinMovement = DailyProgramTemp => {
  let dpTemp = copyObject (DailyProgramTemp);
  dpTemp.map (daily => {
    daily.Movements.map ((move, j) => {
      move.SeqNumber = j + 1;
    });
  });
  return dpTemp;
};

//fungsi untuk menambahkan 2 objek yaitu day start dan day end
//date : tanggal
//movementlist :array of objek type movement
export const generateProgramDetailsIfNull = (date, MovementList) => {
  let mov = [];
  let mov1 = MovementList.filter (item => item.Name === 'DAYSTART');
  let m = copyObject (Movement);
  m.Id = null;
  m.DateTime = convertToStringDate (date) + 'T08:00:00';
  m.Duration = 0;
  m.MovementDescription = mov1[0].Description;
  m.MovementName = mov1[0].Name;
  m.SeqNumber = 1;
  m.ServiceItemId = mov1[0].ServiceItemId;
  mov.push (m);
  let k = copyObject (Movement);
  mov1 = MovementList.filter (item => item.Name === 'DAYEND');
  k.Id = null;
  k.DateTime = convertToStringDate (date) + 'T20:00:00';
  k.Duration = 0;
  k.MovementDescription = mov1[0].Description;
  k.MovementName = mov1[0].Name;
  k.Note = '';
  k.SeqNumber = 2;
  k.ServiceItemId = mov1[0].ServiceItemId;
  mov.push (k);
  return mov;
};

export const addFreeTime = (MovementList, date, item, duration, type) => {
  //let hourOffset = new Date().getTimezoneOffset() / 60;
  let newMovement = copyObject (Movement);
  let move = MovementList.filter (e => e.Name === 'FREETIMELOCKED');
  newMovement.DateTime = date === null ? item.DateTime : date;
  newMovement.SeqNumber = null;
  newMovement.MovementName = move[0].Name;
  newMovement.MovementDescription = 'Free Time';
  newMovement.Duration = duration;
  newMovement.ServiceItemId = move[0].ServiceItemId;
  newMovement.Destination = item.Destination;
  newMovement.DestinationName = item.DestinationName;
  newMovement.Note = '';
  newMovement.Item = addItemList (item.Item);
  newMovement.TypeMovement = type;
  return newMovement;
};

export const AddMovmentFlight = (movements, item, date) => {
  let newMovement = copyObject (Movement);
  let move = movements.filter (item => item.Name === 'FLIGHTTIME');
  newMovement.DateTime = date;
  newMovement.SeqNumber = null;
  newMovement.MovementName = move[0].Name;
  newMovement.MovementDescription = move[0].Description;
  newMovement.ServiceItemId = move[0].ServiceItemId;
  newMovement.Destination = item.Destination;
  newMovement.DestinationName = item.DestinationName;
  newMovement.Item = addItemList (null);
  newMovement.Duration = 0;
  return newMovement;
};

export const AddDrivingNull = (MovementList, item, date) => {
  let newMovement = copyObject (Movement);
  let move = MovementList.filter (item => item.Name === 'DRIVING');
  newMovement.DateTime = date;
  newMovement.SeqNumber = null;
  newMovement.MovementName = move[0].Name;
  newMovement.MovementDescription = move[0].Description;
  newMovement.ServiceItemId = move[0].ServiceItemId;
  newMovement.Destination = item.Destination;
  newMovement.DestinationName = item.DestinationName;
  newMovement.Item = addItemList (null);
  newMovement.Duration = 0;
  return newMovement;
};

export const checkinCheck = (daily, dayIdx, moveIdx, move, MovementList) => {
  let dailyTemp = copyObject (daily);
  let chIdx = dailyTemp[dayIdx].Movements.findIndex (
    item => item.MovementName === 'CHECKIN'
  );
  if (chIdx >= 0)
    if (chIdx <= moveIdx) {
      let n = 0;
      if (move === 'CHECKIN') n = chIdx + 3;
      else n = chIdx + 2;
      if (
        new Date (dailyTemp[dayIdx].Movements[chIdx].DateTime) <
        new Date (dailyTemp[dayIdx].Movements[n].DateTime)
      ) {
        let date = dailyTemp[dayIdx].Movements[n].DateTime;
        let durasi = 0;
        for (let i = 0; i < n; i++) {
          durasi = dailyTemp[dayIdx].Movements[n - 1 - i].Duration;
          let date1 = SubstractSecond (date, durasi);
          dailyTemp[dayIdx].Movements[n - 1 - i].DateTime = date1;
          date = dailyTemp[dayIdx].Movements[n - 1 - i].DateTime;
          if (
            ['CHECKIN', 'CHECKOUT', 'ARRIVAL'].indexOf (
              dailyTemp[dayIdx].Movements[n - 1 - i].MovementName
            ) !== -1
          ) {
            break;
          }
        }

        chIdx = dailyTemp[dayIdx].Movements.findIndex (
          item => item.MovementName === 'CHECKIN'
        );
        if (chIdx > 0)
          if (
            dailyTemp[dayIdx].Movements[chIdx - 1].MovementName ===
            'FREETIMELOCKED'
          ) {
            let firstDatetime = dailyTemp[dayIdx].Movements[chIdx - 1].DateTime;
            let secondDatetime = dailyTemp[dayIdx].Movements[chIdx].DateTime;
            let duration = getNumberOfSecond (firstDatetime, secondDatetime);
            dailyTemp[dayIdx].Movements[chIdx - 1].Duration = duration;
          } else {
            let time = SumSecond (
              dailyTemp[dayIdx].Movements[chIdx - 1].DateTime,
              dailyTemp[dayIdx].Movements[chIdx - 1].Duration
            );
            let firstDatetime = time;
            let secondDatetime = dailyTemp[dayIdx].Movements[chIdx].DateTime;
            let duration = getNumberOfSecond (firstDatetime, secondDatetime);
            dailyTemp[dayIdx].Movements.splice (
              chIdx,
              0,
              addFreeTime (
                MovementList,
                time,
                dailyTemp[dayIdx].Movements[chIdx],
                duration,
                false
              )
            );
          }
      }
    }
  return dailyTemp;
};
// get function after get driving
// daily : is array of object dailyprogram
// dayIdx : number of index day
// dayIdx : number of index movements
//MovementList : array dari movements
export const afterAddActivityAndDriving = (
  daily,
  dayIdx,
  moveIdx,
  MovementList
) => {
  let newDP = [];
  let idDep = daily[dayIdx].Movements.findIndex (
    e => e.MovementName == 'DEPARTURE'
  );
  let isDep = idDep >= 0 ? true : false;

  if (isDep && moveIdx < idDep) {
    newDP = getFunctionDPBot (daily, dayIdx, moveIdx, MovementList);
  } else {
    newDP = getFunctionDP (daily, dayIdx, moveIdx, MovementList);
  }
  return newDP;
};

// this function is callled when add activity after arrival
// fix the daily program after add activity
export const getFunctionDP = (daily, dayIdx, moveIdx, MovementList) => {
  let dailyTemp = copyObject (daily);
  dailyTemp = checkinCheck (
    dailyTemp,
    dayIdx,
    moveIdx,
    dailyTemp[dayIdx].Movements[moveIdx].MovementName,
    MovementList
  );
  dailyTemp = sequanceDailytoTopNew (
    dailyTemp,
    dayIdx,
    moveIdx,
    dailyTemp[dayIdx].Movements[moveIdx].MovementName,
    MovementList
  );
  dailyTemp = sequanceDailyProgram (dailyTemp, dayIdx);
  dailyTemp = checkOutTime (dailyTemp, dayIdx);
  dailyTemp = generateFreeTimeDP (dailyTemp, dayIdx, MovementList);
  dailyTemp = sequentialNumberinMovementByDays (dailyTemp, dayIdx);
  return dailyTemp;
};

//fix daily program after add activity in lasy day
export const getFunctionDPBot = (daily, dayIdx, moveIdx, MovementList) => {
  let dailyTemp = copyObject (daily);
  dailyTemp = sequanceDailytoTopNew (
    dailyTemp,
    dayIdx,
    moveIdx,
    dailyTemp[dayIdx].Movements[moveIdx].MovementName,
    MovementList
  );
  dailyTemp = sequanceDailyProgram (dailyTemp, dayIdx);
  dailyTemp = sequanceDailyProgramFromLast (dailyTemp, dayIdx); //Old function
  dailyTemp = checkOutTime (dailyTemp, dayIdx);
  dailyTemp = generateFreeTimeDP (dailyTemp, dayIdx, MovementList);
  dailyTemp = sequentialNumberinMovementByDays (dailyTemp, dayIdx);
  return dailyTemp;
};
export const afterEditActivity = (
  daily,
  dayIdx,
  moveIdx,
  activity,
  MovementList
) => {
  daily = copyObject (daily);
  let newDP = [];
  let idDep = daily[dayIdx].Movements.findIndex (
    e => e.MovementName == 'DEPARTURE'
  );
  let isDep = idDep >= 0 ? true : false;
  daily = editDailyProgramItem (daily, dayIdx, moveIdx, activity);
  if (isDep && moveIdx < idDep) {
    newDP = editFunctionDPBot (daily, dayIdx, moveIdx, MovementList);
  } else {
    newDP = editFunctionDP (daily, dayIdx, moveIdx, MovementList);
  }
  return newDP;
};

export const editDailyProgramItem = (daily, dayIdx, moveIdx, activity) => {
  let newDP = copyObject (daily);
  newDP[dayIdx].Movements[moveIdx].DateTime = activity.Startime;
  newDP[dayIdx].Movements[moveIdx].Duration = activity.Duration;
  newDP[dayIdx].Movements[moveIdx].Note = activity.Note;
  return newDP;
};

//fix the daily program after edit activity
export const editFunctionDP = (daily, dayIdx, moveIdx, MovementList) => {
  let dailyTemp = copyObject (daily);
  dailyTemp = checkinCheck (
    dailyTemp,
    dayIdx,
    moveIdx,
    dailyTemp[dayIdx].Movements[moveIdx].MovementName,
    MovementList
  );
  dailyTemp = sequanceDailytoTopNewEdit (dailyTemp, dayIdx, moveIdx);
  dailyTemp = sequanceDailyProgram (dailyTemp, dayIdx);
  dailyTemp = checkOutTime (dailyTemp, dayIdx);
  return dailyTemp;
};
//fix daily program after edit in last day
export const editFunctionDPBot = (daily, dayIdx, moveIdx, MovementList) => {
  let dailyTemp = copyObject (daily);
  dailyTemp = sequanceDailytoTopNewEdit (dailyTemp, dayIdx, moveIdx);
  dailyTemp = sequanceDailyProgram (dailyTemp, dayIdx);
  dailyTemp = sequanceDailyProgramFromLast (dailyTemp, dayIdx); //Old function
  dailyTemp = checkOutTime (dailyTemp, dayIdx);
  dailyTemp = generateFreeTimeDP (dailyTemp, dayIdx, MovementList);
  dailyTemp = sequentialNumberinMovementByDays (dailyTemp, dayIdx);
  return dailyTemp;
};

export const getDrivingDurations3 = async (drivings, daillyProgram) => {
  let {durationStore} = this.props;
  let dp = copyObject (daillyProgram);
  for (var i = 0; i < drivings.length; i++) {
    let obj = drivings[i];
    let existingDuration = durationStore.find (
      item => item.from === obj.from && item.to === obj.to
    );
    if (existingDuration) {
      dp[obj.day].Movements[obj.index].Duration = existingDuration.duration;
    } else if (obj.fromType === 'ID' && obj.toType === 'ADDRESS') {
      let response = await this.props.getDurationIdtoAddress (
        obj.from,
        obj.to,
        obj.day,
        obj.index
      );
      dp[obj.day].Movements[obj.index].Duration = response
        ? response.payload.Duration.value
        : 0;
    } else if (obj.fromType === 'ADDRESS' && obj.toType === 'ID') {
      let response = await this.props.getDurationAddresstoId (
        obj.from,
        obj.to,
        obj.day,
        obj.index
      );
      dp[obj.day].Movements[obj.index].Duration = response
        ? response.payload.Duration.value
        : 0;
    } else {
      let response = await this.props.getDurationIdtoId (
        obj.from,
        obj.to,
        obj.day,
        obj.index
      );
      dp[obj.day].Movements[obj.index].Duration = response
        ? response.payload.Duration.value
        : 0;
    }
  }
  return dp;
};

export const getFunctionAfterDriving = DailyProgramTemp => {
  let newDpTemp = copyObject (DailyProgramTemp);
  newDpTemp = sequentialNumberinMovement (newDpTemp);
  newDpTemp = addDurationFlightTime (newDpTemp);
  newDpTemp = sequenceDP (newDpTemp);
  newDpTemp = checkDurationFreetime (newDpTemp);
  return newDpTemp;
};

export const addDurationFlightTime = dailyProgramTemp => {
  let newDpTemp = copyObject (dailyProgramTemp);
  newDpTemp.map (daily => {
    daily.Movements.map ((move, i) => {
      if (move.MovementName === 'FLIGHTTIME') {
        move.Duration = getNumberOfSecond (
          move.DateTime,
          daily.Movements[i + 1].DateTime
        );
      }
      return move;
    });
    return daily;
  });
  return newDpTemp;
};

export const sequenceDP = DailyProgramTemp => {
  for (let i = 0; i < DailyProgramTemp.length - 1; i++) {
    let duration = DailyProgramTemp[i].Movements[0].Duration;
    let date = DailyProgramTemp[i].Movements[0].DateTime;

    for (let j = 1; j < DailyProgramTemp[i].Movements.length; j++) {
      let date1 = SumSecond (date, duration);
      if (
        DailyProgramTemp[i].Movements[j - 1].MovementName === 'CHECKIN' &&
        DailyProgramTemp[i].Movements[j].MovementName === 'CHECKOUT'
      )
        break;
      if (
        DailyProgramTemp[i].Movements[j - 1].MovementName === 'CHECKIN' &&
        DailyProgramTemp[i].Movements[j].MovementName === 'DAYEND'
      )
        break;
      if (
        DailyProgramTemp[i].Movements[j - 1].MovementName === 'DAYSTART' &&
        DailyProgramTemp[i].Movements[j].MovementName === 'DAYEND'
      )
        break;
      if (
        DailyProgramTemp[i].Movements[j - 1].MovementName === ARRIVAL &&
        DailyProgramTemp[i].Movements[j].MovementName === DEPARTURE
      )
        break;

      DailyProgramTemp[i].Movements[j].DateTime = date1;
      if (DailyProgramTemp[i].Movements[j].MovementName === 'FREETIMELOCKED') {
        let nextMove = DailyProgramTemp[i].Movements[j + 1];
        let nextDay = DailyProgramTemp[i + 1]
          ? DailyProgramTemp[i + 1].Movements[0]
          : false;
        // let b = DailyProgramTemp[i].Movements[j + 1].DateTime;
        let b = nextMove
          ? nextMove.DateTime
          : nextDay ? nextDay.DateTime : null;
        let a = DailyProgramTemp[i].Movements[j].DateTime;
        let newDuration = getNumberOfSecond (a, b);
        if (newDuration < 0) newDuration = 0;
        DailyProgramTemp[i].Movements[j].Duration = newDuration;
      }
      date = DailyProgramTemp[i].Movements[j].DateTime;
      duration = DailyProgramTemp[i].Movements[j].Duration;
    }
  }

  let idx = DailyProgramTemp.length - 1;
  let idp = DailyProgramTemp[idx].Movements.length;
  let date = DailyProgramTemp[idx].Movements[idp - 1].DateTime;
  for (let j = 1; j < DailyProgramTemp[idx].Movements.length; j++) {
    if (
      DailyProgramTemp[idx].Movements[idp - 1 - j].MovementName ===
        'CHECKOUT' &&
      DailyProgramTemp[idx].Movements[idp - 2 - j].MovementName === 'CHECKIN'
    ) {
      let date1 = SubstractSecond (
        date,
        DailyProgramTemp[idx].Movements[idp - 1 - j].Duration
      );
      DailyProgramTemp[idx].Movements[idp - 1 - j].DateTime = date1;
      break;
    }
    if (
      DailyProgramTemp[idx].Movements[idp - 1 - j].MovementName ===
      'FREETIMELOCKED'
    ) {
      let time = SumSecond (
        DailyProgramTemp[idx].Movements[idp - 2 - j].DateTime,
        DailyProgramTemp[idx].Movements[idp - 2 - j].Duration
      );
      let b = date;
      let a = time;
      let newDuration = getNumberOfSecond (a, b);
      if (newDuration < 0) newDuration = 0;
      DailyProgramTemp[idx].Movements[idp - 1 - j].Duration = newDuration;
      let dateNew = SubstractSecond (date, newDuration);
      DailyProgramTemp[idx].Movements[idp - 1 - j].DateTime = dateNew;
    } else if (
      DailyProgramTemp[idx].Movements[idp - 1 - j].MovementName === DEPARTURE &&
      (DailyProgramTemp[idx].Movements[idp - 2 - j] &&
        DailyProgramTemp[idx].Movements[idp - 2 - j].MovementName === ARRIVAL)
    ) {
      break;
    } else {
      let date1 = SubstractSecond (
        date,
        DailyProgramTemp[idx].Movements[idp - 1 - j].Duration
      );
      DailyProgramTemp[idx].Movements[idp - 1 - j].DateTime = date1;
    }
    date = DailyProgramTemp[idx].Movements[idp - 1 - j].DateTime;
  }
  return DailyProgramTemp;
};

export const checkDurationFreetime = oldDp => {
  let dpTemp = copyObject (oldDp);
  for (let i = 0; i < dpTemp.length; i++) {
    for (let j = 0; j < dpTemp[i].Movements.length; j++) {
      let move = dpTemp[i].Movements[j].MovementName;
      // let duration = dpTemp[i].Movements[j].Duration;
      if (move === 'FREETIMELOCKED') {
        if (
          dpTemp[i].Movements.length - 1 === j
            ? dpTemp[i + 1]
                ? dpTemp[i + 1].Movements[0]
                    ? dpTemp[i + 1].Movements[0].MovementName === 'DEPARTURE'
                    : false
                : false
            : false
        ) {
          let a = oldDp[i + 1].Movements[0].DateTime;
          let b = oldDp[i].Movements[j].DateTime;
          let duration = getNumberOfSecond (b, a);
          dpTemp[i].Movements[j].Duration = duration;
        } else if (
          dpTemp[i].Movements[j + 1]
            ? dpTemp[i].Movements[j + 1].MovementName === 'DAYEND'
            : false
        ) {
          let a = oldDp[i + 1].Movements[0].DateTime;
          let b = oldDp[i].Movements[j].DateTime;
          let duration = getNumberOfSecond (b, a);
          dpTemp[i].Movements[j].Duration = duration;
        }
      }

      if (move === 'FLIGHTTIME') {
        if (dpTemp[i].Movements[j + 1].MovementName === 'DAYEND') {
          let b = dpTemp[i + 1].Movements[0].DateTime;
          let a = dpTemp[i].Movements[j - 1].DateTime;
          let duration = getNumberOfSecond (a, b);
          if (duration < 0) duration = 0;
          dpTemp[i].Movements[j].Duration = duration;
          dpTemp[i].Movements[j + 1].Item = dpTemp[i + 1].Movements[0].Item;
        }
      }
    }
  }
  return dpTemp;
};

//list attraction
//menghapus isi list atraksi
//listAttraction: list attraksi
export const destroyListAtt = listAttraction => {
  let list = copyObject (listAttraction);
  list.length = 0;
  return list;
};
//menambahkan object atraksi ke list atraksi
//listAttraction: list attraksi
//param: object atraksi
export const setListAttraction = (listAttraction, param) => {
  let list = copyObject (listAttraction);
  list.push (param);
  return list;
  // listAttraction.push(param);
};

// menambahkan aktivitas pada daily program
//DailyProgram : Array daily program yang lama
//id: index dari daily prgram yang sedang dirubah saat ini
//moveIdx: index dari movement saat ini
//TypeMovement : object dari movment yang dipih
//itemMovement: object dari excursion and resto, klo freetime kirim aja null
//activityData: object activty data
export const addDailyDetails = (
  DailyProgram,
  id,
  moveIdx,
  TypeMovement,
  MovementList,
  itemMovement,
  activityData
) => {
  let dailyTemp = copyObject (DailyProgram);
  let move = dailyTemp[id].Movements[moveIdx].MovementName;
  let item = [
    'CHECKIN',
    'DAYSTART',
    'LEAVEACCOMMODATION',
    'RECREATION',
  ].indexOf (move) !== -1
    ? dailyTemp[id].Movements[moveIdx].Item
    : null;
  if (['CHECKIN', 'DAYSTART'].indexOf (move) !== -1) {
    dailyTemp[id].Movements.splice (
      moveIdx + 1,
      0,
      addLeaveAco (dailyTemp, MovementList, item, id, moveIdx)
    );
    dailyTemp[id].Movements.splice (
      moveIdx + 2,
      0,
      AddDriving (dailyTemp, id, moveIdx, MovementList)
    );

    if (TypeMovement.Name === 'RECREATION')
      dailyTemp[id].Movements.splice (
        moveIdx + 3,
        0,
        addMovement (
          dailyTemp,
          TypeMovement,
          itemMovement,
          activityData,
          id,
          moveIdx
        )
      );
    else
      dailyTemp[id].Movements.splice (
        moveIdx + 3,
        0,
        addEatFreeTime (
          dailyTemp,
          id,
          moveIdx,
          item,
          itemMovement,
          TypeMovement,
          activityData
        )
      );

    dailyTemp[id].Movements.splice (
      moveIdx + 4,
      0,
      AddDriving (dailyTemp, id, moveIdx, MovementList)
    );
    dailyTemp[id].Movements.splice (
      moveIdx + 5,
      0,
      addReaturnAco (dailyTemp, MovementList, item, id, moveIdx)
    );
  } else if (move === 'VIRTUALCHECKIN') {
    dailyTemp[id].Movements.splice (
      moveIdx + 1,
      0,
      virtualLeave (
        dailyTemp,
        MovementList,
        dailyTemp[id].Movements[moveIdx].Item,
        id,
        moveIdx
      )
    );
    dailyTemp[id].Movements.splice (
      moveIdx + 2,
      0,
      AddDriving (dailyTemp, id, moveIdx + 2, MovementList)
    );
    if (TypeMovement.Name === 'RECREATION')
      dailyTemp[id].Movements.splice (
        moveIdx + 3,
        0,
        addMovement (
          dailyTemp,
          TypeMovement,
          itemMovement,
          activityData,
          id,
          moveIdx + 3
        )
      );
    else
      dailyTemp[id].Movements.splice (
        moveIdx + 3,
        0,
        addEatFreeTime (
          dailyTemp,
          id,
          moveIdx + 3,
          item,
          itemMovement,
          TypeMovement,
          activityData
        )
      );

    dailyTemp[id].Movements.splice (
      moveIdx + 4,
      0,
      AddDriving (dailyTemp, id, moveIdx + 4, MovementList)
    );
    dailyTemp[id].Movements.splice (
      moveIdx + 5,
      0,
      virtualReturn (
        dailyTemp,
        MovementList,
        dailyTemp[id].Movements[moveIdx + 3].Item,
        id,
        moveIdx + 5
      )
    );

    dailyTemp[id].Movements[moveIdx + 6].Item =
      dailyTemp[id].Movements[moveIdx + 5].Item;
  } else {
    dailyTemp[id].Movements.splice (
      moveIdx + 1,
      0,
      AddDriving (dailyTemp, id, moveIdx, MovementList)
    );
    if (TypeMovement.Name === 'RECREATION')
      dailyTemp[id].Movements.splice (
        moveIdx + 2,
        0,
        addMovement (
          dailyTemp,
          TypeMovement,
          itemMovement,
          activityData,
          id,
          moveIdx + 1
        )
      );
    else
      dailyTemp[id].Movements.splice (
        moveIdx + 2,
        0,
        addEatFreeTime (
          dailyTemp,
          id,
          moveIdx,
          item,
          itemMovement,
          TypeMovement,
          activityData
        )
      );

    if (
      dailyTemp[id].Movements[moveIdx + 4].MovementName ===
      'VIRTUALRETURNACCOMMODATION'
    ) {
      dailyTemp[id].Movements[moveIdx + 4].Item =
        dailyTemp[id].Movements[moveIdx + 2].Item;
      dailyTemp[id].Movements[moveIdx + 5].Item =
        dailyTemp[id].Movements[moveIdx + 2].Item;
    }
  }
  return dailyTemp;
};

//untuk set duration
//daily : Array daily program yang lama
//id: index dari daily prgram yang sedang dirubah saat ini
//moveIdx: index dari movement saat ini
//par : parameter boolean
export const sequanceDailyDPDays = (daily, id, moveIdx, par) => {
  let idx = 0;
  let dailyTemp = copyObject (daily);
  idx = id ? (par ? moveIdx - 3 : moveIdx - 2) : 0;
  let duration = dailyTemp[id].Movements[idx].Duration;
  let dataLength = dailyTemp[id].Movements.length;
  let date = dailyTemp[id].Movements[idx].DateTime;
  for (let i = idx + 1; i < dataLength; i++) {
    let activity = dailyTemp[id].Movements[i];
    let date1 = SumSecond (date, duration);
    activity.DateTime = date1; // date1.slice(0, -6);
    date = activity.DateTime;
    duration = activity.Duration;
    activity.SeqNumber = i + 1;
    if (
      ['VIRTUALCHECKIN', 'VIRTUALCHECKOUT'].indexOf (activity.MovementName) !==
      -1
    )
      dailyTemp[id].Movements[i].Item = dailyTemp[id].Movements[i - 1].Item;
    if (dailyTemp[id].Movements[i + 1] !== undefined) {
      if (dailyTemp[id].Movements[i + 1].MovementName === 'FREETIMELOCKED') {
        let newDate = SumSecond (activity.DateTime, activity.Duration);
        let firstDateTime = newDate;
        // let secondDateTime = dailyTemp[id].Movements[i + 2].DateTime;
        let nextDay = dailyTemp[id + 1];
        let secondDateTime = dailyTemp[id].Movements[i + 2]
          ? dailyTemp[id].Movements[i + 2].DateTime
          : nextDay
              ? nextDay.Movements[0].MovementName === 'DEPARTURE'
                  ? nextDay.Movements[0].DateTime
                  : null
              : null;
        let duration = getNumberOfSecond (firstDateTime, secondDateTime);
        dailyTemp[id].Movements[i + 1].Duration = duration < 0 ? 0 : duration;
      }
    }
  }
  return dailyTemp;
};

//untuk untuk memperbaiki time
//daily : Array daily program yang lama
//id: index dari daily prgram yang sedang dirubah saat ini
//moveIdx: index dari movement saat ini
export const sequanceDailytoTopNewEdit = (daily, dayIdx, moveIdx) => {
  let dailyTemp = copyObject (daily);
  // let n = IdP;
  let duration = 0;
  //if n = 5;
  let date = dailyTemp[dayIdx].Movements[moveIdx].DateTime;
  for (let i = 0; i < moveIdx; i++) {
    if (dailyTemp[dayIdx].Movements[moveIdx - 1 - i].MovementName === 'ARRIVAL')
      break;
    duration = dailyTemp[dayIdx].Movements[moveIdx - 1 - i].Duration;
    dailyTemp[dayIdx].Movements[moveIdx - 1 - i].DateTime = SubstractSecond (
      date,
      duration
    );
    date = dailyTemp[dayIdx].Movements[moveIdx - 1 - i].DateTime;
  }
  return dailyTemp;
};

//untuk untuk memperbaiki time
//daily : Array daily program yang lama
//id: index dari daily prgram yang sedang dirubah saat ini
//moveIdx: index dari movement saat ini
//move: movement name saat ini
export const sequanceDailytoTopNew = (
  daily,
  dayIdx,
  moveIdx,
  move,
  MovementList
) => {
  let dailyTemp = copyObject (daily);
  let addVariable = ['DAYSTART', 'CHECKIN', 'VIRTUALCHECKIN'].indexOf (move) !==
    -1
    ? 3
    : 2;
  // if (mov === "DAYSTART" || mov === "CHECKIN" || mov === "VIRTUALCHECKIN") x = 3;
  // else x = 2;
  let n = moveIdx + addVariable;
  let duration = 0;

  let date = dailyTemp[dayIdx].Movements[n].DateTime;
  for (let i = 0; i < n; i++) {
    if (dailyTemp[dayIdx].Movements[n - 1 - i].MovementName === 'ARRIVAL') {
      if (
        dailyTemp[dayIdx].Movements[n - i].MovementName === 'FREETIMELOCKED'
      ) {
        dailyTemp[dayIdx].Movements[n - i].DateTime =
          dailyTemp[dayIdx].Movements[n - 1 - i].DateTime;
        let firstDateTime = dailyTemp[dayIdx].Movements[n - 1 - i].DateTime;
        let secondDateTime = dailyTemp[dayIdx].Movements[n + 1 - i].DateTime;
        let duration2 = getNumberOfSecond (firstDateTime, secondDateTime);
        dailyTemp[dayIdx].Movements[n - i].Duration = duration2 <= 0
          ? 0
          : duration2;
      } else {
        let firstDateTime = dailyTemp[dayIdx].Movements[n - 1 - i].DateTime;
        let secondDateTime = dailyTemp[dayIdx].Movements[n - i].DateTime;
        let duration2 = getNumberOfSecond (firstDateTime, secondDateTime);
        if (duration2 <= 0) duration2 = 0;
        dailyTemp[dayIdx].Movements.splice (
          n - i,
          0,
          addFreeTime (
            MovementList,
            dailyTemp[dayIdx].Movements[n - 1 - i].DateTime,
            dailyTemp[dayIdx].Movements[n - 1 - i],
            duration2,
            false
          )
        );
      }
      break;
    }

    if (
      dailyTemp[dayIdx].Movements[n - 1 - i].MovementName == 'RECREATION' &&
      dailyTemp[dayIdx].Movements[n - 1 - i].Item.ServiceType == 'Package'
    )
      break;
    duration = dailyTemp[dayIdx].Movements[n - 1 - i].Duration;
    let date1 = SubstractSecond (date, duration);
    dailyTemp[dayIdx].Movements[n - 1 - i].DateTime = date1;
    date = dailyTemp[dayIdx].Movements[n - 1 - i].DateTime;
  }
  return dailyTemp;
};

//untuk untuk memperbaiki time
//daily : Array daily program yang lama
//id: index dari daily prgram yang sedang dirubah saat ini
export const sequanceDailyProgram = (daily, dayIdx) => {
  let dailyTemp = copyObject (daily);
  let arrivalIdx = dailyTemp[dayIdx].Movements.findIndex (
    e => e.MovementName === 'ARRIVAL'
  );
  if (arrivalIdx <= 0) arrivalIdx = 0;
  let duration = dailyTemp[dayIdx].Movements[arrivalIdx].Duration;
  let date = moment
    .utc (new Date (dailyTemp[dayIdx].Movements[arrivalIdx].DateTime))
    .format ('YYYY-MM-DD HH:mm');
  dailyTemp[dayIdx].Movements[0].SeqNumber = 1;
  for (let i = arrivalIdx + 1; i < dailyTemp[dayIdx].Movements.length; i++) {
    if (dailyTemp[dayIdx].Movements[i].MovementName == 'DEPARTURE') break;

    ////7-13-2018 tambahan ketika ada checkin checkout
    // if(dailyTemp[id].Movements[i].MovementName === "CHECKIN") {
    //   if (dailyTemp[id].Movements[i + 1].MovementName === "CHECKOUT") break;
    // }
    let date1 = SumSecond (date, duration);
    dailyTemp[dayIdx].Movements[i].DateTime = date1;

    if (
      dailyTemp[dayIdx].Movements[i].MovementName === 'CHECKIN' &&
      dailyTemp[dayIdx].Movements[i - 1].MovementName === 'FREETIMELOCKED'
    ) {
      dailyTemp[dayIdx].Movements[i].DateTime = date1;
      let firstDateTime = dailyTemp[dayIdx].Movements[i].DateTime;
      let secondDateTime = dailyTemp[dayIdx].Movements[i - 1].DateTime;
      let newDuration = getNumberOfSecond (secondDateTime, firstDateTime);
      dailyTemp[dayIdx].Movements[i - 1].Duration = newDuration;
    } else if (
      dailyTemp[dayIdx].Movements[i].MovementName === 'DAYEND' &&
      dailyTemp[dayIdx].Movements[i - 1].MovementName === 'FREETIMELOCKED'
    ) {
      if (new Date (date1) <= new Date (date1.slice (0, -9) + 'T23:59:00')) {
        dailyTemp[dayIdx].Movements[i].DateTime =
          convertToStringDate (date1) + 'T23:59:00';
        let firstDateTime = dailyTemp[dayIdx].Movements[i].DateTime;
        let secondDateTime = dailyTemp[dayIdx].Movements[i - 1].DateTime;
        let newDuration = getNumberOfSecond (firstDateTime, secondDateTime);
        dailyTemp[dayIdx].Movements[i - 1].Duration = newDuration;
      } else {
        dailyTemp[dayIdx].Movements[i].DateTime = date1;
        let firstDateTime = dailyTemp[dayIdx].Movements[i].DateTime;
        let secondDateTime = dailyTemp[dayIdx].Movements[i - 1].DateTime;
        let newDuration = getNumberOfSecond (firstDateTime, secondDateTime);
        dailyTemp[dayIdx].Movements[i - 1].Duration = newDuration;
      }
    } else if (
      dailyTemp[dayIdx].Movements[i].MovementName === 'FREETIMELOCKED'
    ) {
      if (
        dailyTemp[dayIdx].Movements.length - 1 === i
          ? dailyTemp[dayIdx + 1]
              ? dailyTemp[dayIdx + 1].Movements[0]
                  ? dailyTemp[dayIdx + 1].Movements[0].MovementName ===
                      'DEPARTURE'
                  : false
              : false
          : false
      ) {
        let secondDateTime = dailyTemp[dayIdx + 1].Movements[0].DateTime;
        let firstDateTime = dailyTemp[dayIdx].Movements[i].DateTime;
        let newDuration = getNumberOfSecond (firstDateTime, secondDateTime);
        if (newDuration < 0) dailyTemp[dayIdx].Movements[i].Duration = 0;
        else dailyTemp[dayIdx].Movements[i].Duration = newDuration;
      } else if (
        dailyTemp[dayIdx].Movements[i + 1].MovementName === 'DEPARTURE'
      ) {
        let date = SumSecond (
          dailyTemp[dayIdx].Movements[i - 1].DateTime,
          dailyTemp[dayIdx].Movements[i - 1].Duration
        );
        dailyTemp[dayIdx].Movements[i].DateTime = date;
        let firstDateTime = dailyTemp[dayIdx].Movements[i + 1].DateTime;
        let secondDateTime = date;
        let newDuration = getNumberOfSecond (firstDateTime, secondDateTime);
        dailyTemp[dayIdx].Movements[i].Duration = newDuration;
      } else {
        let secondDateTime = dailyTemp[dayIdx].Movements[i + 1].DateTime;
        let firstDateTime = dailyTemp[dayIdx].Movements[i].DateTime;
        let newDuration = getNumberOfSecond (firstDateTime, secondDateTime);
        if (newDuration < 0) dailyTemp[dayIdx].Movements[i].Duration = 0;
        else dailyTemp[dayIdx].Movements[i].Duration = newDuration;
      }
    }
    duration = dailyTemp[dayIdx].Movements[i].Duration;
    date = dailyTemp[dayIdx].Movements[i].DateTime;
    dailyTemp[dayIdx].Movements[i].SeqNumber = i + 1;
  }
  return dailyTemp;
};
export const sequanceDailyProgramFromLast = (daily, dayIdx) => {
  let dailyTemp = copyObject (daily);
  let duration = 0;
  let idx = dailyTemp[dayIdx].Movements.findIndex (
    e => e.MovementName === 'DEPARTURE'
  );
  let n = idx >= 0 ? idx : dailyTemp[dayIdx].Movements.length - 1;
  let date = dailyTemp[dayIdx].Movements[n].DateTime;
  dailyTemp[dayIdx].Movements[n].SeqNumber = n;
  for (let i = 0; i < n; i++) {
    if (
      dailyTemp[dayIdx].Movements[n - 1 - i].MovementName === 'FREETIMELOCKED'
    ) {
      let firstDateTime = dailyTemp[dayIdx].Movements[n - 1 - i].DateTime;
      let secondDateTime = dailyTemp[dayIdx].Movements[n - i].DateTime;
      let newDuration = getNumberOfSecond (firstDateTime, secondDateTime);
      if (newDuration < 0) dailyTemp[dayIdx].Movements[n - 1 - i].Duration = 0;
      else dailyTemp[dayIdx].Movements[n - 1 - i].Duration = newDuration;
    }

    duration = dailyTemp[dayIdx].Movements[n - 1 - i].Duration;
    let date1 = SubstractSecond (date, duration);
    dailyTemp[dayIdx].Movements[n - 1 - i].DateTime = date1;
    dailyTemp[dayIdx].Movements[n - 1 - i].SeqNumber = n - i - 1;
    date = dailyTemp[dayIdx].Movements[n - 1 - i].DateTime;
  }
  return dailyTemp;
};
//untuk untuk memperbaiki time dari check out jika melebihi jam yang ditentukan
//daily : Array daily program yang lama
//id: index dari daily prgram yang sedang dirubah saat ini
export const checkOutTime = (daily, dayIdx) => {
  let dailyTemp = copyObject (daily);
  let idx = dailyTemp[dayIdx].Movements.findIndex (
    e => e.MovementName === 'CHECKOUT'
  );
  if (idx >= 0) {
    let dp = dailyTemp[dayIdx].Movements[idx];
    if (getHour (dp.DateTime) >= 12) {
      dailyTemp[dayIdx].Movements[idx].DateTime =
        convertToStringDate (dp.DateTime) + 'T12:00:00';
      dailyTemp = changeTimeDailyDetailProgramTop (dailyTemp, idx, dayIdx);
      dailyTemp = sequanceDailyProgram (dailyTemp, dayIdx);
    }
  }
  return dailyTemp;
};

//untuk untuk memperbaiki date time dari move paling atas ke movement tertentu
//daily : Array daily program yang lama
//id: index dari daily prgram yang sedang dirubah saat ini
//moveIdx :  index dari Movements yang sedang dirubah saat ini
export const changeTimeDailyDetailProgramTop = (daily, moveIdx, id) => {
  let dailyTemp = copyObject (daily);
  let duration = 0;
  let date = dailyTemp[id].Movements[moveIdx].DateTime;
  let n = moveIdx;
  for (let j = 0; j < n; j++) {
    duration = dailyTemp[id].Movements[n - 1 - j].Duration;
    let date1 = SubstractSecond (date, duration);
    dailyTemp[id].Movements[n - 1 - j].DateTime = date1;
    date = date1;
  }
  return dailyTemp;
};

//untuk merubah date dan durasi dari setelah menghapus suatu aktivitas
//oldDailyProgram : Array daily program yang lama
//newDP: Daily program yang baru hasil balikan fungsi lain
//id: index dari daily prgram yang sedang dirubah saat ini
//moveIdx : index dari movements saat ini
export const fixafterDelete = (oldDailyProgram, newDp, id, movIdx) => {
  let isCheck = checkMovIdxDel (id, movIdx, oldDailyProgram) ? true : false;
  // let idx = id != 0 ? (isCheck ? movIdx - 3 : movIdx - 2) : 0;
  let dailyTemp = copyObject (newDp);
  dailyTemp = sequanceDailyDPDays (newDp, id, movIdx, isCheck); // ini parameternya kurang belum jelas dari mana
  let moveLength = dailyTemp[id].Movements.length;
  dailyTemp = isCheck && moveLength === 2
    ? setDefaultTimeDayStartDayEnd (dailyTemp, id)
    : dailyTemp;
  return dailyTemp;
};

//untuk merubah date dan durasi dari freetime
//daily : Array daily program yang lama
//id: index dari daily prgram yang sedang dirubah saat ini
export const checkFreetime = (daily, id, MovementList) => {
  let dailyTemp = copyObject (daily);
  let moveLength = Object.keys (dailyTemp[id].Movements).length;
  let date = dailyTemp[id].Movements[0].DateTime;
  let duration = dailyTemp[id].Movements[0].Duration;
  for (let i = 1; i < moveLength - 1; i++) {
    let freeTimeDate = SumSecond (date, duration);
    if (dailyTemp[id].Movements[i].DateTime !== freeTimeDate) {
      if (dailyTemp[id].Movements[i].MovementName === 'CHECKIN') {
        if (dailyTemp[id].Movements[i - 1].MovementName === 'FREETIMELOCKED') {
          let firstDateTime = dailyTemp[id].Movements[i - 1].DateTime;
          let secondDateTime = dailyTemp[id].Movements[i].DateTime;
          let newDuration = getNumberOfSecond (firstDateTime, secondDateTime);
          dailyTemp[id].Movements[i - 1].Duration = newDuration;
        } else {
          let firstDateTime = dailyTemp[id].Movements[i].DateTime;
          let secondDateTime = freeTimeDate;
          let newDuration = getNumberOfSecond (firstDateTime, secondDateTime);
          dailyTemp[i].Movements.splice (
            i,
            0,
            addFreeTime (
              MovementList,
              freeTimeDate,
              dailyTemp[id].Movements[i],
              newDuration,
              false
            )
          );
        }
      }
    }
    date = dailyTemp[id].Movements[i].DateTime;
    duration = dailyTemp[id].Movements[i].Duration;
  }
  return dailyTemp;
};

///
//untuk merubah Time dari day start dan day end menjadi waktu default ketika pada hari tersebut cuma ada 2 aktivitas day start dan day end
//daily : Array daily program yang lama
//id: index dari daily prgram yang sedang dirubah saat ini
export const setDefaultTimeDayStartDayEnd = (daily, id) => {
  let dailyTemp = copyObject (daily);
  let length = dailyTemp[id].Movements.length;
  dailyTemp[id].Movements[0].DateTime =
    dailyTemp[id].Movements[0].MovementName === 'DAYSTART' &&
    convertToStringDate (dailyTemp[id].Movements[0].DateTime) + 'T08:00:00';
  dailyTemp[id].Movements[length - 1].DateTime =
    dailyTemp[id].Movements[length - 1].MovementName === 'DAYEND' &&
    convertToStringDate (dailyTemp[id].Movements[length - 1].DateTime) +
      'T20:00:00';
  return dailyTemp;
};

export const getFromToTransport = (daily, id, movId) => {
  let DP = copyObject (daily);
  let item = {
    from: [],
    to: [],
  };

  item.from.push (DP[id].Movements[movId - 1].Destination);
  item.to.push (DP[id].Movements[movId + 1].Destination);

  let idArr = DP[id].Movements.findIndex (e => e.MovementName == 'ARRIVAL');
  let idDep = DP[id].Movements.findIndex (e => e.MovementName == 'DEPARTURE');
  let start = 0;
  let end = DP[id].Movements.length;

  if (idDep >= 0 && idArr >= 0) {
    if (movId < idDep && movId > idArr) {
      start = idArr;
      end = idDep;
    } else if (movId < idDep && idDep < idArr) {
      end = idDep;
    } else if (movId > idDep && idDep < idArr) {
      start = idArr;
    }
  }

  for (let i = start; i < end; i++) {
    let mov = DP[id].Movements;
    if (mov[i].MovementName == 'RECREATION') {
      if (mov[i].Item.Address.City != null)
        item.to.push (mov[i].Item.Address.City.Id);
      else item.to.push (mov[i].Item.CityId);
    } else if (mov[i].MovementName == 'EAT') {
      if (mov[i].Item.Address == null || mov[i].Item.Address == '')
        console.log ('No Address');
      else item.to.push (mov[i].Item.CityId);
    } else if (
      mov[i].MovementName == 'CHECKIN' ||
      mov[i].MovementName == 'CHECKOUT' ||
      mov[i].MovementName == 'DAYSTART' ||
      mov[i].MovementName == 'DAYEND'
    ) {
      if (mov[i].Item.CityId == null || mov[i].Item.CityId == '')
        item.to.push (mov[i].Destination);
      else item.to.push (mov[i].Item.CityId);
    }
  }

  return {
    from: item.from.join (),
    to: item.to.join (),
  };
};

export const findExistDriving = (iStart, iEnd, movements) => {
  let index = movements.findIndex (
    (item, i) =>
      i >= iStart &&
      i <= iEnd &&
      item.MovementName === 'DRIVING' &&
      item.Item.ServiceItemId
  );
  return index;
};

//untuk mengisi item transportasi pada daily program
//daily : Array daily program yang lama
//id: index dari daily prgram yang sedang dirubah saat ini
//moveIdx :  index dari Movements yang sedang dirubah saat ini
//transport : Movement transportasi
//service: service type transportation
//hour: object hour
export const addItemTransportation = (
  daily,
  id,
  moveIdx,
  transport,
  service,
  hour
) => {
  let dailyTemp = copyObject (daily);
  let arrivalIdx = dailyTemp[id].Movements.findIndex (
    e => e.MovementName === 'ARRIVAL'
  );
  let departureIdx = dailyTemp[id].Movements.findIndex (
    e => e.MovementName === 'DEPARTURE'
  );
  let start = moveIdx;
  let end = dailyTemp[id].Movements.length;
  let existTransIdx = 0;
  if (departureIdx >= 0 && arrivalIdx >= 0) {
    //console.log('ada semua');
    if (moveIdx < departureIdx && moveIdx > arrivalIdx) {
      existTransIdx = findExistDriving (
        arrivalIdx,
        moveIdx,
        dailyTemp[id].Movements
      );
      start = existTransIdx !== -1 ? existTransIdx : moveIdx; //arrivalIdx;
      end = departureIdx;
    } else if (moveIdx < departureIdx && departureIdx < arrivalIdx) {
      existTransIdx = findExistDriving (
        start,
        moveIdx,
        dailyTemp[id].Movements
      );
      start = existTransIdx !== -1 ? existTransIdx : moveIdx; //start;
      end = departureIdx;
    } else if (moveIdx > departureIdx && departureIdx < arrivalIdx) {
      existTransIdx = findExistDriving (
        arrivalIdx,
        moveIdx,
        dailyTemp[id].Movements
      );
      start = existTransIdx !== -1 ? existTransIdx : moveIdx; //arrivalIdx;
    }
  } else {
    existTransIdx = findExistDriving (0, moveIdx, dailyTemp[id].Movements);
  }
  start = existTransIdx !== -1 ? existTransIdx : moveIdx;
  for (let i = start; i < end; i++) {
    if (dailyTemp[id].Movements[i].MovementName === 'DRIVING') {
      let destination = dailyTemp[id].Movements[i + 1].Destination;
      dailyTemp[id].Movements[i].Item = setItemTransport (
        transport,
        service,
        hour,
        destination
      );
    }
  }
  return dailyTemp;
};

//untuk mengisi item transportasi
//transport : Movement transportasi
//service: service type transportation
//hour: object hour
//destination : destination transport
export const setItemTransport = (transport, service, hour, destination) => {
  let item = copyObject (ItemMov);
  item.Desc = transport.Description;
  item.Capacity = transport.TransportationSeatTypeId;
  item.Hours = hour.Id;
  item.ServiceType = service;
  item.ImageName = transport.ImageName;
  item.ImageUrl = transport.ImageUrl;
  item.ServiceItemId = hour.ServiceItemId;
  item.Name = transport.Name;
  item.CityId = destination;
  item.ServiceDescription = item.Name + ' - ' + hour.Name;
  return item;
};

//untuk delete transportasi
//daily : Array daily program yang lama
//id: index dari daily prgram yang sedang dirubah saat ini
//moveIdx :  index dari Movements yang sedang dirubah saat ini
export const deleteTransportation = (daily, id, moveIdx) => {
  let dailyTemp = copyObject (daily);
  let arrivalIdx = dailyTemp[id].Movements.findIndex (
    item => item.MovementName === 'ARRIVAL'
  );
  let departureIdx = dailyTemp[id].Movements.findIndex (
    item => item.MovementName === 'DEPARTURE'
  );
  let start = 0;
  let end = dailyTemp[id].Movements.length;

  if (departureIdx >= 0 && arrivalIdx >= 0) {
    if (moveIdx < departureIdx && moveIdx > arrivalIdx) {
      start = arrivalIdx;
      end = departureIdx;
    } else if (moveIdx < departureIdx && departureIdx < arrivalIdx) {
      end = departureIdx;
    } else if (moveIdx > departureIdx && departureIdx < arrivalIdx) {
      start = arrivalIdx;
    }
  }
  for (let i = start; i < end; i++) {
    let item = copyObject (ItemMov);
    if (dailyTemp[id].Movements[i].MovementName === 'DRIVING')
      dailyTemp[id].Movements[i].Item = item;
  }
  return dailyTemp;
};
//untuk mendapatkan item dari driving
//daily : Array daily program yang lama
//id: index dari daily prgram yang sedang dirubah saat ini
export const checkDriving = (daily, id) => {
  let dailyTemp = copyObject (daily);
  let item = null;
  for (let i = 0; i < dailyTemp[id].Movements.length; i++)
    if (dailyTemp[id].Movements[i].MovementName === 'DRIVING') {
      if (dailyTemp[id].Movements[i].Item.ServiceItemId !== null) {
        item = dailyTemp[id].Movements[i].Item;
        break;
      }
    }
  return item;
};

export const addLeaveAco = (daily, movementList, item, id, moveIdx) => {
  //for set datetime
  let dailyTemp = copyObject (daily);
  let newMovement = copyObject (Movement);
  let move = movementList.filter (item => item.Name === 'LEAVEACCOMMODATION');
  newMovement.DateTime = dailyTemp[id].Movements[moveIdx].DateTime;
  newMovement.SeqNumber = null;
  newMovement.MovementName = move[0].Name;
  newMovement.MovementDescription = move[0].Description;
  newMovement.Duration = 0;
  newMovement.ServiceItemId = move[0].ServiceItemId;
  newMovement.Destination = dailyTemp[id].Movements[moveIdx].Destination;
  newMovement.DestinationName =
    dailyTemp[id].Movements[moveIdx].DestinationName;
  newMovement.Item = addItemList (item);
  return newMovement;
};
export const addReaturnAco = (daily, movementsList, item, id, moveIdx) => {
  //for set datetime
  let dailyTemp = copyObject (daily);
  let newMovement = copyObject (Movement);
  let move = movementsList.filter (item => item.Name === 'RETURNACCOMMODATION');
  newMovement.DateTime = dailyTemp[id].Movements[moveIdx].DateTime;
  newMovement.SeqNumber = null;
  newMovement.MovementName = move[0].Name;
  newMovement.MovementDescription = move[0].Description;
  newMovement.Duration = 0;
  newMovement.ServiceItemId = move[0].ServiceItemId;
  newMovement.Destination = dailyTemp[id].Movements[moveIdx].Destination;
  newMovement.DestinationName =
    dailyTemp[id].Movements[moveIdx].DestinationName;
  newMovement.Item = addItemList (item);
  return newMovement;
};
export const addCheckInAco = (movements, item) => {
  //for set datetime
  let newMovement = copyObject (Movement);
  let move = movements.filter (item => item.Name === 'CHECKIN');
  newMovement.DateTime = item.AccommodationSummary.CheckIn;
  newMovement.SeqNumber = null;
  newMovement.MovementName = move[0].Name;
  newMovement.MovementDescription = move[0].Description;
  newMovement.Duration = 0;
  newMovement.ServiceItemId = move[0].ServiceItemId;
  newMovement.Destination = item.City.Name ? item.City.Id : null;
  newMovement.DestinationName = item.City.Name ? item.City.Name : null;
  newMovement.Item = addItemHotel (
    newMovement.Destination,
    item.AccommodationSummary,
    'CHECKIN'
  );
  if (item.NextDay) newMovement.TypeMovement = false;

  return newMovement;
};
export const addCheckOutAco = (movements, item) => {
  //for set datetime
  let newMovement = copyObject (Movement);
  let move = movements.filter (item => item.Name === 'CHECKOUT');
  newMovement.DateTime = item.AccommodationSummary.CheckOut;
  newMovement.SeqNumber = null;
  newMovement.MovementName = move[0].Name;
  newMovement.MovementDescription = move[0].Description;
  newMovement.Duration = 0;
  newMovement.ServiceItemId = move[0].ServiceItemId;
  newMovement.Destination = item.City ? item.City.Id : null;
  newMovement.DestinationName = item.City ? item.City.Name : null;
  newMovement.Item = addItemHotel (
    newMovement.Destination,
    item.AccommodationSummary,
    'CHECKOUT'
  );
  return newMovement;
};

export const addEatFreeTime = (
  daily,
  id,
  moveIdx,
  item,
  resto,
  typeMovement,
  ActivityData
) => {
  //for set datetime
  let dailyTemp = copyObject (daily);
  let newMovement = copyObject (Movement);
  newMovement.DateTime = ActivityData.Startime;
  newMovement.SeqNumber = moveIdx + 1;
  newMovement.MovementName = typeMovement.Name;
  newMovement.MovementDescription = typeMovement.Description;
  newMovement.Duration = ActivityData.Duration;
  newMovement.ServiceItemId = typeMovement.ServiceItemId;
  newMovement.Destination = dailyTemp[id].Movements[moveIdx].Destination;
  if (typeMovement.Name === 'FREETIME') {
    newMovement.DestinationName =
      dailyTemp[id].Movements[moveIdx].DestinationName;
  } else {
    newMovement.DestinationName = resto
      ? resto.AddressObject
          ? resto.AddressObject.City ? resto.AddressObject.City.Name : null
          : null
      : null;
  }
  newMovement.Note = ActivityData.Note;
  newMovement.Item = resto !== undefined && resto !== null
    ? addItemResto (resto)
    : addItemList (item);

  return newMovement;
};

export const addItemList = par => {
  let item = copyObject (ItemMov);
  if (par !== null) {
    item.Name = par.Name;
    item.Desc = par.Desc;
    item.ServiceType = par.ServiceType;
    item.ImageUrl = par.ImageUrl;
    item.ImageName = par.ImageName;
    item.ServiceItemId = par.ServiceItemId;
    item.Address = par.Address;
    item.PlaceId = par.PlaceId;
    item.CityId = par.CityId;
    item.ProfileDesc = par.ProfileDesc;
    if (par.Hours) {
      item.Hours = par.Hours;
    }
  }
  return item;
};
export const addItemResto = resto => {
  let item = copyObject (ItemMov);
  item.Name = resto.Name;
  item.Address.AddressString = resto.Address;
  item.Desc = resto.MenuClass;
  item.ProfileDesc = resto.Description;
  item.ServiceItemId = resto.SelectedMenu.ServiceItemId;
  item.ServiceType = resto.SelectedMenu.TypeOfMenu;
  item.OperationEndTime = resto.OperationEndTime;
  item.OperationStartTime = resto.OperationStartTime;
  item.ImageUrl = resto.SelectedMenu.ImageUrl;
  item.ImageName = resto.SelectedMenu.ImageName;
  item.CityId = resto.SelectedMenu.CityId;
  return item;
};
export const addItemAtt = (par, act) => {
  //for attraction
  let item = copyObject (ItemMov);
  if (par !== null) {
    item.Name = par.Name;
    item.Desc = par.Description;
    item.ServiceType = par.AttractionCategory;
    item.ImageUrl = par.ImageUrl;
    item.ImageName = par.ImageName;
    item.ServiceItemId = par.ServiceItemId;
    item.Address = par.AddressObject;
    item.OperationEndTime = act.OperationEndTime;
    item.OperationStartTime = act.OperationStartTime;
    item.IsSolidStartTime = act.IsSolidStartTime;
  }
  return item;
};
export const virtualReturn = (daily, movements, item, id, moveIdx) => {
  //for set datetime
  let dailyTemp = copyObject (daily);
  let newMovement = copyObject (Movement);
  let move = movements.filter (
    item => item.Name === 'VIRTUALRETURNACCOMMODATION'
  );
  newMovement.DateTime = dailyTemp[id].Movements[moveIdx - 1].DateTime;
  newMovement.SeqNumber = null;
  newMovement.MovementName = move[0].Name;
  newMovement.MovementDescription = move[0].Description;
  newMovement.Duration = 0;
  newMovement.ServiceItemId = move[0].ServiceItemId;
  newMovement.Destination = dailyTemp[id].Movements[moveIdx].Destination;
  newMovement.DestinationName =
    dailyTemp[id].Movements[moveIdx].DestinationName;
  newMovement.Item = addItemList (item);
  newMovement.TypeVirtual = true;
  return newMovement;
};
export const virtualLeave = (daily, movementlist, item, id, moveIdx) => {
  //for set datetime
  let dailyTemp = copyObject (daily);
  let newMovement = copyObject (Movement);
  let move = movementlist.filter (
    item => item.Name === 'VIRTUALLEAVEACCOMMODATION'
  );
  newMovement.DateTime = dailyTemp[id].Movements[moveIdx].DateTime;
  newMovement.SeqNumber = null;
  newMovement.MovementName = move[0].Name;
  newMovement.MovementDescription = move[0].Description;
  newMovement.Duration = 0;
  newMovement.ServiceItemId = move[0].ServiceItemId;
  newMovement.DestinationName =
    dailyTemp[id].Movements[moveIdx].DestinationName;
  newMovement.Destination = dailyTemp[id].Movements[moveIdx].Destination;
  newMovement.TypeVirtual = true;
  newMovement.Item = addItemList (item);
  return newMovement;
};

export const addStartEndDays2 = (
  SummaryProgram,
  DailyProgramTemp,
  Departure,
  Arrival,
  MovementList
) => {
  let dpTemp = copyObject (DailyProgramTemp);
  let idx = 0;
  let SP = SummaryProgram.filter (
    item => item.AccommodationSummary !== undefined
  );
  dpTemp.map ((daily, i) => {
    let chIn = false;
    let chOut = false;
    daily.Movements.map (move => {
      if (move.MovementName === 'CHECKIN') chIn = true;
      else if (move.MovementName === 'CHECKOUT') chOut = true;
      return move;
    });
    let dp = daily.Movements;
    let dpLength = dp.length - 1;
    if (i === 0) {
      if (!chIn && !chOut && dp[dpLength].MovementName !== 'DAYEND') {
        daily.Movements.push (
          addDayEndDriving (
            addCheckInAco (MovementList, SP[idx]),
            convertToStringDate (Arrival.Date) + 'T23:59:59',
            MovementList
          )
        );
      } else if (chIn && !chOut && dp[dpLength].MovementName !== 'DAYEND') {
        daily.Movements.push (
          addDayEnd (
            addCheckInAco (MovementList, SP[idx]),
            SP[idx].AccommodationSummary.CheckIn,
            MovementList
          )
        );
      } else if (
        chIn &&
        chOut &&
        dp[dpLength].MovementName !== 'DAYEND' &&
        SP[idx + 1]
      ) {
        idx++;
        if (
          dpTemp[i + 1]
            ? dpTemp[i + 1].Movements[0]
                ? dpTemp[i + 1].Movements[0].MovementName !== 'DEPARTURE'
                : true
            : true
        ) {
          daily.Movements.push (
            addDayEndDriving (
              addCheckInAco (MovementList, SP[idx]),
              convertToStringDate (SP[idx - 1].Date) + 'T23:59:59',
              MovementList
            )
          );
        }
      }
    } else if (i === dpTemp.length - 1) {
      if (
        daily.Movements[0].MovementName !== 'CHECKIN' &&
        dp[0].MovementName !== 'DAYSTART'
      )
        if (daily.Movements[0].MovementName !== 'DEPARTURE')
          daily.Movements.splice (
            0,
            0,
            addDayStart (
              addCheckInAco (MovementList, SP[idx]),
              SP[idx].AccommodationSummary.CheckOut,
              MovementList
            )
          );
    } else {
      let chIn = false;
      let chOut = false;
      daily.Movements.map (move => {
        if (move.MovementName === 'CHECKIN') chIn = true;
        else if (move.MovementName === 'CHECKOUT') chOut = true;
        return move;
      });
      if (
        chIn &&
        chOut &&
        dp[0].MovementName !== 'DAYSTART' &&
        dp[0].MovementName !== 'DEPARTURE'
      ) {
        daily.Movements.splice (
          0,
          0,
          addDayStart (
            addCheckInAco (MovementList, SP[idx]),
            daily.Movements[0].DateTime,
            MovementList
          )
        );
        idx++;
        if (SP[idx] !== undefined) {
          if (dp[dp.length - 1].MovementName !== 'DAYEND') {
            daily.Movements.push (
              addDayEnd (
                addCheckInAco (MovementList, SP[idx]),
                daily.Movements[daily.Movements.length - 1].DateTime,
                MovementList
              )
            );
          }
        } else
          daily.Movements.push (
            addDayEndDriving (
              setAirportMovement (Departure, MovementList, 'DEPARTURE'),
              convertToStringDate (SP[idx - 1].LeavingDate) + 'T23:59:59',
              MovementList
            )
          );
      } else if (
        chIn &&
        chOut &&
        dp[0].MovementName === 'DAYSTART' &&
        dp[dpLength].MovementName === 'DAYEND'
      ) {
        idx++;
      } else if (chIn && !chOut && dp[dpLength].MovementName !== 'DAYEND') {
        daily.Movements.push (
          addDayEnd (
            addCheckInAco (MovementList, SP[idx]),
            SP[idx].AccommodationSummary.CheckIn,
            MovementList
          )
        );
      } else if (!chIn && chOut && dp[0].MovementName !== 'DAYSTART') {
        daily.Movements.splice (
          0,
          0,
          addDayStart (
            addCheckInAco (MovementList, SP[idx]),
            daily.Movements[0].DateTime,
            MovementList
          )
        );
        idx++;
        if (
          SP[idx] !== undefined &&
          (dpTemp[i + 1]
            ? dpTemp[i + 1].Movements[0]
                ? dpTemp[i + 1].Movements[0].MovementName !== 'DEPARTURE'
                : true
            : true)
        )
          daily.Movements.push (
            addDayEndDriving (
              addCheckInAco (MovementList, SP[idx]),
              convertToStringDate (SP[idx - 1].LeavingDate) + 'T23:59:59',
              MovementList
            )
          );
        else if (
          dpTemp[i + 1]
            ? dpTemp[i + 1].Movements[0]
                ? dpTemp[i + 1].Movements[0].MovementName !== 'DEPARTURE'
                : true
            : true
        ) {
          daily.Movements.push (
            addDayEndDriving (
              setAirportMovement (Departure, MovementList, 'DEPARTURE'),
              convertToStringDate (SP[idx - 1].LeavingDate) + 'T23:59:59',
              MovementList
            )
          );
        }
      } else {
        if (daily.Movements.length === 0) {
          daily.Movements.splice (
            0,
            0,
            addDayStartDriving (
              addCheckInAco (MovementList, SP[idx]),
              convertToStringDate (SP[idx].Date) + 'T08:00:00',
              MovementList
            )
          );
          daily.Movements.push (
            addDayEndDriving (
              addCheckInAco (MovementList, SP[idx]),
              convertToStringDate (SP[idx].Date) + 'T20:00:00',
              MovementList
            )
          );
        } else {
          if (dp[0].MovementName !== 'DAYSTART')
            if (dp[0].MovementName !== 'CHECKIN')
              if (dp[0].MovementName !== 'DEPARTURE')
                daily.Movements.splice (
                  0,
                  0,
                  addDayStartDriving (
                    addCheckInAco (MovementList, SP[idx]),
                    daily.Movements[0].DateTime,
                    MovementList
                  )
                );
          if (dp[dpLength].MovementName !== 'DAYEND') {
            if (
              dpTemp[i + 1]
                ? dpTemp[i + 1].Movements[0]
                    ? dpTemp[i + 1].Movements[0].MovementName !== 'DEPARTURE'
                    : true
                : true
            )
              daily.Movements.push (
                addDayEndDriving (
                  addCheckInAco (MovementList, SP[idx]),
                  daily.Movements[daily.Movements.length - 1].DateTime,
                  MovementList
                )
              );
          }
        }
      }
    }
    return daily;
  });
  return dpTemp;
};

export const generateFreeTimeDP = (daily, dayIdx, MovementList) => {
  for (let j = 1; j < daily[dayIdx].Movements.length - 1; j++) {
    let tgl = daily[dayIdx].Movements[j - 1].DateTime;
    let durasi = daily[dayIdx].Movements[j - 1].Duration;
    let tglFree = SumSecond (tgl, durasi);
    if (daily[dayIdx].Movements[j].DateTime !== tglFree) {
      let a = tglFree;
      let b = daily[dayIdx].Movements[j].DateTime;
      let dur = getNumberOfSecond (a, b);
      daily[dayIdx].Movements.splice (
        j,
        0,
        addFreeTime (
          MovementList,
          tglFree,
          daily[dayIdx].Movements[j],
          dur,
          false
        )
      );
      j++;
    }
  }
  return daily;
};

export const sequentialNumberinMovementByDays = (daily, dayIdx) => {
  let dailyTemp = copyObject (daily);

  dailyTemp[dayIdx].Movements.map ((obj, i) => {
    obj.SeqNumber = i + 1;
  });
  return dailyTemp;
};

export const AddDriving = (daily, id, moveIdx, MovementList) => {
  let item = checkDriving (daily, id);
  let typeMov = MovementList.filter (item => item.Name === 'DRIVING');
  let obj = copyObject (Movement);
  obj.DateTime = daily[id].Movements[moveIdx].DateTime;
  obj.SeqNumber = moveIdx + 1;
  obj.MovementName = typeMov[0].Name;
  obj.MovementDescription = typeMov[0].Description;
  obj.ServiceItemId = typeMov[0].ServiceItemId;
  obj.Destination = daily[id].Movements[moveIdx].Destination;
  obj.DestinationName = daily[id].Movements[moveIdx].DestinationName;
  obj.Item = addItemList (item);
  if (daily) return obj;
};

export const addMovement = (daily, par, item, activity, id, moveIdx) => {
  //for set datetime
  let obj = copyObject (Movement);
  obj.DateTime = activity.Startime;
  obj.SeqNumber = null;
  obj.MovementName = par.Name;
  obj.MovementDescription = par.Description;
  obj.Duration = activity.Duration;
  obj.ServiceItemId = par.ServiceItemId;
  obj.Destination = daily[id].Movements[moveIdx].Destination;
  //obj.DestinationName = daily[id].Movements[moveIdx].DestinationName;
  // obj.DestinationName.Note = daily[id].Movements[moveIdx].Note;
  if (daily[id].Movements[moveIdx].TypeVirtual) obj.TypeVirtual = true;
  if (par.Name === 'RECREATION') {
    // obj.DestinationName = item.Cities ? item.Cities[0].Name : null;
    obj.DestinationName = item.AddressObject
      ? item.AddressObject.City ? item.AddressObject.City.Name : null
      : null;
    obj.Item = addItemAtt (item, activity);
  } else if (par.Name === 'FREETIME') {
    obj.DestinationName = daily[id].Movements[moveIdx].DestinationName;
    obj.Item = addItemList (item);
    obj.Note = activity.Note;
  } else obj.Item = addItemList (item);
  return obj;
};

export const addDayStart = (par, date, MovementList) => {
  let move = MovementList.filter (item => item.Name === 'DAYSTART');
  let obj = copyObject (Movement);
  obj.Id = null;
  obj.Destination = par.Destination;
  obj.DestinationName = par.DestinationName;
  obj.DateTime = date;
  obj.Duration = 0;
  obj.Item = par.Item;
  obj.MovementDescription = move[0].Description;
  obj.MovementName = move[0].Name;
  obj.Note = '';
  obj.SeqNumber = 1;
  obj.ServiceItemId = move[0].ServiceItemId;
  return obj;
};
export const addDayEnd = (par, date, MovementList) => {
  let obj = copyObject (Movement);
  let move = MovementList.filter (item => item.Name === 'DAYEND');
  obj.Id = null;
  obj.Destination = par.Destination;
  obj.DestinationName = par.DestinationName;
  obj.DateTime = date;
  obj.Duration = 0;
  obj.Item = par.Item;
  obj.MovementDescription = move[0].Description;
  obj.MovementName = move[0].Name;
  obj.Note = '';
  obj.SeqNumber = 2;
  obj.ServiceItemId = move[0].ServiceItemId;
  return obj;
};
export const addDayEndDriving = (par, date, MovementList) => {
  let obj = copyObject (Movement);
  let move = MovementList.filter (item => item.Name === 'DAYEND');
  obj.Id = null;
  obj.Destination = par.Destination;
  obj.DestinationName = par.DestinationName;
  obj.DateTime = date;
  obj.Duration = 0;
  obj.Item = par.Item;
  obj.MovementDescription = move[0].Description;
  obj.MovementName = move[0].Name;
  obj.Note = '';
  obj.SeqNumber = 2;
  obj.ServiceItemId = move[0].ServiceItemId;
  return obj;
};
export const addDayStartDriving = (par, date, MovementList) => {
  let obj = copyObject (Movement);
  let move = MovementList.filter (item => item.Name === 'DAYSTART');
  obj.Id = null;
  obj.Destination = par.Destination;
  obj.DestinationName = par.DestinationName;
  obj.DateTime = date;
  obj.Duration = 0;
  obj.Item = par.Item;
  obj.MovementDescription = move[0].Description;
  obj.MovementName = move[0].Name;
  obj.Note = '';
  obj.SeqNumber = 2;
  obj.ServiceItemId = move[0].ServiceItemId;
  return obj;
};

//function for get time checkin and checkout after add activity
export const changeTimeSummaryProgramAfterAddActivity = (
  dailyProgram,
  summaryProgram
) => {
  let newSP = copyObject (summaryProgram);
  let daily = copyObject (dailyProgram);
  for (let i = 0; i < newSP.length; i++) {
    if (newSP[i].AccommodationSummary != null) {
      let objDP = daily.find (item => item.Date == newSP[i].Date);
      newSP[i].AccommodationSummary.CheckIn = objDP.Movements.find (
        item => item.MovementName == 'CHECKIN'
      ).DateTime;

      objDP = daily.find (item => item.Date == newSP[i].LeavingDate);
      newSP[i].AccommodationSummary.CheckOut = objDP.Movements.find (
        item => item.MovementName == 'CHECKOUT'
      ).DateTime;
    }
  }
  return newSP;
};

// menambahkan aktivitas pada daily program
//DailyProgram : Array daily program yang lama
//id: index dari daily prgram yang sedang dirubah saat ini
//moveIdx: index dari movement saat ini
//TypeMovement : object dari movment yang dipih
//itemMovement: object dari excursion and resto, klo freetime kirim aja null
//activityData: object activty data
export const editActivityData = (
  dailyTemp,
  dayIdx,
  moveIdx,
  TypeMovement,
  itemMovement,
  activityData
) => {
  let newDp = copyObject (dailyTemp);
  let newActivity = addMovement (
    dailyTemp,
    TypeMovement,
    itemMovement,
    activityData,
    dayIdx,
    moveIdx
  );
  newDp[dayIdx].Movements[moveIdx] = newActivity;
  // newDp = fixVirtualMovements(newDp, dayIdx);
  return newDp;
};

//delete Connection Flight
//arrival : object Arrival
//oldSP : array of object SummaryProgram,
//index : index dari connection flight departure
export const delConectionFlight = (arrival, oldSP, index) => {
  let newSP = copyObject (oldSP);
  for (
    let j = 0;
    j < 2;
    j++ // harus di delete arifalnya
  )
    newSP.splice (index, 1);

  return setDateSummaryProgram (arrival, newSP);
};
//Delete Activity
//id : id dari daily program
//movIdx : id dari daily movments
//oldDP : array of object dari
//setelah fungsi ini selesai, panggil fungsi fixafterDelete()
export const deleteActivity = (dayIdx, movIdx, oldDP) => {
  let newDP = copyObject (oldDP);
  if (checkMovIdxDel (dayIdx, movIdx, oldDP)) {
    let j = 5;
    while (j) {
      newDP[dayIdx].Movements.splice (movIdx - 2, 1);
      j--;
    }
    if (newDP[dayIdx].Movements[movIdx - 4] != undefined)
      if (
        newDP[dayIdx].Movements[movIdx - 4].MovementName === 'FREETIMELOCKED' &&
        newDP[dayIdx].Movements[movIdx - 3].MovementName !== 'CHECKIN'
      )
        newDP[dayIdx].Movements.splice (movIdx - 4, 1);
  } else {
    let j = 2;
    while (j) {
      newDP[dayIdx].Movements.splice (movIdx - 1, 1);
      j--;
    }
    if (
      newDP[dayIdx].Movements[movIdx].MovementName ===
      'VIRTUALRETURNACCOMMODATION'
    ) {
      newDP[dayIdx].Movements[movIdx].Item =
        newDP[dayIdx].Movements[movIdx - 2].Item;
      if (
        newDP[dayIdx].Movements[movIdx + 1].MovementName === 'VIRTUALCHECKOUT'
      )
        newDP[dayIdx].Movements[movIdx + 1].Item =
          newDP[dayIdx].Movements[movIdx].Item;
    }
  }
  return newDP;
};

export const checkMovIdxDel = (dayIdx, movIdx, oldDP) => {
  let newDP = copyObject (oldDP);
  let isTrue = (newDP[dayIdx].Movements[movIdx - 2].MovementName ===
    'LEAVEACCOMMODATION' &&
    newDP[dayIdx].Movements[movIdx + 2].MovementName ===
      'RETURNACCOMMODATION') ||
    (newDP[dayIdx].Movements[movIdx - 2].MovementName ===
      'VIRTUALLEAVEACCOMMODATION' &&
      newDP[dayIdx].Movements[movIdx + 2].MovementName ===
        'VIRTUALRETURNACCOMMODATION')
    ? true
    : false;

  return isTrue;
};

// //digunakan ketika edit excursion/activity untuk memperbaiki item pada virtual movement
// export const fixVirtualMovements = (dailyProgram, dayIndex) => {
//   return dailyProgram.map((daily, i) => {
//     if (i === dayIndex) {
//       daily.Movements.map((move, j) => {
//         if (move.MovementName === 'VIRTUALCHECKIN') {
//           move.Item = daily.Movements[j - 1].Item;
//         } else if (move.MovementName === 'VIRTUALLEAVEACCOMMODATION') {
//           move.Item = daily.Movements[j - 1].Item;
//         } else if (move.MovementName === 'VIRTUALRETURNACCOMMODATION') {
//           move.Item = daily.Movements[j - 2].Item;
//         } else if (move.MovementName === 'VIRTUALCHECKOUT') {
//           move.Item = daily.Movements[j - 1].Item;
//         }
//         return move;
//       });
//     }
//     return daily;
//   });
// };

// //update leave and return accommodation
export const fixLeaveReturnAccomodation = dailyProgram => {
  return dailyProgram.map (daily => {
    daily.Movements.map ((move, i) => {
      if (move.MovementName === 'LEAVEACCOMMODATION') {
        move.Item = daily.Movements[i - 1].Item;
        move.DestinationName = daily.Movements[i - 1].DestinationName;
        move.Destination = daily.Movements[i - 1].Destination;
      } else if (move.MovementName === 'RETURNACCOMMODATION') {
        move.Item = daily.Movements[i + 1].Item;
        move.DestinationName = daily.Movements[i + 1].DestinationName;
        move.Destination = daily.Movements[i + 1].Destination;
      }
      return move;
    });
    return daily;
  });
};

export const isThereExcursionMeal = (dailyProgram, dayIndex, moveIndex) => {
  let movements = dailyProgram[dayIndex].Movements;
  let activity = movements[moveIndex];
  let result = movements.find (
    item =>
      item.Destination === activity.Destination &&
      (item.MovementName === 'RECREATION' || item.MovementName === 'EAT')
  );
  return result ? true : false;
};

export const getDrivingAddress = (item1, item2) => {
  let data = {
    FromId: '',
    FromAddress: '',
    ToId: '',
    ToAddress: '',
  };
  if (item1.ServiceItemId) {
    if (item1.ServiceType != 'Movement_arrival') {
      if (item1.ServiceType != 'Movement_departure') {
        data.FromId = item1.ServiceItemId;
      } else {
        if (item1.Address) {
          if (item1.Address.AddressString)
            data.FromAddress = item1.Address.AddressString;
          data.FromAddress = item1.Address;
        }
      }
    } else {
      if (item1.Address) {
        if (item1.Address.AddressString)
          data.FromAddress = item1.Address.AddressString;
        data.FromAddress = item1.Address;
      }
    }
  } else {
    if (item1.Address) {
      if (item1.Address.AddressString)
        data.FromAddress = item1.Address.AddressString;
      data.FromAddress = item1.Address;
    }
  }

  if (item2.ServiceItemId) {
    if (item2.ServiceType != 'Movement_arrival') {
      if (item2.ServiceType != 'Movement_departure') {
        data.ToId = item2.ServiceItemId;
      } else {
        if (item2.Address) {
          if (item2.Address.AddressString)
            data.ToAddress = item2.Address.AddressString;
          data.ToAddress = item2.Address;
        }
      }
    } else {
      if (item2.Address) {
        if (item2.Address.AddressString)
          data.ToAddress = item2.Address.AddressString;
        data.ToAddress = item2.Address;
      }
    }
  } else {
    if (item2.Address) {
      if (item2.Address.AddressString)
        data.ToAddress = item2.Address.AddressString;
      data.ToAddress = item2.Address;
    }
  }
  return data;
};

export const fixDailyAfterMovement = (dp, dayIdx, moveIdx) => {
  let curMovements = dp[dayIdx].Movements;
  for (var i = moveIdx + 1; i < curMovements.length; i++) {
    let curMoveName = curMovements[i].MovementName;
    if (
      curMoveName === 'DEPARTURE' ||
      (curMoveName === 'RECREATION' && curMovements[i].Item.IsSolidStartTime)
    )
      break;
    let newMoveDateTime = SumSecond (
      curMovements[i - 1].DateTime,
      curMovements[i - 1].Duration
    );
    if (
      curMoveName === 'FREETIMELOCKED' &&
      curMovements[i + 1].MovementName === 'DEPARTURE'
    ) {
      let nextDate = curMovements[i + 1].DateTime;
      if (new Date (newMoveDateTime) <= new Date (nextDate)) {
        let newDuration = getNumberOfSecond (newMoveDateTime, nextDate);
        curMovements[i].Duration = newDuration;
        curMovements[i].DateTime = newMoveDateTime;
      } else {
        curMovements[i].Duration = 0;
        curMovements[i].DateTime = nextDate;
      }
    } else {
      curMovements[i].DateTime = newMoveDateTime;
    }
  }
  dp[dayIdx].Movements = curMovements;
  return dp;
};

export const fixDayStartDayEndAddress = dailyProgram => {
  dailyProgram.map (daily => {
    daily.Movements.map (move => {
      if ([DAYSTART, DAYEND].indexOf (move.MovementName) !== -1) {
        let pivot = daily.Movements.find (
          item =>
            [CHECKIN, CHECKOUT].indexOf (item.MovementName) !== -1 &&
            // eslint-disable-next-line
            item.Item.ServiceItemId == move.Item.ServiceItemId
        );
        if (pivot) {
          move.Item.Address = pivot.Item.Address;
        }
      }
      return move;
    });
    return daily;
  });
  return dailyProgram;
};

export const fixDestinationDriving = dailyProgram => {
  let dailyTemp = copyObject (dailyProgram);
  dailyTemp.map (daily => {
    daily.Movements.map ((move, iMove) => {
      if (['DRIVING'].indexOf (move.MovementName) !== -1) {
        let nextMove = daily.Movements[iMove + 1];
        move.Destination = nextMove ? nextMove.Destination : move.Destination;
        move.DestinationName = nextMove
          ? nextMove.DestinationName
          : move.DestinationName;
      }
      return move;
    });
    return daily;
  });
  return dailyTemp;
};

export const copyDailyProgram = (DailyProgramTemp, DailyProgram) => {
  DailyProgram.map ((dataDp, i) => {
    let Mov = [];
    dataDp.Movements.length != 0
      ? dataDp.Movements.map (mov => {
          Mov.push ({
            Id: mov.Id,
            DateTime: convertToStringDate (dataDp.Date) +
              convertToStringTime (mov.DateTime),
            Destination: mov.Destination,
            DestinationName: mov.DestinationName,
            Duration: mov.Duration,
            DurationText: mov.DurationText,
            Item: mov.Item,
            MovementDescription: mov.MovementDescription,
            MovementName: mov.MovementName,
            Note: mov.Note,
            SeqNumber: mov.SeqNumber,
            ServiceItemId: mov.ServiceItemId,
          });
        })
      : [];
    DailyProgramTemp[i].Movements = Mov;
  });

  return DailyProgramTemp;
};

export const getDailyProgramFixPrice = (
  Arrival,
  Departure,
  SummaryProgram,
  DailyProgram
) => {
  let DailyProgramTemp = [];
  DailyProgramTemp = generateInitialDailyProgram ({
    Departures: Arrival,
    MainPrograms: SummaryProgram,
    Returns: Departure,
  });
  DailyProgramTemp = copyDailyProgram (DailyProgramTemp, DailyProgram);
  return DailyProgramTemp;
};

export const findPlaceByRegion = (places, region) => {
  let newPlace = places.find (item => item.Region === region);
  return newPlace ? newPlace.Data : [];
};
