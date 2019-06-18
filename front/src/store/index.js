import { createStore, applyMiddleware, compose } from "redux";

import rootReducer from "./reducers/";
import sagaMiddleware from "./middleware/saga";
import rootSaga from "./sagas";
import middlewares from "./middleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

export default store;
