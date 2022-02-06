import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import RootReducer from './RootReducer'
import { persistStore,persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'
// export const JSOGTransform = createTransform(
//     (inboundState, key) => JSOG.encode(inboundState),
//     (outboundState, key) => JSOG.decode(outboundState),
// )

const persistConfig = {
    key:'root',
    storage:storageSession,
    blackList:['socket']
   // transforms: [JSOGTransform]
}
const persistedReducer = persistReducer(persistConfig,RootReducer)

const middlewares = [logger];

export const store = createStore(persistedReducer,applyMiddleware(...middlewares))
export const Persister = persistStore(store)
