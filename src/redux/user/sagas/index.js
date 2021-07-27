import { takeLatest } from "redux-saga/effects";
import { TYPE } from "../../user/types";
import loggin from "./loggin_user";
import notify from "./notify_user";
import readNotify from "./notify_user_read";
import checkLoging from "./checkLoging";
import getUserList from "./getList";
import getUser from "./getUser";
import deleteUser from "./deleteUser";

export default function* index() {
  //watchers
  console.log("[Orus System] Escuchando eventos de usuario");
  yield takeLatest(TYPE.SAGA_TRY_LOGING, loggin);
  yield takeLatest(TYPE.SAGA_CHECK_LOGING, checkLoging);
  yield takeLatest(TYPE.SAGA_GET_NOTIFY, notify);
  yield takeLatest(TYPE.SAGA_READ_NOTIFYS, readNotify);
  yield takeLatest(TYPE.SAGA_GET_LIST_USERS, getUserList);
  yield takeLatest(TYPE.SAGA_GET_USER, getUser);
  yield takeLatest(TYPE.SAGA_DELETE_USER, deleteUser);
}
