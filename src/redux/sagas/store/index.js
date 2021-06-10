import { takeLatest } from "redux-saga/effects";
import { TYPE } from "../../store/types";
import getList from "./getList";

export default function* index() {
  //watchers
  console.log("[Orus System] Escuchando eventos de store");
  yield takeLatest(TYPE.SAGA_GET_LIST_STORE, getList);
}
