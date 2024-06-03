import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'; 
import questsReducer from '../features/questsSlice.ts';

export const store = configureStore({
  reducer: {
    quests: questsReducer,
  },

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
