import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-elements';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import { HeaderBackButton } from '@react-navigation/stack'
import { StackActions } from '@react-navigation/native';

import SCREENS from './screens';

import { translateNumericalIntervalToNamedInterval } from '../utils/intervals'

import {
  selectChallenge,
  createChallenge,
} from '../slices/DojoSlice'

import {
  selectInstrumentName
} from '../slices/AudioSlice'

import {
  updateAcheivedLevel,
  selectProfile,
} from '../slices/ProfileSlice'

import {
  updateChallengeUnlockOverlay,
} from '../slices/UISlice'

import LEVEL_DATA from '../utils/difficulty-levels';

export default function DojoChallengeCompleteScreen({ navigation }) {
  const dispatch = useDispatch();

  navigation.setOptions({
    headerLeft: () => (
      <HeaderBackButton
        onPress={() => navigation.replace(SCREENS.DOJO_HOME)}
      />
    )
  })

  const instrument = useSelector(selectInstrumentName)
  const { achievedLevel } = useSelector(selectProfile)

  const {
    level,
    name,
    questions,
  } = useSelector(selectChallenge);

  const questionCount = Object.keys(questions).length
  const score = Object.entries(questions).reduce((acc, [key, {answeredCorrectly}]) => {
    return answeredCorrectly ? acc + 1 : acc
  }, 0) / questionCount

  const hasPassedChallenge = score >= 0.9;

  if (hasPassedChallenge && level > achievedLevel) {
    if (level > 0 && achievedLevel < Object.keys(LEVEL_DATA).length) {
      dispatch(updateChallengeUnlockOverlay({
        isOpen: true,
        levelUnlocked: parseInt(level) + 1
      }))
    }
    dispatch(updateAcheivedLevel({
      level
    }))
  }

  const resultMessage = hasPassedChallenge
    ? <Text h4 style={{ textAlign: 'center' }}>{name}</Text>
    : <Text h4 style={{ textAlign: 'center' }}>{name}</Text>

  const icon = hasPassedChallenge
    ? <FaIcon style={{ color: 'green' }} name={"check-circle"} size={50}/>
    : <FaIcon style={{ color: 'red' }} name={"times-circle"} size={50}/>

  const resultRows = Object.entries(questions).map(([key, {interval, isSequence, answeredCorrectly, playCount}]) => {
    // console.log(interval, isSequence, answeredCorrectly, playCount)
    return <View key={`result-${key}`} style={styles.row}>
      <View style={[styles.col, styles.colId]}>
        <Text>{parseInt(key) + 1}</Text>
      </View>
      <View style={styles.col}>
        <Text>{answeredCorrectly
          ? <FaIcon name="check-circle" color="green" size={20} />
          : <FaIcon name="times-circle" color="red" size={20} />
        }</Text>
      </View>
      <View style={styles.col}>
        <Text>{translateNumericalIntervalToNamedInterval(Math.abs(interval))}</Text>
      </View>
      <View style={styles.col}>
        <Text>{isSequence ? 'Sequence' : 'Chord'}</Text>
      </View>
      <View style={styles.col}>
        <Text>{playCount}</Text>
      </View>
    </View>
  })

  const resultHeading = (
    <View style={[styles.row, styles.rowHeader]}>
      <View style={[styles.col, styles.colId]}>
        <Text style={styles.colHeader}>#</Text>
      </View>
      <View style={[styles.col]}>
        <Text style={styles.colHeader}>Answer</Text>
      </View>
      <View style={[styles.col]}>
        <Text style={styles.colHeader}>Interval</Text>
      </View>
      <View style={[styles.col]}>
        <Text style={styles.colHeader}>Type</Text>
      </View>
      <View style={[styles.col]}>
        <Text style={styles.colHeader}>Plays</Text>
      </View>
    </View>
  )


  return (
    <View style={styles.container}>
      {resultMessage}
      <View style={{margin: 10}}/>
      {icon}
      <View style={{margin: 10}}/>
      <Text h5>
        You scored {Math.round(score * 100)}%
      </Text>
      <View style={{margin: 10}}/>
        <View style={styles.resultTable}>
          {resultHeading}
          <ScrollView height={40}>
            {resultRows}
          </ScrollView>
        </View>
      <View style={{margin: 10}}/>
      {!hasPassedChallenge && <View style={styles.failButtonContainer}>
        <Button
          onPress={() => {
            const popAction = StackActions.pop(3)
            navigation.dispatch(popAction);
            navigation.push(SCREENS.DOJO_TRAININGS)
          }}
          type="outline"
          containerStyle={{
            alignSelf: 'stretch',
            flex: 1,
            marginHorizontal: 10,
          }}
          buttonStyle={{
            borderColor: 'green',
          }}
          titleStyle={{
            color: 'green'
          }}
          title="Train"
          icon={
            <FaIcon
              style={{ marginRight: 5 }}
              name="dumbbell"
              size={15}
              color="green"
            />
          }
        />
        <Button
          onPress={() => {
            dispatch(createChallenge({
              instrument
            }))
            navigation.goBack()
          }}
          type="outline"
          containerStyle={{
            alignSelf: 'stretch',
            flex: 1,
            marginHorizontal: 10,
          }}
          buttonStyle={{
            borderColor: '#ffa76b',
          }}
          titleStyle={{
            color: '#ffa76b'
          }}
          title="Retry"
          icon={
            <FaIcon
              style={{ marginRight: 5 }}
              name="redo"
              size={15}
              color="#ffa76b"
            />
          }
        />
      </View>}
      {!hasPassedChallenge && <View style={{margin: 10}}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  resultTable: {
    flex: 1,
    // width: 300,
    flexDirection: 'column',
  },
  rowHeader: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  colId: {
    width: 20,
  },
  col: {
    width: 65,
    margin: 10,
    alignSelf: 'stretch'    
  },
  colHeader: {
    fontWeight: 'bold',
    // fontSize: 18
  },
  failButtonContainer: {
    flexDirection: 'row',
    // flex: 1,
    // alignContent: 'stretch',
    alignSelf: 'stretch',
    justifyContent: 'space-around'
  }
});
