import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomPackageOption from '../screens/TourTransactionScreen/CustomPackage/CustomPackageOption';
import RoomAllocation from '../screens/TourTransactionScreen/CustomPackage/RoomAllocation';
import AccommodationSummary from '../screens/TourTransactionScreen/CustomPackage/AccommodationSummary';
import TourOperatorList from '../screens/TourTransactionScreen/CustomPackage/components/operatorList/operatorList';
// import TourSummaryCustomReady from "../screens/TourTransactionScreen/TourSummary/tourSummaryCustomReady";
const Stack = createStackNavigator();

export default function customNav({ navigation, route }) {
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
      <Stack.Screen name="TourOperatorList" component={TourOperatorList} />
      {/* <Stack.Screen
        name="TourSummaryCustomReady"
        component={TourSummaryCustomReady}
      /> */}
      <Stack.Screen
        name="TourSummaryCustomReady"
        component={TourSummaryCustomReady}
      />
    </Stack.Navigator>
  );
}
