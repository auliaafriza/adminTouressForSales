import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/LoginScreen/LoginScreen';
import AuthLoadingScreen from '../screens/LoginScreen/AuthLoadingScreen';
import AppNav from './appNav';

const Stack = createStackNavigator();

const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AuthLoading"
        headerMode="none"
        mode="modal"
      >
        <Stack.Screen name="App" component={AppNav} />
        <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
        <Stack.Screen name="Auth" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
