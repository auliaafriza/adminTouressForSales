import {
  convertToStringDate,
  convertToStringTime,
  SubDays,
  SumDays,
} from './timeHelper';
import { setDateSummaryProgram, setReturnsDate } from './itineraryBuilder';
import { setDateSummaryProgramByIndex } from './dailyProgram';

const helperNextDay = (headlineProgram, index, data, type) => {
  let newHeadline = { ...headlineProgram };
  let newDate = data.NextDay ? SubDays(data.Date, 1) : SumDays(data.Date, 1);
  if (type === 'lastDeparture') {
    let newDeparture = { ...newHeadline.Returns[0] };
    newDeparture.Date =
      convertToStringDate(newDate) + convertToStringTime(newDeparture.Date);
    newDeparture.NextDay = !newDeparture.NextDay;
    newHeadline.Returns[0] = newDeparture;
    newHeadline.Returns = setReturnsDate(
      newHeadline.Returns,
      newHeadline.MainPrograms
    );
  } else if (type === 'lastArrival') {
    let newArrival = { ...newHeadline.Returns[index] };
    newArrival.Date =
      convertToStringDate(newDate) + convertToStringTime(newArrival.Date);
    newArrival.NextDay = !newArrival.NextDay;
    newHeadline.Returns[index] = newArrival;
  } else if (type === 'connectionFlight') {
    newHeadline.MainPrograms = setDateSummaryProgramByIndex(
      newHeadline.MainPrograms,
      newHeadline.Departures[0],
      index,
      newDate
    );
    newHeadline.Returns = setReturnsDate(
      newHeadline.Returns,
      newHeadline.MainPrograms
    );
  } else if (type === 'firstArrival') {
    let firstArrival = { ...newHeadline.Departures[index] };
    firstArrival.Date =
      convertToStringDate(newDate) + convertToStringTime(firstArrival.Date);
    firstArrival.NextDay = !firstArrival.NextDay;
    newHeadline.Departures[index] = firstArrival;
    newHeadline.MainPrograms = setDateSummaryProgram(
      firstArrival.Date,
      newHeadline.MainPrograms
    );
    newHeadline.Returns = setReturnsDate(
      newHeadline.Returns,
      newHeadline.MainPrograms
    );
  }
  return newHeadline;
};
export { helperNextDay };
