import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from '../screens/PackageListScreen/PackageList';
import DetailSeriesPackage from '../screens/PackageDetailScreen/PackageDetail';
import SeriesOptions from '../screens/TourTransactionScreen/SeriesPackage/SeriesPackageBooking';
import DetailAccommodation from '../screens/PackageDetailScreen/DetailAccommodation';
import { Icon } from '../components/icon';
import {
  headerStyleNoShadow,
  headerTitleContainerStyle,
  headerTitleStyle,
} from '../helper/helper';
const Stack = createStackNavigator();

export default function seriesNav({ navigation, route }) {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="PackageList"
        component={ListScreen}
        options={{
          title: 'Series Packages List',
          headerStyle: headerStyleNoShadow,
          headerTitleStyle: headerTitleStyle,
          headerTitleContainerStyle: headerTitleContainerStyle,
          headerLeft: () => (
            <Icon type="headerleft" onPress={() => navigation.pop()} />
          ),
          headerRight: () => (
            <Icon
              type="headerright"
              onPress={() => navigation.navigate('Home')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="PackagesDetail"
        component={DetailSeriesPackage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SeriesOptions"
        component={SeriesOptions}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailAccommodation"
        component={DetailAccommodation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
