import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import FaIcon from 'react-native-vector-icons/FontAwesome5';

import {
  getDataForNumericalInterval,
} from '../utils/intervals'

import { decomposeIntervalData } from '../utils/difficulty-levels'
import SCREENS from './screens'

import IntervalSizeSlider from '../components/IntervalSizeSlider'
import IntervalQualityChooser from '../components/IntervalQualityChooser'
import IntervalSizeChooser from '../components/IntervalSizeChooser'

import {
  selectChallenge,
  updateChallengeQuestion,
  updateChallenge,
} from '../slices/DojoSlice'

import {
  playInterval,
} from '../slices/AudioSlice'

const MAX_SIZE_OF_SIZE_CHOOSER = 8

export default function DojoChallengeScreen({ navigation }) {
  const dispatch = useDispatch();

  const { isPlaying: audioIsPlaying, error: audioError } = useSelector(state => state.audio)

  const {
    currentQuestionIndex,
    level,
    name,
    questions,
  } = useSelector(selectChallenge);

  const currentQuestion = questions[currentQuestionIndex]

  const {
    availableIntervalQualities,
    availableIntervalSizes,
    minimumIntervalSize,
    maximumIntervalSize,
  } = decomposeIntervalData(level)

  const [intervalSizeGuess, setIntervalSizeGuess] = useState(minimumIntervalSize)
  const [intervalSizeIndexGuess, setIntervalSizeIndexGuess] = useState(0)
  const [intervalQualityIndexGuess, setIntervalQualIndexityGuess] = useState(0)

  const [feedback, setFeedback] = useState(null)  
  
  const isLastQuestion = currentQuestionIndex + 1 === Object.keys(questions).length

  const isUsingIntervalSlider = availableIntervalSizes.length > MAX_SIZE_OF_SIZE_CHOOSER

  const correctData = getDataForNumericalInterval(Math.abs(currentQuestion.interval))

  const guessedIntervalSize = isUsingIntervalSlider ? intervalSizeGuess : availableIntervalSizes[intervalSizeIndexGuess]
  const guessedIntervalQuality = availableIntervalQualities[intervalQualityIndexGuess]
  const guessIntervalSymbol = `${guessedIntervalQuality}${guessedIntervalSize}`;

  const submitGuess = () => {
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
        isSequence
      }))

    } catch {
      console.error('audio playback hardcore fail')
    }
  
    dispatch(updateChallengeQuestion({
      id: currentQuestionIndex,
      playCount: currentQuestion.playCount + 1
    }))
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
        <IntervalQualityChooser
          availableIntervalQualities={availableIntervalQualities}
          selectedIndex={intervalQualityIndexGuess}
          handleChange={newValue => setIntervalQualIndexityGuess(newValue)}
        />
        {isUsingIntervalSlider
         ? <IntervalSizeSlider
          value={intervalSizeGuess}
          min={minimumIntervalSize}
          max={maximumIntervalSize}
          handleChange={(newValue) => setIntervalSizeGuess(newValue)}
        />
        : <IntervalSizeChooser
          selectedIndex={intervalSizeIndexGuess}
          handleChange={newValue => setIntervalSizeIndexGuess(newValue)}
          availableIntervalSizes={availableIntervalSizes}
        />}
      </View>
      {isUsingIntervalSlider && (
        <Text h4 style={{ textAlign: 'center' }}>{intervalSizeGuess}</Text>
      )}

      <View style={styles.feedbackAndPlayCount}>
        {(currentQuestion.playCount > 0) && (
          <Text>Sound Played {currentQuestion.playCount} times</Text>
        )}
        {(feedback && !audioIsPlaying && currentQuestion.playCount < 1) && (
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
  feedbackAndPlayCount: {
    height: 20
  }
});
