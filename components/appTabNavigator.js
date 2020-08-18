import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from 'react-native-tabs';
import HomeScreen from '../screens/HomeScreen';
import ExchangeScreen from '../screens/ExchangeScreen';

export const appTabNavigator=createBottomTabNavigator({
   Home:{
       screen:HomeScreen,
       navigatonOptions:{
           tabBarIcon:<Image source={require("../assets/Home-icon.png")} style={{width:20,height:20}}/>,
           tabBarLabel:"Home"
       }
       },
       Exchange:{
           screen:ExchangeScreen,
           navigatonOptions:{
               tabBarIcon:<Image source={require("../assets/exchange-icon.png")} style={{width:20,height:20}}/>,
               tabBarLabel:"Exchange"
           }
       }
})