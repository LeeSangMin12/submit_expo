import { createSlice } from '@reduxjs/toolkit';

const initial_state = {
  alarm_cycle
};

const assignment_add_slice = createSlice({
  name: 'assignment_add_slice',
  initialState: initial_state,
  reducers: {
    set_assignment_add: (state, actions) => {
      const { key, value } = actions.payload;
      return {
        ...state,
        [key]: value
      };
    },
  }
})

export const {
  set_assignment_add,
} = assignment_add_slice.actions;

export default assignment_add_slice;