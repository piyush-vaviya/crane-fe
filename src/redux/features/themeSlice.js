import { createSlice } from '@reduxjs/toolkit'
import { ThemeTypes } from '../../components/utils/common/constants'
import { LocalStorages } from '../../components/utils/common/localstorage'

const initialState = {
  theme: ThemeTypes.dark,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      LocalStorages.setTheme(action.payload.theme)
      state.theme = action.payload.theme
    },
  },
})

export const themeActions = themeSlice.actions
export const themeReducer = themeSlice.reducer
