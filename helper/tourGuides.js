import moment from 'moment';
export const initialGuideReady = {
  DateTime: '',
  EndTime: '',
  TourTransactionId: 0,
  TourGuideServiceType: 501,
  CityId: '',
  LanguageId: null,
  Qty: 0,
  SeqNumber: 0,
};

export class initialGuide {
  constructor(Language, City, DateTime, EndTime) {
    this.DateTime = DateTime;
    this.EndTime = EndTime;
    this.TourTransactionId = 0;
    this.TourGuideServiceType = 501;
    this.CityId = City.CityId;
    this.LanguageId = Language;
    this.Qty = 1;
    this.SeqNumber = 0;
  }
}

export const getCities = data => {
  let cities = data.Movements.reduce((result, current) => {
    let res = result;
    if (res.length === 0) {
      res.push({
        CityId: current.Destination,
        CityName: current.DestinationName,
        DateTime: current.DateTime,
      });
    } else {
      if (!res.find(item => item.CityId === current.Destination)) {
        if (['CHECKIN', 'DAYSTART'].indexOf(current.MovementName) !== -1) {
          res[res.length - 1].EndTime = addDate(
            current.DateTime,
            current.Duration,
            's'
          );
          res.push({
            CityId: current.Destination,
            CityName: current.DestinationName,
            DateTime: current.DateTime,
          });
        }
      } else {
        res[res.length - 1].EndTime = addDate(
          current.DateTime,
          current.Duration,
          's'
        );
      }
    }
    return res;
  }, []);
  return cities;
};

// date => tanggalnya
// numAdd => jumlah bilangan yang akan di tambah (integer)
// stringTime => seperti "M", "d", "w" dkk (dokumentasi moment)
// fungsinya untuk menambahkan tanggal
export const addDate = (date, numAdd, stringTime) => {
  let futureMonth = moment(date).add(numAdd, stringTime);
  return new Date(futureMonth);
};

export const setTourGuideInDailyProgram = dailyProgram => {
  return dailyProgram.map(daily => {
    daily.TourGuides = createTourGuideData(daily);
    return daily;
  });
};

export const createTourGuideData = daily => {
  return daily.OrderedItems.reduce((res, cur) => {
    if (cur.ItemType === 'TourGuide') {
      let initData = { ...initialGuide };
      initData.CityId = cur.CityId;
      initData.CityName = cur.CityName;
      initData.Language = cur.Language;
      initData.Qty = cur.Qty;
      res.push(initData);
    }
    return res;
  }, []);
};

export const setTourGuideInDailyProgramReady = dailyProgram => {
  return dailyProgram.map(daily => {
    daily.TourGuides = createTourGuideDataReady(daily);
    return daily;
  });
};

export const createTourGuideDataReady = daily => {
  return daily.OrderedItems.reduce((res, cur) => {
    if (cur.ItemType === 'TourGuide') {
      let initData = { ...initialGuideReady };
      initData.CityId = {
        CityId: cur.CityId,
        CityName: cur.CityName,
      };
      initData.CityName = cur.CityName;
      initData.LanguageId = {
        Id: cur.Language.Id,
        EnglishName: cur.Language.Text,
      };
      initData.Qty = cur.Qty;
      res.push(initData);
    }
    return res;
  }, []);
};

export const countAmountGuide = (data, cityId) => {
  return data.reduce((res, cur) => {
    if (cityId == cur.CityId.CityId) {
      if (res == null) {
        res = cur.Qty;
      } else {
        res = res + cur.Qty;
      }
    }
    return res;
  }, null);
};

export const AmountGuide = daily => {
  let data = daily.TourGuides.reduce((result, current) => {
    let res = result;
    if (res.length === 0) {
      res.push({
        CityId: current.CityId,
        QtyAmountGuide: current.Qty,
      });
    } else {
      let findCity = res.findIndex(item => item.CityId === current.CityId);
      if (findCity != -1) {
        res[findCity].QtyAmountGuide =
          res[findCity].QtyAmountGuide + current.Qty;
      } else {
        res.push({
          CityId: current.CityId,
          QtyAmountGuide: current.Qty,
        });
      }
    }
    return res;
  }, []);
  return data;
};

export const getTransportation = (dataDaily, cityId) => {
  let transportation = dataDaily.Movements.reduce((transport, data) => {
    let isSelfTransport = data.Item.ServiceItemId == null;
    if (
      data.MovementName == 'DRIVING' &&
      !isSelfTransport &&
      cityId == data.Item.CityId
    ) {
      if (transport == null) {
        transport = {
          Name: data.Item.Name,
          Id: data.Item.ServiceItemId,
          Qty: data.Item.Capacity,
        };
      }
    }
    return transport;
  }, null);
  return transportation;
};

export const AmountGuideBooking = daily => {
  let data = daily.OrderedItems.reduce((result, current) => {
    if (current.ItemType === 'TourGuide') {
      let res = result;
      if (res.length === 0) {
        res.push({
          CityId: current.CityId,
          QtyAmountGuide: current.Qty,
        });
      } else {
        let findCity = res.findIndex(item => item.CityId === current.CityId);
        if (findCity != -1) {
          res[findCity].QtyAmountGuide =
            res[findCity].QtyAmountGuide + current.Qty;
        } else {
          res.push({
            CityId: current.CityId,
            QtyAmountGuide: current.Qty,
          });
        }
      }
      return res;
    }
  }, []);
  return data;
};
