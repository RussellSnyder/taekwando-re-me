import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Button, CheckBox, ButtonGroup } from 'react-native-elements';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import { pickTwoNotes } from '../utils/note-picker';
import { INTERVAL_QUALITIES, POSSIBLE_SIZES_FOR_QUALITY_MAP } from '../utils/intervals'

import {
  translateSymbolsIntoNumbericalInterval,
} from '../utils/intervals'

import IntervalSizeChooser from '../components/IntervalSizeChooser'
import IntervalQualityChooser from '../components/IntervalQualityChooser'

import {
  playInterval,
  selectInstrumentSounds,
} from '../slices/AudioSlice'

import { range } from 'lodash';

const INTERVAL_DIRECTIONS = ['ascending', 'descending']

export default function DojoFreePlayScreen({ navigation }) {
  const dispatch = useDispatch();

  const { isPlaying: audioIsPlaying, error: audioError } = useSelector(state => state.audio)
  const instrument = useSelector(selectInstrumentSounds)

  const [intervalSizeIndex, setIntervalSizeIndex] = useState(0)
  const [isSequence, setIsSequence] = useState(true)
  const [intervalDirectionIndex, setIntervalDirectionIndex] = useState(0)
  const [intervalQualityIndex, setIntervalQualityIndex] = useState(0)

  const intervalQuality = INTERVAL_QUALITIES[intervalQualityIndex];
  const [availableIntervalSizes, setAvailableIntervalSizes] = useState(POSSIBLE_SIZES_FOR_QUALITY_MAP[intervalQuality])

  const interval = `${intervalQuality}${availableIntervalSizes[intervalSizeIndex]}`

  const [notes, setNotes] = useState(null)
  const [lastIntervalPlayed, setLastIntervalPlayed] = useState(null)

  const freePlayData = {
    intervals: intervalDirectionIndex === 0 ? range(1, 15) : range(-15, -1),
    rangeSize: 1,    
  }

  const handleIntervalQualityChange = (newQualityIndex) => {
    const newQuality = INTERVAL_QUALITIES[newQualityIndex];
    const possibleSizes = POSSIBLE_SIZES_FOR_QUALITY_MAP[newQuality]

    const currentIntervalSize = availableIntervalSizes[intervalSizeIndex]

    setIntervalQualityIndex(newQualityIndex)
    setAvailableIntervalSizes(possibleSizes)

    // Try to keep the same size if possible (M vs. m)
    const indexOfSizeForQuality = possibleSizes.indexOf(currentIntervalSize)
    if (indexOfSizeForQuality !== -1) {
      // console.log(`size ${currentIntervalSize} can be ${newQuality}`)
      setIntervalSizeIndex(indexOfSizeForQuality)
    } else {
      // if not possible, bring size index back to 0
      // console.log(`${currentIntervalSize} cannot be ${newQuality}`)
      setIntervalSizeIndex(0)
    }
  }
  

  const handlePlayNewInterval = async () => {
    // console.log(`${intervalQuality}${availableIntervalSizes[intervalSizeIndex]}`)
    const pureInterval = translateSymbolsIntoNumbericalInterval(`${intervalQuality}${availableIntervalSizes[intervalSizeIndex]}`)

    let intervalWithDirection = pureInterval * (intervalDirectionIndex === 0 ? 1 : -1)
    const { notes } = pickTwoNotes(freePlayData, instrument, intervalWithDirection)
    // console.log(notes)

    setLastIntervalPlayed(interval)
    
    try {
      await dispatch(playInterval({
        notes,
        isSequence
      }))
      setNotes(notes)
    } catch {
      console.error('audio playback hardcore fail')
    }
  }

  const handleRepeatInterval = async () => {
    try {
      await dispatch(playInterval({
        notes,
        isSequence
      }))

    } catch {
      console.error('audio playback hardcore fail')
    }
  }

  return (
    <View style={styles.container}>
        <CheckBox
          containerStyle={{
            marginLeft: 0,
            marginRight: 0,
          }}
          center
          title={"Sequence Notes"}
          checked={isSequence}
          onPress={() => setIsSequence(!isSequence)}
        />
      {isSequence && <ButtonGroup
        containerStyle={{
          marginHorizontal: 0,
        }}
        buttons={INTERVAL_DIRECTIONS}
        selectedIndex={intervalDirectionIndex}
        onPress={(newValue) => {
          if (newValue === intervalDirectionIndex) return
          setIntervalDirectionIndex(newValue)
        }}
      />}
      {/* <ButtonGroup
        containerStyle={{
          marginHorizontal: 0,
          marginBottom: 45,
        }}
        buttons={INTERVAL_RANGE}
        selectedIndex={intervalRangeIndex}
        onPress={(newValue) => {
          if (newValue === intervalRangeIndex) return
          setIntervalRangeIndex(newValue)
        }}
      /> */}

      <View style={styles.guessControlsContainer}>
        <IntervalQualityChooser
          selectedIndex={intervalQualityIndex}
          handleChange={newValue => handleIntervalQualityChange(newValue)}
        />
        <IntervalSizeChooser
          availableIntervalSizes={availableIntervalSizes}
          selectedIndex={intervalSizeIndex}
          handleChange={(newValue) => setIntervalSizeIndex(newValue)}
        />
      </View>
      <View style={styles.playSequenceContainer}>
        <Button
          titleStyle={{ fontSize: 30 }}
          icon={<FaIcon name="volume-up" size={30} style={{ marginRight: 10 }} />}
          type="outline"
          buttonStyle={{
            height: 100,
          }}
          onPress={handleRepeatInterval}
          disabled={audioIsPlaying || !notes || interval !== lastIntervalPlayed}
          title={audioIsPlaying ? "Playing..." : `Repeat same ${lastIntervalPlayed || interval}`}
         />
        <Button
          titleStyle={{ fontSize: 30 }}
          icon={<FaIcon name="redo" size={30} style={{ marginRight: 10 }} />}
          type="outline"
          buttonStyle={{
            height: 100,
          }}
          onPress={handlePlayNewInterval}
          disabled={audioIsPlaying}
          title={audioIsPlaying ? "Playing..." : `New ${interval}`}
         />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  challengeName: {
    marginBottom: 30,
    textAlign: 'center',
  },
  topPart: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  playSequenceContainer: {
    marginBottom: 30
  },
  feedbackAndPlayCount: {
    height: 20
  }
});
