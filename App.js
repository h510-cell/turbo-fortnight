import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import WelcomeScreen from './screens/WelcomeScreen';
import {AppDrawerNavigator} from  './components/AppDrawerNavigator';
import {appTabNavigator} from './components/appTabNavigator'
export default class App  extends React.Component() {
  render(){
  return (
    <AppContainer/>
  );
}
}

const switchNavigator=createSwitchNavigator({
 WelcomeScreen:{screen:WelcomeScreen},
 Drawer:{screen:AppDrawerNavigator},
 BottomTab:{screen:appTabNavigator}
})

const AppContainer = createAppContainer(switchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
