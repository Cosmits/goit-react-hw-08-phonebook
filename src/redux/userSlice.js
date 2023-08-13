const { createSlice } = require('@reduxjs/toolkit');

export const defUser = {
  user: null,
  token: null,
  registered: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: defUser,
  reducers: {
    setUserSlice(state, action) {
      return (state  = action.payload);
    },
  },
});

export const { setUserSlice } = userSlice.actions;
export const userReducer = userSlice.reducer;
