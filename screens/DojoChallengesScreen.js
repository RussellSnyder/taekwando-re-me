import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  // Modal,
} from 'react-native';
import { ButtonGroup, Text, Button } from 'react-native-elements'

import FaIcon from 'react-native-vector-icons/FontAwesome5';

import LEVELS from '../utils/difficulty-levels'

import {
  updateDojo,
  createChallenge,
} from '../slices/DojoSlice'

import {
  selectInstrumentName,
} from '../slices/AudioSlice'

import {
  selectProfile,
} from '../slices/ProfileSlice'

import {
  updateOverLay,
} from '../slices/UISlice'

import SCREENS from './screens'

export default function DojoChallengeScreen({ navigation }) {
  const dispatch = useDispatch();

  const instrument = useSelector(selectInstrumentName)
  const { achievedLevel } = useSelector(selectProfile)

  return (
      <View style={styles.container}>
        <View style={styles.levelContainer}>
          {Object.entries(LEVELS).map(([key, {label, backgroundColor, textColor }]) => {
            return <View style={styles.row}>
              {key > achievedLevel + 1 && <Button
                type="clear"
                containerStyle={{
                  marginRight: 10
                }}
                icon={
                  <FaIcon
                    name="lock"
                    size={25}
                  />
                }
                onPress={() => {
                  dispatch(updateOverLay({
                    message: `You must obtain a ${LEVELS[parseInt(key) - 1].label} to unlock`
                  }))
                }}
              />}
              <Button
                disabled={key > achievedLevel + 1}
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
                containerStyle={{ 
                  backgroundColor,
                  flex: 1,
                }}
                onPress={() => {
                  dispatch(updateDojo({ level: key }))
                  dispatch(createChallenge({instrument}))
                  navigation.navigate(SCREENS.DOJO_CHALLENGE)
                }}
              />
            </View>
          })}
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  row: {
    flexDirection: 'row',
  }
});