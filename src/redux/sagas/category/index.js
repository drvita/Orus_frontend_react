import { takeLatest } from "redux-saga/effects";
import { TYPE } from "../../category/types";
import getList from "./getList";

export default function* index() {
  //watchers
  console.log("[Orus System] Escuchando eventos de categorias");
  yield takeLatest(TYPE.SAGA_GET_LIST_CATEGORIES, getList);
}
