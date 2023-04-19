import { createSlice } from "@reduxjs/toolkit";

export interface User {
  userName: string;
  photo: string;
  email: string;
  uid: string;
}

interface UserState {
  user: User | null;
}

const initialState = { user: {} } as UserState;

export const UserSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state: UserState, action) => {
      state.user = action.payload;
    },
    logout: (state: UserState) => {
      state.user = null;
    },
  },
});

export const { login, logout } = UserSlice.actions;
export const selectUser = (state: any) => state.user.user;
export default UserSlice.reducer;
