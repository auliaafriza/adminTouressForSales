import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ListScreen from './seriesNav';
import Home from './homeNav';

const Stack = createStackNavigator();

export default function seriesNav({navigation, route}) {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SeriesPackagesList" component={ListScreen} />
    </Stack.Navigator>
  );
}
