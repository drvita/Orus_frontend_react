import { call, put } from "redux-saga/effects";
import { api } from "../../sagas/api";
import { storeActions } from "../index";

export default function* handledDeleteItem({ payload }) {
  try {
    const { id: ID, options } = payload,
      url = `store/${ID}`,
      result = yield call(api, url, "DELETE");

    if (!result) {
      console.log("[Orus System] Item eliminado con exito", ID);
      yield put(
        storeActions.setMessagesStore([
          {
            type: "success",
            text: "Producto eliminado con exito",
          },
        ])
      );
      yield put(storeActions.getListStore(options));
    } else {
      console.error("[Orus System] Fallo al eliminar producto", result.message);
      if (result.message.indexOf("[SQLSTATE[23000]]")) {
        yield put(
          storeActions.setMessagesStore([
            {
              type: "error",
              text: "No se puede eliminar un producto que ya esta relacionado con una venta",
              errnum: "SQL23000",
            },
          ])
        );
      }
    }
  } catch (e) {
    console.error("[Orus System] Error en handledDeleteItem", e);
    yield put(
      storeActions.setMessagesStore([
        {
          type: "error",
          text: "al eliminar el producto, intentelo mas tarde",
        },
      ])
    );
  }
}
