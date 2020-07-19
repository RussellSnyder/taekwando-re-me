import { createSlice } from '@reduxjs/toolkit';

import { generateChallengeQuestions } from '../utils/quiz-data'
import DIFFICULTY_LEVELS from '../utils/difficulty-levels'

const dojoInitialState = {
  instrument: "violin",
  level: 1,
  challenge: {},
}

export const challengeInitialState = {
  isComplete: false,
  currentQuestionIndex: 0,
  name: "name here",
  instrument: "violin",
  level: 1,
  questions: generateChallengeQuestions(1, 'violin')
}

export const dojoSlice = createSlice({
  name: 'dojo',
  initialState: {
    ...dojoInitialState,
    challenge: {
      ...challengeInitialState
    }
  },

  reducers: {
    updateDojo(state, action) {
      const { intrument, level } = action.payload

      if (intrument !== undefined) {
        state.intrument = intrument
      }
      if (level !== undefined) {
        state.level = level
      }
    },

    createChallenge(state) {
      const { instrument, level } = state;

      const levelData = DIFFICULTY_LEVELS[level];

      state.challenge = {
        ...challengeInitialState,
        level,
        instrument,
        name: `${levelData.label} Challenge`,
        questions: generateChallengeQuestions(level, instrument)
      }
    },

    updateChallenge(state, action) {
      const { currentQuestionIndex, isComplete } = action.payload

      if (isComplete !== undefined) {
        state.challenge.isComplete = isComplete
      }
      if (currentQuestionIndex !== undefined) {
        state.challenge.currentQuestionIndex = currentQuestionIndex
      }
    },

    updateChallengeQuestion(state, action) {
      const { answeredCorrectly, playCount, id } = action.payload

      const question = state.challenge.questions[id]

      if (answeredCorrectly !== undefined) {
        question.answeredCorrectly = answeredCorrectly
      }
      if (playCount !== undefined) {
        question.playCount = playCount
      }
    },
  },
});

export const {
  createChallenge,
  updateChallengeQuestion,
  updateChallenge,
  updateDojo,
} = dojoSlice.actions;

export const selectDojo = state => state.dojo;
export const selectChallenge = (state) => selectDojo(state).challenge;

export default dojoSlice.reducer;