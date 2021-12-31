import { call, put } from "redux-saga/effects";
import { api, getUrl } from "../../sagas/api";
import { storeActions } from "../index";

export default function* handleGetList({ payload: options }) {
  try {
    const url = getUrl("store", null, options),
      result = yield call(api, url);

    if (result.message) {
      throw new Error(result.message);
    }

    yield put(
      storeActions.setListStore({
        result: {
          list: result.data,
          metaList: result.meta,
          messages: !result.data?.length
            ? [
                {
                  type: "info",
                  text: `El codigo ${options.search} no existe en el almacen`,
                },
              ]
            : [],
        },
      })
    );
  } catch (e) {
    console.error(
      "[Orus System] Error en saga/store handleGetList:",
      e.message
    );
    yield put(
      storeActions.setMessagesStore([
        {
          type: "error",
          text: "En servidor al traer la lista de productos",
        },
      ])
    );
  }
}
