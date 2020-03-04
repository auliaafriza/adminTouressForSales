import moment from 'moment';

const shortFormatDate = date => {
  return moment(date).format('DD MMM');
};

const getYear = date => {
  return moment(date).format('YYYY');
};

const convertDateFormat = (date, string) => {
  return moment(date).format(string);
};

const getTotalDays = (day1, day2, absolute) => {
  var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  var firstDate = new Date(moment(day1).format('YYYY-MM-DD'));
  var secondDate = new Date(moment(day2).format('YYYY-MM-DD'));

  var diffDays = Math.round(
    absolute === false
      ? (firstDate.getTime() - secondDate.getTime()) / oneDay
      : Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay)
  );
  return diffDays + 1;
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

const timeDuration = currentValue => {
  let timeDecimal = currentValue / 3600;
  let hour = Math.floor(timeDecimal);
  let leaveMinute = currentValue % 3600;
  let minute = addZero(Math.ceil(leaveMinute / 60));
  let display = '';
  // eslint-disable-next-line
  if (hour == '00' && minute == '00') {
    display = '0 min';
    // eslint-disable-next-line
  } else if (hour == '00' && minute != '00') {
    display = minute + ' mins';
    // eslint-disable-next-line
  } else if (hour != '00' && minute == '00') {
    display = hour + ' h';
  } else {
    display = hour + ':' + minute + ' h';
  }
  return display;
};

const addTime = (date, duration, convertToMilliSecond) => {
  let newDate = new Date(date);
  newDate = new Date(newDate.getTime() + duration * convertToMilliSecond);
  newDate = moment(newDate).format('YYYY-MM-DDTHH:mm:ss');
  return newDate;
};
const rangeDate = (startDate, endDate) => {
  return convertDateFormat(startDate, 'DD MM YYYY') ===
    convertDateFormat(endDate, 'DD MM YYYY')
    ? convertDateFormat(startDate, 'DD MMM YYYY')
    : convertDateFormat(startDate, 'MM') === convertDateFormat(endDate, 'MM')
    ? convertDateFormat(startDate, 'DD') +
      ' - ' +
      convertDateFormat(endDate, 'DD MMM YYYY')
    : convertDateFormat(startDate, 'YYYY') ===
      convertDateFormat(endDate, 'YYYY')
    ? convertDateFormat(startDate, 'DD MMM') +
      ' - ' +
      convertDateFormat(endDate, 'DD MMM YYYY')
    : convertDateFormat(startDate, 'DD MMM YYYY') +
      ' - ' +
      convertDateFormat(endDate, 'DD MMM YYYY');
};

const diffDate = (startDate, endDate, unitTIme) => {
  return moment(endDate).diff(moment(startDate), unitTIme);
};

const sortDate = (array, objName) => {
  return array.sort((a, b) => {
    return new Date(a[objName]) - new Date(b[objName]);
  });
};

// date => tanggalnya
// numAdd => jumlah bilangan yang akan di tambah (integer)
// stringTime => seperti "M", "d", "w" dkk (dokumentasi moment)
// fungsinya untuk menambahkan tanggal
const addDate = (date, numAdd, stringTime) => {
  let futureMonth = moment(date).add(numAdd, stringTime);
  return new Date(futureMonth);
};

const isSameDate = (date1, date2) => {
  return convertDateFormat(date1, 'DD MMM YYYY') ===
    convertDateFormat(date2, 'DD MMM YYYY')
    ? true
    : false;
};
export {
  shortFormatDate,
  getYear,
  convertDateFormat,
  getTotalDays,
  getHourAndMinute,
  addZero,
  timeDuration,
  addTime,
  rangeDate,
  diffDate,
  sortDate,
  addDate,
  isSameDate,
};
