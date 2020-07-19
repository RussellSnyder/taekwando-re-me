import { createSlice } from '@reduxjs/toolkit';

import { generateChallengeQuestion, generateChallengeQuestions } from '../utils/quiz-data'
import DIFFICULTY_LEVELS from '../utils/difficulty-levels'

const dojoInitialState = {
  level: 1,
  challenge: {},
  training: {}
}

const trainingInitialState = {
  level: 1,
  question: {},
  questionCount: 0,
  questionsAnsweredCorrectly: 0,
}

export const challengeInitialState = {
  isComplete: false,
  currentQuestionIndex: 0,
  name: "name here",
  level: 1,
  questions: generateChallengeQuestions(1, 'violin')
}

export const dojoSlice = createSlice({
  name: 'dojo',
  initialState: {
    ...dojoInitialState,
    challenge: {
      ...challengeInitialState
    },
    training: {
      ...trainingInitialState
    }
  },

  reducers: {
    updateDojo(state, action) {
      const { level } = action.payload

      if (level !== undefined) {
        state.level = level
      }
    },

    createChallenge(state) {
      const { level } = state;

      const levelData = DIFFICULTY_LEVELS[level];

      state.challenge = {
        ...challengeInitialState,
        level,
        name: `${levelData.label} Challenge`,
        questions: generateChallengeQuestions(level)
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

    createTraining(state, action) {
      const { level } = action.payload;

      state.training = {
        ...trainingInitialState,
        level,
        question: generateChallengeQuestion(level),
      }
    },

    updateTraining(state, action) {
      const { questionCount, questionsAnsweredCorrectly } = action.payload;

      if (questionCount !== undefined) {
        state.training.questionCount = questionCount
      }
      if (questionsAnsweredCorrectly !== undefined) {
        state.training.questionsAnsweredCorrectly = questionsAnsweredCorrectly
      }
    },

    createNewTrainingQuestion(state) {
      const { level } = state.training

      state.training.question = generateChallengeQuestion(level)
    },

  },
});

export const {
  createChallenge,
  updateChallengeQuestion,
  updateChallenge,
  updateDojo,
  createTraining,
  updateTraining,
  createNewTrainingQuestion,
} = dojoSlice.actions;

export const selectDojo = state => state.dojo;
export const selectChallenge = (state) => selectDojo(state).challenge;
export const selectTraining = (state) => selectDojo(state).training;

export default dojoSlice.reducer;