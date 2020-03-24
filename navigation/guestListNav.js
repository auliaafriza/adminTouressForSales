import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GuestList from '../screens/TourTransactionScreen/GuestList/guestList';
import GuestDetail from '../screens/TourTransactionScreen/GuestList/guestDetail';

import { Icon } from '../components/icon';
import {
  headerStyle,
  headerTitleContainerStyle,
  headerTitleStyle,
} from '../helper/helper';
const Stack = createStackNavigator();

export default function guestListNav({ navigation, route }) {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="GuestList"
        component={GuestList}
        options={{
          title: 'Guest List',
          headerStyle: headerStyle,
          headerTitleStyle: headerTitleStyle,
          headerTitleContainerStyle: headerTitleContainerStyle,
          headerLeft: () => (
            <Icon type="headerleft" onPress={() => navigation.pop()} />
          ),
        }}
      />
      <Stack.Screen
        name="GuestDetail"
        component={GuestDetail}
        options={{
          title: 'Guest Detail',
          headerStyle: headerStyle,
          headerTitleStyle: headerTitleStyle,
          headerTitleContainerStyle: headerTitleContainerStyle,
          headerLeft: () => (
            <Icon type="headerleft" onPress={() => navigation.pop()} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
