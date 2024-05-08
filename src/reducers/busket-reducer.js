import { ACTION_TYPE } from "../actions";

const initialBusketState = {
  items: [],
};

export const busketReducer = (state = initialBusketState, action) => {
  switch (action.type) {
    case ACTION_TYPE.ADD_BUSKET_DATA: {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case ACTION_TYPE.REMOVE_BUSKET_DATA: {
      return {
        ...state,
        items: state.items.filter((item) => item.randomId !== action.payload),
      };
    }
    case ACTION_TYPE.CLEAR_BUSKET_DATA: {
      return {
        ...state,
        items: [],
      };
    }
    default: {
      return state;
    }
  }
};
