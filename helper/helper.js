export function isEmailValid(email) {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(email) == 0;
}

export function convertTimetoString(value) {
  let hours = Math.floor(value / 3600);
  let mins = Math.round((value % 3600) / 60);

  if (hours != 0 && mins != 0) return hours + ' Hours ' + mins + ' Minutes';
  else if (hours == 0 && mins != 0) return mins + ' Minutes';
  else if (hours != 0 && mins == 0) return hours + ' Hours';
}

export function convertRoundPrice(value, currency) {
  let res = value / 1000;
  let mod = value % 1000;
  if (currency == 'IDR') {
    if (value >= 1000) {
      if (res >= 1 && mod != 0) {
        let data = Number.parseFloat(res).toFixed(2);
        return (
          data
            .toLocaleString(currency)
            .split(',')
            .join('') + ' K'
        );
      } else if (res >= 1 && mod == 0) {
        return (
          res
            .toLocaleString(currency)
            .split(',')
            .join('') + ' K'
        );
      } else
        return res
          .toLocaleString(currency)
          .split(',')
          .join('');
    } else return value;
  } else return value;
}

export function commaSeparateNumber(val) {
  val = val.toString();
  while (/(\d+)(\d{3})/.test(val)) {
    val = val.replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
  }
  return val;
}

export function splitNumber(val) {
  let hasilSplit = commaSeparateNumber(val)
    .split(',')
    .join('.');
  return hasilSplit;
}

export function stringAllocation(data) {
  let alloc = [];
  if (data.SharingRoomQty + data.ChildSharingRoomQty != 0)
    alloc.push(
      data.SharingRoomQty + data.ChildSharingRoomQty + ' Sharing Room'
    );

  if (data.SingleRoomQty + data.SingleRoomQty != 0)
    alloc.push(data.SingleRoomQty + data.ChildSingleRoomQty + ' Single Room');

  if (data.ExtraBedQty + data.ChildExtraBedQty != 0)
    alloc.push(data.ExtraBedQty + data.ChildExtraBedQty + ' Extra Bed');

  if (data.SharingBedQty != 0) alloc.push(data.SharingBedQty + ' Sharing Bed');

  if (data.BabyCrib != 0) alloc.push(data.BabyCrib + ' Baby Crib');

  if (data.NoBed != 0) alloc.push(data.NoBed + ' No Bed');

  return alloc.join();
}

export const headerStyle = {
  backgroundColor: 'white',
  borderBottomColor: 'white',
  height: 90,
  shadowColor: '#ccc',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.3,
  shadowRadius: 10,
  elevation: 7,
  width: '100%',
};

export const headerStyleNoShadow = {
  backgroundColor: 'white',
  elevation: 0,
  borderBottomColor: 'white',
  height: 90,
  width: '100%',
};

export const headerTitleStyle = {
  color: '#252525',
  textAlign: 'center',
  fontSize: 16,
  padding: 10,
};

export const headerTitleContainerStyle = {
  width: '100%',
  alignItems: 'flex-start',
  marginLeft: '10%',
};
