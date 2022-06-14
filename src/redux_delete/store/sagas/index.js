import { takeLatest } from "redux-saga/effects";
import { TYPE } from "../types";
import getList from "./getList";
import deleteITem from "./deleteItem";
import getItem from "./getItem";
import saveItem from "./saveItem";
import getListBrands from "./getListBrands";
import saveBrand from "./saveBrand";
import deleteBrand from "./deleteBrand";
import saveInBranch from "./saveItemBranch";

export default function* index() {
  //watchers
  console.log("[Orus System] Escuchando eventos de store");
  yield takeLatest(TYPE.SAGA_GET_LIST_STORE, getList);
  yield takeLatest(TYPE.SAGA_DELETE_STORE, deleteITem);
  yield takeLatest(TYPE.SAGA_GET_ITEM, getItem);
  yield takeLatest(TYPE.SAGA_SAVE_ITEM, saveItem);
  yield takeLatest(TYPE.SAGA_GET_LIST_BRANDS, getListBrands);
  yield takeLatest(TYPE.SAGA_SAVE_BRAND, saveBrand);
  yield takeLatest(TYPE.SAGA_DELETE_BRAND, deleteBrand);
  yield takeLatest(TYPE.SAGA_SAVE_INBRANCH, saveInBranch);
}
