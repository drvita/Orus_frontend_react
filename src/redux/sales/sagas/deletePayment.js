import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../../sagas/api";
import { saleActions } from "../index";

export default function* handledDeletePayment({ payload }) {
  try {
    const { id: ID, sale_id } = payload,
      url = getUrl("payments", ID),
      result = yield call(api, url, "DELETE");

    if (!result) {
      yield put(
        saleActions.setMessagesSale([
          {
            type: "success",
            text: "Pago eliminado con exito",
          },
        ])
      );
      if (sale_id) yield put(saleActions.getSale(sale_id));
      console.log("[Orus System] Pago eliminado con exito", ID);
    } else {
      console.error("[Orus System] Fallo al eliminar el pago", result.message);
      yield put(
        saleActions.setMessagesSale([
          {
            type: "error",
            text: "No se puede eliminar el pago",
          },
        ])
      );
    }
  } catch (e) {
    console.error(
      "[Orus System] Error en payment/saga handledDeletePayment",
      e.message
    );
    yield put(
      saleActions.setMessagesSale([
        {
          type: "error",
          text: "al eliminar el pago, intentelo mas tarde",
        },
      ])
    );
  }
}
