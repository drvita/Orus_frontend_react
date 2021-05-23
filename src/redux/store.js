import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducers from "./reducers/rootReducers";
import rootSaga from "./sagas";

const saga = createSagaMiddleware();
const store = createStore(rootReducers, applyMiddleware(saga));

saga.run(rootSaga);

export default store;
