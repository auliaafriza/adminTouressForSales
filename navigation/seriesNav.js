import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ListScreen from '../screens/PackageListScreen/PackageList';

const Stack = createStackNavigator();

export default function seriesNav({navigation, route}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SeriesPackagesList" component={ListScreen} />
    </Stack.Navigator>
  );
}
