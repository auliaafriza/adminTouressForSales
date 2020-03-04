//=========Import Helper===============
import {
  SumDays,
  changeTime,
  getHour,
  SumSecond,
  convertToStringDate,
  convertToStringTime,
  getNumberOfDays,
  getNumberOfSecond,
  getTime,
  SubDays,
  convertDateFormat,
  SubstractSecond,
} from './timeHelper';
import { getHourAndMinute, diffDate } from './moment';
import {
  DAYEND,
  CHECKIN,
  CHECKOUT,
  DAYSTART,
  // EAT,
  // RECREATION,
  // FREETIME,
  LEAVEACCOMMODATION,
  RETURNACCOMMODATION,
  DEPARTURE,
  ARRIVAL,
  VIRTUALCHECKIN,
  FREETIMELOCKED,
  VIRTUALCHECKOUT,
  VIRTUALLEAVEACCOMMODATION,
  FLIGHTTIME,
  DRIVING,
} from './activityTypes';
import { virtualCheckInOut, addSummaryProgram } from './dailyProgram';
// import moment from 'moment';
//========================================
//===============constant=================

export const Guest = guestCategory => {
  return {
    FirstName: null,
    LastName: null,
    CountryId: null,
    IdentityNbr: null,
    IdentityType: null,
    GuestType: 'TOURMEMBER',
    GuestCategory: guestCategory,
    GuestTitle: null,
  };
};
export const TICKET = {
  ServiceItemId: '',
  PNR: '',
  FlightNumber: '',
  AirlineProfileName: '',
  Duration: 0,
  IsTransit: false,
  IsAllowedActivity: false,
};
export const DailyProgram = {
  Date: null,
  Day: null,
  Movements: [],
  TourDestinations: [],
};

export const ItemMove = {
  Address: null,
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
};
export const Movement = {
  DateTime: null,
  Destination: null,
  DestinationName: null,
  Duration: 0,
  DurationText: '',
  Id: null,
  Item: Object.assign({}, ItemMove),
  MovementName: null,
  MovementDescription: null,
  Note: null,
  SeqNumber: null,
  ServiceItemId: null,
  TypeMovement: true,
  TypeVirtual: false,
};
export const Airport = {
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
  City: { Name: null },
  Date: null,
  Day: null,
  LeavingDate: null,
  Note: null,
  Region: null,
  TotalDays: 2,
  NextDay: false,
};
//=================================
//==========helper=================
export const copyObject = par => {
  let temp = JSON.stringify(par);
  return JSON.parse(temp);
};
//=================================
//==========initial================
//untuk setup summary program custom
//city : masukan object kota yg berisi region (bisa filter dari balikan API)
//room : berisi object room allocation
export const setSummaryProgram = (cities, roomAllocation) => {
  const {
    ChildExtraBedQty,
    ChildSharingRoomQty,
    ChildSingleRoomQty,
    ExtraBedQty,
    BabyCrib,
    NoBed,
    SharingBedQty,
    SharingRoomQty,
    SingleRoomQty,
  } = roomAllocation;
  let date = new Date();
  let smProg = copyObject(SummaryProgram);
  smProg.City = cities && cities;
  smProg.Date = convertToStringDate(SumDays(date, 1)) + 'T00:00:00';
  smProg.Day = 1;
  smProg.LeavingDate = convertToStringDate(SumDays(date, 2)) + 'T00:00:00';
  smProg.Region = cities ? cities.Region.Id : null;
  smProg.AccommodationSummary.DateTime = smProg.Date;
  smProg.AccommodationSummary.CheckIn =
    convertToStringDate(SumDays(date, 1)) + 'T14:00:00';
  smProg.AccommodationSummary.CheckOut =
    convertToStringDate(SumDays(date, 2)) + 'T10:00:00';
  //Allocation Room
  smProg.AccommodationSummary.Allocations.ChildExtraBedPax = ChildExtraBedQty;
  smProg.AccommodationSummary.Allocations.ChildSharingRoomPax = ChildSharingRoomQty;
  smProg.AccommodationSummary.Allocations.ChildSingleRoomPax = ChildSingleRoomQty;
  smProg.AccommodationSummary.Allocations.ExtraBedPax = ExtraBedQty;
  smProg.AccommodationSummary.Allocations.NoBedPax = BabyCrib + NoBed;
  smProg.AccommodationSummary.Allocations.SharingBedPax = SharingBedQty;
  smProg.AccommodationSummary.Allocations.SharingRoomPax = SharingRoomQty;
  smProg.AccommodationSummary.Allocations.SingleRoomPax = SingleRoomQty;
  return smProg;
};

//initial untuk custom package : headline program dan dailyProgram
export const initialSetCustomPackage = (hlProgram, roomAllocation) => {
  let headlineProgram = { ...hlProgram };
  headlineProgram.Departures = [
    setInitialAirport(
      [],
      null,
      1,
      'Departure',
      SumDays(new Date(), 1),
      'Custom',
      'T08:00:00'
    ),
    setInitialAirport(
      [],
      null,
      1,
      'Arrival',
      SumDays(new Date(), 1),
      'Custom',
      'T10:00:00'
    ),
  ];
  headlineProgram.MainPrograms = [setSummaryProgram(null, roomAllocation)];
  headlineProgram.Returns = [
    setInitialAirport(
      [],
      null,
      2,
      'Departure',
      headlineProgram.MainPrograms[0].LeavingDate,
      'Custom',
      'T12:00:00'
    ),
    setInitialAirport(
      [],
      null,
      2,
      'Arrival',
      headlineProgram.MainPrograms[0].LeavingDate,
      'Custom',
      'T14:00:00'
    ),
  ];

  let dP = generateInitialDailyProgram(headlineProgram);
  let result = { headlineProgram: headlineProgram, dailyProgram: dP };
  return result;
};
//=======================================================
//============== inisial daily program ==================
//=======================================================
export const generateInitialDailyProgram = headlineProgram => {
  let startDate = convertDateFormat(
    headlineProgram.Departures[0].Date,
    'YYYY-MM-DD'
  );
  let totalDays = getNumberOfDays(
    headlineProgram.Departures[0].Date,
    headlineProgram.Returns[headlineProgram.Returns.length - 1].Date
  );
  let dailyProgram = initialDP(startDate, totalDays);
  let arrayDest = getDestByDateFromHeadLine(headlineProgram);
  dailyProgram = combineDailyProgramAndDest(dailyProgram, arrayDest);
  return dailyProgram;
};
//inisial daily progam array
const initialDP = (startDate, totalDay) => {
  let dp = [];
  for (let i = 0; i < totalDay; i++) {
    let daily = copyObject(DailyProgram);
    daily.Date = SumDays(startDate, i);
    daily.Day = i + 1;
    dp.push(daily);
  }
  return dp;
};
//mencari destinasi berdasarkan headline
const getDestByDateFromHeadLine = headlineProgram => {
  let data = [];
  data = data.concat(destructureDestFromHeadline(headlineProgram.Departures));
  data = data.concat(destructureDestFromHeadline(headlineProgram.MainPrograms));
  data = data.concat(destructureDestFromHeadline(headlineProgram.Returns));
  data = reduceDateDestination(data);
  return data;
};
//menggabungkan destinasi pada tanggal yang sama dari hasil fungsi destructureDestFromHeadline
const reduceDateDestination = data => {
  let newData = data.reduce((acc, item) => {
    //check apakah ada tanggal yang sama di akumulator
    let isDateExist = !!acc.find(rec => rec.date === item.date);
    if (acc.length === 0 || !isDateExist) {
      acc.push({
        date: item.date,
        destination: [{ Destination: item.destination }],
      });
    } else {
      acc.map(rec => {
        if (rec.date === item.date) {
          let isDestExist = !!rec.destination.find(
            dest => dest.Destination === item.destination
          );
          if (!isDestExist) {
            rec.destination.push({ Destination: item.destination });
          }
        }
      });
    }
    return acc;
  }, []);
  return newData;
};
//menggabungkan daily program dan destinasi
const combineDailyProgramAndDest = (dailyProgram, destination) => {
  dailyProgram.map(daily => {
    let dailyDest = destination.find(
      item => item.date === convertDateFormat(daily.Date, 'YYYY-MM-DD')
    );
    if (dailyDest) {
      daily.TourDestinations = dailyDest.destination;
    }
    return daily;
  });
  return dailyProgram;
};
//mengembalikan array berisi tanggal dan destinasi berdasarkan headline program
const destructureDestFromHeadline = headlineProgram => {
  let data = headlineProgram.reduce((acc, item) => {
    let arrayDateDest = [];
    if (item.LeavingDate) {
      for (let i = 0; i < item.TotalDays; i++) {
        let obj = {
          date: convertDateFormat(SumDays(item.Date, i), 'YYYY-MM-DD'),
          destination: item.City ? (item.City.Id ? item.City.Id : null) : null,
        };
        arrayDateDest.push(obj);
      }
    } else {
      arrayDateDest = [
        {
          date: convertDateFormat(item.Date, 'YYYY-MM-DD'),
          destination: item.City ? (item.City.Id ? item.City.Id : null) : null,
        },
      ];
    }
    acc = acc.concat(arrayDateDest);
    return acc;
  }, []);
  return data;
};
//=======================================================
//============== End inisial daily program ==============
//=======================================================

//=======================================================
//============== set initial airport ====================
//=======================================================
// fungsi untuk memasukkan movement yg digenerate dari Departures atau return di headline ke daily program
//arrivaldeparture: array Departures/Returns dari headline program
//movement list: movementlist dari backend
export const setMovementAirportToDailyProgram = (
  dailyProgram,
  arrivalDeparture,
  movementList
) => {
  let dailyProg = copyObject(dailyProgram);
  let movements = generateAirportMovements(arrivalDeparture, movementList);
  dailyProg = mappingDailyProgramWithAirport(dailyProg, movements);
  return dailyProg;
};
const mappingDailyProgramWithAirport = (dailyProg, movements) => {
  dailyProg.map(daily => {
    let moves = movements.filter(move =>
      filterByDate(move.DateTime, daily.Date)
    );
    if (moves.length > 0) daily.Movements = daily.Movements.concat(moves);
    return daily;
  });
  return dailyProg;
};
const filterByDate = (date1, date2) => {
  return convertToStringDate(date1) === convertToStringDate(date2);
};
//fungsi ini menghasilkan movement departure atau arrival dalam bentuk array.
// dihasilkan dari Departures atau REturns dari Headlineprogram
const generateAirportMovements = (arrivalDeparture, movementList) => {
  let movements = arrivalDeparture.reduce((result, flight) => {
    let move = setAirportMovement(
      flight,
      movementList,
      flight.TransferType === 'Movement_arrival' ? ARRIVAL : DEPARTURE
    );
    result.push(move);
    return result;
  }, []);
  return movements;
};
//Untuk setup airport movement di daily program
//item : object arrival / departure
//movementList : array of object type movement
//type :  stirng with value "ARRIVAL" or "DEPARTURE"
export const setAirportMovement = (item, movementList, type) => {
  let moveObj = copyObject(Movement);
  let moveType = movementList.find(mov => mov.Name === type);
  moveObj.DateTime = changeTime(item.Date);
  moveObj.Destination = item.City.Id;
  moveObj.DestinationName = item.City.Name;
  moveObj.Item = addItemArrivalDeparture(item, type);
  moveObj.MovementName = moveType.Name;
  moveObj.MovementDescription = moveType.Description;
  moveObj.Note = item.Note;
  moveObj.SeqNumber = 1;
  moveObj.ServiceItemId = moveType.ServiceItemId;
  return moveObj;
};
//Untuk setup item movement airport di daily program
//item : object arrival / departure
//type :  stirng with value "ARRIVAL" or "DEPARTURE"
export const addItemArrivalDeparture = (item, type) => {
  let itemObj = copyObject(ItemMove);
  itemObj.Address = item.Address ? item.Address : '';
  itemObj.CityId = item.City ? item.City.Id : null;
  itemObj.Desc = item.PlaceType ? item.PlaceType : null;
  itemObj.Name = item.Place ? item.Place : null;
  itemObj.PlaceId = item.PlaceId ? item.PlaceId : null;
  itemObj.ServiceItemId = item.Ticket ? item.Ticket.ServiceItemId : null;
  itemObj.AirlineProfileName = item.Ticket
    ? item.Ticket.AirlineProfileName
    : '';
  itemObj.FlightCode = item.Ticket ? item.Ticket.FlightNumber : '';
  itemObj.SeatClass = item.Ticket ? item.Ticket.SeatClass : '';
  itemObj.PNR = item.Ticket ? item.Ticket.PNR : '';
  itemObj.IsAllowedActivity = item.Ticket
    ? item.Ticket.IsAllowedActivity
    : false;
  itemObj.IsTransit = item.Ticket ? item.Ticket.IsTransit : false;
  if (type === ARRIVAL) itemObj.ServiceType = 'Movement_arrival';
  else itemObj.ServiceType = 'Movement_departure';
  return itemObj;
};

export const setConnectionToDailyProgram = (
  Movements,
  ConnectionFlight,
  movementList
) => {
  let dataMovements = Movements;
  // eslint-disable-next-line
  ConnectionFlight.map(itemConnection => {
    // eslint-disable-next-line
    let data = setAirportMovement(
      itemConnection,
      movementList,
      itemConnection.TransferType === 'Movement_arrival' ? ARRIVAL : DEPARTURE
    ); // eslint-disable-next-line
    Movements.map((item, i) => {
      // eslint-disable-next-line
      if (
        convertToStringTime(data.DateTime) < convertToStringTime(item.DateTime)
      ) {
        dataMovements.splice(i + 1, 0, data);
      } else if (i === Movements.length - 1) {
        dataMovements.splice(dataMovements.length, 0, data);
      }
    });
  });
  return dataMovements;
};

export const setMovementConnectionFlight = (
  summaryProgram,
  dailyProgram,
  movementList
) => {
  let dailyProg = copyObject(dailyProgram);
  let conFlight = copyObject(summaryProgram).filter(item => item.TransferType);
  dailyProg.map(daily => {
    let flights = conFlight.filter(item => filterByDate(item.Date, daily.Date));
    if (flights.length > 0)
      daily.Movements =
        daily.Movements.length !== 0
          ? setConnectionToDailyProgram(daily.Movements, flights, movementList)
          : flights.reduce((res, flight) => {
              res = res.concat(
                setAirportMovement(
                  flight,
                  movementList,
                  flight.TransferType === 'Movement_arrival'
                    ? ARRIVAL
                    : DEPARTURE
                )
              );
              return res;
            }, []);
    return daily;
  });
  return dailyProg;
};

//=======================================================
//==============End set initial airport =================
//=======================================================

//=======================================================
//==============set initial checkin checkout ============
//=======================================================
const isDate1BiggerthanDate2 = (date1, date2) => {
  return convertToStringTime(date1) > convertToStringTime(date2);
};
const isDate1BiggerorSameDate2 = (date1, date2) => {
  return convertToStringTime(date1) >= convertToStringTime(date2);
};
//untuk set movement accomdasi
//SummaryProgram: Array of object Summary program
//DailyProgram: Array of object Daily program
//movementList : array of object type movement
export const setMovementCheckoutinAccomodasi = (
  summaryProgram,
  dailyProgram,
  movementList
) => {
  let SP = copyObject(summaryProgram);
  let DP = copyObject(dailyProgram);
  // let i = 0;
  let accomms = SP.filter(item => item.AccommodationSummary);
  // let no = SP.length;
  DP.map(daily => {
    //checkout checkin accom
    let coAccom = accomms.filter(accom =>
      filterByDate(accom.LeavingDate, daily.Date)
    );
    let ciAccom = accomms.filter(accom => filterByDate(accom.Date, daily.Date));
    //insert checkout movement
    if (coAccom) {
      // eslint-disable-next-line
      coAccom.map(item => {
        let coMove = setAccomodationtMovement(item, movementList, CHECKOUT);
        if (daily.Movements.length > 0) {
          let { CheckOut } = item.AccommodationSummary;
          daily.Movements = setCheckInCheckoutMovement(
            daily.Movements,
            CheckOut,
            coMove
          );
        } else {
          daily.Movements.push(coMove);
        }
      });
    }
    //insert checkin movement
    if (ciAccom) {
      // eslint-disable-next-line
      ciAccom.map(item => {
        let ciMove = setAccomodationtMovement(item, movementList, CHECKIN);
        if (daily.Movements.length > 0) {
          let { CheckIn } = item.AccommodationSummary;
          daily.Movements = setCheckInCheckoutMovement(
            daily.Movements,
            CheckIn,
            ciMove
          );
        } else {
          daily.Movements.push(ciMove);
        }
      });
    }
    return daily;
  });
  return DP;
};

const setCheckInCheckoutMovement = (movements, ciCoDate, ciCoMove) => {
  let newMovements = movements.reduce((res, move, i, origin) => {
    let isMoveExist = !!res.find(item => item == ciCoMove); //check apakah sudah ada move yg sama
    let nextMove = origin[i + 1];
    if (
      nextMove &&
      isDate1BiggerthanDate2(ciCoDate, origin[i].DateTime) &&
      isDate1BiggerthanDate2(nextMove.DateTime, ciCoDate)
    ) {
      res = res.concat(move, ciCoMove);
    } else if (
      !isMoveExist &&
      isDate1BiggerthanDate2(origin[i].DateTime, ciCoDate)
    ) {
      res = res.concat(ciCoMove, move);
    } else if (!isMoveExist && !nextMove) {
      res = res.concat(move, ciCoMove);
    } else {
      res.push(move);
    }
    return res;
  }, []);
  return newMovements;
};
//untuk set accomodation movement
//item : Object Summary program accomodation
//movementList : array of object type movement
//type : string "CHECKIN" or "CHECKOUT"
export const setAccomodationtMovement = (item, movementList, type) => {
  let moveObj = copyObject(Movement);
  let typeMov = movementList.filter(item => item.Name === type);
  if (type === CHECKIN) {
    moveObj.DateTime = item.AccommodationSummary.CheckIn;
    moveObj.TypeMovement = false;
  } else {
    moveObj.DateTime = item.AccommodationSummary.CheckOut;
  }
  moveObj.Destination = item.City ? item.City.Id : null;
  moveObj.DestinationName = item.City ? item.City.Name : null;
  moveObj.Item = setAccomItem(moveObj.Destination, item.AccommodationSummary);
  moveObj.MovementName = typeMov[0].Name;
  moveObj.MovementDescription = typeMov[0].Description;
  moveObj.ServiceItemId = typeMov[0].ServiceItemId;
  return moveObj;
};

//untuk set item accomodation movement
//Destination : id of City
//AccommodationSummary
export const setAccomItem = (destination, accommodationSummary) => {
  let itemObj = copyObject(ItemMove);
  if (accommodationSummary !== null) {
    itemObj.Address = accommodationSummary.Address;
    itemObj.CityId = destination;
    itemObj.ProfileDesc = accommodationSummary.RoomName;
    itemObj.ImageName = accommodationSummary.ImageName;
    itemObj.ImageUrl = accommodationSummary.ImageUrl;
    itemObj.Name = accommodationSummary.Name;
    itemObj.ServiceItemId = accommodationSummary.ServiceItemId;
    itemObj.ServiceType = accommodationSummary.RoomService;
  }
  return itemObj;
};

//=======================================================
//===========end set initial checkin checkout ===========
//=======================================================

//=======================================================
//===========set initial virtual checkin checkout =======
//=======================================================
//menambahkan virtual Accomodasi
//newDailyProgram : Daily Program baru
//MovementList : Array of object movementList

export const setMovementVirtualAccommodation = (
  newDailyProgram,
  movementList
) => {
  newDailyProgram.map((daily, dayIdx) => {
    daily.Movements = daily.Movements.reduce((res, move, i, origin) => {
      if (move.MovementName === VIRTUALCHECKIN) {
        move.Item =
          origin[i - 1].MovementName === FREETIMELOCKED
            ? copyObject(origin[i - 2].Item)
            : copyObject(origin[i - 1].Item);
        res.push(move);
      } else if (
        move.MovementName === VIRTUALCHECKOUT ||
        move.MovementName === VIRTUALLEAVEACCOMMODATION
      ) {
        move.Item = copyObject(origin[i - 1].Item);
        res.push(move);
      } else if (
        move.MovementName === ARRIVAL ||
        move.MovementName === CHECKOUT
      ) {
        let isArrival = move.MovementName === 'ARRIVAL';
        let isTransit = move.Item.IsTransit;
        let isAllowedActivity = move.Item.IsAllowedActivity;
        let durationArrivalDeparture = origin[i + 1]
          ? diffDate(move.DateTime, origin[i + 1].DateTime, 'hours')
          : newDailyProgram[dayIdx + 1]
          ? newDailyProgram[dayIdx + 1].Movements.length !== 0
            ? diffDate(
                move.DateTime,
                newDailyProgram[dayIdx + 1].Movements[0].DateTime,
                'hours'
              )
            : 0
          : 0;
        if (
          isArrival
            ? isTransit
              ? isAllowedActivity && durationArrivalDeparture >= 4
              : newDailyProgram[dayIdx + 1]
            : true
        ) {
          let virCiMove = setVirtualMovement(
            move,
            movementList,
            VIRTUALCHECKIN
          );
          let virCoMove = setVirtualMovement(
            virCiMove,
            movementList,
            VIRTUALCHECKOUT
          );
          if (origin[i + 1]) {
            if (
              origin[i + 1].MovementName === VIRTUALCHECKIN ||
              origin[i + 1].MovementName === FREETIMELOCKED
            ) {
              res.push(move);
            } else {
              res = res.concat(move, virCiMove, virCoMove);
            }
          } else {
            res = res.concat(move, virCiMove, virCoMove);
          }
        } else {
          res.push(move);
        }
      } else {
        res.push(move);
      }
      return res;
    }, []);
    return daily;
  });
  return newDailyProgram;
};

export const setVirtualMovement = (item, movementList, type) => {
  let moveObj = copyObject(Movement);
  let moveType = movementList.find(item => item.Name === type);
  moveObj.DateTime = item.DateTime;
  moveObj.SeqNumber = null;
  moveObj.MovementName = moveType.Name;
  moveObj.MovementDescription = moveType.Description;
  moveObj.Duration = 0;
  moveObj.ServiceItemId = moveType.ServiceItemId;
  moveObj.Destination = item.Destination;
  moveObj.DestinationName = item.DestinationName;
  moveObj.Item = item.Item;
  moveObj.TypeVirtual = true;
  return moveObj;
};

//=======================================================
//=========end set initial virtual checkin checkout =====
//=======================================================

//=======================================================
//================ set Driving Null =====================
//=======================================================
//menambahkan driving null di antara activity
export const setMovementDriving = (newDailyProgram, movementList) => {
  newDailyProgram.map(daily => {
    daily.Movements = daily.Movements.reduce((res, move, i, origin) => {
      let moveDate = SumSecond(move.DateTime, move.Duration);
      let moveName = move.MovementName;
      let nextMove = origin[i + 1];
      if (
        moveName === VIRTUALCHECKOUT &&
        (!nextMove ||
          (nextMove &&
            [DEPARTURE, CHECKIN].indexOf(nextMove.MovementName) !== -1))
      ) {
        //menambahkan driving movement diantara virtualCO dan Departure/Checkin
        // atau setelah virCo walaupun tidak ada aktivitas setelahnya
        let drivingMove = addMovement(movementList, move, DRIVING, moveDate);
        res.push(move, drivingMove);
      } else if (
        moveName === DEPARTURE &&
        nextMove &&
        nextMove.MovementName === ARRIVAL
      ) {
        //menambahkan flighttime antara departure dan arrival
        let flightMove = addMovement(movementList, move, FLIGHTTIME, moveDate);
        res.push(move, flightMove);
      } else {
        res.push(move);
      }
      return res;
    }, []);
    return daily;
  });
  return newDailyProgram;
};

export const addMovement = (movementList, item, type, date) => {
  let moveObj = copyObject(Movement);
  let moveType = movementList.find(item => item.Name === type);
  moveObj.DateTime = date;
  moveObj.SeqNumber = null;
  moveObj.MovementName = moveType.Name;
  moveObj.MovementDescription = moveType.Description;
  moveObj.ServiceItemId = moveType.ServiceItemId;
  moveObj.Destination = item.Destination;
  moveObj.DestinationName = item.DestinationName;
  moveObj.Item =
    [VIRTUALCHECKIN, virtualCheckInOut].indexOf(type) !== -1
      ? item.Item
      : addItemList(null);
  moveObj.Item.PlaceId = type === FLIGHTTIME ? item.Item.PlaceId : null;
  moveObj.Duration = 0;
  moveObj.TypeVirtual =
    [VIRTUALCHECKIN, virtualCheckInOut].indexOf(type) !== -1 ? true : false;
  return moveObj;
};

export const addItemList = param => {
  let item = copyObject(ItemMove);
  if (param !== null) {
    item.Name = param.Name;
    item.Desc = param.Desc;
    item.ServiceType = param.ServiceType;
    item.ImageUrl = param.ImageUrl;
    item.ImageName = param.ImageName;
    item.ServiceItemId = param.ServiceItemId;
    item.Address = param.Address;
    item.PlaceId = param.PlaceId;
    item.CityId = param.CityId;
    item.ProfileDesc = param.ProfileDesc;
    if (param.Hours) {
      item.Hours = param.Hours;
    }
  }
  return item;
};
//=======================================================
//================ end set Driving Null =================
//=======================================================
//=======================================================
//================ set Daystart day end =================
//=======================================================
export const setMovementDayStartDayEnd = (
  summaryProgram,
  dailyProgramTemp,
  movementList
) => {
  let dpTemp = copyObject(dailyProgramTemp);
  let sp = summaryProgram.filter(
    item => item.AccommodationSummary !== undefined
  );
  let accomms = sp.filter(item => item.AccommodationSummary);
  dpTemp.map((daily, i) => {
    let accom = accomms.find(
      item =>
        getTime(daily.Date) >= getTime(item.Date) &&
        getTime(item.LeavingDate) >= getTime(daily.Date)
    );
    if (accom) {
      let accomMove = setAccomodationtMovement(accom, movementList, CHECKIN);
      if (daily.Movements.length > 0) {
        daily.Movements = daily.Movements.reduce((res, move, idx, origin) => {
          let moveName = move.MovementName;
          let nextMove = origin[idx + 1];
          let prevMove = origin[idx - 1];
          // untuk insert dayend
          if (
            ([CHECKIN, RETURNACCOMMODATION].indexOf(moveName) !== -1 &&
              !nextMove) ||
            (moveName === DRIVING &&
              !nextMove &&
              (dpTemp[i + 1] &&
                dpTemp[i + 1].Movements[0] &&
                dpTemp[i + 1].Movements[0].MovementName !== DEPARTURE))
          ) {
            let moveDate = SumSecond(move.DateTime, move.Duration);
            if (moveName === DRIVING) {
              //jika movement name bukan check in, maka akan mencari movement akomodasi pada hari berikutnya.
              let nextDay = dpTemp[i + 1];
              let accom = accomms.find(
                item =>
                  isDate1BiggerorSameDate2(item.Date, nextDay.Date) &&
                  isDate1BiggerorSameDate2(nextDay.Date, item.LeavingDate)
              );
              accomMove = setAccomodationtMovement(
                accom,
                movementList,
                CHECKIN
              );
              let cehckinNextDay = nextDay.Movements.find(
                item => item.MovementName === CHECKIN
              );
              // move date akan di isi dengan date checkin pada hari berikutnya,
              // jika tidak ada checkin akan diisi aktivitas pertama pada hari berikutya
              moveDate = cehckinNextDay
                ? cehckinNextDay.DateTime
                : nextDay.Movements[0].DateTime;
            } else {
              accomMove = move;
            }
            let dayend = addDayStartDayEnd(
              accomMove,
              moveDate,
              movementList,
              DAYEND
            );
            res.push(move, dayend);
          } else if (
            (moveName === CHECKOUT || moveName === LEAVEACCOMMODATION) &&
            !prevMove
          ) {
            //untuk insert daystart
            let accom = accomms.find(item =>
              filterByDate(daily.Date, item.LeavingDate)
            );
            let accomMove = accom
              ? setAccomodationtMovement(accom, movementList, CHECKIN)
              : null;
            let daystart = addDayStartDayEnd(
              accomMove ? accomMove : move,
              move.DateTime,
              movementList,
              DAYSTART
            );
            res.push(daystart, move);
          } else {
            res.push(move);
          }
          return res;
        }, []);
      } else {
        let date = convertToStringDate(daily.Date);
        daily.Movements.push(
          addDayStartDayEnd(
            accomMove,
            `${date}T08:00:00`,
            movementList,
            DAYSTART
          ),
          addDayStartDayEnd(accomMove, `${date}T20:00:00`, movementList, DAYEND)
        );
      }
    }
    return daily;
  });
  return dpTemp;
};

export const addDayStartDayEnd = (item, date, movementList, type) => {
  let moveObj = copyObject(Movement);
  let moveType = movementList.find(item => item.Name === type);
  moveObj.DateTime = date;
  moveObj.SeqNumber = null;
  moveObj.MovementName = moveType.Name;
  moveObj.MovementDescription = moveType.Description;
  moveObj.ServiceItemId = moveType.ServiceItemId;
  moveObj.Destination = item.Destination;
  moveObj.DestinationName = item.DestinationName;
  moveObj.Item = item.Item;
  moveObj.Duration = 0;
  moveObj.Note = '';
  return moveObj;
};
//=======================================================
//================end set Daystart day end ==============
//=======================================================
//=======================================================
//================ set movement freetime locked ==============
//=======================================================
export const setMovementFreetimeLocked = (dailyProgramTemp, movementList) => {
  let dpTemp = copyObject(dailyProgramTemp);
  dpTemp.map((daily, i) => {
    daily.Movements = daily.Movements.reduce((res, move, idx, origin) => {
      let nextMove = origin[idx + 1];
      let moveName = move.MovementName;
      let nextDay = dpTemp[i + 1];
      // insert movement freetime locked
      if (moveName === DRIVING) {
        let date = SumSecond(move.DateTime, move.Duration);
        if (
          nextMove &&
          [CHECKIN, DEPARTURE, DAYEND].indexOf(nextMove.MovementName) !== -1
        ) {
          //====bagian ini bisa disederhanakan lagi
          let freetime = addFreeTime(movementList, date, nextMove, 0, false);
          freetime.Duration = getNumberOfSecond(date, nextMove.DateTime);
          res.push(move, freetime);
        } else if (!nextMove && nextDay && nextDay.Movements[0]) {
          nextMove = nextDay.Movements[0]; //movement pertama pada hari selanjutnya
          //====bagian ini bisa disederhanakan lagi
          let freetime = addFreeTime(movementList, date, nextMove, 0, false);
          freetime.Duration = getNumberOfSecond(date, nextMove.DateTime);
          res.push(move, freetime);
        } else {
          res.push(move);
        }
      } else {
        let prevMove = origin[idx - 1];
        if (moveName === FREETIMELOCKED && prevMove.MovementName === DRIVING) {
          move.Item = nextMove
            ? nextMove.Item
            : nextDay
            ? nextDay.Movements[0].Item
            : move.Item;
        }
        res.push(move);
      }
      return res;
    }, []);
    return daily;
  });
  return dpTemp;
};

export const addFreeTime = (movementList, date, item, duration, type) => {
  let moveObj = copyObject(Movement);
  let moveType = movementList.find(e => e.Name === FREETIMELOCKED);
  moveObj.DateTime = date === null ? item.DateTime : date;
  moveObj.SeqNumber = null;
  moveObj.MovementName = moveType.Name;
  moveObj.MovementDescription = 'Free Time';
  moveObj.Duration = duration;
  moveObj.ServiceItemId = moveType.ServiceItemId;
  moveObj.Destination = item.Destination;
  moveObj.DestinationName = item.DestinationName;
  moveObj.Note = '';
  moveObj.Item = addItemList(item.Item);
  moveObj.TypeMovement = type;
  return moveObj;
};

//==================================
//================================== Check Data have movement name or Not ==================================

export const checkMovementName = (data, type, par) => {
  let dataFind = null;
  if (type == 'activity') {
    dataFind = data.find(
      item =>
        item.MovementName == 'RECREATION' ||
        item.MovementName == 'EAT' ||
        item.MovementName == 'LEAVEACCOMMODATION' ||
        item.MovementName == 'RETURNACCOMMODATION' ||
        item.MovementName == 'DRIVING' ||
        item.MovementName == 'FREETIMELOCKED' ||
        item.MovementName == 'FREETIME'
    );
  } else {
    dataFind = par
      ? data.find(item => item.MovementName == par)
      : data.find(
          item =>
            item.MovementName == 'ARRIVAL' ||
            item.MovementName == 'CHECKIN' ||
            item.MovementName == 'CHECKOUT' ||
            item.MovementName == 'DEPARTURE'
        );
  }
  return dataFind;
};

//================================== Function to insert data in array specific index of array ==================================
export const insert = (data, dataItemPush) => {
  // eslint-disable-next-line
  dataItemPush.length != 0
    ? dataItemPush.map(item => {
        data.push(item);
      })
    : null;
  return data;
};

export const insertReverse = (data, dataItemPush, index) => {
  dataItemPush = dataItemPush.reverse();
  dataItemPush.length != 0
    ? dataItemPush.map(item => {
        data = data.reduce((dataPush, originData, i) => {
          i == index
            ? dataPush.push(item, originData)
            : dataPush.push(originData);
          return dataPush;
        }, []);
      })
    : (data = data.reduce((dataPush, originData, i) => {
        i == index
          ? dataPush.push(dataItemPush, originData)
          : dataPush.push(originData);
        return dataPush;
      }, []));
  return data;
};

//================================== Get Old Daily Program ==================================
export const getActivityOldDailyProgram = (
  newDailyProgram,
  oldDailyProgram,
  cityInCountry
) => {
  let trueCopyDataOldBeforeDay = false;
  let indexNextOldDP = null;
  let itemPrev = null;
  // eslint-disable-next-line
  newDailyProgram.map((data, j) => {
    let hasilOldDp = [];
    let hasilNewDp = [];
    let findMovFlightCICO = checkMovementName(data.Movements, 'arrDepCICO');
    if (findMovFlightCICO) {
      // eslint-disable-next-line
      newDailyProgram[j].Movements.map((data, i) => {
        // eslint-disable-next-line
        data.MovementName === 'ARRIVAL' ||
        data.MovementName === 'DEPARTURE' ||
        data.MovementName === 'CHECKIN' ||
        data.MovementName === 'CHECKOUT'
          ? hasilNewDp.push({
              index: i,
              MovementName: data.MovementName,
              Item: data.Item,
              DateTime: data.DateTime,
              Destination: data.Destination,
              Note: data.Note,
            })
          : null;
      });
      // eslint-disable-next-line
      oldDailyProgram.length !== 0
        ? oldDailyProgram[indexNextOldDP ? indexNextOldDP : j]
          ? oldDailyProgram[indexNextOldDP ? indexNextOldDP : j].Movements
              .length !== 0
            ? oldDailyProgram[
                indexNextOldDP ? indexNextOldDP : j
                // eslint-disable-next-line
              ].Movements.map((data, i) => {
                // eslint-disable-next-line
                data.MovementName === 'ARRIVAL' ||
                data.MovementName === 'DEPARTURE' ||
                data.MovementName === 'CHECKIN' ||
                data.MovementName === 'CHECKOUT'
                  ? hasilOldDp.push({
                      index: i,
                      MovementName: data.MovementName,
                      Item: data.Item,
                      DateTime: data.DateTime,
                    })
                  : null;
              })
            : null
          : null
        : null;
      let checkReplaceAll = null;
      // eslint-disable-next-line
      hasilNewDp.map((dataDp, i) => {
        if (hasilOldDp[i]) {
          if (
            dataDp.MovementName === hasilOldDp[i].MovementName &&
            convertToStringTime(dataDp.DateTime) ===
              convertToStringTime(hasilOldDp[i].DateTime) &&
            dataDp.Item.ServiceItemId === hasilOldDp[i].Item.ServiceItemId
          ) {
            if (
              dataDp.Item.ServiceItemId === null &&
              dataDp.Item.CityId !== hasilOldDp[i].Item.CityId
            ) {
              // eslint-disable-next-line
              return;
            } else {
              let indexOld = hasilOldDp[i].index;
              oldDailyProgram[indexNextOldDP ? indexNextOldDP : j].Movements[
                indexOld
              ].Item = dataDp.Item;
              oldDailyProgram[indexNextOldDP ? indexNextOldDP : j].Movements[
                indexOld
              ].Destination = dataDp.Destination;
              oldDailyProgram[indexNextOldDP ? indexNextOldDP : j].Movements[
                indexOld
              ].Note = dataDp.Note;
              let pushDataOldDP =
                i === 0
                  ? oldDailyProgram[
                      indexNextOldDP ? indexNextOldDP : j
                    ].Movements.slice(0, indexOld)
                  : i === hasilNewDp.length - 1
                  ? hasilNewDp.length < hasilOldDp.length
                    ? null
                    : oldDailyProgram[
                        indexNextOldDP ? indexNextOldDP : j
                      ].Movements.slice(
                        indexOld + 1,
                        oldDailyProgram[indexNextOldDP ? indexNextOldDP : j]
                          .Movements.length
                      )
                  : oldDailyProgram[
                      indexNextOldDP ? indexNextOldDP : j
                    ].Movements.slice(
                      hasilOldDp[i - 1].index === 0
                        ? 1
                        : hasilOldDp[i - 1].index + 1,
                      hasilOldDp[i].index
                    );
              // eslint-disable-next-line
              let findIndexInsertData = newDailyProgram[j].Movements.findIndex(
                item => item.MovementName === dataDp.MovementName
              ); // eslint-disable-next-line
              pushDataOldDP
                ? pushDataOldDP.length !== 0
                  ? (newDailyProgram[j].Movements =
                      i === hasilNewDp.length - 1
                        ? insert(newDailyProgram[j].Movements, pushDataOldDP)
                        : insertReverse(
                            newDailyProgram[j].Movements,
                            pushDataOldDP,
                            findIndexInsertData
                          ))
                  : null
                : null;
              checkReplaceAll === false
                ? (checkReplaceAll = false)
                : (checkReplaceAll = true);
              trueCopyDataOldBeforeDay = true;
              itemPrev = dataDp.Item;
            }
          } else {
            if (
              findRegionByCity(
                cityInCountry,
                dataDp.Item.CityId,
                hasilOldDp[i].Item.CityId
              )
            ) {
              checkReplaceAll = false;
              trueCopyDataOldBeforeDay = true;
              itemPrev = dataDp.Item;
            } else {
              checkReplaceAll = false;
              trueCopyDataOldBeforeDay = false;
            }
          }
        } else {
          checkReplaceAll = false;
        }
      });
      if (hasilNewDp.length < hasilOldDp.length) {
        checkReplaceAll = false;
      }
      if (checkReplaceAll) {
        newDailyProgram[j].Movements =
          oldDailyProgram[indexNextOldDP ? indexNextOldDP : j].Movements;
        newDailyProgram[j].TourGuides = oldDailyProgram[
          indexNextOldDP ? indexNextOldDP : j
        ].TourGuides
          ? oldDailyProgram[indexNextOldDP ? indexNextOldDP : j].TourGuides
          : [];

        if (
          convertToStringDate(hasilNewDp[0].DateTime) !==
          convertToStringDate(hasilOldDp[0].DateTime)
        ) {
          newDailyProgram[j].Movements.map(item => {
            return (item.DateTime =
              convertToStringDate(hasilNewDp[0].DateTime) +
              convertToStringTime(item.DateTime));
          });
        }
      }
      indexNextOldDP = null;
    } else if (data.Movements.length === 0) {
      if (trueCopyDataOldBeforeDay) {
        let findMovFlightCICOMovNol = oldDailyProgram[j]
          ? checkMovementName(oldDailyProgram[j].Movements, 'arrDepCICO')
          : null;

        if (findMovFlightCICOMovNol) {
          indexNextOldDP = j;
        } else {
          if (oldDailyProgram[j]) {
            // eslint-disable-next-line
            oldDailyProgram[j].Movements.map((oDP, index) => {
              let num = data.Movements.length;
              if (
                [
                  'RECREATION',
                  'EAT',
                  'LEAVEACCOMMODATION',
                  'RETURNACCOMMODATION',
                  'DRIVING',
                  'FREETIMELOCKED',
                  'FREETIME',
                ].indexOf(oDP.MovementName) !== -1
              ) {
                if (num > 0) {
                  if (
                    getHour(oDP.DateTime) >=
                    getHour(newDailyProgram[j].Movements[num - 1].DateTime)
                  ) {
                    if (
                      oDP.MovementName === 'LEAVEACCOMMODATION' ||
                      oDP.MovementName === 'RETURNACCOMMODATION'
                    ) {
                      oldDailyProgram[j].Movements[index].Item = itemPrev
                        ? itemPrev
                        : oldDailyProgram[j].Movements[index].Item;
                      newDailyProgram[j].Movements.push(
                        oldDailyProgram[j].Movements[index]
                      );
                    } else {
                      newDailyProgram[j].Movements.push(
                        oldDailyProgram[j].Movements[index]
                      );
                    }
                  } else if (
                    convertToStringDate(oDP.DateTime) >=
                    convertToStringDate(
                      newDailyProgram[j].Movements[num - 1].DateTime
                    )
                  ) {
                    if (
                      oDP.MovementName === 'LEAVEACCOMMODATION' ||
                      oDP.MovementName === 'RETURNACCOMMODATION'
                    ) {
                      oldDailyProgram[j].Movements[index].Item = itemPrev
                        ? itemPrev
                        : oldDailyProgram[j].Movements[index].Item;
                    }
                    // eslint-disable-next-line
                    oldDailyProgram[j].Movements[index + 1]
                      ? oDP.DateTime.slice(0, -9) ===
                        oldDailyProgram[j].Movements[index + 1].DateTime.slice(
                          0,
                          -9
                        )
                        ? newDailyProgram[j].Movements.push(
                            oldDailyProgram[j].Movements[index]
                          )
                        : null
                      : newDailyProgram[j].Movements.push(
                          oldDailyProgram[j].Movements[index]
                        );
                  }
                } else {
                  if (
                    oDP.Destination ===
                    newDailyProgram[j].TourDestinations[0].Destination
                  ) {
                    if (
                      oDP.MovementName === 'LEAVEACCOMMODATION' ||
                      oDP.MovementName === 'RETURNACCOMMODATION'
                    ) {
                      oldDailyProgram[j].Movements[index].Item = itemPrev
                        ? itemPrev
                        : oldDailyProgram[j].Movements[index].Item;
                      newDailyProgram[j].Movements.push(
                        oldDailyProgram[j].Movements[index]
                      );
                    } else {
                      newDailyProgram[j].Movements.push(
                        oldDailyProgram[j].Movements[index]
                      );
                    }
                  }
                }
              }
            });
          }
        }
        newDailyProgram[j].TourGuides = oldDailyProgram[j]
          ? oldDailyProgram[j].TourGuides
            ? oldDailyProgram[j].TourGuides
            : []
          : [];
      }
    }
  });
  return newDailyProgram;
};

//=============== overlapping ==============
const getDateTime = date => {
  return getTime(new Date(date));
};
const findFlightByType = (flights, type) => {
  return flights.find(item => item.TransferType === type);
};
export const isOverlapping = (headlineProgram, type, index) => {
  let result;
  let Main = headlineProgram.MainPrograms;
  let firstFlight = headlineProgram.Departures;
  let lastFlight = headlineProgram.Returns;
  if (type === 'firstArrival') {
    let arrival = findFlightByType(firstFlight, 'Movement_arrival');
    let departure = findFlightByType(firstFlight, 'Movement_departure');
    let accom = Main[0];
    let arrivalTime = getDateTime(arrival.Date);
    let departureTime = getDateTime(departure.Date);
    let accomTime = getDateTime(accom.AccommodationSummary.CheckIn);
    result =
      arrivalTime < accomTime && arrivalTime > departureTime ? false : true;
  } else if (type === 'lastDeparture') {
    let arrival = findFlightByType(lastFlight, 'Movement_arrival');
    let departure = findFlightByType(lastFlight, 'Movement_departure');
    let accom = Main[Main.length - 1];
    let arrivalTime = getDateTime(arrival.Date);
    let departureTime = getDateTime(departure.Date);
    let accomTime = getDateTime(accom.AccommodationSummary.CheckIn);
    result =
      departureTime < arrivalTime && departureTime > accomTime ? false : true;
  } else if (type === 'accommodation') {
    if (Main[index].hasOwnProperty('AccommodationSummary')) {
      let accom = Main[index];
      let prevObj = Main[index - 1]
        ? Main[index - 1]
        : headlineProgram.Departures[0];
      let nextObj = Main[index + 1]
        ? Main[index + 1]
        : headlineProgram.Returns[0];
      let checkinTime = getDateTime(accom.AccommodationSummary.CheckIn);
      let checkoutTime = getDateTime(accom.AccommodationSummary.CheckOut);
      let prevTime = getDateTime(
        prevObj.hasOwnProperty('AccommodationSummary')
          ? prevObj.AccommodationSummary.CheckOut
          : prevObj.Date
      );
      let nextTime = getDateTime(
        nextObj.hasOwnProperty('AccommodationSummary')
          ? nextObj.AccommodationSummary.CheckIn
          : nextObj.Date
      );
      result =
        prevTime > checkinTime
          ? true
          : nextTime < checkoutTime
          ? true
          : checkinTime > checkoutTime
          ? true
          : false;
    } else {
      let airport = Main[index];
      let prevObj = Main[index - 1];
      let nextObj = Main[index + 1];
      let prevTime = getDateTime(
        prevObj.hasOwnProperty('AccommodationSummary')
          ? prevObj.AccommodationSummary.CheckOut
          : prevObj.Date
      );
      let airportTime = getDateTime(airport.Date);
      let nextTime = getDateTime(
        nextObj.hasOwnProperty('AccommodationSummary')
          ? nextObj.AccommodationSummary.CheckIn
          : nextObj.Date
      );
      result =
        prevTime > airportTime ? true : nextTime < airportTime ? true : false;
    }
  }
  return result;
};

//================================================================
//=============set returns Date at headline programs==============
//================================================================
//untuk change date returns;
//returns : objeck dari returns
//mainProgram : list of object summary program
export const setReturnsDate = (returns, mainProgram) => {
  let returnsArray = copyObject(returns);
  returnsArray.map((item, i) => {
    let prevDate =
      i === 0
        ? mainProgram[mainProgram.length - 1].LeavingDate
        : returnsArray[i - 1].Date;
    let time = convertToStringTime(item.Date);
    let newDate = item.NextDay ? SumDays(prevDate, 1) : prevDate;
    item.Date = `${convertToStringDate(newDate)}${time}`;
    return item;
  });

  return returnsArray;
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
  let SP = copyObject(SummaryProgram);
  let air = copyObject(Arrival);
  date = changeTime(date);
  SP[index].Date =
    convertToStringDate(date) + convertToStringTime(SP[index].Date);
  if (index === 0) {
    SP[index].NextDay =
      convertToStringDate(SP[index].Date) === convertToStringDate(air.Date)
        ? false
        : true;
  } else {
    if (SP[index - 1].AccommodationSummary !== undefined) {
      SP[index].NextDay =
        convertToStringDate(SP[index - 1].LeavingDate) ===
        convertToStringDate(SP[index].Date)
          ? false
          : true;
    } else {
      SP[index].NextDay =
        convertToStringDate(SP[index - 1].Date) ===
        convertToStringDate(SP[index].Date)
          ? false
          : true;
    }
  }

  if (SP[index].AccommodationSummary !== undefined) {
    SP[index].AccommodationSummary.DateTime = SP[index].Date;
    SP[index].AccommodationSummary.CheckIn =
      convertToStringDate(SP[index].Date) +
      convertToStringTime(SP[index].AccommodationSummary.CheckIn);
    SP[index].TotalDays = getNumberOfDays(
      SP[index].Date,
      SP[index].LeavingDate
    );
    date = SP[index].LeavingDate;
  } else {
    date = SP[index].Date;
  }
  index++;
  return SP[index] ? setDateSummaryProgramSequence(SP, null, index, date) : SP;
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
  let SP = copyObject(SummaryProgram);
  let air = copyObject(Arrival);
  date = changeTime(date);
  SP[index].Date =
    convertToStringDate(date) + convertToStringTime(SP[index].Date);
  if (index === 0) {
    SP[index].NextDay =
      convertToStringDate(SP[index].Date) === convertToStringDate(air.Date)
        ? false
        : true;
  } else {
    if (SP[index - 1].AccommodationSummary !== undefined) {
      SP[index].NextDay =
        convertToStringDate(SP[index - 1].LeavingDate) ===
        convertToStringDate(SP[index].Date)
          ? false
          : true;
    } else {
      SP[index].NextDay =
        convertToStringDate(SP[index - 1].Date) ===
        convertToStringDate(SP[index].Date)
          ? false
          : true;
    }
  }

  if (SP[index].AccommodationSummary !== undefined) {
    SP[index].AccommodationSummary.DateTime = SP[index].Date;
    SP[index].AccommodationSummary.CheckIn =
      convertToStringDate(SP[index].Date) +
      convertToStringTime(SP[index].AccommodationSummary.CheckIn);
    SP[index].LeavingDate = SumDays(SP[index].Date, SP[index].TotalDays - 1);
    SP[index].AccommodationSummary.CheckOut =
      convertToStringDate(SP[index].LeavingDate) +
      convertToStringTime(SP[index].AccommodationSummary.CheckOut);
    date = SP[index].LeavingDate;
  } else {
    date = SP[index].Date;
  }
  index++;
  for (let i = index; i < SP.length; i++) {
    if (SP[i].NextDay === true) {
      SP[i].Date =
        convertToStringDate(SumDays(date, 1)) + convertToStringTime(SP[i].Date);
    } else {
      SP[i].Date = convertToStringDate(date) + convertToStringTime(SP[i].Date);
    }
    if (SP[i].AccommodationSummary !== undefined) {
      SP[i].LeavingDate = SumDays(SP[i].Date, SP[i].TotalDays - 1);
      SP[i].AccommodationSummary.DateTime = SP[i].Date;
      SP[i].AccommodationSummary.CheckIn =
        convertToStringDate(SP[i].Date) +
        convertToStringTime(SP[i].AccommodationSummary.CheckIn);
      SP[i].AccommodationSummary.CheckOut =
        convertToStringDate(SP[i].LeavingDate) +
        convertToStringTime(SP[i].AccommodationSummary.CheckOut);
      date = SP[i].LeavingDate;
    } else {
      date = SP[i].Date;
    }
  }
  return SP;
};

//==============change departure arrival date===============
export const changeLastArrivalDate = (date, headlineProgram) => {
  let headLineProg = copyObject(headlineProgram);
  let { Departures, Returns } = headLineProg;
  let totalDays = getNumberOfDays(
    Departures[0].Date,
    Returns[Returns.length - 1].Date
  );
  let newStartDate = SubDays(
    convertDateFormat(date, 'YYYY-MM-DD'),
    totalDays - 1
  );
  let startTime = getHourAndMinute(Departures[0].Date);
  let newDate = `${convertDateFormat(
    newStartDate,
    'YYYY-MM-DD'
  )}T${startTime}:00`;
  headLineProg = changeFirstDepartureDate(newDate, headLineProg, startTime);
  return headLineProg;
};
export const changeFirstDepartureDate = (date, headline, arrivalTime) => {
  let headLineProg = copyObject(headline);
  let newDate = `${convertDateFormat(date, 'YYYY-MM-DD')}T${arrivalTime}:00`;
  let newDepartures = setFirstDepartureDate(headline.Departures, newDate);
  let newMainProg = setDateSummaryProgram(
    newDepartures[newDepartures.length - 1].Date,
    headLineProg.MainPrograms
  );
  let newReturns = setReturnsDate(headLineProg.Returns, newMainProg);
  headLineProg.Departures = newDepartures;
  headLineProg.MainPrograms = newMainProg;
  headLineProg.Returns = newReturns;
  return headLineProg;
};
//untuk change date first departure
//departures: array departures
// date: first departure date
export const setFirstDepartureDate = (departures, date) => {
  let departuresArray = copyObject(departures);
  departuresArray.map((item, i) => {
    let prevDate = i === 0 ? changeTime(date) : departuresArray[i - 1].Date;
    let time = convertToStringTime(item.Date);
    let newDate = item.NextDay ? SumDays(prevDate, 1) : prevDate;
    item.Date = `${convertToStringDate(newDate)}${time}`;
    return item;
  });

  return departuresArray;
};
//set date Summary program jika arrival date diganti
export const setDateSummaryProgram = (firstArrivalDate, SummaryProgram) => {
  let date = firstArrivalDate;
  let SP = copyObject(SummaryProgram);
  SP.map(obj => {
    if (obj.NextDay === true) {
      obj.Date =
        convertToStringDate(SumDays(date, 1)) + convertToStringTime(obj.Date);
    } else {
      obj.Date = convertToStringDate(date) + convertToStringTime(obj.Date);
    }

    if (obj.AccommodationSummary !== undefined) {
      obj.LeavingDate = SumDays(obj.Date, obj.TotalDays - 1);
      obj.AccommodationSummary.DateTime = obj.Date;
      obj.AccommodationSummary.CheckIn =
        convertToStringDate(obj.Date) +
        convertToStringTime(obj.AccommodationSummary.CheckIn);
      obj.AccommodationSummary.CheckOut =
        convertToStringDate(obj.LeavingDate) +
        convertToStringTime(obj.AccommodationSummary.CheckOut);
      date = obj.LeavingDate;
    } else {
      date = obj.Date;
    }
    return obj;
  });
  return SP;
};

export const copyDailyProgram = (newDaily, oldDaily) => {
  return newDaily.map(daily => {
    let sameDayDaily = oldDaily.find(item => item.Date === daily.Date);
    if (sameDayDaily) daily.Movements = sameDayDaily.Movements;
    return daily;
  });
};

export const generateFirstLastFlights = (
  departures,
  returns,
  dailyProgram,
  movementList
) => {
  let firstDeparture = departures.length > 1 ? departures[0] : null;
  let lastArrival = returns.length > 1 ? returns[returns.length - 1] : null;
  return dailyProgram.map(daily => {
    if (firstDeparture && filterByDate(firstDeparture.Date, daily.Date)) {
      let move = setAirportMovement(
        firstDeparture,
        movementList,
        firstDeparture.TransferType === 'Movement_arrival' ? ARRIVAL : DEPARTURE
      );
      if (daily.Movements.length < 1) {
        daily.Movements.unshift(move);
      } else if (daily.Movements[0].MovementName === ARRIVAL) {
        let flightTime = addMovement(
          movementList,
          move,
          FLIGHTTIME,
          move.DateTime
        );
        daily.Movements.unshift(move, flightTime);
      }
    }
    if (lastArrival && filterByDate(lastArrival.Date, daily.Date)) {
      let move = setAirportMovement(
        lastArrival,
        movementList,
        lastArrival.TransferType === 'Movement_arrival' ? ARRIVAL : DEPARTURE
      );
      let lastMove = daily.Movements[daily.Movements.length - 1];
      if (daily.Movements.length < 1) {
        daily.Movements.push(move);
      } else if (lastMove && lastMove.MovementName === DEPARTURE) {
        let flightTime = addMovement(
          movementList,
          lastMove,
          FLIGHTTIME,
          lastMove.DateTime
        );
        daily.Movements.push(flightTime, move);
      }
    }
    return daily;
  });
};

//menambahkan last destination ketika tommbol multiple destination dipilih
//kota destinasi menyesuaikan last departure
export const addLastDestinationSummaryProgram = (returns, oldMainProgram) => {
  let mainProgram = copyObject(SummaryProgram);
  mainProgram.Day = oldMainProgram[oldMainProgram.length - 1].Day + 1;
  mainProgram.Date = oldMainProgram[oldMainProgram.length - 1].LeavingDate;
  mainProgram.City = returns[0].City;
  mainProgram.LeavingDate = SumDays(
    oldMainProgram[oldMainProgram.length - 1].LeavingDate,
    1
  );
  mainProgram.AccommodationSummary.CheckIn =
    convertToStringDate(mainProgram.Date) + 'T14:00:00';
  mainProgram.AccommodationSummary.CheckOut =
    convertToStringDate(mainProgram.LeavingDate) + 'T10:00:00';
  mainProgram.Region = oldMainProgram[oldMainProgram.length - 1].Region;
  mainProgram.AccommodationSummary.Allocations =
    oldMainProgram[oldMainProgram.length - 1].AccommodationSummary.Allocations;

  oldMainProgram.push(mainProgram);
  return oldMainProgram;
};

//cek last destination memungkinkan atau tidak untuk di gabung
export const checkLastDestination = mainProgram => {
  let prevDestination = mainProgram[mainProgram.length - 2];
  let lastdestination = mainProgram[mainProgram.length - 1];
  let isSingle = null;
  prevDestination.AccommodationSummary.AccommodationProfileId ==
    lastdestination.AccommodationSummary.AccommodationProfileId &&
  prevDestination.RoomName == lastdestination.RoomName &&
  prevDestination.City.Name == lastdestination.City.Name
    ? (isSingle = true)
    : (isSingle = false);

  return isSingle;
};

//menghapus last destination ketika tommbol single destination dipilih
//last departure menyesuaikan kota destinasi terakhir setelah dihapus
export const deleteLastDestinationSummaryProgram = (
  oldMainProgram,
  returns
) => {
  let isSingle = checkLastDestination(oldMainProgram);
  let mainProgram = copyObject(oldMainProgram);
  if (isSingle) {
    mainProgram[0].Date = oldMainProgram[0].Date;
    mainProgram[0].LeavingDate = SumDays(oldMainProgram[1].LeavingDate, 1);
    mainProgram[0].AccommodationSummary.CheckIn =
      convertToStringDate(oldMainProgram[0].Date) +
      convertToStringTime(oldMainProgram[0].Date);
    mainProgram[0].AccommodationSummary.CheckOut =
      convertToStringDate(oldMainProgram[1].LeavingDate) +
      convertToStringTime(oldMainProgram[1].LeavingDate);
    mainProgram.splice(0, 1);
  }

  returns = setReturnsDate(returns, mainProgram);

  return {
    MainPrograms: mainProgram,
    Returns: returns,
  };
};

//ADD AKOMODASI PALING BARU
//merapikan tanggal summary program
export const fixingSummaryProgramDate = (oldSP, index) => {
  let SP = oldSP.slice(index + 1);
  SP.map((item, i) => {
    item.Day = oldSP[index].Day + 1;
    if (i == 0) {
      item.Date = SumDays(oldSP[index].LeavingDate);
    } else {
      item.Date = SumDays(SP[i - 1].LeavingDate);
    }
    item.LeavingDate = oldSP[index - 1].TransferType
      ? SumDays(item.Date, 1)
      : SumDays(item.LeavingDate, 1);
    item.CheckIn = convertToStringDate(item.Date) + 'T14:00:00';
    item.CheckOut = convertToStringDate(item.LeavingDate) + 'T10:00:00';
  });
  let newSP = oldSP.slice(0, index + 1).concat(SP);
  return newSP;
};

//cari index group ticket sebelum index
export const findIndexTicketPrev = (headline, idx) => {
  let indexTicket = null;
  for (let i = idx; i >= 0; i--) {
    if (headline[i].Ticket && headline[i].Ticket.ServiceItemId) {
      indexTicket = i;
      break;
    }
  }
  return indexTicket;
};
//cari index group ticket setelah index
export const findIndexTicketNext = (headline, idx) => {
  let indexTicket = null;
  for (let i = idx; i < headline.length; i++) {
    if (headline[i].Ticket && headline[i].Ticket.ServiceItemId) {
      indexTicket = i;
      break;
    }
  }
  return indexTicket;
};
//fixing array yang sudah dipotong
const fixingMainProgramGroupTicketDate = mainProgram => {
  mainProgram = mainProgram.reverse();
  // eslint-disable-next-line
  mainProgram.map((curr, i) => {
    // eslint-disable-next-line
    let next = mainProgram[i + 1];
    let prev = mainProgram[i - 1];
    if (next) {
      // eslint-disable-next-line
      if (curr.TransferType && curr.TransferType == 'Movement_arrival') {
        curr.Date = prev.Date;
      } else if (
        curr.TransferType &&
        curr.TransferType === 'Movement_departure'
      ) {
        curr.Date = prev.Date;
      } else {
        next.LeavingDate = curr.Date;
        next.AccommodationSummary.CheckOut = next.LeavingDate;
        if (i !== mainProgram.length - 1 && i + 1 !== mainProgram.length - 1) {
          next.Date = SumDays(next.LeavingDate, -1);
          next.AccommodationSummary.CheckIn = next.Date;
        }
        next.TotalDays = getNumberOfDays(next.Date, next.LeavingDate);
      }
    }
  });
  mainProgram = mainProgram.reverse();
  return mainProgram;
};
export const cutSummaryBetweenTicket = (newSP, index) => {
  //keluarin array yang di apit sama group ticket
  let indexTicketNext = findIndexTicketNext(newSP, index);
  let indexTicketPrev = findIndexTicketPrev(newSP, index);
  let data = {
    MainPrograms: null,
    errorMessage: null,
  };

  if (!indexTicketPrev) {
    data.MainPrograms = newSP.slice(0, indexTicketNext);
  } else if (indexTicketPrev && indexTicketNext) {
    data.MainPrograms = newSP.slice(indexTicketPrev + 1, indexTicketNext);
  } else if (!indexTicketNext) {
    data.MainPrograms = newSP.slice(indexTicketPrev + 1);
  }
  return data;
};
export const combineSummaryProgram = (mainProgram, newSP, headline, index) => {
  //benerin array yang udah dipotong
  mainProgram = fixingMainProgramGroupTicketDate(
    mainProgram.length != 0 ? mainProgram : newSP
  );

  //sisipin array di oldSP
  if (index != newSP.length - 1) {
    headline.MainPrograms.splice.apply(
      headline.MainPrograms,
      [index - 1, 1].concat(mainProgram)
    );
  } else {
    headline.MainPrograms.splice.apply(
      headline.MainPrograms,
      [index + 1, 1].concat(mainProgram)
    );
  }
  return newSP;
};
export const addNewAccommodation = (headline, index) => {
  let oldSP = copyObject(headline.MainPrograms);
  let SP = copyObject(SummaryProgram);
  let indexTicketNext = findIndexTicketNext(headline.MainPrograms, index);
  let data = {
    MainPrograms: null,
    errorMessage: null,
  };
  if (indexTicketNext || headline.Returns[0].Ticket.ServiceItemId) {
    //akomodasi baru yang akan di sisipkan
    SP.Day = oldSP[index - 1].Day + 1;
    SP.Date = SumDays(oldSP[index].Date, -1);
    SP.LeavingDate = oldSP[index].Date;
    SP.AccommodationSummary.CheckIn =
      convertToStringDate(SumDays(oldSP[index].Date, -1)) + 'T14:00:00';
    SP.AccommodationSummary.CheckOut =
      convertToStringDate(oldSP[index].Date) + 'T10:00:00';
    if (oldSP[index].Ticket && oldSP[index].Ticket.ServiceItemId) {
      SP.Region = oldSP[index - 1].Region;
      SP.City = oldSP[index - 1].City;
    }
    SP.AccommodationSummary.Allocations =
      oldSP[index - 1].AccommodationSummary.Allocations;

    //tambah Sp baru ke mainprogram
    oldSP.splice(index, 0, SP);
    let newData = cutSummaryBetweenTicket(oldSP, index, headline);
    data.MainPrograms = combineSummaryProgram(
      newData.MainPrograms,
      oldSP,
      headline,
      index
    );

    // eslint-disable-next-line
    data.errorMessage = newData.errorMessage;
    return data;
  } else {
    let isPrevFlight = oldSP[index - 1].TransferType;
    SP.Day = oldSP[index - 1].Day + 1;
    SP.Date = isPrevFlight
      ? oldSP[index - 1].Date
      : oldSP[index - 1].LeavingDate;
    SP.LeavingDate = SumDays(
      isPrevFlight
        ? oldSP[index - 1].LeavingDate
        : oldSP[index - 1].LeavingDate,
      1
    );
    SP.AccommodationSummary.CheckIn =
      convertToStringDate(SP.Date) + 'T14:00:00';
    SP.AccommodationSummary.CheckOut =
      convertToStringDate(SP.LeavingDate) + 'T10:00:00';
    SP.Region = oldSP[index - 1].Region;
    SP.AccommodationSummary.Allocations =
      oldSP[0].AccommodationSummary.Allocations;

    oldSP.splice(index, 0, SP);

    data.MainPrograms = fixingSummaryProgramDate(oldSP, index);
    return data;
  }
};

//==============================================
//============ convert headline program ========
// untuk mebentuk headline program baru dengan data awal headline dari backend
//==============================================
export const combineHeadline = headline => {
  let newHeadline = headline.Departures.concat(
    headline.MainPrograms,
    headline.Returns
  );
  return newHeadline;
};
export const sortMainProgram = mainProgram => {
  return mainProgram.sort((a, b) => {
    let firstValue = new Date(a.Date).getTime();
    let secondValue = new Date(b.Date).getTime();
    let fistLeaveDate = a.LeavingDate
      ? new Date(a.LeavingDate).getTime()
      : null;
    let secondLeaveDate = b.LeavingDate
      ? new Date(b.LeavingDate).getTime()
      : null;
    if (firstValue < secondValue) {
      return -1;
    }
    if (secondValue > firstValue) {
      return 1;
    }
    if (secondValue == firstValue) {
      if (
        (secondLeaveDate && fistLeaveDate) ||
        (!secondLeaveDate && !fistLeaveDate)
      ) {
        return 0;
      }
      if (secondLeaveDate && !fistLeaveDate) return -1;
      if (!secondLeaveDate && fistLeaveDate) return 1;
    }
  });
};
export const destructureHeadline = headline => {
  let firstAccomIdx = headline.findIndex(item => item.AccommodationSummary);
  let headlineReverse = copyObject(headline).reverse();
  let lastAccomIdx =
    headline.length -
    1 -
    headlineReverse.findIndex(item => item.AccommodationSummary);
  return headline.reduce(
    (res, cur, i) => {
      if (i < firstAccomIdx) {
        res.Departures.push(cur);
      } else if (i > lastAccomIdx) {
        res.Returns.push(cur);
      } else {
        res.MainPrograms.push(cur);
      }
      return res;
    },
    { Departures: [], MainPrograms: [], Returns: [] }
  );
};
export const convertHeadline = headline => {
  let newHeadline = combineHeadline(headline);
  newHeadline = sortMainProgram(newHeadline);
  return destructureHeadline(newHeadline);
};

export const checkNearFlight = (headline, index) => {
  let nearflight = null;
  let serviceIdBefore = headline.MainPrograms[index - 1]
    ? headline.MainPrograms[index - 1].Ticket
      ? headline.MainPrograms[index - 1].Ticket.ServiceItemId
        ? headline.MainPrograms[index - 1]
        : null
      : null
    : null;
  let serviceIdAfter = headline.MainPrograms[index + 1]
    ? headline.MainPrograms[index + 1].Ticket
      ? headline.MainPrograms[index + 1].Ticket.ServiceItemId
        ? headline.MainPrograms[index + 1]
        : null
      : null
    : null;
  let serviceIdDepatures =
    index === 0 && headline.Departures[headline.Departures.length - 1]
      ? headline.Departures[headline.Departures.length - 1].Ticket
        ? headline.Departures[headline.Departures.length - 1].Ticket
            .ServiceItemId
          ? headline.Departures[headline.Departures.length - 1]
          : null
        : null
      : null;
  let serviceIdReturns =
    headline.MainPrograms.length - 1 === index && headline.Returns[0]
      ? headline.Returns[0].Ticket
        ? headline.Returns[0].Ticket.ServiceItemId
          ? headline.Returns[0]
          : null
        : null
      : null;

  // let haveAccommodation = headline.MainPrograms[index]
  //   ? headline.MainPrograms[index].City
  //     ? headline.MainPrograms[index].City.Name
  //       ? true
  //       : false
  //     : false
  //   : false;
  nearflight = serviceIdBefore
    ? serviceIdBefore
    : serviceIdAfter
    ? serviceIdAfter
    : serviceIdDepatures
    ? serviceIdDepatures
    : serviceIdReturns
    ? serviceIdReturns
    : null;
  return nearflight;
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
  let oldSP = copyObject(oldSummaryProgram);
  let oldDate = Arrival.Date;
  let newDate =
    ['Ready', 'Similar'].indexOf(type) !== -1
      ? convertToStringDate(SumDays(new Date(), 1)) + 'T00:00:00'
      : copyObject(Arrival.Date);

  let newSP = [];
  oldSP.map((obj, i) => {
    if (obj.AccommodationSummary !== undefined) {
      let SP = copyObject(SummaryProgram);
      if (convertToStringDate(oldDate) !== convertToStringDate(obj.Date)) {
        SP.NextDay = true;
        newDate = SumDays(newDate, 1);
      }
      SP.Day = obj.Day;
      SP.City = cityList.find(item => item.Id === obj.City.Id);
      SP.Region = SP.City.Region.Id;
      SP.TotalDays = obj.TotalDays;
      SP.Date = convertToStringDate(newDate) + 'T00:00:00';
      SP.LeavingDate =
        convertToStringDate(SumDays(SP.Date, SP.TotalDays - 1)) + 'T00:00:00';
      SP.AccommodationSummary.DateTime = SP.Date;
      SP.AccommodationSummary.CheckIn =
        convertToStringDate(SP.Date) + convertToStringTime(obj.Date);
      SP.AccommodationSummary.CheckOut =
        convertToStringDate(SP.LeavingDate) +
        convertToStringTime(obj.LeavingDate);
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
      newSP.push(SP);
    } else {
      oldDate = obj.Date;
      let arr = copyObject(Airport);
      arr.Address = obj.Address;
      arr.City = cityList.find(item => item.Id === obj.City.Id);
      arr.Region = arr.City.Region.Id;
      arr.Day = obj.Day;
      arr.Note = obj.Note;
      arr.Place = obj.Place;
      arr.PlaceId = obj.PlaceId;
      arr.PlaceType = obj.PlaceType;
      arr.Date = convertToStringDate(newDate) + convertToStringTime(obj.Date);
      arr.TransferType = obj.TransferType;
      let accomObj =
        obj.TransferType === 'Movement_departure' ? oldSP[i - 1] : oldSP[i + 1];
      let accomCity = cityList.find(item => item.Id === accomObj.City.Id);
      arr.RequestFrom = accomCity.Region.Id;
      if (oldSP[i - 1].AccommodationSummary !== undefined) {
        if (
          convertToStringDate(oldSP[i - 1].LeavingDate) !==
          convertToStringDate(obj.Date)
        ) {
          arr.NextDay = true;
          arr.Date =
            convertToStringDate(SumDays(newDate, 1)) +
            convertToStringTime(obj.Date);
        }
      } else {
        if (
          convertToStringDate(oldSP[i - 1].Date) !==
          convertToStringDate(obj.Date)
        ) {
          arr.NextDay = true;
          arr.Date =
            convertToStringDate(SumDays(newDate, 1)) +
            convertToStringTime(obj.Date);
        }
      }

      newDate = arr.Date;
      newSP.push(arr);
    }
    return obj;
  });

  return newSP;
};

export const setInitialTicket = airport => {
  let copyTicket = copyObject(TICKET);
  if (airport) {
    copyTicket.ServiceItemId = airport.ServiceItemId || '';
    copyTicket.PNR = airport.PNR || '';
    copyTicket.FlightNumber = airport.FlightCode || '';
    copyTicket.AirlineProfileName = airport.AirlineProfileName || '';
    copyTicket.IsTransit = airport.IsTransit ? true : false;
    copyTicket.IsAllowedActivity = airport.IsAllowedActivity ? true : false;
  }
  return copyTicket;
};

//==============================================
//============= initial ready package===========
//================================================
export const setInitialAirport = (
  item,
  city,
  day,
  type,
  date,
  status,
  time,
  requestFrom
) => {
  item = copyObject(item);
  let typeMov = type === 'Arrival' ? 'Movement_arrival' : 'Movement_departure';
  let airport = copyObject(Airport);
  airport.City = city && city;
  airport.Region = city && city.Region.Id;
  airport.Day = day;
  airport.PlaceType = 'Airport';
  airport.TransferType = typeMov;
  airport.NextDay = false;
  airport.Ticket = setInitialTicket(airport);
  if (status === 'Custom') {
    // airport.Date =
    //   type === 'Arrival'
    //     ? convertToStringDate(SumDays(date, 1)) + 'T10:00:00'
    //     : convertToStringDate(changeTime(date)) + 'T14:00:00';
    airport.Date =
      type === 'Arrival'
        ? `${convertToStringDate(changeTime(date))}${time ? time : 'T10:00:00'}`
        : `${convertToStringDate(changeTime(date))}${
            time ? time : 'T08:00:00'
          }`;
  } else if (status === 'Ready' || status === 'Similar') {
    airport.Date =
      type === 'Arrival'
        ? convertToStringDate(SumDays(date, 1)) +
          convertToStringTime(item.Date ? item.Date : date)
        : convertToStringDate(changeTime(date)) +
          convertToStringTime(item.Date ? item.Date : date);
  } else if (status === 'Quotation') {
    airport.Date = item.Date
      ? item.Date
      : convertToStringDate(date) + convertToStringTime(time);
  } else {
    airport.Date =
      type === 'Arrival' ? SumSecond(date, 7200) : SumSecond(date, 7200);
  }
  airport.Ticket = copyObject(TICKET);
  if (item != null)
    if (item.length > 0) {
      airport.Address = item[0].Address;
      airport.Place = item[0].Name;
      airport.PlaceId = item[0].Id;
      airport.Note = item[0].Note;
      airport.Ticket.ServiceItemId = item[0].ServiceItemId;
      airport.Ticket.PNR = item[0].PNR;
      airport.Ticket.FlightNumber = item[0].FlightCode;
      airport.Ticket.AirlineProfileName = item[0].AirlineProfileName;
      airport.Ticket.Duration = 0;
      airport.Ticket.IsTransit = item[0].IsTransit;
      airport.Ticket.IsAllowedActivity = item[0].IsAllowedActivity;
    } else if (item.length === undefined) {
      airport.Address = item.Address;
      airport.Place = item.Place;
      airport.PlaceId = item.PlaceId;
      airport.Note = item.Note;
      airport.Ticket.ServiceItemId = item.ServiceItemId;
      airport.Ticket.PNR = item.PNR;
      airport.Ticket.FlightNumber = item.FlightCode;
      airport.Ticket.AirlineProfileName = item.AirlineProfileName;
      airport.Ticket.Duration = 0;
      airport.Ticket.IsTransit = item.IsTransit;
      airport.Ticket.IsAllowedActivity = item.IsAllowedActivity;
    }
  airport.RequestFrom = requestFrom ? requestFrom : '';
  return airport;
};

export const initialSetReadyPackage = (
  packageData,
  type,
  cityList,
  roomAllocations,
  isVariableDate
) => {
  let headlineProgram = { ...packageData };
  headlineProgram = convertHeadline(headlineProgram);
  headlineProgram.MainPrograms = setSummaryProgramReady(
    headlineProgram.Departures[headlineProgram.Departures.length - 1],
    headlineProgram.MainPrograms,
    cityList,
    roomAllocations
  );
  let firstRegion = headlineProgram.MainPrograms[0].City.Region.Id;
  let lastRegion =
    headlineProgram.MainPrograms[headlineProgram.MainPrograms.length - 1].City
      .Region.Id;
  headlineProgram.Departures = headlineProgram.Departures.map((item, i) => {
    let city = cityList.find(city => city.Id === item.City.Id);
    item = setInitialAirport(
      item,
      city,
      item.Day,
      item.TransferType === 'Movement_arrival' ? 'Arrival' : 'Departure',
      item.Date,
      'Quotation',
      convertToStringTime(item.Date),
      i < headlineProgram.Departures.length - 1 ? city.Region.Id : firstRegion
    );
    return item;
  });
  if (
    headlineProgram.Departures[0].TransferType !== 'Movement_departure' &&
    !isVariableDate
  ) {
    let newAirport = setInitialAirport(
      [],
      null,
      1,
      'Departure',
      headlineProgram.Departures[0].Date,
      'Quotation',
      SubstractSecond(headlineProgram.Departures[0].Date, 7200)
    );
    headlineProgram.Departures.unshift(newAirport);
  }
  headlineProgram.Departures = fixNextDayFlight(
    headlineProgram.Departures,
    'departures',
    null
  );

  headlineProgram.Returns = headlineProgram.Returns.map((item, i) => {
    let city = cityList.find(city => city.Id === item.City.Id);
    item = setInitialAirport(
      item,
      city,
      item.Day,
      item.TransferType === 'Movement_arrival' ? 'Arrival' : 'Departure',
      item.Date,
      'Quotation',
      convertToStringTime(item.Date),
      i > 0 ? city.Region.Id : lastRegion
    );
    return item;
  });
  if (
    headlineProgram.Returns[headlineProgram.Returns.length - 1].TransferType !==
      'Movement_arrival' &&
    !isVariableDate
  ) {
    let newAirport = setInitialAirport(
      [],
      null,
      headlineProgram.Returns[headlineProgram.Returns.length - 1].Day,
      'Arrival',
      headlineProgram.Returns[headlineProgram.Returns.length - 1].Date,
      'Quotation',
      SumSecond(
        headlineProgram.Returns[headlineProgram.Returns.length - 1].Date,
        7200
      )
    );
    headlineProgram.Returns.push(newAirport);
  }
  headlineProgram.Returns = fixNextDayFlight(
    headlineProgram.Returns,
    'returns',
    headlineProgram.MainPrograms[headlineProgram.MainPrograms.length - 1]
      .LeavingDate
  );

  headlineProgram = changeFirstDepartureDate(
    type === 'Quotation'
      ? headlineProgram.Departures[0].Date
      : isVariableDate
      ? headlineProgram.Departures[0].Date
      : SumDays(new Date(), 1),
    headlineProgram,
    getHourAndMinute(headlineProgram.Departures[0].Date)
  );

  return headlineProgram;
};

export const fixNextDayFlight = (depArrival, type, date) => {
  return depArrival.map((dep, i) => {
    if (i === 0) {
      dep.NextDay =
        type === 'departures'
          ? false
          : convertToStringDate(dep.Date) !== convertToStringDate(date)
          ? true
          : false;
    } else if (
      convertToStringDate(dep.Date) !==
      convertToStringDate(depArrival[i - 1].Date)
    ) {
      dep.NextDay = true;
    } else {
      dep.NextDay = false;
    }
    return dep;
  });
};

export const fixFlightPlaceDailyProgram = (
  headline,
  dailyProgram,
  movementList
) => {
  let newHeadline = combineHeadline(headline);
  let newDailyProgram = copyObject(dailyProgram);
  return newDailyProgram.map(daily => {
    let newDailyMovement = daily.Movements.reduce((res, move) => {
      if (move.MovementName === ARRIVAL || move.MovementName === DEPARTURE) {
        let flight = newHeadline.find(
          item => item.TransferType && item.Date === move.DateTime
        );
        let newMove = setAirportMovement(
          flight,
          movementList,
          move.MovementName
        );
        res.push(newMove);
      } else {
        res.push(move);
      }
      return res;
    }, []);
    daily.Movements = newDailyMovement;
    return daily;
  });
};

//================================================================================================
//======================== Start Change Duration =======================================================
//================================================================================================

export const fixingDateTimeChangeDurationSP = (SP, index, diffDurationAdd) => {
  let newHeadline = [];
  let cutPrevSP = SP.slice(
    0,
    index === SP.length - 1
      ? index
      : index === 0 || index - 1 === 0
      ? index
      : index - 1
  );
  let cutNextSP = SP.slice(
    index === SP.length - 1 ? index : index + 1,
    index === 0 || index + 1 === SP.length - 1 ? SP.length : SP.length
  );
  let dataPrevSP = pushDataFixingSP(
    cutPrevSP,
    SP[index],
    diffDurationAdd,
    'prev'
  );
  let dataNextSP = dataPrevSP.prev
    ? null
    : pushDataFixingSP(cutNextSP.reverse(), SP[index], diffDurationAdd, 'next');
  newHeadline = dataPrevSP.prev
    ? dataPrevSP.data.concat(SP[index], cutNextSP)
    : cutPrevSP.concat(SP[index], dataNextSP.data);
  return newHeadline;
};

export const findDataToChangeDuration = (data, diffDurationAdd) => {
  let index = null;
  let haveGFligtGroup = false;
  // eslint-disable-next-line
  data.reverse().map((item, i) => {
    if (
      item.AccommodationSummary &&
      item.TotalDays !== 1 &&
      item.TotalDays - diffDurationAdd >= 1
    ) {
      index = haveGFligtGroup ? index : i;
    } else if (item.Ticket && !item.Ticket.ServiceItemId) {
      index = haveGFligtGroup ? index : i;
    } else {
      haveGFligtGroup = true;
    }
  });
  index = data.length !== 0 ? data.length - 1 - index : index;
  return index;
};

export const subDurationSPReverse = (data, dataSPChangeDuration) => {
  data = data.reverse();
  let indexFind = data.findIndex(
    item => item.AccommodationSummary !== undefined
  );
  if (indexFind === 0) {
    data[0].LeavingDate = dataSPChangeDuration.Date;
    data[0].AccommodationSummary.CheckOut =
      convertToStringDate(data[0].LeavingDate) +
      convertToStringTime(data[0].AccommodationSummary.CheckOut);
    data[0].TotalDays = getNumberOfDays(data[0].Date, data[0].LeavingDate);
  } else {
    // eslint-disable-next-line
    data.map((item, i) => {
      // eslint-disable-next-line
      if (i <= indexFind) {
        if (i === 0 && item.TransferType) {
          item.Date =
            convertToStringDate(dataSPChangeDuration.Date) +
            convertToStringTime(item.Date);
        } else {
          if (item.AccommodationSummary) {
            item.LeavingDate = data[i - 1].Date;
            item.AccommodationSummary.CheckOut =
              convertToStringDate(item.LeavingDate) +
              convertToStringTime(data[i - 1].AccommodationSummary.CheckOut);
            item.TotalDays = getNumberOfDays(item.Date, item.LeavingDate);
          } else {
            item.Date =
              convertToStringDate(data[i - 1].Date) +
              convertToStringTime(item.Date);
          }
        }
      }
    });
  }
  return data.reverse();
};

export const subDurationSP = (data, dataSPChangeDuration) => {
  let indexFind = data.findIndex(
    item => item.AccommodationSummary !== undefined
  );
  if (indexFind === 0) {
    data[0].Date = dataSPChangeDuration.LeavingDate;
    data[0].AccommodationSummary.CheckIn =
      convertToStringDate(data[0].Date) +
      convertToStringTime(data[0].AccommodationSummary.CheckIn);
    data[0].TotalDays = getNumberOfDays(data[0].Date, data[0].LeavingDate);
  } else {
    // eslint-disable-next-line
    data.map((item, i) => {
      // eslint-disable-next-line
      if (i <= indexFind) {
        if (i === 0 && item.TransferType) {
          item.Date =
            convertToStringDate(dataSPChangeDuration.Date) +
            convertToStringTime(item.Date);
        } else {
          if (item.AccommodationSummary) {
            item.Date = data[i - 1].LeavingDate;
            item.AccommodationSummary.CheckIn =
              convertToStringDate(item.Date) +
              convertToStringTime(data[i - 1].AccommodationSummary.CheckIn);
            item.TotalDays = getNumberOfDays(item.Date, item.LeavingDate);
          } else {
            item.Date =
              convertToStringDate(data[i - 1].Date) +
              convertToStringTime(item.Date);
          }
        }
      }
    });
  }
  return data;
};

export const addDurationSPReverse = (data, diffDurationAdd, findIndex) => {
  let dataNew = [];
  // eslint-disable-next-line
  data.reverse().map((item, i) => {
    if (i > findIndex) {
      if (item.AccommodationSummary) {
        item.Date =
          convertToStringDate(
            data[i - 1].LeavingDate ? data[i - 1].LeavingDate : data[i - 1].Date
          ) + 'T00:00:00';
        item.AccommodationSummary.CheckIn =
          convertToStringDate(item.Date) +
          convertToStringTime(item.AccommodationSummary.CheckIn);
        item.AccommodationSummary.CheckOut =
          convertToStringDate(
            SumDays(item.AccommodationSummary.CheckIn, item.TotalDays)
          ) + convertToStringTime(item.AccommodationSummary.CheckOut);
        item.LeavingDate =
          convertToStringDate(item.AccommodationSummary.CheckOut) + 'T00:00:00';
        dataNew.push(item);
      } else {
        item.Date =
          convertToStringDate(
            data[i - 1].LeavingDate ? data[i - 1].LeavingDate : data[i - 1].Date
          ) + convertToStringTime(item.Date);
        dataNew.push(item);
      }
    } else if (i === findIndex) {
      item.AccommodationSummary.CheckIn = data[i - 1]
        ? convertToStringDate(data[i - 1].Date) +
          convertToStringTime(item.AccommodationSummary.CheckIn)
        : convertToStringDate(
            SumDays(item.AccommodationSummary.CheckIn, diffDurationAdd)
          ) + convertToStringTime(item.AccommodationSummary.CheckIn);
      item.Date =
        convertToStringDate(item.AccommodationSummary.CheckIn) + 'T00:00:00';
      item.TotalDays = item.TotalDays - diffDurationAdd;

      dataNew.push(item);
    } else {
      dataNew.push(item);
    }
  });
  return dataNew;
};

export const addDurationSP = (data, diffDurationAdd, findIndex) => {
  let dataNew = [];
  // eslint-disable-next-line
  data.map((item, i) => {
    if (i > findIndex) {
      if (item.AccommodationSummary) {
        item.Date =
          convertToStringDate(
            data[i - 1].LeavingDate ? data[i - 1].LeavingDate : data[i - 1].Date
          ) + 'T00:00:00';
        item.AccommodationSummary.CheckIn =
          convertToStringDate(item.Date) +
          convertToStringTime(item.AccommodationSummary.CheckIn);
        item.AccommodationSummary.CheckOut =
          convertToStringDate(
            SumDays(item.AccommodationSummary.CheckIn, item.TotalDays)
          ) + convertToStringTime(item.AccommodationSummary.CheckOut);
        item.LeavingDate =
          convertToStringDate(item.AccommodationSummary.CheckOut) + 'T00:00:00';
        dataNew.push(item);
      } else {
        if (item.AccommodationSummary) {
          item.AccommodationSummary.CheckOut = data[i - 1]
            ? convertToStringDate(data[i - 1].LeavingDate) +
              convertToStringTime(item.AccommodationSummary.CheckOut)
            : convertToStringDate(
                SubDays(item.AccommodationSummary.CheckOut, diffDurationAdd)
              ) + convertToStringTime(item.AccommodationSummary.CheckOut);
          item.LeavingDate =
            convertToStringDate(item.AccommodationSummary.CheckOut) +
            'T00:00:00';
          item.TotalDays = item.TotalDays - diffDurationAdd;
        } else if (
          item.TransferType &&
          item.TransferType == 'Movement_arrival'
        ) {
          item.Date =
            convertToStringDate(
              SubDays(
                data[i - 2].AccommodationSummary.CheckOut,
                diffDurationAdd
              )
            ) + convertToStringTime(data[i - 2].AccommodationSummary.CheckOut);
          data[i - 1].Date =
            convertToStringDate(
              SubDays(
                data[i - 2].AccommodationSummary.CheckOut,
                diffDurationAdd
              )
            ) + convertToStringTime(data[i - 2].AccommodationSummary.CheckOut);
          data[i - 2].AccommodationSummary.CheckOut =
            convertToStringDate(
              SubDays(
                data[i - 2].AccommodationSummary.CheckOut,
                diffDurationAdd
              )
            ) + convertToStringTime(data[i - 2].AccommodationSummary.CheckOut);
          data[i - 2].TotalDays = getNumberOfDays(
            data[i - 2].Date,
            data[i - 2].LeavingDate
          );
        }
      }
      dataNew.push(item);
    } else {
      dataNew.push(item);
    }
  });
  return dataNew;
};

export const pushDataFixingSP = (
  data,
  dataSPChangeDuration,
  diffDurationAdd,
  type
) => {
  let prev = false;
  let findIndex = findDataToChangeDuration(data, diffDurationAdd, type);
  let dataPush =
    diffDurationAdd < 0
      ? type === 'prev'
        ? subDurationSPReverse(data, dataSPChangeDuration)
        : subDurationSP(data, dataSPChangeDuration)
      : type === 'prev'
      ? addDurationSP(data, diffDurationAdd, findIndex)
      : addDurationSPReverse(data, diffDurationAdd, findIndex);
  prev = findIndex !== undefined && findIndex !== null ? true : false;
  return {
    data: dataPush,
    prev: prev,
  };
};

//================================================================================================
//======================== End Change Duration =======================================================
//================================================================================================
export const changeDurationMainPrograms = (headline, index, duration) => {
  let SP = copyObject(headline.MainPrograms);
  let indexTicketNext = findIndexTicketNext(SP, index);
  let diffDurationAdd = duration - SP[index].TotalDays;

  let data = {
    MainPrograms: null,
    errorMessage: null,
  };
  if (indexTicketNext || headline.Returns[0].Ticket.ServiceItemId) {
    let arrayIndex = findIndexBetweenTicket(headline, index);
    data = changeDurationByArrayIndex(
      arrayIndex,
      headline.MainPrograms,
      index,
      diffDurationAdd
    );
    data = fixingDateDuration(arrayIndex, data, index, diffDurationAdd);
    return data;
  } else {
    SP[index].TotalDays = Number(duration);
    SP[index].LeavingDate = SumDays(
      SP[index].Date,
      SP[index].TotalDays,
      -Math.abs(diffDurationAdd)
    );
    SP[index].AccommodationSummary.DateTime = SP[index].Date;
    SP[index].AccommodationSummary.CheckIn =
      convertToStringDate(SP[index].Date) +
      convertToStringTime(SP[index].AccommodationSummary.CheckIn);
    SP[index].AccommodationSummary.CheckOut =
      convertToStringDate(SP[index].LeavingDate) +
      convertToStringTime(SP[index].AccommodationSummary.CheckOut);
    let date = SP[index].LeavingDate;
    index++;
    data.MainPrograms = SP[index]
      ? setDateSummaryProgramSequence(SP, null, index, date)
      : SP;
  }
  return data;
};

export const findIndexBetweenTicket = (headline, index) => {
  let indexTicketNext = findIndexTicketNext(headline.MainPrograms, index);
  let indexTicketPrev = findIndexTicketPrev(headline.MainPrograms, index);

  let num1 = null;
  let num2 = null;
  const arrayIndex = [];

  if (indexTicketNext && indexTicketPrev) {
    num1 = indexTicketPrev + 1;
    num2 = indexTicketNext - 1;
  } else if (!indexTicketPrev && indexTicketNext) {
    num1 = 0;
    num2 = indexTicketNext - 1;
  } else if (indexTicketPrev && !indexTicketNext) {
    num1 = indexTicketPrev + 1;
    num2 = headline.MainPrograms.length - 1;
  } else if (!indexTicketPrev && !indexTicketNext) {
    num1 = 0;
    num2 = headline.MainPrograms.length - 1;
  }

  for (let i = num1; i <= num2; i++) {
    arrayIndex.push(i);
  }
  return arrayIndex;
};

export const changeDurationByArrayIndex = (
  arrayIndex,
  mainProgram,
  index,
  diffDuration
) => {
  let data = {
    MainPrograms: mainProgram,
    errorMessage: null,
  };

  for (let i = 0; i <= mainProgram.length; i++) {
    if (arrayIndex.includes(i) && i != index) {
      if (mainProgram[i].TotalDays >= 1) {
        if (diffDuration > 0) {
          if (i == 0) {
            console.log('KONDISI 5');

            mainProgram[i].LeavingDate = SumDays(
              mainProgram[i].LeavingDate,
              -Math.abs(diffDuration)
            );
            mainProgram[i].AccommodationSummary.CheckOut =
              convertToStringDate(
                SumDays(
                  mainProgram[i].AccommodationSummary.CheckOut,
                  -Math.abs(diffDuration)
                )
              ) +
              convertToStringTime(mainProgram[i].AccommodationSummary.CheckOut);
            mainProgram[i].TotalDays = getNumberOfDays(
              mainProgram[i].Date,
              mainProgram[i].LeavingDate
            );
            mainProgram[index].TotalDays =
              mainProgram[index].TotalDays + diffDuration;
            break;
          } else if (mainProgram[i].TotalDays - diffDuration > 0) {
            if (i > index) {
              console.log('KONDISI 4');

              mainProgram[i].Date = SumDays(
                mainProgram[i].Date,
                Math.abs(diffDuration)
              );
              mainProgram[i].AccommodationSummary.CheckIn = SumDays(
                mainProgram[i].AccommodationSummary.CheckIn,
                Math.abs(diffDuration)
              );

              if (i != arrayIndex[arrayIndex.length - 1]) {
                mainProgram[i].LeavingDate = SumDays(
                  mainProgram[index].LeavingDate,
                  Math.abs(diffDuration)
                );

                mainProgram[i].AccommodationSummary.CheckOut =
                  convertToStringDate(
                    SumDays(
                      mainProgram[index].LeavingDate,
                      Math.abs(diffDuration)
                    )
                  ) +
                  convertToStringTime(
                    mainProgram[i].AccommodationSummary.CheckOut
                  );
              }

              mainProgram[i].TotalDays = getNumberOfDays(
                mainProgram[i].Date,
                mainProgram[i].LeavingDate
              );

              mainProgram[index].AccommodationSummary.CheckOut =
                convertToStringDate(
                  SumDays(
                    mainProgram[index].AccommodationSummary.CheckOut,
                    Math.abs(diffDuration)
                  )
                ) +
                convertToStringTime(
                  mainProgram[index].AccommodationSummary.CheckOut
                );
              mainProgram[index].LeavingDate = SumDays(
                mainProgram[index].LeavingDate,
                Math.abs(diffDuration)
              );

              mainProgram[index].TotalDays =
                mainProgram[index].TotalDays + Math.abs(diffDuration);
              break;
            } else {
              console.log('KONDISI 3');
              mainProgram[i].TotalDays =
                mainProgram[i].TotalDays - Math.abs(diffDuration);
              mainProgram[i].AccommodationSummary.CheckOut =
                convertToStringDate(
                  SumDays(
                    mainProgram[i].AccommodationSummary.CheckOut,
                    -Math.abs(diffDuration)
                  )
                ) +
                convertToStringTime(
                  mainProgram[i].AccommodationSummary.CheckOut
                );
              mainProgram[i].LeavingDate = SumDays(
                mainProgram[i].LeavingDate,
                -Math.abs(diffDuration)
              );
              mainProgram[index].AccommodationSummary.CheckIn =
                convertToStringDate(
                  SumDays(
                    mainProgram[index].AccommodationSummary.CheckIn,
                    -Math.abs(diffDuration)
                  )
                ) +
                convertToStringTime(
                  mainProgram[index].AccommodationSummary.CheckIn
                );
              mainProgram[index].Date = SumDays(
                mainProgram[index].Date,
                -Math.abs(diffDuration)
              );
              mainProgram[index].TotalDays = getNumberOfDays(
                mainProgram[index].Date,
                mainProgram[index].LeavingDate
              );
              break;
            }
          }
        } else {
          if (index != 0) {
            if (
              mainProgram[index - 1].Ticket &&
              mainProgram[index - 1].Ticket.ServiceItemId
            ) {
              console.log('KONDISI 11');
              mainProgram[index].LeavingDate = SumDays(
                mainProgram[index].LeavingDate,
                -Math.abs(diffDuration)
              );
              mainProgram[index].AccommodationSummary.CheckOut = SumDays(
                mainProgram[index].AccommodationSummary.CheckOut,
                -Math.abs(diffDuration)
              );
              mainProgram[index].TotalDays = getNumberOfDays(
                mainProgram[index].Date,
                mainProgram[index].LeavingDate
              );

              mainProgram[i].Date = SumDays(
                mainProgram[i].Date,
                Math.abs(diffDuration)
              );
              mainProgram[i].AccommodationSummary.CheckIn = SumDays(
                mainProgram[i].AccommodationSummary.CheckIn,
                Math.abs(diffDuration)
              );
              mainProgram[i].TotalDays = getNumberOfDays(
                mainProgram[i].Date,
                mainProgram[i].LeavingDate
              );
              break;
            } else {
              console.log('KONDISI 1');
              mainProgram[i].LeavingDate = SumDays(
                mainProgram[i].LeavingDate,
                Math.abs(diffDuration)
              );
              mainProgram[i].AccommodationSummary.CheckOut =
                convertToStringDate(
                  SumDays(
                    mainProgram[i].AccommodationSummary.CheckOut,
                    Math.abs(diffDuration)
                  )
                ) +
                convertToStringTime(
                  mainProgram[i].AccommodationSummary.CheckOut
                );
              mainProgram[i].TotalDays = getNumberOfDays(
                mainProgram[i].Date,
                mainProgram[i].LeavingDate
              );
              mainProgram[index].Date = SumDays(
                mainProgram[index].Date,
                Math.abs(diffDuration)
              );
              mainProgram[index].AccommodationSummary.CheckIn =
                convertToStringDate(
                  SumDays(
                    mainProgram[index].AccommodationSummary.CheckIn,
                    Math.abs(diffDuration)
                  )
                ) +
                convertToStringTime(
                  mainProgram[index].AccommodationSummary.CheckIn
                );
              mainProgram[index].TotalDays = getNumberOfDays(
                mainProgram[index].Date,
                mainProgram[index].LeavingDate
              );
              break;
            }
          } else {
            console.log('KONDISI 112');
            mainProgram[index].LeavingDate = SumDays(
              mainProgram[index].LeavingDate,
              -Math.abs(diffDuration)
            );
            mainProgram[index].AccommodationSummary.CheckOut = SumDays(
              mainProgram[index].AccommodationSummary.CheckOut,
              -Math.abs(diffDuration)
            );
            mainProgram[index].TotalDays = getNumberOfDays(
              mainProgram[index].Date,
              mainProgram[index].LeavingDate
            );

            mainProgram[i].Date = SumDays(
              mainProgram[i].Date,
              Math.abs(diffDuration)
            );
            mainProgram[i].AccommodationSummary.CheckIn = SumDays(
              mainProgram[i].AccommodationSummary.CheckIn,
              Math.abs(diffDuration)
            );
            mainProgram[i].TotalDays = getNumberOfDays(
              mainProgram[i].Date,
              mainProgram[i].LeavingDate
            );
            break;
          }
        }
      }
    }
  }

  data.MainPrograms = mainProgram;
  return data;
};

export const fixingDateDuration = (arrayIndex, data, index, diffDuration) => {
  let mainProgram = copyObject(data.MainPrograms);

  let totalAccommodation = mainProgram.filter(
    (item, index) => arrayIndex.includes(index) && item.AccommodationSummary
  );
  let totalDaysAvailable = getNumberOfDays(
    mainProgram[arrayIndex[0]].Date,
    mainProgram[arrayIndex[arrayIndex.length - 1]].LeavingDate
  );
  let totalDaysBetweenTicket = mainProgram.reduce((acc, item, index) => {
    if (arrayIndex.includes(index)) {
      if (item.AccommodationSummary) {
        acc = acc + item.TotalDays;
      }
    }
    return acc;
  }, null);
  if (
    totalDaysBetweenTicket ==
    totalAccommodation.length + totalDaysAvailable - 1
  ) {
    mainProgram.map((item, i) => {
      if (arrayIndex.includes(i) && i != index) {
        if (item.TransferType && item.TransferType == 'Movement_departure') {
          item.Date = mainProgram[i - 1].LeavingDate;
        } else if (
          item.TransferType &&
          mainProgram[i].TransferType == 'Movement_arrival'
        ) {
          item.Date = mainProgram[i - 1].Date;
        } else {
          if (
            mainProgram[i - 1] &&
            (mainProgram[i - 1].LeavingDate
              ? mainProgram[i - 1].LeavingDate
              : mainProgram[i - 1].Date) != item.Date
          ) {
            console.log('KONDISI ss');

            item.AccommodationSummary.CheckIn =
              mainProgram[i - 1].AccommodationSummary &&
              mainProgram[i - 1].AccommodationSummary.CheckOut
                ? convertToStringDate(
                    mainProgram[i - 1].AccommodationSummary.CheckOut
                  ) + convertToStringTime(item.AccommodationSummary.CheckIn)
                : mainProgram[i - 1].Date +
                  convertToStringTime(item.AccommodationSummary.CheckIn);
            item.Date = mainProgram[i - 1].LeavingDate
              ? mainProgram[i - 1].LeavingDate
              : mainProgram[i - 1].Date;
            item.TotalDays = getNumberOfDays(item.Date, item.LeavingDate);
          } else {
            if (diffDuration > 0) {
              console.log('KONDISI INDEX NYA 0 DAN DIFF NYA 1');
              item.TotalDays = getNumberOfDays(item.Date, item.LeavingDate);
              if (index > i) {
                mainProgram[index].Date = item.LeavingDate;
                mainProgram[index].AccommodationSummary.CheckIn =
                  convertToStringDate(item.LeavingDate) +
                  convertToStringTime(item.AccommodationSummary.CheckIn);
              }
            } else {
              console.log('KONDISI INDEX NYA 0 DAN DIFF NYA -1');
              item.TotalDays = getNumberOfDays(item.Date, item.LeavingDate);
            }
          }
        }
      }
    });
    data.MainPrograms = mainProgram;
  } else {
    data.errorMessage = 'cant change';
  }

  return data;
};

//digunakan untuk mengecek region dari city pertama dan city kedua sama atau tidak
//untuk penngcopyan data dari get ActivityOldDailyProgram
export const findRegionByCity = (dataCityInCountry, dataCity1, dataCity2) => {
  let findDataCity1 = dataCityInCountry.find(item => item.Id === dataCity1);
  let findDataCity2 = dataCityInCountry.find(item => item.Id === dataCity2);
  let findData =
    findDataCity1 && findDataCity2
      ? findDataCity1.Region.Id === findDataCity2.Region.Id
        ? true
        : false
      : false;
  return findData;
};
