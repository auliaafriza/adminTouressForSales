import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TourSummaryCustomReady from '../screens/TourTransactionScreen/TourSummary/tourSummaryCustomReady';
import SpecialAdjusmentDetail from '../screens/TourTransactionScreen/TourSummary/components/specialAdjusmentDetail/specialAdjusmentDetail';
import TourSummarySeries from '../screens/TourTransactionScreen/TourSummary/tourSummarySeries';
import { Icon } from '../components/icon';
import {
  headerStyle,
  headerTitleContainerStyle,
  headerStyleNoShadow,
  headerTitleStyle,
} from '../helper/helper';
const Stack = createStackNavigator();

export default function summaryNav({ navigation, route }) {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="TourSummaryCustomReady"
        component={TourSummaryCustomReady}
        options={{
          title: 'Tour Summary',
          headerStyle: headerStyle,
          headerTitleStyle: headerTitleStyle,
          headerTitleContainerStyle: headerTitleContainerStyle,
          headerLeft: () => (
            <Icon type="headerleft" onPress={() => navigation.pop()} />
          ),
        }}
      />
      <Stack.Screen
        name="SpecialAdjusmentDetail"
        component={SpecialAdjusmentDetail}
        options={{
          title: 'Spesial Adjusment',
          headerStyle: headerStyle,
          headerTitleStyle: headerTitleStyle,
          headerTitleContainerStyle: headerTitleContainerStyle,
          headerLeft: () => (
            <Icon type="headerleft" onPress={() => navigation.pop()} />
          ),
        }}
      />
      <Stack.Screen
        name="TourSummarySeries"
        component={TourSummarySeries}
        options={{
          title: 'Tour Summary',
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
