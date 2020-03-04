import moment from 'moment';
// import 'moment/locale/es';

const viewDate = par => {
  return moment(par).format('DD MMM YYYY');
};

const viewDateString = par => {
  return moment(par).format('DD MMM YY');
};

const viewDay = par => {
  let dt = moment(par, 'YYYY-MM-DD HH:mm:ss');
  return dt.format('dddd');
};

const viewDateDM = par => {
  return moment(par).format('DD MMM');
};

const viewTime = par => {
  return moment(par).format('HH : mm');
};

const viewDateSlash = par => {
  return moment(par).format('DD/MM/YY');
};

const viewDateStrip = par => {
  return moment(par).format('YYYY-MM-DD');
};

//function time
const changeTime = par => {
  let date = moment(par).format();
  return date.slice(0, -6);
};

const changeTimeNew = (time, par) => {
  let date = moment(par).format();
  let value = moment(
    convertToStringDate(time) + convertToStringTime(date)
  ).format();
  return value.slice(0, -6);
};

const SumDays = (tgl, days) => {
  let date = moment(tgl)
    .add(days, 'days')
    .format();
  return date.slice(0, -6);
};
const SubDays = (tgl, days) => {
  let date = moment(tgl)
    .subtract(days, 'days')
    .format();
  return date.slice(0, -6);
};

const SumSecond = (tgl, second) => {
  let date = moment(tgl)
    .add(second, 'seconds')
    .format();
  return date.slice(0, -6);
};

const SubstractSecond = (tgl, second) => {
  let date = moment(tgl)
    .subtract(second, 'seconds')
    .format();
  return date.slice(0, -6);
};

const getHour = tgl => {
  return moment(tgl).hours();
};

const convertDateFormat = (date, string) => {
  return moment(date).format(string);
};

const convertToStringTime = date => {
  return date.slice(10);
};
const convertToStringDate = date => {
  return date.slice(0, -9);
};

const getNumberOfDays = (startDate, endDate) => {
  let normalyTime = 'T00:00:00';
  startDate = moment(convertToStringDate(startDate) + normalyTime);
  endDate = moment(convertToStringDate(endDate) + normalyTime);
  return endDate.diff(startDate, 'days') + 1;
};

const getNumberOfSecond = (startDate, endDate) => {
  return moment(endDate).diff(moment(startDate), 'seconds');
};

const getTime = date => {
  return new Date(date).getTime();
};

//fungsi untuk menambah dan mengurangi jam
const addsubtractTimeHours = (date, hours, type) => {
  var dateAfter =
    type === 'add'
      ? moment(date)
          .add(hours, 'hours')
          .format()
      : moment(date)
          .subtract(hours, 'hours')
          .format();
  dateAfter = moment(dateAfter).format('YYYY-MM-DD HH:mm:ss');
  var stringDate = `${convertDateFormat(
    dateAfter,
    'YYYY-MM-DD'
  )}T${dateAfter.slice(11)}`;
  return stringDate;
};

const getRangeOfDates = (start, end) => {
  var arr = new Array();
  var dt = new Date(start);
  end = new Date(end);
  while (dt <= end) {
    arr.push(moment(dt).format('YYYY-MM-DD'));
    dt.setDate(dt.getDate() + 1);
  }
  return arr;
};

const getListEnableDate = data => {
  let resultDate = [];
  data.length != 0
    ? data.map(dataDate => {
        dataDate.AllowedDates.length != 0
          ? dataDate.AllowedDates.map(dataDateAllow => {
              resultDate.push(dataDateAllow.Date.slice(0, 10));
            })
          : null;
      })
    : null;
  return resultDate;
};

const checkDateDisable = (rangeDate, enableDate) => {
  let dataObject = {};
  rangeDate.length != 0
    ? rangeDate.map(data => {
        if (enableDate.indexOf(data) == -1) {
          dataObject = {
            ...dataObject,
            [data]: {
              disabled: true,
              disableTouchEvent: true,
            },
          };
        }
      })
    : null;
  return dataObject;
};

const concatAllowedDate = (dataResult, dataConcat) => {
  dataConcat.map(item => {
    item.AllowedDates.length != 0
      ? (dataResult = dataResult.concat(item.AllowedDates))
      : null;
  });
  return dataResult;
};

const filterDateStartFixPrice = data => {
  let result = null;
  let today = new Date();
  today = moment(today).format('YYYY-MM-DD');
  let dataConcat = concatAllowedDate([], data);
  result = dataConcat.find(itemDate => itemDate.Date.slice(0, 10) > today);
  return result ? result.Date : today;
};

//input 36000 output 12 hours 0 mins
const changeSecondToHourString = value => {
  let hour = Math.floor(value / 3600);
  let minute = Math.round((value % 3600) / 60);
  let resultConvert =
    hour != 0
      ? minute != 0
        ? hour + ' hours' + ' ' + minute + ' mins'
        : hour + ' hours'
      : minute + ' mins';
  return resultConvert;
};

const durationFlight = (dateDepar, dateArr) => {
  let dateArrival = new Date(dateArr);
  let dateDeparature = new Date(dateDepar);
  let timeDiffDeparArr = Math.abs(
    dateArrival.getTime() - dateDeparature.getTime()
  );
  let timeDiffInSecond = Math.ceil(timeDiffDeparArr / 1000);
  return timeDiffInSecond;
};

const getTotalDays = (startDate, endDate) => {
  let totalDays = moment(new Date(endDate)).diff(
    moment(new Date(startDate)),
    'days'
  );
  totalDays = totalDays + 1;
  return totalDays;
};

const getHourAndMinute = date => {
  return addZero(moment(date).hours()) + ':' + addZero(moment(date).minutes());
};

const addZero = i => {
  if (i < 10) {
    i = i.length === 2 ? i : '0' + i;
  }
  return i;
};

export {
  getHourAndMinute,
  filterDateStartFixPrice,
  getTotalDays,
  addsubtractTimeHours,
  durationFlight,
  getRangeOfDates,
  concatAllowedDate,
  getListEnableDate,
  checkDateDisable,
  SubstractSecond,
  SumSecond,
  SubDays,
  SumDays,
  changeTime,
  viewDate,
  viewDay,
  viewTime,
  viewDateSlash,
  getHour,
  convertDateFormat,
  convertToStringTime,
  convertToStringDate,
  getNumberOfDays,
  getNumberOfSecond,
  changeTimeNew,
  viewDateDM,
  getTime,
  changeSecondToHourString,
  viewDateString,
  viewDateStrip,
};
