import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import createSagaMiddleware from '@redux-saga/core'
import { rootReducer, rootSaga } from './features'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
})

export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)
