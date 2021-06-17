import { call, put } from "redux-saga/effects";
import { api } from "../api";
import { getListOrder, setMessageOrder } from "../../order/actions";

export default function* handledDeleteOrder({ payload }) {
  try {
    const { id: ID, options: OPTIONS } = payload,
      url = `orders/${ID}`,
      result = yield call(api, url, "DELETE");

    if (!result) {
      console.log("[Orus System] Pedido eliminado con exito", ID);
      yield put(
        setMessageOrder([
          {
            type: "success",
            text: "Pedido eliminado con exito",
          },
        ])
      );
      yield put(getListOrder(OPTIONS));
    } else {
      console.error("[Orus System] Fallo al eliminar ordern", result.message);

      if (result.message.indexOf("[SQLSTATE[23000]]")) {
        yield put(
          setMessageOrder([
            {
              type: "error",
              text: "No se puede eliminar un pedido que tiene asignada una nota de venta",
              errnum: "SQL23000",
            },
          ])
        );
      } else {
        yield put(
          setMessageOrder([
            {
              type: "error",
              text: "No se puede eliminar el pedido",
            },
          ])
        );
      }
    }
  } catch (e) {
    console.error("[Orus System] Error in handle deleteOrder", e);
    yield put(
      setMessageOrder([
        {
          type: "error",
          text: "al eliminar el pedidos, intentelo mas tarde",
        },
      ])
    );
  }
}
