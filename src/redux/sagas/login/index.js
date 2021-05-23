import { takeLatest } from "redux-saga/effects";
import { TRY_LOGGIN } from "../../actions/login";
import loggin from "./loggin";

export default function* index() {
  //watchers
  console.log("[Orus System] Escuchando eventos logging");
  yield takeLatest(TRY_LOGGIN, loggin);
}
