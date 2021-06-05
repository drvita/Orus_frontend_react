import { call, put } from "redux-saga/effects";
import {api, getUrl} from "../api";
import {
    TYPE,
} from "../../category/types";

export default function* handleLoggin({payload}) {
    try {
        const {options, id} = payload,
            url = getUrl('categories', id, options),
            result = yield call(
                api,
                url,
                "GET"
            );
        
        if (result.data) {
            yield put({
                type: TYPE.SET_LIST_CATEGORY,
                payload: {
                    result: {
                        list: result.data,
                        metaList: result.meta,
                    },
                    options: payload,
                }
            });
        } else {
            console.error("[Orus System] Fallo traer categorias", result);
            yield put({
                type: TYPE.SET_ERROR_CATEGORY,
                payload: [],
            });
        }
    } catch (e) {
        console.error("[Orus System] Error en saga/category getList:", e);
        yield put({
            type: TYPE.SET_ERROR_CATEGORY,
            payload: [],
        });
    }
}