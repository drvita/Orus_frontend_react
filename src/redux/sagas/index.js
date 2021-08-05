import { all } from "redux-saga/effects";
//Sagas
import { userSagas } from "../user/";
import { orderSagas } from "../order/";
import { categorySagas } from "../category/";
import { storeSagas } from "../store/";
import { contactSagas } from "../contact/";
import { examSagas } from "../exam/";
import { saleSagas } from "../sales/";

export default function* rootSaga() {
  yield all([
    userSagas(),
    orderSagas(),
    categorySagas(),
    storeSagas(),
    contactSagas(),
    examSagas(),
    saleSagas(),
  ]);
}
