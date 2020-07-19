import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  playTwoNotesTogether,
  playTwoNotesSequencially,
} from '../utils/audio-player'

import INTRUMENTS from '../utils/intruments'
import { get } from 'lodash';

// First, create the thunk
export const playInterval = createAsyncThunk(
  'audio/playInterval',
  async ({ notes, isSequence, instrument }, { getState }) => {
    const { isPlaying, isComplete } = getState().audio

    console.log(isSequence)
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
  error: null
}

export const audioSlice = createSlice({
  name: 'audio',
  initialState: audioInitialState,

  reducers: {},
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


export default audioSlice.reducer;