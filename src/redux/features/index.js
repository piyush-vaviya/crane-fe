import { all } from 'redux-saga/effects'
import { channelReducer, channelSaga } from './channelSlice'

export const rootReducer = {
  channels : channelReducer
}

export function* rootSaga() {
  yield all([channelSaga()])
}
