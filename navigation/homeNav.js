import * as React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import LinksScreen from '../screens/LoginScreen/LoginScreen';
import HomeIcon from './../assets/Icon/home.png';
import TicketIcon from './../assets/Icon/my_booking.png';
import MyAccountIcon from './../assets/Icon/account.png';
import styles from './styles';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({navigation, route}) {
  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      headerMode="none"
      tabBarOptions={{
        activeTintColor: '#38AF95',
        inactiveTintColor: '#efefef',
        style: {
          backgroundColor: '#252525',
          position: 'absolute',
          paddingBottom: 5,
          left: 0,
          right: 0,
          bottom: 0,
          height: 65,
          shadowColor: '#d3d3d3',
          shadowOffset: {
            width: 5,
            height: 5,
          },
          shadowRadius: 10,
          shadowOpacity: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 0,
          elevation: 13,
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({focused}) => (
            <Image
              source={HomeIcon}
              resizeMode="contain"
              style={[
                styles.image20,
                {tintColor: focused ? '#38AF95' : '#efefef'},
              ]}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="MyBooking"
        component={LinksScreen}
        options={{
          title: 'My Booking',
          tabBarIcon: ({focused}) => (
            <Image
              source={TicketIcon}
              resizeMode="contain"
              style={[
                styles.image20,
                {tintColor: focused ? '#38AF95' : '#efefef'},
              ]}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Links"
        component={LinksScreen}
        options={{
          title: 'My Account',
          tabBarIcon: ({focused}) => (
            <Image
              source={MyAccountIcon}
              resizeMode="contain"
              style={[
                styles.image20,
                {tintColor: focused ? '#38AF95' : '#efefef'},
              ]}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
