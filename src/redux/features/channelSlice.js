import { createSlice } from '@reduxjs/toolkit'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { ChannelAPI } from '../api/channelAPI'

const initialState = {
  isLoading: false,
  channels: [],
}

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    getChannels: (state) => {
      state.channels = []
      state.isLoading = true
    },

    setChannels: (state, action) => {
      state.channels = action.payload.channels
      state.isLoading = false
    },
  },
})

const channelActions = channelSlice.actions
const channelReducer = channelSlice.reducer

export { channelActions, channelReducer }

function* getChannels() {
  const res = yield call(ChannelAPI.getChannels)

  if (res?.error) {
    yield put(
      channelActions.setChannels({
        channels: [],
      })
    )
    return
  }

  yield put(
    channelActions.setChannels({
      channels: res,
    })
  )
}

export function* channelSaga() {
  yield all([takeLatest(channelActions.getChannels, getChannels)])
}
