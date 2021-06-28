import { takeLatest } from "redux-saga/effects";
import { TYPE } from "../types";
import getListContacts from "./getList";
import deleteContact from "./delete";
import saveContact from "./save";
import getContact from "./getContact";

export default function* index() {
  //watchers
  console.log("[Orus System] Escuchando eventos de contacto");
  yield takeLatest(TYPE.SAGA_GET_LIST_CONTACTS, getListContacts);
  yield takeLatest(TYPE.SAGA_DELETE_CONTACT, deleteContact);
  yield takeLatest(TYPE.SAGA_SAVE_CONTACT, saveContact);
  yield takeLatest(TYPE.SAGA_GET_CONTACT, getContact);
}
