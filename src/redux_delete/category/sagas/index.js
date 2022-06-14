import { takeLatest } from "redux-saga/effects";
import { TYPE } from "../types";
import getList from "./getList";
import getCategory from "./getCategory";
import deleteCategory from "./deleteCategory";
import saveCategory from "./saveCategory";

export default function* index() {
  //watchers
  console.log("[Orus System] Escuchando eventos de categorias");
  yield takeLatest(TYPE.SAGA_GET_LIST_CATEGORIES, getList);
  yield takeLatest(TYPE.SAGA_GET_CATEGORY, getCategory);
  yield takeLatest(TYPE.SAGE_DELETE_CATEGORY, deleteCategory);
  yield takeLatest(TYPE.SAGA_SAVE_CATEGORY, saveCategory);
}
