import { createAsyncThunk } from '@reduxjs/toolkit'
import { login } from '../../api'

export const loginUserSlice = createAsyncThunk('user/login', async (data) => {
  const users = await login(data)
  return users
})

export const loginUserReducers = {
  [loginUserSlice.pending]: (state) => {
    state.loading = true
  },

  [loginUserSlice.rejected]: (state, action) => {
    state.loading = false
    state.error = action?.payload?.error || true
  },

  [loginUserSlice.fulfilled]: (state, action) => {
    const userData = {
      email: action?.meta?.arg?.email,
      token: action?.payload?.data?.token
    }
    state.loading = false
    state.data = userData
    localStorage.setItem('userData', JSON.stringify(userData))
  },
}
