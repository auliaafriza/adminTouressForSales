import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GuestList from '../screens/TourTransactionScreen/GuestList/guestList';
import GuestDetail from '../screens/TourTransactionScreen/GuestList/guestDetail';

const Stack = createStackNavigator();

export default function guestListNav({ navigation, route }) {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen name="GuestList" component={GuestList} />
      <Stack.Screen name="GuestDetail" component={GuestDetail} />
    </Stack.Navigator>
  );
}
