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

const rootReducer = combineReducers({
  dojo: dojoReducer,
  audio: audioReducer,
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


// console.log(store.getState())


// const store = configureStore({
//   reducer: {
//     dojo: dojoReducer,
//   },
//   preloadedState: load(persistOptions),
//   middleware: [save(persistOptions), ...getDefaultMiddleware()]
// });

let persistor = persistStore(store);

export {
  persistor,
  store,
}