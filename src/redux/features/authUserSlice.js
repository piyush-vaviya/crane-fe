import { createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initialState = {}

export const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    loginCrane: (state, action) => {
      const user = action.payload
      console.log(typeof user)
      return (state = { ...user })
    },
    logOutToCrane: (state, action) => {
      return (state = {})
    },
  },
})
const authUserActions = authUserSlice.actions

const persistConfig = {
  key: 'crane-root-state',
  storage,
}

const authUserReducer = persistReducer(persistConfig, authUserSlice.reducer)

export { authUserActions, authUserReducer }
