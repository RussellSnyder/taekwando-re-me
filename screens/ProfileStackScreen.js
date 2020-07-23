import React from 'react';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import ProfileScreen from './ProfileHomeScreen'
import SettingsScreen from './SettingsScreen'
import SettingsButton from '../components/SettingsButton'
import SCREENS from './screens';

const ProfileStack = createStackNavigator();
  
export default function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      // initialRouteName={SCREENS.SETTINGS}
    >
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation, route }) => ({
          headerRight: () => <SettingsButton navigation={navigation} />,
        })}
      />
      <ProfileStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
        }}
      />
    </ProfileStack.Navigator>
  );
}