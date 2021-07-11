import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../../sagas/api";
import { contactActions } from "../.";

export default function* handledDeleteContact({ payload }) {
  try {
    const { id: ID } = payload,
      url = getUrl("contacts", ID),
      result = yield call(api, url, "DELETE");

    if (!result) {
      console.log("[Orus System] Contacto eliminado con exito", ID);
      yield put(
        contactActions.setMessageContact([
          {
            type: "success",
            text: "Contacto eliminado con exito",
          },
        ])
      );
      //yield put(contactActions.getListContacts(OPTIONS));
    } else {
      console.error(
        "[Orus System] Fallo al eliminar el contacto",
        result.message
      );

      if (result.message.indexOf("[SQLSTATE[23000]]")) {
        yield put(
          contactActions.setMessageContact([
            {
              type: "error",
              text: "No se puede eliminar un contacto que tiene registros",
              errnum: "SQL23000",
            },
          ])
        );
      } else {
        yield put(
          contactActions.setMessageContact([
            {
              type: "error",
              text: "No se puede eliminar el contacto",
            },
          ])
        );
      }
    }
  } catch (e) {
    console.error("[Orus System] Error in handle delete contact", e);
    yield put(
      contactActions.setMessageContact([
        {
          type: "error",
          text: "al eliminar el contacto, intentelo mas tarde",
        },
      ])
    );
  }
}
