import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListScreen from "./seriesNav";
import Home from "./homeNav";
import DetailSeriesPackage from "../screens/PackageDetailScreen/PackageDetail";
import CustomPackageOption from "../screens/TourTransactionScreen/CustomPackage/CustomPackageOption";
import RoomAllocation from "../screens/TourTransactionScreen/CustomPackage/RoomAllocation";
import AccommodationSummary from "../screens/TourTransactionScreen/CustomPackage/AccommodationSummary";
import ListAirlineTicket from "../screens/TourTransactionScreen/CustomPackage/components/airlineTicket/ListAirlineTicket";
import listAirport from "../screens/Common/listAirport";
const Stack = createStackNavigator();

export default function seriesNav({ navigation, route }) {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PackageList" component={ListScreen} />
      <Stack.Screen name="PackagesDetail" component={DetailSeriesPackage} />
      <Stack.Screen
        name="CustomPackageOption"
        component={CustomPackageOption}
      />
      <Stack.Screen name="roomAllocation" component={RoomAllocation} />
      <Stack.Screen
        name="AccommodationSummary"
        component={AccommodationSummary}
      />
      <Stack.Screen name="ListAirlineTicket" component={ListAirlineTicket} />
      <Stack.Screen name="ListAirport" component={listAirport} />
    </Stack.Navigator>
  );
}
