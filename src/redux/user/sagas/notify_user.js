import { call, put } from "redux-saga/effects";
import { api } from "../../sagas/api";
import { userActions } from "../index";

export default function* handleNotify() {
  try {
    console.log("[Orus System] Consultando notificaciones en la API");
    const result = yield call(api, "user", "GET");
    if (result.data && result.data.id) {
      const { unreadNotifications: NOTIFYS } = result.data;

      console.log("[Orus System] Notificaciones encontradas:", NOTIFYS.length);
      yield put(userActions.setNotifys(NOTIFYS));
    } else if (result.message === "Unauthenticated.") {
      yield put(userActions.setLogout());
    }
  } catch (e) {
    console.error(
      "[Orus System] Error en notificaciones/saga handleNotify",
      e.message
    );
  }
}
