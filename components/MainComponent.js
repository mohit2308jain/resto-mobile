import React from "react";
import { View, Platform, StatusBar } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Menu from "./MenuComponent";
import DishDetail from './DishDetailComponent';
import HomeComponent from './HomeComponent';

const MenuNavigator = createStackNavigator();
const MyStack = () => {
  return(
    <MenuNavigator.Navigator initialRouteName= 'Menu'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#512DA8'
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          color: '#FFF'
        }
      }}>
        <MenuNavigator.Screen name='Menu' component={Menu}
          options={{ title: 'Menu' }} />
        
        <MenuNavigator.Screen name='DishDetail' component={DishDetail}
          options={{ title: 'Dish Details'}} />
      </MenuNavigator.Navigator>
  )
}

class Main extends React.Component {

  render() {
    return(
      <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0: StatusBar.currentHeight }}>
          <NavigationContainer>
            <MyStack />
          </NavigationContainer>
      </View>
    )
  }
}

export default Main;
