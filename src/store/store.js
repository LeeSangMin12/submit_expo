import { configureStore } from '@reduxjs/toolkit';

import calendar_slice from './modules/calendar_slice';
import user_reducer from './modules/user_slice';

export default configureStore({
  reducer: {
    calendar: calendar_slice.reducer,
    user: user_reducer.reducer,
  },
});