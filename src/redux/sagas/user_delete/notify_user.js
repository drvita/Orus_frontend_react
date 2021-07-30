import { call, put } from "redux-saga/effects";
import { TYPE } from "../../user/types";
import {api} from "../api";

export default function* handleNotify() {
  try {
    console.log("[Orus System] Consultando notificaciones en la API");
    const result = yield call(api, "user", "GET");
    if (result.data && result.data.id) {
      const { unreadNotifications: NOTIFYS } = result.data;

      console.log("[Orus System] Notificaciones encontradas:", NOTIFYS.length);
      yield put({
        type: TYPE.GET_NOTIFYS,
        payload: NOTIFYS,
      });
    } else if(result.message === "Unauthenticated."){
      yield put({
        type: TYPE.LOGING_DELETE,
        payload: null,
      });
    } else {
      console.error("[Orus System] Error en notificaciones", result);
    }
  } catch (e) {
    console.error("[Orus System] Error in handle notify user", e);
  }
}
