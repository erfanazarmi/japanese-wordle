import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GuessType = {
  value: string,
  tag: string
}[];
export type GuessListType = GuessType[];

const initialState: GuessListType = [];

const guessListSlice = createSlice({
  name: 'guessList',
  initialState,
  reducers: {
    addToGuessList(state, action: PayloadAction<GuessType>) {
      state.push(action.payload);
    },
    clearGuessList(state) {
      state.length = 0;
    }
  }
});

export default guessListSlice.reducer
export const { addToGuessList, clearGuessList } = guessListSlice.actions