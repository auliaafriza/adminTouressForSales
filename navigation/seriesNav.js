import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListScreen from "../screens/PackageListScreen/PackageList";
import DetailSeriesPackage from "../screens/PackageDetailScreen/PackageDetail";

const Stack = createStackNavigator();

export default function seriesNav({ navigation, route }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PackageList" component={ListScreen} />
      <Stack.Screen name="PackagesDetail" component={DetailSeriesPackage} />
    </Stack.Navigator>
  );
}
