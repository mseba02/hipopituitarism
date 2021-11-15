import { configureStore } from '@reduxjs/toolkit';
import {authSlice} from './redux/reducers/auth/authReducer';
import {profileSlice} from "./redux/reducers/me/meReducer";
import {registerSlice} from "./redux/reducers/register/registerReducer";

export const store = configureStore({
  reducer: {
    loginInfo: authSlice.reducer,
    profile: profileSlice.reducer,
    registerInfo: registerSlice.reducer
  },
});
