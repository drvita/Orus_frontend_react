import { call, put } from "redux-saga/effects";
import {
  LOGGIN_SUCCESS,
  LOGGIN_ERROR,
  LOGGIN_DELETE,
} from "../../actions/login";
import api from "./api";

export default function* handleLoggin(credenciales) {
  try {
    console.log("[Orus System] Consultando credenciales en la API");
    if (credenciales.payload.email && credenciales.payload.password) {
      const result = yield call(
        api,
        "users/login",
        "POST",
        credenciales.payload
      );
      if (result.data) {
        console.log("[Orus System] Servidor:", result.message);
        yield put({
          type: LOGGIN_SUCCESS,
          payload: result,
        });
        yield put({
          type: "default",
          payload: null,
        });
      } else {
        console.error(
          "[Orus System] Fallo la validacion de credenciales en servidor",
          result
        );
        yield put({
          type: LOGGIN_ERROR,
          payload: {
            errors: "Error de procesamiento, llame al administrador",
            result,
          },
        });
      }
    } else {
      yield put({
        type: LOGGIN_DELETE,
        payload: null,
      });
    }
  } catch (e) {
    console.error("[Orus System] Error in handle loggin", e);
    yield put({
      type: LOGGIN_ERROR,
      payload: {
        errors: "Error al conectarse al servidor, compruebe que tiene internet",
        errornum: 500,
      },
    });
  }
}
