import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import rootReducer from "../reducers";

const middlewares = [logger, thunk];

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// creatung store by passing all reducers
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(...middlewares)));

export default store;