import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from './seriesNav';
import Home from './homeNav';
import DetailSeriesPackage from '../screens/PackageDetailScreen/PackageDetail';
import CustomPackage from './customNav';
import general from './general';
import masterData from './masterDataNav';
import TourSummaryCustomReady from '../screens/TourTransactionScreen/TourSummary/tourSummaryCustomReady';
import SpecialAdjusmentDetail from '../screens/TourTransactionScreen/TourSummary/components/specialAdjusmentDetail/specialAdjusmentDetail';

const Stack = createStackNavigator();

export default function seriesNav({ navigation, route }) {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="screen">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PackageList" component={ListScreen} />
      <Stack.Screen name="PackagesDetail" component={DetailSeriesPackage} />
      <Stack.Screen name="General" component={general} />
      <Stack.Screen name="CustomPackageOption" component={CustomPackage} />
      <Stack.Screen name="masterData" component={masterData} />
      <Stack.Screen
        name="TourSummaryCustomReady"
        component={TourSummaryCustomReady}
      />
      <Stack.Screen
        name="SpecialAdjusmentDetail"
        component={SpecialAdjusmentDetail}
      />
      {/* <Stack.Screen name="ListAirlineTicket" component={ListAirlineTicket} />
      <Stack.Screen name="ListAirport" component={ListAirport} />
      <Stack.Screen name="ListCity" component={ListCity} />
      <Stack.Screen name="ListAccomodation" component={ListAccomodation} /> */}
    </Stack.Navigator>
  );
}
