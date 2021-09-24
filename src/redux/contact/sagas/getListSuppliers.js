import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../../sagas/api";
import { contactActions } from "../../contact/index";

export default function* handleGetListSuppliers({ payload = 0 }) {
  try {
    const options = {
        type: 1,
        business: payload !== null ? payload : "",
        orderby: "name",
        order: "asc",
      },
      url = getUrl("contacts", null, options),
      result = yield call(api, url);

    if (result.data) {
      yield put(contactActions.setListSuppliers(result.data));
    }
  } catch (e) {
    console.error("[Orus System] Error en saga handleGetListSuppliers:", e);
    yield put(contactActions.setMessageContact([]));
  }
}
