import { call, put } from "redux-saga/effects";
import { api } from "../../sagas/api";
import { orderActions } from "../.";

export default function* handledDeleteOrder({ payload }) {
  try {
    const { id: ID, options } = payload,
      url = `orders/${ID}`,
      result = yield call(api, url, "DELETE");

    if (!result) {
      console.log("[Orus System] Pedido eliminado con exito", ID);
      yield put(
        orderActions.setMessageOrder([
          {
            type: "success",
            text: "Pedido eliminado con exito",
          },
        ])
      );
      yield put(orderActions.getListOrder(options));
    } else {
      console.error("[Orus System] Fallo al eliminar pedido", result.message);
      if (result.message.indexOf("[SQLSTATE[23000]]")) {
        yield put(
          orderActions.setMessageOrder([
            {
              type: "error",
              text: "No se puede eliminar un pedido que tiene asignada una nota de venta",
              errnum: "SQL23000",
            },
          ])
        );
      }
    }
  } catch (e) {
    console.error("[Orus System] Error en handledDeleteOrder", e);
    yield put(
      orderActions.setMessageOrder([
        {
          type: "error",
          text: "al eliminar el pedidos, intentelo mas tarde",
        },
      ])
    );
  }
}
