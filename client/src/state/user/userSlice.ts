import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  cartItems: Array<unknown>;
  _id: string;
}

const initialState: UserState = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  cartItems: [],
  _id: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
