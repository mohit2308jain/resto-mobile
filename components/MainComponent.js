import React from "react";
import { View, Platform, StatusBar } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Menu from "./MenuComponent";
import DishDetail from './DishDetailComponent';
import HomeComponent from './HomeComponent';
import Home from "./HomeComponent";

const HeaderOptions = {
  headerStyle: {
      backgroundColor: "#512DA8"
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
      color: "#fff"            
  }
};

const MenuNavigator = createStackNavigator();
const MenuNavigatorScreen = () => {
  return(
    <MenuNavigator.Navigator initialRouteName= 'Menu'
      screenOptions={HeaderOptions}>
        <MenuNavigator.Screen name='Menu' component={Menu}
          options={{ title: 'Menu' }} />
        
        <MenuNavigator.Screen name='DishDetail' component={DishDetail}
          options={{ title: 'Dish Details'}} />
    </MenuNavigator.Navigator>
  )
}

const HomeNavigator = createStackNavigator();
const HomeNavigatorScreen = () => {
  return(
    <HomeNavigator.Navigator initialRouteName='Menu'
      screenOptions={HeaderOptions}>
        <HomeNavigator.Screen name='Home' component={HomeComponent} />
    </HomeNavigator.Navigator>
  )
}

const MainNavigator = createDrawerNavigator();
const MainNavigatorDrawer = () => {
  return(
    <MainNavigator.Navigator initialRouteName='Home'
      drawerStyle={{backgroundColor: '#D1C4E9'}}>
        <MainNavigator.Screen name='Home' component={HomeNavigatorScreen} />
        <MainNavigator.Screen name='Menu' component={MenuNavigatorScreen} />
    </MainNavigator.Navigator>
  )
}

class Main extends React.Component {

  render() {
    return(
      <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0: StatusBar.currentHeight }}>
          <NavigationContainer>
            <MainNavigatorDrawer />
          </NavigationContainer>
      </View>
    )
  }
}

export default Main;
