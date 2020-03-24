import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListAirlineTicket from '../screens/TourTransactionScreen/CustomPackage/components/airlineTicket/ListAirlineTicket';
import ListAirport from '../screens/Common/listAirport';
import ListCity from '../screens/Common/listCity';
import ListCountry from '../screens/Common/listCountry';

import { Icon } from '../components/icon';
import {
  headerStyle,
  headerStyleNoShadow,
  headerTitleContainerStyle,
  headerTitleStyle,
} from '../helper/helper';

const Stack = createStackNavigator();

export default function general({ navigation, route }) {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="ListAirlineTicket"
        component={ListAirlineTicket}
        options={{
          title: 'Flight',
          headerStyle: headerStyle,
          headerTitleStyle: headerTitleStyle,
          headerTitleContainerStyle: headerTitleContainerStyle,
          headerLeft: () => (
            <Icon type="headerleft" onPress={() => navigation.pop()} />
          ),
        }}
      />
      <Stack.Screen
        name="ListAirport"
        component={ListAirport}
        options={{
          title: 'Airport',
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
        name="ListCity"
        component={ListCity}
        options={{
          title: 'City',
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
        name="ListCountry"
        component={ListCountry}
        options={{
          title: 'Country',
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
    </Stack.Navigator>
  );
}
