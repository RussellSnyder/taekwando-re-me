import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  playTwoNotesTogether,
  playTwoNotesSequencially,
} from '../utils/audio-player'

import INTRUMENTS from '../utils/intruments'

// First, create the thunk
export const playInterval = createAsyncThunk(
  'audio/playInterval',
  async ({ notes, isSequence }, { getState }) => {
    const { instrument } = getState().audio

    console.log(getState().audio)
    let response;
    if (isSequence) {
      response = await playTwoNotesSequencially(notes, instrument)
    } else {
      response = await playTwoNotesTogether(notes, instrument)
    }

    return response
  }
)

export const audioInitialState = {
  isPlaying: false,
  isComplete: false,
  error: null,
  instrument: INTRUMENTS.violin, 
}

export const audioSlice = createSlice({
  name: 'audio',
  initialState: audioInitialState,

  reducers: {
    updateInstrument(state, action) {
      const { intrument } = action.payload

      state.instrument = INTRUMENTS[intrument]
    }
  },
  extraReducers: {
    [playInterval.pending]: (state, action) => {
      console.log('should be playing....')
      if (!state.isPlaying) {
        state.isPlaying = true
        state.isComplete = false
      }
    },
    [playInterval.fulfilled]: (state, action) => {
      console.log('now its done')
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

export const selectInstrument = state => state.instrument;


export default audioSlice.reducer;