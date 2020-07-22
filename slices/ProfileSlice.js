import { createSlice } from '@reduxjs/toolkit';

import { generateChallengeQuestion, generateChallengeQuestions } from '../utils/quiz-data'
import DIFFICULTY_LEVELS from '../utils/difficulty-levels'

import { BADGES, calculateNewBadgeEarned } from '../utils/badges'

const initialBadgeState = {}
Object.values(BADGES).forEach(badge => {
  initialBadgeState[badge] = false
})

const profileInitialState = {
  achievedLevel: 0,
  trainingReps: 0,
  playReps: 0,
  instrumentChangeCount: 0,
  badges: initialBadgeState,
  newBadgeEarned: null,

}

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    ...profileInitialState,
  },

  reducers: {
    updateAcheivedLevel(state, payload) {
      const { level } = payload;

      // you can't go down in level but you can skip a level (maybe)
      if (level > state.achievedLevel) {
        state.achievedLevel = level      
      }
      checkIfNewBadgeUnlocked(state)
    },

    incrementTrainingReps(state) {
      state.trainingReps += 1      
      checkIfNewBadgeUnlocked(state)
    },

    incrementPlayReps(state) {
      state.trainingReps += 1      
      checkIfNewBadgeUnlocked(state)
    },

    incrementInstrumentChangeCount(state) {
      state.instrumentChangeCount
      checkIfNewBadgeUnlocked(state)
    },

    resetNewBadge(state) {
      state.newBadgeEarned = null
      checkIfNewBadgeUnlocked(state)
    },

    checkIfNewBadgeUnlocked(state) {
      const newBadge = calculateNewBadgeEarned(state)
      if (newBadge) {
        state.badges[newBadge] = true;
        state.newBadgeEarned = newBadge
      }
    },
  },
});

export const {
  updateAcheivedLevel,
  incrementTrainingReps,
  incrementPlayReps,
  resetNewBadge,
  checkIfNewBadgeUnlocked,
} = profileSlice.actions;

export const selectProfile = state => state.profile;

export default profileSlice.reducer;