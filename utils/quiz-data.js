import { pickTwoNotes } from './note-picker';

import difficultyLevels from '../utils/difficulty-levels'
import INSTRUMENTS from '../utils/instruments'

export const generateChallengeQuestions = (level, instrument = 'violin') => {
  const levelData = difficultyLevels[level]

  const { numberOfQuestions } = levelData

  const questions = {};

  for (let i = 0; i < numberOfQuestions; i++) {
    questions[i] = generateChallengeQuestion(level, instrument)
  }

  return questions
}

export const generateChallengeQuestion = (level, instrument = "violin") => {
  const levelData = difficultyLevels[level]
  const { sequenceRate } = levelData
  
  const { interval, notes } = pickTwoNotes(levelData, INSTRUMENTS[instrument]);

  // console.log(interval, notes)

  return {
    interval,
    notes,
    isSequence: Math.random() < sequenceRate,
    answeredCorrectly: null,
    playCount: 0,
  }
};
