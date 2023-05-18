import { configureStore } from '@reduxjs/toolkit';

import assignment_submit_slice from './modules/assignment_submit_slice';
import calendar_slice from './modules/calendar_slice';
import user_reducer from './modules/user_slice';

export default configureStore({
  reducer: {
    assignment_submit: assignment_submit_slice.reducer,
    calendar: calendar_slice.reducer,
    user: user_reducer.reducer,
  },
});