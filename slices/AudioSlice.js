import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  playTwoNotesTogether,
  playTwoNotesSequencially,
} from '../utils/audio-player'

import INSTRUMENTS from '../utils/instruments'

// First, create the thunk
export const playInterval = createAsyncThunk(
  'audio/playInterval',
  async ({ notes, isSequence }, { getState }) => {
    const { instrumentSounds } = getState().audio

    let response;
    if (isSequence) {
      response = await playTwoNotesSequencially(notes, instrumentSounds)
    } else {
      response = await playTwoNotesTogether(notes, instrumentSounds)
    }

    return response
  }
)

export const audioInitialState = {
  isPlaying: false,
  isComplete: false,
  error: null,
  instrumentName: 'violin', 
  instrumentSounds: INSTRUMENTS.violin, 
}

export const audioSlice = createSlice({
  name: 'audio',
  initialState: audioInitialState,

  reducers: {
    updateInstrument(state, action) {
      const { instrument } = action.payload

      state.instrumentName = instrument
      state.instrumentSounds = INSTRUMENTS[instrument]
    }
  },
  extraReducers: {
    [playInterval.pending]: (state, action) => {
      if (!state.isPlaying) {
        state.isPlaying = true
        state.isComplete = false
      }
    },
    [playInterval.fulfilled]: (state, action) => {
      state.isComplete = true
      state.isPlaying = false
      state.error = null
    },
    [playInterval.rejected]: (state, action) => {
      state.error = "Audio playback no bueno"
      state.currentRequestId = undefined
      state.isPlaying = false
      state.isComplete = false
    }
  }
});

export const {
  updateInstrument,
} = audioSlice.actions;

export const selectInstrumentSounds = state => state.audio.instrumentSounds;
export const selectInstrumentName = state => state.audio.instrumentName;

export default audioSlice.reducer;