import { createSlice } from '@reduxjs/toolkit';

const initial_state = {
  year_month: '',
};

const calendar_slice = createSlice({
  name: 'calendar_slice',
  initialState: initial_state,
  reducers: {
    set_calendar: (state, actions) => {
      const { key, value } = actions.payload;
      return {
        ...state,
        [key]: value
      };
    },
  }
})

export const { set_calendar } = calendar_slice.actions;

export default calendar_slice;