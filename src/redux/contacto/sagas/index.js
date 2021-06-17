import { takeLatest } from "redux-saga/effects";
import { TYPE } from "../types";
import getList from "./getList";
//import deleteContact from "./deleteOrder";
//import saveContact from "./saveOrder";

export default function* index() {
  //watchers
  console.log("[Orus System] Escuchando eventos de contacto");
  yield takeLatest(TYPE.SAGA_GET_LIST_CONTACT, getList);
  //yield takeLatest(TYPE.SAGA_DELETE_CONTACT, deleteContact);
  //yield takeLatest(TYPE.SAGA_SAVE_CONTACT, saveContact);
}
