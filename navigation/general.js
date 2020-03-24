import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListAirlineTicket from '../screens/TourTransactionScreen/CustomPackage/components/airlineTicket/ListAirlineTicket';
import ListAirport from '../screens/Common/listAirport';
import ListCity from '../screens/Common/listCity';
import ListCountry from '../screens/Common/listCountry';

const Stack = createStackNavigator();

export default function general({ navigation, route }) {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen name="ListAirlineTicket" component={ListAirlineTicket} />
      <Stack.Screen name="ListAirport" component={ListAirport} />
      <Stack.Screen name="ListCity" component={ListCity} />
      <Stack.Screen name="ListCountry" component={ListCountry} />
    </Stack.Navigator>
  );
}
