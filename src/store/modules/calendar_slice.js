import { createSlice } from '@reduxjs/toolkit';

const initial_state = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
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
    go_prev_month: (state) => {
      let { year, month } = state;

      month--;
      if (month < 1) {
        month = 12; // 12월을 넘어가면 다음 해의 1월로 설정합니다.
        year--;
      }

      return {
        ...state,
        year,
        month
      };
    },
    go_next_month: (state) => {
      let { year, month } = state;

      month++;
      if (month > 12) {
        month = 1; // 12월을 넘어가면 다음 해의 1월로 설정합니다.
        year++;
      }

      return {
        ...state,
        year,
        month
      };
    },
    go_today: (state) => {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      return {
        ...state,
        year,
        month
      }
    }
  }
})

export const {
  set_calendar,
  go_prev_month,
  go_next_month,
  go_today
} = calendar_slice.actions;

export default calendar_slice;