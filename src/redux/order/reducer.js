import { TYPE } from "./types";

const LS = localStorage.getItem("OrusSystem"),
  { orders: ORDER = {} } = JSON.parse(LS ? LS : "{}"),
  {
    orderBy: OBY = "updated_at",
    order: ORD = "desc",
    search: SEARCH = "",
    page: PAGE = 1,
    status: STATUS = "",
    itemsPage: IP = 10,
  } = ORDER,
  DEFAULT_STATE = {
    list: [],
    metaList: {},
    orderId: 0,
    orderby: OBY,
    order: ORD,
    search: SEARCH,
    page: PAGE,
    status: STATUS,
    itemsPage: IP,
    errors: [],
    messages: [],
    loading: false,
  };

const default_reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case TYPE.SAGA_GET_LIST: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_DELETE_ORDER: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_SAVE_ORDER: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SET_LIST: {
      const { payload } = action,
        LS = localStorage.getItem("OrusSystem"),
        localstorage = JSON.parse(LS ? LS : "{}"),
        storage = {
          ...localstorage,
          orders: {
            ...payload.options,
          },
        };

      localStorage.setItem("OrusSystem", JSON.stringify(storage));

      return {
        ...state,
        ...payload.result,
        ...payload.options,
        orderId: 0,
        messages: [],
        loading: false,
      };
    }
    case TYPE.SET_STATE_VAR: {
      const { payload } = action;
      return {
        ...state,
        [payload.key]: payload.val,
      };
    }
    case TYPE.SET_ERROR: {
      const { payload } = action;
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    }
    case TYPE.SET_MESSAGE: {
      const { payload } = action;
      return {
        ...state,
        loading: false,
        messages: payload,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default default_reducer;
