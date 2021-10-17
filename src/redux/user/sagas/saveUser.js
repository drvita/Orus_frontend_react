import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../../sagas/api";
import { userActions } from "../index";

export default function* handleSaveUser({ payload }) {
  try {
    const {
        data: DATA = {},
        id: ID = null,
        options: OPT = {},
        currentUser = 0,
      } = payload,
      url = getUrl("users", ID),
      method = ID ? "PUT" : "POST",
      result = yield call(api, url, method, DATA);

    if (result.message) throw new Error(result.message);

    if (ID) console.log("[Orus System] Usuario actualizada con exito: " + ID);
    else console.log("[Orus system] Usuario creado con exito", result.data.id);

    yield put(
      userActions.setMessages([
        {
          type: "success",
          text: ID
            ? "Usuario actualizado con exito"
            : "Usuario almacenado con exito",
        },
      ])
    );
    yield put(userActions.setUser(result.data));
    if (ID === currentUser) {
      yield put(
        userActions.setLoggin({
          data: result.data,
        })
      );
    }

    if (OPT) yield put(userActions.getListUsers(OPT));
  } catch (e) {
    console.error("[Orus System] Error en saga/users handleSaveUser", e);
    yield put(
      userActions.setMessages([
        {
          type: "error",
          text: "al almacenar el usuario, intentelo mas tarde",
        },
      ])
    );
  }
}
