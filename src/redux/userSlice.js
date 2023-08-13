const { createSlice } = require('@reduxjs/toolkit');

const userSlice = createSlice({
  name: 'user',
  initialState: '',
  reducers: {
    setUserSlice(state, action) {
      return (state = action.payload);
    },
  },
});

export const { setUserSlice } = userSlice.actions;
export const userReducer = userSlice.reducer;
