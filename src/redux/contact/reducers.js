import { TYPE } from "./types";

const LS = localStorage.getItem("OrusSystem"),
  { contact: CONTACT = {} } = JSON.parse(LS ? LS : "{}"),
  {
    orderBy: OBY = "updated_at",
    order: ORD = "desc",
    search: SEARCH = "",
    page: PAGE = 1,
    status: STATUS = "",
    itemsPage: IP = 10,
  } = CONTACT,
  DEFAULT_STATE = {
    list: [],
    metaList: {},
    orderby: OBY,
    order: ORD,
    search: SEARCH,
    page: PAGE,
    status: STATUS,
    itemsPage: IP,
    messages: [],
    loading: false,
  };

const default_reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case TYPE.SAGA_GET_LIST_CONTACT: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_DELETE_CONTACT: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_SAVE_CONTACT: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SET_LIST_CONTACT: {
      const { payload } = action,
        LS = localStorage.getItem("OrusSystem"),
        localstorage = JSON.parse(LS ? LS : "{}"),
        storage = {
          ...localstorage,
          contact: {
            ...payload.options,
          },
        };

      localStorage.setItem("OrusSystem", JSON.stringify(storage));

      return {
        ...state,
        ...payload.result,
        ...payload.options,
        messages: [],
        loading: false,
      };
    }
    case TYPE.SET_STATE_VAR_CONTACT: {
      const { payload } = action;
      return {
        ...state,
        [payload.key]: payload.val,
      };
    }
    case TYPE.SET_MESSAGE_CONTACT: {
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
