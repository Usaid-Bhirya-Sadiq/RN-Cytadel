// store.js
import { configureStore } from '@reduxjs/toolkit';
import responsiveReducer from './responsiveSlice';

export default configureStore({
  reducer: {
    responsive: responsiveReducer,
  },
});
