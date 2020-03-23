import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ListAccomodation from '../screens/TourTransactionScreen/CustomPackage/components/masterData/listAccomodation';
import AccomodationDetail from '../screens/TourTransactionScreen/CustomPackage/components/masterData/accomodationDetail';
import HotelAndRoomDetail from '../screens/TourTransactionScreen/CustomPackage/components/masterData/hotelAndRoomDetail';
import AllServices from '../screens/TourTransactionScreen/CustomPackage/components/masterData/allServices';
import AllNearbyLocation from '../screens/TourTransactionScreen/CustomPackage/components/masterData/allNearbyLocation';
import ListExcrution from '../screens/TourTransactionScreen/CustomPackage/components/masterData/listExcrution';
//import ListTransport from '../screens/TourTransactionScreen/CustomPackage/components/masterData/listTransport';
import ExcrutionDetail from '../screens/TourTransactionScreen/CustomPackage/components/masterData/excrutionDetail';
import ListRestaurant from '../screens/TourTransactionScreen/CustomPackage/components/masterData/listRestaurant';
//import ListTransportasiUnit from '../screens/TourTransactionScreen/CustomPackage/components/masterData/listTransportasiUnit';
//import TransportasiUnitDetail from '../screens/TourTransactionScreen/CustomPackage/components/masterData/transportasiUnitDetail';
//import RestaurantDetail from '../screens/TourTransactionScreen/CustomPackage/components/masterData/restaurantDetail';
import MapView from '../screens/TourTransactionScreen/CustomPackage/components/masterData/mapView';

const Stack = createStackNavigator();

export default function masterDataNav({navigation, route}) {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen name="ListAccomodation" component={ListAccomodation} />
      <Stack.Screen name="AccomodationDetail" component={AccomodationDetail} />
      <Stack.Screen name="HotelAndRoomDetail" component={HotelAndRoomDetail} />
      <Stack.Screen name="AllServices" component={AllServices} />
      <Stack.Screen name="AllNearbyLocation" component={AllNearbyLocation} />
      <Stack.Screen name="ListExcrution" component={ListExcrution} />
      {/* <Stack.Screen name="ListTransport" component={ListTransport} /> */}
      <Stack.Screen name="ExcrutionDetail" component={ExcrutionDetail} />
      <Stack.Screen name="ListRestaurant" component={ListRestaurant} />
      {/* <Stack.Screen
        name="ListTransportasiUnit"
        component={ListTransportasiUnit}
      />
      <Stack.Screen
        name="TransportasiUnitDetail"
        component={TransportasiUnitDetail}
      /> */}
      {/* <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} /> */}
      <Stack.Screen name="MapView" component={MapView} />
    </Stack.Navigator>
  );
}
