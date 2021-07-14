import { all } from "redux-saga/effects";
import user from "./user";
import { orderSagas } from "../order";
import { categorySagas } from "../category";
import { storeSagas } from "../store/";
import { contactSagas } from "../contact/";
import { examSagas } from "../exam/";

export default function* rootSaga() {
  yield all([
    user(),
    orderSagas(),
    categorySagas(),
    storeSagas(),
    contactSagas(),
    examSagas(),
  ]);
}
