import { createSlice } from '@reduxjs/toolkit';

const uiInitialState = {
  overlay: {
    message: 'test',
    isOpen: false,
    closeText: 'close',
  }
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    ...uiInitialState,
  },

  reducers: {
    closeOverlay(state) {
      const { overlay } = state
      overlay.isOpen = false
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
  },
});

export const {
  closeOverlay,
  openOverlay,
  updateOverLay,
} = uiSlice.actions;

export const selectUI = state => state.ui;
export const selectOverlay = state => state.ui.overlay;

export default uiSlice.reducer