import { configureStore } from '@reduxjs/toolkit'
import guessListReducer from './guessListSlice'

export const store = configureStore({
  reducer: {
    guessList: guessListReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch