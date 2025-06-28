import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  currentUser: any;
}

const initialState: UserState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setCurrentUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
