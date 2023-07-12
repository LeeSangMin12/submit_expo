import { createSlice } from '@reduxjs/toolkit';

const initial_state = {
  semester_list: [],
  default_semester: '',
  default_semester_id: '',
};

const semester_slice = createSlice({
  name: 'semester_slice',
  initialState: initial_state,
  reducers: {
    set_semester_list: (state, actions) => {
      const { key, value } = actions.payload;

      return {
        ...state,
        [key]: value
      };
    }
  }
});

export const { set_semester_list } = semester_slice.actions;

export default semester_slice;