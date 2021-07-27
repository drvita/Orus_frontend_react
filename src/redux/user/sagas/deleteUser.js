import { call, put } from "redux-saga/effects";
import { api } from "../../sagas/api";
import { userActions } from "../index";

export default function* handledDeleteUser({ payload }) {
  try {
    const { id: ID, options } = payload,
      url = `users/${ID}`,
      result = yield call(api, url, "DELETE");

    if (!result) {
      console.log("[Orus System] Usuario eliminado con exito", ID);
      yield put(
        userActions.setMessages([
          {
            type: "success",
            text: "Usuario eliminado con exito",
          },
        ])
      );
      yield put(userActions.getListBrands(options));
    } else {
      console.error(
        "[Orus System] Fallo al eliminar el usuario",
        result.message
      );
      if (result.message.indexOf("[SQLSTATE[23000]]")) {
        yield put(
          userActions.setMessages([
            {
              type: "error",
              text: "No se puede eliminar un usuario que tiene actividades",
              errnum: "SQL23000",
            },
          ])
        );
      }
    }
  } catch (e) {
    console.error("[Orus System] Error en saga/users handledDeleteUser", e);
    yield put(
      userActions.setMessages([
        {
          type: "error",
          text: "al eliminar al usuario, intentelo mas tarde",
        },
      ])
    );
  }
}
