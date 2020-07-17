import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  getDataForNumericalInterval,
} from '../utils/intervals'


import difficultyLevels from '../utils/difficulty-levels'
import { pickTwoNotes } from '../utils/note-picker'
import possibleIntruments from '../utils/intruments';

import IntervalQualityDropdown from '../components/choosers/IntervalQualityDropdown';
import IntervalSizeDropdown from '../components/choosers/IntervalSizeDropdown';

import {
  playTwoNotesSequencially,
  playTwoNotesTogether,
} from '../utils/audio-player'

const generateQuizData = (levelData) => {
  // 2x of each interval in levelData
  const { intervals, range, sequenceRate } = levelData

  const quizData = {};

  for (let i = 0; i < intervals.length * 2; i++) {
    const { interval, notes } = pickTwoNotes(levelData);

    quizData[i] = {
      interval,
      notes,
      isSequence: Math.random() < sequenceRate,
      answeredCorrect: null,
      playCount: 0,
    }
  }

  return quizData
}

export default function IntervalQuiz({ route, navigation }) {
  const { level, instrument } = route.params;

  const levelData = difficultyLevels[level];
  const instrumentSoundData = possibleIntruments[instrument];
  
  const [quizData, setQuizData] = useState(generateQuizData(levelData))
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [intervalGuess, setIntervalGuess] = useState([])

  const [feedback, setFeedback] = useState(null)
  const [intervalPlayCount, setIntervalPlayCount] = useState(0)

  const currentQuestion = quizData ? quizData[currentQuestionIndex] : null;

  const handleIntervalQualityChange = (value) => {
    setIntervalGuess([value, intervalGuess[1]])
  }

  const handleIntervalSizeChange = (value) => {
    setIntervalGuess([intervalGuess[0], value])
  }

  const submitGuess = () => {
    const correctAnswer = getDataForNumericalInterval(currentQuestion.interval)

    setIntervalPlayCount(0)

    if (correctAnswer.symbols[0] === intervalGuess.join("")) {
      setFeedback({
        correct: true,
        text: "Nailed it!"
      })
    } else {
      setFeedback({
        correct: false,
        text: `
          The correct interval was ${correctAnswer.symbols[0]},
          You guessed ${intervalGuess.join("")} :-/
        `        
      })
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1)
  }
  
  const handlePlaySequence = () => {
    const { isSequence, notes } = currentQuestion;
    console.log(notes)
    console.log(quizData)
    if (isSequence) {
      playTwoNotesSequencially(notes, instrumentSoundData)
    } else {
      playTwoNotesTogether(notes, instrumentSoundData)
    }
  
    setIntervalPlayCount(intervalPlayCount + 1)
    setFeedback(null)
  }

  return (
    <View style={styles.container}>
      <Text>Question {currentQuestionIndex + 1}</Text>
      {intervalPlayCount > 0 && <View>
        <Text>Sound Played {intervalPlayCount} times</Text>
      </View>}
      {(feedback && intervalPlayCount < 1) && <View>
        <Text>{!feedback.correct && "Wrong"} {feedback.text}</Text>
      </View>}
      <View>
        <TouchableOpacity
           onPress={() => handlePlaySequence()}
         >
           <Text style={styles.buttonText}>Play Sequence</Text>
         </TouchableOpacity>
      </View>

      <View style={styles.selectors}>
        <IntervalQualityDropdown
          intervals={levelData.intervals}
          onValueChange={(value) => handleIntervalQualityChange(value)}
        />
        <IntervalSizeDropdown
          intervals={levelData.intervals}
          onValueChange={(value) => handleIntervalSizeChange(value)}
        />
      </View>
      {intervalPlayCount > 0 && (
         <TouchableOpacity
           onPress={() => submitGuess()}
         >
           <Text style={styles.buttonText}>Submit Guess</Text>
         </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectors: {
    marginBottom: 10,
    // justifyContent: 'space-between',
  }
});
