import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from './seriesNav';
import Home from './homeNav';
import CustomPackage from './customNav';
import general from './general';
import masterData from './masterDataNav';
import Summary from './summaryNav';
import Guest from './guestListNav';
import Ready from './readyNav';

const Stack = createStackNavigator();

export default function seriesNav({ navigation, route }) {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PackageList" component={ListScreen} />
      <Stack.Screen name="General" component={general} />
      <Stack.Screen name="CustomPackageOption" component={CustomPackage} />
      <Stack.Screen name="masterData" component={masterData} />
      <Stack.Screen name="Summary" component={Summary} />
      <Stack.Screen name="Guest" component={Guest} />
      <Stack.Screen name="Ready" component={Ready} />
    </Stack.Navigator>
  );
}
