import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ListAccomodation
  from '../screens/TourTransactionScreen/CustomPackage/components/masterData/listAccomodation';

const Stack = createStackNavigator ();

export default function masterDataNav({navigation, route}) {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen name="ListAccomodation" component={ListAccomodation} />
    </Stack.Navigator>
  );
}
