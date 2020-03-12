import {
  changeDestinationArivalDeparture,
  copyObject
} from "../../../../helper/dailyProgram";

export const isAccessibleAirport = (idAirport, placesByRegion, data) => {
  let places = getPlaceByRegion(data.RequestFrom, placesByRegion);
  let isAccessible = places.find(item => item.Id === idAirport);
  return isAccessible ? true : false;
};

export const getPlaceByRegion = (region, placesByRegion) => {
  let data = placesByRegion.filter(item => item.region === region);
  return data.length > 0 ? data[0].data : [];
};

export const findPlaceByRegion = (places, region) => {
  let newPlace = places.find(item => item.Region === region);
  return newPlace ? newPlace.Data : [];
};

//fungsi untuk check jika perlu perubahan arival atau departure
//ArrivalDeparture : object airport
//ListSummaryProgram : list dari summary program
//index : index dari summary program yg di change destinationnya
//type : Arrival or Departure
export const isNeedChangeArrivalDeparture = (
  ArrivalDeparture,
  ListSummaryProgram,
  index,
  listAirport
) => {
  let air = copyObject(ArrivalDeparture);
  let SP = copyObject(ListSummaryProgram);
  let isThereSameAirport = listAirport.find(e => e.Id === air.PlaceId)
    ? true
    : false;
  if (isThereSameAirport) {
    return false;
  } else {
    if (SP[index].Region !== air.RequestFrom) return true;
    else return false;
  }
};

export const isNullFirstDestination = headlineProgram => {
  if (
    headlineProgram.MainPrograms.length === 1 &&
    !headlineProgram.MainPrograms[0].City
  ) {
    return true;
  } else {
    return false;
  }
};

export const setPlaceInArrivalDepartureByHeadLine = (
  HeadlineProgram,
  places,
  cityList
) => {
  let headLineProg = copyObject(HeadlineProgram);
  let mainProgLength = headLineProg.MainPrograms.length;
  let mainProg = headLineProg.MainPrograms;

  headLineProg.Departures[
    headLineProg.Departures.length - 1
  ] = changeArrivalDep(
    headLineProg,
    0,
    cityList,
    places,
    headLineProg.Departures[headLineProg.Departures.length - 1],
    "Arrival"
  );
  headLineProg.Returns[0] = changeArrivalDep(
    headLineProg,
    mainProgLength - 1,
    cityList,
    places,
    headLineProg.Returns[0],
    "Departure"
  );
  headLineProg.MainPrograms = mainProg.map((main, i) => {
    if (main.TransferType) {
      let type =
        main.TransferType === "Movement_arrival" ? "Arrival" : "Departure";
      let idx = main.TransferType === "Movement_arrival" ? i + 1 : i - 1;
      main = changeArrivalDep(headLineProg, idx, cityList, places, main, type);
    }
    return main;
  });
  return headLineProg;
};

export const changeArrivalDep = (
  headLineProg,
  indexMp,
  cities,
  places,
  departureArrival,
  type
) => {
  let accomRegion = headLineProg.MainPrograms[indexMp].Region;
  let listAirport = findPlaceByRegion(
    places,
    headLineProg.MainPrograms[indexMp].Region
  );
  let changes = isNeedChangeArrivalDeparture(
    departureArrival,
    headLineProg.MainPrograms,
    indexMp,
    listAirport
  )
    ? changeDestinationArivalDeparture(
        departureArrival,
        cities,
        listAirport,
        accomRegion
      )
    : departureArrival;
  return changes;
};
