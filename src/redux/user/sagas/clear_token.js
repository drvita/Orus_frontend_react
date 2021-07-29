import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../../sagas/api";
import { userActions } from "..";

export default function* handleClearToken({ payload: id }) {
  try {
    console.log("[Orus System] Enviando notificaciones a la API");
    const url = getUrl("users/clearToken", id),
      result = yield call(api, url, "POST");

    if (result.success) {
      console.log("[Orus System] Se ha eliminado el token del usuario: " + id);
      yield put(userActions.getUser(id));
    } else {
      console.error(
        "[Orus System] No se elimino el token del usuario: " + id,
        result
      );
    }
  } catch (e) {
    console.error(
      "[Orus System] Error en saga/User handleClearToken:",
      e.message
    );
  }
}
