import { all } from "redux-saga/effects";
import user from "./user";
import order from "./order";
import category from "./category";
import store from "./store";

export default function* rootSaga() {
  yield all([user(), order(), category(), store()]);
}
