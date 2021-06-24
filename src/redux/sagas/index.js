import { all } from "redux-saga/effects";
import user from "./user";
import order from "./order";
import category from "./category";
import { storeSagas } from "../store/";
import { contactSagas } from "../contact/";
import { examSagas } from "../exam/";

export default function* rootSaga() {
  yield all([
    user(),
    order(),
    category(),
    storeSagas(),
    contactSagas(),
    examSagas(),
  ]);
}
