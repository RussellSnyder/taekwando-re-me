import { createSlice } from '@reduxjs/toolkit';

const uiInitialState = {
  overlay: {
    message: 'initial state',
    isOpen: false,
    closeText: 'close',
  },
  challengeUnlockOverlay: {
    isOpen: false,
    levelUnlocked: 0,
  }
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    ...uiInitialState
  },

  reducers: {
    closeOverlay(state) {
      state.overlay = {
        ...uiInitialState.overlay
      }
    },
    openOverlay(state) {
      const { overlay } = state
      overlay.isOpen = true
    },
    updateOverLay(state, action) {
      const { overlay } = state

      const { message, closeText } = action.payload;

      if (message !== undefined) {
        overlay.message = message
      }
      if (closeText !== undefined) {
        overlay.closeText = closeText
      }
      overlay.isOpen = true
    },
    updateChallengeUnlockOverlay(state, action) {
      const { isOpen, levelUnlocked } = action.payload;
      const { challengeUnlockOverlay } = state;

      if (isOpen !== undefined) {
        challengeUnlockOverlay.isOpen = isOpen
      }

      if (levelUnlocked !== undefined) {
        challengeUnlockOverlay.levelUnlocked = levelUnlocked
      }
    }
  },
});

export const {
  closeOverlay,
  openOverlay,
  updateOverLay,
  updateChallengeUnlockOverlay,
} = uiSlice.actions;

export const selectUI = state => state.ui;
export const selectOverlay = state => state.ui.overlay;
export const selectChallengeUnlockOverlay = state => state.ui.challengeUnlockOverlay;

export default uiSlice.reducer