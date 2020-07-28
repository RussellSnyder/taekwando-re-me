import React from 'react';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from '@expo/vector-icons/Ionicons';

import DojoStackScreen from './screens/DojoStackScreen'
import ProfileStackScreen from './screens/ProfileStackScreen'
import { store, persistor } from './store'
import SCREENS from './screens/screens'
import BadgeOverlay from './components/BadgeOverlay'
import ChallengeUnlockOverlay from './components/ChallengeUnlockOverlay'

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator
            // initialRouteName={SCREENS.PROFILE}
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Dojo') {
                  iconName = focused
                    ? 'ios-musical-notes'
                    : 'ios-musical-notes';
                } else if (route.name === 'Profile') {
                  iconName = focused ? 'ios-contact' : 'ios-contact';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}
          >
            <Tab.Screen name="Dojo" component={DojoStackScreen} />
            <Tab.Screen name="Profile" component={ProfileStackScreen} />
          </Tab.Navigator>
        </NavigationContainer>
        <BadgeOverlay />
        <ChallengeUnlockOverlay />
      </PersistGate>
    </Provider>
  );
}