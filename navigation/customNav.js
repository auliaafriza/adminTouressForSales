import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CustomPackageOption
  from '../screens/TourTransactionScreen/CustomPackage/CustomPackageOption';
import RoomAllocation
  from '../screens/TourTransactionScreen/CustomPackage/RoomAllocation';
import AccommodationSummary
  from '../screens/TourTransactionScreen/CustomPackage/AccommodationSummary';
const Stack = createStackNavigator ();

export default function customNav({navigation, route}) {
  return (
    <Stack.Navigator
      headerMode="screen"
      initialRouteName="CustomPackageOptionStack"
    >
      <Stack.Screen
        name="CustomPackageOptionStack"
        component={CustomPackageOption}
      />
      <Stack.Screen name="RoomAllocation" component={RoomAllocation} />
      <Stack.Screen
        name="AccommodationSummary"
        component={AccommodationSummary}
      />
    </Stack.Navigator>
  );
}
