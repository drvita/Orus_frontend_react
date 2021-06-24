import { takeLatest } from "redux-saga/effects";
import { TYPE } from "../types";
import getList from "./getList";

export default function* index() {
  //watchers
  console.log("[Orus System] Escuchando eventos de exam");
  yield takeLatest(TYPE.SAGA_GET_LIST_EXAM, getList);
}
