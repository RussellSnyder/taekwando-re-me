import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";

import { AsyncStorage } from 'react-native'

import dojoReducer from './slices/DojoSlice';
import audioReducer from './slices/AudioSlice';
import profileReducer from './slices/ProfileSlice';

const rootReducer = combineReducers({
  dojo: dojoReducer,
  audio: audioReducer,
  profile: profileReducer,
})

const persistConfig = {
  key: 'taekwandoreme',
  version: 1,
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});

let persistor = persistStore(store);

export {
  persistor,
  store,
}