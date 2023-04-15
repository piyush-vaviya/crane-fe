import { all } from 'redux-saga/effects'
import { authUserReducer } from './authUserSlice'
import { channelReducer, channelSaga } from './channelSlice'
import { themeReducer } from './themeSlice'

export const rootReducer = {
  authUser: authUserReducer,
  channels: channelReducer,
  theme: themeReducer,
}

export function* rootSaga() {
  yield all([channelSaga()])
}
