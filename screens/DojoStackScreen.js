import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DojoHomeScreen from './DojoHomeScreen'
import IntervalQuizScreen from './IntervalQuizScreen'

const DojoStack = createStackNavigator();

export default function DojoStackScreen() {
  return (
    <DojoStack.Navigator>
      <DojoStack.Screen
        name="Dojo"
        component={DojoHomeScreen}
      />
      <DojoStack.Screen
        name="Interval Training"
        component={IntervalQuizScreen}
      />
    </DojoStack.Navigator>
  );
}
