import axios from "axios";
import { createContext, useReducer } from "react";

export const itemsInitialState = {
  items: [],
  error: undefined,
  open: false,
  toggle: false,
};

export const itemsActionTypes = {
  GET_ITEMS: "GET_ITEMS",
  CREATE_ITEM: "CREATE_ITEM",
  DELETE_ITEM: "DELETE_ITEM",
  UPDATE_ITEM: "UPDATE_ITEM",
  SET_ERROR: "SET_ERROR",
  SET_ERROR_UNDEFINED: "SET_ERROR_UNDEFINED",
  SET_TOGGLE: "SET_TOGGLE",
  SET_OPEN: "SET_OPEN",
  SET_CREATE_TOGGLE: "SET_CREATE_TOGGLE",
};

export const itemsReducer = (state, action) => {
  // const { type, payload } = action;
  let _items = [];
  switch (action.type) {
    case itemsActionTypes.GET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case itemsActionTypes.CREATE_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case itemsActionTypes.DELETE_ITEM:
      _items = state.items;
      return {
        ...state,
        items: _items.filter(
          (item) => item.component_id !== action.payload.component_id
        ),
      };
    case itemsActionTypes.UPDATE_ITEM:
      _items = state.items.map((item) => {
        return item.component_id === action.payload.component_id
          ? action.payload
          : item;
      });
      return {
        items: _items,
      };
    case itemsActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case itemsActionTypes.SET_ERROR_UNDEFINED:
      return {
        ...state,
        error: undefined,
      };
    case itemsActionTypes.SET_OPEN:
      return {
        ...state,
        open: action.payload,
      };
    case itemsActionTypes.SET_TOGGLE:
      return {
        ...state,
        toggle: action.payload,
      };
    case itemsActionTypes.SET_CREATE_TOGGLE:
      return {
        ...state,
        createToggle: action.payload,
      };
    default:
      return state;
  }
};
export const ComponentsContext = createContext();

export const ComponentsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(itemsReducer, itemsInitialState);

  let URI = "http://localhost:4001/heat-loss/components/";

  const dispatchCalls = {
    getItems: (payload) => {
      dispatch({ type: itemsActionTypes.GET_ITEMS, payload: payload });
    },
    createItem: (payload) => {
      dispatch({
        type: itemsActionTypes.CREATE_ITEM,
        payload: payload,
      });
    },
    deleteItem: (payload) => {
      dispatch({
        type: itemsActionTypes.DELETE_ITEM,
        payload: payload,
      });
    },
    updateItem: (payload) => {
      dispatch({
        type: itemsActionTypes.UPDATE_ITEM,
        payload: payload,
      });
    },
    setError: (payload) => {
      dispatch({ type: itemsActionTypes.SET_ERROR, payload: payload });
    },
    setErrorUndef: () => {
      dispatch({
        type: itemsActionTypes.SET_ERROR_UNDEFINED,
      });
    },
    setOpen: (payload) => {
      dispatch({ type: itemsActionTypes.SET_OPEN, payload: payload });
    },
    setToggle: (payload) => {
      dispatch({ type: itemsActionTypes.SET_TOGGLE, payload: payload });
    },
    setCreateToggle: (payload) => {
      dispatch({
        type: itemsActionTypes.SET_CREATE_TOGGLE,
        payload: payload,
      });
    },
  };

  const apiCalls = {};
  apiCalls.getItems = async (id) => {
    try {
      const project_id = id;
      const response = await axios.get(`${URI}${project_id}/all`);
      if (response.statusText === "OK") {
        dispatchCalls.getItems(response.data);
      }
    } catch (err) {
      const error = err.response.data.error;
    }
  };
  apiCalls.createItem = async (id, data) => {
    let response;
    try {
      response = await axios.post(URI + id + "/create", data);
      dispatchCalls.createItem(response.data);
      dispatchCalls.setErrorUndef();
      dispatchCalls.setCreateToggle(false);
    } catch (err) {
      const error = err.response.data.error;
      dispatchCalls.setError(error);
      dispatchCalls.setOpen(true);
      dispatchCalls.setCreateToggle(true);
    }
  };
  apiCalls.deleteItem = async (id) => {
    try {
      const response = await axios.delete(URI + `${id}`);
      if (response.statusText === "OK") {
        dispatchCalls.deleteItem(response.data);
      }
    } catch (err) {
      const error = err.response.data.error;
      dispatchCalls.setError(error);
      dispatchCalls.setOpen(true);
    }
  };
  apiCalls.updateItem = async (id, data) => {
    try {
      let response = await axios.patch(URI + `${id}`, data);
      if (response.statusText === "OK") {
        dispatchCalls.updateItem(response.data);
        dispatchCalls.setErrorUndef();
      }
    } catch (err) {
      const error = err.response.data.error;
      dispatchCalls.setError(error);
      dispatchCalls.setOpen(true);
    }
  };

  const uiCalls = {
    setOpen: (value) => {
      dispatchCalls.setOpen(value);
    },
    setToggle: (value) => {
      dispatchCalls.setToggle(value);
    },
    setCreateToggle: (value) => {
      dispatchCalls.setCreateToggle(value);
    },
    setError: (value) => {
      dispatchCalls.setError(value);
    },
    setErrorUndef: () => {
      dispatchCalls.setErrorUndef();
    },
  };

  return (
    <ComponentsContext.Provider value={{ state, dispatch, uiCalls, apiCalls }}>
      {children}
    </ComponentsContext.Provider>
  );
};
