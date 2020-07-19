import React, { useState } from 'react'
import { useSelector, useDispatch, unWrapResult } from 'react-redux';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Divider, Button, Text, ButtonGroup } from 'react-native-elements';
import Slider from "react-native-slider";
import FaIcon from 'react-native-vector-icons/FontAwesome5';

import {
  getDataForNumericalInterval,
  translateSymbolsIntoNumbericalInterval,
  translateNumericalIntervalToNamedInterval,
  getQualityOfNumericInterval
} from '../utils/intervals'

import difficultyLevels from '../utils/difficulty-levels'
import INSTRUMENTS from '../utils/intruments';
import SCREENS from './screens'

import {
  playTwoNotesSequencially,
  playTwoNotesTogether,
} from '../utils/audio-player'

import {
  selectChallenge,
  selectDojo,
  updateChallengeQuestion,
  updateChallenge,
} from '../slices/DojoSlice'

import {
  playInterval,
} from '../slices/AudioSlice'

export default function DojoChallengeScreen({ route, navigation }) {
  const dispatch = useDispatch();

  const { isPlaying: audioIsPlaying, isComplete: audioIsComplete, error: audioError } = useSelector(state => state.audio)

  const { instrument } = useSelector(selectDojo);

  const {
    currentQuestionIndex,
    level,
    name,
    questions,
  } = useSelector(selectChallenge);

  const currentQuestion = questions[currentQuestionIndex]

  const levelData = difficultyLevels[level];
  const instrumentSoundData = INSTRUMENTS[instrument];

  // just collect the size (P5 would be 5)
  const pureIntervalSizes = levelData.intervals.map(interval => {
    const symbol = translateNumericalIntervalToNamedInterval(interval)
    return (symbol.match(/\d+$/) || []).pop()
  })

  const minimumIntervalSize = Math.min( ...pureIntervalSizes );
  const maximumIntervalSize = Math.max( ...pureIntervalSizes );

  const [intervalSizeGuess, setIntervalSizeGuess] = useState(minimumIntervalSize)
  const [intervalQualityIndexGuess, setIntervalQualIndexityGuess] = useState(0)

  const intervalQualities = [...new Set(levelData.intervals.map(interval => {          
    return getQualityOfNumericInterval(interval)
  }))]

  const [feedback, setFeedback] = useState(null)  
  
  const isLastQuestion = currentQuestionIndex + 1 === Object.keys(questions).length

  const submitGuess = () => {
    const correctData = getDataForNumericalInterval(currentQuestion.interval)

    const guessIntervalSymbol = `${intervalQualities[intervalQualityIndexGuess]}${intervalSizeGuess}`;
    // const guessIntervalNumber = translateSymbolsIntoNumbericalInterval(guessIntervalSymbol)

    const isCorrect = guessIntervalSymbol === correctData.symbols[0] 
    
    if (isCorrect) {
      setFeedback({
        correct: true,
        text: "Nailed it!"
      })
    } else {
      setFeedback({
        correct: false,
        text: `The correct interval was ${correctData.symbols[0]}. You submitted ${guessIntervalSymbol}`
      })
    }

    dispatch(updateChallengeQuestion({
      id: currentQuestionIndex,
      answeredCorrectly: isCorrect,
    }))

    if (isLastQuestion) {
      dispatch(updateChallenge({
        isComplete: true,
      }))

      navigation.replace(SCREENS.DOJO_CHALLENGE_COMPLETE)

    } else {
      dispatch(updateChallenge({
        currentQuestionIndex: currentQuestionIndex + 1,
      }))  
    }
  }
  
  const handlePlaySequence = async () => {
    const { isSequence, notes } = currentQuestion;

    try {
      await dispatch(playInterval({
        notes,
        isSequence,
        instrument: instrumentSoundData
      }))

    } catch {
      console.error('audio playback hardcore fail')
    }
  
    dispatch(updateChallengeQuestion({
      id: currentQuestionIndex,
      playCount: currentQuestion.playCount + 1
    }))
  }

  const IntervalSizeSlider = () => {
    return <View style={styles.intervalSliderContainer}>
      <Button
        icon={<FaIcon name="minus" color="white" size={20} />}
        onPress={() => {
          if (intervalSizeGuess <= minimumIntervalSize) return
          setIntervalSizeGuess(intervalSizeGuess - 1)
        }}
      />
      <Slider
        animateTransitions={true}
        style={styles.intervalSlider}
        step={1}
        value={intervalSizeGuess}
        minimumValue={minimumIntervalSize}
        maximumValue={maximumIntervalSize}
        onSlidingComplete={(newValue) => {
          // if (intervalSizeGuess === newValue) return
          setIntervalSizeGuess(newValue)
        }}
      />
      <Button
        icon={<FaIcon name="plus" color="white" size={20} />}
        onPress={() => {
          if (intervalSizeGuess >= maximumIntervalSize) return
          setIntervalSizeGuess(intervalSizeGuess + 1)
        }}
      />
    </View>
  }

  const IntervalQualityChooser = () => {
    return <View>
      <ButtonGroup
        containerStyle={{
          marginHorizontal: 0,
          marginBottom: 30,
        }}
        buttons={intervalQualities}
        selectedIndex={intervalQualityIndexGuess}
        onPress={(newValue) => {
          if (newValue === intervalQualityIndexGuess) return
          setIntervalQualIndexityGuess(newValue)
        }}
      />
    </View>
  }


  return (
    <View style={styles.container}>
      <Text h3 style={styles.challengeName}>{name}</Text>
      <View style={styles.playSequenceContainer}>
        <Button
          titleStyle={{ fontSize: 30 }}
          icon={<FaIcon name="music" size={30} style={{ marginRight: 10 }} />}
          type="outline"
          buttonStyle={{
            height: 100,
          }}
          onPress={handlePlaySequence}
          disabled={audioIsPlaying}
          title={audioIsPlaying ? "Playing..." : "Play Interval"}
         />
      </View>
      <View style={styles.guessControlsContainer}>
        <IntervalQualityChooser />
        <IntervalSizeSlider />
      </View>
      <Text h4 style={{ textAlign: 'center' }}>{intervalSizeGuess}</Text>

      <View style={styles.feedbackAndPlayCount}>
        {(currentQuestion.playCount > 0) && (
          <Text>Sound Played {currentQuestion.playCount} times</Text>
        )}
        {(feedback && currentQuestion.playCount < 1) && (
          <Text style={{ color: feedback.correct ? 'green' : 'red' }}>{feedback.text}</Text>
        )}
      </View>
      <Button
        onPress={() => submitGuess()}
        buttonStyle={isLastQuestion && { backgroundColor: 'green'}}
        title={isLastQuestion
          ? `Submit Final Question`
          : `Submit Question ${currentQuestionIndex + 1}`
        }
        disabled={currentQuestion.playCount < 1}
      />
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
  guessControlsContainer: {
  },
  intervalSliderContainer: {
    flexDirection: 'row',
  },
  intervalSlider: {
    flex: 1,
    marginHorizontal: 15,
  },
  intervalButton: {
    marginHorizontal: 20,
  },
  feedbackAndPlayCount: {
    height: 20
  }
});
