import { createSlice } from '@reduxjs/toolkit';
import { BADGES, calculateNewBadgeEarned } from '../utils/badges'

const initialBadgeState = {
  ...BADGES
}

const profileInitialState = {
  achievedLevel: 0,
  trainingReps: 0,
  playReps: 0,
  instrumentChangeCount: 0,
  badges: {
    ...initialBadgeState,
  },
}

const _checkIfNewBadgeUnlocked = (state) => {
  const newBadgeKey = calculateNewBadgeEarned(state)

  if (newBadgeKey) {
    state.badges[newBadgeKey].isAchieved = true
  }
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    ...profileInitialState,
  },

  reducers: {
    updateAcheivedLevel(state, action) {
      const { level } = action.payload;

      state.achievedLevel = parseInt(level)      
      _checkIfNewBadgeUnlocked(state)
    },

    incrementTrainingReps(state) {
      state.trainingReps += 1      
      _checkIfNewBadgeUnlocked(state)
    },

    incrementPlayReps(state) {
      state.playReps += 1      
      _checkIfNewBadgeUnlocked(state)
    },

    incrementInstrumentChangeCount(state) {
      state.instrumentChangeCount += 1
      _checkIfNewBadgeUnlocked(state)
    },

    updateBadge(state, action) {
      const { hasBeenDisplayedToUser, key } = action.payload

      if (hasBeenDisplayedToUser !== undefined) {
        state.badges[key].hasBeenDisplayedToUser = hasBeenDisplayedToUser
      }
    },

    checkIfNewBadgeUnlocked(state) {
      _checkIfNewBadgeUnlocked(state)
    }
  },
});

export const {
  updateAcheivedLevel,
  incrementTrainingReps,
  incrementPlayReps,
  incrementInstrumentChangeCount,
  checkIfNewBadgeUnlocked,
  updateBadge
} = profileSlice.actions;

export const selectProfile = state => state.profile;
export const selectNewBadgeEarned = state => state.profile.newBadgeEarned;
export const selectBadges = state => state.profile.badges;

export default profileSlice.reducer;