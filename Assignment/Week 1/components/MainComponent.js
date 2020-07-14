import React from "react";
import { View, Platform, StatusBar } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Menu from "./MenuComponent";
import DishDetail from './DishDetailComponent';
import HomeComponent from './HomeComponent';
import ContactComponent from './ContactComponent';
import AboutComponent from './AboutComponent';

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
        <MenuNavigator.Screen name='Menu' component={Menu} />
        
        <MenuNavigator.Screen name='DishDetail' component={DishDetail}
          options={{ title: 'Dish Details'}} />
    </MenuNavigator.Navigator>
  )
}

const HomeNavigator = createStackNavigator();
const HomeNavigatorScreen = () => {
  return(
    <HomeNavigator.Navigator initialRouteName='Home'
      screenOptions={HeaderOptions}>
        <HomeNavigator.Screen name='Home' component={HomeComponent} />
    </HomeNavigator.Navigator>
  )
}

const ContactNavigator = createStackNavigator();
const ContactNavigatorScreen = () => {
  return(
    <ContactNavigator.Navigator initialRouteName='Contact Us'
      screenOptions={HeaderOptions}>
        <ContactNavigator.Screen name='Contact Us' component={ContactComponent} />
    </ContactNavigator.Navigator>
  )
}

const AboutNavigator = createStackNavigator();
const AboutNavigatorScreen = () => {
  return(
    <AboutNavigator.Navigator initialRouteName='About Us'
      screenOptions={HeaderOptions}>
        <AboutNavigator.Screen name='About Us' component={AboutComponent} />
    </AboutNavigator.Navigator>
  )
}

const MainNavigator = createDrawerNavigator();
const MainNavigatorDrawer = () => {
  return(
    <MainNavigator.Navigator initialRouteName='Home'
      drawerStyle={{backgroundColor: '#D1C4E9'}}>
        <MainNavigator.Screen name='Home' component={HomeNavigatorScreen} />
        <MainNavigator.Screen name='About Us' component={AboutNavigatorScreen} />
        <MainNavigator.Screen name='Menu' component={MenuNavigatorScreen} />
        <MainNavigator.Screen name='Contact Us' component={ContactNavigatorScreen} />
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
