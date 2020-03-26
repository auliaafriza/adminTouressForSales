import * as React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomPackageOption from '../screens/TourTransactionScreen/CustomPackage/CustomPackageOption';
import RoomAllocation from '../screens/TourTransactionScreen/CustomPackage/RoomAllocation';
import AccommodationSummary from '../screens/TourTransactionScreen/CustomPackage/AccommodationSummary';
import TourOperatorList from '../screens/TourTransactionScreen/CustomPackage/components/operatorList/operatorList';
import TourSchedule from '../screens/TourTransactionScreen/CustomPackage/TourSchedule';

import { Icon } from '../components/icon';
import {
  headerStyle,
  headerStyleNoShadow,
  headerTitleContainerStyle,
  headerTitleStyle,
} from '../helper/helper';

const Stack = createStackNavigator();

export default function customNav({ navigation, route }) {
  return (
    <Stack.Navigator
      headerMode="screen"
      initialRouteName="CustomPackageOptionStack"
    >
      <Stack.Screen
        name="CustomPackageOptionStack"
        component={CustomPackageOption}
        options={{
          headerTitle: (
            <View style={{ width: '100%' }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  textAlign: 'center',
                  color: '#252525',
                  alignSelf: 'center',
                }}
              >
                CUSTOM PACKAGE
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  textAlign: 'center',
                  color: '#ccc',
                  alignSelf: 'center',
                }}
              >
                Customize your own packages
              </Text>
            </View>
          ),
          headerStyle: headerStyleNoShadow,
          headerTitleStyle: headerTitleStyle,
          headerTitleContainerStyle: headerTitleContainerStyle,
          headerLeft: () => (
            <Icon type="headerleft" onPress={() => navigation.pop()} />
          ),
        }}
      />
      <Stack.Screen
        name="RoomAllocation"
        component={RoomAllocation}
        options={{
          title: 'Room Allocation',
          headerStyle: headerStyle,
          headerTitleStyle: headerTitleStyle,
          headerTitleContainerStyle: headerTitleContainerStyle,
          headerLeft: () => (
            <Icon type="headerleft" onPress={() => navigation.pop()} />
          ),
        }}
      />
      <Stack.Screen
        name="AccommodationSummary"
        component={AccommodationSummary}
        options={{
          title: 'Accommodation Summary',
          headerStyle: headerStyle,
          headerTitleStyle: headerTitleStyle,
          headerTitleContainerStyle: headerTitleContainerStyle,
          headerLeft: () => (
            <Icon type="headerleft" onPress={() => navigation.pop()} />
          ),
        }}
      />
      <Stack.Screen
        name="TourOperatorList"
        component={TourOperatorList}
        options={{
          title: 'Choose Tour Operator',
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
        name="TourSchedule"
        component={TourSchedule}
        options={{
          title: 'TourSchedule',
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
