import { takeLatest } from "redux-saga/effects";
import { TYPE } from "../../order/types";
import getList from "./getList";
import deleteOrder from "./deleteOrder";
import saveOrder from "./saveOrder";

export default function* index() {
  //watchers
  console.log("[Orus System] Escuchando eventos de ordenes");
  yield takeLatest(TYPE.SAGA_GET_LIST, getList);
  yield takeLatest(TYPE.SAGA_DELETE_ORDER, deleteOrder);
  yield takeLatest(TYPE.SAGA_SAVE_ORDER, saveOrder);
}
