import { takeLatest } from "redux-saga/effects";
import { TYPE } from "../types";
import getList from "./getList";
import deleteExam from "./delete";

export default function* index() {
  //watchers
  console.log("[Orus System] Escuchando eventos de exam");
  yield takeLatest(TYPE.SAGA_GET_LIST_EXAM, getList);
  yield takeLatest(TYPE.SAGA_DELETE_EXAM, deleteExam);
}
