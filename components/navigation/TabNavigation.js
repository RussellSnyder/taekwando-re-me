import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import DojoScreen from '../../screens/DojoHomeScreen'
import ProfileScreen from '../../screens/ProfileHomeScreen'

const Tab = createBottomTabNavigator();

const TabNavigation = ({ currentScreen }) => {
  return (
    <Tab.Navigator
      animationEnabled={true}
      initialRouteName="Profile"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dojo') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Dojo"
        component={DojoScreen}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation, route }) => ({
          headerTitle: props => <Text >Jazz</Text>,
          headerRight: () => <SettingsButton navigation={navigation} />,
        })}
      />
    </Tab.Navigator>
  )
}

export default TabNavigation