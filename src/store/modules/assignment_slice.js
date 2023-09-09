import { createSlice } from '@reduxjs/toolkit';

const initial_state = {
  assignment_list: [],
};

const assignment_slice = createSlice({
  name: 'assignment_slice',
  initialState: initial_state,
  reducers: {
    set_assignment: (state, actions) => {
      const { key, value } = actions.payload;

      return {
        ...state,
        [key]: value
      };
    },
  }
})

export const {
  set_assignment,
} = assignment_slice.actions;

export default assignment_slice;