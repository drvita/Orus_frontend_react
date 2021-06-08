import { all } from "redux-saga/effects";
import user from "./user";
import order from "./order";
import category from "./category";

export default function* rootSaga() {
    yield all([
        user(),
        order(),
        category(),
    ]);
}