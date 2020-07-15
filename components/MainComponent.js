import React from "react";
import { View, Platform, StatusBar, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';

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

const IconForDrawer = ({ name, navigation }) => {
  return(
    <Icon name={name} size={24} color= 'white'
      onPress={() => navigation.toggleDrawer()} />
  )
}

const MenuNavigator = createStackNavigator();
const MenuNavigatorScreen = () => {
  return(
    <MenuNavigator.Navigator initialRouteName= 'Menu'
      screenOptions={HeaderOptions}>
        <MenuNavigator.Screen name='Menu' component={Menu}
          options={({navigation}) => ({
            headerLeft: () => <IconForDrawer name='menu' navigation={navigation} />
          })} />
        
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
        <HomeNavigator.Screen name='Home' component={HomeComponent}
          options={({navigation}) => ({
            headerLeft: () => <IconForDrawer name='menu' navigation={navigation} />
          })} />
    </HomeNavigator.Navigator>
  )
}

const ContactNavigator = createStackNavigator();
const ContactNavigatorScreen = () => {
  return(
    <ContactNavigator.Navigator initialRouteName='Contact Us'
      screenOptions={HeaderOptions}>
        <ContactNavigator.Screen name='Contact Us' component={ContactComponent}
          options={({navigation}) => ({
            headerLeft: () => <IconForDrawer name='menu' navigation={navigation} />
          })} />
    </ContactNavigator.Navigator>
  )
}

const AboutNavigator = createStackNavigator();
const AboutNavigatorScreen = () => {
  return(
    <AboutNavigator.Navigator initialRouteName='About Us'
      screenOptions={HeaderOptions}>
        <AboutNavigator.Screen name='About Us' component={AboutComponent}
          options={({navigation}) => ({
            headerLeft: () => <IconForDrawer name='menu' navigation={navigation} />
          })} />
    </AboutNavigator.Navigator>
  )
}

const CustomDrawerContentComponent = (props) => {
  return(
    <ScrollView>
      <View style={styles.drawerHeader}>
        <View style={{flex: 1}}>
          <Image source={require('./images/logo.png')}
            style={styles.drawerImage} />
        </View>
        
        <View style={{flex: 2}}>
          <Text style={styles.drawerHeaderText}>
            Ristorante Con Fusion
          </Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </ScrollView>
  )
}

const DrawerItemIcons = ({name, tintColor}) => {
  return(
    <Icon name={name} type='font-awesome'
      size={24} color={tintColor} />
  )
}

const MainNavigator = createDrawerNavigator();
const MainNavigatorDrawer = () => {
  return(
    <MainNavigator.Navigator initialRouteName='Home'
      drawerStyle={{backgroundColor: '#D1C4E9'}}
      drawerContent={(props) => <CustomDrawerContentComponent {...props} />}>
        <MainNavigator.Screen name='Home' 
          component={HomeNavigatorScreen}
          options={{
            drawerIcon: ({tintColor}) => (
              <DrawerItemIcons name='home' tintColor={tintColor} />
            )  
           }} />

        <MainNavigator.Screen name='About Us' 
          component={AboutNavigatorScreen}
          options={{
             drawerIcon: ({tintColor}) => (
               <DrawerItemIcons name='address-card' tintColor={tintColor} />
             )  
           }} />

        <MainNavigator.Screen name='Menu' 
          component={MenuNavigatorScreen}
          options={{
             drawerIcon: ({tintColor}) => (
               <DrawerItemIcons name='list' tintColor={tintColor} />
             )  
           }} />

        <MainNavigator.Screen name='Contact Us' 
          component={ContactNavigatorScreen}
          options={{
             drawerIcon: ({tintColor}) => (
               <DrawerItemIcons name='info-circle' tintColor={tintColor} />
             )  
           }} />

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});

export default Main;
