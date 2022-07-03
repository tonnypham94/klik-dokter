import { createSlice } from '@reduxjs/toolkit'
import { loginUserReducers, loginUserSlice } from './loginUser'

const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {}
const initialState = {
  data: userData,
  error: false,
  loading: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = {}
      localStorage.removeItem("userData")
    }
  },
  extraReducers: {
    ...loginUserReducers,
  }
})

// Reducer
export default userSlice.reducer

// Actions extra
export {
  loginUserSlice,
}

// Actions
export const { logout } = userSlice.actions
