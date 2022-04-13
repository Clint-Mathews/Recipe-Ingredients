import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category } from '../models/Category'
import type { RootState } from '../store'
import updateCategoires from './updateCatergory'

// Define a type for the slice state
interface AuthState {
  isLoggedIn: boolean
}
// Define the initial state using that type
const initialState : AuthState = {
    isLoggedIn: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
     state.isLoggedIn = true;
    },
    logout: (state) => {
     state.isLoggedIn = false;
    }
  },
})

export const { login, logout } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const isLoggedIn = (state: RootState) => state.auth.isLoggedIn

export default authSlice.reducer