import { call, put } from "redux-saga/effects";
import { api } from "../../sagas/api";
import { userActions } from "..";

export default function* handleLoggin() {
  try {
    const result = yield call(api, "user");
    if (result.message && result.message === "Unauthenticated.") {
      console.log("[Orus System] Token de usuario no valido");
      yield put(userActions.setLogout());
    } else {
      console.log(
        "[Orus System] Verificacion de usuario correcta",
        result.data.username
      );
    }
  } catch (e) {
    console.error("[Orus System] Error in handle check loggin", e);
  }
}
