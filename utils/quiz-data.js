import { pickTwoNotes } from './note-picker';

import difficultyLevels from '../utils/difficulty-levels'

export const generateChallengeQuestions = (level, instrument) => {
  const levelData = difficultyLevels[level]
  const { numberOfQuestions } = levelData

  const questions = {};

  for (let i = 0; i < numberOfQuestions; i++) {
    questions[i] = generateChallengeQuestion(level)
  }

  return questions
}

export const generateChallengeQuestion = (level, instrument) => {
  const levelData = difficultyLevels[level]
  const { sequenceRate } = levelData

  const { interval, notes } = pickTwoNotes(levelData);

  return {
    interval,
    notes,
    isSequence: Math.random() < sequenceRate,
    answeredCorrectly: null,
    playCount: 0,
  }
};
