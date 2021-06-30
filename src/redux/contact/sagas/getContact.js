import { call, put } from "redux-saga/effects";
import { api } from "../../sagas/api";
import { contactActions } from "../.";

export default function* handleGetContact({ payload: id }) {
  try {
    const result = yield call(api, `contacts/${id}`, "GET");

    if (result.data) {
      yield put(contactActions.setContact(result.data));
    } else {
      console.error("[Orus System] Error in handle GET Contact", result);
      yield put(
        contactActions.setMessageContact([
          {
            type: "error",
            text: "al traer datos de contacto en la API",
          },
        ])
      );
    }
  } catch (e) {
    console.error("[Orus System] Error in handle GET Contact", e);
    yield put(
      contactActions.setMessageContact([
        {
          type: "error",
          text: "al traer datos de contacto, intentelo mas tarde",
        },
      ])
    );
  }
}
