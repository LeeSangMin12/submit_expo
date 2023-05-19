import { createSlice } from '@reduxjs/toolkit';

const initial_state = {
  attached_files: [],
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
      const new_file = actions.payload;
      return {
        ...state,
        attached_files: [...state.attached_files, new_file]
      };
    },
    remove_attached_file: (state, actions) => {
      const file_num = actions.payload;
      return {
        ...state,
        attached_files: state.attached_files.filter((file, idx) => idx !== file_num)
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