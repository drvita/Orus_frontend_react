import { takeLatest } from "redux-saga/effects";
import { TYPE } from "../types";
import getList from "./getList";
import deleteITem from "./deleteItem";
import getItem from "./getItem";

export default function* index() {
  //watchers
  console.log("[Orus System] Escuchando eventos de store");
  yield takeLatest(TYPE.SAGA_GET_LIST_STORE, getList);
  yield takeLatest(TYPE.SAGA_DELETE_STORE, deleteITem);
  yield takeLatest(TYPE.SAGA_GET_ITEM, getItem);
}
