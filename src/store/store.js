import { configureStore } from '@reduxjs/toolkit';

import assignment_slice from './modules/assignment_slice';
import calendar_slice from './modules/calendar_slice';
import semester_slice from './modules/semester_slice';
import user_reducer from './modules/user_slice';

export default configureStore({
  reducer: {
    assignment: assignment_slice.reducer,
    calendar: calendar_slice.reducer,
    semester: semester_slice.reducer,
    user: user_reducer.reducer,
  },
});