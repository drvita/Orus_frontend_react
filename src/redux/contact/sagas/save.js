import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../../sagas/api";
import { contactActions } from "../.";

export default function* handleSaveContact({ payload }) {
  try {
    const { data = {}, id: ID = null } = payload,
      url = getUrl("contacts", ID),
      method = ID ? "PUT" : "POST",
      result = yield call(api, url, method, data);

    if (result.message && result.errors) {
      //console.log(result.errors, OPT);

      if (result.errors.name) {
        yield put(
          contactActions.setMessageContact([
            {
              type: "error",
              text: result.errors.name[0].replace("name", "Nombre"),
            },
          ])
        );
      } else if (result.errors.email) {
        yield put(
          contactActions.setMessageContact([
            {
              type: "error",
              text: result.errors.email[0],
            },
          ])
        );
      }
    } else if (result.message) {
      yield put(
        contactActions.setMessageContact([
          {
            type: "error",
            text: `Error en servidor, contacte al administrador: \nResponse [${result.message}]`,
          },
        ])
      );
    } else if (result.data) {
      if (ID) console.log("[Orus System] Contacto actualizado con exito", ID);
      else
        console.log("[Orus system] Contacto creado con exito", result.data.id);

      yield put(
        contactActions.setMessageContact([
          {
            type: "success",
            text: ID
              ? "Contacto actualizado con exito"
              : "Contacto almacenado con exito",
          },
        ])
      );
      yield put(contactActions.setContact(result.data));
    }
    //localStorage.setItem("OrusContactInUse", JSON.stringify({}));
  } catch (e) {
    console.error("[OrusSystem] Error in handle save contact --", e);
    yield put(
      contactActions.setMessageContact([
        {
          type: "error",
          text: "En el servidor al almacenar el contacto, intentelo mas tarde",
        },
      ])
    );
  }
}
