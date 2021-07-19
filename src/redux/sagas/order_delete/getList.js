import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../api";
import {
  setListOrder,
  setMessageOrder,
  setStateVar,
} from "../../order/actions";

export default function* handleGetOrder({ payload, idOrder: id }) {
  try {
    const url = getUrl("orders", null, payload),
      result = yield call(api, url, "GET");

    if (result.data) {
      yield put(
        setListOrder({
          result: {
            list: result.data,
            metaList: result.meta,
          },
          options: payload,
        })
      );
      if (id) {
        yield put(
          setStateVar({
            key: "orderId",
            val: id,
          })
        );
      }
    } else {
      yield put(
        setMessageOrder([
          {
            type: "error",
            text: "al traer datos de pedidos en la API",
          },
        ])
      );
    }
  } catch (e) {
    console.error("[Orus System] Error in handle getListOrder", e);
    yield put(
      setMessageOrder([
        {
          type: "error",
          text: "al traer datos de pedidos, intentelo mas tarde",
        },
      ])
    );
  }
}
