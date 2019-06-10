import React from 'react';


import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from"../screens/LoginScreen"
import MainTabNavigator from './MainTabNavigator';
import RegisterScreen from'../screens/register';


const AppStack = createStackNavigator({ Main: MainTabNavigator, },
  {
    headerMode: 'none',});


export default createAppContainer(createSwitchNavigator(
  {
    //AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: LoginScreen,
    Register:RegisterScreen,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Auth',
  }
));