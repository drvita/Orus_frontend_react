import { call, put } from "redux-saga/effects";
import api from "../api";
import {
    TYPE,
} from "../../order/types";

export default function* handleLoggin({payload}) {
    try {
        const {id:ID, meta: META} = payload,
            url = `orders/${ID}`,
            result = yield call(
                api,
                url,
                "DELETE"
            );

        if (!result) {
            yield put({
                type: TYPE.SAGA_GET_LIST,
                payload: {
                    page: META.page,
                    orderby: META.orderby,
                    order: META.order,
                    search: META.search,
                    status: META.status,
                },
            });
        } else {
            console.error("[Orus System] Fallo al eliminar ordern", result.message);
            if(result.message.indexOf("[SQLSTATE[23000]]")){
                yield put({
                    type: TYPE.SET_ERROR,
                    payload: [
                        {
                            type: "SQL23000",
                            message: "No se puede eliminar una orden que tiene asignada una nota de venta",
    
                        }
                    ],
                });
            } else {
                yield put({
                    type: TYPE.SET_ERROR,
                    payload: [],
                });
            }
        }
    } catch (e) {
        console.error("[Orus System] Error in handle deleteOrder", e);
        yield put({
            type: TYPE.SET_ERROR,
            payload: [],
        });
    }
}