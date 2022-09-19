import { applyMiddleware, createStore } from "redux"
import createSagaMiddleware from 'redux-saga'
import { rootReducer } from "./Reducer"
import thunk from "redux-thunk"
import { Rootsaga } from "./auth saga/rootsaga"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist:['auth','cart']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
 

const sagaMiddleware = createSagaMiddleware()

const middleWare = [thunk, sagaMiddleware]

export const configureStore = () =>{
  const store = createStore(persistedReducer, applyMiddleware(...middleWare));
  sagaMiddleware.run(Rootsaga)
  return store;
}

export const store = configureStore();

export let persistor = persistStore(store)

export default store;