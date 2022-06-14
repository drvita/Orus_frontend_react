import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../../sagas/api";
import { saleActions } from "../index";

export default function* handledSaveSale({ payload }) {
  try {
    const { id, data } = payload,
      url = getUrl("sales", id),
      method = id ? "PUT" : "POST",
      result = yield call(api, url, method, data);

    if (!result.message) {
      console.log("[Orus System] Venta almacenada con exito", result.data.id);
      yield put(
        saleActions.setMessagesSale([
          {
            type: "success",
            text: id
              ? "Venta actualizada con exito"
              : "Venta almacenada con exito",
          },
        ])
      );

      yield put(saleActions.setSale(result.data));
    } else {
      console.error("[Orus System] Fallo al almacenar la venta", result);

      yield put(
        saleActions.setMessagesSale([
          {
            type: "error",
            text: "No se puede almacenar la venta",
          },
        ])
      );
    }
  } catch (e) {
    console.error(
      "[Orus System] Error in saga/sales handledSaveSale",
      e.message
    );
    yield put(
      saleActions.setMessagesSale([
        {
          type: "error",
          text: "al almacenar venta, intentelo mas tarde",
        },
      ])
    );
  }
}
