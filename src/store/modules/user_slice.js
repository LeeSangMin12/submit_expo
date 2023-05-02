import { createSlice } from '@reduxjs/toolkit';
import user_profile from '@/assets/img/my/user_card/user_profile.png';

const initial_state = {
  name: '',
  age: '',
  gender: '',
  university: '',
  department: '',
  admission_year: '',
  nickname: '',
  profile_img: user_profile,
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