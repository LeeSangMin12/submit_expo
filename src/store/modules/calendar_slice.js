import { createSlice } from '@reduxjs/toolkit';



const set_year_month = () => {
  let date = new Date();

  const view_year = date.getFullYear();
  const view_month = date.getMonth() + 1;

  return `${view_year}.${view_month}`
}

const initial_state = {
  year_month: set_year_month(),
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