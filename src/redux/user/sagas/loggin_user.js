import { call, put } from "redux-saga/effects";
import { api } from "../../sagas/api";
import { userActions } from "../index";

export default function* handleLoggin({ payload: credenciales }) {
  try {
    console.log("[Orus System] Consultando credenciales en la API");
    if (credenciales.email && credenciales.password) {
      const result = yield call(api, "users/login", "POST", credenciales);
      if (result.data) {
        console.log("[Orus System] Servidor:", result.message);
        yield put(userActions.setLoggin(result));
        yield put(
          userActions.setMessages([
            {
              type: "success",
              text: `Bienvenido al sistema: ${result.data.username}`,
            },
          ])
        );
      } else {
        console.error(
          "[Orus System] Fallo la validacion de credenciales en servidor",
          result
        );
        yield put(
          userActions.setMessages([
            {
              type: "error",
              text: "Credenciales no validas",
            },
          ])
        );
      }
    } else {
      yield put(
        userActions.setMessages([
          {
            type: "error",
            text: "No se enviaron las credenciales del usuario",
          },
        ])
      );
    }
  } catch (e) {
    console.error("[Orus System] Error en handle loggin", e);
    yield put(
      userActions.setMessages([
        {
          type: "error",
          text: "Desconocido, comuniquese con el administrador del sistema",
        },
      ])
    );
  }
}
