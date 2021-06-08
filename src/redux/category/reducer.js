import { TYPE } from "./types";

const DEFAULT_STATE = {
    list: [],
    metaList: {},
    orderId: 0,
    orderby: "created_at",
    order: "name",
    search: "",
    page: 1,
    loading: false,
  };

const default_reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case TYPE.SAGA_GET_LIST_CATEGORIES: {
      
      return {
        ...state,
        loading: true,
      }
    }
    case TYPE.SAGE_DELETE_CATEGORY: {

      return {
        ...state,
        loading: true,
      }
    }
    case TYPE.SET_LIST_CATEGORY: {
      const { payload } = action;
      return {
        ...state,
        ...payload.result,
        ...payload.options,
        loading: false,
      };
    }
    case TYPE.SET_ERROR_CATEGORY: {
      const {payload} = action;
      return {
        ...state,
        loading: false,
        errors: payload,
      }
    }
    default:
      return {
        ...state,
      };
  }
};

export default default_reducer;
