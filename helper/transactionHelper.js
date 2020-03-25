import { copyObject } from './dailyProgram';
import { SumSecond, convertToStringDate } from './timeHelper';
import { getCities } from './tourGuides';
import { combineHeadline } from './itineraryBuilder';

export const Transaction = {
  title: null,
  AdultPaxQty: 0,
  ChildPaxQty: 0,
  InfantPaxQty: 0,
  StartDate: null,
  EndDate: null,
  RoomAllocation: {
    SharingRoomQty: 0,
    SingleRoomQty: 0,
    ExtraBedQty: 0,
    ChildExtraBedQty: 0,
    SharingBedQty: 0,
    NoBedQty: 0,
    BabyCrib: 0,
    ChildSharingRoomQty: 0,
    ChildSingleRoomQty: 0,
  },

  CityDestinationId: null,
  RegionDestinationId: null,
  TourCategoryId: null,
  GroupType: null,
  TourPaxTypeId: null,
  Attractions: [],
  Transportations: [],
  Accommodations: [],
  Restaurants: [],
};
//Customize
export const getAccomodation = (SummaryProgram, Allocations) => {
  SummaryProgram = copyObject(SummaryProgram);
  let accomodationItem = [];
  let SP = SummaryProgram.filter(
    item => item.AccommodationSummary != undefined
  );
  for (let i = 0; i < SP.length; i++) {
    let SID = SP[i].AccommodationSummary.ServiceItemId;
    if (SID) {
      let item = {
        ServiceItemId: SID,
        DateTime: SP[i].AccommodationSummary.CheckIn,
        EndTime: SP[i].AccommodationSummary.CheckOut,
        SharingRoomQty: Allocations.SharingRoomQty,
        SingleRoomQty: Allocations.SingleRoomQty,
        ExtraBedQty: Allocations.ExtraBedQty,
        ChildExtraBedQty: Allocations.ChildExtraBedQty,
        SharingBedQty: Allocations.SharingBedQty,
        ChildSharingRoomQty: Allocations.ChildSharingRoomQty,
        ChildSingleRoomQty: Allocations.ChildSingleRoomQty,
        BabyCrib: Allocations.BabyCrib,
        NoBed: Allocations.NoBed,
        AccommodationItemServiceType: SP[i].AccommodationSummary.RoomService,
      };
      accomodationItem.push(item);
    }
  }
  return accomodationItem;
};

export const getStartEndDate = (DailyProgram, Arrival, Departure) => {
  let date = {
    startDate: '',
    endDate: '',
  };
  let lastIndexDP =
    DailyProgram.length != 0
      ? DailyProgram[DailyProgram.length - 1].Movements.length - 1
      : null;
  date.startDate =
    DailyProgram.length != 0
      ? DailyProgram[0].Movements[0].DateTime
      : Arrival[0].Date;
  date.endDate = lastIndexDP
    ? DailyProgram[DailyProgram.length - 1].Movements[lastIndexDP].DateTime
    : Departure[Departure.length - 1].Date;
  return date;
};

export const getExcursionAndResto = DailyProgram => {
  DailyProgram = copyObject(DailyProgram);
  let attractionItem = [];
  let restaurantItem = [];
  for (let i = 0; i < DailyProgram.length; i++) {
    for (let j = 0; j < DailyProgram[i].Movements.length; j++) {
      let nM = DailyProgram[i].Movements[j];
      if (nM.MovementName == 'RECREATION') {
        let item = {
          ServiceItemId: nM.Item.ServiceItemId,
          DateTime: nM.DateTime,
          Duration: nM.Duration,
          CityId: nM.Destination,
        };
        attractionItem.push(item);
      }
      if (nM.MovementName == 'EAT') {
        let item = {
          ServiceItemId: nM.Item.ServiceItemId,
          DateTime: nM.DateTime,
          Duration: nM.Duration,
          CityId: nM.Destination,
        };
        restaurantItem.push(item);
      }
    }
  }
  return {
    Resto: restaurantItem,
    Excursion: attractionItem,
  };
};
export const getTransport = DailyProgram => {
  DailyProgram = copyObject(DailyProgram);
  let transportItem = [];
  for (let i = 0; i < DailyProgram.length; i++) {
    let item = {
      ServiceItemId: null,
      TransportationItemServiceType: null,
      DateTime: null,
      CityId: null,
      Hours: null,
      StartTime: null,
      EndTime: null,
    };
    for (let j = 0; j < DailyProgram[i].Movements.length; j++) {
      let nM = DailyProgram[i].Movements[j];
      if (nM.MovementName == 'DRIVING') {
        if (nM.Item.ServiceItemId != null) {
          if (item.ServiceItemId != null) {
            if (item.ServiceItemId != nM.Item.ServiceItemId)
              transportItem.push(item);
          }
          item.ServiceItemId = nM.Item.ServiceItemId;
          item.TransportationItemServiceType = nM.Item.ServiceType;
          if (item.DateTime == null) item.DateTime = nM.DateTime;
          item.CityId = nM.Destination;
          item.Hours = nM.Item.Hours;
          if (item.StartTime == null) item.StartTime = nM.DateTime;
          item.EndTime = SumSecond(nM.DateTime, nM.Duration);
        }
      }
      if (nM.MovementName == 'DEPARTURE' && item.ServiceItemId != null) {
        transportItem.push(item);
        item = {
          ServiceItemId: null,
          TransportationItemServiceType: null,
          DateTime: null,
          CityId: null,
          Hours: null,
          StartTime: null,
          EndTime: null,
        };
      } else if (
        j == DailyProgram[i].Movements.length - 1 &&
        item.ServiceItemId != null
      ) {
        transportItem.push(item);
      }
    }
  }
  return transportItem;
};
export const getDailyMovement = DailyProgram => {
  let moveItem = [];
  //this.ds.sequentialNumberinMovement()
  for (let i = 0; i < DailyProgram.length; i++) {
    for (let j = 0; j < DailyProgram[i].Movements.length; j++) {
      let des =
        DailyProgram[i].Movements[j].Item.CityId != null
          ? DailyProgram[i].Movements[j].Item.CityId
          : DailyProgram[i].Movements[j].Destination;
      let item = {
        DateTime: DailyProgram[i].Movements[j].DateTime,
        ServiceItemId: DailyProgram[i].Movements[j].ServiceItemId,
        CityId: des,
        Duration: DailyProgram[i].Movements[j].Duration,
        SeqNumber: DailyProgram[i].Movements[j].SeqNumber,
        ServiceItemRefId: DailyProgram[i].Movements[j].Item.ServiceItemId
          ? DailyProgram[i].Movements[j].Item.ServiceItemId
          : null,
        PlaceId: DailyProgram[i].Movements[j].Item.PlaceId,
        Note: DailyProgram[i].Movements[j].Note,
        PartOfAnotherDate:
          convertToStringDate(DailyProgram[i].Date) !=
          convertToStringDate(DailyProgram[i].Movements[j].DateTime)
            ? DailyProgram[i].Date
            : null,
      };
      moveItem.push(item);
    }
  }
  return moveItem;
};

export const getFlightTickets = (DailyProgram, Qty) => {
  let result = [];
  DailyProgram.map(item => {
    result = getFlightTicketsFromMovement(item.Movements, Qty, result);
  });
  return result;
};

export const getFlightTicketsFromMovement = (Movements, Qty, Result) => {
  let res = Result;
  Movements.map(current => {
    if (res.length === 0) {
      if (
        (current.MovementName === 'ARRIVAL' && current.Item.ServiceItemId) ||
        (current.MovementName === 'DEPARTURE' && current.Item.ServiceItemId)
      ) {
        res.push({
          DateTime: current.DateTime,
          ServiceItemId: current.Item.ServiceItemId,
          Qty: Qty,
        });
      }
    } else {
      if (
        (current.MovementName === 'ARRIVAL' && current.Item.ServiceItemId) ||
        (current.MovementName === 'DEPARTURE' && current.Item.ServiceItemId)
      ) {
        if (
          !res.find(item => item.ServiceItemId === current.Item.ServiceItemId)
        ) {
          res.push({
            DateTime: current.DateTime,
            ServiceItemId: current.Item.ServiceItemId,
            Qty: Qty,
          });
        }
      }
    }
  });
  return res;
};

export const memberGuest = Guest => {
  let guestMember = [];
  for (let i = 0; i < Guest.length; i++) {
    let obj = Guest[i];
    if (
      obj.FirstName != null &&
      obj.LastName != null &&
      obj.CountryId != null
    ) {
      let item = {
        FirstName: obj.FirstName,
        LastName: obj.LastName,
        CountryId: obj.CountryId,
        IdentityNbr: obj.IdentityNbr,
        IdentityType: obj.IdentityType,
        GuestType: obj.GuestType,
        GuestCategory: obj.GuestCategory,
        GuestTitle: obj.GuestTitle,
      };
      guestMember.push(item);
    }
  }
  return guestMember;
};

export const getDescriptions = data => {
  let dataDesc = [];
  data.length != 0
    ? data.map(data => {
        return dataDesc.push({
          Content: data.Content,
          Subtitle: data.SubTitle,
        });
      })
    : null;
  return dataDesc;
};

export const getTourGuides = dailyProgram => {
  let tourGuides = dailyProgram.reduce((result, current) => {
    if (current.TourGuides) {
      let cities = getCities(current);
      current.TourGuides = current.TourGuides.map(itm => {
        let city = cities.find(item => item.CityId === itm.CityId);
        if (city) {
          itm.DateTime = city.DateTime;
          itm.EndTime = city.EndTime;
        }
        return itm;
      });
      result = result.concat(current.TourGuides);
    }
    return result;
  }, []);
  return tourGuides;
};

export const getAdditionalServices = AdditionalServices => {
  let AdditionalServicesData = [];
  AdditionalServices.length != 0
    ? AdditionalServices.map(data => {
        return AdditionalServicesData.push({
          AdditionalServiceCountryId:
            data.OriginalCountries[0].OriginalCountryId,
          IsMandatory: data.IsMandatory,
          IsInfantCount: data.IsInfantCount,
          Quantity: data.Quantity,
        });
      })
    : null;
  return AdditionalServicesData;
};

export const transactionItem = (
  DetailCustom,
  SummaryProgram,
  DailyProgram,
  Arrival,
  Departure
) => {
  let itemRestoAndExcur = getExcursionAndResto(DailyProgram);
  let date = getStartEndDate(DailyProgram, Arrival, Departure);
  var item = null;
  DetailCustom.RoomAllocation.Qty == 0
    ? (item = {
        Transportations: getTransport(DailyProgram),
        Accommodations: getAccomodation(
          SummaryProgram,
          DetailCustom.RoomAllocation
        ),
        Attractions: itemRestoAndExcur.Excursion,
        Restaurants: itemRestoAndExcur.Resto,
        TourGuides: getTourGuides(DailyProgram),
        RoomAllocation: {
          SharingRoomQty: DetailCustom.RoomAllocation.SharingRoomQty,
          SingleRoomQty: DetailCustom.RoomAllocation.SingleRoomQty,
          ExtraBedQty: DetailCustom.RoomAllocation.ExtraBedQty,
          ChildExtraBedQty: DetailCustom.RoomAllocation.ChildExtraBedQty,
          SharingBedQty: DetailCustom.RoomAllocation.SharingBedQty,
          ChildSharingRoomQty: DetailCustom.RoomAllocation.ChildSharingRoomQty,
          ChildSingleRoomQty: DetailCustom.RoomAllocation.ChildSingleRoomQty,
          BabyCrib: DetailCustom.RoomAllocation.BabyCrib,
          NoBed: DetailCustom.RoomAllocation.NoBed,
        },
        FoC: null,
        CompanyCode: null,
        Title: DetailCustom.TourName,
        RegionDestinationId: Arrival[0].Region,
        CityDestinationId: Arrival[0].City.Id,
        AdultPaxQty: DetailCustom.GuestAllocation.Adult,
        ChildPaxQty: DetailCustom.GuestAllocation.Child,
        InfantPaxQty: DetailCustom.GuestAllocation.Infant,
        StartDate: date.startDate,
        EndDate: date.endDate,
        TourCategoryId: DetailCustom.TourCategory,
        GroupType: DetailCustom.GroupCapacity,
        TourPaxTypeId: DetailCustom.TourType,
        TourName: DetailCustom.TourName,
        FlightTickets:
          DetailCustom.GroupCapacity == 'SMALL'
            ? []
            : getFlightTicketsFromHeadline(
                SummaryProgram,
                DetailCustom.GuestAllocation.Adult +
                  DetailCustom.GuestAllocation.Child
              ),
        // : getFlightTickets(
        //     DailyProgram,
        //     DetailCustom.GuestAllocation.Adult +
        //       DetailCustom.GuestAllocation.Child
        //   ),
      })
    : (item = {
        Transportations: getTransport(DailyProgram),
        Accommodations: getAccomodation(
          SummaryProgram,
          DetailCustom.RoomAllocation
        ),
        Attractions: itemRestoAndExcur.Excursion,
        Restaurants: itemRestoAndExcur.Resto,
        TourGuides: getTourGuides(DailyProgram),
        RoomAllocation: {
          SharingRoomQty: DetailCustom.RoomAllocation.SharingRoomQty,
          SingleRoomQty: DetailCustom.RoomAllocation.SingleRoomQty,
          ExtraBedQty: DetailCustom.RoomAllocation.ExtraBedQty,
          ChildExtraBedQty: DetailCustom.RoomAllocation.ChildExtraBedQty,
          SharingBedQty: DetailCustom.RoomAllocation.SharingBedQty,
          ChildSharingRoomQty: DetailCustom.RoomAllocation.ChildSharingRoomQty,
          ChildSingleRoomQty: DetailCustom.RoomAllocation.ChildSingleRoomQty,
          BabyCrib: DetailCustom.RoomAllocation.BabyCrib,
          NoBed: DetailCustom.RoomAllocation.NoBed,
        },
        FoC: {
          Qty: DetailCustom.RoomAllocation.Qty,
          Description: DetailCustom.RoomAllocation.Description,
        },
        CompanyCode: null,
        Title: DetailCustom.TourName,
        RegionDestinationId: Arrival[0].City.Region.Id,
        CityDestinationId: Arrival[0].City.Id,
        AdultPaxQty: DetailCustom.GuestAllocation.Adult,
        ChildPaxQty: DetailCustom.GuestAllocation.Child,
        InfantPaxQty: DetailCustom.GuestAllocation.Infant,
        StartDate: date.startDate,
        EndDate: date.endDate,
        FlightTickets:
          DetailCustom.GroupCapacity == 'SMALL'
            ? []
            : getFlightTicketsFromHeadline(
                SummaryProgram,
                DetailCustom.GuestAllocation.Adult +
                  DetailCustom.GuestAllocation.Child
              ),
        // : getFlightTickets(
        //     DailyProgram,
        //     DetailCustom.GuestAllocation.Adult +
        //       DetailCustom.GuestAllocation.Child
        //   ),
        TourCategoryId: DetailCustom.TourCategory,
        GroupType: DetailCustom.GroupCapacity,
        TourPaxTypeId: DetailCustom.TourType,
        TourName: DetailCustom.TourName,
      });
  return item;
};

export const transactionItemDemo = (
  DetailCustom,
  SummaryProgram,
  DailyProgram,
  Arrival,
  Departure,
  Guest,
  Operator,
  AdditionalServices
) => {
  let itemRestoAndExcur = getExcursionAndResto(DailyProgram);
  let date = getStartEndDate(DailyProgram, Arrival, Departure);
  var item = null;
  DetailCustom.RoomAllocation.Qty == 0
    ? (item = {
        TourOperatorId: Operator.TourProfileId,
        Attractions: itemRestoAndExcur.Excursion,
        Movements: getDailyMovement(DailyProgram),
        Transportations: getTransport(DailyProgram),
        Accommodations: getAccomodation(
          SummaryProgram,
          DetailCustom.RoomAllocation
        ),
        Restaurants: itemRestoAndExcur.Resto,
        TourGuides: getTourGuides(DailyProgram),
        Guests: memberGuest(Guest),
        FlightTickets:
          DetailCustom.GroupCapacity == 'SMALL'
            ? []
            : getFlightTicketsFromHeadline(
                SummaryProgram,
                DetailCustom.GuestAllocation.Adult +
                  DetailCustom.GuestAllocation.Child
              ),
        // : getFlightTickets(
        //     DailyProgram,
        //     DetailCustom.GuestAllocation.Adult +
        //       DetailCustom.GuestAllocation.Child
        //   ),
        RoomAllocation: {
          SharingRoomQty: DetailCustom.RoomAllocation.SharingRoomQty,
          SingleRoomQty: DetailCustom.RoomAllocation.SingleRoomQty,
          ExtraBedQty: DetailCustom.RoomAllocation.ExtraBedQty,
          ChildExtraBedQty: DetailCustom.RoomAllocation.ChildExtraBedQty,
          SharingBedQty: DetailCustom.RoomAllocation.SharingBedQty,
          ChildSharingRoomQty: DetailCustom.RoomAllocation.ChildSharingRoomQty,
          ChildSingleRoomQty: DetailCustom.RoomAllocation.ChildSingleRoomQty,
          BabyCrib: DetailCustom.RoomAllocation.BabyCrib,
          NoBed: DetailCustom.RoomAllocation.NoBed,
        },
        FoC: null,
        AdditionalServices: getAdditionalServices(AdditionalServices),
        BookingTemplateDescriptions: DetailCustom.BookingTemplateDescriptions
          ? getDescriptions(DetailCustom.BookingTemplateDescriptions)
          : [],
        CompanyCode: null,
        UserProfileId: null,
        IsQuotation: false,
        Title: DetailCustom.TourName,
        AdultPaxQty: DetailCustom.GuestAllocation.Adult,
        ChildPaxQty: DetailCustom.GuestAllocation.Child,
        InfantPaxQty: DetailCustom.GuestAllocation.Infant,
        StartDate: date.startDate,
        EndDate: date.endDate,
        TourName: DetailCustom.TourName,
        CityDestinationId: Arrival[0].City.Id,
        RegionDestinationId: Arrival[0].Region,
        TourCategoryId: DetailCustom.TourCategory,
        GroupType: DetailCustom.GroupCapacity,
        TourPaxTypeId: DetailCustom.TourType,
        IsReadyPackage: DetailCustom.IsReadyPackage
          ? DetailCustom.IsReadyPackage
          : false,
        ReadyPackageId: DetailCustom.ReadyPackageId
          ? DetailCustom.ReadyPackageId
          : 0,
      })
    : (item = {
        TourOperatorId: Operator.TourProfileId,
        Attractions: itemRestoAndExcur.Excursion,
        Movements: getDailyMovement(DailyProgram),
        Transportations: getTransport(DailyProgram),
        Accommodations: getAccomodation(
          SummaryProgram,
          DetailCustom.RoomAllocation
        ),
        FlightTickets:
          DetailCustom.GroupCapacity == 'SMALL'
            ? []
            : getFlightTicketsFromHeadline(
                SummaryProgram,
                DetailCustom.GuestAllocation.Adult +
                  DetailCustom.GuestAllocation.Child
              ),
        // : getFlightTickets(
        //     DailyProgram,
        //     DetailCustom.GuestAllocation.Adult +
        //       DetailCustom.GuestAllocation.Child
        //   ),
        Restaurants: itemRestoAndExcur.Resto,
        TourGuides: getTourGuides(DailyProgram),
        AdditionalServices: getAdditionalServices(AdditionalServices),
        Guests: memberGuest(Guest),
        RoomAllocation: {
          SharingRoomQty: DetailCustom.RoomAllocation.SharingRoomQty,
          SingleRoomQty: DetailCustom.RoomAllocation.SingleRoomQty,
          ExtraBedQty: DetailCustom.RoomAllocation.ExtraBedQty,
          ChildExtraBedQty: DetailCustom.RoomAllocation.ChildExtraBedQty,
          SharingBedQty: DetailCustom.RoomAllocation.SharingBedQty,
          ChildSharingRoomQty: DetailCustom.RoomAllocation.ChildSharingRoomQty,
          ChildSingleRoomQty: DetailCustom.RoomAllocation.ChildSingleRoomQty,
          BabyCrib: DetailCustom.RoomAllocation.BabyCrib,
          NoBed: DetailCustom.RoomAllocation.NoBed,
        },
        FoC: {
          Qty: DetailCustom.RoomAllocation.Qty,
          Description: DetailCustom.RoomAllocation.Description,
        },
        CompanyCode: null,
        UserProfileId: null,
        IsQuotation: false,
        BookingTemplateDescriptions: DetailCustom.BookingTemplateDescriptions
          ? getDescriptions(DetailCustom.BookingTemplateDescriptions)
          : [],
        Title: DetailCustom.TourName,
        AdultPaxQty: DetailCustom.GuestAllocation.Adult,
        ChildPaxQty: DetailCustom.GuestAllocation.Child,
        InfantPaxQty: DetailCustom.GuestAllocation.Infant,
        StartDate: date.startDate,
        EndDate: date.endDate,
        TourName: DetailCustom.TourName,
        CityDestinationId: Arrival[0].City.Id,
        RegionDestinationId: Arrival[0].Region,
        TourCategoryId: DetailCustom.TourCategory,
        GroupType: DetailCustom.GroupCapacity,
        TourPaxTypeId: DetailCustom.TourType,
        IsReadyPackage: DetailCustom.IsReadyPackage
          ? DetailCustom.IsReadyPackage
          : false,
        ReadyPackageId: DetailCustom.ReadyPackageId
          ? DetailCustom.ReadyPackageId
          : 0,
      });
  return item;
};

export const transactionItemDemoFixPrice = (
  DetailCustom,
  DailyProgram,
  Guest,
  Operator,
  AdditionalServices,
  CompanyCode,
  UserProfileId
) => {
  var item = null;
  item = {
    StartTour: DailyProgram[0].Date,
    Title: DetailCustom.TourName,
    EndTour: DailyProgram[DailyProgram.length - 1].Date,
    TourOperatorProfileId: Operator.TourProfileId,
    AdultPax: DetailCustom.GuestAllocation.Adult,
    ChildPax: DetailCustom.GuestAllocation.Child,
    InfantPax: DetailCustom.GuestAllocation.Infant,
    RoomAllocation: {
      SharingRoomQty: DetailCustom.RoomAllocation.SharingRoomQty,
      SingleRoomQty: DetailCustom.RoomAllocation.SingleRoomQty,
      ExtraBedQty: DetailCustom.RoomAllocation.ExtraBedQty,
      ChildExtraBedQty: DetailCustom.RoomAllocation.ChildExtraBedQty,
      SharingBedQty: DetailCustom.RoomAllocation.SharingBedQty,
      ChildSharingRoomQty: DetailCustom.RoomAllocation.ChildSharingRoomQty,
      ChildSingleRoomQty: DetailCustom.RoomAllocation.ChildSingleRoomQty,
      BabyCrib: DetailCustom.RoomAllocation.BabyCrib,
      NoBed: DetailCustom.RoomAllocation.NoBed,
    },
    TourNote: DetailCustom.TourNote,
    AdditionalServices: getAdditionalServices(AdditionalServices),
    Guests: memberGuest(Guest),
    IsQuotation: false,
    IsSplitStaffCommission: false,
    CompanyCode: CompanyCode ? CompanyCode : null,
    UserProfileId: UserProfileId ? UserProfileId : null,
  };
  return item;
};

export const transactionItemFixOnBehalf = Data => {
  var item = null;
  Data.IsSplitStaffCommission == false && Data.IsPrintInvoice == false
    ? (item = {
        AdultPax: Data.GuestAllocation.Adult,
        ChildPax: Data.GuestAllocation.Child,
        InfantPax: Data.GuestAllocation.Infant,
        RoomAllocation: {
          SharingRoomQty: Data.RoomAllocation.SharingRoomQty,
          SingleRoomQty: Data.RoomAllocation.SingleRoomQty,
          ExtraBedQty: Data.RoomAllocation.ExtraBedQty,
          ChildExtraBedQty: Data.RoomAllocation.ChildExtraBedQty,
          SharingBedQty: Data.RoomAllocation.SharingBedQty,
          NoBed: Data.RoomAllocation.NoBed,
        },
        TourNote: Data.TourNote,
        Guests: Data.Guests.filter(item => item.FirstName != null),
        Supplements: Data.Supplements,
        CompanyCode: null,
        IsQuotation: false,
        UserProfileId: null,
      })
    : (item = {
        AdultPax: Data.GuestAllocation.Adult,
        ChildPax: Data.GuestAllocation.Child,
        InfantPax: Data.GuestAllocation.Infant,
        RoomAllocation: {
          SharingRoomQty: Data.RoomAllocation.SharingRoomQty,
          SingleRoomQty: Data.RoomAllocation.SingleRoomQty,
          ExtraBedQty: Data.RoomAllocation.ExtraBedQty,
          ChildExtraBedQty: Data.RoomAllocation.ChildExtraBedQty,
          SharingBedQty: Data.RoomAllocation.SharingBedQty,
          NoBed: Data.RoomAllocation.NoBed,
        },
        IsSplitStaffCommission: Data.IsSplitStaffCommission,
        TourNote: Data.TourNote,
        Guests: Data.Guests.filter(item => item.FirstName != null),
        Supplements: Data.Supplements,
        CompanyCode: null,
        IsQuotation: false,
        UserProfileId: null,
      });
  return item;
};

export const transactionItemQuotation = (
  DetailCustom,
  SummaryProgram,
  DailyProgram,
  Arrival,
  Departure,
  Guest,
  Operator,
  AdditionalServices
) => {
  let itemRestoAndExcur = getExcursionAndResto(DailyProgram);
  let date = getStartEndDate(DailyProgram, Arrival, Departure);
  var item = null;
  DetailCustom.RoomAllocation.Qty == 0
    ? (item = {
        TourTransactionId: DetailCustom.IdTour,
        AcceptQuotationAtOnce: false,
        TourOperatorId: Operator.TourProfileId,
        Attractions: itemRestoAndExcur.Excursion,
        Movements: getDailyMovement(DailyProgram),
        Transportations: getTransport(DailyProgram),
        Accommodations: getAccomodation(
          SummaryProgram,
          DetailCustom.RoomAllocation
        ),
        Restaurants: itemRestoAndExcur.Resto,
        TourGuides: getTourGuides(DailyProgram),
        AdditionalServices: getAdditionalServices(AdditionalServices),
        BookingTemplateDescriptions: DetailCustom.BookingTemplateDescriptions
          ? getDescriptions(DetailCustom.BookingTemplateDescriptions)
          : [],
        Guests: memberGuest(Guest),
        FlightTickets:
          DetailCustom.GroupCapacity == 'SMALL'
            ? []
            : getFlightTicketsFromHeadline(
                SummaryProgram,
                DetailCustom.GuestAllocation.Adult +
                  DetailCustom.GuestAllocation.Child
              ),
        // : getFlightTickets(
        //     DailyProgram,
        //     DetailCustom.GuestAllocation.Adult +
        //       DetailCustom.GuestAllocation.Child
        //   ),
        RoomAllocation: {
          SharingRoomQty: DetailCustom.RoomAllocation.SharingRoomQty,
          SingleRoomQty: DetailCustom.RoomAllocation.SingleRoomQty,
          ExtraBedQty: DetailCustom.RoomAllocation.ExtraBedQty,
          ChildExtraBedQty: DetailCustom.RoomAllocation.ChildExtraBedQty,
          SharingBedQty: DetailCustom.RoomAllocation.SharingBedQty,
          ChildSharingRoomQty: DetailCustom.RoomAllocation.ChildSharingRoomQty,
          ChildSingleRoomQty: DetailCustom.RoomAllocation.ChildSingleRoomQty,
          BabyCrib: DetailCustom.RoomAllocation.BabyCrib,
          NoBed: DetailCustom.RoomAllocation.NoBed,
        },
        FoC: null,
        CompanyCode: null,
        UserProfileId: null,
        IsQuotation: true,
        Title: DetailCustom.TourName,
        AdultPaxQty: DetailCustom.GuestAllocation.Adult,
        ChildPaxQty: DetailCustom.GuestAllocation.Child,
        InfantPaxQty: DetailCustom.GuestAllocation.Infant,
        StartDate: date.startDate,
        EndDate: date.endDate,
        TourName: DetailCustom.TourName,
        CityDestinationId: Arrival[0].City.Id,
        RegionDestinationId: Arrival[0].Region,
        TourCategoryId: DetailCustom.TourCategory,
        GroupType: DetailCustom.GroupCapacity,
        TourPaxTypeId: DetailCustom.TourType,
        IsReadyPackage: DetailCustom.IsReadyPackage
          ? DetailCustom.IsReadyPackage
          : false,
        ReadyPackageId: DetailCustom.ReadyPackageId
          ? DetailCustom.ReadyPackageId
          : 0,
      })
    : (item = {
        TourTransactionId: DetailCustom.IdTour,
        AcceptQuotationAtOnce: false,
        TourOperatorId: Operator.TourProfileId,
        Attractions: itemRestoAndExcur.Excursion,
        Movements: getDailyMovement(DailyProgram),
        Transportations: getTransport(DailyProgram),
        Accommodations: getAccomodation(
          SummaryProgram,
          DetailCustom.RoomAllocation
        ),
        Restaurants: itemRestoAndExcur.Resto,
        TourGuides: getTourGuides(DailyProgram),
        AdditionalServices: getAdditionalServices(AdditionalServices),
        BookingTemplateDescriptions: DetailCustom.BookingTemplateDescriptions
          ? getDescriptions(DetailCustom.BookingTemplateDescriptions)
          : [],
        Guests: memberGuest(Guest),
        FlightTickets:
          DetailCustom.GroupCapacity == 'SMALL'
            ? []
            : getFlightTicketsFromHeadline(
                SummaryProgram,
                DetailCustom.GuestAllocation.Adult +
                  DetailCustom.GuestAllocation.Child
              ),
        // : getFlightTickets(
        //     DailyProgram,
        //     DetailCustom.GuestAllocation.Adult +
        //       DetailCustom.GuestAllocation.Child
        //   ),
        RoomAllocation: {
          SharingRoomQty: DetailCustom.RoomAllocation.SharingRoomQty,
          SingleRoomQty: DetailCustom.RoomAllocation.SingleRoomQty,
          ExtraBedQty: DetailCustom.RoomAllocation.ExtraBedQty,
          ChildExtraBedQty: DetailCustom.RoomAllocation.ChildExtraBedQty,
          SharingBedQty: DetailCustom.RoomAllocation.SharingBedQty,
          ChildSharingRoomQty: DetailCustom.RoomAllocation.ChildSharingRoomQty,
          ChildSingleRoomQty: DetailCustom.RoomAllocation.ChildSingleRoomQty,
          BabyCrib: DetailCustom.RoomAllocation.BabyCrib,
          NoBed: DetailCustom.RoomAllocation.NoBed,
        },
        FoC: {
          Qty: DetailCustom.RoomAllocation.Qty,
          Description: DetailCustom.RoomAllocation.Description,
        },
        CompanyCode: null,
        UserProfileId: null,
        IsQuotation: true,
        Title: DetailCustom.TourName,
        AdultPaxQty: DetailCustom.GuestAllocation.Adult,
        ChildPaxQty: DetailCustom.GuestAllocation.Child,
        InfantPaxQty: DetailCustom.GuestAllocation.Infant,
        StartDate: date.startDate,
        EndDate: date.endDate,
        TourName: DetailCustom.TourName,
        CityDestinationId: Arrival[0].City.Id,
        RegionDestinationId: Arrival[0].Region,
        TourCategoryId: DetailCustom.TourCategory,
        GroupType: DetailCustom.GroupCapacity,
        TourPaxTypeId: DetailCustom.TourType,
        IsReadyPackage: DetailCustom.IsReadyPackage
          ? DetailCustom.IsReadyPackage
          : false,
        ReadyPackageId: DetailCustom.ReadyPackageId
          ? DetailCustom.ReadyPackageId
          : 0,
      });
  return item;
};

export const createTransactionItemSeries = Data => {
  var item = null;
  Data.IsSplitStaffCommission == false && Data.IsPrintInvoice == false
    ? (item = {
        AdultPax: Data.GuestAllocation.Adult,
        ChildPax: Data.GuestAllocation.Child,
        InfantPax: Data.GuestAllocation.Infant,
        RoomAllocation: {
          SharingRoomQty: Data.RoomAllocation.SharingRoomQty,
          SingleRoomQty: Data.RoomAllocation.SingleRoomQty,
          ExtraBedQty: Data.RoomAllocation.ExtraBedQty,
          ChildExtraBedQty: Data.RoomAllocation.ChildExtraBedQty,
          SharingBedQty: Data.RoomAllocation.SharingBedQty,
          NoBed: Data.RoomAllocation.NoBed,
        },
        TourNote: Data.TourNote,
        Guests: Data.Guests.filter(item => item.FirstName != null),
        Supplements: Data.Supplements,
      })
    : (item = {
        AdultPax: Data.GuestAllocation.Adult,
        ChildPax: Data.GuestAllocation.Child,
        InfantPax: Data.GuestAllocation.Infant,
        RoomAllocation: {
          SharingRoomQty: Data.RoomAllocation.SharingRoomQty,
          SingleRoomQty: Data.RoomAllocation.SingleRoomQty,
          ExtraBedQty: Data.RoomAllocation.ExtraBedQty,
          ChildExtraBedQty: Data.RoomAllocation.ChildExtraBedQty,
          SharingBedQty: Data.RoomAllocation.SharingBedQty,
          NoBed: Data.RoomAllocation.NoBed,
        },
        IsSplitStaffCommission: Data.IsSplitStaffCommission,
        TourNote: Data.TourNote,
        Guests: Data.Guests.filter(item => item.FirstName != null),
        Supplements: Data.Supplements,
      });
  return item;
};

export const transformDataReason = data => {
  let dataTransform = [];
  data.length != 0
    ? data.map(data => {
        dataTransform.push({
          label: data.Name,
          value: data.Id,
        });
      })
    : null;
  dataTransform.push({
    label: 'I have another reason',
    value: 'Other',
  });
  return dataTransform;
};

export const dataPaymentConfirmation = (
  Data,
  typePayment,
  choice,
  value,
  CancellationReasonId,
  CancellationReasonNote
) => {
  var item = null;
  typePayment == 'cancel'
    ? (item = {
        BundledValue: 0,
        UseBundledValue: true,
        Id: Data.Id,
        Confirmation: Data.Confirmation,
        UpdateGuest: {
          AdultPax: Data.Booking.GuestAllocation.Adult,
          ChildPax: Data.Booking.GuestAllocation.Child,
          InfantPax: Data.Booking.GuestAllocation.Infant,
          RoomAllocation: {
            SharingRoomQty: Data.Booking.RoomAllocation.SharingRoomQty,
            SingleRoomQty: Data.Booking.RoomAllocation.SingleRoomQty,
            ExtraBedQty: Data.Booking.RoomAllocation.ExtraBedQty,
            ChildExtraBedQty: Data.Booking.RoomAllocation.ChildExtraBedQty,
            SharingBedQty: Data.Booking.RoomAllocation.SharingBedQty,
            NoBed: Data.Booking.RoomAllocation.NoBed,
          },
          Guests: Data.DetailGuest,
        },
        SupplementPayment: Data.Booking.Supplements,
        CancellationReasonId: CancellationReasonId,
        CancellationReasonNote: CancellationReasonNote,
      })
    : (item = {
        BundledValue: 0,
        UseBundledValue: true,
        Id: Data.Id,
        Confirmation: Data.Confirmation,
        UpdateGuest: {
          AdultPax: Data.Booking.GuestAllocation.Adult,
          ChildPax: Data.Booking.GuestAllocation.Child,
          InfantPax: Data.Booking.GuestAllocation.Infant,
          RoomAllocation: {
            SharingRoomQty: Data.Booking.RoomAllocation.SharingRoomQty,
            SingleRoomQty: Data.Booking.RoomAllocation.SingleRoomQty,
            ExtraBedQty: Data.Booking.RoomAllocation.ExtraBedQty,
            ChildExtraBedQty: Data.Booking.RoomAllocation.ChildExtraBedQty,
            SharingBedQty: Data.Booking.RoomAllocation.SharingBedQty,
            NoBed: Data.Booking.RoomAllocation.NoBed,
          },
          Guests: Data.DetailGuest,
        },
        SupplementPayment: Data.Booking.Supplements,
        PaymentChoice: choice,
        CustomValue: value,
      });
  return item;
};

export const generateOrderedItem = data => {
  let accommodation = [];
  let flight = [];
  let restaurant = [];
  let excursion = [];
  let transportation = [];
  const generateOrderedItem = data
    ? data.reduce((sum, record) => {
        record.OrderedItems.length > 0 &&
          record.OrderedItems.forEach(data => {
            let cutNameOnly = data.ItemName.split('-')[0];
            let isSame = true;
            if (data.ItemType.toLowerCase() === 'accommodation') {
              isSame = accommodation.includes(cutNameOnly);
              !isSame && accommodation.push(cutNameOnly);
            } else if (data.ItemType.toLowerCase() === 'flight_ticket') {
              isSame = flight.includes(cutNameOnly);
              !isSame && flight.push(cutNameOnly);
              // return flight.push(data.ItemName);
            } else if (data.ItemType.toLowerCase() === 'restaurant') {
              isSame = restaurant.includes(cutNameOnly);
              !isSame && restaurant.push(cutNameOnly);
              // return restaurant.push(data.ItemName);
            } else if (data.ItemType.toLowerCase() === 'attraction') {
              isSame = excursion.includes(cutNameOnly);
              !isSame && excursion.push(cutNameOnly);
              // return excursion.push(data.ItemName);
            } else if (data.ItemType.toLowerCase() === 'transportation') {
              isSame = transportation.includes(cutNameOnly);
              !isSame && transportation.push(cutNameOnly);
              // return transporation.push(data.ItemName);
            }
          });
        sum = {
          accommodation: accommodation,
          flight: flight,
          restaurant: restaurant,
          excursion: excursion,
          transportation: transportation,
        };
        return sum;
      }, {})
    : [];
  return generateOrderedItem;
};

export const generateGuestList = data => {
  let adult = [];
  let child = [];
  let infant = [];
  const guestList = data.reduce((sum, record) => {
    if (adult.length < 1 && record.GuestCategory.toLowerCase() === 'adult') {
      return adult.push(record);
    } else if (
      child.length < 1 &&
      record.GuestCategory.toLowerCase() === 'children'
    ) {
      return child.push(record);
    } else if (
      infant.length < 1 &&
      record.GuestCategory.toLowerCase() === 'infant'
    ) {
      return infant.push(record);
    }
    sum = {
      adult: adult,
      child: child,
      infant: infant,
    };
    return sum;
  }, {});
  return guestList;
};

export const generateOrderedItemDetail = data => {
  let accommodation = [];
  let flight = [];
  let restaurant = [];
  let excursion = [];
  let transportation = [];
  const generateOrderedItem = data.reduce(
    (sum, record, currentIndex, array) => {
      const destination = record.TourDestinations[0].Destination;
      const roomService = record.TourDestinations[0].AccommodationSummary
        ? record.TourDestinations[0].AccommodationSummary.RoomService
        : '';
      const findCityName = record.Movements.find(
        data => data.Destination === destination && data.DestinationName
      );
      record.OrderedItems.length > 0 &&
        record.OrderedItems.forEach(data => {
          let isAlreadyInArray = true;
          if (data.ItemType.toLowerCase() === 'accommodation') {
            isAlreadyInArray = accommodation.some(
              e => e.ItemName === data.ItemName
            );
            !isAlreadyInArray &&
              accommodation.push(
                modifyDataForOrderedItemDetail(
                  data,
                  findCityName ? findCityName.DestinationName : '',
                  roomService,
                  array[currentIndex].Date,
                  'accommodation'
                )
              );
          } else if (data.ItemType.toLowerCase() === 'attraction') {
            isAlreadyInArray = excursion.some(
              e => e.ItemName === data.ItemName
            );
            !isAlreadyInArray &&
              excursion.push(
                modifyDataForOrderedItemDetail(
                  data,
                  findCityName ? findCityName.DestinationName : '',
                  roomService,
                  array[currentIndex].Date,
                  'excursion'
                )
              );
          } else if (data.ItemType.toLowerCase() === 'flight_ticket') {
            isAlreadyInArray = flight.some(e => e.ItemName === data.ItemName);
            !isAlreadyInArray &&
              flight.push(
                modifyDataForOrderedItemDetail(
                  data,
                  findCityName ? findCityName.DestinationName : '',
                  roomService,
                  array[currentIndex].Date,
                  'flight_ticket'
                )
              );
          } else if (data.ItemType.toLowerCase() === 'restaurant') {
            isAlreadyInArray = restaurant.some(
              e => e.ItemName === data.ItemName
            );
            !isAlreadyInArray &&
              restaurant.push(
                modifyDataForOrderedItemDetail(
                  data,
                  findCityName ? findCityName.DestinationName : '',
                  roomService,
                  array[currentIndex].Date,
                  'restaurant'
                )
              );
          } else if (data.ItemType.toLowerCase() === 'transportation') {
            isAlreadyInArray = transportation.some(
              e => e.ItemName === data.ItemName
            );
            !isAlreadyInArray &&
              transportation.push(
                modifyDataForOrderedItemDetail(
                  data,
                  findCityName ? findCityName.DestinationName : '',
                  roomService,
                  array[currentIndex].Date,
                  'transportation'
                )
              );
          }
        });

      sum = {
        accommodation,
        flight,
        restaurant,
        excursion,
        transportation,
      };
      return sum;
    },
    {}
  );

  return generateOrderedItem;
};

const modifyDataForOrderedItemDetail = (
  data,
  destination,
  roomService,
  date,
  type
) => {
  let modifData = {};
  if (type === 'accommodation') {
    modifData = {
      ItemType: data.ItemType,
      ItemName: data.ItemName,
      Qty: data.Qty,
      Date: date,
      Destination: destination,
      RoomService: roomService,
    };
  } else {
    modifData = {
      ItemType: data.ItemType,
      ItemName: data.ItemName,
      Qty: data.Qty,
      Date: date,
      Destination: destination,
      Description: data.Description,
    };
  }

  return modifData;
};

export const getFlightTicketsFromHeadline = (headLine, qty) => {
  let tempHeadline = copyObject(headLine);
  let arrayHeadline = combineHeadline(tempHeadline);
  let FlightTickets = arrayHeadline.reduce((acc, current) => {
    if (acc.length === 0) {
      if (
        (current.TransferType === 'Movement_arrival' &&
          current.Ticket.ServiceItemId) ||
        (current.TransferType === 'Movement_departure' &&
          current.Ticket.ServiceItemId)
      ) {
        acc.push({
          DateTime: current.Date,
          ServiceItemId: current.Ticket.ServiceItemId,
          Qty: qty,
        });
      }
    } else {
      if (
        (current.TransferType === 'Movement_arrival' &&
          current.Ticket.ServiceItemId) ||
        (current.TransferType === 'Movement_departure' &&
          current.Ticket.ServiceItemId)
      ) {
        if (
          !acc.find(item => item.ServiceItemId === current.Ticket.ServiceItemId)
        ) {
          acc.push({
            DateTime: current.Date,
            ServiceItemId: current.Ticket.ServiceItemId,
            Qty: qty,
          });
        }
      }
    }
    return acc;
  }, []);
  return FlightTickets;
};
