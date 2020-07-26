import React from 'react';

import {
  View,
  TouchableWithoutFeedback,
} from 'react-native';

import { Text, Button } from 'react-native-elements'

import {
  updateChallengeUnlockOverlay,
  selectChallengeUnlockOverlay,
} from '../slices/UISlice'

import { useSelector, useDispatch } from 'react-redux';
import LEVEL_DATA from '../utils/difficulty-levels';

const ChallengeUnlockOverlay = () => {
  const dispatch = useDispatch();

  const { isOpen, levelUnlocked } = useSelector(selectChallengeUnlockOverlay)

  if (!isOpen) return null

  const levelData = LEVEL_DATA[levelUnlocked]

  const { label, backgroundColor, textColor } = levelData

  return (
    <View 
      style={{
        display: isOpen ? 'flex' : 'none',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.9)'
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          dispatch(updateChallengeUnlockOverlay({
            isOpen: false
          }))
        }}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          padding: 50,
        }}>
          <Text
            h3
            style={{
              textAlign: 'center',
              color: 'white'
            }}
          >
            You unlocked the
          </Text>
          <View style={{ margin: 10 }}/>

          <Text
            h2
            style={{
              fontWeight: 'bold',
              color: textColor,
              textAlign: 'center',
              backgroundColor: backgroundColor,
              padding: 10
            }}
          >
            {label}
          </Text>
          <View style={{ margin: 10 }}/>
          <Text
            h3
            style={{
              textAlign: 'center',
              color: 'white'
            }}
          >
            Challenge
          </Text>
          <View style={{ margin: 50 }}/>
          <Button
            title={"Coolbeans"}
            onPress={() => {
              dispatch(updateChallengeUnlockOverlay({
                isOpen: false
              }))
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default ChallengeUnlockOverlay