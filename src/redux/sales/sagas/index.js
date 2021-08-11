import { takeLatest } from "redux-saga/effects";
import { TYPE } from "../types";
import getList from "./getList";
import getBanks from "./getListBanks";
import saveSale from "./saveSale";

export default function* index() {
  //watchers
  console.log("[Orus System] Escuchando eventos de ventas");
  yield takeLatest(TYPE.SAGA_GET_LIST_SALES, getList);
  yield takeLatest(TYPE.SAGA_GET_LIST_BANK, getBanks);
  yield takeLatest(TYPE.SAGA_SAVE_SALE, saveSale);
}
