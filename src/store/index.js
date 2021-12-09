import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

const middleware = applyMiddleware(thunk);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// creatung store by passing all reducers
const store = createStore(rootReducer, composeEnhancer(middleware));

export default store;