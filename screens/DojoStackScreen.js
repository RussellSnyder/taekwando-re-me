import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DojoHomeScreen from './DojoHomeScreen'
import DojoFreePlayScreen from './DojoFreePlayScreen'
import DojoTrainingScreen from './DojoTrainingScreen'
import DojoChallengesScreen from './DojoChallengesScreen'
import DojoChallengeScreen from './DojoChallengeScreen'
import DojoChallengeCompleteScreen from './DojoChallengeCompleteScreen'

import SCREENS from './screens'

const DojoStack = createStackNavigator();

export default function DojoStackScreen() {
  return (
    <DojoStack.Navigator
      // initialRouteName={SCREENS.DOJO_CHALLENGE}
    >
      <DojoStack.Screen
        name={SCREENS.DOJO_HOME}
        component={DojoHomeScreen}
      />
      <DojoStack.Screen
        name={SCREENS.DOJO_FREE_PLAY}
        component={DojoFreePlayScreen}
      />
      <DojoStack.Screen
        name={SCREENS.DOJO_TRAINING}
        component={DojoTrainingScreen}
      />
      <DojoStack.Screen
        name={SCREENS.DOJO_CHALLENGES}
        component={DojoChallengesScreen}
      />
      <DojoStack.Screen
        name={SCREENS.DOJO_CHALLENGE}
        component={DojoChallengeScreen}
      />
      <DojoStack.Screen
        name={SCREENS.DOJO_CHALLENGE_COMPLETE}
        component={DojoChallengeCompleteScreen}
      />
    </DojoStack.Navigator>
  );
}
