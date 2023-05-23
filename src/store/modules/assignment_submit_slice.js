import { createSlice } from '@reduxjs/toolkit';

const initial_state = {
  email_attached_files: [],
  lms_attached_files: [],
};

const assignment_submit_slice = createSlice({
  name: 'assignment_submit_slice',
  initialState: initial_state,
  reducers: {
    set_assignment_submit: (state, actions) => {
      const { key, value } = actions.payload;
      return {
        ...state,
        [key]: value
      };
    },
    add_attached_file: (state, actions) => {
      const { method, new_file } = actions.payload;
      return {
        ...state,
        [method]: [...state[method], new_file]
      };
    },
    remove_attached_file: (state, actions) => {
      const { method, file_num } = actions.payload;
      return {
        ...state,
        [method]: state[method].filter((file, idx) => idx !== file_num)
      };
    }
  }
})

export const {
  set_assignment_submit,
  add_attached_file,
  remove_attached_file
} = assignment_submit_slice.actions;

export default assignment_submit_slice;