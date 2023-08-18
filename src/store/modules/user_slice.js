import { createSlice } from '@reduxjs/toolkit';

const initial_state = {
  user_email: '',
  name: '',
  age: '',
  gender: '',
  university: '',
  department: '',
  admission_year: '',
  nickname: '',
  img_url: '',
};

const user_slice = createSlice({
  name: 'user_slice',
  initialState: initial_state,
  reducers: {
    set_user: (state, actions) => {
      const { key, value } = actions.payload;
      return {
        ...state,
        [key]: value
      };
    }
  }
})

export const { set_user } = user_slice.actions;

export default user_slice;