import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import logger from "redux-logger";

import rootReducer from "../reducers";

const persistConfig = {
    key: "root",
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [logger, thunk];

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// creatung store by passing all reducers
const store = createStore(persistedReducer, composeEnhancer(applyMiddleware(...middlewares)));
// Persistor store
const persistor = persistStore(store);

export { store, persistor };