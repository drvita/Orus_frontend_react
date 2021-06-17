import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducers from "./rootReducers";
import rootSaga from "./sagas";

const saga = createSagaMiddleware(),
  composeEnhancers =
    (typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose,
  store = createStore(
    rootReducers,
    composeEnhancers(applyMiddleware(...[saga]))
  );
saga.run(rootSaga);

export default store;
