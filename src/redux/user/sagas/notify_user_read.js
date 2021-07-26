import { call, put } from "redux-saga/effects";
import { TYPE } from "../types";
import { api } from "../../sagas/api";

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
      yield put({
        type: TYPE.SAGA_GET_NOTIFY,
        payload: {},
      });
    }
  } catch (e) {
    console.error("[Orus System] Error in handle read notify user", e);
  }
}
