import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ReadyPackageOption from '../screens/TourTransactionScreen/ReadyPackage/ReadyPackageOption';

const Stack = createStackNavigator();

export default function readyNav({ navigation, route }) {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="ReadyPackageOption" component={ReadyPackageOption} />
    </Stack.Navigator>
  );
}
