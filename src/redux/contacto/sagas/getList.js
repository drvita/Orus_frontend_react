import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../../sagas/api";
import { contactActions } from "../.";

export default function* handleGetContacts({ payload, idOrder: id }) {
  try {
    const url = getUrl("contacts", null, payload),
      result = yield call(api, url, "GET");

    if (result.data) {
      yield put(
        contactActions.setListContact({
          result: {
            list: result.data,
            metaList: result.meta,
          },
          options: payload,
        })
      );
      if (id) {
        yield put(
          contactActions.setStateVar({
            key: "orderId",
            val: id,
          })
        );
      }
    } else {
      yield put(
        contactActions.setMessageContact([
          {
            type: "error",
            text: "al traer datos de contactos en la API",
          },
        ])
      );
    }
  } catch (e) {
    console.error("[Orus System] Error in handle getListOrder", e);
    yield put(
      contactActions.setMessageContact([
        {
          type: "error",
          text: "al traer datos de contactos, intentelo mas tarde",
        },
      ])
    );
  }
}
