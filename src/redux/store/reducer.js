import { TYPE } from "./types";

const DEFAULT_STATE = {
  list: [],
  metaList: {
    current_page: 1,
    total: 10,
    per_page: 10,
    last_page: 1,
  },
  item: {},
  options: {
    page: 1,
    orderby: "created_at",
    order: "desc",
    search: "",
    itemsPage: 10,
    supplier: "",
    brand: "",
    zero: "false",
  },
  brands: [],
  messages: [],
  loading: false,
};

const default_reducer = (state = DEFAULT_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case TYPE.SAGA_GET_LIST_STORE: {
      return {
        ...state,
        list: [],
        metaList: {},
        loading: true,
      };
    }
    case TYPE.SAGA_GET_ITEM: {
      return {
        ...state,
        item: {},
        loading: true,
      };
    }
    case TYPE.SAGA_DELETE_STORE: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_SAVE_ITEM: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_GET_LIST_BRANDS: {
      return {
        ...state,
        loading: true,
        brands: [],
      };
    }
    case TYPE.SAGA_SAVE_BRAND: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_DELETE_BRAND: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_SAVE_INBRANCH: {
      return {
        ...state,
        loading: true,
      };
    }

    case TYPE.SET_LIST_STORE: {
      const { result } = payload;

      return {
        ...state,
        ...result,
        loading: false,
      };
    }
    case TYPE.SET_ITEM: {
      return {
        ...state,
        loading: false,
        messages: [],
        item: payload,
      };
    }
    case TYPE.SET_MESSAGE_STORE: {
      return {
        ...state,
        loading: false,
        messages: payload,
      };
    }
    case TYPE.SET_OPTIONS: {
      const { key, value } = payload;

      return {
        ...state,
        options: {
          ...state.options,
          page: 1,
          [key]: value,
        },
      };
    }
    case TYPE.SET_LIST_BRANDS: {
      return {
        ...state,
        brands: payload,
        messages: [],
        loading: false,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default default_reducer;
