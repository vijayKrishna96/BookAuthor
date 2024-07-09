import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    userLoggedIn: false
  },
  reducers: {
    changeLoginState: (state ,action) =>{
        state.userLoggedIn = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { changeLoginState } = loginSlice.actions

export default loginSlice.reducer