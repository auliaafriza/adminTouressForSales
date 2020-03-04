export class initialAdditionalService {
  constructor(Data, Country) {
    this.Amount = Data.Amount;
    this.CurrencyId = Data.Currency;
    this.AdditionalServiceCountryId = Data.Id;
    this.Quantity = Data.Qty;
    this.Type = Data.Type;
    this.IsMandatory = Data.IsMandatory ? Data.IsMandatory : false;
    this.IsInfantCount = Data.IsInfantCount ? Data.IsInfantCount : false;
    this.OriginalCountries = Country;
  }
}

export const initialAdditionalServiceMandatory = {
  Amount: '',
  CurrencyId: '',
  AdditionalServiceCountryId: '',
  Quantity: 0,
  IsMandatory: '',
  Type: '',
  IsInfantCount: '',
  OriginalCountries: [],
};

export const checkDestinationSP = (dataSP, dataCountry) => {
  let Destionation = [];
  dataSP.map(obj => {
    if (obj.AccommodationSummary !== undefined) {
      let result = dataCountry.find(item => item.Id === obj.City.Id);
      if (result != undefined) {
        Destionation.push(result.Country);
      }
    }
  });
  Destionation = getCityDestination(Destionation);
  return Destionation;
};

export const getCityDestination = data => {
  let dataNew = data.reduce((result, current) => {
    let res = result;
    if (res.length === 0) {
      res.push({
        Origin: 'DEF',
        Destination: current.Id,
      });
    } else {
      let findCity = res.findIndex(item => item.Id === current.Id);
      if (findCity == -1) {
        res.push({
          Origin: res[res.length - 1].Origin,
          Destination: current.Id,
        });
      }
    }
    return res;
  }, []);
  return dataNew;
};

export const findAdditionalService = (data, Id, type) => {
  let Data = data ? data.find(item => item.Id === Id) : null;
  return Data
    ? type == 'Nama'
      ? Data.AdditionalServicesName
      : type == 'Qty'
      ? findPriceAdditional(Data.OriginalCountries, type)
      : type == 'Country'
      ? Data.OriginalCountries
      : findPriceAdditional(Data.OriginalCountries, type)
    : '';
};

export const findPriceAdditional = (data, type) => {
  let Data = data.length > 1 ? data.find(item => item.Value === 'DEF') : data;
  return type == 'Qty' ? Data.Amount : Data.Currency;
};

export const setAdditionalService = (data, Guest) => {
  return data.reduce((res, cur) => {
    let GuestQty = cur.IsInfantCount
      ? Guest.Adult + Guest.Child + Guest.Infant
      : Guest.Adult + Guest.Child;
    let initData = { ...initialAdditionalServiceMandatory };
    initData.Amount = cur.OriginalCountries
      ? cur.OriginalCountries[0].Amount
      : '';
    initData.CurrencyId = cur.OriginalCountries
      ? cur.OriginalCountries[0].Currency
      : '';
    initData.AdditionalServiceCountryId = cur.Id;
    initData.IsMandatory = cur.IsMandatory ? cur.IsMandatory : false;
    initData.Quantity = cur.IsMandatory ? GuestQty : cur.Quantity;
    initData.Type = cur.AdditionalServiceType
      ? cur.AdditionalServiceType.Value
      : '';
    initData.IsInfantCount = cur.IsInfantCount ? cur.IsInfantCount : false;
    initData.OriginalCountries = cur.OriginalCountries
      ? cur.OriginalCountries
      : [];
    res.push(initData);
    return res;
  }, []);
};

export const filterTypeAdditionalService = data => {
  let res = [];
  data.map(itemCurrent => {
    if (res.length === 0) {
      res.push(itemCurrent);
    } else {
      let findType = res.findIndex(
        item =>
          item.AdditionalServiceType.Value ===
          itemCurrent.AdditionalServiceType.Value
      );
      if (findType == -1) {
        res.push(itemCurrent);
      }
    }
  });
  return res;
};
