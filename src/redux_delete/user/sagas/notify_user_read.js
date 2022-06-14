import { call, put } from "redux-saga/effects";
import { api } from "../../sagas/api";
import { userActions } from "..";

export default function* handleNotifyRead({ payload }) {
  try {
    console.log("[Orus System] Enviando notificaciones a la API");
    const result = yield call(
        api,
        "user/readAllNotifications",
        "POST",
        payload
      ),
      count = parseInt(payload.id) < 0 ? "Todas" : 1;
    if (result.success) {
      console.log("[Orus System] Notificaciones marcadas leidas:", count);
      yield put(userActions.getNotifyUser());
    }
  } catch (e) {
    console.error(
      "[Orus System] Error en saga/Users handleNotifyRead",
      e.message
    );
  }
}
