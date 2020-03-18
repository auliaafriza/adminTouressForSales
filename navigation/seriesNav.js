import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ListScreen from '../screens/PackageListScreen/PackageList';
import DetailSeriesPackage from '../screens/PackageDetailScreen/PackageDetail';
import SeriesOptions from '../screens/TourTransactionScreen/SeriesPackage/SeriesPackageBooking';
import GuestList from '../screens/TourTransactionScreen/GuestList/guestList';

const Stack = createStackNavigator();

export default function seriesNav({navigation, route}) {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen name="PackageList" component={ListScreen} />
      <Stack.Screen name="PackagesDetail" component={DetailSeriesPackage} />
      <Stack.Screen name="SeriesOptions" component={SeriesOptions} />
      <Stack.Screen name="GuestList" component={GuestList} />
    </Stack.Navigator>
  );
}
