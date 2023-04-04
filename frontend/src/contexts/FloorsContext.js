import axios from "axios";
import { createContext, useReducer } from "react";

export const itemsInitialState = {
  items: [],
  item: {},
  error: undefined,
  open: false,
  toggle: false,
};

export const itemsActionTypes = {
  GET_ITEMS: "GET_ITEMS",
  GET_ITEM: "GET_ITEM",
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
      console.log(action.payload);
      console.log(action.payload.sort((a, b) => a.storey_name - b.storey_name));
      return {
        ...state,
        items: action.payload.sort((a, b) => a.storey_name - b.storey_name),
      };
    case itemsActionTypes.GET_ITEM:
      return {
        ...state,
        item: action.payload,
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
          (item) => item.storey_id !== action.payload.storey_id
        ),
      };
    case itemsActionTypes.UPDATE_ITEM:
      _items = state.items.map((item) => {
        return item.storey_id === action.payload.storey_id
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
export const FloorsContext = createContext();

export const FloorsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(itemsReducer, {
    items: itemsInitialState.items,
  });

  let URI = "http://localhost:4001/heat-loss/stories/";

  const dispatchCalls = {
    getItems: (payload) => {
      dispatch({ type: itemsActionTypes.GET_ITEMS, payload: payload });
    },
    getItem: (payload) => {
      dispatch({ type: itemsActionTypes.GET_ITEM, payload: payload });
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
      const building_id = id;
      const response = await axios.get(`${URI}${id}/all`);
      if (response.statusText === "OK") {
        dispatchCalls.getItems(response.data.stories);
      }
    } catch (err) {
      const error = err.response.data.error;
      dispatchCalls.setError(error);
      dispatchCalls.setOpen(true);
    }
  };
  apiCalls.getItem = async (id) => {
    try {
      const storey_id = id;
      const response = await axios.get(`${URI}${id}`);
      if (response.statusText === "OK") {
        dispatchCalls.getBuilding(response.data);
      }
    } catch (err) {
      const error = err.response.data.error;
      dispatchCalls.setError(error);
      dispatchCalls.setOpen(true);
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
      let itemsNamesList = [];
      state.items.map((item) => itemsNamesList.push(item.storey_name));
      if (itemsNamesList.includes(data.storey_name)) {
        dispatchCalls.setError("This name already exists!!!");
        uiCalls.setOpen(true);
      } else {
        let response = await axios.patch(URI + `${id}`, data);
        if (response.statusText === "OK") {
          dispatchCalls.updateItem(response.data);
          dispatchCalls.setErrorUndef();
        }
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
    <FloorsContext.Provider value={{ state, dispatch, uiCalls, apiCalls }}>
      {children}
    </FloorsContext.Provider>
  );
};
