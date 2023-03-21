import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer, userUpdateReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails : userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage }
} 

const middleware = [thunk];

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware,
  devTools: true,
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch

export default store;


