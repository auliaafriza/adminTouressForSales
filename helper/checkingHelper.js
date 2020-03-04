import disabillity_access from '../assets/Icon/disabillity_access.png';
import transfer from '../assets/Icon/transfer.png';
import ballroom from '../assets/Icon/ballroom.png';
import bar from '../assets/Icon/bar.png';
import beachclub from '../assets/Icon/beachclub.png';
import fitness_center from '../assets/Icon/fitness_center.png';
import dining_in_villa from '../assets/Icon/dining_in_villa.png';
import jacuzzi from '../assets/Icon/jacuzzi.png';
import kids_club from '../assets/Icon/kids_club.png';
import lounge from '../assets/Icon/lounge.png';
import meeting_room from '../assets/Icon/meeting_room.png';
import night_life from '../assets/Icon/night_life.png';
import playground from '../assets/Icon/playground.png';
import private_beach from '../assets/Icon/private_beach.png';
import parking from '../assets/Icon/parking.png';
import swimmingpool from '../assets/Icon/swimmingpool.png';
import restaurant_black from '../assets/Icon/restaurant_black.png';
import tennis_court from '../assets/Icon/tennis_court.png';
import water_park from '../assets/Icon/water_park.png';
import wi_fi from '../assets/Icon/wi_fi.png';
import beach_front from '../assets/Icon/beach_front.png';
import city_center from '../assets/Icon/city_center.png';
import cliff from '../assets/Icon/cliff.png';
import jungle from '../assets/Icon/jungle.png';
import mountain from '../assets/Icon/mountain.png';
import near_beach from '../assets/Icon/near_beach.png';
import paddy_field from '../assets/Icon/paddy_field.png';
import river from '../assets/Icon/river.png';
import tropical_garden from '../assets/Icon/tropical_garden.png';
import vilage from '../assets/Icon/vilage.png';

export const isSales = RoleUser => {
  let Roles = RoleUser.filter(item => item == 'Package Sales');
  if (Roles.length > 0) return true;
  else return false;
};

export const isCustomerAdmin = RoleUser => {
  let Roles = RoleUser.filter(item => item == 'Customer Admin');
  if (Roles.length > 0) return true;
  else return false;
};

export const handleFilterImagePrimary = data => {
  let dataFilter = data.filter(item => item.IsPrimaryImage != false);
  let nullData = '';
  if (dataFilter.length != 0) return dataFilter[0].ImageUrl;
  else nullData;
};

export const isDurationFromText = data => {
  let dataDuration = data.split(' ');
  let result = dataDuration.filter(item => {
    if (
      item.slice(0, 1).toLowerCase() != 'h' &&
      item.slice(0, 1).toLowerCase() != '' &&
      item.slice(0, 1).toLowerCase() != 'm'
    ) {
      return true;
    }
    return false;
  });
  if (result.length > 0) return parseInt(result[0]);
  else return 0;
};

export const facilitiesAccommodation = data => {
  if (data == 'DISABILITYACCESS') {
    return disabillity_access;
  } else if (data == 'AIRPORTTRANSFER' || data == 'SHUTTLE') {
    return transfer;
  } else if (data == 'BALLROOM') {
    return ballroom;
  } else if (data == 'BAR') {
    return bar;
  } else if (data == 'BEACHCLUB') {
    return beachclub;
  } else if (data == 'FITNESSCENTRE' || data == 'GYM') {
    return fitness_center;
  } else if (data == 'INVILLADINING') {
    return dining_in_villa;
  } else if (data == 'JACUZZI' || data == 'SAUNA' || data == 'SPA') {
    return jacuzzi;
  } else if (data == 'KIDSCLUB') {
    return kids_club;
  } else if (data == 'LOUNGE') {
    return lounge;
  } else if (data == 'MEETINGROOMS') {
    return meeting_room;
  } else if (data == 'NIGHTLIFE') {
    return night_life;
  } else if (data == 'PLAYGROUND') {
    return playground;
  } else if (data == 'PRIVATEBEACH') {
    return private_beach;
  } else if (data == 'PRIVATEPARKINGAREA' || data == 'PUBLICPARKINGAREA') {
    return parking;
  } else if (data == 'PRIVATEPOOL' || data == 'SWIMMINGPOOL') {
    return swimmingpool;
  } else if (data == 'RESTAURANT') {
    return restaurant_black;
  } else if (data == 'TENNISCOURT') {
    return tennis_court;
  } else if (data == 'WATERPARK') {
    return water_park;
  } else if (data == 'WIFI') {
    return wi_fi;
  }
};

export const locationAccommodation = data => {
  if (data == 'BEACHFRONT') {
    return beach_front;
  } else if (data == 'CITYCENTER') {
    return city_center;
  } else if (data == 'CLIFF') {
    return cliff;
  } else if (data == 'JUNGLE') {
    return jungle;
  } else if (data == 'NEARMOUNTAIN') {
    return mountain;
  } else if (data == 'NEARBEACH') {
    return near_beach;
  } else if (data == 'PADDYFIELD') {
    return paddy_field;
  } else if (data == 'RIVER') {
    return river;
  } else if (data == 'TROPICALGARDEN') {
    return tropical_garden;
  } else if (data == 'VILLAGE') {
    return vilage;
  }
};

export const findName = (data, value) => {
  let result = data.find(item => item.Id === value);
  return result ? result.Name : '';
};
