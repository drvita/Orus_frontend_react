import { TYPE } from "./types";

export const DEFAULT_STATE_SALES = {
  list: [],
  metaList: {},
  messages: [],
  sale: {
    id: 0,
    customer: {
      id: 2,
      nombre: "venta de mostrador",
      email: "",
      telefonos: {},
      f_nacimiento: null,
      edad: 0,
    },
    contact_id: 2,
    items: [],
    session: null,
    descuento: 0,
    subtotal: 0,
    total: 0,
    payments: [],
    created_at: new Date(),
  },
  listBanks: [],
  loading: false,
  load_save: false,
};

const default_reducer = (state = DEFAULT_STATE_SALES, action) => {
  const { payload } = action;
  switch (action.type) {
    case TYPE.SAGA_GET_LIST_SALES: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_GET_SALE: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_DELETE_SALE: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_SAVE_SALE: {
      return {
        ...state,
        loading: true,
        load_save: true,
      };
    }
    case TYPE.SAGA_GET_LIST_BANK: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_DELETE_PAYMENT: {
      return {
        ...state,
        loading: true,
      };
    }

    case TYPE.SET_LIST_SALES: {
      return {
        ...state,
        ...payload.result,
        messages: [],
        loading: false,
      };
    }
    case TYPE.SET_MESSAGE_SALE: {
      return {
        ...state,
        loading: false,
        messages: payload,
      };
    }
    case TYPE.SET_SALE: {
      return {
        ...state,
        sale: payload,
        messages: [],
        loading: false,
        load_save: false,
      };
    }
    case TYPE.SET_LIST_BANKS: {
      return {
        ...state,
        listBanks: payload,
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
