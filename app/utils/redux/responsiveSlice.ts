// responsiveSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  screenWidth: 0,
  screenHeight: 0,
  aspectRatio: 0,
  padWidth: 0,
  padHeight: 0,
  viewportWidth: 0,
  viewportHeight: 0,
  scaleFactor: 0,
};

const responsiveSlice = createSlice({
  name: 'responsive',
  initialState,
  reducers: {
    updateDimensions(state, action) {
      console.log("Inside updateDimensions");
      const { screenWidth, screenHeight } = action.payload;
      state.screenWidth = screenWidth;
      state.screenHeight = screenHeight;
      state.aspectRatio = screenWidth / screenHeight;
      state.padWidth = state.aspectRatio < 1.5 ? 0 : screenWidth - (16 / 9 * screenHeight);
      state.padHeight = state.aspectRatio > 1.5 ? 0 : screenHeight - (screenWidth * 1 / (16 / 9));
      state.viewportWidth = screenWidth - state.padWidth;
      state.viewportHeight = screenHeight - state.padHeight;
      state.scaleFactor = Math.min(screenWidth / 1920, screenHeight / 1080);
    },
  },
});

export const { updateDimensions } = responsiveSlice.actions;
export default responsiveSlice.reducer;
