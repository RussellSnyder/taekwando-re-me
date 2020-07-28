import React from 'react';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import DojoHomeScreen from './DojoHomeScreen'
import DojoFreePlayScreen from './DojoFreePlayScreen'
import DojoTrainingsScreen from './DojoTrainingsScreen'
import DojoTrainingScreen from './DojoTrainingScreen'
import DojoChallengesScreen from './DojoChallengesScreen'
import DojoChallengeScreen from './DojoChallengeScreen'
import DojoChallengeCompleteScreen from './DojoChallengeCompleteScreen'
import SettingsScreen from './SettingsScreen'
import SettingsButton from '../components/SettingsButton'

import SCREENS from './screens'

const DojoStack = createStackNavigator();

const headingButtonRight = ({ navigation }) => ({
  headerRight: () => <SettingsButton navigation={navigation} />,
})

export default function DojoStackScreen() {
  return (
    <DojoStack.Navigator
      // initialRouteName={SCREENS.DOJO_CHALLENGE_COMPLETE}
    >
      <DojoStack.Screen
        options={headingButtonRight}
        name={SCREENS.DOJO_HOME}
        component={DojoHomeScreen}

      />
      <DojoStack.Screen
        options={headingButtonRight}
        name={SCREENS.DOJO_FREE_PLAY}
        component={DojoFreePlayScreen}
      />
      <DojoStack.Screen
        name={SCREENS.DOJO_TRAINING}
        component={DojoTrainingScreen}
      />
      <DojoStack.Screen
        options={headingButtonRight}
        name={SCREENS.DOJO_TRAININGS}
        component={DojoTrainingsScreen}
      />
      <DojoStack.Screen
        options={headingButtonRight}
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
      <DojoStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
        }}
      />

    </DojoStack.Navigator>
  );
}
