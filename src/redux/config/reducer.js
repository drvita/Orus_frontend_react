import { TYPE } from "./types";

const DEFAULT_STATE = {
  // BRANCHES
  list: [],
  meta: {},
  config: {},
  messages: [],
  branches:[],
  loading: false,
};

const loggin_state = (state = DEFAULT_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case TYPE.SAGA_GET_LIST_CONFIG: {
      return {
        ...state,
        list: [],
        meta: {},
        loading: true,
      };
    }
    case TYPE.SAGA_GET_CONFIG: {
      return {
        ...state,
        config: {},
        loading: true,
      };
    }
    case TYPE.SAGA_DELETE_CONFIG: {
      return {
        ...state,
        loading: true,
      };
    }
    case TYPE.SAGA_SAVE_CONFIG: {
      return {
        ...state,
        loading: true,
      };
    }

    case TYPE.SET_MESSAGE_CONFIG: {
      return {
        ...state,
        loading: false,
        messages: payload,
      };
    }
    case TYPE.SET_LIST_CONFIG: {
      return {
        ...state,
        list: payload.data,
        meta: payload.meta,
        loading: false,
        messages: [],
      };
    }
    case TYPE.SET_CONFIG: {
      return {
        ...state,
        config: payload,
        loading: false,
        messages: [],
      };
    }

    case TYPE.SAGA_GET_BRANCHES:{
      return{
        ...state,
      }
    }

    case TYPE.SET_BRANCHES:{
          return{
            ...state,
            branches: payload,
          }
    }

    default:
      return {
        ...state,
      };
  }
};

export default loggin_state;
