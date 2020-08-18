import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {appTabNavigator} from './appTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import SettingScreen from '../screens/SettingScreen';
import MyBarterScreen from '../screens/MyBarterScreen'
import NotificationScreen from '../screens/NotificationScreen'

export const AppDrawerNavigator = createDrawerNavigator({
    Home:{
        screen:appTabNavigator
    },
    Setting:{
        screen : SettingScreen
    },
    MyBarters:{
        screen : MyBarterScreen
    },
    Notifications:{
        screen:NotificationScreen
    }
    },
    {
        contentComponent:CustomSideBarMenu
    },
    {
        intialRouteName:'home'
})