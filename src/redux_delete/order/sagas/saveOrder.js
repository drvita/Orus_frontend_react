import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../../sagas/api";
import { orderActions } from "../.";

export default function* handleSaveOrder({ payload }) {

  try {
    const { data: DATA = {}, id: ID = null, options: OPT = {} } = payload,
      url = getUrl("orders", ID),
      method = ID ? "PUT" : "POST",
      result = yield call(api, url, method, DATA);

    if (result.message) throw new Error(result.message);

    if (ID) console.log("[Orus System] Pedido actualizado con exito: " + ID);
    else console.log("[Orus system] Pedido creado con exito", result.data.id);

    yield put(
      orderActions.setMessageOrder([
        {
          type: "success",
          text: ID
            ? "Pedido actualizado con exito"
            : "Pedido almacenado con exito",
        },
      ])
    );
    yield put(orderActions.getListOrder(OPT));
  } catch (e) {
    console.error("[Orus System] Error in handleSaveOrder", e);
    yield put(
      orderActions.setMessageOrder([
        {
          type: "error",
          text: "al almacenar el pedido, intentelo mas tarde",
        },
      ])
    );
  }
}
