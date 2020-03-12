import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CustomPackageOption from "../screens/TourTransactionScreen/CustomPackage/CustomPackageOption";
import RoomAllocation from "../screens/TourTransactionScreen/CustomPackage/RoomAllocation";
const Stack = createStackNavigator();

export default function customNav({ navigation, route }) {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="CustomPackageOption"
        component={CustomPackageOption}
      />
    </Stack.Navigator>
  );
}
