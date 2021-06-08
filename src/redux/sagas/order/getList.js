import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../api";
import { setListOrder, setMessageOrder } from "../../order/actions";

export default function* handleGetOrder({ payload }) {
  try {
    const url = getUrl("orders", null, payload),
      result = yield call(api, url, "GET");

    yield put(
      setListOrder({
        result: {
          list: result.data,
          metaList: result.meta,
        },
        options: payload,
      })
    );
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
