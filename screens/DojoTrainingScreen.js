import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import FaIcon from 'react-native-vector-icons/FontAwesome5';

import {
  getDataForNumericalInterval,
} from '../utils/intervals'

import LEVEL_DATA, { decomposeIntervalData } from '../utils/difficulty-levels'

import IntervalSizeSlider from '../components/IntervalSizeSlider'
import IntervalQualityChooser from '../components/IntervalQualityChooser'
import IntervalSizeChooser from '../components/IntervalSizeChooser'

import {
  updateTraining,
  selectTraining,
  createNewTrainingQuestion,
} from '../slices/DojoSlice'

import {
  playInterval,
  selectInstrumentName,
} from '../slices/AudioSlice'

import {
  incrementTrainingReps,
} from '../slices/ProfileSlice'

const MAX_SIZE_OF_SIZE_CHOOSER = 5

export default function DojoTrainingScreen({ navigation }) {
  const dispatch = useDispatch();

  const { isPlaying: audioIsPlaying, error: audioError } = useSelector(state => state.audio)
  const instrument = useSelector(selectInstrumentName)

  const {
    level,
    question,
    questionCount,
    questionsAnsweredCorrectly,
  } = useSelector(selectTraining);


  const {
    availableIntervalQualities,
    availableIntervalSizes,
    minimumIntervalSize,
    maximumIntervalSize,
  } = decomposeIntervalData(level)

  const [intervalSizeGuess, setIntervalSizeGuess] = useState(minimumIntervalSize)
  const [intervalSizeGuessDisplay, setIntervalSizeGuessDisplay] = useState(minimumIntervalSize)
  const [intervalSizeIndexGuess, setIntervalSizeIndexGuess] = useState(0)
  const [intervalQualityIndexGuess, setIntervalQualIndexityGuess] = useState(0)
  const [hasAudioBeenPlayed, setHasAudioBeenPlayed] = useState(false)

  const [feedback, setFeedback] = useState(null)  
  
  const isUsingIntervalSlider = availableIntervalSizes.length > MAX_SIZE_OF_SIZE_CHOOSER

  const correctData = getDataForNumericalInterval(Math.abs(question.interval))

  const guessedIntervalSize = isUsingIntervalSlider ? intervalSizeGuess : availableIntervalSizes[intervalSizeIndexGuess]
  const guessedIntervalQuality = availableIntervalQualities[intervalQualityIndexGuess]
  const guessedIntervalSymbol = `${guessedIntervalQuality}${guessedIntervalSize}`;

  const submitGuess = () => {
    const isCorrect = guessedIntervalSymbol === correctData.symbols[0] 
    
    if (isCorrect) {
      setFeedback({
        correct: true,
        text: "Nailed it!"
      })
    } else {
      setFeedback({
        correct: false,
        text: `The correct interval was ${correctData.symbols[0]}. You submitted ${guessedIntervalSymbol}`
      })
    }

    dispatch(updateTraining({
      questionCount: questionCount + 1,
      questionsAnsweredCorrectly: isCorrect ? questionsAnsweredCorrectly + 1 : questionsAnsweredCorrectly
    }))

    dispatch(createNewTrainingQuestion({instrument}))
    setHasAudioBeenPlayed(false)
  }
  
  const handlePlaySequence = async () => {
    // console.log(question)
    const { isSequence, notes } = question;

    // console.log(isSequence, notes)
    setFeedback(null)

    try {
      await dispatch(playInterval({
        notes,
        isSequence
      }))

    } catch {
      console.error('audio playback hardcore fail')
    }
    setHasAudioBeenPlayed(true)
    dispatch(incrementTrainingReps())
  }

  const Description = () => {
    const { intervals, rangeSize, sequenceRate } = LEVEL_DATA[level]

    const intervalsPossible = intervals.map(interval => (
      getDataForNumericalInterval(Math.abs(interval)).names[0]
    ))

    const uniqueIntervalsPossible = Array.from(new Set(intervalsPossible))

    return (
      <View>
        <Text>
          Intervals: {uniqueIntervalsPossible.join(", ")}
        </Text>
        <View style={{ margin: 2}} />
        <Text>
          Range: {Math.round(rangeSize * 100)}% of instrument
        </Text>
        <View style={{ margin: 2}} />
        <Text>
          Chance of Sequence: {Math.round(sequenceRate * 100)}%
        </Text>
        <View style={{ margin: 10}} />
      </View>
    )
  }


  const score = Math.round((questionsAnsweredCorrectly / questionCount) * 100);

  const isReady = (score > 90) && (questionCount >= LEVEL_DATA[level].numberOfQuestions)

  const Ready = () => (
    <View>
      <Text h4 style={{ color: "green", textAlign: 'center' }}>
        <FaIcon
          size={35}
          name="check-circle"
        />&nbsp;
        You Are Ready!
      </Text>
    </View>
  )

  return (
    <View style={styles.container}>
      {isReady 
        ? <Ready />
        : <Text h4 style={styles.challengeName}>{LEVEL_DATA[level].label} Training</Text>
      }
      <View style={{ margin: 10}} />      
      <Description />
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
          handleDisplayChange={(newValue) => setIntervalSizeGuessDisplay(newValue)}
          handleValueChange={(newValue) => {
            setIntervalSizeGuess(newValue)
            setIntervalSizeGuessDisplay(newValue)
          }}
        />
        : <IntervalSizeChooser
          selectedIndex={intervalSizeIndexGuess}
          handleChange={newValue => setIntervalSizeIndexGuess(newValue)}
          availableIntervalSizes={availableIntervalSizes}
        />}
      </View>
      {isUsingIntervalSlider && (
        <Text h4 style={{ textAlign: 'center' }}>{intervalSizeGuessDisplay}</Text>
      )}
      <View style={styles.feedback}>
        {(feedback && !audioIsPlaying) && (
          <Text h4 style={{ 
            color: feedback.correct ? 'green' : 'red',
            fontWeight: 'bold',
          }}>
            {feedback.text}
          </Text>
        )}
      </View>

      <View style={styles.stats}>
        <View>
          {questionCount > 0 && <Text>Score: {score}% out of {questionCount} tries</Text>}
        </View>
        {questionCount > 0 && <View>
          <Button
            type="clear"
            title="reset"
            onPress={() => {
              dispatch(updateTraining({
                questionCount: 0,
                questionsAnsweredCorrectly: 0,
              }))
              setFeedback(null)
            }}
          />
        </View>}
      </View>
      <Button
        onPress={() => submitGuess()}
        title={`Submit Answer ${guessedIntervalSymbol}`}
        disabled={!hasAudioBeenPlayed || audioIsPlaying}
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
  feedback: {
    height: 70,
  },
  stats: {
    height: 35,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});
