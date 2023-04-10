import { configureStore } from '@reduxjs/toolkit';

import user_reducer from './modules/user_slice';

export default configureStore({
  reducer: {
    user: user_reducer.reducer,
  },
});