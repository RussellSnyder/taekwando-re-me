import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ButtonGroup, Text, Button } from 'react-native-elements'

import LEVELS from '../utils/difficulty-levels'

import {
  updateDojo,
  createChallenge,
} from '../slices/DojoSlice'

import SCREENS from './screens'

export default function DojoChallengeScreen({ navigation }) {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.levelContainer}>
        {Object.entries(LEVELS).map(([key, {label, backgroundColor, textColor }]) => {
          return <Button
            key={label}
            title={label}
            titleStyle={{
              color: textColor,
              fontWeight: 'bold'
            }}
            buttonStyle={{ 
              backgroundColor,
              alignSelf: 'stretch',
            }}
            onPress={() => {
              dispatch(updateDojo({ level: key }))
              dispatch(createChallenge())              
              navigation.navigate(SCREENS.DOJO_CHALLENGE)
            }}
          />
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between'

  },
  levelContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between'
  }
});