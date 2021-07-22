import { call, put } from "redux-saga/effects";
import { api } from "../../sagas/api";
import { storeActions } from "../index";

export default function* handledDeleteBrand({ payload }) {
  try {
    const { id: ID, options } = payload,
      url = `brands/${ID}`,
      result = yield call(api, url, "DELETE");

    if (!result) {
      console.log("[Orus System] Marca eliminada con exito", ID);
      yield put(
        storeActions.setMessagesStore([
          {
            type: "success",
            text: "Marca eliminada con exito",
          },
        ])
      );
      yield put(storeActions.getListBrands(options));
    } else {
      console.error("[Orus System] Fallo al eliminar marca", result.message);
      if (result.message.indexOf("[SQLSTATE[23000]]")) {
        yield put(
          storeActions.setMessagesStore([
            {
              type: "error",
              text: "No se puede eliminar un marca que ya esta relacionado con un producto",
              errnum: "SQL23000",
            },
          ])
        );
      }
    }
  } catch (e) {
    console.error("[Orus System] Error en saga handledDeleteBrand", e);
    yield put(
      storeActions.setMessagesStore([
        {
          type: "error",
          text: "al eliminar la marca, intentelo mas tarde",
        },
      ])
    );
  }
}
