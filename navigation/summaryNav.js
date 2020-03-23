import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TourSummaryCustomReady from '../screens/TourTransactionScreen/TourSummary/tourSummaryCustomReady';
import SpecialAdjusmentDetail from '../screens/TourTransactionScreen/TourSummary/components/specialAdjusmentDetail/specialAdjusmentDetail';
import TourSummarySeries from '../screens/TourTransactionScreen/TourSummary/tourSummarySeries';

const Stack = createStackNavigator();

export default function summaryNav({ navigation, route }) {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="TourSummaryCustomReady"
        component={TourSummaryCustomReady}
      />
      <Stack.Screen
        name="SpecialAdjusmentDetail"
        component={SpecialAdjusmentDetail}
      />
      <Stack.Screen name="TourSummarySeries" component={TourSummarySeries} />
    </Stack.Navigator>
  );
}
