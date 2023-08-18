import { createSlice } from '@reduxjs/toolkit';

const initial_state = {
  submit_method: 'E-mail',
  email_submit_date_time: new Date().toISOString(),
  email_email_address: '',
  email_title: '',
  email_description: '',
  email_file_list: [],
  lms_url: '',
  lms_file_list: [],
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
  }
})

export const {
  set_assignment_submit,
} = assignment_submit_slice.actions;

export default assignment_submit_slice;