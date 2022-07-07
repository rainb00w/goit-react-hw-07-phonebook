import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: '' };

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    createFilter(state, action) {
      state.value = action.payload;
    },
  },
});

export const { createFilter } = filterSlice.actions;

export default filterSlice.reducer;
