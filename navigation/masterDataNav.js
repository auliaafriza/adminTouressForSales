import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListAccomodation from '../screens/TourTransactionScreen/CustomPackage/components/masterData/listAccomodation';
import AccomodationDetail from '../screens/TourTransactionScreen/CustomPackage/components/masterData/accomodationDetail';
import HotelAndRoomDetail from '../screens/TourTransactionScreen/CustomPackage/components/masterData/hotelAndRoomDetail';
import AllServices from '../screens/TourTransactionScreen/CustomPackage/components/masterData/allServices';
import AllNearbyLocation from '../screens/TourTransactionScreen/CustomPackage/components/masterData/allNearbyLocation';
import ListExcrution from '../screens/TourTransactionScreen/CustomPackage/components/masterData/listExcrution';
//import ListTransport from '../screens/TourTransactionScreen/CustomPackage/components/masterData/listTransport';
import ExcrutionDetail from '../screens/TourTransactionScreen/CustomPackage/components/masterData/excrutionDetail';
import ListRestaurant from '../screens/TourTransactionScreen/CustomPackage/components/masterData/listRestaurant';
import ListTransportasiUnit from '../screens/TourTransactionScreen/CustomPackage/components/masterData/listTransportasiUnit';
import TransportasiUnitDetail from '../screens/TourTransactionScreen/CustomPackage/components/masterData/transportasiUnitDetail';
import RestaurantDetail from '../screens/TourTransactionScreen/CustomPackage/components/masterData/restaurantDetail';
import MapView from '../screens/TourTransactionScreen/CustomPackage/components/masterData/mapView';
// import ListAccomodation from '../screens/TourTransactionScreen/CustomPackage/components/masterData/listAccomodation';
import ListCustomer from '../screens/Common/listCustomer';
import ListUserCustomer from '../screens/Common/listUserCustomer';
import RegisterCustomer from '../screens/Common/registerCustomer';

import { Icon } from '../components/icon';
import {
  headerStyle,
  headerStyleNoShadow,
  headerTitleContainerStyle,
  headerTitleStyle,
} from '../helper/helper';
const Stack = createStackNavigator();

export default function masterDataNav({ navigation, route }) {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="ListAccomodation"
        component={ListAccomodation}
        options={{
          title: 'Accommodation',
          headerStyle: headerStyleNoShadow,
          headerTitleStyle: headerTitleStyle,
          headerTitleContainerStyle: headerTitleContainerStyle,
          headerLeft: () => (
            <Icon type="headerleft" onPress={() => navigation.pop()} />
          ),
          headerRight: () => (
            <Icon
              type="headerright"
              onPress={() => navigation.navigate('Home')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="AccomodationDetail"
        component={AccomodationDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HotelAndRoomDetail"
        component={HotelAndRoomDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AllServices"
        component={AllServices}
        options={{
          title: 'All Services',
          headerStyle: headerStyle,
          headerTitleStyle: headerTitleStyle,
          headerTitleContainerStyle: headerTitleContainerStyle,
          headerLeft: () => (
            <Icon type="headerleft" onPress={() => navigation.pop()} />
          ),
        }}
      />
      <Stack.Screen
        name="AllNearbyLocation"
        component={AllNearbyLocation}
        options={{
          title: 'All Nearby Location',
          headerStyle: headerStyle,
          headerTitleStyle: headerTitleStyle,
          headerTitleContainerStyle: headerTitleContainerStyle,
          headerLeft: () => (
            <Icon type="headerleft" onPress={() => navigation.pop()} />
          ),
        }}
      />
      <Stack.Screen
        name="ListExcrution"
        component={ListExcrution}
        options={{
          title: 'Excursion',
          headerStyle: headerStyleNoShadow,
          headerTitleStyle: headerTitleStyle,
          headerTitleContainerStyle: headerTitleContainerStyle,
          headerLeft: () => (
            <Icon type="headerleft" onPress={() => navigation.pop()} />
          ),
          headerRight: () => (
            <Icon
              type="headerright"
              onPress={() => navigation.navigate('Home')}
            />
          ),
        }}
      />
      {/* <Stack.Screen name="ListTransport" component={ListTransport} /> */}
      <Stack.Screen
        name="ExcrutionDetail"
        component={ExcrutionDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ListRestaurant"
        component={ListRestaurant}
        options={{
          title: 'Restaurant',
          headerStyle: headerStyleNoShadow,
          headerTitleStyle: headerTitleStyle,
          headerTitleContainerStyle: headerTitleContainerStyle,
          headerLeft: () => (
            <Icon type="headerleft" onPress={() => navigation.pop()} />
          ),
          headerRight: () => (
            <Icon
              type="headerright"
              onPress={() => navigation.navigate('Home')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ListTransportasiUnit"
        component={ListTransportasiUnit}
        options={{
          title: 'Transportation',
          headerStyle: headerStyleNoShadow,
          headerTitleStyle: headerTitleStyle,
          headerTitleContainerStyle: headerTitleContainerStyle,
          headerLeft: () => (
            <Icon type="headerleft" onPress={() => navigation.pop()} />
          ),
          headerRight: () => (
            <Icon
              type="headerright"
              onPress={() => navigation.navigate('Home')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="TransportasiUnitDetail"
        component={TransportasiUnitDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RestaurantDetail"
        component={RestaurantDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MapView"
        component={MapView}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ListCustomer"
        component={ListCustomer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ListUserCustomer"
        component={ListUserCustomer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RegisterCustomer"
        component={RegisterCustomer}
        options={{
          title: 'Register Customer',
          headerStyle: headerStyle,
          headerTitleStyle: headerTitleStyle,
          headerTitleContainerStyle: headerTitleContainerStyle,
          headerLeft: () => (
            <Icon type="headerleft" onPress={() => navigation.pop()} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
