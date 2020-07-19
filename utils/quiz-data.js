import { pickTwoNotes } from './note-picker';

import difficultyLevels from '../utils/difficulty-levels'

export const generateChallengeQuestions = (level, instrument) => {
  const levelData = difficultyLevels[level]
  const { sequenceRate, numberOfQuestions } = levelData

  const questions = {};

  for (let i = 0; i < numberOfQuestions; i++) {
    const { interval, notes } = pickTwoNotes(levelData);

    questions[i] = {
      interval,
      notes,
      isSequence: Math.random() < sequenceRate,
      answeredCorrectly: null,
      playCount: 0,
    }
  }

  return questions
}
