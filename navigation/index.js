import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListScreen from "./seriesNav";
import Home from "./homeNav";
import DetailSeriesPackage from "../screens/PackageDetailScreen/PackageDetail";

const Stack = createStackNavigator();

export default function seriesNav({ navigation, route }) {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PackageList" component={ListScreen} />
      <Stack.Screen name="PackagesDetail" component={DetailSeriesPackage} />
    </Stack.Navigator>
  );
}
