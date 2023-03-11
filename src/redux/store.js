import { combineReducers } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import userReducer from '../features/user/userSlice'
import authUserReducer from '../features/user/authUserSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import createSagaMiddleware from '@redux-saga/core'
import { rootSaga } from './features'
import { channelReducer } from './features/channelSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  user: userReducer,
  counter: counterReducer,
  authUser: authUserReducer,
  channels: channelReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)
